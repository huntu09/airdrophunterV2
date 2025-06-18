"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OptimizedImage } from "./optimized-image"

export function DebugImageTester() {
  const [testUrl, setTestUrl] = useState(
    "https://uwurckturdsgtxbfcqoy.supabase.co/storage/v1/object/public/airdrop-assets/logos/airdrop-1750093090320.jpg",
  )
  const [testResults, setTestResults] = useState<any[]>([])

  const testImage = async (url: string) => {
    const startTime = Date.now()

    try {
      // Test 1: Fetch request
      const fetchResponse = await fetch(url, { method: "HEAD" })
      const fetchTime = Date.now() - startTime

      // Test 2: Image load test
      const img = new Image()
      img.crossOrigin = "anonymous"

      const imageLoadPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve({ success: true, time: Date.now() - startTime })
        img.onerror = () => reject({ success: false, time: Date.now() - startTime })
      })

      img.src = url
      const imageResult = await imageLoadPromise

      const result = {
        url,
        timestamp: new Date().toISOString(),
        fetchStatus: fetchResponse.status,
        fetchTime,
        imageLoad: imageResult,
        headers: Object.fromEntries(fetchResponse.headers.entries()),
      }

      setTestResults((prev) => [result, ...prev.slice(0, 4)])
    } catch (error) {
      const result = {
        url,
        timestamp: new Date().toISOString(),
        error: error.message,
        time: Date.now() - startTime,
      }

      setTestResults((prev) => [result, ...prev.slice(0, 4)])
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🔍 Image Debug Tester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input value={testUrl} onChange={(e) => setTestUrl(e.target.value)} placeholder="Enter image URL to test" />
          <Button onClick={() => testImage(testUrl)}>Test</Button>
        </div>

        {/* Visual Test */}
        <div className="border rounded p-4">
          <h4 className="font-semibold mb-2">Visual Test:</h4>
          <OptimizedImage src={testUrl} alt="Test Image" width={100} height={100} className="rounded" />
        </div>

        {/* Test Results */}
        <div className="space-y-2">
          <h4 className="font-semibold">Test Results:</h4>
          {testResults.map((result, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
              <div className="font-mono text-xs mb-2">{result.timestamp}</div>
              <div className="grid grid-cols-2 gap-2">
                <div>Status: {result.fetchStatus || "ERROR"}</div>
                <div>Time: {result.fetchTime || result.time}ms</div>
                <div>Image Load: {result.imageLoad?.success ? "✅" : "❌"}</div>
                <div>CORS: {result.headers?.["access-control-allow-origin"] ? "✅" : "❌"}</div>
              </div>
              {result.error && <div className="text-red-500 mt-2">Error: {result.error}</div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
