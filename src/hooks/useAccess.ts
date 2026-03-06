'use client';

import { useEffect, useState, useCallback } from 'react';
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

                // Query the correct column 'subscription_tier' based on Prisma mapping
                const { data: user, error } = await supabase
                    .from('users')
                    .select('subscription_tier')
                    .eq('id', session.user.id)
                    .single();

                if (error || !user) {
                    console.error('Error fetching user tier:', error);
                    setHasAccess(false);
                } else {
                    setUserTier(user.subscription_tier);
                    setHasAccess(true);
                }

            } catch (error) {
                console.error('Access check failed:', error);
            } finally {
                setLoading(false);
            }
        }

        checkAccess();
    }, [supabase]);

    const checkPermission = useCallback((requiredPermission: string): boolean => {
        if (!userTier) return false;
        const tierConfig = EDINTEL_TIERS[userTier];
        // Fallback for custom tiers not in config or legacy values
        if (!tierConfig) return false;

        return tierConfig.permissions.some(p => {
            if (p === requiredPermission) return true;
            if (p.endsWith(':all')) {
                const scope = p.split(':')[0];
                const requiredScope = requiredPermission.split(':')[0];
                return scope === requiredScope;
            }
            return false;
        });
    }, [userTier]);

    return { loading, hasAccess, userTier, checkPermission };
}
