import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, TrendingUp, Users, Gift, ExternalLink, Star, Zap } from "lucide-react"
import { HeaderBannerAd, InContentAd, ResponsiveAd } from "@/components/adsense-ad"
import { createServerClient } from "@/lib/supabase"

export default async function LatestAirdropsPage() {
  // Fallback data jika database tidak tersedia
  const fallbackAirdrops = [
    {
      id: 1,
      name: "LayerZero",
      description: "Omnichain interoperability protocol enabling seamless cross-chain transactions",
      reward: "$ZRO Token",
      endDate: "2024-07-15",
      participants: "2.5M+",
      difficulty: "Medium",
      tasks: ["Bridge assets", "Use dApps", "Hold for 30 days"],
      logo: "/placeholder.svg?height=60&width=60",
      network: "Multi-chain",
      status: "Active",
    },
    {
      id: 2,
      name: "zkSync Era",
      description: "Ethereum's leading zkEVM Layer 2 with confirmed token launch",
      reward: "$ZK Token",
      endDate: "2024-08-01",
      participants: "2.1M+",
      difficulty: "Easy",
      tasks: ["Bridge ETH", "Swap tokens", "Use dApps"],
      logo: "/placeholder.svg?height=60&width=60",
      network: "Ethereum L2",
      status: "Active",
    },
    {
      id: 3,
      name: "Scroll",
      description: "Native zkEVM Layer 2 for Ethereum with growing ecosystem",
      reward: "$SCR Token",
      endDate: "2024-08-15",
      participants: "1.5M+",
      difficulty: "Medium",
      tasks: ["Bridge assets", "Deploy contracts", "Use ecosystem"],
      logo: "/placeholder.svg?height=60&width=60",
      network: "zkEVM",
      status: "Active",
    },
    {
      id: 4,
      name: "Linea",
      description: "ConsenSys zkEVM Layer 2 with MetaMask integration",
      reward: "$LINEA Token",
      endDate: "2024-09-01",
      participants: "1.2M+",
      difficulty: "Easy",
      tasks: ["Use MetaMask", "Bridge tokens", "Explore dApps"],
      logo: "/placeholder.svg?height=60&width=60",
      network: "zkEVM",
      status: "Active",
    },
    {
      id: 5,
      name: "Base",
      description: "Coinbase's Ethereum Layer 2 with massive ecosystem growth",
      reward: "$BASE Token",
      endDate: "2024-09-15",
      participants: "900K+",
      difficulty: "Easy",
      tasks: ["Bridge from Coinbase", "Use Base dApps", "Provide liquidity"],
      logo: "/placeholder.svg?height=60&width=60",
      network: "Layer 2",
      status: "Active",
    },
    {
      id: 6,
      name: "Arbitrum Orbit",
      description: "Next-generation Layer 3 solutions built on Arbitrum",
      reward: "$ORBIT Token",
      endDate: "2024-10-01",
      participants: "800K+",
      difficulty: "Hard",
      tasks: ["Deploy L3 chain", "Use advanced features", "Provide feedback"],
      logo: "/placeholder.svg?height=60&width=60",
      network: "Layer 3",
      status: "Active",
    },
  ]

  let latestAirdrops = fallbackAirdrops
  let dataSource = "fallback"

  // Safely try to fetch from database
  try {
    const supabase = createServerClient()

    // Only attempt database query if supabase client is available
    if (supabase) {
      console.log("🗄️ Attempting to fetch latest airdrops from database...")

      const { data: dbAirdrops, error } = await supabase
        .from("airdrops")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(6)

      // If successful and has data, use database data
      if (!error && dbAirdrops && dbAirdrops.length > 0) {
        console.log(`✅ Successfully fetched ${dbAirdrops.length} latest airdrops from database`)

        latestAirdrops = dbAirdrops.map((airdrop) => ({
          id: airdrop.id,
          name: airdrop.name,
          description: airdrop.description,
          reward: airdrop.reward_token || "TBA",
          endDate: airdrop.end_date ? new Date(airdrop.end_date).toLocaleDateString() : "TBA",
          participants: airdrop.participants || "TBA",
          difficulty: airdrop.difficulty || "Medium",
          tasks: airdrop.tasks ? JSON.parse(airdrop.tasks) : ["Check official website"],
          logo: airdrop.logo_url || "/placeholder.svg?height=60&width=60",
          network: airdrop.network || "Multi-chain",
          status: airdrop.status,
        }))

        dataSource = "database"
      } else {
        console.log("⚠️ Database query returned no results, using fallback data")
        if (error) {
          console.error("Database error:", error.message)
        }
      }
    } else {
      console.log("⚠️ Supabase client not available, using fallback data")
    }
  } catch (error: any) {
    console.error("💥 Error fetching latest airdrops from database:", error.message)
    console.log("🚨 Using fallback data due to database error")
    // latestAirdrops already set to fallbackAirdrops
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#7cb342] to-[#689f38] rounded-xl flex items-center justify-center">
              <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Latest Airdrops
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the newest and most promising airdrops. Get early access to potential gems before they go
            mainstream.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#3a3a3a] rounded-xl p-4">
              <TrendingUp className="h-8 w-8 text-[#7cb342] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Active Airdrops</div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#3a3a3a] rounded-xl p-4">
              <Users className="h-8 w-8 text-[#7cb342] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">5M+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Total Participants</div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#3a3a3a] rounded-xl p-4">
              <Gift className="h-8 w-8 text-[#7cb342] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">$2B+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Total Rewards</div>
            </div>
          </div>

          {/* Data source indicator */}
          <div className="mt-4">
            <Badge variant="outline" className="text-xs">
              Data source: {dataSource}
            </Badge>
          </div>
        </div>

        {/* Header Banner Ad */}
        <HeaderBannerAd />

        {/* Airdrops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {latestAirdrops.map((airdrop, index) => (
            <>
              <Card
                key={airdrop.id}
                className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={airdrop.logo || "/placeholder.svg"}
                        alt={airdrop.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-[#3a3a3a]"
                      />
                      <div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">{airdrop.name}</CardTitle>
                        <Badge className="bg-[#7cb342]/20 text-[#7cb342] text-xs mt-1">{airdrop.network}</Badge>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(airdrop.difficulty)}>{airdrop.difficulty}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{airdrop.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-500 mb-1">Reward</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{airdrop.reward}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-500 mb-1">Participants</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{airdrop.participants}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 dark:text-gray-500 text-sm mb-2">Required Tasks:</div>
                    <div className="space-y-1">
                      {airdrop.tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-[#7cb342] rounded-full" />
                          <span className="text-gray-600 dark:text-gray-400">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-[#3a3a3a]" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Ends {airdrop.endDate}</span>
                    </div>
                    <Button className="bg-[#7cb342] hover:bg-[#689f38] text-white">
                      Participate
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* In-Content Ad after first 2 airdrops */}
              {index === 1 && <InContentAd />}
            </>
          ))}
        </div>

        {/* Responsive Ad before tips */}
        <ResponsiveAd className="mb-16" />

        {/* Tips Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#7cb342]/10 to-[#689f38]/10 border-[#7cb342]/20">
            <CardContent className="p-8">
              <div className="text-center">
                <Star className="h-12 w-12 text-[#7cb342] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pro Tips for Latest Airdrops</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-[#3a3a3a]">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Act Fast</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Latest airdrops often have limited spots or early bird bonuses. Don't wait too long!
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-[#3a3a3a]">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Research First</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Always verify the project's legitimacy and read their whitepaper before participating.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-[#3a3a3a]">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Follow Instructions</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Complete all required tasks exactly as specified to ensure eligibility.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
