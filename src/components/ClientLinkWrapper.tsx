"use client";

import React from 'react';

/**
 * @description 客户端链接包装器组件，避免直接使用Next.js的Link组件
 * @param {object} props - 组件属性
 * @param {string} props.href - 链接目标URL
 * @param {React.ReactNode} props.children - 子元素
 * @param {string} [props.className] - CSS类名
 * @param {function} [props.onClick] - 点击处理函数
 * @returns {JSX.Element} 链接包装器组件
 */
const ClientLinkWrapper = ({ href, children, className, onClick, ...props }: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    // 处理内部链接导航
    if (href.startsWith('/') && !e.defaultPrevented) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default ClientLinkWrapper; 