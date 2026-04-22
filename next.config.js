/** @type {import('next').NextConfig} */
const nextConfig = {
    // Core settings
    compress: true,
    poweredByHeader: false,
    generateEtags: true,

    // Performance & Bundle Optimization
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },


    webpack: (config, { dev, isServer, webpack }) => {
        // Prevent prisma and auth from being bundled into client-side code
        if (!isServer) {
            config.resolve.alias['@/lib/prisma'] = false;
            config.resolve.alias['@/lib/auth'] = false;
            config.resolve.alias['@prisma/client'] = false;
            config.resolve.alias['@generated/prisma/client'] = false;
            
            // Explicitly ignore node:* schemes on the client
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                os: false,
                crypto: false,
                module: false,
                path: false,
                "node:fs": false,
                "node:os": false,
                "node:crypto": false,
                "node:module": false,
                "node:path": false,
            };

            // Nuclear Option: Replace these modules with empty ones
            config.plugins.push(
                new webpack.NormalModuleReplacementPlugin(
                    /@prisma\/client|better-auth\/adapters\/prisma|generated\/prisma/,
                    require.resolve('./src/lib/mocks/empty.ts')
                )
            );
        }

        // Configure cache to handle large strings without warnings
        if (dev && config.cache) {
            config.cache = {
                ...config.cache,
                type: 'filesystem',
                compression: 'gzip',
                maxMemoryGenerations: 1,
                maxAge: 5184000000,
            };
        }
        
        // Suppress infrastructure logging warnings
        config.infrastructureLogging = {
            level: 'error',
        };

        // Suppress specific webpack warnings
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

    serverExternalPackages: ['@google-cloud/bigquery', '@google-cloud/common', '@prisma/client', 'prisma'],

    experimental: {
        optimizePackageImports: [
            '@prisma/client',
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
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }

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

    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
    nextConfig,
    {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options

        // Suppresses source map uploading logs during bundling
        silent: true,
        org: "edintel",
        project: "sovereign",
    },
    {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: false,

        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
        tunnelRoute: "/monitoring",

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        // Enables automatic instrumentation of Vercel Cron Monitors.
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,
    }
);

