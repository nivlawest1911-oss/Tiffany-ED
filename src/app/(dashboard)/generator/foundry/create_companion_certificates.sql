-- 🏛️ EdIntel Birth Certificate Protocol: Companion Identity Persistence
-- This table stores the 'DNA' of AI companions created in the EdIntel Foundry.

CREATE TABLE IF NOT EXISTS public.companion_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    tier TEXT NOT NULL,
    persona TEXT,
    voice_id TEXT,
    avatar_id TEXT,
    master_system_prompt TEXT,
    district_id TEXT,
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.companion_certificates ENABLE ROW LEVEL SECURITY;

-- 🛡️ Security Policy: Users can only view and manage their own certificates
CREATE POLICY "Users can manage their own certificates" 
ON public.companion_certificates 
FOR ALL 
USING (auth.uid() = creator_id);

-- 🛡️ Security Policy: Allow insertion for authenticated users
CREATE POLICY "Authenticated users can create certificates" 
ON public.companion_certificates 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- 🏛️ Institutional Analytics: Indexing for fast retrieval
CREATE INDEX IF NOT EXISTS idx_companion_certificates_creator ON public.companion_certificates(creator_id);
CREATE INDEX IF NOT EXISTS idx_companion_certificates_tier ON public.companion_certificates(tier);
