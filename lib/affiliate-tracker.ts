// 🔐 VALIDATE AFFILIATE TRACKING CONFIGURATION
const isAffiliateTrackingEnabled = () => {
  return process.env.NEXT_PUBLIC_AFFILIATE_TRACKING_ENABLED === "true"
}

const isConversionTrackingEnabled = () => {
  return process.env.NEXT_PUBLIC_AFFILIATE_CONVERSION_TRACKING === "true"
}

export const trackAffiliateClick = (affiliateName: string, url: string) => {
  if (!isAffiliateTrackingEnabled()) {
    console.log("🔇 Affiliate tracking disabled")
    window.open(url, "_blank", "noopener,noreferrer")
    return
  }

  // Log the affiliate click event (example using Google Analytics)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "affiliate_click", {
      affiliate_name: affiliateName,
      affiliate_url: url,
    })
  } else {
    console.log("Google Analytics not found. Affiliate click not tracked.")
  }

  // Open the affiliate link in a new tab/window
  window.open(url, "_blank", "noopener,noreferrer")
}

export const trackAffiliateConversion = (affiliateName: string, conversionValue: number) => {
  if (!isConversionTrackingEnabled()) {
    console.log("🔕 Affiliate conversion tracking disabled")
    return
  }

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      affiliate_name: affiliateName,
      conversion_value: conversionValue,
      currency: "USD", // Replace with your currency if needed
    })
  } else {
    console.log("Google Analytics not found. Affiliate conversion not tracked.")
  }
}
