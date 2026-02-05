'use client';

import React from 'react';

interface PrincipalTacticalHUDProps {
    _siteMetrics?: any;
    tier: string;
}

// Individual card components for grid integration
export const MorningSynthesisCard = () => (
    <div className="dashboard-card border-l-4 border-amber-500">
        <div className="card-header">
            <div className="text-xs text-amber-500 uppercase tracking-wider font-black">
                Morning Synthesis // Leadership
            </div>
        </div>
        <div className="card-body">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-emerald-500">SITE STATUS: OPTIMAL</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                    All systems operational. Neural network synchronized across 47 nodes.
                </p>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-xs text-amber-400 font-mono">
                        ⚠️ ACTION REQUIRED: Review 3 compliance flags for upcoming state audit
                    </p>
                </div>
            </div>
        </div>
        <div className="card-footer">
            View Full Report
        </div>
    </div>
);

export const CognitiveLoadCard = () => (
    <div className="dashboard-card border-l-4 border-indigo-500">
        <div className="card-header">
            <div className="text-xs text-indigo-500 uppercase tracking-wider font-black">
                Cognitive Load Alert // Leadership
            </div>
        </div>
        <div className="card-body">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-sm font-bold text-indigo-400">HIGH LOAD DETECTED</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Department: <span className="text-indigo-400 font-bold">Special Education</span>
                </p>
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <p className="text-xs text-indigo-400 font-mono">
                        💡 SUGGESTION: Deploy Antigravity automated documentation support
                    </p>
                </div>
            </div>
        </div>
        <div className="card-footer">
            Deploy Support
        </div>
    </div>
);

export const StudioActionCard = () => (
    <div className="dashboard-card border-l-4 border-zinc-500">
        <div className="card-header">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-black">
                Studio Action // Leadership
            </div>
        </div>
        <div className="card-body">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-sm font-bold text-white">VICTORY DATA DETECTED</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Football team secured championship win. Community engagement opportunity identified.
                </p>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg cursor-pointer hover:bg-amber-500/20 transition-all">
                    <p className="text-xs text-amber-400 font-bold">
                        🎬 Generate 'Victory Blast' Video? →
                    </p>
                </div>
            </div>
        </div>
        <div className="card-footer">
            Launch Studio
        </div>
    </div>
);

export const PrincipalTacticalHUD = ({ _siteMetrics, tier }: PrincipalTacticalHUDProps) => {
    const isLeadership = ['Site Command', 'Director Pack'].includes(tier);

    if (!isLeadership) return null;

    return (
        <>
            <MorningSynthesisCard />
            <CognitiveLoadCard />
            <StudioActionCard />
        </>
    );
};
