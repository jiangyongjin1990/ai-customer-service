import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="glass py-12 relative mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">小嘉智能客服</h3>
                <p>AI驱动的客户服务解决方案</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">产品</h3>
                <ul className="space-y-2">
                  <li><Link href="/features" className="hover:text-blue-500 modern-transition">功能</Link></li>
                  <li><Link href="/pricing" className="hover:text-blue-500 modern-transition">价格</Link></li>
                  <li><Link href="/demo" className="hover:text-blue-500 modern-transition">演示</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">资源</h3>
                <ul className="space-y-2">
                  <li><Link href="/docs" className="hover:text-blue-500 modern-transition">文档</Link></li>
                  <li><Link href="/blog" className="hover:text-blue-500 modern-transition">博客</Link></li>
                  <li><Link href="/support" className="hover:text-blue-500 modern-transition">支持</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">联系我们</h3>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="hover:text-blue-500 modern-transition">联系方式</Link></li>
                  <li><Link href="/about" className="hover:text-blue-500 modern-transition">关于我们</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200/20 mt-8 pt-8 text-center">
              <p>© {new Date().getFullYear()} 小嘉智能客服. 保留所有权利.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
