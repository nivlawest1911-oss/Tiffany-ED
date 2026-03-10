const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase env vars');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        console.log('Testing Supabase connection to:', supabaseUrl);
        const { data: _data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });

        if (error) {
            console.error('Supabase query error:', error);
        } else {
            console.log('Supabase connection successful!');
        }

        process.exit(0);
    } catch (err) {
        console.error('Supabase client error:', err);
        process.exit(1);
    }
}

testSupabase();
