"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            <WifiOff className="h-8 w-8 text-gray-600 dark:text-gray-400" />
          </div>
          <CardTitle className="text-2xl font-bold">You're Offline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            No internet connection detected. Some features may not be available.
          </p>

          <div className="space-y-2">
            <Button onClick={() => window.location.reload()} className="w-full" variant="default">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>You can still browse cached airdrops while offline.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
