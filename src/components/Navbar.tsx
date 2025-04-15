"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
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
const TenYearsBadge = () => (
   <span className="ml-1 px-1.5 py-0.5 bg-[#4e90cc] text-white text-[9px] leading-tight rounded-full font-medium">10years</span>
);

/**
 * @description 导航栏组件
 * @returns {JSX.Element} 导航栏组件
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    products: false,
    solutions: false,
    resources: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  // 点击其他区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 阻止下拉菜单点击事件冒泡
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 导航项数据
  const navItems = {
    products: [
      { name: '全渠道在线客服', description: '跨平台的客户沟通解决方案' },
      { name: 'AI智能客服', description: '高效处理常见问题与咨询' },
      { name: '知识库管理', description: '集中管理企业常见问题解答' },
      { name: '会话协作', description: '团队沟通与任务分配系统' }
    ],
    solutions: [
      { name: '电子商务', description: '提升购物体验和客户满意度' },
      { name: '金融服务', description: '安全高效的客户服务解决方案' },
      { name: '教育培训', description: '优化学习体验和学员支持' },
      { name: '医疗健康', description: '提供专业的患者服务体验' }
    ],
    resources: [
      { name: '帮助中心', description: '查找常见问题与使用指南' },
      { name: 'API文档', description: '开发者资源与接口说明' },
      { name: '视频教程', description: '学习如何最大化使用小嘉AI' },
      { name: '最新资讯', description: '了解产品更新与行业动态' }
    ]
  };

  useEffect(() => {
    // 关闭移动菜单当页面改变时
    setMobileMenuOpen(false);
    // 关闭下拉菜单当页面改变时
    setActiveDropdown(null);
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
              <span className="sr-only">小嘉AI</span>
              <div className="h-8 w-auto sm:h-10 bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white font-bold text-xl px-3 rounded-md flex items-center">
                小嘉
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#4e90cc] via-[#7a85e0] to-[#9478f0] bg-clip-text text-transparent">
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
              href="/products/ai-agent"
              className="text-base font-medium text-gray-700 hover:text-[#4e90cc] flex items-center"
            >
              <span>智能客服</span>
              <AiAgentBadge />
            </Link>

            <div className="relative">
              <button
                onClick={() => {
                  toggleDropdown('products');
                  toggleDropdown('solutions');
                  toggleDropdown('resources');
                }}
                className="text-gray-700 group inline-flex items-center text-base font-medium hover:text-[#4e90cc] focus:outline-none"
              >
                <span>产品</span>
                <svg
                  className={`ml-2 h-5 w-5 text-gray-400 group-hover:text-[#4e90cc] transition-transform ${
                    dropdowns.products || dropdowns.solutions || dropdowns.resources ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* 产品下拉菜单 */}
              {dropdowns.products && (
                <div className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 animate-fadeIn">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden glass-card-intense">
                    <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                      {/* 全渠道在线客服 */}
                      <Link
                        href="/products/omni-channel"
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-blue-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white sm:h-12 sm:w-12">
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
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">
                            全渠道在线客服
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            网页、APP、微信、小程序、电话等多渠道统一接入
                          </p>
                        </div>
                      </Link>

                      {/* 智能对话机器人 */}
                      <Link
                        href="/products/ai-chatbot"
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-blue-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white sm:h-12 sm:w-12">
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
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">
                            智能对话机器人
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            基于大模型的智能客服，处理复杂问题提高效率
                          </p>
                        </div>
                      </Link>

                      {/* 售前获客系统 */}
                      <Link
                        href="/products/lead-generation"
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-blue-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white sm:h-12 sm:w-12">
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">
                            售前获客系统
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            智能精准识别意向，自动定位产品，提高转化率
                          </p>
                        </div>
                      </Link>

                      {/* 大模型电话客服 */}
                      <Link
                        href="/products/ai-voice"
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-blue-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white sm:h-12 sm:w-12">
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">
                            大模型电话客服
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            声音听不出是机器人的电话客服，提高通话质量
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/case-studies"
              className="text-base font-medium text-gray-700 hover:text-[#4e90cc]"
            >
              客户案例
            </Link>

            <Link
              href="/pricing"
              className="text-base font-medium text-gray-700 hover:text-[#4e90cc]"
            >
              定价
            </Link>

            <Link
              href="/support"
              className="text-base font-medium text-gray-700 hover:text-[#4e90cc]"
            >
              支持
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-3">
            <Link
              href="#"
              className="text-base font-medium text-gray-600 hover:text-[#4e90cc] transition-colors duration-300"
              onClick={() => setIsLoggedIn(!isLoggedIn)}
            >
              登录
            </Link>
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
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white text-sm font-medium shadow-sm flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-[#5a9ed5] hover:to-[#a289f5]"
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
                        小嘉
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
                        <a href="/products/omni-channel" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">全渠道在线客服</div>
                        </a>

                        <a href="/products/ai-chatbot" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">智能对话机器人</div>
                        </a>

                        <a href="/case-studies" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">客户案例</div>
                        </a>

                        <a href="/pricing" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">定价</div>
                        </a>

                        <a href="/support" className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">支持</div>
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="#"
                      className="text-center text-gray-600 hover:text-[#4e90cc] font-medium transition-colors duration-300"
                      onClick={() => setIsLoggedIn(!isLoggedIn)}
                    >
                      登录
                    </Link>
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
                      className="col-span-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white text-sm font-medium shadow-sm flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-[#5a9ed5] hover:to-[#a289f5]"
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
