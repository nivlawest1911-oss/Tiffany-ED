import { NextRequest, NextResponse } from 'next/server';
import { getHeyGenClient } from '@/lib/heygen/client';

/**
 * Generate Video with HeyGen Avatar
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { avatarId, voiceId, script, title, background, aspectRatio } = body;

        if (!script) {
            return NextResponse.json(
                { error: 'Script is required' },
                { status: 400 }
            );
        }

        const client = getHeyGenClient();

        // Generate video
        const result = await client.generateVideo({
            video_inputs: [{
                character: {
                    type: 'avatar',
                    avatar_id: avatarId || 'default',
                    avatar_style: 'normal',
                },
                voice: {
                    type: 'text',
                    input_text: script,
                    voice_id: voiceId || 'en-US-JennyNeural',
                },
                background: background ? {
                    type: 'color',
                    value: background,
                } : undefined,
            }],
            aspect_ratio: aspectRatio || '16:9',
            title: title || 'EdIntel Avatar Video',
            test: false,
        });

        return NextResponse.json({
            success: true,
            videoId: result.video_id,
            status: result.status,
        });
    } catch (error) {
        console.error('Error generating video:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate video' },
            { status: 500 }
        );
    }
}

/**
 * Get Video Status
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const videoId = searchParams.get('videoId');

        if (!videoId) {
            return NextResponse.json(
                { error: 'Video ID is required' },
                { status: 400 }
            );
        }

        const client = getHeyGenClient();
        const status = await client.getVideoStatus(videoId);

        return NextResponse.json(status);
    } catch (error) {
        console.error('Error getting video status:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to get video status' },
            { status: 500 }
        );
    }
}
