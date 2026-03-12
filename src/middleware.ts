import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    // 1. Refresh Supabase session (and get updated response)
    // This also handles setting/refreshing Supabase cookies
    let response = NextResponse.next({ request });
    try {
        response = await updateSession(request);
    } catch (err) {
        console.error("[Middleware] Exception in updateSession:", err);
        // Do not crash the site, we just proceed without refreshing the session
    }

    // 2. Define protected routes
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
        "/api" // Protect all API routes by default
    ];

    const publicApiRoutes = [
        "/api/auth",
        "/api/webhooks",
        "/api/status",
        "/api/og",
        "/api/public"
    ];

    const pathname = request.nextUrl.pathname;
    
    // Determine if the current route requires authentication
    let isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Refine API protection: allow public endpoints
    if (pathname.startsWith('/api')) {
        const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route));
        if (isPublicApi) {
            isProtectedRoute = false;
        }
    }

    // 3. Auth checks
    // We check for any Supabase auth cookies or our legacy session cookie
    const allCookies = request.cookies.getAll();
    const supabaseCookies = allCookies.filter(c =>
        c.name.startsWith('sb-') || c.name.includes('supabase-auth-token')
    );
    const hasSupabaseCookie = supabaseCookies.length > 0;
    const hasLegacySession = request.cookies.has('edintel_session');

    const isAuthenticated = hasSupabaseCookie || hasLegacySession;

    // 4. Case: Protected route but not authenticated
    if (isProtectedRoute && !isAuthenticated) {
        const url = new URL('/register', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

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
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
