"use client"

import { useEffect } from "react"

interface PerformanceOptimizerProps {
  preloadImages?: string[]
  prefetchRoutes?: string[]
  criticalCSS?: string
}

export function PerformanceOptimizer({
  preloadImages = [],
  prefetchRoutes = [],
  criticalCSS,
}: PerformanceOptimizerProps) {
  useEffect(() => {
    // Preload critical images
    preloadImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })

    // Prefetch routes
    prefetchRoutes.forEach((route) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = route
      document.head.appendChild(link)
    })

    // DNS prefetch for external domains
    const domains = [
      "fonts.googleapis.com",
      "fonts.gstatic.com",
      "res.cloudinary.com",
      "ik.imagekit.io",
      "cdn.jsdelivr.net",
    ]

    domains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "dns-prefetch"
      link.href = `//${domain}`
      document.head.appendChild(link)
    })

    // Preconnect to critical domains
    const preconnectDomains = ["fonts.googleapis.com", "fonts.gstatic.com"]
    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = `https://${domain}`
      link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    })

    // Add critical CSS if provided
    if (criticalCSS) {
      const style = document.createElement("style")
      style.textContent = criticalCSS
      document.head.appendChild(style)
    }
  }, [preloadImages, prefetchRoutes, criticalCSS])

  return null
}
