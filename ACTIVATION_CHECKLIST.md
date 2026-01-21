# 🎯 EdIntel Professional - Activation Checklist

**Date:** January 20, 2026  
**Status:** 🚀 READY FOR ACTIVATION  
**Production URL:** https://edintel-app.vercel.app

---

## 📋 QUICK START (Choose One)

### **Option 1: Automated Script (Recommended)**
```bash
# Double-click this file in Windows Explorer:
ACTIVATE.bat

# OR run from terminal:
pwsh scripts/activate-edintel.ps1
```

### **Option 2: Manual Activation (15 minutes)**
Follow the steps below ⬇️

---

## ✅ ACTIVATION STEPS

### **STEP 1: Database Schema** (5 minutes)

- [ ] **Open Vercel Postgres Dashboard**
  - URL: https://vercel.com/nivlawest1911-oss-projects/edintel-app/stores
  - Click on your Postgres database
  - Click "Query" tab

- [ ] **Run Schema**
  - Open `database/schema.sql` in your editor
  - Copy ALL contents (Ctrl+A, Ctrl+C)
  - Paste into Vercel Query editor
  - Click "Run Query"
  
- [ ] **Verify Success**
  - Look for: ✅ EdIntel Professional Database Schema Created Successfully!
  - Check tables created: `edintel_media`, `agent_missions`, `avatar_sessions`, etc.

**Expected Result:**
```
✅ EdIntel Professional Database Schema Created Successfully!
📊 Tables: edintel_media, agent_missions, avatar_sessions, classroom_observations, intervention_plans, usage_analytics
🚀 Your database is ready for world-class AI education!
```

---

### **STEP 2: Environment Variables** (5 minutes)

#### **2A: Pull Latest Variables**
```bash
vercel env pull .env.local
```

#### **2B: Verify Critical Variables**
Open `.env.local` and confirm these exist:
- [ ] `POSTGRES_URL` ✅ (Auto-configured by Vercel)
- [ ] `GOOGLE_CLIENT_ID` ✅ (Already set)
- [ ] `GOOGLE_CLIENT_SECRET` ✅ (Already set)
- [ ] `STRIPE_SECRET_KEY` ✅ (Already set)
- [ ] `NEXT_PUBLIC_APP_URL` ✅ (Already set)

#### **2C: Add New Feature Variables**

Go to Vercel Dashboard → Environment Variables:
https://vercel.com/nivlawest1911-oss-projects/edintel-app/settings/environment-variables

**Priority 1 (Required for Media):**
- [ ] `BLOB_READ_WRITE_TOKEN`
  - Get from: https://vercel.com/dashboard/stores
  - Create new Blob store if needed
  - Copy token

**Priority 2 (Optional - AI Avatars):**
- [ ] `HEYGEN_API_KEY` (for talking avatars)
  - Sign up: https://www.heygen.com
  - Cost: $24/month
  
- [ ] `ELEVENLABS_API_KEY` (for voice synthesis)
  - Sign up: https://elevenlabs.io
  - Cost: $22/month

**Priority 3 (Optional - Media Optimization):**
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
  - Sign up: https://cloudinary.com
  - Free tier: 25GB

- [ ] `REPLICATE_API_TOKEN`
  - Sign up: https://replicate.com
  - Pay per use

#### **2D: Redeploy After Adding Variables**
- [ ] Click "Redeploy" in Vercel dashboard
- [ ] OR run: `vercel --prod`

---

### **STEP 3: Media Upload** (5 minutes)

#### **3A: Prepare Media**
- [ ] Create folder: `edintel-media/`
- [ ] Add your images (`.jpg`, `.png`, `.webp`)
- [ ] Add your videos (`.mp4`, `.webm`)

**Recommended Media:**
- Classroom observation videos
- Student work samples
- School building photos
- Teacher training materials
- District branding assets

#### **3B: Upload to Vercel Blob**
```bash
node scripts/bulk-upload-vercel-blob.js
```

**OR Upload to Cloudinary:**
```bash
node scripts/bulk-upload-cloudinary.js
```

