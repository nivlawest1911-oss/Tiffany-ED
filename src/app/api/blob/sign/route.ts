import { NextRequest, NextResponse } from 'next/server';
import {
  issueGetSignedUrl,
  issueHeadSignedUrl,
  issuePutSignedUrl,
} from '@/lib/blob';
import { assertBlobAccess, type BlobOperation } from '@/lib/blob-acl';
import { buildBlobPrincipal, resolveUserTier } from '@/lib/rbac-stripe';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHENTICATED' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const pathname = typeof body.pathname === 'string' ? body.pathname : '';
    const operation = ((body.operation as BlobOperation) || 'get') as BlobOperation;
    const ttlMs =
      typeof body.ttlMs === 'number' && body.ttlMs > 0 ? body.ttlMs : undefined;

    if (!pathname) {
      return NextResponse.json({ error: 'pathname required' }, { status: 400 });
    }
    if (!['get', 'head', 'put'].includes(operation)) {
      return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
    }

    const principal = await buildBlobPrincipal(session.user as any);
    if (!principal) {
      return NextResponse.json(
        { error: 'Unable to resolve access principal', code: 'TIER_MISSING' },
        { status: 403 }
      );
    }

    const entitlement = await resolveUserTier(session.user as any);

    const decision = assertBlobAccess(principal, pathname, operation);
    if (!decision.allowed) {
      const status =
        decision.code === 'UNAUTHENTICATED'
          ? 401
          : decision.code === 'TIER'
            ? 402
            : 403;
      return NextResponse.json(
        {
          error: decision.reason,
          code: decision.code,
          tier: principal.tier,
          tierWarning: entitlement.warning || null,
        },
        { status }
      );
    }

    let result: { presignedUrl: string; expiresAt: number; pathname: string };
    try {
      switch (operation) {
        case 'head':
          result = await issueHeadSignedUrl(pathname, { urlTtlMs: ttlMs });
          break;
        case 'put':
          result = await issuePutSignedUrl(pathname, { urlTtlMs: ttlMs });
          break;
        default:
          result = await issueGetSignedUrl(pathname, { urlTtlMs: ttlMs });
      }
    } catch (signErr: any) {
      console.error('[blob/sign] presign failed', signErr);
      return NextResponse.json(
        {
          error: signErr?.message || 'Failed to mint signed URL',
          code: 'SIGN_FAILED',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      url: result.presignedUrl,
      expiresAt: result.expiresAt,
      pathname: result.pathname,
      operation,
      policy: decision.policy,
      tier: principal.tier,
      tierSource: entitlement.source,
      tierWarning: entitlement.warning || null,
    });
  } catch (err: any) {
    console.error('[blob/sign]', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to sign URL', code: 'INTERNAL' },
      { status: 500 }
    );
  }
}
