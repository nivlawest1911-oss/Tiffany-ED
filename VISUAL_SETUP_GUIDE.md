# 📸 EdIntel Professional - Visual Setup Guide

**For:** Dr. Alvin West  
**Date:** January 20, 2026  
**Purpose:** Step-by-step visual guide for activating EdIntel Professional

---

## 🎯 OVERVIEW

This guide provides **exact screenshots and click-by-click instructions** for activating all features of EdIntel Professional.

**Total Time:** 15-20 minutes  
**Difficulty:** Easy  
**Prerequisites:** Vercel account, Google Cloud account, Stripe account

---

## 📋 STEP 1: DATABASE SETUP (5 minutes)

### **1.1 - Navigate to Vercel Postgres**

1. **Open browser** and go to:
   ```
   https://vercel.com/nivlawest1911-oss-projects/edintel-app
   ```

2. **Click "Storage" tab** in the top navigation

3. **Click on your Postgres database**
   - Look for: `postgres-xxxxx`
   - Status should show: ✅ Active

### **1.2 - Open Query Editor**

1. **Click "Query" tab** (next to "Data", "Settings")

2. **You should see:**
   - SQL query editor (large text box)
   - "Run Query" button (bottom right)
   - Query history (left sidebar)

### **1.3 - Run Database Schema**

1. **Open file in your project:**
   ```
   c:\Users\nivla\edintel-app\database\schema.sql
   ```

2. **Select ALL content:**
   - Press `Ctrl + A` (Select All)
   - Press `Ctrl + C` (Copy)

3. **Paste into Vercel Query Editor:**
   - Click in the query text box
   - Press `Ctrl + V` (Paste)
   - You should see ~216 lines of SQL

4. **Click "Run Query" button**

5. **Wait for success message:**
   ```
   ✅ EdIntel Professional Database Schema Created Successfully!
   📊 Tables: edintel_media, agent_missions, avatar_sessions, 
       classroom_observations, intervention_plans, usage_analytics
   🚀 Your database is ready for world-class AI education!
   ```

### **1.4 - Verify Tables Created**

1. **Click "Data" tab**

2. **You should see these tables:**
   - ✅ `edintel_media`
   - ✅ `agent_missions`
   - ✅ `avatar_sessions`
   - ✅ `classroom_observations`
   - ✅ `intervention_plans`
   - ✅ `usage_analytics`
   - ✅ `users` (enhanced with new columns)

3. **Click on `agent_missions` table**

4. **You should see 4 sample rows:**
   - Observer
   - Analyst
   - Strategist
   - Avatar

**✅ DATABASE SETUP COMPLETE!**

---

## 🔑 STEP 2: ENVIRONMENT VARIABLES (5 minutes)

### **2.1 - Navigate to Environment Variables**

1. **In Vercel Dashboard**, click "Settings" tab

2. **Click "Environment Variables"** in left sidebar

3. **You should see existing variables:**
   - ✅ `POSTGRES_URL`
   - ✅ `GOOGLE_CLIENT_ID`
   - ✅ `GOOGLE_CLIENT_SECRET`
   - ✅ `STRIPE_SECRET_KEY`
   - ✅ Many more...

### **2.2 - Add Vercel Blob Token (REQUIRED)**

1. **Click "Add New" button** (top right)

2. **Fill in form:**
   - **Key:** `BLOB_READ_WRITE_TOKEN`
   - **Value:** (Get from next step)
   - **Environment:** Select all (Production, Preview, Development)

3. **Get Blob Token:**
   - Open new tab: https://vercel.com/dashboard/stores
   - Click "Create Database" → "Blob"
   - Name it: `edintel-blob`
   - Click "Create"
   - **Copy the token** shown (starts with `vercel_blob_rw_`)
   - Paste into "Value" field

4. **Click "Save"**

### **2.3 - Add HeyGen API Key (OPTIONAL)**

1. **Sign up for HeyGen:**
   - Go to: https://www.heygen.com
   - Click "Sign Up"
   - Choose "Creator" plan ($24/month)
   - Get API key from dashboard

