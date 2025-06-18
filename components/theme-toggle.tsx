"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-full p-1 flex items-center gap-1 shadow-lg">
        <div className="rounded-full px-3 py-1 text-xs w-12 h-8"></div>
        <div className="rounded-full px-3 py-1 text-xs w-12 h-8"></div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-full p-1 flex items-center gap-1 shadow-lg border border-gray-200 dark:border-gray-700">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
        className={`rounded-full px-3 py-1 text-xs transition-all ${
          theme === "light"
            ? "bg-gray-900 text-white shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <Sun className="h-3 w-3 mr-1" />
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
        className={`rounded-full px-3 py-1 text-xs transition-all ${
          theme === "dark"
            ? "bg-gray-900 text-white shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <Moon className="h-3 w-3 mr-1" />
        Dark
      </Button>
    </div>
  )
}
