import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {
    // Force Turbopack to treat this specific folder as the root
    root: path.join(__dirname), 
  },
};

export default nextConfig;
