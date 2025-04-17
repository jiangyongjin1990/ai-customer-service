'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiInfo, FiX, FiChevronDown } from 'react-icons/fi';
import ErrorBoundary from '@/components/ErrorBoundary';
import FooterWrapper from '@/components/FooterWrapper';
import { sendMessage, generateFallbackReply } from '@/services/chatService';
import { useScrollContext } from '@/contexts/ScrollContext';

// 定义消息接口
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * @description 聊天演示组件
 * @returns {JSX.Element} 聊天演示页面
 */
function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '👋 您好！我是智能客服助手小维，有什么可以帮助您的吗？',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { setScrollToTop } = useScrollContext();
  
  // 页面加载时滚动到顶部
  useEffect(() => {
    // 使用setTimeout确保页面完全加载后再滚动到顶部
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 监听滚动，决定是否显示回到顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 实现消息滚动到底部
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // 处理返回顶部
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setScrollToTop(true);
  };
  
  // 自动调整文本域高度
  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    const newHeight = Math.min(element.scrollHeight, 120); // 最大高度120px
    element.style.height = `${newHeight}px`;
  };
  
  // 处理发送消息
  const handleSendMessage = async () => {
    if (isLoading || !inputValue.trim()) return;
    
    // 创建用户消息
    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    const userMessageText = inputValue.trim();
    
    // 更新消息列表并清空输入框
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setErrorMessage(null);
    
    // 重置文本域高度
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
    }
    
    try {
      // 使用聊天服务发送消息
      const result = await sendMessage(userMessageText);
      
      if (result.success && result.reply) {
        // 添加机器人回复
        const botMessage = {
          id: Date.now() + 1,
          text: result.reply,
          sender: 'bot' as const,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        // 显示错误消息并使用备用回复
        setErrorMessage(result.error || '获取回复失败');
        
        const fallbackMessage = {
          id: Date.now() + 1,
          text: generateFallbackReply(userMessageText),
          sender: 'bot' as const,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
      }
    } catch (error) {
      console.error('发送消息时出错:', error);
      setErrorMessage(error instanceof Error ? error.message : '发送消息时出错');
      
      // 使用备用回复
      const fallbackMessage = {
        id: Date.now() + 1,
        text: generateFallbackReply(userMessageText),
        sender: 'bot' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 处理回车发送
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 处理输入变化，自动调整高度
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // 示例问题快速提问
  const exampleQuestions = [
    "智能客服有哪些功能？",
    "定价方案是怎样的？",
    "能否处理多语言支持？",
    "如何集成到我的网站？"
  ];
  
  const handleExampleClick = (question: string) => {
    setInputValue(question);
    
    // 设置文本域高度
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.value = question;
      adjustTextareaHeight(textarea);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 pt-24 pb-20"
    >
      {/* 返回顶部按钮 */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed right-6 bottom-6 p-3 rounded-full bg-blue-600 text-white shadow-lg z-50"
            onClick={handleScrollToTop}
            aria-label="返回顶部"
          >
            <FiChevronDown className="transform rotate-180 w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      <div className="mb-8">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          智能客服体验中心
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-600 leading-relaxed max-w-3xl"
        >
          这是我们智能客服系统的实时演示。体验DeepSeek大模型如何智能回答您的问题，提供专业、高效的客户服务。试试提问关于产品、价格或功能的问题！
        </motion.p>
      </div>
      
      {/* 聊天界面 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-md p-0 flex flex-col min-h-[520px]">
            {/* 聊天头部 */}
            <div className="px-8 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-800 flex items-center gap-2">小维智能助手 <span className="ml-1 px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white rounded-full align-top">DeepSeek赋能</span></div>
                  <div className="text-xs text-gray-500 mt-0.5">专业AI客服 · 实时响应</div>
                </div>
              </div>
            </div>
            {/* 聊天消息区 */}
            <div ref={messagesContainerRef} className="flex-1 px-8 py-6 space-y-4 overflow-y-auto bg-white/60" style={{ minHeight: 320 }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> 
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-md text-base leading-relaxed whitespace-pre-line ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-br-md' : 'bg-gray-50 text-gray-800 rounded-bl-md border border-blue-100'}`}
                  >
                    {msg.text}
                  </motion.div>
                </div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>
            {/* 输入区 */}
            <div className="px-8 py-5 border-t bg-white/80 flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-white/80 px-5 py-3 text-base shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all placeholder-gray-400"
                  rows={1}
                  maxLength={500}
                  placeholder="请输入您的问题，按Enter发送..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  style={{ minHeight: 44, maxHeight: 120, fontSize: '16px', lineHeight: '1.6' }}
                />
                {errorMessage && (
                  <div className="absolute left-0 -top-7 text-xs text-red-500 animate-fadeIn">{errorMessage}</div>
                )}
              </div>
              <button
                className={`ml-2 flex-shrink-0 rounded-2xl px-6 py-3 text-base font-semibold shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                aria-label="发送"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
        {/* 右侧信息区 */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hidden lg:block"
        >
          <div className="rounded-3xl bg-white/80 shadow-xl border border-gray-100 p-7 mb-6">
            <div className="font-bold text-blue-700 text-lg mb-2 flex items-center gap-2">
              <span>DeepSeek驱动的客服</span>
              <span className="ml-1 px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white rounded-full align-top">AI</span>
            </div>
            <ul className="text-gray-700 text-sm space-y-2 pl-2">
              <li>• 7x24小时自动响应客户咨询</li>
              <li>• 支持多平台集成</li>
              <li>• 智能分析客户意图和情绪</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white/80 shadow-xl border border-gray-100 p-7">
            <div className="font-bold text-gray-800 text-base mb-3">示例问题</div>
            <div className="flex flex-col gap-3">
              {exampleQuestions.map((q, i) => (
                <button
                  key={i}
                  className="text-left px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-all"
                  onClick={() => handleExampleClick(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* CTA区域 */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-xl text-white mb-12"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">想要在您的网站集成这样的智能客服？</h2>
          <p className="text-blue-100 mb-6 text-lg leading-relaxed">
            注册我们的服务，只需几分钟即可在您的网站上添加基于DeepSeek大模型的智能客服功能，提升用户体验，降低客服成本。
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/pricing" 
              className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 shadow-md"
            >
              查看定价方案
            </Link>
            <Link 
              href="/contact" 
              className="inline-block bg-blue-500 bg-opacity-30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-40 transition-colors duration-200 border border-white border-opacity-20"
            >
              联系我们
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * @description 演示页面，使用错误边界包裹聊天演示组件
 * @returns {JSX.Element} 演示页面
 */
export default function DemoPage() {
  return (
    <ErrorBoundary>
      <ChatDemo />
      <FooterWrapper />
    </ErrorBoundary>
  );
}