"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SupabaseDebugPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResults(null)

    try {
      // Test environment variables
      const envTest = {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        anonKeyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) + "...",
      }

      console.log("🔍 Environment Test:", envTest)

      // Test basic fetch to Supabase
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (!url) {
        throw new Error("NEXT_PUBLIC_SUPABASE_URL not set")
      }

      // Test 1: Basic URL accessibility
      const basicTest = await fetch(`${url}/rest/v1/`, {
        method: "HEAD",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        },
      })
        .then((res) => ({
          status: res.status,
          ok: res.ok,
          headers: Object.fromEntries(res.headers.entries()),
        }))
        .catch((err) => ({
          error: err.message,
          type: err.constructor.name,
        }))

      // Test 2: Supabase client test
      let supabaseTest
      try {
        const { createClient } = await import("@supabase/supabase-js")
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

        const { data, error } = await supabase.from("airdrops").select("id").limit(1)
        supabaseTest = { data, error: error?.message }
      } catch (err: any) {
        supabaseTest = { error: err.message, type: err.constructor.name }
      }

      // Test 3: CORS test
      const corsTest = await fetch(`${url}/rest/v1/airdrops?select=id&limit=1`, {
        method: "GET",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => ({
          status: res.status,
          ok: res.ok,
          data: res.ok ? res.json() : null,
        }))
        .catch((err) => ({
          error: err.message,
          type: err.constructor.name,
        }))

      setResults({
        envTest,
        basicTest,
        supabaseTest,
        corsTest,
        timestamp: new Date().toISOString(),
      })
    } catch (err: any) {
      setResults({
        error: err.message,
        type: err.constructor.name,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Supabase Connection Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testConnection} disabled={loading}>
            {loading ? "Testing..." : "Test Supabase Connection"}
          </Button>

          {results && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Environment Variables</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <pre>{JSON.stringify(results.envTest, null, 2)}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Basic URL Test</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <pre>{JSON.stringify(results.basicTest, null, 2)}</pre>
                </div>
                <Badge variant={results.basicTest?.ok ? "default" : "destructive"}>
                  {results.basicTest?.ok ? "PASS" : "FAIL"}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Supabase Client Test</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <pre>{JSON.stringify(results.supabaseTest, null, 2)}</pre>
                </div>
                <Badge variant={results.supabaseTest?.error ? "destructive" : "default"}>
                  {results.supabaseTest?.error ? "FAIL" : "PASS"}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-2">CORS Test</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <pre>{JSON.stringify(results.corsTest, null, 2)}</pre>
                </div>
                <Badge variant={results.corsTest?.ok ? "default" : "destructive"}>
                  {results.corsTest?.ok ? "PASS" : "FAIL"}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>🛠️ Troubleshooting Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Check Supabase Project Status:</strong> Make sure your Supabase project is active (not paused)
            </li>
            <li>
              <strong>Verify URL:</strong> Should be like https://your-project-id.supabase.co
            </li>
            <li>
              <strong>Check API Key:</strong> Should start with 'eyJ'
            </li>
            <li>
              <strong>CORS Settings:</strong> Add your domain to allowed origins in Supabase dashboard
            </li>
            <li>
              <strong>RLS Policies:</strong> Make sure Row Level Security allows public access to airdrops table
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
