import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow Better Auth routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Always allow public pages
  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/contact')
  ) {
    return NextResponse.next();
  }

  // TEMPORARY: pass everything through.
  // The previous getSessionCookie check was still redirecting after a
  // successful Google OAuth (cookie not always visible on the first
  // post-callback request / RSC prefetch on Vercel). Client-side page
  // is now passive (no auto-redirect), so the session can settle.
  // Re-enable a robust guard later once the bounce is confirmed gone.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
