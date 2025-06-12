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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; frame-src https://googleads.g.doubleclick.net https://www.google.com; connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net;",
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
