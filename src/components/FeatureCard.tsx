import React from 'react';
import Image from 'next/image';

/**
 * 特性卡片属性接口
 * @typedef {object} FeatureCardProps
 * @property {string} title - 特性标题
 * @property {string} description - 特性描述
 * @property {string} [iconSrc] - 图标源路径
 * @property {React.ReactNode} [icon] - 或者使用React组件作为图标
 * @property {string} [className] - 额外的样式类名
 */
interface FeatureCardProps {
  title: string;
  description: string;
  iconSrc?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * 特性卡片组件
 * @param {FeatureCardProps} props - 组件属性
 */
export default function FeatureCard({
  title,
  description,
  iconSrc,
  icon,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={`flex flex-col bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        {/* 图标显示 - 优先使用提供的icon组件，其次使用图片 */}
        {icon ? (
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600 mb-4">
            {icon}
          </div>
        ) : iconSrc ? (
          <div className="w-12 h-12 mb-4 relative">
            <Image
              src={iconSrc}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600 mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
} 
import Image from 'next/image';

/**
 * 特性卡片属性接口
 * @typedef {object} FeatureCardProps
 * @property {string} title - 特性标题
 * @property {string} description - 特性描述
 * @property {string} [iconSrc] - 图标源路径
 * @property {React.ReactNode} [icon] - 或者使用React组件作为图标
 * @property {string} [className] - 额外的样式类名
 */
interface FeatureCardProps {
  title: string;
  description: string;
  iconSrc?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * 特性卡片组件
 * @param {FeatureCardProps} props - 组件属性
 */
export default function FeatureCard({
  title,
  description,
  iconSrc,
  icon,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={`flex flex-col bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        {/* 图标显示 - 优先使用提供的icon组件，其次使用图片 */}
        {icon ? (
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600 mb-4">
            {icon}
          </div>
        ) : iconSrc ? (
          <div className="w-12 h-12 mb-4 relative">
            <Image
              src={iconSrc}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600 mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
} 