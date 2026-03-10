import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    if (!supabase) {
        return NextResponse.json({ error: 'Database uplink offline' }, { status: 503 });
    }

    try {
        // Fetch intervention plans as the primary roster source
        const { data: interventions, error: intError } = await supabase
            .from('intervention_plans')
            .select(`
                *,
                classroom_observations (
                    engagement_score,
                    observation_date
                )
            `)
            .order('created_at', { ascending: false });

        if (intError) throw intError;

        // Transform into RosterStudent format
        const roster = (interventions || []).map((plan: any) => ({
            id: plan.id,
            name: plan.student_name,
            grade: 0, // Grade not explicitly in intervention_plans, defaulting to 0 or could be added later
            iepDueDate: plan.created_at, // Using created_at as a proxy for the case date
            complianceStatus: mapStatusToCompliance(plan.status),
            lastIncident: plan.classroom_observations?.observation_date || 'No recent observation',
            engagementScore: plan.classroom_observations?.engagement_score || 0
        }));

        return NextResponse.json(roster);
    } catch (error: any) {
        console.error('[EdIntel_ROSTER_API] Deployment error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function mapStatusToCompliance(status: string) {
    switch (status.toLowerCase()) {
        case 'active': return 'pending';
        case 'completed': return 'compliant';
        case 'pending': return 'non-compliant';
        default: return 'pending';
    }
}
