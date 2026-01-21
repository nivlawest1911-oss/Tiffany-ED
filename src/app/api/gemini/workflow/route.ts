/**
 * Gemini Workflow Conversion API
 * POST /api/gemini/workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import { GeminiWorkspaceService } from '@/lib/gemini/workspace';

export async function POST(request: NextRequest) {
    try {
        const { conversation } = await request.json();

        if (!conversation) {
            return NextResponse.json(
                { error: 'Conversation is required' },
                { status: 400 }
            );
        }

        // Convert to workflow
        const workflow = await GeminiWorkspaceService.convertToWorkflow(conversation);

        return NextResponse.json({
            success: true,
            workflow,
        });
    } catch (error: any) {
        console.error('[Gemini Workflow] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to convert workflow' },
            { status: 500 }
        );
    }
}
