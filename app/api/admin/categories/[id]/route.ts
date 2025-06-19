import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, description, color, icon } = body

    if (!name?.trim()) {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("categories")
      .update({
        name: name.trim(),
        description: description?.trim() || "",
        color: color || "#7cb342",
        icon: icon || "folder",
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Update category error:", error)
      if (error.code === "23505") {
        return NextResponse.json({ success: false, error: "Category name already exists" }, { status: 400 })
      }
      return NextResponse.json({ success: false, error: "Failed to update category" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Category updated successfully",
    })
  } catch (error) {
    console.error("Update category API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if category has airdrops
    const { count } = await supabase.from("airdrops").select("id", { count: "exact" }).eq("category_id", params.id)

    if (count && count > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete category. It has ${count} airdrops associated with it.`,
        },
        { status: 400 },
      )
    }

    const { error } = await supabase.from("categories").delete().eq("id", params.id)

    if (error) {
      console.error("Delete category error:", error)
      return NextResponse.json({ success: false, error: "Failed to delete category" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    })
  } catch (error) {
    console.error("Delete category API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
