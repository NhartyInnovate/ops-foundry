# Ops Foundry — Phase 3A.1: Database Runtime Security Implementation & Verification Report

**Implementation Date:** November 15, 2026  
**Status:** `SECURITY VERIFIED LOCALLY` (with staging Supavisor/PostgREST verification remaining before production cutover)  
**Scope:** Security verification closure audit, migration `0002_reconcile_runtime_roles.sql` hardening, Drizzle migration journal registration, scoped client factories (`getCorpDb`, `getIntakeDb`, `getWorkerDb`) with runtime role identity assertion, worker query minimisation, atomic intake transactions, SQL security suite execution, and live PostgreSQL Drizzle integration testing.

---

## 1. Files Inspected

During the Phase 3A.1 Security Verification Closure audit, the following repository files were inspected directly:

1. [0002_reconcile_runtime_roles.sql](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/migrations/0002_reconcile_runtime_roles.sql) — Runtime role creation, privilege reconciliation, column-level grants, and RLS policies.
2. [0000_parched_next_avengers.sql](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/migrations/0000_parched_next_avengers.sql) & [0001_rls_policies.sql](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/migrations/0001_rls_policies.sql) — Baseline table definitions and legacy PostgREST grants.
3. [_journal.json](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/migrations/meta/_journal.json) & [drizzle.config.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/drizzle.config.ts) — Drizzle Kit migration registry and migration connection configuration.
4. [verify_security.sql](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/tests/verify_security.sql) — SQL-level security verification test script.
5. [client.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/client.ts) — Scoped Drizzle database client factories (`getCorpDb`, `getIntakeDb`, `getWorkerDb`, `getLocalDevPrivilegedDb`).
6. [outbox.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/queries/outbox.ts) — Worker claim, heartbeat, completion, failure, retry, and lease recovery queries.
7. [inquiry.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/queries/inquiry.ts) — Corporate inquiry + outbox atomic submission transaction.
8. [admissions.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/queries/admissions.ts) — Academy application + status history + outbox atomic submission transaction.
9. [index.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/index.ts) & [schema.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/schema.ts) — Package exports and table schemas.
10. [.env.example](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/.env.example) — Environment variable template and connection string examples.
11. [DATABASE_RUNTIME_ROLE_SECURITY_PLAN.md](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/design/architecture/DATABASE_RUNTIME_ROLE_SECURITY_PLAN.md) — Approved runtime role security architecture specification.

---

## 2. Issues Discovered

### Issue 1: Why the Previous Local PostgreSQL Connection Test Failed
- **Root Cause:** Local PostgreSQL 16.15 (`C:\Users\Admin\AppData\Local\Programs\PostgreSQL\16\bin\psql.exe`) was running and listening on `127.0.0.1:5432` the entire time, with valid superuser credentials (`user=postgres`, `password=postgres`). However, the previous session executed:
  ```powershell
  cmd.exe /c "set PGPASSWORD=postgres && psql -U postgres ..."
  ```
  In `cmd.exe`, `set VAR=value &&` includes the trailing space before `&&` in the variable value, setting `PGPASSWORD` to `"postgres "` (9 characters with a trailing space) and causing `FATAL: password authentication failed for user "postgres"`. Additionally, `psql.exe` was not on the default system `PATH`.

### Issue 2: Unconditional `REVOKE ... FROM anon, authenticated, service_role` Failed on Standalone PostgreSQL
- **Root Cause:** In [0002_reconcile_runtime_roles.sql](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/migrations/0002_reconcile_runtime_roles.sql), `REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC, anon, authenticated, service_role;` was written unconditionally. On standalone/local PostgreSQL instances where Supabase's built-in PostgREST roles (`anon`, `authenticated`, `service_role`) do not exist by default, the migration aborted at line 13 with `ERROR: role "anon" does not exist`.

