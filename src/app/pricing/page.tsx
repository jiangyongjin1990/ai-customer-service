'use client';

import Link from 'next/link';
import { useState } from 'react';
import ContactModal from '../../components/ContactModal';

// 定义价格方案
const pricingPlans = [
  {
    name: '轻享版',
    price: '468',
    originalPrice: '598',
    period: '30天',
    description: '适合小型店铺或个人卖家',
    features: [
      '电商跨平台聚合',
      '店铺账号无限多开',
      'AI托管账号无限使用',
      'AI智能回复（大模型）',
      '含5千条AI回复',
      '一键登录',
      '掉线提醒+登录',
      '转接人工配置',
      '售后工单预警'
    ],
    color: 'emerald',
    cta: '免费试用30天！',
    freeTrial: false,
    popular: false
  },
  {
    name: '专业版',
    price: '3,698',
    originalPrice: '4,798',
    period: '年',
    description: '适合中小型店铺和成长团队',
    features: [
      '电商跨平台聚合',
      '店铺账号无限多开',
      'AI托管账号无限使用',
      'AI智能回复（大模型）',
      '含16万条AI回复',
      '一键登录',
      '掉线提醒+登录',
      '转接人工配置',
      '售后工单预警',
      '共用问答店铺关联',
      '售后工单看板'
    ],
    color: 'blue',
    cta: '联系我们',
    freeTrial: false,
    popular: false
  },
  {
    name: '尊享版',
    price: '按需定制',
    period: '',
    description: '适合大型企业和电商集团',
    features: [
      '电商跨平台聚合',
      '店铺账号无限多开',
      'AI托管账号无限使用',
      'AI智能回复（大模型）',
      '含1200万条AI回复',
      '一键登录',
      '掉线提醒+登录',
      '转接人工配置',
      '售后工单预警',
      '共用问答店铺关联',
      '售后工单看板',
      '含50个协作账号',
      '权限及子账号管理',
      '店铺批量管理',
      '接待监督',
      '专属初始化配置服务',
      '售后工单看板'
    ],
    color: 'amber',
    cta: '联系我们',
    freeTrial: false,
    popular: true
  }
];

// 获取特定颜色的样式
const getColorStyles = (color: string) => {
  const colorMap: Record<string, {
    bgLight: string;
    bg: string;
    text: string;
    border: string;
    dot: string;
  }> = {
    emerald: {
      bgLight: 'bg-emerald-50',
      bg: 'bg-emerald-500',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      dot: 'text-emerald-500'
    },
    blue: {
      bgLight: 'bg-blue-50',
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      border: 'border-blue-200',
      dot: 'text-blue-500'
    },
    purple: {
      bgLight: 'bg-purple-50',
      bg: 'bg-purple-500',
      text: 'text-purple-600',
      border: 'border-purple-200',
      dot: 'text-purple-500'
    },
    amber: {
      bgLight: 'bg-amber-50',
      bg: 'bg-amber-500',
      text: 'text-amber-600',
      border: 'border-amber-200',
      dot: 'text-amber-500'
    }
  };
  
  return colorMap[color] || colorMap.blue;
};

export default function PricingPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">灵活的价格方案</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          根据您的业务需求选择合适的方案，全方位提升客服效率
        </p>
      </div>
      
      <div className="p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-green-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full opacity-5 blur-3xl"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {pricingPlans.map((plan, index) => {
            const colorStyles = getColorStyles(plan.color);
            
            return (
          <div 
            key={index}
                className={`rounded-xl overflow-hidden ${
              plan.popular 
                    ? 'shadow-lg border border-amber-300 relative' 
                    : 'shadow-md border border-gray-200'
            }`}
          >
            {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold py-1 px-3 rounded-bl-lg z-10">
                    企业推荐
              </div>
            )}
            
                <div className={`p-6 ${colorStyles.bgLight}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  
                  <div className="flex items-baseline mb-1">
                    {plan.price === '按需定制' ? (
                      <span className="text-3xl font-bold">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-sm">¥</span>
                        <span className="text-3xl font-bold">{plan.price}</span>
                        {plan.period && (
                          <span className="text-sm text-gray-500 ml-1">/{plan.period}</span>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div className="h-8 mb-2">
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500">原价¥{plan.originalPrice}</div>
                    )}
                  </div>
                  
                  {plan.price === '按需定制' || plan.name === '专业版' ? (
                    <button 
                      onClick={openContactModal}
                      className={`block w-full text-center py-2.5 px-4 rounded-lg font-medium ${
                        plan.name === '尊享版'
                          ? `${colorStyles.bgLight} hover:bg-opacity-80 ${colorStyles.text} border ${colorStyles.border}`
                          : `${colorStyles.bgLight} hover:bg-opacity-80 ${colorStyles.text} border ${colorStyles.border}`
                      } transition-all duration-300`}
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <Link 
                      href="/demo"
                      className={`block w-full text-center py-2.5 px-4 rounded-lg font-medium ${
                        plan.name === '轻享版'
                          ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-none custom-pulse'
                          : `${colorStyles.bgLight} hover:bg-opacity-80 ${colorStyles.text} border ${colorStyles.border}`
                      } transition-all duration-300`}
                      style={plan.name === '轻享版' ? {
                        animation: 'custom-pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)'
                      } : {}}
                    >
                      {plan.name === '轻享版' ? (
                        <div className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>免费试用<span className="font-bold text-lg bg-white/30 px-1 rounded-md mx-0.5">30</span>天！</span>
                        </div>
                      ) : (
                        plan.cta
                      )}
                    </Link>
                  )}
              </div>
              
                <div className="p-6 bg-white h-full flex flex-col">
                  <ul className="space-y-3 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                        <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full ${colorStyles.dot} mr-2`}>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                    >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                        </span>
                        <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
                  {plan.freeTrial && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
              <Link 
                        href="/demo"
                        className="block w-full text-center py-2 px-4 rounded-lg font-medium border border-emerald-300 text-emerald-600 hover:bg-emerald-50"
              >
                        免费试用
              </Link>
            </div>
                  )}
                </div>
              </div>
            );
          })}
          </div>
      </div>
      
      <div className="mt-20 bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">常见问题</h2>
          <p className="text-gray-600">关于我们的价格和服务的一些常见问题</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">AI回复次数是如何计算的？</h3>
            <p className="text-gray-600">每次AI系统向客户发送的回复都会计入总次数，包括多轮对话中的每次回复。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">如何添加协作账号？</h3>
            <p className="text-gray-600">尊享版支持添加多个协作账号，主账号可在后台管理中心进行添加和权限设置。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">是否支持店铺数量的升级？</h3>
            <p className="text-gray-600">所有方案均支持无限店铺接入，您可以根据需要添加任意数量的店铺。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">是否提供定制化服务？</h3>
            <p className="text-gray-600">尊享版用户可获得专属初始化配置服务，我们也提供额外的定制开发服务，请联系销售了解更多。</p>
          </div>
        </div>
      </div>
      
      {/* 联系我们弹窗 */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
} 
 