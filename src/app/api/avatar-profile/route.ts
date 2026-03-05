import { NextRequest, NextResponse } from 'next/server';
import { GeminiService } from '@/lib/gemini-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { role, name, specialization, autonomyLevel } = await req.json();

        if (!name || !specialization) {
            return NextResponse.json({ error: 'Name and specialization are required.' }, { status: 400 });
        }

        const prompt = `Act as an expert Systems Architect for an educational intelligence platform. 
Generate a professional profile for an AI Executive Assistant with the following parameters:
- Name: ${name}
- Role: ${role}
- Specialization: ${specialization}
- Autonomy Level: ${autonomyLevel}%

Format the output EXACTLY matching the headers below (do not add any markdown bolding around the headers, just the exact text):
MISSION: [A 1-2 sentence mission statement for this assistant]
COGNITIVE_PROFILE: [A brief description of their analytical approach and personality]
CORE_POWER: [Their primary strategic capability]
AUTOMATED_TASKS:
[List 3-5 specific, actionable tasks this assistant handles. Put each on a new line starting with a number, e.g., "1. Reviewing compliance docs"]
PROFESSIONAL_ID: [Generate a unique ID like "AX-7740-OMEGA"]
`;

        const gemini = new GeminiService();
        const output = await gemini.generateText(prompt);

        return NextResponse.json({
            success: true,
            output: output
        });
    } catch (error: any) {
        console.error('[Avatar Profile Error]:', error);

        if (error.message?.includes('503') || error.message?.includes('overloaded') || error.message?.includes('exhausted')) {
            return NextResponse.json({
                success: true,
                output: `MISSION: [SIMULATION] Provide strategic academic support and intelligent automation for district operations.
COGNITIVE_PROFILE: Analytical, calm under pressure, data-first reasoning with empathy.
CORE_POWER: Cross-domain pattern recognition and prioritized action sequencing.
AUTOMATED_TASKS:
1. Reviewing incoming parent communications and drafting responses
2. Flagging at-risk student indicators in attendance and grade data
3. Scheduling leadership team meetings with agenda pre-loaded
4. Monitoring compliance deadlines and surfacing alerts 14 days in advance
5. Generating weekly ROI and efficiency briefings
PROFESSIONAL_ID: AX-SIM-0000-OMEGA
[Note: This is a simulation response. AI capacity is temporarily exhausted. Please retry.]`
            });
        }

        return NextResponse.json({ error: 'Failed to generate assistant profile' }, { status: 500 });
    }
}
