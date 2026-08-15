import { NextRequest, NextResponse } from 'next/server';
import { streamPrivateBlob, sanitizePathname } from '@/lib/blob';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

/**
 * GET /api/blob/stream?pathname=exports/report.pdf
 * Authenticated proxy: server fetches private blob with get() and streams to client.
 * Prefer signed URLs for large media; use this when you must keep the blob URL off the client.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pathname = request.nextUrl.searchParams.get('pathname');
    if (!pathname) {
      return NextResponse.json({ error: 'pathname required' }, { status: 400 });
    }

    const path = sanitizePathname(pathname);
    const result = await streamPrivateBlob(path);

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