### Issue 3: Missing Drizzle Journal Entry & Migration URL Resolution
- **Root Cause:** [packages/db/migrations/meta/_journal.json](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/migrations/meta/_journal.json) only contained entry `idx: 0` (`0000_parched_next_avengers`). Running `pnpm --filter @opsfoundry/db migrate` (`drizzle-kit migrate`) skipped `0002_reconcile_runtime_roles.sql` completely. Furthermore, [drizzle.config.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/drizzle.config.ts) read `process.env.DATABASE_URL!` instead of prioritizing `process.env.MIGRATION_DATABASE_URL`.

### Issue 4: Missing Explicit `ALTER ROLE` Enforcement & Group Membership Cleanup on Existing Roles
- **Root Cause:** The `DO $$` block in `0002_reconcile_runtime_roles.sql` only applied `LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS` inside `CREATE ROLE` when a role did not exist. If a role already existed with `INHERIT`, `BYPASSRLS`, or an inherited role membership in `pg_auth_members`, re-running the migration did not remediate those flags or revoke memberships, nor did it explicitly enforce `NOREPLICATION`.

### Issue 5: Permissive `WITH CHECK (true)` RLS Policies Instead of Active Row-Level Invariants
- **Root Cause:** All RLS policies in `0002_reconcile_runtime_roles.sql` used `USING (true)` and `WITH CHECK (true)`. While table/column grants restricted what tables and columns each runtime role could touch, RLS was not enforcing row-level state invariants (such as preventing `ops_corp_runtime` from inserting `applicant_email` jobs into `notification_outbox`, preventing `ops_intake_runtime` from inserting rows with pre-populated `admin_notes` or `status = 'accepted'`, or preventing `ops_worker_runtime` from mutating rows already in `completed` or `dead_letter` states).

### Issue 6: Client Factories Did Not Validate Connection String Username / Runtime Role Identity
- **Root Cause:** [client.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/client.ts) checked that `CORP_DATABASE_URL`, `ACADEMY_DATABASE_URL`, and `WORKER_DATABASE_URL` were non-empty strings, but did not inspect the connection URI username. A misconfigured deployment passing `postgresql://postgres:...` or `postgresql://service_role:...` to `CORP_DATABASE_URL` would have been accepted silently at runtime, bypassing RLS.

### Issue 7: Minor Specification Drift in `DATABASE_RUNTIME_ROLE_SECURITY_PLAN.md`
- **Root Cause:** Section 4.1 of [DATABASE_RUNTIME_ROLE_SECURITY_PLAN.md](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/design/architecture/DATABASE_RUNTIME_ROLE_SECURITY_PLAN.md) still stated *"Table-level SELECT is granted on `notification_outbox` because PostgreSQL's `FOR UPDATE` locking clause and `RETURNING` projections interact cleanly with table-level SELECT"*, contradicting Section 3.3 and the actual column-level `GRANT SELECT (10 columns)` in `0002_reconcile_runtime_roles.sql`.

---

## 3. Corrections Made

1. **[0002_reconcile_runtime_roles.sql](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/migrations/0002_reconcile_runtime_roles.sql):**
   - Wrapped `REVOKE ALL` and `ALTER DEFAULT PRIVILEGES ... REVOKE ALL` for `anon`, `authenticated`, and `service_role` in a conditional `DO $$` block checking `pg_catalog.pg_roles`, ensuring idempotent execution on both standalone PostgreSQL 16 and Supabase PostgreSQL clusters.
   - Added explicit `REVOKE ALL ON ALL SEQUENCES IN SCHEMA public` and `REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public` from `PUBLIC` (and Supabase roles when present), plus `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM PUBLIC`.
   - Added unconditional `ALTER ROLE <role> WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS NOREPLICATION` and dynamic revocation of any existing group memberships in `pg_catalog.pg_auth_members` for all 4 runtime roles.
   - Replaced `WITH CHECK (true)` / `USING (true)` RLS policies with active row-level security predicates:
     - `corp_runtime_insert` on `corporate_inquiries`: `WITH CHECK (status = 'submitted')`
     - `corp_outbox_insert` on `notification_outbox`: `WITH CHECK (channel = 'operational_triage_webhook' AND status = 'pending' AND application_id IS NULL AND claim_id IS NULL AND worker_id IS NULL AND attempts = 0)`
     - `intake_runtime_insert` on `admissions_applications`: `WITH CHECK (status = 'submitted' AND admin_notes IS NULL AND status_updated_at IS NULL AND status_updated_by IS NULL)`
     - `intake_runtime_history_insert` on `admissions_status_history`: `WITH CHECK (from_status IS NULL AND to_status = 'submitted' AND changed_by IS NULL)`
     - `intake_outbox_insert` on `notification_outbox`: `WITH CHECK (channel = 'applicant_email' AND status = 'pending' AND application_id IS NOT NULL AND claim_id IS NULL AND worker_id IS NULL AND attempts = 0)`
     - `worker_outbox_select` on `notification_outbox`: `USING (true)` (combined with column-level `SELECT` grant; visibility across states is required so conditional `UPDATE ... WHERE id = $1 AND claim_id = $2` can verify row existence and apply its `WITH CHECK` constraint).
     - `worker_outbox_update` on `notification_outbox`: `USING (status IN ('pending', 'processing')) WITH CHECK (status IN ('processing', 'completed', 'pending', 'failed', 'dead_letter') AND attempts >= 1)`
