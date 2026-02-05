import { createClient } from '@/lib/supabase/server';
import SovereignTerminal from '@/components/SovereignTerminal';
import SovereignIntelligenceNode from '@/components/SovereignIntelligenceNode';
import { SovereignIDManager } from '@/components/SovereignIDManager';
import { SovereignBriefing } from '@/components/dashboard/SovereignBriefing';
import { PrincipalTacticalHUD } from '@/components/dashboard/PrincipalTacticalHUD';

export const dynamic = 'force-dynamic';

// Generate AI briefing summary
function generateBriefingSummary(tier: string): string {
    const briefings = {
        'Sovereign Initiate': `
Welcome: You're now connected to the EdIntel Neural Network
Trial Status: 14 days remaining to explore all features
Next Steps: Complete your profile and explore the AI Studio
        `.trim(),
        'Site Command': `
Morning Synthesis: Site status OPTIMAL - All systems operational
Cognitive Load: High load detected in Special Ed department
Studio Action: Football victory data detected - Generate celebration video
Compliance: 3 flags require review before state audit
        `.trim(),
        'Director Pack': `
District Overview: 47 nodes synchronized across Mobile County
Leadership Alert: Principal capacity at 78% - Deploy support protocols
Innovation Hub: 12 new AI tools available for immediate deployment
Strategic Priority: Q2 compliance audit preparation in progress
        `.trim(),
    };

    return briefings[tier as keyof typeof briefings] || briefings['Sovereign Initiate'];
}

export default async function DashboardPage() {
    // Fetch user and subscription data
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let subscription = null;
    let logs: any[] = [];

    if (user) {
        // Fetch subscription
        const { data: subData } = await supabase
            .from('user_subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();

        subscription = subData;

        // Fetch activity logs
        const { data: logsData } = await supabase
            .from('activity_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        logs = logsData || [];
    }

    const tier = subscription?.tier_name || 'Sovereign Initiate';
    const isLeadership = ['Site Command', 'Director Pack'].includes(tier);
    const briefingSummary = generateBriefingSummary(tier);

    return (
        <div className="min-h-screen bg-black">
            <header className="p-6 border-b border-gray-900">
                <h1 className="text-2xl font-bold text-white">
                    EdIntel <span className="text-gray-500">Command Center</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {tier} • Mobile County Schools
                </p>
            </header>

            <div className="dashboard-grid">
                {/* Identity Manager - Always visible */}
                <SovereignIDManager userSubscription={subscription} />

                {/* Daily Briefing - All users */}
                <SovereignBriefing summary={briefingSummary} loading={false} />

                {/* Activity Terminal - All users */}
                <SovereignTerminal logs={logs} />

                {/* Intelligence Node - All users */}
                <SovereignIntelligenceNode />

                {/* Leadership HUD - Only for Site Command/Director Pack */}
                {isLeadership && <PrincipalTacticalHUD _siteMetrics={{}} tier={tier} />}
            </div>
        </div>
    );
}
