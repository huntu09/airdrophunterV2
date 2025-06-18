import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    console.log("Login attempt with password:", password ? "***" : "empty")

    // ✅ Simple tapi aman - password dari environment variable
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

    console.log("Expected password set:", !!ADMIN_PASSWORD)

    if (password === ADMIN_PASSWORD) {
      // Generate simple token
      const token = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      console.log("Login successful, generating token:", token.substring(0, 20) + "...")

      const response = NextResponse.json({
        success: true,
        message: "Login berhasil",
        token, // Include token in response for client-side storage
        user: {
          name: "Admin",
          role: "admin",
        },
      })

      // Set cookie dengan options yang lebih permissive untuk development
      response.cookies.set("admin_token", token, {
        httpOnly: false, // Allow client-side access for debugging
        secure: false, // Allow HTTP in development
        sameSite: "lax", // More permissive
        maxAge: 86400, // 24 hours
        path: "/",
      })

      console.log("Cookie set successfully")
      return response
    } else {
      console.log("Login failed - wrong password")
      return NextResponse.json(
        {
          success: false,
          error: "Password salah",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Server error",
      },
      { status: 500 },
    )
  }
}
