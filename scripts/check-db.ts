
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log('Checking database connection...');
    try {
        await prisma.$connect();
        console.log('Successfully connected to database.');
        const count = await prisma.user.count();
        console.log(`Found ${count} users.`);
    } catch (e) {
        console.error('Connection to DATABASE_URL failed:', e);

        if (process.env.DIRECT_URL) {
            console.log('Attempting connection with DIRECT_URL...');
            const prismaDirect = new PrismaClient({
                datasources: {
                    db: {
                        url: process.env.DIRECT_URL,
                    },
                },
                log: ['query', 'info', 'warn', 'error'],
            });
            try {
                await prismaDirect.$connect();
                console.log('Successfully connected with DIRECT_URL.');
                const count = await prismaDirect.user.count();
                console.log(`Found ${count} users via Direct URL.`);
            } catch (e2) {
                console.error('Connection to DIRECT_URL also failed:', e2);
                process.exit(1);
            } finally {
                await prismaDirect.$disconnect();
            }
        } else {
            console.log('DIRECT_URL not defined in environment.');
            process.exit(1);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
