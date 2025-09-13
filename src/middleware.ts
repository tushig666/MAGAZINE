import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('firebase-session');

  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage && !sessionToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage && sessionToken) {
     return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  if (pathname === '/admin' && !pathname.endsWith('/')) {
      return NextResponse.redirect(new URL('/admin/', request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
}
