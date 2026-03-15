/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { dev, isServer }) => {
        // Configure cache to handle large strings without warnings
        if (dev && config.cache) {
            config.cache = {
                ...config.cache,
                type: 'filesystem',
                compression: 'gzip',
                maxMemoryGenerations: 1,
            };
        }
        // Suppress infrastructure logging warnings
        config.infrastructureLogging = {
            ...config.infrastructureLogging,
            level: 'error',
        };
        return config;
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**.supabase.co' },
            { protocol: 'https', hostname: '**.vercel-storage.com' },
            { protocol: 'https', hostname: '**.googleusercontent.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'www.transparenttextures.com' },
            { protocol: 'https', hostname: 'api.dicebear.com' }
        ],
    },
    serverExternalPackages: ['@google-cloud/bigquery', '@google-cloud/common'],
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/the-room',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
