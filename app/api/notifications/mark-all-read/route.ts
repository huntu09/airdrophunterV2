import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq("is_read", false)
      .select()

    if (error) {
      console.error("Error marking all notifications as read:", error)
      return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 })
    }

    return NextResponse.json({
      message: "All notifications marked as read",
      updatedCount: data?.length || 0,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
