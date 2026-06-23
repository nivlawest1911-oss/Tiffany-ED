// =====================================================
// EdIntel Sovereign — LTI 1.3 Launch Validation (Starter)
// Place in: lib/lti/validateLaunch.ts
// This is a minimal secure starter. Full LTI 1.3 requires
// platform registration, JWKS, and proper state/nonce handling.
// =====================================================

import { jwtVerify, createRemoteJWKSet } from 'jose';
import { NextRequest } from 'next/server';

interface LTIClaims {
  iss: string;
  aud: string;
  sub: string;
  exp: number;
  iat: number;
  nonce: string;
  'https://purl.imsglobal.org/spec/lti/claim/message_type': string;
  'https://purl.imsglobal.org/spec/lti/claim/version': string;
  'https://purl.imsglobal.org/spec/lti/claim/deployment_id': string;
  'https://purl.imsglobal.org/spec/lti/claim/target_link_uri': string;
  'https://purl.imsglobal.org/spec/lti/claim/roles': string[];
  'https://purl.imsglobal.org/spec/lti/claim/context'?: {
    id: string;
    title?: string;
  };
  'https://purl.imsglobal.org/spec/lti/claim/resource_link'?: {
    id: string;
    title?: string;
  };
}

const LTI_ISSUERS = {
  canvas: 'https://canvas.instructure.com',
  google: 'https://classroom.google.com',
  clever: 'https://clever.com',
  // Add your district's platforms here
};

export async function validateLTI13Launch(request: NextRequest): Promise<{
  valid: boolean;
  claims?: LTIClaims;
  error?: string;
}> {
  try {
    const formData = await request.formData();
    const idToken = formData.get('id_token') as string;
    const state = formData.get('state') as string;

    if (!idToken) {
      return { valid: false, error: 'Missing id_token' };
    }

    // In production: validate state against stored value (anti-CSRF)
    if (!state) {
      return { valid: false, error: 'Missing state parameter' };
    }

    // Decode header to get kid
    const header = JSON.parse(
      Buffer.from(idToken.split('.')[0], 'base64').toString()
    );
    const kid = header.kid;

    if (!kid) {
      return { valid: false, error: 'Missing kid in token header' };
    }

    // TODO: In production, dynamically fetch JWKS from the platform's .well-known/jwks
    // For now, this is a placeholder. Replace with real platform JWKS URL.
    const jwksUrl = 'https://YOUR_PLATFORM_DOMAIN/.well-known/jwks'; // ← Replace per platform
    const JWKS = createRemoteJWKSet(new URL(jwksUrl));

    const { payload } = await jwtVerify(idToken, JWKS, {
      algorithms: ['RS256'],
      issuer: Object.values(LTI_ISSUERS), // Allow multiple trusted issuers
      audience: process.env.LTI_CLIENT_ID!, // Your tool's client_id registered with the platform
    });

    const claims = payload as unknown as LTIClaims;

    // Basic LTI 1.3 message type check
    if (claims['https://purl.imsglobal.org/spec/lti/claim/message_type'] !== 'LtiResourceLinkRequest') {
      return { valid: false, error: 'Unsupported LTI message type' };
    }

    // Role mapping (example)
    const roles = claims['https://purl.imsglobal.org/spec/lti/claim/roles'] || [];
    const isTeacher = roles.some(r => r.includes('Instructor'));
    const isAdmin = roles.some(r => r.includes('Administrator'));

    console.log('[LTI] Valid launch from:', claims.iss, 'Roles:', roles);

    return {
      valid: true,
      claims: {
        ...claims,
        // Add your internal role mapping here
        internalRole: isAdmin ? 'ADMIN' : isTeacher ? 'TEACHER' : 'STUDENT',
      } as LTIClaims,
    };
  } catch (error: any) {
    console.error('[LTI] Validation failed:', error.message);
    return { valid: false, error: error.message || 'LTI validation failed' };
  }
}
