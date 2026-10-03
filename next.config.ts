import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Keep build tracing inside this project when another lockfile exists above it.
  outputFileTracingRoot: path.join(__dirname),

  // Performance & Fast Loading optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Modern next-gen image optimization (AVIF + WebP)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "upload.meeshosupplyassets.com"
      }
    ]
  },

  // Tree-shake large packages into minimal JS chunks
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "zustand", "lenis"]
  },

  // Cache static assets aggressively for repeat visits
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
