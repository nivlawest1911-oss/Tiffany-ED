import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const status = {
        stripe: {
            secretKey: !!process.env.STRIPE_SECRET_KEY,
            publishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        },
        ai: {
            googleKey: !!process.env.GOOGLE_GENAI_API_KEY,
            mode: 'sovereign',
            status: 'operational'
        }
    };

    return NextResponse.json(status);
}
