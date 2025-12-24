import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // THIS IS THE KEY FIX
  experimental: {
    // We removed the invalid 'missingSuspenseWithCSRBailout' key that caused warnings
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
