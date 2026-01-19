# EdIntel Sovereign - Automated Deployment Script (PowerShell)
# This script automates the Google Cloud setup process for Windows

param(
    [string]$ProjectId = "",
    [string]$Region = "us-central1",
    [string]$DbPassword = ""
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 EdIntel Sovereign - Automated Deployment" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Check if gcloud is installed
try {
    $null = Get-Command gcloud -ErrorAction Stop
    Write-Host "✅ gcloud CLI found" -ForegroundColor Green
}
catch {
    Write-Host "❌ gcloud CLI is not installed" -ForegroundColor Red
    Write-Host "Please install from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Get project configuration if not provided
if (-not $ProjectId) {
    $ProjectId = Read-Host "Enter your Google Cloud Project ID (e.g., edintel-sovereign)"
}

if (-not $DbPassword) {
    $SecurePassword = Read-Host "Enter a secure database password" -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecurePassword)
    $DbPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
}

# Confirm configuration
Write-Host ""
Write-Host "ℹ️  Configuration Summary:" -ForegroundColor Blue
Write-Host "  Project ID: $ProjectId"
Write-Host "  Region: $Region"
Write-Host "  Database Password: ********"
Write-Host ""

$Confirm = Read-Host "Continue with deployment? (y/n)"
if ($Confirm -ne "y") {
    Write-Host "⚠️  Deployment cancelled" -ForegroundColor Yellow
    exit 0
}

# Set project
Write-Host ""
Write-Host "ℹ️  Setting active project..." -ForegroundColor Blue
gcloud config set project $ProjectId
Write-Host "✅ Project set to $ProjectId" -ForegroundColor Green

# Get project number
$ProjectNumber = gcloud projects describe $ProjectId --format="value(projectNumber)"
Write-Host "ℹ️  Project Number: $ProjectNumber" -ForegroundColor Blue

# Enable APIs
Write-Host ""
Write-Host "ℹ️  Enabling required APIs (this may take 2-3 minutes)..." -ForegroundColor Blue

$APIs = @(
    "run.googleapis.com",
    "sqladmin.googleapis.com",
    "storage.googleapis.com",
    "aiplatform.googleapis.com",
    "containerregistry.googleapis.com",
    "secretmanager.googleapis.com",
    "iamcredentials.googleapis.com",
    "sts.googleapis.com",
    "compute.googleapis.com",
    "cloudbuild.googleapis.com"
)

foreach ($api in $APIs) {
    gcloud services enable $api --quiet
    Write-Host "✅ Enabled $api" -ForegroundColor Green
}

# Create Cloud SQL instance
Write-Host ""
Write-Host "ℹ️  Creating Cloud SQL instance (this takes ~10 minutes)..." -ForegroundColor Blue
Write-Host "⚠️  This is the longest step - please be patient!" -ForegroundColor Yellow

gcloud sql instances create edintel-db `
    --database-version=POSTGRES_15 `
    --tier=db-custom-2-7680 `
    --region=$Region `
    --database-flags=cloudsql.enable_pgvector=on `
    --backup-start-time=03:00 `
    --quiet

Write-Host "✅ Cloud SQL instance created!" -ForegroundColor Green

# Set database password
Write-Host "ℹ️  Configuring database..." -ForegroundColor Blue
gcloud sql users set-password postgres `
    --instance=edintel-db `
    --password=$DbPassword `
    --quiet

# Create database
gcloud sql databases create edintel `
    --instance=edintel-db `
    --quiet

Write-Host "✅ Database configured!" -ForegroundColor Green

# Get connection string
$DbConnection = gcloud sql instances describe edintel-db --format='value(connectionName)'
$DatabaseUrl = "postgresql://postgres:${DbPassword}@localhost/edintel?host=/cloudsql/${DbConnection}"

Write-Host "✅ Database connection string created" -ForegroundColor Green

# Create storage bucket
Write-Host ""
Write-Host "ℹ️  Creating storage bucket..." -ForegroundColor Blue

gsutil mb -l $Region "gs://edintel-evidence-${ProjectId}" 2>$null

# Set CORS
$CorsJson = @"
[
  {
    "origin": ["https://edintel-app.vercel.app", "https://*.vercel.app"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type", "Authorization"],
    "maxAgeSeconds": 3600
  }
]
"@

$CorsJson | Out-File -FilePath "$env:TEMP\cors.json" -Encoding UTF8
gsutil cors set "$env:TEMP\cors.json" "gs://edintel-evidence-${ProjectId}"
Write-Host "✅ Storage bucket configured!" -ForegroundColor Green

# Create WIF pool
Write-Host ""
Write-Host "ℹ️  Setting up Workload Identity Federation..." -ForegroundColor Blue

try {
    gcloud iam workload-identity-pools create "github-pool" `
        --project="$ProjectId" `
        --location="global" `
        --display-name="GitHub Actions Pool" `
        --quiet 2>$null
}
catch {
    Write-Host "⚠️  WIF pool already exists" -ForegroundColor Yellow
}

# Create WIF provider
try {
    gcloud iam workload-identity-pools providers create-oidc "github-provider" `
        --project="$ProjectId" `
        --location="global" `
        --workload-identity-pool="github-pool" `
        --display-name="GitHub Actions Provider" `
        --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" `
        --issuer-uri="https://token.actions.githubusercontent.com" `
        --quiet 2>$null
}
catch {
    Write-Host "⚠️  WIF provider already exists" -ForegroundColor Yellow
}

# Create service account
$SaEmail = "edintel-github-actions@${ProjectId}.iam.gserviceaccount.com"

try {
    gcloud iam service-accounts create edintel-github-actions `
        --project="$ProjectId" `
        --display-name="EdIntel GitHub Actions" `
        --quiet 2>$null
}
catch {
    Write-Host "⚠️  Service account already exists" -ForegroundColor Yellow
}

