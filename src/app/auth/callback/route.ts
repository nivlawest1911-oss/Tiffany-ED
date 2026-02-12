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

                await UserService.syncUser(
                    id,
                    email!,
                    name,
                    avatar
                );
                console.log(`[AUTH CALLBACK] Synced user ${email} to EdIntel records.`);
            } catch (err) {
                console.error("[AUTH CALLBACK] User sync failed:", err);
                // Continue anyway, don't block login
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
