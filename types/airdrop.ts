export interface Airdrop {
  id: string
  name: string
  logo: string
  description: string
  action: string
  category: "latest" | "hottest" | "potential"
  rating: number
  totalRatings: number
  status: "active" | "confirmed" | "upcoming" | "ended"
  reward: string
  startDate: string
  difficulty: "Easy" | "Medium" | "Hard"
  socialLinks: {
    telegram?: string
    twitter?: string
    discord?: string
    website?: string
  }
  about: {
    overview: string
    tokenomics: string
    roadmap: string
  }
  steps: string[]
  requirements: string[]
  isHot?: boolean
  isConfirmed?: boolean
  participants: number
  createdAt: string
  updatedAt: string
  networks?: string[] // ["ethereum", "binance", "solana", etc.]
}
