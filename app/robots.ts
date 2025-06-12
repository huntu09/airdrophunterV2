import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://airdropshunter.cloud"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin-secret-panel-xyz/", "/api/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin-secret-panel-xyz/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin-secret-panel-xyz/", "/private/"],
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
        disallow: ["/admin-secret-panel-xyz/", "/private/"],
      },
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
        disallow: ["/admin-secret-panel-xyz/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
