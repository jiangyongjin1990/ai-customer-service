"use client";

import React from 'react';
import { ScrollProvider } from '../contexts/ScrollContext';
import Navbar from './Navbar';

/**
 * @description 客户端包装器组件，提供ScrollProvider上下文
 * @param {object} props 组件属性
 * @param {React.ReactNode} props.children 子元素
 * @returns {JSX.Element} 包装器组件
 */
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollProvider>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </ScrollProvider>
  );
} 