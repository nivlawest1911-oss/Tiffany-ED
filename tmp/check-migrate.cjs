const { createClient } = require('@supabase/supabase-js');
const { readFileSync } = require('fs');

const envRaw = readFileSync('C:/Users/nivla/edintel-app/.env.local', 'utf-8');
const env = {};
for (const l of envRaw.split('\n')) {
    const m = l.match(/^([^#=]+)=(.*)/);
    if (m) env[m[1].trim()] = m[2].trim().replace(/^"|"$/g, '');
}

const s = createClient(
    env['NEXT_PUBLIC_SUPABASE_URL'],
    env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY']
);

Promise.all([
    s.from('companion_certificates').select('id').limit(1),
    s.from('knowledge_documents').select('id').limit(1)
]).then(([a, b]) => {
    console.log('companion_certificates:', a.error ? 'MISSING: ' + a.error.message : 'EXISTS');
    console.log('knowledge_documents:   ', b.error ? 'MISSING: ' + b.error.message : 'EXISTS');
    process.exit(0);
}).catch(e => { console.error(e.message); process.exit(1); });
