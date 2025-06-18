/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uwurckturdsgtxbfcqoy.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      }
    ],
    domains: [
      'uwurckturdsgtxbfcqoy.supabase.co',
      'images.unsplash.com',
      'via.placeholder.com',
      'placeholder.com'
    ],
    unoptimized: true,
  },
  // Fixed: Updated to new Next.js 15 config
  serverExternalPackages: ['@supabase/supabase-js']
}

export default nextConfig
