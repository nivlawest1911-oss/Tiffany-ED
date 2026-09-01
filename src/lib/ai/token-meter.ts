/**
 * EdIntel Sovereign AI Token Meter & Telemetry Engine
 * 
 * Provides centralized, non-blocking telemetry and token metering for all LLM operations.
 * Tracks inputTokens, outputTokens, totalTokens, latency, modelId, provider,
 * attributable to principal (userId / orgId / districtId) and operation across all AI pathways.
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
  orgId?: string | null;
  districtId?: string | null;
  isEstimated?: boolean;
  costUsd?: number;
  requestId?: string;
  metadata?: Record<string, unknown>;
}

export interface ExtractedUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  isEstimated?: boolean;
}

export interface SoftQuotaOptions {
  userId?: string;
  orgId?: string;
  requestedTokens?: number;
  timeWindowDays?: number;
}

export interface SoftQuotaResult {
  allowed: boolean;
  quotaExceeded: boolean;
  currentUsage: number;
  limit: number;
  remaining: number;
  enforced: boolean;
  reason?: string;
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
 * Standard token estimator for fallback paths where native provider usage is unavailable.
 * Uses the industry standard heuristic (~4 characters per token for English text and code).
 */
export function estimateTokens(text: string): number {
  if (!text || typeof text !== 'string') return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  // Approximation: ceil(char count / 4) with minimum of 1
  return Math.max(1, Math.ceil(trimmed.length / 4));
}

/**
 * Robustly extracts token usage from AI SDK generateObject, generateText,
 * streamText finish events, or custom provider response payloads.
 * Falls back to text estimation if usage object is empty.
 */
