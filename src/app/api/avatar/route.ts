
import { NextResponse } from 'next/server';
import { avatarSynthesisFlow } from '@/ai/flows/avatar-synthesis';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = await avatarSynthesisFlow(body);
        return NextResponse.json({ output: result });
    } catch (error) {
        return NextResponse.json({ error: 'Avatar Lab Connection Interrupted' }, { status: 500 });
    }
}
