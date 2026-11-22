import crypto from 'node:crypto';
import { claimOutboxJobs, heartbeatOutboxJob, completeOutboxJob, failOutboxJob } from '@opsfoundry/db';
import {
  renderContactEnquiryEmail,
  renderPilotEnquiryEmail,
  type CorporateEmailPayload,
} from './templates.js';

export interface WorkerConfig {
  workerId: string;
  batchSize: number;
  maxExecutionTimeMs: number;
}

/**
 * Dispatches an operational triage webhook notification.
 */
async function dispatchTriageWebhook(
  recipientUrl: string,
  payload: Record<string, unknown>
): Promise<void> {
  const targetUrl = recipientUrl || process.env.TRIAGE_WEBHOOK_URL;
  if (!targetUrl) {
    throw new Error('TRIAGE_WEBHOOK_URL is not configured on the worker server.');
  }

  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'user-agent': 'OpsFoundry-Worker/1.0',
  };

  const secret = process.env.TRIAGE_WEBHOOK_SECRET;
  if (secret) {
    const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');
    headers['x-opsfoundry-signature'] = `sha256=${signature}`;
  }

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers,
    body,
    signal: AbortSignal.timeout(8000), // 8-second execution timeout
  });

  if (!response.ok) {
    throw new Error(`Webhook destination returned HTTP ${response.status}: ${response.statusText}`);
  }
}

/**
 * Dispatches a corporate notification email via Resend to the Ops Foundry team.
 */
async function dispatchCorporateEmail(
  recipientEmail: string,
  payload: Record<string, unknown>,
  jobId: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured on the worker server.');
  }

  const emailPayload = payload as unknown as CorporateEmailPayload;
  const rendered =
    emailPayload.formType === 'pilot'
      ? renderPilotEnquiryEmail(emailPayload)
      : renderContactEnquiryEmail(emailPayload);

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'Ops Foundry <notifications@opsfoundry.co>';
  const targetRecipient = recipientEmail || process.env.CORPORATE_NOTIFICATION_EMAIL;

  if (!targetRecipient) {
    throw new Error('No recipient email specified for corporate notification.');
  }

  // Support local mock endpoint if configured via RESEND_API_BASE_URL (for testing)
  const baseUrl = (process.env.RESEND_API_BASE_URL || 'https://api.resend.com').replace(/\/$/, '');
  const apiUrl = `${baseUrl}/emails`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': jobId, // Stable idempotency prevents duplicate email deliveries on retry
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [targetRecipient],
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    }),
    signal: AbortSignal.timeout(8000), // 8-second execution timeout
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `Resend email delivery returned HTTP ${response.status}: ${response.statusText}${
        errorText ? ` (${errorText})` : ''
      }`
    );
  }

  const result = (await response.json().catch(() => ({}))) as { id?: string };
  console.log(`[Worker] Corporate notification email successfully dispatched via Resend. ID: ${result.id || 'accepted'}`);
}

/**
 * Dispatches an applicant transactional email via Resend if configured.
 */
async function dispatchApplicantEmail(
  recipientEmail: string,
  payload: Record<string, unknown>,
  jobId: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[Worker] RESEND_API_KEY not configured. Email to ${recipientEmail} marked simulated.`);
    return;
  }

  const baseUrl = (process.env.RESEND_API_BASE_URL || 'https://api.resend.com').replace(/\/$/, '');
  const apiUrl = `${baseUrl}/emails`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': jobId,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'Ops Foundry <notifications@opsfoundry.co>',
      to: [recipientEmail],
      subject: 'Application Received — Ops Foundry',
      text: `Thank you for your submission. Your application (${String(payload.applicationId || '')}) has been received.`,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Resend email delivery returned HTTP ${response.status}: ${response.statusText}`);
  }
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
  console.log(`[Worker ${config.workerId}] Claimed ${jobs.length} outbox jobs.`);

  for (const job of jobs) {
    // Budget check: ensure we do not overrun execution timeout
    const elapsed = performance.now() - startTime;
    if (elapsed > config.maxExecutionTimeMs) {
      console.warn(
        `[Worker ${config.workerId}] Budget threshold reached (${elapsed.toFixed(0)}ms). Yielding remaining batch.`
      );
      break;
    }

    try {
      console.log(`[Worker ${config.workerId}] Dispatching job ${job.id} on channel "${job.channel}"`);

      // Heartbeat renewal check before dispatch
      await heartbeatOutboxJob(job.id, job.claim_id, 120);

      if (job.channel === 'corporate_notification_email') {
        await dispatchCorporateEmail(job.recipient, job.payload, job.id);
      } else if (job.channel === 'operational_triage_webhook') {
        await dispatchTriageWebhook(job.recipient, job.payload);
      } else if (job.channel === 'applicant_email') {
        await dispatchApplicantEmail(job.recipient, job.payload, job.id);
      } else {
        throw new Error(`Unsupported notification channel: "${job.channel}"`);
      }

      // Mark completed only after verified successful delivery
      await completeOutboxJob(job.id, job.claim_id);
      console.log(`[Worker ${config.workerId}] Job ${job.id} completed successfully.`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[Worker ${config.workerId}] Job ${job.id} failed: ${message}`);
      await failOutboxJob(job.id, job.claim_id, job.attempts, job.max_attempts, message);
    }
  }

  return { processed: jobs.length };
}