#### **3C: Verify Upload**
- [ ] Check for `media-manifest.json` created
- [ ] Verify file count matches
- [ ] Check database table `edintel_media` populated

---

### **STEP 4: Feature Testing** (10 minutes)

#### **4A: Test Google Login**
- [ ] Visit: https://edintel-app.vercel.app/login
- [ ] Click "Sign in with Google"
- [ ] Verify redirect to dashboard
- [ ] Check user profile displays

#### **4B: Test Mission Control**
- [ ] Visit: https://edintel-app.vercel.app/mission-control
- [ ] Verify 4 agents display:
  - The Observer
  - The Analyst
  - The Strategist
  - Dr. Alvin West
- [ ] Check thought logs appear
- [ ] Verify status indicators work

#### **4C: Test Evidence Gallery**
- [ ] Visit: https://edintel-app.vercel.app/gallery
- [ ] Verify media displays in Bento Grid
- [ ] Test search functionality
- [ ] Check video playback
- [ ] Verify image loading

#### **4D: Test Stripe Checkout**
- [ ] Visit: https://edintel-app.vercel.app/pricing
- [ ] Select "Practitioner" plan
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Verify checkout flow works
- [ ] Check Stripe dashboard for test payment

#### **4E: Test AI Generators**
- [ ] Login to dashboard
- [ ] Navigate to any generator (IEP, Observation, etc.)
- [ ] Generate sample content
- [ ] Verify AI response appears
- [ ] Check token usage tracking

---

## 🎬 OPTIONAL ENHANCEMENTS

### **Avatar Video Generation** (Later)

#### **Using HeyGen:**
1. Sign up at https://www.heygen.com
2. Upload photo of Dr. Alvin West (or use library avatar)
3. Create greeting video with script:
   ```
   "Welcome to EdIntel Professional. I've analyzed your classroom 
   data and identified three key opportunities for improvement..."
   ```
4. Download video
5. Place in `/public/videos/avatars/dr_alvin_west_talking.mp4`
6. Update components to use `TalkingAvatarVideo`

#### **Using ElevenLabs:**
1. Sign up at https://elevenlabs.io
2. Create voice profile for Dr. Alvin West
3. Generate voice clips for greetings
4. Place in `/public/voice-profiles/`

---

## 📊 SUCCESS INDICATORS

You'll know everything is working when:

- [x] ✅ Production site loads: https://edintel-app.vercel.app
- [ ] ✅ Google Login works end-to-end
- [ ] ✅ Mission Control shows 4 active agents
- [ ] ✅ Evidence Gallery displays media
- [ ] ✅ Stripe checkout creates subscriptions
- [ ] ✅ AI generators produce output
- [ ] ✅ Dashboard loads without errors
- [ ] ✅ All pages are responsive
- [ ] ✅ No console errors (F12)

---

## 🚨 TROUBLESHOOTING

### **Database Issues**

**Problem:** "relation 'edintel_media' does not exist"
```
Solution:
1. Go to Vercel Postgres Dashboard
2. Run database/schema.sql
3. Verify success message
```

**Problem:** "permission denied for table"
```
Solution:
1. Check POSTGRES_URL is correct
2. Verify schema grants are applied
3. Re-run schema if needed
```

### **Media Upload Issues**

**Problem:** "BLOB_READ_WRITE_TOKEN is not defined"
```
Solution:
1. Go to Vercel Dashboard → Stores
2. Create Blob store
3. Copy token
4. Add to .env.local
5. Run: vercel env pull .env.local
```

**Problem:** "Upload failed: 401 Unauthorized"
```
Solution:
1. Verify token is correct
2. Check token has read/write permissions
3. Regenerate token if needed
```

### **Build Issues**

**Problem:** "Module not found"
```
Solution:
1. Run: npm install
2. Verify all dependencies installed
3. Check package.json is correct
```

**Problem:** "Type error in component"
```
Solution:
1. Run: npm run build
2. Check TypeScript errors
3. Fix type issues
4. Rebuild
```

