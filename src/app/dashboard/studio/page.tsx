import { createEdIntelServerClient } from '@/lib/supabase-server';
import React from 'react';
import { DesignBridge } from '@/components/DesignBridge';
import { StudioVideoSection } from '@/components/StudioVideoSection';
import { EdIntelPod } from '@/components/dashboard/EdIntelPod';
import { LivingCard } from '@/components/dashboard/LivingCard';

// Force dynamic since we use cookies/auth
export const dynamic = 'force-dynamic';

export default async function StudioPage() {
    const supabase = await createEdIntelServerClient();

    let userTier = "Sovereign Initiate";

    if (supabase) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data, error } = await supabase
                    .from('subscriptions')
                    .select('tier_name')
                    .eq('user_id', session.user.id)
                    .single();

                if (!error && data?.tier_name) {
                    userTier = data.tier_name;
                } else if (error) {
                    console.warn('[STUDIO_PAGE] Subscription sync warning:', error.message);
                }
            }
        } catch (err) {
            console.error('[STUDIO_PAGE] Critical Auth Sync Failure:', err);
        }
    }

    const isCommandLevel = ['Site Command', 'Director Pack'].includes(userTier);

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* HEADER SECTION: Identity & Purpose */}
            <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase text-zinc-100 italic">
                        EdIntel <span className="text-amber-500">Studio</span>
                    </h1>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2">
                        Creative Engine // Mobile County District_049
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Studio Status</span>
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] mt-1 tracking-widest">
                        <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        ALL SYSTEMS NOMINAL
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* TOP LEFT: PRIMARY VIDEO ENGINE (7 Cols) */}
                <div className="col-span-12 lg:col-span-7">
                    <StudioVideoSection userTier={userTier} isCommandLevel={isCommandLevel} />
                </div>

                {/* TOP RIGHT: ASSET STATS & BRANDING (5 Cols) */}
                <div className="col-span-12 lg:col-span-5 space-y-8">
                    <EdIntelPod title="Asset Intelligence" value="128" status="ready">
                        Total AI-generated assets for this site authority.
                        <div className="mt-6 flex flex-col gap-2">
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[60%] animate-pulse-slow" />
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">
                                <span>Storage: 4.2GB</span>
                                <span>{"//"}</span>
                                <span>Limit: 10GB</span>
                            </div>
                        </div>
                    </EdIntelPod>

                    <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl backdrop-blur-sm">
                        <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6">District Brand Kit</h4>
                        <div className="flex gap-4">
                            <div className="group relative">
                                <div className="h-12 w-12 rounded-xl bg-amber-500 shadow-[0_4px_15px_rgba(245,158,11,0.2)]" />
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">#F59E0B</span>
                            </div>
                            <div className="group relative">
                                <div className="h-12 w-12 rounded-xl bg-zinc-800 border border-zinc-700" />
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">#27272A</span>
                            </div>
                            <div className="group relative">
                                <div className="h-12 w-12 rounded-xl bg-zinc-100" />
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">#F4F4F5</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM FULL WIDTH: DESIGN BRIDGE (12 Cols) */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <LivingCard
                        videoUrl="/videos/features/lesson-planner-demo.mp4"
                        title="AI Design Engine"
                    >
                        <DesignBridge type="Canva" tier={userTier} />
                    </LivingCard>
                    <LivingCard
                        videoUrl="/videos/features/iep-architect-demo.mp4"
                        title="Compliance Branding"
                    >
                        <DesignBridge type="Adobe Express" tier={userTier} />
                    </LivingCard>
                </div>
            </div>
        </div>
    );
}
