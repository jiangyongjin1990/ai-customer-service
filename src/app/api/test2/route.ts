import { NextRequest, NextResponse } from 'next/server';

/**
 * 测试调用DeepSeek的API路由
 * @param req 请求对象
 * @returns API响应
 */
export async function POST(req: NextRequest) {
  console.log('[TEST2] 收到请求');
  
  try {
    // 解析请求
    const body = await req.json();
    console.log('[TEST2] 请求体:', body);
    
    const userMessage = body.message;
    console.log('[TEST2] 用户消息:', userMessage);

    if (!userMessage) {
      console.log('[TEST2] 错误: 缺少消息字段');
      return NextResponse.json({ error: '消息不能为空' }, { status: 400 });
    }

    try {
      // 调用硅基流动 DeepSeek API
      console.log('[TEST2] 调用 DeepSeek API');
      const API_KEY = 'sk-vtfsmocgfmxscxwfwikrvntupmykphbkolybsvzvwydubsiv';
      
      // 调用API
      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'Pro/deepseek-ai/DeepSeek-V3',
          messages: [
            {
              role: 'system',
              content: '你是一个有帮助的AI助手。'
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 800,
          stream: false,
        }),
      });
      
      console.log('[TEST2] DeepSeek 响应状态:', response.status);
      
      if (!response.ok) {
        throw new Error(`DeepSeek API 响应错误: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('[TEST2] DeepSeek 响应成功');
      
      // 提取回复内容
      const reply = data.choices[0]?.message?.content || '抱歉，无法获取回复';
      console.log('[TEST2] DeepSeek 回复:', reply);
      
      // 返回回复
      return NextResponse.json({ reply });
      
    } catch (apiError) {
      console.error('[TEST2] DeepSeek API调用失败:', apiError);
      
      // 返回备用回复
      return NextResponse.json({ 
        reply: '抱歉，我暂时无法连接到AI服务，请稍后再试。',
        error: '调用AI服务失败'
      });
    }
    
  } catch (error) {
    console.error('[TEST2] 处理请求出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
} 