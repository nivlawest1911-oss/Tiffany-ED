/**
 * Auth configuration for Sovereign platform
 */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";

// Lazy-initialized Prisma client for auth only
let _authPrisma: PrismaClient | null = null;
function getAuthPrisma() {
    if (!_authPrisma) {
        _authPrisma = new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        });
    }
    return _authPrisma;
}

// Lazy-initialized auth instance
let _auth: ReturnType<typeof betterAuth> | null = null;
function getAuth() {
    if (!_auth) {
        _auth = betterAuth({
            database: prismaAdapter(getAuthPrisma(), {
                provider: "postgresql",
            }),
            secret: process.env.BETTER_AUTH_SECRET || "SOVEREIGN_OVAL_2027_FALLBACK_SECRET_FOR_BUILD",
            emailAndPassword: {
                enabled: true,
                autoSignIn: true,
                requireEmailVerification: false,
            },
            socialProviders: {
                google: {
                    clientId: process.env.GOOGLE_CLIENT_ID || '',
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
                },
                facebook: {
                    clientId: process.env.FACEBOOK_CLIENT_ID || '',
                    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
                }
            },
        });
    }
    return _auth;
}

// Export auth as a getter proxy
export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
    get(_target, prop: string | symbol) {
        const authInstance = getAuth();
        const value = (authInstance as any)[prop];
        if (typeof value === 'function') {
            return value.bind(authInstance);
        }
        return value;
    },
});

export const handlers = {
    GET: (req: Request) => getAuth().handler(req),
    POST: (req: Request) => getAuth().handler(req),
};

export const api = new Proxy({} as any, {
    get(_target, prop: string | symbol) {
        return (getAuth().api as any)[prop];
    },
});

// Export getSession helper for server actions and legacy routes
export const getSession = async (options?: any) => {
    return getAuth().api.getSession(options);
};

/**
 * Institutional Security: Neural Handshake Helpers
 */
export async function encrypt(data: any) {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    if (typeof window === 'undefined') {
        const { createHash } = require('crypto');
        return createHash('sha256').update(payload).digest('hex');
    }
    return btoa(payload);
}

export async function login(credentials: any) {
    return await auth.api.signInEmail({
        body: credentials
    });
}

export async function logout() {
    return await auth.api.signOut({
        headers: new Headers()
    });
}

export async function loginWithSocial(provider: 'google' | 'facebook', callbackUrl?: string) {
    return await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: callbackUrl
        }
    });
}

export default auth;
