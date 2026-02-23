import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    // 1. Refresh Supabase session (and get updated response)
    // This also handles setting/refreshing Supabase cookies
    let response = await updateSession(request);

    // 2. Define protected routes
    const protectedRoutes = [
        "/dashboard",
        "/academy",
        "/generators",
        "/gym",
        "/vault",
        "/tiffany-ed",
        "/wellness",
        "/excursions",
        "/the-room"
    ];

    const pathname = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // 3. Auth checks
    // We check for any Supabase auth cookies or our legacy session cookie
    const allCookies = request.cookies.getAll();
    const hasSupabaseCookie = allCookies.some(c =>
        c.name.startsWith('sb-') || c.name.includes('supabase-auth-token')
    );
    const hasLegacySession = request.cookies.has('session');

    const isAuthenticated = hasSupabaseCookie || hasLegacySession;

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
