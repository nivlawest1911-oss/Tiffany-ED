-- Create the Strategic Vault table for persistent institutional intelligence
CREATE TABLE IF NOT EXISTS public.strategic_vault (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    content TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    tags TEXT [] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable Row Level Security
ALTER TABLE public.strategic_vault ENABLE ROW LEVEL SECURITY;
-- Policies for Strategic Vault
CREATE POLICY "Users can view own vault documents" ON public.strategic_vault FOR
SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can upload vault documents" ON public.strategic_vault FOR
INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own vault documents" ON public.strategic_vault FOR DELETE TO authenticated USING (auth.uid() = user_id);
-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_strategic_vault_updated_at ON public.strategic_vault;
CREATE TRIGGER update_strategic_vault_updated_at BEFORE
UPDATE ON public.strategic_vault FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();