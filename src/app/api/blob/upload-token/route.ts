import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@/lib/auth';
import { assertBlobAccess } from '@/lib/blob-acl';
import { buildBlobPrincipal } from '@/lib/rbac-stripe';
import { userVaultPath } from '@/lib/blob-acl';

export const runtime = 'nodejs';

/**
 * POST /api/blob/upload-token
 * Client uploads (large media) — token issued only after session + ACL checks.
 * Default path: users/{userId}/uploads/...
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHENTICATED' },
        { status: 401 }
      );
    }

    const principal = await buildBlobPrincipal(session.user as any);
    if (!principal) {
      return NextResponse.json(
        { error: 'Unable to resolve principal', code: 'TIER_MISSING' },
        { status: 403 }
      );
    }

    const body = (await request.json()) as HandleUploadBody;

    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Force user-owned vault if client omits or tries foreign path
        let path = pathname || '';
        if (!path.startsWith(`users/${principal.userId}/`)) {
          path = userVaultPath(principal.userId, 'uploads', path || 'file');
        }

        const decision = assertBlobAccess(principal, path, 'put');
        if (!decision.allowed) {
          throw new Error(decision.reason || 'Upload forbidden');
        }

        return {
          allowedContentTypes: [
            'video/mp4',
            'video/webm',
            'image/png',
            'image/jpeg',
            'image/webp',
            'application/pdf',
            'audio/wav',
            'audio/mpeg',
          ],
          maximumSizeInBytes: 200 * 1024 * 1024,
          tokenPayload: JSON.stringify({
            userId: principal.userId,
            tier: principal.tier,
            policy: decision.policy,
          }),
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('[blob/upload-token] completed', {
          url: blob.url,
          pathname: blob.pathname,
          tokenPayload,
        });
      },
    });

    return NextResponse.json(json);
  } catch (e: any) {
    console.error('[blob/upload-token]', e);
    const msg = e?.message || 'Upload token failed';
    const status = /sign in|unauthorized/i.test(msg)
      ? 401
      : /forbidden|tier|owner/i.test(msg)
        ? 403
        : 400;
    return NextResponse.json({ error: msg, code: 'UPLOAD_DENIED' }, { status });
  }
}
