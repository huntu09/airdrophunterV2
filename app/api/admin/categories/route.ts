import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""

    let query = supabase.from("categories_with_counts").select("*")

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Get total count
    const { count } = await query

    // Get paginated data
    const { data: categories, error } = await query
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (error) {
      console.error("Categories fetch error:", error)
      return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: categories || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Categories API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, color, icon } = body

    if (!name?.trim()) {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([
        {
          name: name.trim(),
          description: description?.trim() || "",
          color: color || "#7cb342",
          icon: icon || "folder",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Create category error:", error)
      if (error.code === "23505") {
        return NextResponse.json({ success: false, error: "Category name already exists" }, { status: 400 })
      }
      return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Category created successfully",
    })
  } catch (error) {
    console.error("Create category API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
