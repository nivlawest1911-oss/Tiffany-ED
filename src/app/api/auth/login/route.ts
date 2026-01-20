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
        // "Access Key" is treated as password
        const result = await sql`
            SELECT * FROM users WHERE email = ${email} LIMIT 1;
        `;

        const user = result.rows[0];

        if (!user) {
            // For DEMO purposes: If user doesn't exist, we might auto-create OR fail.
            // Let's FAIL to force Signup, OR implement a clever "demo mode".
            // Given "Professional" vibe, let's be strict but friendly.
            return NextResponse.json({ error: 'Executive identity not found. Please Initialize Protocol (Signup).' }, { status: 401 });
        }

        // 2. Verify Password
        // Simple comparison for MVP/Demo "Access Key"
        // In prod: const isValid = await bcrypt.compare(password, user.password);
        // For now, assume password stored is cleartext OR just accept any key for "Demo" convenience if you prefer, 
        // BUT strict is better. Let's assume cleartext for this specific "Access Key" demo if not hashed.
        // If we want to be secure, we hashing in signup.

        // Let's assume simple check:
        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid Access Key' }, { status: 401 });
        }

        // 3. Create Session
        await login({
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            tier: user.tier || 'free'
        });

        return NextResponse.json({ success: true, user: { name: user.name, email: user.email, tier: user.tier } });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Authentication Protocol Failed' }, { status: 500 });
    }
}
