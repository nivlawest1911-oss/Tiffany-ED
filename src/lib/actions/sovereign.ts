"use server";

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getSovereignUser() {
    const { prisma } = await import('@/lib/prisma');
    const supabase = await createClient();
    if (!supabase) return null;
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return null;
    const userId = authUser.id;

    try {
        let user = await prisma.user.findFirst({
            where: { clerk_id: userId },
            include: { tiers: true }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: authUser.id,
                    clerk_id: authUser.id,
                    email: authUser.email || '',
                    name: authUser.user_metadata?.full_name || 'Executive',
                    subscription_tier: 'free',
                    usage_tokens: 10,
                    updated_at: new Date()
                },
                include: { tiers: true }
            });
        }

        return user;
    } catch (error) {
        console.error("[PRISMA_ACTION] getSovereignUser error:", error);
        return null;
    }
}

export async function updateUsageTokens(amount: number) {
    const { prisma } = await import('@/lib/prisma');
    const supabase = await createClient();
    if (!supabase) throw new Error("Unauthorized");
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) throw new Error("Unauthorized");
    const userId = authUser.id;

    try {
        const user = await prisma.user.update({
            where: { clerk_id: userId },
            data: {
                usage_tokens: {
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
    const { prisma } = await import('@/lib/prisma');
    const supabase = await createClient();
    if (!supabase) return [];
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return [];
    const userId = authUser.id;

    try {
        const generations = await prisma.generations.findMany({
            where: {
                users: { clerk_id: userId }
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
