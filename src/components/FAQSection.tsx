import React, { useState } from 'react';

/**
 * FAQ项目属性接口
 * @typedef {object} FAQItem
 * @property {string} question - 问题
 * @property {string} answer - 回答
 */
interface FAQItem {
  question: string;
  answer: string;
}

/**
 * FAQ部分属性接口
 * @typedef {object} FAQSectionProps
 * @property {FAQItem[]} items - FAQ项目数组
 * @property {string} [title] - 标题
 * @property {string} [subtitle] - 副标题
 * @property {string} [className] - 额外的样式类名
 */
interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * FAQ项目组件
 * @param {object} props - 组件属性
 * @param {FAQItem} props.item - FAQ项目
 */
function FAQItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-12">
          <p className="text-base text-gray-500">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

/**
 * FAQ部分组件
 * @param {FAQSectionProps} props - 组件属性
 */
export default function FAQSection({
  items,
  title = '常见问题',
  subtitle = '关于AI客服的常见问题和解答',
  className = '',
}: FAQSectionProps) {
  return (
    <div className={`py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {subtitle}
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="space-y-0">
            {items.map((item, index) => (
              <FAQItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 