### **Authentication Issues**

**Problem:** "Google Login fails"
```
Solution:
1. Verify GOOGLE_CLIENT_ID is correct
2. Check authorized redirect URIs in Google Console
3. Add: https://edintel-app.vercel.app/api/auth/google/callback
4. Clear browser cookies and retry
```

**Problem:** "Stripe checkout fails"
```
Solution:
1. Verify STRIPE_SECRET_KEY is correct
2. Check webhook endpoint is configured
3. Use test mode for testing
4. Check Stripe dashboard logs
```

---

## 💰 COST BREAKDOWN

### **Monthly Operating Costs**

| Service | Plan | Cost | Status |
|---------|------|------|--------|
| Vercel Hosting | Hobby | $0 | ✅ Active |
| Vercel Postgres | Hobby | $0 | ✅ Active |
| Vercel Blob | Pay-as-go | ~$7.50 (50GB) | ⏳ Activate |
| HeyGen | Creator | $24 | ⏳ Optional |
| ElevenLabs | Creator | $22 | ⏳ Optional |
| Cloudinary | Free | $0 (25GB) | ⏳ Optional |
| Replicate | Pay-per-use | ~$5 | ⏳ Optional |
| **TOTAL** | | **$7.50 - $58.50** | |

### **Revenue Potential**

| Plan | Price | Users | Monthly |
|------|-------|-------|---------|
| Practitioner | $79/mo | 10 | $790 |
| Director Pack | $199/mo | 5 | $995 |
| Site Command | $499/mo | 2 | $998 |
| **TOTAL** | | **17** | **$2,783** |

**ROI:** 4,700% - 37,000% 🚀

---

## 📞 SUPPORT RESOURCES

### **Documentation**
- `ACTIVATION_GUIDE.md` - This file
- `COMPLETE_INTEGRATION_GUIDE.md` - Technical architecture
- `TALKING_AVATAR_INTEGRATION.md` - Avatar setup
- `DEPLOYMENT_GUIDE.md` - Deployment instructions

### **Dashboards**
- **Vercel:** https://vercel.com/nivlawest1911-oss-projects/edintel-app
- **Stripe:** https://dashboard.stripe.com
- **Google Cloud:** https://console.cloud.google.com

### **API Documentation**
- **Vercel:** https://vercel.com/docs
- **Stripe:** https://stripe.com/docs
- **HeyGen:** https://docs.heygen.com
- **ElevenLabs:** https://elevenlabs.io/docs
- **Cloudinary:** https://cloudinary.com/documentation

---

## 🎉 COMPLETION

Once all steps are complete:

1. ✅ **Announce Launch**
   - Share with Mobile County Schools
   - Share with Prichard Schools
   - Post on social media
   - Send to beta testers

2. ✅ **Monitor Performance**
   - Check Vercel Analytics
   - Review Stripe Dashboard
   - Monitor Mission Control
   - Track user feedback

3. ✅ **Iterate & Improve**
   - Collect user feedback
   - Add requested features
   - Optimize performance
   - Expand to more districts

---

## 🚀 NEXT STEPS AFTER ACTIVATION

### **Week 1: Beta Testing**
- [ ] Invite 5-10 beta users
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Optimize performance

### **Week 2: Marketing**
- [ ] Create demo videos
- [ ] Write case studies
- [ ] Design marketing materials
- [ ] Launch social media campaign

### **Week 3: Scaling**
- [ ] Onboard first paying customers
- [ ] Set up customer support
- [ ] Create training materials
- [ ] Expand to new districts

### **Month 2: Growth**
- [ ] Add requested features
- [ ] Integrate more AI services
- [ ] Expand avatar library
- [ ] Build community

---

**🎓 Transform education in Mobile County & Prichard Schools!**

**Built by:** Dr. Alvin West, EdD  
**For:** Alabama Educators  
**Powered by:** Vercel, Google Cloud, NVIDIA, Stripe

---

**Last Updated:** January 20, 2026  
**Version:** 1.0.0  
**Status:** 🚀 PRODUCTION READY
