/**
 * Phone API - Make Outbound Call
 * POST /api/phone/outbound
 */

import { NextRequest, NextResponse } from 'next/server';
import { AIPhoneAgentService, PHONE_AGENT_CONFIG } from '@/lib/phone/agent';

export async function POST(request: NextRequest) {
    try {
        const { to, message, voice } = await request.json();

        if (!to || !message) {
            return NextResponse.json(
                { error: 'Phone number and message are required' },
                { status: 400 }
            );
        }

        // Select voice configuration
        const voiceConfig = voice && voice in PHONE_AGENT_CONFIG.voices
            ? PHONE_AGENT_CONFIG.voices[voice as keyof typeof PHONE_AGENT_CONFIG.voices]
            : PHONE_AGENT_CONFIG.voices.drAlvinWest;

        // Make outbound call
        const call = await AIPhoneAgentService.makeOutboundCall(
            to,
            message,
            voiceConfig
        );

        return NextResponse.json({
            success: true,
            callSid: call.sid,
            status: call.status,
            to: call.to,
        });
    } catch (error: any) {
        console.error('[Phone] Outbound call error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to make call' },
            { status: 500 }
        );
    }
}
