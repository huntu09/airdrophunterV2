import { type NextRequest, NextResponse } from "next/server"
import { getAirdrops, createAirdrop, getAirdropStats, bulkUpdateAirdrops, bulkDeleteAirdrops } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || "all"
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = (page - 1) * limit

    console.log("🔍 API GET AUDIT - Fetching airdrops with filters:", { search, category, status, page, limit })

    // Get airdrops from Supabase
    const { airdrops, total } = await getAirdrops({
      search,
      category,
      status,
      limit,
      offset,
    })

    // Get stats
    const stats = await getAirdropStats()

    // 🔍 AUDIT: Transform data and log logo information
    const transformedAirdrops = airdrops.map((airdrop: any) => {
      const transformed = {
        id: airdrop.id.toString(),
        name: airdrop.name,
        logo: airdrop.logo,
        description: airdrop.description,
        action: airdrop.action,
        category: airdrop.category,
        rating: Number.parseFloat(airdrop.rating || 0),
        totalRatings: airdrop.total_ratings || 0,
        status: airdrop.status,
        reward: airdrop.reward,
        startDate: airdrop.start_date,
        difficulty: airdrop.difficulty,
        socialLinks: airdrop.social_links || {},
        steps: airdrop.steps || [],
        requirements: airdrop.requirements || [],
        isHot: airdrop.is_hot || false,
        isConfirmed: airdrop.is_confirmed || false,
        participants: airdrop.participants || 0,
        createdAt: airdrop.created_at,
        updatedAt: airdrop.updated_at,
        networks: airdrop.networks || [], // Include networks
      }

      // 🔍 AUDIT: Log logo transformation
      if (airdrop.logo) {
        console.log("🔍 API TRANSFORM AUDIT - Logo data:", {
          name: airdrop.name,
          originalLogo: airdrop.logo,
          transformedLogo: transformed.logo,
        })
      }

      return transformed
    })

    console.log("🔍 API GET AUDIT - Returning", transformedAirdrops.length, "airdrops")

    return NextResponse.json({
      success: true,
      data: transformedAirdrops,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats,
    })
  } catch (error) {
    console.error("🔍 API GET ERROR:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch airdrops", details: error.message },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("🔍 API POST AUDIT - Received body:", {
      name: body.name,
      logo: body.logo,
      logoLength: body.logo?.length,
      hasLogo: !!body.logo,
      networks: body.networks,
    })

    // Handle bulk operations
    if (body.action && body.ids) {
      return handleBulkAction(body.action, body.ids, body.updates)
    }

    // Basic validation
    if (!body.name || !body.description || !body.action || !body.category || !body.status || !body.difficulty) {
      console.log("🔍 API POST ERROR - Missing required fields")
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, description, action, category, status, difficulty" },
        { status: 400 },
      )
    }

    // 🔍 AUDIT: Prepare data for database with explicit logo handling
    const airdropData = {
      name: body.name.trim(),
      logo: body.logo || `/placeholder.svg?height=48&width=48&text=${body.name[0]}`,
      description: body.description.trim(),
      action: body.action.trim(),
      category: body.category,
      status: body.status,
      reward: body.reward || "TBA",
      startDate: body.startDate || new Date().toISOString().split("T")[0],
      difficulty: body.difficulty,
      socialLinks: {
        website: body.website || "",
        telegram: body.telegram || "",
        twitter: body.twitter || "",
        discord: body.discord || "",
      },
      about: {
        overview: body.overview || "",
        tokenomics: body.tokenomics || "",
        roadmap: body.roadmap || "",
      },
      steps: [body.step1, body.step2, body.step3, body.step4, body.step5, body.step6].filter(Boolean),
      requirements: [body.req1, body.req2, body.req3, body.req4, body.req5].filter(Boolean),
      isHot: body.isHot || false,
      isConfirmed: body.isConfirmed || false,
      networks: body.networks || [], // Include networks
    }

    console.log("🔍 API POST AUDIT - Prepared airdrop data:", {
      name: airdropData.name,
      logo: airdropData.logo,
      logoIsPlaceholder: airdropData.logo.includes("placeholder.svg"),
      networks: airdropData.networks,
    })

    // Create airdrop in database
    const newAirdrop = await createAirdrop(airdropData)

    console.log("🔍 API POST AUDIT - Created airdrop result:", {
      id: newAirdrop.id,
      name: newAirdrop.name,
      logo: newAirdrop.logo,
      networks: newAirdrop.networks,
    })

    // Transform response
    const transformedAirdrop = {
      id: newAirdrop.id.toString(),
      name: newAirdrop.name,
      logo: newAirdrop.logo,
      description: newAirdrop.description,
      action: newAirdrop.action,
      category: newAirdrop.category,
      rating: Number.parseFloat(newAirdrop.rating || 0),
      totalRatings: newAirdrop.total_ratings || 0,
      status: newAirdrop.status,
      reward: newAirdrop.reward,
      startDate: newAirdrop.start_date,
      difficulty: newAirdrop.difficulty,
      socialLinks: newAirdrop.social_links || {},
      steps: newAirdrop.steps || [],
      requirements: newAirdrop.requirements || [],
      isHot: newAirdrop.is_hot || false,
      isConfirmed: newAirdrop.is_confirmed || false,
      participants: newAirdrop.participants || 0,
      createdAt: newAirdrop.created_at,
      updatedAt: newAirdrop.updated_at,
      networks: newAirdrop.networks || [],
    }

    console.log("🔍 API POST AUDIT - Final response logo:", transformedAirdrop.logo)

    return NextResponse.json({
      success: true,
      data: transformedAirdrop,
      message: "Airdrop created successfully",
    })
  } catch (error) {
    console.error("🔍 API POST ERROR:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create airdrop", details: error.message },
      { status: 500 },
    )
  }
}

async function handleBulkAction(action: string, ids: string[], updates?: any) {
  try {
    let result

    switch (action) {
      case "delete":
        result = await bulkDeleteAirdrops(ids)
        return NextResponse.json({
          success: true,
          message: `${result.length} airdrops deleted successfully`,
        })

      case "mark-hot":
        result = await bulkUpdateAirdrops(ids, { is_hot: true })
        return NextResponse.json({
          success: true,
          message: `${result.length} airdrops marked as hot`,
        })

      case "confirm":
        result = await bulkUpdateAirdrops(ids, { is_confirmed: true })
        return NextResponse.json({
          success: true,
          message: `${result.length} airdrops confirmed`,
        })

      case "activate":
        result = await bulkUpdateAirdrops(ids, { status: "active" })
        return NextResponse.json({
          success: true,
          message: `${result.length} airdrops activated`,
        })

      default:
        return NextResponse.json({ success: false, error: "Invalid bulk action" }, { status: 400 })
    }
  } catch (error) {
    console.error("🔍 BULK ACTION ERROR:", error)
    return NextResponse.json(
      { success: false, error: `Failed to perform bulk ${action}`, details: error.message },
      { status: 500 },
    )
  }
}
