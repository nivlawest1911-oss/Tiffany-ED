const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Compression settings
    compress: true,
    
    // Powered by header removal for security
    poweredByHeader: false,
    
    // Generate ETags for caching
    generateEtags: true,
    
    webpack: (config, { dev, isServer: _isServer }) => {
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
        
        // Tree shaking optimizations
        if (!dev) {
            config.optimization = {
                ...config.optimization,
                usedExports: true,
                sideEffects: true,
            };
        }
        
        return config;
    },
    images: {
        // Modern image formats for better compression
        formats: ['image/avif', 'image/webp'],
        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Minimize processing time
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
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
    serverExternalPackages: ['@google-cloud/bigquery', '@google-cloud/common'],
    experimental: {
        // Optimized package imports for tree-shaking
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
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    }
                ],
            },
            // Static assets - long cache
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
            // Fonts
            {
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
            // API routes - short cache with revalidation
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, s-maxage=60, stale-while-revalidate=300'
                    }
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/the-room',
                permanent: true,
            },
            {
                source: '/all-tools',
                destination: '/admin/tools',
                permanent: true,
            },
            {
                source: '/activity',
                destination: '/ledger',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/dashboard/generator/foundry',
                destination: '/generator/foundry',
            },
            {
                source: '/ai-hub/legal-defense',
                destination: '/ai-hub/legal-defense', // Redundant but explicit for clarity
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = withBundleAnalyzer(nextConfig);
