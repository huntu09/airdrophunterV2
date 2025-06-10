"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { ArrowLeft, Shield, Eye, Lock, Database, Globe, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const dataTypes = [
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Personal Information",
      description: "Email addresses, usernames, and profile information you provide",
      retention: "Until account deletion",
    },
    {
      icon: <Globe className="w-6 h-6 text-green-500" />,
      title: "Usage Data",
      description: "Pages visited, time spent, and interaction patterns",
      retention: "12 months",
    },
    {
      icon: <Database className="w-6 h-6 text-purple-500" />,
      title: "Technical Data",
      description: "IP addresses, browser type, device information, and cookies",
      retention: "6 months",
    },
    {
      icon: <Eye className="w-6 h-6 text-orange-500" />,
      title: "Analytics Data",
      description: "Aggregated and anonymized usage statistics",
      retention: "24 months",
    },
  ]

  const rights = [
    {
      title: "Access Your Data",
      description: "Request a copy of all personal data we hold about you",
    },
    {
      title: "Correct Your Data",
      description: "Update or correct any inaccurate personal information",
    },
    {
      title: "Delete Your Data",
      description: "Request deletion of your personal data (right to be forgotten)",
    },
    {
      title: "Data Portability",
      description: "Receive your data in a structured, machine-readable format",
    },
    {
      title: "Restrict Processing",
      description: "Limit how we process your personal data in certain circumstances",
    },
    {
      title: "Object to Processing",
      description: "Object to processing based on legitimate interests or direct marketing",
    },
  ]

  const sections = [
    {
      title: "Information We Collect",
      icon: <Database className="w-6 h-6" />,
      content: [
        "Personal information you provide when creating an account or contacting us",
        "Usage data including pages visited, features used, and time spent on our platform",
        "Technical information such as IP address, browser type, and device information",
        "Cookies and similar tracking technologies to enhance user experience",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="w-6 h-6" />,
      content: [
        "Provide and maintain our airdrop aggregation service",
        "Improve and personalize your experience on our platform",
        "Send important updates about airdrops and platform changes",
        "Analyze usage patterns to enhance our service quality",
        "Prevent fraud and ensure platform security",
      ],
    },
    {
      title: "Information Sharing",
      icon: <Users className="w-6 h-6" />,
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share aggregated, anonymized data for analytics purposes",
        "Information may be disclosed if required by law or to protect our rights",
        "Service providers may access data solely to provide services to us",
      ],
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6" />,
      content: [
        "We implement industry-standard security measures to protect your data",
        "All data transmission is encrypted using SSL/TLS protocols",
        "Access to personal data is restricted to authorized personnel only",
        "Regular security audits and updates to maintain data protection",
      ],
    },
    {
      title: "Cookies and Tracking",
      icon: <Globe className="w-6 h-6" />,
      content: [
        "We use cookies to remember your preferences and improve functionality",
        "Analytics cookies help us understand how users interact with our platform",
        "You can control cookie settings through your browser preferences",
        "Some features may not work properly if cookies are disabled",
      ],
    },
    {
      title: "Third-Party Services",
      icon: <Shield className="w-6 h-6" />,
      content: [
        "We use third-party analytics services to understand user behavior",
        "Social media plugins may collect information when you interact with them",
        "External links lead to third-party websites with their own privacy policies",
        "We are not responsible for the privacy practices of external websites",
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <div className="text-sm text-gray-500">
            <p>Last Updated: January 2024 • Effective Date: January 1, 2024</p>
          </div>
        </div>

        {/* Data Types Overview */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Types of Data We Collect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataTypes.map((type, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-center`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{type.icon}</div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {type.title}
                  </h3>
                  <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {type.description}
                  </p>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                  >
                    Retained: {type.retention}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <Card
              key={index}
              className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-3 text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  <div className="text-blue-500">{section.icon}</div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                      <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Your Rights */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Your Privacy Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rights.map((right, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
              >
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {right.title}
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {right.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <Card
            className={`${theme === "dark" ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600" : "bg-gradient-to-r from-green-50 to-blue-50 border-gray-200"} p-8`}
          >
            <CardContent>
              <Lock className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Questions About Your Privacy?
              </h2>
              <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                We're committed to protecting your privacy. Contact us if you have any questions or want to exercise
                your rights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact-us">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/terms-of-service">
                  <Button
                    variant="outline"
                    className={`px-8 py-3 ${theme === "dark" ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                  >
                    Terms of Service
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
