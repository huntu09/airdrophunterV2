import { type NextRequest, NextResponse } from "next/server"
import { getAirdrops } from "@/lib/database"

// Mock data sebagai fallback
const MOCK_AIRDROPS = [
  {
    id: "1",
    name: "LayerZero Airdrop",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Cross-chain protocol with potential airdrop for early users",
    action: "Bridge tokens across different chains",
    category: "latest",
    rating: 4.5,
    totalRatings: 1250,
    status: "active",
    reward: "TBA",
    startDate: "2024-01-15",
    difficulty: "Medium",
    socialLinks: {
      twitter: "https://twitter.com/layerzero",
      discord: "https://discord.gg/layerzero",
      website: "https://layerzero.network",
    },
    about: {
      overview:
        "LayerZero is an omnichain interoperability protocol designed to enable seamless cross-chain transactions.",
      tokenomics: "Token distribution will be announced after mainnet launch.",
      roadmap: "Q1 2024: Mainnet launch, Q2 2024: Token distribution",
    },
    steps: [
      "Connect wallet to LayerZero bridge",
      "Bridge tokens between supported chains",
      "Interact with LayerZero dApps",
      "Hold bridged tokens for extended period",
    ],
    requirements: ["Minimum $100 transaction", "Multiple chain interactions"],
    isHot: true,
    isConfirmed: false,
    participants: 45000,
    networks: ["Ethereum", "Arbitrum", "Optimism", "Polygon"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "4",
    name: "Polygon zkEVM",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Ethereum-compatible zkEVM with potential rewards",
    action: "Use Polygon zkEVM for DeFi activities",
    category: "latest",
    rating: 4.0,
    totalRatings: 650,
    status: "active",
    reward: "MATIC Rewards",
    startDate: "2024-01-25",
    difficulty: "Medium",
    socialLinks: {
      twitter: "https://twitter.com/0xpolygon",
      discord: "https://discord.gg/polygon",
      website: "https://polygon.technology",
    },
    about: {
      overview: "Polygon zkEVM is a decentralized Ethereum Layer 2 scaling solution.",
      tokenomics: "MATIC token powers the Polygon ecosystem.",
      roadmap: "Expanding zkEVM capabilities and ecosystem growth",
    },
    steps: ["Bridge assets to Polygon zkEVM", "Swap tokens on DEXs", "Provide liquidity", "Use lending protocols"],
    requirements: ["Multiple DeFi interactions", "Sustained activity"],
    isHot: false,
    isConfirmed: false,
    participants: 25000,
    networks: ["Polygon zkEVM"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
]

const MOCK_STATS = {
  total: MOCK_AIRDROPS.length,
  active: MOCK_AIRDROPS.filter((a) => a.status === "active").length,
  confirmed: MOCK_AIRDROPS.filter((a) => a.isConfirmed).length,
  hot: MOCK_AIRDROPS.filter((a) => a.isHot).length,
  latest: MOCK_AIRDROPS.filter((a) => a.category === "latest").length,
  hottest: MOCK_AIRDROPS.filter((a) => a.category === "hottest").length,
  potential: MOCK_AIRDROPS.filter((a) => a.category === "potential").length,
}

// Helper function to check if database is properly configured
function isDatabaseConfigured(): boolean {
  const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasSupabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY

  console.log("🔍 Database Configuration Check:")
  console.log("- SUPABASE_URL:", hasSupabaseUrl ? "✅ Set" : "❌ Missing")
  console.log("- SUPABASE_ANON_KEY:", hasSupabaseKey ? "✅ Set" : "❌ Missing")
  console.log("- SERVICE_ROLE_KEY:", hasServiceKey ? "✅ Set" : "❌ Missing")

  return hasSupabaseUrl && hasSupabaseKey && hasServiceKey
}

export async function GET(request: NextRequest) {
  console.log("🚀 API /api/airdrops called - HYBRID MODE v2")

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || "all"
    const status = searchParams.get("status") || "all"
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    console.log("📊 Request params:", { search, category, status, limit, offset })

    // 🔍 Check database configuration
    const databaseConfigured = isDatabaseConfigured()

    if (databaseConfigured) {
      console.log("🗄️ Database is configured, attempting to fetch real data...")

      try {
        // Try to get airdrops from database
        const result = await getAirdrops({
          search,
          category,
          status,
          limit,
          offset,
        })

        console.log(`✅ Database query successful: ${result.airdrops.length} airdrops found`)

        // Transform database data to frontend format
        const transformedAirdrops = result.airdrops.map((airdrop: any) => ({
          id: airdrop.id.toString(),
          name: airdrop.name,
          logo: airdrop.logo || "/placeholder.svg?height=40&width=40",
          description: airdrop.description,
          action: airdrop.action,
          category: airdrop.category,
          rating: Number.parseFloat(airdrop.rating || "0"),
          totalRatings: airdrop.total_ratings || 0,
          status: airdrop.status,
          reward: airdrop.reward,
          startDate: airdrop.start_date,
          difficulty: airdrop.difficulty,
          socialLinks: airdrop.social_links || {},
          about: airdrop.about || { overview: "", tokenomics: "", roadmap: "" },
          steps: airdrop.steps || [],
          requirements: airdrop.requirements || [],
          isHot: airdrop.is_hot || false,
          isConfirmed: airdrop.is_confirmed || false,
          participants: airdrop.participants || 0,
          networks: airdrop.networks || [],
          createdAt: airdrop.created_at,
          updatedAt: airdrop.updated_at,
        }))

        // Calculate real stats
        const realStats = {
          total: result.total,
          active: transformedAirdrops.filter((a) => a.status === "active").length,
          confirmed: transformedAirdrops.filter((a) => a.isConfirmed).length,
          hot: transformedAirdrops.filter((a) => a.isHot).length,
          latest: transformedAirdrops.filter((a) => a.category === "latest").length,
          hottest: transformedAirdrops.filter((a) => a.category === "hottest").length,
          potential: transformedAirdrops.filter((a) => a.category === "potential").length,
        }

        console.log("📊 Real stats:", realStats)

        return NextResponse.json({
          success: true,
          data: transformedAirdrops,
          total: result.total,
          stats: realStats,
          pagination: {
            limit,
            offset,
            total: result.total,
            hasMore: result.total > offset + limit,
          },
          dataSource: "database",
          message: "✅ Data from real database",
          timestamp: new Date().toISOString(),
        })
      } catch (dbError: any) {
        console.error("💥 Database query failed:", dbError.message)
        console.error("💥 Database error details:", dbError)
        // Fall through to mock data with error info
      }
    } else {
      console.log("⚠️ Database not properly configured, using mock data")
    }

    // 🎭 Fallback to mock data
    console.log("🎭 Using MOCK DATA as fallback")

    let filteredAirdrops = [...MOCK_AIRDROPS]

    // Apply filters to mock data
    if (search) {
      const searchLower = search.toLowerCase()
      filteredAirdrops = filteredAirdrops.filter(
        (airdrop) =>
          airdrop.name.toLowerCase().includes(searchLower) ||
          airdrop.description.toLowerCase().includes(searchLower) ||
          airdrop.action.toLowerCase().includes(searchLower),
      )
    }

    if (category !== "all") {
      filteredAirdrops = filteredAirdrops.filter((airdrop) => airdrop.category === category)
    }

    if (status !== "all") {
      filteredAirdrops = filteredAirdrops.filter((airdrop) => airdrop.status === status)
    }

    const paginatedAirdrops = filteredAirdrops.slice(offset, offset + limit)

    console.log(`✅ Returning ${paginatedAirdrops.length} mock airdrops`)

    return NextResponse.json({
      success: true,
      data: paginatedAirdrops,
      total: filteredAirdrops.length,
      stats: MOCK_STATS,
      pagination: {
        limit,
        offset,
        total: filteredAirdrops.length,
        hasMore: filteredAirdrops.length > offset + limit,
      },
      dataSource: "mock",
      message: databaseConfigured
        ? "⚠️ Database configured but query failed - using mock data"
        : "🎭 Database not configured - using mock data",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("💥 Critical API Error:", error)

    // Ultimate fallback
    return NextResponse.json({
      success: true,
      data: MOCK_AIRDROPS,
      total: MOCK_AIRDROPS.length,
      stats: MOCK_STATS,
      pagination: {
        limit: 50,
        offset: 0,
        total: MOCK_AIRDROPS.length,
        hasMore: false,
      },
      dataSource: "emergency_fallback",
      message: "💥 Emergency fallback - using mock data",
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
}
