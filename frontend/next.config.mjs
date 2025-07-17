/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'unsplash.com',
            },
        ],
        domains: ['drive.google.com']
    },
};

export default nextConfig;
