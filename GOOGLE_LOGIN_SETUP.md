# 🔐 Google Login Activation Guide

To ensure the "Authorize via Google" button works effectively, you must configure the Google OAuth credentials.

## 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create a new **OAuth 2.0 Client ID** (Web Application).
3. **Name**: EdIntel Sovereign App
4. **Authorized Redirect URIs**:
   - `https://edintel-app.vercel.app/api/auth/google/callback` (Production)
   - `http://localhost:3000/api/auth/google/callback` (Local Development)

## 2. Get Credentials
Copy the following values from the Google Console:
- **Client ID**
- **Client Secret**

## 3. Configure Vercel (Production)
1. Go to your [Vercel Project Settings > Environment Variables](https://vercel.com/dashboard).
2. Add:
   - Key: `GOOGLE_CLIENT_ID`
   - Value: *(Paste Client ID)*
   - Key: `GOOGLE_CLIENT_SECRET`
   - Value: *(Paste Client Secret)*

## 4. Configure Local (Development)
1. Open `.env` (or `.env.local`) in your project root.
2. Add:
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## 5. Test
- **Local**: Restart your server (`npm run dev`) and click "Authorize via Google".
- **Production**: Wait for Vercel restart (or re-deploy) and test.

Everything else (Generic OAuth Flow, User Creation, Session Management) is already deployed in the app!
