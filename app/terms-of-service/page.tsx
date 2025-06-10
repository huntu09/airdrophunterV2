"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { ArrowLeft, FileText, Calendar, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using AirdropHunter, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all visitors, users, and others who access or use the service.",
      ],
    },
    {
      title: "2. Description of Service",
      content: [
        "AirdropHunter is a platform that aggregates information about cryptocurrency airdrops and related opportunities.",
        "We provide information, links, and resources related to cryptocurrency projects and their token distributions.",
        "Our service is informational in nature and does not constitute financial advice.",
      ],
    },
    {
      title: "3. User Responsibilities",
      content: [
        "You are responsible for your own investment decisions and due diligence.",
        "You must verify all information independently before participating in any airdrop or cryptocurrency project.",
        "You agree not to use our service for any unlawful or prohibited activities.",
        "You are responsible for maintaining the security of your cryptocurrency wallets and private keys.",
      ],
    },
    {
      title: "4. Disclaimers",
      content: [
        "AirdropHunter does not guarantee the legitimacy, safety, or profitability of any listed airdrops.",
        "We are not responsible for any losses, damages, or issues arising from your participation in airdrops.",
        "Information on our platform may be outdated, incomplete, or inaccurate.",
        "We do not endorse or recommend any specific cryptocurrency projects or investments.",
      ],
    },
    {
      title: "5. Risk Warnings",
      content: [
        "Cryptocurrency investments carry significant risk and may result in total loss of funds.",
        "Airdrops may be scams designed to steal your personal information or cryptocurrency.",
        "Always verify the legitimacy of projects before participating.",
        "Never share your private keys or seed phrases with anyone.",
      ],
    },
    {
      title: "6. Intellectual Property",
      content: [
        "All content on AirdropHunter, including text, graphics, logos, and software, is our property or licensed to us.",
        "You may not reproduce, distribute, or create derivative works without our written permission.",
        "User-generated content remains the property of the respective users.",
      ],
    },
    {
      title: "7. Privacy Policy",
      content: [
        "We collect and use information as described in our Privacy Policy.",
        "We do not sell or share personal information with third parties without consent.",
        "We use cookies and similar technologies to improve user experience.",
      ],
    },
    {
      title: "8. Limitation of Liability",
      content: [
        "AirdropHunter shall not be liable for any direct, indirect, incidental, or consequential damages.",
        "Our total liability shall not exceed the amount you paid to use our service (if any).",
        "We are not responsible for third-party content, websites, or services.",
      ],
    },
    {
      title: "9. Modifications to Terms",
      content: [
        "We reserve the right to modify these terms at any time without prior notice.",
        "Continued use of the service after changes constitutes acceptance of new terms.",
        "We will post the effective date of any changes to these terms.",
      ],
    },
    {
      title: "10. Termination",
      content: [
        "We may terminate or suspend your access to our service at any time without notice.",
        "You may stop using our service at any time.",
        "Upon termination, your right to use the service ceases immediately.",
      ],
    },
    {
      title: "11. Governing Law",
      content: [
        "These terms shall be governed by and construed in accordance with applicable laws.",
        "Any disputes shall be resolved through binding arbitration.",
        "If any provision is found unenforceable, the remainder shall remain in effect.",
      ],
    },
    {
      title: "12. Contact Information",
      content: [
        "If you have questions about these Terms of Service, please contact us.",
        "We will respond to inquiries within a reasonable timeframe.",
        "Contact information can be found on our Contact Us page.",
      ],
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Please read these terms carefully before using AirdropHunter
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: January 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Version 1.0</span>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <Card
          className={`mb-8 ${theme === "dark" ? "bg-yellow-900/20 border-yellow-700" : "bg-yellow-50 border-yellow-200"} border-2`}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-yellow-200" : "text-yellow-800"}`}
                >
                  Important Notice
                </h3>
                <p className={`${theme === "dark" ? "text-yellow-200" : "text-yellow-800"}`}>
                  By using AirdropHunter, you acknowledge that cryptocurrency investments carry significant risks. We
                  are not responsible for any losses incurred from participating in airdrops or following information on
                  our platform. Always do your own research and never invest more than you can afford to lose.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card
              key={index}
              className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className={`text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <Card
            className={`${theme === "dark" ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600" : "bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200"} p-8`}
          >
            <CardContent>
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Questions About These Terms?
              </h2>
              <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                If you have any questions about our Terms of Service, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact-us">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/privacy-policy">
                  <Button
                    variant="outline"
                    className={`px-8 py-3 ${theme === "dark" ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                  >
                    Privacy Policy
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
