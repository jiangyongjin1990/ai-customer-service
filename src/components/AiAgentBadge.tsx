import React from 'react';
import { MdOutlineSmartToy } from 'react-icons/md';

/**
 * @description AI Agent 标签组件，显示带有波浪渐变效果的徽章
 * @returns {JSX.Element} 标签组件
 */
export function AiAgentBadge() {
  return (
    <div className="flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-[#4e90cc] to-[#9478f0] shadow-md transform scale-75">
      <svg className="h-3 w-3 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
      </svg>
      <span className="text-white text-xs font-medium">AI Agent</span>
    </div>
  );
}

export default AiAgentBadge; 