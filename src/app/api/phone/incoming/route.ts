/**
 * Twilio Phone Webhook - Incoming Calls
 * POST /api/phone/incoming
 */

import { NextRequest, NextResponse } from 'next/server';
import { AIPhoneAgentService, PHONE_AGENT_CONFIG } from '@/lib/phone/agent';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const callSid = formData.get('CallSid') as string;
        const from = formData.get('From') as string;
        const to = formData.get('To') as string;

        console.log(`[Phone] Incoming call: ${from} → ${to} (${callSid})`);

        // Handle incoming call
        const callInfo = await AIPhoneAgentService.handleIncomingCall(callSid, from);

        // Generate greeting
        const greeting = `Hello! Thank you for calling EdIntel Professional. 
    I'm Dr. Alvin West, your AI education assistant. 
    How may I help you today?`;

        // Create TwiML response with speech gathering
        const twiml = AIPhoneAgentService.createTwiMLResponse(greeting, {
            gather: true,
        });

        return new NextResponse(twiml, {
            headers: { 'Content-Type': 'text/xml' },
        });
    } catch (error: any) {
        console.error('[Phone] Incoming call error:', error);

        const errorResponse = AIPhoneAgentService.createTwiMLResponse(
            'We apologize, but we are experiencing technical difficulties. Please try again later.',
            { hangup: true }
        );

        return new NextResponse(errorResponse, {
            headers: { 'Content-Type': 'text/xml' },
            status: 500,
        });
    }
}
