import { NextResponse } from "next/server"

export async function GET() {
    const isOk = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const statusReport: Record<string, string> = {
        platform: "EdIntel EdIntel OS",
        environment: process.env.NODE_ENV || "unknown",
        timestamp: new Date().toISOString(),
        supabase: isOk ? "CONFIGURED" : "NOT CONFIGURED - Add env vars",
        gemini: process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "CONFIGURED" : "NOT CONFIGURED - Add GOOGLE_GENERATIVE_AI_API_KEY",
        stripe: process.env.STRIPE_SECRET_KEY ? "CONFIGURED" : "NOT CONFIGURED - Add STRIPE_SECRET_KEY",
        heygen: process.env.HEYGEN_API_KEY ? "CONFIGURED" : "NOT CONFIGURED - Add HEYGEN_API_KEY",
    };

    const status = isOk ? 200 : 503;
    const cacheControl = isOk
        ? "public, s-maxage=30, stale-while-revalidate=60"
        : "no-store, no-cache, must-revalidate";

    return NextResponse.json(statusReport, {
        status,
        headers: {
            "Cache-Control": cacheControl,
        },
    });
}
