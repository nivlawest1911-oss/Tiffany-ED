const fs = require('fs');
const path = require('path');

console.log('\x1b[36m%s\x1b[0m', '--- EdIntel Environment Verification ---');

const requiredKeys = [
    'STRIPE_SECRET_KEY',
    'GOOGLE_GENAI_API_KEY',
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID'
];

// Try to read .env.local
const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    console.log('✅ Found .env.local');
} else {
    console.log('⚠️  No .env.local file found. Checking process environment...');
}

// Parse env file if exists
const envVars = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key) envVars[key.trim()] = value ? value.trim() : '';
});

// Check keys
let allGood = true;
requiredKeys.forEach(key => {
    const val = envVars[key] || process.env[key];
    if (val && val.length > 5) {
        console.log(`✅ ${key}: Present (${val.substring(0, 4)}...)`);
    } else {
        console.log(`❌ ${key}: MISSING or INVALID`);
        allGood = false;
    }
});

if (allGood) {
    console.log('\n\x1b[32m%s\x1b[0m', '✅ SYSTEM READY: All core secrets detected.');
    console.log('Ensure these same keys are present in GitHub Repository Secrets for deployment.');
} else {
    console.log('\n\x1b[31m%s\x1b[0m', '❌ SYSTEM NOT READY: Critical keys are missing.');
    console.log('Please configure .env.local or GitHub Secrets according to DEPLOYMENT_CHECKLIST.md');
}
