import { getSupabase, isSupabaseAvailable, testSupabaseConnection, type Airdrop, type AirdropStep } from "./supabase"

export class AirdropAPI {
  // Enhanced error handling for API calls
  private static async handleSupabaseCall<T>(operation: string, apiCall: () => Promise<T>): Promise<T> {
    try {
      console.log(`🔄 Starting ${operation}...`)

      if (!isSupabaseAvailable()) {
        console.warn(`⚠️ ${operation}: Supabase not available, using fallback`)
        throw new Error("Supabase not configured")
      }

      // Test connection first
      const connectionTest = await testSupabaseConnection()
      if (!connectionTest.success) {
        console.error(`❌ ${operation}: Connection test failed:`, connectionTest.error)
        throw new Error(`Connection failed: ${connectionTest.error}`)
      }

      const result = await apiCall()
      console.log(`✅ ${operation}: Success`)
      return result
    } catch (err) {
      console.error(`❌ ${operation}: Error:`, err)

      // Enhanced error logging
      if (err instanceof Error) {
        console.error(`- Error name: ${err.name}`)
        console.error(`- Error message: ${err.message}`)
        if (err.stack) {
          console.error(`- Error stack: ${err.stack.split("\n")[0]}`)
        }
      }

      // Check if it's a network error
      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        console.error("🌐 Network Error Details:")
        console.error("- This is likely a network connectivity issue")
        console.error("- Check if Supabase URL is correct")
        console.error("- Check if API key is valid")
        console.error("- Check CORS settings in Supabase")
      }

      // Check if it's a JSON parsing error
      if (err instanceof SyntaxError && err.message.includes("Unexpected token")) {
        console.error("📄 JSON Parse Error Details:")
        console.error("- Server returned non-JSON response")
        console.error("- Likely an HTML error page")
        console.error("- Check API endpoint and authentication")
      }

      throw err
    }
  }

  // Get all airdrops with enhanced error handling
  static async getAirdrops(): Promise<Airdrop[]> {
    try {
      return await this.handleSupabaseCall("getAirdrops", async () => {
        const supabase = getSupabase()
        const { data, error } = await supabase.from("airdrops").select("*").order("created_at", { ascending: false })

        if (error) {
          console.error("Supabase query error:", error)
          throw new Error(`Database error: ${error.message}`)
        }

        if (!data) {
          console.warn("No data returned from airdrops table")
          return []
        }

        console.log(`📊 Retrieved ${data.length} airdrops`)
        return data as Airdrop[]
      })
    } catch (err) {
      console.error("getAirdrops fallback to mock data due to error:", err)
      return this.getMockAirdrops()
    }
  }

  // Get airdrop by slug with enhanced error handling
  static async getAirdropBySlug(slug: string): Promise<Airdrop & { steps: AirdropStep[] }> {
    try {
      return await this.handleSupabaseCall(`getAirdropBySlug(${slug})`, async () => {
        const supabase = getSupabase()

        // Get airdrop
        const { data: airdrop, error: airdropError } = await supabase
          .from("airdrops")
          .select("*")
          .eq("slug", slug)
          .single()

        if (airdropError) {
          console.error("Airdrop query error:", airdropError)
          throw new Error(`Failed to fetch airdrop: ${airdropError.message}`)
        }

        if (!airdrop) {
          throw new Error(`Airdrop with slug '${slug}' not found`)
        }

        // Get steps
        const { data: steps, error: stepsError } = await supabase
          .from("airdrop_steps")
          .select("*")
          .eq("airdrop_id", airdrop.id)
          .order("step_number")

        if (stepsError) {
          console.warn("Steps query error:", stepsError)
          // Don't throw error for steps, just use empty array
        }

        console.log(`📊 Retrieved airdrop '${airdrop.name}' with ${steps?.length || 0} steps`)
        return { ...airdrop, steps: steps || [] } as Airdrop & { steps: AirdropStep[] }
      })
    } catch (err) {
      console.error(`getAirdropBySlug(${slug}) fallback to mock data due to error:`, err)
      return this.getMockAirdropBySlug(slug)
    }
  }

  // Get featured airdrops
  static async getFeaturedAirdrops(): Promise<Airdrop[]> {
    try {
      return await this.handleSupabaseCall("getFeaturedAirdrops", async () => {
        const supabase = getSupabase()
        const { data, error } = await supabase
          .from("airdrops")
          .select("*")
          .eq("is_hot", true)
          .eq("status", "CONFIRMED")
          .order("participants_count", { ascending: false })
          .limit(3)

        if (error) {
          throw new Error(`Database error: ${error.message}`)
        }

        return data as Airdrop[]
      })
    } catch (err) {
      console.error("getFeaturedAirdrops fallback to mock data due to error:", err)
      return this.getMockAirdrops().slice(0, 3)
    }
  }

  // Admin operations (require Supabase)
  static async createAirdrop(airdrop: Partial<Airdrop>): Promise<Airdrop> {
    return await this.handleSupabaseCall("createAirdrop", async () => {
      const supabase = getSupabase()
      const { data, error } = await supabase.from("airdrops").insert(airdrop).select().single()

      if (error) throw new Error(`Failed to create airdrop: ${error.message}`)
      return data as Airdrop
    })
  }

  static async updateAirdrop(id: string, updates: Partial<Airdrop>): Promise<Airdrop> {
    return await this.handleSupabaseCall("updateAirdrop", async () => {
      const supabase = getSupabase()
      const { data, error } = await supabase
        .from("airdrops")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw new Error(`Failed to update airdrop: ${error.message}`)
      return data as Airdrop
    })
  }

  static async deleteAirdrop(id: string): Promise<void> {
    return await this.handleSupabaseCall("deleteAirdrop", async () => {
      const supabase = getSupabase()

      // First delete all steps
      await supabase.from("airdrop_steps").delete().eq("airdrop_id", id)

      // Then delete the airdrop
      const { error } = await supabase.from("airdrops").delete().eq("id", id)
      if (error) throw new Error(`Failed to delete airdrop: ${error.message}`)
    })
  }

  static async addStep(step: Partial<AirdropStep>): Promise<AirdropStep> {
    return await this.handleSupabaseCall("addStep", async () => {
      const supabase = getSupabase()
      const { data, error } = await supabase.from("airdrop_steps").insert(step).select().single()

      if (error) throw new Error(`Failed to add step: ${error.message}`)
      return data as AirdropStep
    })
  }

  static async deleteStepsForAirdrop(airdropId: string): Promise<void> {
    return await this.handleSupabaseCall("deleteStepsForAirdrop", async () => {
      const supabase = getSupabase()
      const { error } = await supabase.from("airdrop_steps").delete().eq("airdrop_id", airdropId)
      if (error) throw new Error(`Failed to delete steps: ${error.message}`)
    })
  }

  // Mock data methods
  private static getMockAirdrops(): Airdrop[] {
    return [
      {
        id: "1",
        name: "LayerZero Airdrop",
        slug: "layerzero-airdrop",
        logo_url: "/placeholder.svg?height=60&width=60",
        description: "Cross-chain interoperability protocol airdrop",
        about:
          "LayerZero is an omnichain interoperability protocol designed for lightweight message passing across chains.",
        status: "CONFIRMED",
        website_url: "https://layerzero.network",
        telegram_url: null,
        twitter_url: "https://twitter.com/layerzero_labs",
        discord_url: null,
        total_reward: "$50,000,000",
        participants_count: 125000,
        deadline: null,
        is_hot: true,
        category: "DeFi",
        blockchain: "Multi-chain",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        name: "zkSync Era Airdrop",
        slug: "zksync-era-airdrop",
        logo_url: "/placeholder.svg?height=60&width=60",
        description: "Layer 2 scaling solution for Ethereum",
        about: "zkSync Era is a Layer 2 scaling solution that uses zero-knowledge proofs to scale Ethereum.",
        status: "CONFIRMED",
        website_url: "https://zksync.io",
        telegram_url: null,
        twitter_url: "https://twitter.com/zksync",
        discord_url: null,
        total_reward: "$30,000,000",
        participants_count: 89000,
        deadline: null,
        is_hot: true,
        category: "Layer 2",
        blockchain: "Ethereum",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Arbitrum Odyssey",
        slug: "arbitrum-odyssey",
        logo_url: "/placeholder.svg?height=60&width=60",
        description: "Explore Arbitrum ecosystem and earn rewards",
        about: "Arbitrum Odyssey is a campaign to explore the Arbitrum ecosystem and earn NFT rewards.",
        status: "UPCOMING",
        website_url: "https://arbitrum.io",
        telegram_url: null,
        twitter_url: "https://twitter.com/arbitrum",
        discord_url: null,
        total_reward: "$20,000,000",
        participants_count: 67000,
        deadline: "2024-12-31",
        is_hot: false,
        category: "Layer 2",
        blockchain: "Arbitrum",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]
  }

  private static getMockAirdropBySlug(slug: string): Airdrop & { steps: AirdropStep[] } {
    const mockAirdrops = this.getMockAirdrops()
    const airdrop = mockAirdrops.find((a) => a.slug === slug) || mockAirdrops[0]

    return {
      ...airdrop,
      steps: [
        {
          id: "1",
          airdrop_id: airdrop.id,
          step_number: 1,
          title: "Connect Wallet",
          description: "Connect your Web3 wallet to the platform",
          is_required: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          airdrop_id: airdrop.id,
          step_number: 2,
          title: "Complete Tasks",
          description: "Complete the required social media tasks",
          is_required: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "3",
          airdrop_id: airdrop.id,
          step_number: 3,
          title: "Bridge Assets",
          description: "Bridge assets to the network (optional)",
          is_required: false,
          created_at: new Date().toISOString(),
        },
      ],
    }
  }
}

// Re-export types
export type { Airdrop, AirdropStep }
