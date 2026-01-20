# 🚀 EdIntel Professional - Complete Deployment Guide

## ✅ **PRE-DEPLOYMENT CHECKLIST**

### **1. Google Cloud Setup**
- [ ] Create Google Cloud Project
- [ ] Enable Google OAuth 2.0
- [ ] Enable Vertex AI API
- [ ] Enable Generative Language API
- [ ] Create OAuth credentials
- [ ] Add authorized redirect URIs:
  - `https://edintel-app.vercel.app/api/auth/google/callback`
  - `http://localhost:3000/api/auth/google/callback` (for testing)

### **2. Stripe Configuration**
- [ ] Create Stripe account
- [ ] Set up Products & Prices:
  - **Practitioner** (Monthly & Annual)
  - **Director Pack** (Monthly & Annual)
  - **Site Command** (Monthly & Annual)
  - **Intelligence Tokens** (One-time)
- [ ] Configure Webhook endpoint:
  - URL: `https://edintel-app.vercel.app/api/stripe/webhook`
  - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`
- [ ] Copy Price IDs to environment variables
- [ ] Test mode first, then switch to live mode

### **3. Vercel Postgres Database**
- [ ] Create Vercel Postgres database
- [ ] Run schema migrations (see `prisma/schema.prisma`)
- [ ] Add database connection strings to Vercel environment variables

### **4. AI Services (Optional but Recommended)**
- [ ] **ElevenLabs**: Sign up for voice synthesis
- [ ] **HeyGen**: Create account for realistic avatars
- [ ] **Replicate**: Get API token for media generation
- [ ] **LiveKit**: Set up for real-time communication

---

## 🔐 **ENVIRONMENT VARIABLES SETUP**

### **Vercel Dashboard → Project Settings → Environment Variables**

Add ALL variables from `.env.example`:

```bash
# Critical Variables (REQUIRED)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_GENAI_API_KEY=...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
POSTGRES_URL=...

# Pricing Tiers (REQUIRED for Stripe)
STRIPE_PRACTITIONER_PRICE_ID=price_...
STRIPE_PRACTITIONER_ANNUAL_ID=price_...
STRIPE_DIRECTOR_PRICE_ID=price_...
STRIPE_DIRECTOR_ANNUAL_ID=price_...
STRIPE_SITE_COMMAND_PRICE_ID=price_...
STRIPE_SITE_COMMAND_ANNUAL_ID=price_...

# AI Enhancements (OPTIONAL)
ELEVENLABS_API_KEY=...
HEYGEN_API_KEY=...
REPLICATE_API_TOKEN=...
```

---

## 📦 **DEPLOYMENT STEPS**

### **Step 1: Verify Build**
```bash
npm run build
```
✅ Ensure no errors

### **Step 2: Push to GitHub**
```bash
git add .
git commit -m "feat: production-ready with enhanced auth and payments"
git push origin main
```

### **Step 3: Deploy to Vercel**

#### **Option A: Automatic (GitHub Integration)**
1. Connect GitHub repo to Vercel
2. Vercel auto-deploys on push to `main`
3. Monitor build logs

#### **Option B: Manual CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### **Step 4: Configure Custom Domain (Optional)**
1. Vercel Dashboard → Domains
2. Add your domain (e.g., `edintel.ai`)
3. Update DNS records
4. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## 🧪 **POST-DEPLOYMENT TESTING**

### **1. Google Login Test**
1. Visit `https://edintel-app.vercel.app/login`
2. Click "Sign in with Google"
3. Authorize app
4. Verify redirect to dashboard
5. Check database for new user entry

### **2. Stripe Checkout Test**
1. Visit `https://edintel-app.vercel.app/pricing`
2. Select a plan (use Stripe test mode first)
3. Complete checkout with test card: `4242 4242 4242 4242`
4. Verify webhook received
5. Check user tier updated in database

### **3. AI Generation Test**
1. Login to dashboard
2. Navigate to any generator
3. Enter a prompt
4. Verify AI response
5. Check token deduction

### **4. Avatar Test**
1. Open AI Assistant (bottom right)
2. Send a message
3. Verify response
4. Test voice (if ElevenLabs configured)

---

## 🔧 **TROUBLESHOOTING**

### **Google Login Issues**
- **Error: `redirect_uri_mismatch`**
  - Add exact redirect URI to Google Cloud Console
  - Format: `https://your-domain.vercel.app/api/auth/google/callback`

- **Error: `invalid_client`**
  - Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
  - Check for trailing spaces in environment variables

### **Stripe Issues**
- **Webhook not receiving events**
  - Verify webhook URL in Stripe Dashboard
  - Check `STRIPE_WEBHOOK_SECRET` matches
  - Test webhook with Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

- **Price ID not found**
  - Verify all `STRIPE_*_PRICE_ID` variables are set
  - Check Price IDs in Stripe Dashboard → Products

### **Database Issues**
- **Connection timeout**
  - Use `POSTGRES_PRISMA_URL` for Prisma (with pgBouncer)
  - Use `POSTGRES_URL_NON_POOLING` for direct connections

- **Schema mismatch**
  - Run: `npx prisma db push`
  - Or: `npx prisma migrate deploy`

---

## 📊 **MONITORING & ANALYTICS**

### **Vercel Analytics**
- Automatically enabled for all deployments
- View in Vercel Dashboard → Analytics

### **Stripe Dashboard**
- Monitor payments, subscriptions, and webhooks
- Set up email notifications for failed payments

### **Google Cloud Console**
- Monitor API usage and quotas
- Set up billing alerts

---

## 🔒 **SECURITY CHECKLIST**

- [ ] All API keys stored in Vercel environment variables (NOT in code)
- [ ] Stripe webhook signature verification enabled
- [ ] Google OAuth redirect URIs whitelisted
- [ ] Database connection uses SSL
- [ ] JWT secrets are strong (32+ characters)
- [ ] CORS configured for production domain only
- [ ] Rate limiting enabled on API routes

---

## 🎯 **EXECUTIVE WHITELIST**

The following emails automatically receive **Site Command** tier:
- `nivlawest1911@gmail.com`
- `dralvinwest@transcendholisticwellness.com`

To add more executives, edit:
`src/app/api/auth/google/callback/route.ts` → `EXECUTIVE_WHITELIST`

---

## 📞 **SUPPORT RESOURCES**

- **Vercel Docs**: https://vercel.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Google Cloud**: https://cloud.google.com/docs
- **Next.js**: https://nextjs.org/docs

---

## ✅ **DEPLOYMENT SUCCESS INDICATORS**

1. ✅ Build completes without errors
2. ✅ Google Login works end-to-end
3. ✅ Stripe checkout creates subscriptions
4. ✅ Webhooks update database correctly
5. ✅ AI generation works
6. ✅ Avatars respond to messages
7. ✅ All pages load without 404s
8. ✅ Mobile responsive
9. ✅ Analytics tracking
10. ✅ SSL certificate active

---

**🎉 Your EdIntel Professional platform is now LIVE!**

**Next Steps:**
1. Share with beta users
2. Monitor error logs
3. Collect feedback
4. Iterate and improve

**Remember:** Start with Stripe test mode, verify everything works, then switch to live mode.
