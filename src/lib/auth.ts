/**
 * Auth configuration for Sovereign platform
 */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

// Check if database is configured
const isDatabaseConfigured = !!(process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL);

// Check if social providers are configured
const isGoogleConfigured = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const isFacebookConfigured = !!(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET);

// Build social providers config only for configured providers
const socialProviders: Record<string, any> = {};
if (isGoogleConfigured) {
    socialProviders.google = {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    };
}
if (isFacebookConfigured) {
    socialProviders.facebook = {
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    };
}

export const auth = betterAuth({
    database: isDatabaseConfigured ? prismaAdapter(prisma, {
        provider: "postgresql",
    }) : undefined as any,
    secret: process.env.BETTER_AUTH_SECRET || "SOVEREIGN_OVAL_2027_FALLBACK_SECRET_FOR_BUILD",
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false,
    },
    socialProviders: Object.keys(socialProviders).length > 0 ? socialProviders : undefined,
});

export const { handlers, api } = auth as any;
// Export getSession helper for server actions and legacy routes
export const getSession = auth.api.getSession;

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
