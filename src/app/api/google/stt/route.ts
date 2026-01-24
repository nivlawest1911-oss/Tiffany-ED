import { NextRequest, NextResponse } from 'next/server';
import { SpeechClient } from '@google-cloud/speech';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const audioFile = formData.get('audio') as Blob;

        if (!audioFile) {
            return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
        }

        const client = new SpeechClient();
        const buffer = Buffer.from(await audioFile.arrayBuffer());

        const request = {
            audio: { content: buffer.toString('base64') },
            config: {
                encoding: 'WEBM_OPUS',
                sampleRateHertz: 48000,
                languageCode: 'en-US',
                enableAutomaticPunctuation: true,
                model: 'latest_long',
            },
        };

        const [response] = await client.recognize(request as any) as any;
        const transcription = response.results
            .map((result: any) => result.alternatives[0].transcript)
            .join('\n');

        return NextResponse.json({
            transcript: transcription,
            message: 'Transcription successful',
            source: 'Google Cloud Speech-to-Text'
        });

    } catch (error: any) {
        console.error('[GOOGLE STT ERROR]:', error);
        return NextResponse.json({
            error: 'Transcription failed',
            details: error.message
        }, { status: 500 });
    }
}
