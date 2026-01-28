/**
 * EdIntel Professional - AI Phone Agent System
 * Surpasses traditional phone AI with multi-modal intelligence
 */

import twilio from 'twilio';
import speech from '@google-cloud/speech';
import textToSpeech from '@google-cloud/text-to-speech';

// Initialize clients
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const speechClient = new speech.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();

/**
 * AI Phone Agent Configuration
 */
export const PHONE_AGENT_CONFIG = {
    // Voice Models
    voices: {
        drAlvinWest: {
            name: 'Dr. Alvin West',
            voice: 'en-US-Neural2-D', // Deep, authoritative male voice
            pitch: -2.0,
            speakingRate: 0.95,
            personality: 'Professional educator, warm and knowledgeable',
        },
        sarahConnors: {
            name: 'Sarah Connors',
            voice: 'en-US-Neural2-F', // Professional female voice
            pitch: 0.0,
            speakingRate: 1.0,
            personality: 'Data analyst, precise and helpful',
        },
        supportAgent: {
            name: 'EdIntel Support',
            voice: 'en-US-Neural2-C', // Friendly neutral voice
            pitch: 1.0,
            speakingRate: 1.05,
            personality: 'Helpful and empathetic',
        },
    },

    // Call Routing
    routing: {
        iepSupport: '+1-XXX-XXX-XXXX',
        technicalSupport: '+1-XXX-XXX-XXXX',
        billing: '+1-XXX-XXX-XXXX',
        general: '+1-XXX-XXX-XXXX',
    },

    // Business Hours
    hours: {
        timezone: 'America/Chicago',
        weekdays: { start: '08:00', end: '17:00' },
        saturday: { start: '09:00', end: '13:00' },
        sunday: 'closed',
    },
} as const;

/**
 * Speech-to-Text Service
 */
export class SpeechToTextService {
    /**
     * Transcribe audio stream in real-time
     */
    static async transcribeStream(audioStream: NodeJS.ReadableStream): Promise<string> {
        const request = {
            config: {
                encoding: 'MULAW' as const,
                sampleRateHertz: 8000,
                languageCode: 'en-US',
                enableAutomaticPunctuation: true,
                model: 'phone_call',
                useEnhanced: true,
            },
            interimResults: false,
        };

        const recognizeStream = speechClient
            .streamingRecognize(request)
            .on('error', console.error);

        audioStream.pipe(recognizeStream);

        return new Promise((resolve, reject) => {
            let transcript = '';

            recognizeStream.on('data', (data: any) => {
                if (data.results[0] && data.results[0].alternatives[0]) {
                    transcript += data.results[0].alternatives[0].transcript + ' ';
                }
            });

            recognizeStream.on('end', () => resolve(transcript.trim()));
            recognizeStream.on('error', reject);
        });
    }

    /**
     * Transcribe audio file
     */
    static async transcribeAudio(audioBuffer: Buffer): Promise<string> {
        const audio = {
            content: audioBuffer.toString('base64'),
        };

        const config = {
            encoding: 'MULAW' as const,
            sampleRateHertz: 8000,
            languageCode: 'en-US',
            enableAutomaticPunctuation: true,
            model: 'phone_call',
        };

        const request = { audio, config };
        const [response] = await speechClient.recognize(request);

        return response.results
            ?.map(result => result.alternatives?.[0]?.transcript)
            .join(' ') || '';
    }
}

/**
 * Text-to-Speech Service
 */
export class TextToSpeechService {
    /**
     * Generate speech audio from text
     */
    static async synthesizeSpeech(
        text: string,
        voiceConfig: typeof PHONE_AGENT_CONFIG.voices[keyof typeof PHONE_AGENT_CONFIG.voices]
    ): Promise<Buffer> {
        const request = {
            input: { text },
            voice: {
                languageCode: 'en-US',
                name: voiceConfig.voice,
            },
            audioConfig: {
                audioEncoding: 'MULAW' as const,
                pitch: voiceConfig.pitch,
                speakingRate: voiceConfig.speakingRate,
                sampleRateHertz: 8000,
            },
        };

        const [response] = await ttsClient.synthesizeSpeech(request);
        return Buffer.from(response.audioContent as Uint8Array);
    }

