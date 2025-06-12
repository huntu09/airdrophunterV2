import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { debugSupabaseConnection, checkSupabaseTables } from "./debug-supabase"

// Types
export interface Airdrop {
  id: string
  name: string
  slug: string
  logo_url: string | null
  description: string
  about: string | null
  status: "CONFIRMED" | "UPCOMING" | "ENDED"
  website_url: string | null
  telegram_url: string | null
  twitter_url: string | null
  discord_url: string | null
  total_reward: string | null
  participants_count: number
  deadline: string | null
  is_hot: boolean
  category: string
  blockchain: string
  created_at: string
  updated_at: string
}

export interface AirdropStep {
  id: string
  airdrop_id: string
  step_number: number
  title: string
  description: string
  is_required: boolean
  created_at: string
}

// Don't initialize at module level - only create when function is called
export function createClient() {
  // Only create the client when the function is called (at runtime)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // For build time, return a mock client that will be replaced at runtime
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ Supabase credentials missing, but in development mode. Using mock client.")
    }

    // Return a mock client that will throw a clear error if actually used
    return {
      from: () => {
        throw new Error("Supabase client not properly initialized. Check your environment variables.")
      },
    } as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Enhanced environment validation
function validateEnvironment() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("🔍 Environment Check:")
  console.log("- NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✅ Set" : "❌ Missing")
  console.log("- NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✅ Set" : "❌ Missing")

  if (!supabaseUrl) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL is missing")
    console.error("📝 Add this to your .env.local file:")
    console.error("NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co")
    return { isValid: false, error: "Missing SUPABASE_URL" }
  }

  if (!supabaseAnonKey) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing")
    console.error("📝 Add this to your .env.local file:")
    console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key")
    return { isValid: false, error: "Missing SUPABASE_ANON_KEY" }
  }

  // Validate URL format
  try {
    const url = new URL(supabaseUrl)
    if (!url.host.includes("supabase.co")) {
      console.warn("⚠️ URL doesn't look like a Supabase URL")
    }
  } catch (err) {
    console.error("❌ Invalid SUPABASE_URL format:", supabaseUrl)
    return { isValid: false, error: "Invalid SUPABASE_URL format" }
  }

  // Validate key format
  if (!supabaseAnonKey.startsWith("eyJ")) {
    console.warn("⚠️ SUPABASE_ANON_KEY might be invalid (should start with 'eyJ')")
  }

  console.log("✅ Environment validation passed")
  return { isValid: true, supabaseUrl, supabaseAnonKey }
}

// Check if Supabase is available
export function isSupabaseAvailable(): boolean {
  // Don't run validation during build
  if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
    // We're in a Node.js environment during build
    return false
  }

  const validation = validateEnvironment()
  return validation.isValid
}

// Get Supabase client with error handling
export function getSupabase() {
  // Don't validate during build
  if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
    // We're in a Node.js environment during build
    return createClient() // This will return our mock client
  }

  const validation = validateEnvironment()

  if (!validation.isValid) {
    throw new Error(`Supabase configuration error: ${validation.error}`)
  }

  try {
    const client = createClient()
    console.log("✅ Supabase client created successfully")
    return client
  } catch (err) {
    console.error("❌ Failed to create Supabase client:", err)
    throw new Error("Failed to initialize Supabase client")
  }
}

// Enhanced connection test
export async function testSupabaseConnection() {
  try {
    console.log("🧪 Testing Supabase connection...")

    // Run debug first
    await debugSupabaseConnection()

    if (!isSupabaseAvailable()) {
      return { success: false, error: "Environment not configured" }
    }

    const supabase = getSupabase()

    // Test with a simple query to airdrops table
    const { data, error } = await supabase.from("airdrops").select("id").limit(1)

    if (error) {
      console.error("❌ Supabase query error:", error)

      // Check if it's a table not found error
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        console.error("📋 Table 'airdrops' does not exist!")
        console.error("🛠️ Please run the SQL scripts to create tables:")
        console.error("1. scripts/01-create-tables.sql")
        console.error("2. scripts/02-seed-categories.sql")
        console.error("3. scripts/03-seed-airdrops.sql")
        console.error("4. scripts/04-seed-steps.sql")
        console.error("5. scripts/05-create-admin.sql")

        // Check what tables do exist
        await checkSupabaseTables()
      }

      return { success: false, error: error.message }
    }

    console.log("✅ Supabase connection test successful")
    console.log("📊 Data sample:", data)
    return { success: true, data }
  } catch (err) {
    console.error("❌ Supabase connection test error:", err)

    if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
      console.error("🌐 This is a network connectivity issue:")
      console.error("1. Check if your Supabase URL is correct")
      console.error("2. Check if your API key is valid")
      console.error("3. Check if your Supabase project is active")
      console.error("4. Check your internet connection")
      console.error("5. Check if there are any firewall/proxy issues")
    }

    return { success: false, error: err instanceof Error ? err.message : "Unknown error" }
  }
}
