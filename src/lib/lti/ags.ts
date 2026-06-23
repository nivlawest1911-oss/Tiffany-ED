import { SignJWT, importPKCS8 } from 'jose';
import { prisma } from '@/lib/prisma';

export interface AgsScorePayload {
  userId: string;
  scoreGiven: number;
  scoreMaximum?: number;
  comment?: string;
  timestamp?: string;
  activityProgress: 'Initialized' | 'Started' | 'InProgress' | 'Submitted' | 'Completed';
  gradingProgress: 'NotReady' | 'Failed' | 'Pending' | 'PendingManual' | 'FullyGraded';
}

export interface AgsResult {
  success: boolean;
  httpStatus?: number;
  error?: string;
}

async function getAgsAccessToken(
  tokenEndpoint: string,
  clientId: string,
  privateKeyPem: string
): Promise<string | null> {
  try {
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

export async function submitScoreToLMS(
  lineItemUrl: string,
  tokenEndpoint: string,
  clientId: string,
  score: AgsScorePayload
): Promise<AgsResult> {
  const privateKeyPem = process.env.LTI_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!privateKeyPem) {
    console.warn('[AGS] LTI_PRIVATE_KEY env var not set.');
    return { success: false, error: 'LTI_PRIVATE_KEY not configured' };
  }

  const accessToken = await getAgsAccessToken(tokenEndpoint, clientId, privateKeyPem);
  if (!accessToken) {
    return { success: false, error: 'Failed to obtain AGS access token' };
  }

  const scoreUrl = lineItemUrl.endsWith('/scores') ? lineItemUrl : `${lineItemUrl}/scores`;

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

    console.log(`[AGS] Score submitted for user ${score.userId}`);
    return { success: true, httpStatus: res.status };
  } catch (err: any) {
    console.error('[AGS] Score submission error:', err);
    return { success: false, error: err.message };
  }
}

export async function submitScoreByLineItemId(
  lineItemId: string,
  score: AgsScorePayload
): Promise<AgsResult> {
  const lineItem = await prisma.ltiLineItem.findUnique({
    where: { id: lineItemId },
    include: { platform: true },
  });

  if (!lineItem?.lineItemUrl) {
    return { success: false, error: `LtiLineItem ${lineItemId} not found` };
  }

  return submitScoreToLMS(
    lineItem.lineItemUrl,
    lineItem.platform.authTokenUrl,
    lineItem.platform.clientId,
    score
  );
}
