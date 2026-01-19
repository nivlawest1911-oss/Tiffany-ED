# 🚀 EdIntel Sovereign - Complete Deployment Guide

## Let's Deploy Everything!

This guide will walk you through deploying the complete agentic multimodal infrastructure.

---

## 📋 Prerequisites Checklist

Before we begin, ensure you have:

- [ ] Google Cloud account with billing enabled
- [ ] `gcloud` CLI installed and authenticated
- [ ] Stripe account (for payments)
- [ ] Domain name (optional)

---

## Phase 1: Google Cloud Project Setup (10 minutes)

### Step 1.1: Create and Configure Project

```bash
# Set your project ID
export PROJECT_ID="edintel-sovereign"
export REGION="us-central1"

# Create project
gcloud projects create $PROJECT_ID --name="EdIntel Sovereign"

# Set as active project
gcloud config set project $PROJECT_ID

# Link billing account (you'll need to do this in console first)
# Go to: https://console.cloud.google.com/billing
# Then link your billing account to the project

# Get project number
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
echo "Project Number: $PROJECT_NUMBER"
```

### Step 1.2: Enable Required APIs

```bash
# Enable all required APIs
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  storage.googleapis.com \
  aiplatform.googleapis.com \
  containerregistry.googleapis.com \
  secretmanager.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  compute.googleapis.com \
  cloudbuild.googleapis.com

# Wait for APIs to be enabled (takes ~2 minutes)
echo "✅ APIs enabled successfully!"
```

---

## Phase 2: Database Setup (15 minutes)

### Step 2.1: Create Cloud SQL Instance

```bash
# Create Postgres 15 instance with pgvector
gcloud sql instances create edintel-db \
  --database-version=POSTGRES_15 \
  --tier=db-custom-2-7680 \
  --region=$REGION \
  --database-flags=cloudsql.enable_pgvector=on \
  --backup-start-time=03:00

# This takes ~10 minutes. You'll see:
# "Creating Cloud SQL instance...done."
```

### Step 2.2: Set Database Password

```bash
# Set a secure password
export DB_PASSWORD="YOUR_SECURE_PASSWORD_HERE"

# Create database user
gcloud sql users set-password postgres \
  --instance=edintel-db \
  --password=$DB_PASSWORD

# Create database
gcloud sql databases create edintel \
  --instance=edintel-db
```

### Step 2.3: Get Connection String

```bash
# Get connection name
export DB_CONNECTION=$(gcloud sql instances describe edintel-db \
  --format='value(connectionName)')

echo "Database Connection: $DB_CONNECTION"

# Create connection string for Vercel
export DATABASE_URL="postgresql://postgres:${DB_PASSWORD}@/${DB_CONNECTION}/edintel?host=/cloudsql/${DB_CONNECTION}"

echo "DATABASE_URL: $DATABASE_URL"
# Save this for Vercel configuration!
```

### Step 2.4: Initialize Database Schema

```bash
# Install Cloud SQL Proxy
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.windows.amd64.exe

# Start proxy in background
./cloud-sql-proxy $DB_CONNECTION &

# Wait 5 seconds for proxy to start
sleep 5

# Run schema initialization
psql "host=127.0.0.1 port=5432 dbname=edintel user=postgres password=$DB_PASSWORD" \
  -f prisma/init_schema.sql

echo "✅ Database schema initialized!"
```

---

## Phase 3: Storage Setup (5 minutes)

### Step 3.1: Create Storage Bucket

```bash
# Create bucket for evidence folders
gsutil mb -l $REGION gs://edintel-evidence-${PROJECT_ID}

# Set lifecycle policy (delete after 90 days)
cat > lifecycle.json << EOF
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "Delete"},
        "condition": {"age": 90}
      }
    ]
  }
}
EOF

gsutil lifecycle set lifecycle.json gs://edintel-evidence-${PROJECT_ID}

# Set CORS for Vercel uploads
cat > cors.json << EOF
[
  {
    "origin": ["https://edintel-app.vercel.app", "https://*.vercel.app"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type", "Authorization"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set cors.json gs://edintel-evidence-${PROJECT_ID}

echo "✅ Storage bucket configured!"
```

