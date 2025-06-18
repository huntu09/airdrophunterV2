"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag: any
  }
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      // Measure and log Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`${entry.name}: ${entry.value}`)

          // Send to analytics (replace with your analytics service)
          if (typeof window.gtag !== "undefined") {
            window.gtag("event", entry.name, {
              value: Math.round(entry.name === "CLS" ? entry.value * 1000 : entry.value),
              event_category: "Web Vitals",
              non_interaction: true,
            })
          }
        }
      })

      // Observe Core Web Vitals
      observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] })

      // Cleanup
      return () => observer.disconnect()
    }
  }, [])

  return null
}
