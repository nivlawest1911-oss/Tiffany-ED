import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* config options here */
  // output: 'export', // Disabled for dynamic server deployment via GitHub Actions
  // reactCompiler: true // Temporarily disabling experimental compiler if it causes issues, but leaving as is if it was there. Actually user had it.
  // Ideally, reactCompiler: true is fine. 
  reactCompiler: true,
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
