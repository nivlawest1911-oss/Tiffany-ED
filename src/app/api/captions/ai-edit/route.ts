import { NextRequest, NextResponse } from 'next/server';
import { getCaptionsClient } from '@/lib/captions/client';

/**
 * AI-Powered Video Editing
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { videoUrl, prompt, style, includeCaptions, includeMusic } = body;

        if (!videoUrl || !prompt) {
            return NextResponse.json(
                { error: 'Video URL and prompt are required' },
                { status: 400 }
            );
        }

        const client = getCaptionsClient();

        const result = await client.aiEdit({
            video_url: videoUrl,
            prompt,
            style: style || 'professional',
            include_captions: includeCaptions ?? true,
            include_music: includeMusic ?? false,
        });

        return NextResponse.json({
            success: true,
            projectId: result.project_id,
            status: result.status,
            estimatedTime: result.estimated_time,
        });
    } catch (error) {
        console.error('Error with AI edit:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to edit video' },
            { status: 500 }
        );
    }
}
