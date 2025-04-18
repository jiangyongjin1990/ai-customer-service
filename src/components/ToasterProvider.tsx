'use client';

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * 提供Toast通知功能的客户端组件
 * @returns Toaster组件
 */
export default function ToasterProvider() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // 仅在客户端渲染后显示Toaster组件
  if (!mounted) {
    return null;
  }
  
  return <Toaster position="top-center" />;
} 