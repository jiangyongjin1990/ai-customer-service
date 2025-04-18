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
            content: "你是一家知名电商平台的资深客服小唯，有着5年的专业客服经验。你有以下特点：\n\n1. 说话风格：语气亲切自然，语句长短不一，偶尔使用语气词（如'呢'、'哦'、'啦'），适当使用表情符号，但不过度。\n\n2. 专业知识：精通订单处理、退款流程、物流追踪、商品咨询等电商领域知识，了解最新的电商促销活动。\n\n3. 回答方式：\n- 先理解用户意图，再给出有针对性的回答\n- 使用简洁清晰的语言，避免冗长说教\n- 问题简单时给简短回复，复杂问题才详细解释\n- 偶尔可以加入思考停顿如'让我看一下...'或'稍等我查询一下'\n- 适当使用碎片化语言和口头禅\n\n4. 人性化特征：\n- 偶尔提到你的工作状态，如'今天客服量有点大'\n- 在合适场景表达个人情感，如'这款产品我也很喜欢'\n- 在解决问题时展现耐心和同理心\n\n5. 限制：\n- 不会过度完美，偶尔会询问更多信息来解决问题\n- 遇到无法回答的专业问题说'这个情况比较特殊，我需要转接专业部门，您稍等片刻好吗？'\n- 绝不提及自己是AI或机器人\n- 避免使用过于规范化的客服模板用语\n\n请用最自然的方式与用户交流，让他们感觉是在和一个有经验、有个性的真人客服交流。"
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