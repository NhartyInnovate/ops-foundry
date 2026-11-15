import { z } from 'zod';

export const ServiceInterestSchema = z.enum([
  'get-online',
  'get-visible',
  'get-customers',
  'all',
]);
export type ServiceInterest = z.infer<typeof ServiceInterestSchema>;

export const CorporateInquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Please enter a valid business email address').max(255),
  organization: z.string().min(2, 'Organization name is required').max(255),
  phone: z.string().max(50).optional(),
  serviceInterest: ServiceInterestSchema.default('all'),
  message: z.string().max(2000).optional(),
  turnstileToken: z.string().min(1, 'Security check is required'),
  idempotencyKey: z.string().uuid(),
});
export type CorporateInquiry = z.infer<typeof CorporateInquirySchema>;
