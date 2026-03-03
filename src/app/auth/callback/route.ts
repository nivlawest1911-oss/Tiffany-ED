import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { ROUTES } from '@/lib/routes';

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? ROUTES.TEACHER_LAB;

    if (code) {
        console.log('🏛️ [EdIntel_Auth] Initiating Code Exchange Protocol...');

        // Track cookies that need to be forwarded to the browser response
        const cookiesToForward: { name: string; value: string; options: CookieOptions }[] = [];

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        // Store cookie for forwarding to the final redirect response
                        cookiesToForward.push({ name, value, options });
                        // Also set on request so subsequent calls in this handler see it
                        request.cookies.set({ name, value, ...options });
                    },
                    remove(name: string, options: CookieOptions) {
                        cookiesToForward.push({ name, value: '', options: { ...options, maxAge: 0 } });
                        request.cookies.set({ name, value: '', ...options });
                    },
                },
            }
        );

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            console.log('🏛️ [EdIntel_Auth] Session Established. Verifying Sovereign Role...');
            const { data: { user } } = await supabase.auth.getUser();
            const role = user?.user_metadata?.role;

            // Determine redirect destination
            let redirectUrl = `${origin}${next}`;
            if (role === 'admin') {
                redirectUrl = `${origin}${ROUTES.ADMIN_DASHBOARD}`;
            } else if (role === 'teacher') {
                redirectUrl = `${origin}${ROUTES.TEACHER_LAB}`;
            }

            // Create the redirect response
            const response = NextResponse.redirect(redirectUrl);

            // CRITICAL: Forward ALL Supabase session cookies to the browser
            cookiesToForward.forEach(({ name, value, options }) => {
                response.cookies.set(name, value, {
                    ...options,
                    // Ensure cookies work across the site
                    path: options?.path || '/',
                    sameSite: (options as any)?.sameSite || 'lax',
                    secure: process.env.NODE_ENV === 'production',
                });
            });

            console.log(`🏛️ [EdIntel_Auth] Identity Verified: ${user?.email} | Role: ${role || 'standard'} | Cookies Set: ${cookiesToForward.length}`);

            // Trigger Identity Synchronization (fire-and-forget)
            if (user) {
                const syncUrl = new URL(ROUTES.AUTH_ME, request.url);
                fetch(syncUrl.toString(), {
                    headers: { cookie: cookiesToForward.map(c => `${c.name}=${c.value}`).join('; ') }
                }).catch(e => console.error('🏛️ [EdIntel_Auth] Sync Protocol Failed:', e));
            }

            return response;
        } else {
            console.error('🏛️ [EdIntel_Auth] Code Exchange Failure:', error.message);
        }
    }

    console.warn('🏛️ [EdIntel_Auth] Authentication Protocol Aborted. Rerouting to Sentinel Login.');
    return NextResponse.redirect(`${origin}${ROUTES.LOGIN}?error=auth_callback_failed`);
}
