const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testPrismaManual() {
    // Manually setting the URL to the old one that had M3ZTAF2Hgm2CrmNp
    const url = "postgresql://postgres.mpitiluamiidbjqmvbir:M3ZTAF2Hgm2CrmNp@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
    console.log('Testing Prisma connection with OLD password...');
    
    const prisma = new PrismaClient({
        datasources: {
            db: { url },
        },
    });

    try {
        const result = await prisma.$queryRaw`SELECT 1 as connected`;
        console.log('Prisma connection successful with OLD password:', result);
        process.exit(0);
    } catch (err) {
        console.error('Prisma connection failed with OLD password:', err.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

testPrismaManual();
