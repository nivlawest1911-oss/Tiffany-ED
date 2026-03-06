
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUsers() {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    if (error) return;

    const targetEmails = ['nivlawest1911@gmail.com', 'test@gmail.com', 'nivla@gmail.com'];

    console.log(`TOTAL_USERS: ${users.length}`);
    users.filter(u => targetEmails.includes(u.email || '')).forEach(u => {
        console.log(`USER: ${u.email} | CONFIRMED: ${!!u.email_confirmed_at} | LAST_LOGIN: ${u.last_sign_in_at}`);
    });
}

checkUsers();
