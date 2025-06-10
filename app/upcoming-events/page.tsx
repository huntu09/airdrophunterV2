"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, Clock, MapPin, Users, ExternalLink, Bell, Star, Zap, Gift } from "lucide-react"
import Link from "next/link"

export default function UpcomingEventsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const upcomingEvents = [
    {
      id: 1,
      title: "Ethereum Layer 2 Summit",
      description: "Major announcements expected for L2 scaling solutions with potential airdrops",
      date: "2024-02-15",
      time: "14:00 UTC",
      location: "Virtual Event",
      category: "Conference",
      priority: "high",
      expectedAirdrops: ["Arbitrum Nova", "Optimism Bedrock", "Polygon zkEVM"],
      participants: "10K+",
      image: "🚀",
    },
    {
      id: 2,
      title: "DeFi Protocol Launch",
      description: "New lending protocol launching with retroactive airdrop for early users",
      date: "2024-02-20",
      time: "12:00 UTC",
      location: "Mainnet Launch",
      category: "Launch",
      priority: "high",
      expectedAirdrops: ["LendMax Token"],
      participants: "5K+",
      image: "💰",
    },
    {
      id: 3,
      title: "NFT Marketplace Beta",
      description: "New NFT marketplace entering beta phase with user rewards program",
      date: "2024-02-25",
      time: "16:00 UTC",
      location: "Beta Platform",
      category: "Beta Launch",
      priority: "medium",
      expectedAirdrops: ["ArtChain Token"],
      participants: "2K+",
      image: "🎨",
    },
    {
      id: 4,
      title: "Cross-Chain Bridge Event",
      description: "Multi-chain bridge protocol announcing tokenomics and airdrop details",
      date: "2024-03-01",
      time: "18:00 UTC",
      location: "Discord AMA",
      category: "AMA",
      priority: "medium",
      expectedAirdrops: ["BridgeX Token"],
      participants: "8K+",
      image: "🌉",
    },
    {
      id: 5,
      title: "GameFi Tournament",
      description: "Play-to-earn gaming tournament with exclusive NFT and token rewards",
      date: "2024-03-05",
      time: "20:00 UTC",
      location: "Gaming Platform",
      category: "Tournament",
      priority: "low",
      expectedAirdrops: ["GameToken", "Exclusive NFTs"],
      participants: "15K+",
      image: "🎮",
    },
    {
      id: 6,
      title: "DAO Governance Launch",
      description: "Decentralized governance platform launching with governance token distribution",
      date: "2024-03-10",
      time: "15:00 UTC",
      location: "DAO Platform",
      category: "Governance",
      priority: "high",
      expectedAirdrops: ["GOV Token"],
      participants: "3K+",
      image: "🗳️",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 text-red-500"
      case "medium":
        return "border-yellow-500 text-yellow-500"
      case "low":
        return "border-green-500 text-green-500"
      default:
        return "border-gray-500 text-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntil = (dateString: string) => {
    const today = new Date()
    const eventDate = new Date(dateString)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div
        className={`sticky top-0 z-40 ${theme === "dark" ? "bg-gray-800/95" : "bg-white/95"} backdrop-blur-sm border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors duration-200`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Stay ahead of the curve with upcoming crypto events, launches, and airdrop opportunities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 text-sm border-purple-500 text-purple-500">
              <Calendar className="w-4 h-4 mr-2" />
              Live Updates
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-pink-500 text-pink-500">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card
            className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} text-center`}
          >
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-500">6</div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Upcoming Events</div>
            </CardContent>
          </Card>
          <Card
            className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} text-center`}
          >
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-pink-500">43K+</div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Total Participants
              </div>
            </CardContent>
          </Card>
          <Card
            className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} text-center`}
          >
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">12</div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Expected Airdrops</div>
            </CardContent>
          </Card>
          <Card
            className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} text-center`}
          >
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">3</div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>High Priority</div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {upcomingEvents.map((event) => {
            const daysUntil = getDaysUntil(event.date)
            return (
              <Card
                key={event.id}
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-all duration-300 hover:scale-[1.01]`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Event Icon & Priority */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl mb-2">
                        {event.image}
                      </div>
                      <div className="flex justify-center">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`}></div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {event.title}
                          </h3>
                          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-3`}>
                            {event.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className={getPriorityBadge(event.priority)}>
                            {event.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="border-blue-500 text-blue-500">
                            {event.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Event Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <div>
                            <div className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {formatDate(event.date)}
                            </div>
                            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              {daysUntil > 0 ? `${daysUntil} days left` : daysUntil === 0 ? "Today!" : "Past event"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-pink-500" />
                          <div>
                            <div className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {event.time}
                            </div>
                            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              UTC Time
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {event.location}
                            </div>
                            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              <Users className="w-3 h-3 inline mr-1" />
                              {event.participants}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expected Airdrops */}
                      <div className="mb-4">
                        <h4
                          className={`text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
                          Expected Airdrops:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {event.expectedAirdrops.map((airdrop, idx) => (
                            <Badge key={idx} variant="outline" className="border-green-500 text-green-500">
                              <Gift className="w-3 h-3 mr-1" />
                              {airdrop}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                          <Bell className="w-4 h-4 mr-2" />
                          Set Reminder
                        </Button>
                        <Button
                          variant="outline"
                          className={`${theme === "dark" ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                        <Button
                          variant="outline"
                          className={`${theme === "dark" ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Add to Favorites
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card
            className={`${theme === "dark" ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600" : "bg-gradient-to-r from-purple-50 to-pink-50 border-gray-200"} p-8`}
          >
            <CardContent>
              <Zap className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Never Miss an Opportunity
              </h2>
              <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Get notified about upcoming events and airdrop opportunities directly to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3">
                  <Bell className="w-4 h-4 mr-2" />
                  Enable Notifications
                </Button>
                <Link href="/">
                  <Button
                    variant="outline"
                    className={`px-8 py-3 ${theme === "dark" ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                  >
                    Browse Airdrops
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer theme={theme} />
    </div>
  )
}
