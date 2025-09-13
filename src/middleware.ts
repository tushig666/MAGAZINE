import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = "admin-session";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  const hasSession = sessionCookie?.value === 'true';

  // If the user has a session and tries to access the login page, redirect to admin
  if (hasSession && pathname === '/admin-access') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If the user is trying to access an admin page without a session, redirect to login
  // But don't redirect if they are already on the login page.
  if (!hasSession && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin-access', request.url));
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/admin/:path*', '/admin-access'],
}