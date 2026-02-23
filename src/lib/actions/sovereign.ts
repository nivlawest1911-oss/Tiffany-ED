'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getSovereignUser() {
    const supabase = await createClient();
    if (!supabase) return null;
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return null;
    const userId = authUser.id;

    try {
        let user = await prisma.user.findFirst({
            where: { clerkId: userId },
            include: { tier: true }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    clerkId: authUser.id,
                    email: authUser.email || '',
                    name: authUser.user_metadata?.full_name || 'Executive',
                    subscriptionTier: 'free',
                    usageTokens: 10,
                },
                include: { tier: true }
            });
        }

        return user;
    } catch (error) {
        console.error("[PRISMA_ACTION] getSovereignUser error:", error);
        return null;
    }
}

export async function updateUsageTokens(amount: number) {
    const supabase = await createClient();
    if (!supabase) throw new Error("Unauthorized");
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) throw new Error("Unauthorized");
    const userId = authUser.id;

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
    const supabase = await createClient();
    if (!supabase) return [];
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return [];
    const userId = authUser.id;

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
