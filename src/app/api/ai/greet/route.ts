import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { schoolName, adminName } = await req.json();

        // 🛡️ SECURITY PROTOCOL: Keys handled strictly server-side
        const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
        const VOICE_ID = process.env.DR_WEST_VOICE_ID || "JBFqnCBv79x13pTo1U5r"; // Default or custom cloned voice

        if (!ELEVENLABS_API_KEY) {
            return NextResponse.json({ error: 'Identity credentials missing' }, { status: 500 });
        }

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: `Protocol initiated. Good morning, ${adminName}. The ${schoolName} node is now fully provisioned and aligned with the Alabama Literacy Act.`,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.55,
                    similarity_boost: 0.75,
                    style: 0.15
                }
            }),
        });

        if (!response.ok) {
            throw new Error('ElevenLabs Handshake Failed');
        }

        const audioBlob = await response.blob();
        return new NextResponse(audioBlob, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error) {
        console.error('[GREET_API_ERROR]', error);
        return NextResponse.json({ error: 'Protocol Interrupted' }, { status: 500 });
    }
}
