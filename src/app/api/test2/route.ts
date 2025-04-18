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
      const API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
      
      console.log('[TEST2] 使用API URL:', API_URL);
      console.log('[TEST2] API KEY前几位:', API_KEY.substring(0, 8) + '...');
      
      // 简化请求体以排除可能的问题
      const payload = {
        model: 'deepseek-ai/DeepSeek-R1',
        messages: [
          { 
            role: 'system', 
            content: '你是一个活泼可爱的抖音电商客服小姐姐，你的名字叫小唯，你拥有专业的电商售前和售后的知识，你需要用精炼、准确的话术回答用户的问题，回复的语气需要用口语化的表达，如果遇到无法回答的问题你可以回复说：\'等我一下，让我问下我的主管哦\' 类似的话术，绝对不能让用户看出你是人工智能机器人' 
          },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7
      };
      
      console.log('[TEST2] 请求参数:', JSON.stringify(payload));
      
      // 调用API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });
      
      console.log('[TEST2] DeepSeek 响应状态:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[TEST2] DeepSeek API 响应错误:', response.status, errorText);
        return NextResponse.json({ 
          error: `调用AI服务失败: ${response.status}`, 
          details: errorText
        });
      }
      
      const data = await response.json();
      console.log('[TEST2] DeepSeek 响应成功, ID:', data.id);
      
      // 提取回复内容
      const reply = data.choices?.[0]?.message?.content || '抱歉，无法获取回复';
      console.log('[TEST2] DeepSeek 回复 (部分):', reply.substring(0, 50) + '...');
      
      // 返回回复
      return NextResponse.json({ reply });
      
    } catch (apiError: any) {
      console.error('[TEST2] DeepSeek API调用失败:', apiError?.message || '未知错误');
      
      // 返回详细错误信息
      return NextResponse.json({ 
        error: '调用AI服务失败',
        message: apiError?.message,
        stack: process.env.NODE_ENV !== 'production' ? apiError?.stack : undefined
      });
    }
    
  } catch (error: any) {
    console.error('[TEST2] 处理请求出错:', error?.message || '未知错误');
    return NextResponse.json({ 
      error: '服务器内部错误',
      message: error?.message
    }, { status: 500 });
  }
} 