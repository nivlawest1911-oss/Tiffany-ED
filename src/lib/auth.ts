/**
 * Auth configuration for Sovereign platform
 */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { getEnrichedUserCached } from "./request-cache";
import { resolveUserEntitlement } from "./rbac-stripe";

const baseURL =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    (process.env.NODE_ENV === "production" ? "https://edintelai.vercel.app" : "http://localhost:3000");

const authOptions = {
    database: (process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL) ? prismaAdapter(prisma, {
        provider: "postgresql" as const,
    }) : undefined,
    secret: process.env.BETTER_AUTH_SECRET || "SOVEREIGN_OVAL_2027_FALLBACK_SECRET_FOR_BUILD",
    baseURL,
    trustedOrigins: [
        baseURL,
        "https://edintelai.vercel.app",
        "https://tiffany-ed.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        process.env.BETTER_AUTH_URL,
        process.env.NEXT_PUBLIC_APP_URL,
    ].filter((origin, index, list) => Boolean(origin) && list.indexOf(origin) === index) as string[],
    user: {
        additionalFields: {
            clerk_id: { type: "string" as const, required: false },
            school_site: { type: "string" as const, required: false },
            position: { type: "string" as const, required: false },
            district: { type: "string" as const, required: false },
            lastUplinkAt: { type: "date" as const, required: false },
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5,
        },
    },
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
        defaultCookieAttributes: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            path: "/",
        },
    },
    socialProviders: {
        google: {
            clientId: (process.env.GOOGLE_CLIENT_ID || "").trim(),
            clientSecret: (process.env.GOOGLE_CLIENT_SECRET || "").trim(),
            redirectURI: `${baseURL}/api/auth/callback/google`,
        },
    },
    onError: (error: any) => {
        console.error("Auth Error:", error);
    },
    plugins: [
        nextCookies(),
        customSession(async ({ user, session }: { user: any; session: any }) => {
            const extra = await getEnrichedUserCached(user);
            const entitlementInfo = resolveUserEntitlement((user as any).subscription_tier || extra?.subscriptionTier);
            return {
                user: {
                    ...user,
                    ...extra,
                    subscription_tier: (user as any).subscription_tier || extra?.subscriptionTier || entitlementInfo.entitlement.name,
                    tierMissing: entitlementInfo.tierMissing,
                    tierWarning: entitlementInfo.tierWarning,
                    entitlement: entitlementInfo.entitlement,
                },
                session,
            };
        }),
    ],
    databaseHooks: {
        user: {
            create: {
                after: async (user: any) => {
                    try {
                        const { uplinkUserProfile } = await import("./uplink");
                        await uplinkUserProfile(user.id, {
                            email: user.email,
                            name: user.name,
                            image: user.image || undefined,
                            schoolSite: user.school_site || undefined,
                            position: user.position || undefined,
                        });
                    } catch (error) {
                        console.error("[AUTH_DB_HOOK] Uplink Handshake Failed:", error);
                    }
                }
            }
        }
    },
    hooks: {
        after: async (ctx: any) => {
            if (ctx?.path?.includes("sign-in")) {
                const session = ctx?.context?.newSession;
                if (session) {
                    const { user } = session;
                    try {
                        const { uplinkUserProfile } = await import("./uplink");
                        await uplinkUserProfile(user.id, {
                            email: user.email,
                            name: user.name,
                            image: user.image || undefined,
                            schoolSite: user.school_site || undefined,
                            position: user.position || undefined,
                            district: user.district || undefined,
                        });
                    } catch (error) {
                        console.error("[AUTH_SIGNIN_HOOK] Uplink Handshake Failed:", error);
                    }
                }
            }
            if (ctx?.path?.includes("callback/google")) {
                const session = ctx?.context?.newSession;
                if (session) {
                    const { user } = session;
                    const request = ctx?.context?.request;
                    const ip = request?.headers?.get('x-forwarded-for') || request?.headers?.get('x-real-ip') || 'unknown';
                    const userAgent = request?.headers?.get('user-agent') || 'unknown';
                    try {
                        const { logSocialLoginSuccess } = await import("./actions/handshakes");
                        await logSocialLoginSuccess({
                            userId: user.id,
                            email: user.email,
                            provider: "google",
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
};

export const auth = betterAuth(authOptions);

export const { handlers, api } = auth as any;
export const getSession = auth.api.getSession;

export async function encrypt(data: any) {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    if (typeof window === 'undefined') {
        const { createHash } = require('crypto');
        return createHash('sha256').update(payload).digest('hex');
    }
    return btoa(payload);
}

export async function login(credentials: any) {
    return await auth.api.signInEmail({ body: credentials });
}

export async function logout() {
    return await auth.api.signOut({ headers: new Headers() });
}

export async function loginWithSocial(provider: 'google' = 'google', callbackUrl?: string) {
    return await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: callbackUrl
        }
    });
}

export default auth;
