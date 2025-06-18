import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware untuk admin login page
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value

    console.log("Middleware check:", {
      path: request.nextUrl.pathname,
      hasToken: !!token,
      token: token?.substring(0, 20) + "...", // Log partial token for debugging
    })

    // Simple validation - check if token exists and starts with 'admin_'
    if (!token || !token.startsWith("admin_")) {
      console.log("Redirecting to login - no valid token")
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
