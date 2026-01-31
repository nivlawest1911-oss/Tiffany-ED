import { supabase } from '@/lib/supabase';

/**
 * 🏛️ Bio-Auth Initiator: Handshakes with Google/Apple for Sovereign Protocol Login.
 * Compliant with AL Code 290-8-9 auditing requirements.
 */
export async function initiateBioAuth(provider: 'google' | 'apple') {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) {
        console.error('Sovereign Auth Protocol Failure:', error.message);
        return;
    }

    // Redirect to provider login
    if (data.url) {
        window.location.href = data.url;
    }
}
