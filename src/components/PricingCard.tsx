import React from 'react';

/**
 * 价格卡片特性接口
 * @typedef {object} PricingFeature
 * @property {string} text - 特性描述文本
 * @property {boolean} [included] - 是否包含此特性
 */
interface PricingFeature {
  text: string;
  included?: boolean;
}

/**
 * 价格卡片属性接口
 * @typedef {object} PricingCardProps
 * @property {string} title - 价格方案标题
 * @property {string} price - 价格
 * @property {string} [period] - 价格周期
 * @property {string} [description] - 方案描述
 * @property {PricingFeature[]} features - 特性列表
 * @property {string} [buttonText] - 按钮文本
 * @property {() => void} [onButtonClick] - 按钮点击处理函数
 * @property {boolean} [popular] - 是否为推荐方案
 * @property {string} [className] - 额外的样式类名
 */
interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  buttonText?: string;
  onButtonClick?: () => void;
  popular?: boolean;
  className?: string;
}

/**
 * 价格卡片组件
 * @param {PricingCardProps} props - 组件属性
 */
export default function PricingCard({
  title,
  price,
  period = '月',
  description,
  features,
  buttonText = '开始使用',
  onButtonClick,
  popular = false,
  className = '',
}: PricingCardProps) {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm overflow-hidden
        ${popular ? 'ring-2 ring-blue-500' : 'border border-gray-200'}
        ${className}
      `}
    >
      {popular && (
        <div className="bg-blue-500 py-1 px-4 text-center">
          <p className="text-xs font-medium text-white uppercase">推荐方案</p>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}
        
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          {period && (
            <span className="ml-1 text-sm text-gray-500">/{period}</span>
          )}
        </div>
        
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                {feature.included !== false ? (
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className={`ml-3 text-sm ${feature.included !== false ? 'text-gray-700' : 'text-gray-400'}`}>
                {feature.text}
              </p>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <button
            onClick={onButtonClick}
            className={`
              w-full rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
              ${popular 
                ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-500'
              }
            `}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
} 

/**
 * 价格卡片特性接口
 * @typedef {object} PricingFeature
 * @property {string} text - 特性描述文本
 * @property {boolean} [included] - 是否包含此特性
 */
interface PricingFeature {
  text: string;
  included?: boolean;
}

/**
 * 价格卡片属性接口
 * @typedef {object} PricingCardProps
 * @property {string} title - 价格方案标题
 * @property {string} price - 价格
 * @property {string} [period] - 价格周期
 * @property {string} [description] - 方案描述
 * @property {PricingFeature[]} features - 特性列表
 * @property {string} [buttonText] - 按钮文本
 * @property {() => void} [onButtonClick] - 按钮点击处理函数
 * @property {boolean} [popular] - 是否为推荐方案
 * @property {string} [className] - 额外的样式类名
 */
interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  buttonText?: string;
  onButtonClick?: () => void;
  popular?: boolean;
  className?: string;
}

/**
 * 价格卡片组件
 * @param {PricingCardProps} props - 组件属性
 */
export default function PricingCard({
  title,
  price,
  period = '月',
  description,
  features,
  buttonText = '开始使用',
  onButtonClick,
  popular = false,
  className = '',
}: PricingCardProps) {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm overflow-hidden
        ${popular ? 'ring-2 ring-blue-500' : 'border border-gray-200'}
        ${className}
      `}
    >
      {popular && (
        <div className="bg-blue-500 py-1 px-4 text-center">
          <p className="text-xs font-medium text-white uppercase">推荐方案</p>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}
        
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          {period && (
            <span className="ml-1 text-sm text-gray-500">/{period}</span>
          )}
        </div>
        
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                {feature.included !== false ? (
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className={`ml-3 text-sm ${feature.included !== false ? 'text-gray-700' : 'text-gray-400'}`}>
                {feature.text}
              </p>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <button
            onClick={onButtonClick}
            className={`
              w-full rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
              ${popular 
                ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-500'
              }
            `}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
} 