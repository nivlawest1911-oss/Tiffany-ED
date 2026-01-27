# 🔐 Fixing Facebook Login: "Can't load URL"

This error occurs because **Facebook Security** strictly blocks any domain that is not explicitly whitelisted in your app settings. Since you are now hosting on Vercel, you must tell Facebook about your new home.

## ⚡ Quick Fix Steps

1.  **Go to Facebook Developers Console:**
    *   Open [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)
    *   Select your **EdIntel / Transcend** app.

2.  **Left Sidebar -> "Settings" -> "Basic":**
    *   Locate the **"App Domains"** field.
    *   Add: `vercel.app`
    *   Add: `edintel-app.vercel.app` (Your specific domain)
    *   Click **Save Changes** at the bottom.

3.  **Left Sidebar -> "Facebook Login" -> "Settings":**
    *   Find the **"Valid OAuth Redirect URIs"** field.
    *   Add exactly:
        ```text
        https://edintel-app.vercel.app/api/auth/callback/facebook
        ```
    *   *(Note: If you are strictly using NextAuth default, it might be `/api/auth/callback/facebook`. If you are manually handling it, verify the path, but the standard NextAuth path is usually what's required).*
    *   Click **Save Changes**.

## ⏳ Replication
*   Like Google, changes usually take ~5 minutes to propagate.

## 💡 Why this happened?
You moved from `localhost` to `vercel.app`. Facebook considers this a "hijacking risk" until you prove you own that new URL by adding it to the settings.
