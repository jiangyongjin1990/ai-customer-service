'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * @description AI Agent 标签组件
 * @returns {JSX.Element} 标签组件
 */
const AiAgentBadge = () => (
  <span className="ml-1.5 px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white rounded-full">AI Agent</span>
);

/**
 * @description 客户端导航栏组件
 * @returns {JSX.Element} 导航栏组件
 */
export default function ClientNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // 检测滚动来改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 点击其他区域关闭菜单
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // 直接定义内联样式对象
  const initialStyle = {
    background: 'transparent',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    MozBackdropFilter: 'none',
    OBackdropFilter: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0)', // 透明边框
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0)', // 透明阴影
    zIndex: 100
  };

  const glassStyle = {
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.01) 100%)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    MozBackdropFilter: 'blur(15px)',
    OBackdropFilter: 'blur(15px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
    zIndex: 100
  };

  return (
    <div
      className={`fixed w-full top-0 z-50 transition-all duration-500`}
      style={scrolled ? glassStyle : initialStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 md:py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/home" className="flex items-center">
              <span className="sr-only">维普特AI</span>
              <div className="h-8 w-auto sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl px-3 rounded-md flex items-center">
                维普特
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                AI
              </span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="glass-card p-2 rounded-md inline-flex items-center justify-center text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">打开菜单</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/home"
              className={`text-lg font-medium ${pathname === '/home' ? 'text-[#4e90cc]' : 'text-gray-700'} hover:text-[#4e90cc] flex items-center px-3 py-2 rounded-md hover:bg-gray-50/30 transition-colors duration-200`}
            >
              <span>首页</span>
            </Link>

            <Link
              href="/demo"
              className={`text-lg font-medium ${pathname === '/demo' ? 'text-[#4e90cc]' : 'text-gray-700'} hover:text-[#4e90cc] flex items-center px-3 py-2 rounded-md hover:bg-gray-50/30 transition-colors duration-200`}
            >
              <span>智能客服</span>
              <AiAgentBadge />
            </Link>

            <Link
              href="/pricing"
              className={`text-lg font-medium ${pathname === '/pricing' ? 'text-[#4e90cc]' : 'text-gray-700'} hover:text-[#4e90cc] px-3 py-2 rounded-md hover:bg-gray-50/30 transition-colors duration-200`}
            >
              定价
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-3">
            <Link
              href="/demo"
              className="px-4 py-2 rounded-full glass-card-transition glass-frost bg-white/30 backdrop-blur-sm text-[#4e90cc] text-sm font-medium shadow-sm border border-white/20 flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300"
            >
              <span>预约演示</span>
              <svg
                className="ml-1 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </Link>
            <Link
              href="/demo"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-sm flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
            >
              <span>免费试用</span>
              <svg
                className="ml-1 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="p-6 flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-8 w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl px-3 rounded-md">
                  维普特
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                  AI
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 px-6 space-y-6">
              <div className="grid gap-y-8">
                <Link
                  href="/home"
                  className="text-base font-medium text-gray-900 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  首页
                </Link>
                <Link
                  href="/demo"
                  className="text-base font-medium text-gray-900 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  智能客服
                </Link>
                <Link
                  href="/pricing"
                  className="text-base font-medium text-gray-900 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  定价
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Link
                  href="/demo"
                  className="px-4 py-2 border border-blue-300 text-blue-600 rounded-md text-center hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  预约演示
                </Link>
                <Link
                  href="/demo"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  免费试用
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 