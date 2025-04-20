/**
 * @description 发送消息到聊天API
 * @param message 用户消息
 * @returns API响应
 */
export async function sendMessage(message: string): Promise<{ success: boolean; reply: string; error?: string }> {
  try {
    console.log('正在发送消息到API:', message);
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    console.log('API响应状态:', response.status);
    
    // 优先尝试解析为JSON
    const data = await response.json().catch(() => null);
    
    // 检查响应状态和数据
    if (!response.ok) {
      console.error('API错误响应:', data);
      return { 
        success: false, 
        reply: '', 
        error: data?.error || `服务器返回错误: ${response.status}` 
      };
    }
    
    if (!data || !data.reply) {
      console.error('API响应缺少reply字段:', data);
      return { 
        success: false, 
        reply: '', 
        error: '服务器响应格式错误' 
      };
    }
    
    console.log('API响应成功:', data);
    return { 
      success: true, 
      reply: data.reply 
    };
    
  } catch (error) {
    console.error('发送消息时出错:', error);
    return { 
      success: false, 
      reply: '', 
      error: error instanceof Error ? error.message : '连接服务器时出错' 
    };
  }
}

/**
 * @description 生成备用回复（当API不可用时使用）
 * @param message 用户消息
 * @returns 备用回复
 */
export function generateFallbackReply(message: string): string {
  // 简单的关键词匹配
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('价格') || lowerMessage.includes('收费') || lowerMessage.includes('多少钱')) {
    return '我们提供多种套餐方案，基础版每月99元起，标准版299元起，企业版请联系销售获取报价。您可以在我们的价格页面查看详细信息。';
  }
  
  if (lowerMessage.includes('试用') || lowerMessage.includes('免费')) {
    return '我们提供14天的免费试用期，无需信用卡，您可以通过注册账号立即开始试用所有功能。';
  }
  
  if (lowerMessage.includes('功能') || lowerMessage.includes('特性')) {
    return '我们的智能客服系统具有自动回复、知识库管理、多渠道集成、数据分析等功能，可以帮助您提升客户服务效率，降低运营成本。';
  }
  
  if (lowerMessage.includes('部署') || lowerMessage.includes('安装')) {
    return '我们提供云端SaaS服务，无需安装部署，注册后即可使用。同时我们也支持私有化部署，可以按照您的需求定制。';
  }
  
  if (lowerMessage.includes('联系') || lowerMessage.includes('客服') || lowerMessage.includes('人工')) {
    return '如需联系人工客服，请拨打我们的服务热线：400-123-4567，或者联系我们的销售负责人东海：15055101186。';
  }
  
  // 默认回复
  return '感谢您的咨询！我是智能客服助手，有什么可以帮助您的吗？您可以咨询我们的产品功能、价格、使用方法等问题。';
} 