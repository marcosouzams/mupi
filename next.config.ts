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
    ],
  },
  /* config options here */
};

export default nextConfig;
