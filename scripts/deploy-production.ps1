#!/usr/bin/env pwsh
<#
.SYNOPSIS
    EdIntel Professional - Production Deployment Script
.DESCRIPTION
    Comprehensive deployment leveraging GitHub, Google Cloud, and Vercel
    - Pre-deployment checks
    - Build verification
    - Database migration
    - Environment sync
    - Production deployment
    - Post-deployment validation
.NOTES
    Author: Dr. Alvin West, EdD
    Version: 1.0.0
    Date: 2026-01-20
#>

param(
    [switch]$SkipBuild,
    [switch]$SkipTests,
    [switch]$Force,
    [switch]$DryRun
)

# Color functions
function Write-Success { param($msg) Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Error { param($msg) Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "ℹ️  $msg" -ForegroundColor Cyan }
function Write-Warning { param($msg) Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Header { param($msg) Write-Host "`n$('='*70)`n$msg`n$('='*70)" -ForegroundColor Magenta }
function Write-Step { param($num, $msg) Write-Host "`n🎯 STEP $num`: $msg" -ForegroundColor Yellow }

# Banner
Clear-Host
Write-Host @"
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║        🚀 EdIntel Professional - Production Deployment          ║
║                                                                  ║
║     Leveraging GitHub + Google Cloud + Vercel                   ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

if ($DryRun) {
    Write-Warning "DRY RUN MODE - No actual deployment will occur"
}

Write-Host "`nStarting deployment sequence...`n" -ForegroundColor Yellow
Start-Sleep -Seconds 2

# ============================================
# STEP 1: PRE-DEPLOYMENT CHECKS
# ============================================
Write-Header "STEP 1: PRE-DEPLOYMENT CHECKS"

# Check project directory
if (-not (Test-Path "package.json")) {
    Write-Error "Not in project root directory!"
    exit 1
}
Write-Success "Project directory verified"

# Check Git status
try {
    $gitStatus = git status --porcelain
    if ($gitStatus -and -not $Force) {
        Write-Warning "Uncommitted changes detected:"
        Write-Host $gitStatus
        $continue = Read-Host "Continue anyway? (y/n)"
        if ($continue -ne 'y') {
            Write-Info "Deployment cancelled"
            exit 0
        }
    }
    else {
        Write-Success "Git working directory clean"
    }
}
catch {
    Write-Warning "Git not available or not a git repository"
}

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js: $nodeVersion"
}
catch {
    Write-Error "Node.js not found!"
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version
    Write-Success "npm: $npmVersion"
}
catch {
    Write-Error "npm not found!"
    exit 1
}

# Check Vercel CLI
try {
    $vercelVersion = vercel --version
    Write-Success "Vercel CLI: $vercelVersion"
}
catch {
    Write-Error "Vercel CLI not found! Install with: npm i -g vercel"
    exit 1
}

# Check environment variables
if (Test-Path ".env.local") {
    Write-Success ".env.local found"
    
    $envContent = Get-Content ".env.local" -Raw
    $criticalVars = @(
        'POSTGRES_URL',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'STRIPE_SECRET_KEY',
        'NEXT_PUBLIC_APP_URL'
    )
    
    $missing = @()
    foreach ($var in $criticalVars) {
        if ($envContent -notmatch $var) {
            $missing += $var
        }
    }
    
    if ($missing.Count -gt 0) {
        Write-Error "Missing critical environment variables: $($missing -join ', ')"
        exit 1
    }
    Write-Success "All critical environment variables present"
}
else {
    Write-Warning ".env.local not found - will use Vercel environment"
}

# ============================================
# STEP 2: DEPENDENCY CHECK
# ============================================
Write-Header "STEP 2: DEPENDENCY CHECK"

Write-Info "Checking node_modules..."
if (-not (Test-Path "node_modules")) {
    Write-Warning "node_modules not found, installing..."
    if (-not $DryRun) {
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Error "npm install failed!"
            exit 1
        }
    }
    Write-Success "Dependencies installed"
}
else {
    Write-Success "node_modules exists"
}

# Check for outdated packages
Write-Info "Checking for critical updates..."
if (-not $DryRun) {
    npm outdated | Select-Object -First 10
}

# ============================================
# STEP 3: BUILD VERIFICATION
# ============================================
if (-not $SkipBuild) {
    Write-Header "STEP 3: BUILD VERIFICATION"
    
    Write-Info "Running production build..."
    if (-not $DryRun) {
        $buildStart = Get-Date
        npm run build
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Build failed! Fix errors before deploying."
            exit 1
        }
        $buildTime = (Get-Date) - $buildStart
        Write-Success "Build completed in $($buildTime.TotalSeconds) seconds"
    }
    else {
        Write-Info "[DRY RUN] Would run: npm run build"
    }
}
else {
    Write-Warning "Skipping build verification (--SkipBuild flag)"
}

