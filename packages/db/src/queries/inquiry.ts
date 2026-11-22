import { getCorpDb, DatabaseInstance } from '../client.js';
import { corporateInquiries, notificationOutbox } from '../schema.js';

export interface CreateInquiryInput {
  fullName: string;
  email: string;
  organization: string;
  phone?: string;
  serviceInterest?: string;
  message?: string;
  website?: string;
  preferredStartTiming?: string;
  privacyConsent: boolean;
  privacyConsentAt?: Date;
  formType: 'contact' | 'pilot';
  idempotencyKey: string;
  ipHash?: string;
}

/**
 * Corporate inquiry submission (contact enquiry or pilot intake).
 * Atomically writes to corporate_inquiries and enqueues Resend email notification in notification_outbox.
 * Generates UUIDs in Node.js before insertion to execute pure INSERT without RETURNING id,
 * preserving ops_corp_runtime least-privilege security.
 */
export async function submitCorporateInquiry(
  input: CreateInquiryInput,
  dbClient?: DatabaseInstance
): Promise<{ id: string }> {
  const db = dbClient || getCorpDb();
  const inquiryId = crypto.randomUUID();
  const notificationEmail = process.env.CORPORATE_NOTIFICATION_EMAIL?.trim();
  const triageWebhookUrl = process.env.TRIAGE_WEBHOOK_URL?.trim();

  await db.transaction(async (tx) => {
    // 1. Insert inquiry (pure INSERT, no RETURNING id)
    await tx.insert(corporateInquiries).values({
      id: inquiryId,
      fullName: input.fullName,
      email: input.email,
      organization: input.organization,
      phone: input.phone || null,
      serviceInterest: input.serviceInterest || (input.formType === 'pilot' ? 'get-online' : 'all'),
      message: input.message || null,
      website: input.website || null,
      preferredStartTiming: input.preferredStartTiming || null,
      privacyConsent: input.privacyConsent,
      privacyConsentAt: input.privacyConsentAt || (input.privacyConsent ? new Date() : null),
      formType: input.formType,
      status: 'submitted',
      idempotencyKey: input.idempotencyKey,
      ipHash: input.ipHash || null,
    });

    // 2. Enqueue Resend email notification in outbox whenever destination email is configured
    if (notificationEmail) {
      const emailNotificationId = crypto.randomUUID();
      await tx.insert(notificationOutbox).values({
        id: emailNotificationId,
        channel: 'corporate_notification_email',
        recipient: notificationEmail,
        payload: {
          inquiryId,
          formType: input.formType,
          template: input.formType === 'pilot' ? 'corporate_pilot_enquiry' : 'corporate_contact_enquiry',
          fullName: input.fullName,
          email: input.email,
          organization: input.organization,
          phone: input.phone || null,
          website: input.website || null,
          serviceInterest: input.serviceInterest || (input.formType === 'pilot' ? 'get-online' : 'all'),
          message: input.message || null,
          preferredStartTiming: input.preferredStartTiming || null,
          submittedAt: new Date().toISOString(),
        },
        status: 'pending',
        attempts: 0,
      });
    }

    // 3. Enqueue operational triage webhook in outbox if webhook destination is configured
    if (triageWebhookUrl) {
      const webhookNotificationId = crypto.randomUUID();
      await tx.insert(notificationOutbox).values({
        id: webhookNotificationId,
        channel: 'operational_triage_webhook',
        recipient: triageWebhookUrl,
        payload: {
          inquiryId,
          formType: input.formType,
          organization: input.organization,
          fullName: input.fullName,
          email: input.email,
          serviceInterest: input.serviceInterest || 'all',
          website: input.website || null,
          preferredStartTiming: input.preferredStartTiming || null,
        },
        status: 'pending',
        attempts: 0,
      });
    }
  });

  return { id: inquiryId };
}
