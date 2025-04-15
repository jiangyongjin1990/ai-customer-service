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
      text: '👋 您好！我是智能客服助手小维，有什么可以帮助您的吗？',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    // 更新消息列表并清空输入框
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 添加机器人回复
      const botMessage = {
        id: Date.now() + 1,
        text: getRandomResponse(inputValue.trim()),
        sender: 'bot' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
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
  
  // 添加随机回复函数
  const getRandomResponse = (query: string) => {
    const responses = [
      `您好，关于"${query}"的问题，我们的系统目前正在升级中，稍后将会有更详细的回复。`,
      `感谢您的提问。关于"${query}"，我们的建议是先查看产品说明书或在线帮助文档。`,
      `您询问的"${query}"是我们常见的问题。一般情况下，您可以通过重启设备来解决这个问题。`,
      `关于"${query}"，我们的技术团队正在研发更完善的解决方案，感谢您的耐心等待。`,
      `您好，"${query}"这个问题比较复杂，建议您联系我们的人工客服获取更专业的帮助。`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">智能客服演示</h1>
        <p className="text-gray-600">
          这是我们智能客服系统的实时演示。尝试询问有关产品、价格或功能的问题！
        </p>
      </div>
      
      {/* 聊天界面 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
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
              >
                {message.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          <div ref={endOfMessagesRef} />
        </div>
        
        {/* 输入区域 */}
        <div className="border-t p-4 flex items-end">
          <textarea
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="请输入您的问题..."
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button
            className={`ml-2 px-4 py-2 rounded-lg ${isLoading ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? '发送中...' : '发送'}
          </button>
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