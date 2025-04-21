import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from 'react-hot-toast';
import BodyClassSetter from "../components/BodyClassSetter";

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
      <body className={`${fontClassSans} ${fontClassMono} antialiased`} style={{
        background: `
          radial-gradient(circle at 15% 20%, rgba(153, 51, 255, 0.08) 0%, transparent 25%),
          radial-gradient(circle at 85% 30%, rgba(0, 204, 154, 0.08) 0%, transparent 25%),
          radial-gradient(circle at 50% 80%, rgba(255, 51, 153, 0.06) 0%, transparent 25%)
        `,
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        overflowX: 'hidden'
      }}>
        <BodyClassSetter />
        <Toaster position="top-center" />
        
        {/* 独立的模态弹窗容器 - 不受缩放影响 */}
        <div id="modal-container" className="modal-container"></div>
        
        {/* 导航栏使用独立的缩放容器 */}
        <div className="navbar-wrapper">
          <Navbar />
        </div>
        
        {/* 页面内容的缩放容器 */}
        <div className="content-wrapper">
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
