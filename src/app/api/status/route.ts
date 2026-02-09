import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
    const statusReport: Record<string, string> = {
        platform: "EdIntel Sovereign OS",
        environment: process.env.NODE_ENV || "unknown",
        timestamp: new Date().toISOString(),
        supabase: "PENDING",
        gemini: "PENDING",
        stripe: "PENDING",
        heygen: "PENDING",
    }

    // 1. Supabase handshake
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        statusReport.supabase = "CONFIGURED"
    } else {
        statusReport.supabase = "NOT CONFIGURED - Add env vars"
    }

    // 2. Gemini handshake
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        statusReport.gemini = "CONFIGURED"
    } else {
        statusReport.gemini = "NOT CONFIGURED - Add GOOGLE_GENERATIVE_AI_API_KEY"
    }

    // 3. Stripe handshake
    if (process.env.STRIPE_SECRET_KEY) {
        statusReport.stripe = "CONFIGURED"
    } else {
        statusReport.stripe = "NOT CONFIGURED - Add STRIPE_SECRET_KEY"
    }

    // 4. HeyGen handshake
    if (process.env.HEYGEN_API_KEY) {
        statusReport.heygen = "CONFIGURED"
    } else {
        statusReport.heygen = "NOT CONFIGURED - Add HEYGEN_API_KEY"
    }

    return NextResponse.json(statusReport)
}
