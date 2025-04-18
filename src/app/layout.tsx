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
        <script dangerouslySetInnerHTML={{
          __html: `
          (function() {
            function setScreenScale() {
              const width = window.screen.width;
              const height = window.screen.height;
              
              // 1920x1080屏幕 - 缩小20%
              if (width === 1920 && height === 1080) {
                document.documentElement.style.setProperty('--screen-scale', '0.8');
              } 
              // 2K屏幕 (约2560x1440) - 放大10%
              else if (width >= 2560 && width < 3840) {
                document.documentElement.style.setProperty('--screen-scale', '1.1');
              } 
              // 4K屏幕 (3840x2160及以上) - 放大175%
              else if (width >= 3840) {
                document.documentElement.style.setProperty('--screen-scale', '1.75');
              } else {
                document.documentElement.style.setProperty('--screen-scale', '1');
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
      <body className={`${fontClassSans} ${fontClassMono} antialiased scale-screen`}>
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
