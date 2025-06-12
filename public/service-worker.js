const CACHE_NAME = "airdrophunter-v1"
const STATIC_CACHE_URLS = ["/", "/offline", "/manifest.json"]

// AdSense domains to exclude from caching
const ADSENSE_PATTERNS = [
  /googleads\.g\.doubleclick\.net/,
  /googlesyndication\.com/,
  /googleadservices\.com/,
  /google\.com\/adsense/,
  /pagead2\.googlesyndication\.com/,
  /tpc\.googlesyndication\.com/,
]

// Install event
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker installing...")
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Caching static assets")
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => {
        console.log("✅ Service Worker installed")
        return self.skipWaiting()
      }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker activating...")
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("🗑️ Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("✅ Service Worker activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip AdSense requests - let them go directly to network
  if (ADSENSE_PATTERNS.some((pattern) => pattern.test(url.href))) {
    console.log("🚫 Skipping cache for AdSense:", url.href)
    return // Let it go to network directly
  }

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Skip API routes
  if (url.pathname.startsWith("/api/")) {
    return
  }

  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        // Return cached version or fetch from network
        return (
          response ||
          fetch(request).then((fetchResponse) => {
            // Don't cache if it's not a successful response
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== "basic") {
              return fetchResponse
            }

            // Clone the response
            const responseToCache = fetchResponse.clone()

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })

            return fetchResponse
          })
        )
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (request.mode === "navigate") {
          return caches.match("/offline")
        }
      }),
  )
})

// Handle messages from main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "EXCLUDE_FROM_CACHE") {
    console.log("📝 Received cache exclusion patterns")
    // Patterns already defined above
  }
})
