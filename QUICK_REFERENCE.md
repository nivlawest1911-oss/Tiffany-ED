# 🚀 EdIntel Professional - Quick Reference Card

**Production URL:** https://edintel-app.vercel.app  
**Status:** ✅ LIVE & READY

---

## ⚡ QUICK ACTIVATION (3 Commands)

```bash
# 1. Run activation script
pwsh scripts/activate-edintel.ps1

# 2. Upload media
node scripts/bulk-upload-vercel-blob.js

# 3. Deploy
vercel --prod
```

---

## 🔗 ESSENTIAL URLS

| Resource | URL |
|----------|-----|
| **Production Site** | https://edintel-app.vercel.app |
| **Dashboard** | https://edintel-app.vercel.app/dashboard |
| **Mission Control** | https://edintel-app.vercel.app/mission-control |
| **Evidence Gallery** | https://edintel-app.vercel.app/gallery |
| **Pricing** | https://edintel-app.vercel.app/pricing |
| **Login** | https://edintel-app.vercel.app/login |
| | |
| **Vercel Dashboard** | https://vercel.com/nivlawest1911-oss-projects/edintel-app |
| **Vercel Storage** | https://vercel.com/nivlawest1911-oss-projects/edintel-app/stores |
| **Vercel Settings** | https://vercel.com/nivlawest1911-oss-projects/edintel-app/settings |
| | |
| **Stripe Dashboard** | https://dashboard.stripe.com |
| **Google Cloud Console** | https://console.cloud.google.com |

---

## 🔑 REQUIRED ENVIRONMENT VARIABLES

### **Already Configured ✅**
- `POSTGRES_URL` - Vercel Postgres
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth
- `GOOGLE_GENAI_API_KEY` - Gemini AI
- `STRIPE_SECRET_KEY` - Stripe Payments
- `STRIPE_WEBHOOK_SECRET` - Stripe Webhooks
- All Stripe Price IDs

### **Need to Add ⏳**
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob (REQUIRED for media)

### **Optional (Recommended) 💡**
- `HEYGEN_API_KEY` - Talking avatars ($24/mo)
- `ELEVENLABS_API_KEY` - Voice synthesis ($22/mo)
- `CLOUDINARY_CLOUD_NAME` - Media optimization (Free)
- `CLOUDINARY_API_KEY` - Media optimization (Free)
- `CLOUDINARY_API_SECRET` - Media optimization (Free)
- `REPLICATE_API_TOKEN` - AI generation (Pay-per-use)

---

## 📋 3-STEP ACTIVATION

### **STEP 1: Database (5 min)**
1. Go to: https://vercel.com/nivlawest1911-oss-projects/edintel-app/stores
2. Click Postgres → Query tab
3. Copy/paste `database/schema.sql`
4. Click "Run Query"
5. Verify: ✅ Success message

### **STEP 2: Environment (5 min)**
1. Go to: https://vercel.com/nivlawest1911-oss-projects/edintel-app/settings/environment-variables
2. Click "Add New"
3. Add: `BLOB_READ_WRITE_TOKEN`
4. Get token from: https://vercel.com/dashboard/stores
5. Click "Save" → "Redeploy"

### **STEP 3: Media (5 min)**
1. Add files to: `edintel-media/`
2. Run: `node scripts/bulk-upload-vercel-blob.js`
3. Verify: `media-manifest.json` created
4. Check: https://edintel-app.vercel.app/gallery

---

## 🧪 TESTING CHECKLIST

- [ ] Homepage loads: https://edintel-app.vercel.app
- [ ] Google Login works: https://edintel-app.vercel.app/login
- [ ] Mission Control shows 4 agents: https://edintel-app.vercel.app/mission-control
- [ ] Gallery displays media: https://edintel-app.vercel.app/gallery
- [ ] Stripe checkout works: https://edintel-app.vercel.app/pricing
- [ ] AI generators work: Dashboard → Any generator
- [ ] No console errors: F12 → Console tab

---

## 🚨 QUICK TROUBLESHOOTING

### **Database Error**
```bash
# Re-run schema
# Go to Vercel Postgres → Query
# Paste database/schema.sql
# Click "Run Query"
```

