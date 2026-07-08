import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.29.110', '127.0.0.1', 'localhost'],
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;
