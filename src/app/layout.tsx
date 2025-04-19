import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from 'react-hot-toast';

// 使用系统字体
const fontClassSans = "font-sans";
const fontClassMono = "font-mono";

export const metadata: Metadata = {
  title: "维普特AI - 让企业轻松拥有智能客服",
  description: "维普特AI为企业提供智能客服解决方案，提升客户满意度，降低运营成本。",
};

/**
 * 根布局组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {JSX.Element} 根布局组件
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 添加内联脚本，确保在页面加载时立即应用屏幕适配
  const inlineScript = `
    (function() {
      try {
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;
        console.log("Screen resolution:", screenWidth + "x" + screenHeight);
        
        if (screenWidth === 1920 && screenHeight === 1080) {
          // 1920×1080分辨率处理
          document.documentElement.style.setProperty('--screen-scale', '0.8');
          document.body.classList.add('screen-1080p');
          console.log("Applied 1080p adaptation");
        } else if (screenWidth >= 2000 && screenWidth < 3000) {
          // 2K分辨率处理
          document.documentElement.style.setProperty('--screen-scale', '1.25');
          document.body.classList.add('screen-2k');
          console.log("Applied 2K adaptation");
        } else if (screenWidth >= 3000) {
          // 4K分辨率处理
          document.documentElement.style.setProperty('--screen-scale', '1.75');
          document.body.classList.add('screen-4k');
          console.log("Applied 4K adaptation");
        }
      } catch(e) {
        console.error("Screen adaptation error:", e);
      }
    })();
  `;

  return (
    <html lang="zh" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      </head>
      <body className={`${fontClassSans} ${fontClassMono} antialiased min-h-screen flex flex-col`}>
        <Toaster position="top-center" />
        <Navbar />
        <div className="flex-grow flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
