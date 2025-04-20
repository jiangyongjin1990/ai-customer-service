import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * @description 展示AI客服的演变过程，从智能辅助到独立客服
 * @param {object} props - 组件属性
 * @param {string} [props.className] - 额外的CSS类名
 * @returns {JSX.Element} AI演变卡片组件
 */
const AiEvolutionCard = ({ className = '' }: { className?: string }) => {
  // 演变阶段数据
  const evolutionStages = [
    {
      id: 1,
      title: '智能辅助阶段',
      description: '辅助人工客服处理简单问题，提高工作效率',
      icon: (
        <svg
          className="h-7 w-7 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: '智能协作阶段',
      description: '深度参与客户对话，处理大部分问题，复杂问题转人工',
      icon: (
        <svg
          className="h-7 w-7 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: '智能主导阶段',
      description: '主导客户对话流程，处理大多数问题，人工仅监控',
      icon: (
        <svg
          className="h-7 w-7 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: '独立客服阶段',
      description: '完全独立处理客户沟通，具备情感理解和自主决策能力',
      icon: (
        <svg
          className="h-7 w-7 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className={`mx-auto max-w-4xl ${className}`}>
      <motion.h3
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        从智能辅助到独立客服
      </motion.h3>

      <div className="bg-white/30 rounded-2xl shadow-[0_20px_50px_rgba(8,112,184,0.08)] overflow-hidden border border-blue-50/60 backdrop-blur-2xl">
        {evolutionStages.map((stage, index) => (
          <div 
            key={stage.id}
            className={`p-6 ${
              index < evolutionStages.length - 1 ? 'border-b border-gray-100/30' : ''
            } hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-purple-50/40 transition-all duration-300 transform hover:scale-[1.01] backdrop-blur-lg`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-[#4e90cc] to-[#9478f0] shadow-lg shadow-blue-200/70">
                {stage.icon}
              </div>
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-1.5">
                  {stage.title}
                </h3>
                <p className="text-gray-600">
                  {stage.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="p-4 text-center border-t border-gray-100/30">
          <Link 
            href="/evolution" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            了解更多详情
            <svg 
              className="ml-1 h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AiEvolutionCard; 