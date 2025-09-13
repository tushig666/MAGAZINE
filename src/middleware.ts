import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware is temporarily disabled to allow open access to admin routes.
// Re-enable authentication before deploying to production.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
