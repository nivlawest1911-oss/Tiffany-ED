import { NextResponse } from 'next/server';
import { withResilience } from '@/lib/ai-resilience';

export async function POST(req: Request) {
    try {
        const { schoolName, adminName } = await req.json();

        // 🛡️ SECURITY PROTOCOL: Keys handled strictly server-side
        const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
        const VOICE_ID = process.env.DR_WEST_VOICE_ID || "JBFqnCBv79x13pTo1U5r"; // Default or custom cloned voice

        if (!ELEVENLABS_API_KEY) {
            return NextResponse.json({ error: 'Identity credentials missing' }, { status: 500 });
        }

        const audioBlob = await withResilience(async () => {
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
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData?.detail?.message || 'ElevenLabs Handshake Failed');
            }

            return await response.blob();
        });

        return new NextResponse(audioBlob, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error: any) {
        console.error('[GREET_API_ERROR]', error);
        return NextResponse.json({ error: 'Protocol Interrupted', details: error.message }, { status: 500 });
    }
}
