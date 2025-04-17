"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AiAgentBadge from './AiAgentBadge';
import { useScrollContext } from '@/contexts/ScrollContext';

/**
 * @description 导航栏组件
 * @returns {JSX.Element} 导航栏组件
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { setScrollToTop } = useScrollContext();

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

  // 点击链接时滚动到顶部
  const handleNavLinkClick = () => {
    setIsOpen(false);
    setScrollToTop(true);
  };

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
            <Link href="/" className="flex items-center" onClick={handleNavLinkClick}>
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
              href="/"
              className={`text-lg font-medium flex items-center px-3 py-2 rounded-lg transition-all duration-300 water-ripple ${
                pathname === '/' 
                  ? 'text-[#4e90cc] font-bold' 
                  : 'text-gray-700 hover:text-[#4e90cc]'
              }`}
              onClick={handleNavLinkClick}
            >
              <span>智能客服</span>
              <AiAgentBadge />
            </Link>

            <Link
              href="/pricing"
              className={`text-lg font-medium px-3 py-2 rounded-lg transition-all duration-300 water-ripple ${
                pathname === '/pricing' 
                  ? 'text-[#4e90cc] font-bold' 
                  : 'text-gray-700 hover:text-[#4e90cc]'
              }`}
              onClick={handleNavLinkClick}
            >
              定价
            </Link>

            <Link
              href="/demo"
              className={`text-lg font-medium px-3 py-2 rounded-lg transition-all duration-300 water-ripple ${
                pathname === '/demo' 
                  ? 'text-[#4e90cc] font-bold' 
                  : 'text-gray-700 hover:text-[#4e90cc]'
              }`}
              onClick={handleNavLinkClick}
            >
              线上体验
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              href="/demo"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-sm flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
              onClick={handleNavLinkClick}
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
      <div
        className={`${
          isOpen ? "fixed inset-0 overflow-hidden" : "hidden"
        } md:hidden top-0 z-50`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-sm">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll glass-card-intense">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-auto sm:h-10 bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white font-bold text-xl px-3 rounded-md flex items-center">
                        维普特
                      </div>
                      <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#4e90cc] via-[#7a85e0] to-[#9478f0] bg-clip-text text-transparent">
                        AI
                      </span>
                    </div>
                    <button
                      className="ml-3 h-7 flex items-center justify-center glass-card p-2 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">关闭</span>
                      <svg
                        className="h-6 w-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  <div className="absolute inset-0 px-4 sm:px-6">
                    <div className="h-full" aria-hidden="true">
                      <nav className="grid gap-y-8">
                        {/* 产品链接 */}
                        <Link 
                          href="/" 
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200"
                          onClick={handleNavLinkClick}
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className={`ml-4 text-lg font-medium text-gray-900 ${pathname === '/' ? 'font-bold text-[#4e90cc]' : ''}`}>智能客服</div>
                        </Link>

                        <Link 
                          href="/pricing" 
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200"
                          onClick={handleNavLinkClick}
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className={`ml-4 text-lg font-medium text-gray-900 ${pathname === '/pricing' ? 'font-bold text-[#4e90cc]' : ''}`}>定价</div>
                        </Link>

                        <Link 
                          href="/demo" 
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200"
                          onClick={handleNavLinkClick}
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div className={`ml-4 text-lg font-medium text-gray-900 ${pathname === '/demo' ? 'font-bold text-[#4e90cc]' : ''}`}>线上体验</div>
                        </Link>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 gap-6">
                    <Link
                      href="/demo"
                      className="col-span-1 px-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-base font-medium shadow-sm flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
                      onClick={handleNavLinkClick}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
