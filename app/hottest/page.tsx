import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Flame, Users, Clock, TrendingUp, Star, Zap, Target, Award } from "lucide-react"
import { HeaderBannerAd, InContentAd, ResponsiveAd } from "@/components/adsense-ad"
import { createServerClient } from "@/lib/supabase"

export default async function HottestAirdropsPage() {
  // Fetch real data from database
  const supabase = createServerClient()
  const { data: airdrops, error } = await supabase
    .from("airdrops")
    .select("*")
    .eq("status", "active")
    .order("participants", { ascending: false })
    .limit(6)

  // Fallback data if database is empty or error
  const hottestAirdrops =
    airdrops && airdrops.length > 0
      ? airdrops.map((airdrop, index) => ({
          id: airdrop.id,
          name: airdrop.name,
          description: airdrop.description,
          reward: airdrop.reward_token || "TBA",
          totalReward: airdrop.total_reward || "TBA",
          participants: airdrop.participants || "TBA",
          timeLeft: airdrop.end_date
            ? `${Math.ceil((new Date(airdrop.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`
            : "TBA",
          heatScore: Math.max(70, 100 - index * 3), // Calculate heat score based on position
          trending: `+${Math.max(10, 50 - index * 5)}%`, // Calculate trending based on position
          logo: airdrop.logo_url || "/placeholder.svg?height=60&width=60",
          tags: airdrop.tags ? JSON.parse(airdrop.tags) : ["DeFi"],
          featured: index < 2, // First 2 are featured
        }))
      : [
          // Fallback data when database is empty
          {
            id: 1,
            name: "Blast",
            description: "The only Ethereum L2 with native yield for ETH and stablecoins",
            reward: "$BLAST Token",
            totalReward: "$2.3B",
            participants: "3.2M+",
            timeLeft: "5 days",
            heatScore: 98,
            trending: "+45%",
            logo: "/placeholder.svg?height=60&width=60",
            tags: ["Layer 2", "DeFi", "Yield"],
            featured: true,
          },
        ]

  const getHeatColor = (score: number) => {
    if (score >= 95) return "from-red-500 to-orange-500"
    if (score >= 90) return "from-orange-500 to-yellow-500"
    if (score >= 80) return "from-yellow-500 to-green-500"
    return "from-green-500 to-blue-500"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center animate-pulse">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Hottest Airdrops</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The most trending and high-value airdrops right now. These are the opportunities everyone's talking about!
          </p>
        </div>

        {/* Heat Meter */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                  <Target className="h-6 w-6 text-red-500" />
                  Market Heat Index
                </h3>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Cold</span>
                    <span className="font-bold text-red-500">🔥 EXTREMELY HOT 🔥</span>
                    <span>Overheated</span>
                  </div>
                  <Progress value={94} className="h-3 bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                      style={{ width: "94%" }}
                    />
                  </Progress>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Airdrop activity is at an all-time high! Perfect time to participate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Header Banner Ad */}
        <HeaderBannerAd />

        {/* Featured Hottest Airdrops */}
        <div className="space-y-6">
          {hottestAirdrops.map((airdrop, index) => (
            <Card
              key={airdrop.id}
              className={`${airdrop.featured ? "ring-2 ring-red-500 ring-opacity-50" : ""} bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a] hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  {/* Left: Project Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={airdrop.logo || "/placeholder.svg"}
                          alt={airdrop.name}
                          className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-[#3a3a3a]"
                        />
                        {airdrop.featured && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <Flame className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{airdrop.name}</h3>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            #{index + 1} Hottest
                          </Badge>
                          {airdrop.featured && (
                            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">Featured</Badge>
                          )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">{airdrop.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {airdrop.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500 dark:text-gray-500 mb-1">Total Reward</div>
                            <div className="font-bold text-green-600 dark:text-green-400">{airdrop.totalReward}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-500 mb-1">Participants</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{airdrop.participants}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-500 mb-1">Time Left</div>
                            <div className="font-semibold text-red-600 dark:text-red-400">{airdrop.timeLeft}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-500 mb-1">Trending</div>
                            <div className="font-semibold text-green-600 dark:text-green-400">{airdrop.trending}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Heat Score & Action */}
                  <div className="text-center lg:text-right">
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 dark:text-gray-500 mb-2">Heat Score</div>
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${getHeatColor(airdrop.heatScore)} text-white font-bold text-xl`}
                      >
                        {airdrop.heatScore}
                      </div>
                    </div>

                    <Button className="w-full lg:w-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-8">
                      Join Now
                      <Zap className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* In-Content Ad after first airdrop */}
          {hottestAirdrops.length > 0 && <InContentAd />}
        </div>

        {/* Responsive Ad before explanation */}
        <ResponsiveAd className="mb-16" />

        {/* Why These Are Hot */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Award className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Why These Airdrops Are So Hot Right Now
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">High Valuations</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    These projects have massive funding and high expected token values
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Massive Adoption</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Millions of users are already participating and using these protocols
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Limited Time</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    These opportunities won't last long - act fast before they end
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Proven Teams</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Led by experienced teams with successful track records
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
