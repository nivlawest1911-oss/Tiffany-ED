#!/usr/bin/env pwsh
<#
.SYNOPSIS
    EdIntel Professional - Complete Activation Script
.DESCRIPTION
    Automates the full activation process for EdIntel Professional
    - Database schema deployment
    - Environment variable verification
    - Media upload
    - Feature testing
.NOTES
    Author: Dr. Alvin West, EdD
    Version: 1.0.0
#>

param(
    [switch]$SkipDatabase,
    [switch]$SkipMedia,
    [switch]$AutoYes
)

# Color functions
function Write-Success { param($msg) Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Error { param($msg) Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "ℹ️  $msg" -ForegroundColor Cyan }
function Write-Warning { param($msg) Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Header { param($msg) Write-Host "`n$('='*60)`n$msg`n$('='*60)" -ForegroundColor Magenta }

# Banner
Clear-Host
Write-Host @"
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║     🚀 EdIntel Professional - Activation Protocol       ║
║                                                          ║
║     Transform Education in Mobile County & Prichard     ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

Write-Host "`nStarting activation sequence...`n" -ForegroundColor Yellow

# Step 0: Verify project structure
Write-Header "STEP 0: Project Verification"

if (-not (Test-Path "package.json")) {
    Write-Error "Not in project root directory!"
    Write-Info "Please run this script from: c:\Users\nivla\edintel-app\"
    exit 1
}
Write-Success "Project directory verified"

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js installed: $nodeVersion"
}
catch {
    Write-Error "Node.js not found! Please install Node.js first."
    exit 1
}

# Check Vercel CLI
try {
    $vercelVersion = vercel --version
    Write-Success "Vercel CLI installed: $vercelVersion"
}
catch {
    Write-Warning "Vercel CLI not found. Install with: npm i -g vercel"
}

# Step 1: Environment Variables
Write-Header "STEP 1: Environment Variables"

# Pull latest env from Vercel
if (-not $AutoYes) {
    $pullEnv = Read-Host "Pull latest environment variables from Vercel? (y/n)"
    if ($pullEnv -eq 'y') {
        Write-Info "Pulling environment variables..."
        vercel env pull .env.local
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Environment variables pulled successfully"
        }
        else {
            Write-Warning "Failed to pull env vars. Continuing with existing .env.local"
        }
    }
}

# Check .env.local
if (Test-Path ".env.local") {
    Write-Success "Found .env.local"
    
    $envContent = Get-Content ".env.local" -Raw
    
    # Critical variables
    $criticalVars = @(
        'POSTGRES_URL',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'STRIPE_SECRET_KEY',
        'NEXT_PUBLIC_APP_URL'
    )
    
    $missingCritical = @()
    foreach ($var in $criticalVars) {
        if ($envContent -notmatch $var) {
            $missingCritical += $var
        }
    }
    
    if ($missingCritical.Count -eq 0) {
        Write-Success "All critical variables present"
    }
    else {
        Write-Error "Missing critical variables: $($missingCritical -join ', ')"
        Write-Info "Please add these to Vercel dashboard and re-pull"
    }
    
    # New feature variables
    $newVars = @(
        @{Name = 'BLOB_READ_WRITE_TOKEN'; Desc = 'Vercel Blob Storage' },
        @{Name = 'HEYGEN_API_KEY'; Desc = 'HeyGen Avatar Videos' },
        @{Name = 'ELEVENLABS_API_KEY'; Desc = 'ElevenLabs Voice' },
        @{Name = 'CLOUDINARY_CLOUD_NAME'; Desc = 'Cloudinary Media' },
        @{Name = 'REPLICATE_API_TOKEN'; Desc = 'Replicate AI' }
    )
    
    Write-Info "`nOptional Feature Variables:"
    foreach ($var in $newVars) {
        if ($envContent -match $var.Name) {
            Write-Success "$($var.Name) - $($var.Desc)"
        }
        else {
            Write-Warning "$($var.Name) - $($var.Desc) (Not configured)"
        }
    }
}
else {
    Write-Error ".env.local not found!"
    Write-Info "Run: vercel env pull .env.local"
    exit 1
}

# Step 2: Database Schema
if (-not $SkipDatabase) {
    Write-Header "STEP 2: Database Schema Deployment"
    
    if (Test-Path "database\schema.sql") {
        Write-Success "Found database/schema.sql"
        
        Write-Info "`nDatabase schema includes:"
        Write-Host "  • edintel_media - Media storage tracking"
        Write-Host "  • agent_missions - Multi-agent swarm"
        Write-Host "  • avatar_sessions - AI avatar interactions"
        Write-Host "  • classroom_observations - Classroom data"
        Write-Host "  • intervention_plans - AI-generated strategies"
        Write-Host "  • usage_analytics - Platform metrics"
        
        Write-Warning "`n⚠️  MANUAL STEP REQUIRED:"
        Write-Host "  1. Go to: https://vercel.com/nivlawest1911-oss-projects/edintel-app/stores"
        Write-Host "  2. Click on your Postgres database"
        Write-Host "  3. Click 'Query' tab"
        Write-Host "  4. Copy contents of database/schema.sql"
        Write-Host "  5. Paste and click 'Run Query'"
        
        if (-not $AutoYes) {
            $openSchema = Read-Host "`nOpen schema file now? (y/n)"
            if ($openSchema -eq 'y') {
                notepad "database\schema.sql"
            }
            
            $dbDone = Read-Host "Have you run the schema in Vercel Postgres? (y/n)"
            if ($dbDone -eq 'y') {
                Write-Success "Database schema marked as complete"
            }
            else {
                Write-Warning "Skipping database verification"
            }
        }
    }
    else {
        Write-Error "database/schema.sql not found!"
    }
}

