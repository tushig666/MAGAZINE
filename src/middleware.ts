import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('firebase-session');

  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  
  // If trying to access a protected admin route without a session, redirect to login
  if (isAdminRoute && !isLoginPage && !sessionToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If trying to access the login page with an active session, redirect to the dashboard
  if (isLoginPage && sessionToken) {
     return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  // Ensure /admin always has a trailing slash for consistency
  if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/', request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
}
