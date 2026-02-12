import { createEdIntelServerClient } from '@/lib/supabase-server';
import { EdIntelIDManager } from '@/components/edintel-core/EdIntelIDManager';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TacticalHeader } from '@/components/dashboard/TacticalHeader';
import { PageTransition } from '@/components/dashboard/PageTransition';
import { EdIntelVibeProvider } from '@/context/EdIntelVibeContext';
import { AmbientBackground } from '@/components/dashboard/AmbientBackground';
import React from 'react';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createEdIntelServerClient();

    let subscriptionData = null;

    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            const { data, error } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

            if (!error) {
                subscriptionData = data;
            } else {
                console.warn('[DASHBOARD_LAYOUT] Subscription fetch warning:', error.message);
                subscriptionData = { user_id: session.user.id };
            }
        }
    } catch (err) {
        console.error('[DASHBOARD_LAYOUT] Critical Auth Fail:', err);
    }

    return (
        <EdIntelVibeProvider>
            <div className="flex min-h-screen w-full bg-background text-foreground antialiased selection:bg-primary/30 overflow-hidden font-sans relative">
                {/* 0. CINEMATIC AMBIENCE */}
                <AmbientBackground />

                <EdIntelIDManager userSubscription={subscriptionData} />

                {/* 1. NANO-NAV: Slim, non-intrusive sidebar */}
                <Sidebar />

                <div className="flex-1 flex flex-col min-h-screen relative ml-64 overflow-hidden">
                    {/* 2. THE GLASS HEADER: Standardized top bar */}
                    <TacticalHeader />

                    {/* 3. SCROLLABLE CANVAS: Where the magic happens */}
                    <main className="flex-1 overflow-y-auto scrollbar-hide p-8">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>
                </div>
            </div>
        </EdIntelVibeProvider>
    );
}
