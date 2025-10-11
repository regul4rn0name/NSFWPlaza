import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://nsfwplaza.jajca.site/api/**')],  // allow localhost for dev
  },
};

export default nextConfig;
