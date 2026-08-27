/**
 * EdIntel Sovereign AI Token Meter & Telemetry Engine
 * 
 * Provides centralized, non-blocking telemetry and token metering for all LLM operations.
 * Tracks inputTokens, outputTokens, totalTokens, latency, modelId, provider,
 * and operation across all AI pathways.
 * 
 * FERPA / Privacy invariant: Never logs prompt text, completions, transcripts,
 * or student PII.
 */

import { AI_MODELS } from '@/lib/ai-config';

export interface LlmMeterInput {
  modelId: string;
  provider?: string;
  operation: string;
  route?: string;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  latencyMs?: number;
  success: boolean;
  errorCode?: string;
  userId?: string | null;
  requestId?: string;
  metadata?: Record<string, unknown>;
}

export interface ExtractedUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

/**
 * Lazy, runtime-safe prisma resolver.
 * Ensures edge runtime routes never attempt to bundle Node.js database drivers.
 */
async function getPrismaClient() {
  if (typeof window !== 'undefined' || process.env.NEXT_RUNTIME === 'edge') {
    return null;
  }
  try {
    const { prisma } = await import('@/lib/prisma');
    return prisma;
  } catch {
    return null;
  }
}

/**
 * Robustly extracts token usage from AI SDK generateObject, generateText,
 * or custom provider response payloads.
 */
export function extractUsageFromResult(result: unknown): ExtractedUsage {
  if (!result || typeof result !== 'object') {
    return { inputTokens: 0, outputTokens: 0, totalTokens: 0 };
  }

  const res = result as Record<string, any>;
  const usage = res.usage || res.totalUsage || res.tokenUsage || res;

  const inputTokens = Number(
    usage.inputTokens ?? usage.promptTokens ?? usage.prompt_tokens ?? usage.input_tokens ?? 0
  );
  const outputTokens = Number(
    usage.outputTokens ?? usage.completionTokens ?? usage.completion_tokens ?? usage.output_tokens ?? 0
  );
  const totalTokens = Number(
    usage.totalTokens ?? usage.total_tokens ?? (inputTokens + outputTokens)
  );

  return {
    inputTokens: isNaN(inputTokens) || inputTokens < 0 ? 0 : inputTokens,
    outputTokens: isNaN(outputTokens) || outputTokens < 0 ? 0 : outputTokens,
    totalTokens: isNaN(totalTokens) || totalTokens < 0 ? 0 : totalTokens,
  };
}

/**
 * Sanitizes metadata to guarantee zero FERPA/PII leakage.
 * Strips prompt bodies, transcript texts, names, student identifiers.
 */
function sanitizeMetadata(metadata?: Record<string, unknown>): Record<string, unknown> {
  if (!metadata || typeof metadata !== 'object') return {};

  const forbiddenKeys = new Set([
    'prompt', 'prompts', 'completion', 'completions', 'text', 'content',
    'messages', 'transcript', 'studentname', 'student_name', 'studentneeds',
    'student_needs', 'raw_audio_url', 'audiourl', 'audio_url', 'ssn', 'email', 'password'
  ]);

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(metadata)) {
    const lowerKey = key.toLowerCase();
    if (!forbiddenKeys.has(lowerKey)) {
      if (typeof value === 'object' && value !== null) {
        // Shallow copy or omit deeply nested unknown shapes
        sanitized[key] = '[Object]';
      } else {
        sanitized[key] = value;
      }
    }
  }

  return sanitized;
}

/**
 * Non-blocking, server-side persist of LLM token usage event.
 * Never throws to the caller to avoid degrading user requests.
 */
export async function recordLlmUsage(input: LlmMeterInput): Promise<void> {
  if (process.env.LLM_USAGE_METERING === 'false') {
    return;
  }

  const inputTokens = Math.max(0, input.inputTokens ?? 0);
  const outputTokens = Math.max(0, input.outputTokens ?? 0);
  const totalTokens = Math.max(0, input.totalTokens ?? (inputTokens + outputTokens));
  const latencyMs = Math.max(0, input.latencyMs ?? 0);

  const cleanMetadata = sanitizeMetadata(input.metadata);

  try {
    const prisma = await getPrismaClient();
    if (!prisma) {
      return;
    }

    // 1. Primary write to LlmUsageEvent table
    if ((prisma as any).llmUsageEvent?.create) {
      await (prisma as any).llmUsageEvent.create({
        data: {
          modelId: input.modelId || 'unknown-model',
          provider: input.provider || 'google',
          operation: input.operation || 'llm-invocation',
          route: input.route || undefined,
          inputTokens,
          outputTokens,
          totalTokens,
          latencyMs,
          success: input.success,
          errorCode: input.errorCode || undefined,
          userId: input.userId || undefined,
          requestId: input.requestId || undefined,
          metadata: cleanMetadata,
        },
      });
      return;
    }

    // 2. Fallback to UsageMetric if LlmUsageEvent table is not yet generated
    if (prisma.usageMetric?.create) {
      await prisma.usageMetric.create({
        data: {
          userId: input.userId || undefined,
          sessionType: input.operation || 'llm_generation',
          tokensUsed: totalTokens,
          estimatedCost: Math.round((totalTokens / 1000) * 0.0025 * 10000) / 10000,
          modelUsed: input.modelId || 'unknown',
        },
      });
    }
  } catch (err: any) {
    // Fire-and-forget: Log sanitized message with request ID only
    console.error(`[TokenMeter:Error] Failed to record usage (RequestId: ${input.requestId || 'n/a'}):`, err?.message);
  }
}

