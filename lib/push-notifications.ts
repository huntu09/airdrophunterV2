class PushNotificationManager {
  private vapidPublicKey: string
  private registration: ServiceWorkerRegistration | null = null

  constructor() {
    this.vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ""
  }

  // Initialize push notifications
  async initialize(): Promise<boolean> {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("Push notifications not supported")
      return false
    }

    try {
      // Register service worker
      this.registration = await navigator.serviceWorker.register("/sw.js")
      console.log("Service Worker registered:", this.registration)
      return true
    } catch (error) {
      console.error("Service Worker registration failed:", error)
      return false
    }
  }

  // Request notification permission
  async requestPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
      console.warn("Notifications not supported")
      return "denied"
    }

    let permission = Notification.permission

    if (permission === "default") {
      permission = await Notification.requestPermission()
    }

    return permission
  }

  // Subscribe to push notifications
  async subscribe(): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.error("Service Worker not registered")
      return null
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey),
      })

      // Save subscription to server
      await this.saveSubscription(subscription)

      return subscription
    } catch (error) {
      console.error("Push subscription failed:", error)
      return null
    }
  }

  // Save subscription to server
  private async saveSubscription(subscription: PushSubscription): Promise<void> {
    try {
      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          userId: this.getUserId(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save subscription")
      }

      console.log("Subscription saved successfully")
    } catch (error) {
      console.error("Save subscription error:", error)
    }
  }

  // Get user ID (you can customize this)
  private getUserId(): string {
    // For now, use a random ID stored in localStorage
    let userId = localStorage.getItem("user_id")
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substr(2, 9)
      localStorage.setItem("user_id", userId)
    }
    return userId
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  // Check if user is subscribed
  async isSubscribed(): Promise<boolean> {
    if (!this.registration) return false

    try {
      const subscription = await this.registration.pushManager.getSubscription()
      return subscription !== null
    } catch (error) {
      console.error("Check subscription error:", error)
      return false
    }
  }

  // Unsubscribe from push notifications
  async unsubscribe(): Promise<boolean> {
    if (!this.registration) return false

    try {
      const subscription = await this.registration.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        console.log("Unsubscribed successfully")
        return true
      }
      return false
    } catch (error) {
      console.error("Unsubscribe error:", error)
      return false
    }
  }
}

export const pushNotificationManager = new PushNotificationManager()
