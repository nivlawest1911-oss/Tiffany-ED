import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Sovereign Middleware Audit
 * Gatekeeper for the Professional Shield, ensuring AL Code 290-8-9 session integrity.
 */
export async function middleware(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Ensure environment variables are present before initializing the client
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error('[0x-ERR] Middleware Initialization Failed: Missing Supabase Environment Variables');
        return response;
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    response.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    response.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // PROTECTED ROUTES: Intelligence Tools, Dashboard, and Connector Hub
    const protectedPaths = ['/dashboard', '/analytics', '/integrations', '/vault', '/ai-hub']
    const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

    if (isProtected && !user) {
        // 0x-ERR: UNAUTHORIZED. Rerouting to Protocol Login.
        const url = request.nextUrl.clone()
        url.pathname = '/auth'
        // Optional: Add redirect parameter
        url.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
