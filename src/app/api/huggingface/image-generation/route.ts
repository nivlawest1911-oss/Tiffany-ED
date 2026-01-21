/**
 * Hugging Face API Route - Image Generation
 * POST /api/huggingface/image-generation
 */

import { NextRequest, NextResponse } from 'next/server';
import { ImageGenerationService } from '@/lib/huggingface/services';

export async function POST(request: NextRequest) {
    try {
        const { prompt, type, options } = await request.json();

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        let imageBlob;

        if (type === 'classroom-visual') {
            imageBlob = await ImageGenerationService.generateClassroomVisual(prompt);
        } else {
            imageBlob = await ImageGenerationService.generateImage(prompt, options);
        }

        // Convert blob to base64
        const buffer = await imageBlob.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUrl = `data:image/png;base64,${base64}`;

        return NextResponse.json({
            success: true,
            image: dataUrl,
            prompt,
        });
    } catch (error: any) {
        console.error('[HuggingFace Image Generation Error]:', error);
        return NextResponse.json(
            { error: error.message || 'Image generation failed' },
            { status: 500 }
        );
    }
}
