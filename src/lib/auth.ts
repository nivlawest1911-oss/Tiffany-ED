import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || 'sovereign-secret-key-change-me';
const key = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Session lasts 24 hours
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function login(userData: { id: string; email: string; name: string; tier: string }) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const session = await encrypt({ user: userData, expires });

    // Use (await cookies()) as per newer Next.js patterns if needed, but cookies() is often synchronous-like enough in server actions/routes
    // Note: cookies().set() is only available in Server Actions or Route Handlers
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set('session', '', { expires: new Date(0) });
}

import { createClient } from '@/utils/supabase/server';

export async function getSession() {
    const cookieStore = await cookies();

    // 1. Try Supabase Session first (Modern)
    try {
        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            const metadata = session.user.user_metadata || {};
            return {
                user: {
                    id: session.user.id,
                    email: session.user.email!,
                    name: metadata.full_name || session.user.email?.split('@')[0] || 'Executive',
                    tier: metadata.tier || 'free'
                }
            };
        }
    } catch (e) {
        console.error("[AUTH] Supabase session check failed", e);
    }

    // 2. Fallback: Legacy JWT Session
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    if (!parsed) return;

    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
