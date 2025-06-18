// Market Data API Service
export interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap_rank: number
}

export interface MarketDataResponse {
  [key: string]: {
    usd: number
    usd_24h_change: number
  }
}

export class MarketDataService {
  private static readonly BASE_URL = "https://api.coingecko.com/api/v3"
  private static readonly COINS = [
    "bitcoin",
    "ethereum",
    "binancecoin",
    "solana",
    "matic-network",
    "cardano",
    "polkadot",
    "avalanche-2",
  ]

  static async fetchMarketData(): Promise<CoinData[]> {
    try {
      const coinIds = this.COINS.join(",")
      const response = await fetch(
        `${this.BASE_URL}/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`,
        {
          next: { revalidate: 30 }, // Cache for 30 seconds
          headers: {
            Accept: "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: MarketDataResponse = await response.json()

      return this.COINS.map((coinId, index) => {
        const coinData = data[coinId]
        const symbols = ["BTC", "ETH", "BNB", "SOL", "MATIC", "ADA", "DOT", "AVAX"]
        const names = ["Bitcoin", "Ethereum", "Binance Coin", "Solana", "Polygon", "Cardano", "Polkadot", "Avalanche"]

        return {
          id: coinId,
          symbol: symbols[index],
          name: names[index],
          current_price: coinData?.usd || 0,
          price_change_percentage_24h: coinData?.usd_24h_change || 0,
          market_cap_rank: index + 1,
        }
      })
    } catch (error) {
      console.error("Failed to fetch market data:", error)
      // Return fallback data
      return this.getFallbackData()
    }
  }

  private static getFallbackData(): CoinData[] {
    return [
      {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        current_price: 67234,
        price_change_percentage_24h: 2.3,
        market_cap_rank: 1,
      },
      {
        id: "ethereum",
        symbol: "ETH",
        name: "Ethereum",
        current_price: 3456,
        price_change_percentage_24h: -1.2,
        market_cap_rank: 2,
      },
      {
        id: "binancecoin",
        symbol: "BNB",
        name: "Binance Coin",
        current_price: 589,
        price_change_percentage_24h: 0.8,
        market_cap_rank: 3,
      },
      {
        id: "solana",
        symbol: "SOL",
        name: "Solana",
        current_price: 145,
        price_change_percentage_24h: 5.4,
        market_cap_rank: 4,
      },
      {
        id: "matic-network",
        symbol: "MATIC",
        name: "Polygon",
        current_price: 0.89,
        price_change_percentage_24h: 3.1,
        market_cap_rank: 5,
      },
      {
        id: "cardano",
        symbol: "ADA",
        name: "Cardano",
        current_price: 0.45,
        price_change_percentage_24h: -2.1,
        market_cap_rank: 6,
      },
      {
        id: "polkadot",
        symbol: "DOT",
        name: "Polkadot",
        current_price: 7.23,
        price_change_percentage_24h: 1.8,
        market_cap_rank: 7,
      },
      {
        id: "avalanche-2",
        symbol: "AVAX",
        name: "Avalanche",
        current_price: 34.56,
        price_change_percentage_24h: 4.2,
        market_cap_rank: 8,
      },
    ]
  }

  static formatPrice(price: number): string {
    if (price >= 1000) {
      return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`
    } else {
      return `$${price.toFixed(4)}`
    }
  }

  static formatChange(change: number): string {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}%`
  }

  static getChangeColor(change: number): string {
    if (change > 0) return "text-green-500"
    if (change < 0) return "text-red-500"
    return "text-gray-500"
  }
}
