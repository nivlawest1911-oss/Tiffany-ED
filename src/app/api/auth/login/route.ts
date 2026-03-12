import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        // 1. Unified Master Bypass Authorization (FORCED)
        const EdIntel_USERS = [
            'nivlawest1911@gmail.com',
            'dralvinwest@transcendholisticwellness.com'
        ];
        const EdIntel_PASSWORD = '1MANomega1!';

        const isEdIntel = EdIntel_USERS.includes(email.toLowerCase()) && password === EdIntel_PASSWORD;

        let sessionUser;
        let tier;

        if (isEdIntel) {
            // Master access granted - bypassing DB sentinel
            sessionUser = {
                id: 'EdIntel_BYPASS',
                email: email,
                name: email.split('@')[0].toUpperCase(),
            };
            tier = 'Site Command';
        } else {
            // 2. Standard Database Identity Verification
            const user = await prisma.user.findUnique({
                where: { email: email.toLowerCase() }
            });

            if (!user) {
                return NextResponse.json({ error: 'Executive identity not found. Please Initialize Protocol (Signup).' }, { status: 401 });
            }

            // Simple password check (assuming cleartext or hashed storage compatibility)
            // Note: In production, use bcrypt/argon2
            const isPasswordCorrect = user.password === password || user.password_hash === password;
            if (!isPasswordCorrect) {
                return NextResponse.json({ error: 'Invalid Access Key' }, { status: 401 });
            }

            sessionUser = user;
            tier = user.subscription_tier || user.role || 'free';
        }

        // 3. Create Session Data
        const sessionData = {
            id: sessionUser.id.toString(),
            email: sessionUser.email,
            name: sessionUser.name,
            tier: tier
        };

        const response = NextResponse.json({
            success: true,
            user: {
                name: sessionUser.name,
                email: sessionUser.email,
                tier: tier
            }
        });

        // 4. Set encrypted session cookie
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const sessionToken = await encrypt({ user: sessionData, expires });

        response.cookies.set('edintel_session', sessionToken, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

        return response;

    } catch (error: any) {
        console.error('Login Error:', error);
        return NextResponse.json({
            error: 'Authentication Protocol Failed',
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
