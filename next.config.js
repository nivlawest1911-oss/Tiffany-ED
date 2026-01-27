// Force Vercel Cache Invalidation: Removed carbon fibre constant value
/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
            {
                protocol: 'https',
                hostname: '**.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',
            }
        ],
    },
    // Turbo is enabled via CLI flags in v16, keeping config clean
};

module.exports = nextConfig;