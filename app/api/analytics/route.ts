import { NextResponse } from "next/server"

// Check if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase not configured, using mock data for analytics")
}

// Only import supabase if configured
let supabase: any = null
if (supabaseUrl && supabaseAnonKey) {
  const { supabase: supabaseClient } = await import("@/lib/supabase")
  supabase = supabaseClient
}

export async function GET() {
  try {
    // If Supabase is not configured, return mock data
    if (!supabase) {
      return NextResponse.json({
        totalAirdrops: 25,
        totalParticipants: 15000,
        hotAirdropsCount: 8,
        recentAirdropsCount: 5,
        statusDistribution: {
          CONFIRMED: 15,
          UPCOMING: 8,
          ENDED: 2,
        },
        categoryDistribution: {
          DeFi: 10,
          Gaming: 8,
          NFT: 4,
          Layer1: 3,
        },
        blockchainDistribution: {
          Ethereum: 12,
          Polygon: 6,
          Arbitrum: 4,
          Optimism: 3,
        },
        dailyData: [
          { name: "Mon", airdrops: 2, visitors: 120 },
          { name: "Tue", airdrops: 3, visitors: 180 },
          { name: "Wed", airdrops: 1, visitors: 90 },
          { name: "Thu", airdrops: 4, visitors: 220 },
          { name: "Fri", airdrops: 2, visitors: 150 },
          { name: "Sat", airdrops: 1, visitors: 80 },
          { name: "Sun", airdrops: 3, visitors: 200 },
        ],
      })
    }

    // Original Supabase logic continues here...
    const { count: totalAirdrops } = await supabase.from("airdrops").select("*", { count: "exact", head: true })

    // Get airdrops by status
    const { data: statusData } = await supabase.from("airdrops").select("status")

    // Get airdrops by category
    const { data: categoryData } = await supabase.from("airdrops").select("category")

    // Get airdrops by blockchain
    const { data: blockchainData } = await supabase.from("airdrops").select("blockchain")

    // Get recent airdrops (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: recentAirdrops } = await supabase
      .from("airdrops")
      .select("created_at")
      .gte("created_at", sevenDaysAgo.toISOString())

    // Get total participants
    const { data: participantsData } = await supabase.from("airdrops").select("participants_count")

    const totalParticipants =
      participantsData?.reduce((sum, airdrop) => sum + (airdrop.participants_count || 0), 0) || 0

    // Get hot airdrops count
    const { count: hotAirdropsCount } = await supabase
      .from("airdrops")
      .select("*", { count: "exact", head: true })
      .eq("is_hot", true)

    // Process status distribution
    const statusDistribution =
      statusData?.reduce((acc: any, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      }, {}) || {}

    // Process category distribution
    const categoryDistribution =
      categoryData?.reduce((acc: any, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1
        return acc
      }, {}) || {}

    // Process blockchain distribution
    const blockchainDistribution =
      blockchainData?.reduce((acc: any, item) => {
        acc[item.blockchain] = (acc[item.blockchain] || 0) + 1
        return acc
      }, {}) || {}

    // Generate daily data for the last 7 days
    const dailyData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })

      // Count airdrops created on this day
      const dayStart = new Date(date)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(date)
      dayEnd.setHours(23, 59, 59, 999)

      const dayCount =
        recentAirdrops?.filter((airdrop) => {
          const createdDate = new Date(airdrop.created_at)
          return createdDate >= dayStart && createdDate <= dayEnd
        }).length || 0

      dailyData.push({
        name: dayName,
        airdrops: dayCount,
        // Simulate visitor data based on airdrops + some randomness
        visitors: Math.max(50, dayCount * 20 + Math.floor(Math.random() * 100)),
      })
    }

    return NextResponse.json({
      totalAirdrops: totalAirdrops || 0,
      totalParticipants,
      hotAirdropsCount: hotAirdropsCount || 0,
      recentAirdropsCount: recentAirdrops?.length || 0,
      statusDistribution,
      categoryDistribution,
      blockchainDistribution,
      dailyData,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
