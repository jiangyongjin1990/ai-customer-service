import React from 'react';
import Image from 'next/image';

/**
 * @description 演示卡片组件
 * @returns {JSX.Element} 演示卡片组件
 */
const DemoCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50"></div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
        探索智能客服助手
      </h3>
      
      <p className="text-gray-600 mb-6 relative z-10">
        我们的AI客服系统能够理解复杂查询，提供精准回答，并在需要时无缝转接到人工服务。
      </p>
      
      <div className="flex flex-col space-y-4 mb-6 relative z-10">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </div>
          <span className="text-gray-700">自然语言处理能力</span>
        </div>
        
        <div className="flex items-center">
          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </div>
          <span className="text-gray-700">多轮会话理解</span>
        </div>
        
        <div className="flex items-center">
          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </div>
          <span className="text-gray-700">持续学习和优化</span>
        </div>
      </div>
      
      <div className="relative h-64 w-full overflow-hidden rounded-lg mt-8 z-10">
        <Image
          src="/demo/agent-dashboard.png"
          alt="AI客服系统界面演示"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
        />
      </div>
    </div>
  );
};

export default DemoCard; 