'use client';

import React from 'react';

interface PrincipalTacticalHUDProps {
    _siteMetrics?: any;
    tier: string;
}

export const PrincipalTacticalHUD = ({ _siteMetrics, tier }: PrincipalTacticalHUDProps) => {
    // Only Site Command and Director Pack see the HUD
    const isLeadership = ['Site Command', 'Director Pack'].includes(tier);

    if (!isLeadership) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* Morning Briefing Node */}
            <div className="p-5 bg-zinc-900/50 backdrop-blur-sm border-l-2 border-amber-500 rounded-r-xl group hover:bg-zinc-800/80 transition-all">
                <h4 className="text-[10px] font-mono text-amber-500 uppercase mb-2 tracking-widest font-black">Morning Synthesis</h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                    Site status is <span className="text-emerald-500 font-bold">OPTIMAL</span>.
                    <br />
                    <span className="text-[10px] text-zinc-500 uppercase mt-2 block">Recommendation: Review 3 compliance flags for the upcoming state audit.</span>
                </p>
            </div>

            {/* Staff Morale Node */}
            <div className="p-5 bg-zinc-900/50 backdrop-blur-sm border-l-2 border-indigo-500 rounded-r-xl group hover:bg-zinc-800/80 transition-all">
                <h4 className="text-[10px] font-mono text-indigo-500 uppercase mb-2 tracking-widest font-black">Cognitive Load Alert</h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                    High cognitive load detected in <span className="text-indigo-400 font-bold">Special Ed</span>.
                    <br />
                    <span className="text-[10px] text-zinc-500 uppercase mt-2 block">Suggesting automated documentation support via Antigravity.</span>
                </p>
            </div>

            {/* Community Push Node */}
            <div className="p-5 bg-zinc-900/50 backdrop-blur-sm border-l-2 border-zinc-500 rounded-r-xl group hover:bg-zinc-800/80 transition-all">
                <h4 className="text-[10px] font-mono text-zinc-400 uppercase mb-2 tracking-widest font-black">Studio Action</h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                    Football victory data detected.
                    <br />
                    <span className="text-amber-500 underline decoration-amber-500/30 cursor-pointer font-bold mt-2 block hover:text-amber-400 transition-colors">
                        Generate 'Victory Blast' Video?
                    </span>
                </p>
            </div>
        </div>
    );
};
