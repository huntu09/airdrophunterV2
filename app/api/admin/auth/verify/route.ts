import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (token && token.startsWith("magic_")) {
    // Generate admin session
    const adminToken = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const response = NextResponse.redirect(new URL("/admin", request.url))

    response.cookies.set("admin_token", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    })

    return response
  }

  return NextResponse.redirect(new URL("/admin/login?error=invalid_token", request.url))
}
