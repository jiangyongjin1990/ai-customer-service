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
    // 启用应用目录的高级优化
    serverActions: {
      bodySizeLimit: '2mb', // 设置服务器操作体积限制
    },
    // 添加代码拆分优化，提高加载性能
    serverComponentsExternalPackages: ['sharp', 'image-size'],
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
    
    // 添加sourcemap支持，便于调试
    if (!isServer) {
      // 开发环境使用完整sourcemap，生产环境使用压缩版本
      config.devtool = dev ? 'source-map' : 'hidden-source-map';
    }
    
    // 优化生产环境构建
    if (!dev && !isServer) {
      // 分析和优化模块依赖性
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
      };
    }
    
    return config;
  },
  // 输出路径配置，避免中文路径问题
  distDir: '.next',
  // 输出独立跟踪信息以便调试
  output: 'standalone',
  // 添加生产环境的缓存控制
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { 
            key: 'Cache-Control', 
            value: 'no-store, no-cache' 
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { 
            key: 'Cache-Control', 
            value: 'public, max-age=31536000, immutable' 
          },
        ],
      },
    ];
  },
  // 添加gzip压缩
  compress: true,
  // 添加国际化配置
  i18n: process.env.NODE_ENV === 'production' ? {
    locales: ['zh'],
    defaultLocale: 'zh'
  } : undefined,
  // 添加重定向配置
  redirects: async () => {
    return [
      {
        source: '/old-demo',
        destination: '/demo',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
