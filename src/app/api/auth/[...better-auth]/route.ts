import { auth } from "@/lib/auth";

/**
 * Better Auth Next.js API Route Handler
 * Standardized for Sovereign Platform v2.0
 */
export async function POST(req: Request) {
    return await auth.handler(req);
}

export async function GET(req: Request) {
    return await auth.handler(req);
}
