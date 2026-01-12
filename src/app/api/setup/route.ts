import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255),
                tier VARCHAR(50) DEFAULT 'free',
                stripe_customer_id VARCHAR(255),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                usage_count INTEGER DEFAULT 0,
                last_reset_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Attempt to add columns if they don't exist (idempotent-ish via catch or separate checks usually, but simple ALTER IF NOT EXISTS isn't standard in all SQL, strictly Postgres supports IF NOT EXISTS on ADD COLUMN in newer versions, else we just try/catch).
        // For Vercel Postgres (Neon), standard ALTER.
        try {
            await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0;`;
            await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_reset_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;`;
        } catch (e) {
            // console.log('Columns might already exist or error adding', e);
        }

        return NextResponse.json({ message: 'Database configured successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
