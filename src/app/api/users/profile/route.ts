import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        let authUser: any = null;

        // Try legacy session first
        const session = await getSession();
        if (session && session.user) {
            authUser = session.user;
        }

        // Try Supabase session if no legacy session exists
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
                        email: sbUser.email
                    };
                }
            }
        }

        if (!authUser || !authUser.email) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
        }

        const body = await req.json();
        const { name, position, bio } = body;

        // Perform the update
        const result = await sql`
            UPDATE users 
            SET 
                name = COALESCE(${name}, name),
                position = COALESCE(${position}, position),
                bio = COALESCE(${bio}, bio)
            WHERE email = ${authUser.email}
            RETURNING id, email, name, position, bio
        `;

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'User record not found to update.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user: result.rows[0] });

    } catch (error: any) {
        console.error('Profile Update Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 500 });
    }
}
