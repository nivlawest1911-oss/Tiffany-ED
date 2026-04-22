# Sovereign v4.1 Omega – District Rollout Checklist

## Pre-Rollout (Do these first)
- [x] Add production environment variables in Vercel (TURNSTILE_SECRET_KEY, SENTRY_DSN, etc.)
- [x] Run `npm run build` locally and confirm zero errors
- [x] Verify Sentry DSN and Turnstile keys are live
- [x] Test full auth flow (Google + Facebook + Email/Password)
- [x] Confirm André Patterson avatar and bio-adaptive lessons work

## Go-Live Day
- [x] Merge feature branch to `main`
- [x] Monitor first 30–60 minutes in Sentry + Vercel Analytics
- [x] Send district-wide announcement
- [ ] Enable real Turnstile keys (disable test mode)
- [ ] **Sentinel Watch**: Verify `MAINTENANCE_MODE=true` instantly locks the node

## Post-Launch (First 24 Hours)
- [ ] Monitor Sentry for `unhandled_exceptions` (First Hour)
- [ ] **Audit Privacy**: Verify `ip_address` and `user_agent` masking in `error_logs` after 100 entries
- [ ] Check audit ledger for successful sign-ins
- [ ] Verify rate limiting does not block legitimate users
- [ ] **Resilience Check**: Monitor `WellnessClient` under concurrent load
- [ ] Gather feedback from pilot users

## Long-Term Maintenance
- Rotate secrets quarterly
- Review Sentry performance data monthly
- Plan for Prisma Accelerate if database load increases
