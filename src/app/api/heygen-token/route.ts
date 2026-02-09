import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const apiKey = process.env.HEYGEN_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'HeyGen API Key not configured' },
                { status: 500 }
            );
        }

        const response = await fetch('https://api.heygen.com/v1/streaming.new_token', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to generate token');
        }

        return NextResponse.json(data.data);
    } catch (error: any) {
        console.error('HeyGen Token Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return POST();
}