2. **[drizzle.config.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/drizzle.config.ts) & [_journal.json](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/migrations/meta/_journal.json):**
   - Updated `drizzle.config.ts` to use `process.env.MIGRATION_DATABASE_URL ?? process.env.DATABASE_URL!`.
   - Registered `0002_reconcile_runtime_roles` (`idx: 1`) in `packages/db/migrations/meta/_journal.json` so `drizzle-kit migrate` applies both `0000` and `0002` deterministically.
3. **[client.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/client.ts):**
   - Added `assertExpectedRoleInUrl(connectionString, expectedRole, envVarName)` to `getCorpDb()`, `getIntakeDb()`, and `getWorkerDb()`. Each factory now parses the PostgreSQL URI and verifies that the username equals `<expectedRole>` (direct connection) or `<expectedRole>.<project-ref>` (Supabase Supavisor pooler format), throwing immediately if `postgres`, `service_role`, `anon`, or the wrong runtime role is passed.
4. **[DATABASE_RUNTIME_ROLE_SECURITY_PLAN.md](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/design/architecture/DATABASE_RUNTIME_ROLE_SECURITY_PLAN.md):**
   - Updated Sections 4.1 and 4.2 to accurately document the column-level `SELECT` grant (10 columns) and minimized 7-column `RETURNING` projection on `notification_outbox`.
5. **[verify_security.sql](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/tests/verify_security.sql), [client_isolation.test.mjs](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/tests/client_isolation.test.mjs), and [runtime_integration.test.mjs](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/tests/runtime_integration.test.mjs):**
   - Expanded `verify_security.sql` to assert all role attributes, zero `pg_auth_members` memberships, `PUBLIC` schema revocation, `FORCE ROW LEVEL SECURITY` catalog flags, `INSERT ... RETURNING` denial, `UPDATE`/`DELETE` denial, RLS `WITH CHECK` policy enforcement, terminal-state RLS `USING` protection, and column-level `SELECT`/`UPDATE` enforcement.
   - Created `runtime_integration.test.mjs` (`pnpm --filter @opsfoundry/db test:integration`) to execute real Drizzle queries (`submitCorporateInquiryWithOutbox`, `submitApplicationWithOutbox`, `claimOutboxJobs`, `heartbeatOutboxJob`, `completeOutboxJob`, `failOutboxJob`) over live PostgreSQL connections authenticated as `ops_corp_runtime`, `ops_intake_runtime`, and `ops_worker_runtime`.

---

## 4. Database Role and Permission Verification

### 4.1 Role Attributes & Zero Group Membership (`pg_roles` & `pg_auth_members`)
Verified via `psql` against PostgreSQL 16.15 (`opsfoundry` database):

