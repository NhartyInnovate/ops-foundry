-- =============================================================================
-- OPS FOUNDRY DATABASE SECURITY VERIFICATION TEST SUITE
-- Executes inside an uncommitted transaction block (BEGIN ... ROLLBACK)
-- to verify role attributes, zero membership inheritance, schema privileges,
-- table/column grants, RLS WITH CHECK / USING enforcement, and outbox leases.
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- TEST 1: VERIFY ROLE SECURITY ATTRIBUTES, MEMBERSHIPS, SCHEMA & RLS FLAGS
-- -----------------------------------------------------------------------------
DO $$
DECLARE
  v_role text;
BEGIN
  FOREACH v_role IN ARRAY ARRAY[
    'ops_corp_runtime',
    'ops_intake_runtime',
    'ops_worker_runtime',
    'ops_admin_runtime'
  ]
  LOOP
    -- 1.1 Role security attributes
    ASSERT (
      SELECT rolcanlogin
         AND NOT rolinherit
         AND NOT rolsuper
         AND NOT rolcreatedb
         AND NOT rolcreaterole
         AND NOT rolbypassrls
         AND NOT rolreplication
      FROM pg_catalog.pg_roles
      WHERE rolname = v_role
    ), format('SECURITY FAULT: %s has invalid role security attributes', v_role);

    -- 1.2 Zero inherited role memberships
    ASSERT NOT EXISTS (
      SELECT 1
      FROM pg_catalog.pg_auth_members m
      JOIN pg_catalog.pg_roles r ON m.member = r.oid
      WHERE r.rolname = v_role
    ), format('SECURITY FAULT: %s is a member of another role', v_role);

    -- 1.3 Schema privileges: USAGE granted, CREATE denied
    ASSERT has_schema_privilege(v_role, 'public', 'USAGE'),
      format('SECURITY FAULT: %s lacks USAGE on schema public', v_role);
    ASSERT NOT has_schema_privilege(v_role, 'public', 'CREATE'),
      format('SECURITY FAULT: %s must NOT have CREATE on schema public', v_role);
  END LOOP;

  -- 1.4 PUBLIC has zero schema privileges on public
  ASSERT NOT has_schema_privilege('public', 'public', 'USAGE'),
    'SECURITY FAULT: PUBLIC still holds USAGE on schema public';
  ASSERT NOT has_schema_privilege('public', 'public', 'CREATE'),
    'SECURITY FAULT: PUBLIC still holds CREATE on schema public';

  -- 1.5 RLS and FORCE RLS enabled on all 4 tables
  ASSERT (
    SELECT COUNT(*) = 4
    FROM pg_catalog.pg_class c
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname IN (
        'corporate_inquiries',
        'admissions_applications',
        'admissions_status_history',
        'notification_outbox'
      )
      AND c.relrowsecurity = true
      AND c.relforcerowsecurity = true
  ), 'SECURITY FAULT: Not all 4 tables have ENABLE + FORCE ROW LEVEL SECURITY';

  RAISE NOTICE 'SUCCESS: Test 1 Passed - Role attributes, zero memberships, schema privileges, and FORCE RLS verified';
END $$;

-- -----------------------------------------------------------------------------
-- TEST 2: CORPORATE RUNTIME (ops_corp_runtime)
-- -----------------------------------------------------------------------------
SET ROLE ops_corp_runtime;

-- 2.1 Permitted: Atomic insert of inquiry + notification outbox (pure INSERT, no RETURNING id)
INSERT INTO corporate_inquiries (id, full_name, email, organization, idempotency_key)
VALUES (gen_random_uuid(), 'Test Corporate Client', 'corp@test.com', 'Acme Corp', 'test-corp-idemp-01');

INSERT INTO notification_outbox (id, channel, recipient, payload)
VALUES (gen_random_uuid(), 'operational_triage_webhook', 'https://internal.opsfoundry.com/triage', '{"lead":"test"}'::jsonb);

-- 2.2 Forbidden: SELECT, UPDATE, DELETE, and INSERT...RETURNING on corporate_inquiries
DO $$
DECLARE
  v_id uuid;
