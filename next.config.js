/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在生产构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在生产构建时忽略TypeScript错误
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '**',
      },
    ],
  },
  experimental: {
    // 其他实验性功能
    serverComponentsExternalPackages: [],
  },
  // 允许特定路由作为静态页面
  trailingSlash: true,
  // 暂时禁用重写路由
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/test-page',
  //     },
  //   ];
  // },
}

module.exports = nextConfig 