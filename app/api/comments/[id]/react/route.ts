import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: commentId } = params
    const body = await request.json()
    const { reaction_type } = body

    if (!["like", "love", "haha"].includes(reaction_type)) {
      return NextResponse.json({ error: "Invalid reaction type" }, { status: 400 })
    }

    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "127.0.0.1"

    // Check if user already reacted with this type
    const { data: existingReaction } = await supabase
      .from("comment_reactions")
      .select("id")
      .eq("comment_id", commentId)
      .eq("ip_address", ip)
      .eq("reaction_type", reaction_type)
      .single()

    if (existingReaction) {
      // Remove reaction if already exists
      const { error } = await supabase.from("comment_reactions").delete().eq("id", existingReaction.id)

      if (error) {
        console.error("Error removing reaction:", error)
        return NextResponse.json({ error: "Failed to remove reaction" }, { status: 500 })
      }

      return NextResponse.json({ message: "Reaction removed" })
    } else {
      // Add new reaction
      const { error } = await supabase.from("comment_reactions").insert({
        comment_id: commentId,
        reaction_type,
        ip_address: ip,
      })

      if (error) {
        console.error("Error adding reaction:", error)
        return NextResponse.json({ error: "Failed to add reaction" }, { status: 500 })
      }

      return NextResponse.json({ message: "Reaction added" })
    }
  } catch (error) {
    console.error("Error in POST /api/comments/[id]/react:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
