import { createSovereignServerClient } from '@/lib/supabase-server';
import React from 'react';
import { DesignBridge } from '@/components/DesignBridge';
import { StudioVideoSection } from '@/components/StudioVideoSection';

// Force dynamic since we use cookies/auth
export const dynamic = 'force-dynamic';

export default async function StudioPage() {
    const supabase = await createSovereignServerClient();

    const { data: { session } } = await supabase.auth.getSession();
    let userTier = "Sovereign Initiate";

    if (session?.user) {
        const { data } = await supabase
            .from('subscriptions')
            .select('tier_name')
            .eq('user_id', session.user.id)
            .single();
        if (data?.tier_name) {
            userTier = data.tier_name;
        }
    }

    const isCommandLevel = ['Site Command', 'Director Pack'].includes(userTier);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <header className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div>
                    <h2 className="text-2xl font-black text-zinc-100 tracking-tighter uppercase">Sovereign Studio</h2>
                    <p className="text-zinc-500 text-sm font-mono">NODE_AUTHORITY: {userTier}</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Creative Link Active</span>
                    <div className="h-1 bg-amber-500 w-32 mt-1 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                </div>
            </header>

            {/* 4-Quadrant Command Center */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Design Quadrant: Canva */}
                <div className="relative group">
                    <DesignBridge type="Canva" tier={userTier} />
                    <div className="mt-2 flex gap-2">
                        <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">Templates</span>
                        <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">Magic Write</span>
                    </div>
                </div>

                {/* Design Quadrant: Adobe Express */}
                <div className="relative group">
                    <DesignBridge type="Adobe Express" tier={userTier} />
                    <div className="mt-2 flex gap-2">
                        <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">Branding</span>
                        <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">Asset Lib</span>
                    </div>
                </div>

                <StudioVideoSection userTier={userTier} isCommandLevel={isCommandLevel} />
            </div>
        </div>
    );
}
