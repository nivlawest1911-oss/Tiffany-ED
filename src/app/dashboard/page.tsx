import { createSovereignServerClient } from '@/lib/supabase-server';
import { AntigravityOverlay } from '@/components/dashboard/AntigravityOverlay';
import { PrincipalTacticalHUD } from '@/components/dashboard/PrincipalTacticalHUD';
import { SovereignBriefing } from '@/components/dashboard/SovereignBriefing';
import { SovereignPod } from '@/components/dashboard/SovereignPod';
import { IntelligencePod } from '@/components/dashboard/IntelligencePod';
import { SovereignAutomation } from '@/components/SovereignAutomation';
import { LivingCard } from '@/components/dashboard/LivingCard';
import SovereignTerminal from '@/components/SovereignTerminal';
import SovereignIntelligenceNode from '@/components/SovereignIntelligenceNode';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const supabase = await createSovereignServerClient();

    const { data: { session } } = await supabase.auth.getSession();
    let tierName = "Sovereign Initiate";

    if (session?.user) {
        const { data } = await supabase
            .from('subscriptions')
            .select('tier_name')
            .eq('user_id', session.user.id)
            .single();
        if (data?.tier_name) {
            tierName = data.tier_name;
        }
    }

    const mockSummary = `Operational Status: Attendance is at 94.2%. Enrollment in "Project Sovereign" has increased by 12% this morning.
Critical Compliance: 3 flags detected in ALSDE Code 290-8-9 schema. Antigravity Agent is standing by for regulatory patching.
Human Capital: High cognitive load identified in 5th Grade faculty. Recommend deploying Automated Lesson Architect to reduce administrative friction.`;

    const isLeadership = ['Site Command', 'Director Pack'].includes(tierName);

    return (
        <div className="space-y-12 pb-20">
            {/* 1. THE TACTICAL HUD (Quick Glance) */}
            <PrincipalTacticalHUD tier={tierName} />

            <div className="grid grid-cols-12 gap-8">

                {/* LEFT COLUMN: Deep Intelligence (8 Cols) */}
                <div className="col-span-12 lg:col-span-8 space-y-8">

                    {/* THE SOVEREIGN BRIEFING: AI Synthesis */}
                    {isLeadership && (
                        <SovereignBriefing summary={mockSummary} loading={false} />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <LivingCard
                            videoUrl="/videos/features/data-analysis-demo.mp4"
                            title="District Health Monitor"
                        >
                            <IntelligencePod
                                label="District Health"
                                value="94.2%"
                                trend="up"
                                detail="Engagement trending +3.2%"
                            />
                        </LivingCard>
                        <LivingCard
                            videoUrl="/videos/features/iep-architect-demo.mp4"
                            title="Compliance Protocol"
                        >
                            <SovereignIntelligenceNode />
                        </LivingCard>
                    </div>

                    <LivingCard
                        videoUrl="/videos/features/lesson-planner-demo.mp4"
                        title="Antigravity activity feed"
                    >
                        <SovereignPod title="Protocol Status: Live" value="Optimal" status="optimal">
                            <div className="mt-4">
                                <SovereignAutomation tier={tierName} />
                            </div>
                        </SovereignPod>
                    </LivingCard>
                </div>

                {/* RIGHT COLUMN: Action & Studio (4 Cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-8">

                    {/* STUDIO QUICK-ACTION */}
                    <LivingCard
                        videoUrl="/videos/features/lesson-planner-demo.mp4"
                        title="Creative Protocol"
                    >
                        <p className="text-xl font-black tracking-tight mb-6 leading-tight">Generate your Weekly Site Recap video now.</p>
                        <button className="w-full py-4 bg-amber-500 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-lg">
                            Launch Studio Engine
                        </button>
                    </LivingCard>

                    {/* SOVEREIGN TERMINAL: LIVE AUDIT LOGGING */}
                    <SovereignTerminal />

                    {/* STATUS PILL POD */}
                    <SovereignPod title="District Authority" value="Verified" status="optimal">
                        <div className="space-y-4 mt-4">
                            <div className="flex justify-between items-center text-[10px] font-mono">
                                <span className="text-zinc-500">Node:</span>
                                <span className="text-zinc-300">AL_MB_049</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono">
                                <span className="text-zinc-500">Encryption:</span>
                                <span className="text-emerald-500">AES-256-Active</span>
                            </div>
                        </div>
                    </SovereignPod>
                </div>
            </div>

            {/* ANTIGRAVITY TACTICAL OVERLAY */}
            <AntigravityOverlay />
        </div>
    );
}