# Grant permissions
Write-Host "ℹ️  Granting IAM permissions..." -ForegroundColor Blue

$Roles = @(
    "roles/run.admin",
    "roles/storage.admin",
    "roles/cloudsql.client",
    "roles/artifactregistry.writer",
    "roles/aiplatform.user"
)

foreach ($role in $Roles) {
    gcloud projects add-iam-policy-binding $ProjectId `
        --member="serviceAccount:${SaEmail}" `
        --role="$role" `
        --quiet 2>$null
}

Write-Host "✅ IAM permissions granted!" -ForegroundColor Green

# Bind WIF to service account
gcloud iam service-accounts add-iam-policy-binding "${SaEmail}" `
    --project="$ProjectId" `
    --role="roles/iam.workloadIdentityUser" `
    --member="principalSet://iam.googleapis.com/projects/${ProjectNumber}/locations/global/workloadIdentityPools/github-pool/attribute.repository/nivlawest1911-oss/Tiffany-ED" `
    --quiet 2>$null

$WifProvider = "projects/${ProjectNumber}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"

Write-Host "✅ Workload Identity Federation configured!" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Configuration Summary:" -ForegroundColor Blue
Write-Host ""
Write-Host "  Project ID: $ProjectId"
Write-Host "  Region: $Region"
Write-Host "  Database Connection: $DbConnection"
Write-Host ""

Write-Host "🔑 GitHub Secrets to Add:" -ForegroundColor Blue
Write-Host ""
Write-Host "  GCP_WIF_PROVIDER:"
Write-Host "    $WifProvider"
Write-Host ""
Write-Host "  GCP_SA_EMAIL:"
Write-Host "    $SaEmail"
Write-Host ""
Write-Host "  GCP_PROJECT_ID:"
Write-Host "    $ProjectId"
Write-Host ""
Write-Host "  DATABASE_URL:"
Write-Host "    $DatabaseUrl"
Write-Host ""

Write-Host "📝 Next Steps:" -ForegroundColor Blue
Write-Host ""
Write-Host "  1. Add the above secrets to GitHub:"
Write-Host "     https://github.com/nivlawest1911-oss/Tiffany-ED/settings/secrets/actions"
Write-Host ""
Write-Host "  2. Get Vertex AI API key:"
Write-Host "     https://console.cloud.google.com/apis/credentials?project=$ProjectId"
Write-Host ""
Write-Host "  3. Configure Stripe keys in Vercel"
Write-Host ""
Write-Host "  4. Push to GitHub to trigger deployment"
Write-Host ""

Write-Host "✅ 🎉 Google Cloud infrastructure is ready!" -ForegroundColor Green

# Save configuration
$ConfigContent = @"
PROJECT_ID=$ProjectId
REGION=$Region
DB_CONNECTION=$DbConnection
WIF_PROVIDER=$WifProvider
SA_EMAIL=$SaEmail
STORAGE_BUCKET=edintel-evidence-${ProjectId}
DATABASE_URL=$DatabaseUrl
"@

$ConfigContent | Out-File -FilePath ".deployment-config" -Encoding UTF8
Write-Host "ℹ️  Configuration saved to .deployment-config" -ForegroundColor Blue
