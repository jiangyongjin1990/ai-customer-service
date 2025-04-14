"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      {/* 装饰背景元素 */}
      <div className="decorative-circle bg-blue-500/20 top-0 left-1/4"></div>
      <div className="decorative-circle bg-purple-500/20 bottom-20 right-1/4"></div>
      
      <div className="responsive-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 mb-4">
                小嘉AI · 智能客服新标准
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                每一次<span className="gradient-text">学习</span>，
                <br />都是一次<span className="highlight-mark">进步</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-6">
                领先的AI驱动客服解决方案，提升客户体验、降低运营成本
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link 
                href="/demo" 
                className="gradient-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                立即体验
                <span className="ml-2">→</span>
              </Link>
              <Link href="/contact" className="outline-button">
                免费咨询
              </Link>
            </div>
            
            <div className="pt-6">
              <p className="text-sm text-gray-500 flex items-center">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                已有<span className="mx-1 font-semibold">400,000+</span>企业使用小嘉获得客户增长
              </p>
            </div>
          </div>
          
          {/* 右侧图片/演示 */}
          <div className="relative">
            <div className={`glass-card p-2 md:p-4 animate-float transition-all duration-500 ${isHovered ? 'shadow-xl scale-105' : 'shadow-lg'}`}>
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <Image 
                  src="/hero-dashboard.png" 
                  alt="小嘉AI智能客服系统界面" 
                  width={640} 
                  height={360}
                  className="object-cover rounded-lg"
                  priority
                />
                
                {/* 悬浮消息气泡 */}
                <div className="absolute top-4 right-4 glass-card p-3 rounded-lg max-w-[200px] text-sm shadow-lg animate-pulse-soft">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">AI</div>
                    <div>
                      <p className="font-medium">我是小嘉AI助手</p>
                      <p className="text-gray-600 text-xs mt-1">有什么可以帮您？</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 指标卡片 */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl shadow-lg hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">客户满意度</p>
                  <p className="text-xl font-bold gradient-text">↑ 97.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 