import { z } from 'zod';
import { ServiceInterestSchema } from './inquiry';

export const ServiceDeliverableSchema = z.object({
  title: z.string(),
  description: z.string(),
  timeframe: z.string().default('[Proposed scope under review]'),
});
export type ServiceDeliverable = z.infer<typeof ServiceDeliverableSchema>;

export const ServiceFrontmatterSchema = z.object({
  id: ServiceInterestSchema,
  title: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  outcomes: z.array(z.string()),
  deliverables: z.array(ServiceDeliverableSchema),
  governanceNote: z.string().default('Proposed scope and deliverable timelines subject to pilot assessment.'),
});
export type ServiceFrontmatter = z.infer<typeof ServiceFrontmatterSchema>;
