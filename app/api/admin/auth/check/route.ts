import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value

    console.log("Auth check - token:", token ? token.substring(0, 20) + "..." : "none")

    if (token && token.startsWith("admin_")) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        user: {
          name: "Admin",
          role: "admin",
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        authenticated: false,
      })
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({
      success: false,
      authenticated: false,
    })
  }
}
