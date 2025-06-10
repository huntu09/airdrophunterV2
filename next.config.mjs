/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA Configuration
  async headers() {
    return [
      {
        source: '/service-worker.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
  
  // Enable experimental features for PWA
  experimental: {
    webpackBuildWorker: true,
  },

  // Image optimization
  images: {
    domains: ['api.coingecko.com', 'assets.coingecko.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },

  // Compression
  compress: true,

  // Security headers
  poweredByHeader: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