### **Media Upload Fails**
```bash
# Pull latest env vars
vercel env pull .env.local

# Verify token exists
cat .env.local | grep BLOB_READ_WRITE_TOKEN

# Re-run upload
node scripts/bulk-upload-vercel-blob.js
```

### **Google Login Fails**
```
1. Go to: https://console.cloud.google.com
2. APIs & Services → Credentials
3. Add redirect URI:
   https://edintel-app.vercel.app/api/auth/google/callback
4. Save and wait 5 minutes
```

### **Build Fails**
```bash
# Reinstall dependencies
npm install

# Test build locally
npm run build

# Deploy
vercel --prod
```

---

## 💰 PRICING TIERS

| Plan | Price | Features |
|------|-------|----------|
| **Practitioner** | $79/mo | 1 user, Basic AI |
| **Director Pack** | $199/mo | 5 users, Advanced AI |
| **Site Command** | $499/mo | Unlimited, Premium AI |

**Revenue Potential:** $2,783/month (17 users)

---

## 📞 SUPPORT

### **Documentation**
- `ACTIVATION_CHECKLIST.md` - Complete checklist
- `VISUAL_SETUP_GUIDE.md` - Step-by-step with screenshots
- `COMPLETE_INTEGRATION_GUIDE.md` - Technical architecture
- `TALKING_AVATAR_INTEGRATION.md` - Avatar setup

### **Commands**
```bash
# Setup verification
node scripts/setup.js

# Activation script
pwsh scripts/activate-edintel.ps1

# Media upload
node scripts/bulk-upload-vercel-blob.js

# Local development
npm run dev

# Production deployment
vercel --prod

# Pull environment variables
vercel env pull .env.local
```

### **Key Files**
- `database/schema.sql` - Database schema
- `scripts/bulk-upload-vercel-blob.js` - Blob upload
- `scripts/bulk-upload-cloudinary.js` - Cloudinary upload
- `scripts/activate-edintel.ps1` - Activation script
- `.env.local` - Environment variables

---

## 🎯 SUCCESS INDICATORS

✅ **All Green = Ready for Production**

- [ ] ✅ Site loads: https://edintel-app.vercel.app
- [ ] ✅ Database has 6+ tables
- [ ] ✅ `BLOB_READ_WRITE_TOKEN` set
- [ ] ✅ Media uploads successfully
- [ ] ✅ Google Login works
- [ ] ✅ Stripe checkout works
- [ ] ✅ Mission Control shows agents
- [ ] ✅ Gallery displays media
- [ ] ✅ AI generators work
- [ ] ✅ No console errors

---

## 🚀 LAUNCH SEQUENCE

### **Pre-Launch**
1. Complete 3-step activation
2. Run all tests
3. Verify all features work
4. Check analytics setup

### **Launch Day**
1. Announce on social media
2. Email Mobile County Schools
3. Email Prichard Schools
4. Send to beta testers

### **Post-Launch**
1. Monitor Vercel Analytics
2. Check Stripe Dashboard
3. Review Mission Control
4. Collect user feedback

---

## 📊 MONITORING DASHBOARDS

| Dashboard | URL | Purpose |
|-----------|-----|---------|
| **Vercel Analytics** | https://vercel.com/nivlawest1911-oss-projects/edintel-app/analytics | Traffic, performance |
| **Stripe Dashboard** | https://dashboard.stripe.com | Payments, subscriptions |
| **Mission Control** | https://edintel-app.vercel.app/mission-control | AI agents, tokens |
| **Vercel Logs** | https://vercel.com/nivlawest1911-oss-projects/edintel-app/logs | Errors, debugging |

---

## 🎓 MISSION

**Transform education in Mobile County & Prichard Schools, Alabama**

**Built by:** Dr. Alvin West, EdD  
**Powered by:** Vercel, Google Cloud, NVIDIA, Stripe  
**Status:** 🚀 PRODUCTION READY

---

**Last Updated:** January 20, 2026  
**Version:** 1.0.0

---

## 🔖 BOOKMARK THIS PAGE

**Print this card and keep it handy for quick reference!**

```
File Location: c:\Users\nivla\edintel-app\QUICK_REFERENCE.md
```
