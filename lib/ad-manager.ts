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
  // Responsive header banner
  HEADER_BANNER: {
    id: "1438306767",
    format: "auto",
    responsive: true,
    sizes: [
      [728, 90],
      [468, 60],
      [320, 50],
    ],
    description: "Responsive top banner",
  } as AdSlot,

  // Desktop sidebar only
  SIDEBAR: {
    id: "3167748455",
    format: "auto",
    responsive: true,
    sizes: [
      [160, 600],
      [120, 600],
    ],
    description: "Desktop sidebar banner",
  } as AdSlot,

  // Responsive in-content
  IN_CONTENT: {
    id: "6691226347",
    format: "auto",
    responsive: true,
    sizes: [
      [300, 250],
      [250, 250],
      [200, 200],
    ],
    description: "Responsive in-content ad",
  } as AdSlot,

  // Fully responsive
  RESPONSIVE: {
    id: "3013656049",
    format: "auto",
    responsive: true,
    description: "Fully responsive ad unit",
  } as AdSlot,

  // Responsive footer banner
  FOOTER_BANNER: {
    id: "2945872109",
    format: "auto",
    responsive: true,
    sizes: [
      [728, 90],
      [468, 60],
      [320, 50],
    ],
    description: "Responsive footer banner",
  } as AdSlot,

  // Mobile-optimized banner
  MOBILE_BANNER: {
    id: "5482913674",
    format: "auto",
    responsive: true,
    sizes: [
      [320, 50],
      [320, 100],
      [300, 50],
    ],
    description: "Mobile-optimized banner",
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

// Helper function to get appropriate ad component based on viewport
export function getResponsiveAdSlot(placement: "header" | "sidebar" | "content" | "footer"): AdSlot {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  switch (placement) {
    case "header":
      return isMobile ? AD_SLOTS.MOBILE_BANNER : AD_SLOTS.HEADER_BANNER
    case "sidebar":
      return AD_SLOTS.SIDEBAR // Will be hidden on mobile via CSS
    case "content":
      return AD_SLOTS.IN_CONTENT
    case "footer":
      return AD_SLOTS.FOOTER_BANNER
    default:
      return AD_SLOTS.RESPONSIVE
  }
}
