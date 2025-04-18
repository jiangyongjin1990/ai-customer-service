'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon, CheckCircleIcon, StarIcon, SparklesIcon, ArrowRightIcon, BoltIcon, ChatBubbleLeftRightIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrialModal({ isOpen, onClose }: TrialModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 计算滚动条宽度一次，确保整个生命周期使用相同的值
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // 防止弹窗打开/关闭时页面抖动
    if (isOpen) {
      // 锁定body滚动并补偿滚动条宽度
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // 对导航栏应用相同的补偿
      const navbar = document.querySelector('nav');
      if (navbar && navbar.classList.contains('fixed')) {
        navbar.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    
    return () => {
      // 确保在组件卸载或状态改变时清理样式，无论isOpen为何值
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      
      // 恢复导航栏
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.paddingRight = '';
      }
    };
  }, [isOpen]);

  useEffect(() => {
    return () => setMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: 实际的表单提交逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      console.log('提交成功，我们将尽快与您联系');
      setIsSubmitting(false);
    } catch (error) {
      console.error('提交失败，请稍后重试');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', company: '', phone: '' });
    onClose();
  };

  if (!mounted) return null;

  return isOpen ? (
    <div className="fixed inset-0 z-[99999] overflow-y-auto">
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-white/70 backdrop-blur-md" 
        aria-hidden="true"
        onClick={handleClose}
      />

      <div className="min-h-screen px-4 text-center">
        {/* 使内容居中的元素 */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

        {/* 模态窗内容 */}
        <div 
          className="inline-block w-full max-w-4xl text-left align-middle bg-white rounded-[20px] shadow-[0_8px_50px_rgba(0,0,0,0.15)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col md:flex-row">
            {/* 左侧产品信息 */}
            <div className="w-full md:w-1/2 p-8 relative overflow-hidden bg-gradient-to-br from-[#1a237e] to-[#283593] text-white">
              {/* 背景装饰 */}
              <div className="absolute inset-0">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl opacity-60" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl opacity-70" />
              </div>
              
              <div className="relative">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-5">
                  <SparklesIcon className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs font-medium text-white">限时免费体验</span>
                </div>
                
                <h2 className="text-[32px] font-bold mb-2 leading-tight">
                  降低60%客服成本，提升销售转化率
                </h2>
                <p className="text-base opacity-90 mb-6">
                  智能客服全面替代传统人工，24小时自动化运营
                </p>

                <div className="space-y-3 mb-6">
                  <div className="group flex items-start space-x-2.5 rounded-xl p-2.5 transition-all hover:bg-white/10 backdrop-blur-sm">
                    <div className="mt-0.5 rounded-lg bg-white/20 p-1.5 text-white">
                      <BoltIcon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-0.5">减少人力支出</h3>
                      <p className="opacity-80 text-xs">单个AI客服可替代3-5名人工，每月节省成本超1万元</p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-2.5 rounded-xl p-2.5 transition-all hover:bg-white/10 backdrop-blur-sm">
                    <div className="mt-0.5 rounded-lg bg-white/20 p-1.5 text-white">
                      <ChatBubbleLeftRightIcon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-0.5">提升客户满意度</h3>
                      <p className="opacity-80 text-xs">3分钟内响应，95%准确率，客户满意度提升38%</p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-2.5 rounded-xl p-2.5 transition-all hover:bg-white/10 backdrop-blur-sm">
                    <div className="mt-0.5 rounded-lg bg-white/20 p-1.5 text-white">
                      <BuildingOfficeIcon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-0.5">多平台统一管理</h3>
                      <p className="opacity-80 text-xs">一站式管理所有电商平台对话，无缝衔接企业现有系统</p>
                    </div>
                  </div>
                </div>

                {/* 客户评价 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                      ))}
                    </div>
                    <div className="ml-2 px-2 py-0.5 rounded-full bg-white/20">
                      <span className="text-xs font-medium text-white">客户反馈</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed mb-3 opacity-90">
                    "部署维普特AI客服后，我们不仅节省了60%的人力成本，客服效率提升300%，售后投诉率下降47%，顾客复购率显著提高。"
                  </p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">L</div>
                    <div className="ml-2.5">
                      <div className="text-xs font-medium">领先优品 · 跨境电商</div>
                      <div className="text-xs opacity-80 mt-0.5">月GMV增长率：32%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧表单 */}
            <div className="w-full md:w-1/2 p-8 relative bg-white">
              <button
                onClick={handleClose}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              <div className="max-w-sm mx-auto py-2">
                {isSuccess ? (
                  <div className="text-center py-14">
                    <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-5">
                      <CheckCircleIcon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      提交成功
                    </h3>
                    <p className="text-gray-600 mb-7">
                      感谢您的关注！我们的专属顾问将在24小时内与您联系，为您提供定制化解决方案。
                    </p>
                    <button
                      onClick={handleClose}
                      className="inline-flex justify-center px-8 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
                    >
                      完成
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1.5">
                      立即体验智能客服
                    </h3>
                    <p className="text-gray-500 mb-6">
                      填写信息，获取专属顾问一对一服务和定制方案
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                          手机号码 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          className="block w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-shadow placeholder:text-gray-400 shadow-sm"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="请输入您的手机号码"
                        />
                      </div>

                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                          姓名
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-shadow placeholder:text-gray-400 shadow-sm"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="请输入您的姓名（选填）"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                          公司名称
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          className="block w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-shadow placeholder:text-gray-400 shadow-sm"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="请输入您的公司名称（选填）"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center px-6 py-3 mt-2 border border-transparent rounded-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                            免费申请体验资格
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </button>

                      <div className="bg-gray-50 p-4 rounded-xl mt-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                          <SparklesIcon className="h-4 w-4 text-indigo-500 mr-1.5" />
                          专属体验权益
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">企业专属顾问1对1咨询</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">30天全功能免费试用</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">专属成本节省分析报告</span>
                          </li>
                        </ul>
                      </div>

                      <p className="text-xs text-gray-500 text-center mt-2">
                        提交即表示同意
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 mx-1">服务条款</a>
                        和
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 mx-1">隐私政策</a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
} 