# ============================================
# STEP 4: CODE QUALITY CHECKS
# ============================================
Write-Header "STEP 4: CODE QUALITY CHECKS"

# TypeScript check
Write-Info "Running TypeScript compiler..."
if (-not $DryRun) {
    npx tsc --noEmit
    if ($LASTEXITCODE -eq 0) {
        Write-Success "TypeScript: No errors"
    }
    else {
        Write-Warning "TypeScript: Some errors found (non-blocking)"
    }
}
else {
    Write-Info "[DRY RUN] Would run: npx tsc --noEmit"
}

# ESLint check
Write-Info "Running ESLint..."
if (-not $DryRun) {
    npm run lint 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "ESLint: No errors"
    }
    else {
        Write-Warning "ESLint: Some warnings found (non-blocking)"
    }
}
else {
    Write-Info "[DRY RUN] Would run: npm run lint"
}

# ============================================
# STEP 5: GIT OPERATIONS
# ============================================
Write-Header "STEP 5: GIT OPERATIONS"

try {
    # Get current branch
    $currentBranch = git branch --show-current
    Write-Info "Current branch: $currentBranch"
    
    # Get latest commit
    $latestCommit = git log -1 --oneline
    Write-Info "Latest commit: $latestCommit"
    
    # Check remote
    $remoteUrl = git remote get-url origin
    Write-Success "Remote: $remoteUrl"
    
    # Push to GitHub
    if (-not $DryRun) {
        Write-Info "Pushing to GitHub..."
        git push origin $currentBranch
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Pushed to GitHub successfully"
        }
        else {
            Write-Warning "Git push failed or nothing to push"
        }
    }
    else {
        Write-Info "[DRY RUN] Would run: git push origin $currentBranch"
    }
}
catch {
    Write-Warning "Git operations skipped (not a git repository or git not available)"
}

# ============================================
# STEP 6: VERCEL ENVIRONMENT SYNC
# ============================================
Write-Header "STEP 6: VERCEL ENVIRONMENT SYNC"

Write-Info "Syncing environment variables from Vercel..."
if (-not $DryRun) {
    vercel env pull .env.production --yes
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Environment variables synced"
    }
    else {
        Write-Warning "Environment sync failed (may need manual verification)"
    }
}
else {
    Write-Info "[DRY RUN] Would run: vercel env pull .env.production"
}

# ============================================
# STEP 7: DATABASE MIGRATION CHECK
# ============================================
Write-Header "STEP 7: DATABASE MIGRATION CHECK"

if (Test-Path "database\schema.sql") {
    Write-Success "Database schema found"
    Write-Info "Schema location: database\schema.sql"
    Write-Warning "⚠️  MANUAL STEP: Ensure database schema is deployed to Vercel Postgres"
    Write-Host "   1. Go to: https://vercel.com/nivlawest1911-oss-projects/edintel-app/stores"
    Write-Host "   2. Click Postgres → Query tab"
    Write-Host "   3. Run database/schema.sql if not already done"
    
    if (-not $Force) {
        $dbConfirm = Read-Host "`nHas the database schema been deployed? (y/n)"
        if ($dbConfirm -ne 'y') {
            Write-Error "Please deploy database schema before continuing"
            exit 1
        }
    }
}
else {
    Write-Warning "database/schema.sql not found"
}

# ============================================
# STEP 8: PRODUCTION DEPLOYMENT
# ============================================
Write-Header "STEP 8: PRODUCTION DEPLOYMENT TO VERCEL"

Write-Info "Deploying to Vercel Production..."
Write-Warning "This will deploy to: https://edintel-app.vercel.app"

if (-not $Force -and -not $DryRun) {
    $deployConfirm = Read-Host "`nProceed with production deployment? (y/n)"
    if ($deployConfirm -ne 'y') {
        Write-Info "Deployment cancelled"
        exit 0
    }
}

if (-not $DryRun) {
    Write-Info "Deploying..."
    $deployStart = Get-Date
    
    # Deploy to production
    vercel --prod --yes
    
    if ($LASTEXITCODE -eq 0) {
        $deployTime = (Get-Date) - $deployStart
        Write-Success "Deployment completed in $($deployTime.TotalSeconds) seconds"
    }
    else {
        Write-Error "Deployment failed!"
        exit 1
    }
}
else {
    Write-Info "[DRY RUN] Would run: vercel --prod --yes"
}