---

## Phase 4: Vertex AI Setup (10 minutes)

### Step 4.1: Enable Vertex AI

```bash
# Already enabled in Phase 1, but let's verify
gcloud services enable aiplatform.googleapis.com

echo "✅ Vertex AI enabled!"
```

### Step 4.2: Create API Key

```bash
# Create service account for Vertex AI
gcloud iam service-accounts create edintel-vertex-ai \
  --display-name="EdIntel Vertex AI"

# Grant permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:edintel-vertex-ai@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

# Create API key
gcloud alpha services api-keys create \
  --display-name="EdIntel Vertex AI Key" \
  --api-target=service=aiplatform.googleapis.com

# Get the key (you'll need this for Vercel)
# Go to: https://console.cloud.google.com/apis/credentials
# Copy the API key
```

### Step 4.3: Create Context Cache for Alabama Regulations

```bash
# Create regulations content file
cat > alabama-regulations.json << 'EOF'
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "You are an expert on Alabama educational regulations. Here are the key statutes:\n\nALABAMA LITERACY ACT (Code § 16-6G):\n- Individual Reading Plans (IRPs) required within 30 days of identification\n- 60 minutes/day Tier I instruction for struggling readers\n- Parent notification within 15 days\n- Reading deficiency defined as below grade level on approved assessments\n\nALABAMA NUMERACY ACT (2026):\n- Tier I math intervention for students below proficiency\n- Dyscalculia screening required\n- Summer math camp eligibility for at-risk students\n\nALABAMA ADMINISTRATIVE CODE 290-8-9 (Special Education):\n- Maximum caseload: 20 students per special education teacher\n- IEP review cycles: Annual review required\n- FAPE (Free Appropriate Public Education) requirements\n\nALABAMA SB 280 (Paperwork Streamlining Act):\n- Requires unified digital platform for educational documentation\n- Consolidates Literacy, Numeracy, and IEP documentation\n- Reduces redundant paperwork for teachers\n\nALABAMA CHOOSE ACT (2026):\n- Education Savings Accounts (ESAs) up to $7,000 per student\n- Eligibility: 300% of federal poverty level\n- Can be used for private school tuition, tutoring, therapy\n\nUse these regulations to provide accurate, compliant guidance to Alabama educators."
        }
      ]
    }
  ]
}
EOF

# Note: Context caching requires Vertex AI SDK
# We'll configure this in the application code
echo "✅ Regulations file created!"
```

---

## Phase 5: Workload Identity Federation (15 minutes)

### Step 5.1: Create WIF Pool and Provider

```bash
# Create workload identity pool
gcloud iam workload-identity-pools create "github-pool" \
  --project="$PROJECT_ID" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Create OIDC provider
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="$PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub Actions Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --issuer-uri="https://token.actions.githubusercontent.com"

echo "✅ WIF Pool and Provider created!"
```

### Step 5.2: Create Service Account

```bash
# Create service account for GitHub Actions
gcloud iam service-accounts create edintel-github-actions \
  --project="$PROJECT_ID" \
  --display-name="EdIntel GitHub Actions"

export SA_EMAIL="edintel-github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/cloudsql.client"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/artifactregistry.writer"

echo "✅ Service account created and configured!"
```

### Step 5.3: Bind WIF to Service Account

```bash
# Allow GitHub Actions to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --project="$PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/nivlawest1911-oss/Tiffany-ED"

# Get WIF provider name
export WIF_PROVIDER="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"

echo "WIF Provider: $WIF_PROVIDER"
echo "Service Account: $SA_EMAIL"
# Save these for GitHub Secrets!
```

---

## Phase 6: Configure GitHub Secrets (5 minutes)

