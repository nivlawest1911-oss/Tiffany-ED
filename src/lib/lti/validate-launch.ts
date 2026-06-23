import { jwtVerify, createRemoteJWKSet } from 'jose';
import { prisma } from '@/lib/prisma';

export interface ValidatedLTI {
  valid: boolean;
  role: 'student' | 'teacher' | 'admin';
  user: any;
  platform?: any;
  returnUrl?: string;
  resourceLinkId?: string;
  deploymentId?: string;
}

export async function validateLtiLaunch(jwt: string): Promise<ValidatedLTI> {
  try {
    const decoded = JSON.parse(
      Buffer.from(jwt.split('.')[1], 'base64').toString()
    );

    const platform = await prisma.ltiPlatform.findFirst({
      where: { 
        issuer: decoded.iss, 
        isActive: true 
      },
    });

    if (!platform) {
      return { valid: false, role: 'student', user: null };
    }

    // Verify JWT signature using the platform's JWKS
    const JWKS = createRemoteJWKSet(new URL(platform.jwksUrl));
    await jwtVerify(jwt, JWKS, {
      issuer: platform.issuer,
      audience: platform.clientId,
    });

    const roles = decoded['https://purl.imsglobal.org/spec/lti/claim/roles'] || [];
    let role: 'student' | 'teacher' | 'admin' = 'student';
    if (roles.some((r: string) => r.includes('Instructor'))) role = 'teacher';
    if (roles.some((r: string) => r.includes('Administrator'))) role = 'admin';

    const deepLinkSettings = decoded['https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings'];
    const resourceLink = decoded['https://purl.imsglobal.org/spec/lti/claim/resource_link'];

    return {
      valid: true,
      role,
      user: {
        ltiUserId: decoded.sub,
        email: decoded.email,
        name: decoded.name || decoded.given_name + ' ' + decoded.family_name,
      },
      platform,
      returnUrl: deepLinkSettings?.deep_link_return_url,
      resourceLinkId: resourceLink?.id,
      deploymentId: decoded['https://purl.imsglobal.org/spec/lti/claim/deployment_id'],
    };
  } catch (error) {
    console.error('LTI validation error:', error);
    return { valid: false, role: 'student', user: null };
  }
}
