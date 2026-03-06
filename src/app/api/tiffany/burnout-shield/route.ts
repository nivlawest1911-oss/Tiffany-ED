import { NextResponse } from 'next/server';
import { generateBurnoutResponse } from '@/services/burnout-service';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const response = await generateBurnoutResponse(message);
        return NextResponse.json({ response });
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
    }
}
