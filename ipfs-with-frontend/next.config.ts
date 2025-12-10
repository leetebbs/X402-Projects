import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Edge Function size
  experimental: {
    optimizePackageImports: ['x402-next'],
  },
};

export default nextConfig;
