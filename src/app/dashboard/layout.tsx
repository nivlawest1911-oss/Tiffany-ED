import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { SovereignIDManager } from '@/components/SovereignIDManager';
import React from 'react';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient({ cookies });

    // Fetch the subscription data for the logged-in architect
    const { data: { session } } = await supabase.auth.getSession();

    let subscriptionData = null;

    if (session?.user) {
        const { data } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
        subscriptionData = data;

        // If we don't have subscription data but have a user, pass a constructed object or let the Manager handle null
        // The Manager handles userSubscription?.tier_name check, so passing subscriptionData (which might be null) should be fine,
        // but passing user_id is useful for the ID display.
        if (!subscriptionData) {
            subscriptionData = { user_id: session.user.id };
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col">
            {/* The Sovereign ID Manager acts as the persistent header */}
            <SovereignIDManager userSubscription={subscriptionData} />

            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>

            {/* Optional: Footer protocol for the Mobile County Rollout */}
            <footer className="p-4 border-t border-zinc-900 text-[10px] text-zinc-600 font-mono text-center">
                EDINTEL SOVEREIGN PROTOCOL v1.0 | MOBILE_AL_USA
            </footer>
        </div>
    );
}
