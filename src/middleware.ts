import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Frozen Auth: Always allow Better Auth routes without obstruction
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // 2. Public / Marketing Pages: Soft, SEO-friendly pass-through
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

  // 3. Request correlation header for production safety
  const requestHeaders = new Headers(request.headers);
  if (!requestHeaders.get('x-request-id')) {
    requestHeaders.set('x-request-id', `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
