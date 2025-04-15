# 维普特AI客服系统 - v5.0.0

基于Next.js 15构建的现代化AI客服解决方案，为企业提供智能、高效的客户服务体验。

## 功能特点

- 智能对话机器人，处理常见客户问题
- 全渠道在线客服支持，实现无缝沟通
- 直观的用户界面，提供卓越的用户体验
- 数据分析与洞察，优化客户服务流程
- AI驱动的智能回复建议

## 技术栈

- **前端框架**: Next.js 15, React 19
- **样式**: TailwindCSS 4
- **动画**: Framer Motion
- **部署**: Docker, GitHub Actions, Vercel/自托管服务器

## 快速开始

### 开发环境

1. 克隆仓库
```bash
git clone https://github.com/jiangyongjin1990/ai-customer-service.git
cd ai-customer-service
```

2. 安装依赖
```bash
npm install
```

3. 复制环境变量
```bash
cp .env.example .env.local
```

4. 启动开发服务器
```bash
npm run dev
```

### 使用Docker部署

1. 构建Docker镜像
```bash
docker build -t weiput-ai-customer-service .
```

2. 运行容器
```bash
docker run -p 3000:3000 weiput-ai-customer-service
```

或者使用docker-compose:
```bash
docker-compose up -d
```

### 生产环境部署

#### 方式1: 使用Vercel

1. 导入GitHub仓库到Vercel
2. 配置环境变量
3. 部署

#### 方式2: 自托管部署

1. 克隆仓库并安装依赖
```bash
git clone https://github.com/jiangyongjin1990/ai-customer-service.git
cd ai-customer-service
npm install
```

2. 构建应用
```bash
npm run build
```

3. 启动生产服务器
```bash
npm start
```

或使用PM2进行进程管理:
```bash
pm2 start npm --name "ai-customer-service" -- start
```

4. 配置Nginx代理（可选）
   - 使用项目中提供的`nginx.conf`配置文件

## 配置说明

本项目支持多种配置选项，可通过环境变量进行设置:

- `PORT`: 应用端口，默认3000
- `API_KEY`: API密钥（如需要）
- `NODE_ENV`: 环境设置（development/production）

更多配置选项请参考`.env.example`文件。

## CI/CD流程

项目配置了完整的CI/CD流程:

1. 代码推送到GitHub触发自动化工作流
2. 运行测试和构建验证
3. 成功后根据分支/标签自动部署
   - 标签版本部署到生产环境
   - 主分支部署到测试/预览环境

## 性能优化

- 使用Next.js的静态生成和服务器组件
- 图片和资源优化
- 缓存策略优化
- 代码拆分和懒加载

## 开发团队

- 姜永进(@jiangyongjin1990) - 项目负责人

## 许可证

[MIT](LICENSE)

---

© 2025 维普特AI。保留所有权利。
