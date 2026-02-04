import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        const apiKey = process.env.HEYGEN_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'HeyGen API key not configured' }, { status: 500 });
        }

        const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('HeyGen Token Error:', error);
        return NextResponse.json({ error: 'Failed to retrieve HeyGen token' }, { status: 500 });
    }
}
