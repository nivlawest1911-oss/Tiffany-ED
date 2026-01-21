-- EdIntel Professional - Complete Database Schema
-- Run this in Vercel Postgres Dashboard

-- ============================================
-- MEDIA STORAGE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS edintel_media (
  id SERIAL PRIMARY KEY,
  file_name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  media_type TEXT CHECK (media_type IN ('image', 'video', 'audio')),
  size BIGINT,
  width INTEGER,
  height INTEGER,
  duration INTEGER, -- for videos in seconds
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_media_type ON edintel_media(media_type);
CREATE INDEX IF NOT EXISTS idx_uploaded_at ON edintel_media(uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_file_name ON edintel_media(file_name);

-- ============================================
-- MULTI-AGENT SWARM TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS agent_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL CHECK (agent_name IN ('Observer', 'Analyst', 'Strategist', 'Avatar')),
  status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'running', 'completed', 'waiting', 'error')),
  current_task TEXT,
  thought_log JSONB DEFAULT '[]'::jsonb,
  tokens_used INTEGER DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Index for agent queries
CREATE INDEX IF NOT EXISTS idx_agent_status ON agent_missions(status);
CREATE INDEX IF NOT EXISTS idx_agent_name ON agent_missions(agent_name);

-- ============================================
-- USER ENHANCEMENTS (if not exists)
-- ============================================
DO $$ 
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='avatar_url') THEN
    ALTER TABLE users ADD COLUMN avatar_url TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='google_id') THEN
    ALTER TABLE users ADD COLUMN google_id TEXT UNIQUE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='stripe_customer_id') THEN
    ALTER TABLE users ADD COLUMN stripe_customer_id TEXT UNIQUE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='subscription_id') THEN
    ALTER TABLE users ADD COLUMN subscription_id TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='subscription_status') THEN
    ALTER TABLE users ADD COLUMN subscription_status TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='token_balance') THEN
    ALTER TABLE users ADD COLUMN token_balance INTEGER DEFAULT 100;
  END IF;
END $$;

-- ============================================
-- AVATAR SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS avatar_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  avatar_name TEXT NOT NULL,
  session_type TEXT CHECK (session_type IN ('greeting', 'briefing', 'conversation', 'intervention')),
  video_url TEXT,
  audio_url TEXT,
  transcript TEXT,
  tokens_used INTEGER DEFAULT 0,
  duration INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for user sessions
CREATE INDEX IF NOT EXISTS idx_avatar_user ON avatar_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_avatar_created ON avatar_sessions(created_at DESC);

-- ============================================
-- CLASSROOM OBSERVATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS classroom_observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  media_id INTEGER REFERENCES edintel_media(id) ON DELETE SET NULL,
  classroom_name TEXT,
  observation_date DATE DEFAULT CURRENT_DATE,
  engagement_score INTEGER CHECK (engagement_score BETWEEN 0 AND 100),
  behavioral_notes TEXT,
  ai_analysis JSONB,
  flagged_students JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for observations
CREATE INDEX IF NOT EXISTS idx_obs_user ON classroom_observations(user_id);
CREATE INDEX IF NOT EXISTS idx_obs_date ON classroom_observations(observation_date DESC);

-- ============================================
-- INTERVENTION PLANS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS intervention_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  observation_id UUID REFERENCES classroom_observations(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  intervention_type TEXT,
  strategy TEXT,
  expected_outcome TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for interventions
CREATE INDEX IF NOT EXISTS idx_intervention_status ON intervention_plans(status);
CREATE INDEX IF NOT EXISTS idx_intervention_student ON intervention_plans(student_name);

-- ============================================
-- ANALYTICS & METRICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS usage_analytics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  tokens_consumed INTEGER DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics
CREATE INDEX IF NOT EXISTS idx_analytics_user ON usage_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON usage_analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON usage_analytics(event_type);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for intervention_plans
DROP TRIGGER IF EXISTS update_intervention_updated_at ON intervention_plans;
CREATE TRIGGER update_intervention_updated_at
    BEFORE UPDATE ON intervention_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for edintel_media
DROP TRIGGER IF EXISTS update_media_updated_at ON edintel_media;
CREATE TRIGGER update_media_updated_at
    BEFORE UPDATE ON edintel_media
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample agent missions
INSERT INTO agent_missions (agent_name, status, current_task, thought_log) VALUES
  ('Observer', 'idle', 'Ready to scan classroom videos', '[{"timestamp": "2026-01-20T21:00:00Z", "message": "Observer systems online"}]'::jsonb),
  ('Analyst', 'idle', 'Ready to analyze patterns', '[{"timestamp": "2026-01-20T21:00:00Z", "message": "Analyst ready for data"}]'::jsonb),
  ('Strategist', 'idle', 'Ready to draft interventions', '[{"timestamp": "2026-01-20T21:00:00Z", "message": "Strategist standing by"}]'::jsonb),
  ('Avatar', 'idle', 'Ready to deliver briefings', '[{"timestamp": "2026-01-20T21:00:00Z", "message": "Dr. Alvin West avatar ready"}]'::jsonb)
ON CONFLICT DO NOTHING;

-- ============================================
-- GRANTS & PERMISSIONS
-- ============================================

-- Grant necessary permissions (adjust as needed)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO PUBLIC;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO PUBLIC;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ EdIntel Professional Database Schema Created Successfully!';
  RAISE NOTICE '📊 Tables: edintel_media, agent_missions, avatar_sessions, classroom_observations, intervention_plans, usage_analytics';
  RAISE NOTICE '🚀 Your database is ready for world-class AI education!';
END $$;
