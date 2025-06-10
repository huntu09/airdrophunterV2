"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  CheckCircle2,
  XCircle,
  Key,
  Globe,
  Users,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function SafetyGuidePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const redFlags = [
    {
      icon: <Key className="w-6 h-6 text-red-500" />,
      title: "Asking for Private Keys",
      description: "Legitimate airdrops NEVER ask for your private keys or seed phrases",
      severity: "Critical",
    },
    {
      icon: <Zap className="w-6 h-6 text-red-500" />,
      title: "Upfront Payments",
      description: "Real airdrops are free. Avoid any that ask for payment to participate",
      severity: "Critical",
    },
    {
      icon: <Globe className="w-6 h-6 text-yellow-500" />,
      title: "Suspicious Websites",
      description: "Always verify official websites and check for SSL certificates",
      severity: "High",
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      title: "Fake Social Media",
      description: "Verify official social media accounts and check follower counts",
      severity: "High",
    },
  ]

  const bestPractices = [
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Use Separate Wallets",
      description: "Create dedicated wallets for airdrops, separate from your main holdings",
      tips: [
        "Never use your main wallet for unknown projects",
        "Create multiple wallets for different risk levels",
        "Use hardware wallets for large amounts",
      ],
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-500" />,
      title: "Research Projects",
      description: "Always research the project team, tokenomics, and roadmap",
      tips: [
        "Check team backgrounds on LinkedIn",
        "Read the whitepaper thoroughly",
        "Look for audits and partnerships",
        "Check community sentiment",
      ],
    },
    {
      icon: <Lock className="w-8 h-8 text-purple-500" />,
      title: "Secure Your Assets",
      description: "Implement strong security measures for all your crypto activities",
      tips: [
        "Use strong, unique passwords",
        "Enable 2FA on all accounts",
        "Keep software updated",
        "Use VPN when necessary",
      ],
    },
  ]

  const verificationSteps = [
    {
      step: 1,
      title: "Check Official Channels",
      description: "Verify announcements on official websites and social media",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Research the Team",
      description: "Look up team members and their previous projects",
      icon: <Users className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Read Community Feedback",
      description: "Check what the community is saying on forums and social media",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      step: 4,
      title: "Start Small",
      description: "Test with minimal amounts before committing more resources",
      icon: <Zap className="w-6 h-6" />,
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Airdrop Safety Guide
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Protect yourself from scams and safely participate in cryptocurrency airdrops
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 text-sm border-red-500 text-red-500">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Security Critical
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-orange-500 text-orange-500">
              <Shield className="w-4 h-4 mr-2" />
              Scam Prevention
            </Badge>
          </div>
        </div>

        {/* Red Flags Section */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            🚨 Major Red Flags
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {redFlags.map((flag, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-800 border-red-700" : "bg-white border-red-200"} hover:shadow-lg transition-all duration-300 border-2`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{flag.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {flag.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            flag.severity === "Critical"
                              ? "border-red-500 text-red-500"
                              : "border-yellow-500 text-yellow-500"
                          }`}
                        >
                          {flag.severity}
                        </Badge>
                      </div>
                      <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{flag.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            🛡️ Best Practices
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {bestPractices.map((practice, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">{practice.icon}</div>
                    <CardTitle className={`text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {practice.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {practice.description}
                  </p>
                  <ul className="space-y-2">
                    {practice.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            ✅ Verification Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationSteps.map((step, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300 text-center`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="flex justify-center mb-3 text-green-500">{step.icon}</div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Do's and Don'ts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Do's */}
            <Card
              className={`${theme === "dark" ? "bg-gray-800 border-green-700" : "bg-white border-green-200"} border-2`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-6 h-6" />
                  DO's
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Research the project thoroughly",
                    "Use separate wallets for airdrops",
                    "Verify official social media accounts",
                    "Read community feedback",
                    "Keep your private keys secure",
                    "Start with small amounts",
                    "Use reputable sources for information",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Don'ts */}
            <Card className={`${theme === "dark" ? "bg-gray-800 border-red-700" : "bg-white border-red-200"} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-500">
                  <XCircle className="w-6 h-6" />
                  DON'Ts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Never share your private keys",
                    "Don't pay to participate in airdrops",
                    "Avoid clicking suspicious links",
                    "Don't use your main wallet",
                    "Never download unknown software",
                    "Don't ignore red flags",
                    "Avoid FOMO (Fear of Missing Out)",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Section */}
        <div className="text-center">
          <Card
            className={`${theme === "dark" ? "bg-gradient-to-r from-red-900 to-orange-900 border-red-700" : "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"} p-8 border-2`}
          >
            <CardContent>
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Think You've Been Scammed?
              </h2>
              <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                If you suspect you've fallen victim to a scam, act quickly to minimize damage
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">Report Scam</Button>
                <Link href="/contact-us">
                  <Button
                    variant="outline"
                    className={`px-8 py-3 ${theme === "dark" ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                  >
                    Get Help
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
