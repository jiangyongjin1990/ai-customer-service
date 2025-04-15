"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Comment out
// import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi'; // Comment out
import { usePathname } from 'next/navigation';

/**
 * @description AI Agent 标签组件
 * @returns {JSX.Element} 标签组件
 */
const AiAgentBadge = () => (
  <span className="ml-1.5 px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white rounded-full">AI Agent</span>
);

/**
 * @description 10年标签组件
 * @returns {JSX.Element} 标签组件
 */
// const TenYearsBadge = () => ( // Comment out
//    <span className="ml-1 px-1.5 py-0.5 bg-[#4e90cc] text-white text-[9px] leading-tight rounded-full font-medium">10years</span>
// );

/**
 * @description 导航栏组件
 * @returns {JSX.Element} 导航栏组件
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Comment out
  // const [dropdowns, setDropdowns] = useState({
  //   products: false,
  //   solutions: false,
  //   resources: false,
  // });
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // 处理下拉菜单显示
  // const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
  //   setDropdowns((prev) => ({
  //     ...prev,
  //     [dropdown]: !prev[dropdown],
  //   }));
  // };

  // 点击其他区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = () => {
      // setActiveDropdown(null); // Comment out if activeDropdown is commented
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 阻止下拉菜单点击事件冒泡
  // const handleDropdownClick = (e: React.MouseEvent) => { // Comment out
  //   e.stopPropagation();
  // };

  // 导航项数据
  // const navItems = { // Comment out
  //   products: [
  //     { name: '全渠道在线客服', description: '跨平台的客户沟通解决方案' },
  //     { name: 'AI智能客服', description: '高效处理常见问题与咨询' },
  //     { name: '知识库管理', description: '集中管理企业常见问题解答' },
  //     { name: '会话协作', description: '团队沟通与任务分配系统' }
  //   ],
  //   solutions: [
  //     { name: '电子商务', description: '提升购物体验和客户满意度' },
  //     { name: '金融服务', description: '安全高效的客户服务解决方案' },
  //     { name: '教育培训', description: '优化学习体验和学员支持' },
  //     { name: '医疗健康', description: '提供专业的患者服务体验' }
  //   ],
  //   resources: [
  //     { name: '帮助中心', description: '查找常见问题与使用指南' },
  //     { name: 'API文档', description: '开发者资源与接口说明' },
  //     { name: '视频教程', description: '学习如何最大化使用小嘉AI' },
  //     { name: '最新资讯', description: '了解产品更新与行业动态' }
  //   ]
  // };

  useEffect(() => {
    // 关闭下拉菜单当页面改变时
    // setActiveDropdown(null); // Comment out if activeDropdown is commented
  }, [pathname]);

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
            <Link href="/" className="flex items-center">
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
              className="text-lg font-medium text-gray-700 hover:text-[#4e90cc] flex items-center px-3 py-2 rounded-md hover:bg-gray-50/30 transition-colors duration-200"
            >
              <span>智能客服</span>
              <AiAgentBadge />
            </Link>

            <Link
              href="/case-studies"
              className="text-lg font-medium text-gray-700 hover:text-[#4e90cc] px-3 py-2 rounded-md hover:bg-gray-50/30 transition-colors duration-200"
            >
              客户案例
            </Link>

            <Link
              href="/pricing"
              className="text-lg font-medium text-gray-700 hover:text-[#4e90cc] px-3 py-2 rounded-md hover:bg-gray-50/30 transition-colors duration-200"
            >
              定价
            </Link>

            <Link
              href="/support"
              className="text-lg font-medium text-gray-700 hover:text-[#4e90cc] px-3 py-2 rounded-md hover:bg-gray-50/30 transition-colors duration-200"
            >
              支持
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-3">
            <Link
              href="#"
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
              href="#"
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
                        <Link href="/products/omni-channel" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="ml-4 text-lg font-medium text-gray-900">全渠道在线客服</div>
                        </Link>

                        <Link href="/" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div className="ml-4 text-lg font-medium text-gray-900">智能对话机器人</div>
                        </Link>

                        <Link href="/case-studies" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="ml-4 text-lg font-medium text-gray-900">客户案例</div>
                        </Link>

                        <Link href="/pricing" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-4 text-lg font-medium text-gray-900">定价</div>
                        </Link>

                        <Link href="/support" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div className="ml-4 text-lg font-medium text-gray-900">支持</div>
                        </Link>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    <Link
                      href="#"
                      className="col-span-1 px-4 py-3 rounded-full glass-card-transition glass-frost bg-white/30 backdrop-blur-sm text-[#4e90cc] text-base font-medium shadow-sm border border-white/20 flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300"
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
                      href="#"
                      className="col-span-1 px-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-base font-medium shadow-sm flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
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
}
