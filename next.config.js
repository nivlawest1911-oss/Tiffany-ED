/** @type {import('next').NextConfig} */
const path = require('path');

const emptyStub = path.join(__dirname, 'src/lib/mocks/empty.ts');

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  transpilePackages: [],

  // Stable build ids → CDN long-cache works across deploys of unchanged assets
  generateBuildId: async () =>
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    process.env.BUILD_ID ||
    'build-sovereign-v2',

  output: process.env.DOCKER_BUILD ? 'standalone' : undefined,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  productionBrowserSourceMaps: false,

  turbopack: {
    resolveAlias: {
      '@/lib/prisma': emptyStub,
      '@/lib/auth': emptyStub,
      '@prisma/client': emptyStub,
      '@generated/prisma/client': emptyStub,
      pg: emptyStub,
      '@prisma/adapter-pg': emptyStub,
    },
  },

  webpack: (config, { dev, isServer, nextRuntime, webpack }) => {
    if (!isServer || nextRuntime === 'edge') {
      config.resolve.alias['@/lib/prisma'] = emptyStub;
      config.resolve.alias['@/lib/auth'] = emptyStub;
      config.resolve.alias['@prisma/client'] = emptyStub;
      config.resolve.alias['@generated/prisma/client'] = emptyStub;
      config.resolve.alias['pg'] = emptyStub;
      config.resolve.alias['@prisma/adapter-pg'] = emptyStub;

      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        os: false,
        crypto: false,
        module: false,
        path: false,
        stream: false,
        'node:fs': false,
        'node:os': false,
        'node:crypto': false,
        'node:module': false,
        'node:path': false,
        'node:stream': false,
      };

      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /@prisma\/client|better-auth\/adapters\/prisma|generated\/prisma/,
          require.resolve('./src/lib/mocks/empty.ts')
        )
      );
    }

    if (dev && config.cache) {
      config.cache = {
        ...config.cache,
        type: 'filesystem',
        compression: 'gzip',
        maxMemoryGenerations: 1,
        maxAge: 5184000000,
      };
    }

    config.infrastructureLogging = { level: 'error' };
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
    deviceSizes: [360, 390, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.vercel-storage.com' },
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.private.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.transparenttextures.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },

  serverExternalPackages: [
    '@google-cloud/bigquery',
    '@google-cloud/common',
    '@google-cloud/storage',
    '@google-cloud/vision',
    '@google-cloud/speech',
    '@google-cloud/text-to-speech',
    '@google-cloud/translate',
    '@google-cloud/language',
    '@google-cloud/vertexai',
    '@prisma/client',
    'prisma',
    'sharp',
  ],

  experimental: {
    webpackMemoryOptimizations: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@vercel/speed-insights',
      '@radix-ui/react-icons',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-select',
      '@radix-ui/react-accordion',
      '@radix-ui/react-popover',
      '@radix-ui/react-tooltip',
      'recharts',
      'date-fns',
      'lodash',
      '@heroicons/react',
      '@ai-sdk/react',
      'react-markdown',
      'sonner',
      'cmdk',
      'vaul',
      'embla-carousel-react',
    ],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  async headers() {
    const security = [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      {
        key: 'Content-Security-Policy',
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https:; frame-src 'self' https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self';",
      },
    ];

    return [
      { source: '/(.*)', headers: security },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/auth/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store, max-age=0',
          },
        ],
      },
      {
        source: '/api/webhooks/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store, max-age=0',
          },
        ],
      },
      {
        source: '/api/blob/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store, max-age=0',
          },
        ],
      },
      {
        source: '/api/entitlements',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store, max-age=0',
          },
        ],
      },
      {
        source: '/api/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        source: '/api/((?!public).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/dashboard', destination: '/the-room', permanent: true },
      { source: '/all-tools', destination: '/admin/tools', permanent: true },
      { source: '/activity', destination: '/ledger', permanent: true },
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
        destination: '/ai-hub/legal-defense',
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

const { withSentryConfig } = require('@sentry/nextjs');

const finalConfig = process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(
      nextConfig,
      {
        silent: true,
        org: 'edintel',
        project: 'sovereign',
      },
      {
        widenClientFileUpload: true,
        transpileClientSDK: false,
        tunnelRoute: '/monitoring',
        hideSourceMaps: true,
        disableLogger: true,
        automaticVercelMonitors: true,
      }
    )
  : nextConfig;

module.exports = finalConfig;
