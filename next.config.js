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
            { protocol: 'https', hostname: 'www.transparenttextures.com' }
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
        // Enable optimized package imports for faster builds
        optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
    },
    serverExternalPackages: ['@google-cloud/bigquery'],
    // Optimal Webpack configuration for large-scale AI applications
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            // Memory optimization for client-side bundling
            config.cache = {
                type: 'filesystem',
                buildDependencies: {
                    config: [__filename],
                },
            };

            // Handle large strings/assets more efficiently
            config.performance = {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000,
            };
        }

        // Critical: Provide fallbacks for node modules in client-side
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }

        return config;
    },
};

module.exports = nextConfig;