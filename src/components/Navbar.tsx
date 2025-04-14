'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          智能客服
        </Link>
        
        {/* 桌面导航 */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-600 hover:text-blue-600">
            功能
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
            价格
          </Link>
          <Link href="/docs" className="text-gray-600 hover:text-blue-600">
            文档
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            联系我们
          </Link>
          <Link href="/login" className="text-blue-600 font-medium">
            登录
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            注册
          </Link>
        </div>
        
        {/* 移动端菜单按钮 */}
        <button
          type="button"
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
      
      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4">
          <Link href="/features" className="block py-2 text-gray-600">
            功能
          </Link>
          <Link href="/pricing" className="block py-2 text-gray-600">
            价格
          </Link>
          <Link href="/docs" className="block py-2 text-gray-600">
            文档
          </Link>
          <Link href="/contact" className="block py-2 text-gray-600">
            联系我们
          </Link>
          <Link href="/login" className="block py-2 text-blue-600 font-medium">
            登录
          </Link>
          <Link href="/signup" className="block py-2 text-blue-600 font-medium">
            注册
          </Link>
        </div>
      )}
    </header>
  );
} 