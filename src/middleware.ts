import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

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

  // Optimistic cookie-only check for authenticated routes
  // (recommended by Better Auth – no DB call in middleware)
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect the rest of the (dashboard) group as well
  const isProtected =
    pathname.startsWith('/tiffany-ed') ||
    pathname.startsWith('/grouping') ||
    pathname.startsWith('/progress') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/roster') ||
    pathname.startsWith('/generator') ||
    pathname.startsWith('/ai-hub') ||
    pathname.startsWith('/briefings') ||
    pathname.startsWith('/ops') ||
    pathname.startsWith('/oracle') ||
    pathname.startsWith('/podcast') ||
    pathname.startsWith('/conversation') ||
    pathname.startsWith('/gemini-workspace');

  if (!sessionCookie && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
