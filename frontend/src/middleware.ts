import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isLoggedIn = !!token;
  const { pathname } = request.nextUrl;

  console.log(`Middleware path: ${pathname}, isLoggedIn: ${isLoggedIn}`);
  // Bebasin route public (login, register, landing)
  if (pathname === "/login" || pathname === "/") {
    return NextResponse.next();
  }

  // Redirect user belum login kalau akses path yang protected
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau udah login dan coba akses login, lempar ke dashboard
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard/kepsek", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
