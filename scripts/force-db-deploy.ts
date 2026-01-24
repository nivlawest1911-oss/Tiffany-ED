
import { createPool } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function main() {
    console.log('🔌 Connecting to Vercel Postgres...');

    if (!process.env.POSTGRES_URL) {
        console.error('❌ Error: POSTGRES_URL is missing from .env.local');
        process.exit(1);
    }

    const pool = createPool({
        connectionString: process.env.POSTGRES_URL,
    });

    try {
        console.log('📖 Reading schema.sql...');
        const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('🚀 Executing schema...');
        // We use the pool to query directly. 
        // Note: ensure the schema file creates tables with IF NOT EXISTS to avoid errors.
        const result = await pool.query(schema);

        console.log('✅ Database schema applied successfully!');
        console.log('   Tables created/verified.');

    } catch (error) {
        console.error('❌ Database deployment failed:', error);
        process.exit(1);
    } finally {
        // End the pool
        await pool.end();
    }
}

main();
