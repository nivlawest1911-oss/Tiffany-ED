import { NextResponse } from 'next/server';
import { ElevenLabsClient } from "elevenlabs";

export async function POST(req: Request) {
    try {
        const { text, voiceId } = await req.json();

        if (!text || !voiceId) {
            return NextResponse.json({ error: 'Missing text or voiceId' }, { status: 400 });
        }

        if (!process.env.ELEVENLABS_API_KEY) {
            return NextResponse.json({ error: 'ELEVENLABS_API_KEY is not configured' }, { status: 500 });
        }

        const client = new ElevenLabsClient({
            apiKey: process.env.ELEVENLABS_API_KEY,
        });

        const audioStream = await client.generate({
            voice: voiceId,
            text,
            model_id: "eleven_turbo_v2_5",
        });

        return new NextResponse(audioStream as any, {
            headers: { 'Content-Type': 'audio/mpeg' },
        });

    } catch (error: any) {
        console.error('ElevenLabs API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
