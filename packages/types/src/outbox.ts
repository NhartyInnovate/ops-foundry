import { z } from 'zod';

export const OutboxStatusSchema = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
  'dead_letter',
]);
export type OutboxStatus = z.infer<typeof OutboxStatusSchema>;

export const OutboxChannelSchema = z.enum([
  'applicant_email',
  'operational_triage_webhook',
  'corporate_notification_email',
]);
export type OutboxChannel = z.infer<typeof OutboxChannelSchema>;

export const MinimalEmailPayloadSchema = z.object({
  template: z.literal('admissions_submission_receipt'),
  recipientEmail: z.string().email(),
  templateVars: z.object({
    firstName: z.string(),
    referenceId: z.string().uuid(),
    courseCode: z.string(),
  }),
});
export type MinimalEmailPayload = z.infer<typeof MinimalEmailPayloadSchema>;

export const MinimalWebhookPayloadSchema = z.object({
  event: z.enum(['admissions_submitted', 'corporate_inquiry_submitted']),
  referenceId: z.string().uuid(),
  createdAt: z.string(),
  summary: z.object({
    name: z.string(),
    email: z.string().email(),
    target: z.string(), // Course code or service interest
  }),
});
export type MinimalWebhookPayload = z.infer<typeof MinimalWebhookPayloadSchema>;

export const OutboxJobPayloadSchema = z.union([
  MinimalEmailPayloadSchema,
  MinimalWebhookPayloadSchema,
]);
export type OutboxJobPayload = z.infer<typeof OutboxJobPayloadSchema>;
