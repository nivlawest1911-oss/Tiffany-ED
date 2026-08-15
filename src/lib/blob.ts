/**
 * Vercel Blob helpers — private storage + signed URL access patterns.
 * Requires BLOB_READ_WRITE_TOKEN (or OIDC on Vercel).
 * Store should be created with private access for these APIs to apply fully.
 */
import {
  put,
  get,
  del,
  head,
  list,
  issueSignedToken,
  presignUrl,
  type PutBlobResult,
} from '@vercel/blob';

export type BlobAccess = 'public' | 'private';

const DEFAULT_GET_TTL_MS = 5 * 60 * 1000; // 5 minutes
const DEFAULT_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour (reuse across presigns)
const MAX_SIGNED_TTL_MS = 7 * 24 * 60 * 60 * 1000; // platform max ~7 days

/** Prevent path traversal / absolute URLs in pathname args */
export function sanitizePathname(pathname: string): string {
  const cleaned = pathname
    .replace(/^\/+/, '')
    .replace(/\\/g, '/')
    .split('/')
    .filter((s) => s && s !== '.' && s !== '..')
    .join('/');
  if (!cleaned) throw new Error('Invalid pathname');
  return cleaned;
}

function clampTtl(ms: number): number {
  return Math.min(Math.max(ms, 30_000), MAX_SIGNED_TTL_MS);
}

/**
 * Upload a private object. Prefer this for FERPA-sensitive docs, exports, invoices.
 */
export async function putPrivate(
  pathname: string,
  body: Parameters<typeof put>[1],
  opts?: { contentType?: string; addRandomSuffix?: boolean; allowOverwrite?: boolean }
): Promise<PutBlobResult> {
  const path = sanitizePathname(pathname);
  return put(path, body, {
    access: 'private',
    contentType: opts?.contentType,
    addRandomSuffix: opts?.addRandomSuffix ?? true,
    allowOverwrite: opts?.allowOverwrite,
  });
}

/**
 * Upload a public object (marketing videos, brand assets).
 */
export async function putPublic(
  pathname: string,
  body: Parameters<typeof put>[1],
  opts?: { contentType?: string; addRandomSuffix?: boolean }
): Promise<PutBlobResult> {
  const path = sanitizePathname(pathname);
  return put(path, body, {
    access: 'public',
    contentType: opts?.contentType,
    addRandomSuffix: opts?.addRandomSuffix ?? true,
  });
}

/**
 * Stream a private blob through your server (auth already done by caller).
 * Use when you do not want to mint a client-visible signed URL.
 */
export async function streamPrivateBlob(pathnameOrUrl: string) {
  const result = await get(pathnameOrUrl, { access: 'private' });
  if (!result) throw new Error('Blob not found');
  return result;
}

export async function headPrivate(pathnameOrUrl: string) {
  return head(pathnameOrUrl);
}

export async function deleteBlob(urlOrPathname: string | string[]) {
  return del(urlOrPathname);
}

export async function listBlobs(prefix?: string) {
  return list({ prefix: prefix ? sanitizePathname(prefix) : undefined });
}

/**
 * Issue a delegation token for a pathname + operations, then presign a GET URL.
 * Cache `issueSignedToken` results per pathname when minting many short URLs.
 */
export async function issueGetSignedUrl(
  pathname: string,
  options?: { urlTtlMs?: number; tokenTtlMs?: number }
): Promise<{ presignedUrl: string; expiresAt: number; pathname: string }> {
  const path = sanitizePathname(pathname);
  const tokenTtl = clampTtl(options?.tokenTtlMs ?? DEFAULT_TOKEN_TTL_MS);
  const urlTtl = clampTtl(options?.urlTtlMs ?? DEFAULT_GET_TTL_MS);
  const validUntil = Date.now() + tokenTtl;

  const token = await issueSignedToken({
    pathname: path,
    operations: ['get'],
    validUntil,
  });

  const expiresAt = Date.now() + urlTtl;
  const { presignedUrl } = await presignUrl(token, {
    operation: 'get',
    pathname: path,
    access: 'private',
    validUntil: expiresAt,
  });

  return { presignedUrl, expiresAt, pathname: path };
}

/** HEAD-only signed URL — metadata without transferring bytes */
export async function issueHeadSignedUrl(
  pathname: string,
  options?: { urlTtlMs?: number; tokenTtlMs?: number }
): Promise<{ presignedUrl: string; expiresAt: number; pathname: string }> {
  const path = sanitizePathname(pathname);
  const tokenTtl = clampTtl(options?.tokenTtlMs ?? DEFAULT_TOKEN_TTL_MS);
  const urlTtl = clampTtl(options?.urlTtlMs ?? DEFAULT_GET_TTL_MS);
  const validUntil = Date.now() + tokenTtl;

  const token = await issueSignedToken({
    pathname: path,
    operations: ['head'],
    validUntil,
  });

  const expiresAt = Date.now() + urlTtl;
  const { presignedUrl } = await presignUrl(token, {
    operation: 'head',
    pathname: path,
    access: 'private',
    validUntil: expiresAt,
  });

  return { presignedUrl, expiresAt, pathname: path };
}

/** Time-limited PUT for direct-to-Blob client uploads of a single private object */
export async function issuePutSignedUrl(
  pathname: string,
  options?: { urlTtlMs?: number; tokenTtlMs?: number }
): Promise<{ presignedUrl: string; expiresAt: number; pathname: string }> {
  const path = sanitizePathname(pathname);
  const tokenTtl = clampTtl(options?.tokenTtlMs ?? DEFAULT_TOKEN_TTL_MS);
  const urlTtl = clampTtl(options?.urlTtlMs ?? 15 * 60 * 1000);
  const validUntil = Date.now() + tokenTtl;

  const token = await issueSignedToken({
    pathname: path,
    operations: ['put'],
    validUntil,
  });

  const expiresAt = Date.now() + urlTtl;
  const { presignedUrl } = await presignUrl(token, {
    operation: 'put',
    pathname: path,
    access: 'private',
    validUntil: expiresAt,
  });

  return { presignedUrl, expiresAt, pathname: path };
}

/** Multi-op token (e.g. get+head) for internal tooling — still presign per operation */
export async function issueDelegationToken(
  pathname: string,
  operations: Array<'get' | 'head' | 'put' | 'delete'>,
  tokenTtlMs = DEFAULT_TOKEN_TTL_MS
) {
  const path = sanitizePathname(pathname);
  return issueSignedToken({
    pathname: path,
    operations,
    validUntil: Date.now() + clampTtl(tokenTtlMs),
  });
}
