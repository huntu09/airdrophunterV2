import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ids } = body

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, error: "No categories selected" }, { status: 400 })
    }

    if (action === "delete") {
      // Check if any categories have airdrops
      const { data: categoriesWithAirdrops } = await supabase
        .from("airdrops")
        .select("category_id")
        .in("category_id", ids)

      if (categoriesWithAirdrops && categoriesWithAirdrops.length > 0) {
        const usedCategoryIds = [...new Set(categoriesWithAirdrops.map((a) => a.category_id))]
        return NextResponse.json(
          {
            success: false,
            error: `Cannot delete ${usedCategoryIds.length} categories that have airdrops associated with them.`,
          },
          { status: 400 },
        )
      }

      const { error } = await supabase.from("categories").delete().in("id", ids)

      if (error) {
        console.error("Bulk delete error:", error)
        return NextResponse.json({ success: false, error: "Failed to delete categories" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: `Successfully deleted ${ids.length} categories`,
      })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Bulk action API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
