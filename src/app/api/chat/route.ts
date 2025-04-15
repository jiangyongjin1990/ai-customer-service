import { NextResponse } from 'next/server';

/**
 * 处理聊天消息的API接口
 * @param req 请求对象
 * @returns API响应
 */
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    console.log('收到消息:', message);
    
    // 调用硅基流动API获取DeepseekR1模型回复
    const reply = await callDeepseekAPI(message);
    
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
 * 调用硅基流动API获取DeepseekR1模型的回复
 * @param message 用户消息
 * @returns 模型生成的回复
 */
async function callDeepseekAPI(message: string): Promise<string> {
  try {
    const API_KEY = 'sk-vtfsmocgfmxscxwfwikrvntupmykphbkolybsvzvwydubsiv';
    const API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3',
        messages: [
          {
            role: 'system',
            content: `你是维普特AI的智能客服助手小维，性格活泼开朗，回复风格亲切自然且略带俏皮。请使用口语化表达，可以适当加入一些emoji表情或轻松幽默的语气，但要保持专业性，迅速解决用户问题。

说话风格指南：
- 使用"我"而不是"系统"或"AI助手"来自称
- 偶尔使用emoji表情让对话更生动
- 可以偶尔使用感叹词如"哇"、"嘿"等开场
- 保持简洁，避免过度热情或冗长
- 仍然保持专业，不要过于随意

销售团队联系信息:
- 销售负责人: 东海
- 联系电话: 15055101186

当用户询问联系方式、销售顾问、人工服务、咨询购买等问题时，请提供销售负责人东海的联系方式。`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API调用失败:', errorText);
      return generateFallbackReply(message);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('API调用出错:', error);
    return generateFallbackReply(message);
  }
}

/**
 * 备用回复生成函数，当API调用失败时使用
 * @param message 用户消息
 * @returns 生成的回复
 */
function generateFallbackReply(message: string): string {
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
 