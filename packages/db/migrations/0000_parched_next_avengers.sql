CREATE TABLE "admissions_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"course_code" varchar(50) NOT NULL,
	"form_responses" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"status" varchar(50) DEFAULT 'submitted' NOT NULL,
	"admin_notes" text,
	"status_updated_at" timestamp with time zone,
	"status_updated_by" varchar(255),
	"idempotency_key" varchar(128) NOT NULL,
	"ip_hash" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admissions_applications_idempotency_key_unique" UNIQUE("idempotency_key"),
	CONSTRAINT "admissions_status_check" CHECK ("admissions_applications"."status" IN ('submitted', 'in_review', 'approved', 'rejected', 'waitlisted', 'archived'))
);
--> statement-breakpoint
CREATE TABLE "admissions_status_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"from_status" varchar(50),
	"to_status" varchar(50) NOT NULL,
	"changed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"changed_by" varchar(255),
	"note" text,
	CONSTRAINT "history_status_check" CHECK ("admissions_status_history"."to_status" IN ('submitted', 'in_review', 'approved', 'rejected', 'waitlisted', 'archived'))
);
--> statement-breakpoint
CREATE TABLE "corporate_inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"organization" varchar(255) NOT NULL,
	"phone" varchar(50),
	"service_interest" varchar(100),
	"message" text,
	"status" varchar(50) DEFAULT 'submitted' NOT NULL,
	"idempotency_key" varchar(128) NOT NULL,
	"ip_hash" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "corporate_inquiries_idempotency_key_unique" UNIQUE("idempotency_key"),
	CONSTRAINT "corp_status_check" CHECK ("corporate_inquiries"."status" IN ('submitted', 'in_review', 'contacted', 'archived'))
);
--> statement-breakpoint
CREATE TABLE "notification_outbox" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"channel" varchar(50) NOT NULL,
	"recipient" varchar(255) NOT NULL,
	"payload" jsonb NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"worker_id" varchar(100),
	"claim_id" uuid,
	"lease_expires_at" timestamp with time zone,
	"attempts" integer DEFAULT 0 NOT NULL,
	"max_attempts" integer DEFAULT 5 NOT NULL,
	"last_attempt_at" timestamp with time zone,
	"scheduled_for" timestamp with time zone DEFAULT now() NOT NULL,
	"error_message" text,
	"completed_at" timestamp with time zone,
	"application_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "outbox_status_check" CHECK ("notification_outbox"."status" IN ('pending', 'processing', 'completed', 'failed', 'dead_letter'))
);
--> statement-breakpoint
ALTER TABLE "admissions_status_history" ADD CONSTRAINT "admissions_status_history_application_id_admissions_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."admissions_applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_outbox" ADD CONSTRAINT "notification_outbox_application_id_admissions_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."admissions_applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "admissions_email_idx" ON "admissions_applications" USING btree ("email");--> statement-breakpoint
CREATE INDEX "admissions_course_idx" ON "admissions_applications" USING btree ("course_code");--> statement-breakpoint
CREATE INDEX "admissions_status_idx" ON "admissions_applications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "admissions_created_at_idx" ON "admissions_applications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "status_history_app_idx" ON "admissions_status_history" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX "status_history_changed_at_idx" ON "admissions_status_history" USING btree ("changed_at");--> statement-breakpoint
CREATE INDEX "corp_email_idx" ON "corporate_inquiries" USING btree ("email");--> statement-breakpoint
CREATE INDEX "corp_created_at_idx" ON "corporate_inquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "outbox_claim_idx" ON "notification_outbox" USING btree ("status","scheduled_for","lease_expires_at");