"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Flame, TrendingUp, Calendar, BookOpen, Wallet, Shield, HelpCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Latest", href: "/latest", icon: Calendar },
  { name: "Hottest", href: "/hottest", icon: Flame },
  { name: "Potential", href: "/potential", icon: TrendingUp },
  { name: "Guide", href: "/guide", icon: BookOpen },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Security", href: "/security", icon: Shield },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
]

export function MobileNavigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <div className="w-8 h-8 bg-[#7cb342] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AH</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">AirdropHunter</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your Crypto Co-pilot</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium transition-colors min-h-[56px]", // Large touch target
                          isActive
                            ? "bg-[#7cb342] text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <item.icon className="h-6 w-6 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 AirdropHunter</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Your Crypto Co-pilot</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
