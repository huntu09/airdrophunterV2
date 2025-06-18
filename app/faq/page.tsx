"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Search, Zap, Wallet, Shield, ArrowRight, Home, MessageCircle, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      id: "general",
      title: "General",
      icon: HelpCircle,
      color: "text-blue-500",
      count: 8,
    },
    {
      id: "airdrops",
      title: "Airdrops",
      icon: Zap,
      color: "text-[#7cb342]",
      count: 12,
    },
    {
      id: "wallets",
      title: "Wallets",
      icon: Wallet,
      color: "text-purple-500",
      count: 6,
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
      color: "text-red-500",
      count: 9,
    },
  ]

  const generalFAQs = [
    {
      question: "What is AirdropHunter?",
      answer:
        "AirdropHunter is a comprehensive platform that helps crypto enthusiasts discover, track, and participate in the most profitable cryptocurrency airdrops. We provide real-time updates, detailed guides, and security tips to maximize your airdrop earnings safely.",
    },
    {
      question: "Is AirdropHunter free to use?",
      answer:
        "Yes! AirdropHunter is completely free to use. We provide all our airdrop listings, guides, and basic features at no cost. We may offer premium features in the future, but our core service will always remain free.",
    },
    {
      question: "How do you find and verify airdrops?",
      answer:
        "Our team constantly monitors official project announcements, social media channels, and blockchain networks. We verify each airdrop through multiple sources and check smart contracts before listing them on our platform.",
    },
    {
      question: "Can I trust the airdrops listed on your platform?",
      answer:
        "We do extensive research and verification, but we always recommend doing your own research (DYOR). We provide risk ratings and detailed information to help you make informed decisions. Never invest more than you can afford to lose.",
    },
    {
      question: "How often is the airdrop list updated?",
      answer:
        "Our airdrop database is updated multiple times daily. We have automated systems and a dedicated team that monitors for new opportunities 24/7 to ensure you never miss out on profitable airdrops.",
    },
    {
      question: "Do you charge any fees for airdrop participation?",
      answer:
        "AirdropHunter never charges fees for airdrop participation. However, you may need to pay blockchain transaction fees (gas fees) when interacting with smart contracts. We always disclose any potential costs upfront.",
    },
    {
      question: "Can I submit an airdrop for listing?",
      answer:
        "Yes! If you discover a legitimate airdrop that's not listed on our platform, you can submit it through our contact form. Our team will review and verify the submission before adding it to our database.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team through email at support@airdrophunter.com or join our Telegram community @AirdropHunterOfficial for quick assistance and community discussions.",
    },
  ]

  const airdropFAQs = [
    {
      question: "What is a cryptocurrency airdrop?",
      answer:
        "A cryptocurrency airdrop is a distribution of free tokens or coins to wallet addresses, usually as a marketing strategy for new projects or to reward existing community members. Airdrops can range from a few dollars to thousands of dollars in value.",
    },
    {
      question: "How much can I earn from airdrops?",
      answer:
        "Airdrop earnings vary greatly. Some airdrops are worth a few dollars, while others have been worth thousands. Historical examples include Uniswap ($1,200+), dYdX ($8,000+), and ENS ($10,000+). Success depends on timing, participation, and luck.",
    },
    {
      question: "What's the difference between confirmed and potential airdrops?",
      answer:
        "Confirmed airdrops are officially announced by projects with clear distribution criteria. Potential airdrops are speculative - projects that might distribute tokens based on user activity, but haven't officially announced an airdrop yet.",
    },
    {
      question: "How do I participate in an airdrop?",
      answer:
        "Participation varies by project but typically involves: connecting your wallet, completing specific tasks (trading, providing liquidity, using the protocol), meeting eligibility criteria, and sometimes holding certain tokens. Always follow our detailed guides for each airdrop.",
    },
    {
      question: "When do airdrops typically get distributed?",
      answer:
        "Distribution timing varies widely. Some airdrops are instant, others take weeks or months. Potential airdrops might take years before tokens are distributed (if at all). We provide estimated timelines when available.",
    },
    {
      question: "Can I participate in multiple airdrops simultaneously?",
      answer:
        "Many successful airdrop hunters participate in dozens of airdrops simultaneously. We recommend using our tracking tools to manage multiple opportunities efficiently and safely.",
    },
    {
      question: "What are the risks of participating in airdrops?",
      answer:
        "Main risks include: scam projects stealing your funds, gas fees for transactions that don't result in airdrops, opportunity cost of time and capital, and potential tax implications. Always research projects thoroughly and never share private keys.",
    },
    {
      question: "Do I need to pay taxes on airdrop tokens?",
      answer:
        "Tax treatment varies by jurisdiction. In many countries, airdrop tokens are considered taxable income at fair market value when received. Consult with a tax professional familiar with cryptocurrency regulations in your area.",
    },
    {
      question: "How do I know if an airdrop is legitimate?",
      answer:
        "Check for: official project announcements, verified social media accounts, audited smart contracts, clear tokenomics, active development team, and community engagement. Avoid projects asking for private keys or upfront payments.",
    },
    {
      question: "What's the best strategy for airdrop hunting?",
      answer:
        "Diversify across multiple projects, focus on high-quality protocols, use separate wallets for airdrops, stay active in DeFi ecosystems, join early when possible, and always prioritize security over potential profits.",
    },
    {
      question: "Can I sell airdrop tokens immediately?",
      answer:
        "It depends on the project. Some tokens are immediately tradeable, others have vesting periods or lock-up requirements. We provide information about trading availability and any restrictions for each airdrop.",
    },
    {
      question: "What should I do if I miss an airdrop deadline?",
      answer:
        "Unfortunately, most airdrops have strict deadlines. However, some projects offer multiple rounds or extended periods. Follow our platform for updates, and focus on upcoming opportunities rather than dwelling on missed ones.",
    },
  ]

  const walletFAQs = [
    {
      question: "Which wallet should I use for airdrops?",
      answer:
        "Popular choices include MetaMask, Trust Wallet, and Coinbase Wallet for hot wallets. For security, consider using a separate wallet specifically for airdrops, keeping your main holdings in a hardware wallet like Ledger or Trezor.",
    },
    {
      question: "Should I use the same wallet for all airdrops?",
      answer:
        "It's generally recommended to use the same wallet address for consistency, as many airdrops reward long-term users. However, for security reasons, consider using a dedicated airdrop wallet separate from your main holdings.",
    },
    {
      question: "How do I add custom tokens to my wallet?",
      answer:
        "Most wallets allow you to add custom tokens by entering the contract address. You can find contract addresses on our airdrop pages, CoinGecko, or the project's official documentation. Always verify contract addresses from official sources.",
    },
    {
      question: "What if I don't see my airdrop tokens in my wallet?",
      answer:
        "Airdrop tokens might not appear automatically. Try: refreshing your wallet, manually adding the token contract, checking if distribution has actually occurred, or looking in a different network if it's a multi-chain project.",
    },
    {
      question: "Can I use exchange wallets for airdrops?",
      answer:
        "Generally not recommended. Most airdrops require you to control your private keys, which you don't have with exchange wallets. Some exchanges do support certain airdrops, but you'll miss most opportunities. Use a non-custodial wallet instead.",
    },
    {
      question: "How do I backup my wallet properly?",
      answer:
        "Write down your seed phrase on paper (never digitally), store it in multiple secure locations, never share it with anyone, consider using a hardware wallet for large amounts, and test your backup by restoring a small test wallet.",
    },
  ]

  const securityFAQs = [
    {
      question: "How do I avoid airdrop scams?",
      answer:
        "Never share your private keys or seed phrase, verify official project channels, be wary of 'too good to be true' offers, check smart contract addresses, avoid clicking suspicious links, and use our verified airdrop listings.",
    },
    {
      question: "Is it safe to connect my wallet to airdrop websites?",
      answer:
        "Only connect to verified, official websites. Always check the URL carefully, look for SSL certificates, disconnect your wallet after use, and consider using a separate wallet for airdrops to limit exposure.",
    },
    {
      question: "What should I do if I think I've been scammed?",
      answer:
        "Immediately disconnect your wallet from all dApps, transfer remaining funds to a new wallet, change all passwords, document the incident with screenshots, report to relevant authorities, and warn others in the community.",
    },
    {
      question: "How much should I keep in my airdrop wallet?",
      answer:
        "Only keep the minimum amount needed for gas fees and any required holdings. Most successful airdrop hunters keep $50-200 in their airdrop wallets, with main holdings stored securely elsewhere.",
    },
    {
      question: "Should I use a VPN for airdrop activities?",
      answer:
        "A VPN can provide additional privacy and security, especially when accessing new websites. However, be aware that some airdrops have geographic restrictions, and using a VPN might affect eligibility.",
    },
    {
      question: "What are the signs of a fake airdrop website?",
      answer:
        "Poor grammar/spelling, requests for private keys, upfront payment requirements, no official social media presence, suspicious URLs, lack of project documentation, and promises of guaranteed returns.",
    },
    {
      question: "How do I verify smart contract safety?",
      answer:
        "Check if the contract is verified on block explorers, look for audit reports, review the contract code if you're technical, check community discussions, and use tools like Token Sniffer or Honeypot.is for basic checks.",
    },
    {
      question: "Is it safe to give token approvals for airdrops?",
      answer:
        "Be very cautious with token approvals. Only approve the minimum necessary amount, revoke approvals after use, regularly audit your active approvals using tools like Revoke.cash, and never approve unlimited amounts unless absolutely necessary.",
    },
    {
      question: "What information is safe to share for airdrops?",
      answer:
        "Safe to share: wallet address, email (use a dedicated one), social media handles, transaction hashes. Never share: private keys, seed phrases, passwords, personal identification documents, or banking information.",
    },
  ]

  const allFAQs = {
    general: generalFAQs,
    airdrops: airdropFAQs,
    wallets: walletFAQs,
    security: securityFAQs,
  }

  const filteredFAQs = (faqs) => {
    if (!searchQuery) return faqs
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const popularQuestions = [
    "What is a cryptocurrency airdrop?",
    "How much can I earn from airdrops?",
    "Which wallet should I use for airdrops?",
    "How do I avoid airdrop scams?",
    "Is AirdropHunter free to use?",
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
            <span className="text-sm text-gray-900 dark:text-white">FAQ</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Find answers to common questions about airdrops and our platform
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-0 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[#7cb342]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Popular Questions */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Popular Questions
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(question)}
                  className="text-sm hover:bg-[#7cb342] hover:text-white hover:border-[#7cb342]"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Category Stats */}
        {!searchQuery && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {faqCategories.map((category) => (
              <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}
                  >
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} questions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* FAQ Content */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2 py-3">
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(allFAQs).map(([categoryId, faqs]) => (
            <TabsContent key={categoryId} value={categoryId}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {faqCategories.find((cat) => cat.id === categoryId)?.title} Questions
                  </CardTitle>
                  <CardDescription>
                    {filteredFAQs(faqs).length} questions found
                    {searchQuery && ` for "${searchQuery}"`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFAQs(faqs).length > 0 ? (
                    <Accordion type="single" collapsible className="space-y-2">
                      {filteredFAQs(faqs).map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No questions found matching your search.</p>
                      <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                        Clear Search
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Contact Support */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-[#7cb342] to-[#689f38] text-white mt-8">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-green-100 mb-6">Our support team is here to help you succeed in your airdrop journey</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-[#7cb342] hover:bg-gray-100">
                <Link href="mailto:support@airdrophunter.com">Email Support</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-[#7cb342]">
                <Link href="https://t.me/AirdropHunterOfficial">Join Telegram</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
