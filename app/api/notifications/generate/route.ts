import { type NextRequest, NextResponse } from "next/server"
import { notificationGenerator } from "@/lib/notification-generator"

export async function POST(request: NextRequest) {
  try {
    // Check for admin authorization (optional)
    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get("admin_key")

    // Simple admin check (you can make this more secure)
    if (adminKey !== "generate_notifications_2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("🔔 Manual notification generation triggered")

    const totalCreated = await notificationGenerator.generateAllNotifications()

    return NextResponse.json({
      success: true,
      message: `Generated ${totalCreated} new notifications`,
      totalCreated,
    })
  } catch (error) {
    console.error("Error in notification generation API:", error)
    return NextResponse.json({ error: "Failed to generate notifications" }, { status: 500 })
  }
}

// Auto-generate notifications (can be called by cron job)
export async function GET(request: NextRequest) {
  try {
    console.log("🔔 Auto notification generation triggered")

    const totalCreated = await notificationGenerator.generateAllNotifications()

    return NextResponse.json({
      success: true,
      message: `Auto-generated ${totalCreated} new notifications`,
      totalCreated,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in auto notification generation:", error)
    return NextResponse.json({ error: "Failed to auto-generate notifications" }, { status: 500 })
  }
}
