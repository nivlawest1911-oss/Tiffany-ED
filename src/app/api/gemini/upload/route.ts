/**
 * Gemini Media Upload API
 * POST /api/gemini/upload
 */

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const metadataStr = formData.get('metadata') as string;

        if (!file) {
            return NextResponse.json(
                { error: 'File is required' },
                { status: 400 }
            );
        }

        // Upload to Vercel Blob
        const blob = await put(file.name, file, {
            access: 'public',
            addRandomSuffix: true,
        });

        // Parse metadata
        const metadata = metadataStr ? JSON.parse(metadataStr) : {};

        return NextResponse.json({
            success: true,
            url: blob.url,
            id: blob.pathname,
            metadata,
        });
    } catch (error: any) {
        console.error('[Gemini Upload] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to upload file' },
            { status: 500 }
        );
    }
}
