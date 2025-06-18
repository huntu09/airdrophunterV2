import { type NextRequest, NextResponse } from "next/server"
import webpush from "web-push"
import { createClient } from "@/lib/supabase"

// Configure web-push with VAPID keys
webpush.setVapidDetails("mailto:admin@airdrophunter.com", process.env.VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { title, body, icon, url, badge } = await request.json()

    if (!title || !body) {
      return NextResponse.json({ error: "Title and body are required" }, { status: 400 })
    }

    const supabase = createClient()

    // Get all active subscriptions
    const { data: subscriptions, error } = await supabase.from("push_subscriptions").select("*").eq("active", true)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No active subscriptions found",
        sent: 0,
      })
    }

    // Prepare notification payload
    const notificationPayload = JSON.stringify({
      title,
      body,
      icon: icon || "/android-chrome-192x192.png",
      badge: badge || "/android-chrome-96x96.png",
      url: url || "/",
      timestamp: Date.now(),
      actions: [
        {
          action: "view",
          title: "View Details",
          icon: "/android-chrome-96x96.png",
        },
        {
          action: "dismiss",
          title: "Dismiss",
          icon: "/android-chrome-96x96.png",
        },
      ],
    })

    // Send notifications to all subscribers
    const sendPromises = subscriptions.map(async (sub) => {
      try {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        }

        await webpush.sendNotification(pushSubscription, notificationPayload)
        return { success: true, subscription: sub.id }
      } catch (error) {
        console.error(`Failed to send to subscription ${sub.id}:`, error)

        // Remove invalid subscriptions
        if (error.statusCode === 410) {
          await supabase.from("push_subscriptions").update({ active: false }).eq("id", sub.id)
        }

        return { success: false, subscription: sub.id, error: error.message }
      }
    })

    const results = await Promise.all(sendPromises)
    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Notifications sent successfully`,
      sent: successful,
      failed: failed,
      total: subscriptions.length,
    })
  } catch (error) {
    console.error("Send notification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
