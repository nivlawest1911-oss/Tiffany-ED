# EdIntel Sovereign Deployment Checklist

## 1. Firebase Extensions (Console Action Required)
The application relies on the "Run Payments with Stripe" extension to sync products and handle checkout sessions.

- [ ] **Go to Firebase Console**: [Extensions Dashboard](https://console.firebase.google.com/project/_/extensions)
- [ ] **Install/Configure**: "Run Payments with Stripe"
- [ ] **Critical Setting**: Set `Products Collection` to `products`.
- [ ] **Critical Setting**: Set `Users Collection` to `users`.
- [ ] **Sync**: Enable "Sync existing products" if asked.

## 2. GitHub Secrets (CI/CD Security)
To ensure the live application functions correctly, these secrets must be added to your GitHub Repository > Settings > Secrets and variables > Actions.

| Secret Name | Value Needed | Purpose |
|-------------|--------------|---------|
| `STRIPE_SECRET_KEY` | `sk_live_...` | For server-side checkout creation. |
| `GOOGLE_GENAI_API_KEY` | `AIzm...` | For Avatar and Aide intelligence. |
| `NEXT_PUBLIC_ADMIN_EMAIL` | `your-email@...` | For admin access to billing portals. |

## 3. Stripe Webhooks (Payment Sync)
To ensure users are granted access immediately after payment:

- [ ] **Go to Stripe Dashboard**: Developers > Webhooks
- [ ] **Verify URL**: Ensure the URL provided by the Firebase Extension is listed.
- [ ] **Events**: It should listen for `checkout.session.completed`, `customer.subscription.created`, etc.

## 4. Environment Verification
Run the following local script to verify if your local environment has the necessary keys (requires a `.env.local` file):
```bash
npm run verify-env
```
