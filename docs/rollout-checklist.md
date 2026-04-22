# Rollout Checklist: EdIntel Sovereign v4.1 Omega

This document provides the definitive steps for district leadership and IT administrators to induce the v4.1 Omega platform.

## 🟢 Pre-Launch: Infrastructure Hardening
- [ ] **Auth Token Sync**: Ensure `SENTRY_AUTH_TOKEN` is set in Vercel to enable source map uploading.
- [ ] **Observability Activation**: Populate `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_DSN` in Vercel.
- [ ] **Turnstile Secrets**: verify `TURNSTILE_SECRET_KEY` is present in production variables.
- [ ] **Rate Limit Quota**: Confirm Upstash Redis (Vercel KV) usage limits are sufficient for district-wide traffic.

## 🔵 Phase 1: Institutional Induction (Admins)
- [ ] **Superintendent Onboarding**: First set of Executive/Superintendent accounts must be provisioned via the `Social Uplink`.
- [ ] **Fleet Scoping**: Assign school IDs to Principals to ensure correct data scoping in the dashboard.
- [ ] **Audit Review**: Periodically check the `analytics_events` table for sign-in integrity.

## 🟡 Phase 2: Educator Induction (Faculty)
- [ ] **Wellness Thresholds**: Educators must synchronize their wearable devices (Apple Health / Garmin) via the `Wellness Client`.
- [ ] **Companion Handshake**: Initialize the `Tiffany-ED` or `André Patterson` cognitive companion.
- [ ] **Academic Velocity Baseline**: Populate initial curriculum data to generate the first Fleet Intelligence metrics.

## 🔴 Phase 3: Public Resonance (Public Launch)
- [ ] **Observation Mode**: Monitor Sentry for 24 hours of live production traffic (Observability Mode).
- [ ] **Lighthouse Sweep**: Final verification of >90 performance scores on the public login page.
- [ ] **Full Lockdown**: (Optional) Transition `verify-sentinel.ts` to strict mode to block builds on hardening failures.

---
> [!IMPORTANT]
> **Sovereign Support**: For institutional failures, the Executive Agent can be reached via the `Sovereign Uplink` bypass or the `Institutional Sentinel` console.

> [!CAUTION]
> **Data Privacy**: Ensure that no PII (Personally Identifiable Information) is included in custom audit log metadata beyond the institutional standards.
