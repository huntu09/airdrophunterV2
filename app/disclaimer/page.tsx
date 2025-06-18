"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  TrendingDown,
  Shield,
  Gavel,
  Eye,
  DollarSign,
  ArrowRight,
  Home,
  Calendar,
  Info,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function DisclaimerPage() {
  const lastUpdated = "December 17, 2024"

  const riskFactors = [
    {
      title: "Market Volatility",
      description: "Cryptocurrency prices can fluctuate dramatically within short periods",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      title: "Regulatory Changes",
      description: "Government regulations may affect cryptocurrency legality and value",
      icon: Gavel,
      color: "text-purple-500",
    },
    {
      title: "Technology Risks",
      description: "Smart contract bugs, network failures, or security vulnerabilities",
      icon: Shield,
      color: "text-orange-500",
    },
    {
      title: "Liquidity Risk",
      description: "Some tokens may have limited trading volume or market access",
      icon: DollarSign,
      color: "text-blue-500",
    },
  ]

  const disclaimerSections = [
    {
      id: "investment-risk",
      title: "Investment Risk Warning",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      id: "no-advice",
      title: "No Financial Advice",
      icon: Eye,
      color: "text-blue-500",
    },
    {
      id: "accuracy",
      title: "Information Accuracy",
      icon: Info,
      color: "text-green-500",
    },
    {
      id: "third-party",
      title: "Third-Party Content",
      icon: ExternalLink,
      color: "text-purple-500",
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
            <span className="text-sm text-gray-900 dark:text-white">Disclaimer</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Disclaimer</h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-gray-600 dark:text-gray-400">Important legal disclaimers and risk warnings</p>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated {lastUpdated}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Critical Warning */}
        <Alert className="mb-8 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <div className="space-y-2">
              <p className="font-semibold text-lg">⚠️ HIGH RISK INVESTMENT WARNING</p>
              <p>
                Cryptocurrency investments carry extremely high risk. You could lose some or all of your investment.
                Never invest money you cannot afford to lose completely. Past performance does not guarantee future
                results.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Quick Navigation */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Important Disclaimers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {disclaimerSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <section.icon className={`h-4 w-4 ${section.color}`} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{section.title}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Risk Warning */}
        <Card id="investment-risk" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Investment Risk Warning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                Cryptocurrency Investments Are Extremely Risky
              </h3>
              <div className="space-y-3 text-red-700 dark:text-red-300">
                <p>
                  • <strong>Total Loss Possible:</strong> You may lose 100% of your investment
                </p>
                <p>
                  • <strong>Extreme Volatility:</strong> Prices can drop 50%+ in a single day
                </p>
                <p>
                  • <strong>No Guarantees:</strong> No investment returns are guaranteed
                </p>
                <p>
                  • <strong>Regulatory Risk:</strong> Governments may ban or restrict cryptocurrencies
                </p>
                <p>
                  • <strong>Technology Risk:</strong> Smart contracts may have bugs or vulnerabilities
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskFactors.map((risk, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <risk.icon className={`h-4 w-4 ${risk.color}`} />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{risk.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{risk.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Before Investing:</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Only invest money you can afford to lose completely</li>
                <li>• Understand the technology and project fundamentals</li>
                <li>• Diversify your investments across different assets</li>
                <li>• Consider your risk tolerance and investment timeline</li>
                <li>• Consult with qualified financial advisors</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* No Financial Advice */}
        <Card id="no-advice" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              No Financial Advice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Information Only - Not Advice</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                All content on AirdropHunter is for informational and educational purposes only. Nothing on this website
                constitutes financial, investment, legal, or tax advice.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What We Provide:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Educational content about cryptocurrency and airdrops</li>
                  <li>• Information about potential airdrop opportunities</li>
                  <li>• General security tips and best practices</li>
                  <li>• Community resources and guides</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What We Don't Provide:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Personalized investment recommendations</li>
                  <li>• Financial planning or portfolio advice</li>
                  <li>• Legal or tax guidance</li>
                  <li>• Guaranteed investment returns</li>
                </ul>
              </div>
            </div>

            <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong>Always Consult Professionals:</strong> Before making any investment decisions, consult with
                qualified financial advisors, tax professionals, and legal counsel who understand your specific
                situation.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Information Accuracy */}
        <Card id="accuracy" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Info className="h-5 w-5 text-green-500" />
              Information Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              While we strive to provide accurate and up-to-date information, we cannot guarantee the completeness,
              accuracy, or timeliness of all content on AirdropHunter.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Information Sources</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Official project announcements</li>
                  <li>• Public blockchain data</li>
                  <li>• Community reports and research</li>
                  <li>• Third-party data providers</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Potential Issues</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Information may become outdated</li>
                  <li>• Projects may change requirements</li>
                  <li>• Technical errors may occur</li>
                  <li>• Third-party data may be incorrect</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Your Responsibility</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Always verify information independently through official project channels before participating in any
                airdrop or making investment decisions. Do your own research (DYOR).
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Content */}
        <Card id="third-party" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-purple-500" />
              Third-Party Content & Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              AirdropHunter may contain links to third-party websites, services, or content. We are not responsible for
              the accuracy, legality, or content of external sites.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">External Links</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Links to external websites are provided for convenience only. We do not endorse or take responsibility
                  for the content, privacy policies, or practices of linked sites.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Partner Services</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  We may have affiliate relationships with some services mentioned on our platform. This does not
                  influence our editorial content or recommendations.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">User-Generated Content</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Comments, reviews, or other user-generated content represent the views of individual users, not
                  AirdropHunter. We do not verify or endorse user-submitted content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Disclaimers */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Additional Legal Disclaimers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">No Warranties</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AirdropHunter is provided "as is" without warranties of any kind, either express or implied, including
                  but not limited to merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Limitation of Liability</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages
                  arising from your use of our service or participation in airdrops.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Jurisdiction</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This disclaimer is governed by applicable laws. Users are responsible for compliance with local laws
                  and regulations regarding cryptocurrency activities.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Changes to Disclaimer</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We reserve the right to modify this disclaimer at any time. Continued use of our service after changes
                  constitutes acceptance of the updated disclaimer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Warning */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Final Risk Warning</h3>
            <p className="text-red-600 dark:text-red-400 mb-4">
              Cryptocurrency investments are highly speculative and carry extreme risk. Only invest what you can afford
              to lose completely.
            </p>
            <p className="text-sm text-red-500 dark:text-red-400">
              By using AirdropHunter, you acknowledge that you understand these risks and disclaimers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
