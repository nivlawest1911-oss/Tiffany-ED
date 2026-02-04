-- 1. Create the Sovereign Vault for Compliance Logging
CREATE TABLE IF NOT EXISTS vault_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    -- Ties to auth.users
    input_text TEXT NOT NULL,
    output_text TEXT NOT NULL,
    engine_metadata JSONB DEFAULT '{}'::jsonb,
    -- Stores BCI, Literacy, and Behavior snapshots
    district_context TEXT DEFAULT 'Mobile County',
    compliance_check BOOLEAN DEFAULT TRUE,
    tokens_consumed INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 2. Create the Agent Telemetry Table for Swarm Monitoring
CREATE TABLE IF NOT EXISTS agent_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id TEXT NOT NULL,
    -- e.g., 'ref_gen', 'lit_pro'
    action_performed TEXT NOT NULL,
    performance_ms INTEGER,
    -- Latency tracking
    success_rate FLOAT DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 3. Create/Update the Profiles Table for Usage Tokens
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT,
    usage_tokens INTEGER DEFAULT 1000,
    -- Default tokens for trial period
    is_admin BOOLEAN DEFAULT FALSE,
    last_active TIMESTAMPTZ DEFAULT NOW()
);
-- 4. Enable Row Level Security (RLS)
ALTER TABLE vault_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_telemetry ENABLE ROW LEVEL SECURITY;
-- 5. Create Security Policies (Only User can read their own logs)
CREATE POLICY "Users can view own vault logs" ON vault_logs FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert vault logs" ON vault_logs FOR
INSERT WITH CHECK (auth.uid() = user_id);
-- 6. Create RPC for Token Deduction (Secure Transaction)
CREATE OR REPLACE FUNCTION deduct_user_tokens(token_amount INTEGER, target_user UUID) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE current_balance INTEGER;
BEGIN -- Get current balance
SELECT usage_tokens INTO current_balance
FROM user_profiles
WHERE id = target_user;
-- Check if user exists and has enough tokens
IF current_balance IS NULL THEN RAISE EXCEPTION 'User not found';
END IF;
IF current_balance < token_amount THEN RAISE EXCEPTION 'Insufficient tokens';
END IF;
-- Deduct tokens
UPDATE user_profiles
SET usage_tokens = usage_tokens - token_amount
WHERE id = target_user;
RETURN TRUE;
END;
$$;