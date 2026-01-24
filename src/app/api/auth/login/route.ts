import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { login } from '@/lib/auth';
// In a real app, import bcrypt to compare passwords
// import bcrypt from 'bcryptjs'; 

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        // 1. Check User in DB
        const result = await sql`
            SELECT * FROM users WHERE email = ${email} LIMIT 1;
        `;

        const user = result.rows[0];

        // SOVEREIGN BYPASS: Hardcoded credentials for full access
        const SOVEREIGN_USERS = [
            'nivlawest1911@gmail.com',
            'dralvinwest@transcendholisticwellness.com'
        ];
        const SOVEREIGN_PASSWORD = '1MANomega1!';

        const isSovereign = SOVEREIGN_USERS.includes(email.toLowerCase()) && password === SOVEREIGN_PASSWORD;

        if (isSovereign) {
            console.log(`[SOVEREIGN] Master access granted to ${email}`);

            // If user doesn't exist in DB, we create a temporary identity or just use a synthetic one
            const authUser = user || {
                id: 'sovereign_id',
                email: email,
                name: email.split('@')[0].toUpperCase(),
                tier: 'Site Command'
            };

            await login({
                id: authUser.id.toString(),
                email: authUser.email,
                name: authUser.name,
                tier: 'Site Command' // This tier gives full access to all components
            });

            return NextResponse.json({
                success: true,
                user: {
                    name: authUser.name,
                    email: authUser.email,
                    tier: 'Site Command'
                }
            });
        }

        if (!user) {
            return NextResponse.json({ error: 'Executive identity not found. Please Initialize Protocol (Signup).' }, { status: 401 });
        }

        // 2. Verify Password
        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid Access Key' }, { status: 401 });
        }

        // 3. Create Session
        const userTier = SOVEREIGN_USERS.includes(user.email.toLowerCase())
            ? 'Site Command'
            : (user.tier || 'free');

        await login({
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            tier: userTier
        });

        return NextResponse.json({ success: true, user: { name: user.name, email: user.email, tier: userTier } });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Authentication Protocol Failed' }, { status: 500 });
    }
}
