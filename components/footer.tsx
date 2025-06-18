"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Twitter, Facebook, Instagram, Youtube, Mail, MapPin, Heart, Shield, Zap, TrendingUp } from "lucide-react"
import { ResponsiveAd } from "@/components/adsense-ad"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const { toast } = useToast()
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Latest Airdrops", href: "/latest" },
    { name: "Hottest Airdrops", href: "/hottest" },
    { name: "Potential Airdrops", href: "/potential" },
  ]

  const resources = [
    { name: "How to Participate", href: "/guide" },
    { name: "Wallet Setup Guide", href: "/wallet" },
    { name: "Security Tips", href: "/security" },
    { name: "FAQ", href: "/faq" },
  ]

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" },
  ]

  const handleSocialClick = (platform: string) => {
    toast({
      title: "Coming Soon! 🚀",
      description: `Our ${platform} page is launching soon. Stay tuned for updates!`,
      duration: 3000,
    })
  }

  return (
    <footer className="bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-[#3a3a3a] mt-16 transition-colors">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#7cb342] to-[#689f38] rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">AirdropHunter</h3>
                <Badge variant="secondary" className="bg-[#7cb342]/20 text-[#7cb342] text-xs">
                  Pro
                </Badge>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              Your ultimate crypto co-pilot for discovering the most profitable airdrops. Join thousands of successful
              airdrop hunters earning passive income daily.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-lg p-3 text-center">
                <div className="text-[#7cb342] font-bold text-lg">500+</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Active Airdrops</div>
              </div>
              <div className="bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-lg p-3 text-center">
                <div className="text-[#7cb342] font-bold text-lg">50K+</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Community</div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">Follow us on social media</div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("Telegram")}
                  className="bg-white dark:bg-[#2a2a2a] hover:bg-[#7cb342] dark:hover:bg-[#7cb342] text-gray-600 dark:text-gray-400 hover:text-white w-10 h-10 p-0 border border-gray-200 dark:border-[#3a3a3a] transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("Twitter")}
                  className="bg-white dark:bg-[#2a2a2a] hover:bg-[#1da1f2] dark:hover:bg-[#1da1f2] text-gray-600 dark:text-gray-400 hover:text-white w-10 h-10 p-0 border border-gray-200 dark:border-[#3a3a3a] transition-all duration-200"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("Facebook")}
                  className="bg-white dark:bg-[#2a2a2a] hover:bg-[#4267B2] dark:hover:bg-[#4267B2] text-gray-600 dark:text-gray-400 hover:text-white w-10 h-10 p-0 border border-gray-200 dark:border-[#3a3a3a] transition-all duration-200"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("Instagram")}
                  className="bg-white dark:bg-[#2a2a2a] hover:bg-[#E4405F] dark:hover:bg-[#E4405F] text-gray-600 dark:text-gray-400 hover:text-white w-10 h-10 p-0 border border-gray-200 dark:border-[#3a3a3a] transition-all duration-200"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("YouTube")}
                  className="bg-white dark:bg-[#2a2a2a] hover:bg-[#FF0000] dark:hover:bg-[#FF0000] text-gray-600 dark:text-gray-400 hover:text-white w-10 h-10 p-0 border border-gray-200 dark:border-[#3a3a3a] transition-all duration-200"
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#7cb342]" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#7cb342] dark:hover:text-[#7cb342] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full group-hover:bg-[#7cb342] transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#7cb342]" />
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#7cb342] dark:hover:text-[#7cb342] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full group-hover:bg-[#7cb342] transition-colors" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Ad before newsletter */}
        <ResponsiveAd className="mb-8" />

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#3a3a3a]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-2 flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#7cb342]" />
                Stay Updated with Latest Airdrops
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get exclusive airdrop alerts, guides, and insider tips delivered to your inbox. Join 50,000+ successful
                airdrop hunters!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter your email address"
                className="bg-white dark:bg-[#2a2a2a] border-gray-300 dark:border-[#3a3a3a] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:border-[#7cb342] dark:focus:border-[#7cb342]"
              />
              <Button className="bg-[#7cb342] hover:bg-[#689f38] text-white px-6 whitespace-nowrap">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-[#3a3a3a]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#7cb342]" />
              </div>
              <div>
                <div className="text-gray-900 dark:text-white text-sm font-medium">Email</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">support@airdrophunter.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-lg flex items-center justify-center">
                <Send className="h-5 w-5 text-[#7cb342]" />
              </div>
              <div>
                <div className="text-gray-900 dark:text-white text-sm font-medium">Telegram</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">@AirdropHunterOfficial</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-[#7cb342]" />
              </div>
              <div>
                <div className="text-gray-900 dark:text-white text-sm font-medium">Location</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Global Community</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 dark:border-[#3a3a3a] bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <span>© {currentYear} AirdropHunter. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for the crypto community.</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4">
              {legal.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-[#7cb342] dark:hover:text-[#7cb342] text-sm transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#2a2a2a]">
            <p className="text-gray-500 dark:text-gray-500 text-xs text-center leading-relaxed">
              <strong>Disclaimer:</strong> Cryptocurrency investments carry significant risk. Always do your own
              research (DYOR) before participating in any airdrop or investment. AirdropHunter is not responsible for
              any financial losses. This website may contain affiliate links.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
