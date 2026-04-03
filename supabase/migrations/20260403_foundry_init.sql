-- EDINTEL FOUNDRY PERSISTENCE LAYER: COMPANION CERTIFICATES
-- Description: Stores holographic AI identities generated via the Birth Certificate Form.

CREATE TABLE IF NOT EXISTS public.companion_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL, -- References auth.users(id)
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    specialization TEXT NOT NULL,
    personality TEXT NOT NULL,
    avatar_url TEXT,
    system_prompt TEXT NOT NULL,
    certificate_id TEXT UNIQUE NOT NULL, -- Human readable serial (e.g., ED-001)
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
USING (auth.uid() = creator_id);

-- 2. Users can issue their own certificates
CREATE POLICY "Users can issue their own certificates" 
ON public.companion_certificates 
FOR INSERT 
WITH CHECK (auth.uid() = creator_id);

-- 3. Users can update their own certificates
CREATE POLICY "Users can update their own certificates" 
ON public.companion_certificates 
FOR UPDATE 
USING (auth.uid() = creator_id);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_companion_certificates_creator ON public.companion_certificates(creator_id);
CREATE INDEX IF NOT EXISTS idx_companion_certificates_serial ON public.companion_certificates(certificate_id);

-- TRIGGER FOR UPDATED_AT (if added later)
-- CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.companion_certificates FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
