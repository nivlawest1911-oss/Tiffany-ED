-- EDINTEL FOUNDRY PERSISTENCE LAYER: COMPANION CERTIFICATES
-- Description: Stores holographic AI identities generated via the Birth Certificate Form.
-- Schema matches issueBirthCertificate() in src/lib/supabase.ts

CREATE TABLE IF NOT EXISTS public.companion_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL,          -- References auth.users(id)
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    tier TEXT NOT NULL DEFAULT 'NOVICE',
    persona JSONB DEFAULT '{}'::jsonb, -- { tone, mission, culturalContext, pedagogicalDirectives }
    voice_id TEXT DEFAULT 'eleven_labs_default',
    avatar_id TEXT DEFAULT 'heygen_default',
    master_system_prompt TEXT NOT NULL DEFAULT '',
    district_id TEXT DEFAULT 'MOBILE_COUNTY_AL',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.companion_certificates ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- 1. Users can view their own certificates
CREATE POLICY "Users can view their own certificates"
ON public.companion_certificates
FOR SELECT
USING (auth.uid()::text = creator_id::text);

-- 2. Users can issue their own certificates
CREATE POLICY "Users can issue their own certificates"
ON public.companion_certificates
FOR INSERT
WITH CHECK (auth.uid()::text = creator_id::text);

-- 3. Users can update their own certificates
CREATE POLICY "Users can update their own certificates"
ON public.companion_certificates
FOR UPDATE
USING (auth.uid()::text = creator_id::text);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_companion_certificates_creator ON public.companion_certificates(creator_id);
CREATE INDEX IF NOT EXISTS idx_companion_certificates_district ON public.companion_certificates(district_id);
CREATE INDEX IF NOT EXISTS idx_companion_certificates_created ON public.companion_certificates(created_at DESC);
