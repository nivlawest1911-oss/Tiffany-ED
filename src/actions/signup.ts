'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { EDINTEL_TIERS } from '@/config/tiers';
import { ROUTES } from '@/lib/routes';

export async function createEdIntelUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const schoolSite = formData.get('schoolSite') as string;
    const tierName = formData.get('tierName') as string;

    if (!name || !email || !schoolSite || !tierName) {
        throw new Error("All fields are required for EdIntel enrollment.");
    }

    // 1. Precise Tier Lookup & Config Validation
    const tierConfig = EDINTEL_TIERS[tierName];
    if (!tierConfig) {
        throw new Error(`Architectural error: Tier '${tierName}' not defined in Sovereign config.`);
    }

    // Resolve Tier ID from Database (Must exist via Seed)
    const tier = await prisma.tier.findUnique({
        where: { name: tierName }
    });

    if (!tier) {
        console.error(`CRITICAL: Tier '${tierName}' missing in DB. Run seed script.`);
        throw new Error("Enrollment unavailable. Please contact support.");
    }

    // 2. Execute Isolated Creation Logic
    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                schoolSite,
                tierId: tier.id,
                usageTokens: 10, // Default for 30-day trial
                trialStartedAt: new Date(),
                trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                isActive: true
            }
        });

        revalidatePath(ROUTES.TEACHER_LAB); // Refresh the dashboard state

        return {
            success: true,
            message: `Welcome to EdIntel, ${name}. Redirecting to secure checkout...`,
            userId: user.id,
            stripeUrl: tierConfig.stripeLink
        };
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error("This email is already registered with EdIntel.");
        }
        throw new Error(`Enrollment failed: ${error.message}`);
    }
}
