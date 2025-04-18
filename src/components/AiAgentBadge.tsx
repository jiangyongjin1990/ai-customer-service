import React from 'react';

/**
 * @description AI Agent 标签组件，显示为小角标，无图标，字体更小
 * @returns {JSX.Element} 标签组件
 */
export function AiAgentBadge() {
  return (
    <span className="ml-1 px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-[#4e90cc] to-[#9478f0] text-white rounded-full align-top" style={{lineHeight: '1.2'}}>AI Agent</span>
  );
}

export default AiAgentBadge; 