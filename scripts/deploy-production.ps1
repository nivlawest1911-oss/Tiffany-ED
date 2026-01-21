
# Deploy to Production (Vercel)
# Usage: ./deploy-production.ps1 [message]

param (
    [string]$message = "Automated deployment via Agent"
)

Write-Host "🚀 Starting Production Deployment..." -ForegroundColor Green

# 1. Type Check
Write-Host "🔍 Running Type Check..." -ForegroundColor Yellow
$typeCheck = npx tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Type Check Failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Type Check Passed" -ForegroundColor Green

# 2. Lint Check
Write-Host "t🔍 Running Lint Check..." -ForegroundColor Yellow
$lintCheck = npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Linting issues found (non-fatal for now)" -ForegroundColor Yellow
}
else {
    Write-Host "✅ Lint Check Passed" -ForegroundColor Green
}

# 3. Build Verification
Write-Host "🏗️ Verifying Build..." -ForegroundColor Yellow
$buildCheck = npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build Failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build Verification Passed" -ForegroundColor Green

# 4. Deploy to Vercel
Write-Host "🚀 Deploying to Vercel (Production)..." -ForegroundColor Cyan
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment Complete!" -ForegroundColor Green
}
else {
    Write-Host "❌ Deployment Failed!" -ForegroundColor Red
    exit 1
}
