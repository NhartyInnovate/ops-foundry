-- =============================================================================
-- OPS FOUNDRY MIGRATION: 0003_expand_corporate_inquiries.sql
-- Description: Expand corporate_inquiries schema with structured fields for
--              website, preferred start timing, privacy consent audit fields,
--              and form type identifier.
-- =============================================================================

ALTER TABLE "corporate_inquiries" 
  ADD COLUMN IF NOT EXISTS "website" varchar(255),
  ADD COLUMN IF NOT EXISTS "preferred_start_timing" varchar(100),
  ADD COLUMN IF NOT EXISTS "privacy_consent" boolean DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS "privacy_consent_at" timestamp with time zone,
  ADD COLUMN IF NOT EXISTS "form_type" varchar(50) DEFAULT 'contact' NOT NULL;

-- Enforce strict form_type check constraint (contact vs pilot)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'corp_form_type_check'
  ) THEN
    ALTER TABLE "corporate_inquiries"
      ADD CONSTRAINT "corp_form_type_check" 
      CHECK ("form_type" IN ('contact', 'pilot'));
  END IF;
END $$;

-- Enforce service_interest check constraint supporting all valid options
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'corp_service_interest_check'
  ) THEN
    ALTER TABLE "corporate_inquiries"
      ADD CONSTRAINT "corp_service_interest_check" 
      CHECK ("service_interest" IS NULL OR "service_interest" IN ('get-online', 'get-visible', 'get-customers', 'all', 'not-sure'));
  END IF;
END $$;

-- Update RLS policy to allow corporate runtime to insert corporate_notification_email and operational_triage_webhook
DO $$
BEGIN
  DROP POLICY IF EXISTS "corp_outbox_insert" ON notification_outbox;
  CREATE POLICY "corp_outbox_insert" ON notification_outbox
    FOR INSERT TO ops_corp_runtime
    WITH CHECK (
      channel IN ('corporate_notification_email', 'operational_triage_webhook')
      AND status = 'pending'
      AND application_id IS NULL
      AND claim_id IS NULL
      AND worker_id IS NULL
      AND attempts = 0
    );
END $$;

-- Update journal / schema comments
COMMENT ON COLUMN "corporate_inquiries"."website" IS 'Optional client organization website URL';
COMMENT ON COLUMN "corporate_inquiries"."preferred_start_timing" IS 'Optional requested start timeframe for pilot engagement';
COMMENT ON COLUMN "corporate_inquiries"."privacy_consent" IS 'Explicit consent to process details for enquiry response or pilot scoping';
COMMENT ON COLUMN "corporate_inquiries"."privacy_consent_at" IS 'Timestamp when privacy consent was explicitly granted';
COMMENT ON COLUMN "corporate_inquiries"."form_type" IS 'Originating form category: contact or pilot';
