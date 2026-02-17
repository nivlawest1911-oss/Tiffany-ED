'use client';

import { useEffect, useState } from 'react';
import { EDINTEL_TIERS } from '@/config/tiers';
// Assuming you have a user context or hook from Supabase/Auth
// If not, we'll need to mock or fetch it. For now, I'll assume usage with createBrowserClient of Supabase
import { createClient } from '@/utils/supabase/client';

export function useAccess() {
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [userTier, setUserTier] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        async function checkAccess() {
            if (!supabase) {
                console.warn('[EDINTEL_SAFE_UPLINK] Supabase client unavailable.');
                setLoading(false);
                return;
            }
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    setHasAccess(false);
                    setLoading(false);
                    return;
                }

                // Fetch user profile to get tier
                // This assumes your public.users table has a 'tier' column or similar relation
                // We'll need to verify the table schema. 
                // Based on previous context, we might be storing tier in user metadata or a profile table.
                // For now, let's try to query the 'users' table or 'profiles' table if it exists.
                // If the schema isn't fully clear, we'll default to a safe lookup.

                const { data: user, error } = await supabase
                    .from('users')
                    .select('tier')
                    .eq('id', session.user.id)
                    .single();

                if (error || !user) {
                    console.error('Error fetching user tier:', error);
                    setHasAccess(false);
                } else {
                    setUserTier(user.tier);
                    setHasAccess(true); // User is logged in and has a profile
                }

            } catch (error) {
                console.error('Access check failed:', error);
            } finally {
                setLoading(false);
            }
        }

        checkAccess();
    }, [supabase]);

    const checkPermission = (requiredPermission: string): boolean => {
        if (!userTier) return false;
        const tierConfig = EDINTEL_TIERS[userTier];
        if (!tierConfig) return false;

        // Allow wildcard matching (e.g., 'admin:all' access 'admin:read')
        // Simple strategy: exact match or wildcard parent
        return tierConfig.permissions.some(p => {
            if (p === requiredPermission) return true;
            if (p.endsWith(':all')) {
                const scope = p.split(':')[0];
                const requiredScope = requiredPermission.split(':')[0];
                return scope === requiredScope;
            }
            return false;
        });
    };

    return { loading, hasAccess, userTier, checkPermission };
}
