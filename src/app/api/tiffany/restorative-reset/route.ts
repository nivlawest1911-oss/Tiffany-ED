import { NextResponse } from 'next/server';
import { generateRestorativeScript, RestorativeContext } from '@/utils/restorative-service';
import { createClient } from '@/utils/supabase/server';
import { assertHumanRequest } from '@/lib/security/bot-gate';
import { withGovernanceEnvelope } from '@/lib/ai/governance-gate';

export async function POST(req: Request) {
    try {
        const gate = await assertHumanRequest(req, { routeName: 'tiffany/restorative-reset' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const supabase = await createClient();
        if (!supabase) {
            return NextResponse.json({ error: 'Supabase client unavailable' }, { status: 503 });
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const context: RestorativeContext = await req.json();
        const script = await generateRestorativeScript(context);

        const enveloped = withGovernanceEnvelope(script, { 
            domain: 'discipline_restorative', 
            isHighStakes: true 
        });

        return NextResponse.json(enveloped);
    } catch (error) {
        console.error('Error in restorative-reset route:', error);
        return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 });
    }
}
