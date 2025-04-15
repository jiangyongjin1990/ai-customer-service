'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * 关于我们弹窗组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.isOpen - 控制弹窗是否开启
 * @param {Function} props.onClose - 关闭弹窗的回调函数
 * @returns {JSX.Element|null} 渲染的弹窗组件或null
 */
const AboutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">关于我们</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-800 mb-2">
              <span className="font-medium">使命：</span>让企业轻松拥有智能客服
            </p>
            <p className="text-gray-800 mb-4">
              <span className="font-medium">愿景：</span>成为全球智能客服普惠化进程的引领者
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div>
                <p className="text-gray-800 text-sm mb-1">
                  <span className="font-medium">产品经理：</span>川川
                </p>
                <p className="text-gray-800 text-sm mb-1">
                  <span className="font-medium">公司地址：</span>浙江杭州
                </p>
                <p className="text-gray-800 text-sm">
                  <span className="font-medium">联系方式：</span>jyj854017734@gmail.com
                </p>
              </div>
              
              <div className="mt-3 md:mt-0">
                <div className="w-24 h-24 relative border border-gray-200 rounded-md overflow-hidden">
                  <Image 
                    src="/images/jyjweixin.jpg" 
                    alt="川川的微信二维码"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded shadow-md hover:opacity-90 transition-opacity"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * 页脚组件
 * @returns {JSX.Element} 渲染的页脚组件
 */
const Footer = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  
  return (
    <footer className="bg-gray-100 py-8 md:py-10 border-t border-gray-200">
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          {/* 左侧品牌区域 */}
          <div className="md:col-span-5 lg:col-span-6">
            <div className="flex items-center mb-3">
              <span className="text-xl font-bold text-gray-800 tracking-tight">维普特</span>
            </div>
            
            <p className="text-gray-600 mb-1.5 text-sm">
              <span className="font-medium">使命：</span>让企业轻松拥有智能客服
            </p>
            
            <p className="text-gray-600 mb-4 text-sm">
              <span className="font-medium">愿景：</span>成为全球智能客服普惠化进程的引领者
            </p>
            
            <p className="text-gray-500 text-sm">© 2025 维普特 AI</p>
          </div>
          
          {/* 中间空白区域 */}
          <div className="hidden md:block md:col-span-2 lg:col-span-2"></div>
          
          {/* 右侧导航区域 */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-end">
            <div className="grid grid-cols-2 gap-8 w-auto">
              <div>
                <h4 className="text-gray-800 font-medium mb-3">公司</h4>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setIsAboutModalOpen(true)} 
                      className="text-gray-600 hover:text-gray-900 text-sm text-left cursor-pointer"
                    >
                      关于我们
                    </button>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-gray-800 font-medium mb-3">服务条款</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">隐私政策</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">服务条款</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部座右铭 - 现代化设计 */}
        <div className="border-t border-gray-200 pt-6 flex justify-center items-center">
          <div className="relative">
            <p className="text-gray-400 italic text-xl font-light tracking-wide">
              " Less complexity, more intelligence. "
            </p>
            <div className="absolute w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 opacity-70"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 