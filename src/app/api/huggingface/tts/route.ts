import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function POST(req: Request) {
    try {
        const { text, model } = await req.json();

        if (!process.env.HUGGINGFACE_API_KEY) {
            console.error('TTS Error: HUGGINGFACE_API_KEY is missing');
            return NextResponse.json(
                { error: 'Hugging Face API key not configured' },
                { status: 500 }
            );
        }

        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
        
        // Reliability-first model strategy:
        // facebook/mms-tts-eng is extremely resilient and doesn't require complex embeddings
        const modelToUse = model || 'facebook/mms-tts-eng';


        let audioBlob;

        try {
            audioBlob = await hf.textToSpeech({
                model: modelToUse,
                inputs: text,
            });
        } catch (e: any) {
            console.warn(`TTS Warning: Model ${modelToUse} failed (${e.message}), trying fallback 'microsoft/speecht5_tts'`);
            // Secondary fallback for variety if needed
            audioBlob = await hf.textToSpeech({
                model: 'microsoft/speecht5_tts',
                inputs: text
            });
        }

        const buffer = await audioBlob.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Encoding': 'identity',
                'Content-Length': buffer.byteLength.toString(),
            },
        });

    } catch (error: any) {
        console.error('Hugging Face TTS Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate speech' },
            { status: 500 }
        );
    }
}
