"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Key,
  Smartphone,
  Globe,
  Users,
  ArrowRight,
  Zap,
  Home,
} from "lucide-react"
import Link from "next/link"

export default function SecurityTipsPage() {
  const securityLevels = [
    {
      level: "Beginner",
      color: "bg-green-500",
      tips: [
        "Never share your private keys or seed phrases",
        "Use official wallet apps only",
        "Double-check website URLs before connecting",
        "Start with small amounts for testing",
      ],
    },
    {
      level: "Intermediate",
      color: "bg-yellow-500",
      tips: [
        "Use hardware wallets for large amounts",
        "Enable 2FA on all crypto accounts",
        "Verify smart contract addresses",
        "Use separate wallets for different purposes",
      ],
    },
    {
      level: "Advanced",
      color: "bg-red-500",
      tips: [
        "Audit smart contracts before interacting",
        "Use multi-signature wallets",
        "Implement cold storage strategies",
        "Monitor wallet activities regularly",
      ],
    },
  ]

  const commonScams = [
    {
      title: "Fake Airdrop Websites",
      description: "Phishing sites that steal your wallet credentials",
      warning: "Always verify official channels",
      icon: Globe,
    },
    {
      title: "Seed Phrase Requests",
      description: "Legitimate projects never ask for your seed phrase",
      warning: "Never share your recovery words",
      icon: Key,
    },
    {
      title: "Urgent Claims",
      description: "Scammers create false urgency to rush decisions",
      warning: "Take time to research and verify",
      icon: AlertTriangle,
    },
    {
      title: "Social Media Impersonators",
      description: "Fake accounts pretending to be official projects",
      warning: "Check verification badges and follower counts",
      icon: Users,
    },
  ]

  const walletSecurity = [
    {
      title: "Hot Wallet Security",
      description: "For daily transactions and small amounts",
      tips: [
        "Use reputable wallet apps (MetaMask, Trust Wallet)",
        "Enable biometric authentication",
        "Regular software updates",
        "Limit stored amounts",
      ],
      icon: Smartphone,
      color: "text-orange-500",
    },
    {
      title: "Cold Storage",
      description: "For long-term storage and large amounts",
      tips: [
        "Hardware wallets (Ledger, Trezor)",
        "Paper wallets for backup",
        "Air-gapped computers",
        "Multiple backup locations",
      ],
      icon: Lock,
      color: "text-blue-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#3a3a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#7cb342] transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </Link>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900 dark:text-white">Security Tips</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Tips</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Protect yourself from scams and secure your crypto assets
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Critical Alert */}
        <Alert className="mb-8 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Critical Security Rule:</strong> Never share your private keys, seed phrases, or wallet passwords
            with anyone. Legitimate projects will never ask for this information.
          </AlertDescription>
        </Alert>

        {/* Security Levels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {securityLevels.map((level, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${level.color}`} />
                  <CardTitle className="text-lg">{level.level} Security</CardTitle>
                </div>
                <CardDescription>Essential security practices for {level.level.toLowerCase()} users</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {level.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="scams" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1">
            <TabsTrigger value="scams" className="flex items-center gap-2 py-3">
              <AlertTriangle className="h-4 w-4" />
              Common Scams
            </TabsTrigger>
            <TabsTrigger value="wallets" className="flex items-center gap-2 py-3">
              <Lock className="h-4 w-4" />
              Wallet Security
            </TabsTrigger>
            <TabsTrigger value="checklist" className="flex items-center gap-2 py-3">
              <CheckCircle className="h-4 w-4" />
              Security Checklist
            </TabsTrigger>
          </TabsList>

          {/* Common Scams Tab */}
          <TabsContent value="scams" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonScams.map((scam, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-950/30 rounded-lg flex items-center justify-center">
                        <scam.icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <CardTitle className="text-lg text-red-700 dark:text-red-300">{scam.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{scam.description}</p>
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          Protection Tip:
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">{scam.warning}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wallet Security Tab */}
          <TabsContent value="wallets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {walletSecurity.map((wallet, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                        <wallet.icon className={`h-6 w-6 ${wallet.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{wallet.title}</CardTitle>
                        <CardDescription>{wallet.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {wallet.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Security Checklist Tab */}
          <TabsContent value="checklist" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Pre-Airdrop Security Checklist
                </CardTitle>
                <CardDescription>Complete this checklist before participating in any airdrop</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Before Connecting Wallet:</h4>
                    <div className="space-y-3">
                      {[
                        "Verify the official website URL",
                        "Check project's social media presence",
                        "Read the project whitepaper",
                        "Confirm the airdrop announcement",
                        "Use a separate wallet for airdrops",
                      ].map((item, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#7cb342] focus:ring-[#7cb342]"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">During Participation:</h4>
                    <div className="space-y-3">
                      {[
                        "Never enter seed phrases",
                        "Check transaction details carefully",
                        "Start with minimum required amount",
                        "Monitor wallet for suspicious activity",
                        "Keep records of all transactions",
                      ].map((item, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#7cb342] focus:ring-[#7cb342]"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Emergency Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              If You've Been Compromised
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Immediate Actions</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Disconnect wallet from all dApps</li>
                  <li>• Transfer funds to new wallet</li>
                  <li>• Change all passwords</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Report & Document</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Screenshot all evidence</li>
                  <li>• Report to relevant authorities</li>
                  <li>• Warn community members</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Prevention</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Review security practices</li>
                  <li>• Update security measures</li>
                  <li>• Learn from the incident</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-[#7cb342] to-[#689f38] rounded-2xl p-8 text-white">
            <Zap className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Stay Safe, Stay Profitable</h3>
            <p className="text-green-100 mb-6">Security is your first line of defense in the crypto world</p>
            <Button asChild className="bg-white text-[#7cb342] hover:bg-gray-100">
              <Link href="/guide">Learn How to Participate Safely</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
