'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import TestimonialsSection from "@/components/TestimonialsSection";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  RocketLaunchIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

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

const AiAgentBadge = () => (
  <span className="inline-flex px-1.5 py-0.5 bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white text-[9px] leading-none rounded-full font-medium items-center">AI Agent</span>
);

// Animated Number Component
interface AnimatedNumberProps {
    targetNumber: number;
    duration?: number;
    className?: string;
    suffixElement?: React.ReactNode;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
    targetNumber,
    duration = 1.5, // Default 1.5 seconds
    className,
    suffixElement,
}) => {
    const numberRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false); // Track if animation ran
    const nodeRef = useRef<HTMLDivElement>(null); // Ref for the container div to check visibility

    useEffect(() => {
        const node = numberRef.current;
        const containerNode = nodeRef.current;

        if (node && containerNode) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !hasAnimated.current) {
                            hasAnimated.current = true; // Mark as animated
                            /* const controls = */ animate(0, targetNumber, {
                                duration: duration,
                                ease: "easeOut",
                                onUpdate(value: number) {
                                    // Ensure node still exists during animation frame
                                    if(numberRef.current) {
                                        numberRef.current.textContent = Math.round(value).toString();
                                    }
                                },
                            });
                            // No need to return controls.stop() from here as we rely on hasAnimated flag
                        }
                    });
                },
                {
                    threshold: 0.3, // Trigger when 30% visible
                }
            );

            observer.observe(containerNode);

            // Cleanup observer on component unmount
            return () => {
                if (containerNode) {
                    observer.unobserve(containerNode);
                }
            };
        }
    }, [targetNumber, duration]); // Dependencies

    return (
        <div className={className} ref={nodeRef}> {/* Attach ref to the container */}
            {/* Initialize display to 0 */}
            <span ref={numberRef}>0</span>
            {suffixElement}
        </div>
    );
};

