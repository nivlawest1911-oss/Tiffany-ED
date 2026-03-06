const { Client } = require('pg');
require('dotenv').config();

async function testPg() {
    const connectionString = "postgresql://postgres.mpitiluamiidbjqmvbir:M3ZTAF2Hgm2CrmNp@aws-1-us-east-1.pooler.supabase.com:5432/postgres";
    console.log('Testing raw pg connection with hardcoded string...');

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        console.log('Raw pg connection successful!');
        const res = await client.query('SELECT current_user, current_database();');
        console.log('Query result:', res.rows[0]);
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('Raw pg connection error:', err.message);
        if (err.detail) console.error('Detail:', err.detail);
        if (err.hint) console.error('Hint:', err.hint);
        process.exit(1);
    }
}

testPg();
