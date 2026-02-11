'use client';

import EdIntelNode from '../edintel-core/layout/EdIntelNode';

interface PrincipalTacticalHUDProps {
    _siteMetrics?: any;
    tier: string;
}

import { useRouter } from 'next/navigation';

// Individual card components for grid integration
export const MorningSynthesisCard = () => {
    const router = useRouter();
    return (
        <EdIntelNode
            title="MORNING SYNTHESIS // LEADERSHIP"
            videoSrc="/videos/EdIntel_Brand_Integration.mp4"
            fallbackImage="/images/dashboard/tactical-fallback.jpg"
            actionText="VIEW FULL REPORT"
            onAction={() => router.push('/analytics')}
            delay={0.4}
        >
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
        </EdIntelNode>
    );
};

export const CognitiveLoadCard = () => {
    const router = useRouter();
    return (
        <EdIntelNode
            title="COGNITIVE LOAD ALERT // LEADERSHIP"
            videoSrc="/videos/dashboard/cognitive-analysis.mp4"
            fallbackImage="/images/dashboard/cognitive-fallback.jpg"
            actionText="DEPLOY SUPPORT"
            onAction={() => router.push('/cognitive')}
            delay={0.5}
        >
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
        </EdIntelNode>
    );
};

export const StudioActionCard = () => {
    const router = useRouter();
    return (
        <EdIntelNode
            title="STUDIO ACTION // LEADERSHIP"
            videoSrc="/videos/dashboard/studio-production.mp4"
            fallbackImage="/images/dashboard/studio-fallback.jpg"
            actionText="LAUNCH STUDIO"
            onAction={() => router.push('/video-studio')}
            delay={0.6}
        >
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-sm font-bold text-white">VICTORY DATA DETECTED</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Football team secured championship win. Community engagement opportunity identified.
                </p>
                <div
                    className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg cursor-pointer hover:bg-amber-500/20 transition-all"
                    onClick={() => router.push('/video-studio')}
                >
                    <p className="text-xs text-amber-400 font-bold">
                        🎬 Generate 'Victory Blast' Video? →
                    </p>
                </div>
            </div>
        </EdIntelNode>
    );
};

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
