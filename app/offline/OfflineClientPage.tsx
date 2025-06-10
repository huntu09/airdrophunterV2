"use client"

import { Wifi, RefreshCw, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OfflineClientPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
            <Wifi className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">You're Offline</h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          No internet connection detected. Don't worry, you can still browse cached airdrops and use some features
          offline.
        </p>

        {/* Offline Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Available Offline:</h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Browse cached airdrops</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>View safety guides</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Read how-to guides</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Limited search functionality</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={() => window.location.reload()} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/safety-guide">
                <Search className="w-4 h-4 mr-2" />
                Safety Guide
              </Link>
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            💡 <strong>Tip:</strong> Install our app for better offline experience and faster loading!
          </p>
        </div>

        {/* Auto-retry indicator */}
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">Checking connection automatically...</div>
      </div>

      {/* Auto-retry script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Auto-retry connection every 30 seconds
            setInterval(() => {
              if (navigator.onLine) {
                window.location.href = '/';
              }
            }, 30000);
            
            // Listen for online event
            window.addEventListener('online', () => {
              window.location.href = '/';
            });
          `,
        }}
      />
    </div>
  )
}
