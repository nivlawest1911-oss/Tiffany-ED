import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const { text, voiceId } = await req.json();

        if (!text || !voiceId) {
            return NextResponse.json({ error: 'Missing text or voiceId' }, { status: 400 });
        }

        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'ELEVENLABS_API_KEY is not configured' }, { status: 500 });
        }

        // Use direct fetch to ensure we can read headers (SDK type definition issues with withRawResponse)
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                model_id: "eleven_turbo_v2_5",
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`ElevenLabs API Error: ${response.status} ${errorText}`);
        }

        // Extract usage metrics from headers
        const characterCost = response.headers.get('x-character-count');
        const requestId = response.headers.get('request-id');

        console.log(`[ElevenLabs] Generated audio. Cost: ${characterCost} chars. ReqID: ${requestId}`);

        // Return audio stream with headers
        return new NextResponse(response.body, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'X-Character-Cost': characterCost || '0',
                'X-Request-ID': requestId || ''
            },
        });

    } catch (error: any) {
        console.error('ElevenLabs Handler Error:', error);
        return NextResponse.json({ error: error.message || 'Error generating speech' }, { status: 500 });
    }
}