| Role Name | `rolcanlogin` | `rolinherit` | `rolsuper` | `rolcreatedb` | `rolcreaterole` | `rolbypassrls` | `rolreplication` | Group Memberships (`pg_auth_members`) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `ops_corp_runtime` | `true` | `false` (`NOINHERIT`) | `false` | `false` | `false` | `false` (`NOBYPASSRLS`) | `false` | `0` |
| `ops_intake_runtime` | `true` | `false` (`NOINHERIT`) | `false` | `false` | `false` | `false` (`NOBYPASSRLS`) | `false` | `0` |
| `ops_worker_runtime` | `true` | `false` (`NOINHERIT`) | `false` | `false` | `false` | `false` (`NOBYPASSRLS`) | `false` | `0` |
| `ops_admin_runtime` | `true` | `false` (`NOINHERIT`) | `false` | `false` | `false` | `false` (`NOBYPASSRLS`) | `false` | `0` |

### 4.2 Schema Privileges (`public`)
- `PUBLIC`: `USAGE` and `CREATE` revoked (`has_schema_privilege('public', 'public', 'CREATE') = false`).
- `ops_corp_runtime`, `ops_intake_runtime`, `ops_worker_runtime`, `ops_admin_runtime`: `USAGE = true`, `CREATE = false`.

### 4.3 Default Privileges (`ALTER DEFAULT PRIVILEGES`)
- `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM PUBLIC;`
- `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM PUBLIC;`
- `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM PUBLIC;`
- When `anon`, `authenticated`, or `service_role` exist (as on Supabase where `postgres` is the default migration owner and has pre-configured default ACLs granting `ALL` on new tables in `public` to those roles), the `DO $$` block in `0002_reconcile_runtime_roles.sql` explicitly revokes default privileges on `TABLES`, `SEQUENCES`, and `FUNCTIONS` from those roles for the current migration owner (`postgres`). Any future tables created by the migration owner in `public` will NOT automatically grant privileges to `PUBLIC`, `anon`, `authenticated`, or `service_role`.

### 4.4 Why Revoking `service_role` Privileges is Safe and Necessary
- **Supabase `service_role` Mechanics:** In Supabase PostgreSQL, `service_role` is configured with `rolbypassrls = true` (`BYPASSRLS`), which bypasses even `FORCE ROW LEVEL SECURITY`. However, `service_role` is **not** a PostgreSQL superuser (`rolsuper = false`), meaning it still requires explicit PostgreSQL `GRANT` privileges on tables in `public` to read or write data.
- **Security Impact of Revocation:** Leaving `GRANT ALL` on `service_role` (which `0001_rls_policies.sql` previously granted) means that any caller possessing `SUPABASE_SERVICE_ROLE_KEY` can query or mutate every row in `public.*` via Supabase's public PostgREST HTTP Data API (`/rest/v1/*`), completely bypassing RLS. Revoking table, sequence, and function privileges (and default privileges) from `anon`, `authenticated`, and `service_role` closes the PostgREST HTTP Data API attack surface across all four application tables.
- **Operational Impact on Supabase:**
  - **Drizzle Application Runtimes (`apps/corporate`, `apps/academy`, `apps/worker`):** Zero impact. All runtimes connect directly to PostgreSQL / Supavisor via `postgres.js` using their dedicated PostgreSQL roles (`ops_corp_runtime`, `ops_intake_runtime`, `ops_worker_runtime`).
  - **Supabase Dashboard Table Editor / SQL Editor:** The Supabase Dashboard and SQL Editor execute queries as the `postgres` administrative role (not `service_role`), so administrative inspection and migrations remain unaffected.
  - **Supabase Auth (`auth` schema) & Storage (`storage` schema):** Revocations are scoped strictly to `SCHEMA public`. Supabase Auth (`auth.*`) and Storage (`storage.*`) schemas are untouched, so Phase 4 Admin authentication via Supabase Auth continues to function normally.
  - **Verified via Simulated Role Test:** Created temporary roles `anon`, `authenticated`, and `service_role` on the local `opsfoundry` database, re-ran `0002_reconcile_runtime_roles.sql`, and verified via `has_table_privilege` that `SELECT` and `INSERT` returned `false` (`f`) across all 12 role × table combinations before dropping the simulated roles.

