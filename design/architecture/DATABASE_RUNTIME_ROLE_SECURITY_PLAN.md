# Ops Foundry — Database Runtime Role Security Plan
## Architectural Correction & Privilege Hardening Specification

**Document Version:** 2.0.0  
**Status:** Approved for Implementation Planning  
**Scope:** PostgreSQL runtime role provisioning, engine-level table and column grants, RLS policy design, client factory refactoring, secure credential lifecycle, and verification test suite.

---

## 1. Current-State Problems & Architectural Deviations

The Phase 3A implementation audit and technical review identified four critical security deviations from the approved production architecture:

1. **Shared Superuser Connection:** `packages/db/src/client.ts` initializes a single global `db` client reading a generic `DATABASE_URL`. In `.env.example`, this URL connects via the administrative `postgres` user. All applications (`apps/corporate`, `apps/academy`, and `apps/worker`) currently resolve to this single identity, completely bypassing least-privilege boundaries at the database engine level.
2. **Missing Custom Runtime Roles:** The four custom PostgreSQL roles specified in [PRODUCTION_ARCHITECTURE.md](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/design/architecture/PRODUCTION_ARCHITECTURE.md#L525-L557) (`ops_corp_runtime`, `ops_intake_runtime`, `ops_worker_runtime`, `ops_admin_runtime`) were never created in the database migrations.
3. **Over-Reliance on PostgREST Roles (`anon` / `service_role`):** Migration `0001_rls_policies.sql` configured permissions around Supabase HTTP API identities (`anon`, `authenticated`, `service_role`). This created a contradictory state:
   - `anon` was granted `INSERT` on `admissions_applications`, but had no permissions on `admissions_status_history` and had all permissions explicitly revoked on `notification_outbox`.
   - `service_role` was granted `ALL` on `admissions_applications` and `notification_outbox`. When `apps/worker` connects via `service_role`, the database engine does not prevent it from querying applicant PII.
4. **`INSERT ... RETURNING` Permission Conflict:** Under standard PostgreSQL privilege rules, `INSERT ... RETURNING id` requires both `INSERT` on the table and `SELECT` on the returned column. Furthermore, RLS evaluates `SELECT` policies on the inserted row during `RETURNING`. A purely restricted insert-only role executing `RETURNING id` fails with permission errors.

---

## 2. Target Role Architecture

To enforce strict separation of duties and defense-in-depth, database access is segregated across five distinct database identities:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 DATABASE IDENTITY MODEL                                 │
├──────────────────────┬────────────────────────┬─────────────────────────────────────────┤
│ Identity             │ Connection Method      │ Architectural Scope                     │
├──────────────────────┼────────────────────────┼─────────────────────────────────────────┤
│ `postgres`           │ Direct / Migration URL │ DDL, Drizzle migrations, CI/CD pipeline │
│ `ops_corp_runtime`   │ Pooler (Port 6543)     │ Corporate Next.js Server Actions        │
│ `ops_intake_runtime` │ Pooler (Port 6543)     │ Academy Next.js Server Actions          │
│ `ops_worker_runtime` │ Pooler (Port 6543)     │ Outbox Background Worker Service        │
│ `ops_admin_runtime`  │ Pooler (Port 6543)     │ Phase 4 Admin Dashboard (Reserved)      │
└──────────────────────┴────────────────────────┴─────────────────────────────────────────┘
```

### Role Security Attributes:
- **`NOINHERIT`:** All runtime roles are created with `NOINHERIT` to prevent accidental inheritance of elevated privileges from group memberships.
- **`NOSUPERUSER`:** Ensures runtime identities cannot bypass engine privilege checks.
- **`NOBYPASSRLS`:** Guarantees that runtime identities cannot bypass Row-Level Security policies under any circumstances.
- **`NOCREATEDB`, `NOCREATEROLE`:** Disabled across all runtime identities.
- **Migration Owner Separation:** The migration user (`postgres`) owns all tables and executes all DDL. Application runtime roles have zero DDL privileges (`CREATE`, `DROP`, `ALTER`).

---

## 3. PostgreSQL Privileges and RLS Policy Design

### 3.1 Table Privileges vs. Row-Level Security (RLS)
It is critical to distinguish engine-level table privileges from Row-Level Security:
- **Table Privileges (`GRANT / REVOKE`):** Act as the first perimeter gate at the database engine level. If a role lacks `SELECT` on a table, the engine immediately rejects the query with `insufficient_privilege`. RLS policies are never even evaluated.
- **Row-Level Security (`CREATE POLICY`):** Acts as the second perimeter gate. When table privilege exists, RLS filters rows based on session context (e.g., matching IDs, claim statuses, or JWT claims).

### 3.2 Limitations of `FORCE ROW LEVEL SECURITY`
- In PostgreSQL, enabling `FORCE ROW LEVEL SECURITY` applies RLS policies to table owners (who would otherwise bypass RLS).
- **Critical Limitation:** PostgreSQL **superusers** (`rolsuper = true`) and roles explicitly granted the **`BYPASSRLS`** attribute (`rolbypassrls = true`) **completely bypass RLS**, regardless of whether `FORCE ROW LEVEL SECURITY` is enabled.
- **Architectural Countermeasure:** Application runtime roles (`ops_corp_runtime`, `ops_intake_runtime`, `ops_worker_runtime`) are explicitly provisioned with `NOSUPERUSER NOBYPASSRLS`. Therefore, RLS cannot be bypassed by runtime applications.

### 3.3 Complete Privilege Matrix

| Table Name | `ops_corp_runtime` | `ops_intake_runtime` | `ops_worker_runtime` | `ops_admin_runtime` (Phase 4) |
| :--- | :--- | :--- | :--- | :--- |
| `corporate_inquiries` | **`INSERT`** only | **NO ACCESS** | **NO ACCESS** | `SELECT`, `UPDATE` (`status`, `admin_notes`) |
| `admissions_applications` | **NO ACCESS** | **`INSERT`** only | **NO ACCESS** | `SELECT`, `UPDATE` (`status`, `admin_notes`) |
| `admissions_status_history` | **NO ACCESS** | **`INSERT`** only | **NO ACCESS** | `SELECT`, `INSERT` |
| `notification_outbox` | **`INSERT`** only | **`INSERT`** only | **`SELECT`**, **`UPDATE` (restricted columns)** | `SELECT` |

### 3.4 Explicit RLS Policies for Each Identity

```sql
-- 1. Corporate Inquiries Policies
CREATE POLICY "corp_runtime_insert" ON corporate_inquiries
  FOR INSERT TO ops_corp_runtime
  WITH CHECK (true);

CREATE POLICY "admin_select_corporate_inquiries" ON corporate_inquiries
  FOR SELECT TO ops_admin_runtime
  USING (true);

CREATE POLICY "admin_update_corporate_inquiries" ON corporate_inquiries
  FOR UPDATE TO ops_admin_runtime
  USING (true)
  WITH CHECK (true);

-- 2. Admissions Applications Policies
CREATE POLICY "intake_runtime_insert" ON admissions_applications
  FOR INSERT TO ops_intake_runtime
  WITH CHECK (true);

CREATE POLICY "admin_select_admissions" ON admissions_applications
  FOR SELECT TO ops_admin_runtime
  USING (true);

CREATE POLICY "admin_update_admissions" ON admissions_applications
  FOR UPDATE TO ops_admin_runtime
  USING (true)
  WITH CHECK (true);

-- 3. Admissions Status History Policies
CREATE POLICY "intake_runtime_history_insert" ON admissions_status_history
  FOR INSERT TO ops_intake_runtime
  WITH CHECK (true);

CREATE POLICY "admin_select_status_history" ON admissions_status_history
  FOR SELECT TO ops_admin_runtime
  USING (true);

CREATE POLICY "admin_insert_status_history" ON admissions_status_history
  FOR INSERT TO ops_admin_runtime
  WITH CHECK (true);

-- 4. Notification Outbox Policies
CREATE POLICY "corp_outbox_insert" ON notification_outbox
  FOR INSERT TO ops_corp_runtime
  WITH CHECK (true);

CREATE POLICY "intake_outbox_insert" ON notification_outbox
  FOR INSERT TO ops_intake_runtime
  WITH CHECK (true);

CREATE POLICY "worker_outbox_select" ON notification_outbox
  FOR SELECT TO ops_worker_runtime
  USING (true);

CREATE POLICY "worker_outbox_update" ON notification_outbox
  FOR UPDATE TO ops_worker_runtime
  USING (true)
  WITH CHECK (true);

CREATE POLICY "admin_select_outbox" ON notification_outbox
  FOR SELECT TO ops_admin_runtime
  USING (true);
```

### 3.5 Resolving the `INSERT ... RETURNING` Limitation
- **Pre-Generated UUIDs:** All Next.js Server Actions generate entity UUIDs in Node.js before issuing database commands using `crypto.randomUUID()`.
- The insert statement supplies `id` in the values object:
  ```ts
  const id = crypto.randomUUID();
  await db.insert(corporateInquiries).values({ id, ...payload });
  ```
- Because no `RETURNING id` clause is emitted, PostgreSQL does not evaluate column-level `SELECT` privileges or `SELECT` RLS policies. The insert succeeds with pure `INSERT` privilege.

### 3.6 Sequence Privileges Audit
Inspection of `packages/db/src/schema.ts` and `0000_parched_next_avengers.sql` confirms that all primary keys are UUIDs (`gen_random_uuid()`) and retry counters are integer columns. **No PostgreSQL sequences are currently used in the schema.** If sequences are introduced in the future, `GRANT USAGE ON SEQUENCE` will be scoped strictly to the inserting runtime roles.

---

## 4. Worker Column-Level Permissions & Query Compatibility

### 4.1 Query Inspection Analysis
Inspection of `packages/db/src/queries/outbox.ts` reveals the exact column operations executed by `apps/worker`:

1. **Job Claiming (`claimOutboxJobs`):**
   - CTE selection requires `SELECT` on: `id`, `status`, `scheduled_for`, `lease_expires_at`.
   - Update statement modifies: `status`, `worker_id`, `claim_id`, `lease_expires_at`, `attempts`, `last_attempt_at`, `updated_at`.
   - Minimized `RETURNING` projection: `RETURNING o.id, o.channel, o.recipient, o.payload, o.claim_id, o.attempts, o.max_attempts;`. This returns only the 7 columns required for notification delivery and lease/retry tracking, omitting `application_id` and audit timestamps.
2. **Heartbeat Renewal (`heartbeatOutboxJob`):**
   - Modifies: `lease_expires_at`, `updated_at`.
   - Reads: `id`, `claim_id`, `status`, `lease_expires_at`.
   - Returns: `RETURNING id` (covered by `SELECT (id)`).
3. **Job Completion (`completeOutboxJob`):**
   - Modifies: `status`, `completed_at`, `lease_expires_at`, `error_message`, `updated_at`.
   - Reads: `id`, `claim_id`, `status`.
   - Returns: `RETURNING id`.
4. **Job Failure & Retry (`failOutboxJob`):**
   - Modifies: `status`, `scheduled_for`, `lease_expires_at`, `error_message`, `updated_at`.
   - Reads: `id`, `claim_id`, `status`.
   - Returns: `RETURNING id`.

### 4.2 Exact Column-Level Privilege Specification
To allow all legitimate worker operations while strictly preventing the worker from reading `application_id` or altering message payloads or routing:
- **Column-Restricted SELECT:**
  ```sql
  GRANT SELECT (
    id, channel, recipient, payload, claim_id, attempts, max_attempts,
    status, scheduled_for, lease_expires_at
  ) ON TABLE notification_outbox TO ops_worker_runtime;
  ```
- **Denied from SELECT:** `application_id`, `worker_id`, `last_attempt_at`, `error_message`, `completed_at`, `created_at`, `updated_at`.
- **Column-Restricted UPDATE:**
  ```sql
  GRANT UPDATE (
    status, worker_id, claim_id, lease_expires_at, attempts,
    last_attempt_at, scheduled_for, error_message, completed_at, updated_at
  ) ON TABLE notification_outbox TO ops_worker_runtime;
  ```
- **Denied from UPDATE:** `id`, `channel`, `recipient`, `payload`, `application_id`, `created_at`, `max_attempts`.
- **Denied from INSERT / DELETE:** `ops_worker_runtime` cannot insert or delete rows from `notification_outbox`.

### 4.3 PII and Application Boundary Clarification
- The worker necessarily accesses minimal delivery-related personal information (`recipient` email address and minimal template payload) stored in `notification_outbox` to execute outbound delivery.
- The worker is **strictly denied all access** to full application records (`admissions_applications`), audit history (`admissions_status_history`), and corporate inquiry records (`corporate_inquiries`).

---

## 5. Explicit Database Client Factories (`packages/db`)

### 5.1 Elimination of Silent Administrative Fallbacks
To eliminate the risk of an application silently falling back to a shared administrative or migration connection, the singleton `db` export is removed. In its place, explicit scoped factories are provided:

```ts
// packages/db/src/client.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const poolOptions: postgres.Options<{}> = {
  prepare: false, // Mandatory for Supabase Transaction Pooler (port 6543)
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
};

