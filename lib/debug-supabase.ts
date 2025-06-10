// Debug utility untuk troubleshoot Supabase connection
export async function debugSupabaseConnection() {
  console.log("🔍 === SUPABASE DEBUG REPORT ===")

  // 1. Check Environment Variables
  console.log("\n📋 Environment Variables:")
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl || "❌ MISSING")
  console.log(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
    supabaseKey ? `✅ Present (${supabaseKey.substring(0, 20)}...)` : "❌ MISSING",
  )

  if (!supabaseUrl || !supabaseKey) {
    console.log("❌ Environment variables missing - check your .env.local file")
    return false
  }

  // 2. Validate URL Format
  console.log("\n🌐 URL Validation:")
  try {
    const url = new URL(supabaseUrl)
    console.log("✅ URL format valid")
    console.log("- Protocol:", url.protocol)
    console.log("- Host:", url.host)
    console.log("- Expected format: https://[project-id].supabase.co")

    if (!url.host.includes("supabase.co")) {
      console.log("⚠️ Warning: URL doesn't contain 'supabase.co'")
    }
  } catch (err) {
    console.log("❌ Invalid URL format:", err)
    return false
  }

  // 3. Test Basic Fetch
  console.log("\n🧪 Basic Connectivity Test:")
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    if (response.ok) {
      console.log("✅ Basic connectivity successful")
    } else {
      console.log("❌ HTTP Error:", response.status, response.statusText)
      const text = await response.text()
      console.log("Response body:", text.substring(0, 500))
    }
  } catch (err) {
    console.log("❌ Network error:", err)
    return false
  }

  // 4. Test Table Access
  console.log("\n📊 Table Access Test:")
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/airdrops?select=count`, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "count=exact",
      },
    })

    console.log("Table query status:", response.status)

    if (response.ok) {
      const data = await response.text()
      console.log("✅ Table access successful")
      console.log("Response:", data)
    } else {
      console.log("❌ Table access failed:", response.status)
      const text = await response.text()
      console.log("Error response:", text)
    }
  } catch (err) {
    console.log("❌ Table query error:", err)
  }

  console.log("\n=== END DEBUG REPORT ===")
  return true
}

// Function to check if tables exist
export async function checkSupabaseTables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log("❌ Environment variables not set")
    return
  }

  console.log("🔍 Checking Supabase Tables...")

  const tables = ["airdrops", "airdrop_steps", "categories", "admin_users"]

  for (const table of tables) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=count&limit=1`, {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        console.log(`✅ Table '${table}' exists and accessible`)
      } else {
        console.log(`❌ Table '${table}' error:`, response.status, response.statusText)
      }
    } catch (err) {
      console.log(`❌ Table '${table}' connection error:`, err)
    }
  }
}
