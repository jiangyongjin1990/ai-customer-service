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
  
  // 顶栏和底栏高度
  const HEADER_HEIGHT = 72;
  const FOOTER_HEIGHT = 70; // 调整底部区域高度
  const TOP_GAP = 48; // 与导航栏的间距，再向下移动10px
  const BOTTOM_GAP = 25; // 与底栏的间距
  const [mainContentHeight, setMainContentHeight] = useState(0);

  useEffect(() => {
    const calcHeight = () => {
      const h = window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT - TOP_GAP - BOTTOM_GAP;
      setMainContentHeight(h > 0 ? h : 0);
    };
    calcHeight();
    window.addEventListener('resize', calcHeight);
    return () => window.removeEventListener('resize', calcHeight);
  }, []);
  
  // 实现消息滚动到底部
  useEffect(() => {
    if (endOfMessagesRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
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
    // 自动调整输入框高度
    const textarea = e.target;
    textarea.style.height = 'auto';
    
    // 根据设备宽度调整最大高度
    const maxHeight = window.innerWidth < 768 ? 80 : 120; // 移动设备最大高度更小
    const scrollHeight = Math.min(textarea.scrollHeight, maxHeight);
    
    textarea.style.height = `${scrollHeight}px`;
    
    // 输入时立即移除错误消息
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  // 示例问题快速提问
  const exampleQuestions = [
    "这款商品什么时候能发货？",
    "我需要退换货怎么操作？",
    "有什么优惠活动正在进行？",
    "如何修改收货地址？"
  ];
  
  const handleExampleClick = (question: string) => {
    setInputValue(question);
    // 自动聚焦输入框并调整高度
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.focus();
        textarea.style.height = 'auto';
        const scrollHeight = Math.min(textarea.scrollHeight, 120);
        textarea.style.height = `${scrollHeight}px`;
      }
    }, 0);
  };
  
  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col overflow-hidden">
      {/* 顶栏 - 固定在顶部 */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm" style={{height: HEADER_HEIGHT}}>
        {/* 顶栏内容 */}
      </div>
      {/* 主内容区 - 固定高度，保持与顶栏和底栏的间距 */}
      <div
        className="w-full flex justify-center items-center"
        style={{
          position: 'fixed',
          top: HEADER_HEIGHT + TOP_GAP,
          left: 0,
          right: 0,
          height: mainContentHeight
        }}
      >
        <div className="w-full max-w-6xl flex gap-6 px-4 h-full">
          {/* 左侧信息区 - 调整宽度以适应示例问题 */}
          <div className="w-80 flex flex-col gap-6 flex-shrink-0 h-full overflow-y-auto">
            <div className="rounded-3xl bg-white/80 shadow-xl border border-gray-100 p-7 mb-6">
              <div className="font-bold text-blue-700 text-lg mb-2 flex items-center gap-2">
                <span>DeepSeek驱动的客服</span>
                <span className="ml-1 px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white rounded-full align-top">AI</span>
              </div>
              <ul className="text-gray-700 text-sm space-y-3 pl-1">
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>7x24小时自动响应客户咨询</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>支持多平台集成</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>智能分析客户意图和情绪</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>自动识别并过滤平台违禁词</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white/80 shadow-xl border border-gray-100 p-7">
              <div className="font-bold text-gray-800 text-base mb-3">示例问题</div>
              <p className="text-gray-600 text-xs mb-4">点击下方问题，快速开始咨询体验</p>
              <div className="flex flex-col gap-3">
                {exampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="text-left px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-all flex items-center"
                    onClick={() => handleExampleClick(q)}
                  >
                    <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 聊天区 - 原来在左侧 */}
          <div className="flex-1 flex flex-col h-full">
            <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-md p-0 flex flex-col h-full">
              {/* 聊天头部 - 优化UI */}
              <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-indigo-50/60 border-b border-gray-100 flex items-center shadow-sm">
                <div className="flex items-center">
                  <div className="w-10 h-10 relative mr-3 overflow-hidden">
                    {isLoading ? (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center overflow-hidden animate-pulse">
                        <video 
                          src="/images/ball.webm" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="transform scale-[1.8] w-10 h-10 object-contain mix-blend-normal"
                          style={{ background: 'transparent' }}
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    )}
                    {isLoading && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-base text-gray-800 flex items-center gap-1">
                      小维智能助手 
                      <span className="ml-1 px-1.5 py-0.5 text-[9px] leading-tight font-medium bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white rounded-full">DeepSeek</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1"></span>
                      在线 · 实时响应
                    </div>
                  </div>
                </div>
              </div>
              {/* 聊天消息区 - 优化UI体验 */}
              <div 
                ref={messagesContainerRef} 
                className="flex-1 px-6 py-5 space-y-5 overflow-y-auto bg-white/60 custom-scrollbar" 
                style={{ minHeight: 0, height: '100%', scrollBehavior: 'smooth' }}
              >
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> 
                    <div className="flex flex-col gap-1 max-w-[75%]">
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`px-4 py-3 rounded-2xl shadow-sm text-base leading-relaxed break-words ${
                          msg.sender === 'user' 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-tr-none' 
                            : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </motion.div>
                      <div className={`text-xs text-gray-400 ${msg.sender === 'user' ? 'text-right mr-1' : 'ml-1'}`}>
                        {new Intl.DateTimeFormat('zh-CN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }).format(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start"> 
                    <div className="flex flex-col gap-1 max-w-[75%]">
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="px-4 py-3 rounded-2xl shadow-sm bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none"
                      >
                        <div className="flex items-center min-h-[24px]">
                          <div className="flex space-x-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 opacity-60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 opacity-60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 opacity-60 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                          </div>
                        </div>
                      </motion.div>
                      <div className="text-xs text-gray-400 ml-1 flex items-center">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></span>
                        正在输入...
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>
              {/* 输入区 - 优化UI/UX */}
              <div className="px-6 py-4 bg-white/90 border-t border-gray-100">
                <div className="flex items-center gap-2 p-3 bg-gray-50/90 rounded-2xl shadow-sm hover:shadow-md transition duration-300 focus-within:ring-2 focus-within:ring-blue-200">
                  <div className="flex-1 relative">
                    <textarea
                      className="w-full resize-none border-0 bg-transparent px-3 py-2 text-base focus:outline-none placeholder-gray-400 overflow-hidden"
                      rows={1}
                      maxLength={100}
                      placeholder={isLoading ? "正在生成回复，请稍候..." : "请输入您的问题，按Enter发送..."}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      disabled={isLoading}
                      style={{ 
                        minHeight: 44, 
                        maxHeight: 120, 
                        fontSize: '15px', 
                        lineHeight: '1.5',
                        borderRadius: '12px'
                      }}
                    />
                    <div className="absolute right-2 bottom-1 text-xs text-gray-400 bg-gray-50/80 px-1.5 py-0.5 rounded-full select-none">
                      {inputValue.length}/100
                    </div>
                    {errorMessage && (
                      <div className="absolute left-0 -top-8 text-xs text-red-500 animate-fadeIn bg-white px-3 py-1.5 rounded-lg shadow-md border border-red-100">
                        {errorMessage}
                      </div>
                    )}
                  </div>
                  <button
                    className={`flex-shrink-0 rounded-full w-11 h-11 flex items-center justify-center transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg focus:outline-none ${
                      isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                    }`}
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    aria-label="发送"
                  >
                    <FiSend className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-center text-gray-400 mt-2">
                  按Enter发送，Shift+Enter换行
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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