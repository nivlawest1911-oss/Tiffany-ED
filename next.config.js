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

module.exports = nextConfig;
