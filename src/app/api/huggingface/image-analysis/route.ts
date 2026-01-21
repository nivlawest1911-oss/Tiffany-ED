/**
 * Hugging Face API Route - Image Analysis
 * POST /api/huggingface/image-analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { ImageAnalysisService } from '@/lib/huggingface/services';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const image = formData.get('image') as File;
        const operation = formData.get('operation') as string;

        if (!image) {
            return NextResponse.json(
                { error: 'Image is required' },
                { status: 400 }
            );
        }

        const imageBlob = new Blob([await image.arrayBuffer()], { type: image.type });
        let result;

        switch (operation) {
            case 'classify':
                result = await ImageAnalysisService.classifyImage(imageBlob);
                break;

            case 'detect-objects':
                result = await ImageAnalysisService.detectObjects(imageBlob);
                break;

            case 'caption':
                result = await ImageAnalysisService.captionImage(imageBlob);
                break;

            case 'analyze-engagement':
                result = await ImageAnalysisService.analyzeClassroomEngagement(imageBlob);
                break;

            default:
                return NextResponse.json(
                    { error: 'Invalid operation' },
                    { status: 400 }
                );
        }

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error('[HuggingFace Image Analysis Error]:', error);
        return NextResponse.json(
            { error: error.message || 'Image analysis failed' },
            { status: 500 }
        );
    }
}
