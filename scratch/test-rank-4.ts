import { assertBotGate } from '../src/lib/security/bot-gate';
import { 
  withGovernanceEnvelope, 
  assertHumanFinalized, 
  isHighStakes, 
  AI_DISCLOSURE_NOTICE,
  HIGH_STAKES_DOMAINS 
} from '../src/lib/ai/governance-gate';

async function runTests() {
  console.log('=== Running Rank 4 Verification Suite ===\n');

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

  // 1. Test isHighStakes domain classifier
  assert(isHighStakes('iep') === true, 'isHighStakes identifies IEP domain');
  assert(isHighStakes('discipline_restorative') === true, 'isHighStakes identifies restorative justice');
  assert(isHighStakes('student_portfolio_compliance') === true, 'isHighStakes identifies portfolio compliance');
  assert(isHighStakes('state_report') === true, 'isHighStakes identifies state report');
  assert(isHighStakes('casual_chitchat') === false, 'isHighStakes returns false for non-high stakes');

  // 2. Test withGovernanceEnvelope
  const iepOutput = { plan: 'Grade 4 Reading Plan', accommodations: ['Audio Books'] };
  const envelopedIep = withGovernanceEnvelope(iepOutput, { domain: 'iep', isHighStakes: true });
  
  assert(envelopedIep._governance !== undefined, 'Envelope attaches _governance metadata');
  assert(envelopedIep._governance.humanReviewRequired === true, 'High stakes envelope sets humanReviewRequired: true');
  assert(envelopedIep._governance.aiAssisted === true, 'Envelope sets aiAssisted: true');
  assert(envelopedIep._governance.aiDisclosure === AI_DISCLOSURE_NOTICE, 'Envelope includes standard AI disclosure notice');
  assert(envelopedIep._governance.finalized === false, 'Envelope defaults finalized: false');
  assert(envelopedIep.plan === iepOutput.plan, 'Envelope preserves original data properties');

  // 3. Test assertHumanFinalized
  const unconfirmedCheck = assertHumanFinalized({ confirmedByHuman: false });
  assert(unconfirmedCheck.valid === false, 'assertHumanFinalized blocks unconfirmed determination');

  const missingReviewerCheck = assertHumanFinalized({ confirmedByHuman: true, reviewerId: '' });
  assert(missingReviewerCheck.valid === false, 'assertHumanFinalized blocks missing reviewerId');

  const validConfirmationCheck = assertHumanFinalized({ confirmedByHuman: true, reviewerId: 'educator_42' });
  assert(validConfirmationCheck.valid === true, 'assertHumanFinalized allows valid human educator confirmation');

  // 4. Test assertBotGate with internal service key bypass
  process.env.INTERNAL_SERVICE_KEY = 'test-secret-service-key';
  const bypassReq = new Request('http://localhost:3000/api/generate/iep', {
    headers: {
      'x-ironshield-bypass': 'test-secret-service-key',
      'x-request-id': 'test-req-001'
    }
  });
  const bypassResult = await assertBotGate(bypassReq, { routeName: 'test-bypass' });
  assert(bypassResult.allowed === true, 'assertBotGate allows internal service with secret header');
  assert(bypassResult.reason === 'authorized-service-token', 'assertBotGate correctly identifies bypass reason');

  // 5. Test assertBotGate development / standard handling
  const standardReq = new Request('http://localhost:3000/api/differentiate', {
    headers: {
      'x-request-id': 'test-req-002'
    }
  });
  const standardResult = await assertBotGate(standardReq, { routeName: 'test-standard' });
  assert(standardResult.allowed === true, 'assertBotGate allows standard test traffic');

  // 6. Test fail-closed in strict mode when verification throws
  process.env.IRONSHIELD_STRICT_MODE = 'true';
  process.env.NODE_ENV = 'production';
  const strictReq = new Request('http://localhost:3000/api/generate/iep', {
    headers: {
      'x-request-id': 'test-strict-003'
    }
  });
  const strictResult = await assertBotGate(strictReq, { routeName: 'test-strict', failClosed: true, allowCronSecret: false });
  assert(strictResult.allowed === false, 'Strict mode fails closed when challenge cannot be verified');
  assert(strictResult.response !== undefined, 'Strict mode returns a NextResponse');
  assert(strictResult.response?.status === 403, 'Strict mode rejection returns HTTP 403');

  const responseJson = await strictResult.response?.json();
  assert(responseJson.error === 'Security gate validation error', 'Error message is sanitized (no secret leakage)');
  assert(responseJson.requestId === 'test-strict-003', 'Request ID is tracked in response');

  console.log(`\n=== Verification Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
