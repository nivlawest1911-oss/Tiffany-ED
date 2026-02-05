-- ENABLE VECTOR FOR AI AGENTS
create extension if not exists vector;
-- SCHOOL SITES (The Nodes)
CREATE TABLE IF NOT EXISTS sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    district TEXT DEFAULT 'Mobile County',
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT now()
);
-- STUDENT EVIDENCE (FERPA Compliant)
CREATE TABLE IF NOT EXISTS evidence_vault (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id UUID REFERENCES sites(id),
    student_hash TEXT NOT NULL,
    -- Anonymized
    observation_data TEXT,
    compliance_tag TEXT DEFAULT 'AL Code 290-8-9',
    embedding vector(1536),
    -- For Intelligence Agent memory
    created_at TIMESTAMPTZ DEFAULT now()
);
-- SYSTEM LOGS (Feeds the Terminal)
CREATE TABLE IF NOT EXISTS system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id UUID REFERENCES sites(id),
    log_entry TEXT NOT NULL,
    severity TEXT DEFAULT 'INFO',
    created_at TIMESTAMPTZ DEFAULT now()
);