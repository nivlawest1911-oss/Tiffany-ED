import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { EDINTEL_TIERS } from '../src/config/tiers';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding EdIntel pricing tiers from source of truth...');

    for (const [_, tierData] of Object.entries(EDINTEL_TIERS)) {
        const tier = await (prisma as any).tier.upsert({
            where: { name: tierData.name },
            update: {
                stripeUrl: tierData.stripeLink,
            },
            create: {
                name: tierData.name,
                stripeUrl: tierData.stripeLink,
            },
        });
        console.log(`✅ Verified tier: ${tier.name} -> ${tier.stripeUrl}`);
    }

    console.log('Database seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
