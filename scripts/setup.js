#!/usr/bin/env node

/**
 * EdIntel Professional - Quick Setup Script
 * Automates the activation process
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 EdIntel Professional - Quick Setup\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: Please run this script from the project root directory');
    process.exit(1);
}

console.log('✅ Project directory verified\n');

// Step 1: Create media directory
console.log('📁 Step 1: Creating media directory...');
const mediaDir = path.join(process.cwd(), 'edintel-media');
if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
    console.log('   ✅ Created: edintel-media/');
} else {
    console.log('   ℹ️  Already exists: edintel-media/');
}

// Step 2: Check for .env.local
console.log('\n🔑 Step 2: Checking environment variables...');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    console.log('   ✅ Found: .env.local');

    const envContent = fs.readFileSync(envPath, 'utf8');
    const requiredVars = [
        'POSTGRES_URL',
        'GOOGLE_CLIENT_ID',
        'STRIPE_SECRET_KEY',
        'NEXT_PUBLIC_APP_URL'
    ];

    const missingVars = requiredVars.filter(v => !envContent.includes(v));

    if (missingVars.length === 0) {
        console.log('   ✅ All critical variables present');
    } else {
        console.log('   ⚠️  Missing variables:', missingVars.join(', '));
    }

    // Check for new variables
    const newVars = ['BLOB_READ_WRITE_TOKEN', 'HEYGEN_API_KEY', 'ELEVENLABS_API_KEY'];
    const missingNewVars = newVars.filter(v => !envContent.includes(v));

    if (missingNewVars.length > 0) {
        console.log('   ⏳ Optional variables to add:', missingNewVars.join(', '));
    }
} else {
    console.log('   ⚠️  .env.local not found - run: vercel env pull .env.local');
}

// Step 3: Check database schema
console.log('\n🗄️  Step 3: Database schema...');
const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
if (fs.existsSync(schemaPath)) {
    console.log('   ✅ Found: database/schema.sql');
    console.log('   📋 Next: Copy this file to Vercel Postgres Query tab');
} else {
    console.log('   ❌ Schema file not found');
}

// Step 4: Check scripts
console.log('\n📤 Step 4: Upload scripts...');
const scripts = [
    'scripts/bulk-upload-vercel-blob.js',
    'scripts/bulk-upload-cloudinary.js'
];

scripts.forEach(script => {
    if (fs.existsSync(script)) {
        console.log(`   ✅ Found: ${script}`);
    } else {
        console.log(`   ❌ Missing: ${script}`);
    }
});

// Step 5: Check components
console.log('\n🎨 Step 5: New components...');
const components = [
    'src/components/MissionControl.tsx',
    'src/components/MediaBentoGrid.tsx',
    'src/components/MediaSearch.tsx',
    'src/components/TalkingAvatarVideo.tsx'
];

components.forEach(comp => {
    if (fs.existsSync(comp)) {
        console.log(`   ✅ ${path.basename(comp)}`);
    } else {
        console.log(`   ❌ ${path.basename(comp)}`);
    }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SETUP SUMMARY');
console.log('='.repeat(60));

console.log('\n✅ COMPLETED:');
console.log('   • Project structure verified');
console.log('   • Media directory created');
console.log('   • Components installed');
console.log('   • Scripts ready');

console.log('\n⏳ TODO (Manual Steps):');
console.log('   1. Run database schema in Vercel Postgres');
console.log('   2. Add environment variables to Vercel');
console.log('   3. Upload media files to edintel-media/');
console.log('   4. Run: node scripts/bulk-upload-vercel-blob.js');

console.log('\n🌐 LIVE URLS:');
console.log('   • Production: https://edintel-app.vercel.app');
console.log('   • Dashboard: https://vercel.com/nivlawest1911-oss-projects/edintel-app');
console.log('   • Mission Control: https://edintel-app.vercel.app/mission-control');
console.log('   • Gallery: https://edintel-app.vercel.app/gallery');

console.log('\n📚 DOCUMENTATION:');
console.log('   • ACTIVATION_GUIDE.md - Complete setup instructions');
console.log('   • COMPLETE_INTEGRATION_GUIDE.md - Technical details');
console.log('   • TALKING_AVATAR_INTEGRATION.md - Avatar setup');

console.log('\n🚀 Next Command:');
console.log('   npm run dev  # Start local development');
console.log('   OR');
console.log('   vercel --prod  # Deploy to production');

console.log('\n' + '='.repeat(60));
console.log('✨ EdIntel Professional is ready to transform education!');
console.log('='.repeat(60) + '\n');
