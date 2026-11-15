import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@opsfoundry/ui', '@opsfoundry/tokens', '@opsfoundry/types', '@opsfoundry/db'],
  reactStrictMode: true,
};

export default nextConfig;
