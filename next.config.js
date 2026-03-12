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
            { protocol: 'https', hostname: '**.supabase.co' },
            { protocol: 'https', hostname: '**.vercel-storage.com' },
            { protocol: 'https', hostname: '**.googleusercontent.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'www.transparenttextures.com' },
            { protocol: 'https', hostname: 'api.dicebear.com' }
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
        serverComponentsExternalPackages: ['@google-cloud/bigquery', '@google-cloud/common'],
    },
    webpack: (config, { dev, isServer }) => {
        // Fix for "Serializing big strings" webpack cache warning
        // The warning occurs when webpack caches strings larger than ~100KB
        // Setting cache type to memory avoids filesystem serialization issues
        if (dev) {
            config.cache = {
                type: 'memory',
            };
        }
        
        return config;
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
