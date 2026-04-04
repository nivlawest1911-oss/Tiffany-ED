-- 🧠 EdIntel Knowledge Vault: Neural Context Persistence
-- Phase 16: Universal RAG (Retrieval-Augmented Generation)
-- Created: 2026-04-03

-- 1. Enable the pgvector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the Knowledge Documents table
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companion_certificates(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  content TEXT NOT NULL, -- The extracted text of the document
  embedding vector(768), -- Gemini text-embedding-004 dimensions
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure a user can only query their own documents OR public ones
  CONSTRAINT owner_check CHECK (owner_id IS NOT NULL)
);

-- 3. Create an HNSW index for fast similarity search
-- Note: ivfflat is also an option, but HNSW is superior for RAG performance
CREATE INDEX ON knowledge_documents USING hnsw (embedding vector_cosine_ops);

-- 4. Secure the Vault with RLS
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own documents
CREATE POLICY "Users can view their own knowledge" 
ON knowledge_documents FOR SELECT 
TO authenticated 
USING (auth.uid() = owner_id);

-- Policy: Users can only insert their own documents
CREATE POLICY "Users can insert their own knowledge" 
ON knowledge_documents FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = owner_id);

-- 5. RPC: match_knowledge_documents
-- This function allows the frontend to perform semantic proximity searches
CREATE OR REPLACE FUNCTION match_knowledge_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int,
  companion_id_filter UUID
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  similarity float,
  metadata JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kd.id,
    kd.content,
    1 - (kd.embedding <=> query_embedding) AS similarity,
    kd.metadata
  FROM knowledge_documents kd
  WHERE 1 - (kd.embedding <=> query_embedding) > match_threshold
    AND kd.companion_id = companion_id_filter
  ORDER BY kd.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
