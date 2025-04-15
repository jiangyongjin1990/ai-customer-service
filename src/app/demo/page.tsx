'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '👋 您好！我是智能客服助手，有什么可以帮助您的吗？',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // 自动滚动到最新消息
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // 处理发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // 每次对话后增加字体大小
    setFontSize(prevSize => Math.min(prevSize + 2, 28));
    
    try {
      // 调用API获取回复
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputValue })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 添加机器人回复
        setTimeout(() => {
          const botMessage: Message = {
            id: Date.now(),
            text: data.reply,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
        }, 500); // 添加短暂延迟，使对话更自然
      } else {
        throw new Error(data.error || '获取回复失败');
      }
    } catch (error) {
      console.error('发送消息失败:', error);
      // 添加错误消息
      const errorMessage: Message = {
        id: Date.now(),
        text: '抱歉，我遇到了一些问题，无法回复您的消息。请稍后再试。',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
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
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">智能客服演示</h1>
        <p className="text-gray-600">
          这是我们智能客服系统的实时演示。尝试询问有关产品、价格或功能的问题！
        </p>
      </div>
      
      {/* 聊天界面 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* 聊天消息区域 */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
            >
              <div
                className={`inline-block max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {message.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {/* 加载指示器 */}
          {isLoading && (
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 rounded-full p-2">
                <div className="flex space-x-1">
                  <div className="bg-gray-500 h-2 w-2 rounded-full animate-bounce"></div>
                  <div className="bg-gray-500 h-2 w-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="bg-gray-500 h-2 w-2 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={endOfMessagesRef} />
        </div>
        
        {/* 输入区域 */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex">
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="输入您的问题..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              发送
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">按Enter键发送，Shift+Enter换行</p>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">想要在您的网站集成这样的智能客服？</h2>
        <p className="text-sm mb-4">
          注册我们的服务，只需几分钟即可在您的网站上添加智能客服功能。
        </p>
        <Link 
          href="/signup" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          免费开始
        </Link>
      </div>
    </div>
  );
} 
 