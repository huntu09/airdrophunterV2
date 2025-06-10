"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import {
  ArrowLeft,
  CheckCircle2,
  Wallet,
  Twitter,
  Send,
  Shield,
  AlertTriangle,
  Star,
  Users,
  Gift,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function HowToParticipatePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const steps = [
    {
      number: 1,
      title: "Create Your Wallet",
      description: "Set up a crypto wallet like MetaMask, Trust Wallet, or Phantom",
      icon: <Wallet className="w-8 h-8" />,
      details: [
        "Download a reputable wallet app",
        "Create a new wallet or import existing one",
        "Secure your seed phrase safely",
        "Add networks you'll need (Ethereum, Solana, etc.)",
      ],
      tips: "Never share your seed phrase with anyone!",
    },
    {
      number: 2,
      title: "Follow Social Media",
      description: "Follow the project's official social media accounts",
      icon: <Twitter className="w-8 h-8" />,
      details: [
        "Follow on Twitter/X",
        "Join Telegram groups",
        "Subscribe to Discord servers",
        "Like and retweet announcements",
      ],
      tips: "Verify official accounts to avoid scams!",
    },
    {
      number: 3,
      title: "Complete Tasks",
      description: "Perform the required actions listed in the airdrop",
      icon: <CheckCircle2 className="w-8 h-8" />,
      details: [
        "Use the protocol/dApp",
        "Make transactions if required",
        "Hold specific tokens",
        "Refer friends if applicable",
      ],
      tips: "Read all requirements carefully before starting!",
    },
    {
      number: 4,
      title: "Stay Updated",
      description: "Monitor announcements and claim your rewards",
      icon: <Send className="w-8 h-8" />,
      details: [
        "Check for airdrop announcements",
        "Claim tokens when available",
        "Follow claiming instructions",
        "Be aware of deadlines",
      ],
      tips: "Set reminders for important dates!",
    },
  ]

  const tips = [
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Security First",
      description: "Always verify official links and never share private keys",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      title: "Beware of Scams",
      description: "Legitimate airdrops never ask for private keys or payments",
    },
    {
      icon: <Star className="w-6 h-6 text-blue-500" />,
      title: "Quality over Quantity",
      description: "Focus on promising projects rather than participating in everything",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Community Matters",
      description: "Engage genuinely with communities, not just for airdrops",
    },
  ]

  const categories = [
    {
      title: "DeFi Airdrops",
      description: "Decentralized Finance protocols",
      icon: "💰",
      examples: ["Uniswap", "Compound", "Aave"],
    },
    {
      title: "Layer 1 Blockchains",
      description: "New blockchain networks",
      icon: "⛓️",
      examples: ["Aptos", "Sui", "Sei"],
    },
    {
      title: "Layer 2 Solutions",
      description: "Scaling solutions for Ethereum",
      icon: "🚀",
      examples: ["Arbitrum", "Optimism", "Polygon"],
    },
    {
      title: "NFT Platforms",
      description: "Non-fungible token marketplaces",
      icon: "🎨",
      examples: ["OpenSea", "Blur", "LooksRare"],
    },
  ]

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div
        className={`sticky top-0 z-40 ${theme === "dark" ? "bg-gray-800/95" : "bg-white/95"} backdrop-blur-sm border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors duration-200`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            How to Participate in Airdrops
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Learn the complete guide to safely participate in cryptocurrency airdrops and maximize your rewards
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Beginner Friendly
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Security Focused
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              Updated 2024
            </Badge>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Step-by-Step Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card
                key={step.number}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-green-500">Step {step.number}</span>
                      </div>
                      <CardTitle className={`text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{step.description}</p>
                  <ul className="space-y-2 mb-4">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`p-3 rounded-lg ${theme === "dark" ? "bg-yellow-900/20 border border-yellow-700" : "bg-yellow-50 border border-yellow-200"}`}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className={`text-sm ${theme === "dark" ? "text-yellow-200" : "text-yellow-800"}`}>
                        <strong>Pro Tip:</strong> {step.tips}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Airdrop Categories */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Types of Airdrops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300 hover:scale-[1.05] text-center`}
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {category.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {category.examples.map((example, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Safety Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{tip.icon}</div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {tip.title}
                      </h3>
                      <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card
            className={`${theme === "dark" ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600" : "bg-gradient-to-r from-blue-50 to-green-50 border-gray-200"} p-8`}
          >
            <CardContent>
              <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Ready to Start Your Airdrop Journey?
              </h2>
              <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Explore the latest airdrops and start earning crypto rewards today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3">
                    Browse Airdrops
                  </Button>
                </Link>
                <Link href="/safety-guide">
                  <Button
                    variant="outline"
                    className={`px-8 py-3 ${theme === "dark" ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                  >
                    Safety Guide
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer theme={theme} />
    </div>
  )
}
