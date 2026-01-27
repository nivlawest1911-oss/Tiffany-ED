import { NextResponse } from 'next/server';

// 🔒 Sovereign Verification Token
// This must match exactly what you enter in the Facebook Developer Console
const VERIFY_TOKEN = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN || 'edintel_sovereign_verify_2026';

/**
 * GET Handler - For Verification Challenge
 * Facebook will ping this when you save the Callback URL.
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('[Facebook Webhook] Verified successfully.');
            // Return the challenge token as plain text
            return new NextResponse(challenge, { status: 200 });
        } else {
            console.warn('[Facebook Webhook] Verification failed. Token mismatch.');
            return new NextResponse('Forbidden', { status: 403 });
        }
    }

    return new NextResponse('Bad Request', { status: 400 });
}

/**
 * POST Handler - For Receiving Updates
 * This is where real-time changes (like User Feed, Messages) arrive.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Check if this is a page subscription
        if (body.object === 'page' || body.object === 'user') {
            body.entry.forEach((entry: any) => {
                const webhookEvent = entry.messaging ? entry.messaging[0] : entry.changes ? entry.changes[0] : null;
                console.log('[Facebook Webhook] Received Event:', webhookEvent);

                // Here you would process the event (e.g., pipe to AI agent, update database)
            });

            // Returns a '200 OK' response to all requests
            return new NextResponse('EVENT_RECEIVED', { status: 200 });
        } else {
            // Returns a '404 Not Found' if event is not from a page subscription
            return new NextResponse('', { status: 404 });
        }
    } catch (error) {
        console.error('[Facebook Webhook] Error processing event:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
