import { 
  recordLlmUsage, 
  extractUsageFromResult, 
  estimateTokens, 
  withLlmMeter,
  getLlmUsageAggregates,
  getUserUsageAggregates,
  getRouteUsageAggregates,
  checkSoftQuota 
} from '../src/lib/ai/token-meter';

async function runTests() {
  console.log('=== Running Rank 5 Verification Suite ===\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, name: string) {
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name}`);
      failed++;
    }
  }

  // 1. Test estimateTokens helper
  const sample1 = "Hello world"; // 11 chars -> ~3 tokens
  const count1 = estimateTokens(sample1);
  assert(count1 >= 2 && count1 <= 4, `estimateTokens('${sample1}') = ${count1} (expected ~3)`);

  const emptyCount = estimateTokens("");
  assert(emptyCount === 0, 'estimateTokens("") returns 0');

  const longText = "a".repeat(400); // 400 chars -> 100 tokens
  assert(estimateTokens(longText) === 100, `estimateTokens(400 chars) = 100`);

  // 2. Test extractUsageFromResult with provider-native usage
  const nativePayload = {
    usage: {
      promptTokens: 120,
      completionTokens: 450,
      totalTokens: 570
    }
  };
  const nativeUsage = extractUsageFromResult(nativePayload);
  assert(nativeUsage.inputTokens === 120, 'extractUsageFromResult extracts promptTokens as inputTokens');
  assert(nativeUsage.outputTokens === 450, 'extractUsageFromResult extracts completionTokens as outputTokens');
  assert(nativeUsage.totalTokens === 570, 'extractUsageFromResult extracts totalTokens');
  assert(nativeUsage.isEstimated === false, 'Native usage is not flagged estimated');

  // 3. Test extractUsageFromResult with alternative SDK naming
  const altPayload = {
    inputTokens: 85,
    outputTokens: 215
  };
  const altUsage = extractUsageFromResult(altPayload);
  assert(altUsage.inputTokens === 85 && altUsage.outputTokens === 215 && altUsage.totalTokens === 300, 'extractUsageFromResult computes totalTokens when missing');

  // 4. Test extractUsageFromResult fallback to estimated tokens
  const emptyPayload = {};
  const estimatedUsage = extractUsageFromResult(emptyPayload, "This is a generated test output with approximately twenty words or so.");
  assert(estimatedUsage.isEstimated === true, 'Empty usage with fallback text is flagged estimated: true');
  assert(estimatedUsage.totalTokens > 0, 'Estimated total tokens is > 0');

  // 5. Test recordLlmUsage non-blocking safety (must never throw)
  let recordErrorThrown = false;
  try {
    await recordLlmUsage({
      modelId: 'gemini-1.5-pro',
      provider: 'google',
      operation: 'unit-test',
      route: 'test/route',
      inputTokens: 100,
      outputTokens: 200,
      totalTokens: 300,
      latencyMs: 150,
      success: true,
      userId: 'test-user-123',
      orgId: 'test-org-456',
      districtId: 'test-district-789',
      isEstimated: false,
      requestId: 'req_test_001',
      metadata: {
        safeField: 'safe-value',
        prompt: 'FORBIDDEN_PROMPT_TEXT_SHOULD_BE_STRIPPED' // Should be stripped by sanitizeMetadata
      }
    });
  } catch {
    recordErrorThrown = true;
  }
  assert(recordErrorThrown === false, 'recordLlmUsage executes non-blockingly without throwing');

  // 6. Test withLlmMeter wrapper
  const testFn = async () => {
    return {
      output: 'Differentiated passage result',
      usage: { inputTokens: 50, outputTokens: 150, totalTokens: 200 }
    };
  };

  const wrappedResult = await withLlmMeter({
    modelId: 'gemini-1.5-flash',
    provider: 'google',
    operation: 'wrappedTest',
    route: 'test/wrapped',
    userId: 'user_wrapped_1',
  }, testFn);

  assert(wrappedResult.output === 'Differentiated passage result', 'withLlmMeter transparently returns function result');

  // 7. Test checkSoftQuota in default meter-only mode
  const defaultQuota = await checkSoftQuota({
    userId: 'user_quota_test',
    requestedTokens: 50000
  });
  assert(defaultQuota.allowed === true, 'checkSoftQuota allows requests in default meter-only mode');
  assert(defaultQuota.enforced === false, 'checkSoftQuota marks enforced: false when ENFORCE_LLM_SOFT_QUOTA is off');

  // 8. Test checkSoftQuota in enforced mode
  process.env.ENFORCE_LLM_SOFT_QUOTA = 'true';
  process.env.LLM_DEFAULT_USER_SOFT_QUOTA_TOKENS = '1000';
  const enforcedQuotaExceeded = await checkSoftQuota({
    userId: 'user_quota_test_2',
    requestedTokens: 5000 // Exceeds limit of 1000
  });
  assert(enforcedQuotaExceeded.allowed === false, 'checkSoftQuota blocks when quota is exceeded in enforced mode');
  assert(enforcedQuotaExceeded.quotaExceeded === true, 'checkSoftQuota sets quotaExceeded: true');
  assert(enforcedQuotaExceeded.enforced === true, 'checkSoftQuota sets enforced: true');

  const enforcedQuotaAllowed = await checkSoftQuota({
    userId: 'user_quota_test_3',
    requestedTokens: 500 // Within limit of 1000
  });
  assert(enforcedQuotaAllowed.allowed === true, 'checkSoftQuota allows within limit in enforced mode');

  // Reset env
  delete process.env.ENFORCE_LLM_SOFT_QUOTA;

  // 9. Test Aggregation helper signatures
  const aggs = await getLlmUsageAggregates();
  assert(Array.isArray(aggs), 'getLlmUsageAggregates returns an array');

  const userAggs = await getUserUsageAggregates('test-user-123');
  assert(typeof userAggs.totalTokens === 'number', 'getUserUsageAggregates returns user metrics object');

  const routeAggs = await getRouteUsageAggregates();
  assert(Array.isArray(routeAggs), 'getRouteUsageAggregates returns an array');

  console.log(`\n=== Verification Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
