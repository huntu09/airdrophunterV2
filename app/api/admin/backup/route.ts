import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get all data for backup
    const [airdrops, categories, settings, users] = await Promise.all([
      supabase.from("airdrops").select("*"),
      supabase.from("categories").select("*"),
      supabase.from("app_settings").select("*"),
      supabase.from("users").select("*"),
    ])

    const backupData = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      data: {
        airdrops: airdrops.data || [],
        categories: categories.data || [],
        settings: settings.data || [],
        users: users.data || [],
      },
      metadata: {
        totalRecords:
          (airdrops.data?.length || 0) +
          (categories.data?.length || 0) +
          (settings.data?.length || 0) +
          (users.data?.length || 0),
        tables: ["airdrops", "categories", "app_settings", "users"],
      },
    }

    // Log backup creation
    await supabase.from("admin_activity").insert({
      action: "backup_created",
      details: { recordCount: backupData.metadata.totalRecords },
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      data: backupData,
    })
  } catch (error) {
    console.error("Backup creation error:", error)
    return NextResponse.json({ error: "Failed to create backup" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { backupData } = body

    if (!backupData || !backupData.data) {
      return NextResponse.json({ error: "Invalid backup data" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Validate backup format
    if (!backupData.version || !backupData.timestamp) {
      return NextResponse.json({ error: "Invalid backup format" }, { status: 400 })
    }

    // Restore data (be careful - this will overwrite existing data)
    const results = []

    // Restore settings
    if (backupData.data.settings?.length > 0) {
      const { error } = await supabase.from("app_settings").upsert(backupData.data.settings)
      if (error) results.push({ table: "settings", error: error.message })
      else results.push({ table: "settings", success: true })
    }

    // Restore categories
    if (backupData.data.categories?.length > 0) {
      const { error } = await supabase.from("categories").upsert(backupData.data.categories)
      if (error) results.push({ table: "categories", error: error.message })
      else results.push({ table: "categories", success: true })
    }

    // Restore airdrops
    if (backupData.data.airdrops?.length > 0) {
      const { error } = await supabase.from("airdrops").upsert(backupData.data.airdrops)
      if (error) results.push({ table: "airdrops", error: error.message })
      else results.push({ table: "airdrops", success: true })
    }

    // Log restore operation
    await supabase.from("admin_activity").insert({
      action: "backup_restored",
      details: {
        backupTimestamp: backupData.timestamp,
        results,
      },
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Backup restored successfully",
      results,
    })
  } catch (error) {
    console.error("Backup restore error:", error)
    return NextResponse.json({ error: "Failed to restore backup" }, { status: 500 })
  }
}
