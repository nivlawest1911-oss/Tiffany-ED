import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/services/email-service';

export async function GET() {
    let authUser: any = null;

    // 1. Identification Phase: Use unified auth helper (handles legacy JWT + Supabase getUser)
    const session = await getSession();
    if (session && session.user) {
        console.log(`[AUTH_SYNC] GET /api/auth/me: Authenticated session found for ${session.user.email}`);
        authUser = session.user;
    }

    if (!authUser) {
        return NextResponse.json({ user: null });
    }

    // 2. Synchronization Phase: Ensure presence in all databases
    try {
        console.log(`[AUTH_SYNC] Initiating Parity Check for ${authUser.email}`);

        // A. Database Check/Provision (Using Prisma for cross-env compatibility)
        let user = await prisma.user.findUnique({
            where: { email: authUser.email.toLowerCase() },
            select: { subscriptionTier: true, position: true, bio: true }
        });

        if (!user) {
            console.log(`[AUTH_SYNC] Provisioning ${authUser.email} in database...`);
            user = await prisma.user.create({
                data: {
                    id: authUser.id,
                    name: authUser.name,
                    email: authUser.email.toLowerCase(),
                    subscriptionTier: authUser.tier || 'free',
                }
            }) as any;
        }

        // 3. Identification Phase: Success
        return NextResponse.json({ 
            user: {
                ...authUser,
                tier: user?.subscriptionTier || authUser.tier,
                position: user?.position || null,
                bio: user?.bio || null
            }
        }, {
            headers: {
                // Must-revalidate ensures stale cache is always checked against server before using.
                'Cache-Control': 'private, max-age=60, must-revalidate',
            }
        });
    } catch (e) {
        console.error('[AUTH_SYNC] Synchronization Protocol Failed:', e);
        // Fallback: return identified user even if DB sync failed
        return NextResponse.json({ user: authUser, syncError: true }, {
            headers: { 'Cache-Control': 'private, max-age=10' }
        });
    }
}

export async function POST(req: Request) {
    try {
        const { email, name, id, tier } = await req.json();

        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
        const normalizedEmail = email.toLowerCase();
        const userId = id || normalizedEmail;

        console.log(`[AUTH_SYNC] POST /api/auth/me: Explicit sync for ${normalizedEmail}`);

        // 1. Double-Entry Sync (Prisma handles the Neon/Postgres transaction)
        await prisma.user.upsert({
            where: { email: normalizedEmail },
            update: { 
                name: name, 
                id: userId, 
                clerkId: userId,
                subscriptionTier: tier || 'free'
            },
            create: {
                id: userId,
                clerkId: userId,
                email: normalizedEmail,
                name: name,
                subscriptionTier: tier || 'free',
                role: 'TEACHER'
            }
        });

        try {
            await sendWelcomeEmail(normalizedEmail, name);
        } catch (emailErr) {
            console.error("[AUTH_SYNC] Welcome email failed:", emailErr);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[AUTH_SYNC] Neural Bridge Sync Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