export function extractUsageFromResult(result: unknown, fallbackText?: string): ExtractedUsage {
  if (!result || typeof result !== 'object') {
    if (fallbackText) {
      const estimated = estimateTokens(fallbackText);
      return { inputTokens: 0, outputTokens: estimated, totalTokens: estimated, isEstimated: true };
    }
    return { inputTokens: 0, outputTokens: 0, totalTokens: 0, isEstimated: false };
  }

  const res = result as Record<string, any>;
  const usage = res.usage || res.usageMetadata || res.totalUsage || res.tokenUsage || res;

  const inputTokens = Number(
    usage.inputTokens ?? usage.promptTokens ?? usage.prompt_tokens ?? usage.promptTokenCount ?? usage.input_tokens ?? 0
  );
  const outputTokens = Number(
    usage.outputTokens ?? usage.completionTokens ?? usage.completion_tokens ?? usage.candidatesTokenCount ?? usage.output_tokens ?? 0
  );
  const rawTotal = Number(
    usage.totalTokens ?? usage.total_tokens ?? usage.totalTokenCount ?? (inputTokens + outputTokens)
  );

  const cleanInput = isNaN(inputTokens) || inputTokens < 0 ? 0 : inputTokens;
  const cleanOutput = isNaN(outputTokens) || outputTokens < 0 ? 0 : outputTokens;
  let cleanTotal = isNaN(rawTotal) || rawTotal < 0 ? 0 : rawTotal;

  let isEstimated = false;

  // If no native token counts could be extracted and fallback text is provided (or result has text property), estimate
  const resolvedText = fallbackText || (typeof res.text === 'string' ? res.text : typeof res.output === 'string' ? res.output : undefined);
  if (cleanInput === 0 && cleanOutput === 0 && cleanTotal === 0 && resolvedText) {
    const est = estimateTokens(resolvedText);
    return {
      inputTokens: 0,
      outputTokens: est,
      totalTokens: est,
      isEstimated: true,
    };
  }

  return {
    inputTokens: cleanInput,
    outputTokens: cleanOutput,
    totalTokens: cleanTotal,
    isEstimated,
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

  const cleanMetadata = sanitizeMetadata({
    ...input.metadata,
    orgId: input.orgId || undefined,
    districtId: input.districtId || undefined,
    isEstimated: input.isEstimated ?? false,
    costUsd: input.costUsd || undefined,
  });

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
          districtId: input.districtId || undefined,
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
  extractUsage?: (result: T) => ExtractedUsage
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
      isEstimated: usage.isEstimated,
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
 * Returns aggregated LLM usage metrics grouped by modelId and provider.
 */
export async function getLlmUsageAggregates(options: {
  from?: Date;
  to?: Date;
  modelId?: string;
  provider?: string;
  userId?: string;
  route?: string;
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
    if (options.provider) where.provider = options.provider;
    if (options.userId) where.userId = options.userId;
    if (options.route) where.route = options.route;

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

/**
 * Returns aggregated LLM usage metrics grouped by user.
 */
export async function getUserUsageAggregates(userId: string, options: {
  from?: Date;
  to?: Date;
} = {}): Promise<{
  userId: string;
  totalRequests: number;
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  modelsUsed: string[];
}> {
  try {
    const prisma = await getPrismaClient();
    if (!prisma || !(prisma as any).llmUsageEvent?.findMany) {
      return { userId, totalRequests: 0, totalTokens: 0, inputTokens: 0, outputTokens: 0, modelsUsed: [] };
    }

    const where: any = { userId };
    if (options.from || options.to) {
      where.createdAt = {};
      if (options.from) where.createdAt.gte = options.from;
      if (options.to) where.createdAt.lte = options.to;
    }

    const events = await (prisma as any).llmUsageEvent.findMany({
      where,
      select: {
        modelId: true,
        inputTokens: true,
        outputTokens: true,
        totalTokens: true,
      },
    });

    const modelsSet = new Set<string>();
    let totalRequests = 0;
    let totalTokens = 0;
    let inputTokens = 0;
    let outputTokens = 0;

    for (const ev of events) {
      totalRequests += 1;
      inputTokens += ev.inputTokens || 0;
      outputTokens += ev.outputTokens || 0;
      totalTokens += ev.totalTokens || 0;
      if (ev.modelId) modelsSet.add(ev.modelId);
    }

    return {
      userId,
      totalRequests,
      totalTokens,
      inputTokens,
      outputTokens,
      modelsUsed: Array.from(modelsSet),
    };
  } catch (err) {
    console.error('[TokenMeter:UserAggregateError]', err);
    return { userId, totalRequests: 0, totalTokens: 0, inputTokens: 0, outputTokens: 0, modelsUsed: [] };
  }
}

/**
 * Returns aggregated LLM usage grouped by route / operation.
 */
export async function getRouteUsageAggregates(options: {
  from?: Date;
  to?: Date;
} = {}): Promise<Array<{
  route: string;
  requests: number;
  totalTokens: number;
  avgLatencyMs: number;
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

    const events = await (prisma as any).llmUsageEvent.findMany({
      where,
      select: {
        route: true,
        operation: true,
        totalTokens: true,
        latencyMs: true,
      },
    });

    const map = new Map<string, { route: string; requests: number; totalTokens: number; totalLatencyMs: number }>();

    for (const ev of events) {
      const key = ev.route || ev.operation || 'unspecified';
      const entry = map.get(key) || { route: key, requests: 0, totalTokens: 0, totalLatencyMs: 0 };
      entry.requests += 1;
      entry.totalTokens += ev.totalTokens || 0;
      entry.totalLatencyMs += ev.latencyMs || 0;
      map.set(key, entry);
    }

    return Array.from(map.values()).map(e => ({
      route: e.route,
      requests: e.requests,
      totalTokens: e.totalTokens,
      avgLatencyMs: e.requests > 0 ? Math.round(e.totalLatencyMs / e.requests) : 0,
    }));
  } catch (err) {
    console.error('[TokenMeter:RouteAggregateError]', err);
    return [];
  }
}

/**
 * Returns aggregated LLM usage metrics grouped by organization / district.
 */
export async function getOrgUsageAggregates(orgId: string, options: {
  from?: Date;
  to?: Date;
} = {}): Promise<{
  orgId: string;
  totalRequests: number;
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  modelsUsed: string[];
}> {
  try {
    const prisma = await getPrismaClient();
    if (!prisma || !(prisma as any).llmUsageEvent?.findMany) {
      return { orgId, totalRequests: 0, totalTokens: 0, inputTokens: 0, outputTokens: 0, modelsUsed: [] };
    }

    const where: any = {
      OR: [
        { metadata: { path: ['orgId'], equals: orgId } },
        { metadata: { path: ['districtId'], equals: orgId } },
      ],
    };

    if (options.from || options.to) {
      where.createdAt = {};
      if (options.from) where.createdAt.gte = options.from;
      if (options.to) where.createdAt.lte = options.to;
    }

    const events = await (prisma as any).llmUsageEvent.findMany({
      where,
      select: {
        modelId: true,
        inputTokens: true,
        outputTokens: true,
        totalTokens: true,
      },
    });

    const modelsSet = new Set<string>();
    let totalRequests = 0;
    let totalTokens = 0;
    let inputTokens = 0;
    let outputTokens = 0;

    for (const ev of events) {
      totalRequests += 1;
      inputTokens += ev.inputTokens || 0;
      outputTokens += ev.outputTokens || 0;
      totalTokens += ev.totalTokens || 0;
      if (ev.modelId) modelsSet.add(ev.modelId);
    }

    return {
      orgId,
      totalRequests,
      totalTokens,
      inputTokens,
      outputTokens,
      modelsUsed: Array.from(modelsSet),
    };
  } catch (err) {
    console.error('[TokenMeter:OrgAggregateError]', err);
    return { orgId, totalRequests: 0, totalTokens: 0, inputTokens: 0, outputTokens: 0, modelsUsed: [] };
  }
}

/**
 * Checks if a user or organization has exceeded their soft token quota.
 * Default is meter-only mode (returns allowed: true unless ENFORCE_LLM_SOFT_QUOTA=true).
 */
export async function checkSoftQuota(options: SoftQuotaOptions): Promise<SoftQuotaResult> {
  const isEnforced = process.env.ENFORCE_LLM_SOFT_QUOTA === 'true';
  const defaultUserLimit = Number(process.env.LLM_DEFAULT_USER_SOFT_QUOTA_TOKENS || 500000);
  const defaultOrgLimit = Number(process.env.LLM_DEFAULT_ORG_SOFT_QUOTA_TOKENS || 5000000);

  const limit = options.orgId ? defaultOrgLimit : defaultUserLimit;
  const requested = options.requestedTokens || 0;

  // Calculate time window (default: 30 days)
  const windowDays = options.timeWindowDays || 30;
  const from = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);

  let currentUsage = 0;

  try {
    if (options.orgId) {
      const orgAggs = await getOrgUsageAggregates(options.orgId, { from });
      currentUsage = orgAggs.totalTokens;
    } else if (options.userId) {
      const userAggs = await getUserUsageAggregates(options.userId, { from });
      currentUsage = userAggs.totalTokens;
    }
  } catch (err) {
    console.warn('[TokenMeter:QuotaCheckWarning] Could not compute usage aggregates:', err);
  }

  const projectedUsage = currentUsage + requested;
  const quotaExceeded = projectedUsage > limit;

  if (isEnforced && quotaExceeded) {
    return {
      allowed: false,
      quotaExceeded: true,
      currentUsage,
      limit,
      remaining: Math.max(0, limit - currentUsage),
      enforced: true,
      reason: `${options.orgId ? 'Organization' : 'User'} monthly token soft quota of ${limit.toLocaleString()} exceeded (Current: ${currentUsage.toLocaleString()})`,
    };
  }

  return {
    allowed: true,
    quotaExceeded,
    currentUsage,
    limit,
    remaining: Math.max(0, limit - currentUsage),
    enforced: isEnforced,
  };
}
