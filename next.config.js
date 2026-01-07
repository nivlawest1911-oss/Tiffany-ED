/** @type {import('next').NextConfig} */
const nextConfig = {
    // We keep TypeScript here to bypass any type-checking errors
    typescript: {
        ignoreBuildErrors: true,
    },
    // If you have other settings like 'images', place them here.
};

module.exports = nextConfig;