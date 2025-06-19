import { type NextRequest, NextResponse } from "next/server"
import { submitRating, getUserRating, getAirdropRatingStats } from "@/lib/database"
import { rateLimit } from "@/lib/rate-limiter"

// Get user's current rating for an airdrop
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const airdropId = params.id
    const userIp = request.ip || request.headers.get("x-forwarded-for") || "anonymous"

    // Rate limiting
    if (!rateLimit(request, 30, 60000)) {
      // 30 requests per minute
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const userRating = await getUserRating(airdropId, userIp)
    const stats = await getAirdropRatingStats(airdropId)

    return NextResponse.json({
      userRating: userRating?.rating || null,
      stats,
      success: true,
    })
  } catch (error) {
    console.error("GET /api/airdrops/[id]/rating error:", error)
    return NextResponse.json({ error: "Failed to get rating data" }, { status: 500 })
  }
}

// Submit or update a rating
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const airdropId = params.id
    const userIp = request.ip || request.headers.get("x-forwarded-for") || "anonymous"
    const userAgent = request.headers.get("user-agent") || undefined

    // Rate limiting - stricter for POST
    if (!rateLimit(request, 5, 60000)) {
      // 5 submissions per minute
      return NextResponse.json({ error: "Too many rating submissions. Please try again later." }, { status: 429 })
    }

    const body = await request.json()
    const { rating } = body

    // Validation
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be a number between 1 and 5" }, { status: 400 })
    }

    // Submit rating
    const result = await submitRating(airdropId, userIp, rating, userAgent)

    // Get updated stats
    const stats = await getAirdropRatingStats(airdropId)

    return NextResponse.json({
      success: true,
      message: "Rating submitted successfully",
      userRating: rating,
      stats,
      data: result,
    })
  } catch (error) {
    console.error("POST /api/airdrops/[id]/rating error:", error)

    if (error instanceof Error && error.message.includes("Rating must be between")) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to submit rating" }, { status: 500 })
  }
}

// Update existing rating
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Same logic as POST since we're using upsert
  return POST(request, { params })
}
