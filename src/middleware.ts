import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  // If the user is on the login page
  if (request.nextUrl.pathname.startsWith("/login")) {
    // If they are already logged in, redirect to admin
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Otherwise, let them see the login page
    return NextResponse.next();
  }

  // For any other route under /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // If they are not logged in, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
