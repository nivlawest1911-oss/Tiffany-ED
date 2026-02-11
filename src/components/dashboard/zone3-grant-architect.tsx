import React from 'react';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { EdIntelPlayer } from '@/components/ui/EdIntelPlayer';

export function GrantArchitect() {
    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900 space-y-4">
            <div className="flex items-center gap-3">
                <Zap className="text-amber-400" size={20} />
                <h3 className="text-lg font-bold text-white">Grant Architect</h3>
            </div>

            {/* Embedded Strategy Briefing */}
            <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <EdIntelPlayer
                    src="/videos/EdTech_Solution_Video_Generation (1).mp4"
                    title="Protocol: Funding Acquisition"
                    poster="/images/avatars/Dr._alvin_west.png"
                />
            </div>

            <p className="text-sm text-slate-400">AI-driven proposal generation active.</p>
            <Link href="/generators/grant-narrative-architect" className="w-full">
                <button className="w-full py-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-bold uppercase hover:bg-amber-500/20 transition-colors">
                    Launch Generator
                </button>
            </Link>
        </div>
    );
}
