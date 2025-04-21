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
 * @description 发送消息到聊天API，失败时自动重试
 * @param message 用户消息
 * @param maxRetries 最大重试次数
 * @returns API响应
 */
export async function sendMessageWithRetry(
  message: string, 
  maxRetries: number = 5
): Promise<{ success: boolean; reply: string; error?: string }> {
  let retries = 0;
  
  const tryRequest = async (): Promise<{ success: boolean; reply: string; error?: string }> => {
    try {
      const result = await sendMessage(message);
      
      // 如果成功，直接返回结果
      if (result.success) {
        return result;
      }
      
      // 如果失败且还有重试次数，则等待后重试
      if (retries < maxRetries) {
        retries++;
        console.log(`API请求失败，3秒后进行第${retries}次重试...`);
        
        // 等待3秒后重试
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return tryRequest();
      }
      
      // 重试次数耗尽，返回最后一次失败的结果
      return result;
    } catch (error) {
      // 如果还有重试次数，则重试
      if (retries < maxRetries) {
        retries++;
        console.log(`API请求异常，3秒后进行第${retries}次重试...`);
        
        // 等待3秒后重试
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return tryRequest();
      }
      
      // 重试次数耗尽，返回错误
      console.error('重试后仍然失败:', error);
      return { 
        success: false, 
        reply: '', 
        error: error instanceof Error ? error.message : '连接服务器时出错' 
      };
    }
  };
  
  return tryRequest();
}

/**
 * @description 生成备用回复（当API不可用时使用）
 * @param message 用户消息
 * @returns 备用回复
 */
export function generateFallbackReply(message: string): string {
  // 简单的关键词匹配
  const lowerMessage = message.toLowerCase();
  
  // 转人工相关请求 - 保留此逻辑用于API调用失败时的兜底
  if (lowerMessage.includes('转人工') || lowerMessage.includes('人工客服') || lowerMessage.includes('真人') || 
      lowerMessage.includes('机器人') || lowerMessage.includes('换人')) {
    return '您好，我就是真人客服，正在为您服务。请问有什么可以帮助您的呢？';
  }
  
  if (lowerMessage.includes('价格') || lowerMessage.includes('收费') || lowerMessage.includes('多少钱')) {
    return '我们提供多种套餐方案，基础版每月99元起，标准版299元起，企业版请联系销售获取报价。您可以在我们的价格页面查看详细信息。';
  }
  
  if (lowerMessage.includes('试用') || lowerMessage.includes('免费')) {
    return '我们提供14天的免费试用期，无需信用卡，您可以通过注册账号立即开始试用所有功能。';
  }
  
  if (lowerMessage.includes('功能') || lowerMessage.includes('特性')) {
    return '我们的系统具有自动回复、知识库管理、多渠道集成、数据分析等功能，可以帮助您提升客户服务效率，降低运营成本。';
  }
  
  if (lowerMessage.includes('部署') || lowerMessage.includes('安装')) {
    return '我们提供云端SaaS服务，无需安装部署，注册后即可使用。同时我们也支持私有化部署，可以按照您的需求定制。';
  }
  
  if (lowerMessage.includes('联系') || lowerMessage.includes('客服') || lowerMessage.includes('人工')) {
    return '如需更多帮助，请拨打我们的服务热线：400-123-4567，或者联系我们的销售负责人东海：15055101186。';
  }
  
  // 默认回复
  return '感谢您的咨询！我很高兴为您提供帮助。您可以咨询我们的产品功能、价格、使用方法等问题，我会尽快为您解答。';
}

/**
 * @description 生成临时回复，告知用户需要稍等
 * @returns 临时回复消息
 */
export function generateWaitingReply(): string {
  const waitingReplies = [
    "正在查询相关信息，请稍等片刻...",
    "您好，我正在处理您的问题，稍等一下...",
    "请您稍等片刻，我正在为您查询相关信息",
    "稍等一分钟，我正在为您准备详细的回复",
    "对您的问题非常重视，正在整理相关信息，马上回复您"
  ];
  
  // 随机选择一条回复
  const randomIndex = Math.floor(Math.random() * waitingReplies.length);
  return waitingReplies[randomIndex];
} 