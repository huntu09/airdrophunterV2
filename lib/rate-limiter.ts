// ✅ Rate limiting implementation
import type { NextRequest } from "next/server"

const rateLimitMap = new Map()

export function rateLimit(request: NextRequest, limit = 10, window = 60000) {
  const ip = request.ip || "anonymous"
  const now = Date.now()
  const windowStart = now - window

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const requests = rateLimitMap.get(ip)
  const validRequests = requests.filter((time: number) => time > windowStart)

  if (validRequests.length >= limit) {
    return false
  }

  validRequests.push(now)
  rateLimitMap.set(ip, validRequests)
  return true
}

// Specialized rate limiter for ratings
export function ratingRateLimit(request: NextRequest) {
  // Stricter limits for rating submissions
  return rateLimit(request, 5, 60000) // 5 ratings per minute
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  const oneHourAgo = now - 3600000 // 1 hour

  for (const [ip, requests] of rateLimitMap.entries()) {
    const validRequests = requests.filter((time: number) => time > oneHourAgo)
    if (validRequests.length === 0) {
      rateLimitMap.delete(ip)
    } else {
      rateLimitMap.set(ip, validRequests)
    }
  }
}, 300000) // Clean up every 5 minutes
