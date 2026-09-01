/**
 * Rank 5 Extension - Universal LLM Metering Verification Suite
 */

import { recordLlmUsage, estimateTokens, extractUsageFromResult } from '../src/lib/ai/token-meter';

async function runTests() {
  console.log('=== Running Rank 5 Extension Universal Metering Verification Suite ===\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Test estimateTokens on varied sample prompts
  const sample1 = "You are the EdIntel mentor for Alabama educators.";
  const est1 = estimateTokens(sample1);
  assert(est1 > 0 && est1 === Math.ceil(sample1.length / 4), 'estimateTokens calculates ~4 chars/token correctly');

  const emptyEst = estimateTokens('');
  assert(emptyEst === 0, 'estimateTokens handles empty string correctly');

  // 2. Test extractUsageFromResult with various formats
  // AI SDK Vercel format
  const aiSdkResult = {
    usage: {
      promptTokens: 120,
      completionTokens: 80,
      totalTokens: 200,
    }
  };
  const extractedAiSdk = extractUsageFromResult(aiSdkResult);
  assert(extractedAiSdk.inputTokens === 120, 'extractUsageFromResult extracts promptTokens');
  assert(extractedAiSdk.outputTokens === 80, 'extractUsageFromResult extracts completionTokens');
  assert(extractedAiSdk.totalTokens === 200, 'extractUsageFromResult extracts totalTokens');
  assert(extractedAiSdk.isEstimated === false, 'extractUsageFromResult marks native AI SDK usage as isEstimated: false');

  // OpenAI raw format
  const openaiResult = {
    usage: {
      prompt_tokens: 350,
      completion_tokens: 150,
      total_tokens: 500,
    }
  };
  const extractedOpenAI = extractUsageFromResult(openaiResult);
  assert(extractedOpenAI.inputTokens === 350, 'extractUsageFromResult extracts prompt_tokens');
  assert(extractedOpenAI.outputTokens === 150, 'extractUsageFromResult extracts completion_tokens');
  assert(extractedOpenAI.totalTokens === 500, 'extractUsageFromResult extracts total_tokens');

  // Google Generative AI usageMetadata format
  const googleResult = {
    usageMetadata: {
      promptTokenCount: 420,
      candidatesTokenCount: 180,
      totalTokenCount: 600,
    }
  };
  const extractedGoogle = extractUsageFromResult(googleResult);
  assert(extractedGoogle.inputTokens === 420, 'extractUsageFromResult extracts promptTokenCount');
  assert(extractedGoogle.outputTokens === 180, 'extractUsageFromResult extracts candidatesTokenCount');
  assert(extractedGoogle.totalTokens === 600, 'extractUsageFromResult extracts totalTokenCount');

  // Fallback text estimation
  const fallbackTextResult = {
    text: "This is a synthesized test output for district strategy command.",
  };
  const extractedFallback = extractUsageFromResult(fallbackTextResult);
  assert(extractedFallback.isEstimated === true, 'extractUsageFromResult flags text fallback as isEstimated: true');
  assert(extractedFallback.outputTokens > 0, 'extractUsageFromResult estimated output tokens from text');

  // 3. Test non-blocking recordLlmUsage for new operations
  const operationsToTest = [
    { modelId: 'gpt-4o', provider: 'openai', operation: 'sovereignAgentPlan', route: 'services/sovereign-agent' },
    { modelId: 'gpt-4o-mini', provider: 'openai', operation: 'swarmMeshCriticAudit', route: 'services/swarm-orchestrator' },
    { modelId: 'gemini-1.5-pro', provider: 'google', operation: 'generateMultimodal', route: 'lib/gemini-service' },
    { modelId: 'gemini-1.5-flash', provider: 'google', operation: 'redTeamAudit', route: 'ai/red-team' },
    { modelId: 'gemini-1.5-flash', provider: 'google', operation: 'distillInsight', route: 'ai/distillation' },
    { modelId: 'gemini-1.5-pro', provider: 'google', operation: 'analyzeTone', route: 'ai/tone-check' },
    { modelId: 'gemini-1.5-pro', provider: 'google', operation: 'searchGriotMedia', route: 'utils/griot-search' },
    { modelId: 'gemini-1.5-pro', provider: 'google', operation: 'analyzeLessonFriction', route: 'utils/lesson-friction' },
    { modelId: 'gemini-1.5-pro', provider: 'google', operation: 'validateCompliance', route: 'utils/vault-sync' },
    { modelId: 'gemini-1.5-pro', provider: 'google', operation: 'generateParentUpdate', route: 'utils/parent-comms' },
    { modelId: 'gemini-1.5-pro', provider: 'google', operation: 'generateBurnoutResponse', route: 'services/burnout-service' },
    { modelId: 'gpt-4o', provider: 'openai', operation: 'antigravityOrchestration', route: 'lib/antigravity-orchestrator' },
    { modelId: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', provider: 'together', operation: 'metaAiChat', route: 'meta-ai/chat' },
    { modelId: 'meta/llama-2-70b-chat', provider: 'replicate', operation: 'metaAiChatReplicate', route: 'meta-ai/chat' },
    { modelId: 'gemini-2.0-flash', provider: 'google', operation: 'workspaceAnalyzeContent', route: 'lib/gemini/workspace' },
    { modelId: 'gemini-2.0-flash', provider: 'google', operation: 'phoneAgentProcessInput', route: 'lib/phone/agent' },
  ];

  for (const op of operationsToTest) {
    let recordedWithoutError = true;
    try {
      void recordLlmUsage({
        modelId: op.modelId,
        provider: op.provider,
        operation: op.operation,
        route: op.route,
        inputTokens: 100,
        outputTokens: 50,
        totalTokens: 150,
        latencyMs: 120,
        userId: 'usr_test_extension',
        orgId: 'org_mobile_county',
        districtId: 'dist_mcpss',
        success: true,
      });
    } catch (e) {
      recordedWithoutError = false;
    }
    assert(recordedWithoutError, `recordLlmUsage succeeds without throwing for operation: ${op.operation}`);
  }

  console.log(`\n=== Extension Verification Results: ${passed} passed, ${failed} failed ===\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error in extension test suite:', err);
  process.exit(1);
});
