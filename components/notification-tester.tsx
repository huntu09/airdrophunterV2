"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send, TestTube } from "lucide-react"

export function NotificationTester() {
  const [title, setTitle] = useState("🎯 New Airdrop Alert!")
  const [body, setBody] = useState("Arbitrum Odyssey Phase 2 is now live. Potential reward: $200+")
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  const sendTestNotification = async () => {
    if (!title || !body) {
      toast({
        title: "❌ Error",
        description: "Title and body are required",
        variant: "destructive",
      })
      return
    }

    setSending(true)

    try {
      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          icon: "/android-chrome-192x192.png",
          url: "/latest",
          badge: "/android-chrome-96x96.png",
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "✅ Notification Sent!",
          description: `Sent to ${result.sent} subscribers`,
        })
      } else {
        throw new Error(result.error || "Failed to send notification")
      }
    } catch (error) {
      console.error("Send notification error:", error)
      toast({
        title: "❌ Send Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Test Push Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title" />
        </div>

        <div>
          <label className="text-sm font-medium">Body</label>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Notification body" rows={3} />
        </div>

        <Button onClick={sendTestNotification} disabled={sending} className="w-full">
          {sending ? (
            "Sending..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Test Notification
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
