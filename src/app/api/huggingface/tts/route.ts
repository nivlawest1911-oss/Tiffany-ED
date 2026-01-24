import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function POST(req: Request) {
    try {
        const { text, model } = await req.json();

        // Default to a good TTS model if none provided
        // microsoft/speecht5_tts is a popular choice for English
        const modelToUse = model || 'microsoft/speecht5_tts';

        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

        // Some models require specific inputs structure
        // For speecht5_tts, it's often helpful to provide speaker embeddings if possible, 
        // but basic usage is text-to-audio.
        // Note: speecht5_tts on default might need a speaker embedding vector.
        // If that fails, we can fall back to 'facebook/mms-tts-eng' which is simpler.

        let audioBlob;

        try {
            audioBlob = await hf.textToSpeech({
                model: modelToUse,
                inputs: text,
            });
        } catch (e) {
            console.warn(`Initial HF Model ${modelToUse} failed, trying fallback 'facebook/mms-tts-eng'`);
            audioBlob = await hf.textToSpeech({
                model: 'facebook/mms-tts-eng',
                inputs: text
            });
        }

        const buffer = await audioBlob.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
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