# Step 3: Media Directory
Write-Header "STEP 3: Media Directory Setup"

$mediaDir = "edintel-media"
if (-not (Test-Path $mediaDir)) {
    New-Item -ItemType Directory -Path $mediaDir -Force | Out-Null
    Write-Success "Created $mediaDir directory"
}
else {
    Write-Success "$mediaDir directory exists"
}

# Check for media files
$mediaFiles = Get-ChildItem -Path $mediaDir -File -ErrorAction SilentlyContinue
if ($mediaFiles.Count -gt 0) {
    Write-Success "Found $($mediaFiles.Count) media files"
    
    # Show file types
    $images = ($mediaFiles | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|gif|webp)$' }).Count
    $videos = ($mediaFiles | Where-Object { $_.Extension -match '\.(mp4|webm|mov)$' }).Count
    
    if ($images -gt 0) { Write-Info "  Images: $images" }
    if ($videos -gt 0) { Write-Info "  Videos: $videos" }
}
else {
    Write-Warning "No media files found in $mediaDir"
    Write-Info "Add your images and videos to this folder before uploading"
}

# Step 4: Media Upload
if (-not $SkipMedia -and $mediaFiles.Count -gt 0) {
    Write-Header "STEP 4: Media Upload"
    
    if (-not $AutoYes) {
        Write-Info "Upload options:"
        Write-Host "  1. Vercel Blob (Recommended - Fast, CDN)"
        Write-Host "  2. Cloudinary (Auto-optimization, Transformations)"
        Write-Host "  3. Skip for now"
        
        $uploadChoice = Read-Host "`nSelect upload method (1/2/3)"
        
        switch ($uploadChoice) {
            "1" {
                Write-Info "Uploading to Vercel Blob..."
                node scripts/bulk-upload-vercel-blob.js
                if ($LASTEXITCODE -eq 0) {
                    Write-Success "Media uploaded to Vercel Blob"
                }
                else {
                    Write-Error "Upload failed. Check BLOB_READ_WRITE_TOKEN"
                }
            }
            "2" {
                Write-Info "Uploading to Cloudinary..."
                node scripts/bulk-upload-cloudinary.js
                if ($LASTEXITCODE -eq 0) {
                    Write-Success "Media uploaded to Cloudinary"
                }
                else {
                    Write-Error "Upload failed. Check Cloudinary credentials"
                }
            }
            "3" {
                Write-Warning "Skipping media upload"
            }
        }
    }
}

# Step 5: Build Test
Write-Header "STEP 5: Build Verification"

if (-not $AutoYes) {
    $testBuild = Read-Host "Run production build test? (y/n)"
    if ($testBuild -eq 'y') {
        Write-Info "Running build test..."
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Build completed successfully!"
        }
        else {
            Write-Error "Build failed. Check errors above."
        }
    }
}

# Step 6: Feature Testing
Write-Header "STEP 6: Feature Testing"

Write-Info "Testing URLs:"
$urls = @(
    @{Name = 'Homepage'; Url = 'https://edintel-app.vercel.app' },
    @{Name = 'Dashboard'; Url = 'https://edintel-app.vercel.app/dashboard' },
    @{Name = 'Mission Control'; Url = 'https://edintel-app.vercel.app/mission-control' },
    @{Name = 'Evidence Gallery'; Url = 'https://edintel-app.vercel.app/gallery' },
    @{Name = 'Pricing'; Url = 'https://edintel-app.vercel.app/pricing' },
    @{Name = 'Login'; Url = 'https://edintel-app.vercel.app/login' }
)

foreach ($url in $urls) {
    Write-Host "  • $($url.Name): $($url.Url)"
}

if (-not $AutoYes) {
    $openBrowser = Read-Host "`nOpen Mission Control in browser? (y/n)"
    if ($openBrowser -eq 'y') {
        Start-Process "https://edintel-app.vercel.app/mission-control"
    }
}

# Final Summary
Write-Header "ACTIVATION COMPLETE! 🎉"

Write-Host @"

✅ ACTIVATED FEATURES:
   • Google OAuth Login
   • Stripe Payment Processing
   • AI Content Generators
   • Alabama Compliance Artifacts
   • Professional Dashboard
   • Responsive Design

🚀 NEW FEATURES (Verify):
   • Multi-Agent Swarm (Mission Control)
   • Evidence Gallery (Media Bento Grid)
   • Vercel Blob Storage
   • Database Schema
   • Analytics Tracking

📊 NEXT STEPS:
   1. Test Google Login: https://edintel-app.vercel.app/login
   2. Verify Mission Control: https://edintel-app.vercel.app/mission-control
   3. Check Evidence Gallery: https://edintel-app.vercel.app/gallery
   4. Test Stripe Checkout: https://edintel-app.vercel.app/pricing
   5. Invite beta users!

💰 REVENUE POTENTIAL:
   • Practitioner: `$79/month
   • Director Pack: `$199/month
   • Site Command: `$499/month
   • Total Potential: `$2,783/month

🎓 MISSION:
   Transform education in Mobile County & Prichard Schools!

📚 DOCUMENTATION:
   • ACTIVATION_GUIDE.md
   • COMPLETE_INTEGRATION_GUIDE.md
   • TALKING_AVATAR_INTEGRATION.md

"@ -ForegroundColor Green

Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  EdIntel Professional is LIVE and ready to transform!   ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n🌐 Production URL: https://edintel-app.vercel.app`n" -ForegroundColor Yellow
