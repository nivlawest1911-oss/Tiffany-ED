import { useAuth } from '@/context/AuthContext';

/**
 * useUserSession
 * 
 * A decoupled hook for accessing the current institutional session.
 * By wrapping our auth provider, we ensure that if we ever switch from 
 * Supabase to another identity provider, our UI components stay locked.
 */
export function useUserSession() {
    const { user, isLoading, logout } = useAuth();

    // Map the internal auth user to a clean "API Contract"
    const session = user ? {
        id: user.id,
        email: user.email,
        name: user.name,
        tier: user.tier,
        usageTokens: user.usageTokens,
        trialEndsAt: user.trialEndsAt,
        isActive: !!user.id,
    } : null;

    return {
        session,
        isLoading,
        logout,
    };
}
