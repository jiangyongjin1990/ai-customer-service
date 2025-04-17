'use client';

import Footer from './Footer';
import { usePathname } from 'next/navigation';

/**
 * @description 客户端Footer包装组件
 * @returns {JSX.Element} Footer组件的客户端包装
 */
export default function FooterWrapper() {
  const pathname = usePathname();
  // 只在demo页面使用fixed样式
  const isFixed = pathname === '/demo';
  
  return <Footer isFixed={isFixed} />;
}
