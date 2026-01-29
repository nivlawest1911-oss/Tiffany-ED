import { NextRequest, NextResponse } from 'next/server';

/**
 * HeyGen Streaming Avatar Token Endpoint
 * Generates access tokens for WebRTC streaming sessions
 */
export async function POST(_request: NextRequest) {
    try {
        const apiKey = process.env.HEYGEN_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'HeyGen API key not configured' },
                { status: 500 }
            );
        }

        // Create streaming token from HeyGen API
        const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('HeyGen API error:', error);
            return NextResponse.json(
                { error: 'Failed to create streaming token' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            token: data.data.token,
            expiresAt: data.data.expires_at,
        });
    } catch (error) {
        console.error('Error creating streaming token:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