export default function Home() {
  // 状态管理
  // const [activeIndustry, setActiveIndustry] = useState(0);
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
  
  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.7 } 
    }
  };
  
  const cardHoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
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
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden w-full bg-gradient-to-br from-blue-50 via-purple-50/20 to-cyan-50 glass-morphism glass-frost">
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
        
        {/* AI Agent标签 - 右上角 (移到 container 外) */}
        {/* 
        <motion.div
          className="absolute top-8 right-8 md:top-10 md:right-10 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-[#4e90cc] to-[#9478f0] shadow-md">
            <svg className="h-3 w-3 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-xs font-medium">AI Agent</span>
          </div>
        </motion.div>
        */}

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight md:leading-tight text-center whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block">让企业轻松拥有</span>
            {/* 使用相对定位容器包裹文字和徽章 */}
            <span className="relative inline-block">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">智能客服</span>
              {/* 绝对定位徽章到右上角 - 使用 top-0 和 translate-y */}
              <span className="absolute top-0 left-full ml-1 transform -translate-y-1/2">
                <AiAgentBadge />
              </span>
            </span>
          </motion.h2>

          {/* AI Agent标签 - 原位置已注释 */}
          {/* 
          <motion.div
            className="absolute top-8 right-8 md:top-10 md:right-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-[#4e90cc] to-[#9478f0] shadow-md">
              <svg className="h-3 w-3 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-xs font-medium">AI Agent</span>
            </div>
          </motion.div>
          */}
          
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
            className="max-w-lg mx-auto mb-10 glass-card-transition rounded-xl overflow-hidden border border-indigo-100/30 shadow-lg backdrop-blur-sm bg-white/10"
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
              >
                <source src="/images/美洽官网视频.webm" type="video/webm" />
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
                    <h3 className="text-xs font-semibold text-gray-800">AI客服小嘉</h3>
                    <p className="text-xs text-gray-500">18400000011</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/demo" className="btn-glass group px-5 py-2.5 text-base font-medium flex items-center justify-center">
              预约演示
              <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="/free-trial" className="btn-glass-blue group px-5 py-2.5 text-base font-medium flex items-center justify-center">
              免费试用
              <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
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

      {/* --- Customer Growth Stats Section --- */}
      <motion.section 
        className="py-14 md:py-20 relative overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-gray-900">
            超过 <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">400</span>家企业使用小嘉智能客服
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-x-6 max-w-4xl mx-auto">
            <motion.div 
              className="glass-blue glass-card-transition p-3 rounded-xl border border-blue-200/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-60 backdrop-blur-sm"
            >
              <AnimatedNumber
                targetNumber={30}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-1"
                suffixElement={<span className="text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1">+</span>}
              />
              <div className="text-xs sm:text-sm text-gray-500">月服务时长</div>
            </motion.div>
            <motion.div 
              className="glass-purple glass-card-transition p-3 rounded-xl border border-purple-200/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-60 backdrop-blur-sm"
            >
              <AnimatedNumber
                targetNumber={40}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-1"
                suffixElement={<span className="text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1">万+</span>}
              />
              <div className="text-xs sm:text-sm text-gray-500">注册账号数</div>
            </motion.div>
            <motion.div 
              className="glass-teal glass-card-transition p-3 rounded-xl border border-teal-200/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-60 backdrop-blur-sm"
            >
              <AnimatedNumber
                targetNumber={100}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-600 mb-1"
                suffixElement={<span className="text-2xl sm:text-3xl md:text-4xl font-medium relative -top-1">亿+</span>}
              />
              <div className="text-xs sm:text-sm text-gray-500">年消息收发量</div>
            </motion.div>
            <motion.div 
              className="glass-amber glass-card-transition p-3 rounded-xl border border-amber-200/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-opacity-60 backdrop-blur-sm"
            >
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

      {/* --- Why Choose Section - 优化移动端显示 --- */}
      <motion.section 
        className="py-16 md:py-28 bg-gradient-to-b from-teal-50/30 via-blue-50/50 to-cyan-50/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
            为什么选择<span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">小嘉</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-8 md:mb-12 max-w-xl mx-auto">简单、易用、强大，不断进化的 AI 能力</p>
          
          {/* Top row of benefits - Enhanced for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 md:mb-12 max-w-5xl mx-auto">
            {[
              { title: "用小嘉 AI 可快速构建与升级企业知识库", color: "blue" },
              { title: "简单易用，快速配置，轻量维护", color: "purple" },
              { title: "获线转化、效率提升，效果看得见", color: "teal" },
              { title: "不断迭代的 AI 能力，持续为业务赋能", color: "indigo" },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className={`glass-${item.color} glass-card-transition p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 flex items-center bg-opacity-60 backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TickIcon className={`text-${item.color}-500 mr-2 sm:mr-3 flex-shrink-0`} />
                <span className="text-gray-700 text-sm sm:text-base">{item.title}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom row of icons/features - Enhanced for mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto text-center">
             {[
                { title: "极速接入", desc: "全渠道一键集成", Icon: RocketLaunchIcon, color: "blue" },
                { title: "多端操作", desc: "网页/PC/移动端", Icon: ComputerDesktopIcon, color: "purple" },
                { title: "流畅体验", desc: "功能合一，称心趁手", Icon: SparklesIcon, color: "teal" },
                { title: "专业服务", desc: "7x24 服务支持", Icon: UserGroupIcon, color: "amber" },
                { title: "稳定安全", desc: "全球加速，数据隔离", Icon: ShieldCheckIcon, color: "green" },
                { title: "开放拓展", desc: "开放 API，高度自定义", Icon: CodeBracketIcon, color: "indigo" },
             ].map((item, index) => (
               <motion.div
                 key={index}
                 className="p-3 sm:p-4 hover:bg-white/60 rounded-lg transition-colors duration-200 cursor-default flex flex-col items-center bg-opacity-60 backdrop-blur-sm"
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4, delay: index * 0.05 }}
                 viewport={{ once: true }}
               >
                  {/* Icon container with new styling */}
                  <div className={`mb-3 sm:mb-4 p-3 rounded-full bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 bg-opacity-60 backdrop-blur-sm inline-block shadow-sm`}>
                    <item.Icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${item.color}-600`} />
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base mb-0.5 sm:mb-1 text-gray-800">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </motion.section>

      {/* --- Product Features Section --- */}
      <motion.section 
        className="py-16 md:py-20 bg-gradient-to-b from-white via-indigo-50/20 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          {/* Heading for first feature */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-center">
            用小嘉 AI，释放更多获客潜能
          </h3>
          
          {/* Feature 1: 大模型获客机器人 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 max-w-5xl mx-auto">
            <motion.div 
              className="md:pr-6 order-2 md:order-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h4 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight flex items-center"
                variants={itemVariants}
              >
                <span className="flex items-center">
                  大模型获客机器人 
                  <AiAgentBadge />
                </span>
              </motion.h4>
              <motion.p 
                className="text-gray-600 mb-5 text-sm md:text-base leading-relaxed"
                variants={itemVariants}
              >
                对话自然流畅，获线行云流水。<br/>如同一位 7x24 小时在线的专业售前经理，灵活追问，随机应变引导留资，高效获线。
              </motion.p>
              <motion.ul 
                className="space-y-2.5 text-gray-700 mb-6 text-sm md:text-base"
                variants={containerVariants}
              >
                <motion.li variants={itemVariants} className="flex items-center"><TickIcon className="text-black"/>意图识别，更精准</motion.li>
                <motion.li variants={itemVariants} className="flex items-center"><TickIcon className="text-black"/>情绪分析，更细致</motion.li>
                <motion.li variants={itemVariants} className="flex items-center"><TickIcon className="text-black"/>对话沟通，更自然</motion.li>
                <motion.li variants={itemVariants} className="flex items-center"><TickIcon className="text-black"/>线索获取，更高效</motion.li>
              </motion.ul>
              <motion.div variants={itemVariants}>
                <Link href="/products/ai-agent" className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base group inline-flex items-center">
                  立即咨询 <span className="transition-transform duration-200 group-hover:translate-x-1.5 ml-1.5 text-lg">→</span>
                </Link>
              </motion.div>
            </motion.div>
            {/* 替换第二张图片 - AI机器人配置界面 */} 
            <motion.div 
              className="bg-white p-1 md:p-2 rounded-lg shadow-md border border-gray-100/60 order-1 md:order-2 overflow-hidden"
              initial="initial"
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <div className="aspect-w-4 aspect-h-3">
          <Image
                   src="/images/ai-robot-config.png" 
                   alt="AI聊天机器人配置界面" 
                   width={500} 
                   height={400}
                   className="object-cover rounded-md transform transition-transform duration-700 hover:scale-105" 
                 />
              </div>
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* --- Customer Testimonials Section --- */}
      <TestimonialsSection />

      {/* --- Why Choose Us Section --- */}
      <motion.section 
        className="py-14 md:py-20 bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 text-gray-900">为什么选择<span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">小嘉</span></h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 md:mb-16">
            简单、易用、强大，不断进化的 AI 能力
          </p>
          
          {/* Top row of benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 md:mb-12 max-w-5xl mx-auto">
            {[
              { title: "用小嘉 AI 可快速构建与升级企业知识库", color: "blue" },
              { title: "简单易用，快速配置，轻量维护", color: "purple" },
              { title: "获线转化、效率提升，效果看得见", color: "teal" },
              { title: "不断迭代的 AI 能力，持续为业务赋能", color: "indigo" },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className={`glass-${item.color} glass-card-transition p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 flex items-center bg-opacity-60 backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TickIcon className={`text-${item.color}-500 mr-2 sm:mr-3 flex-shrink-0`} />
                <span className="text-gray-700 text-sm sm:text-base">{item.title}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "极速接入",
                description: "全渠道一键集成，3分钟完成网站代码部署，无需下载，注册即用，操作简单上手容易",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                color: "blue"
              },
              {
                title: "多端操作",
                description: "网页端工作台，PC客户端(Mac/Windows)，移动端App(iOS/Android)，多方式消息提醒",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: "purple"
              },
              {
                title: "流畅体验",
                description: "功能合一，称心趁手，工作台个性自定义，专属操作体验，追求效率，企业内部高效沟通与协作",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                color: "teal"
              },
              {
                title: "开放拓展",
                description: "开放API接口，widget高度自定义，iframe嵌入，服务数据双向同步",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                ),
                color: "indigo"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className={`glass-${feature.color} glass-card-transition rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:scale-105 cursor-pointer backdrop-blur-md`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-${feature.color}-200 to-${feature.color}-100 text-${feature.color}-600 mb-4 transform transition-transform duration-300 group-hover:rotate-3`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* 背景装饰元素 - 增强视觉效果 */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-teal-100/30 rounded-full blur-2xl animate-pulse" style={{animationDuration: '7s'}}></div>
        <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-indigo-100/30 rounded-full blur-2xl animate-pulse" style={{animationDuration: '9s'}}></div>
      </motion.section>

      {/* --- Brand Wall Section --- */}
      <motion.section 
        className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
             携手全行业优秀企业，与 AI <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">共进化</span>
           </h2>
           {/* 品牌墙 */}
           <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-50 to-slate-100 rounded-lg flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
             <p className="text-gray-400 italic z-10">品牌墙图片占位</p>
             {/* 背景图片 - 使用渐变代替图片 */}
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/40 to-teal-50/40"></div>
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/40 to-indigo-50/40"></div>
             
             {/* 添加品牌标志装饰元素 */}
             <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-10 p-6 opacity-20">
               {Array(12).fill(0).map((_, i) => (
                 <div key={i} className="w-16 h-8 bg-gray-300 rounded"></div>
               ))}
             </div>
           </div>
        </div>
      </motion.section>

      {/* --- CTA Section --- */}
      <motion.section 
        className="py-14 md:py-20 bg-gradient-to-b from-blue-50/30 via-indigo-50/50 to-purple-50/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto glass-card-intense glass-card-transition rounded-2xl px-6 py-10 md:p-10 shadow-xl border border-indigo-100/40 bg-white/80">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              拥抱小嘉，拥抱 AI
            </h2>
            <p className="text-base text-gray-600 mb-8 max-w-xl mx-auto">
              90% 以上的决策者希望在更多客服场景中引入 AI Agent
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demo" className="px-5 py-2.5 text-base font-medium text-[#4e90cc] rounded-md border border-[#4e90cc] bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm w-full sm:w-auto flex items-center justify-center">
                预约演示
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/free-trial" className="px-5 py-2.5 text-base font-medium text-white rounded-md bg-gradient-to-r from-[#4e90cc] to-[#9478f0] hover:opacity-90 transition-all duration-300 shadow-sm w-full sm:w-auto flex items-center justify-center">
                免费试用
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
    </div>
      </motion.section>
    </main>
  );
}