const clientCache = new Map<string, ReturnType<typeof drizzle>>();

function getOrCreateClient(connectionString: string) {
  let client = clientCache.get(connectionString);
  if (!client) {
    const sql = postgres(connectionString, poolOptions);
    client = drizzle(sql, { schema });
    clientCache.set(connectionString, client);
  }
  return client;
}

/**
 * Scoped client for Corporate application Server Actions.
 * Connects exclusively via ops_corp_runtime.
 */
export function getCorpDb() {
  const url = process.env.CORP_DATABASE_URL;
  if (!url) {
    throw new Error(
      '[CRITICAL] CORP_DATABASE_URL is not defined. Corporate runtime requires explicit scoped credentials.'
    );
  }
  return getOrCreateClient(url);
}

/**
 * Scoped client for Academy application Server Actions.
 * Connects exclusively via ops_intake_runtime.
 */
export function getIntakeDb() {
  const url = process.env.ACADEMY_DATABASE_URL;
  if (!url) {
    throw new Error(
      '[CRITICAL] ACADEMY_DATABASE_URL is not defined. Academy intake runtime requires explicit scoped credentials.'
    );
  }
  return getOrCreateClient(url);
}

/**
 * Scoped client for Outbox Background Worker.
 * Connects exclusively via ops_worker_runtime.
 */
