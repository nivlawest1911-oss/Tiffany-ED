import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Vercel Cron Job: Daily Trial Expiry
 * Flips organization tier to EXPIRED_TRIAL if trial period has ended
 * and organization hasn't converted yet.
 */
export async function GET(req: Request) {
    // Security check: Only Vercel Cron (or authorized request) can call this
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const now = new Date();

        // Update all organizations whose trial has expired and who haven't converted
        const expiredOrgs = await prisma.organization.updateMany({
            where: {
                trialEndsAt: { lt: now },
                isTrialConverted: false,
                tier: { not: 'EXPIRED_TRIAL' }
            },
            data: {
                tier: 'EXPIRED_TRIAL'
            }
        });

        console.log(`[Cron] Expired ${expiredOrgs.count} organization trials.`);

        return NextResponse.json({
            success: true,
            expiredCount: expiredOrgs.count
        });
    } catch (error: any) {
        console.error('[Cron Error] Trial Expiration Failed:', error);
        return NextResponse.json({
            success: false,
            error: 'Cron execution failed',
            details: error.message
        }, { status: 500 });
    }
}
