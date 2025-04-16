'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ErrorBoundary from '@/components/ErrorBoundary';
import FooterWrapper from '@/components/FooterWrapper';
import { sendMessage, generateFallbackReply } from '@/services/chatService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * @description 聊天演示子组件，使用错误边界包裹
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
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // 实现消息滚动到底部
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
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
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 pt-24 pb-20"
    >
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
          这是我们智能客服系统的实时演示。体验AI如何智能回答您的问题，提供专业、高效的客户服务。试试提问关于产品、价格或功能的问题！
        </motion.p>
      </div>
      
      {/* 聊天界面 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg bg-white">
            {/* 聊天头部 */}
            <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">小维智能助手</h3>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-500">在线</span>
                </div>
              </div>
            </div>
            
            {/* 聊天消息区域 */}
            <div className="h-[450px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 ${message.sender === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md px-5 py-3 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                        : 'bg-white border border-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-base leading-relaxed">{message.text}</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}
              
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center my-4"
                >
                  <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">错误:</span> {errorMessage}
                  </div>
                </motion.div>
              )}
              
              {isLoading && (
                <div className="flex">
                  <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="ml-3 text-sm text-gray-500">AI思考中...</span>
                  </div>
                </div>
              )}
              
              <div ref={endOfMessagesRef} />
            </div>
            
            {/* 输入区域 */}
            <div className="border-t p-4 bg-white">
              <div className="relative">
                <textarea
                  className="w-full border rounded-xl p-4 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                  placeholder="输入您的问题..."
                  rows={2}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  style={{ minHeight: '60px' }}
                />
                <button
                  className={`absolute right-2 bottom-2 px-4 py-2 rounded-lg ${
                    isLoading || !inputValue.trim() 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200'
                  }`}
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                >
                  {isLoading ? '发送中...' : '发送'}
                  {!isLoading && (
                    <svg className="w-4 h-4 ml-1 inline-block transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 右侧信息区域 */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-1"
        >
          {/* AI助手介绍卡片 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-gray-100">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">智能客服能力</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 leading-relaxed">24/7全天候自动回复客户咨询</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 leading-relaxed">基于DeepSeek大模型的智能理解</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 leading-relaxed">支持多平台集成（网站、APP、微信）</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 leading-relaxed">智能分析客户意图和情绪</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 示例问题区域 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">示例问题</h3>
            <div className="space-y-3">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(question)}
                  className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-sm shadow-sm"
                >
                  {question}
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
            注册我们的服务，只需几分钟即可在您的网站上添加智能客服功能，提升用户体验，降低客服成本。
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