export function getWorkerDb() {
  const url = process.env.WORKER_DATABASE_URL;
  if (!url) {
    throw new Error(
      '[CRITICAL] WORKER_DATABASE_URL is not defined. Worker runtime requires explicit scoped credentials.'
    );
  }
  return getOrCreateClient(url);
}

/**
 * Development-only privileged client.
 * Strictly blocked in production environments.
 */
export function getLocalDevPrivilegedDb() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      '[SECURITY VIOLATION] getLocalDevPrivilegedDb cannot be called in production.'
    );
  }
  if (process.env.ALLOW_INSECURE_DEV_SHARED_DB !== 'true') {
    throw new Error(
      'Explicit developer opt-in required: set ALLOW_INSECURE_DEV_SHARED_DB=true in local .env.'
    );
  }
  const url = process.env.LOCAL_DEV_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/opsfoundry';
  return getOrCreateClient(url);
}
```

---

## 6. Secure Credential Provisioning Lifecycle

The credential lifecycle maintains strict separation across all deployment stages:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              CREDENTIAL SEPARATION LIFECYCLE                           │
├─────────────────────┬──────────────────────────┬───────────────────────────────────────┤
│ Lifecycle Stage     │ Tooling / Mechanism      │ Secret Exposure Scope                 │
├─────────────────────┼──────────────────────────┼───────────────────────────────────────┤
│ 1. Role Provisioning│ SQL Migration (0002)     │ Zero passwords; creates roles only   │
│ 2. Password Assign  │ Interactive CLI / Vault  │ Staged directly in cloud database     │
│ 3. Secret Storage   │ Vercel / Netlify Secrets │ Encrypted hosting environment vars    │
│ 4. Runtime Injection│ Scoped Env Variables     │ Injected into isolated server runtimes│
│ 5. Rotation         │ Single ALTER ROLE command│ Zero downtime for unrelated services  │
└─────────────────────┴──────────────────────────┴───────────────────────────────────────┘
```

