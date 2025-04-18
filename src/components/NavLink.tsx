'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * @description 自定义导航链接组件，能够自动处理活跃状态
 * @param {string} href - 链接目标路径
 * @param {React.ReactNode} children - 链接内容
 * @param {string} className - 额外的CSS类名
 * @returns {JSX.Element} 导航链接组件
 */
const NavLink = ({
  href,
  children,
  className = '',
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  // 构建默认链接样式和活跃链接样式
  const baseClasses = 'font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400';
  const activeClasses = 'text-blue-600 dark:text-blue-400 font-semibold';
  const inactiveClasses = 'text-gray-700 dark:text-gray-300';

  // 合并所有类名
  const finalClassName = `${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`;

  return (
    <Link href={href} className={finalClassName} {...props}>
      {children}
    </Link>
  );
};

export default NavLink; 