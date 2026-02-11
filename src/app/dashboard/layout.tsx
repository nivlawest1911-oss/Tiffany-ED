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
