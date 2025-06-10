"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { debugSupabaseConnection, checkSupabaseTables } from "@/lib/debug-supabase"

export default function DebugPage() {
  const [debugOutput, setDebugOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState(false)

  const runDebug = async () => {
    setIsRunning(true)
    setDebugOutput("Running debug tests...\n")

    // Capture console output
    const originalLog = console.log
    const originalError = console.error
    let output = ""

    console.log = (...args) => {
      output += args.join(" ") + "\n"
      originalLog(...args)
    }

    console.error = (...args) => {
      output += "ERROR: " + args.join(" ") + "\n"
      originalError(...args)
    }

    try {
      await debugSupabaseConnection()
      await checkSupabaseTables()
    } catch (err) {
      output += `EXCEPTION: ${err}\n`
    }

    // Restore console
    console.log = originalLog
    console.error = originalError

    setDebugOutput(output)
    setIsRunning(false)
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Supabase Debug Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={runDebug} disabled={isRunning}>
              {isRunning ? "Running..." : "Run Debug Test"}
            </Button>

            {debugOutput && (
              <div className="bg-black text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {debugOutput}
              </div>
            )}

            <div className="text-sm text-gray-600">
              <h3 className="font-semibold mb-2">What this tool checks:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Environment variables configuration</li>
                <li>Supabase URL format validation</li>
                <li>Network connectivity to Supabase</li>
                <li>API key authentication</li>
                <li>Database table existence</li>
                <li>Basic query functionality</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
