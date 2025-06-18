import { type NextRequest, NextResponse } from "next/server"
import { getAirdropById, updateAirdrop, deleteAirdrop } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params

    const airdrop = await getAirdropById(id)

    if (!airdrop) {
      return NextResponse.json({ success: false, error: "Airdrop not found" }, { status: 404 })
    }

    // Transform data to match frontend format
    const transformedAirdrop = {
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
      about: airdrop.about || { overview: "", tokenomics: "", roadmap: "" },
      steps: airdrop.steps || [],
      requirements: airdrop.requirements || [],
      isHot: airdrop.is_hot || false,
      isConfirmed: airdrop.is_confirmed || false,
      participants: airdrop.participants || 0,
      networks: airdrop.networks || [],
      createdAt: airdrop.created_at,
      updatedAt: airdrop.updated_at,
    }

    return NextResponse.json({
      success: true,
      data: transformedAirdrop,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch airdrop", details: error.message },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params
    const body = await request.json()

    // Check if airdrop exists
    const existingAirdrop = await getAirdropById(id)
    if (!existingAirdrop) {
      return NextResponse.json({ success: false, error: "Airdrop not found" }, { status: 404 })
    }

    // Validate required fields
    const requiredFields = ["name", "description", "action", "category", "status", "difficulty"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 })
      }
    }

    // Prepare update data
    const updateData = {
      name: body.name,
      logo: body.logo,
      description: body.description,
      action: body.action,
      category: body.category,
      status: body.status,
      reward: body.reward,
      startDate: body.startDate,
      difficulty: body.difficulty,
      socialLinks: body.socialLinks || {},
      about: body.about || { overview: "", tokenomics: "", roadmap: "" },
      steps: body.steps || [],
      requirements: body.requirements || [],
      isHot: body.isHot || false,
      isConfirmed: body.isConfirmed || false,
      networks: body.networks || [],
    }

    // Update in database
    const updatedAirdrop = await updateAirdrop(id, updateData)

    // Transform response
    const transformedAirdrop = {
      id: updatedAirdrop.id.toString(),
      name: updatedAirdrop.name,
      logo: updatedAirdrop.logo,
      description: updatedAirdrop.description,
      action: updatedAirdrop.action,
      category: updatedAirdrop.category,
      rating: Number.parseFloat(updatedAirdrop.rating || 0),
      totalRatings: updatedAirdrop.total_ratings || 0,
      status: updatedAirdrop.status,
      reward: updatedAirdrop.reward,
      startDate: updatedAirdrop.start_date,
      difficulty: updatedAirdrop.difficulty,
      socialLinks: updatedAirdrop.social_links || {},
      about: updatedAirdrop.about || { overview: "", tokenomics: "", roadmap: "" },
      steps: updatedAirdrop.steps || [],
      requirements: updatedAirdrop.requirements || [],
      isHot: updatedAirdrop.is_hot || false,
      isConfirmed: updatedAirdrop.is_confirmed || false,
      participants: updatedAirdrop.participants || 0,
      networks: updatedAirdrop.networks || [],
      createdAt: updatedAirdrop.created_at,
      updatedAt: updatedAirdrop.updated_at,
    }

    return NextResponse.json({
      success: true,
      data: transformedAirdrop,
      message: "Airdrop updated successfully",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update airdrop", details: error.message },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params

    // Check if airdrop exists
    const existingAirdrop = await getAirdropById(id)
    if (!existingAirdrop) {
      return NextResponse.json({ success: false, error: "Airdrop not found" }, { status: 404 })
    }

    // Delete from database
    const deletedAirdrop = await deleteAirdrop(id)

    return NextResponse.json({
      success: true,
      data: existingAirdrop,
      message: "Airdrop deleted successfully",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete airdrop", details: error.message },
      { status: 500 },
    )
  }
}
