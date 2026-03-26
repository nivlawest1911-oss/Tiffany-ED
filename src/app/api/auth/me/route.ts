import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/services/email-service';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
    let authUser: any = null;

    // 1. Identification Phase: Try legacy session first, then Supabase
    const session = await getSession();
    if (session && session.user) {
        console.log(`[AUTH_SYNC] GET /api/auth/me: Legacy session found for ${session.user.email}`);
        authUser = session.user;
    }

    if (!authUser) {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey) {
            const supabase = createServerClient(supabaseUrl, supabaseKey, {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                },
            });
            const { data: { user: sbUser } } = await supabase.auth.getUser();
            if (sbUser) {
                console.log(`[AUTH_SYNC] GET /api/auth/me: Supabase session found for ${sbUser.email}`);
                authUser = {
                    id: sbUser.id,
                    email: sbUser.email!,
                    name: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'Sovereign Agent',
                    tier: sbUser.user_metadata?.tier || 'free'
                };
            }
        }
    }

    if (!authUser) {
        return NextResponse.json({ user: null });
    }

    // 2. Synchronization Phase: Ensure presence in all databases
    try {
        console.log(`[AUTH_SYNC] Initiating Parity Check for ${authUser.email}`);

        // A. Neon Check/Provision (@vercel/postgres)
        const neonResult = await sql`
            SELECT subscription_tier, position, bio FROM users WHERE email = ${authUser.email.toLowerCase()} LIMIT 1
        `;

        if (neonResult.rows.length === 0) {
            console.log(`[AUTH_SYNC] Provisioning ${authUser.email} in Neon...`);
            await sql`
                INSERT INTO users (id, name, email, created_at, subscription_tier)
                VALUES (${authUser.id}, ${authUser.name}, ${authUser.email.toLowerCase()}, NOW(), ${authUser.tier})
                ON CONFLICT (email) DO NOTHING
            `;
        } else {
            // Update authUser with fresh metadata from Neon
            const freshNeon = neonResult.rows[0];
            authUser.tier = freshNeon.subscription_tier || authUser.tier;
            authUser.position = freshNeon.position;
            authUser.bio = freshNeon.bio;
        }

        // B. Prisma Check/Provision (Supabase Postgres)
        const prismaUser = await prisma.user.findUnique({
            where: { email: authUser.email.toLowerCase() }
        });

        if (!prismaUser) {
            console.log(`[AUTH_SYNC] Provisioning ${authUser.email} in Prisma...`);
            await prisma.user.create({
                data: {
                    id: authUser.id,
                    clerkId: authUser.id, // Using Supabase ID for clerkId field as compatibility bridge
                    email: authUser.email.toLowerCase(),
                    name: authUser.name,
                    subscriptionTier: authUser.tier as any,
                    role: 'TEACHER' // Default role
                }
            });
        }

        return NextResponse.json({ user: authUser }, {
            headers: {
                // Allow each client to cache user data for 60s to reduce DB sync pressure.
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

        // 1. Upsert into Neon
        await sql`
            INSERT INTO users (id, name, email, created_at, subscription_tier)
            VALUES (${userId}, ${name}, ${normalizedEmail}, NOW(), ${tier || 'free'})
            ON CONFLICT (email) DO UPDATE 
            SET name = EXCLUDED.name, id = EXCLUDED.id
        `;

        // 2. Upsert into Prisma
        await prisma.user.upsert({
            where: { email: normalizedEmail },
            update: { name: name, id: userId, clerkId: userId },
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
