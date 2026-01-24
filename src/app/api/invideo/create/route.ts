import { NextRequest, NextResponse } from 'next/server';
import { getInVideoClient } from '@/lib/invideo/client';

/**
 * Create Video from Prompt
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { prompt, style, aspectRatio, duration, includeMusic } = body;

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        const client = getInVideoClient();

        const project = await client.createFromPrompt({
            prompt,
            style: style || 'educational',
            aspect_ratio: aspectRatio || '16:9',
            duration: duration || 60,
            music: includeMusic ? {
                genre: 'ambient',
                mood: 'inspiring',
            } : undefined,
            language: 'en',
        });

        return NextResponse.json({
            success: true,
            projectId: project.id,
            status: project.status,
        });
    } catch (error) {
        console.error('Error creating video:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create video' },
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
        const projectId = searchParams.get('projectId');

        if (!projectId) {
            return NextResponse.json(
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

        const client = getInVideoClient();
        const project = await client.getProject(projectId);

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error getting video status:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to get video status' },
            { status: 500 }
        );
    }
}
