import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chat',
        permanent: true, // 如果你希望永久重定向，使用 true
      },
    ]
  },
};

export default nextConfig;
