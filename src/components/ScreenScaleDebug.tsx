'use client';

import { useState, useEffect } from 'react';

/**
 * 屏幕缩放调试组件
 * 显示当前屏幕分辨率和应用的缩放比例
 * 仅在开发环境中可见
 */
export default function ScreenScaleDebug() {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    scale: 1,
    visible: false
  });

  useEffect(() => {
    // 仅在客户端执行
    const width = window.screen.width;
    const height = window.screen.height;
    const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--screen-scale') || '1');
    
    setScreenInfo({
      width,
      height,
      scale,
      visible: process.env.NODE_ENV === 'development'
    });
    
    const handleResize = () => {
      const newWidth = window.screen.width;
      const newHeight = window.screen.height;
      const newScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--screen-scale') || '1');
      
      setScreenInfo({
        width: newWidth,
        height: newHeight,
        scale: newScale,
        visible: process.env.NODE_ENV === 'development'
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!screenInfo.visible) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        padding: '8px 12px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}
    >
      <div>屏幕: {screenInfo.width}x{screenInfo.height}</div>
      <div>缩放: {screenInfo.scale.toFixed(2)}</div>
    </div>
  );
} 