'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 销售联系信息弹窗组件
 * @param {ContactModalProps} props - 组件属性
 */
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 处理ESC键关闭
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // 阻止背景滚动
      document.body.style.overflow = 'hidden';
      // 隐藏导航栏
      const navbar = document.querySelector('.fixed.w-full.top-0.z-50');
      if (navbar) {
        (navbar as HTMLElement).style.display = 'none';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      // 恢复背景滚动
      document.body.style.overflow = '';
      // 恢复导航栏显示
      const navbar = document.querySelector('.fixed.w-full.top-0.z-50');
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
    };
  }, [isOpen, onClose]);

  // 重置表单状态
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setContact('');
      setSubmitSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // 提交成功后的定时关闭
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitSuccess) {
      timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitSuccess]);

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 这里可以添加表单提交逻辑
      console.log({ name, contact });
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 提交成功
      setSubmitSuccess(true);
      setName('');
      setContact('');
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-5 transition-opacity duration-300"
      onClick={onClose}
      style={{animation: 'fadeIn 0.3s ease-out'}}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* 模态框容器 */}
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-xl w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{animation: 'scaleIn 0.35s ease-out'}}
      >
        {/* 装饰性顶部条纹 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600"></div>
        
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 rounded-full p-2 hover:bg-gray-100 transition-all duration-200 z-10 group"
          aria-label="关闭对话框"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 提交成功提示 */}
        {submitSuccess && (
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-center" style={{animation: 'slideDown 0.5s ease-out'}}>
            <div className="mt-4 bg-green-50 text-green-800 px-6 py-3 rounded-lg shadow-sm border border-green-100 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="font-medium">提交成功！我们将尽快与您联系</span>
            </div>
          </div>
        )}

        {/* 模态框头部 */}
        <div className="px-6 pt-8 pb-0">
          <h2 id="contact-modal-title" className="text-2xl font-bold text-gray-800 mb-1">联系我们</h2>
          <p className="text-gray-500 text-sm mb-6">我们将尽快回复您的咨询</p>
        </div>
        
        {/* 模态框内容 */}
        <div className="px-6 pb-6">
          {/* 两栏布局容器 */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* 联系表单 */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">您的姓名</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                      placeholder="请输入您的姓名"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                      aria-required="true"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">联系方式</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="contact" 
                      className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                      placeholder="手机号码或微信号"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                      disabled={isSubmitting}
                      aria-required="true"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 rounded-lg text-white font-medium transition-colors disabled:opacity-70 flex justify-center items-center mt-2"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      提交中...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      提交咨询
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* 联系信息 */}
            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">联系方式</h3>
                
                <div className="space-y-4">
                  {/* 产品经理 */}
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Image 
                        src="/images/头像.png" 
                        alt="川川头像" 
                        width={30} 
                        height={30}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-xs text-gray-500">产品经理</div>
                      <div className="text-sm font-medium text-gray-900">川川</div>
                    </div>
                  </div>
                  
                  {/* 邮箱地址 */}
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Image 
                        src="/images/邮箱.png" 
                        alt="邮箱图标" 
                        width={30} 
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-xs text-gray-500">邮箱地址</div>
                      <a href="mailto:jyj854017734@gmail.com" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                        jyj854017734@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  {/* 所在地区 */}
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Image 
                        src="/images/地址.png" 
                        alt="地址图标" 
                        width={30} 
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-xs text-gray-500">所在地区</div>
                      <div className="text-sm font-medium text-gray-900">浙江杭州</div>
                    </div>
                  </div>
                </div>
                
                {/* 微信二维码 */}
                <div className="mt-6 bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-center flex-col">
                  <div className="text-xs font-medium text-gray-600 mb-3 flex items-center">
                    <span className="flex items-center">
                      <span className="w-4 h-4 mr-1.5 text-green-600 flex items-center justify-center">
                        <Image 
                          src="/images/wechat-icon.png" 
                          alt="微信图标" 
                          width={16} 
                          height={16}
                          className="object-contain"
                        />
                      </span>
                      扫码添加微信
                    </span>
                  </div>
                  <div className="p-1 border border-gray-100 rounded shadow-sm">
                    <Image 
                      src="/images/jyjweixin.jpg" 
                      alt="微信二维码" 
                      width={110} 
                      height={110}
                      className="rounded"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactModal;