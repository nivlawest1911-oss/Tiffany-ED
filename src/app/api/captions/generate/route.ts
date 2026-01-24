import { NextRequest, NextResponse } from 'next/server';
import { getCaptionsClient } from '@/lib/captions/client';

/**
 * Generate Captions for Video
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { videoUrl, language, style, autoHighlight } = body;

        if (!videoUrl) {
            return NextResponse.json(
                { error: 'Video URL is required' },
                { status: 400 }
            );
        }

        const client = getCaptionsClient();

        const result = await client.generateCaptions(videoUrl, {
            language: language || 'en',
            style: style || {
                font_family: 'Inter',
                font_size: 48,
                font_color: '#FFFFFF',
                background_color: '#000000',
                position: 'bottom',
                animation: 'fade',
                highlight_color: '#FFD700',
            },
            auto_highlight: autoHighlight ?? true,
        });

        return NextResponse.json({
            success: true,
            projectId: result.project_id,
            status: result.status,
        });
    } catch (error) {
        console.error('Error generating captions:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate captions' },
            { status: 500 }
        );
    }
}
