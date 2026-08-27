import { NextResponse } from 'next/server';
import { GeminiService } from '@/lib/gemini-service';
import { assertHumanRequest } from '@/lib/security/ironshield-gate';
import { withGovernanceEnvelope } from '@/lib/ai/governance-gate';

export async function POST(req: Request) {
    try {
        const gate = await assertHumanRequest(req, { routeName: 'admin/strategic-analysis' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const body = await req.json();
        const { metrics } = body;

        if (!metrics) {
            return NextResponse.json({ error: 'Metrics are required' }, { status: 400 });
        }

        const gemini = new GeminiService();
        const analysis = await gemini.generateStrategicAnalysis(metrics);

        const enveloped = withGovernanceEnvelope({ analysis }, { domain: 'state_report', isHighStakes: true });
        return NextResponse.json(enveloped);
    } catch (error: any) {
        console.error("Strategic Analysis Error:", error);
        return NextResponse.json({ error: error.message || 'Briefing synthesis failed' }, { status: 500 });
    }
}
