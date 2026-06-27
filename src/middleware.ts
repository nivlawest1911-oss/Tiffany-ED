import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ IMPORTANT: Always allow Better Auth routes to pass through
  // This prevents the OAuth callback from being blocked
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Optional: Add your own protected route logic here if needed
  // Example: redirect unauthenticated users away from /dashboard
  // const session = await getSessionFromCookie(request);
  // if (!session && pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth/* (Better Auth routes - MUST be excluded)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public folder assets
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
