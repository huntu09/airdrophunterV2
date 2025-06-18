// Ad Manager for centralized ad configuration
type AdSlot = {
  id: string
  format: "auto" | "rectangle" | "vertical" | "horizontal"
  responsive?: boolean
  sizes?: Array<[number, number]>
  description?: string
}

// Define all ad slots in one place
export const AD_SLOTS = {
  // Header banner (728x90)
  HEADER_BANNER: {
    id: "1438306767",
    format: "horizontal",
    sizes: [[728, 90]],
    description: "Top of page banner",
  } as AdSlot,

  // Sidebar (160x600)
  SIDEBAR: {
    id: "3167748455",
    format: "vertical",
    sizes: [[160, 600]],
    description: "Sidebar vertical banner",
  } as AdSlot,

  // In-content rectangle (300x250)
  IN_CONTENT: {
    id: "6691226347",
    format: "rectangle",
    sizes: [[300, 250]],
    description: "In-content rectangle ad",
  } as AdSlot,

  // Responsive ad
  RESPONSIVE: {
    id: "3013656049",
    format: "auto",
    responsive: true,
    description: "Responsive ad unit",
  } as AdSlot,

  // Footer banner
  FOOTER_BANNER: {
    id: "2945872109",
    format: "horizontal",
    sizes: [
      [728, 90],
      [468, 60],
      [320, 50],
    ],
    description: "Footer banner",
  } as AdSlot,

  // Mobile banner
  MOBILE_BANNER: {
    id: "5482913674",
    format: "horizontal",
    sizes: [
      [320, 50],
      [320, 100],
    ],
    description: "Mobile banner",
  } as AdSlot,
}

// Publisher ID
export const PUBLISHER_ID = "ca-pub-9620623978081909"

// Check if ads should be shown (based on consent)
export function shouldShowAds(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) return false

    const consentData = JSON.parse(consent)
    return consentData.advertising === true
  } catch (e) {
    return false
  }
}

// Track ad impressions
export function trackAdImpression(slotId: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "ad_impression", {
      event_category: "advertising",
      event_label: slotId,
    })
  }
}
