'use client';

import { createClient } from '@/utils/supabase/client';
import { ROUTES } from '@/lib/routes';

/**
 * 🏛️ Bio-Auth Initiator: Handshakes with Google/Apple/Facebook for EdIntel Protocol Login.
 * Compliant with AL Code 290-8-9 auditing requirements.
 * Uses SSR-compatible Supabase browser client for proper session continuity.
 */
export async function initiateBioAuth(provider: 'google' | 'apple' | 'facebook') {
    const supabase = createClient();

    if (!supabase) {
        console.warn('🏛️ [EdIntel Auth Protocol Failure]: UPLINK_OFFLINE. Handshake unavailable.');
        return { error: 'Authentication Uplink is currently offline.' };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) {
        console.error('🏛️ [EdIntel Auth Protocol Failure]:', {
            message: error.message,
            provider,
            timestamp: new Date().toISOString()
        });
        return { error: error.message };
    }

    // Redirect to provider login
    if (data.url) {
        window.location.href = data.url;
    }

    return { error: null };
}
