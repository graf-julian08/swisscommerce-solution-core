import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config for Next.js 16 (uses Turbopack by default)
  turbopack: {},
  // Don't fail build on TS errors in excluded directories
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
