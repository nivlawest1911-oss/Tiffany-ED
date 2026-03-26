const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testPrisma() {
    const url = process.env.DATABASE_URL;
    console.log('Testing Prisma connection with URL prefix:', url?.split('@')[1] || 'NOT SET');
    
    const prisma = new PrismaClient({
        datasources: {
            db: { url },
        },
    });

    try {
        const result = await prisma.$queryRaw`SELECT 1 as connected`;
        console.log('Prisma connection successful:', result);
        process.exit(0);
    } catch (err) {
        console.error('Prisma connection failed:', err.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

testPrisma();
