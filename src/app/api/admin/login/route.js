import { NextResponse } from "next/server";

const encoder = new TextEncoder();

// Simple in-memory brute-force tracker (per server instance)
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

async function createSignedAdminToken(secret, ttlMs) {
  const expiresAt = String(Date.now() + ttlMs);
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`syncward_admin:${expiresAt}`)
  );

  const signatureHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${expiresAt}.${signatureHex}`;
}

export async function POST(req) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SECRET || adminPassword;

    // Prevent `undefined === undefined` bypass if env variable is missing
    if (!adminPassword || adminPassword.trim().length === 0) {
      console.error("CRITICAL: ADMIN_PASSWORD environment variable is not set!");
      return NextResponse.json(
        { success: false, error: "Server authentication is not configured." },
        { status: 500 }
      );
    }

    // Brute-force check by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown_ip";
    const attemptRecord = loginAttempts.get(ip);

    if (
      attemptRecord &&
      attemptRecord.count >= MAX_ATTEMPTS &&
      Date.now() - attemptRecord.firstAttempt < LOCKOUT_MS
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many failed attempts. Please try again in 15 minutes.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const password = typeof body?.password === "string" ? body.password : "";

    if (!password || password !== adminPassword) {
      const now = Date.now();
      if (!attemptRecord || now - attemptRecord.firstAttempt > LOCKOUT_MS) {
        loginAttempts.set(ip, { count: 1, firstAttempt: now });
      } else {
        loginAttempts.set(ip, {
          ...attemptRecord,
          count: attemptRecord.count + 1,
        });
      }

      return NextResponse.json(
        { success: false, error: "Incorrect password!" },
        { status: 401 }
      );
    }

    // Clear failed attempts on success
    loginAttempts.delete(ip);

    const maxAgeSeconds = 60 * 60 * 24; // 24 hours
    const signedToken = await createSignedAdminToken(
      secret,
      maxAgeSeconds * 1000
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set({
      name: "admin_token",
      value: signedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: maxAgeSeconds,
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Logout handler: Clears the httpOnly admin_token cookie
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.set({
    name: "admin_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}