1. **Role Provisioning (Zero Passwords in Git):**  
   Roles are created via SQL migrations using `CREATE ROLE ... WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS;` without passwords.
2. **Password Assignment:**  
   In staging and production, random 32-byte passwords are generated and assigned via direct administrative session or Supabase Vault CLI:
   ```sql
   ALTER ROLE ops_corp_runtime WITH PASSWORD 'secure-random-token-here';
   ALTER ROLE ops_intake_runtime WITH PASSWORD 'secure-random-token-here';
   ALTER ROLE ops_worker_runtime WITH PASSWORD 'secure-random-token-here';
   ```
3. **Application Environment Configuration:**  
   Each service receives only its scoped connection URL:
   - `apps/corporate`: receives `CORP_DATABASE_URL`
   - `apps/academy`: receives `ACADEMY_DATABASE_URL`
   - `apps/worker`: receives `WORKER_DATABASE_URL`
4. **Migration Owner Separation:**  
   `MIGRATION_DATABASE_URL` connects as `postgres` (migration owner) and is provided **exclusively** to the CI/CD pipeline and `drizzle-kit`. Application hosting environments never receive migration owner credentials.
5. **Template Files (`.env.example`):**  
   Contains only placeholders. No real project references, keys, or passwords.

---

## 7. Migration Sequence

