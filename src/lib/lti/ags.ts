/**
 * LTI 1.3 Advantage – Assignment & Grade Services (AGS)
 *
 * Enables EdIntel to push AI-generated rubric scores back into the
 * LMS gradebook (Canvas, Clever, Google Classroom).
 *
 * Spec: https://www.imsglobal.org/spec/lti-ags/v2p0
 */

export interface AgsScorePayload {
  /** Sub claim from the LTI launch token (the student's LTI user ID) */
  userId: string;
  /** Score achieved (0 – scoreMaximum) */
  scoreGiven: number;
  /** Maximum possible score (defaults to 100) */
  scoreMaximum?: number;
  /** Human-readable comment shown in the gradebook */
  comment?: string;
  /** ISO 8601 timestamp; defaults to now */
  timestamp?: string;
  /** Activity progress: "Initialized" | "Started" | "InProgress" | "Submitted" | "Completed" */
  activityProgress: 'Initialized' | 'Started' | 'InProgress' | 'Submitted' | 'Completed';
  /** Grading progress: "NotReady" | "Failed" | "Pending" | "PendingManual" | "FullyGraded" */
  gradingProgress: 'NotReady' | 'Failed' | 'Pending' | 'PendingManual' | 'FullyGraded';
}

export interface AgsResult {
  success: boolean;
  httpStatus?: number;
  error?: string;
}

/**
 * Requests an OAuth 2.0 access token from the LTI platform's token endpoint.
 * Scopes are set for AGS score writing.
 */
async function getAgsAccessToken(
  tokenEndpoint: string,
  clientId: string,
  privateKeyPem: string
): Promise<string | null> {
  try {
    // In production: sign a client_assertion JWT with your private key using 'jose'
    // and post it to the platform token endpoint.
    // This is a structural placeholder — wire your LTI_PRIVATE_KEY env var here.
    const { SignJWT, importPKCS8 } = await import('jose');
    const privateKey = await importPKCS8(privateKeyPem, 'RS256');

    const clientAssertion = await new SignJWT({})
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuer(clientId)
      .setSubject(clientId)
      .setAudience(tokenEndpoint)
      .setJti(crypto.randomUUID())
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(privateKey);

    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: clientAssertion,
      scope: [
        'https://purl.imsglobal.org/spec/lti-ags/scope/score',
        'https://purl.imsglobal.org/spec/lti-ags/scope/lineitem',
        'https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly',
      ].join(' '),
    });

    const res = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) {
      console.error('[AGS] Token request failed:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data.access_token ?? null;
  } catch (err) {
    console.error('[AGS] Token exchange error:', err);
    return null;
  }
}

/**
 * Submits a score for a student to the LMS via the AGS Score service.
 *
 * @param lineItemUrl  - Full URL of the LMS line item (stored in LtiLineItem.lineItemUrl)
 * @param tokenEndpoint - Platform's OAuth token endpoint (LtiPlatform.authTokenUrl)
 * @param clientId     - LTI client ID for EdIntel (LtiPlatform.clientId)
 * @param score        - Score payload to submit
 */
export async function submitScoreToLMS(
  lineItemUrl: string,
  tokenEndpoint: string,
  clientId: string,
  score: AgsScorePayload
): Promise<AgsResult> {
  const privateKeyPem = process.env.LTI_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!privateKeyPem) {
    console.warn('[AGS] LTI_PRIVATE_KEY env var not set — score passback skipped.');
    return { success: false, error: 'LTI_PRIVATE_KEY not configured' };
  }

  const accessToken = await getAgsAccessToken(tokenEndpoint, clientId, privateKeyPem);
  if (!accessToken) {
    return { success: false, error: 'Failed to obtain AGS access token' };
  }

  const scoreUrl = lineItemUrl.endsWith('/scores')
    ? lineItemUrl
    : `${lineItemUrl}/scores`;

  const body = {
    scoreGiven: score.scoreGiven,
    scoreMaximum: score.scoreMaximum ?? 100,
    comment: score.comment,
    timestamp: score.timestamp ?? new Date().toISOString(),
    activityProgress: score.activityProgress,
    gradingProgress: score.gradingProgress,
    userId: score.userId,
  };

  try {
    const res = await fetch(scoreUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/vnd.ims.lis.v1.score+json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[AGS] Score submission failed:', res.status, errorText);
      return { success: false, httpStatus: res.status, error: errorText };
    }

    console.log(`[AGS] Score submitted successfully for user ${score.userId} → lineItem: ${lineItemUrl}`);
    return { success: true, httpStatus: res.status };
  } catch (err: any) {
    console.error('[AGS] Score submission error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Convenience wrapper: look up the LtiLineItem + platform from the DB,
 * then call submitScoreToLMS.
 *
 * @param lineItemId - LtiLineItem.id from EdIntel's database
 * @param score      - Score payload
 */
export async function submitScoreByLineItemId(
  lineItemId: string,
  score: AgsScorePayload
): Promise<AgsResult> {
  const { prisma } = await import('@/lib/prisma');

  const lineItem = await prisma.ltiLineItem.findUnique({
    where: { id: lineItemId },
    include: { platform: true },
  });

  if (!lineItem?.lineItemUrl) {
    return { success: false, error: `LtiLineItem ${lineItemId} not found or has no lineItemUrl` };
  }

  return submitScoreToLMS(
    lineItem.lineItemUrl,
    lineItem.platform.authTokenUrl,
    lineItem.platform.clientId,
    score
  );
}
