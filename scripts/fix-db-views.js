
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Attempting to drop conflicting views...');
    try {
        // Drop known conflicting views with CASCADE to remove dependencies
        const viewsToDrop = [
            "user_recent_content",
            "popular_workflows",
            "user_content_stats"
        ];

        for (const view of viewsToDrop) {
            console.log(`Dropping view: ${view}`);
            await prisma.$executeRawUnsafe(`DROP VIEW IF EXISTS "${view}" CASCADE;`);
        }

        console.log('Successfully dropped conflicting views.');
    } catch (e) {
        console.error('Error dropping views:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
