import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🚀 Starting crypto data fetch from CoinGecko...")

    // Add timeout and better error handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,cardano&vs_currencies=usd&include_24hr_change=true",
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; AirdropHunter/1.0)",
        },
        signal: controller.signal,
        // Remove next.revalidate as it might cause issues in some environments
      },
    )

    clearTimeout(timeoutId)

    console.log(`📊 CoinGecko API Response Status: ${response.status}`)

    if (!response.ok) {
      console.error(`❌ CoinGecko API error: ${response.status} - ${response.statusText}`)
      const errorText = await response.text().catch(() => "Unknown error")
      console.error(`❌ Error details: ${errorText}`)
      return getFallbackData()
    }

    const data = await response.json()
    console.log("✅ Successfully fetched crypto data from CoinGecko")
    console.log("📈 Data received:", Object.keys(data))

    // Validate data structure
    if (!data || typeof data !== "object") {
      console.error("❌ Invalid data structure received from CoinGecko")
      return getFallbackData()
    }

    // Transform CoinGecko data to match our format with validation
    const transformedData = [
      {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        quote: {
          USD: {
            price: data.bitcoin?.usd || 67234,
            percent_change_24h: data.bitcoin?.usd_24h_change || 2.4,
          },
        },
      },
      {
        id: 1027,
        name: "Ethereum",
        symbol: "ETH",
        quote: {
          USD: {
            price: data.ethereum?.usd || 3456,
            percent_change_24h: data.ethereum?.usd_24h_change || 1.8,
          },
        },
      },
      {
        id: 5426,
        name: "Solana",
        symbol: "SOL",
        quote: {
          USD: {
            price: data.solana?.usd || 142,
            percent_change_24h: data.solana?.usd_24h_change || -0.5,
          },
        },
      },
      {
        id: 1839,
        name: "BNB",
        symbol: "BNB",
        quote: {
          USD: {
            price: data.binancecoin?.usd || 589,
            percent_change_24h: data.binancecoin?.usd_24h_change || 3.2,
          },
        },
      },
      {
        id: 2010,
        name: "Cardano",
        symbol: "ADA",
        quote: {
          USD: {
            price: data.cardano?.usd || 0.45,
            percent_change_24h: data.cardano?.usd_24h_change || 1.1,
          },
        },
      },
    ]

    return NextResponse.json({
      data: transformedData,
      timestamp: new Date().toISOString(),
      source: "coingecko",
    })
  } catch (error) {
    console.error("💥 Critical error in crypto API:", error)

    // Log specific error types
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      if (error.name === "AbortError") {
        console.error("❌ Request timed out after 10 seconds")
      }
    }

    return getFallbackData()
  }
}

function getFallbackData() {
  console.log("🔄 Using fallback crypto data")

  // Generate realistic fluctuations for fallback data
  const randomFluctuation = () => (Math.random() - 0.5) * 10 // -5% to +5%

  return NextResponse.json({
    data: [
      {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        quote: {
          USD: {
            price: 67234 + (Math.random() * 2000 - 1000),
            percent_change_24h: 2.4 + randomFluctuation(),
          },
        },
      },
      {
        id: 1027,
        name: "Ethereum",
        symbol: "ETH",
        quote: {
          USD: {
            price: 3456 + (Math.random() * 200 - 100),
            percent_change_24h: 1.8 + randomFluctuation(),
          },
        },
      },
      {
        id: 5426,
        name: "Solana",
        symbol: "SOL",
        quote: {
          USD: {
            price: 142 + (Math.random() * 20 - 10),
            percent_change_24h: -0.5 + randomFluctuation(),
          },
        },
      },
      {
        id: 1839,
        name: "BNB",
        symbol: "BNB",
        quote: {
          USD: {
            price: 589 + (Math.random() * 50 - 25),
            percent_change_24h: 3.2 + randomFluctuation(),
          },
        },
      },
      {
        id: 2010,
        name: "Cardano",
        symbol: "ADA",
        quote: {
          USD: {
            price: 0.45 + (Math.random() * 0.1 - 0.05),
            percent_change_24h: 1.1 + randomFluctuation(),
          },
        },
      },
    ],
    timestamp: new Date().toISOString(),
    source: "fallback",
  })
}
