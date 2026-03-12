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
    },
    serverExternalPackages: ['@google-cloud/bigquery', '@google-cloud/common'],
    // Optimal Webpack configuration for large-scale AI applications
    webpack: (config, { dev, isServer }) => {
        // Critical: Neutralize problematic server-only modules in client-side
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@google-cloud/bigquery': false,
                '@google-cloud/common': false,
            };

            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                child_process: false,
                crypto: false,
                http: false,
                https: false,
                os: false,
                path: false,
                stream: false,
                zlib: false,
                dns: false,
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
