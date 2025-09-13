import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  // Check if there's an active session
  const hasSession = !!session;

  // If the user is trying to access the login page
  if (pathname === "/login") {
    // If they already have a session, redirect them to the admin dashboard
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Otherwise, allow them to view the login page
    return NextResponse.next();
  }

  // If the user is trying to access any admin route
  if (pathname.startsWith("/admin")) {
    // If they do not have a session, redirect them to the login page
    if (!hasSession) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
