import { auth } from "@/lib/auth";

/**
 * Better Auth Next.js API Route Handler
 * Standardized for Sovereign Platform v2.0
 */
export async function POST(req: Request) {
    try {
        return await auth.handler(req);
    } catch (error) {
        console.error('[AUTH_ROUTE_ERROR]', error);
        return new Response(JSON.stringify({ error: 'UPLINK_OFFLINE', message: 'The authentication server is currently unable to reach the Sovereign Data Plane.' }), { 
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET(req: Request) {
    try {
        return await auth.handler(req);
    } catch (error) {
        console.error('[AUTH_ROUTE_ERROR]', error);
        return new Response(JSON.stringify({ error: 'UPLINK_OFFLINE', message: 'The authentication server is currently unable to reach the Sovereign Data Plane.' }), { 
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
