'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function getSovereignUser() {
    const { userId } = await auth();
    if (!userId) return null;

    try {
        let user = await prisma.user.findFirst({
            where: { clerkId: userId },
            include: { tier: true }
        });

        // Auto-provision user if they signed up via Clerk but aren't in Prisma yet
        if (!user) {
            const { currentUser } = await import('@clerk/nextjs/server');
            const clerkUser = await currentUser();

            if (clerkUser) {
                user = await prisma.user.create({
                    data: {
                        clerkId: clerkUser.id,
                        email: clerkUser.primaryEmailAddress?.emailAddress || '',
                        name: clerkUser.fullName || 'Executive',
                        subscriptionTier: 'free',
                        usageTokens: 10,
                    },
                    include: { tier: true }
                });
            }
        }

        return user;
    } catch (error) {
        console.error("[PRISMA_ACTION] getSovereignUser error:", error);
        return null;
    }
}

export async function updateUsageTokens(amount: number) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await prisma.user.update({
            where: { clerkId: userId },
            data: {
                usageTokens: {
                    decrement: amount
                }
            }
        });
        revalidatePath('/dashboard');
        return user;
    } catch (error) {
        console.error("[PRISMA_ACTION] updateUsageTokens error:", error);
        throw error;
    }
}

export async function getStrategicLogs() {
    const { userId } = await auth();
    if (!userId) return [];

    try {
        const generations = await prisma.generation.findMany({
            where: {
                user: { clerkId: userId }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        });
        return generations;
    } catch (error) {
        console.error("[PRISMA_ACTION] getStrategicLogs error:", error);
        return [];
    }
}
