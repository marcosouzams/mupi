import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to enable ISR (Incremental Static Regeneration)
  // This allows pages to be regenerated in the background while keeping static benefits
  trailingSlash: true,
  images: {
    // Enable image optimization with allowed external domains
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mupisystems.com.br',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
    ],
  },
  // Security headers for better SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
