import { type NextRequest, NextResponse } from "next/server"
import { getAirdropById } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    console.log("Fetching airdrop with ID:", id)

    // Get airdrop from database
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
      about: airdrop.about || {
        overview: "",
        tokenomics: "",
        roadmap: "",
      },
      steps: airdrop.steps || [],
      requirements: airdrop.requirements || [],
      isHot: airdrop.is_hot || false,
      isConfirmed: airdrop.is_confirmed || false,
      participants: airdrop.participants || 0,
      createdAt: airdrop.created_at,
      updatedAt: airdrop.updated_at,
    }

    console.log("Returning airdrop:", transformedAirdrop)

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
