import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    // 1. Refresh Supabase session (and get updated response)
    // This also handles setting/refreshing Supabase cookies
    const response = await updateSession(request);

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
        "/onboarding"
    ];

    const pathname = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // 3. Auth checks
    // We check for any Supabase auth cookies or our legacy session cookie
    const allCookies = request.cookies.getAll();
    const supabaseCookies = allCookies.filter(c =>
        c.name.startsWith('sb-') || c.name.includes('supabase-auth-token')
    );
    const hasSupabaseCookie = supabaseCookies.length > 0;
    const hasLegacySession = request.cookies.has('edintel_session');

    const isAuthenticated = hasSupabaseCookie || hasLegacySession;

    // 🔬 Diagnostics (Only for debugging session issues)
    if (isProtectedRoute && !isAuthenticated) {
        console.log(`[AUTH_DIAG] Path: ${pathname} | Auth: FAILED`);
        console.log(`[AUTH_DIAG] Total Cookies: ${allCookies.length}`);
        console.log(`[AUTH_DIAG] SB Cookies: ${supabaseCookies.map(c => c.name).join(', ') || 'NONE'}`);
        console.log(`[AUTH_DIAG] Legacy Cookie: ${hasLegacySession ? 'FOUND' : 'MISSING'}`);
    }

    // 4. Case: Protected route but not authenticated
    if (isProtectedRoute && !isAuthenticated) {
        console.log(`[Middleware] Unauthorized access to ${pathname}. Redirecting to login.`);
        const url = new URL('/login', request.url);
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
