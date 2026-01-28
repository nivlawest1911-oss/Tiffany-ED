import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { login } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Check if user exists
        const existing = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
        if (existing.rows.length > 0) {
            return NextResponse.json({ error: 'Identity already initialized. Please Sign In.' }, { status: 409 });
        }

        // 2. Create User with 14-Day Trial
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 14);

        const SOVEREIGN_USERS = [
            'nivlawest1911@gmail.com',
            'dralvinwest@transcendholisticwellness.com'
        ];
        const SOVEREIGN_PASSWORD = '1MANomega1!';

        const isSovereign = SOVEREIGN_USERS.includes(email.toLowerCase());
        const signupTier = isSovereign ? 'Site Command' : 'free';

        // Use provided password OR default sovereign password if it matches the whitelist
        const finalPassword = isSovereign ? SOVEREIGN_PASSWORD : password;

        await sql`
            INSERT INTO users (name, email, password_hash, subscription_tier, trial_ends_at, created_at)
            VALUES (${name}, ${email}, ${finalPassword}, ${signupTier}, ${trialEndDate.toISOString()}, NOW())
        `;

        // 3. Get the created user
        const newUserResult = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
        const newUser = newUserResult.rows[0];

        // 4. Create Session
        await login({
            id: newUser.id.toString(),
            email: newUser.email,
            name: newUser.name,
            tier: signupTier
        });

        return NextResponse.json({
            success: true,
            user: {
                name: newUser.name,
                email: newUser.email,
                tier: signupTier
            }
        });

    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json({ error: 'Initialization Failed' }, { status: 500 });
    }
}
