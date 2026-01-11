# Sovereign Architecture: Communication Protocols

**Status**: ENFORCED
**Timestamp**: 2026-01-10T20:25:00-06:00

## 1. Google Cloud Platform (GCP)
- **Allowed Traffic**: 
  - **Source**: Vercel Serverless Functions (`edintel-app.vercel.app`)
  - **Service**: Generative Language API (`generativelanguage.googleapis.com`)
  - **Method**: API Key Auth (`GOOGLE_GENAI_API_KEY`)
- **Blocked Traffic**:
  - No connections to Firebase Hosting.
  - No connections to Firestore/Realtime DB.
  - No connections to Cloud Functions/Run.

## 2. GitHub
- **Allowed Traffic**:
  - **Destination**: Vercel (Deployment Webhooks).
  - **Trigger**: Push to `main`.
- **Blocked Traffic**:
  - No actions/workflows targeting Firebase.
  - No actions/workflows targeting Google Cloud Run.
  - No secrets stored for GCP Service Accounts.

## 3. Vercel (The Hub)
- **Role**: Sole Hosting & Compute Provider.
- **Inbound**: 
  - User Traffic (HTTPS)
  - GitHub Webhooks (Code Updates)
- **Outbound**:
  - Google Cloud (AI Requests)
  - Stripe (Payment Processing)
  - Vercel Analytics (Telemetry)

**Verification**: This architecture is hard-coded into the repository structure and cloud configuration.
