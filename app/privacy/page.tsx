"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, Lock, Database, Globe, Mail, ArrowRight, Home, Calendar, FileText, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 17, 2024"

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      color: "text-blue-500",
    },
    {
      id: "information-use",
      title: "How We Use Information",
      icon: Eye,
      color: "text-green-500",
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Users,
      color: "text-purple-500",
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      color: "text-red-500",
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: Globe,
      color: "text-orange-500",
    },
    {
      id: "your-rights",
      title: "Your Rights",
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
            <span className="text-sm text-gray-900 dark:text-white">Privacy Policy</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-gray-600 dark:text-gray-400">How we protect and handle your data</p>
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
        {/* Introduction */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              At AirdropHunter, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website and use our services. We are committed
              to protecting your personal information and your right to privacy.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              By using AirdropHunter, you agree to the collection and use of information in accordance with this policy.
              If you do not agree with our policies and practices, please do not use our services.
            </p>
          </CardContent>
        </Card>

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

        {/* Information We Collect */}
        <Card id="information-collection" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  • <strong>Email Address:</strong> When you subscribe to our newsletter or contact us
                </li>
                <li>
                  • <strong>Wallet Addresses:</strong> Public blockchain addresses you choose to share
                </li>
                <li>
                  • <strong>Communication Data:</strong> Messages you send us through contact forms or support
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Automatically Collected Information
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  • <strong>Usage Data:</strong> Pages visited, time spent, click patterns
                </li>
                <li>
                  • <strong>Device Information:</strong> Browser type, operating system, device identifiers
                </li>
                <li>
                  • <strong>Location Data:</strong> General geographic location based on IP address
                </li>
                <li>
                  • <strong>Cookies:</strong> Small data files stored on your device for functionality
                </li>
              </ul>
            </div>

            <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong>Important:</strong> We never collect or store your private keys, seed phrases, or wallet
                passwords. We only work with publicly available blockchain data.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card id="information-use" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-500" />
              How We Use Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Service Provision</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Provide and maintain our airdrop tracking service</li>
                  <li>• Send newsletter updates and airdrop alerts</li>
                  <li>• Respond to your inquiries and support requests</li>
                  <li>• Personalize your experience on our platform</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Improvement & Analytics</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Analyze usage patterns to improve our service</li>
                  <li>• Monitor and analyze trends and usage</li>
                  <li>• Detect and prevent fraud or abuse</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card id="information-sharing" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              Information Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the
              following circumstances:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Service Providers</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We may share information with trusted third-party service providers who assist us in operating our
                  website, conducting our business, or serving our users (e.g., email service providers, analytics
                  services).
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Legal Requirements</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We may disclose your information when required by law, regulation, legal process, or governmental
                  request.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Business Transfers</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part
                  of that transaction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card id="data-security" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-500" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              We implement appropriate technical and organizational security measures to protect your personal
              information:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technical Measures</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• SSL/TLS encryption for data transmission</li>
                  <li>• Secure server infrastructure</li>
                  <li>• Regular security updates and patches</li>
                  <li>• Access controls and authentication</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Organizational Measures</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Limited access to personal data</li>
                  <li>• Employee training on data protection</li>
                  <li>• Regular security assessments</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>
            </div>

            <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
              <Lock className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                While we strive to protect your personal information, no method of transmission over the internet or
                electronic storage is 100% secure. We cannot guarantee absolute security.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Cookies & Tracking */}
        <Card id="cookies" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-orange-500" />
              Cookies & Tracking Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              We use cookies and similar tracking technologies to enhance your experience on our website:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Essential Cookies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Required for the website to function properly. These cannot be disabled.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Analytics Cookies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Help us understand how visitors interact with our website by collecting anonymous information.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Preference Cookies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Remember your preferences and settings to provide a personalized experience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Advertising Cookies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your
                  prior visits to our website or other websites. You can opt out of personalized advertising by visiting
                  Google's Ads Settings.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              You can control cookies through your browser settings. However, disabling certain cookies may affect the
              functionality of our website.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card id="your-rights" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-500" />
              Your Privacy Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Access</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Request access to your personal data</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Correction</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Request correction of inaccurate data</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Deletion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Request deletion of your personal data</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Portability</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Request transfer of your data</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Objection</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Object to processing of your data</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Restriction</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Request restriction of processing</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              To exercise these rights, please contact us at privacy@airdrophunter.com. We will respond to your request
              within 30 days.
            </p>
          </CardContent>
        </Card>

        {/* AdSense Privacy Information */}
        <Card id="advertising" className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              Advertising & Third-Party Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Google AdSense</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and other
                tracking technologies to serve ads based on your interests and previous visits.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Google may collect and use data about your visits to this and other websites</li>
                <li>• Ads may be personalized based on your interests and browsing behavior</li>
                <li>• You can opt out of personalized advertising through Google's Ads Settings</li>
                <li>• We do not have access to or control over Google's advertising cookies</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Opt-Out Options</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">You can control advertising cookies through:</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                <li>
                  •{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Google Ads Settings
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="http://www.aboutads.info/choices/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Digital Advertising Alliance
                  </a>
                </li>
                <li>• Your browser's privacy settings</li>
                <li>• Ad blocker extensions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Updates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#7cb342]" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have questions about this Privacy Policy or our data practices:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> privacy@airdrophunter.com
                </p>
                <p>
                  <strong>Support:</strong> support@airdrophunter.com
                </p>
                <p>
                  <strong>Response Time:</strong> Within 48 hours
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Posting the new policy on this page</li>
                <li>• Updating the "Last Updated" date</li>
                <li>• Sending email notifications for significant changes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
