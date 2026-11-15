-- Ops Foundry Database Security & Row-Level Security (RLS) Policies
-- Enforces zero client-side leakage, minimal worker privilege, and admin RBAC.

-- 1. Enable RLS on all tables
ALTER TABLE admissions_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_outbox ENABLE ROW LEVEL SECURITY;

-- 2. Admissions Applications Policies
-- Public anonymous applicants may submit applications via server actions, but cannot read or query them
CREATE POLICY "anon_insert_admissions" ON admissions_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Authenticated Foundry Administrators can review and update admissions applications
CREATE POLICY "admin_select_admissions" ON admissions_applications
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'role') = 'foundry_admin');

CREATE POLICY "admin_update_admissions" ON admissions_applications
  FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'role') = 'foundry_admin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'foundry_admin');

-- 3. Admissions Status History Policies
-- Append-only audit history viewable by Foundry Administrators
CREATE POLICY "admin_select_status_history" ON admissions_status_history
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'role') = 'foundry_admin');

CREATE POLICY "admin_insert_status_history" ON admissions_status_history
  FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() ->> 'role') = 'foundry_admin');

-- 4. Corporate Inquiries Policies
-- Anonymous visitors can submit contact/consultation inquiries
CREATE POLICY "anon_insert_corporate_inquiries" ON corporate_inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Authenticated Foundry Administrators can review and manage inquiries
CREATE POLICY "admin_select_corporate_inquiries" ON corporate_inquiries
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'role') = 'foundry_admin');

CREATE POLICY "admin_update_corporate_inquiries" ON corporate_inquiries
  FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'role') = 'foundry_admin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'foundry_admin');

-- 5. Notification Outbox Worker Security
-- Workers operate via direct DB credentials (e.g. Supabase Transaction Pooler)
-- Restricted to notification_outbox table only.
-- Worker role must NOT have SELECT permissions on admissions_applications.
REVOKE ALL ON admissions_applications FROM public;
GRANT INSERT ON admissions_applications TO anon, authenticated;
GRANT ALL ON admissions_applications TO service_role;

REVOKE ALL ON notification_outbox FROM anon;
GRANT ALL ON notification_outbox TO service_role;
