/** @type {import('next').NextConfig} */
const nextConfig = {
    // TypeScript bypass is still supported and essential
    typescript: {
        ignoreBuildErrors: true,
    },
    // Empty turbopack config disables it and uses Webpack
    turbopack: {},
    // DO NOT add the eslint block here. It is gone in v16.
};

module.exports = nextConfig;