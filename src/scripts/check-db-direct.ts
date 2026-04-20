import { PrismaClient } from '@/generated/prisma'
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DIRECT_URL
        }
    }
} as any)

async function main() {
    try {
        console.log('Testing DIRECT Prisma connection...');
        console.log('URL:', process.env.DIRECT_URL?.split('@')[1]); // Log without credentials
        const userCount = await prisma.user.count();
        console.log(`Connection successful. User count: ${userCount}`);
        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

main();
