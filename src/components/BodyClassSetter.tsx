"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * @description 根据当前路径和滚动位置为body元素添加特定的类名
 * @returns {null} 不渲染任何可见内容的组件
 */
export default function BodyClassSetter() {
  const pathname = usePathname();
  
  // 根据路径确定body的class
  useEffect(() => {
    const isDemoPage = pathname.startsWith('/demo');
    const isPricingPage = pathname.startsWith('/pricing');
    
    // 清除所有页面特定的类
    document.body.classList.remove('demo-page', 'pricing-page');
    
    // 添加对应页面的类
    if (isDemoPage) {
      document.body.classList.add('demo-page');
    } else if (isPricingPage) {
      document.body.classList.add('pricing-page');
    }
    
    // 设置路径数据属性，用于CSS选择器
    document.body.setAttribute('data-pathname', pathname);
  }, [pathname]);
  
  return null;
} 