import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = "admin-session";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  const isTryingToAccessAdmin = request.nextUrl.pathname.startsWith('/admin');
  const isTryingToAccessLogin = request.nextUrl.pathname === '/admin-access';
  const hasSession = sessionCookie && sessionCookie.value === 'true';

  // If trying to access admin pages without a session, redirect to login
  if (isTryingToAccessAdmin && !hasSession) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin-access'
      return NextResponse.redirect(url);
  }
  
  // If trying to access login page with a session, redirect to admin dashboard
  if (isTryingToAccessLogin && hasSession) {
     const url = request.nextUrl.clone()
     url.pathname = '/admin'
     return NextResponse.redirect(url);
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin-access'],
}
