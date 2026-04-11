'use client';

import { createClient } from '@/utils/supabase/client';
import { ROUTES } from '@/lib/routes';

// NOTE: This file is intentionally 'use client' — it runs in the browser
// and uses window.location for OAuth redirects. It is NOT a server action file.

/**
 * 🏛️ Bio-Auth Initiator: Handshakes with Google/Apple/Facebook for EdIntel Protocol Login.
 * Compliant with AL Code 290-8-9 auditing requirements.
 * Uses SSR-compatible Supabase browser client for proper session continuity.
 */
export async function initiateBioAuth(provider: 'google' | 'apple' | 'facebook') {
    const supabase = createClient();

    if (!supabase) {
        const msg = 'Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.';
        console.error('[EdIntel Auth] UPLINK_OFFLINE:', msg);
        return { error: msg };
    }

    const redirectTo = `${window.location.origin}${ROUTES.AUTH_CALLBACK}`;

    // Google supports offline access + consent prompt; Facebook does not
    const queryParams = provider === 'google'
        ? { access_type: 'offline', prompt: 'consent' }
        : {};

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo,
            queryParams,
            skipBrowserRedirect: false,
        },
    });

    if (error) {
        console.error('[EdIntel Auth] OAuth initiation failed:', {
            message: error.message,
            provider,
            timestamp: new Date().toISOString(),
        });
        return { error: error.message };
    }

    // Redirect browser to the OAuth provider's login page
    if (data?.url) {
        window.location.href = data.url;
    } else {
        return { error: 'No redirect URL returned from authentication provider.' };
    }

    return { error: null };
}
