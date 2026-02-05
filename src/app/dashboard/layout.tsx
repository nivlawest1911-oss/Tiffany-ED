import { createSovereignServerClient } from '@/lib/supabase-server';
import { SovereignIDManager } from '@/components/SovereignIDManager';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TacticalHeader } from '@/components/dashboard/TacticalHeader';
import { PageTransition } from '@/components/dashboard/PageTransition';
import { SovereignVibeProvider } from '@/context/SovereignVibeContext';
import { AmbientBackground } from '@/components/dashboard/AmbientBackground';
import React from 'react';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createSovereignServerClient();

    const { data: { session } } = await supabase.auth.getSession();

    let subscriptionData = null;

    if (session?.user) {
        const { data } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
        subscriptionData = data;

        if (!subscriptionData) {
            subscriptionData = { user_id: session.user.id };
        }
    }

    return (
        <SovereignVibeProvider>
            <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 selection:bg-amber-500/30 overflow-hidden font-sans relative">
                {/* 0. CINEMATIC AMBIENCE */}
                <AmbientBackground />

                <SovereignIDManager userSubscription={subscriptionData} />

                {/* 1. NANO-NAV: Slim, non-intrusive sidebar */}
                <Sidebar />

                <div className="flex-1 app-wrapper relative overflow-hidden">
                    {/* 2. THE GLASS HEADER: Standardized top bar */}
                    <TacticalHeader />

                    {/* 3. SCROLLABLE CANVAS: Where the magic happens */}
                    <main className="flex-1 overflow-y-auto p-10 lg:p-16 scrollbar-hide">
                        <div className="max-w-7xl mx-auto">
                            <PageTransition>
                                {children}
                            </PageTransition>
                        </div>
                    </main>
                </div>
            </div>
        </SovereignVibeProvider>
    );
}
