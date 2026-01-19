#!/bin/bash

# EdIntel Sovereign - Automated Deployment Script
# This script automates the Google Cloud setup process

set -e  # Exit on error

echo "🚀 EdIntel Sovereign - Automated Deployment"
echo "==========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    print_error "gcloud CLI is not installed"
    echo "Please install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

print_success "gcloud CLI found"

# Get project configuration
echo ""
print_info "Project Configuration"
echo "====================="

read -p "Enter your Google Cloud Project ID (e.g., edintel-sovereign): " PROJECT_ID
read -p "Enter your preferred region (default: us-central1): " REGION
REGION=${REGION:-us-central1}

read -sp "Enter a secure database password: " DB_PASSWORD
echo ""

# Confirm configuration
echo ""
print_info "Configuration Summary:"
echo "  Project ID: $PROJECT_ID"
echo "  Region: $REGION"
echo "  Database Password: ********"
echo ""

read -p "Continue with deployment? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    print_warning "Deployment cancelled"
    exit 0
fi

# Set project
echo ""
print_info "Setting active project..."
gcloud config set project $PROJECT_ID
print_success "Project set to $PROJECT_ID"

# Get project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
print_info "Project Number: $PROJECT_NUMBER"

# Enable APIs
echo ""
print_info "Enabling required APIs (this may take 2-3 minutes)..."

APIS=(
    "run.googleapis.com"
    "sqladmin.googleapis.com"
    "storage.googleapis.com"
    "aiplatform.googleapis.com"
    "containerregistry.googleapis.com"
    "secretmanager.googleapis.com"
    "iamcredentials.googleapis.com"
    "sts.googleapis.com"
    "compute.googleapis.com"
    "cloudbuild.googleapis.com"
)

for api in "${APIS[@]}"; do
    gcloud services enable $api --quiet
    print_success "Enabled $api"
done

# Create Cloud SQL instance
echo ""
print_info "Creating Cloud SQL instance (this takes ~10 minutes)..."
print_warning "This is the longest step - please be patient!"

gcloud sql instances create edintel-db \
    --database-version=POSTGRES_15 \
    --tier=db-custom-2-7680 \
    --region=$REGION \
    --database-flags=cloudsql.enable_pgvector=on \
    --backup-start-time=03:00 \
    --quiet

print_success "Cloud SQL instance created!"

# Set database password
print_info "Configuring database..."
gcloud sql users set-password postgres \
    --instance=edintel-db \
    --password=$DB_PASSWORD \
    --quiet

# Create database
gcloud sql databases create edintel \
    --instance=edintel-db \
    --quiet

print_success "Database configured!"

# Get connection string
DB_CONNECTION=$(gcloud sql instances describe edintel-db --format='value(connectionName)')
DATABASE_URL="postgresql://postgres:${DB_PASSWORD}@localhost/edintel?host=/cloudsql/${DB_CONNECTION}"

print_success "Database connection string created"

# Create storage bucket
echo ""
print_info "Creating storage bucket..."

gsutil mb -l $REGION gs://edintel-evidence-${PROJECT_ID} 2>/dev/null || true

# Set CORS
cat > /tmp/cors.json << 'EOF'
[
  {
    "origin": ["https://edintel-app.vercel.app", "https://*.vercel.app"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type", "Authorization"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set /tmp/cors.json gs://edintel-evidence-${PROJECT_ID}
print_success "Storage bucket configured!"

# Create WIF pool
echo ""
print_info "Setting up Workload Identity Federation..."

gcloud iam workload-identity-pools create "github-pool" \
    --project="$PROJECT_ID" \
    --location="global" \
    --display-name="GitHub Actions Pool" \
    --quiet 2>/dev/null || print_warning "WIF pool already exists"

# Create WIF provider
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
    --project="$PROJECT_ID" \
    --location="global" \
    --workload-identity-pool="github-pool" \
    --display-name="GitHub Actions Provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --quiet 2>/dev/null || print_warning "WIF provider already exists"

# Create service account
SA_EMAIL="edintel-github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create edintel-github-actions \
    --project="$PROJECT_ID" \
    --display-name="EdIntel GitHub Actions" \
    --quiet 2>/dev/null || print_warning "Service account already exists"

# Grant permissions
print_info "Granting IAM permissions..."

ROLES=(
    "roles/run.admin"
    "roles/storage.admin"
    "roles/cloudsql.client"
    "roles/artifactregistry.writer"
    "roles/aiplatform.user"
)

for role in "${ROLES[@]}"; do
    gcloud projects add-iam-policy-binding $PROJECT_ID \
        --member="serviceAccount:${SA_EMAIL}" \
        --role="$role" \
        --quiet >/dev/null 2>&1
done

print_success "IAM permissions granted!"

# Bind WIF to service account
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
    --project="$PROJECT_ID" \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/nivlawest1911-oss/Tiffany-ED" \
    --quiet >/dev/null 2>&1

WIF_PROVIDER="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"

print_success "Workload Identity Federation configured!"

# Summary
echo ""
echo "=========================================="
print_success "DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""

print_info "📋 Configuration Summary:"
echo ""
echo "  Project ID: $PROJECT_ID"
echo "  Region: $REGION"
echo "  Database Connection: $DB_CONNECTION"
echo ""

print_info "🔑 GitHub Secrets to Add:"
echo ""
echo "  GCP_WIF_PROVIDER:"
echo "    $WIF_PROVIDER"
echo ""
echo "  GCP_SA_EMAIL:"
echo "    $SA_EMAIL"
echo ""
echo "  GCP_PROJECT_ID:"
echo "    $PROJECT_ID"
echo ""
echo "  DATABASE_URL:"
echo "    $DATABASE_URL"
echo ""

print_info "📝 Next Steps:"
echo ""
echo "  1. Add the above secrets to GitHub:"
echo "     https://github.com/nivlawest1911-oss/Tiffany-ED/settings/secrets/actions"
echo ""
echo "  2. Get Vertex AI API key:"
echo "     https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
echo ""
echo "  3. Configure Stripe keys in Vercel"
echo ""
echo "  4. Push to GitHub to trigger deployment"
echo ""

print_success "🎉 Google Cloud infrastructure is ready!"

# Save configuration
cat > .deployment-config << EOF
PROJECT_ID=$PROJECT_ID
REGION=$REGION
DB_CONNECTION=$DB_CONNECTION
WIF_PROVIDER=$WIF_PROVIDER
SA_EMAIL=$SA_EMAIL
STORAGE_BUCKET=edintel-evidence-${PROJECT_ID}
EOF

print_info "Configuration saved to .deployment-config"
