/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  // This prevents the build from failing on Firebase auth pages
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;
