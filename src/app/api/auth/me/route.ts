import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET() {
    const session = await getSession();
    if (!session || !session.user) {
        return NextResponse.json({ user: null });
    }

    try {
        const result = await sql`
            SELECT subscription_tier FROM users WHERE email = ${session.user.email} LIMIT 1
        `;

        if (result.rows.length > 0) {
            const freshData = result.rows[0];
            return NextResponse.json({
                user: {
                    ...session.user,
                    tier: freshData.subscription_tier
                }
            });
        }
    } catch (e) {
        console.error('Error syncing user data', e);
    }

    return NextResponse.json({ user: session.user });
}

export async function POST(req: Request) {
    try {
        const { email, name, id } = await req.json();

        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        // Upsert into legacy users table
        await sql`
            INSERT INTO users (id, name, email, created_at, subscription_tier)
            VALUES (${id || email}, ${name}, ${email}, NOW(), 'free')
            ON CONFLICT (email) DO UPDATE 
            SET name = EXCLUDED.name, id = EXCLUDED.id
        `;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[Neural Bridge Sync Error]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
