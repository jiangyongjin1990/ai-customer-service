import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'],
    minimumCacheTTL: 60, // 缓存图片60秒
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 生产环境移除console
  },
  experimental: {
    optimizeCss: true, // 优化CSS
  },
};

export default nextConfig;
