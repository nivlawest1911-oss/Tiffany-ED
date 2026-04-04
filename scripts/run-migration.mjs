/**
 * EdIntel Foundry Migration Runner
 * Executes the companion_certificates table creation directly via Supabase SQL API.
 * Run: node scripts/run-migration.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env manually
const envFile = readFileSync(join(__dirname, '../.env.local'), 'utf-8');
const env = {};
for (const line of envFile.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
        env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
    }
}

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const serviceRoleKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

console.log('🚀 EdIntel Foundry Migration Runner');
console.log('📡 Connecting to:', supabaseUrl);
console.log('🔑 Key type:', env['SUPABASE_SERVICE_ROLE_KEY'] ? 'SERVICE ROLE (✓)' : 'ANON (limited permissions)');

if (!supabaseUrl) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Test the connection first
const { data: test, error: testError } = await supabase.from('_migration_test_').select('*').limit(1);
console.log('Connection test:', testError ? `Expected error: ${testError.message}` : 'OK');

// Check if table already exists
const { data: existing, error: existsError } = await supabase
    .from('companion_certificates')
    .select('id')
    .limit(1);

if (!existsError) {
    console.log('✅ companion_certificates table already exists! Migration not needed.');
    console.log('📊 Table is accessible and ready for Foundry use.');
} else if (existsError.code === '42P01') {
    console.log('📋 Table does not exist — migration required.');
    console.log('');
    console.log('⚠️  The anon key cannot CREATE tables in Supabase.');
    console.log('    You need to run the SQL manually in the Supabase SQL Editor.');
    console.log('');
    console.log('📍 Steps:');
    console.log('   1. Go to: https://supabase.com/dashboard/project/mpitiluamiidbjqmvbir/sql/new');
    console.log('   2. Paste the SQL from: supabase/migrations/20260403_foundry_init.sql');
    console.log('   3. Click Run');
} else {
    console.log('ℹ️  Connection status:', existsError.message);
}

console.log('');
console.log('📡 Vercel Deployment: https://edintel-79jo4jyfg-nivlawest1911-oss.vercel.app');
console.log('🔗 GitHub: https://github.com/nivlawest1911-oss/Tiffany-ED/commit/1426e679');
