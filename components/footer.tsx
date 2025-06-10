"use client"

import type React from "react"

import { Send, Twitter, Facebook, Mail, Globe, Shield, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface FooterProps {
  theme: "dark" | "light"
}

export function Footer({ theme }: FooterProps) {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Successfully subscribed!",
      description: `We'll send updates to ${email}`,
    })

    setEmail("")
    setIsSubscribing(false)
  }

  return (
    <footer
      className={`mt-16 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">AirdropHunter</h3>
            </div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
              Your ultimate destination for discovering the latest cryptocurrency airdrops and earning opportunities in
              the crypto space.
            </p>

            {/* Social Media with Brand Colors */}
            <div className="flex gap-3">
              {/* Telegram - Official Blue */}
              <Button
                size="sm"
                className="p-2 bg-[#0088cc] hover:bg-[#006ba6] text-white border-0 transition-all duration-200 hover:scale-110"
                onClick={() => window.open("https://t.me/airdropshunterV27", "_blank")}
              >
                <Send className="w-4 h-4" />
              </Button>

              {/* Twitter/X - Official Blue */}
              <Button
                size="sm"
                className="p-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white border-0 transition-all duration-200 hover:scale-110"
                onClick={() => window.open("https://x.com/hunter_dr0ps?t=bVoyMskEm6DmDePHeoGp8w&s=09", "_blank")}
              >
                <Twitter className="w-4 h-4" />
              </Button>

              {/* Facebook - Official Blue */}
              <Button
                size="sm"
                className="p-2 bg-[#1877F2] hover:bg-[#166fe5] text-white border-0 transition-all duration-200 hover:scale-110"
                onClick={() => window.open("https://www.facebook.com/share/1BvVfC4DDp/", "_blank")}
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {["Latest Airdrops", "Confirmed Airdrops", "Upcoming Events", "DeFi Projects", "NFT Drops"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={
                        link === "Latest Airdrops"
                          ? "/"
                          : link === "Confirmed Airdrops"
                            ? "/?filter=confirmed"
                            : link === "Upcoming Events"
                              ? "/upcoming-events"
                              : link === "DeFi Projects"
                                ? "/?category=defi"
                                : link === "NFT Drops"
                                  ? "/?category=nft"
                                  : "#"
                      }
                      className={`text-sm hover:text-green-500 transition-colors ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              {[
                { name: "How to Participate", icon: Users, href: "/how-to-participate" },
                { name: "Safety Guide", icon: Shield, href: "/safety-guide" },
                { name: "Terms of Service", icon: FileText, href: "/terms-of-service" },
                { name: "Privacy Policy", icon: Shield, href: "/privacy-policy" },
                { name: "Contact Us", icon: Mail, href: "/contact-us" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`text-sm hover:text-green-500 transition-colors flex items-center gap-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <item.icon className="w-3 h-3" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Get notified about new airdrops and crypto opportunities.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-300"
                }`}
              />
              <Button
                type="submit"
                disabled={isSubscribing || !email}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white disabled:opacity-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"} pt-8`}>
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">500+</div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Active Airdrops</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">50K+</div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">$2M+</div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Rewards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">24/7</div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Live Updates</div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              © 2024 AirdropHunter. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Made with ❤️ for crypto community
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
