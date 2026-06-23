import { NextRequest, NextResponse } from 'next/server';
import { validateLtiLaunch } from '@/lib/lti/validate-launch';
import {
  EDINTEL_DEEP_LINK_RESOURCES,
  buildDeepLinkResponseJwt,
} from '@/lib/lti/deep-linking';

export const dynamic = 'force-dynamic';

/**
 * POST /api/lti/deep-link
 *
 * Handles an LTI 1.3 Deep Linking Request from the LMS.
 * Validates the launch, selects resources based on the "resource" query param
 * (or returns all resources as a picker), and returns the signed JWT response.
 *
 * Usage:
 *   - LMS calls this endpoint with a signed id_token + state
 *   - EdIntel validates the token (same as launch)
 *   - EdIntel returns a Deep Linking Response JWT that the LMS renders
 */
export async function POST(req: NextRequest) {
  try {
    const launchResult = await validateLtiLaunch(req);

    if (!launchResult.valid || !launchResult.claims) {
      return NextResponse.json(
        { error: 'Invalid LTI Deep Linking launch', detail: launchResult.error },
        { status: 401 }
      );
    }

    const { claims } = launchResult;

    // Confirm this is a Deep Linking request
    const messageType =
      claims['https://purl.imsglobal.org/spec/lti/claim/message_type'];
    if (messageType !== 'LtiDeepLinkingRequest') {
      return NextResponse.json(
        { error: `Expected LtiDeepLinkingRequest, got ${messageType}` },
        { status: 400 }
      );
    }

    const deepLinkSettings = (claims as any)[
      'https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings'
    ];

    if (!deepLinkSettings?.deep_link_return_url) {
      return NextResponse.json(
        { error: 'Missing deep_link_return_url in claims' },
        { status: 400 }
      );
    }

    const privateKeyPem = process.env.LTI_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!privateKeyPem) {
      return NextResponse.json(
        { error: 'LTI_PRIVATE_KEY env var not configured' },
        { status: 500 }
      );
    }

    // Allow the caller to specify specific resource IDs via query param;
    // otherwise return all resources as deep link items.
    const { searchParams } = new URL(req.url);
    const requestedIds = searchParams.get('resources')?.split(',') ?? [];
    const selectedItems =
      requestedIds.length > 0
        ? EDINTEL_DEEP_LINK_RESOURCES.filter((r) =>
            requestedIds.includes(
              r.url.replace(/^\//, '') // strip leading slash for comparison
            )
          )
        : EDINTEL_DEEP_LINK_RESOURCES;

    // Look up the platform record to get clientId and deploymentId
    const { prisma } = await import('@/lib/prisma');
    const platform = await prisma.ltiPlatform.findUnique({
      where: { issuer: claims.iss },
    });

    if (!platform) {
      return NextResponse.json(
        { error: `Platform not registered for issuer: ${claims.iss}` },
        { status: 404 }
      );
    }

    const responseJwt = await buildDeepLinkResponseJwt({
      deepLinkReturnUrl: deepLinkSettings.deep_link_return_url,
      clientId: platform.clientId,
      items: selectedItems,
      privateKeyPem,
      deploymentId:
        claims['https://purl.imsglobal.org/spec/lti/claim/deployment_id'],
    });

    // The LMS expects a self-submitting HTML form POSTing the JWT back
    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Redirecting to LMS…</title></head>
<body onload="document.forms[0].submit()">
  <form method="POST" action="${deepLinkSettings.deep_link_return_url}">
    <input type="hidden" name="JWT" value="${responseJwt}" />
    <noscript>
      <button type="submit">Complete Deep Linking</button>
    </noscript>
  </form>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err: any) {
    console.error('[LTI Deep Link] Handler error:', err);
    return NextResponse.json(
      { error: err.message ?? 'Internal error during Deep Linking' },
      { status: 500 }
    );
  }
}
