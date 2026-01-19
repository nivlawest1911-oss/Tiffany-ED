# EdIntel Sovereign - Automated Deployment Script (PowerShell)
# This script automates the Google Cloud setup process for Windows

param(
    [string]$ProjectId = "",
    [string]$Region = "us-central1",
    [string]$DbPassword = ""
)

$ErrorActionPreference = "Continue"

Write-Host "EdIntel Sovereign - Automated Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if gcloud is installed
try {
    $null = Get-Command gcloud -ErrorAction Stop
    Write-Host "[OK] gcloud CLI found" -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] gcloud CLI is not installed" -ForegroundColor Red
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
Write-Host "[INFO] Configuration Summary:" -ForegroundColor Blue
Write-Host "  Project ID: $ProjectId"
Write-Host "  Region: $Region"
Write-Host "  Database Password: ********"
Write-Host ""

if ($Host.Name -eq 'ConsoleHost') {
    $Confirm = Read-Host "Continue with deployment? (y/n)"
    if ($Confirm -ne "y") {
        Write-Host "[WARN] Deployment cancelled" -ForegroundColor Yellow
        exit 0
    }
}

# Set project
Write-Host ""
Write-Host "[INFO] Configuration Check..." -ForegroundColor Blue

if (-not (gcloud projects list --filter="projectId:$ProjectId" --format="value(projectId)")) {
    Write-Host "[INFO] Project $ProjectId does not exist. Creating..." -ForegroundColor Yellow
    gcloud projects create $ProjectId --name="EdIntel Sovereign" --quiet
    Write-Host "[OK] Project created!" -ForegroundColor Green
}

# FORCE LINK BILLING (Critical Step)
try {
    $BillingAccount = "01709E-632D85-FD3CC3"
    Write-Host "[INFO] Linking billing account $BillingAccount..." -ForegroundColor Blue
    gcloud beta billing projects link $ProjectId --billing-account=$BillingAccount --quiet
    Write-Host "[OK] Billing linked!" -ForegroundColor Green
}
catch {
    Write-Host "[WARN] Could not link billing (check permissions)." -ForegroundColor Yellow
}

Write-Host "[INFO] Setting active project..." -ForegroundColor Blue
gcloud config set project $ProjectId
Write-Host "[OK] Project set to $ProjectId" -ForegroundColor Green

# Get project number
$ProjectNumber = gcloud projects describe $ProjectId --format="value(projectNumber)"
Write-Host "[INFO] Project Number: $ProjectNumber" -ForegroundColor Blue

# Enable APIs
Write-Host ""
Write-Host "[INFO] Enabling required APIs (this may take 2-3 minutes)..." -ForegroundColor Blue

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
    Write-Host "[OK] Enabled $api" -ForegroundColor Green
}

# Create Cloud SQL instance
Write-Host "[INFO] Creating Cloud SQL instance (this takes ~10 minutes)..." -ForegroundColor Blue
Write-Host "[WARN] This is the longest step - please be patient!" -ForegroundColor Yellow

$InstanceExists = gcloud sql instances list --project=$ProjectId --filter="name:edintel-db" --format="value(name)" 2>$null
if (-not $InstanceExists) {
    gcloud sql instances create edintel-db `
        --project=$ProjectId `
        --database-version=POSTGRES_15 `
        --tier=db-custom-2-7680 `
        --region=$Region `
        --database-flags=cloudsql.enable_pgvector=on `
        --backup-start-time=03:00 `
        --quiet
    Write-Host "[OK] Cloud SQL instance created!" -ForegroundColor Green
}
else {
    Write-Host "[INFO] Cloud SQL instance already exists, skipping creation." -ForegroundColor Yellow
}


# Set database password
Write-Host "[INFO] Configuring database..." -ForegroundColor Blue
gcloud sql users set-password postgres `
    --project=$ProjectId `
    --instance=edintel-db `
    --password=$DbPassword `
    --quiet

# Create database
gcloud sql databases create edintel `
    --project=$ProjectId `
    --instance=edintel-db `
    --quiet 2>$null
    
Write-Host "[OK] Database configured!" -ForegroundColor Green

# Get connection string
$DbConnection = gcloud sql instances describe edintel-db --project=$ProjectId --format='value(connectionName)'
$DatabaseUrl = "postgresql://postgres:${DbPassword}@localhost/edintel?host=/cloudsql/${DbConnection}"

Write-Host "[OK] Database connection string created" -ForegroundColor Green

# Create storage bucket
Write-Host ""
Write-Host "[INFO] Creating storage bucket..." -ForegroundColor Blue

gsutil mb -p $ProjectId -l $Region "gs://edintel-evidence-${ProjectId}" 2>$null

# Set CORS
$CorsContent = '[{"origin": ["https://edintel-app.vercel.app", "https://*.vercel.app"], "method": ["GET", "POST", "PUT", "DELETE"], "responseHeader": ["Content-Type", "Authorization"], "maxAgeSeconds": 3600}]'

$CorsFile = Join-Path $env:TEMP "cors.json"
$CorsContent | Out-File -FilePath $CorsFile -Encoding ASCII
gsutil cors set $CorsFile "gs://edintel-evidence-${ProjectId}" 2>$null
Write-Host "[OK] Storage bucket configured!" -ForegroundColor Green

# Create WIF pool
Write-Host ""
Write-Host "[INFO] Setting up Workload Identity Federation..." -ForegroundColor Blue

try {
    gcloud iam workload-identity-pools create "github-pool" `
        --project="$ProjectId" `
        --location="global" `
        --display-name="GitHub Actions Pool" `
        --quiet 2>$null
}
catch {
    Write-Host "[WARN] WIF pool may already exist" -ForegroundColor Yellow
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
    Write-Host "[WARN] WIF provider may already exist" -ForegroundColor Yellow
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
    Write-Host "[WARN] Service account may already exist" -ForegroundColor Yellow
}

# Grant permissions
Write-Host "[INFO] Granting IAM permissions..." -ForegroundColor Blue

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
        --quiet >$null 2>&1
}

Write-Host "[OK] IAM permissions granted!" -ForegroundColor Green

# Bind WIF to service account
gcloud iam service-accounts add-iam-policy-binding "${SaEmail}" `
    --project="$ProjectId" `
    --role="roles/iam.workloadIdentityUser" `
    --member="principalSet://iam.googleapis.com/projects/${ProjectNumber}/locations/global/workloadIdentityPools/github-pool/attribute.repository/nivlawest1911-oss/Tiffany-ED" `
    --quiet >$null 2>&1

$WifProvider = "projects/${ProjectNumber}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"

Write-Host "[OK] Workload Identity Federation configured!" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

Write-Host "[INFO] Configuration Summary:" -ForegroundColor Blue
Write-Host ""
Write-Host "  Project ID: $ProjectId"
Write-Host "  Region: $Region"
Write-Host "  Database Connection: $DbConnection"
Write-Host ""

Write-Host "[KEY] GitHub Secrets to Add:" -ForegroundColor Blue
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

Write-Host "[NEXT] Next Steps:" -ForegroundColor Blue
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

Write-Host "[DONE] Google Cloud infrastructure is ready!" -ForegroundColor Green

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
Write-Host "Configuration saved to .deployment-config" -ForegroundColor Blue
