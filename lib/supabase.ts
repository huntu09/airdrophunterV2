import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create client-side Supabase client (singleton pattern)
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Server-side Supabase client
export const createServerClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase environment variables not configured")
    return null
  }
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseServiceKey)
}

// Export createClient for compatibility
export { createClient } from "@supabase/supabase-js"
