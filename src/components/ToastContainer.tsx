'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

// 定义Toast类型
type ToastType = 'success' | 'error' | 'info';

// 定义Toast数据接口
interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

// Toast上下文接口
interface ToastContextType {
  toasts: ToastData[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

// 创建Toast上下文
const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

/**
 * @description 使用Toast钩子
 * @returns {ToastContextType} Toast上下文
 */
export const useToast = () => useContext(ToastContext);

/**
 * @description Toast提供者组件
 * @param {object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {JSX.Element} Toast提供者组件
 */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // 添加Toast
  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // 3秒后自动移除
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  // 移除Toast
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * @description Toast容器组件
 * @param {object} props - 组件属性
 * @param {ToastData[]} props.toasts - Toast数据列表
 * @param {function} props.removeToast - 移除Toast的回调函数
 * @returns {JSX.Element} Toast容器组件
 */
const ToastContainer = ({ 
  toasts, 
  removeToast 
}: { 
  toasts: ToastData[]; 
  removeToast: (id: string) => void 
}) => {
  if (toasts.length === 0) return null;

  // 获取Toast图标
  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  // 获取Toast背景色
  const getBgColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg shadow-md border px-4 py-3 flex items-center justify-between ${getBgColor(toast.type)} transition-all duration-300 animate-fadeIn`}
        >
          <div className="flex items-center space-x-2">
            {getIcon(toast.type)}
            <p className="text-sm font-medium dark:text-white">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer; 