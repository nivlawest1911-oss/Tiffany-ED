import { analyzeTone } from '@/lib/ai/tone-check';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text, context } = await req.json();

        if (!text) {
            return new NextResponse("Text is required", { status: 400 });
        }

        const analysis = await analyzeTone(text, context);
        return NextResponse.json(analysis);

    } catch (error) {
        console.error("Analysis API Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
