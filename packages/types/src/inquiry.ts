import { z } from 'zod';

export const ServiceInterestSchema = z.enum([
  'get-online',
  'get-visible',
  'get-customers',
  'all',
  'not-sure',
]);
export type ServiceInterest = z.infer<typeof ServiceInterestSchema>;

export const FormTypeSchema = z.enum(['contact', 'pilot']);
export type FormType = z.infer<typeof FormTypeSchema>;

/**
 * Validates Contact Enquiry form inputs.
 */
export const ContactEnquiryInputSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name (at least 2 characters)').max(255),
  email: z.string().trim().email('Please enter a valid work email address').max(255),
  organization: z.string().trim().min(2, 'Please enter your organization name').max(255),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Please enter your message (at least 10 characters)').max(5000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required to proceed',
  }),
  turnstileToken: z.string().min(1, 'Security check is required'),
  idempotencyKey: z.string().uuid('Invalid idempotency key format'),
});
export type ContactEnquiryInput = z.infer<typeof ContactEnquiryInputSchema>;

/**
 * Validates Pilot Intake form inputs.
 */
export const PilotIntakeInputSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name (at least 2 characters)').max(255),
  email: z.string().trim().email('Please enter a valid work email address').max(255),
  organization: z.string().trim().min(2, 'Please enter your company or organization name').max(255),
  website: z
    .string()
    .trim()
    .url('Please enter a valid website URL (including https://)')
    .max(255)
    .optional()
    .or(z.literal('')),
  serviceInterest: ServiceInterestSchema.default('get-online'),
  businessProblem: z
    .string()
    .trim()
    .min(10, 'Please describe what you need help with (at least 10 characters)')
    .max(5000),
  preferredStartTiming: z.string().trim().max(100).optional().or(z.literal('')),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required to proceed',
  }),
  turnstileToken: z.string().min(1, 'Security check is required'),
  idempotencyKey: z.string().uuid('Invalid idempotency key format'),
});
export type PilotIntakeInput = z.infer<typeof PilotIntakeInputSchema>;

/**
 * Comprehensive Corporate Inquiry Schema for database persistence.
 */
export const CorporateInquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Please enter a valid business email address').max(255),
  organization: z.string().min(2, 'Organization name is required').max(255),
  phone: z.string().max(50).optional(),
  serviceInterest: ServiceInterestSchema.default('all'),
  message: z.string().max(5000).optional(),
  website: z.string().max(255).optional(),
  preferredStartTiming: z.string().max(100).optional(),
  privacyConsent: z.boolean().default(false),
  privacyConsentAt: z.date().optional(),
  formType: FormTypeSchema.default('contact'),
  turnstileToken: z.string().min(1, 'Security check is required').optional(),
  idempotencyKey: z.string().uuid(),
});
export type CorporateInquiry = z.infer<typeof CorporateInquirySchema>;
