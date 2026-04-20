import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sovereign Institutional Sentinel (Middleware)
 * 
 * Performance-optimized session validation using manual cookie parsing.
 * This bypasses the need for the heavy Auth/Prisma modules in the Edge Runtime,
 * resolving 'eval' conflicts and reducing latency.
 */

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // 1. Better Auth Session Protocol (Edge-Safe)
    // We check for the session cookie directly to avoid Edge/eval conflicts
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
        "/onboarding"
    ];

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // 3. Institutional Sentinel: Authentication Interception
    if (isProtectedRoute && !isAuthenticated) {
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // 4. Case: Already authenticated but hitting root
    if (isAuthenticated && pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard/cognitive', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Public assets like .svg, .png, etc.
         * - Authentication endpoints (api/auth)
         */
        '/((?!api/auth|_next/static|_next/image|_vercel|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|json|map)$).*)',
    ],
};
