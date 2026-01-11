-- EdIntel Database Schema
-- Run this after setting up Vercel Postgres

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'teacher', -- teacher, admin, student
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generations table (stores AI-generated content)
CREATE TABLE IF NOT EXISTS generations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  generator_id VARCHAR(100) NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_generator_id ON generations(generator_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);

-- Favorites table (users can favorite generators)
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  generator_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, generator_id)
);

-- Usage stats table (track generator usage)
CREATE TABLE IF NOT EXISTS usage_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  generator_id VARCHAR(100) NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  count INTEGER DEFAULT 1,
  UNIQUE(user_id, generator_id, date)
);

-- Templates table (save reusable templates)
CREATE TABLE IF NOT EXISTS templates (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  generator_id VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for templates
CREATE INDEX IF NOT EXISTS idx_templates_user_id ON templates(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_generator_id ON templates(generator_id);
CREATE INDEX IF NOT EXISTS idx_templates_public ON templates(is_public) WHERE is_public = TRUE;
