import "dotenv/config";
import { PrismaClient } from '../src/generated/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function runMigration(fileName: string) {
    console.log(`\n📄 Reading migration: ${fileName}...`);
    const sqlPath = join(process.cwd(), 'supabase/migrations', fileName);
    const sql = readFileSync(sqlPath, 'utf8');

    console.log(`🚀 Executing ${fileName} on Supabase...`);
    try {
        // We split the SQL by ';' to execute statements if needed, 
        // but $executeRawUnsafe can often handle multiple statements depending on the driver.
        // For Supabase/PG, we'll try running it as one block first.
        await prisma.$executeRawUnsafe(sql);
        console.log(`✅ ${fileName} executed successfully!`);
    } catch (error: any) {
        if (error.message.includes('already exists')) {
            console.log(`ℹ️  ${fileName}: Some objects already exist. Continuing...`);
        } else {
            console.error(`❌ Error executing ${fileName}:`, error.message);
            throw error;
        }
    }
}

async function main() {
    console.log('🛡️  EdIntel Sovereign Vault: Automated Migration System');
    console.log('------------------------------------------------------');

    try {
        // 1. Birth Certificate Infrastructure (Phase 15 dependency)
        await runMigration('20260403_foundry_init.sql');

        // 2. Knowledge Vault & Vector Intelligence (Phase 16)
        await runMigration('20260403_vault_init.sql');

        console.log('\n✨ Database Infrastructure is now fully synced with Phase 16.');
    } catch (error) {
        console.error('\n💥 Migration failed. Please check your DATABASE_URL in .env');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
