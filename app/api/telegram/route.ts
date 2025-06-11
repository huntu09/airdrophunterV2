import { type NextRequest, NextResponse } from "next/server"
import { TelegramBot, TelegramMessageTemplates } from "@/lib/telegram-bot"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, botToken, channelId, airdrop, websiteUrl } = body

    if (!botToken) {
      return NextResponse.json({ success: false, error: "Bot token is required" }, { status: 400 })
    }

    const bot = new TelegramBot(botToken)

    switch (action) {
      case "test_connection":
        const connectionTest = await bot.testConnection()
        return NextResponse.json(connectionTest)

      case "test_channel":
        if (!channelId) {
          return NextResponse.json({ success: false, error: "Channel ID is required" }, { status: 400 })
        }
        const channelTest = await bot.getChannelInfo(channelId)
        return NextResponse.json(channelTest)

      case "post_airdrop":
        if (!channelId || !airdrop || !websiteUrl) {
          return NextResponse.json(
            {
              success: false,
              error: "Channel ID, airdrop data, and website URL are required",
            },
            { status: 400 },
          )
        }

        // Format message
        const message = TelegramMessageTemplates.formatAirdropMessage(airdrop, websiteUrl)
        const keyboard = TelegramMessageTemplates.getInlineKeyboard(airdrop, websiteUrl)

        // Send message
        if (airdrop.logo_url && airdrop.logo_url.startsWith("http")) {
          // Send as photo with caption
          const result = await bot.sendPhoto({
            chat_id: channelId,
            photo: airdrop.logo_url,
            caption: message,
            parse_mode: "HTML",
            reply_markup: keyboard,
          })
          return NextResponse.json(result)
        } else {
          // Send as text message
          const result = await bot.sendMessage({
            chat_id: channelId,
            text: message,
            parse_mode: "HTML",
            disable_web_page_preview: false,
            reply_markup: keyboard,
          })
          return NextResponse.json(result)
        }

      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Telegram API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
