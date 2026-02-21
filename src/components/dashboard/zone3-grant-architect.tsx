import React from 'react';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { EdIntelPlayer } from '@/components/ui/EdIntelPlayer';
import GlassPanel from '@/components/ui/GlassPanel';
import SovereignButton from '@/components/ui/SovereignButton';

export function GrantArchitect() {
    return (
        <GlassPanel className="p-6 h-full space-y-4 group">
            <div className="flex items-center gap-3">
                <Zap className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" size={20} />
                <h3 className="text-lg font-bold text-white tracking-tight">Grant Architect</h3>
            </div>

            {/* Embedded Strategy Briefing */}
            <div className="relative rounded-lg overflow-hidden border border-white/5 shadow-lg group-hover:border-emerald-500/30 transition-colors duration-500">
                <EdIntelPlayer
                    src="/videos/EdTech_Solution_Video_Generation_v1.mp4"
                    title="Protocol: Funding Acquisition"
                    poster="/images/avatars/Dr._alvin_west.png"
                />
            </div>

            <p className="text-sm text-white/50 font-medium pb-2">AI-driven proposal generation active.</p>
            <Link href="/generators/grant-narrative-architect" className="block w-full">
                <SovereignButton variant="glass" className="w-full">
                    Launch Generator
                </SovereignButton>
            </Link>
        </GlassPanel>
    );
}