BEGIN
  BEGIN
    PERFORM * FROM corporate_inquiries;
    RAISE EXCEPTION 'SECURITY FAULT: ops_corp_runtime should NOT be able to SELECT corporate_inquiries';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    UPDATE corporate_inquiries SET status = 'contacted';
    RAISE EXCEPTION 'SECURITY FAULT: ops_corp_runtime should NOT be able to UPDATE corporate_inquiries';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    DELETE FROM corporate_inquiries;
    RAISE EXCEPTION 'SECURITY FAULT: ops_corp_runtime should NOT be able to DELETE corporate_inquiries';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    INSERT INTO corporate_inquiries (id, full_name, email, organization, idempotency_key)
    VALUES (gen_random_uuid(), 'Returning Test', 'ret@test.com', 'Acme', 'test-corp-ret')
    RETURNING id INTO v_id;
    RAISE EXCEPTION 'SECURITY FAULT: ops_corp_runtime should NOT be able to execute INSERT...RETURNING';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  RAISE NOTICE 'SUCCESS: Test 2.2 Passed - SELECT, UPDATE, DELETE, and INSERT...RETURNING on corporate_inquiries denied';
END $$;

-- 2.3 Forbidden: Any access to admissions_applications or admissions_status_history
DO $$
BEGIN
  BEGIN
    PERFORM * FROM admissions_applications;
    RAISE EXCEPTION 'SECURITY FAULT: ops_corp_runtime should NOT SELECT admissions_applications';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    INSERT INTO admissions_applications (id, full_name, email, phone, course_code, idempotency_key)
    VALUES (gen_random_uuid(), 'Unauthorized', 'unauth@test.com', '+44000', 'COURSE_01', 'unauth-1');
    RAISE EXCEPTION 'SECURITY FAULT: ops_corp_runtime should NOT INSERT admissions_applications';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    PERFORM * FROM admissions_status_history;
    RAISE EXCEPTION 'SECURITY FAULT: ops_corp_runtime should NOT SELECT admissions_status_history';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  RAISE NOTICE 'SUCCESS: Test 2.3 Passed - Cross-application access to Academy tables denied';
END $$;

-- 2.4 Forbidden (RLS Enforcement): Forging inquiry status or inserting applicant_email outbox job
DO $$
BEGIN
  BEGIN
    INSERT INTO corporate_inquiries (id, full_name, email, organization, status, idempotency_key)
    VALUES (gen_random_uuid(), 'Forged Status', 'forged@test.com', 'Acme', 'contacted', 'forged-corp-1');
    RAISE EXCEPTION 'SECURITY FAULT: RLS failed to block non-submitted inquiry status';
  EXCEPTION WHEN insufficient_privilege THEN
    ASSERT SQLERRM LIKE '%row-level security policy%', 'Expected RLS policy error, got: ' || SQLERRM;
  END;

  BEGIN
    INSERT INTO notification_outbox (id, channel, recipient, payload)
    VALUES (gen_random_uuid(), 'applicant_email', 'spoof@test.com', '{}'::jsonb);
    RAISE EXCEPTION 'SECURITY FAULT: RLS failed to block ops_corp_runtime from inserting applicant_email channel';
  EXCEPTION WHEN insufficient_privilege THEN
    ASSERT SQLERRM LIKE '%row-level security policy%', 'Expected RLS policy error, got: ' || SQLERRM;
  END;

  RAISE NOTICE 'SUCCESS: Test 2.4 Passed - RLS WITH CHECK policies actively enforced for ops_corp_runtime';
END $$;

RESET ROLE;

-- -----------------------------------------------------------------------------
-- TEST 3: ACADEMY INTAKE RUNTIME (ops_intake_runtime)
-- -----------------------------------------------------------------------------
SET ROLE ops_intake_runtime;

-- 3.1 Permitted: Atomic insert of application + status history + notification outbox
DO $$
DECLARE
  v_app_id uuid := gen_random_uuid();
BEGIN
  INSERT INTO admissions_applications (id, full_name, email, phone, course_code, idempotency_key)
  VALUES (v_app_id, 'Jane Doe', 'jane@example.com', '+4412345678', 'COURSE_01', 'test-acad-idemp-01');

  INSERT INTO admissions_status_history (id, application_id, to_status)
  VALUES (gen_random_uuid(), v_app_id, 'submitted');

  INSERT INTO notification_outbox (id, channel, recipient, payload, application_id)
  VALUES (gen_random_uuid(), 'applicant_email', 'jane@example.com', '{"status":"received"}'::jsonb, v_app_id);

  RAISE NOTICE 'SUCCESS: Test 3.1 Passed - Atomic 3-table Academy intake insert succeeded';
END $$;

-- 3.2 Forbidden: SELECT, UPDATE, DELETE, and INSERT...RETURNING on admissions tables
DO $$
DECLARE
  v_id uuid;
