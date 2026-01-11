# 🎯 How to Run Database Schema - Simple Guide

**Status**: Databases Created ✅ | Schema Pending ⏳

---

## 📋 Quick Instructions

### Method 1: Via Neon Console (Recommended)

Since your `edintel-db` is a **Neon-integrated** database, you'll use the Neon SQL Editor:

1. **Go to Vercel Storage**:
   - Navigate to: https://vercel.com/nivlawest1911-oss-projects/edintel-app/stores

2. **Open Neon Console**:
   - Click on **`edintel-db`**
   - Look for **"Open in Neon"** button (top right)
   - Click it to open the Neon dashboard

3. **Find SQL Editor**:
   - In Neon dashboard, look for **"SQL Editor"** in the left sidebar
   - Click it to open the query interface

4. **Copy Schema**:
   - Copy the SQL below (entire block)

5. **Paste & Run**:
   - Paste into the Neon SQL Editor
   - Click **"Run"** or **"Execute"**

6. **Verify**:
   - You should see success messages for 5 tables created

---

## 📝 SQL Schema to Run

```sql
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
```

---

## ✅ Expected Success Messages

After running the schema, you should see:

```
✅ CREATE TABLE users
✅ CREATE TABLE generations
✅ CREATE INDEX idx_generations_user_id
✅ CREATE INDEX idx_generations_generator_id
✅ CREATE INDEX idx_generations_created_at
✅ CREATE TABLE favorites
✅ CREATE TABLE usage_stats
✅ CREATE TABLE templates
✅ CREATE INDEX idx_templates_user_id
✅ CREATE INDEX idx_templates_generator_id
✅ CREATE INDEX idx_templates_public
```

---

## 🧪 How to Verify

### Option 1: Query in Neon Console

Run this query to list all tables:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

**Expected Result**:
```
users
generations
favorites
usage_stats
templates
```

### Option 2: Check Table Structure

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'generations';
```

**Expected Result**:
```
id          | integer
user_id     | integer
generator_id| character varying
prompt      | text
content     | text
metadata    | jsonb
created_at  | timestamp
```

---

## 🎯 After Schema is Created

### Test the Database Connection

You can test inserting data:

```sql
-- Insert a test user
INSERT INTO users (email, name, role) 
VALUES ('test@edintel.com', 'Test User', 'teacher')
RETURNING *;

-- Verify it was created
SELECT * FROM users;
```

**Expected Result**:
```
id | email              | name      | role    | created_at
1  | test@edintel.com   | Test User | teacher | 2026-01-11...
```

---

## 🚀 What This Enables

Once the schema is created, your app can:

1. **Save Generations**: Store all AI-generated content
2. **User History**: View past generations
3. **Favorites**: Mark favorite generators
4. **Templates**: Save reusable prompts
5. **Analytics**: Track usage patterns

---

## 💡 Pro Tips

1. **Use "IF NOT EXISTS"**: The schema uses this, so it's safe to run multiple times
2. **Check Indexes**: Indexes make queries faster
3. **JSONB Metadata**: Flexible storage for additional data
4. **Foreign Keys**: Ensures data integrity

---

## 🔧 Troubleshooting

### If You Get Permission Errors
- Make sure you're logged into Neon
- Check that the database is connected to your Vercel project

### If Tables Already Exist
- The schema uses `IF NOT EXISTS`, so it won't error
- You can drop tables first if needed: `DROP TABLE IF EXISTS table_name CASCADE;`

### If You Can't Find Neon Console
- Alternative: Use `psql` command line
- Or use a Postgres client like pgAdmin or TablePlus

---

## 📞 Alternative Methods

### Method 2: Via Command Line

```bash
# Pull environment variables
vercel env pull .env.local

# Run schema using psql
psql $POSTGRES_URL < database/schema.sql
```

### Method 3: Via Node.js Script

```javascript
import { sql } from '@vercel/postgres';
import fs from 'fs';

const schema = fs.readFileSync('database/schema.sql', 'utf8');
await sql.query(schema);
console.log('Schema created successfully!');
```

---

## ✅ Checklist

- [ ] Navigate to Vercel Storage
- [ ] Click on `edintel-db`
- [ ] Click "Open in Neon"
- [ ] Find SQL Editor in Neon dashboard
- [ ] Copy the SQL schema above
- [ ] Paste into SQL Editor
- [ ] Click "Run" or "Execute"
- [ ] Verify success messages
- [ ] Test with a SELECT query

---

**Once you complete this, your EdIntel platform will have full database persistence! 🎉**

**Next**: Test caching and database features on your live site!