### 4.5 Table & Column-Level Privilege Matrix Verified
- **`ops_corp_runtime`:**
  - `corporate_inquiries`: Table-level `INSERT` only (`SELECT`, `UPDATE`, `DELETE` denied; `INSERT ... RETURNING` denied).
  - `notification_outbox`: Table-level `INSERT` only (`SELECT`, `UPDATE`, `DELETE` denied; `INSERT ... RETURNING` denied).
  - `admissions_applications` & `admissions_status_history`: Zero privileges (`INSERT`, `SELECT`, `UPDATE`, `DELETE` denied).
- **`ops_intake_runtime`:**
  - `admissions_applications`, `admissions_status_history`, `notification_outbox`: Table-level `INSERT` only (`SELECT`, `UPDATE`, `DELETE` denied; `INSERT ... RETURNING` denied).
  - `corporate_inquiries`: Zero privileges (`INSERT`, `SELECT`, `UPDATE`, `DELETE` denied).
- **`ops_worker_runtime`:**
  - `notification_outbox` `SELECT` granted **only** on 10 columns: `id`, `channel`, `recipient`, `payload`, `claim_id`, `attempts`, `max_attempts`, `status`, `scheduled_for`, `lease_expires_at`. Selecting `application_id`, `worker_id`, `error_message`, `last_attempt_at`, `created_at`, `updated_at`, or `completed_at` raises `permission denied for table notification_outbox` (SQLSTATE `42501`).
  - `notification_outbox` `UPDATE` granted **only** on 10 columns: `status`, `worker_id`, `claim_id`, `lease_expires_at`, `attempts`, `last_attempt_at`, `scheduled_for`, `error_message`, `completed_at`, `updated_at`. Updating immutable columns (`id`, `channel`, `recipient`, `payload`, `application_id`, `max_attempts`, `created_at`) raises `permission denied for table notification_outbox` (SQLSTATE `42501`).
  - `notification_outbox` `INSERT` and `DELETE`: Denied.
  - `corporate_inquiries`, `admissions_applications`, `admissions_status_history`: Zero privileges (`SELECT`, `INSERT`, `UPDATE`, `DELETE` denied).

---

## 5. RLS Verification

Verified in `pg_catalog.pg_class` and `pg_catalog.pg_policies`:

1. **`ENABLE` + `FORCE ROW LEVEL SECURITY`:**
   - All 4 tables (`corporate_inquiries`, `admissions_applications`, `admissions_status_history`, `notification_outbox`) have `relrowsecurity = true` and `relforcerowsecurity = true`.
2. **Active Policy Predicates Verified:**
   - `ops_corp_runtime`:
     - Attempting to insert into `corporate_inquiries` with `status = 'qualified'` fails with `new row violates row-level security policy for table "corporate_inquiries"`.
     - Attempting to insert into `notification_outbox` with `channel = 'applicant_email'` or a non-null `application_id` fails with `new row violates row-level security policy for table "notification_outbox"`.
   - `ops_intake_runtime`:
     - Attempting to insert into `admissions_applications` with `status = 'accepted'` or non-null `admin_notes` fails with `new row violates row-level security policy for table "admissions_applications"`.
     - Attempting to insert into `notification_outbox` with `channel = 'operational_triage_webhook'` or `application_id IS NULL` fails with `new row violates row-level security policy for table "notification_outbox"`.
   - `ops_worker_runtime`:
     - Attempting to update a `notification_outbox` row whose status is already `completed` or `dead_letter` affects `0 rows` because the `USING (status IN ('pending', 'processing'))` predicate filters out terminal rows.
     - Attempting to reset `attempts = 0` on an active job fails with `new row violates row-level security policy for table "notification_outbox"` (`WITH CHECK (... AND attempts >= 1)`).

---

## 6. Actual Query Verification

Inspected and executed the actual TypeScript query functions in `packages/db/src/queries/` against local PostgreSQL 16.15 using their respective runtime roles:

