import { NextRequest, NextResponse } from 'next/server';
import {
  issueGetSignedUrl,
  issueHeadSignedUrl,
  issuePutSignedUrl,
} from '@/lib/blob';
import { assertBlobAccess, type BlobOperation, type BlobPrincipal } from '@/lib/blob-acl';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

function principalFromSession(session: any): BlobPrincipal {
  const u = session.user;
  return {
    userId: u.id,
    email: u.email,
    tier: (u as any).tier || (u as any).plan || null,
    district: (u as any).district || null,
    schoolSite: (u as any).school_site || null,
    position: (u as any).position || null,
    isAdmin: (u as any).role === 'admin' || (u as any).isAdmin === true,
  };
}

/**
 * POST /api/blob/sign
 * Body: { pathname, operation?: 'get'|'head'|'put', ttlMs?: number }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHENTICATED' }, { status: 401 });
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

    const principal = principalFromSession(session);
    const decision = assertBlobAccess(principal, pathname, operation);
    if (!decision.allowed) {
      const status =
        decision.code === 'UNAUTHENTICATED'
          ? 401
          : decision.code === 'TIER'
            ? 402
            : 403;
      return NextResponse.json(
        { error: decision.reason, code: decision.code },
        { status }
      );
    }

    let result: { presignedUrl: string; expiresAt: number; pathname: string };
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

    return NextResponse.json({
      url: result.presignedUrl,
      expiresAt: result.expiresAt,
      pathname: result.pathname,
      operation,
      policy: decision.policy,
    });
  } catch (err: any) {
    console.error('[blob/sign]', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to sign URL' },
      { status: 500 }
    );
  }
}
