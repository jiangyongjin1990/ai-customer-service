import { NextRequest, NextResponse } from 'next/server';

/**
 * 测试API路由
 * @param req 请求对象
 * @returns API响应
 */
export async function POST(req: NextRequest) {
  try {
    console.log('[API Test] 收到请求');
    
    // 1. 解析请求
    const body = await req.json();
    console.log('[API Test] 请求体:', body);
    const userMessage = body.message;
    
    // 2. 创建测试回复
    const reply = `这是测试API路由的回复。我收到了您的消息: "${userMessage || '无消息'}"`;
    console.log('[API Test] 发送回复:', reply);
    
    // 3. 返回回复
    return NextResponse.json({ 
      reply: reply,
      timestamp: new Date().toISOString(),
      success: true
    });
    
  } catch (error) {
    console.error('[API Test] 错误:', error);
    return NextResponse.json({ 
      error: `测试路由错误: ${error instanceof Error ? error.message : '未知错误'}`,
      timestamp: new Date().toISOString(),
      success: false
    }, { status: 500 });
  }
}

export async function GET() {
  console.log('测试API - 收到GET请求');
  return NextResponse.json({ message: '测试API正常工作' });
} 