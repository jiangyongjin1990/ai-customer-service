"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AiEvolutionCard from '@/components/AiEvolutionCard';

/**
 * @description 从智能辅助到独立客服的演变详细页面
 * @returns {JSX.Element} 演变页面组件
 */
export default function EvolutionPage() {
  // 各阶段的详细数据
  const stageDetails = [
    {
      id: 1,
      title: '智能辅助阶段',
      description: '在这个初始阶段，AI主要作为人工客服的辅助工具，处理简单的重复性问题，减轻客服人员的工作负担。',
      features: [
        '回答常见问题（FAQ）',
        '收集客户基本信息',
        '引导客户填写表单',
        '提供简单的产品信息',
        '路由和分类客户问题'
      ],
      benefits: [
        '节省人工客服时间',
        '提高处理效率',
        '降低简单问题处理成本',
        '24/7全天候服务'
      ],
      image: '/images/ai-stage-1.jpg',
      imageAlt: '智能辅助阶段示意图'
    },
    {
      id: 2,
      title: '智能协作阶段',
      description: 'AI的能力得到提升，可以处理更复杂的问题，并与人工客服紧密协作，形成"人机协同"的服务模式。',
      features: [
        '理解复杂查询和多轮对话',
        '处理特定场景的专业问题',
        '情感分析和情绪检测',
        '智能建议和推荐',
        '自动识别需要人工接入的情况'
      ],
      benefits: [
        '提高客户满意度',
        '增强处理复杂问题的能力',
        '减少人工干预次数',
        '个性化客户体验'
      ],
      image: '/images/ai-stage-2.jpg',
      imageAlt: '智能协作阶段示意图'
    },
    {
      id: 3,
      title: '智能主导阶段',
      description: 'AI成为客服流程的主导力量，能够处理绝大多数客户问题，人工客服主要负责监控和处理例外情况。',
      features: [
        '多语言和跨文化理解能力',
        '深度学习和持续自我优化',
        '预测客户需求',
        '主动提供解决方案',
        '复杂业务流程的自动化处理'
      ],
      benefits: [
        '大幅降低客服运营成本',
        '提供一致且高质量的服务',
        '支持业务快速扩展',
        '数据驱动的服务优化'
      ],
      image: '/images/ai-stage-3.jpg',
      imageAlt: '智能主导阶段示意图'
    },
    {
      id: 4,
      title: '独立客服阶段',
      description: 'AI达到接近人类水平的沟通能力，能够完全独立处理各类客户服务需求，包括情感交流和复杂决策。',
      features: [
        '深度情感理解和共情能力',
        '创造性问题解决',
        '复杂决策和判断能力',
        '自主学习和适应新情境',
        '与企业系统深度集成'
      ],
      benefits: [
        '实现客服全面自动化',
        '提供超越人类的服务质量',
        '无限扩展能力',
        '创新的客户体验'
      ],
      image: '/images/ai-stage-4.jpg',
      imageAlt: '独立客服阶段示意图'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            从智能辅助到独立客服
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI客服技术的演变历程与未来展望
          </motion.p>
        </div>

        {/* 概览卡片 */}
        <section className="mb-16">
          <AiEvolutionCard className="mb-8" />
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            下方了解每个阶段的详细情况、特点和优势
          </p>
        </section>

        {/* 详细阶段展示 */}
        <section className="space-y-24">
          {stageDetails.map((stage, index) => (
            <motion.div
              key={stage.id}
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* 文字部分 - 偶数项靠右 */}
              <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-indigo-100/30">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    阶段 {stage.id}：{stage.title}
                  </h2>
                  <p className="text-gray-700 mb-6">{stage.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">主要特点：</h3>
                    <ul className="space-y-2">
                      {stage.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">主要优势：</h3>
                    <ul className="space-y-2">
                      {stage.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* 图像部分 - 偶数项靠左 */}
              <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4e90cc]/40 to-[#9478f0]/40 backdrop-filter backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="text-5xl font-bold mb-2">{stage.id}</div>
                      <div className="text-xl font-medium">{stage.title}</div>
                    </div>
                  </div>
                  {/* 这里可以替换为实际图片 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA区域 */}
        <section className="mt-24 text-center">
          <motion.div
            className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-indigo-100/30 max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              开始您的AI客服之旅
            </h2>
            <p className="text-gray-700 mb-6">
              无论您处于哪个阶段，我们都可以帮助您提升客户服务水平，实现业务增长
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700">
                联系我们
              </Link>
              <Link href="/demo" className="bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:bg-indigo-50">
                查看演示
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
} 

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AiEvolutionCard from '@/components/AiEvolutionCard';

/**
 * @description 从智能辅助到独立客服的演变详细页面
 * @returns {JSX.Element} 演变页面组件
 */
export default function EvolutionPage() {
  // 各阶段的详细数据
  const stageDetails = [
    {
      id: 1,
      title: '智能辅助阶段',
      description: '在这个初始阶段，AI主要作为人工客服的辅助工具，处理简单的重复性问题，减轻客服人员的工作负担。',
      features: [
        '回答常见问题（FAQ）',
        '收集客户基本信息',
        '引导客户填写表单',
        '提供简单的产品信息',
        '路由和分类客户问题'
      ],
      benefits: [
        '节省人工客服时间',
        '提高处理效率',
        '降低简单问题处理成本',
        '24/7全天候服务'
      ],
      image: '/images/ai-stage-1.jpg',
      imageAlt: '智能辅助阶段示意图'
    },
    {
      id: 2,
      title: '智能协作阶段',
      description: 'AI的能力得到提升，可以处理更复杂的问题，并与人工客服紧密协作，形成"人机协同"的服务模式。',
      features: [
        '理解复杂查询和多轮对话',
        '处理特定场景的专业问题',
        '情感分析和情绪检测',
        '智能建议和推荐',
        '自动识别需要人工接入的情况'
      ],
      benefits: [
        '提高客户满意度',
        '增强处理复杂问题的能力',
        '减少人工干预次数',
        '个性化客户体验'
      ],
      image: '/images/ai-stage-2.jpg',
      imageAlt: '智能协作阶段示意图'
    },
    {
      id: 3,
      title: '智能主导阶段',
      description: 'AI成为客服流程的主导力量，能够处理绝大多数客户问题，人工客服主要负责监控和处理例外情况。',
      features: [
        '多语言和跨文化理解能力',
        '深度学习和持续自我优化',
        '预测客户需求',
        '主动提供解决方案',
        '复杂业务流程的自动化处理'
      ],
      benefits: [
        '大幅降低客服运营成本',
        '提供一致且高质量的服务',
        '支持业务快速扩展',
        '数据驱动的服务优化'
      ],
      image: '/images/ai-stage-3.jpg',
      imageAlt: '智能主导阶段示意图'
    },
    {
      id: 4,
      title: '独立客服阶段',
      description: 'AI达到接近人类水平的沟通能力，能够完全独立处理各类客户服务需求，包括情感交流和复杂决策。',
      features: [
        '深度情感理解和共情能力',
        '创造性问题解决',
        '复杂决策和判断能力',
        '自主学习和适应新情境',
        '与企业系统深度集成'
      ],
      benefits: [
        '实现客服全面自动化',
        '提供超越人类的服务质量',
        '无限扩展能力',
        '创新的客户体验'
      ],
      image: '/images/ai-stage-4.jpg',
      imageAlt: '独立客服阶段示意图'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            从智能辅助到独立客服
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI客服技术的演变历程与未来展望
          </motion.p>
        </div>

        {/* 概览卡片 */}
        <section className="mb-16">
          <AiEvolutionCard className="mb-8" />
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            下方了解每个阶段的详细情况、特点和优势
          </p>
        </section>

        {/* 详细阶段展示 */}
        <section className="space-y-24">
          {stageDetails.map((stage, index) => (
            <motion.div
              key={stage.id}
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* 文字部分 - 偶数项靠右 */}
              <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-indigo-100/30">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    阶段 {stage.id}：{stage.title}
                  </h2>
                  <p className="text-gray-700 mb-6">{stage.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">主要特点：</h3>
                    <ul className="space-y-2">
                      {stage.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">主要优势：</h3>
                    <ul className="space-y-2">
                      {stage.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* 图像部分 - 偶数项靠左 */}
              <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4e90cc]/40 to-[#9478f0]/40 backdrop-filter backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="text-5xl font-bold mb-2">{stage.id}</div>
                      <div className="text-xl font-medium">{stage.title}</div>
                    </div>
                  </div>
                  {/* 这里可以替换为实际图片 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA区域 */}
        <section className="mt-24 text-center">
          <motion.div
            className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-indigo-100/30 max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              开始您的AI客服之旅
            </h2>
            <p className="text-gray-700 mb-6">
              无论您处于哪个阶段，我们都可以帮助您提升客户服务水平，实现业务增长
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700">
                联系我们
              </Link>
              <Link href="/demo" className="bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:bg-indigo-50">
                查看演示
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
} 