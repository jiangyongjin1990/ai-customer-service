'use client';

import React, { useEffect } from 'react';

/**
 * 屏幕适配组件
 * @description 提供屏幕分辨率监控和辅助功能，主要适配逻辑已移至全局CSS
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {JSX.Element} 屏幕适配组件
 */
export function ScreenAdapter({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 检测屏幕尺寸并记录日志
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    console.log(`屏幕分辨率: ${screenWidth}x${screenHeight}`);

    // 记录适配信息
    if (screenWidth === 1920 && screenHeight === 1080) {
      console.log('应用1920x1080屏幕适配，缩小20%，宽度125%');
    } else if (screenWidth >= 2000 && screenWidth < 3000) {
      console.log('应用2K屏幕适配，放大25%，宽度80%');
    } else if (screenWidth >= 3000) {
      console.log('应用4K屏幕适配，放大75%，宽度57.14%');
    } else {
      console.log('保持默认缩放比例');
    }
    
    // 允许在开发环境中切换适配模式进行测试
    if (process.env.NODE_ENV === 'development') {
      const testAdapter = (mode: string) => {
        // 移除之前可能应用的任何测试适配样式
        document.body.classList.remove('test-1080p');
        document.body.classList.remove('test-2k');
        document.body.classList.remove('test-4k');
        
        // 应用新的测试适配样式
        if (mode) {
          document.body.classList.add(`test-${mode}`);
        }
      };
      
      // 设置window对象上的测试方法
      (window as any).testScreenAdapter = testAdapter;
      console.log('开发模式: 可通过 window.testScreenAdapter("1080p"|"2k"|"4k") 测试不同分辨率的适配效果');
    }
  }, []);

  // 直接返回子组件，不添加额外的容器
  return <>{children}</>;
} 