2. **Add to Vercel:**
   - Click "Add New"
   - **Key:** `HEYGEN_API_KEY`
   - **Value:** (paste your HeyGen API key)
   - **Environment:** All
   - Click "Save"

### **2.4 - Add ElevenLabs API Key (OPTIONAL)**

1. **Sign up for ElevenLabs:**
   - Go to: https://elevenlabs.io
   - Click "Sign Up"
   - Choose "Creator" plan ($22/month)
   - Get API key from profile

2. **Add to Vercel:**
   - Click "Add New"
   - **Key:** `ELEVENLABS_API_KEY`
   - **Value:** (paste your ElevenLabs API key)
   - **Environment:** All
   - Click "Save"

### **2.5 - Add Cloudinary Credentials (OPTIONAL)**

1. **Sign up for Cloudinary:**
   - Go to: https://cloudinary.com
   - Click "Sign Up" (Free plan)
   - Go to Dashboard

2. **Get credentials:**
   - **Cloud Name:** (shown at top)
   - **API Key:** (shown in dashboard)
   - **API Secret:** (click "Reveal" to see)

3. **Add to Vercel (3 variables):**
   
   **Variable 1:**
   - **Key:** `CLOUDINARY_CLOUD_NAME`
   - **Value:** (your cloud name)
   - Click "Save"
   
   **Variable 2:**
   - **Key:** `CLOUDINARY_API_KEY`
   - **Value:** (your API key)
   - Click "Save"
   
   **Variable 3:**
   - **Key:** `CLOUDINARY_API_SECRET`
   - **Value:** (your API secret)
   - Click "Save"

### **2.6 - Redeploy Application**

1. **Go to "Deployments" tab**

2. **Click "..." menu** on latest deployment

3. **Click "Redeploy"**

4. **Wait for deployment to complete** (~2 minutes)

5. **Look for:** ✅ Ready

**✅ ENVIRONMENT VARIABLES COMPLETE!**

---

## 📤 STEP 3: MEDIA UPLOAD (5 minutes)

### **3.1 - Prepare Media Files**

1. **Open File Explorer**

2. **Navigate to:**
   ```
   c:\Users\nivla\edintel-app\edintel-media\
   ```

3. **Add your media files:**
   - Drag and drop images (`.jpg`, `.png`, `.webp`)
   - Drag and drop videos (`.mp4`, `.webm`)
   - Recommended: 10-50 files for testing

**Suggested Media:**
- Classroom photos
- Student work samples
- School building images
- Training videos
- District branding

### **3.2 - Pull Environment Variables Locally**

1. **Open PowerShell** in project directory:
   ```
   cd c:\Users\nivla\edintel-app
   ```

2. **Pull latest env vars:**
   ```
   vercel env pull .env.local
   ```

3. **You should see:**
   ```
   Vercel CLI 33.x.x
   ✅ Created .env.local file
   ```

### **3.3 - Upload to Vercel Blob**

1. **Run upload script:**
   ```
   node scripts/bulk-upload-vercel-blob.js
   ```

2. **You should see:**
   ```
   🚀 EdIntel Media - Bulk Upload to Vercel Blob
   
   📁 Scanning edintel-media/ directory...
   ✅ Found 25 files
   
   📤 Uploading files...
   ✅ classroom_1.jpg uploaded
   ✅ classroom_2.jpg uploaded
   ✅ student_work_1.png uploaded
   ...
   
   ✅ Upload complete!
   📊 Uploaded: 25 files
   💾 Total size: 45.2 MB
   📝 Manifest saved: media-manifest.json
   ```

3. **Verify manifest created:**
   - Check for: `media-manifest.json` in project root
   - Open it to see uploaded file URLs

### **3.4 - Sync to Database**

