# 🔐 Workload Identity Federation Setup Guide

## Overview

This guide walks you through setting up **Workload Identity Federation (WIF)** for EdIntel Sovereign, eliminating the need for service account keys and providing keyless, secure authentication between GitHub Actions and Google Cloud.

---

## Why Workload Identity Federation?

✅ **Keyless Security** - No service account keys to manage or rotate  
✅ **Automatic Expiration** - Tokens expire automatically after use  
✅ **Audit Trails** - Every deployment logged with GitHub actor ID  
✅ **Zero Trust** - Session-based access with no "master key"  
✅ **Future Proof** - Easily scale across multiple repositories  

---

## Prerequisites

- Google Cloud Project created
- GitHub repository with admin access
- `gcloud` CLI installed and authenticated
- Project number (not project ID)

---

## Step 1: Get Your Project Number

```bash
# Get project number (you'll need this)
export PROJECT_ID="edintel-sovereign"
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

echo "Project ID: $PROJECT_ID"
echo "Project Number: $PROJECT_NUMBER"
```

---

## Step 2: Enable Required APIs

```bash
gcloud services enable \
  iamcredentials.googleapis.com \
  cloudresourcemanager.googleapis.com \
  sts.googleapis.com
```

---

## Step 3: Create Workload Identity Pool

```bash
# Create the pool
gcloud iam workload-identity-pools create "github-pool" \
  --project="$PROJECT_ID" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Verify creation
gcloud iam workload-identity-pools describe "github-pool" \
  --project="$PROJECT_ID" \
  --location="global"
```

---

## Step 4: Create Workload Identity Provider

```bash
# Create OIDC provider for GitHub
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="$PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub Actions Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Verify creation
gcloud iam workload-identity-pools providers describe "github-provider" \
  --project="$PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-pool"
```

---

## Step 5: Create Service Account (if not exists)

```bash
# Create service account
gcloud iam service-accounts create edintel-github-actions \
  --project="$PROJECT_ID" \
  --display-name="EdIntel GitHub Actions" \
  --description="Service account for GitHub Actions deployments"

# Get service account email
export SA_EMAIL="edintel-github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

echo "Service Account Email: $SA_EMAIL"
```

---

## Step 6: Grant Service Account Permissions

```bash
# Grant necessary roles
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
  --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/iam.serviceAccountUser"

# Grant permission to act as service account
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --project="$PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/${GITHUB_ORG}/${GITHUB_REPO}"
```

**Important:** Replace `${GITHUB_ORG}/${GITHUB_REPO}` with your actual GitHub organization and repository name (e.g., `nivlawest1911-oss/edintel-app`).

---

## Step 7: Get WIF Provider Path

```bash
# Get the full provider path
export WIF_PROVIDER="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"

echo "WIF Provider: $WIF_PROVIDER"
```

---

## Step 8: Configure GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

### Required Secrets

| Secret Name | Value | How to Get |
|-------------|-------|------------|
| `GCP_WIF_PROVIDER` | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider` | From Step 7 |
| `GCP_SA_EMAIL` | `edintel-github-actions@PROJECT_ID.iam.gserviceaccount.com` | From Step 5 |
| `GCP_PROJECT_ID` | `edintel-sovereign` | Your project ID |
| `DATABASE_URL` | `postgresql://user:pass@/db?host=/cloudsql/...` | Cloud SQL connection string |
| `GOOGLE_GENERATIVE_AI_API_KEY` | `your-vertex-ai-key` | From Vertex AI console |

### Example Values

```bash
# Copy these to GitHub Secrets
GCP_WIF_PROVIDER=projects/123456789/locations/global/workloadIdentityPools/github-pool/providers/github-provider
GCP_SA_EMAIL=edintel-github-actions@edintel-sovereign.iam.gserviceaccount.com
GCP_PROJECT_ID=edintel-sovereign
```

---

## Step 9: Test the Setup

Create a test workflow or push to your repository:

```bash
git add .
git commit -m "test: Workload Identity Federation setup"
git push origin main
```

Watch the GitHub Actions logs. You should see:

```
✅ Authenticated via Workload Identity Federation
🔐 No service account keys used
👤 GitHub Actor: your-username
📦 Repository: your-org/your-repo
```

---

## Step 10: Verify Permissions

```bash
# Test that the service account can access Cloud Run
gcloud run services list \
  --project="$PROJECT_ID" \
  --impersonate-service-account="${SA_EMAIL}"

# Test Cloud SQL access
gcloud sql instances list \
  --project="$PROJECT_ID" \
  --impersonate-service-account="${SA_EMAIL}"
```

---

## Troubleshooting

### Error: "Permission denied"

**Solution:** Ensure the service account has the correct roles:

```bash
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:${SA_EMAIL}"
```

### Error: "Workload identity pool does not exist"

**Solution:** Verify the pool was created:

```bash
gcloud iam workload-identity-pools list \
  --project="$PROJECT_ID" \
  --location="global"
```

### Error: "Invalid repository"

**Solution:** Ensure you replaced `${GITHUB_ORG}/${GITHUB_REPO}` with your actual repository path in Step 6.

---

## Security Best Practices

1. ✅ **Limit Repository Access**
   ```bash
   # Only allow specific repository
   --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/your-org/your-repo"
   ```

2. ✅ **Limit Branch Access** (Optional)
   ```bash
   # Only allow main branch
   --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/your-org/your-repo/ref/refs/heads/main"
   ```

3. ✅ **Enable Audit Logging**
   ```bash
   gcloud logging read "protoPayload.authenticationInfo.principalEmail=${SA_EMAIL}" \
     --project="$PROJECT_ID" \
     --limit=10
   ```

4. ✅ **Rotate Regularly**
   - WIF tokens expire automatically
   - No manual rotation needed
   - Review IAM bindings quarterly

---

## Audit Trail Example

Every deployment will be logged in Cloud Logging:

```json
{
  "protoPayload": {
    "authenticationInfo": {
      "principalEmail": "edintel-github-actions@edintel-sovereign.iam.gserviceaccount.com",
      "serviceAccountDelegationInfo": [
        {
          "principalSubject": "repo:your-org/your-repo:ref:refs/heads/main"
        }
      ]
    },
    "requestMetadata": {
      "callerSuppliedUserAgent": "GitHub-Actions"
    }
  }
}
```

---

## Cleanup (if needed)

```bash
# Delete provider
gcloud iam workload-identity-pools providers delete "github-provider" \
  --project="$PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-pool"

# Delete pool
gcloud iam workload-identity-pools delete "github-pool" \
  --project="$PROJECT_ID" \
  --location="global"

# Delete service account
gcloud iam service-accounts delete "${SA_EMAIL}" \
  --project="$PROJECT_ID"
```

---

## Next Steps

1. ✅ Set up GitHub Secrets (Step 8)
2. ✅ Push code to trigger deployment
3. ✅ Monitor Cloud Logging for audit trails
4. ✅ Configure Stripe webhook for token purchases
5. ✅ Run database migrations

---

## Resources

- [Workload Identity Federation Documentation](https://cloud.google.com/iam/docs/workload-identity-federation)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Cloud Run IAM](https://cloud.google.com/run/docs/securing/managing-access)

---

**🎉 Congratulations! You've set up keyless, secure authentication for EdIntel Sovereign!**
