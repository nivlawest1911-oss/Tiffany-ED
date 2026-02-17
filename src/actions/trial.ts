'use server'

import prisma from '@/lib/prisma';

// 1. Define the exact "API Contract" this function will return
export type TrialStatus = {
    isActive: boolean;
    daysLeft: number;
};

export async function getTrialStatus(userId: string): Promise<TrialStatus> {
    // 2. Fetch the data securely on the server
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { trialStartedAt: true }
    });

    if (!user) {
        throw new Error("User profile not found in EdIntel.");
    }

    // 3. Execute the business logic (30 days)
    const trialDurationMs = 30 * 24 * 60 * 60 * 1000;
    const trialEndDate = new Date(user.trialStartedAt.getTime() + trialDurationMs);
    const msLeft = trialEndDate.getTime() - Date.now();

    const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

    // 4. Return a clean, simple object matching our contract
    return {
        isActive: daysLeft > 0,
        daysLeft: Math.max(0, daysLeft)
    };
}
