'use client';

import { useState } from 'react';

export default function TestPage() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '请求失败');
      }
      
      setReply(data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">测试页面</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="请输入消息..."
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      
      <button
        onClick={handleSendMessage}
        disabled={isLoading || !message.trim()}
        className={`px-4 py-2 rounded ${
          isLoading || !message.trim() 
            ? 'bg-gray-300' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? '发送中...' : '发送'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          错误: {error}
        </div>
      )}
      
      {reply && (
        <div className="mt-4 p-4 bg-gray-50 border rounded">
          <h2 className="font-semibold mb-2">回复:</h2>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
} 