import React from 'react';
import Image from 'next/image';

/**
 * 客户评价卡片属性接口
 * @typedef {object} TestimonialCardProps
 * @property {string} quote - 客户引用的话
 * @property {string} name - 客户姓名
 * @property {string} title - 客户职位或公司名称
 * @property {string} [avatarSrc] - 头像图片源路径
 * @property {string} [className] - 额外的样式类名
 */
interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatarSrc?: string;
  className?: string;
}

/**
 * 客户评价卡片组件
 * @param {TestimonialCardProps} props - 组件属性
 */
export default function TestimonialCard({
  quote,
  name,
  title,
  avatarSrc,
  className = '',
}: TestimonialCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      {/* 引用符号 */}
      <div className="mb-4 text-blue-500">
        <svg
          className="h-8 w-8"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
      </div>
      
      {/* 评价内容 */}
      <p className="text-gray-600 mb-6">{quote}</p>
      
      {/* 客户信息 */}
      <div className="flex items-center">
        {avatarSrc ? (
          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
            <Image
              src={avatarSrc}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-blue-700 font-medium text-sm">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
} 