BEGIN
  BEGIN
    PERFORM * FROM admissions_applications;
    RAISE EXCEPTION 'SECURITY FAULT: ops_intake_runtime should NOT SELECT admissions_applications';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    UPDATE admissions_applications SET status = 'approved';
    RAISE EXCEPTION 'SECURITY FAULT: ops_intake_runtime should NOT UPDATE admissions_applications';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    DELETE FROM admissions_applications;
    RAISE EXCEPTION 'SECURITY FAULT: ops_intake_runtime should NOT DELETE admissions_applications';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    INSERT INTO admissions_applications (id, full_name, email, phone, course_code, idempotency_key)
    VALUES (gen_random_uuid(), 'Ret Test', 'ret@example.com', '+44123', 'COURSE_01', 'test-acad-ret')
    RETURNING id INTO v_id;
    RAISE EXCEPTION 'SECURITY FAULT: ops_intake_runtime should NOT execute INSERT...RETURNING';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    PERFORM * FROM admissions_status_history;
    RAISE EXCEPTION 'SECURITY FAULT: ops_intake_runtime should NOT SELECT admissions_status_history';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  RAISE NOTICE 'SUCCESS: Test 3.2 Passed - Read/modify/delete on admissions tables denied';
END $$;

-- 3.3 Forbidden: Any access to corporate_inquiries
DO $$
BEGIN
  BEGIN
    PERFORM * FROM corporate_inquiries;
    RAISE EXCEPTION 'SECURITY FAULT: ops_intake_runtime should NOT SELECT corporate_inquiries';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    INSERT INTO corporate_inquiries (id, full_name, email, organization, idempotency_key)
    VALUES (gen_random_uuid(), 'Unauthorized Corp', 'u@corp.com', 'Org', 'unauth-corp-1');
    RAISE EXCEPTION 'SECURITY FAULT: ops_intake_runtime should NOT INSERT corporate_inquiries';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  RAISE NOTICE 'SUCCESS: Test 3.3 Passed - Cross-application access to corporate_inquiries denied';
END $$;

-- 3.4 Forbidden (RLS Enforcement): Pre-approved application or triage webhook channel
DO $$
BEGIN
  BEGIN
    INSERT INTO admissions_applications (id, full_name, email, phone, course_code, status, idempotency_key)
    VALUES (gen_random_uuid(), 'Forged App', 'f@example.com', '+441', 'COURSE_01', 'approved', 'forged-app-1');
    RAISE EXCEPTION 'SECURITY FAULT: RLS failed to block pre-approved application insert';
  EXCEPTION WHEN insufficient_privilege THEN
    ASSERT SQLERRM LIKE '%row-level security policy%', 'Expected RLS policy error, got: ' || SQLERRM;
  END;

  BEGIN
    INSERT INTO notification_outbox (id, channel, recipient, payload)
    VALUES (gen_random_uuid(), 'operational_triage_webhook', 'https://evil.example', '{}'::jsonb);
    RAISE EXCEPTION 'SECURITY FAULT: RLS failed to block ops_intake_runtime from inserting triage webhook';
  EXCEPTION WHEN insufficient_privilege THEN
    ASSERT SQLERRM LIKE '%row-level security policy%', 'Expected RLS policy error, got: ' || SQLERRM;
  END;

  RAISE NOTICE 'SUCCESS: Test 3.4 Passed - RLS WITH CHECK policies actively enforced for ops_intake_runtime';
END $$;

RESET ROLE;

-- -----------------------------------------------------------------------------
-- TEST 4: WORKER RUNTIME (ops_worker_runtime)
-- -----------------------------------------------------------------------------
SET ROLE ops_worker_runtime;

-- 4.1 Permitted: Worker atomic claim (with minimized RETURNING projection), heartbeat, and completion
DO $$
DECLARE
  v_claimed record;
  v_updated_id uuid;
