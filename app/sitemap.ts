import type { MetadataRoute } from "next"
import { supabase } from "@/lib/supabase"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://airdrophunter.com"

  // Get all airdrops for dynamic routes
  const { data: airdrops } = await supabase.from("airdrops").select("id, updated_at").eq("status", "active")

  const airdropUrls =
    airdrops?.map((airdrop) => ({
      url: `${baseUrl}/airdrop/${airdrop.id}`,
      lastModified: new Date(airdrop.updated_at),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/latest`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hottest`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/potential`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...airdropUrls,
  ]
}
