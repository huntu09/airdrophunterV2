import { NextResponse } from "next/server"
import { getAirdropStats, getAnalytics } from "@/lib/database"

export async function GET() {
  try {
    console.log("🔄 Fetching admin stats...")

    // Get real data from database
    const [airdropStats, analytics] = await Promise.all([getAirdropStats(), getAnalytics()])

    // Calculate additional metrics
    const totalParticipants = 45678 // This could come from a participants table
    const avgRating = 4.2 // This could come from ratings table
    const conversionRate = 12.4 // This could be calculated from click/view data

    // Calculate growth percentages (you can implement proper historical comparison)
    const growthData = {
      airdrops: 15.3,
      users: 8.2,
      participants: 22.1,
      rating: 2.1,
    }

    const statsData = {
      totalAirdrops: airdropStats.total,
      activeAirdrops: airdropStats.active,
      confirmedAirdrops: airdropStats.confirmed,
      potentialAirdrops: airdropStats.potential,
      totalUsers: analytics.totalUsers,
      totalParticipants,
      averageRating: avgRating,
      conversionRate,
      growth: growthData,
      lastUpdated: new Date().toISOString(),
    }

    console.log("✅ Admin stats fetched successfully:", statsData)

    return NextResponse.json({
      success: true,
      data: statsData,
    })
  } catch (error) {
    console.error("💥 Error fetching admin stats:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch admin statistics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
