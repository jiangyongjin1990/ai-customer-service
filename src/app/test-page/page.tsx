'use client';

import React from 'react';

/**
 * @description 简单的测试页面组件
 * @returns {JSX.Element} 测试页面
 */
export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">测试页面</h1>
      <p className="text-lg mb-6">这是一个简单的测试页面，用于排除错误。</p>
      <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded">返回首页</a>
    </div>
  );
} 