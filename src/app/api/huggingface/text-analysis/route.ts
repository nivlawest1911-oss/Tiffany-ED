/**
 * Hugging Face API Route - Text Analysis
 * POST /api/huggingface/text-analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { TextAnalysisService, EducationalAIService } from '@/lib/huggingface/services';

export async function POST(request: NextRequest) {
    try {
        const { text, operation } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        let result;

        switch (operation) {
            case 'sentiment':
                result = await TextAnalysisService.analyzeSentiment(text);
                break;

            case 'emotions':
                result = await TextAnalysisService.detectEmotions(text);
                break;

            case 'toxicity':
                result = await TextAnalysisService.checkToxicity(text);
                break;

            case 'summarize':
                result = await TextAnalysisService.summarize(text);
                break;

            case 'analyze-writing':
                result = await EducationalAIService.analyzeStudentWriting(text);
                break;

            default:
                return NextResponse.json(
                    { error: 'Invalid operation' },
                    { status: 400 }
                );
        }

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error('[HuggingFace Text Analysis Error]:', error);
        return NextResponse.json(
            { error: error.message || 'Text analysis failed' },
            { status: 500 }
        );
    }
}
