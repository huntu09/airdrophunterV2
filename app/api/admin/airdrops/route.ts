import { type NextRequest, NextResponse } from "next/server"
import { getAirdrops, createAirdrop, bulkUpdateAirdrops, bulkDeleteAirdrops } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Check if database is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: "Database not configured",
          message: "Please configure Supabase environment variables",
        },
        { status: 503 },
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || "all"
    const status = searchParams.get("status") || "all"

    console.log("🔍 API Request params:", { page, limit, search, category, status })

    const result = await getAirdrops({
      page,
      limit,
      search: search || undefined,
      category: category === "all" ? undefined : category,
      status: status === "all" ? undefined : status,
    })

    // Calculate stats
    const stats = {
      total: result.total,
      active: result.airdrops.filter((a) => a.status === "active").length,
      confirmed: result.airdrops.filter((a) => a.is_confirmed).length,
      hot: result.airdrops.filter((a) => a.is_hot).length,
      latest: result.airdrops.filter((a) => a.category === "latest").length,
      hottest: result.airdrops.filter((a) => a.category === "hottest").length,
      potential: result.airdrops.filter((a) => a.category === "potential").length,
    }

    // Transform data to match frontend format
    const transformedAirdrops = result.airdrops.map((airdrop) => ({
      id: airdrop.id.toString(),
      name: airdrop.name,
      logo: airdrop.logo,
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
      steps: airdrop.steps || [],
      requirements: airdrop.requirements || [],
      isHot: airdrop.is_hot || false,
      isConfirmed: airdrop.is_confirmed || false,
      participants: airdrop.participants || 0,
      networks: airdrop.networks || [],
      createdAt: airdrop.created_at,
      updatedAt: airdrop.updated_at,
    }))

    return NextResponse.json({
      success: true,
      data: transformedAirdrops,
      stats,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch airdrops", details: error.message },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if database is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: "Database not configured",
          message: "Please configure Supabase environment variables",
        },
        { status: 503 },
      )
    }

    const body = await request.json()
    console.log("📝 POST Request body:", body)

    // Handle bulk actions
    if (body.action && body.ids) {
      const { action, ids } = body

      console.log(`🔄 Performing bulk action: ${action} on ${ids.length} items`)

      switch (action) {
        case "delete":
          const deletedItems = await bulkDeleteAirdrops(ids)
          return NextResponse.json({
            success: true,
            message: `Successfully deleted ${deletedItems.length} airdrops`,
            data: deletedItems,
          })

        case "activate":
          const activatedItems = await bulkUpdateAirdrops(ids, { status: "active" })
          return NextResponse.json({
            success: true,
            message: `Successfully activated ${activatedItems.length} airdrops`,
            data: activatedItems,
          })

        case "mark-hot":
          const hotItems = await bulkUpdateAirdrops(ids, { is_hot: true })
          return NextResponse.json({
            success: true,
            message: `Successfully marked ${hotItems.length} airdrops as hot`,
            data: hotItems,
          })

        case "confirm":
          const confirmedItems = await bulkUpdateAirdrops(ids, { is_confirmed: true })
          return NextResponse.json({
            success: true,
            message: `Successfully confirmed ${confirmedItems.length} airdrops`,
            data: confirmedItems,
          })

        default:
          return NextResponse.json({ success: false, error: "Invalid bulk action" }, { status: 400 })
      }
    }

    // Handle create airdrop
    // Validate required fields
    const requiredFields = ["name", "description", "action", "category", "status", "difficulty"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 })
      }
    }

    // Prepare social links
    const socialLinks = {}
    if (body.website) socialLinks.website = body.website
    if (body.telegram) socialLinks.telegram = body.telegram
    if (body.twitter) socialLinks.twitter = body.twitter
    if (body.discord) socialLinks.discord = body.discord
    if (body.facebook) socialLinks.facebook = body.facebook
    if (body.instagram) socialLinks.instagram = body.instagram
    if (body.youtube) socialLinks.youtube = body.youtube
    if (body.linkedin) socialLinks.linkedin = body.linkedin

    // Prepare about section
    const about = {
      overview: body.overview || "",
      tokenomics: body.tokenomics || "",
      roadmap: body.roadmap || "",
    }

    // Prepare steps array
    const steps = []
    for (let i = 1; i <= 6; i++) {
      const step = body[`step${i}`]
      if (step && step.trim()) {
        steps.push(step.trim())
      }
    }

    // Prepare requirements array
    const requirements = []
    for (let i = 1; i <= 5; i++) {
      const req = body[`req${i}`]
      if (req && req.trim()) {
        requirements.push(req.trim())
      }
    }

    const airdropData = {
      name: body.name.trim(),
      logo: body.logo || `/placeholder.svg?height=48&width=48&text=${body.name[0]}`,
      description: body.description.trim(),
      action: body.action.trim(),
      category: body.category,
      status: body.status,
      difficulty: body.difficulty,
      reward: body.reward || "TBA",
      startDate: body.startDate || new Date().toISOString().split("T")[0],
      socialLinks,
      about,
      steps,
      requirements,
      isHot: body.isHot || false,
      isConfirmed: body.isConfirmed || false,
      networks: body.networks || [],
    }

    console.log("🚀 Creating airdrop with data:", airdropData)

    const newAirdrop = await createAirdrop(airdropData)

    // Transform response
    const transformedAirdrop = {
      id: newAirdrop.id.toString(),
      name: newAirdrop.name,
      logo: newAirdrop.logo,
      description: newAirdrop.description,
      action: newAirdrop.action,
      category: newAirdrop.category,
      rating: Number.parseFloat(newAirdrop.rating || "0"),
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
      networks: newAirdrop.networks || [],
      createdAt: newAirdrop.created_at,
      updatedAt: newAirdrop.updated_at,
    }

    return NextResponse.json({
      success: true,
      data: transformedAirdrop,
      message: "Airdrop created successfully",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process request", details: error.message },
      { status: 500 },
    )
  }
}
