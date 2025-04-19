import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    minimumCacheTTL: 60, // 缓存图片60秒
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 生产环境移除console
  },
  experimental: {
    optimizeCss: true, // 优化CSS
  },
  eslint: {
    // 禁用ESLint检查
    ignoreDuringBuilds: true,
  },
  // 显式启用快速刷新功能
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // 确保在开发模式下启用Fast Refresh
      config.devServer = {
        ...config.devServer,
        hot: true,
      };
    }
    return config;
  },
  // 输出路径配置，避免中文路径问题
  distDir: '.next',
  // 输出独立跟踪信息以便调试
  output: 'standalone',
};

export default nextConfig;
