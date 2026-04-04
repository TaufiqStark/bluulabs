import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bluulabs.s3.filebase.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
