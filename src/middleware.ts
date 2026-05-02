import { NextResponse, type NextRequest } from 'next/server';
import { authRateLimit, apiRateLimit } from '@/lib/ratelimit';

/**
 * Sovereign Institutional Sentinel (Middleware)
 * 
 * Performance-optimized session validation, rate limiting, and security headers.
 */

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // 0. Sentinel Lockdown Protocol: Maintenance Mode
    if (process.env.MAINTENANCE_MODE === 'true' && !pathname.startsWith('/api/health')) {
        return new NextResponse(
            JSON.stringify({ 
                error: 'Sentinel Lockdown: Active.',
                message: 'The Sovereign institutional node is currently undergoing maintenance or high-risk synchronization. System integrity is prioritized.',
                status: 'LOCKDOWN'
            }), 
            { 
                status: 503, 
                headers: { 'Content-Type': 'application/json', 'Retry-After': '3600' } 
            }
        );
    }

    // 1. Institutional Hardening: Rate Limiting
    const ip = (request as any).ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    
    // Apply API Rate Limiting to sensitive telemetry nodes
    if (pathname.startsWith('/api/fleet') || pathname.startsWith('/api/wellness')) {
        try {
            const { success, limit, reset, remaining } = await apiRateLimit.limit(ip);
            if (!success) {
                return new NextResponse(
                    JSON.stringify({ 
                        error: 'Sovereign Protocol: Rate Limit Exceeded.',
                        message: 'Your institutional node is being throttled to preserve system integrity.',
                        retryAfter: reset
                    }), 
                    { 
                        status: 429, 
                        headers: { 
                            'Content-Type': 'application/json',
                            'X-RateLimit-Limit': limit.toString(),
                            'X-RateLimit-Remaining': remaining.toString(),
                            'X-RateLimit-Reset': reset.toString(),
                        } 
                    }
                );
            }
        } catch (error) {
            console.error('API Rate limiting error:', error);
            // Fail open if KV is unreachable or unconfigured
        }
    }

    // Apply Auth Rate Limiting to handshakes and login attempts
    if (pathname.startsWith('/api/auth') || pathname.includes('login') || pathname.includes('signup')) {
        try {
            const { success } = await authRateLimit.limit(ip);
            if (!success) {
                return new NextResponse(
                    JSON.stringify({ error: 'Authentication Throttled.', message: 'Too many handshake attempts. Please wait for the neural cooldown.' }),
                    { status: 429, headers: { 'Content-Type': 'application/json' } }
                );
            }
        } catch (error) {
            console.error('Auth Rate limiting error:', error);
            // Fail open if KV is unreachable or unconfigured
        }
    }

    // 1. Better Auth Session Protocol (Edge-Safe)
    const sessionCookie = request.cookies.get('better-auth.session-token');
    const isAuthenticated = !!sessionCookie;

    // 2. Define neural protected routes
    const protectedRoutes = [
        "/dashboard",
        "/academy",
        "/generators",
        "/conversation",
        "/gym",
        "/vault",
        "/tiffany-ed",
        "/wellness",
        "/excursions",
        "/the-room",
        "/onboarding",
        "/fleet"
    ];

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // 3. Institutional Sentinel: Authentication Interception
    if (isProtectedRoute && !isAuthenticated) {
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // 4. Case: Already authenticated but hitting root or login
    if (isAuthenticated && (pathname === '/' || pathname === '/login')) {
        return NextResponse.redirect(new URL('/the-room', request.url));
    }

    // 5. Security Headers
    const response = NextResponse.next();
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Public assets like .svg, .png, etc.
         */
        '/((?!_next/static|_next/image|_vercel|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|json|map)$).*)',
    ],
};
