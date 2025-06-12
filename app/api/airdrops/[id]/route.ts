import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

function getSupabaseClient() {
  try {
    return createClient()
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    throw new Error("Database connection failed")
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseClient()
    const { id } = params

    // Try to get airdrop by ID first
    const { data: airdrop, error } = await supabase.from("airdrops").select("*").eq("id", id).single()

    if (error || !airdrop) {
      console.error("Error fetching airdrop by ID:", error)
      return NextResponse.json({ error: "Airdrop not found" }, { status: 404 })
    }

    return NextResponse.json(airdrop)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
