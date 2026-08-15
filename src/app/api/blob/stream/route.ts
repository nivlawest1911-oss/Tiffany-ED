import { NextRequest, NextResponse } from 'next/server';
import { streamPrivateBlob } from '@/lib/blob';
import { assertBlobAccess } from '@/lib/blob-acl';
import { buildBlobPrincipal } from '@/lib/rbac-stripe';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHENTICATED' },
        { status: 401 }
      );
    }

    const pathname = request.nextUrl.searchParams.get('pathname');
    if (!pathname) {
      return NextResponse.json({ error: 'pathname required' }, { status: 400 });
    }

    const principal = await buildBlobPrincipal(session.user as any);
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
        'X-EdIntel-Tier': principal?.tier || 'sovereign-initiate',
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
