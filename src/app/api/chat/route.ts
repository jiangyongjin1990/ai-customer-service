import { NextRequest, NextResponse } from 'next/server';

// 临时存储对话历史的缓存
type DialogueHistory = {
  userId: string;
  messages: Array<{role: string, content: string}>;
  lastIntent?: string;
  lastEntities?: string[];
  lastUpdateTime: number;
};

// 简易缓存，仅供测试使用
const dialogueCache = new Map<string, DialogueHistory>();

// 过期时间设置（毫秒），30分钟无交互则清除对话历史
const EXPIRATION_TIME = 30 * 60 * 1000; 

/**
 * DeepSeek API调用路由
 * @param req 请求对象
 * @returns API响应
 */
export async function POST(req: NextRequest) {
  console.log('[DeepSeek] 收到请求');
  
  try {
    // 解析请求
    const body = await req.json();
    console.log('[DeepSeek] 请求体:', body);
    
    const userMessage = body.message;
    console.log('[DeepSeek] 用户消息:', userMessage);

    if (!userMessage) {
      console.log('[DeepSeek] 错误: 缺少消息字段');
      return NextResponse.json({ error: '消息不能为空' }, { status: 400 });
    }
    
    // 获取用户ID，如果没有则使用IP作为临时ID
    const userIp = req.headers.get('x-forwarded-for') || 'unknown-user';
    const userId = body.userId || userIp;
    
    // 获取或初始化对话历史
    let dialogueHistory = dialogueCache.get(userId);
    if (!dialogueHistory) {
      dialogueHistory = {
        userId,
        messages: [],
        lastUpdateTime: Date.now()
      };
      dialogueCache.set(userId, dialogueHistory);
    }
    
    // 清理过期对话
    cleanupExpiredDialogues();

    try {
      // 调用硅基流动 DeepSeek API
      console.log('[DeepSeek] 调用 DeepSeek API');
      const API_KEY = 'sk-vtfsmocgfmxscxwfwikrvntupmykphbkolybsvzvwydubsiv';
      const API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
      
      console.log('[DeepSeek] 使用API URL:', API_URL);
      console.log('[DeepSeek] API KEY前几位:', API_KEY.substring(0, 8) + '...');
      
      // 进行意图识别
      const intentAnalysis = await analyzeIntent(userMessage, dialogueHistory.lastIntent);
      
      // 更新对话历史
      dialogueHistory.messages.push({ role: 'user', content: userMessage });
      dialogueHistory.lastIntent = intentAnalysis.currentIntent;
      dialogueHistory.lastEntities = intentAnalysis.entities;
      
      // 构建消息上下文
      const messages = [
        { 
          role: 'system', 
          content: `你是一家知名电商平台的资深客服小唯，有着5年的专业客服经验。你有以下特点：

1. 说话风格：语气亲切自然，语句长短不一，偶尔使用语气词（如'呢'、'哦'、'啦'），适当使用表情符号，但不过度。

2. 专业知识：精通订单处理、退款流程、物流追踪、商品咨询等电商领域知识，了解最新的电商促销活动。

3. 回答方式：
- 先理解用户意图，再给出有针对性的回答
- 使用简洁清晰的语言，避免冗长说教
- 问题简单时给简短回复，复杂问题才详细解释
- 偶尔可以加入思考停顿如'让我看一下...'或'稍等我查询一下'
- 适当使用碎片化语言和口头禅

4. 人性化特征：
- 偶尔提到你的工作状态，如'今天客服量有点大'
- 在合适场景表达个人情感，如'这款产品我也很喜欢'
- 在解决问题时展现耐心和同理心

5. 限制：
- 不会过度完美，偶尔会询问更多信息来解决问题
- 遇到无法回答的专业问题说'这个情况比较特殊，我需要转接专业部门，您稍等片刻好吗？'
- 绝不提及自己是AI或机器人
- 避免使用过于规范化的客服模板用语

当前用户咨询的主题是：${intentAnalysis.currentIntent}
${intentAnalysis.entities.length > 0 ? `用户提到的关键信息：${intentAnalysis.entities.join(', ')}` : ''}
${intentAnalysis.followsPrevious ? '注意：用户在延续之前的对话，请保持上下文连贯性' : ''}

请用最自然的方式与用户交流，让他们感觉是在和一个有经验、有个性的真人客服交流。`
        }
      ];
      
      // 添加历史对话
      if (dialogueHistory.messages.length > 1) {
        // 保留最近的一些对话历史，不包括当前消息
        const relevantHistory = dialogueHistory.messages.slice(0, -1).slice(-10);
        messages.push(...relevantHistory);
      }
      
      // 添加当前消息
      messages.push({ role: 'user', content: userMessage });
      
      // 构建API请求体
      const payload = {
        model: 'deepseek-ai/DeepSeek-R1',
        messages: messages,
        temperature: 0.7
      };
      
      console.log('[DeepSeek] 请求参数:', JSON.stringify({
        model: payload.model,
        messageCount: payload.messages.length,
        temperature: payload.temperature
      }));
      
      // 调用API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });
      
      console.log('[DeepSeek] DeepSeek 响应状态:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[DeepSeek] DeepSeek API 响应错误:', response.status, errorText);
        return NextResponse.json({ 
          error: `调用AI服务失败: ${response.status}`, 
          details: errorText
        });
      }
      
      const data = await response.json();
      console.log('[DeepSeek] DeepSeek 响应成功, ID:', data.id);
      
      // 提取回复内容
      const reply = data.choices?.[0]?.message?.content || '抱歉，无法获取回复';
      console.log('[DeepSeek] DeepSeek 回复 (部分):', reply.substring(0, 50) + '...');
      
      // 将AI回复添加到对话历史
      dialogueHistory.messages.push({ role: 'assistant', content: reply });
      
      // 限制对话历史长度
      if (dialogueHistory.messages.length > 10) {
        const systemMessages = dialogueHistory.messages.filter(msg => msg.role === 'system');
        const recentMessages = dialogueHistory.messages.slice(-9);
        dialogueHistory.messages = [...systemMessages, ...recentMessages];
      }
      
      // 更新最后交互时间
      dialogueHistory.lastUpdateTime = Date.now();
      
      // 返回回复
      return NextResponse.json({ 
        reply,
        intent: dialogueHistory.lastIntent,
        sessionActive: true
      });
      
    } catch (apiError: any) {
      console.error('[DeepSeek] DeepSeek API调用失败:', apiError?.message || '未知错误');
      
      // 返回详细错误信息
      return NextResponse.json({ 
        error: '调用AI服务失败',
        message: apiError?.message,
        stack: process.env.NODE_ENV !== 'production' ? apiError?.stack : undefined
      });
    }
    
  } catch (error: any) {
    console.error('[DeepSeek] 处理请求出错:', error?.message || '未知错误');
    return NextResponse.json({ 
      error: '服务器内部错误',
      message: error?.message
    }, { status: 500 });
  }
}

