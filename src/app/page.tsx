'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  UserGroupIcon,
  SquaresPlusIcon,
  AcademicCapIcon,
  CpuChipIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Footer from '../components/Footer';
import AnimatedNumber from "../components/AnimatedNumber";
import CTASection from "../components/CTASection";

// 组件与图标
const TickIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    className={`h-5 w-5 mr-2 ${className || ''}`}
  >
    <path 
      fillRule="evenodd" 
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
      clipRule="evenodd" 
    />
  </svg>
);

/**
 * AI Agent徽章组件
 * @returns {JSX.Element} 渲染的AI Agent徽章
 */
const AiAgentBadge = () => (
  <div className="flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-[#4e90cc] to-[#9478f0] shadow-md transform scale-75">
    <svg className="h-3 w-3 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
    </svg>
    <span className="text-white text-xs font-medium">AI Agent</span>
  </div>
);

/**
 * 首页组件
 * @returns {JSX.Element} 渲染的首页组件
 */
export default function Home() {
  // 错误状态
  const [hasError, setHasError] = useState(false);

  // 捕获渲染错误
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('首页错误被捕获:', error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">加载失败</h2>
          <p className="text-gray-600 mb-6">
            网站主页加载失败。请刷新页面重试。
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }

  // 状态管理
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // 设置鼠标位置追踪
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.7 } 
    }
  };
  
  return (
    <main className="gradient-bg">
      {/* 添加顶部渐变背景区域，用于增强毛玻璃效果的视觉表现 */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-400/20 via-purple-300/10 to-transparent z-0 pointer-events-none"></div>
      
      {/* 背景装饰元素 */}
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>
      <div className="bg-blob-3"></div>
      <div className="bg-blob-4"></div>
      <div className="bg-blob-5"></div>

      {/* --- Hero Section --- */}
      <section className="relative pt-28 pb-6 md:pt-36 md:pb-8 overflow-hidden w-full bg-gradient-to-br from-blue-50 via-purple-50/20 to-cyan-50 glass-morphism glass-frost">
        {/* 背景装饰模糊圆形 - 增强毛玻璃效果的视觉层次感 */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-400/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-blue-400/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full filter blur-3xl"></div>
        
        {/* 跟随鼠标移动的交互光效 */}
        <motion.div
          className="absolute w-64 h-64 bg-white/10 rounded-full filter blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 250,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight md:leading-tight text-center whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block">让企业轻松拥有</span>
            {/* 使用相对定位容器包裹文字和徽章 */}
            <span className="relative inline-block">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-wave-text">智能客服</span>
              {/* 绝对定位徽章到右上角 - 使用 top-0 和 translate-y */}
              <span className="absolute top-0 left-full ml-1 transform -translate-y-1/2">
                <AiAgentBadge />
              </span>
            </span>
          </motion.h2>
          
          <motion.div 
            className="relative mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              每一次对话，<span className="font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">都是一次升级</span>
            </p>
          </motion.div>
          
          {/* 视频展示区域 */}
          <motion.div
            className="max-w-lg mx-auto mb-8 glass-card-transition rounded-xl overflow-hidden border border-indigo-100/30 shadow-lg backdrop-blur-sm bg-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {/* 视频区域 */}
            <div className="aspect-w-16 aspect-h-9 bg-transparent">
              <video
                className="w-full h-full object-cover rounded-t-xl"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/images/维普特官网视频.webm" type="video/webm" />
                您的浏览器不支持视频播放，请更换浏览器或更新版本。
              </video>
            </div>
            
            {/* 视频下方说明区域 */}
            <div className="p-3 bg-white/20 backdrop-blur-md border-t border-indigo-100/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#4e90cc] to-[#9478f0] flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-xs font-semibold text-gray-800">AI客服维普特</h3>
                    <p className="text-xs text-gray-500">18400000011</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* 装饰性浮动图形 */}
          <motion.div 
            className="absolute top-0 -right-20 md:-right-10 lg:right-0 w-48 h-48 opacity-80 pointer-events-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute w-20 h-20 rounded-full bg-[rgba(var(--color-tranquil-blue),0.2)] right-10 top-10 animate-pulse" style={{animationDuration: '3s'}}></div>
            <div className="absolute w-12 h-12 rounded-full bg-[rgba(var(--color-digital-lavender),0.3)] right-20 top-20 animate-pulse" style={{animationDuration: '2.5s'}}></div>
            <div className="absolute w-16 h-16 rounded-full bg-[rgba(var(--color-neo-mint),0.25)] right-0 top-5 animate-pulse" style={{animationDuration: '4s'}}></div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-10 -left-20 md:-left-10 lg:left-0 w-48 h-48 opacity-80 pointer-events-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="absolute w-20 h-20 rounded-full bg-[rgba(var(--color-peach-fuzz),0.2)] left-10 bottom-10 animate-pulse" style={{animationDuration: '3.5s'}}></div>
            <div className="absolute w-14 h-14 rounded-full bg-[rgba(var(--color-butter-yellow),0.25)] left-24 bottom-5 animate-pulse" style={{animationDuration: '2.3s'}}></div>
            <div className="absolute w-16 h-16 rounded-full bg-[rgba(var(--color-calming-coral),0.2)] left-5 bottom-20 animate-pulse" style={{animationDuration: '3.7s'}}></div>
          </motion.div>
        </div>
      </section>

      {/* --- 新增模块：电商客服特性 --- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            <div className="inline-flex flex-wrap justify-center items-center">
              <span>比人工客服效率提升</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500 font-semibold inline-flex mx-1">
                <AnimatedNumber
                  targetNumber={10}
                  duration={1}
                  className="inline-block w-[36px] text-center"
                />
                <span className="ml-1.5">倍</span>
              </span>
              <span>，成本节省</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500 font-semibold inline-flex mx-1">
                <AnimatedNumber
                  targetNumber={90}
                  duration={2}
                  className="inline-block w-[40px] text-center"
                />
                <span className="ml-0.5">%</span>
              </span>
            </div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mt-12 max-w-6xl mx-auto">
            {[ // Feature data array - START MODIFICATION - Update Copywriting (Option 1)
              { // Moved from index 3 to 0
                icon: CpuChipIcon,
                title: "百店同管，AI客服超强引擎", // Updated Title
                desc: "专为电商优化的大模型 AI，一台电脑轻松管理超百家店铺，7x24小时自动回复，外包团队必备。", // Updated Description
                badge: "外包必用",
                iconBgClass: "bg-gradient-to-r from-[#3E50E0] to-[#3343c0]",
                titleTextClass: "text-[#3E50E0]",
                badgeBgClass: "bg-[#3E50E0]/10",
                badgeTextClass: "text-[#3E50E0]",
                iconImage: "/images/icons/cpu-icon.png" // 添加图标图片路径
              },
              { // Original index 0, now 1
                icon: SquaresPlusIcon,
                title: "多平台店铺，一处搞定", // Updated Title
                desc: "一键聚合淘宝、拼多多、抖音等多平台店铺，告别繁琐切换，统一高效管理。", // Updated Description
                badge: "店群必用",
                iconBgClass: "bg-gradient-to-r from-orange-500 to-orange-600",
                titleTextClass: "text-orange-700",
                badgeBgClass: "bg-orange-100",
                badgeTextClass: "text-orange-800",
                iconImage: "/images/icons/squares-icon.png" // 添加图标图片路径
              },
              { // Original index 1, now 2
                icon: AcademicCapIcon,
                title: "AI秒懂商品，自动回复专家", // Updated Title
                desc: "AI 自动学习商品详情、规格、库存，7x24小时精准回答客户咨询，提升转化率。", // Updated Description
                iconBgClass: "bg-gradient-to-r from-[#F7CA36] to-[#e6b82c]",
                titleTextClass: "text-[#F7CA36]",
                iconImage: "/images/icons/academic-icon.png" // 添加图标图片路径
              },
              { // Original index 5, now 3 - 交换位置
                icon: ExclamationTriangleIcon,
                title: "智能识别恶意行为", // 缩短的标题
                desc: "AI 智能识别潜在的恶意用户、差评师，提前预警，帮助客服规避风险，保护店铺声誉。", // Updated Description
                iconBgClass: "bg-gradient-to-r from-green-500 to-green-600",
                titleTextClass: "text-green-700",
                iconImage: "/images/icons/warning-icon.png" // 添加图标图片路径
              },
              { // Original index 4, now 4
                icon: ClockIcon,
                title: "3分钟响应，平台指标必达", // Keep concise title
                desc: "AI 全天候在线，确保 3 分钟内响应客户，轻松满足各大电商平台考核指标，避免超时处罚。", // Restore Description
                badge: "小商家必用",
                iconBgClass: "bg-gradient-to-r from-purple-500 to-purple-600",
                titleTextClass: "text-purple-700",
                iconImage: "/images/icons/clock-icon.png" // 添加图标图片路径
              },
              { // Original index 3, now 5 - 交换位置
                icon: UserGroupIcon,
                title: "团队协作，权限灵活分配", // Updated Title
                desc: "支持多人同时在线协作，主账号灵活分配子账号权限，精细化管理店铺，提升团队效率。", // Updated Description
                iconBgClass: "bg-gradient-to-r from-[#6AA8FA] to-[#5897e6]",
                titleTextClass: "text-[#6AA8FA]",
                iconImage: "/images/icons/user-group-icon.png" // 添加图标图片路径
              }
              // END MODIFICATION
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className={`backdrop-blur-lg border border-white/30 px-7 pt-7 pb-4 md:px-8 md:pt-8 md:pb-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col relative overflow-hidden ${
                  feature.title === "百店同管，AI客服超强引擎" ? "bg-gradient-to-br from-[#3E50E0]/2 via-white/70 to-white/80" :
                  feature.title === "多平台店铺，一处搞定" ? "bg-gradient-to-br from-orange-500/2 via-white/70 to-white/80" :
                  feature.title === "AI秒懂商品，自动回复专家" ? "bg-gradient-to-br from-[#F7CA36]/2 via-white/70 to-white/80" :
                  feature.title === "智能识别恶意行为" ? "bg-gradient-to-br from-green-500/2 via-white/70 to-white/80" :
                  feature.title === "3分钟响应，平台指标必达" ? "bg-gradient-to-br from-purple-500/2 via-white/70 to-white/80" :
                  "bg-gradient-to-br from-[#6AA8FA]/2 via-white/70 to-white/80"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}
              >
                {/* 添加卡片闪光边框动画效果 */}
                <div 
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r ${
                    feature.title === "百店同管，AI客服超强引擎" ? "from-[#3E50E0]/15 via-[#3E50E0]/0 to-[#3E50E0]/15" :
                    feature.title === "多平台店铺，一处搞定" ? "from-orange-500/15 via-orange-500/0 to-orange-500/15" :
                    feature.title === "AI秒懂商品，自动回复专家" ? "from-[#F7CA36]/15 via-[#F7CA36]/0 to-[#F7CA36]/15" :
                    feature.title === "智能识别恶意行为" ? "from-green-500/15 via-green-500/0 to-green-500/15" :
                    feature.title === "3分钟响应，平台指标必达" ? "from-purple-500/15 via-purple-500/0 to-purple-500/15" :
                    "from-[#6AA8FA]/15 via-[#6AA8FA]/0 to-[#6AA8FA]/15"
                  } opacity-0 animate-shimmer -z-10`}
                  style={{animationDelay: `${index * 0.2}s`}}
                ></div>
                
                {/* Diagonal Banner - Apply to the three specified cards - Use correct titles */}
                {feature.badge && (feature.title === "百店同管，AI客服超强引擎" || feature.title === "3分钟响应，平台指标必达" || feature.title === "多平台店铺，一处搞定") && (
                  <div className={`absolute top-0 right-0 w-28 h-28 overflow-hidden rounded-tr-lg`}>
                     <span 
                        className={`absolute block w-40 transform rotate-45 text-center -right-10 top-[24px] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white shadow-md ${feature.iconBgClass} opacity-80`}
                     >
                        {feature.badge}
                     </span>
                  </div>
                )}

                <div className="flex items-center mb-5 group">
                  {/* 超现代风格的图标容器 - 全新设计 */}
                  <div className="flex-shrink-0 mr-3 transform transition-all duration-300 group-hover:scale-105">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      {/* 使用Image组件加载图标图片 */}
                      <Image
                        src={feature.iconImage || "/images/icons/default-icon.png"} 
                        alt={feature.title}
                        width={feature.title === "AI秒懂商品，自动回复专家" ? 64 : 56}
                        height={feature.title === "AI秒懂商品，自动回复专家" ? 64 : 56}
                        className={feature.title === "AI秒懂商品，自动回复专家" ? "object-cover scale-110" : "object-contain"}
                      />
                    </div>
                  </div>
                  <h3 className={`${feature.title === "AI火眼金睛：智能识别恶意行为" ? "text-sm" : "text-lg"} font-semibold ${feature.titleTextClass} group-hover:translate-x-0.5 transition-transform duration-300 leading-tight whitespace-nowrap`}>{feature.title}</h3>
                </div>
                <p className={`text-gray-600 text-sm leading-relaxed mb-5 flex-grow mx-1`}>{feature.desc}</p>
                
                {/* Badge for other cards (non-diagonal) - Exclude the ones with diagonal banner - Use correct titles */}
                {feature.badge && feature.title !== "百店同管，AI客服超强引擎" && feature.title !== "3分钟响应，平台指标必达" && feature.title !== "多平台店铺，一处搞定" && (
                  <span className={`self-start inline-block ${feature.badgeBgClass} ${feature.badgeTextClass} text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-1 ml-1 uppercase`}>
                    {feature.badge}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Customer Growth Stats Section --- */}
      <motion.section 
        className="py-14 md:py-20 relative overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center relative z-10 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-gray-900">
            超过 <span className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">400</span>家企业使用维普特智能客服
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-x-6 max-w-6xl mx-auto">
            <motion.div 
              className="glass-blue glass-card-transition p-3 rounded-xl border border-blue-200/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-60 backdrop-blur-sm"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              {/* 添加内部脉冲圆形 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500/20 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
              <AnimatedNumber
                targetNumber={30}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-1"
                suffixElement={<span className="text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1">+</span>}
              />
              <div className="text-xs sm:text-sm text-gray-500">月服务时长</div>
            </motion.div>
            <motion.div 
              className="glass-purple glass-card-transition p-3 rounded-xl border border-purple-200/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-60 backdrop-blur-sm"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              {/* 添加内部脉冲圆形 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-500/20 rounded-full animate-ping" style={{animationDuration: '3.5s'}}></div>
              <AnimatedNumber
                targetNumber={40}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-1"
                suffixElement={<span className="text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1">万+</span>}
              />
              <div className="text-xs sm:text-sm text-gray-500">注册账号数</div>
            </motion.div>
            <motion.div 
              className="glass-teal glass-card-transition p-3 rounded-xl border border-teal-200/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-60 backdrop-blur-sm"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              {/* 添加内部脉冲圆形 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-teal-500/20 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
              <AnimatedNumber
                targetNumber={100}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-600 mb-1"
                suffixElement={<span className="text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1">亿+</span>}
              />
              <div className="text-xs sm:text-sm text-gray-500">年消息收发量</div>
            </motion.div>
            <motion.div 
              className="glass-amber glass-card-transition p-3 rounded-xl border border-amber-200/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-60 backdrop-blur-sm"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              {/* 添加内部脉冲圆形 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-500/20 rounded-full animate-ping" style={{animationDuration: '3.2s'}}></div>
              <AnimatedNumber
                targetNumber={99}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-600 mb-1"
                suffixElement={<span className="text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1">%</span>}
              />
              <div className="text-xs sm:text-sm text-gray-500">客户满意度</div>
            </motion.div>
          </div>
        </div>
        
        {/* 背景装饰圆形 */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-200/10 filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-purple-200/10 filter blur-3xl"></div>
      </motion.section>

      {/* --- 从智能辅助到独立客服 Section --- */}
      <motion.section 
        className="py-16 md:py-24 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-gray-900">
            从智能辅助到<span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">独立客服</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 md:mb-12">
            根据业务需求选择适合的模式，灵活部署，高效运营
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* 智能辅助模式 */}
            <motion.div 
              className="bg-blue-50/70 rounded-2xl overflow-hidden shadow-lg border border-blue-100/50 relative h-[320px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              {/* 添加下边缘收缩效果 */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50/70 to-transparent z-30"></div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mr-3">智能辅助模式</h3>
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                    智能模式
                </span>
                </div>
                
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  AI辅助人工客服，提高效率和服务质量
                </p>
                
                <div className="flex">
                  <div className="w-1/2">
                    <ul className="space-y-3 mb-4">
                      {[
                        "智能回复推荐，快速响应",
                        "自动分类标记，降低工作量",
                        "知识库智能匹配，减少重复劳动",
                        "客服绩效分析，持续优化服务"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <TickIcon className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
            </div>
            
                  <div className="w-1/2">
                    <motion.div 
                      className="relative h-[420px] overflow-visible"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* 底层图片 - 调整位置 */}
                      <motion.div 
                        className="absolute top-[-40px] right-[-35%] left-5 z-10"
                        initial={{ y: 100, opacity: 0, rotate: -8, scale: 0.8 }}
                        whileInView={{ 
                          y: 0, 
                          opacity: 1,
                          rotate: -8, 
                          scale: 1,
                          transition: { 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15, 
                            delay: 0.2,
                            bounce: 0.4
                          } 
                        }}
                        viewport={{ once: true, amount: 0.1 }}
                        whileHover={{ 
                          rotate: 10,
                          scale: 1.05,
                          transition: { duration: 0.3, ease: "easeOut" } 
                        }}
                      >
                        <Image 
                          src="/images/zhinengfuzhu4.png" 
                          alt="智能辅助功能详情" 
                          width={500} 
                          height={350}
                          className="object-contain transform" 
                          priority
                        />
                      </motion.div>
                      
                      {/* 上层图片 - 调整位置使底部刚好被截断五分之一 */}
                      <motion.div 
                        className="absolute top-[30px] left-0 right-[-35%] z-20"
                        initial={{ y: 80, opacity: 0, rotate: 2, scale: 0.8 }}
                        whileInView={{ 
                          y: 0, 
                          opacity: 1,
                          rotate: 2, 
                          scale: 1,
                          transition: { 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15, 
                            delay: 0.4,
                            bounce: 0.4
                          } 
                        }}
                        viewport={{ once: true, amount: 0.1 }}
                        whileHover={{ 
                          rotate: 4,
                          scale: 1.05,
                          y: -5,
                          transition: { duration: 0.3, ease: "easeOut" } 
                        }}
                      >
                        <Image 
                          src="/images/zhinengfuzhu1.png" 
                          alt="智能辅助模式界面" 
                          width={500} 
                          height={350}
                          className="object-contain transform"
                          priority
                        />
                      </motion.div>
                    </motion.div>
                </div>
                </div>
              </div>
            </motion.div>
            
            {/* 独立客服模式 */}
            <motion.div 
              className="bg-indigo-50/70 rounded-2xl overflow-hidden shadow-lg border border-indigo-100/50 relative h-[320px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              {/* 添加下边缘收缩效果 */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-50/70 to-transparent z-30"></div>
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">独立客服模式</h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  独立解决90%以上的常见问题，节省人力成本
                </p>
                
                <div className="flex">
                  <div className="w-1/2">
                    <ul className="space-y-3 mb-4">
                      {[
                        "7×24小时不间断服务",
                        "多轮对话理解，一问多答",
                        "深度集成知识库，持续学习",
                        "人机无缝协作，复杂问题转人工"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <TickIcon className="text-indigo-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
          </div>
          
                  <div className="w-1/2">
                    <motion.div 
                      className="relative h-[420px] overflow-visible"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* 底层图片 */}
                      <motion.div 
                        className="absolute top-[-40px] right-[-35%] left-5 z-10"
                        initial={{ y: 100, opacity: 0, rotate: -8, scale: 0.8 }}
                        whileInView={{ 
                          y: 0, 
                          opacity: 1,
                          rotate: -8, 
                          scale: 1,
                          transition: { 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15, 
                            delay: 0.2,
                            bounce: 0.4
                          } 
                        }}
                        viewport={{ once: true, amount: 0.1 }}
                        whileHover={{ 
                          rotate: 10,
                          scale: 1.05,
                          transition: { duration: 0.3, ease: "easeOut" } 
                        }}
                      >
                        <Image 
                          src="/images/zhinengfuzhu3.png" 
                          alt="独立客服功能详情" 
                          width={500} 
                          height={350}
                          className="object-contain transform"
                          priority
                        />
                      </motion.div>
                      
                      {/* 上层图片 */}
              <motion.div 
                        className="absolute top-[30px] left-0 right-[-35%] z-20"
                        initial={{ y: 80, opacity: 0, rotate: 2, scale: 0.8 }}
                        whileInView={{ 
                          y: 0, 
                          opacity: 1,
                          rotate: 2, 
                          scale: 1,
                          transition: { 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15, 
                            delay: 0.4,
                            bounce: 0.4
                          } 
                        }}
                        viewport={{ once: true, amount: 0.1 }}
                whileHover={{ 
                          rotate: 4,
                          scale: 1.05,
                  y: -5,
                          transition: { duration: 0.3, ease: "easeOut" } 
                        }}
                      >
                        <Image 
                          src="/images/zhinengfuzhu2.png" 
                          alt="独立客服模式界面" 
                          width={500} 
                          height={350}
                          className="object-contain transform"
                          priority
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
              </motion.div>
           </div>
        </div>
      </motion.section>

      {/* --- CTA Section --- */}
      <CTASection />

      {/* 页脚 */}
      <Footer />

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            opacity: 0;
            background-position: -100% 0;
          }
          10% {
            opacity: 0.5;
          }
          30% {
            opacity: 0.3;
          }
          70% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 4s linear infinite;
          background-size: 200% 100%;
        }
        
        /* 水波文字动画效果 */
        @keyframes wave-text {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-wave-text {
          background-size: 300% auto;
          animation: wave-text 5s linear infinite;
          background-image: linear-gradient(45deg, 
            #4e90cc, #7d7af9, #9678f4, #4ba3e3, #4e64e3, 
            #6a80f6, #8878ff, #4ba3e3, #4e90cc);
        }
      `}</style>
    </main>
  );
}

/**
 * 统计数字组件
 * @param {Object} props - 组件属性
 * @param {number} props.value - 统计数值 (内部将传递给 AnimatedNumber 的 targetNumber)
 * @param {string} props.label - 标签文本
 * @param {string} props.prefix - 前缀符号
 * @param {string} props.suffix - 后缀符号
 * @returns {JSX.Element} 渲染的统计数字组件
 */
const StatNumber = ({ value, label, prefix = '', suffix = '' }: { 
  value: number; 
  label: string; 
  prefix?: string;
  suffix?: string;
}) => (
  <div className="text-center">
    <div className="text-3xl sm:text-4xl font-bold mb-2 text-gradient-blue-purple">
      {prefix}<AnimatedNumber targetNumber={value} />{suffix} 
    </div>
    <p className="text-gray-600">{label}</p>
  </div>
);

