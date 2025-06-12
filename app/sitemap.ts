import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://airdropshunter.cloud"

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let airdrops: any[] = []

  // Only fetch airdrops if Supabase is configured
  if (supabaseUrl && supabaseKey) {
    try {
      const { AirdropAPI } = await import("@/lib/api")
      airdrops = await AirdropAPI.getAirdrops()
    } catch (error) {
      console.error("Error fetching airdrops for sitemap:", error)
      airdrops = []
    }
  }

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/how-to-participate`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/safety-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/upcoming-events`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ]

  // Dynamic airdrop routes (only if we have data)
  const airdropRoutes = airdrops.map((airdrop) => ({
    url: `${baseUrl}/airdrop/${airdrop.slug}`,
    lastModified: new Date(airdrop.updated_at || airdrop.created_at),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...airdropRoutes]
}
