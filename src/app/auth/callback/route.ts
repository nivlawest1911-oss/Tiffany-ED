import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { UserService } from '@/lib/services/user-service';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const origin = requestUrl.origin;

    if (code) {
        const supabase = await createClient();
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && session?.user) {
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
    }

    return NextResponse.redirect(`${origin}/dashboard`);
}
