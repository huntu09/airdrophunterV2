interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: "HTML" | "Markdown"
  disable_web_page_preview?: boolean
  reply_markup?: {
    inline_keyboard: Array<
      Array<{
        text: string
        url?: string
        callback_data?: string
      }>
    >
  }
}

interface TelegramPhoto {
  chat_id: string
  photo: string
  caption?: string
  parse_mode?: "HTML" | "Markdown"
  reply_markup?: {
    inline_keyboard: Array<
      Array<{
        text: string
        url?: string
        callback_data?: string
      }>
    >
  }
}

export class TelegramBot {
  private botToken: string
  private baseUrl: string

  constructor(botToken: string) {
    this.botToken = botToken
    this.baseUrl = `https://api.telegram.org/bot${botToken}`
  }

  // Test bot connection
  async testConnection(): Promise<{ success: boolean; error?: string; botInfo?: any }> {
    try {
      const response = await fetch(`${this.baseUrl}/getMe`)
      const data = await response.json()

      if (data.ok) {
        return { success: true, botInfo: data.result }
      } else {
        return { success: false, error: data.description }
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  // Send text message
  async sendMessage(message: TelegramMessage): Promise<{ success: boolean; error?: string; messageId?: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })

      const data = await response.json()

      if (data.ok) {
        return { success: true, messageId: data.result.message_id }
      } else {
        return { success: false, error: data.description }
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  // Send photo with caption
  async sendPhoto(photo: TelegramPhoto): Promise<{ success: boolean; error?: string; messageId?: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/sendPhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photo),
      })

      const data = await response.json()

      if (data.ok) {
        return { success: true, messageId: data.result.message_id }
      } else {
        return { success: false, error: data.description }
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  // Get channel info
  async getChannelInfo(channelId: string): Promise<{ success: boolean; error?: string; channelInfo?: any }> {
    try {
      const response = await fetch(`${this.baseUrl}/getChat?chat_id=${channelId}`)
      const data = await response.json()

      if (data.ok) {
        return { success: true, channelInfo: data.result }
      } else {
        return { success: false, error: data.description }
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }
}

// Message templates
export class TelegramMessageTemplates {
  static formatAirdropMessage(airdrop: any, websiteUrl: string): string {
    const statusEmoji = {
      CONFIRMED: "✅",
      UPCOMING: "🔜",
      ENDED: "❌",
    }

    const categoryEmoji = {
      DeFi: "💰",
      NFT: "🎨",
      Gaming: "🎮",
      "Layer 1": "🔗",
      "Layer 2": "⚡",
      AI: "🤖",
    }

    const hotBadge = airdrop.is_hot ? "🔥 HOT " : ""
    const status = statusEmoji[airdrop.status as keyof typeof statusEmoji] || "📋"
    const category = categoryEmoji[airdrop.category as keyof typeof categoryEmoji] || "📊"

    return `${hotBadge}${status} <b>${airdrop.name}</b>

${category} <b>Category:</b> ${airdrop.category}
🌐 <b>Blockchain:</b> ${airdrop.blockchain}
💎 <b>Reward:</b> ${airdrop.total_reward || "TBA"}
👥 <b>Participants:</b> ${airdrop.participants_count.toLocaleString()}
📊 <b>Status:</b> ${airdrop.status}

📝 <b>Description:</b>
${airdrop.description}

🔗 <b>Links:</b>
${airdrop.website_url ? `• Website: ${airdrop.website_url}` : ""}
${airdrop.twitter_url ? `• Twitter: ${airdrop.twitter_url}` : ""}
${airdrop.telegram_url ? `• Telegram: ${airdrop.telegram_url}` : ""}

👆 <b>Click button below for step-by-step guide!</b>

#Airdrop #${airdrop.category.replace(/\s+/g, "")} #${airdrop.blockchain.replace(/\s+/g, "")} ${airdrop.is_hot ? "#Hot" : ""}`
  }

  static getInlineKeyboard(airdrop: any, websiteUrl: string) {
    return {
      inline_keyboard: [
        [
          {
            text: "📋 View Guide",
            url: `${websiteUrl}/airdrop/${airdrop.slug}`,
          },
          {
            text: "🌐 Official Site",
            url: airdrop.website_url || websiteUrl,
          },
        ],
        [
          {
            text: "🚀 More Airdrops",
            url: websiteUrl,
          },
        ],
      ],
    }
  }
}

// Telegram settings management
export interface TelegramSettings {
  botToken: string
  channelId: string
  autoPost: boolean
  postOnlyConfirmed: boolean
  includeImage: boolean
  customTemplate?: string
}

export class TelegramSettingsManager {
  private static STORAGE_KEY = "telegram_settings"

  static getSettings(): TelegramSettings | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(this.STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  }

  static saveSettings(settings: TelegramSettings): void {
    if (typeof window === "undefined") return

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings))
  }

  static clearSettings(): void {
    if (typeof window === "undefined") return

    localStorage.removeItem(this.STORAGE_KEY)
  }
}