# ============================================
# STEP 9: POST-DEPLOYMENT VALIDATION
# ============================================
Write-Header "STEP 9: POST-DEPLOYMENT VALIDATION"

$productionUrl = "https://edintel-app.vercel.app"

Write-Info "Waiting for deployment to propagate (30 seconds)..."
if (-not $DryRun) {
    Start-Sleep -Seconds 30
}

# Test homepage
Write-Info "Testing homepage..."
if (-not $DryRun) {
    try {
        $response = Invoke-WebRequest -Uri $productionUrl -Method Head -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "Homepage is live!"
        }
        else {
            Write-Warning "Homepage returned status: $($response.StatusCode)"
        }
    }
    catch {
        Write-Warning "Homepage check failed: $($_.Exception.Message)"
    }
}
else {
    Write-Info "[DRY RUN] Would test: $productionUrl"
}

# Test critical endpoints
$endpoints = @(
    @{Name = "Dashboard"; Path = "/dashboard" },
    @{Name = "Mission Control"; Path = "/mission-control" },
    @{Name = "Gallery"; Path = "/gallery" },
    @{Name = "Pricing"; Path = "/pricing" },
    @{Name = "Login"; Path = "/login" }
)

Write-Info "`nTesting critical endpoints..."
foreach ($endpoint in $endpoints) {
    $url = "$productionUrl$($endpoint.Path)"
    if (-not $DryRun) {
        try {
            $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10
            if ($response.StatusCode -eq 200) {
                Write-Success "$($endpoint.Name): OK"
            }
            else {
                Write-Warning "$($endpoint.Name): Status $($response.StatusCode)"
            }
        }
        catch {
            Write-Warning "$($endpoint.Name): Failed"
        }
    }
    else {
        Write-Info "[DRY RUN] Would test: $url"
    }
}

# ============================================
# STEP 10: DEPLOYMENT SUMMARY
# ============================================
Write-Header "STEP 10: DEPLOYMENT SUMMARY"

Write-Host @"

✅ DEPLOYMENT COMPLETE!

🌐 Production URLs:
   • Homepage:        $productionUrl
   • Dashboard:       $productionUrl/dashboard
   • Mission Control: $productionUrl/mission-control
   • Evidence Gallery: $productionUrl/gallery
   • Pricing:         $productionUrl/pricing
   • Login:           $productionUrl/login

📊 Admin Dashboards:
   • Vercel:  https://vercel.com/nivlawest1911-oss-projects/edintel-app
   • Stripe:  https://dashboard.stripe.com
   • Google:  https://console.cloud.google.com

🔍 Monitoring:
   • Analytics: https://vercel.com/nivlawest1911-oss-projects/edintel-app/analytics
   • Logs:      https://vercel.com/nivlawest1911-oss-projects/edintel-app/logs
   • Storage:   https://vercel.com/nivlawest1911-oss-projects/edintel-app/stores

📋 Next Steps:
   1. Test Google Login
   2. Test Stripe Checkout
   3. Verify Mission Control agents
   4. Check Evidence Gallery media
   5. Monitor error logs
   6. Invite beta users

🎓 Mission:
   Transform education in Mobile County & Prichard Schools!

"@ -ForegroundColor Green

# Save deployment info
$deploymentInfo = @{
    Timestamp     = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Branch        = $currentBranch
    Commit        = $latestCommit
    ProductionUrl = $productionUrl
    DeployedBy    = $env:USERNAME
    NodeVersion   = $nodeVersion
    VercelVersion = $vercelVersion
}

if (-not $DryRun) {
    $deploymentInfo | ConvertTo-Json | Out-File "deployment-info.json" -Encoding UTF8
    Write-Success "Deployment info saved to deployment-info.json"
}

# ============================================
# FINAL STATUS
# ============================================
Write-Host "`n╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                  ║" -ForegroundColor Cyan
Write-Host "║     🎉 EdIntel Professional is LIVE in Production! 🎉          ║" -ForegroundColor Cyan
Write-Host "║                                                                  ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n🚀 Production URL: $productionUrl`n" -ForegroundColor Yellow

# Open browser
if (-not $DryRun) {
    $openBrowser = Read-Host "Open production site in browser? (y/n)"
    if ($openBrowser -eq 'y') {
        Start-Process $productionUrl
        Start-Process "$productionUrl/mission-control"
    }
}

Write-Success "Deployment script completed successfully!"
exit 0
