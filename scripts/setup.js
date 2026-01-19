#!/usr/bin/env node

/**
 * EdIntel Sovereign - Pre-Deployment Setup Script
 * Validates environment and prepares for production deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 EdIntel Sovereign - Pre-Deployment Setup\n');

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCommand(command, name) {
    try {
        execSync(`${command} --version`, { stdio: 'ignore' });
        log(`✅ ${name} is installed`, 'green');
        return true;
    } catch (error) {
        log(`❌ ${name} is NOT installed`, 'red');
        return false;
    }
}

function checkFile(filePath, name) {
    if (fs.existsSync(filePath)) {
        log(`✅ ${name} exists`, 'green');
        return true;
    } else {
        log(`❌ ${name} is missing`, 'red');
        return false;
    }
}

// Step 1: Check required tools
log('\n📋 Step 1: Checking Required Tools', 'blue');
const tools = {
    node: checkCommand('node', 'Node.js'),
    npm: checkCommand('npm', 'npm'),
    gcloud: checkCommand('gcloud', 'Google Cloud SDK'),
    docker: checkCommand('docker', 'Docker'),
    vercel: checkCommand('vercel', 'Vercel CLI'),
    psql: checkCommand('psql', 'PostgreSQL Client'),
};

// Step 2: Check required files
log('\n📋 Step 2: Checking Required Files', 'blue');
const files = {
    prismaSchema: checkFile('prisma/schema.prisma', 'Prisma Schema'),
    initSQL: checkFile('prisma/init_schema.sql', 'Database Init Script'),
    dockerfile: checkFile('cloud/Dockerfile.avatar', 'Avatar Dockerfile'),
    dockerCompose: checkFile('cloud/docker-compose.yml', 'Docker Compose'),
    wifSetup: checkFile('WIF_SETUP.md', 'WIF Setup Guide'),
    deploymentRoadmap: checkFile('DEPLOYMENT_ROADMAP.md', 'Deployment Roadmap'),
};

// Step 3: Check environment variables
log('\n📋 Step 3: Checking Environment Variables', 'blue');

const requiredEnvVars = [
    'GCP_PROJECT_ID',
    'DATABASE_URL',
    'GOOGLE_GENERATIVE_AI_API_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_PUBLISHABLE_KEY',
];

const envFile = '.env.local';
let envVars = {};

if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, 'utf-8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envVars[key.trim()] = value.trim();
        }
    });
}

const missingEnvVars = [];
requiredEnvVars.forEach(varName => {
    if (envVars[varName] && envVars[varName] !== 'your_key_here') {
        log(`✅ ${varName} is set`, 'green');
    } else {
        log(`❌ ${varName} is missing or not configured`, 'red');
        missingEnvVars.push(varName);
    }
});

// Step 4: Check dependencies
log('\n📋 Step 4: Checking Dependencies', 'blue');

try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const requiredDeps = [
        '@ai-sdk/google-vertex',
        '@google-cloud/vertexai',
        '@prisma/client',
        'livekit-client',
        'stripe',
        'ai',
    ];

    requiredDeps.forEach(dep => {
        if (packageJson.dependencies[dep]) {
            log(`✅ ${dep} is in package.json`, 'green');
        } else {
            log(`❌ ${dep} is missing from package.json`, 'red');
        }
    });
} catch (error) {
    log('❌ Could not read package.json', 'red');
}

// Step 5: Summary and recommendations
log('\n📊 Summary', 'blue');

const allToolsInstalled = Object.values(tools).every(v => v);
const allFilesPresent = Object.values(files).every(v => v);
const allEnvVarsSet = missingEnvVars.length === 0;

if (allToolsInstalled && allFilesPresent && allEnvVarsSet) {
    log('\n🎉 All checks passed! You are ready to deploy.', 'green');
    log('\nNext steps:', 'blue');
    log('1. Run: npm install', 'yellow');
    log('2. Follow DEPLOYMENT_ROADMAP.md for production deployment', 'yellow');
    log('3. Set up Workload Identity Federation (WIF_SETUP.md)', 'yellow');
} else {
    log('\n⚠️  Some checks failed. Please address the issues above.', 'yellow');

    if (!allToolsInstalled) {
        log('\n🔧 Missing Tools:', 'yellow');
        Object.entries(tools).forEach(([name, installed]) => {
            if (!installed) {
                log(`   - Install ${name}`, 'red');
            }
        });
    }

    if (!allFilesPresent) {
        log('\n📁 Missing Files:', 'yellow');
        Object.entries(files).forEach(([name, exists]) => {
            if (!exists) {
                log(`   - ${name} is missing`, 'red');
            }
        });
    }

    if (!allEnvVarsSet) {
        log('\n🔑 Missing Environment Variables:', 'yellow');
        missingEnvVars.forEach(varName => {
            log(`   - ${varName}`, 'red');
        });
        log('\n   Copy .env.example to .env.local and fill in the values', 'yellow');
    }
}

// Step 6: Offer to install dependencies
log('\n📦 Installing Dependencies', 'blue');

try {
    log('Running: npm install...', 'yellow');
    execSync('npm install', { stdio: 'inherit' });
    log('✅ Dependencies installed successfully', 'green');
} catch (error) {
    log('❌ Failed to install dependencies', 'red');
    log('Please run: npm install manually', 'yellow');
}

// Step 7: Generate Prisma client
log('\n🔧 Generating Prisma Client', 'blue');

try {
    log('Running: npx prisma generate...', 'yellow');
    execSync('npx prisma generate', { stdio: 'inherit' });
    log('✅ Prisma client generated successfully', 'green');
} catch (error) {
    log('⚠️  Prisma client generation skipped (database not configured yet)', 'yellow');
}

log('\n✨ Setup complete!', 'green');
log('\n📚 Next Steps:', 'blue');
log('1. Review DEPLOYMENT_ROADMAP.md for complete deployment guide', 'yellow');
log('2. Set up Google Cloud (Phase 1 in roadmap)', 'yellow');
log('3. Configure Workload Identity Federation (WIF_SETUP.md)', 'yellow');
log('4. Deploy to production!', 'yellow');
log('\n🚀 Happy deploying!', 'green');
