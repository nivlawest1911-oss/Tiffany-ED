-- EdIntel SOVEREIGN - Gemini Workspace Database Schema
-- This schema supports persistent storage of imported Gemini content

-- ============================================================================
-- GEMINI WORKSPACE CONTENT TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS gemini_workspace_content (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    
    -- Content Metadata
    title VARCHAR(500) NOT NULL,
    content_type VARCHAR(50) NOT NULL, -- 'conversation', 'image', 'document', 'prompt', 'workflow'
    category VARCHAR(100), -- 'IEP', 'Lesson Planning', 'Student Data', etc.
    tags TEXT[], -- Array of tags
    
    -- Content Data
    content TEXT NOT NULL, -- Main content (text, markdown, JSON)
    media_url TEXT, -- URL to Vercel Blob storage if media
    media_type VARCHAR(50), -- 'image/png', 'application/pdf', etc.
    
    -- AI Analysis Results
    ai_summary TEXT,
    ai_keywords TEXT[],
    suggested_features TEXT[], -- EdIntel features this content maps to
    sentiment_score DECIMAL(3,2), -- -1.0 to 1.0
    
    -- Workflow Data (if content_type = 'workflow')
    workflow_steps JSONB, -- Structured workflow steps
    
    -- Metadata
    source VARCHAR(100) DEFAULT 'gemini', -- 'gemini', 'manual', 'import'
    import_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Usage Tracking
    view_count INTEGER DEFAULT 0,
    last_viewed TIMESTAMP,
    is_favorite BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    
    -- Indexes for performance
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for common queries
CREATE INDEX idx_gemini_user_id ON gemini_workspace_content(user_id);
CREATE INDEX idx_gemini_content_type ON gemini_workspace_content(content_type);
CREATE INDEX idx_gemini_category ON gemini_workspace_content(category);
CREATE INDEX idx_gemini_import_date ON gemini_workspace_content(import_date DESC);
CREATE INDEX idx_gemini_tags ON gemini_workspace_content USING GIN(tags);
CREATE INDEX idx_gemini_favorites ON gemini_workspace_content(user_id, is_favorite) WHERE is_favorite = TRUE;

-- ============================================================================
-- GEMINI WORKFLOWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS gemini_workflows (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    content_id INTEGER REFERENCES gemini_workspace_content(id) ON DELETE CASCADE,
    
    -- Workflow Metadata
    workflow_name VARCHAR(300) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    
    -- Workflow Structure
    steps JSONB NOT NULL, -- Array of workflow steps with prompts
    estimated_time INTEGER, -- Minutes
    difficulty_level VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
    
    -- EdIntel Integration
    mapped_features TEXT[], -- Which EdIntel features this workflow uses
    required_tools TEXT[], -- Tools needed to execute
    
    -- Usage & Performance
    execution_count INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2), -- Percentage
    avg_completion_time INTEGER, -- Minutes
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_executed TIMESTAMP,
    is_template BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT FALSE,
    
    CONSTRAINT fk_workflow_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_workflows_user_id ON gemini_workflows(user_id);
CREATE INDEX idx_workflows_category ON gemini_workflows(category);
CREATE INDEX idx_workflows_public ON gemini_workflows(is_public) WHERE is_public = TRUE;

-- ============================================================================
-- CONTENT SHARING & COLLABORATION
-- ============================================================================
CREATE TABLE IF NOT EXISTS gemini_content_shares (
    id SERIAL PRIMARY KEY,
    content_id INTEGER REFERENCES gemini_workspace_content(id) ON DELETE CASCADE,
    shared_by VARCHAR(255) NOT NULL,
    shared_with VARCHAR(255), -- NULL for public shares
    
    -- Permissions
    can_view BOOLEAN DEFAULT TRUE,
    can_edit BOOLEAN DEFAULT FALSE,
    can_reshare BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    access_count INTEGER DEFAULT 0,
    
    CONSTRAINT fk_share_sharer FOREIGN KEY (shared_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_shares_content ON gemini_content_shares(content_id);
CREATE INDEX idx_shares_recipient ON gemini_content_shares(shared_with);

-- ============================================================================
-- ANALYTICS & INSIGHTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS gemini_usage_analytics (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    
    -- Activity Metrics
    action_type VARCHAR(50) NOT NULL, -- 'import', 'view', 'edit', 'share', 'execute_workflow'
    content_id INTEGER REFERENCES gemini_workspace_content(id) ON DELETE SET NULL,
    workflow_id INTEGER REFERENCES gemini_workflows(id) ON DELETE SET NULL,
    
    -- Context
    session_id VARCHAR(100),
    device_type VARCHAR(50),
    
    -- Performance
    duration_ms INTEGER, -- How long the action took
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    
    -- Timestamp
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_analytics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_analytics_user ON gemini_usage_analytics(user_id);
CREATE INDEX idx_analytics_timestamp ON gemini_usage_analytics(timestamp DESC);
CREATE INDEX idx_analytics_action ON gemini_usage_analytics(action_type);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- User's recent content
CREATE OR REPLACE VIEW user_recent_content AS
SELECT 
    c.*,
    COUNT(a.id) as activity_count
FROM gemini_workspace_content c
LEFT JOIN gemini_usage_analytics a ON c.id = a.content_id
WHERE c.is_archived = FALSE
GROUP BY c.id
ORDER BY c.last_modified DESC;

-- Popular workflows
CREATE OR REPLACE VIEW popular_workflows AS
SELECT 
    w.*,
    COUNT(DISTINCT a.user_id) as unique_users,
    AVG(a.duration_ms) as avg_duration
FROM gemini_workflows w
LEFT JOIN gemini_usage_analytics a ON w.id = a.workflow_id
WHERE w.is_public = TRUE
GROUP BY w.id
ORDER BY w.execution_count DESC, unique_users DESC;

-- User content statistics
CREATE OR REPLACE VIEW user_content_stats AS
SELECT 
    user_id,
    COUNT(*) as total_content,
    COUNT(*) FILTER (WHERE content_type = 'workflow') as workflow_count,
    COUNT(*) FILTER (WHERE is_favorite = TRUE) as favorite_count,
    SUM(view_count) as total_views,
    MAX(import_date) as last_import
FROM gemini_workspace_content
GROUP BY user_id;
