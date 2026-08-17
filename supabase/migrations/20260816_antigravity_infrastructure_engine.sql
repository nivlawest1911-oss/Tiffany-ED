-- Antigravity Infrastructure Engine Core Migration
-- Migration Name: 20260816_antigravity_infrastructure_engine

-- Enable Vector Extension and Vault Security
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Agent Registry Table (Maps Hierarchy Tiers & Model Assignments)
CREATE TABLE IF NOT EXISTS public.agent_registry (
    agent_id TEXT PRIMARY KEY,
    agent_name TEXT NOT NULL,
    tier_level INT NOT NULL CHECK (tier_level BETWEEN 1 AND 4), -- 1: Executive, 2: Supervisor, 3: Specialist, 4: Micro-Agent
    role_description TEXT NOT NULL,
    assigned_model TEXT NOT NULL, -- e.g., 'gemini-3.6-flash', 'gemini-3.5-flash-lite'
    mcp_tools_enabled TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Populate Core Agent Staff Hierarchy
INSERT INTO public.agent_registry (agent_id, agent_name, tier_level, role_description, assigned_model, mcp_tools_enabled) VALUES
('ceo_orchestrator', 'Chief Executive Orchestrator', 1, 'Strategic planning, task decomposition, and top-level synthesis', 'gemini-3.6-flash', '{"dispatch_subtask", "synthesize_results"}'),
('ethics_compliance_auditor', 'Ethics & Regulatory Auditor', 1, 'Audits outputs for legal compliance (SB 63, FERPA, HIPAA)', 'gemini-3.6-flash', '{"verify_human_gate", "lock_export"}'),
('clinical_pedagogical_sup', 'Clinical & Pedagogical Supervisor', 2, 'Oversees academic alignment, IEP goals, and clinical reports', 'claude-3.5-sonnet', '{"query_acos_standards", "draft_bip_iep"}'),
('cyber_sentinel_arch', 'Cyber-Sentinel Security Architect', 2, 'Monitors data flows, encrypts streams, and verifies access', 'gemini-3.5-flash', '{"audit_vault", "scan_vulnerabilities"}'),
('code_deploy_specialist', 'Code Review & Deployment Specialist', 3, 'Executes unit tests, validates DB migrations, creates PRs', 'claude-3.5-sonnet', '{"git_commit", "deploy_edge_function"}'),
('transcription_scribe', 'Ambient Audio Transcription Micro-Agent', 4, 'Ingests hardware audio feeds and outputs structured JSON summaries', 'gemini-3.5-flash-lite', '{"parse_audio", "write_digital_log"}'),
('transparency_clerk', 'Public Transparency Sync Micro-Agent', 4, 'Categorizes resources and updates public portal for HB 15 compliance', 'gemini-3.5-flash-lite', '{"publish_transparency_portal"}')
ON CONFLICT (agent_id) DO UPDATE SET
    agent_name = EXCLUDED.agent_name,
    tier_level = EXCLUDED.tier_level,
    role_description = EXCLUDED.role_description,
    assigned_model = EXCLUDED.assigned_model,
    mcp_tools_enabled = EXCLUDED.mcp_tools_enabled;

-- 2. State Vector Grounding Store (ACOS Standards & Policy Context)
CREATE TABLE IF NOT EXISTS public.knowledge_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'ACOS_Standard', 'Board_Policy', 'Legal_Statute'
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- Vector dimensions for semantic search
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Asynchronous Agent Task Execution Queue
CREATE TABLE IF NOT EXISTS public.agent_execution_queue (
    task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_task_id UUID REFERENCES public.agent_execution_queue(task_id),
    target_agent_id TEXT REFERENCES public.agent_registry(agent_id),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    payload JSONB NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'awaiting_human_approval')),
    result JSONB,
    requires_human_approval BOOLEAN DEFAULT FALSE,
    verified_by_human BOOLEAN DEFAULT FALSE,
    human_verifier_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User Token Balances & Automated Metering Function
CREATE TABLE IF NOT EXISTS public.user_token_balances (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    subscription_tier TEXT NOT NULL DEFAULT 'Basic',
    allocated_tokens BIGINT NOT NULL DEFAULT 500,
    used_tokens BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Execution Logs Table for Hardware & Micro-Agent Telemetry
CREATE TABLE IF NOT EXISTS public.agent_execution_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    agent_identifier TEXT NOT NULL,
    tokens_consumed INT DEFAULT 1,
    execution_duration_ms INT DEFAULT 0,
    result JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.deduct_agent_tokens(
    p_user_id UUID,
    p_token_cost INT
) RETURNS VOID AS $$
DECLARE
    v_remaining BIGINT;
BEGIN
    SELECT (allocated_tokens - used_tokens) INTO v_remaining
    FROM public.user_token_balances
    WHERE user_id = p_user_id;

    IF v_remaining IS NULL OR v_remaining < p_token_cost THEN
        RAISE EXCEPTION 'Insufficient token balance for requested AI operation.';
    END IF;

    UPDATE public.user_token_balances
    SET used_tokens = used_tokens + p_token_cost,
        updated_at = NOW()
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
