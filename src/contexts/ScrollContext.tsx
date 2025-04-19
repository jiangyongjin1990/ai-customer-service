"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * @description 滚动上下文接口定义
 */
interface ScrollContextType {
  scrollToTop: boolean;
  setScrollToTop: (value: boolean) => void;
}

/**
 * @description 创建滚动上下文
 */
const ScrollContext = createContext<ScrollContextType>({
  scrollToTop: false,
  setScrollToTop: () => {},
});

/**
 * @description 滚动提供者组件属性
 */
interface ScrollProviderProps {
  children: ReactNode;
}

/**
 * @description 滚动上下文提供者组件
 * @param {ScrollProviderProps} props 组件属性
 * @returns {JSX.Element} 滚动上下文提供者组件
 */
export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [scrollToTop, setScrollToTop] = useState(false);

  // 监听滚动状态变更
  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setScrollToTop(false);
    }
  }, [scrollToTop]);

  return (
    <ScrollContext.Provider value={{ scrollToTop, setScrollToTop }}>
      {children}
    </ScrollContext.Provider>
  );
};

/**
 * @description 使用滚动上下文的钩子
 * @returns {ScrollContextType} 滚动上下文状态和方法
 */
export const useScrollContext = () => useContext(ScrollContext); 