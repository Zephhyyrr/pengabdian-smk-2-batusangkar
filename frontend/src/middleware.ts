import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const isLoggedIn = !!token;
  const { pathname } = request.nextUrl;

  console.log(`Middleware path: ${pathname}, isLoggedIn: ${isLoggedIn}`);

  if (!isLoggedIn && (pathname.startsWith("/dashboard") || pathname.startsWith("/siswa"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && pathname === "/login") {
    if (role == "siswa") {
      return NextResponse.redirect(new URL("/siswa", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard/kepsek", request.url));
    }
  }

  if (isLoggedIn && pathname.startsWith("/dashboard") && role == "siswa") {
    return NextResponse.redirect(new URL("/siswa", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/siswa", "/login"],
};
