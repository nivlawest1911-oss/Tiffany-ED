# 🎯 Vercel Storage Setup - Visual Guide

**Status**: Dashboard Open ✅  
**Current Step**: Creating Databases

---

## 📸 What You Should See

Based on the Vercel dashboard navigation, here's exactly what to do:

### Step 1: Navigate to Storage Tab ✅ (DONE)
You should now be on the **Storage** page of your `edintel-app` project.

### Step 2: Create Postgres Database (Neon)

**What to Click**:
1. Click **"Create Database"** button
2. In the modal, scroll down to **"Marketplace Database Providers"**
3. Select **"Neon"** (Serverless Postgres)
4. Click **"Continue"**
5. Click **"Accept and Create"**
6. Name it: `edintel-db`
7. Click **"Connect"**

**What Happens**:
- Vercel creates a Neon Postgres database
- Automatically adds environment variables:
  - `POSTGRES_URL`
  - `POSTGRES_PRISMA_URL`
  - `POSTGRES_URL_NON_POOLING`
  - `POSTGRES_USER`
  - `POSTGRES_HOST`
  - `POSTGRES_PASSWORD`
  - `POSTGRES_DATABASE`

### Step 3: Create KV Database (Upstash/Redis)

**What to Click**:
1. Click **"Create Database"** button again
2. In the modal, look for **"Redis"** or **"Upstash"**
3. Select **"Redis"** (Serverless Redis)
4. Click **"Continue"**
5. Name it: `edintel-kv`
6. Click **"Connect"**

**What Happens**:
- Vercel creates an Upstash Redis database
- Automatically adds environment variables:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
  - `KV_REST_API_READ_ONLY_TOKEN`

### Step 4: Run Database Schema

**After Postgres is Created**:
1. Go back to **Storage** tab
2. Click on your **`edintel-db`** database
3. Click **"Query"** tab (or **"SQL Editor"**)
4. Open `database/schema.sql` from your project
5. Copy ALL the SQL code
6. Paste into the query editor
7. Click **"Run Query"** or **"Execute"**

**Expected Result**:
```
✅ Table "users" created
✅ Table "generations" created
✅ Table "favorites" created
✅ Table "usage_stats" created
✅ Table "templates" created
✅ Indexes created
```

---

## 🔍 Troubleshooting

### If You Don't See "Create Database" Button
- Make sure you're on the **Storage** tab
- You should see it in the top right of the page
- If not, try refreshing the page

### If You Don't See Neon or Redis
- Scroll down in the "Create Database" modal
- Look for **"Marketplace Database Providers"**
- Neon and Upstash/Redis should be listed there

### If Environment Variables Don't Appear
- Go to **Settings** → **Environment Variables**
- Check if the variables were added
- If not, click "Connect" again on the database

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Postgres database created (named `edintel-db`)
- [ ] KV database created (named `edintel-kv`)
- [ ] Environment variables added automatically
- [ ] Database schema executed successfully
- [ ] Tables visible in Postgres query editor

---

## 🧪 Test After Setup

### Test 1: Check Environment Variables
```bash
# In your terminal
vercel env pull .env.local
```

You should see:
- `POSTGRES_URL=...`
- `KV_REST_API_URL=...`

### Test 2: Test API Endpoint
```bash
curl https://edintel-app.vercel.app/api/generate
```

Should return:
```json
{
  "status": "operational",
  "aiReady": true,
  "cacheReady": true,  ← Should be TRUE!
  "model": "gemini-2.0-flash-exp"
}
```

### Test 3: Test Caching
1. Go to https://edintel-app.vercel.app/generators/iep-architect
2. Enter: "Create IEP for 5th grade student"
3. Click Generate (takes 2-3 seconds)
4. Enter **same prompt** again
5. Click Generate (should be instant! ⚡)

---

## 📊 Expected Timeline

- **Database Creation**: 1-2 minutes each
- **Environment Variables**: Automatic (instant)
- **Schema Execution**: 10-30 seconds
- **Total Time**: 5-10 minutes

---

## 💡 Pro Tips

1. **Name Consistently**: Use `edintel-db` and `edintel-kv` as suggested
2. **Don't Skip Schema**: The schema creates all necessary tables
3. **Check Variables**: Verify environment variables were added
4. **Test Immediately**: Run the tests above to confirm everything works

---

## 🎯 Current Status

Based on the browser navigation:
- ✅ Vercel Dashboard opened
- ✅ edintel-app project selected
- ✅ Storage tab accessed
- ✅ Create Database modal opened
- ✅ Neon (Postgres) option visible

**Next Action**: Click "Continue" on the Neon setup page, then name it `edintel-db` and connect!

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel documentation: https://vercel.com/docs/storage
2. Vercel Discord: https://vercel.com/discord
3. Or let me know and I can help troubleshoot!

---

**You're almost there! Just a few clicks away from having caching and database storage! 🚀**
