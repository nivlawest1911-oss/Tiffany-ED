import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { UserService } from '@/lib/services/user-service';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const error = requestUrl.searchParams.get('error');
    const errorDescription = requestUrl.searchParams.get('error_description');
    const next = requestUrl.searchParams.get('next') || '/dashboard';
    const origin = requestUrl.origin;

    // Handle OAuth provider errors (user cancelled, denied, etc.)
    if (error) {
        console.error(`[AUTH CALLBACK] OAuth error: ${error} — ${errorDescription}`);
        return NextResponse.redirect(
            `${origin}/login?error=${encodeURIComponent(errorDescription || error)}`
        );
    }

    if (!code) {
        console.error('[AUTH CALLBACK] No authorization code received');
        return NextResponse.redirect(`${origin}/login?error=missing_code`);
    }

    try {
        const supabase = await createClient();

        if (!supabase) {
            console.error('[AUTH CALLBACK] UPLINK_OFFLINE: Cannot exchange code.');
            return NextResponse.redirect(`${origin}/login?error=uplink_offline`);
        }

        const { data: { session }, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
            console.error('[AUTH CALLBACK] Code exchange failed:', exchangeError.message);
            return NextResponse.redirect(
                `${origin}/login?error=${encodeURIComponent(exchangeError.message)}`
            );
        }

        if (session?.user) {
            // UNIFIED SYNC: Ensure public.users record exists and tokens are initialized
            try {
                const { id, email, user_metadata } = session.user;
                const name = user_metadata?.full_name || email?.split('@')[0] || 'Educator';
                const avatar = user_metadata?.avatar_url || user_metadata?.picture;

                const processedUser = await UserService.syncUser(
                    id,
                    email!,
                    name,
                    avatar
                );

                console.log(`[AUTH CALLBACK] Synced user ${email} to EdIntel records. Tier: ${processedUser.tier}`);

                // OPTIMIZATION: Route them based on their specific module context
                // Director Pack and Practitioner tiers are routed to Wellness/Transcend dashboard
                const effectiveTier = processedUser.tier;

                if (effectiveTier === 'Director Pack' || effectiveTier === 'Practitioner') {
                    // Force Transcend Dashboard
                    return NextResponse.redirect(`${origin}/wellness`);
                }

                // For IEP/Education tiers or Free, route to Education dashboard
                if (effectiveTier === 'Sovereign Pack' || effectiveTier === 'Standard Pack' || effectiveTier === 'Site Command') {
                    return NextResponse.redirect(`${origin}/education`);
                }

                // Default fallback
                return NextResponse.redirect(`${origin}${next === '/dashboard' ? '/education' : next}`);

            } catch (err) {
                console.error("[AUTH CALLBACK] User sync failed:", err);
                // Continue anyway to dashboard if sync fails, don't block login
            }
        }

        return NextResponse.redirect(`${origin}${next}`);
    } catch (err: any) {
        console.error('[AUTH CALLBACK] Unexpected error:', err);
        return NextResponse.redirect(
            `${origin}/login?error=${encodeURIComponent('Authentication failed. Please try again.')}`
        );
    }
}
