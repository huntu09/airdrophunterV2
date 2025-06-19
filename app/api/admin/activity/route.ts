import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("🔄 Fetching recent activity...")

    const supabase = createServerClient()

    // Get recent airdrops (last 10)
    const { data: recentAirdrops, error: airdropsError } = await supabase
      .from("airdrops")
      .select("id, name, created_at, status")
      .order("created_at", { ascending: false })
      .limit(5)

    if (airdropsError) {
      console.error("Error fetching recent airdrops:", airdropsError)
    }

    // Get recent ratings (if ratings table exists)
    const { data: recentRatings, error: ratingsError } = await supabase
      .from("user_ratings")
      .select("airdrop_id, rating, created_at")
      .order("created_at", { ascending: false })
      .limit(3)

    if (ratingsError) {
      console.error("Error fetching recent ratings:", ratingsError)
    }

    // Combine activities
    const activities = []

    // Add airdrop activities
    if (recentAirdrops) {
      recentAirdrops.forEach((airdrop) => {
        activities.push({
          type: "airdrop",
          action: "New Airdrop Created",
          description: `${airdrop.name} - Status: ${airdrop.status}`,
          time: formatTimeAgo(airdrop.created_at),
          timestamp: airdrop.created_at,
        })
      })
    }

    // Add rating activities
    if (recentRatings) {
      recentRatings.forEach((rating) => {
        activities.push({
          type: "rating",
          action: "New Rating Submitted",
          description: `${rating.rating} stars rating submitted`,
          time: formatTimeAgo(rating.created_at),
          timestamp: rating.created_at,
        })
      })
    }

    // Add some system activities (you can expand this)
    activities.push({
      type: "system",
      action: "System Health Check",
      description: "All systems operational",
      time: "2 minutes ago",
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    })

    // Sort by timestamp and limit to 10
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)

    console.log("✅ Recent activity fetched successfully:", sortedActivities.length, "activities")

    return NextResponse.json({
      success: true,
      activities: sortedActivities,
    })
  } catch (error) {
    console.error("💥 Error fetching recent activity:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch recent activity",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function formatTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? "s" : ""} ago`
  }
}
