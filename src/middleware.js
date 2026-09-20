import { NextResponse } from "next/server";

export default function middleware(request) {
  const path = request.nextUrl.pathname;

  // Agar user /admin routes par ja raha hai (lekin /admin/login par nahi)
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const adminToken = request.cookies.get("admin_token")?.value;

    // Agar token nahi hai, toh login page par bhej do
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};