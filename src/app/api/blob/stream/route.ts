import { NextRequest, NextResponse } from 'next/server';
import { streamPrivateBlob } from '@/lib/blob';
import { assertBlobAccess, type BlobPrincipal } from '@/lib/blob-acl';
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
 * GET /api/blob/stream?pathname=exports/{userId}/report.pdf
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHENTICATED' }, { status: 401 });
    }

    const pathname = request.nextUrl.searchParams.get('pathname');
    if (!pathname) {
      return NextResponse.json({ error: 'pathname required' }, { status: 400 });
    }

    const principal = principalFromSession(session);
    const decision = assertBlobAccess(principal, pathname, 'get');
    if (!decision.allowed) {
      const status =
        decision.code === 'TIER' ? 402 : decision.code === 'UNAUTHENTICATED' ? 401 : 403;
      return NextResponse.json(
        { error: decision.reason, code: decision.code },
        { status }
      );
    }

    const result = await streamPrivateBlob(pathname);
    const contentType =
      (result as any).blob?.contentType ||
      (result as any).contentType ||
      'application/octet-stream';
    const stream = (result as any).stream;
    if (!stream) {
      return NextResponse.json({ error: 'No stream' }, { status: 404 });
    }

    return new NextResponse(stream, {
      headers: {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, no-store',
        'X-Blob-Policy': decision.policy,
      },
    });
  } catch (err: any) {
    console.error('[blob/stream]', err);
    const status = /not found/i.test(err?.message || '') ? 404 : 500;
    return NextResponse.json(
      { error: err?.message || 'Stream failed' },
      { status }
    );
  }
}
