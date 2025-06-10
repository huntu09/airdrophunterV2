"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Footer } from "@/components/footer"
import { ArrowLeft, Mail, Send, MessageSquare, Clock, Twitter, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ContactUsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
    }, 3000)
  }

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@airdrophunter.com",
      response: "24-48 hours",
    },
    {
      icon: <Send className="w-6 h-6 text-green-500" />,
      title: "Telegram",
      description: "Join our community",
      contact: "@airdrophunter",
      response: "Real-time",
    },
    {
      icon: <Twitter className="w-6 h-6 text-blue-400" />,
      title: "Twitter",
      description: "Follow for updates",
      contact: "@airdrophunter",
      response: "Real-time",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
      title: "Discord",
      description: "Community support",
      contact: "discord.gg/airdrophunter",
      response: "Community driven",
    },
  ]

  const faqs = [
    {
      question: "How do I report a scam airdrop?",
      answer:
        "Use our contact form with 'Report Scam' category and provide all relevant details including project name, website, and suspicious activities.",
    },
    {
      question: "Can you add a new airdrop to the platform?",
      answer:
        "Yes! Submit airdrop suggestions through our contact form with 'Airdrop Submission' category. Include project details, official links, and verification information.",
    },
    {
      question: "How often is the airdrop information updated?",
      answer:
        "We update airdrop information daily. However, always verify information independently as project details can change rapidly.",
    },
    {
      question: "Do you provide investment advice?",
      answer:
        "No, we only provide informational content. All investment decisions should be made after your own research and due diligence.",
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mb-6">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Have questions, suggestions, or need help? We're here to assist you with anything related to AirdropHunter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Send us a Message
                </CardTitle>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Message Sent Successfully!
                    </h3>
                    <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      Thank you for contacting us. We'll respond within 24-48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger
                          className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="airdrop-submission">Airdrop Submission</SelectItem>
                          <SelectItem value="report-scam">Report Scam</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods & Info */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader>
                <CardTitle className={`text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Other Ways to Reach Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">{method.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {method.title}
                      </h4>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {method.description}
                      </p>
                      <p className={`text-sm font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                        {method.contact}
                      </p>
                      <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Response time: {method.response}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader>
                <CardTitle
                  className={`text-xl flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  <Clock className="w-5 h-5" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Monday - Friday</span>
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>9:00 AM - 6:00 PM UTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Saturday</span>
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>10:00 AM - 4:00 PM UTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Sunday</span>
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>Closed</span>
                  </div>
                </div>
                <div
                  className={`mt-4 p-3 rounded-lg ${theme === "dark" ? "bg-blue-900/20 border border-blue-700" : "bg-blue-50 border border-blue-200"}`}
                >
                  <p className={`text-xs ${theme === "dark" ? "text-blue-200" : "text-blue-800"}`}>
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    For urgent security issues, contact us immediately via email.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {faq.question}
                  </h3>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card
            className={`${theme === "dark" ? "bg-gradient-to-r from-red-900 to-orange-900 border-red-700" : "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"} p-8 border-2`}
          >
            <CardContent>
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Security Emergency?
              </h2>
              <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                If you've discovered a security vulnerability or urgent security issue, please contact us immediately.
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                <Mail className="w-4 h-4 mr-2" />
                security@airdrophunter.com
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer theme={theme} />
    </div>
  )
}
