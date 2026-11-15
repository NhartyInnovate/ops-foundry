-- =============================================================================
-- OPS FOUNDRY MIGRATION: 0002_reconcile_runtime_roles.sql
-- Description: Reconcile legacy/PostgREST grants, provision dedicated runtime
--              roles, enforce role security attributes and zero role membership
--              inheritance, configure migration-owner default privileges, and
--              apply table-level, column-level, and RLS isolation policies.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- STEP 1: REVOKE LEGACY PUBLIC & POSTGREST PRIVILEGES + DEFAULT PRIVILEGES
-- -----------------------------------------------------------------------------
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;

-- Revoke default privileges for objects created by the active migration owner
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM PUBLIC;

-- Safely revoke legacy grants and Supabase default ACLs for anon, authenticated,
-- and service_role when present (e.g. on Supabase clusters), without failing on
-- standalone PostgreSQL instances where those PostgREST roles do not exist.
DO $$
DECLARE
  v_postgrest_role text;
BEGIN
  FOREACH v_postgrest_role IN ARRAY ARRAY['anon', 'authenticated', 'service_role']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = v_postgrest_role) THEN
      EXECUTE format('REVOKE ALL ON SCHEMA public FROM %I', v_postgrest_role);
      EXECUTE format('REVOKE ALL ON ALL TABLES IN SCHEMA public FROM %I', v_postgrest_role);
      EXECUTE format('REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM %I', v_postgrest_role);
      EXECUTE format('REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM %I', v_postgrest_role);
      EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM %I', v_postgrest_role);
      EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM %I', v_postgrest_role);
      EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM %I', v_postgrest_role);
      IF EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN
        EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES FROM %I', v_postgrest_role);
        EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON SEQUENCES FROM %I', v_postgrest_role);
        EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM %I', v_postgrest_role);
      END IF;
    END IF;
  END LOOP;
END
$$;

-- -----------------------------------------------------------------------------
-- STEP 2: PROVISION & HARDEN DEDICATED RUNTIME ROLES (Idempotent)
-- -----------------------------------------------------------------------------
DO $$
DECLARE
  v_role text;
  v_membership record;
BEGIN
  FOREACH v_role IN ARRAY ARRAY[
    'ops_corp_runtime',
    'ops_intake_runtime',
    'ops_worker_runtime',
    'ops_admin_runtime'
  ]
  LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = v_role) THEN
      EXECUTE format(
        'CREATE ROLE %I WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS NOREPLICATION',
        v_role
      );
    ELSE
      -- Enforce strict attributes even if the role pre-existed
      EXECUTE format(
        'ALTER ROLE %I WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS NOREPLICATION',
        v_role
      );
    END IF;

    -- Strip any unintended group/role memberships from the runtime identity
    FOR v_membership IN
      SELECT g.rolname AS group_name
      FROM pg_catalog.pg_auth_members m
      JOIN pg_catalog.pg_roles r ON m.member = r.oid
      JOIN pg_catalog.pg_roles g ON m.roleid = g.oid
      WHERE r.rolname = v_role
    LOOP
      EXECUTE format('REVOKE %I FROM %I', v_membership.group_name, v_role);
    END LOOP;
  END LOOP;
END
$$;

-- -----------------------------------------------------------------------------
-- STEP 3: RESET & GRANT SCHEMA USAGE ONLY (NO CREATE PRIVILEGE ON PUBLIC)
-- -----------------------------------------------------------------------------
REVOKE ALL ON SCHEMA public FROM ops_corp_runtime, ops_intake_runtime, ops_worker_runtime, ops_admin_runtime;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM ops_corp_runtime, ops_intake_runtime, ops_worker_runtime, ops_admin_runtime;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM ops_corp_runtime, ops_intake_runtime, ops_worker_runtime, ops_admin_runtime;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM ops_corp_runtime, ops_intake_runtime, ops_worker_runtime, ops_admin_runtime;

GRANT USAGE ON SCHEMA public TO ops_corp_runtime, ops_intake_runtime, ops_worker_runtime, ops_admin_runtime;

