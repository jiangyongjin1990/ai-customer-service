"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AiAgentBadge from './AiAgentBadge';
import { useScrollContext, ScrollProvider } from '../contexts/ScrollContext';
import TrialModal from './TrialModal';
import ClientLinkWrapper from './ClientLinkWrapper';

/**
 * @description 导航栏组件包装器
 * @returns {JSX.Element} 导航栏包装器组件
 */
const Navbar = () => {
  return (
    <ScrollProvider>
      <NavbarContent />
    </ScrollProvider>
  );
};

/**
 * @description 导航栏内容组件
 * @returns {JSX.Element} 导航栏内容组件
 */
const NavbarContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const pathname = usePathname();
  const { setScrollToTop } = useScrollContext();

  // 使用createPortal将导航栏移出缩放区域
  useEffect(() => {
    const createFixedContainer = () => {
      let container = document.getElementById('fixed-navbar-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'fixed-navbar-container';
        container.style.cssText = `
          position: fixed !important; 
          top: 0 !important; 
          left: 0 !important; 
          width: 100% !important; 
          z-index: 10000 !important; 
          transform: none !important; 
          pointer-events: auto !important; 
          height: auto !important;
        `;
        
        // 添加到body前，确保不受缩放影响
        document.documentElement.insertBefore(container, document.body);
      }
      return container;
    };

    // 将导航栏移动到固定容器
    const moveNavbarToFixedContainer = () => {
      const fixedContainer = createFixedContainer();
      const navbar = document.getElementById('main-navbar');
      
      if (navbar && navbar.parentNode !== fixedContainer) {
        // 克隆导航栏并移动到固定容器
        const clonedNavbar = navbar.cloneNode(true) as HTMLElement;
        fixedContainer.innerHTML = ''; // 清空容器
        fixedContainer.appendChild(clonedNavbar);
        
        // 隐藏原始导航栏
        if (navbar.parentNode) {
          navbar.style.visibility = 'hidden';
          navbar.style.pointerEvents = 'none';
        }
        
        // 确保克隆的导航栏使用正确的样式
        clonedNavbar.style.position = 'relative';
        clonedNavbar.style.top = '0';
        clonedNavbar.style.width = '100%';
        clonedNavbar.style.visibility = 'visible';
        
        // 处理点击事件
        setupNavbarEventHandlers(clonedNavbar);
      }
    };
    
    // 设置导航栏事件处理
    const setupNavbarEventHandlers = (navbar: HTMLElement) => {
      // 处理链接点击
      navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href) {
            window.location.href = href;
            e.preventDefault();
          }
        });
      });
      
      // 处理免费试用按钮
      const trialButton = navbar.querySelector('button');
      if (trialButton) {
        trialButton.addEventListener('click', () => {
          setIsTrialModalOpen(true);
        });
      }
    };
    
    // 立即执行一次
    moveNavbarToFixedContainer();
    
    // 监听窗口大小变化和DOM变化
    window.addEventListener('resize', moveNavbarToFixedContainer);
    
    // 监听DOM内容变化，确保导航栏始终在固定容器中
    const observer = new MutationObserver(() => {
      moveNavbarToFixedContainer();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', moveNavbarToFixedContainer);
      observer.disconnect();
    };
  }, [pathname]); // 路径变化时重新执行
  
  // 检测滚动来改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrolled(scrollTop > 10);
      
      // 更新克隆的导航栏样式
      const clonedNavbar = document.querySelector('#fixed-navbar-container #main-navbar');
      if (clonedNavbar) {
        if (scrollTop > 10) {
          clonedNavbar.classList.add('navbar-scrolled');
          clonedNavbar.classList.remove('navbar-initial');
        } else {
          clonedNavbar.classList.add('navbar-initial');
          clonedNavbar.classList.remove('navbar-scrolled');
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // 初始执行一次
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 点击链接时滚动到顶部
  const handleNavLinkClick = () => {
    setIsOpen(false);
    setScrollToTop(true);
  };

  const handleTrialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 立即应用补偿，防止打开时的抖动
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    // 对导航栏应用相同的补偿
    const navbar = document.querySelector('#main-navbar');
    if (navbar) {
      (navbar as HTMLElement).style.paddingRight = `${scrollbarWidth}px`;
    }
    
    setIsTrialModalOpen(true);
    setIsOpen(false); // 关闭移动端菜单
  };

  // 导航栏固定样式，确保在所有情况下都能吸顶
  const navbarFixedStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 10000,
    transform: 'none'
  };

  // 直接定义内联样式对象
  const initialStyle = {
    ...navbarFixedStyle,
    background: 'transparent',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    MozBackdropFilter: 'none',
    OBackdropFilter: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0)', // 透明边框
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0)'
  };

  const glassStyle = {
    ...navbarFixedStyle,
    background: 'rgba(255, 255, 255, 0.85)', // 增加背景不透明度，使毛玻璃效果更明显
    backdropFilter: 'blur(20px)',  // 增加模糊度
    WebkitBackdropFilter: 'blur(20px)',
    MozBackdropFilter: 'blur(20px)',
    OBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)', // 增加边框透明度
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' // 增强阴影效果
  };

  return (
    <>
      {isTrialModalOpen && (
        <TrialModal 
          isOpen={isTrialModalOpen}
          onClose={() => {
            // 确保释放body和导航栏的样式
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            const navbar = document.querySelector('#main-navbar');
            if (navbar) {
              (navbar as HTMLElement).style.paddingRight = '';
            }
            
            setIsTrialModalOpen(false);
          }}
        />
      )}
      
      <nav
        id="main-navbar"
        data-navbar-component="true"
        className={`w-full h-[70px] ${
          scrolled ? 'navbar-scrolled' : 'navbar-initial'
        }`}
        style={scrolled ? glassStyle : initialStyle}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full">
          <div className="flex items-center justify-between py-3 md:py-4 h-full">
            <div className="flex items-center pl-4 md:pl-6">
              <ClientLinkWrapper href="/" className="flex items-center" onClick={handleNavLinkClick}>
                <span className="sr-only">维普特AI</span>
                <div className="h-8 w-auto sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl px-3 rounded-md flex items-center">
                  维普特
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                  AI
                </span>
              </ClientLinkWrapper>
            </div>
              
            <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-10">
                <ClientLinkWrapper
                  href="/"
                  className={`text-lg font-bold flex items-center px-3 py-2 rounded-lg transition-all duration-300 water-ripple ${
                    pathname === '/' 
                      ? 'text-[#4e90cc] animate-wave-text' 
                      : 'text-gray-700 hover:text-[#4e90cc]'
                  }`}
                  onClick={handleNavLinkClick}
                >
                  <span>智能客服</span>
                </ClientLinkWrapper>

                <ClientLinkWrapper
                  href="/pricing"
                  className={`text-lg font-bold px-3 py-2 rounded-lg transition-all duration-300 water-ripple ${
                    pathname === '/pricing' 
                      ? 'text-[#4e90cc] animate-wave-text' 
                      : 'text-gray-700 hover:text-[#4e90cc]'
                  }`}
                  onClick={handleNavLinkClick}
                >
                  产品价格
                </ClientLinkWrapper>

                <ClientLinkWrapper
                  href="/demo"
                  className={`text-lg font-bold px-3 py-2 rounded-lg transition-all duration-300 water-ripple ${
                    pathname === '/demo' 
                      ? 'text-[#4e90cc] animate-wave-text' 
                      : 'text-gray-700 hover:text-[#4e90cc]'
                  }`}
                  onClick={handleNavLinkClick}
                >
                  线上体验
                  <span className="ml-1 px-1.5 py-0.5 text-[8px] font-semibold bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white rounded-full align-top" style={{lineHeight: '1.1'}}>AI Agent</span>
                </ClientLinkWrapper>
              </div>
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
            
            <div className="hidden md:flex items-center justify-end pr-4 md:pr-6">
              <button
                onClick={handleTrialClick}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-sm flex items-center justify-center whitespace-nowrap transform hover:scale-105 hover:shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
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
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 占位元素 - 与导航栏高度相同，防止内容被导航栏遮挡 */}
      <div className="h-[70px] w-full" id="navbar-spacer"></div>

      {/* 移动端菜单 */}
      {isOpen && (
        <div 
          className="fixed inset-0 overflow-hidden z-50 md:hidden"
          style={{ position: 'fixed', zIndex: 10001 }}
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
                          <ClientLinkWrapper 
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
                          </ClientLinkWrapper>

                          <ClientLinkWrapper 
                            href="/pricing" 
                            className="-m-3 p-3 flex items-center rounded-md hover:bg-indigo-50 transition-colors duration-200"
                            onClick={handleNavLinkClick}
                          >
                            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white">
                              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className={`ml-4 text-lg font-medium text-gray-900 ${pathname === '/pricing' ? 'font-bold text-[#4e90cc]' : ''}`}>产品价格</div>
                          </ClientLinkWrapper>

                          <ClientLinkWrapper 
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
                          </ClientLinkWrapper>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 gap-6">
                      <ClientLinkWrapper
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
                      </ClientLinkWrapper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
