'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

/**
 * 联系弹窗组件的属性接口
 * @interface ContactModalProps
 * @property {boolean} isOpen - 控制弹窗显示状态
 * @property {Function} onClose - 关闭弹窗回调函数
 * @property {string} [title] - 弹窗标题，默认为"联系我们"
 */
export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * 联系弹窗组件
 * 
 * @param {ContactModalProps} props - 组件属性
 * @param {boolean} props.isOpen - 控制弹窗显示状态
 * @param {Function} props.onClose - 关闭弹窗回调函数
 * @param {string} [props.title] - 弹窗标题，默认为"联系我们"
 * @returns {JSX.Element | null} 弹窗组件或null
 */
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, title = '联系我们' }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      
      // 锁定滚动并处理滚动条宽度
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // 对导航栏应用相同的补偿
      const navbar = document.querySelector('nav');
      if (navbar && navbar.classList.contains('fixed')) {
        navbar.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      
      // 恢复滚动和补偿
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      
      // 恢复导航栏
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.paddingRight = '';
      }
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contact) return; // 确保联系方式已填写
    
    // 重置错误状态
    setError(null);
    
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
        setShowSuccess(true);
      } else {
        // 处理错误
        console.error('提交失败:', data.message);
        setError(data.message || '提交失败，请稍后再试');
      }
    } catch (error) {
      console.error('提交出错:', error);
      setError('网络连接错误，请检查您的网络连接后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <motion.div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            ref={modalRef}
            className="bg-gradient-to-br from-white/95 to-white/98 rounded-2xl shadow-xl max-w-md w-full mx-auto overflow-hidden z-10 border border-gray-100/40"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="relative">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-full bg-gray-100/80 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors z-20"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                  <p className="text-gray-500 text-sm mt-1">我们将尽快与您联系</p>
                </div>
                
                {showSuccess ? (
                  <motion.div
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
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error && (
                      <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-600 text-sm">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {error}
                        </div>
                      </div>
                    )}

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
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;