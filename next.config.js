/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
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