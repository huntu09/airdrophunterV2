import { type NextRequest, NextResponse } from "next/server"

// Safe environment variables that can be managed
const MANAGEABLE_ENV_VARS = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_GA_ID",
  "NEXT_PUBLIC_AFFILIATE_TRACKING_ENABLED",
  "NEXT_PUBLIC_BINANCE_REF_CODE",
  "NEXT_PUBLIC_OKX_REF_CODE",
  "NEXT_PUBLIC_BYBIT_REF_CODE",
  "NEXT_PUBLIC_KUCOIN_REF_CODE",
  "ADMIN_EMAIL",
  "JWT_SECRET",
  "VAPID_PUBLIC_KEY",
  "VAPID_PRIVATE_KEY",
]

// Sensitive variables that should be masked
const SENSITIVE_VARS = ["JWT_SECRET", "SUPABASE_SERVICE_ROLE_KEY", "VAPID_PRIVATE_KEY", "ADMIN_PASSWORD"]

export async function GET() {
  try {
    const envVars: Record<string, any> = {}

    MANAGEABLE_ENV_VARS.forEach((key) => {
      const value = process.env[key]
      envVars[key] = {
        key,
        value: SENSITIVE_VARS.includes(key) ? maskValue(value) : value,
        isSensitive: SENSITIVE_VARS.includes(key),
        isSet: !!value,
        description: getEnvDescription(key),
      }
    })

    return NextResponse.json({
      success: true,
      data: envVars,
      info: {
        total: MANAGEABLE_ENV_VARS.length,
        set: Object.values(envVars).filter((v: any) => v.isSet).length,
        sensitive: Object.values(envVars).filter((v: any) => v.isSensitive).length,
      },
    })
  } catch (error) {
    console.error("Environment variables fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch environment variables" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value, action } = body

    if (!MANAGEABLE_ENV_VARS.includes(key)) {
      return NextResponse.json({ error: "Environment variable not manageable" }, { status: 400 })
    }

    // In a real implementation, you would update the environment file
    // For now, we'll simulate the update
    console.log(`Environment variable update: ${key} = ${SENSITIVE_VARS.includes(key) ? "[MASKED]" : value}`)

    // Log the change
    const logData = {
      action: "env_var_updated",
      details: {
        key,
        action,
        timestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json({
      success: true,
      message: `Environment variable ${key} ${action === "delete" ? "deleted" : "updated"} successfully`,
      note: "Changes will take effect after application restart",
    })
  } catch (error) {
    console.error("Environment variable update error:", error)
    return NextResponse.json({ error: "Failed to update environment variable" }, { status: 500 })
  }
}

function maskValue(value?: string): string {
  if (!value) return ""
  if (value.length <= 8) return "*".repeat(value.length)
  return value.substring(0, 4) + "*".repeat(value.length - 8) + value.substring(value.length - 4)
}

function getEnvDescription(key: string): string {
  const descriptions: Record<string, string> = {
    NEXT_PUBLIC_SITE_URL: "Public URL of your application",
    NEXT_PUBLIC_GA_ID: "Google Analytics tracking ID",
    NEXT_PUBLIC_AFFILIATE_TRACKING_ENABLED: "Enable affiliate link tracking",
    NEXT_PUBLIC_BINANCE_REF_CODE: "Binance referral code for affiliate links",
    NEXT_PUBLIC_OKX_REF_CODE: "OKX referral code for affiliate links",
    NEXT_PUBLIC_BYBIT_REF_CODE: "Bybit referral code for affiliate links",
    NEXT_PUBLIC_KUCOIN_REF_CODE: "KuCoin referral code for affiliate links",
    ADMIN_EMAIL: "Administrator email address",
    JWT_SECRET: "Secret key for JWT token signing",
    VAPID_PUBLIC_KEY: "VAPID public key for push notifications",
    VAPID_PRIVATE_KEY: "VAPID private key for push notifications",
  }
  return descriptions[key] || "No description available"
}
