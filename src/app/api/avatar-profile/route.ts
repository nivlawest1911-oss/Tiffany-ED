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
        return NextResponse.json({ error: 'Failed to generate assistant profile' }, { status: 500 });
    }
}