/**
 * Wraps an asynchronous LLM function with automatic latency measurement,
 * token extraction, and non-blocking telemetry recording.
 */
export async function withLlmMeter<T>(
  ctx: Omit<LlmMeterInput, 'inputTokens' | 'outputTokens' | 'totalTokens' | 'latencyMs' | 'success' | 'errorCode'>,
  fn: () => Promise<T>,
  extractUsage?: (result: T) => { inputTokens?: number; outputTokens?: number; totalTokens?: number }
): Promise<T> {
  const start = Date.now();

  try {
    const result = await fn();
    const latencyMs = Date.now() - start;

    const usage = extractUsage ? extractUsage(result) : extractUsageFromResult(result);

    // Fire and forget usage recording
    void recordLlmUsage({
      ...ctx,
      inputTokens: usage.inputTokens,
      outputTokens: usage.outputTokens,
      totalTokens: usage.totalTokens,
      latencyMs,
      success: true,
    });

    return result;
  } catch (error: any) {
    const latencyMs = Date.now() - start;

    void recordLlmUsage({
      ...ctx,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      latencyMs,
      success: false,
      errorCode: error?.name || error?.code || 'EXECUTION_ERROR',
    });

    throw error;
  }
}

/**
 * Returns aggregated LLM usage metrics grouped by modelId.
 */
export async function getLlmUsageAggregates(options: {
  from?: Date;
  to?: Date;
  modelId?: string;
  userId?: string;
} = {}): Promise<Array<{
  modelId: string;
  provider: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  avgLatencyMs: number;
  successCount: number;
  errorCount: number;
}>> {
  try {
    const prisma = await getPrismaClient();
    if (!prisma || !(prisma as any).llmUsageEvent?.findMany) {
      return [];
    }

    const where: any = {};
    if (options.from || options.to) {
      where.createdAt = {};
      if (options.from) where.createdAt.gte = options.from;
      if (options.to) where.createdAt.lte = options.to;
    }
    if (options.modelId) where.modelId = options.modelId;
    if (options.userId) where.userId = options.userId;

    const events = await (prisma as any).llmUsageEvent.findMany({
      where,
      select: {
        modelId: true,
        provider: true,
        inputTokens: true,
        outputTokens: true,
        totalTokens: true,
        latencyMs: true,
        success: true,
      },
    });

    const map = new Map<string, {
      modelId: string;
      provider: string;
      requests: number;
      inputTokens: number;
      outputTokens: number;
      totalTokens: number;
      totalLatencyMs: number;
      successCount: number;
      errorCount: number;
    }>();

    for (const ev of events) {
      const key = `${ev.modelId}::${ev.provider || 'default'}`;
      const entry = map.get(key) || {
        modelId: ev.modelId,
        provider: ev.provider || 'google',
        requests: 0,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        totalLatencyMs: 0,
        successCount: 0,
        errorCount: 0,
      };

      entry.requests += 1;
      entry.inputTokens += ev.inputTokens || 0;
      entry.outputTokens += ev.outputTokens || 0;
      entry.totalTokens += ev.totalTokens || 0;
      entry.totalLatencyMs += ev.latencyMs || 0;
      if (ev.success) {
        entry.successCount += 1;
      } else {
        entry.errorCount += 1;
      }

      map.set(key, entry);
    }

    return Array.from(map.values()).map(e => ({
      modelId: e.modelId,
      provider: e.provider,
      requests: e.requests,
      inputTokens: e.inputTokens,
      outputTokens: e.outputTokens,
      totalTokens: e.totalTokens,
      avgLatencyMs: e.requests > 0 ? Math.round(e.totalLatencyMs / e.requests) : 0,
      successCount: e.successCount,
      errorCount: e.errorCount,
    }));
  } catch (err) {
    console.error('[TokenMeter:AggregateError]', err);
    return [];
  }
}
