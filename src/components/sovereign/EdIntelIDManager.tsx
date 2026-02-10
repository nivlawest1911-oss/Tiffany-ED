'use client';

import { useEffect } from 'react';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';

interface EdIntelIDManagerProps {
    userSubscription: any;
}

export function EdIntelIDManager({ userSubscription }: EdIntelIDManagerProps) {
    const { setVibe } = useEdIntelVibe();

    useEffect(() => {
        if (userSubscription) {
            // Logic to sync subscription data with EdIntel Vibe
            // For now, we just ensure the vibe is initialized based on user status
            // This component can be expanded to handle real-time identity verification
            // and capability unlocking based on the subscription plan.

            // Example: If user has 'executive' plan, set vibe to 'noble' automatically?
            // For now, we'll just log or handle minimal state sync.
            const identity = {
                id: userSubscription.user_id,
                plan: userSubscription.plan || 'standard',
                status: userSubscription.status || 'active'
            };

            // Persist to local storage for other non-reactive components
            localStorage.setItem('EdIntel_identity', JSON.stringify(identity));
        }
    }, [userSubscription, setVibe]);

    // This component is non-visual logic manager
    return null;
}
