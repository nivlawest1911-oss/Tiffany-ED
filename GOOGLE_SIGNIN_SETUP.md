# 🔐 GOOGLE SIGN-IN SETUP GUIDE

**Status:** ⚠️ **NEEDS CONFIGURATION**  
**Issue:** Google OAuth credentials are missing from environment variables

---

## 🎯 **QUICK FIX (5 MINUTES)**

### **Step 1: Get Google OAuth Credentials**

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/apis/credentials

2. **Select your project** (or create one):
   - Project name: `edintel-professional` (or similar)

3. **Create OAuth 2.0 Client ID:**
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `EdIntel Production`

4. **Add Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/google/callback
   https://edintel-app.vercel.app/api/auth/google/callback
   ```

5. **Click "Create"** and copy:
   - Client ID (starts with `xxx.apps.googleusercontent.com`)
   - Client Secret

---

### **Step 2: Add to Vercel Environment Variables**

1. **Go to Vercel Environment Variables:**
   - https://vercel.com/nivlawest1911-oss-projects/edintel-app/settings/environment-variables

2. **Add these 3 variables:**

   **Variable 1:**
   - Name: `GOOGLE_CLIENT_ID`
   - Value: `YOUR_CLIENT_ID.apps.googleusercontent.com`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `GOOGLE_CLIENT_SECRET`
   - Value: `YOUR_CLIENT_SECRET`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 3:**
   - Name: `NEXT_PUBLIC_APP_URL`
   - Value: `https://edintel-app.vercel.app`
   - Environments: ✅ Production, ✅ Preview
   
   **Variable 3 (Development):**
   - Name: `NEXT_PUBLIC_APP_URL`
   - Value: `http://localhost:3000`
   - Environments: ✅ Development

3. **Click "Save"**

---

### **Step 3: Pull to Local Environment**

Run in your terminal:

```bash
vercel env pull .env.local --yes
```

This will download all environment variables to your local `.env.local` file.

---

### **Step 4: Restart Dev Server**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

### **Step 5: Test Google Sign-In**

1. **Visit:** http://localhost:3000/login
2. **Click:** "Authorize via Google" button
3. **Sign in** with your Google account
4. **Verify** you're redirected to the dashboard

---

## 🔍 **VERIFICATION CHECKLIST**

After completing the steps above:

- [ ] Google Cloud Console has OAuth client created
- [ ] Redirect URIs include both localhost and production URLs
- [ ] `GOOGLE_CLIENT_ID` added to Vercel
- [ ] `GOOGLE_CLIENT_SECRET` added to Vercel
- [ ] `NEXT_PUBLIC_APP_URL` added to Vercel
- [ ] Environment variables pulled to local
- [ ] Dev server restarted
- [ ] Google Sign-In works on localhost
- [ ] Google Sign-In works on production

---

## 🚨 **TROUBLESHOOTING**

### **Error: "Google Client ID missing"**
**Solution:** Environment variables not loaded. Run `vercel env pull .env.local --yes`

### **Error: "redirect_uri_mismatch"**
**Solution:** Add the exact callback URL to Google Cloud Console:
- `http://localhost:3000/api/auth/google/callback`
- `https://edintel-app.vercel.app/api/auth/google/callback`

### **Error: "Invalid client"**
**Solution:** Double-check Client ID and Secret are correct in Vercel

### **Sign-in works locally but not in production**
**Solution:** 
1. Verify production URL in redirect URIs
2. Redeploy to Vercel after adding env vars
3. Check Vercel deployment logs

---

## 📋 **CURRENT OAUTH CONFIGURATION**

Your Google OAuth callback route is at:
- **File:** `src/app/api/auth/google/callback/route.ts`
- **Endpoint:** `/api/auth/google/callback`
- **Features:**
  - ✅ Retry logic (3 attempts)
  - ✅ Stripe synchronization
  - ✅ Executive whitelist
  - ✅ Comprehensive error handling
  - ✅ Database integration

---

## 🎯 **WHAT HAPPENS AFTER SIGN-IN**

1. User clicks "Sign in with Google"
2. Redirects to Google OAuth consent screen
3. User authorizes EdIntel
4. Google redirects back to `/api/auth/google/callback`
5. Backend:
   - Exchanges code for tokens
   - Gets user profile from Google
   - Creates/updates user in database
   - Syncs with Stripe (if applicable)
   - Creates session
6. User redirected to dashboard

---

## 🔐 **SECURITY NOTES**

- ✅ Client Secret is never exposed to frontend
- ✅ All OAuth flows use HTTPS in production
- ✅ Tokens are validated server-side
- ✅ Sessions are encrypted
- ✅ CSRF protection enabled

---

## 📞 **NEED HELP?**

- **Google OAuth Docs**: https://developers.google.com/identity/protocols/oauth2
- **Next.js Auth**: https://nextjs.org/docs/authentication
- **Vercel Env Vars**: https://vercel.com/docs/environment-variables

---

**✅ Once configured, Google Sign-In will work perfectly on both localhost and production!**