BEGIN
  WITH eligible_jobs AS (
    SELECT id
    FROM notification_outbox
    WHERE (status = 'pending' AND scheduled_for <= NOW())
       OR (status = 'processing' AND lease_expires_at <= NOW())
    ORDER BY scheduled_for ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
  )
  UPDATE notification_outbox o
  SET status = 'processing',
      worker_id = 'worker-test-01',
      claim_id = gen_random_uuid(),
      lease_expires_at = NOW() + INTERVAL '2 minutes',
      attempts = o.attempts + 1,
      last_attempt_at = NOW(),
      updated_at = NOW()
  FROM eligible_jobs ej
  WHERE o.id = ej.id
  RETURNING o.id, o.channel, o.recipient, o.payload, o.claim_id, o.attempts, o.max_attempts
  INTO v_claimed;

  ASSERT v_claimed.id IS NOT NULL, 'FAIL: Worker failed to claim pending outbox job';
  ASSERT v_claimed.claim_id IS NOT NULL, 'FAIL: Worker claim_id was not populated';
  ASSERT v_claimed.attempts = 1, 'FAIL: Worker attempts was not incremented to 1';

  -- Heartbeat renewal
  UPDATE notification_outbox
  SET lease_expires_at = NOW() + INTERVAL '2 minutes',
      updated_at = NOW()
  WHERE id = v_claimed.id
    AND claim_id = v_claimed.claim_id
    AND status = 'processing'
    AND lease_expires_at > NOW()
  RETURNING id INTO v_updated_id;

  ASSERT v_updated_id = v_claimed.id, 'FAIL: Worker heartbeat renewal failed';

  -- Completion
  UPDATE notification_outbox
  SET status = 'completed',
      completed_at = NOW(),
      lease_expires_at = NULL,
      error_message = NULL,
      updated_at = NOW()
  WHERE id = v_claimed.id
    AND claim_id = v_claimed.claim_id
    AND status = 'processing'
  RETURNING id INTO v_updated_id;

  ASSERT v_updated_id = v_claimed.id, 'FAIL: Worker completion update failed';

  -- RLS USING check: Updating an already 'completed' job must affect 0 rows
  v_updated_id := NULL;
  UPDATE notification_outbox
  SET status = 'processing'
  WHERE id = v_claimed.id
  RETURNING id INTO v_updated_id;

  ASSERT v_updated_id IS NULL, 'SECURITY FAULT: Worker was able to re-open a completed job';

  RAISE NOTICE 'SUCCESS: Test 4.1 Passed - Worker atomic claim, heartbeat, completion, and terminal-state RLS protection verified';
END $$;

-- 4.2 Forbidden: Column-level SELECT violations (application_id, worker_id, created_at, SELECT *)
DO $$
BEGIN
  BEGIN
    PERFORM application_id FROM notification_outbox;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT SELECT application_id';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    PERFORM created_at FROM notification_outbox;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT SELECT created_at';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    PERFORM * FROM notification_outbox;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT execute unrestricted SELECT *';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  RAISE NOTICE 'SUCCESS: Test 4.2 Passed - Column-level SELECT restrictions on notification_outbox enforced';
END $$;

-- 4.3 Forbidden: Column-level UPDATE violations (recipient, payload, channel, application_id, max_attempts)
DO $$
DECLARE
  v_job_id uuid;
BEGIN
  SELECT id INTO v_job_id FROM notification_outbox WHERE status = 'pending' LIMIT 1;

  BEGIN
    UPDATE notification_outbox SET recipient = 'malicious@evil.com' WHERE id = v_job_id;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT UPDATE recipient';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    UPDATE notification_outbox SET payload = '{"hacked":true}'::jsonb WHERE id = v_job_id;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT UPDATE payload';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    UPDATE notification_outbox SET channel = 'hijacked' WHERE id = v_job_id;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT UPDATE channel';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    UPDATE notification_outbox SET application_id = NULL WHERE id = v_job_id;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT UPDATE application_id';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    UPDATE notification_outbox SET max_attempts = 999 WHERE id = v_job_id;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT UPDATE max_attempts';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  RAISE NOTICE 'SUCCESS: Test 4.3 Passed - Column-level UPDATE restrictions on notification_outbox enforced';
END $$;

-- 4.4 Forbidden: Access to admissions_applications, admissions_status_history, corporate_inquiries, and INSERT/DELETE on outbox
DO $$
BEGIN
  BEGIN
    PERFORM * FROM admissions_applications;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT SELECT admissions_applications';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    PERFORM * FROM admissions_status_history;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT SELECT admissions_status_history';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    PERFORM * FROM corporate_inquiries;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT SELECT corporate_inquiries';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    INSERT INTO notification_outbox (id, channel, recipient, payload)
    VALUES (gen_random_uuid(), 'applicant_email', 'w@test.com', '{}'::jsonb);
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT INSERT notification_outbox';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    DELETE FROM notification_outbox;
    RAISE EXCEPTION 'SECURITY FAULT: ops_worker_runtime should NOT DELETE notification_outbox';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  RAISE NOTICE 'SUCCESS: Test 4.4 Passed - Worker cross-table isolation and INSERT/DELETE denial verified';
END $$;

RESET ROLE;

-- -----------------------------------------------------------------------------
-- CLEANUP
-- -----------------------------------------------------------------------------
ROLLBACK; -- Discard all test data cleanly; leaves database in original state.
