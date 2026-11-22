import { pgTable, uuid, varchar, text, timestamp, jsonb, index, integer, check, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// 1. Academy Admissions Applications Table
export const admissionsApplications = pgTable('admissions_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Applicant Identity (Approved form fields only)
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  
  // Stable Course Identifier (COURSE_01, COURSE_02, COURSE_03)
  courseCode: varchar('course_code', { length: 50 }).notNull(),
  
  // Server-Validated Structured Form Responses
  formResponses: jsonb('form_responses').notNull().default({}),
  
  // Extensible Status Model with strict DB Check Constraint
  status: varchar('status', { length: 50 }).default('submitted').notNull(),
  
  // Administrative Review Notes & Audit Info
  adminNotes: text('admin_notes'),
  statusUpdatedAt: timestamp('status_updated_at', { withTimezone: true }),
  statusUpdatedBy: varchar('status_updated_by', { length: 255 }), // Administrator Identifier
  
  // Operational Delivery & Abuse Protection
  idempotencyKey: varchar('idempotency_key', { length: 128 }).notNull().unique(),
  ipHash: varchar('ip_hash', { length: 64 }), // Salted SHA-256
  
  // Audit Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  statusCheck: check('admissions_status_check', 
    sql`${table.status} IN ('submitted', 'in_review', 'approved', 'rejected', 'waitlisted', 'archived')`),
  emailIdx: index('admissions_email_idx').on(table.email),
  courseIdx: index('admissions_course_idx').on(table.courseCode),
  statusIdx: index('admissions_status_idx').on(table.status),
  createdIdx: index('admissions_created_at_idx').on(table.createdAt),
}));

// 2. Application Status History Table (Append-Only Audit Log)
export const admissionsStatusHistory = pgTable('admissions_status_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => admissionsApplications.id, { onDelete: 'cascade' }),
  fromStatus: varchar('from_status', { length: 50 }),
  toStatus: varchar('to_status', { length: 50 }).notNull(),
  changedAt: timestamp('changed_at', { withTimezone: true }).defaultNow().notNull(),
  changedBy: varchar('changed_by', { length: 255 }), // Admin UUID (null for automated initial submit)
  note: text('note'),
}, (table) => ({
  statusCheck: check('history_status_check', 
    sql`${table.toStatus} IN ('submitted', 'in_review', 'approved', 'rejected', 'waitlisted', 'archived')`),
  applicationIdx: index('status_history_app_idx').on(table.applicationId),
  changedAtIdx: index('status_history_changed_at_idx').on(table.changedAt),
}));

// 3. Transactional Notification Outbox Table
export const notificationOutbox = pgTable('notification_outbox', {
  id: uuid('id').primaryKey().defaultRandom(),
  channel: varchar('channel', { length: 50 }).notNull(), // 'applicant_email' | 'operational_triage_webhook'
  recipient: varchar('recipient', { length: 255 }).notNull(), // Email address or webhook URL
  payload: jsonb('payload').notNull(), // Minimal notification payload only
  
  // Outbox Execution & Lease Management
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  workerId: varchar('worker_id', { length: 100 }),          // Claiming worker identifier
  claimId: uuid('claim_id'),                                // Unique lease token per claim
  leaseExpiresAt: timestamp('lease_expires_at', { withTimezone: true }), // Lease expiration
  attempts: integer('attempts').default(0).notNull(),       // Integer attempt counter
  maxAttempts: integer('max_attempts').default(5).notNull(),
  lastAttemptAt: timestamp('last_attempt_at', { withTimezone: true }),
  scheduledFor: timestamp('scheduled_for', { withTimezone: true }).defaultNow().notNull(),
  errorMessage: text('error_message'),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  
  // Audit Reference
  applicationId: uuid('application_id')
    .references(() => admissionsApplications.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  outboxStatusCheck: check('outbox_status_check', 
    sql`${table.status} IN ('pending', 'processing', 'completed', 'failed', 'dead_letter')`),
  claimIdx: index('outbox_claim_idx').on(table.status, table.scheduledFor, table.leaseExpiresAt),
}));

// 4. Corporate Pilot Consultation & Contact Inquiries Table
export const corporateInquiries = pgTable('corporate_inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  organization: varchar('organization', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  serviceInterest: varchar('service_interest', { length: 100 }), // 'get-online' | 'get-visible' | 'get-customers' | 'all' | 'not-sure'
  message: text('message'),
  website: varchar('website', { length: 255 }),
  preferredStartTiming: varchar('preferred_start_timing', { length: 100 }),
  privacyConsent: boolean('privacy_consent').default(false).notNull(),
  privacyConsentAt: timestamp('privacy_consent_at', { withTimezone: true }),
  formType: varchar('form_type', { length: 50 }).default('contact').notNull(),
  status: varchar('status', { length: 50 }).default('submitted').notNull(),
  idempotencyKey: varchar('idempotency_key', { length: 128 }).notNull().unique(),
  ipHash: varchar('ip_hash', { length: 64 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  corpStatusCheck: check('corp_status_check', 
    sql`${table.status} IN ('submitted', 'in_review', 'contacted', 'archived')`),
  corpFormTypeCheck: check('corp_form_type_check',
    sql`${table.formType} IN ('contact', 'pilot')`),
  corpServiceInterestCheck: check('corp_service_interest_check',
    sql`${table.serviceInterest} IS NULL OR ${table.serviceInterest} IN ('get-online', 'get-visible', 'get-customers', 'all', 'not-sure')`),
  emailIdx: index('corp_email_idx').on(table.email),
  createdIdx: index('corp_created_at_idx').on(table.createdAt),
}));
