import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { text, voiceName = 'en-US-Studio-O' } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        // Initialize the Web-friendly Google Cloud TTS client with environment variables
        const client = new TextToSpeechClient(
            process.env.GOOGLE_CREDENTIALS_JSON
                ? JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
                : (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY)
                    ? {
                        credentials: {
                            client_email: process.env.GOOGLE_CLIENT_EMAIL,
                            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                        },
                        projectId: process.env.GOOGLE_PROJECT_ID,
                    }
                    : undefined // Fallback to ADC
        );

        const request = {
            input: { text },
            voice: { languageCode: 'en-US', name: voiceName },
            audioConfig: {
                audioEncoding: 'MP3' as any,
                speakingRate: 1.0,
                pitch: 0,
            },
            enableTimePointing: ['VISEME' as any],
        };

        const [response] = await client.synthesizeSpeech(request as any) as any;

        // Return audio content as base64 and viseme data
        return NextResponse.json({
            audioContent: response.audioContent.toString('base64'),
            visemeData: response.timepoints?.map((tp: any) => ({
                timeMs: tp.timepointsMs || 0,
                value: tp.markName || ''
            })) || [],
            message: 'Synthesis successful',
            source: 'Google Cloud Text-to-Speech'
        });

    } catch (error: any) {
        console.error('[GOOGLE TTS ERROR]:', error);
        return NextResponse.json({
            error: 'Voice synthesis failed',
            details: error.message
        }, { status: 500 });
    }
}
