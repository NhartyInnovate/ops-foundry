import { z } from 'zod';
import { CourseCodeSchema } from './admissions.js';

export const ProgrammeFrontmatterSchema = z.object({
  courseId: CourseCodeSchema,
  title: z.string(),
  provisionalTitle: z.string().nullable().default(null),
  isOfficialTitle: z.boolean().default(false),
  summary: z.string(),
  duration: z.string().default('[Pending stakeholder approval]'),
  deliveryFormat: z.string().default('[Pending stakeholder approval]'),
  prerequisites: z.array(z.string()).default([]),
  admissionRequirements: z.array(z.string()).default([]),
  curriculumModules: z.array(
    z.object({
      phase: z.number(),
      title: z.string(),
      description: z.string(),
      learningOutcomes: z.array(z.string()).default([]),
    })
  ).default([]),
  tuition: z.object({
    amount: z.number().nullable().default(null),
    currency: z.string().default('USD'),
    status: z.enum(['confirmed', 'provisional', 'pending_approval']).default('pending_approval'),
  }),
  scholarshipInformation: z.string().default('[Pending stakeholder approval]'),
  cohortDates: z.array(z.string()).default([]),
});
export type ProgrammeFrontmatter = z.infer<typeof ProgrammeFrontmatterSchema>;
