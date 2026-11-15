import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@opsfoundry/ui', '@opsfoundry/tokens', '@opsfoundry/types', '@opsfoundry/db'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
