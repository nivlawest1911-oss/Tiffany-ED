
const { db } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
    try {
        console.log('🚀 Starting Gemini Workspace Database Migration...');

        // Read the SQL file
        const sqlPath = path.join(process.cwd(), 'database', 'gemini-workspace-schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Connect and execute
        const client = await db.connect();

        // Split commands by semicolon to run them sequentially (simple split, improved for safety)
        // Note: detailed SQL parsing is hard, but for this schema, splitting by ';' works for top-level statements
        const commands = sql
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0);

        for (const command of commands) {
            console.log(`Examples executing: ${command.substring(0, 50)}...`);
            await client.query(command);
        }

        console.log('✅ Migration completed successfully!');
        await client.end();
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
