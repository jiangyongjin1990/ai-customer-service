'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from '../../components/ContactModal';
import TrialModal from '../../components/TrialModal';
import Footer from '../../components/Footer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Check } from 'lucide-react';

// 定义价格方案
const pricingPlans = [
  {
    name: '轻享版',
    price: '468',
    originalPrice: '598',
    period: '30天',
    description: '适合小型店铺或个人卖家',
    features: [
      '电商跨平台聚合与店铺账号无限多开',
      'AI托管账号无限使用',
      'AI智能回复（接入DeepSeek、豆包1.5等大模型）',
      '含5千条AI回复',
      '掉线提醒与自动登录',
      '转接人工配置及售后工单预警'
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
      '电商跨平台聚合与店铺账号无限多开',
      'AI托管账号无限使用',
      'AI智能回复（接入DeepSeek、豆包1.5、gpt-4.1、Grok3等全量大模型）',
      '含16万条AI回复',
      '掉线提醒与自动登录',
      '转接人工配置及售后工单预警',
      '共用问答店铺关联',
      '售后工单看板'
    ],
    color: 'blue',
    cta: '联系我们',
    freeTrial: false,
    popular: true
  },
  {
    name: '尊享版',
    price: '按需定制',
    period: '',
    description: '适合大型企业和电商集团',
    features: [
      '电商跨平台聚合与店铺账号无限多开',
      'AI托管账号无限使用',
      'AI智能回复（接入DeepSeek、豆包1.5、gpt-4.1、Grok3等全量大模型）',
      '含1200万条AI回复',
      '掉线提醒与自动登录',
      '转接人工配置及售后工单预警',
      '共用问答店铺关联',
      '含50个协作账号，支持权限及子账号管理',
      '店铺批量管理与接待监督',
      '专属初始化配置服务及售后工单看板'
    ],
    color: 'amber',
    cta: '联系我们',
    freeTrial: false,
    popular: false
  }
];

// FAQ数据
const faqItems = [
  {
    question: 'AI回复次数是如何计算的？',
    answer: '每次AI系统向客户发送的回复都会计入总次数，包括多轮对话中的每次回复。我们会在控制面板中提供实时使用统计，方便您监控用量。'
  },
  {
    question: '如何添加协作账号？',
    answer: '尊享版支持添加多个协作账号，主账号可在后台管理中心的"团队管理"页面进行添加和权限设置。每个账号都可以设置不同的访问级别和操作权限。'
  },
  {
    question: '是否支持店铺数量的升级？',
    answer: '所有方案均支持无限店铺接入，您可以根据需要添加任意数量的店铺。系统会随着您的店铺增长自动扩展，无需单独升级。'
  },
  {
    question: '是否提供定制化服务？',
    answer: '尊享版用户可获得专属初始化配置服务，我们也提供额外的定制开发服务，可以根据您的业务流程和需求进行个性化定制。请联系销售团队了解更多详情。'
  }
];

// 获取特定颜色的样式
const getColorStyles = (color: string) => {
  const colorMap: Record<string, {
    bgLight: string;
    bgGradient: string;
    text: string;
    border: string;
    dot: string;
    shadow: string;
  }> = {
    emerald: {
      bgLight: 'bg-emerald-50',
      bgGradient: 'bg-gradient-to-r from-emerald-500 to-teal-400',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      dot: 'text-emerald-500',
      shadow: 'shadow-emerald-200/50'
    },
    blue: {
      bgLight: 'bg-blue-50',
      bgGradient: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      text: 'text-blue-600',
      border: 'border-blue-200',
      dot: 'text-blue-500',
      shadow: 'shadow-blue-200/50'
    },
    purple: {
      bgLight: 'bg-purple-50',
      bgGradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      text: 'text-purple-600',
      border: 'border-purple-200',
      dot: 'text-purple-500',
      shadow: 'shadow-purple-200/50'
    },
    amber: {
      bgLight: 'bg-amber-50',
      bgGradient: 'bg-gradient-to-r from-amber-500 to-orange-400',
      text: 'text-amber-600',
      border: 'border-amber-200',
      dot: 'text-amber-500',
      shadow: 'shadow-amber-200/50'
    }
  };
  
  return colorMap[color] || colorMap.blue;
};

// 卡片动画变体
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// FAQ动画变体
const faqVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    } 
  }
};

const faqItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const PricingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [modalTitle, setModalTitle] = useState('联系我们');

  const openContactModal = (title: string = '联系我们') => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeContactModal = () => {
    setIsModalOpen(false);
  };

  const openTrialModal = () => {
    setIsTrialModalOpen(true);
  };
  
  const closeTrialModal = () => {
    setIsTrialModalOpen(false);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* 页面标题和描述 */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">灵活的价格方案</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            根据您的业务需求选择合适的方案，全方位提升客服效率
          </p>
        </motion.div>
        
        {/* 价格卡片容器 */}
        <div className="relative mb-32 px-4">
          {/* 背景装饰 */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-10 w-80 h-80 bg-emerald-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full opacity-5 blur-3xl"></div>
          
          {/* 价格卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            {pricingPlans.map((plan, index) => {
              const colorStyles = getColorStyles(plan.color);
              
              return (
                <motion.div 
                  key={index}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${
                    plan.popular 
                      ? `shadow-xl ${colorStyles.shadow} border-2 border-blue-300 relative` 
                      : 'shadow-lg border border-gray-100 hover:border-gray-200 hover:shadow-xl'
                  }`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold py-1 px-3 rounded-bl-lg z-10">
                      推荐方案
                    </div>
                  )}
                  
                  <div className={`p-8 ${plan.popular ? colorStyles.bgGradient : colorStyles.bgLight}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : ''}`}>{plan.name}</h3>
                    </div>
                    
                    <div className="flex items-baseline mb-1">
                      {plan.price === '按需定制' ? (
                        <span className={`text-3xl font-bold ${plan.popular ? 'text-white' : ''}`}>{plan.price}</span>
                      ) : (
                        <>
                          <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>¥</span>
                          <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : ''}`}>{plan.price}</span>
                          {plan.period && (
                            <span className={`text-sm ml-1 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>/{plan.period}</span>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="h-6 mb-4">
                      {plan.originalPrice && (
                        <div className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                          <span className="line-through">原价¥{plan.originalPrice}</span>
                          {plan.name === '轻享版' && <span className="ml-2 inline-block bg-white/20 text-xs px-2 py-0.5 rounded-full">省¥130</span>}
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>{plan.description}</p>
                    
                    {plan.name === '专业版' || plan.name === '尊享版' ? (
                      <button 
                        onClick={() => openContactModal()}
                        className={`block w-full text-center py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                          plan.popular
                            ? 'bg-white hover:bg-white/90 text-blue-600 shadow-md'
                            : `${colorStyles.bgGradient} text-white hover:shadow-lg`
                        }`}
                      >
                        {plan.cta}
                      </button>
                    ) : (
                      <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <button
                          onClick={openTrialModal}
                          className="relative overflow-hidden w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-500 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-1 transition-all"
                        >
                          <span>免费试用</span>
                          <span className="water-ripple font-bold text-lg bg-white/20 px-1.5 py-0.5 rounded-lg mx-0.5">30</span>
                          <span>天</span>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <ArrowRightIcon className="h-5 w-5" />
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="p-8 bg-white h-full flex flex-col">
                    <h4 className="text-sm uppercase text-gray-500 font-medium mb-4">功能特性</h4>
                    <ul className="space-y-4 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full ${colorStyles.bgLight} ${colorStyles.text} mr-3 flex-shrink-0`}>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-3.5 w-3.5" 
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
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* FAQ部分 */}
        <motion.div 
          className="mt-20 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-10 shadow-lg shadow-blue-100/30"
          variants={faqVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">常见问题</h2>
            <p className="text-gray-600 max-w-xl mx-auto">关于我们的价格和服务的一些常见问题，如果您有其他疑问，请随时联系我们</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="mb-4"
                variants={faqItemVariants}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex justify-between items-center text-left p-5 rounded-xl ${
                    activeFaq === index 
                      ? 'bg-white shadow-md' 
                      : 'bg-white/50 hover:bg-white/70'
                  } transition-all duration-300`}
                >
                  <h3 className="font-semibold text-gray-800">{item.question}</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-blue-500 transform transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {activeFaq === index && (
                  <motion.div 
                    className="bg-white px-5 pt-4 pb-5 rounded-b-xl border-t border-blue-50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* 咨询行动区域 */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">还有疑问？</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            我们的团队随时为您提供帮助，无论是选择合适的方案还是了解更多产品功能
          </p>
          <button
            onClick={() => openContactModal()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            联系销售团队
          </button>
        </motion.div>
        
        {/* 联系我们弹窗 */}
        <ContactModal isOpen={isModalOpen} onClose={closeContactModal} title={modalTitle} />
        <TrialModal isOpen={isTrialModalOpen} onClose={closeTrialModal} />
      </div>
      
      {/* 页脚 */}
      <Footer />
    </main>
  );
};

export default PricingPage; 
 