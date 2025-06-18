import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, TrendingUp, Clock, Lightbulb, Rocket, Target, Gem } from "lucide-react"
import { HeaderBannerAd, InContentAd, ResponsiveAd } from "@/components/adsense-ad"

export default function PotentialAirdropsPage() {
  const potentialAirdrops = [
    {
      id: 1,
      name: "Monad",
      description: "High-performance blockchain with parallel execution and EVM compatibility",
      stage: "Testnet",
      potentialReward: "$500-2000",
      confidence: 85,
      timeToLaunch: "Q3 2024",
      difficulty: "Medium",
      tasks: ["Run testnet node", "Deploy contracts", "Provide feedback"],
      logo: "/placeholder.svg?height=60&width=60",
      category: "Layer 1",
      funding: "$225M",
      backers: ["Dragonfly", "Placeholder"],
    },
    {
      id: 2,
      name: "Berachain",
      description: "EVM-compatible blockchain built on Proof-of-Liquidity consensus",
      stage: "Testnet",
      potentialReward: "$300-1500",
      confidence: 90,
      timeToLaunch: "Q2 2024",
      difficulty: "Easy",
      tasks: ["Use testnet faucet", "Swap tokens", "Provide liquidity"],
      logo: "/placeholder.svg?height=60&width=60",
      category: "Layer 1",
      funding: "$142M",
      backers: ["Polychain", "Hack VC"],
    },
    {
      id: 3,
      name: "Fuel Network",
      description: "Fastest modular execution layer built for the Ethereum ecosystem",
      stage: "Beta",
      potentialReward: "$400-1800",
      confidence: 80,
      timeToLaunch: "Q4 2024",
      difficulty: "Medium",
      tasks: ["Bridge assets", "Use dApps", "Deploy contracts"],
      logo: "/placeholder.svg?height=60&width=60",
      category: "Layer 2",
      funding: "$81M",
      backers: ["Blockchain Capital", "Stratos"],
    },
  ]

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "bg-green-500"
    if (confidence >= 70) return "bg-yellow-500"
    return "bg-red-500"
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Potential Airdrops</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Early-stage projects with high airdrop potential. Get in early before the crowd discovers them!
          </p>
        </div>

        {/* Alpha Alert */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    🚨 Alpha Alert: Early Bird Advantage
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    These projects haven't announced airdrops yet, but based on our analysis, they have high potential.
                    Early participants often receive the biggest rewards!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Header Banner Ad */}
        <HeaderBannerAd />

        {/* Potential Airdrops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {potentialAirdrops.map((airdrop, index) => (
            <Card
              key={airdrop.id}
              className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a] hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={airdrop.logo || "/placeholder.svg"}
                      alt={airdrop.name}
                      className="w-14 h-14 rounded-full border-2 border-gray-200 dark:border-[#3a3a3a]"
                    />
                    <div>
                      <CardTitle className="text-xl text-gray-900 dark:text-white">{airdrop.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs">
                          {airdrop.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {airdrop.stage}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(airdrop.difficulty)}>{airdrop.difficulty}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{airdrop.description}</p>

                {/* Confidence Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Airdrop Confidence</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{airdrop.confidence}%</span>
                  </div>
                  <Progress value={airdrop.confidence} className="h-2">
                    <div
                      className={`h-full ${getConfidenceColor(airdrop.confidence)} rounded-full transition-all`}
                      style={{ width: `${airdrop.confidence}%` }}
                    />
                  </Progress>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-3">
                    <div className="text-gray-500 dark:text-gray-500 mb-1">Potential Reward</div>
                    <div className="font-bold text-green-600 dark:text-green-400">{airdrop.potentialReward}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-3">
                    <div className="text-gray-500 dark:text-gray-500 mb-1">Expected Launch</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{airdrop.timeToLaunch}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-3">
                    <div className="text-gray-500 dark:text-gray-500 mb-1">Funding Raised</div>
                    <div className="font-semibold text-blue-600 dark:text-blue-400">{airdrop.funding}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-3">
                    <div className="text-gray-500 dark:text-gray-500 mb-1">Top Backers</div>
                    <div className="font-semibold text-gray-900 dark:text-white text-xs">
                      {airdrop.backers.join(", ")}
                    </div>
                  </div>
                </div>

                {/* Required Tasks */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recommended Actions:</h4>
                  <div className="space-y-2">
                    {airdrop.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-gray-600 dark:text-gray-400">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Start Early Participation
                  <Rocket className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
          {/* In-Content Ad after first airdrop */}
          {potentialAirdrops.length > 0 && <InContentAd />}
        </div>

        {/* Responsive Ad before strategy guide */}
        <ResponsiveAd className="mb-16" />

        {/* Strategy Guide */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Target className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Early Bird Strategy Guide</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  How to maximize your potential airdrop rewards by getting in early
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-200 dark:border-[#3a3a3a]">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                    <Gem className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Research Fundamentals</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Look for strong teams, solid funding, and innovative technology. These are key indicators of
                    potential success.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-200 dark:border-[#3a3a3a]">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Be Consistent</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Regular activity over time often yields better rewards than one-time massive participation.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-200 dark:border-[#3a3a3a]">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Track Progress</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Keep records of your activities and monitor project developments for optimal timing.
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
