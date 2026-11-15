import assert from 'node:assert';
import { getCorpDb, getIntakeDb, getWorkerDb, getLocalDevPrivilegedDb } from '../dist/index.js';

console.log('--- RUNNING DATABASE CLIENT FACTORY ISOLATION UNIT TESTS ---');

// Test 1: getCorpDb throws if CORP_DATABASE_URL is missing
delete process.env.CORP_DATABASE_URL;
assert.throws(
  () => getCorpDb(),
  /CORP_DATABASE_URL is not defined/,
  'FAIL: getCorpDb() should throw when CORP_DATABASE_URL is absent'
);
console.log('✓ Test 1 Passed: getCorpDb() throws when CORP_DATABASE_URL is absent');

// Test 2: getIntakeDb throws if ACADEMY_DATABASE_URL is missing
delete process.env.ACADEMY_DATABASE_URL;
assert.throws(
  () => getIntakeDb(),
  /ACADEMY_DATABASE_URL is not defined/,
  'FAIL: getIntakeDb() should throw when ACADEMY_DATABASE_URL is absent'
);
console.log('✓ Test 2 Passed: getIntakeDb() throws when ACADEMY_DATABASE_URL is absent');

// Test 3: getWorkerDb throws if WORKER_DATABASE_URL is missing
delete process.env.WORKER_DATABASE_URL;
assert.throws(
  () => getWorkerDb(),
  /WORKER_DATABASE_URL is not defined/,
  'FAIL: getWorkerDb() should throw when WORKER_DATABASE_URL is absent'
);
console.log('✓ Test 3 Passed: getWorkerDb() throws when WORKER_DATABASE_URL is absent');

// Test 4: Rejects privileged or mismatched role credentials (postgres, service_role, cross-role)
process.env.CORP_DATABASE_URL = 'postgresql://postgres:secret@localhost:5432/opsfoundry';
assert.throws(
  () => getCorpDb(),
  /CORP_DATABASE_URL must authenticate as "ops_corp_runtime"/,
  'FAIL: getCorpDb() must reject postgres superuser URL'
);

process.env.ACADEMY_DATABASE_URL = 'postgresql://service_role.proj123:secret@localhost:6543/postgres';
assert.throws(
  () => getIntakeDb(),
  /ACADEMY_DATABASE_URL must authenticate as "ops_intake_runtime"/,
  'FAIL: getIntakeDb() must reject service_role URL'
);

process.env.WORKER_DATABASE_URL = 'postgresql://ops_corp_runtime:secret@localhost:5432/opsfoundry';
assert.throws(
  () => getWorkerDb(),
  /WORKER_DATABASE_URL must authenticate as "ops_worker_runtime"/,
  'FAIL: getWorkerDb() must reject cross-role URL'
);
console.log('✓ Test 4 Passed: Client factories reject postgres, service_role, and mismatched runtime identities');

// Test 5: getLocalDevPrivilegedDb throws in production mode and without explicit opt-in
process.env.NODE_ENV = 'production';
process.env.ALLOW_INSECURE_DEV_SHARED_DB = 'true';
assert.throws(
  () => getLocalDevPrivilegedDb(),
  /SECURITY VIOLATION.*cannot be called in production mode/,
  'FAIL: getLocalDevPrivilegedDb() must throw in production'
);

process.env.NODE_ENV = 'development';
process.env.ALLOW_INSECURE_DEV_SHARED_DB = 'false';
assert.throws(
  () => getLocalDevPrivilegedDb(),
  /DEVELOPER OPT-IN REQUIRED/,
  'FAIL: getLocalDevPrivilegedDb() must throw when ALLOW_INSECURE_DEV_SHARED_DB !== true'
);
console.log('✓ Test 5 Passed: getLocalDevPrivilegedDb() strictly blocked in production and without opt-in');

// Test 6: Scoped instances initialise for both direct PostgreSQL and Supavisor (<role>.<project-ref>) URLs
process.env.CORP_DATABASE_URL = 'postgresql://ops_corp_runtime:dummy_corp_pass@localhost:5432/opsfoundry';
process.env.ACADEMY_DATABASE_URL = 'postgresql://ops_intake_runtime.projref:dummy_intake_pass@localhost:6543/postgres?pgbouncer=true';
process.env.WORKER_DATABASE_URL = 'postgresql://ops_worker_runtime:dummy_worker_pass@localhost:5432/opsfoundry';

const corpClient = getCorpDb();
const intakeClient = getIntakeDb();
const workerClient = getWorkerDb();

assert.ok(corpClient, 'Corporate client must be created');
assert.ok(intakeClient, 'Intake client must be created');
assert.ok(workerClient, 'Worker client must be created');
assert.notStrictEqual(corpClient, intakeClient, 'Corporate and Intake clients must be distinct instances');
assert.notStrictEqual(corpClient, workerClient, 'Corporate and Worker clients must be distinct instances');
assert.notStrictEqual(intakeClient, workerClient, 'Intake and Worker clients must be distinct instances');
console.log('✓ Test 6 Passed: Scoped client factories instantiate distinct client pools for direct and Supavisor URLs');

console.log('--- ALL CLIENT FACTORY ISOLATION UNIT TESTS PASSED ---');