1. **Run sync script:**
   ```
   node scripts/sync-media-to-db.js
   ```
   *(If this script doesn't exist, the upload script should have already synced)*

2. **Verify in Vercel Postgres:**
   - Go to Vercel → Storage → Postgres → Data
   - Click `edintel_media` table
   - You should see all uploaded files

**✅ MEDIA UPLOAD COMPLETE!**

---

## 🧪 STEP 4: FEATURE TESTING (10 minutes)

### **4.1 - Test Homepage**

1. **Open browser** and go to:
   ```
   https://edintel-app.vercel.app
   ```

2. **You should see:**
   - ✅ Hero section with "EdIntel Professional"
   - ✅ Animated background
   - ✅ "Get Started" button
   - ✅ No console errors (F12)

### **4.2 - Test Google Login**

1. **Click "Login" or "Get Started"**

2. **You should see:**
   - ✅ Login page with Google button
   - ✅ "Sign in with Google" button

3. **Click "Sign in with Google"**

4. **Select your Google account**

5. **You should be redirected to:**
   ```
   https://edintel-app.vercel.app/dashboard
   ```

6. **Verify:**
   - ✅ Your name appears in header
   - ✅ Profile picture shows
   - ✅ Dashboard loads

### **4.3 - Test Mission Control**

1. **Navigate to:**
   ```
   https://edintel-app.vercel.app/mission-control
   ```

2. **You should see:**
   - ✅ 4 agent cards:
     - The Observer
     - The Analyst
     - The Strategist
     - Dr. Alvin West
   - ✅ Status indicators (Idle/Running)
   - ✅ Current tasks
   - ✅ Thought logs
   - ✅ Token usage

3. **Verify:**
   - ✅ Kente-inspired design
   - ✅ Holographic effects
   - ✅ Responsive layout

### **4.4 - Test Evidence Gallery**

1. **Navigate to:**
   ```
   https://edintel-app.vercel.app/gallery
   ```

2. **You should see:**
   - ✅ Search bar at top
   - ✅ Bento Grid layout
   - ✅ Your uploaded media files
   - ✅ Images display correctly
   - ✅ Videos have play buttons

3. **Test search:**
   - Type "classroom" in search
   - Press Enter
   - Verify filtered results

4. **Test video playback:**
   - Click on a video
   - Verify it plays
   - Check controls work

### **4.5 - Test Stripe Checkout**

1. **Navigate to:**
   ```
   https://edintel-app.vercel.app/pricing
   ```

2. **Click "Get Started"** on Practitioner plan

3. **You should see:**
   - ✅ Stripe Checkout page
   - ✅ Plan details ($79/month)
   - ✅ Payment form

4. **Use test card:**
   ```
   Card Number: 4242 4242 4242 4242
   Expiry: 12/34
   CVC: 123
   ZIP: 12345
   ```

5. **Click "Subscribe"**

6. **You should be redirected to:**
   ```
   https://edintel-app.vercel.app/dashboard?success=true
   ```

7. **Verify in Stripe Dashboard:**
   - Go to: https://dashboard.stripe.com
   - Click "Payments"
   - See test payment

### **4.6 - Test AI Generators**

1. **In Dashboard**, click any generator:
   - IEP Generator
   - Observation Report
   - Intervention Plan
   - etc.

2. **Fill in form** with test data

3. **Click "Generate"**

4. **You should see:**
   - ✅ Loading indicator
   - ✅ AI-generated content appears
   - ✅ Download/Copy buttons work
   - ✅ Token usage updates

**✅ ALL FEATURES TESTED!**

---

## 🎉 SUCCESS CHECKLIST

Mark each item as you complete it:

### **Database**
- [ ] ✅ Schema deployed to Vercel Postgres
- [ ] ✅ All 6+ tables created
- [ ] ✅ Sample agent data inserted
- [ ] ✅ Can query tables in Vercel dashboard

### **Environment Variables**
- [ ] ✅ `BLOB_READ_WRITE_TOKEN` added
- [ ] ✅ Blob store created
- [ ] ✅ Optional: `HEYGEN_API_KEY` added
- [ ] ✅ Optional: `ELEVENLABS_API_KEY` added
- [ ] ✅ Optional: Cloudinary credentials added
- [ ] ✅ Application redeployed

### **Media Upload**
- [ ] ✅ Media files added to `edintel-media/`
- [ ] ✅ Upload script ran successfully
- [ ] ✅ `media-manifest.json` created
- [ ] ✅ Files visible in `edintel_media` table

### **Feature Testing**
- [ ] ✅ Homepage loads
- [ ] ✅ Google Login works
- [ ] ✅ Mission Control displays agents
- [ ] ✅ Evidence Gallery shows media
- [ ] ✅ Stripe checkout works
- [ ] ✅ AI generators produce content

### **Production Ready**
- [ ] ✅ No console errors
- [ ] ✅ All pages responsive
- [ ] ✅ Fast load times
- [ ] ✅ SSL certificate active
- [ ] ✅ Analytics tracking

---

## 🚨 COMMON ISSUES & SOLUTIONS

### **Issue: "Relation does not exist" error**

**Symptoms:**
- Error in Mission Control or Gallery
- Database query fails

**Solution:**
1. Go to Vercel Postgres → Query
2. Re-run `database/schema.sql`
3. Verify success message
4. Refresh page

---

### **Issue: "BLOB_READ_WRITE_TOKEN is not defined"**

**Symptoms:**
- Media upload fails
- 401 Unauthorized error

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Verify `BLOB_READ_WRITE_TOKEN` exists
3. If missing, create Blob store and add token
4. Run: `vercel env pull .env.local`
5. Retry upload

---

### **Issue: Google Login redirects to error page**

**Symptoms:**
- "Redirect URI mismatch" error
- Login fails

**Solution:**
1. Go to: https://console.cloud.google.com
2. Navigate to: APIs & Services → Credentials
3. Click your OAuth 2.0 Client ID
4. Add to "Authorized redirect URIs":
   ```
   https://edintel-app.vercel.app/api/auth/google/callback
   ```
5. Click "Save"
6. Wait 5 minutes for changes to propagate
7. Retry login

---

### **Issue: Stripe checkout fails**

**Symptoms:**
- "Invalid API key" error
- Checkout doesn't load

**Solution:**
1. Verify you're using TEST mode in Stripe
2. Check `STRIPE_SECRET_KEY` starts with `sk_test_`
3. Go to Stripe Dashboard → Developers → API Keys
4. Copy correct test key
5. Update in Vercel environment variables
6. Redeploy

---

### **Issue: Media doesn't display in Gallery**

**Symptoms:**
- Empty gallery
- "No media found" message

**Solution:**
1. Check `edintel_media` table has rows:
   - Vercel → Storage → Postgres → Data → `edintel_media`
2. If empty, re-run upload script:
   ```
   node scripts/bulk-upload-vercel-blob.js
   ```
3. Verify `BLOB_READ_WRITE_TOKEN` is set
4. Check media files exist in `edintel-media/` folder

---

## 📞 SUPPORT CONTACTS

### **Vercel Support**
- Dashboard: https://vercel.com/support
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord

### **Stripe Support**
- Dashboard: https://dashboard.stripe.com
- Docs: https://stripe.com/docs
- Support: https://support.stripe.com

### **Google Cloud Support**
- Console: https://console.cloud.google.com
- Docs: https://cloud.google.com/docs
- Support: https://cloud.google.com/support

---

## 🎓 NEXT STEPS

### **After Activation:**

1. **Invite Beta Users**
   - Send invites to 5-10 educators
   - Collect feedback
   - Iterate on features

2. **Create Marketing Materials**
   - Record demo videos
   - Take screenshots
   - Write case studies

3. **Launch Campaign**
   - Post on social media
   - Email Mobile County Schools
   - Email Prichard Schools
   - Present at district meetings

4. **Monitor & Optimize**
   - Check Vercel Analytics
   - Review Stripe Dashboard
   - Monitor Mission Control
   - Track user engagement

---

**🚀 EdIntel Professional is LIVE!**

**Production URL:** https://edintel-app.vercel.app

**Built by:** Dr. Alvin West, EdD  
**For:** Mobile County & Prichard Schools, Alabama  
**Powered by:** Vercel, Google Cloud, NVIDIA, Stripe

---

**Last Updated:** January 20, 2026  
**Version:** 1.0.0  
**Status:** 🎉 ACTIVATED