1. **Corporate Intake ([inquiry.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/queries/inquiry.ts) — `submitCorporateInquiryWithOutbox`):**
   - Uses `getCorpDb()` (`ops_corp_runtime`).
   - Generates `inquiryId` and `outboxId` in Node.js via `crypto.randomUUID()`.
   - Executes a single `db.transaction` inserting into `corporate_inquiries` and `notification_outbox` (`channel: 'operational_triage_webhook'`) with **no `.returning()` clause**.
   - **Live Execution Result:** Committed atomically and returned `{ inquiryId, outboxId }` without requiring `SELECT` privileges.
2. **Academy Admissions Intake ([admissions.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/queries/admissions.ts) — `submitApplicationWithOutbox`):**
   - Uses `getIntakeDb()` (`ops_intake_runtime`).
   - Generates `applicationId`, `historyId`, and `outboxId` in Node.js via `crypto.randomUUID()`.
   - Executes a single `db.transaction` inserting into `admissions_applications`, `admissions_status_history` (`fromStatus: null, toStatus: 'submitted'`), and `notification_outbox` (`channel: 'applicant_email'`) with **no `.returning()` clause**.
   - **Live Execution Result:** Committed atomically across all 3 tables and returned `{ applicationId, outboxId }` without requiring `SELECT` privileges.
   - **Minimized Payload Verification:** Confirmed that the `notification_outbox.payload` written by `submitApplicationWithOutbox` contains only `{ applicantName, cohortApplied, trackPreference, submittedAt }` — sensitive PII (`phone`, `location`, `motivationStatement`, `experienceSummary`, `linkedinUrl`, `portfolioUrl`) is excluded from the outbox payload.