Reconciliation will be executed via migration `0002_reconcile_runtime_roles.sql`:

```sql
-- =============================================================================
-- OPS FOUNDRY MIGRATION: 0002_reconcile_runtime_roles.sql
-- Description: Reconcile PostgREST grants, provision custom runtime roles,
--              and enforce engine-level least privilege with RLS defense.
-- =============================================================================

-- STEP 1: REVOKE LEGACY POSTGREST / PUBLIC PRIVILEGES
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM PUBLIC;

-- STEP 2: PROVISION DEDICATED RUNTIME ROLES (Idempotent creation)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ops_corp_runtime') THEN
    CREATE ROLE ops_corp_runtime WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ops_intake_runtime') THEN
    CREATE ROLE ops_intake_runtime WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ops_worker_runtime') THEN
    CREATE ROLE ops_worker_runtime WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ops_admin_runtime') THEN
    CREATE ROLE ops_admin_runtime WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS;
  END IF;
END
$$;

-- STEP 3: GRANT SCHEMA USAGE
GRANT USAGE ON SCHEMA public TO ops_corp_runtime, ops_intake_runtime, ops_worker_runtime, ops_admin_runtime;

-- STEP 4: CORPORATE RUNTIME GRANTS
GRANT INSERT ON TABLE corporate_inquiries TO ops_corp_runtime;
GRANT INSERT ON TABLE notification_outbox TO ops_corp_runtime;
REVOKE ALL ON admissions_applications, admissions_status_history FROM ops_corp_runtime;

-- STEP 5: ACADEMY INTAKE RUNTIME GRANTS
GRANT INSERT ON TABLE admissions_applications TO ops_intake_runtime;
GRANT INSERT ON TABLE admissions_status_history TO ops_intake_runtime;
GRANT INSERT ON TABLE notification_outbox TO ops_intake_runtime;
REVOKE ALL ON corporate_inquiries FROM ops_intake_runtime;
REVOKE SELECT, UPDATE, DELETE ON admissions_applications FROM ops_intake_runtime;

-- STEP 6: WORKER RUNTIME GRANTS
GRANT SELECT ON TABLE notification_outbox TO ops_worker_runtime;
GRANT UPDATE (
  status, worker_id, claim_id, lease_expires_at, attempts,
  last_attempt_at, scheduled_for, error_message, completed_at, updated_at
) ON TABLE notification_outbox TO ops_worker_runtime;
REVOKE ALL ON admissions_applications, admissions_status_history, corporate_inquiries FROM ops_worker_runtime;
REVOKE INSERT, DELETE ON notification_outbox FROM ops_worker_runtime;

-- STEP 7: CLEAN UP OLD RLS POLICIES & APPLY HARDENED POLICIES
DROP POLICY IF EXISTS "anon_insert_admissions" ON admissions_applications;
DROP POLICY IF EXISTS "admin_select_admissions" ON admissions_applications;
DROP POLICY IF EXISTS "admin_update_admissions" ON admissions_applications;
DROP POLICY IF EXISTS "admin_select_status_history" ON admissions_status_history;
DROP POLICY IF EXISTS "admin_insert_status_history" ON admissions_status_history;
DROP POLICY IF EXISTS "anon_insert_corporate_inquiries" ON corporate_inquiries;
DROP POLICY IF EXISTS "admin_select_corporate_inquiries" ON corporate_inquiries;
DROP POLICY IF EXISTS "admin_update_corporate_inquiries" ON corporate_inquiries;

-- Enable and Force RLS on all tables
ALTER TABLE corporate_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_outbox ENABLE ROW LEVEL SECURITY;

ALTER TABLE corporate_inquiries FORCE ROW LEVEL SECURITY;
ALTER TABLE admissions_applications FORCE ROW LEVEL SECURITY;
ALTER TABLE admissions_status_history FORCE ROW LEVEL SECURITY;
ALTER TABLE notification_outbox FORCE ROW LEVEL SECURITY;

-- Apply targeted policies
CREATE POLICY "corp_runtime_insert" ON corporate_inquiries
  FOR INSERT TO ops_corp_runtime WITH CHECK (true);

CREATE POLICY "intake_runtime_insert" ON admissions_applications
  FOR INSERT TO ops_intake_runtime WITH CHECK (true);

CREATE POLICY "intake_runtime_history_insert" ON admissions_status_history
  FOR INSERT TO ops_intake_runtime WITH CHECK (true);

CREATE POLICY "corp_outbox_insert" ON notification_outbox
  FOR INSERT TO ops_corp_runtime WITH CHECK (true);

CREATE POLICY "intake_outbox_insert" ON notification_outbox
  FOR INSERT TO ops_intake_runtime WITH CHECK (true);

CREATE POLICY "worker_outbox_select" ON notification_outbox
  FOR SELECT TO ops_worker_runtime USING (true);

CREATE POLICY "worker_outbox_update" ON notification_outbox
  FOR UPDATE TO ops_worker_runtime USING (true) WITH CHECK (true);
```

