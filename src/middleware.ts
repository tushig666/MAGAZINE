import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  // If user is logged in, and tries to access /login, redirect to /admin
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If user is not logged in and tries to access /admin or its sub-paths
  if (!session && pathname.startsWith("/admin")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