-- -----------------------------------------------------------------------------
-- STEP 4: CORPORATE RUNTIME GRANTS (ops_corp_runtime)
-- -----------------------------------------------------------------------------
GRANT INSERT ON TABLE corporate_inquiries TO ops_corp_runtime;
GRANT INSERT ON TABLE notification_outbox TO ops_corp_runtime;
REVOKE ALL ON admissions_applications, admissions_status_history FROM ops_corp_runtime;
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON corporate_inquiries FROM ops_corp_runtime;
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON notification_outbox FROM ops_corp_runtime;

-- -----------------------------------------------------------------------------
-- STEP 5: ACADEMY INTAKE RUNTIME GRANTS (ops_intake_runtime)
-- -----------------------------------------------------------------------------
GRANT INSERT ON TABLE admissions_applications TO ops_intake_runtime;
GRANT INSERT ON TABLE admissions_status_history TO ops_intake_runtime;
GRANT INSERT ON TABLE notification_outbox TO ops_intake_runtime;
REVOKE ALL ON corporate_inquiries FROM ops_intake_runtime;
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON admissions_applications FROM ops_intake_runtime;
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON admissions_status_history FROM ops_intake_runtime;
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON notification_outbox FROM ops_intake_runtime;

-- -----------------------------------------------------------------------------
-- STEP 6: WORKER RUNTIME GRANTS (ops_worker_runtime)
-- -----------------------------------------------------------------------------
-- Column-level SELECT on notification_outbox only for delivery and lease fields
-- (Excludes application_id, worker_id, last_attempt_at, error_message, completed_at, created_at, updated_at)
GRANT SELECT (
  id, channel, recipient, payload, claim_id, attempts, max_attempts,
  status, scheduled_for, lease_expires_at
) ON TABLE notification_outbox TO ops_worker_runtime;

-- Column-level UPDATE on execution management fields only
-- (Excludes id, channel, recipient, payload, application_id, max_attempts, created_at)
GRANT UPDATE (
  status, worker_id, claim_id, lease_expires_at, attempts,
  last_attempt_at, scheduled_for, error_message, completed_at, updated_at
) ON TABLE notification_outbox TO ops_worker_runtime;

-- Deny all access to inquiry and applicant records; deny INSERT/DELETE on outbox
REVOKE ALL ON admissions_applications, admissions_status_history, corporate_inquiries FROM ops_worker_runtime;
REVOKE INSERT, DELETE, TRUNCATE, REFERENCES, TRIGGER ON notification_outbox FROM ops_worker_runtime;

-- -----------------------------------------------------------------------------
-- STEP 7: PHASE 4 ADMIN RUNTIME GRANTS (ops_admin_runtime - Reserved)
-- -----------------------------------------------------------------------------
GRANT SELECT ON TABLE corporate_inquiries, admissions_applications, admissions_status_history, notification_outbox TO ops_admin_runtime;
GRANT UPDATE (status, admin_notes, status_updated_at, status_updated_by, updated_at) ON TABLE admissions_applications TO ops_admin_runtime;
GRANT INSERT ON TABLE admissions_status_history TO ops_admin_runtime;
GRANT UPDATE (status, updated_at) ON TABLE corporate_inquiries TO ops_admin_runtime;

-- -----------------------------------------------------------------------------
-- STEP 8: ROW LEVEL SECURITY (RLS) POLICIES & ENFORCEMENT
-- -----------------------------------------------------------------------------
-- Drop legacy policies from 0001 and any prior runs of 0002 (idempotent)
DROP POLICY IF EXISTS "anon_insert_admissions" ON admissions_applications;
DROP POLICY IF EXISTS "admin_select_admissions" ON admissions_applications;
DROP POLICY IF EXISTS "admin_update_admissions" ON admissions_applications;
DROP POLICY IF EXISTS "admin_select_status_history" ON admissions_status_history;
DROP POLICY IF EXISTS "admin_insert_status_history" ON admissions_status_history;
DROP POLICY IF EXISTS "anon_insert_corporate_inquiries" ON corporate_inquiries;
DROP POLICY IF EXISTS "admin_select_corporate_inquiries" ON corporate_inquiries;
DROP POLICY IF EXISTS "admin_update_corporate_inquiries" ON corporate_inquiries;

