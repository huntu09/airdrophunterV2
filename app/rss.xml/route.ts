export async function GET() {
  const baseUrl = "https://airdrophunter.com"

  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Return empty RSS feed if Supabase not configured
      const emptyRssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AirdropHunter - Latest Crypto Airdrops</title>
    <description>Discover the latest cryptocurrency airdrops, DeFi tokens, and NFT drops. Join 500K+ users earning free crypto daily.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>team@airdrophunter.com (AirdropHunter Team)</managingEditor>
    <webMaster>tech@airdrophunter.com (AirdropHunter Tech)</webMaster>
    <category>Finance</category>
    <category>Cryptocurrency</category>
    <category>Blockchain</category>
    <image>
      <url>${baseUrl}/icon.png</url>
      <title>AirdropHunter</title>
      <link>${baseUrl}</link>
      <width>512</width>
      <height>512</height>
    </image>
    <ttl>60</ttl>
  </channel>
</rss>`

      return new Response(emptyRssXml, {
        headers: {
          "Content-Type": "application/rss+xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      })
    }

    // Dynamic import only when Supabase is available
    const { AirdropAPI } = await import("@/lib/api")
    const airdrops = await AirdropAPI.getAirdrops()
    const latestAirdrops = airdrops.slice(0, 20) // Latest 20 airdrops

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AirdropHunter - Latest Crypto Airdrops</title>
    <description>Discover the latest cryptocurrency airdrops, DeFi tokens, and NFT drops. Join 500K+ users earning free crypto daily.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>team@airdrophunter.com (AirdropHunter Team)</managingEditor>
    <webMaster>tech@airdrophunter.com (AirdropHunter Tech)</webMaster>
    <category>Finance</category>
    <category>Cryptocurrency</category>
    <category>Blockchain</category>
    <image>
      <url>${baseUrl}/icon.png</url>
      <title>AirdropHunter</title>
      <link>${baseUrl}</link>
      <width>512</width>
      <height>512</height>
    </image>
    <ttl>60</ttl>
    ${latestAirdrops
      .map(
        (airdrop) => `
    <item>
      <title>${airdrop.name} - ${airdrop.status} Airdrop</title>
      <description><![CDATA[${airdrop.description}]]></description>
      <content:encoded><![CDATA[
        <h2>${airdrop.name}</h2>
        <p><strong>Status:</strong> ${airdrop.status}</p>
        <p><strong>Category:</strong> ${airdrop.category}</p>
        <p><strong>Blockchain:</strong> ${airdrop.blockchain}</p>
        ${airdrop.total_reward ? `<p><strong>Total Reward:</strong> ${airdrop.total_reward}</p>` : ""}
        <p><strong>Participants:</strong> ${airdrop.participants_count.toLocaleString()}</p>
        <p>${airdrop.about}</p>
        <p><a href="${baseUrl}/airdrop/${airdrop.slug}">Learn more and participate →</a></p>
      ]]></content:encoded>
      <link>${baseUrl}/airdrop/${airdrop.slug}</link>
      <guid isPermaLink="true">${baseUrl}/airdrop/${airdrop.slug}</guid>
      <pubDate>${new Date(airdrop.created_at).toUTCString()}</pubDate>
      <category>${airdrop.category}</category>
      <category>${airdrop.blockchain}</category>
      ${airdrop.is_hot ? "<category>Hot</category>" : ""}
    </item>`,
      )
      .join("")}
  </channel>
</rss>`

    return new Response(rssXml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)

    // Return empty RSS feed on error
    const errorRssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AirdropHunter - Latest Crypto Airdrops</title>
    <description>RSS feed temporarily unavailable</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`

    return new Response(errorRssXml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300", // Shorter cache for error
      },
    })
  }
}
