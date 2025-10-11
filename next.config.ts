import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('http://localhost:3001/**')],  // allow localhost for dev
  },
};

export default nextConfig;