DROP POLICY IF EXISTS "corp_runtime_insert" ON corporate_inquiries;
DROP POLICY IF EXISTS "intake_runtime_insert" ON admissions_applications;
DROP POLICY IF EXISTS "intake_runtime_history_insert" ON admissions_status_history;
DROP POLICY IF EXISTS "corp_outbox_insert" ON notification_outbox;
DROP POLICY IF EXISTS "intake_outbox_insert" ON notification_outbox;
DROP POLICY IF EXISTS "worker_outbox_select" ON notification_outbox;
DROP POLICY IF EXISTS "worker_outbox_update" ON notification_outbox;
DROP POLICY IF EXISTS "admin_select_history" ON admissions_status_history;
DROP POLICY IF EXISTS "admin_insert_history" ON admissions_status_history;
DROP POLICY IF EXISTS "admin_select_corp" ON corporate_inquiries;
DROP POLICY IF EXISTS "admin_update_corp" ON corporate_inquiries;
DROP POLICY IF EXISTS "admin_select_outbox" ON notification_outbox;

-- Enable & Force RLS across all tables
ALTER TABLE corporate_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_outbox ENABLE ROW LEVEL SECURITY;

ALTER TABLE corporate_inquiries FORCE ROW LEVEL SECURITY;
ALTER TABLE admissions_applications FORCE ROW LEVEL SECURITY;
ALTER TABLE admissions_status_history FORCE ROW LEVEL SECURITY;
ALTER TABLE notification_outbox FORCE ROW LEVEL SECURITY;

-- 1. Corporate Runtime RLS Policies
CREATE POLICY "corp_runtime_insert" ON corporate_inquiries
  FOR INSERT TO ops_corp_runtime
  WITH CHECK (status = 'submitted');

CREATE POLICY "corp_outbox_insert" ON notification_outbox
  FOR INSERT TO ops_corp_runtime
  WITH CHECK (
    channel = 'operational_triage_webhook'
    AND status = 'pending'
    AND application_id IS NULL
    AND claim_id IS NULL
    AND worker_id IS NULL
    AND attempts = 0
  );

-- 2. Academy Intake Runtime RLS Policies
CREATE POLICY "intake_runtime_insert" ON admissions_applications
  FOR INSERT TO ops_intake_runtime
  WITH CHECK (
    status = 'submitted'
    AND admin_notes IS NULL
    AND status_updated_at IS NULL
    AND status_updated_by IS NULL
  );

CREATE POLICY "intake_runtime_history_insert" ON admissions_status_history
  FOR INSERT TO ops_intake_runtime
  WITH CHECK (
    from_status IS NULL
    AND to_status = 'submitted'
    AND changed_by IS NULL
  );

CREATE POLICY "intake_outbox_insert" ON notification_outbox
  FOR INSERT TO ops_intake_runtime
  WITH CHECK (
    channel = 'applicant_email'
    AND status = 'pending'
    AND application_id IS NOT NULL
    AND claim_id IS NULL
    AND worker_id IS NULL
    AND attempts = 0
  );

-- 3. Worker Runtime RLS Policies
CREATE POLICY "worker_outbox_select" ON notification_outbox
  FOR SELECT TO ops_worker_runtime
  USING (true);

CREATE POLICY "worker_outbox_update" ON notification_outbox
  FOR UPDATE TO ops_worker_runtime
  USING (status IN ('pending', 'processing'))
  WITH CHECK (
    status IN ('processing', 'completed', 'pending', 'failed', 'dead_letter')
    AND attempts >= 1
  );

-- 4. Phase 4 Admin Runtime RLS Policies (Reserved)
CREATE POLICY "admin_select_admissions" ON admissions_applications
  FOR SELECT TO ops_admin_runtime USING (true);

CREATE POLICY "admin_update_admissions" ON admissions_applications
  FOR UPDATE TO ops_admin_runtime USING (true) WITH CHECK (true);

CREATE POLICY "admin_select_history" ON admissions_status_history
  FOR SELECT TO ops_admin_runtime USING (true);

CREATE POLICY "admin_insert_history" ON admissions_status_history
  FOR INSERT TO ops_admin_runtime WITH CHECK (true);

CREATE POLICY "admin_select_corp" ON corporate_inquiries
  FOR SELECT TO ops_admin_runtime USING (true);

CREATE POLICY "admin_update_corp" ON corporate_inquiries
  FOR UPDATE TO ops_admin_runtime USING (true) WITH CHECK (true);

CREATE POLICY "admin_select_outbox" ON notification_outbox
  FOR SELECT TO ops_admin_runtime USING (true);
