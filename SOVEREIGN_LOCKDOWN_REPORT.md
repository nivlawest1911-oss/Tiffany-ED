# SOVEREIGN LOCKDOWN: SECURITY & CANONICAL STATUS REPORT

**Status:** 🔒 LOCKDOWN ACTIVE
**Date:** 2026-01-26
**Advisor:** EdIntel Security Council

## 1. Credentials Rotation (SMTP)
*   **Action:** The SMTP credentials for `Edintel SMTP v1` must be rotated immediately.
*   **Instruction:** Do not store the new app password in plain text.
    *   **Recommended:** Use Google Secret Manager or Vercel Environment Variables (Encrypted).
    *   **Local Dev:** Use `.env.local` (ensure it is git-ignored).

## 2. Admin Privileges (Hard-Coded)
*   **Protocol:** `SUPER_ADMIN_ID` is strictly enforced.
*   **Identity:** Dr. Alvin West.
*   **Mechanism:** Database migrations will lock this ID. Modifications via UI are disabled.

## 3. FERPA / Data Isolation (RLS)
*   **Strategy:** SQL Row Level Security (RLS) is mandatory.
*   **Policy:** `auth.uid() = user_id` for all personal data.
*   **Tenant Isolation:** `district_id` checks enforced on all `school_logs` and `student_data` tables.
*   **Breach Containment:** Even if the application logic fails, the database layer will reject cross-district queries.

## 4. Canonical Build Designation
*   **Build Tag:** `PRODUCTION-CANONICAL-V1`
*   **Verification:** Future deployments require MFA signature.
*   **Status:** This codebase is now the "Golden Image" for EdIntel.

*Sovereignty Secured. System Locked.*
