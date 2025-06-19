// 🎯 AFFILIATE CONFIGURATION UTILITY
export interface AffiliateConfig {
  id: number
  name: string
  title: string
  subtitle: string
  bonus: string
  bonusDetails: string
  cta: string
  bgColor: string
  textColor: string
  logo: string
  features: string[]
  url: string
  urgency: string
  socialProof: string
  trustBadge: string
  enabled: boolean
}

// 🔐 SECURE AFFILIATE CONFIGURATION
export const getAffiliateConfig = (): AffiliateConfig[] => {
  const isTrackingEnabled = process.env.NEXT_PUBLIC_AFFILIATE_TRACKING_ENABLED === "true"

  if (!isTrackingEnabled) {
    return []
  }

  const configs: AffiliateConfig[] = [
    {
      id: 1,
      name: "Binance",
      title: "World's #1 Crypto Exchange",
      subtitle: "Trade 350+ coins with lowest fees",
      bonus: "$100",
      bonusDetails: "Welcome Bonus",
      cta: "Claim $100 Bonus",
      bgColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      textColor: "text-white",
      logo: "₿",
      features: ["0% Fees", "24/7 Support", "Secure Trading"],
      url: `https://accounts.binance.com/register?ref=${process.env.NEXT_PUBLIC_BINANCE_REF_CODE}`,
      urgency: "Limited Time",
      socialProof: "10M+ Users",
      trustBadge: "🛡️ Secure",
      enabled: !!process.env.NEXT_PUBLIC_BINANCE_REF_CODE && process.env.NEXT_PUBLIC_BINANCE_REF_CODE !== "DEFAULT_REF",
    },
    {
      id: 2,
      name: "OKX",
      title: "Advanced Trading Platform",
      subtitle: "Professional tools & copy trading",
      bonus: "$50",
      bonusDetails: "New User Bonus",
      cta: "Get $50 Bonus",
      bgColor: "bg-gradient-to-r from-blue-600 to-cyan-500",
      textColor: "text-white",
      logo: "◯",
      features: ["Copy Trading", "Web3 Wallet", "DeFi Earn"],
      url: `https://www.okx.com/join/${process.env.NEXT_PUBLIC_OKX_REF_CODE}`,
      urgency: "Today Only",
      socialProof: "20M+ Traders",
      trustBadge: "⭐ 4.8/5",
      enabled: !!process.env.NEXT_PUBLIC_OKX_REF_CODE && process.env.NEXT_PUBLIC_OKX_REF_CODE !== "DEFAULT_REF",
    },
    {
      id: 3,
      name: "Bybit",
      title: "Derivatives Trading Leader",
      subtitle: "Advanced futures & options trading",
      bonus: "$30",
      bonusDetails: "Trading Bonus",
      cta: "Get $30 Bonus",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-500",
      textColor: "text-white",
      logo: "⚡",
      features: ["Futures", "Options", "Copy Trading"],
      url: `https://www.bybit.com/register?affiliate_id=${process.env.NEXT_PUBLIC_BYBIT_REF_CODE}`,
      urgency: "New Users",
      socialProof: "15M+ Traders",
      trustBadge: "🏆 Award Winner",
      enabled: !!process.env.NEXT_PUBLIC_BYBIT_REF_CODE && process.env.NEXT_PUBLIC_BYBIT_REF_CODE !== "DEFAULT_REF",
    },
    {
      id: 4,
      name: "KuCoin",
      title: "People's Exchange",
      subtitle: "500+ altcoins & low fees",
      bonus: "$20",
      bonusDetails: "Welcome Gift",
      cta: "Claim $20 Gift",
      bgColor: "bg-gradient-to-r from-green-600 to-teal-500",
      textColor: "text-white",
      logo: "🚀",
      features: ["500+ Coins", "Futures", "Staking"],
      url: `https://www.kucoin.com/ucenter/signup?rcode=${process.env.NEXT_PUBLIC_KUCOIN_REF_CODE}`,
      urgency: "Limited Offer",
      socialProof: "8M+ Users",
      trustBadge: "💎 Premium",
      enabled: !!process.env.NEXT_PUBLIC_KUCOIN_REF_CODE && process.env.NEXT_PUBLIC_KUCOIN_REF_CODE !== "DEFAULT_REF",
    },
  ]

  // Return only enabled affiliates
  return configs.filter((config) => config.enabled)
}

// 🎯 AFFILIATE VALIDATION
export const validateAffiliateConfig = () => {
  const requiredEnvVars = ["NEXT_PUBLIC_BINANCE_REF_CODE", "NEXT_PUBLIC_OKX_REF_CODE"]

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missing.length > 0) {
    console.warn("⚠️ Missing affiliate environment variables:", missing)
  }

  return missing.length === 0
}

// 🔍 DEBUG HELPER
export const debugAffiliateConfig = () => {
  if (process.env.NODE_ENV === "development") {
    console.log("🔍 Affiliate Config Debug:", {
      trackingEnabled: process.env.NEXT_PUBLIC_AFFILIATE_TRACKING_ENABLED,
      binanceRef: process.env.NEXT_PUBLIC_BINANCE_REF_CODE ? "✅ Set" : "❌ Missing",
      okxRef: process.env.NEXT_PUBLIC_OKX_REF_CODE ? "✅ Set" : "❌ Missing",
      bybitRef: process.env.NEXT_PUBLIC_BYBIT_REF_CODE ? "✅ Set" : "❌ Missing",
      kucoinRef: process.env.NEXT_PUBLIC_KUCOIN_REF_CODE ? "✅ Set" : "❌ Missing",
    })
  }
}
