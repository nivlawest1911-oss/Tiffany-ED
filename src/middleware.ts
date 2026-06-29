import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 🔥 NUCLEAR: Allow demo mode to completely bypass everything
  if (search.includes('demo=true')) {
    return NextResponse.next();
  }

  // Allow Better Auth routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Allow public pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password')
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
