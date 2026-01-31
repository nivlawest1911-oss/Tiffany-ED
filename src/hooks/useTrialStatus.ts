import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useTrialStatus = (siteId: string) => {
    const [trialData, setTrialData] = useState<{
        remainingDays: number | null;
        isExpiring: boolean;
        status: string | null;
    }>({ remainingDays: null, isExpiring: false, status: null });

    useEffect(() => {
        if (!siteId) return;

        const checkTrial = async () => {
            const { data, error } = await supabase
                .from('school_sites')
                .select('trial_expiry, subscription_status')
                .eq('id', siteId)
                .single();

            if (error) {
                console.error('[0x-ERR] Trial check failed:', error);
                return;
            }

            if (data && data.subscription_status === 'trial') {
                const expiry = new Date(data.trial_expiry);
                const now = new Date();
                const diffMs = expiry.getTime() - now.getTime();
                const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

                setTrialData({
                    remainingDays: Math.max(0, diffDays),
                    isExpiring: diffDays <= 2, // Trigger alert at 48-hour mark
                    status: 'trial'
                });
            } else if (data) {
                setTrialData({
                    remainingDays: null,
                    isExpiring: false,
                    status: data.subscription_status
                });
            }
        };

        checkTrial();
    }, [siteId]);

    return trialData;
};
