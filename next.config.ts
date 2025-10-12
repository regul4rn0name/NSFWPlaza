import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [ {
        protocol: 'https',
        hostname: 'nsfwplaza.jajca.site',
        pathname: '/api/themes/previews/**',
      },],
  },
};

export default nextConfig;
