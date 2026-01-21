/**
 * Gemini Workspace Import API
 * POST /api/gemini/import
 */

import { NextRequest, NextResponse } from 'next/server';
import { GeminiWorkspaceService } from '@/lib/gemini/workspace';

export async function POST(request: NextRequest) {
    try {
        const { content, type, metadata } = await request.json();

        if (!content || !type) {
            return NextResponse.json(
                { error: 'Content and type are required' },
                { status: 400 }
            );
        }

        // Import content
        const imported = await GeminiWorkspaceService.importContent(
            content,
            type,
            metadata
        );

        return NextResponse.json({
            success: true,
            content: imported,
        });
    } catch (error: any) {
        console.error('[Gemini Import] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to import content' },
            { status: 500 }
        );
    }
}
