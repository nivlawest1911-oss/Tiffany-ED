import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { ROUTES } from '@/lib/routes';

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? ROUTES.TEACHER_LAB; // Default fallback

    if (code) {
        console.log('🏛️ [EdIntel_Auth] Initiating Code Exchange Protocol...');
        const cookieStore = request.cookies;
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.set({ name, value: '', ...options });
                    },
                },
            }
        );

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            console.log('🏛️ [EdIntel_Auth] Session Established. Verifying Sovereign Role...');
            const { data: { user } } = await supabase.auth.getUser();
            const role = user?.user_metadata?.role;

            console.log(`🏛️ [EdIntel_Auth] Identity Verified: ${user?.email} | Role: ${role || 'standard'}`);

            if (role === 'admin') {
                return NextResponse.redirect(`${origin}${ROUTES.ADMIN_DASHBOARD}`);
            } else if (role === 'teacher') {
                return NextResponse.redirect(`${origin}${ROUTES.TEACHER_LAB}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        } else {
            console.error('🏛️ [EdIntel_Auth] Code Exchange Failure:', error.message);
        }
    }

    // Role verification failed or code exchange error
    console.warn('🏛️ [EdIntel_Auth] Authentication Protocol Aborted. Rerouting to Sentinel Login.');
    return NextResponse.redirect(`${origin}${ROUTES.LOGIN}?error=auth_callback_failed`);
}
