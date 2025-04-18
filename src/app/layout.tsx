import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from 'react-hot-toast';
import ScreenScaleDebug from "../components/ScreenScaleDebug";

// 使用系统字体
const fontClassSans = "font-sans";
const fontClassMono = "font-mono";

export const metadata: Metadata = {
  title: "智能客服 | AI驱动的客户服务解决方案",
  description: "使用AI技术提升您的客户服务体验，实现24/7全天候自动客户支持",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        {/* 主题切换脚本 - 在页面加载前应用正确的主题，避免闪烁 */}
        <script dangerouslySetInnerHTML={{
          __html: `
          (function() {
            // 检查本地存储的主题
            const savedTheme = localStorage.getItem('theme');
            // 检查系统偏好
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // 如果本地存储有主题设置或系统偏好是暗色模式，则应用暗色模式
            if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          })();
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
          (function() {
            function setScreenScale() {
              const width = window.screen.width;
              const height = window.screen.height;
              
              let scale = 1;
              
              // 1920x1080屏幕 - 缩小20%
              if (width === 1920 && height === 1080) {
                scale = 0.8;
              } 
              // 2K屏幕 (约2560x1440) - 缩小85%
              else if (width >= 2560 && width < 3840) {
                scale = 0.85;
              } 
              // 4K屏幕 (3840x2160及以上) - 缩小33%
              else if (width >= 3840) {
                scale = 0.33;
              }
              
              document.documentElement.style.setProperty('--screen-scale', scale.toString());
              
              // 在设置缩放后调整整体容器宽度和居中定位
              if (scale !== 1) {
                requestAnimationFrame(() => {
                  const body = document.body;
                  if (body) {
                    // 仅当非标准缩放比例时应用居中
                    if (scale !== 1) {
                      body.style.width = \`\${100 / scale}%\`;
                      body.style.marginLeft = '50%';
                      body.style.transform = \`translateX(-50%) scale(\${scale})\`;
                      body.style.transformOrigin = 'top center';
                    }
                  }
                });
              }
            }
            
            // 页面加载时设置
            setScreenScale();
            
            // 屏幕尺寸变化时重新设置
            window.addEventListener('resize', setScreenScale);
          })();
          `
        }} />
      </head>
      <body className={`${fontClassSans} ${fontClassMono} antialiased scale-screen dark:bg-gray-900 dark:text-white`}>
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <ScreenScaleDebug />
      </body>
    </html>
  );
}
