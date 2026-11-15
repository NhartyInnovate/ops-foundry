import { getCorpDb, DatabaseInstance } from '../client.js';
import { corporateInquiries, notificationOutbox } from '../schema.js';

export interface CreateInquiryInput {
  fullName: string;
  email: string;
  organization: string;
  phone?: string;
  serviceInterest?: string;
  message?: string;
  idempotencyKey: string;
  ipHash?: string;
}

/**
 * Corporate pilot consultation submission.
 * Atomically writes to corporate_inquiries and enqueues triage webhook job.
 * Generates UUID in Node.js before insertion to execute pure INSERT without RETURNING id.
 */
export async function submitCorporateInquiry(
  input: CreateInquiryInput,
  dbClient?: DatabaseInstance
): Promise<{ id: string }> {
  const db = dbClient || getCorpDb();
  const inquiryId = crypto.randomUUID();
  const notificationId = crypto.randomUUID();

  await db.transaction(async (tx) => {
    // 1. Insert inquiry (pure INSERT, no RETURNING id)
    await tx.insert(corporateInquiries).values({
      id: inquiryId,
      fullName: input.fullName,
      email: input.email,
      organization: input.organization,
      phone: input.phone,
      serviceInterest: input.serviceInterest,
      message: input.message,
      idempotencyKey: input.idempotencyKey,
      ipHash: input.ipHash,
    });

    // 2. Enqueue operational triage webhook in outbox
    await tx.insert(notificationOutbox).values({
      id: notificationId,
      channel: 'operational_triage_webhook',
      recipient: 'https://internal.opsfoundry.com/webhooks/triage',
      payload: {
        inquiryId,
        organization: input.organization,
        serviceInterest: input.serviceInterest || 'general',
      },
    });
  });

  return { id: inquiryId };
}
