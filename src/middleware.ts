import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // 1. Skip Supabase logic for static assets and public landing page (unless cookies present)
    // We check for any Supabase auth cookies or our legacy session cookie
    const cookies = request.cookies.getAll();
    const hasSupabaseCookie = cookies.some(c =>
        c.name.startsWith('sb-') || c.name.includes('supabase-auth-token')
    );
    const hasLegacySession = request.cookies.has('edintel_session');
    const isAuthenticated = hasSupabaseCookie || hasLegacySession;

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
        "/api"
    ];

    const publicApiRoutes = [
        "/api/auth",
        "/api/webhooks",
        "/api/status",
        "/api/og",
        "/api/public"
    ];

    let isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    if (pathname.startsWith('/api')) {
        const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route));
        if (isPublicApi) isProtectedRoute = false;
    }

    // 3. Handle authenticated redirect for root and login paths immediately
    if ((pathname === '/' || pathname === '/login') && isAuthenticated) {
        return NextResponse.redirect(new URL('/the-room', request.url));
    }

    // 4. Case: Protected route but not authenticated
    if (isProtectedRoute && !isAuthenticated) {
        const url = new URL('/register', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // 5. Refresh Supabase session ONLY for protected routes or if cookies are already present
    // This significantly reduces TTFB for guest users on the landing page
    let response = NextResponse.next({ request });
    if (isProtectedRoute || hasSupabaseCookie) {
        try {
            response = await updateSession(request);
        } catch (err) {
            console.error("[Middleware] Exception in updateSession:", err);
        }
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
        '/((?!api|_next/static|_next/image|_vercel|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|json|map)$).*)',
    ],
};
