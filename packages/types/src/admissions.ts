import { z } from 'zod';

export const CourseCodeSchema = z.enum(['COURSE_01', 'COURSE_02', 'COURSE_03']);
export type CourseCode = z.infer<typeof CourseCodeSchema>;

export const ApplicationStatusSchema = z.enum([
  'submitted',
  'in_review',
  'approved',
  'rejected',
  'waitlisted',
  'archived',
]);
export type ApplicationStatus = z.infer<typeof ApplicationStatusSchema>;

export const AdmissionsFormResponsesSchema = z.object({
  motivation: z.string().max(1000).optional(),
  priorExperience: z.string().max(1000).optional(),
  availabilityHoursPerWeek: z.number().int().min(1).max(80).optional(),
});
export type AdmissionsFormResponses = z.infer<typeof AdmissionsFormResponsesSchema>;

export const AdmissionsSubmissionSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(7, 'Please enter a valid phone number').max(50),
  courseCode: CourseCodeSchema,
  formResponses: AdmissionsFormResponsesSchema.default({}),
  turnstileToken: z.string().min(1, 'Security check is required'),
  idempotencyKey: z.string().uuid(),
});
export type AdmissionsSubmission = z.infer<typeof AdmissionsSubmissionSchema>;
