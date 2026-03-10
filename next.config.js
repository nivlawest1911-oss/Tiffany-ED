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
        // PPR requires Next.js canary for the experimental flag. 
        // Architecture is ready (Suspense boundaries implemented).
        ppr: false,
        serverActions: {
            bodySizeLimit: '10mb',
        },
        // Enable optimized package imports for faster builds
        optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
    },
    serverExternalPackages: ['@google-cloud/bigquery', '@google-cloud/common'],
    // Optimal Webpack configuration for large-scale AI applications
    webpack: (config, { dev, isServer, webpack: _webpack }) => {
        // Configure cache to handle large strings (e.g., Prisma client) more efficiently
        // This addresses the "Serializing big strings" warning
        if (dev) {
            config.cache = {
                type: 'filesystem',
                buildDependencies: {
                    config: [__filename],
                },
                compression: false, // Disable compression in dev for faster rebuilds
                maxMemoryGenerations: 1, // Reduce memory pressure from cache generations
            };
            
            // Increase threshold for big string warning (default is 100KB)
            config.infrastructureLogging = {
                ...config.infrastructureLogging,
                level: 'error', // Only show errors, not warnings like big strings
            };
        }
        
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
};

module.exports = nextConfig;
