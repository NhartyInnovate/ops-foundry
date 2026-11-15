import { sql, eq, and, gt } from 'drizzle-orm';
import { db } from '../client';
import { notificationOutbox } from '../schema';

export interface ClaimOptions {
  workerId: string;
  batchSize?: number;
  leaseDurationSeconds?: number;
}

export interface ClaimedOutboxJob {
  id: string;
  channel: string;
  recipient: string;
  payload: Record<string, unknown>;
  status: string;
  worker_id: string | null;
  claim_id: string;
  lease_expires_at: Date | string | null;
  attempts: number;
  max_attempts: number;
  last_attempt_at: Date | string | null;
  scheduled_for: Date | string;
  error_message: string | null;
  completed_at: Date | string | null;
  application_id: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * Phase 1: Atomically claims eligible pending or expired processing jobs.
 * Commits immediately, releasing DB row locks while stamping a logical lease.
 */
export async function claimOutboxJobs(options: ClaimOptions): Promise<ClaimedOutboxJob[]> {
  const batchSize = options.batchSize || 15;
  const leaseSeconds = options.leaseDurationSeconds || 120; // 2 minutes

  const query = sql`
    WITH eligible_jobs AS (
      SELECT id
      FROM ${notificationOutbox}
      WHERE (${notificationOutbox.status} = 'pending' AND ${notificationOutbox.scheduledFor} <= NOW())
         OR (${notificationOutbox.status} = 'processing' AND ${notificationOutbox.leaseExpiresAt} <= NOW())
      ORDER BY ${notificationOutbox.scheduledFor} ASC
      LIMIT ${batchSize}
      FOR UPDATE SKIP LOCKED
    )
    UPDATE ${notificationOutbox} o
    SET status = 'processing',
        worker_id = ${options.workerId},
        claim_id = gen_random_uuid(),
        lease_expires_at = NOW() + (${leaseSeconds} * INTERVAL '1 second'),
        attempts = o.attempts + 1,
        last_attempt_at = NOW(),
        updated_at = NOW()
    FROM eligible_jobs ej
    WHERE o.id = ej.id
    RETURNING o.*;
  `;

  const result = await db.execute(query);
  return result as unknown as ClaimedOutboxJob[];
}

/**
 * Issues a heartbeat to renew an active lease while a worker is still processing.
 * Only succeeds if the current claim_id matches AND the lease has not already expired.
 */
export async function heartbeatOutboxJob(jobId: string, claimId: string, extensionSeconds = 120) {
  const result = await db
    .update(notificationOutbox)
    .set({
      leaseExpiresAt: sql`NOW() + (${extensionSeconds} * INTERVAL '1 second')`,
      updatedAt: sql`NOW()`,
    })
    .where(
      and(
        eq(notificationOutbox.id, jobId),
        eq(notificationOutbox.claimId, claimId),
        eq(notificationOutbox.status, 'processing'),
        gt(notificationOutbox.leaseExpiresAt, sql`NOW()`)
      )
    )
    .returning({ id: notificationOutbox.id });

  return result.length > 0;
}

/**
 * Marks a claimed job as completed.
 * Requires matching claim_id to prevent stale workers from overwriting newer runs.
 */
export async function completeOutboxJob(jobId: string, claimId: string) {
  const result = await db
    .update(notificationOutbox)
    .set({
      status: 'completed',
      completedAt: sql`NOW()`,
      leaseExpiresAt: null,
      errorMessage: null,
      updatedAt: sql`NOW()`,
    })
    .where(
      and(
        eq(notificationOutbox.id, jobId),
        eq(notificationOutbox.claimId, claimId),
        eq(notificationOutbox.status, 'processing')
      )
    )
    .returning({ id: notificationOutbox.id });

  return result.length > 0;
}

/**
 * Handles transient delivery failures with exponential backoff or marks dead_letter.
 */
export async function failOutboxJob(
  jobId: string,
  claimId: string,
  currentAttempts: number,
  maxAttempts: number,
  errorMessage: string
) {
  const isPermanent = currentAttempts >= maxAttempts;
  const backoffDelays = [60, 300, 900, 3600]; // 1m, 5m, 15m, 1h
  const backoffSeconds = backoffDelays[Math.min(currentAttempts - 1, backoffDelays.length - 1)] || 3600;

  const result = await db
    .update(notificationOutbox)
    .set({
      status: isPermanent ? 'dead_letter' : 'pending',
      scheduledFor: isPermanent ? undefined : sql`NOW() + (${backoffSeconds} * INTERVAL '1 second')`,
      leaseExpiresAt: null,
      errorMessage,
      updatedAt: sql`NOW()`,
    })
    .where(
      and(
        eq(notificationOutbox.id, jobId),
        eq(notificationOutbox.claimId, claimId),
        eq(notificationOutbox.status, 'processing')
      )
    )
    .returning({ id: notificationOutbox.id });

  return result.length > 0;
}
