import { NextResponse } from 'next/server';

/**
 * 处理聊天消息的API接口
 * @param req 请求对象
 * @returns API响应
 */
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // 这里将来会连接MongoDB和AI服务
    console.log('收到消息:', message);
    
    // 模拟AI回复
    const reply = generateSimpleReply(message);
    
    return NextResponse.json({ 
      success: true,
      reply
    });
  } catch (error) {
    console.error('处理消息失败:', error);
    return NextResponse.json({ 
      success: false,
      error: "处理消息失败"
    }, { status: 500 });
  }
}

/**
 * 根据关键词生成简单回复
 * @param message 用户消息
 * @returns 生成的回复
 */
function generateSimpleReply(message: string): string {
  // 简单的关键词匹配
  if (message.includes('价格') || message.includes('收费') || message.includes('多少钱')) {
    return '我们提供多种套餐方案，基础版每月99元起，标准版299元起，企业版请联系销售获取报价。您可以在我们的价格页面查看详细信息。';
  }
  
  if (message.includes('试用') || message.includes('免费')) {
    return '我们提供14天的免费试用期，无需信用卡，您可以通过注册账号立即开始试用所有功能。';
  }
  
  if (message.includes('功能') || message.includes('特性')) {
    return '我们的智能客服系统具有自动回复、知识库管理、多渠道集成、数据分析等功能，可以帮助您提升客户服务效率，降低运营成本。';
  }
  
  if (message.includes('部署') || message.includes('安装')) {
    return '我们提供云端SaaS服务，无需安装部署，注册后即可使用。同时我们也支持私有化部署，可以按照您的需求定制。';
  }
  
  // 默认回复
  return '感谢您的咨询！我是智能客服助手，有什么可以帮助您的吗？您可以咨询我们的产品功能、价格、使用方法等问题。';
} 