import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
})

async function main() {
    try {
        console.log('Testing Prisma connection...');
        console.log('URL (masked):', process.env.DATABASE_URL?.replace(/:[^@]+@/, ':****@'));
        const userCount = await prisma.user.count();
        console.log(`Connection successful. User count: ${userCount}`);
        process.exit(0);
    } catch (error) {
        console.error('Database connection failed!');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        if (error.meta) console.error('Error Meta:', JSON.stringify(error.meta, null, 2));
        process.exit(1);
    }
}

main();
