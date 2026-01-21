/**
 * Twilio Phone Webhook - Process Speech
 * POST /api/phone/process
 */

import { NextRequest, NextResponse } from 'next/server';
import { AIPhoneAgentService, AdvancedPhoneFeatures } from '@/lib/phone/agent';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const callSid = formData.get('CallSid') as string;
        const speechResult = formData.get('SpeechResult') as string;
        const confidence = parseFloat(formData.get('Confidence') as string || '0');

        console.log(`[Phone] Speech received: "${speechResult}" (confidence: ${confidence})`);

        // Analyze sentiment
        const sentiment = await AdvancedPhoneFeatures.analyzeSentiment(speechResult);

        // Determine routing
        const routing = await AdvancedPhoneFeatures.intelligentRouting(speechResult, {
            callSid,
            sentiment,
        });

        // Generate AI response
        const context = {
            agent: 'Dr. Alvin West',
            caller: { name: 'Educator' },
            topic: routing.department,
        };

        const aiResponse = await AIPhoneAgentService.processCallerInput(
            speechResult,
            context
        );

        console.log(`[Phone] AI Response: "${aiResponse}"`);

        // Check if we need to transfer to human
        const needsHuman = aiResponse.toLowerCase().includes('transfer') ||
            routing.priority === 'urgent';

        if (needsHuman) {
            const transferMessage = `I understand you need specialized assistance. 
      Let me transfer you to our ${routing.department} team. 
      Please hold for a moment.`;

            const twiml = AIPhoneAgentService.createTwiMLResponse(transferMessage, {
                redirect: '/api/phone/transfer',
            });

            return new NextResponse(twiml, {
                headers: { 'Content-Type': 'text/xml' },
            });
        }

        // Continue conversation
        const twiml = AIPhoneAgentService.createTwiMLResponse(aiResponse, {
            gather: true,
        });

        return new NextResponse(twiml, {
            headers: { 'Content-Type': 'text/xml' },
        });
    } catch (error: any) {
        console.error('[Phone] Process error:', error);

        const errorResponse = AIPhoneAgentService.createTwiMLResponse(
            'I apologize, I did not understand that. Could you please repeat?',
            { gather: true }
        );

        return new NextResponse(errorResponse, {
            headers: { 'Content-Type': 'text/xml' },
        });
    }
}
