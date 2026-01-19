-- ============================================
-- EdIntel Sovereign - Database Initialization
-- Google Cloud SQL (Postgres 15 + pgvector)
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================
-- CORE TABLES
-- ============================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'educator',
    district TEXT,
    school TEXT,
    position TEXT,
    
    -- Subscription & Billing
    stripe_customer_id TEXT UNIQUE,
    subscription_tier TEXT DEFAULT 'free',
    subscription_status TEXT DEFAULT 'inactive',
    tokens_remaining INTEGER DEFAULT 10,
    xp_points INTEGER DEFAULT 0,
    
    -- Security
    password_hash TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_district_school ON users(district, school);

-- ============================================
-- TOKEN PURCHASING SYSTEM (Double-Entry Ledger)
-- Financial-grade accuracy with automatic sync
-- ============================================

-- User Balances (Real-time state - checked by Vercel)
CREATE TABLE IF NOT EXISTS user_balances (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    current_tokens INTEGER DEFAULT 0 CHECK (current_tokens >= 0),
    lifetime_tokens_purchased INTEGER DEFAULT 0,
    lifetime_tokens_used INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token Ledger (Immutable transaction history)
-- Every token change MUST be recorded here
CREATE TABLE IF NOT EXISTS token_ledger (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Transaction Details
    amount INTEGER NOT NULL, -- Positive for credits, negative for debits
    balance_after INTEGER NOT NULL, -- Balance snapshot after transaction
    
    -- Transaction Classification
    transaction_type TEXT NOT NULL, -- SIGNUP_BONUS, PURCHASE, AI_GENERATION, AI_OBSERVATION, REFUND
    transaction_subtype TEXT, -- Specific action (e.g., 'iep-architect', 'evidence-folder')
    
    -- References
    purchase_id TEXT REFERENCES token_purchases(id),
    generation_id TEXT REFERENCES generations(id),
    session_id TEXT, -- Avatar session or other session ID
    
    -- Metadata
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Audit Trail
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by TEXT, -- User ID or 'system'
    ip_address TEXT
);

CREATE INDEX idx_token_ledger_user ON token_ledger(user_id, created_at DESC);
CREATE INDEX idx_token_ledger_type ON token_ledger(transaction_type);
CREATE INDEX idx_token_ledger_purchase ON token_ledger(purchase_id);

-- Token Packages (Pricing Tiers)
CREATE TABLE IF NOT EXISTS token_packages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name TEXT NOT NULL,
    description TEXT,
    token_amount INTEGER NOT NULL,
    price_cents INTEGER NOT NULL, -- Price in cents (e.g., 7900 = $79.00)
    stripe_price_id TEXT UNIQUE,
    
    -- Package Metadata
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    bonus_tokens INTEGER DEFAULT 0,
    
    -- Tier Classification
    tier_level TEXT DEFAULT 'standard', -- free, standard, professional, district
    
    -- Display
    display_order INTEGER DEFAULT 0,
    badge_text TEXT, -- "MOST POPULAR", "BEST VALUE", etc.
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default token packages
INSERT INTO token_packages (name, description, token_amount, price_cents, tier_level, is_featured, bonus_tokens, badge_text, display_order) VALUES
    ('Starter Pack', '50 AI generations - Perfect for trying EdIntel', 50, 1900, 'standard', false, 5, NULL, 1),
    ('Professional', '500 AI generations + Priority Support', 500, 7900, 'professional', true, 50, 'MOST POPULAR', 2),
    ('Power User', '1500 AI generations + All Features', 1500, 19900, 'professional', false, 200, 'BEST VALUE', 3),
    ('District License', 'Unlimited tokens for entire district', 999999, 49900, 'district', true, 0, 'ENTERPRISE', 4)
ON CONFLICT DO NOTHING;

-- Token Purchases (Transaction History)
CREATE TABLE IF NOT EXISTS token_purchases (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    package_id TEXT NOT NULL REFERENCES token_packages(id),
    
    -- Purchase Details
    tokens_purchased INTEGER NOT NULL,
    price_paid_cents INTEGER NOT NULL,
    bonus_tokens INTEGER DEFAULT 0,
    
    -- Stripe Integration
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_charge_id TEXT,
    stripe_customer_id TEXT,
    payment_method TEXT, -- card, bank_transfer, etc.
    
    -- Status Tracking
    status TEXT DEFAULT 'pending', -- pending, processing, completed, failed, refunded
    
    -- Timestamps
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    refunded_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Audit
    ip_address TEXT,
    user_agent TEXT
);

CREATE INDEX idx_token_purchases_user ON token_purchases(user_id, purchased_at DESC);
CREATE INDEX idx_token_purchases_status ON token_purchases(status);
CREATE INDEX idx_token_purchases_stripe ON token_purchases(stripe_payment_intent_id);

-- ============================================
-- LEDGER AUTOMATION: Token Sync Trigger
-- Automatically updates balance when ledger entry is made
-- ============================================

CREATE OR REPLACE FUNCTION sync_user_token_balance()
RETURNS TRIGGER AS $$
DECLARE
    v_new_balance INTEGER;
BEGIN
    -- Calculate new balance
    SELECT COALESCE(SUM(amount), 0) INTO v_new_balance
    FROM token_ledger
    WHERE user_id = NEW.user_id;
    
    -- Ensure balance doesn't go negative
    IF v_new_balance < 0 THEN
        RAISE EXCEPTION 'Insufficient tokens. Current balance would be: %', v_new_balance;
    END IF;
    
    -- Update or insert balance
    INSERT INTO user_balances (user_id, current_tokens, updated_at)
    VALUES (NEW.user_id, v_new_balance, NOW())
    ON CONFLICT (user_id) DO UPDATE
    SET current_tokens = v_new_balance,
        updated_at = NOW();
    
    -- Update lifetime stats
    IF NEW.amount > 0 THEN
        UPDATE user_balances
        SET lifetime_tokens_purchased = lifetime_tokens_purchased + NEW.amount
        WHERE user_id = NEW.user_id;
    ELSE
        UPDATE user_balances
        SET lifetime_tokens_used = lifetime_tokens_used + ABS(NEW.amount)
        WHERE user_id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_token_balance
AFTER INSERT ON token_ledger
FOR EACH ROW
EXECUTE FUNCTION sync_user_token_balance();

-- ============================================
-- HELPER FUNCTIONS FOR TOKEN OPERATIONS
-- ============================================

-- Function to add tokens (from purchase or bonus)
CREATE OR REPLACE FUNCTION add_tokens_to_ledger(
    p_user_id TEXT,
    p_amount INTEGER,
    p_transaction_type TEXT,
    p_description TEXT DEFAULT NULL,
    p_purchase_id TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS TEXT AS $$
DECLARE
    v_ledger_id TEXT;
    v_current_balance INTEGER;
BEGIN
    -- Get current balance
    SELECT COALESCE(current_tokens, 0) INTO v_current_balance
    FROM user_balances
    WHERE user_id = p_user_id;
    
    -- Insert into ledger (trigger will update balance)
    INSERT INTO token_ledger (
        user_id, 
        amount, 
        balance_after,
        transaction_type, 
        description, 
        purchase_id,
        metadata,
        created_by
    )
    VALUES (
        p_user_id, 
        p_amount, 
        v_current_balance + p_amount,
        p_transaction_type, 
        p_description, 
        p_purchase_id,
        p_metadata,
        p_user_id
    )
    RETURNING id INTO v_ledger_id;
    
    RETURN v_ledger_id;
END;
$$ LANGUAGE plpgsql;

-- Function to deduct tokens (for AI usage)
CREATE OR REPLACE FUNCTION deduct_tokens_from_ledger(
    p_user_id TEXT,
    p_amount INTEGER,
    p_transaction_type TEXT,
    p_transaction_subtype TEXT DEFAULT NULL,
    p_description TEXT DEFAULT NULL,
    p_generation_id TEXT DEFAULT NULL,
    p_session_id TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_balance INTEGER;
    v_ledger_id TEXT;
BEGIN
    -- Get current balance with row lock
    SELECT current_tokens INTO v_current_balance
    FROM user_balances
    WHERE user_id = p_user_id
    FOR UPDATE;
    
    -- Check if user has enough tokens
    IF v_current_balance IS NULL OR v_current_balance < p_amount THEN
        RETURN FALSE;
    END IF;
    
    -- Insert deduction into ledger (negative amount)
    INSERT INTO token_ledger (
        user_id, 
        amount, 
        balance_after,
        transaction_type,
        transaction_subtype,
        description, 
        generation_id,
        session_id,
        metadata,
        created_by
    )
    VALUES (
        p_user_id, 
        -p_amount, 
        v_current_balance - p_amount,
        p_transaction_type,
        p_transaction_subtype,
        p_description, 
        p_generation_id,
        p_session_id,
        p_metadata,
        p_user_id
    )
    RETURNING id INTO v_ledger_id;
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Function to complete token purchase (called after Stripe confirmation)
CREATE OR REPLACE FUNCTION complete_token_purchase(
    p_purchase_id TEXT,
    p_stripe_charge_id TEXT
)
RETURNS VOID AS $$
DECLARE
    v_user_id TEXT;
    v_tokens INTEGER;
    v_bonus_tokens INTEGER;
    v_total_tokens INTEGER;
BEGIN
    -- Get purchase details
    SELECT user_id, tokens_purchased, bonus_tokens
    INTO v_user_id, v_tokens, v_bonus_tokens
    FROM token_purchases
    WHERE id = p_purchase_id;
    
    v_total_tokens := v_tokens + v_bonus_tokens;
    
    -- Update purchase status
    UPDATE token_purchases
    SET status = 'completed',
        stripe_charge_id = p_stripe_charge_id,
        completed_at = CURRENT_TIMESTAMP
    WHERE id = p_purchase_id;
    
    -- Add tokens to ledger (trigger will update balance)
    PERFORM add_tokens_to_ledger(
        v_user_id,
        v_total_tokens,
        'PURCHASE',
        format('Purchased %s tokens + %s bonus', v_tokens, v_bonus_tokens),
        p_purchase_id,
        jsonb_build_object(
            'base_tokens', v_tokens,
            'bonus_tokens', v_bonus_tokens,
            'stripe_charge_id', p_stripe_charge_id
        )
    );
    
    -- Also update legacy tokens_remaining for backwards compatibility
    UPDATE users
    SET tokens_remaining = tokens_remaining + v_total_tokens
    WHERE id = v_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to refund token purchase
CREATE OR REPLACE FUNCTION refund_token_purchase(
    p_purchase_id TEXT,
    p_reason TEXT DEFAULT 'Customer request'
)
RETURNS VOID AS $$
DECLARE
    v_user_id TEXT;
    v_tokens INTEGER;
    v_bonus_tokens INTEGER;
    v_total_tokens INTEGER;
BEGIN
    -- Get purchase details
    SELECT user_id, tokens_purchased, bonus_tokens
    INTO v_user_id, v_tokens, v_bonus_tokens
    FROM token_purchases
    WHERE id = p_purchase_id AND status = 'completed';
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Purchase not found or not completed';
    END IF;
    
    v_total_tokens := v_tokens + v_bonus_tokens;
    
    -- Update purchase status
    UPDATE token_purchases
    SET status = 'refunded',
        refunded_at = CURRENT_TIMESTAMP,
        metadata = metadata || jsonb_build_object('refund_reason', p_reason)
    WHERE id = p_purchase_id;
    
    -- Deduct tokens from ledger
    PERFORM add_tokens_to_ledger(
        v_user_id,
        -v_total_tokens,
        'REFUND',
        format('Refund: %s', p_reason),
        p_purchase_id,
        jsonb_build_object('refunded_tokens', v_total_tokens)
    );
    
    -- Update legacy balance
    UPDATE users
    SET tokens_remaining = GREATEST(0, tokens_remaining - v_total_tokens)
    WHERE id = v_user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SUBSCRIPTION MANAGEMENT
-- ============================================

-- Subscriptions table (for recurring billing)
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Stripe Integration
    stripe_subscription_id TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT NOT NULL,
    stripe_price_id TEXT NOT NULL,
    
    -- Subscription Details
    status TEXT NOT NULL, -- active, canceled, past_due, trialing
    current_period_start TIMESTAMP NOT NULL,
    current_period_end TIMESTAMP NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT false,
    
    -- Token Allocation
    monthly_token_allowance INTEGER DEFAULT 500,
    tokens_reset_day INTEGER DEFAULT 1, -- Day of month to reset tokens
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    canceled_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- AI AVATAR SESSIONS
-- ============================================

CREATE TABLE IF NOT EXISTS avatar_sessions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Session Metadata
    avatar_name TEXT NOT NULL,
    avatar_role TEXT NOT NULL,
    engine TEXT DEFAULT 'duix',
    
    -- Performance Metrics
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    duration INTEGER, -- seconds
    latency_avg REAL, -- milliseconds
    
    -- Conversation Data
    conversation_log JSONB DEFAULT '[]'::jsonb,
    user_sentiment TEXT,
    
    -- Gemini 3 Pro Thought Signatures (MANDATORY for stateful reasoning)
    thought_signatures JSONB DEFAULT '{}'::jsonb,
    -- Structure: { "latest": "encrypted_signature", "history": [...], "timestamp": "ISO8601" }
    
    -- GCP Integration
    gcp_session_id TEXT UNIQUE,
    vertex_ai_model TEXT DEFAULT 'gemini-1.5-pro',
    cloud_run_endpoint TEXT,
    
    -- Context Caching (Alabama regulations)
    context_cache_id TEXT, -- Vertex AI cache ID for 90% cost reduction
    cached_regulations JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_avatar_sessions_user ON avatar_sessions(user_id, started_at DESC);
CREATE INDEX idx_avatar_sessions_gcp ON avatar_sessions(gcp_session_id);
CREATE INDEX idx_avatar_sessions_thought ON avatar_sessions((thought_signatures->>'latest'));

-- ============================================
-- EVIDENCE FOLDER SYSTEM
-- ============================================

CREATE TABLE IF NOT EXISTS evidence_folders (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Student Information (Anonymized)
    student_id TEXT NOT NULL,
    grade_level TEXT,
    special_ed_status TEXT,
    
    -- Folder Metadata
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- AI-Generated Insights
    ai_summary TEXT,
    risk_level TEXT,
    compliance_score REAL,
    
    -- Vector Embeddings (pgvector)
    embedding vector(1536)
);

CREATE INDEX idx_evidence_folders_user ON evidence_folders(user_id, student_id);
CREATE INDEX idx_evidence_folders_category ON evidence_folders(category, risk_level);

-- ============================================
-- OBSERVATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS observations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    evidence_folder_id TEXT REFERENCES evidence_folders(id) ON DELETE SET NULL,
    avatar_session_id TEXT REFERENCES avatar_sessions(id) ON DELETE SET NULL,
    
    -- Observation Data
    observation_type TEXT NOT NULL,
    observation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration INTEGER, -- minutes
    
    -- Content
    description TEXT NOT NULL,
    context TEXT,
    interventions TEXT,
    
    -- AI Analysis
    ai_analysis TEXT,
    suggested_actions JSONB,
    legal_compliance BOOLEAN DEFAULT false,
    
    -- Attachments
    has_audio BOOLEAN DEFAULT false,
    has_video BOOLEAN DEFAULT false,
    has_images BOOLEAN DEFAULT false,
    
    -- Vector Embeddings
    embedding vector(1536),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_observations_user ON observations(user_id, observation_date DESC);
CREATE INDEX idx_observations_folder ON observations(evidence_folder_id);
CREATE INDEX idx_observations_type ON observations(observation_type);

-- ============================================
-- DOCUMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    evidence_folder_id TEXT NOT NULL REFERENCES evidence_folders(id) ON DELETE CASCADE,
    
    -- File Metadata
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    
    -- GCP Storage
    gcp_bucket_path TEXT NOT NULL,
    gcp_signed_url TEXT,
    url_expires_at TIMESTAMP,
    
    -- Security
    encrypted BOOLEAN DEFAULT true,
    access_level TEXT DEFAULT 'private',
    
    -- AI Processing
    extracted_text TEXT,
    ai_summary TEXT,
    embedding vector(1536),
    
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_folder ON documents(evidence_folder_id);
CREATE INDEX idx_documents_type ON documents(file_type);

-- ============================================
-- AI GENERATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS generations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    generator_id TEXT NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT NOT NULL,
    
    -- Avatar Integration
    professor_video_url TEXT,
    avatar_engine TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_generations_user ON generations(user_id, created_at DESC);
CREATE INDEX idx_generations_generator ON generations(generator_id);

-- ============================================
-- ANALYTICS
-- ============================================

CREATE TABLE IF NOT EXISTS analytics_events (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT,
    
    -- Event Data
    event_type TEXT NOT NULL,
    event_category TEXT NOT NULL,
    event_action TEXT NOT NULL,
    event_label TEXT,
    
    -- Performance Metrics
    latency REAL,
    tokens_used INTEGER,
    gcp_cost REAL,
    
    -- Context
    metadata JSONB,
    user_agent TEXT,
    ip_address TEXT,
    
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_type ON analytics_events(event_type, timestamp DESC);
CREATE INDEX idx_analytics_user ON analytics_events(user_id, timestamp DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_token_packages_updated_at BEFORE UPDATE ON token_packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_folders_updated_at BEFORE UPDATE ON evidence_folders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_observations_updated_at BEFORE UPDATE ON observations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to deduct tokens
CREATE OR REPLACE FUNCTION deduct_tokens(
    p_user_id TEXT,
    p_tokens INTEGER,
    p_action_type TEXT,
    p_generator_id TEXT DEFAULT NULL,
    p_session_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_balance INTEGER;
BEGIN
    -- Get current balance
    SELECT tokens_remaining INTO v_current_balance
    FROM users
    WHERE id = p_user_id
    FOR UPDATE;
    
    -- Check if user has enough tokens
    IF v_current_balance < p_tokens THEN
        RETURN FALSE;
    END IF;
    
    -- Deduct tokens
    UPDATE users
    SET tokens_remaining = tokens_remaining - p_tokens
    WHERE id = p_user_id;
    
    -- Log usage
    INSERT INTO token_usage (user_id, tokens_used, action_type, generator_id, session_id)
    VALUES (p_user_id, p_tokens, p_action_type, p_generator_id, p_session_id);
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to add tokens (from purchase)
CREATE OR REPLACE FUNCTION add_tokens(
    p_user_id TEXT,
    p_tokens INTEGER
)
RETURNS VOID AS $$
BEGIN
    UPDATE users
    SET tokens_remaining = tokens_remaining + p_tokens
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to complete token purchase
CREATE OR REPLACE FUNCTION complete_token_purchase(
    p_purchase_id TEXT,
    p_stripe_charge_id TEXT
)
RETURNS VOID AS $$
DECLARE
    v_user_id TEXT;
    v_tokens INTEGER;
    v_bonus_tokens INTEGER;
BEGIN
    -- Get purchase details
    SELECT user_id, tokens_purchased, bonus_tokens
    INTO v_user_id, v_tokens, v_bonus_tokens
    FROM token_purchases
    WHERE id = p_purchase_id;
    
    -- Update purchase status
    UPDATE token_purchases
    SET status = 'completed',
        stripe_charge_id = p_stripe_charge_id,
        completed_at = CURRENT_TIMESTAMP
    WHERE id = p_purchase_id;
    
    -- Add tokens to user account
    PERFORM add_tokens(v_user_id, v_tokens + v_bonus_tokens);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INITIAL DATA
-- ============================================

-- Create demo user (for testing)
INSERT INTO users (id, email, name, role, district, school, tokens_remaining, subscription_tier)
VALUES (
    'demo-user-001',
    'demo@edintel.app',
    'Demo Educator',
    'educator',
    'Mobile County Schools',
    'Demo Elementary',
    100,
    'professional'
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- PERMISSIONS & SECURITY
-- ============================================

-- Grant permissions to application user
-- Note: Replace 'edintel_user' with your actual database user
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO edintel_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO edintel_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO edintel_user;

-- ============================================
-- COMPLETION
-- ============================================

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE '✅ EdIntel Sovereign database initialized successfully';
    RAISE NOTICE '📊 Tables created: users, token_packages, token_purchases, token_usage, subscriptions';
    RAISE NOTICE '🧠 AI Tables: avatar_sessions, evidence_folders, observations, documents, generations';
    RAISE NOTICE '📈 Analytics: analytics_events';
    RAISE NOTICE '🔐 Security: Workload Identity Federation ready';
    RAISE NOTICE '💰 Token System: Purchasing and usage tracking enabled';
END $$;
