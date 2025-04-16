'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * @description 错误边界组件，用于捕获子组件中的JavaScript错误
 * @returns {JSX.Element} 错误边界组件
 */
export default function ErrorBoundary({
  children,
  fallback
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('错误被ErrorBoundary捕获:', error);
      setHasError(true);
    };

    // 添加全局错误处理函数
    window.addEventListener('error', errorHandler);
    
    return () => {
      // 清理函数
      window.removeEventListener('error', errorHandler);
    };
  }, []);
  
  // 如果发生错误，显示备用UI
  if (hasError) {
    return fallback || (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">出现错误</h2>
          <p className="text-gray-600 mb-6">
            演示页面发生了意外错误。这是一个隔离的问题，不会影响网站的其他部分。
          </p>
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => setHasError(false)}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              重试
            </button>
            <Link 
              href="/"
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // 正常情况返回子组件
  return <>{children}</>;
} 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * @description 错误边界组件，用于捕获子组件中的JavaScript错误
 * @returns {JSX.Element} 错误边界组件
 */
export default function ErrorBoundary({
  children,
  fallback
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('错误被ErrorBoundary捕获:', error);
      setHasError(true);
    };

    // 添加全局错误处理函数
    window.addEventListener('error', errorHandler);
    
    return () => {
      // 清理函数
      window.removeEventListener('error', errorHandler);
    };
  }, []);
  
  // 如果发生错误，显示备用UI
  if (hasError) {
    return fallback || (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">出现错误</h2>
          <p className="text-gray-600 mb-6">
            演示页面发生了意外错误。这是一个隔离的问题，不会影响网站的其他部分。
          </p>
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => setHasError(false)}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              重试
            </button>
            <Link 
              href="/"
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // 正常情况返回子组件
  return <>{children}</>;
} 