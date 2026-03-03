const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read .env.local
const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');

function getEnv(key) {
    const regex = new RegExp(`${key}=(?:'|\")(.*?)(?:'|\")`, 's');
    const match = envContent.match(regex);
    return match ? match[1] : null;
}

const vars = {
    GOOGLE_PROJECT_ID: getEnv('GOOGLE_PROJECT_ID'),
    GOOGLE_CLIENT_EMAIL: getEnv('GOOGLE_CLIENT_EMAIL'),
    GOOGLE_PRIVATE_KEY: getEnv('GOOGLE_PRIVATE_KEY'),
    GOOGLE_CREDENTIALS_JSON: getEnv('GOOGLE_CREDENTIALS_JSON')
};

for (const [key, value] of Object.entries(vars)) {
    if (value) {
        console.log(`Syncing ${key}...`);
        try {
            // Using --yes and --value for non-interactive sync
            // We use JSON.stringify to escape the value for the shell
            const cmd = `npx vercel env add ${key} production --value ${JSON.stringify(value)} --yes`;
            execSync(cmd, { stdio: 'inherit' });
        } catch (err) {
            console.error(`Failed to sync ${key}:`, err.message);
        }
    } else {
        console.warn(`Warning: ${key} not found in .env.local`);
    }
}

console.log('✅ Environment sync complete.');
