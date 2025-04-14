# 智能客服官网

这是一个使用Next.js构建的智能客服产品官网，提供了产品展示、演示、价格和联系等功能页面。

## 功能特性

- 响应式设计，适配移动端和桌面端
- 产品功能展示
- 智能客服演示页面
- 价格方案展示
- 联系表单
- 简单的API路由

## 技术栈

- [Next.js](https://nextjs.org/) - React框架
- [React](https://reactjs.org/) - JavaScript UI库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Vercel](https://vercel.com/) - 部署平台（推荐）

## 本地开发

### 前提条件

- Node.js 18.x 或更高版本
- npm 或 yarn

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/jiangyongjin1990/ai-customer-service.git
cd ai-customer-service
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 打开浏览器访问 http://localhost:3000

## 部署到Vercel

### 方法一：GitHub集成

1. 将代码推送到GitHub仓库
2. 在Vercel上注册账号并连接GitHub
3. 导入项目并自动部署

### 方法二：Vercel CLI

1. 安装Vercel CLI
```bash
npm install -g vercel
```

2. 登录Vercel
```bash
vercel login
```

3. 部署项目
```bash
vercel
```

## 项目结构

```
ai-customer-service/
├── src/                  # 源代码目录
│   ├── app/              # 应用路由
│   │   ├── page.tsx      # 首页
│   │   ├── layout.tsx    # 全局布局
│   │   ├── features/     # 功能页面
│   │   ├── pricing/      # 价格页面
│   │   ├── demo/         # 演示页面
│   │   ├── contact/      # 联系页面
│   │   └── api/          # API路由
│   └── components/       # 共享组件
│       └── Navbar.tsx    # 导航栏组件
├── public/               # 静态资源
├── next.config.ts        # Next.js配置
└── package.json          # 项目依赖
```

## 自定义域名设置

若要使用自定义域名（如 ai.cicicraft.xyz），请按照以下步骤操作：

1. 在Vercel项目设置中添加域名
   - 进入项目 > Settings > Domains
   - 添加域名：ai.cicicraft.xyz

2. 在域名服务商（如火山引擎）设置DNS记录
   - 添加CNAME记录
   - 主机记录：ai
   - 记录值：cname.vercel-dns.com
   - TTL：600秒（或默认值）

3. 等待DNS生效（通常需要几分钟到几小时）

## 后续开发建议

1. 添加用户认证系统
2. 集成实际的AI服务
3. 创建完整的管理后台
4. 添加多语言支持
5. 改进SEO优化

## 贡献指南

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件
