"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Rocket, Gift, Shield, Trophy, ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const TOUR_STEPS = [
  {
    title: "Welcome to AirdropHunter! 🚀",
    description: "Your #1 platform for discovering free crypto airdrops and earning tokens. Let's show you around!",
    icon: <Rocket className="h-12 w-12 text-blue-500" />,
    color: "bg-blue-500/10",
  },
  {
    title: "Discover Free Airdrops 🎁",
    description:
      "Browse hundreds of verified airdrops and filter by category, status, or rewards to find the perfect opportunities.",
    icon: <Gift className="h-12 w-12 text-green-500" />,
    color: "bg-green-500/10",
  },
  {
    title: "Stay Safe & Secure 🛡️",
    description: "All airdrops are verified by our team. Follow our step-by-step guides to participate safely.",
    icon: <Shield className="h-12 w-12 text-purple-500" />,
    color: "bg-purple-500/10",
  },
  {
    title: "Track Your Progress 🏆",
    description: "Create an account to track your participation and get notified about new high-value airdrops.",
    icon: <Trophy className="h-12 w-12 text-amber-500" />,
    color: "bg-amber-500/10",
  },
]

export function WelcomeTour() {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTour, setHasSeenTour] = useState(true) // Default to true to prevent flash

  useEffect(() => {
    // Check if user has seen the tour before
    const tourSeen = localStorage.getItem("airdrophunter_tour_seen")

    if (!tourSeen) {
      setHasSeenTour(false)
      setOpen(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTour()
    }
  }

  const completeTour = () => {
    localStorage.setItem("airdrophunter_tour_seen", "true")
    setOpen(false)
  }

  const handleSkip = () => {
    completeTour()
  }

  // If user has seen tour, don't render anything
  if (hasSeenTour) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">{TOUR_STEPS[currentStep].title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          <div className={cn("rounded-full p-6 mb-4", TOUR_STEPS[currentStep].color)}>
            {TOUR_STEPS[currentStep].icon}
          </div>

          <p className="text-center text-muted-foreground">{TOUR_STEPS[currentStep].description}</p>

          {/* Progress dots */}
          <div className="flex space-x-2 mt-8">
            {TOUR_STEPS.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  currentStep === index ? "bg-primary w-4" : "bg-gray-300 dark:bg-gray-600",
                )}
              />
            ))}
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
            Skip
          </Button>

          <Button onClick={handleNext} className="gap-2">
            {currentStep < TOUR_STEPS.length - 1 ? (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </DialogFooter>

        {/* Close button */}
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={handleSkip}>
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
