/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'xbdgwqtbznvmtego.public.blob.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: 'elocate.s3.eu-north-1.amazonaws.com',
            },
        ]
    }
};

export default nextConfig;
