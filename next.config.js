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
    webpack: (config) => {
        // Suppress the webpack cache warning for large strings
        // This prevents the "Serializing big strings" warning
        config.infrastructureLogging = {
            ...config.infrastructureLogging,
            level: 'error',
        };
        
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
