"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Airdrop } from "@/lib/api" // Import only the type

export default function ComparePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [loading, setLoading] = useState(true)
  const [airdrops, setAirdrops] = useState<Airdrop[]>([])
  const [selectedAirdrops, setSelectedAirdrops] = useState<Airdrop[]>([])
  const [availableAirdrops, setAvailableAirdrops] = useState<Airdrop[]>([])

  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        setLoading(true)

        // Dynamically import AirdropAPI to prevent build-time errors
        if (
          typeof window !== "undefined" &&
          process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ) {
          const { AirdropAPI } = await import("@/lib/api")
          const data = await AirdropAPI.getAirdrops()
          setAirdrops(data)
          setAvailableAirdrops(data)

          // Pre-select first two airdrops for comparison
          if (data.length >= 2) {
            setSelectedAirdrops([data[0], data[1]])
            setAvailableAirdrops(data.filter((a) => a.id !== data[0].id && a.id !== data[1].id))
          } else if (data.length === 1) {
            setSelectedAirdrops([data[0]])
            setAvailableAirdrops([])
          }
        } else {
          // Fallback to mock data if Supabase is not configured
          console.log("Supabase not configured, using mock data")
          const mockData: Airdrop[] = [
            {
              id: "1",
              name: "Example Airdrop 1",
              slug: "example-1",
              description: "Example description",
              status: "UPCOMING",
              estimatedValue: 500,
              participants: 10000,
              requirements: ["Hold tokens", "Use platform"],
              snapshotDate: "2025-07-01",
              created_at: new Date().toISOString(),
              category_id: "1",
              logo: "/placeholder.svg?height=100&width=100",
              website: "https://example.com",
              twitter: "https://twitter.com/example",
              telegram: "https://t.me/example",
            },
            {
              id: "2",
              name: "Example Airdrop 2",
              slug: "example-2",
              description: "Another example",
              status: "CONFIRMED",
              estimatedValue: 1000,
              participants: 5000,
              requirements: ["Stake tokens", "Complete tasks"],
              snapshotDate: "2025-08-15",
              created_at: new Date().toISOString(),
              category_id: "2",
              logo: "/placeholder.svg?height=100&width=100",
              website: "https://example2.com",
              twitter: "https://twitter.com/example2",
              telegram: "https://t.me/example2",
            },
          ]
          setAirdrops(mockData)
          setSelectedAirdrops([mockData[0], mockData[1]])
          setAvailableAirdrops([])
        }
      } catch (error) {
        console.error("Error fetching airdrops:", error)
        setAirdrops([])
        setSelectedAirdrops([])
      } finally {
        setLoading(false)
      }
    }

    fetchAirdrops()
  }, [])

  const addAirdrop = () => {
    if (selectedAirdrops.length < 3 && availableAirdrops.length > 0) {
      const airdropToAdd = availableAirdrops[0]
      setSelectedAirdrops([...selectedAirdrops, airdropToAdd])
      setAvailableAirdrops(availableAirdrops.filter((a) => a.id !== airdropToAdd.id))
    }
  }

  const removeAirdrop = (airdrop: Airdrop) => {
    setSelectedAirdrops(selectedAirdrops.filter((a) => a.id !== airdrop.id))
    setAvailableAirdrops([...availableAirdrops, airdrop])
  }

  const changeAirdrop = (index: number, airdropId: string) => {
    const oldAirdrop = selectedAirdrops[index]
    const newAirdrop = airdrops.find((a) => a.id === airdropId)

    if (newAirdrop) {
      const updatedSelected = [...selectedAirdrops]
      updatedSelected[index] = newAirdrop
      setSelectedAirdrops(updatedSelected)

      // Update available airdrops
      setAvailableAirdrops([
        ...availableAirdrops.filter((a) => a.id !== airdropId),
        ...(oldAirdrop ? [oldAirdrop] : []),
      ])
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "UPCOMING":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "ENDED":
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-600"
      case "UPCOMING":
        return "bg-blue-600"
      case "ENDED":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Compare Airdrops</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading airdrops...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 mb-8">
            {selectedAirdrops.map((airdrop, index) => (
              <Card key={airdrop.id} className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl">{airdrop.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={airdrop.id} onValueChange={(value) => changeAirdrop(index, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select airdrop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={airdrop.id}>{airdrop.name}</SelectItem>
                        {availableAirdrops.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={() => removeAirdrop(airdrop)}>
                      Remove
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(airdrop.status)}
                        <span>{airdrop.status}</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium">Estimated Value:</span>
                      <span className="ml-2">${airdrop.estimatedValue}</span>
                    </div>

                    <div>
                      <span className="font-medium">Participants:</span>
                      <span className="ml-2">{airdrop.participants.toLocaleString()}</span>
                    </div>

                    <div>
                      <span className="font-medium">Requirements:</span>
                      <ul className="list-disc list-inside mt-1">
                        {airdrop.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-medium">Snapshot Date:</span>
                      <span className="ml-2">{airdrop.snapshotDate || "Not announced"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {selectedAirdrops.length < 3 && availableAirdrops.length > 0 && (
              <Button
                onClick={addAirdrop}
                className="h-64 w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
                variant="outline"
              >
                Add Airdrop to Compare
              </Button>
            )}
          </div>

          {selectedAirdrops.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Comparison Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Estimated Value Comparison</h3>
                    <div className="flex gap-4">
                      {selectedAirdrops.map((airdrop) => (
                        <div key={airdrop.id} className="flex-1">
                          <p className="font-medium">{airdrop.name}</p>
                          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md mt-1 overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${Math.min(100, (airdrop.estimatedValue / Math.max(...selectedAirdrops.map((a) => a.estimatedValue))) * 100)}%`,
                              }}
                            />
                          </div>
                          <p className="mt-1">${airdrop.estimatedValue}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Participants Comparison</h3>
                    <div className="flex gap-4">
                      {selectedAirdrops.map((airdrop) => (
                        <div key={airdrop.id} className="flex-1">
                          <p className="font-medium">{airdrop.name}</p>
                          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md mt-1 overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${Math.min(100, (airdrop.participants / Math.max(...selectedAirdrops.map((a) => a.participants))) * 100)}%`,
                              }}
                            />
                          </div>
                          <p className="mt-1">{airdrop.participants.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
