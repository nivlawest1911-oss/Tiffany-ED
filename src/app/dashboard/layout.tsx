import { createEdIntelServerClient } from '@/lib/supabase-server';
import { EdIntelIDManager } from '@/components/edintel-core/EdIntelIDManager';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TacticalHeader } from '@/components/dashboard/TacticalHeader';
import { PageTransition } from '@/components/dashboard/PageTransition';
import { EdIntelVibeProvider } from '@/context/EdIntelVibeContext';
import { AmbientBackground } from '@/components/dashboard/AmbientBackground';
import MobileNavigation from '@/components/MobileNavigation';
import React from 'react';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createEdIntelServerClient();

    // 0. HANDLE UPLINK OFFLINE (Configuration Missing)
    if (!supabase) {
        console.warn('[DASHBOARD_LAYOUT] UPLINK_OFFLINE: Displaying Resilience Profile.');
        // Return layout with fallback data or a limited view
        return (
            <EdIntelVibeProvider>
                <div className="flex min-h-screen w-full bg-background text-foreground antialiased selection:bg-primary/30 overflow-hidden font-sans relative">
                    <AmbientBackground />
                    <EdIntelIDManager userSubscription={{ is_demo: true, tier: 'Sovereign Initiate' }} />
                    <div className="hidden md:block">
                        <Sidebar />
                    </div>
                    <div className="flex-1 flex flex-col min-h-screen relative md:ml-64 overflow-hidden">
                        <TacticalHeader />
                        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 pb-24 md:pb-8">
                            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                                <div className="p-12 bg-slate-900/50 backdrop-blur-3xl border border-amber-500/20 rounded-[2.5rem] shadow-2xl max-w-2xl">
                                    <h2 className="text-3xl font-black text-amber-500 uppercase tracking-tighter mb-4">Uplink Mode: Autonomous</h2>
                                    <p className="text-slate-400 text-lg">System communication is offline, but EdIntel is operating in local persistence mode. Some AI features may be synchronized upon restoration.</p>
                                    <div className="mt-8 flex justify-center gap-4">
                                        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-500/50">Persistence Active</span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <PageTransition>
                                        {children}
                                    </PageTransition>
                                </div>
                            </div>
                        </main>
                        {/* Mobile Navigation Interface (Tabs) */}
                        <div className="md:hidden">
                            <MobileNavigation />
                        </div>
                    </div>
                </div>
            </EdIntelVibeProvider>
        );
    }

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

                {/* 1. NANO-NAV: Slim, non-intrusive sidebar - Hidden on mobile */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <div className="flex-1 flex flex-col min-h-screen relative md:ml-64 overflow-hidden">
                    {/* 2. THE GLASS HEADER: Standardized top bar */}
                    <TacticalHeader />

                    {/* 3. SCROLLABLE CANVAS: Where the magic happens */}
                    <main className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 pb-24 md:pb-8">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>

                    {/* Mobile Navigation Interface (Tabs) */}
                    <div className="md:hidden">
                        <MobileNavigation />
                    </div>
                </div>
            </div>
        </EdIntelVibeProvider>
    );
}
