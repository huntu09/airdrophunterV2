import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

// Settings schema
interface AppSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  adminEmail: string
  enableNotifications: boolean
  enableAnalytics: boolean
  maintenanceMode: boolean
  autoApproveAirdrops: boolean
  maxAirdropsPerPage: number
  emailNotifications: boolean
  smsNotifications: boolean
  themeColor: string
  logoUrl?: string
  faviconUrl?: string
  twoFactorEnabled: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  backupFrequency: string
  enableRateLimiting: boolean
  apiRateLimit: number
}

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get settings from database
    const { data: settings, error } = await supabase.from("app_settings").select("*").single()

    if (error && error.code !== "PGRST116") {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
    }

    // Default settings if none exist
    const defaultSettings: AppSettings = {
      siteName: "AirdropHunter",
      siteDescription: "Your ultimate crypto co-pilot for discovering profitable airdrops",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://airdrophunter.com",
      adminEmail: process.env.ADMIN_EMAIL || "admin@airdrophunter.com",
      enableNotifications: true,
      enableAnalytics: true,
      maintenanceMode: false,
      autoApproveAirdrops: false,
      maxAirdropsPerPage: 10,
      emailNotifications: true,
      smsNotifications: false,
      themeColor: "#7cb342",
      twoFactorEnabled: false,
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      backupFrequency: "daily",
      enableRateLimiting: true,
      apiRateLimit: 100,
    }

    return NextResponse.json({
      success: true,
      data: settings?.settings || defaultSettings,
    })
  } catch (error) {
    console.error("Settings fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    // Validate settings
    const validatedSettings = validateSettings(body)
    if (!validatedSettings.valid) {
      return NextResponse.json({ error: validatedSettings.error }, { status: 400 })
    }

    // Save settings to database
    const { data, error } = await supabase
      .from("app_settings")
      .upsert({
        id: 1, // Single settings record
        settings: body,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
    }

    // Log settings change
    await logActivity("settings_updated", {
      changes: Object.keys(body),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
      data,
    })
  } catch (error) {
    console.error("Settings save error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function validateSettings(settings: any) {
  const required = ["siteName", "siteDescription", "adminEmail"]

  for (const field of required) {
    if (!settings[field] || settings[field].trim() === "") {
      return { valid: false, error: `${field} is required` }
    }
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(settings.adminEmail)) {
    return { valid: false, error: "Invalid admin email format" }
  }

  // Validate URL
  if (settings.siteUrl && !isValidUrl(settings.siteUrl)) {
    return { valid: false, error: "Invalid site URL format" }
  }

  // Validate theme color
  if (settings.themeColor && !isValidHexColor(settings.themeColor)) {
    return { valid: false, error: "Invalid theme color format" }
  }

  return { valid: true }
}

function isValidUrl(string: string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

function isValidHexColor(color: string) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

async function logActivity(action: string, details: any) {
  try {
    const supabase = createServerClient()
    await supabase.from("admin_activity").insert({
      action,
      details,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to log activity:", error)
  }
}
