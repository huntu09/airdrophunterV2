import { createClient } from "@/lib/supabase"

export interface NotificationData {
  type: "NEW" | "DEADLINE" | "CLAIM" | "UPDATE" | "HOT"
  title: string
  message: string
  airdrop_id?: string
}

export class NotificationGenerator {
  private supabase = createClient()

  // Generate notification for new airdrop
  async generateNewAirdropNotification(airdropId: string) {
    try {
      const { data: airdrop } = await this.supabase
        .from("airdrops")
        .select("name, total_reward, blockchain")
        .eq("id", airdropId)
        .single()

      if (!airdrop) return null

      const notification: NotificationData = {
        type: "NEW",
        title: `🎉 ${airdrop.name} Airdrop Launched!`,
        message: `New ${airdrop.name} airdrop is now live on ${airdrop.blockchain}. ${
          airdrop.total_reward ? `Earn up to ${airdrop.total_reward} tokens!` : "Join now to earn free tokens!"
        }`,
        airdrop_id: airdropId,
      }

      return await this.createNotification(notification)
    } catch (error) {
      console.error("Error generating new airdrop notification:", error)
      return null
    }
  }

  // Generate deadline notifications
  async generateDeadlineNotifications() {
    try {
      // Get airdrops ending in 1-3 days
      const threeDaysFromNow = new Date()
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

      const oneDayFromNow = new Date()
      oneDayFromNow.setDate(oneDayFromNow.getDate() + 1)

      const { data: airdrops } = await this.supabase
        .from("airdrops")
        .select("id, name, deadline, total_reward")
        .eq("status", "CONFIRMED")
        .gte("deadline", oneDayFromNow.toISOString())
        .lte("deadline", threeDaysFromNow.toISOString())

      if (!airdrops?.length) return []

      const notifications = []

      for (const airdrop of airdrops) {
        if (!airdrop.deadline) continue

        const deadline = new Date(airdrop.deadline)
        const now = new Date()
        const hoursLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60))

        let timeText = ""
        if (hoursLeft <= 24) {
          timeText = `Only ${hoursLeft} hours left`
        } else {
          const daysLeft = Math.ceil(hoursLeft / 24)
          timeText = `Only ${daysLeft} days left`
        }

        // Check if notification already exists for this airdrop
        const { data: existing } = await this.supabase
          .from("notifications")
          .select("id")
          .eq("airdrop_id", airdrop.id)
          .eq("type", "DEADLINE")
          .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
          .single()

        if (existing) continue // Skip if already notified

        const notification: NotificationData = {
          type: "DEADLINE",
          title: `⏰ ${airdrop.name} Ending Soon!`,
          message: `${timeText} to participate in ${airdrop.name} airdrop. ${
            airdrop.total_reward ? `Don't miss out on ${airdrop.total_reward} tokens!` : "Don't miss this opportunity!"
          }`,
          airdrop_id: airdrop.id,
        }

        const created = await this.createNotification(notification)
        if (created) notifications.push(created)
      }

      return notifications
    } catch (error) {
      console.error("Error generating deadline notifications:", error)
      return []
    }
  }

  // Generate hot/trending notifications
  async generateHotNotifications() {
    try {
      // Get hot airdrops that became hot recently
      const { data: hotAirdrops } = await this.supabase
        .from("airdrops")
        .select("id, name, participants_count, total_reward")
        .eq("is_hot", true)
        .eq("status", "CONFIRMED")
        .gte("participants_count", 1000) // At least 1000 participants

      if (!hotAirdrops?.length) return []

      const notifications = []

      for (const airdrop of hotAirdrops) {
        // Check if hot notification already exists
        const { data: existing } = await this.supabase
          .from("notifications")
          .select("id")
          .eq("airdrop_id", airdrop.id)
          .eq("type", "HOT")
          .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Last 7 days
          .single()

        if (existing) continue

        const notification: NotificationData = {
          type: "HOT",
          title: `🔥 ${airdrop.name} Trending Now!`,
          message: `${airdrop.name} is trending with ${airdrop.participants_count.toLocaleString()}+ participants! ${
            airdrop.total_reward ? `Join now to earn ${airdrop.total_reward} tokens.` : "Join the hype now!"
          }`,
          airdrop_id: airdrop.id,
        }

        const created = await this.createNotification(notification)
        if (created) notifications.push(created)
      }

      return notifications
    } catch (error) {
      console.error("Error generating hot notifications:", error)
      return []
    }
  }

  // Generate update notifications
  async generateUpdateNotification(airdropId: string, updateType: "CONFIRMED" | "ENDED" | "CLAIM_OPEN") {
    try {
      const { data: airdrop } = await this.supabase
        .from("airdrops")
        .select("name, status, total_reward")
        .eq("id", airdropId)
        .single()

      if (!airdrop) return null

      let title = ""
      let message = ""

      switch (updateType) {
        case "CONFIRMED":
          title = `✅ ${airdrop.name} Airdrop Confirmed!`
          message = `Great news! ${airdrop.name} airdrop has been officially confirmed by the team. Start participating now!`
          break
        case "ENDED":
          title = `⏰ ${airdrop.name} Airdrop Ended`
          message = `${airdrop.name} airdrop has ended. Stay tuned for distribution updates and claim instructions.`
          break
        case "CLAIM_OPEN":
          title = `🎁 ${airdrop.name} Tokens Ready to Claim!`
          message = `Your ${airdrop.name} airdrop tokens are ready to claim! Visit the project page to claim your rewards.`
          break
      }

      const notification: NotificationData = {
        type: updateType === "CLAIM_OPEN" ? "CLAIM" : "UPDATE",
        title,
        message,
        airdrop_id: airdropId,
      }

      return await this.createNotification(notification)
    } catch (error) {
      console.error("Error generating update notification:", error)
      return null
    }
  }

  // Create notification in database
  private async createNotification(notificationData: NotificationData) {
    try {
      const { data, error } = await this.supabase.from("notifications").insert([notificationData]).select().single()

      if (error) {
        console.error("Error creating notification:", error)
        return null
      }

      console.log("✅ Notification created:", data.title)
      return data
    } catch (error) {
      console.error("Error creating notification:", error)
      return null
    }
  }

  // Run all notification generators
  async generateAllNotifications() {
    console.log("🔔 Running notification generators...")

    try {
      const results = await Promise.allSettled([this.generateDeadlineNotifications(), this.generateHotNotifications()])

      let totalCreated = 0
      results.forEach((result, index) => {
        if (result.status === "fulfilled" && Array.isArray(result.value)) {
          totalCreated += result.value.length
          console.log(`✅ Generator ${index + 1}: ${result.value.length} notifications created`)
        } else if (result.status === "rejected") {
          console.error(`❌ Generator ${index + 1} failed:`, result.reason)
        }
      })

      console.log(`🎉 Total notifications created: ${totalCreated}`)
      return totalCreated
    } catch (error) {
      console.error("Error running notification generators:", error)
      return 0
    }
  }
}

// Export singleton instance
export const notificationGenerator = new NotificationGenerator()
