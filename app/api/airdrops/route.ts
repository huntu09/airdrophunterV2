import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { notificationGenerator } from "@/lib/notification-generator"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("airdrops")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data: airdrops, error } = await query

    if (error) {
      console.error("Error fetching airdrops:", error)
      return NextResponse.json({ error: "Failed to fetch airdrops" }, { status: 500 })
    }

    return NextResponse.json({ airdrops: airdrops || [] })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "slug", "description", "status", "category", "blockchain"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const { data: airdrop, error } = await supabase.from("airdrops").insert([body]).select().single()

    if (error) {
      console.error("Error creating airdrop:", error)
      return NextResponse.json({ error: "Failed to create airdrop" }, { status: 500 })
    }

    // Generate notification for new airdrop
    if (airdrop.status === "CONFIRMED") {
      await notificationGenerator.generateNewAirdropNotification(airdrop.id)
    }

    return NextResponse.json({ airdrop }, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