    /**
     * Generate speech with SSML for advanced control
     */
    static async synthesizeSpeechSSML(
        ssml: string,
        voiceConfig: typeof PHONE_AGENT_CONFIG.voices[keyof typeof PHONE_AGENT_CONFIG.voices]
    ): Promise<Buffer> {
        const request = {
            input: { ssml },
            voice: {
                languageCode: 'en-US',
                name: voiceConfig.voice,
            },
            audioConfig: {
                audioEncoding: 'MULAW' as const,
                pitch: voiceConfig.pitch,
                speakingRate: voiceConfig.speakingRate,
                sampleRateHertz: 8000,
            },
        };

        const [response] = await ttsClient.synthesizeSpeech(request);
        return Buffer.from(response.audioContent as Uint8Array);
    }
}

/**
 * AI Phone Agent Service
 */
export class AIPhoneAgentService {
    /**
     * Handle incoming call
     */
    static async handleIncomingCall(callSid: string, from: string) {
        console.log(`[Phone Agent] Incoming call from ${from} (${callSid})`);

        // Get caller information from database
        const caller = await this.getCallerInfo(from);

        // Determine routing based on caller history and time
        const route = await this.determineRoute(caller);

        return {
            callSid,
            from,
            caller,
            route,
            timestamp: new Date(),
        };
    }

    /**
     * Process caller speech and generate AI response
     */
    static async processCallerInput(
        transcript: string,
        context: any
    ): Promise<string> {
        // Use Google Gemini for intelligent response
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const apiKey = process.env.GOOGLE_GENAI_API_KEY;
        if (!apiKey) throw new Error("GOOGLE_GENAI_API_KEY is missing");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `You are ${context.agent || 'Dr. Alvin West'}, an AI assistant for EdIntel Professional, an educational technology platform for Alabama schools.

Context:
- Caller: ${context.caller?.name || 'Unknown'}
- School: ${context.caller?.school || 'Unknown'}
- Previous interactions: ${context.caller?.previousCalls || 0}
- Current topic: ${context.topic || 'General inquiry'}

Caller said: "${transcript}"

Respond naturally and helpfully. Keep responses concise (2-3 sentences max for phone). 
Be warm, professional, and educational. If you need to transfer to a human, say so clearly.

Your response:`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    }

    /**
     * Create TwiML response for call flow
     */
    static createTwiMLResponse(message: string, options?: {
        gather?: boolean;
        redirect?: string;
        hangup?: boolean;
    }): string {
        const VoiceResponse = twilio.twiml.VoiceResponse;
        const response = new VoiceResponse();

        if (options?.gather) {
            const gather = response.gather({
                input: ['speech'],
                timeout: 3,
                speechTimeout: 'auto',
                action: '/api/phone/process',
            });
            gather.say(message);
        } else {
            response.say(message);
        }

        if (options?.redirect) {
            response.redirect(options.redirect);
        }

        if (options?.hangup) {
            response.hangup();
        }

        return response.toString();
    }

    /**
     * Get caller information from database
     */
    private static async getCallerInfo(phoneNumber: string) {
        // Query database for caller information
        // This would integrate with your user database
        return {
            name: 'Unknown',
            school: 'Unknown',
            role: 'Unknown',
            previousCalls: 0,
            lastCall: null,
        };
    }

    /**
     * Determine call routing based on context
     */
    private static async determineRoute(caller: any) {
        const hour = new Date().getHours();
        const day = new Date().getDay();

        // Check business hours
        if (day === 0 || hour < 8 || hour >= 17) {
            return 'voicemail';
        }

        // Route based on caller history
        if (caller.previousCalls > 5) {
            return 'priority';
        }

        return 'general';
    }

    /**
     * Make outbound call
     */
    static async makeOutboundCall(
        to: string,
        message: string,
        voiceConfig = PHONE_AGENT_CONFIG.voices.drAlvinWest
    ) {
        try {
            const call = await twilioClient.calls.create({
                to,
                from: process.env.TWILIO_PHONE_NUMBER!,
                twiml: this.createTwiMLResponse(message, { hangup: true }),
            });

            console.log(`[Phone Agent] Outbound call initiated: ${call.sid}`);
            return call;
        } catch (error) {
            console.error('[Phone Agent] Outbound call failed:', error);
            throw error;
        }
    }

