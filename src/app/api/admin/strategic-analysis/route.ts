import { NextResponse } from 'next/server';
import { GeminiService } from '@/lib/gemini-service';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { metrics } = body;

        if (!metrics) {
            return NextResponse.json({ error: 'Metrics are required' }, { status: 400 });
        }

        const gemini = new GeminiService();
        const analysis = await gemini.generateStrategicAnalysis(metrics);

        return NextResponse.json({ analysis });
    } catch (error: any) {
        console.error("Strategic Analysis Error:", error);
        return NextResponse.json({ error: error.message || 'Briefing synthesis failed' }, { status: 500 });
    }
}
