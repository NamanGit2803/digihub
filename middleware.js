import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(req) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get("token")?.value

  // Allow public (non-admin) routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // No token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  try {
    // ✅ Verify using jose (Edge-compatible)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    // Check if user is admin
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.error("JWT verification failed:", err)
    return NextResponse.redirect(new URL("/", req.url))
  }
}

// Apply only to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
}
