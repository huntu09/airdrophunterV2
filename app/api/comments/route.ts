import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Get comments for an airdrop
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const airdropId = searchParams.get("airdrop_id")

    if (!airdropId) {
      return NextResponse.json({ error: "Airdrop ID is required" }, { status: 400 })
    }

    // Get comments with reactions using the view
    const { data: comments, error } = await supabase
      .from("comments_with_reactions")
      .select("*")
      .eq("airdrop_id", airdropId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching comments:", error)
      return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
    }

    // Organize comments with replies
    const topLevelComments = comments?.filter((c) => !c.parent_id) || []
    const replies = comments?.filter((c) => c.parent_id) || []

    const commentsWithReplies = topLevelComments.map((comment) => ({
      ...comment,
      replies: replies.filter((reply) => reply.parent_id === comment.id),
    }))

    return NextResponse.json({ comments: commentsWithReplies })
  } catch (error) {
    console.error("Error in GET /api/comments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { airdrop_id, author_name, content, parent_id } = body

    // Validation
    if (!airdrop_id || !author_name || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (content.length < 1 || content.length > 500) {
      return NextResponse.json({ error: "Content must be between 1 and 500 characters" }, { status: 400 })
    }

    if (author_name.length < 1 || author_name.length > 100) {
      return NextResponse.json({ error: "Name must be between 1 and 100 characters" }, { status: 400 })
    }

    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "127.0.0.1"

    // Rate limiting check (5 comments per hour per IP)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: recentComments } = await supabase
      .from("comments")
      .select("id")
      .eq("ip_address", ip)
      .gte("created_at", oneHourAgo)

    if (recentComments && recentComments.length >= 5) {
      return NextResponse.json({ error: "Rate limit exceeded. Please wait before commenting again." }, { status: 429 })
    }

    // Insert comment
    const { data: comment, error } = await supabase
      .from("comments")
      .insert({
        airdrop_id,
        author_name: author_name.trim(),
        content: content.trim(),
        parent_id: parent_id || null,
        ip_address: ip,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating comment:", error)
      return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
    }

    return NextResponse.json({ comment }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/comments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
