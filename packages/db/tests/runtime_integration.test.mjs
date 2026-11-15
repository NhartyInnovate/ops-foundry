import assert from 'node:assert';
import { sql, eq } from 'drizzle-orm';
import postgres from 'postgres';
import {
  getCorpDb,
  getIntakeDb,
  getWorkerDb,
  submitCorporateInquiry,
  submitAdmissionsApplication,
  claimOutboxJobs,
  heartbeatOutboxJob,
  completeOutboxJob,
  failOutboxJob,
  corporateInquiries,
  admissionsApplications,
  admissionsStatusHistory,
  notificationOutbox,
} from '../dist/index.js';

console.log('--- RUNNING LIVE POSTGRESQL DRIZZLE RUNTIME INTEGRATION TESTS ---');

function matchPgError(pattern) {
  return (err) => {
    const msg = `${err?.message || ''} ${err?.cause?.message || ''}`;
    assert.match(msg, pattern);
    assert.strictEqual(err?.cause?.code || err?.code, '42501');
    return true;
  };
}

const adminUrl =
  process.env.MIGRATION_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/opsfoundry';
const adminSql = postgres(adminUrl, { max: 1 });

try {
  // Provision ephemeral local test passwords for runtime roles in the local test database
  await adminSql`ALTER ROLE ops_corp_runtime WITH PASSWORD 'ephemeral_corp_pw'`;
  await adminSql`ALTER ROLE ops_intake_runtime WITH PASSWORD 'ephemeral_intake_pw'`;
  await adminSql`ALTER ROLE ops_worker_runtime WITH PASSWORD 'ephemeral_worker_pw'`;
  await adminSql`TRUNCATE TABLE notification_outbox, admissions_status_history, admissions_applications, corporate_inquiries CASCADE`;

  process.env.CORP_DATABASE_URL =
    'postgresql://ops_corp_runtime:ephemeral_corp_pw@localhost:5432/opsfoundry';
  process.env.ACADEMY_DATABASE_URL =
    'postgresql://ops_intake_runtime:ephemeral_intake_pw@localhost:5432/opsfoundry';
  process.env.WORKER_DATABASE_URL =
    'postgresql://ops_worker_runtime:ephemeral_worker_pw@localhost:5432/opsfoundry';

  const corpDb = getCorpDb();
  const intakeDb = getIntakeDb();
  const workerDb = getWorkerDb();

  // 1. Corporate Runtime: Permitted atomic inquiry + outbox submission
  const corpResult = await submitCorporateInquiry({
    fullName: 'Integration Corp User',
    email: 'integration@corp.example',
    organization: 'Integration Ltd',
    phone: '+442079460000',
    serviceInterest: 'get-online',
    message: 'Integration test inquiry',
    idempotencyKey: 'int-corp-001',
    ipHash: 'a'.repeat(64),
  });
  assert.ok(corpResult.id, 'submitCorporateInquiry must return pre-generated UUID');
  console.log('✓ 1. Corporate submitCorporateInquiry atomic transaction succeeded:', corpResult.id);

  // 2. Corporate Runtime: Forbidden operations (SELECT, cross-table INSERT, RLS channel violation)
  await assert.rejects(
    async () => corpDb.select().from(corporateInquiries),
    matchPgError(/permission denied for table corporate_inquiries/)
  );
  await assert.rejects(
    async () => corpDb.select().from(admissionsApplications),
    matchPgError(/permission denied for table admissions_applications/)
  );
  await assert.rejects(
    async () =>
      corpDb.insert(notificationOutbox).values({
        id: crypto.randomUUID(),
        channel: 'applicant_email',
        recipient: 'spoof@example.com',
        payload: {},
      }),
    matchPgError(/new row violates row-level security policy/)
  );
  console.log('✓ 2. Corporate forbidden reads, cross-app access, and RLS violations rejected');

  // 3. Academy Intake Runtime: Permitted atomic 3-table submission
  const acadResult = await submitAdmissionsApplication({
    fullName: 'Integration Applicant',
    email: 'applicant@academy.example',
    phone: '+447700900000',
    courseCode: 'COURSE_01',
    formResponses: { experience: 'intermediate' },
    idempotencyKey: 'int-acad-001',
    ipHash: 'b'.repeat(64),
  });
  assert.ok(acadResult.id, 'submitAdmissionsApplication must return pre-generated UUID');
  console.log('✓ 3. Academy submitAdmissionsApplication atomic 3-table transaction succeeded:', acadResult.id);

  // 4. Academy Intake Runtime: Transaction rollback on failure
  await assert.rejects(
    async () => {
      await intakeDb.transaction(async (tx) => {
        await tx.insert(admissionsApplications).values({
          id: crypto.randomUUID(),
          fullName: 'Rollback User',
          email: 'rollback@academy.example',
          phone: '+447700900999',
          courseCode: 'COURSE_02',
          idempotencyKey: 'int-acad-rollback',
        });
        // Trigger RLS violation on second statement in transaction
        await tx.insert(notificationOutbox).values({
          id: crypto.randomUUID(),
          channel: 'operational_triage_webhook',
          recipient: 'https://invalid.example',
          payload: {},
        });
      });
    },
    matchPgError(/new row violates row-level security policy/)
  );

  const rolledBackCheck = await adminSql`
    SELECT COUNT(*)::int AS cnt FROM admissions_applications WHERE idempotency_key = 'int-acad-rollback'
  `;
  assert.strictEqual(rolledBackCheck[0].cnt, 0, 'Rolled-back application row must not persist');
  console.log('✓ 4. Academy multi-table transaction rollback verified (zero partial state)');

  // 5. Academy Intake Runtime: Forbidden operations (SELECT applicant PII, cross-table access)
  await assert.rejects(
    async () => intakeDb.select().from(admissionsApplications),
    matchPgError(/permission denied for table admissions_applications/)
  );
  await assert.rejects(
    async () => intakeDb.select().from(admissionsStatusHistory),
    matchPgError(/permission denied for table admissions_status_history/)
  );
  await assert.rejects(
    async () => intakeDb.select().from(corporateInquiries),
    matchPgError(/permission denied for table corporate_inquiries/)
  );
  console.log('✓ 5. Academy forbidden PII reads and corporate table access rejected');

  // 6. Worker Runtime: Claim jobs with minimized RETURNING projection
  const claimed = await claimOutboxJobs({
    workerId: 'int-worker-01',
    batchSize: 10,
    leaseDurationSeconds: 120,
  });
  assert.strictEqual(claimed.length, 2, 'Worker must claim the 2 pending jobs');

  const expectedKeys = ['attempts', 'channel', 'claim_id', 'id', 'max_attempts', 'payload', 'recipient'];
  for (const job of claimed) {
    assert.deepStrictEqual(
      Object.keys(job).sort(),
      expectedKeys,
      'Worker claim projection must contain only the 7 approved columns'
    );
    assert.strictEqual('application_id' in job, false, 'application_id must not be returned to worker');
    assert.strictEqual('created_at' in job, false, 'created_at must not be returned to worker');
  }
  console.log('✓ 6. Worker claimOutboxJobs returned exact 7-column minimal projection');

  // 7. Worker Runtime: Heartbeat, stale claim rejection, completion, retry, lease recovery & dead-letter
  const [job1, job2] = claimed;

  const hbOk = await heartbeatOutboxJob(job1.id, job1.claim_id, 180);
  assert.strictEqual(hbOk, true, 'Valid heartbeat must succeed');

  const staleComplete = await completeOutboxJob(job1.id, '00000000-0000-0000-0000-000000000000');
  assert.strictEqual(staleComplete, false, 'Stale claim_id completion must be rejected');

  const compOk = await completeOutboxJob(job1.id, job1.claim_id);
  assert.strictEqual(compOk, true, 'Valid completion must succeed');

  // Retry scheduling on job2
  const retryOk = await failOutboxJob(job2.id, job2.claim_id, job2.attempts, job2.max_attempts, 'Transient network timeout');
  assert.strictEqual(retryOk, true, 'Transient failure scheduling must succeed');

  // Simulate expired lease recovery on job2
  await adminSql`
    UPDATE notification_outbox
    SET status = 'processing',
        lease_expires_at = NOW() - INTERVAL '5 minutes'
    WHERE id = ${job2.id}
  `;
  const reclaimed = await claimOutboxJobs({
    workerId: 'int-worker-02',
    batchSize: 5,
    leaseDurationSeconds: 120,
  });
  assert.strictEqual(reclaimed.length, 1, 'Expired lease job must be recovered by worker-02');
  assert.strictEqual(reclaimed[0].id, job2.id);
  assert.notStrictEqual(reclaimed[0].claim_id, job2.claim_id);

  // Move job2 to dead_letter when attempts >= maxAttempts
  const dlqOk = await failOutboxJob(
    reclaimed[0].id,
    reclaimed[0].claim_id,
    reclaimed[0].max_attempts,
    reclaimed[0].max_attempts,
    'Permanent delivery failure'
  );
  assert.strictEqual(dlqOk, true, 'Dead-letter transition must succeed');
  console.log('✓ 7. Worker heartbeat, stale-claim guard, lease recovery, retry & dead-letter verified');

  // 8. Worker Runtime: Forbidden column-level SELECT/UPDATE & cross-table access
  await assert.rejects(
    async () => workerDb.execute(sql`SELECT application_id FROM notification_outbox`),
    matchPgError(/permission denied for table notification_outbox/)
  );
  await assert.rejects(
    async () =>
      workerDb
        .update(notificationOutbox)
        .set({ recipient: 'attacker@evil.example' })
        .where(eq(notificationOutbox.id, job1.id)),
    matchPgError(/permission denied for table notification_outbox/)
  );
  await assert.rejects(
    async () => workerDb.select().from(admissionsApplications),
    matchPgError(/permission denied for table admissions_applications/)
  );
  await assert.rejects(
    async () => workerDb.select().from(corporateInquiries),
    matchPgError(/permission denied for table corporate_inquiries/)
  );
  console.log('✓ 8. Worker column-level SELECT/UPDATE restrictions and cross-table denials verified');

  // Clean up test data and remove ephemeral local passwords
  await adminSql`TRUNCATE TABLE notification_outbox, admissions_status_history, admissions_applications, corporate_inquiries CASCADE`;
  await adminSql`ALTER ROLE ops_corp_runtime WITH PASSWORD NULL`;
  await adminSql`ALTER ROLE ops_intake_runtime WITH PASSWORD NULL`;
  await adminSql`ALTER ROLE ops_worker_runtime WITH PASSWORD NULL`;

  console.log('--- ALL LIVE POSTGRESQL DRIZZLE RUNTIME INTEGRATION TESTS PASSED ---');
  await adminSql.end();
  process.exit(0);
} catch (err) {
  await adminSql.end();
  console.error('INTEGRATION TEST FAILED:', err);
  process.exit(1);
}
