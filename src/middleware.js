import { NextResponse } from "next/server";

const encoder = new TextEncoder();

async function verifyAdminToken(token, secret) {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [expiresAtStr, signatureHex] = parts;
  const expiresAt = Number(expiresAtStr);

  // Check token expiration
  if (!expiresAt || Date.now() > expiresAt) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    );

    return await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(`syncward_admin:${expiresAtStr}`)
    );
  } catch {
    return false;
  }
}

export default async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  const adminToken = request.cookies.get("admin_token")?.value;

  // 1. Protect /admin UI pages (except /admin/login)
  if (pathname.startsWith("/admin")) {
    const isAuthenticated = await verifyAdminToken(adminToken, secret);

    if (pathname === "/admin/login") {
      // Redirect already-logged-in admins away from login page
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect Admin API Operations
  const isPublicContactPost = pathname === "/api/contact" && method === "POST";
  const isPublicProjectsGet = pathname === "/api/projects" && method === "GET";

  const requiresApiAuth =
    pathname.startsWith("/api/imagekit-auth") ||
    (pathname.startsWith("/api/contact") && !isPublicContactPost) ||
    (pathname.startsWith("/api/projects") && !isPublicProjectsGet);

  if (requiresApiAuth) {
    const isAuthenticated = await verifyAdminToken(adminToken, secret);
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/contact/:path*",
    "/api/projects/:path*",
    "/api/imagekit-auth/:path*",
  ],
};