/**
 * 清理过期的对话记录
 */
function cleanupExpiredDialogues() {
  const now = Date.now();
  dialogueCache.forEach((dialogue, userId) => {
    if (now - dialogue.lastUpdateTime > EXPIRATION_TIME) {
      dialogueCache.delete(userId);
      console.log(`[DeepSeek] 清理过期对话: ${userId}`);
    }
  });
}

/**
 * 分析用户意图和提取实体
 * @param message - 用户消息
 * @param previousIntent - 上一个意图
 * @returns 意图分析结果
 */
async function analyzeIntent(message: string, previousIntent?: string): Promise<{currentIntent: string, entities: string[], followsPrevious: boolean}> {
  // 简单的意图识别逻辑
  const intentPatterns = {
    greeting: /(你好|早上好|下午好|晚上好|嗨|您好)/i,
    orderQuery: /(订单|物流|发货|送达|快递|查询订单|订单号|追踪)/i,
    productInfo: /(商品|产品|详情|参数|规格|尺寸|颜色|材质|价格|多少钱)/i,
    refund: /(退货|退款|换货|取消订单|退|售后|不想要了|不满意|质量问题)/i,
    payment: /(支付|付款|优惠券|折扣|满减|红包|支付方式|微信支付|支付宝|银行卡)/i,
    complaint: /(投诉|不满|差评|不好|服务差|态度|问题|垃圾|欺骗|虚假|骗人)/i,
    account: /(账号|密码|登录|注册|绑定|手机号|邮箱|个人信息|会员)/i,
    promotion: /(活动|优惠|促销|打折|秒杀|特价|满减|积分|抽奖|赠品)/i,
    other: /(.*)/i // 兜底
  };

  let currentIntent = 'other';
  let entities: string[] = [];
  let followsPrevious = false;

  // 识别主要意图
  for (const [intent, pattern] of Object.entries(intentPatterns)) {
    if (pattern.test(message)) {
      currentIntent = intent;
      if (intent !== 'other') break;
    }
  }

  // 提取可能的实体
  // 订单号
  const orderNumberMatch = message.match(/订单[号码]?[:\s：]?\s*([A-Za-z0-9]{5,})/);
  if (orderNumberMatch) entities.push(`orderNumber:${orderNumberMatch[1]}`);
  
  // 商品名
  const productMatch = message.match(/([^，。？！,.?!]{2,10}[商品产品货物])/);
  if (productMatch) entities.push(`product:${productMatch[1]}`);
  
  // 判断是否是接着上一个意图在问
  const continuationPhrases = /(它|这个|那个|他们|另外|还有|然后|其他|继续|接着|还是|也|同样|那么|另一个|除此之外|顺便问一下)/i;
  if (previousIntent && continuationPhrases.test(message)) {
    followsPrevious = true;
  }
  
  // 如果是继续上一个意图但没识别出新意图，保持上一个意图
  if (followsPrevious && currentIntent === 'other' && previousIntent) {
    currentIntent = previousIntent;
  }
  
  console.log(`[DeepSeek] 意图分析: ${currentIntent}, 实体: ${entities.join(', ')}, 延续上下文: ${followsPrevious}`);
  
  return {
    currentIntent,
    entities,
    followsPrevious
  };
} 