Go to: https://github.com/nivlawest1911-oss/Tiffany-ED/settings/secrets/actions

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `GCP_WIF_PROVIDER` | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider` |
| `GCP_SA_EMAIL` | `edintel-github-actions@PROJECT_ID.iam.gserviceaccount.com` |
| `GCP_PROJECT_ID` | `edintel-sovereign` |
| `DATABASE_URL` | Your connection string from Step 2.3 |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Your Vertex AI API key from Step 4.2 |
| `STRIPE_SECRET_KEY` | From Stripe Dashboard |
| `STRIPE_PUBLISHABLE_KEY` | From Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | From Stripe Webhooks |

---

## Phase 7: Deploy to Vercel (5 minutes)

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Add environment variables
vercel env add DATABASE_URL production
# Paste your DATABASE_URL

vercel env add GOOGLE_GENERATIVE_AI_API_KEY production
# Paste your API key

vercel env add STRIPE_SECRET_KEY production
# Paste your Stripe secret key

vercel env add STRIPE_PUBLISHABLE_KEY production
# Paste your Stripe publishable key

vercel env add GCP_PROJECT_ID production
# Enter: edintel-sovereign

vercel env add GCP_STORAGE_BUCKET production
# Enter: edintel-evidence-edintel-sovereign

# Deploy to production
vercel deploy --prod

echo "✅ Deployed to Vercel!"
```

---

## Phase 8: Configure Stripe Webhooks (5 minutes)

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://edintel-app.vercel.app/api/tokens/webhook`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the webhook secret
6. Add to Vercel:
   ```bash
   vercel env add STRIPE_WEBHOOK_SECRET production
   # Paste webhook secret
   ```

---

## Phase 9: Test Everything (10 minutes)

### Test 1: Database Connection

```bash
# Test database
psql "host=127.0.0.1 port=5432 dbname=edintel user=postgres password=$DB_PASSWORD" \
  -c "SELECT COUNT(*) FROM users;"

# Should return: 0 (or number of users)
```

### Test 2: Vercel Deployment

```bash
# Visit your site
open https://edintel-app.vercel.app

# Check health endpoint
curl https://edintel-app.vercel.app/api/health
```

### Test 3: Token Purchase Flow

1. Go to: https://edintel-app.vercel.app/pricing
2. Click "Professional" package
3. Use Stripe test card: `4242 4242 4242 4242`
4. Verify tokens added to account

---

## 🎉 Deployment Complete!

### What's Live:

✅ **Frontend:** https://edintel-app.vercel.app  
✅ **Database:** Cloud SQL with pgvector  
✅ **Storage:** Google Cloud Storage  
✅ **AI:** Vertex AI (Gemini 3 Pro ready)  
✅ **Payments:** Stripe integration  
✅ **Security:** Workload Identity Federation  

### What's Next (Optional - Advanced Features):

**For Full Multimodal Avatar Features:**

1. **Deploy NVIDIA ACE to Cloud Run** (requires GPU quota)
2. **Set up LiveKit server** (for WebRTC)
3. **Configure ElevenLabs** (for voice cloning)

These are optional and can be added later. The core platform is fully functional!

---

## 📊 Cost Estimate

**Monthly Operating Costs (1000 users):**
- Vercel Pro: $20
- Cloud SQL: $100
- Cloud Run: $50
- Vertex AI: $50
- Storage: $10
- **Total: ~$230/month**

**Revenue (1000 × $79):** $79,000/month  
**Profit:** $78,770/month  
**Margin:** 99.7%

---

## 🆘 Troubleshooting

### Issue: "Permission denied" errors

**Solution:**
```bash
# Re-authenticate
gcloud auth login
gcloud auth application-default login
```

### Issue: Database connection fails

**Solution:**
```bash
# Check Cloud SQL Proxy is running
ps aux | grep cloud-sql-proxy

# Restart if needed
./cloud-sql-proxy $DB_CONNECTION &
```

### Issue: API quota exceeded

**Solution:**
Go to: https://console.cloud.google.com/iam-admin/quotas
Request quota increase for the specific API

---

## 📞 Support

- **Documentation:** See `DEPLOYMENT_ROADMAP.md`
- **Architecture:** See `ARCHITECTURE.md`
- **Security:** See `WIF_SETUP.md`

---

**🚀 Congratulations! EdIntel Sovereign is now live!**
