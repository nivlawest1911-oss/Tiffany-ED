import { prisma } from '@/lib/prisma'; // adjust if your prisma client path is different

interface TrackCostParams {
  districtId?: string;
  userId?: string;
  sessionType: 'differentiation' | 'progress_report' | 'grouping' | 'tiffany_ed' | string;
  tokensUsed: number;
  modelUsed?: string;
}

/**
 * Logs token usage + estimated cost for every AI generation.
 * This is the foundation for true unit economics visibility.
 */
export async function trackCost(params: TrackCostParams) {
  const estimatedCost = calculateEstimatedCost(params.tokensUsed, params.modelUsed);

  try {
    await prisma.usageMetric.create({
      data: {
        districtId: params.districtId,
        userId: params.userId,
        sessionType: params.sessionType,
        tokensUsed: params.tokensUsed,
        estimatedCost,
        modelUsed: params.modelUsed || 'unknown',
      },
    });
  } catch (error) {
    // Fail silently in production so we never break user experience
    console.error('[CostTracker] Failed to log usage metric:', error);
  }

  return estimatedCost;
}

/**
 * Simple cost model — adjust these rates as you get real data from your LLM provider.
 * Current rates are conservative estimates for GPT-4o / Claude 3.5 / Gemini 1.5 class models.
 */
function calculateEstimatedCost(tokens: number, model?: string): number {
  // Rough blended rate: ~$0.0025 per 1K tokens average across routing
  const ratePerThousandTokens = 0.0025;
  return Math.round((tokens / 1000) * ratePerThousandTokens * 10000) / 10000;
}
