import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Shield, Smartphone, Globe, Download, CheckCircle, AlertTriangle, Star } from "lucide-react"

export default function WalletSetupGuidePage() {
  const wallets = [
    {
      name: "MetaMask",
      type: "Browser Extension",
      rating: 4.8,
      users: "30M+",
      platforms: ["Chrome", "Firefox", "Mobile"],
      pros: ["Most popular", "Great DeFi support", "Easy to use"],
      cons: ["Can be slow during high traffic", "Limited advanced features"],
      logo: "/placeholder.svg?height=60&width=60",
      recommended: true,
      difficulty: "Beginner",
    },
    {
      name: "Trust Wallet",
      type: "Mobile App",
      rating: 4.6,
      users: "25M+",
      platforms: ["iOS", "Android"],
      pros: ["Mobile-first", "Built-in DApp browser", "Supports many tokens"],
      cons: ["Limited desktop support", "Less customization"],
      logo: "/placeholder.svg?height=60&width=60",
      recommended: true,
      difficulty: "Beginner",
    },
    {
      name: "Phantom",
      type: "Multi-chain",
      rating: 4.7,
      users: "3M+",
      platforms: ["Chrome", "Mobile", "Solana"],
      pros: ["Great Solana support", "Clean interface", "Fast transactions"],
      cons: ["Newer wallet", "Limited Ethereum features"],
      logo: "/placeholder.svg?height=60&width=60",
      recommended: false,
      difficulty: "Intermediate",
    },
  ]

  const securitySteps = [
    {
      title: "Create Strong Password",
      description: "Use a unique, complex password that you don't use elsewhere",
      icon: Shield,
      critical: true,
    },
    {
      title: "Backup Seed Phrase",
      description: "Write down your 12-24 word seed phrase on paper, never digitally",
      icon: CheckCircle,
      critical: true,
    },
    {
      title: "Enable 2FA",
      description: "Add two-factor authentication for extra security",
      icon: Smartphone,
      critical: false,
    },
    {
      title: "Test Small Amounts",
      description: "Always test with small amounts before making large transactions",
      icon: AlertTriangle,
      critical: false,
    },
  ]

  const networks = [
    {
      name: "Ethereum",
      symbol: "ETH",
      chainId: "1",
      rpcUrl: "https://mainnet.infura.io/v3/YOUR-PROJECT-ID",
      explorer: "https://etherscan.io",
      color: "bg-blue-500",
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      chainId: "137",
      rpcUrl: "https://polygon-rpc.com",
      explorer: "https://polygonscan.com",
      color: "bg-purple-500",
    },
    {
      name: "Arbitrum",
      symbol: "ETH",
      chainId: "42161",
      rpcUrl: "https://arb1.arbitrum.io/rpc",
      explorer: "https://arbiscan.io",
      color: "bg-blue-600",
    },
    {
      name: "Optimism",
      symbol: "ETH",
      chainId: "10",
      rpcUrl: "https://mainnet.optimism.io",
      explorer: "https://optimistic.etherscan.io",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#7cb342] to-[#689f38] rounded-xl flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Wallet Setup Guide</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete guide to setting up and securing your crypto wallet for airdrop participation.
          </p>
        </div>

        <Tabs defaultValue="choose" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#3a3a3a]">
            <TabsTrigger value="choose" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
              Choose Wallet
            </TabsTrigger>
            <TabsTrigger value="setup" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
              Setup Process
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
              Security
            </TabsTrigger>
            <TabsTrigger value="networks" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
              Add Networks
            </TabsTrigger>
          </TabsList>

          {/* Choose Wallet Tab */}
          <TabsContent value="choose" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Wallet</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select the best wallet for your needs and experience level
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallets.map((wallet, index) => (
                <Card
                  key={index}
                  className={`bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a] hover:shadow-lg transition-all ${wallet.recommended ? "ring-2 ring-[#7cb342] ring-opacity-50" : ""}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={wallet.logo || "/placeholder.svg"}
                          alt={wallet.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">{wallet.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {wallet.type}
                          </Badge>
                        </div>
                      </div>
                      {wallet.recommended && (
                        <Badge className="bg-[#7cb342] text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 dark:text-gray-500 mb-1">Rating</div>
                        <div className="font-semibold text-gray-900 dark:text-white">⭐ {wallet.rating}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-500 mb-1">Users</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{wallet.users}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 dark:text-gray-500 text-sm mb-2">Platforms:</div>
                      <div className="flex flex-wrap gap-1">
                        {wallet.platforms.map((platform, platformIndex) => (
                          <Badge key={platformIndex} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 dark:text-gray-500 text-sm mb-2">Pros:</div>
                      <ul className="space-y-1">
                        {wallet.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-gray-600 dark:text-gray-400">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-[#7cb342] hover:bg-[#689f38] text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download {wallet.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Setup Process Tab */}
          <TabsContent value="setup" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Setup Process</h2>
              <p className="text-gray-600 dark:text-gray-400">Follow these steps to set up your wallet correctly</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  step: 1,
                  title: "Download & Install",
                  description: "Download the wallet from official sources only",
                  details: [
                    "Visit the official website",
                    "Download for your platform",
                    "Install the application",
                    "Never download from third-party sites",
                  ],
                },
                {
                  step: 2,
                  title: "Create New Wallet",
                  description: "Set up a new wallet with strong security",
                  details: [
                    "Click 'Create New Wallet'",
                    "Set a strong password",
                    "Agree to terms of service",
                    "Proceed to seed phrase generation",
                  ],
                },
                {
                  step: 3,
                  title: "Backup Seed Phrase",
                  description: "This is the most critical step for wallet security",
                  details: [
                    "Write down all 12-24 words in order",
                    "Use pen and paper (never digital)",
                    "Store in multiple secure locations",
                    "Verify the backup by entering words",
                  ],
                },
                {
                  step: 4,
                  title: "Complete Setup",
                  description: "Finalize your wallet configuration",
                  details: [
                    "Confirm your seed phrase",
                    "Set up additional security features",
                    "Add your first network",
                    "Make a small test transaction",
                  ],
                },
              ].map((item, index) => (
                <Card key={index} className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#7cb342] rounded-full flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                        <ul className="space-y-2">
                          {item.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7cb342] mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Security Best Practices</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Protect your wallet and funds with these essential security measures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securitySteps.map((step, index) => (
                <Card
                  key={index}
                  className={`bg-white dark:bg-[#1a1a1a] border-2 ${step.critical ? "border-red-500" : "border-gray-200 dark:border-[#3a3a3a]"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${step.critical ? "bg-red-100 dark:bg-red-900" : "bg-blue-100 dark:bg-blue-900"}`}
                      >
                        <step.icon
                          className={`h-6 w-6 ${step.critical ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                          {step.critical && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs">
                              Critical
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="text-center">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🚨 Never Share These Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Private Keys</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Your private keys give full access to your wallet
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Seed Phrase</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Your seed phrase can restore your entire wallet
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Passwords</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Never share your wallet password with anyone
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Networks Tab */}
          <TabsContent value="networks" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add Networks</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Connect to different blockchain networks for airdrop opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {networks.map((network, index) => (
                <Card key={index} className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 ${network.color} rounded-full flex items-center justify-center`}>
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{network.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {network.symbol}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-500">Chain ID:</span>
                        <span className="ml-2 font-mono text-gray-900 dark:text-white">{network.chainId}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-500">RPC URL:</span>
                        <div className="mt-1 p-2 bg-gray-100 dark:bg-[#2a2a2a] rounded text-xs font-mono break-all">
                          {network.rpcUrl}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-500">Explorer:</span>
                        <div className="mt-1 p-2 bg-gray-100 dark:bg-[#2a2a2a] rounded text-xs font-mono break-all">
                          {network.explorer}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-[#7cb342] hover:bg-[#689f38] text-white">Add to Wallet</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-[#7cb342]/10 to-[#689f38]/10 border-[#7cb342]/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    💡 Pro Tip: Network Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add networks as needed for specific airdrops. Having too many networks can make your wallet
                    cluttered.
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#7cb342] text-[#7cb342] hover:bg-[#7cb342] hover:text-white"
                  >
                    View All Supported Networks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
