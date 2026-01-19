# 🚀 EdIntel Sovereign - Deployment Guide

## Quick Start Deployment

This guide will walk you through deploying EdIntel Sovereign to production using the **Vercel + Google Cloud + GitHub** architecture.

---

## Prerequisites

### 1. Accounts & Tools

- ✅ **Google Cloud Account** with billing enabled
- ✅ **Vercel Account** (free tier works)
- ✅ **GitHub Account** with repository access
- ✅ **Node.js 20+** installed locally
- ✅ **gcloud CLI** installed ([Download](https://cloud.google.com/sdk/docs/install))
- ✅ **Vercel CLI** installed: `npm i -g vercel`

### 2. API Keys

- Google Cloud API Key (Vertex AI)
- Stripe API Keys (for payments)
- ElevenLabs API Key (optional, for voice cloning)

---

## Step 1: Google Cloud Setup

### 1.1 Create Project

```bash
# Create new GCP project
gcloud projects create edintel-sovereign --name="EdIntel Sovereign"

# Set as active project
gcloud config set project edintel-sovereign

# Link billing account (replace BILLING_ACCOUNT_ID)
gcloud beta billing projects link edintel-sovereign \
  --billing-account=BILLING_ACCOUNT_ID
```

### 1.2 Enable Required APIs

```bash
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  storage.googleapis.com \
  aiplatform.googleapis.com \
  containerregistry.googleapis.com \
  secretmanager.googleapis.com
```

### 1.3 Create Cloud SQL Instance

```bash
# Create Postgres instance with pgvector support
gcloud sql instances create edintel-db \
  --database-version=POSTGRES_15 \
  --tier=db-custom-2-7680 \
  --region=us-central1 \
  --database-flags=cloudsql.enable_pgvector=on

# Create database
gcloud sql databases create edintel \
  --instance=edintel-db

# Create user
gcloud sql users create edintel_user \
  --instance=edintel-db \
  --password=YOUR_SECURE_PASSWORD
```

### 1.4 Get Connection String

```bash
# Get instance connection name
gcloud sql instances describe edintel-db \
  --format='value(connectionName)'

# Format: project:region:instance
# Example: edintel-sovereign:us-central1:edintel-db
```

Your DATABASE_URL will be:
```
postgresql://edintel_user:YOUR_SECURE_PASSWORD@/edintel?host=/cloudsql/PROJECT:REGION:INSTANCE
```

### 1.5 Create Storage Bucket

```bash
# Create bucket for evidence folders
gsutil mb -l us-central1 gs://edintel-evidence

# Set lifecycle policy (optional - auto-delete after 7 years)
cat > lifecycle.json << EOF
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "Delete"},
        "condition": {"age": 2555}
      }
    ]
  }
}
EOF

gsutil lifecycle set lifecycle.json gs://edintel-evidence
```

### 1.6 Create Service Account

```bash
# Create service account
gcloud iam service-accounts create edintel-sa \
  --display-name="EdIntel Service Account"

# Grant permissions
gcloud projects add-iam-policy-binding edintel-sovereign \
  --member="serviceAccount:edintel-sa@edintel-sovereign.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding edintel-sovereign \
  --member="serviceAccount:edintel-sa@edintel-sovereign.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

gcloud projects add-iam-policy-binding edintel-sovereign \
  --member="serviceAccount:edintel-sa@edintel-sovereign.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

# Create and download key
gcloud iam service-accounts keys create gcp-key.json \
  --iam-account=edintel-sa@edintel-sovereign.iam.gserviceaccount.com
```

---

## Step 2: Database Setup

### 2.1 Install pgvector Extension

```bash
# Connect to Cloud SQL
gcloud sql connect edintel-db --user=edintel_user --database=edintel

# In psql prompt:
CREATE EXTENSION IF NOT EXISTS vector;
\q
```

### 2.2 Run Migrations Locally

```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="postgresql://edintel_user:PASSWORD@/edintel?host=/cloudsql/PROJECT:REGION:INSTANCE"

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate:deploy
```

---

## Step 3: GitHub Secrets Setup

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

```bash
# Google Cloud
GCP_PROJECT_ID=edintel-sovereign
GCP_SA_KEY=<contents of gcp-key.json>

# Database
DATABASE_URL=postgresql://edintel_user:PASSWORD@/edintel?host=/cloudsql/PROJECT:REGION:INSTANCE

# Vertex AI
GOOGLE_GENERATIVE_AI_API_KEY=<your-vertex-ai-key>

# Vercel
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Get Vercel Credentials

```bash
# Login to Vercel
vercel login

# Link project
vercel link

# Get org and project IDs from .vercel/project.json
cat .vercel/project.json
```

---

## Step 4: Deploy to Vercel

### 4.1 Manual Deployment

```bash
# Set environment variables
vercel env add DATABASE_URL production
vercel env add GOOGLE_GENERATIVE_AI_API_KEY production
vercel env add NEXT_PUBLIC_AVATAR_ENGINE_WS_URL production

# Deploy
npm run deploy:vercel
```

### 4.2 Automatic Deployment (Recommended)

Just push to `main` branch:

```bash
git add .
git commit -m "Deploy EdIntel Sovereign"
git push origin main
```

GitHub Actions will automatically:
1. ✅ Build and test
2. 🚀 Deploy to Vercel
3. ☁️ Deploy to Cloud Run
4. 🗄️ Run database migrations

---

## Step 5: Deploy Avatar Engine to Cloud Run

### 5.1 Manual Deployment

```bash
# Navigate to avatar engine
cd cloud/avatar-engine

# Deploy to Cloud Run
gcloud run deploy edintel-avatar-engine \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --min-instances 1 \
  --max-instances 10 \
  --set-env-vars "VERTEX_AI_PROJECT=edintel-sovereign" \
  --set-env-vars "VERTEX_AI_LOCATION=us-central1" \
  --set-secrets "DATABASE_URL=DATABASE_URL:latest" \
  --set-secrets "GOOGLE_GENERATIVE_AI_API_KEY=GOOGLE_GENERATIVE_AI_API_KEY:latest"
```

### 5.2 Get Cloud Run URL

```bash
gcloud run services describe edintel-avatar-engine \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)'
```

Update Vercel environment variable:
```bash
vercel env add NEXT_PUBLIC_AVATAR_ENGINE_WS_URL production
# Value: wss://edintel-avatar-engine-xxxxx.run.app
```

---

## Step 6: Verify Deployment

### 6.1 Check Vercel Deployment

```bash
# Get deployment URL
vercel inspect

# Test health endpoint
curl https://edintel-app.vercel.app/api/health
```

### 6.2 Check Cloud Run Deployment

```bash
# Get Cloud Run URL
CLOUD_RUN_URL=$(gcloud run services describe edintel-avatar-engine \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)')

# Test health endpoint
curl $CLOUD_RUN_URL/health
```

### 6.3 Test WebSocket Connection

```bash
# Install wscat
npm install -g wscat

# Connect to avatar engine
wscat -c wss://edintel-avatar-engine-xxxxx.run.app

# Send init message
{"type":"INIT_SESSION","data":{"userId":"test","avatarName":"Dr. Alvin","avatarRole":"Superintendent","engine":"duix"}}
```

---

## Step 7: Production Checklist

- [ ] **SSL/TLS**: Verify HTTPS on both Vercel and Cloud Run
- [ ] **Environment Variables**: All secrets configured in Vercel and GCP
- [ ] **Database**: Migrations applied successfully
- [ ] **Storage**: Evidence bucket created and accessible
- [ ] **Monitoring**: Cloud Logging enabled
- [ ] **Billing**: Set budget alerts in GCP
- [ ] **Backup**: Cloud SQL automated backups enabled
- [ ] **Domain**: Custom domain configured (optional)

---

## Monitoring & Logs

### View Cloud Run Logs

```bash
gcloud run services logs read edintel-avatar-engine \
  --limit=50 \
  --region=us-central1
```

### View Vercel Logs

```bash
vercel logs <deployment-url>
```

### Database Monitoring

```bash
# View recent operations
gcloud sql operations list --instance=edintel-db

# View instance metrics
gcloud sql instances describe edintel-db
```

---

## Cost Optimization

### Estimated Monthly Costs (1000 active users)

| Service | Configuration | Est. Cost |
|---------|--------------|-----------|
| Vercel Pro | Unlimited bandwidth | $20/mo |
| Cloud Run | 2 vCPU, 2Gi RAM, min 1 instance | $50/mo |
| Cloud SQL | db-custom-2-7680 | $100/mo |
| Vertex AI | ~100k tokens/day | $200/mo |
| Cloud Storage | 100GB evidence files | $10/mo |
| **Total** | | **~$380/mo** |

### Cost Reduction Tips

1. **Use Cloud Run min-instances=0** for dev environments
2. **Enable Cloud SQL automatic storage increase** only when needed
3. **Set Cloud Storage lifecycle policies** to archive old evidence
4. **Use Vertex AI caching** for repeated queries
5. **Monitor with budget alerts** to avoid surprises

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

```bash
# Check Cloud SQL status
gcloud sql instances describe edintel-db

# Verify connection string
echo $DATABASE_URL

# Test connection
gcloud sql connect edintel-db --user=edintel_user
```

#### 2. Cloud Run Deployment Failed

```bash
# View build logs
gcloud builds list --limit=5

# Check service status
gcloud run services describe edintel-avatar-engine \
  --region=us-central1
```

#### 3. WebSocket Connection Refused

- Verify `NEXT_PUBLIC_AVATAR_ENGINE_WS_URL` uses `wss://` not `ws://`
- Check Cloud Run allows unauthenticated requests
- Verify CORS settings in avatar engine

#### 4. Vertex AI Quota Exceeded

```bash
# Check quotas
gcloud compute project-info describe \
  --project=edintel-sovereign

# Request quota increase
# Go to: https://console.cloud.google.com/iam-admin/quotas
```

---

## Rollback Procedure

### Rollback Vercel Deployment

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback <deployment-url>
```

### Rollback Cloud Run Deployment

```bash
# List revisions
gcloud run revisions list \
  --service=edintel-avatar-engine \
  --region=us-central1

# Rollback to previous revision
gcloud run services update-traffic edintel-avatar-engine \
  --to-revisions=<previous-revision>=100 \
  --region=us-central1
```

### Rollback Database Migration

```bash
# CAUTION: This can cause data loss
# Manually revert migration in Prisma
npx prisma migrate resolve --rolled-back <migration-name>
```

---

## Security Best Practices

1. ✅ **Rotate service account keys** every 90 days
2. ✅ **Enable Cloud Armor** for DDoS protection
3. ✅ **Use Secret Manager** for all sensitive data
4. ✅ **Enable VPC Service Controls** for data exfiltration prevention
5. ✅ **Implement rate limiting** on Cloud Run
6. ✅ **Enable audit logging** for compliance
7. ✅ **Use least privilege IAM** roles

---

## Support

- **Documentation**: https://docs.edintel.app
- **GitHub Issues**: https://github.com/your-org/edintel-app/issues
- **Email**: support@edintel.app

---

**🎉 Congratulations! EdIntel Sovereign is now live in production!**
