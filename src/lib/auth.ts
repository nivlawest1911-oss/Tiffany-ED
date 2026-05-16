/**
 * Auth configuration for Sovereign platform
 */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: process.env.DATABASE_URL ? prismaAdapter(prisma, {
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
    socialProviders: {
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }
        } : {}),
        ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET ? {
            facebook: {
                clientId: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            }
        } : {}),
    },
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
                        });
                    } catch (error) {
                        console.error("[AUTH_SIGNIN_HOOK] Uplink Handshake Failed:", error);
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
