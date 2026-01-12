import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET() {
    const session = await getSession();
    if (!session || !session.user) {
        return NextResponse.json({ user: null });
    }

    // Fetch fresh usage data
    try {
        const result = await sql`
            SELECT usage_count, tier FROM users WHERE id = ${session.user.id}
        `;

        if (result.rows.length > 0) {
            const freshData = result.rows[0];
            return NextResponse.json({
                user: {
                    ...session.user,
                    usage_count: freshData.usage_count,
                    tier: freshData.tier // Ensure tier is up to date too
                }
            });
        }
    } catch (e) {
        console.error('Error syncing user data', e);
    }

    return NextResponse.json({ user: session.user });
}
