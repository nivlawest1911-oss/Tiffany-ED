import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import { sendWelcomeEmail } from '@/services/email-service';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
    let authUser: any = null;

    // 1. Try legacy session first
    const session = await getSession();
    if (session && session.user) {
        authUser = session.user;
    }

    // 2. Try Supabase session if no legacy session exists
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
                authUser = {
                    id: sbUser.id,
                    email: sbUser.email,
                    name: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'Sovereign Agent',
                    tier: sbUser.user_metadata?.tier || 'free'
                };
            }
        }
    }

    if (!authUser) {
        return NextResponse.json({ user: null });
    }

    try {
        const result = await sql`
            SELECT subscription_tier, position, bio FROM users WHERE email = ${authUser.email} LIMIT 1
        `;

        if (result.rows.length > 0) {
            const freshData = result.rows[0];
            return NextResponse.json({
                user: {
                    ...authUser,
                    tier: freshData.subscription_tier || authUser.tier,
                    position: freshData.position,
                    bio: freshData.bio
                }
            });
        }
    } catch (e) {
        console.error('Error syncing user data', e);
    }

    return NextResponse.json({ user: authUser });
}

export async function POST(req: Request) {
    try {
        const { email, name, id } = await req.json();

        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        // Upsert into legacy users table
        const result = await sql`
            INSERT INTO users (id, name, email, created_at, subscription_tier)
            VALUES (${id || email}, ${name}, ${email}, NOW(), 'free')
            ON CONFLICT (email) DO UPDATE 
            SET name = EXCLUDED.name, id = EXCLUDED.id
            RETURNING *
        `;

        // If it's a new user (or we want to re-greet), send the welcome email
        // We can check if it was an insert vs update if needed, but for now we'll trigger it
        if (result.rows.length > 0) {
            await sendWelcomeEmail(email, name);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[Neural Bridge Sync Error]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
