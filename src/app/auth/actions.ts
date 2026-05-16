'use client';

import { signIn } from '@/lib/auth-client';
import { ROUTES } from '@/lib/routes';

/**
 * 🛰️ Bio-Auth Initiator: Handshakes with Google/Apple/Facebook for EdIntel Protocol Login.
 * Compliant with AL Code 290-8-9 auditing requirements.
 * Transitioned to Better Auth for production-grade session persistence.
 */
export async function initiateBioAuth(provider: 'google' | 'apple' | 'facebook') {
    try {
        await signIn.social({
            provider: provider as any,
            callbackURL: ROUTES.DASHBOARD || '/dashboard',
        });
        return { error: null };
    } catch (error: any) {
        console.error('🛰️ [EdIntel Auth Protocol Failure]:', {
            message: error.message,
            provider,
            timestamp: new Date().toISOString()
        });
        return { error: error.message };
    }
}
