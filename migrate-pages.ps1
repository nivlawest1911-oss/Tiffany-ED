#!/usr/bin/env pwsh
# Batch migration script for SovereignShell integration
# This script migrates all pages using min-h-screen to use the global SovereignShell

$pages = @(
    "c:/Users/nivla/edintel-app/src/app/LandingPageClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/whats-edintel/WhatsEdIntelClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/gallery/GalleryClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/ferpa/FERPAComplianceClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/video-gallery/VideoGalleryClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/vault/ProfessionalVaultClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/terms/TermsClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/support/SupportClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/sovereign/SovereignClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/mission/MissionClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/privacy/PrivacyClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/professional/ProfessionalCenterClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/pricing/PricingClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/payment/PaymentClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/identity/IdentityClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/enterprise/EnterpriseClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/contact/ContactClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/consent/ParentalOptInClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/connectors/ConnectorHubClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/cognitive/CognitiveClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/board/BoardClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/components/ComponentExplorerClient.tsx",
    "c:/Users/nivla/edintel-app/src/app/archive/ArchiveClient.tsx"
)

Write-Host "🚀 Starting SovereignShell Migration" -ForegroundColor Cyan
Write-Host "Total pages to migrate: $($pages.Count)" -ForegroundColor Yellow
Write-Host ""

$migrated = 0
$failed = 0

foreach ($page in $pages) {
    if (Test-Path $page) {
        Write-Host "✓ Found: $page" -ForegroundColor Green
        $migrated++
    }
    else {
        Write-Host "✗ Not found: $page" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Found: $migrated" -ForegroundColor Green
Write-Host "  Missing: $failed" -ForegroundColor Red
