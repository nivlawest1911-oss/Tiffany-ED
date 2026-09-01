import { NextResponse } from 'next/server';
import { aggregateStudentData, generateGrowthNarrative } from '@/services/portfolio-service';
import { assertHumanRequest } from '@/lib/security/bot-gate';
import { withGovernanceEnvelope } from '@/lib/ai/governance-gate';

export async function GET(req: Request, { params }: { params: Promise<{ studentId: string }> }) {
    try {
        const gate = await assertHumanRequest(req, { routeName: 'tiffany/portfolio' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const { studentId } = await params;

        // 1. Aggregate Data
        const data = await aggregateStudentData(studentId);

        // 2. Generate Narrative
        const narrative = await generateGrowthNarrative(data);

        const enveloped = withGovernanceEnvelope(
            { data, narrative }, 
            { domain: 'student_portfolio_compliance', isHighStakes: true, studentId }
        );

        return NextResponse.json(enveloped);
    } catch (error) {
        console.error('Error in portfolio route:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}
