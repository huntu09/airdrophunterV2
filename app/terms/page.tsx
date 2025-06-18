"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Scale,
  AlertTriangle,
  Shield,
  Users,
  Gavel,
  ArrowRight,
  Home,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
  const lastUpdated = "December 17, 2024"
  const effectiveDate = "January 1, 2024"

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: "description",
      title: "Service Description",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: Users,
      color: "text-purple-500",
    },
    {
      id: "prohibited-uses",
      title: "Prohibited Uses",
      icon: XCircle,
      color: "text-red-500",
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      icon: AlertTriangle,
      color: "text-orange-500",
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: Shield,
      color: "text-indigo-500",
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
            <span className="text-sm text-gray-900 dark:text-white">Terms of Service</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-gray-600 dark:text-gray-400">Legal terms and conditions for using AirdropHunter</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Updated {lastUpdated}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Effective {effectiveDate}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Important Notice */}
        <Alert className="mb-8 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <strong>Important:</strong> Please read these Terms of Service carefully before using AirdropHunter. By
            accessing or using our service, you agree to be bound by these terms.
          </AlertDescription>
        </Alert>

        {/* Quick Navigation */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sections.map((section) => (
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

        {/* Acceptance of Terms */}
        <Card id="acceptance" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These Terms of Service ("Terms") govern your use of the AirdropHunter website and services (collectively,
              the "Service") operated by AirdropHunter ("we," "us," or "our").
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of
              these terms, then you may not access the Service.
            </p>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Agreement Confirmation</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your continued use of AirdropHunter constitutes acceptance of these Terms and any future modifications.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Description */}
        <Card id="description" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Service Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              AirdropHunter is an informational platform that provides:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Core Services</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Cryptocurrency airdrop listings and information</li>
                  <li>• Educational content about blockchain and DeFi</li>
                  <li>• Security tips and best practices</li>
                  <li>• Community resources and guides</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">What We Don't Provide</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Financial or investment advice</li>
                  <li>• Guaranteed returns or profits</li>
                  <li>• Wallet services or custody solutions</li>
                  <li>• Direct token distribution</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Responsibilities */}
        <Card id="user-responsibilities" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              User Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              As a user of AirdropHunter, you agree to:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Compliance & Legal Use</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                  <li>• Comply with all applicable laws and regulations</li>
                  <li>• Ensure you have legal capacity to enter into these Terms</li>
                  <li>• Respect intellectual property rights</li>
                  <li>• Use the Service only for lawful purposes</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Account Security</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                  <li>• Maintain the security of your account credentials</li>
                  <li>• Notify us immediately of any unauthorized access</li>
                  <li>• Take responsibility for all activities under your account</li>
                  <li>• Provide accurate and up-to-date information</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Due Diligence</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                  <li>• Conduct your own research before participating in airdrops</li>
                  <li>• Verify information independently</li>
                  <li>• Understand the risks involved in cryptocurrency activities</li>
                  <li>• Make informed decisions based on your risk tolerance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Uses */}
        <Card id="prohibited-uses" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Prohibited Uses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You may not use AirdropHunter for any of the following prohibited activities:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Illegal Activities</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Money laundering or terrorist financing</li>
                    <li>• Fraud, scams, or deceptive practices</li>
                    <li>• Violation of securities laws</li>
                    <li>• Tax evasion or avoidance</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Technical Abuse</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Automated scraping or data harvesting</li>
                    <li>• Attempting to hack or compromise security</li>
                    <li>• Overloading our servers or infrastructure</li>
                    <li>• Reverse engineering our software</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Content Violations</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Posting spam or unsolicited content</li>
                    <li>• Sharing malicious links or malware</li>
                    <li>• Impersonating others or creating fake accounts</li>
                    <li>• Distributing copyrighted material</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Market Manipulation</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Pump and dump schemes</li>
                    <li>• Spreading false information</li>
                    <li>• Coordinated market manipulation</li>
                    <li>• Insider trading activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card id="disclaimers" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Disclaimers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800 dark:text-orange-200">
                <strong>Investment Risk Warning:</strong> Cryptocurrency investments carry significant risk. You may
                lose some or all of your investment. Never invest more than you can afford to lose.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">No Financial Advice</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AirdropHunter provides informational content only. Nothing on our platform constitutes financial,
                  investment, legal, or tax advice. Always consult with qualified professionals before making investment
                  decisions.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">No Guarantees</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We make no guarantees about the accuracy, completeness, or timeliness of information on our platform.
                  Airdrop opportunities may change or be cancelled without notice. Past performance does not indicate
                  future results.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Third-Party Content</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our platform may contain links to third-party websites or services. We are not responsible for the
                  content, privacy policies, or practices of these third parties. Use third-party services at your own
                  risk.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Service Availability</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We strive to maintain service availability but cannot guarantee uninterrupted access. We may suspend
                  or terminate services for maintenance, updates, or other operational reasons.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card id="limitation-liability" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-500" />
              Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To the maximum extent permitted by applicable law, AirdropHunter and its affiliates, officers, employees,
              agents, partners, and licensors shall not be liable for:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Direct Damages</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Financial losses from airdrop participation</li>
                  <li>• Missed opportunities or profits</li>
                  <li>• Transaction fees or gas costs</li>
                  <li>• Time or resources spent</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Indirect Damages</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Consequential or incidental damages</li>
                  <li>• Loss of data or business interruption</li>
                  <li>• Punitive or exemplary damages</li>
                  <li>• Third-party claims or actions</li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Maximum Liability</h4>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                In no event shall our total liability to you for all damages exceed the amount you paid us in the twelve
                (12) months preceding the claim, or $100, whichever is greater.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via
                email or website notice. Continued use after changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                These Terms are governed by and construed in accordance with applicable laws. Any disputes will be
                resolved through binding arbitration or in courts of competent jurisdiction.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Severability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in
                full force and effect. Invalid provisions will be replaced with valid provisions that achieve similar
                objectives.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Legal Inquiries:</strong> legal@airdrophunter.com
                </p>
                <p>
                  <strong>General Support:</strong> support@airdrophunter.com
                </p>
                <p>
                  <strong>Response Time:</strong> Within 5 business days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final Notice */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
          <CardContent className="p-6 text-center">
            <Gavel className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Agreement Acknowledgment</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              By using AirdropHunter, you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
