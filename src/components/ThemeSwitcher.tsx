'use client';

import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

/**
 * @description 主题切换组件，允许用户在亮色模式和暗色模式之间切换
 * @returns {JSX.Element} 主题切换按钮组件
 */
const ThemeSwitcher = () => {
  // 初始化主题状态
  const [darkMode, setDarkMode] = useState(false);

  // 组件加载时，检查当前主题并应用
  useEffect(() => {
    // 检查系统偏好
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 检查本地存储
    const savedTheme = localStorage.getItem('theme');
    
    // 优先使用用户保存的主题，其次是系统偏好
    const initialDarkMode = savedTheme === 'dark' || (savedTheme === null && prefersDarkMode);
    
    setDarkMode(initialDarkMode);
    applyTheme(initialDarkMode);
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === null) {
        setDarkMode(e.matches);
        applyTheme(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 应用主题到文档
  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 切换主题
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    applyTheme(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={darkMode ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeSwitcher; 