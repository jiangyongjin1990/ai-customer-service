import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

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
      <body className={`${fontClassSans} ${fontClassMono} antialiased`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
