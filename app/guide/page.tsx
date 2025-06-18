import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, AlertTriangle, Shield, Wallet, Users, Target, Lightbulb } from "lucide-react"

export default function HowToParticipatePage() {
  const steps = [
    {
      id: 1,
      title: "Set Up Your Wallet",
      description: "Create and secure a crypto wallet that supports multiple networks",
      icon: Wallet,
      details: [
        "Download MetaMask, Trust Wallet, or similar",
        "Secure your seed phrase (write it down offline)",
        "Add networks like Ethereum, Polygon, Arbitrum",
        "Never share your private keys with anyone",
      ],
      difficulty: "Easy",
      time: "10 minutes",
    },
    {
      id: 2,
      title: "Research the Project",
      description: "Always verify legitimacy before participating in any airdrop",
      icon: BookOpen,
      details: [
        "Check official website and social media",
        "Read the whitepaper and tokenomics",
        "Verify team members and advisors",
        "Look for red flags (unrealistic promises, no clear roadmap)",
      ],
      difficulty: "Medium",
      time: "30 minutes",
    },
    {
      id: 3,
      title: "Complete Required Tasks",
      description: "Follow instructions carefully to ensure eligibility",
      icon: Target,
      details: [
        "Connect your wallet to the platform",
        "Complete all specified actions (swaps, bridges, etc.)",
        "Hold minimum required amounts if specified",
        "Maintain activity for the required duration",
      ],
      difficulty: "Easy",
      time: "15-60 minutes",
    },
    {
      id: 4,
      title: "Track Your Progress",
      description: "Monitor your eligibility and stay updated on announcements",
      icon: CheckCircle,
      details: [
        "Save transaction hashes as proof",
        "Join official Telegram/Discord channels",
        "Follow project updates regularly",
        "Check eligibility checkers when available",
      ],
      difficulty: "Easy",
      time: "Ongoing",
    },
  ]

  const safetyTips = [
    {
      title: "Never Share Private Keys",
      description: "Legitimate airdrops never ask for your private keys or seed phrase",
      icon: Shield,
      type: "critical",
    },
    {
      title: "Verify Official Links",
      description: "Always use official websites and social media accounts",
      icon: CheckCircle,
      type: "important",
    },
    {
      title: "Start Small",
      description: "Begin with small amounts to test the process and minimize risk",
      icon: Lightbulb,
      type: "tip",
    },
    {
      title: "Use Separate Wallets",
      description: "Consider using dedicated wallets for airdrop activities",
      icon: Wallet,
      type: "tip",
    },
  ]

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-500 bg-red-50 dark:bg-red-950/20"
      case "important":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      case "tip":
        return "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#7cb342] to-[#689f38] rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">How to Participate</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete step-by-step guide to safely participate in cryptocurrency airdrops and maximize your rewards.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-[#7cb342] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Successful Participants</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-[#7cb342] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-[#7cb342] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">$2M+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Total Rewards Claimed</div>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Guide */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Step-by-Step Guide</h2>

          {steps.map((step, index) => (
            <Card
              key={step.id}
              className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a] hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#7cb342] rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                      {step.id}
                    </div>
                    <div className="w-8 h-8 bg-gray-100 dark:bg-[#2a2a2a] rounded-full flex items-center justify-center">
                      <step.icon className="h-4 w-4 text-[#7cb342]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                      <Badge className={getDifficultyColor(step.difficulty)}>{step.difficulty}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {step.time}
                      </Badge>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{step.description}</p>

                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-[#7cb342] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <div className="w-px h-8 bg-gray-300 dark:bg-[#3a3a3a]" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Tips */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8 flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            Safety First: Essential Tips
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyTips.map((tip, index) => (
              <Card key={index} className={`border-2 ${getTypeColor(tip.type)}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-current">
                      <tip.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800 mb-16">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Common Mistakes to Avoid</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-[#3a3a3a]">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">❌ FOMO Participation</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Don't rush into airdrops without proper research. Take time to verify legitimacy.
                </p>
              </div>
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-[#3a3a3a]">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">❌ Ignoring Gas Fees</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Factor in transaction costs. Sometimes gas fees can exceed potential rewards.
                </p>
              </div>
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-[#3a3a3a]">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">❌ Using Main Wallet</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Don't use your main wallet with large holdings for experimental airdrops.
                </p>
              </div>
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-[#3a3a3a]">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">❌ Incomplete Tasks</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ensure you complete ALL required tasks. Missing one step can disqualify you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-[#7cb342]/10 to-[#689f38]/10 border-[#7cb342]/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Airdrop Journey?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Now that you know the basics, explore our curated list of active airdrops and start earning!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#7cb342] hover:bg-[#689f38] text-white px-8">View Active Airdrops</Button>
                <Button
                  variant="outline"
                  className="border-[#7cb342] text-[#7cb342] hover:bg-[#7cb342] hover:text-white px-8"
                >
                  Join Our Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
