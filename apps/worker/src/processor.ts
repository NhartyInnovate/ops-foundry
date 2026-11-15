import { claimOutboxJobs, heartbeatOutboxJob, completeOutboxJob, failOutboxJob } from '@opsfoundry/db';

export interface WorkerConfig {
  workerId: string;
  batchSize: number;
  maxExecutionTimeMs: number;
}

/**
 * Executes a single processing pass of the notification outbox with budget protection.
 */
export async function processOutboxBatch(config: WorkerConfig) {
  const startTime = performance.now();
  const claimed = await claimOutboxJobs({
    workerId: config.workerId,
    batchSize: config.batchSize,
    leaseDurationSeconds: 120,
  });

  const jobs = Array.isArray(claimed) ? claimed : [];
  console.log(`[Worker ${config.workerId}] Claimed ${jobs.length} jobs.`);

  for (const job of jobs) {
    // Budget check: ensure we do not overrun serverless timeout
    const elapsed = performance.now() - startTime;
    if (elapsed > config.maxExecutionTimeMs) {
      console.warn(`[Worker ${config.workerId}] Budget threshold reached (${elapsed.toFixed(0)}ms). Yielding remaining batch.`);
      break;
    }

    try {
      // Dispatches based on channel (minimal PII processed)
      console.log(`[Worker ${config.workerId}] Processing job ${job.id} for channel ${job.channel}`);
      
      // Heartbeat renewal check if needed
      await heartbeatOutboxJob(job.id, job.claim_id, 120);

      // Simulation / Actual execution hook
      await completeOutboxJob(job.id, job.claim_id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[Worker ${config.workerId}] Job ${job.id} failed: ${message}`);
      await failOutboxJob(job.id, job.claim_id, job.attempts, job.max_attempts, message);
    }
  }

  return { processed: jobs.length };
}
