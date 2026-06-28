import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ✅ Allow demo mode to bypass auth
  if (search.includes('demo=true')) {
    return NextResponse.next();
  }

  // ✅ Always allow Better Auth routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // ✅ Allow login, forgot password, etc.
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password')
  ) {
    return NextResponse.next();
  }

  // For everything else under dashboard, require auth (normal behavior)
  // You can add your real auth check here later if needed

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
