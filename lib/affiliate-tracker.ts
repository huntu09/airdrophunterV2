// 🎯 Affiliate Click Tracking & Analytics
import { event } from "./analytics"

export interface AffiliateClick {
  platform: string
  timestamp: number
  userAgent: string
  referrer: string
  sessionId: string
}

export const trackAffiliateClick = (platform: string, url: string) => {
  try {
    // 📊 Google Analytics Event
    event({
      action: "affiliate_click",
      category: "monetization",
      label: platform,
      value: 1,
    })

    // 💾 Local Storage for Conversion Tracking
    const clickData: AffiliateClick = {
      platform,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: generateSessionId(),
    }

    // Store click data
    const existingClicks = JSON.parse(localStorage.getItem("affiliate_clicks") || "[]")
    existingClicks.push(clickData)
    localStorage.setItem("affiliate_clicks", JSON.stringify(existingClicks))

    // 🔔 Console log for debugging
    console.log(`🎯 Affiliate Click Tracked: ${platform}`, clickData)

    // 🚀 Open affiliate link
    window.open(url, "_blank", "noopener,noreferrer")

    return true
  } catch (error) {
    console.error("❌ Affiliate tracking failed:", error)
    // Fallback: still open the link
    window.open(url, "_blank", "noopener,noreferrer")
    return false
  }
}

export const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const getAffiliateStats = () => {
  try {
    const clicks = JSON.parse(localStorage.getItem("affiliate_clicks") || "[]")
    const stats = clicks.reduce((acc: any, click: AffiliateClick) => {
      acc[click.platform] = (acc[click.platform] || 0) + 1
      return acc
    }, {})

    return {
      totalClicks: clicks.length,
      platformStats: stats,
      recentClicks: clicks.slice(-10), // Last 10 clicks
    }
  } catch {
    return { totalClicks: 0, platformStats: {}, recentClicks: [] }
  }
}
