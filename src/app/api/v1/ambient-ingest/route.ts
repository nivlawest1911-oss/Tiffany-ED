import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateObject } from 'ai';
import { getGoogleAIKey, googleProvider, AI_MODELS } from '@/lib/ai-config';
import { AmbientMeetingSummarySchema } from '@/lib/ai/signatures';
import { assertHumanRequest } from '@/lib/security/ironshield-gate';
import { recordLlmUsage } from '@/lib/ai/token-meter';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const runtime = 'nodejs';
export const maxDuration = 60; // 60s max for audio fetch + multimodal processing

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const gate = await assertHumanRequest(req, { routeName: 'ambient-ingest' });
    if (!gate.allowed && gate.response) {
      return gate.response;
    }

    const payload = await req.json();
    const { deviceId, audioUrl, transcript, text, userId } = payload;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: userId is mandatory.' },
        { status: 400 }
      );
    }

    const inputTranscript = transcript || text;
    if (!audioUrl && !inputTranscript) {
      return NextResponse.json(
        { error: 'Missing required parameters: either audioUrl or transcript/text is required.' },
        { status: 400 }
      );
    }

    const apiKey = getGoogleAIKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google AI API key is not configured on the server.' },
        { status: 500 }
      );
    }

    let structuredLog;
    let tokensConsumed = 0;

    // PATH 1: Direct Transcript Text provided
    if (inputTranscript) {
      const result = await generateObject({
        model: googleProvider(AI_MODELS.GOOGLE.FLASH_2),
        schema: AmbientMeetingSummarySchema,
        system: `You are the EdIntel Ambient Scribe. Transcribe, analyze, and extract structured meeting summaries, action items, compliance notes, and participant tags from this meeting transcript.`,
        prompt: `Device ID: ${deviceId || 'plaud-notepin-default'}\n\nTranscript:\n${inputTranscript}`,
      });
      structuredLog = result.object;
      tokensConsumed = result.usage?.totalTokens || 0;
    } 
    // PATH 2: Base64 Audio Data URI provided
    else if (typeof audioUrl === 'string' && audioUrl.startsWith('data:audio/')) {
      const match = audioUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) {
        return NextResponse.json({ error: 'Invalid audio data URI format.' }, { status: 400 });
      }
      const mimeType = match[1];
      const audioBuffer = Buffer.from(match[2], 'base64');

      const result = await generateObject({
        model: googleProvider(AI_MODELS.GOOGLE.FLASH_2),
        schema: AmbientMeetingSummarySchema,
        system: `You are the EdIntel Ambient Scribe. Listen to this meeting recording, transcribe key points, and extract structured summaries, action items, compliance notes, and participant tags.`,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: `Device ID: ${deviceId || 'plaud-notepin-default'}\nProcess and extract structured meeting intelligence from this audio.` },
              { type: 'file', data: audioBuffer, mediaType: mimeType.split(';')[0] }
            ]
          }
        ]
      });
      structuredLog = result.object;
      tokensConsumed = result.usage?.totalTokens || 0;
    }
    // PATH 3: Remote Audio URL provided
    else if (typeof audioUrl === 'string' && (audioUrl.startsWith('http://') || audioUrl.startsWith('https://'))) {
      const audioRes = await fetch(audioUrl, {
        headers: { 'User-Agent': 'EdIntel-Ambient-Ingest/1.0' },
        signal: AbortSignal.timeout(20000), // 20s timeout
      });

      if (!audioRes.ok) {
        return NextResponse.json(
          { error: `Failed to fetch audio from remote URL: ${audioRes.status} ${audioRes.statusText}` },
          { status: 422 }
        );
      }

      const rawMimeType = audioRes.headers.get('content-type') || 'audio/mp3';
      const mimeType = rawMimeType.split(';')[0].trim();
      const arrayBuffer = await audioRes.arrayBuffer();
      const audioBuffer = Buffer.from(arrayBuffer);

      const result = await generateObject({
        model: googleProvider(AI_MODELS.GOOGLE.FLASH_2),
        schema: AmbientMeetingSummarySchema,
        system: `You are the EdIntel Ambient Scribe. Listen to this meeting recording, transcribe key points, and extract structured summaries, action items, compliance notes, and participant tags.`,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: `Device ID: ${deviceId || 'plaud-notepin-default'}\nProcess and extract structured meeting intelligence from this audio.` },
              { type: 'file', data: audioBuffer, mediaType: mimeType }
            ]
          }
        ]
      });
      structuredLog = result.object;
      tokensConsumed = result.usage?.totalTokens || 0;
    } 
    // Fallback: If audioUrl is plain text content
    else {
      const result = await generateObject({
        model: googleProvider(AI_MODELS.GOOGLE.FLASH_2),
        schema: AmbientMeetingSummarySchema,
        system: `You are the EdIntel Ambient Scribe. Analyze and extract structured meeting summaries, action items, compliance notes, and participant tags.`,
        prompt: `Device ID: ${deviceId || 'plaud-notepin-default'}\n\nContent:\n${audioUrl}`,
      });
      structuredLog = result.object;
      tokensConsumed = result.usage?.totalTokens || 0;
    }

    const durationMs = Date.now() - startTime;

    // Record model telemetry in LlmUsageEvent
    void recordLlmUsage({
      modelId: AI_MODELS.GOOGLE.FLASH,
      provider: 'google',
      operation: 'ambient-ingest',
      route: 'v1/ambient-ingest',
      userId,
      totalTokens: tokensConsumed,
      latencyMs: durationMs,
      success: true,
      metadata: { deviceId: deviceId || 'plaud-notepin-default' }
    });

    // Persist structured execution log to Supabase
    const { data, error } = await supabase
      .from('agent_execution_logs')
      .insert({
        user_id: userId,
        agent_identifier: 'transcription_scribe',
        tokens_consumed: tokensConsumed,
        execution_duration_ms: durationMs,
        result: {
          ...structuredLog,
          raw_audio_url: audioUrl || null,
          device_id: deviceId || 'plaud-notepin-default',
          status: 'processed'
        }
      })
      .select()
      .single();

    if (error) {
      console.error('[AMBIENT_INGEST_ERROR] Supabase log insert failed:', error);
      // Return structured log even if log persistence had a DB error, but report DB warning
      return NextResponse.json({ 
        success: true, 
        warning: 'Log persistence failed: ' + error.message, 
        result: structuredLog 
      }, { status: 200 });
    }

    return NextResponse.json({ success: true, logId: data?.id, result: structuredLog }, { status: 200 });
  } catch (err: any) {
    console.error('[AMBIENT_INGEST_EXCEPTION]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error during ambient audio processing' },
      { status: 500 }
    );
  }
}
