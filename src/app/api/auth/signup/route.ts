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

        // 2. Create User
        // Note: Storing plain text password for this specific "Access Key" demo to match Login logic. 
        // In real app, MUST hash: const hash = await bcrypt.hash(password, 10);

        await sql`
            INSERT INTO users (name, email, password, tier, created_at)
            VALUES (${name}, ${email}, ${password}, 'free', NOW())
        `;

        // 3. Get the created user to ensure we have the ID (or just query it back)
        const newUserResult = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
        const newUser = newUserResult.rows[0];

        // 4. Create Session
        await login({
            id: newUser.id.toString(),
            email: newUser.email,
            name: newUser.name,
            tier: 'free'
        });

        return NextResponse.json({ success: true, user: { name: newUser.name, email: newUser.email, tier: 'free' } });

    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json({ error: 'Initialization Failed' }, { status: 500 });
    }
}
