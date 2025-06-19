import { createServerClient, isSupabaseConfigured } from "./supabase"

// Helper function to get database client
function getDatabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Database not configured. Please set Supabase environment variables.")
  }

  const client = createServerClient()
  if (!client) {
    throw new Error("Failed to create database client")
  }

  return client
}

export async function getAirdrops(
  options: {
    page?: number
    limit?: number
    search?: string
    category?: string
    status?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
    offset?: number
  } = {},
) {
  try {
    console.log("🗄️ getAirdrops called with options:", options)

    const client = getDatabaseClient()
    const {
      page = 1,
      limit = 10,
      search,
      category,
      status,
      sortBy = "created_at",
      sortOrder = "desc",
      offset,
    } = options

    let query = client.from("airdrops").select("*", { count: "exact" })

    // Apply filters
    if (search) {
      console.log("🔍 Applying search filter:", search)
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (category && category !== "all") {
      console.log("📂 Applying category filter:", category)
      query = query.eq("category", category)
    }

    if (status && status !== "all") {
      console.log("📊 Applying status filter:", status)
      query = query.eq("status", status)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" })

    // Apply pagination
    const from = offset || (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    console.log("🔄 Executing database query...")
    const { data, error, count } = await query

    if (error) {
      console.error("💥 Database error:", error)
      throw new Error(`Database query failed: ${error.message}`)
    }

    console.log(`✅ Database query successful: ${data?.length || 0} records, total: ${count}`)

    return {
      airdrops: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  } catch (error) {
    console.error("💥 getAirdrops error:", error)
    throw error
  }
}

export async function getAirdropById(id: string) {
  try {
    const client = getDatabaseClient()
    const { data, error } = await client.from("airdrops").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return null // Not found
      }
      console.error("Database error:", error)
      throw new Error(`Database query failed: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("getAirdropById error:", error)
    throw error
  }
}

export async function createAirdrop(airdropData: any) {
  try {
    const client = getDatabaseClient()
    const { data, error } = await client
      .from("airdrops")
      .insert([
        {
          name: airdropData.name,
          logo: airdropData.logo,
          description: airdropData.description,
          action: airdropData.action,
          category: airdropData.category,
          status: airdropData.status,
          reward: airdropData.reward,
          start_date: airdropData.startDate,
          difficulty: airdropData.difficulty,
          social_links: airdropData.socialLinks || {},
          about: airdropData.about || { overview: "", tokenomics: "", roadmap: "" },
          steps: airdropData.steps || [],
          requirements: airdropData.requirements || [],
          is_hot: airdropData.isHot || false,
          is_confirmed: airdropData.isConfirmed || false,
          participants: airdropData.participants || 0,
          networks: airdropData.networks || [],
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to create airdrop: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("createAirdrop error:", error)
    throw error
  }
}

export async function updateAirdrop(id: string, airdropData: any) {
  try {
    const client = getDatabaseClient()
    const { data, error } = await client
      .from("airdrops")
      .update({
        name: airdropData.name,
        logo: airdropData.logo,
        description: airdropData.description,
        action: airdropData.action,
        category: airdropData.category,
        status: airdropData.status,
        reward: airdropData.reward,
        start_date: airdropData.startDate,
        difficulty: airdropData.difficulty,
        social_links: airdropData.socialLinks || {},
        about: airdropData.about || { overview: "", tokenomics: "", roadmap: "" },
        steps: airdropData.steps || [],
        requirements: airdropData.requirements || [],
        is_hot: airdropData.isHot || false,
        is_confirmed: airdropData.isConfirmed || false,
        networks: airdropData.networks || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to update airdrop: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("updateAirdrop error:", error)
    throw error
  }
}

export async function deleteAirdrop(id: string) {
  try {
    const client = getDatabaseClient()
    const { data, error } = await client.from("airdrops").delete().eq("id", id).select().single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to delete airdrop: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("deleteAirdrop error:", error)
    throw error
  }
}

// Missing functions that were imported
export async function getAirdropStats() {
  try {
    const client = getDatabaseClient()

    const [totalResult, activeResult, confirmedResult] = await Promise.all([
      client.from("airdrops").select("*", { count: "exact", head: true }),
      client.from("airdrops").select("*", { count: "exact", head: true }).eq("status", "active"),
      client.from("airdrops").select("*", { count: "exact", head: true }).eq("is_confirmed", true),
    ])

    return {
      total: totalResult.count || 0,
      active: activeResult.count || 0,
      confirmed: confirmedResult.count || 0,
      potential: (totalResult.count || 0) - (confirmedResult.count || 0),
    }
  } catch (error) {
    console.error("getAirdropStats error:", error)
    return {
      total: 0,
      active: 0,
      confirmed: 0,
      potential: 0,
    }
  }
}

export async function bulkUpdateAirdrops(ids: string[], updates: any) {
  try {
    const client = getDatabaseClient()
    const { data, error } = await client
      .from("airdrops")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .in("id", ids)
      .select()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to bulk update airdrops: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("bulkUpdateAirdrops error:", error)
    throw error
  }
}

export async function bulkDeleteAirdrops(ids: string[]) {
  try {
    const client = getDatabaseClient()
    const { data, error } = await client.from("airdrops").delete().in("id", ids).select()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to bulk delete airdrops: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("bulkDeleteAirdrops error:", error)
    throw error
  }
}

export async function getUsers(options: { page?: number; limit?: number; search?: string } = {}) {
  try {
    const client = getDatabaseClient()
    const { page = 1, limit = 10, search } = options

    let query = client.from("users").select("*", { count: "exact" })

    if (search) {
      query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to).order("created_at", { ascending: false })

    const { data, error, count } = await query

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Database query failed: ${error.message}`)
    }

    return {
      data: data || [],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  } catch (error) {
    console.error("getUsers error:", error)
    throw error
  }
}

export async function getAnalytics() {
  try {
    const client = getDatabaseClient()

    // Get basic counts
    const [airdropsResult, usersResult] = await Promise.all([
      client.from("airdrops").select("*", { count: "exact", head: true }),
      client.from("users").select("*", { count: "exact", head: true }),
    ])

    if (airdropsResult.error) {
      console.error("Airdrops count error:", airdropsResult.error)
    }

    if (usersResult.error) {
      console.error("Users count error:", usersResult.error)
    }

    return {
      totalAirdrops: airdropsResult.count || 0,
      totalUsers: usersResult.count || 0,
      activeAirdrops: 0, // Placeholder
      completedAirdrops: 0, // Placeholder
    }
  } catch (error) {
    console.error("getAnalytics error:", error)
    return {
      totalAirdrops: 0,
      totalUsers: 0,
      activeAirdrops: 0,
      completedAirdrops: 0,
    }
  }
}

// Rating System Functions
export async function submitRating(airdropId: string, userIp: string, rating: number, userAgent?: string) {
  try {
    const client = getDatabaseClient()

    // Validate rating
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5")
    }

    // Insert or update rating
    const { data, error } = await client
      .from("user_ratings")
      .upsert({
        airdrop_id: airdropId,
        user_ip: userIp,
        rating: rating,
        user_agent: userAgent,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to submit rating: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("submitRating error:", error)
    throw error
  }
}

export async function getUserRating(airdropId: string, userIp: string) {
  try {
    const client = getDatabaseClient()
    const { data, error } = await client
      .from("user_ratings")
      .select("rating, created_at, updated_at")
      .eq("airdrop_id", airdropId)
      .eq("user_ip", userIp)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return null // No rating found
      }
      console.error("Database error:", error)
      throw new Error(`Failed to get user rating: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("getUserRating error:", error)
    throw error
  }
}

export async function getAirdropRatingStats(airdropId: string) {
  try {
    const client = getDatabaseClient()

    // Get rating distribution
    const { data: distribution, error: distError } = await client
      .from("user_ratings")
      .select("rating")
      .eq("airdrop_id", airdropId)

    if (distError) {
      console.error("Database error:", distError)
      throw new Error(`Failed to get rating distribution: ${distError.message}`)
    }

    // Calculate distribution
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    distribution?.forEach((item) => {
      ratingCounts[item.rating as keyof typeof ratingCounts]++
    })

    const totalRatings = distribution?.length || 0
    const averageRating = totalRatings > 0 ? distribution.reduce((sum, item) => sum + item.rating, 0) / totalRatings : 0

    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalRatings,
      distribution: ratingCounts,
    }
  } catch (error) {
    console.error("getAirdropRatingStats error:", error)
    throw error
  }
}

export async function getRatingHistory(airdropId: string, limit = 10) {
  try {
    const client = getDatabaseClient()
    const { data, error } = await client
      .from("user_ratings")
      .select("rating, created_at, updated_at")
      .eq("airdrop_id", airdropId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to get rating history: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("getRatingHistory error:", error)
    throw error
  }
}
