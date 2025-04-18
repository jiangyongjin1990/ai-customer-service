"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AiAgentBadge from './AiAgentBadge';
import { useScrollContext, ScrollProvider } from '../contexts/ScrollContext';
import TrialModal from './TrialModal';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import NavLink from './NavLink';

/**
 * @description 导航栏组件包装器
 * @returns {JSX.Element} 导航栏包装器组件
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const pathname = usePathname();
  const { setScrollToTop } = useScrollContext();

  // 新的导航栏吸顶玻璃效果样式
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    zIndex: 10000,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    const navbar = document.querySelector('nav');
    if (navbar && navbar.classList.contains('fixed')) {
      navbar.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    setIsTrialModalOpen(true);
    setIsOpen(false); // 关闭移动端菜单
  };

  return (
    <ScrollProvider>
      <nav 
        className={`fixed top-0 left-0 right-0 p-4 transition-all duration-300 ease-in-out`}
        style={glassStyle}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="AI客服"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-lg font-bold">AI客服</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">首页</NavLink>
              <NavLink href="/pricing">定价</NavLink>
              <NavLink href="/solutions">解决方案</NavLink>
              <NavLink href="/demo">演示</NavLink>
              <NavLink href="/contact">联系我们</NavLink>
              <ThemeSwitcher />
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                登录/注册
              </Link>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center">
              <ThemeSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 py-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/pricing"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                定价
              </Link>
              <Link
                href="/solutions"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                解决方案
              </Link>
              <Link
                href="/demo"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                演示
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                联系我们
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors mx-4"
                onClick={() => setIsOpen(false)}
              >
                登录/注册
              </Link>
            </div>
          )}
        </div>
      </nav>
      {isTrialModalOpen && (
        <TrialModal 
          isOpen={isTrialModalOpen}
          onClose={() => {
            // 确保释放body和导航栏的样式
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            const navbar = document.querySelector('nav');
            if (navbar) {
              navbar.style.paddingRight = '';
            }
            
            setIsTrialModalOpen(false);
          }}
        />
      )}
    </ScrollProvider>
  );
};

export default Navbar;