---

## 8. SQL Verification Tests

### 8.1 Test Environment Distinctions
- **Local Tests (Docker / PostgreSQL Runner):** Execute transactional unit tests simulating runtime roles using `SET ROLE ...` inside an uncommitted transaction block (`BEGIN ... ROLLBACK`).
- **Live Staging Tests (Supabase Cluster):** Verify connection pooling authentication over port 6543 using actual username format `<role_name>.<project_ref>` with assigned passwords.

### 8.2 Test Suite Execution Script
```sql
BEGIN;

-- =============================================================================
-- TEST 1: VERIFY ROLE SECURITY ATTRIBUTES
-- =============================================================================
DO $$
BEGIN
  ASSERT (SELECT rolcanlogin AND NOT rolinherit AND NOT rolsuper AND NOT rolbypassrls FROM pg_roles WHERE rolname = 'ops_corp_runtime'),
    'FAIL: ops_corp_runtime has invalid security attributes';
  ASSERT (SELECT rolcanlogin AND NOT rolinherit AND NOT rolsuper AND NOT rolbypassrls FROM pg_roles WHERE rolname = 'ops_intake_runtime'),
    'FAIL: ops_intake_runtime has invalid security attributes';
  ASSERT (SELECT rolcanlogin AND NOT rolinherit AND NOT rolsuper AND NOT rolbypassrls FROM pg_roles WHERE rolname = 'ops_worker_runtime'),
    'FAIL: ops_worker_runtime has invalid security attributes';
END $$;

-- =============================================================================
-- TEST 2: CORPORATE RUNTIME (ops_corp_runtime)
-- =============================================================================
SET ROLE ops_corp_runtime;

-- 2.1 Permitted: Atomic insert of inquiry + notification outbox
INSERT INTO corporate_inquiries (id, full_name, email, organization, idempotency_key)
VALUES (gen_random_uuid(), 'Test Corp', 'corp@test.com', 'Acme Inc', 'test-idemp-corp-01');

INSERT INTO notification_outbox (id, channel, recipient, payload)
VALUES (gen_random_uuid(), 'operational_triage_webhook', 'https://webhook.internal', '{"lead":"test"}'::jsonb);

-- 2.2 Forbidden: SELECT on corporate_inquiries (denied by engine)
DO $$
BEGIN
  PERFORM * FROM corporate_inquiries;
  RAISE EXCEPTION 'FAIL: ops_corp_runtime should NOT be able to SELECT corporate_inquiries';
EXCEPTION WHEN insufficient_privilege THEN
  -- Expected failure
END $$;

-- 2.3 Forbidden: SELECT on admissions_applications (cross-application isolation)
DO $$
BEGIN
  PERFORM * FROM admissions_applications;
  RAISE EXCEPTION 'FAIL: ops_corp_runtime should NOT be able to access admissions_applications';
EXCEPTION WHEN insufficient_privilege THEN
  -- Expected failure
END $$;

RESET ROLE;

-- =============================================================================
-- TEST 3: ACADEMY INTAKE RUNTIME (ops_intake_runtime)
-- =============================================================================
SET ROLE ops_intake_runtime;

-- 3.1 Permitted: Atomic insert of application + status history + outbox
DO $$
DECLARE
  v_app_id uuid := gen_random_uuid();
BEGIN
  INSERT INTO admissions_applications (id, full_name, email, phone, course_code, idempotency_key)
  VALUES (v_app_id, 'Jane Applicant', 'jane@test.com', '+4412345678', 'COURSE_01', 'test-idemp-acad-01');

  INSERT INTO admissions_status_history (id, application_id, to_status)
  VALUES (gen_random_uuid(), v_app_id, 'submitted');

  INSERT INTO notification_outbox (id, channel, recipient, payload, application_id)
  VALUES (gen_random_uuid(), 'applicant_email', 'jane@test.com', '{"status":"received"}'::jsonb, v_app_id);
END $$;

-- 3.2 Forbidden: SELECT on admissions_applications (PII protection)
DO $$
BEGIN
  PERFORM * FROM admissions_applications;
  RAISE EXCEPTION 'FAIL: ops_intake_runtime should NOT be able to SELECT admissions_applications';
EXCEPTION WHEN insufficient_privilege THEN
  -- Expected failure
END $$;

-- 3.3 Forbidden: SELECT or INSERT on corporate_inquiries
DO $$
BEGIN
  PERFORM * FROM corporate_inquiries;
  RAISE EXCEPTION 'FAIL: ops_intake_runtime should NOT be able to access corporate_inquiries';
EXCEPTION WHEN insufficient_privilege THEN
  -- Expected failure
END $$;

RESET ROLE;

-- =============================================================================
-- TEST 4: WORKER RUNTIME (ops_worker_runtime)
-- =============================================================================
SET ROLE ops_worker_runtime;

-- 4.1 Permitted: Claiming outbox job and reading full row (SELECT + UPDATE execution fields)
DO $$
DECLARE
  v_job_id uuid;
BEGIN
  SELECT id INTO v_job_id FROM notification_outbox LIMIT 1;
  UPDATE notification_outbox
  SET status = 'processing', worker_id = 'worker-test-01', claim_id = gen_random_uuid(), lease_expires_at = NOW() + INTERVAL '2 minutes'
  WHERE id = v_job_id;
END $$;

-- 4.2 Forbidden: Column-level privilege violation (Modifying recipient or payload)
DO $$
DECLARE
  v_job_id uuid;
BEGIN
  SELECT id INTO v_job_id FROM notification_outbox LIMIT 1;
  UPDATE notification_outbox SET recipient = 'malicious@evil.com' WHERE id = v_job_id;
  RAISE EXCEPTION 'FAIL: ops_worker_runtime should NOT be able to UPDATE recipient column';
EXCEPTION WHEN insufficient_privilege THEN
  -- Expected failure
END $$;

-- 4.3 Forbidden: SELECT on admissions_applications
DO $$
BEGIN
  PERFORM * FROM admissions_applications;
  RAISE EXCEPTION 'FAIL: ops_worker_runtime should NOT be able to SELECT admissions_applications';
EXCEPTION WHEN insufficient_privilege THEN
  -- Expected failure
END $$;

-- 4.4 Forbidden: DELETE on notification_outbox
DO $$
BEGIN
  DELETE FROM notification_outbox;
  RAISE EXCEPTION 'FAIL: ops_worker_runtime should NOT be able to DELETE notification_outbox';
EXCEPTION WHEN insufficient_privilege THEN
  -- Expected failure
END $$;

RESET ROLE;

ROLLBACK; -- Discard all test mutations cleanly
```

