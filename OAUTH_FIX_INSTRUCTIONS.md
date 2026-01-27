# 🔐 GOOGLE AUTH REDIRECT FIX

**Status:** ✅ DEPLOYED
**Issue:** Redirect URI Mismatch (Error 400)
**Cause:** Dynamic host resolution was picking up internal Vercel preview URLs instead of the registered production domain.

## 🛠️ The Fix
I have patched `src/app/api/auth/google/route.ts` to enforce the canonical URL.

*   **Logic:** If the environment is NOT localhost, it now force-sets the redirect domain to `https://edintel-app.vercel.app`.
*   **Result:** The redirect URI sent to Google will always be:
    `https://edintel-app.vercel.app/api/auth/google/callback`

## 🚦 Verification
1.  Wait 1 minute for the new Vercel build to propagate.
2.  Try signing in with Google again.
3.  The match should now be exact.

*Sovereignty authenticated.*
