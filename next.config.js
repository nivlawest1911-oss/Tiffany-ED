/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactCompiler: true, // Unavailable in Next.js 14, removing to fix build
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

// Force rebuild for Vercel Env Var propagation 2026-01-06
module.exports = nextConfig;
