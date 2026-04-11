/** @type {import('next').NextConfig} */
const nextConfig = {
    // Core settings
    compress: true,
    poweredByHeader: false,
    generateEtags: true,

    // Image optimization with modern formats
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30,
        remotePatterns: [
            { protocol: 'https', hostname: '**.supabase.co' },
            { protocol: 'https', hostname: '**.vercel-storage.com' },
            { protocol: 'https', hostname: '**.googleusercontent.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'www.transparenttextures.com' },
            { protocol: 'https', hostname: 'api.dicebear.com' },
            { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' }
        ],
    },

    // Webpack optimization
    webpack: (config, { dev, isServer: _isServer }) => {
        if (dev && config.cache) {
            config.cache = {
                ...config.cache,
                type: 'filesystem',
                compression: 'gzip',
                maxMemoryGenerations: 1,
                // Suppress big string serialization warnings
                maxAge: 5184000000,
            };
        }
        // Suppress big string serialization warnings entirely
        config.infrastructureLogging = {
            level: 'error',
        };
        // Suppress PackFileCacheStrategy warnings
        config.ignoreWarnings = [
            ...(config.ignoreWarnings || []),
            /webpack\.cache\.PackFileCacheStrategy/,
            /Serializing big strings/,
        ];
        if (!dev) {
            config.optimization = {
                ...config.optimization,
                usedExports: true,
                sideEffects: true,
            };
        }
        return config;
    },

    serverExternalPackages: ['@google-cloud/bigquery', '@google-cloud/common'],

    // HTTP caching headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
                ],
            },
            {
                source: '/images/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                source: '/_next/static/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                source: '/fonts/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                source: '/api/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=300' }],
            },
        ];
    },

    // URL redirects
    async redirects() {
        return [
            { source: '/dashboard', destination: '/the-room', permanent: true },
            { source: '/all-tools', destination: '/admin/tools', permanent: true },
            { source: '/activity', destination: '/ledger', permanent: true },
        ];
    },

    // URL rewrites
    async rewrites() {
        return [
            { source: '/dashboard/generator/foundry', destination: '/generator/foundry' },
            { source: '/ai-hub/legal-defense', destination: '/ai-hub/legal-defense' },
        ];
    },

    // Valid experimental features only
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            '@radix-ui/react-icons',
            'recharts',
            'framer-motion',
            'date-fns',
            'lodash',
            '@heroicons/react',
        ],
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

module.exports = nextConfig;
