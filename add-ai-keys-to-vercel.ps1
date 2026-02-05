# Add AI API Keys to Vercel Production Environment
# Run this script to sync your local AI keys to Vercel

Write-Host "🚀 Adding AI API Keys to Vercel Production..." -ForegroundColor Cyan

# Read keys from .env.local
$envContent = Get-Content .env.local

# Extract key values
$groqKey = ($envContent | Select-String 'GROQ_API_KEY="(.+)"').Matches.Groups[1].Value
$elevenlabsKey = ($envContent | Select-String 'ELEVENLABS_API_KEY="(.+)"').Matches.Groups[1].Value
$kernelKey = ($envContent | Select-String 'KERNEL_API_KEY="(.+)"').Matches.Groups[1].Value
$mxbaiKey = ($envContent | Select-String 'MXBAI_API_KEY="(.+)"').Matches.Groups[1].Value
$mxbaiStoreId = ($envContent | Select-String 'MXBAI_STORE_ID="(.+)"').Matches.Groups[1].Value

Write-Host "`n📋 Keys found in .env.local:" -ForegroundColor Green
Write-Host "  ✓ GROQ_API_KEY" -ForegroundColor Gray
Write-Host "  ✓ ELEVENLABS_API_KEY" -ForegroundColor Gray
Write-Host "  ✓ KERNEL_API_KEY" -ForegroundColor Gray
Write-Host "  ✓ MXBAI_API_KEY" -ForegroundColor Gray
Write-Host "  ✓ MXBAI_STORE_ID" -ForegroundColor Gray

Write-Host "`n🔐 Adding to Vercel (production environment)..." -ForegroundColor Yellow

# Add each key to Vercel
Write-Host "`n1/5 Adding GROQ_API_KEY..." -ForegroundColor Cyan
echo $groqKey | vercel env add GROQ_API_KEY production

Write-Host "`n2/5 Adding ELEVENLABS_API_KEY..." -ForegroundColor Cyan
echo $elevenlabsKey | vercel env add ELEVENLABS_API_KEY production

Write-Host "`n3/5 Adding KERNEL_API_KEY..." -ForegroundColor Cyan
echo $kernelKey | vercel env add KERNEL_API_KEY production

Write-Host "`n4/5 Adding MXBAI_API_KEY..." -ForegroundColor Cyan
echo $mxbaiKey | vercel env add MXBAI_API_KEY production

Write-Host "`n5/5 Adding MXBAI_STORE_ID..." -ForegroundColor Cyan
echo $mxbaiStoreId | vercel env add MXBAI_STORE_ID production

Write-Host "`n✅ All AI keys added to Vercel!" -ForegroundColor Green
Write-Host "🔄 Redeploy your app to activate the new keys." -ForegroundColor Yellow

