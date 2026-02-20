import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { ROUTES } from '@/lib/routes';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({ name, value: '', ...options });
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // 1. Protect Admin Routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user || user.user_metadata?.role !== 'admin') {
            return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
        }
    }

    // 2. Protect Tiffany-ED Routes
    if (request.nextUrl.pathname.startsWith('/tiffany-ed')) {
        if (!user) {
            return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
        }
    }

    // 3. Protect Vault
    if (request.nextUrl.pathname.startsWith('/vault')) {
        if (!user) {
            return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
        }
    }

    // 4. Protect additional Sovereign Nodes
    const sovereignNodes = ['/analytics', '/integrations', '/dashboard', '/the-room'];
    if (sovereignNodes.some(path => request.nextUrl.pathname.startsWith(path))) {
        if (!user) {
            return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
        }
    }

    // 5. Redirect Logged In Users from Login Page
    if (request.nextUrl.pathname === ROUTES.LOGIN) {
        if (user) {
            if (user.user_metadata?.role === 'admin') {
                return NextResponse.redirect(new URL(ROUTES.ADMIN_DASHBOARD, request.url));
            }
            // Default redirect for all other logged-in users to the unified Room
            return NextResponse.redirect(new URL(ROUTES.THE_ROOM, request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         * - auth/callback (important to exclude from middleware to avoid loops)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth/callback).*)',
    ],
};
