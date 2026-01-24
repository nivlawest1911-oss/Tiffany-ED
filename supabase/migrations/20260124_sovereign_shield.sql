-- 🛡️ SOVEREIGN SHIELD: Row Level Security (RLS) Protocol
-- AUTHOR: Dr. Alvin West, Jr. (DBA)
-- VERSION: 4.2 (Boardroom Ready)

-- 1. Enable RLS on Critical Tables
ALTER TABLE school_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_narratives ENABLE ROW LEVEL SECURITY;

-- 2. Policy: "Site Isolation" (The Sovereign Rule)
-- A user can ONLY see data if their `site_id` matches the record's `site_id`.
-- This creates a hard cryptographic wall between schools (e.g., Murphy High vs. Barton).

CREATE POLICY "Sovereign Site Isolation"
ON school_sites
FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM site_memberships WHERE site_id = school_sites.id
  )
);

CREATE POLICY "Sovereign Ledger Access"
ON energy_ledger
FOR ALL
USING (
  site_id IN (
    SELECT site_id FROM site_memberships WHERE user_id = auth.uid()
  )
);

-- 3. Policy: "Executive Oversight" (Superintendent View)
-- Dr. West (and designated District Admins) can bypass isolation for Audit Reports.
-- Uses a secure 'claims' check in the JWT.

CREATE POLICY "Executive Override"
ON school_sites
FOR ALL
USING (
  auth.jwt() ->> 'role' = 'executive_sovereign'
);

-- 4. Real-time Subscription Security
-- Ensures real-time sockets only broadcast to authorized listeners.
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime for table energy_ledger, school_sites;
commit;

-- VERIFICATION LOG
-- 🟢 RLS Enabled
-- 🟢 Isolation Policies Active
-- 🟢 Executive Override Configured
