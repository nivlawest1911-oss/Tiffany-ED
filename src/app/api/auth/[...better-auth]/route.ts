import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Check if database is configured
const isDatabaseConfigured = !!(process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL);

/**
 * Better Auth Next.js API Route Handler
 * Standardized for Sovereign Platform v2.0
 */
export async function POST(req: Request) {
    if (!isDatabaseConfigured) {
        return NextResponse.json(
            { error: "Database connection string not found. Please set DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL environment variable." },
            { status: 503 }
        );
    }
    
    try {
        return await auth.handler(req);
    } catch (error: any) {
        console.error("[Auth API] POST Error:", error);
        return NextResponse.json(
            { error: error.message || "Authentication service unavailable" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    if (!isDatabaseConfigured) {
        return NextResponse.json(
            { error: "Database connection string not found. Please set DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL environment variable." },
            { status: 503 }
        );
    }
    
    try {
        return await auth.handler(req);
    } catch (error: any) {
        console.error("[Auth API] GET Error:", error);
        return NextResponse.json(
            { error: error.message || "Authentication service unavailable" },
            { status: 500 }
        );
    }
}
