import { NextRequest, NextResponse } from 'next/server';
import {
  issueGetSignedUrl,
  issueHeadSignedUrl,
  issuePutSignedUrl,
  sanitizePathname,
} from '@/lib/blob';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

type Op = 'get' | 'head' | 'put';

/**
 * POST /api/blob/sign
 * Body: { pathname: string, operation?: 'get'|'head'|'put', ttlMs?: number }
 * Requires an authenticated session (better-auth).
 * Returns a time-limited presigned URL — never exposes BLOB_READ_WRITE_TOKEN.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const pathname = typeof body.pathname === 'string' ? body.pathname : '';
    const operation = (body.operation as Op) || 'get';
    const ttlMs =
      typeof body.ttlMs === 'number' && body.ttlMs > 0 ? body.ttlMs : undefined;

    if (!pathname) {
      return NextResponse.json({ error: 'pathname required' }, { status: 400 });
    }

    // Optional: restrict path prefixes by role (FERPA / district exports)
    const path = sanitizePathname(pathname);
    if (path.startsWith('admin/') || path.startsWith('exports/')) {
      // Tighten later with role claims; for now any authenticated user is blocked from admin paths
      // unless you set ALLOW_ADMIN_BLOB=1 for internal tools
      if (process.env.ALLOW_ADMIN_BLOB !== '1') {
        return NextResponse.json({ error: 'Forbidden path' }, { status: 403 });
      }
    }

    let result: { presignedUrl: string; expiresAt: number; pathname: string };

    switch (operation) {
      case 'head':
        result = await issueHeadSignedUrl(path, { urlTtlMs: ttlMs });
        break;
      case 'put':
        result = await issuePutSignedUrl(path, { urlTtlMs: ttlMs });
        break;
      case 'get':
      default:
        result = await issueGetSignedUrl(path, { urlTtlMs: ttlMs });
        break;
    }

    return NextResponse.json({
      url: result.presignedUrl,
      expiresAt: result.expiresAt,
      pathname: result.pathname,
      operation,
    });
  } catch (err: any) {
    console.error('[blob/sign]', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to sign URL' },
      { status: 500 }
    );
  }
}