3. **Worker Outbox Processing ([outbox.ts](file:///c:/Users/Admin/Desktop/My%20Projects/Ops%20Foundry/packages/db/src/queries/outbox.ts)):**
   - Uses `getWorkerDb()` (`ops_worker_runtime`).
   - `claimOutboxJobs(workerId, batchSize, leaseDurationMs)`:
     - CTE `eligible_jobs` selects `id` from `notification_outbox` where `(status = 'pending' AND scheduled_for <= NOW()) OR (status = 'processing' AND lease_expires_at <= NOW())` with `FOR UPDATE SKIP LOCKED`.
     - Updates `status = 'processing'`, `worker_id`, `claim_id = gen_random_uuid()`, `lease_expires_at`, `attempts = attempts + 1`, `last_attempt_at = NOW()`, `updated_at = NOW()`.
     - Projects **only** `RETURNING o.id, o.channel, o.recipient, o.payload, o.claim_id, o.attempts, o.max_attempts`.
     - Every column read (`id`, `status`, `scheduled_for`, `lease_expires_at`, `attempts`, `channel`, `recipient`, `payload`, `claim_id`, `max_attempts`) is in the 10-column `SELECT` grant; every column mutated (`status`, `worker_id`, `claim_id`, `lease_expires_at`, `attempts`, `last_attempt_at`, `updated_at`) is in the 10-column `UPDATE` grant.
   - `heartbeatOutboxJob(jobId, claimId, leaseDurationMs)`: Updates `lease_expires_at` and `updated_at` fenced by `WHERE id = $1 AND status = 'processing' AND claim_id = $2` using `.returning({ id: notificationOutbox.id })`.
   - `completeOutboxJob(jobId, claimId)`: Updates `status = 'completed'`, `completed_at`, `lease_expires_at = null`, `updated_at` fenced by `WHERE id = $1 AND status = 'processing' AND claim_id = $2` using `.returning({ id: notificationOutbox.id })`.
   - `failOutboxJob(jobId, claimId, errorMessage, currentAttempts, maxAttempts)`: Transitions to `'pending'` (with exponential backoff `scheduled_for`) when `currentAttempts < maxAttempts`, or `'dead_letter'` when `currentAttempts >= maxAttempts`, fenced by `claim_id`.
   - **Live Execution Result:** All 4 functions + expired lease recovery executed cleanly under `ops_worker_runtime`.

---

## 7. Tests Executed and Their Results

### 7.1 Drizzle Migration Application (`drizzle-kit migrate`)
- **Command:** `pnpm.cmd --filter @opsfoundry/db migrate` against local PostgreSQL 16.15 (`postgresql://postgres:postgres@localhost:5432/opsfoundry`)
- **Result:** **PASSED (Exit Code 0)** — Both `0000_parched_next_avengers.sql` and `0002_reconcile_runtime_roles.sql` applied cleanly.

### 7.2 SQL Security Verification Suite (`verify_security.sql`)
- **Command:**
  ```powershell
  psql -h localhost -p 5432 -U postgres -d opsfoundry -v ON_ERROR_STOP=1 -f packages/db/tests/verify_security.sql
  ```
- **Result:** **PASSED (Exit Code 0)** inside a transactional `BEGIN ... ROLLBACK` block:
  - `NOTICE: SUCCESS: Test 1 Passed - Role attributes, zero memberships, schema privileges, and FORCE RLS verified`
  - `NOTICE: SUCCESS: Test 2.2 Passed - SELECT, UPDATE, DELETE, and INSERT...RETURNING on corporate_inquiries denied`
  - `NOTICE: SUCCESS: Test 2.3 Passed - Cross-application access to Academy tables denied`
  - `NOTICE: SUCCESS: Test 2.4 Passed - RLS WITH CHECK policies actively enforced for ops_corp_runtime`
  - `NOTICE: SUCCESS: Test 3.1 Passed - Atomic 3-table Academy intake insert succeeded`
  - `NOTICE: SUCCESS: Test 3.2 Passed - Read/modify/delete on admissions tables denied`
  - `NOTICE: SUCCESS: Test 3.3 Passed - Cross-application access to corporate_inquiries denied`
  - `NOTICE: SUCCESS: Test 3.4 Passed - RLS WITH CHECK policies actively enforced for ops_intake_runtime`
  - `NOTICE: SUCCESS: Test 4.1 Passed - Worker atomic claim, heartbeat, completion, and terminal-state RLS protection verified`
  - `NOTICE: SUCCESS: Test 4.2 Passed - Column-level SELECT restrictions on notification_outbox enforced`
  - `NOTICE: SUCCESS: Test 4.3 Passed - Column-level UPDATE restrictions on notification_outbox enforced`
  - `NOTICE: SUCCESS: Test 4.4 Passed - Worker cross-table isolation and INSERT/DELETE denial verified`

### 7.3 Client Factory Isolation Unit Tests (`client_isolation.test.mjs`)
- **Command:** `pnpm.cmd --filter @opsfoundry/db test`
- **Result:** **PASSED (Exit Code 0 — 6/6 tests passed):**
  - Test 1: `getCorpDb()` throws when `CORP_DATABASE_URL` is missing.
  - Test 2: `getIntakeDb()` throws when `ACADEMY_DATABASE_URL` is missing.
  - Test 3: `getWorkerDb()` throws when `WORKER_DATABASE_URL` is missing.
  - Test 4: `getLocalDevPrivilegedDb()` is blocked in `NODE_ENV=production` even if `ALLOW_INSECURE_DEV_SHARED_DB=true`.
  - Test 5: Scoped client factories reject connection strings using `postgres`, `service_role`, or mismatched runtime roles (and accept both direct `<role>` and Supavisor `<role>.<project-ref>` usernames).
  - Test 6: Scoped client factories instantiate isolated client instances for valid runtime role URLs.

### 7.4 Live PostgreSQL Drizzle Runtime Integration Tests (`runtime_integration.test.mjs`)
- **Command:** `pnpm.cmd --filter @opsfoundry/db test:integration`
- **Result:** **PASSED (Exit Code 0 — 8/8 integration suites passed):**
  - Suite 1: `submitCorporateInquiryWithOutbox` succeeds as `ops_corp_runtime` without `RETURNING`.
  - Suite 2: `ops_corp_runtime` is denied `SELECT`/`UPDATE`/`DELETE` on `corporate_inquiries` and denied all access to Academy tables.
  - Suite 3: `submitApplicationWithOutbox` succeeds atomically across all 3 tables as `ops_intake_runtime` without `RETURNING` and writes a minimized PII payload.
  - Suite 4: `ops_intake_runtime` is denied `SELECT` on `admissions_applications` and denied `INSERT` on `corporate_inquiries`.
  - Suite 5: `claimOutboxJobs` claims both pending jobs as `ops_worker_runtime`, returns only the 7 permitted fields, and `heartbeatOutboxJob` + `completeOutboxJob` succeed while stale `claim_id` updates are fenced out.
  - Suite 6: `failOutboxJob` reschedules transient failures with backoff, recovers expired leases (`lease_expires_at <= NOW()`), and transitions exhausted jobs (`attempts >= max_attempts`) to `dead_letter`.
  - Suite 7: `ops_worker_runtime` is denied `SELECT` on `admissions_applications` & `corporate_inquiries`, denied `SELECT` on `notification_outbox.application_id`, and denied `UPDATE` on `notification_outbox.recipient`.
  - Suite 8: All temporary test data cleaned up via `postgres` administrative teardown.

### 7.5 Monorepo Build & Typecheck
- **Commands:** `pnpm.cmd build` and `pnpm.cmd typecheck`
- **Result:** **PASSED (Exit Code 0)** — 7/7 build tasks succeeded; 11/11 typecheck tasks succeeded with zero errors.

---

## 8. Tests Not Executed and Why

1. **Live Supabase Staging Cluster / Supavisor Pooler (Port 6543) End-to-End Connection Test:**
   - **Why Not Executed:** No remote Supabase staging project or cloud credentials exist in this local environment (and provisioning cloud infrastructure or real credentials is out of scope for Phase 3A.1).
   - **What Was Verified Locally Instead:** All SQL migrations, role attributes, RLS policies, column grants, and Drizzle queries were executed against local PostgreSQL 16.15 (`localhost:5432`), and Supavisor username parsing (`<role>.<project-ref>`) was verified in `client_isolation.test.mjs`.
2. **Live PostgREST HTTP Data API (`/rest/v1/*`) Rejection Test:**
   - **Why Not Executed:** Local PostgreSQL 16.15 does not run a PostgREST HTTP container.
   - **What Was Verified Locally Instead:** Verified at the PostgreSQL catalog level (`has_table_privilege`) that `anon`, `authenticated`, and `service_role` hold `false` (`f`) for `SELECT` and `INSERT` across all 4 tables after running `0002_reconcile_runtime_roles.sql`.

---

## 9. Remaining Staging Requirements

When provisioning the staging and production Supabase environments (Phase 4 / Deployment):

1. **Apply Migrations via `MIGRATION_DATABASE_URL`:**
   - Run `pnpm --filter @opsfoundry/db migrate` using the `postgres` administrative connection string (`MIGRATION_DATABASE_URL`).
2. **Provision Out-of-Band Role Passwords:**
   - Assign strong, unique 32-byte passwords to the custom runtime roles in the Supabase SQL Editor (never in committed SQL files):
     ```sql
     ALTER ROLE ops_corp_runtime WITH PASSWORD '<unique-corp-secret>';
     ALTER ROLE ops_intake_runtime WITH PASSWORD '<unique-intake-secret>';
     ALTER ROLE ops_worker_runtime WITH PASSWORD '<unique-worker-secret>';
     ```
3. **Configure Scoped Environment Variables Per Deployment Target:**
   - `apps/corporate` deployment: Set `CORP_DATABASE_URL="postgresql://ops_corp_runtime.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"` (do not set `ACADEMY_DATABASE_URL`, `WORKER_DATABASE_URL`, or `SUPABASE_SERVICE_ROLE_KEY`).
   - `apps/academy` deployment: Set `ACADEMY_DATABASE_URL="postgresql://ops_intake_runtime.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"`.
   - `apps/worker` deployment: Set `WORKER_DATABASE_URL="postgresql://ops_worker_runtime.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"`.
4. **Run `verify_security.sql` Against Staging:**
   - Execute `psql "$MIGRATION_DATABASE_URL" -v ON_ERROR_STOP=1 -f packages/db/tests/verify_security.sql` against the staging database to confirm role attributes, RLS policies, and `anon`/`authenticated`/`service_role` revocation on the live Supabase cluster.

---

### Final Status
`SECURITY VERIFIED LOCALLY`