    /**
     * Send SMS notification
     */
    static async sendSMS(to: string, message: string) {
        try {
            const sms = await twilioClient.messages.create({
                to,
                from: process.env.TWILIO_PHONE_NUMBER!,
                body: message,
            });

            console.log(`[Phone Agent] SMS sent: ${sms.sid}`);
            return sms;
        } catch (error) {
            console.error('[Phone Agent] SMS failed:', error);
            throw error;
        }
    }
}

/**
 * Advanced Features
 */
export class AdvancedPhoneFeatures {
    /**
     * Sentiment analysis during call
     */
    static async analyzeSentiment(transcript: string): Promise<{
        sentiment: 'positive' | 'neutral' | 'negative';
        score: number;
        emotions: string[];
    }> {
        // Use Hugging Face for sentiment analysis
        const { TextAnalysisService } = await import('../huggingface/services');

        const [sentiment, emotions] = await Promise.all([
            TextAnalysisService.analyzeSentiment(transcript),
            TextAnalysisService.detectEmotions(transcript),
        ]);

        return {
            sentiment: sentiment.sentiment as any,
            score: sentiment.confidence,
            emotions: emotions.map(e => e.emotion),
        };
    }

    /**
     * Real-time language translation
     */
    static async translateCall(
        transcript: string,
        targetLanguage: string
    ): Promise<string> {
        const { Translate } = await import('@google-cloud/translate').then(m => m.v2);
        const translate = new Translate();

        const [translation] = await translate.translate(transcript, targetLanguage);
        return translation;
    }

    /**
     * Call recording and transcription
     */
    static async recordAndTranscribe(callSid: string): Promise<{
        recordingUrl: string;
        transcript: string;
        duration: number;
    }> {
        // Enable call recording
        await (twilioClient.calls(callSid) as any).update({
            record: true,
        });

        // Wait for recording to complete
        // In production, this would be handled via webhooks
        return {
            recordingUrl: '',
            transcript: '',
            duration: 0,
        };
    }

    /**
     * Intelligent call routing with AI
     */
    static async intelligentRouting(
        transcript: string,
        context: any
    ): Promise<{
        department: string;
        priority: 'low' | 'medium' | 'high' | 'urgent';
        suggestedAgent: string;
    }> {
        // Use AI to determine best routing
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const apiKey = process.env.GOOGLE_GENAI_API_KEY;
        if (!apiKey) throw new Error("GOOGLE_GENAI_API_KEY is missing");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `Analyze this caller request and determine routing:

Caller said: "${transcript}"

Return JSON with:
{
  "department": "iep" | "technical" | "billing" | "general",
  "priority": "low" | "medium" | "high" | "urgent",
  "suggestedAgent": "name of best agent",
  "reason": "brief explanation"
}`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        // Parse JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            department: 'general',
            priority: 'medium',
            suggestedAgent: 'Dr. Alvin West',
        };
    }
}

/**
 * Call Analytics Service
 */
export class CallAnalyticsService {
    /**
     * Track call metrics
     */
    static async trackCall(callData: {
        callSid: string;
        from: string;
        to: string;
        duration: number;
        transcript: string;
        sentiment: any;
        outcome: string;
    }) {
        // Store in database for analytics
        console.log('[Analytics] Call tracked:', callData.callSid);

        // This would integrate with your analytics database
        return {
            tracked: true,
            timestamp: new Date(),
        };
    }

    /**
     * Generate call insights
     */
    static async generateInsights(timeRange: {
        start: Date;
        end: Date;
    }): Promise<{
        totalCalls: number;
        averageDuration: number;
        sentimentBreakdown: any;
        topIssues: string[];
        resolutionRate: number;
    }> {
        // Analyze call data
        return {
            totalCalls: 0,
            averageDuration: 0,
            sentimentBreakdown: {},
            topIssues: [],
            resolutionRate: 0,
        };
    }
}
