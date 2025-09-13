import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  const isAdminPath = pathname.startsWith("/admin");
  const isLoginPath = pathname === "/login";

  // If there's no session and the user is trying to access an admin path
  if (!session && isAdminPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname); // Save the intended path
    return NextResponse.redirect(loginUrl);
  }

  // If there is a session and the user is trying to access the login page
  if (session && isLoginPath) {
    // Redirect them to the admin dashboard
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