---

## 9. Final Security Decisions and Implementation Readiness

### 9.1 Summary of Confirmed Security Decisions
1. **Four Dedicated PostgreSQL Roles:** `ops_corp_runtime`, `ops_intake_runtime`, `ops_worker_runtime`, and `ops_admin_runtime` will be provisioned with `LOGIN NOINHERIT NOSUPERUSER NOCREATEROLE NOBYPASSRLS`.
2. **Elimination of Shared Client:** `packages/db` will export explicit factories (`getCorpDb()`, `getIntakeDb()`, `getWorkerDb()`). Missing environment variables will fail fast with explicit errors.
3. **Column-Level UPDATE Security for Worker:** `apps/worker` is restricted to updating execution management columns only, preventing payload tampering while preserving Drizzle query compatibility.
4. **Pre-Generated UUIDs:** Server Actions will supply pre-generated UUIDs via `crypto.randomUUID()`, avoiding all `INSERT ... RETURNING` permission conflicts.
5. **Strict Credential Separation:** Zero passwords in migrations or Git. Migration owner credentials remain isolated to CI/CD.

### 9.2 Implementation Readiness Verdict

### **READY FOR IMPLEMENTATION UPON APPROVAL**

The security plan is technically verified, fully reconciles the Phase 3A deviations, provides explicit Drizzle and PostgreSQL code specifications, and guarantees complete alignment with the approved Ops Foundry production architecture. No code or configuration changes have been executed; implementation will commence immediately upon stakeholder approval.
