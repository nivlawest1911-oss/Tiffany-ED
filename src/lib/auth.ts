/**
 * Auth configuration for Sovereign platform
 */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: (process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL) ? prismaAdapter(prisma, {
        provider: "postgresql",
    }) : undefined,
    secret: process.env.BETTER_AUTH_SECRET || "SOVEREIGN_OVAL_2027_FALLBACK_SECRET_FOR_BUILD",
    user: {
        additionalFields: {
            clerk_id: { type: "string", required: false },
            school_site: { type: "string", required: false },
            position: { type: "string", required: false },
            district: { type: "string", required: false },
            lastUplinkAt: { type: "date", required: false },
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (refreshes session automatically)
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
        },
    },
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
        defaultCookieAttributes: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        },
    },
    socialProviders: {
        ...(() => {
            const googleId = (process.env.GOOGLE_CLIENT_ID || '').trim();
            const googleSecret = (process.env.GOOGLE_CLIENT_SECRET || '').trim();
            const isGoogleValid = googleId !== '' && 
                                 !googleId.includes('placeholder') && 
                                 !googleId.startsWith('523925578373');
            return isGoogleValid && googleSecret ? {
                google: {
                    clientId: googleId,
                    clientSecret: googleSecret,
                    redirectURI: process.env.BETTER_AUTH_URL ? `${process.env.BETTER_AUTH_URL}/api/auth/callback/google` : undefined,
                }
            } : {};
        })(),
        ...(() => {
            const facebookId = (process.env.FACEBOOK_CLIENT_ID || '').trim();
            const facebookSecret = (process.env.FACEBOOK_CLIENT_SECRET || '').trim();
            const isFacebookValid = facebookId !== '' && 
                                   !facebookId.includes('placeholder') && 
                                   !facebookId.startsWith('your-') && 
                                   !facebookId.startsWith('mock-') &&
                                   !facebookId.startsWith('523925578373');
            return isFacebookValid && facebookSecret ? {
                facebook: {
                    clientId: facebookId,
                    clientSecret: facebookSecret,
                    redirectURI: process.env.BETTER_AUTH_URL ? `${process.env.BETTER_AUTH_URL}/api/auth/callback/facebook` : undefined,
                }
            } : {};
        })(),
    },
    onError: (error, request) => {
        console.error("Auth Error:", error);
    },
    plugins: [
        nextCookies()
    ],
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    // Institutional Uplink Sentinel: Runs after user creation
                    try {
                        const { uplinkUserProfile } = await import("./uplink");
                        await uplinkUserProfile(user.id, {
                            email: user.email,
                            name: user.name,
                            image: user.image || undefined,
                            schoolSite: (user as any).school_site || undefined,
                            position: (user as any).position || undefined,
                        });
                    } catch (error) {
                        console.error("[AUTH_DB_HOOK] Uplink Handshake Failed:", error);
                    }
                }
            }
        }
    },
    hooks: {
        after: async (ctx) => {
            // Refresh Uplink on Sign-In
            if ((ctx as any).path?.includes("sign-in")) {
                const session = (ctx as any).context?.newSession;
                if (session) {
                    const { user } = session;
                    try {
                        const { uplinkUserProfile } = await import("./uplink");
                        await uplinkUserProfile(user.id, {
                            email: user.email,
                            name: user.name,
                            image: user.image || undefined,
                            schoolSite: (user as any).school_site || undefined,
                            position: (user as any).position || undefined,
                            district: (user as any).district || undefined,
                        });
                    } catch (error) {
                        console.error("[AUTH_SIGNIN_HOOK] Uplink Handshake Failed:", error);
                    }
                }
            }
            // Social Login Audit Hook
            if ((ctx as any).path?.includes("callback/google") || (ctx as any).path?.includes("callback/facebook")) {
                const session = (ctx as any).context?.newSession;
                if (session) {
                    const { user } = session;
                    const provider = (ctx as any).path?.includes("google") ? "google" : "facebook";
                    const request = (ctx as any).context?.request;
                    const ip = request?.headers?.get('x-forwarded-for') || request?.headers?.get('x-real-ip') || 'unknown';
                    const userAgent = request?.headers?.get('user-agent') || 'unknown';
                    
                    try {
                        const { logSocialLoginSuccess } = await import("./actions/handshakes");
                        await logSocialLoginSuccess({
                            userId: user.id,
                            email: user.email,
                            provider: provider as 'google' | 'facebook',
                            ip,
                            userAgent
                        });
                    } catch (auditErr) {
                        console.error("[AUTH_SIGNIN_HOOK] Social Audit Logging Failed:", auditErr);
                    }
                }
            }
            return ctx;
        }
    }
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
