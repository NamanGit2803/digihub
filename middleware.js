import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value 

  //  Allow public routes
  if (
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api/admin")
  ) {
    return NextResponse.next();
  }

  //  No token found → block API or redirect page
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  try {
    //  Verify token (Edge-compatible)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    //  Check for admin role
    if (payload.role !== "admin") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next(); // ✅ Allow access
  } catch (err) {
    console.error("JWT verification failed:", err);

    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

//  Apply middleware to both admin pages and admin APIs
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
