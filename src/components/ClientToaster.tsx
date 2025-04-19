'use client';

import { Toaster } from 'react-hot-toast';

/**
 * @description 客户端Toaster组件
 * @returns {JSX.Element} Toaster组件
 */
export default function ClientToaster() {
  return (
    <Toaster 
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#333',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      }}
    />
  );
} 