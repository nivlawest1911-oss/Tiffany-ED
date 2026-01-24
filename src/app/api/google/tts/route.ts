import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { text, voiceName = 'en-US-Studio-O' } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const client = new TextToSpeechClient();

        const request = {
            input: { text },
            voice: { languageCode: 'en-US', name: voiceName },
            audioConfig: { audioEncoding: 'MP3' as any },
        };

        const [response] = await client.synthesizeSpeech(request as any) as any;

        // Return audio content as base64
        return NextResponse.json({
            audioContent: response.audioContent.toString('base64'),
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
