import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@airdrophunter.com"

    if (email === ADMIN_EMAIL) {
      // Generate magic token
      const magicToken = `magic_${Date.now()}_${Math.random().toString(36).substr(2, 15)}`

      // In production, send email with magic link
      // For now, just return the link
      const magicLink = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/auth/verify?token=${magicToken}`

      console.log("🔗 Magic Link:", magicLink) // Log untuk development

      return NextResponse.json({
        success: true,
        message: "Magic link generated! Check console for development.",
        magicLink, // Remove this in production
      })
    } else {
      return NextResponse.json({ success: false, error: "Email tidak terdaftar" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
