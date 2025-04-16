'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * 联系弹窗组件
 * 
 * @param {boolean} isOpen - 控制弹窗显示状态
 * @param {function} onClose - 关闭弹窗回调函数
 * @param {string} title - 弹窗标题，默认为"联系我们"
 */
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, title = '联系我们' }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
      
      // 隐藏导航栏
      const navbar = document.querySelector('.fixed.w-full.top-0.z-50');
      if (navbar) {
        (navbar as HTMLElement).style.display = 'none';
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
      
      // 恢复导航栏显示
      const navbar = document.querySelector('.fixed.w-full.top-0.z-50');
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contact) return; // 确保联系方式已填写
    
    try {
      setIsSubmitting(true);
      
      // 发送表单数据到API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          contact,
          company
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 提交成功
        setIsSubmitted(true);
        setName('');
        setContact('');
        setCompany('');
      } else {
        // 处理错误
        console.error('提交失败:', data.message);
        alert('提交失败，请稍后再试');
      }
    } catch (error) {
      console.error('提交出错:', error);
      alert('提交失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            onClick={onClose}
          />
          
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 relative"
          >
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100 z-10"
              aria-label="关闭"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="flex flex-col md:flex-row">
              {/* 左侧表单区域 */}
              <div className="w-full md:w-7/12 p-8">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
                  <p className="text-gray-500 text-sm mb-6">填写您的信息，我们将尽快与您取得联系</p>
                </motion.div>
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-green-50 border border-green-100 rounded-xl p-6 flex flex-col items-center justify-center h-64"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-green-800 mb-2">提交成功</h3>
                      <p className="text-green-600 text-center">我们已收到您的信息，将尽快与您联系。</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">称呼</label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800 text-base"
                          placeholder="请输入您的姓名"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-600 mb-1">
                          联系方式 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contact"
                          type="text"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800 text-base"
                          placeholder="请输入您的电话或邮箱"
                          required
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label htmlFor="company" className="block text-sm font-medium text-gray-600">公司名称</label>
                          <span className="text-xs text-gray-400">如无可不填写</span>
                        </div>
                        <textarea
                          id="company"
                          rows={3}
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800 resize-none text-base"
                          placeholder="请输入您的公司名称"
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none text-base disabled:opacity-70"
                      >
                        {isSubmitting ? '提交中...' : '提交信息'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
              
              {/* 右侧联系信息 */}
              <div className="w-full md:w-5/12 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full -mr-20 -mt-20 z-0"></div>
                <div className="absolute left-0 bottom-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full -ml-16 -mb-16 z-0"></div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative z-10"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-6">联系方式</h3>
                  
                  <div className="space-y-4">
                    {/* 电话 */}
                    <div className="flex items-center p-3 hover:bg-white/70 rounded-xl transition-colors group">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Image 
                          src="/images/Message.png" 
                          alt="电话图标" 
                          width={24} 
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-xs text-gray-500">联系电话</div>
                        <a href="tel:15657170885" className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors">
                          15657170885
                        </a>
                      </div>
                    </div>
                    
                    {/* 邮箱 */}
                    <div className="flex items-center p-3 hover:bg-white/70 rounded-xl transition-colors group">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <Image 
                          src="/images/邮箱.png" 
                          alt="邮箱图标" 
                          width={24} 
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-xs text-gray-500">邮箱地址</div>
                        <a href="mailto:jyj854017734@gmail.com" className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors break-all">
                          jyj854017734@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    {/* 所在地区 */}
                    <div className="flex items-center p-3 hover:bg-white/70 rounded-xl transition-colors group">
                      <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <Image 
                          src="/images/地址.png" 
                          alt="地址图标" 
                          width={24} 
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-xs text-gray-500">所在地区</div>
                        <div className="text-base font-medium text-gray-900">浙江杭州</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 微信二维码 */}
                  <div className="mt-8 bg-white/80 p-5 rounded-xl border border-gray-100/60 backdrop-blur-sm shadow-sm flex items-center justify-center flex-col">
                    <div className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                      <span className="flex items-center">
                        扫码添加微信
                      </span>
                    </div>
                    <div className="p-1.5 border border-gray-100 rounded-lg shadow-sm bg-white">
                      <Image 
                        src="/images/jyjweixin.jpg" 
                        alt="微信二维码" 
                        width={120} 
                        height={120}
                        className="rounded-md"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;