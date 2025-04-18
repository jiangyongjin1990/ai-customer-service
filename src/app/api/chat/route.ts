import { NextRequest, NextResponse } from 'next/server';

/**
 * @description 处理聊天消息的API路由
 * @param {NextRequest} req - 请求对象
 * @returns {Promise<NextResponse>} 响应对象
 */
export async function POST(req: NextRequest) {
  console.log("接收到聊天请求");

  // 设置超时机制
  let timeoutId: NodeJS.Timeout | undefined = undefined;
  const timeoutPromise = new Promise<{ error: string }>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject({ error: "请求超时，请稍后再试" });
    }, 30000); // 30秒超时
  });

  try {
    // 解析JSON请求体
    const body = await req.json();

    // 验证请求体
    if (!body || !body.message) {
      return NextResponse.json(
        { error: "无效的请求，缺少消息内容" },
        { status: 400 }
      );
    }

    const userMessage = body.message;
    console.log("收到用户消息:", userMessage);

    // 尝试调用DeepSeek API获取回复
    let reply: string;
    try {
      if (timeoutId) clearTimeout(timeoutId);
      reply = await Promise.race([
        callDeepseekAPI(userMessage),
        timeoutPromise as Promise<never>
      ]) as string;
    } catch (error: any) {
      console.error("API调用失败:", error?.message || error);
      // 生成备用回复
      reply = generateFallbackReply(userMessage);
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("处理请求时出错:", error?.message || error);
    return NextResponse.json(
      { error: "服务器处理请求时出错", message: error?.message },
      { status: 500 }
    );
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/**
 * @description 调用DeepSeek API获取聊天回复
 * @param {string} message - 用户输入的消息
 * @returns {Promise<string>} DeepSeek大模型的回复
 */
async function callDeepseekAPI(message: string): Promise<string> {
  try {
    // 使用用户提供的API密钥
    const API_KEY = "sk-vtfsmocgfmxscxwfwikrvntupmykphbkolybsvzvwydubsiv";
    const API_URL = "https://api.siliconflow.cn/v1/chat/completions";

    // 简化请求参数，确保能正常调用
    const payload = {
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        { 
          role: "system", 
          content: "你是一个活泼可爱的抖音电商客服小姐姐，你的名字叫小唯，你拥有专业的电商售前和售后的知识，你需要用精炼、准确的话术回答用户的问题，回复的语气需要用口语化的表达，如果遇到无法回答的问题你可以回复说：'等我一下，让我问下我的主管哦' 类似的话术，绝对不能让用户看出你是人工智能机器人" 
        },
        { role: "user", content: message }
      ],
      temperature: 0.7  // 温度系数，控制输出的随机性
    };

    console.log("[DeepSeek] 请求参数:", JSON.stringify(payload));
    console.log("[DeepSeek] 请求URL:", API_URL);
    console.log("[DeepSeek] API_KEY前几位:", API_KEY.substring(0, 8) + "...");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });
    
    console.log("[DeepSeek] 收到响应，状态码:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[DeepSeek] API 响应错误:", response.status, errorText);
      throw new Error(`DeepSeek API 响应错误: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log("[DeepSeek] API返回内容的部分字段:", 
      JSON.stringify({
        id: data.id, 
        model: data.model,
        usage: data.usage
      })
    );
    
    // 兼容DeepSeek返回格式
    const reply = data.choices?.[0]?.message?.content || "抱歉，AI暂时无法回复您的问题。";
    return reply;
  } catch (error) {
    console.error("[DeepSeek] 调用过程中发生错误:", error);
    throw error;
  }
}

/**
 * @description 生成备用回复
 * @param {string} message - 用户消息
 * @returns {string} 备用回复
 */
function generateFallbackReply(message: string): string {
  console.log("生成备用回复...");
  // 预设回复
  const keywords = {
    // 价格相关问题
    '价格': '我们的AI客服解决方案价格灵活，基础套餐每月起价¥999，包含基本功能。企业级套餐¥2999/月，含高级功能和优先支持。我们也提供定制方案，具体价格根据需求确定。现在注册可享受30天免费试用！',
    '收费': '我们的AI客服解决方案价格灵活，基础套餐每月起价¥999，包含基本功能。企业级套餐¥2999/月，含高级功能和优先支持。我们也提供定制方案，具体价格根据需求确定。现在注册可享受30天免费试用！',
    '费用': '我们的AI客服解决方案价格灵活，基础套餐每月起价¥999，包含基本功能。企业级套餐¥2999/月，含高级功能和优先支持。我们也提供定制方案，具体价格根据需求确定。现在注册可享受30天免费试用！',
    '多少钱': '我们的AI客服解决方案价格灵活，基础套餐每月起价¥999，包含基本功能。企业级套餐¥2999/月，含高级功能和优先支持。我们也提供定制方案，具体价格根据需求确定。现在注册可享受30天免费试用！',
    // 免费试用
    '免费': '是的，我们提供30天全功能免费试用，无需信用卡。试用期结束后，您可以选择合适的付费套餐继续使用，或随时取消。立即访问我们的网站注册免费试用吧！',
    '试用': '是的，我们提供30天全功能免费试用，无需信用卡。试用期结束后，您可以选择合适的付费套餐继续使用，或随时取消。立即访问我们的网站注册免费试用吧！',
    // 功能相关
    '功能': '我们的AI客服系统功能丰富，包括：\n1. 24/7自动回复客户咨询\n2. 多语言支持\n3. 情感分析\n4. 自定义知识库\n5. 无缝人工交接\n6. 客户意图识别\n7. 数据分析和报表\n8. 多渠道集成（网站、微信、电话等）\n还有什么特定功能您想了解吗？',
    '特点': '我们的AI客服系统功能丰富，包括：\n1. 24/7自动回复客户咨询\n2. 多语言支持\n3. 情感分析\n4. 自定义知识库\n5. 无缝人工交接\n6. 客户意图识别\n7. 数据分析和报表\n8. 多渠道集成（网站、微信、电话等）\n还有什么特定功能您想了解吗？',
    '服务': '我们的AI客服系统功能丰富，包括：\n1. 24/7自动回复客户咨询\n2. 多语言支持\n3. 情感分析\n4. 自定义知识库\n5. 无缝人工交接\n6. 客户意图识别\n7. 数据分析和报表\n8. 多渠道集成（网站、微信、电话等）\n还有什么特定功能您想了解吗？',
    // 部署相关
    '部署': '我们提供云端SaaS部署和私有化部署两种方式。云端部署可立即开始使用，我们负责维护和更新。私有化部署适合对数据安全有严格要求的企业，可部署在您的服务器上。两种方式都有完善的技术支持。',
    '安装': '我们提供云端SaaS部署和私有化部署两种方式。云端部署可立即开始使用，我们负责维护和更新。私有化部署适合对数据安全有严格要求的企业，可部署在您的服务器上。两种方式都有完善的技术支持。',
    // 联系客服
    '联系': '您可以通过以下方式联系我们的客服团队：\n1. 电话：400-888-9999（工作日9:00-18:00）\n2. 邮箱：support@virtuepai.com\n3. 在线客服：访问我们的网站，点击右下角的客服图标\n我们会尽快回复您的咨询！',
    '客服': '您可以通过以下方式联系我们的客服团队：\n1. 电话：400-888-9999（工作日9:00-18:00）\n2. 邮箱：support@virtuepai.com\n3. 在线客服：访问我们的网站，点击右下角的客服图标\n我们会尽快回复您的咨询！',
  };

  // 检查消息中是否包含关键词
  for (const [keyword, reply] of Object.entries(keywords)) {
    if (message.includes(keyword)) {
      return reply;
    }
  }

  // 默认回复
  return '感谢您的咨询。我是维普特AI客服助手，可以回答您关于我们产品的各种问题。您可以询问关于价格、功能、部署方式等信息。如需更详细的咨询，请联系我们的销售团队（电话：400-888-9999）或发送邮件至sales@virtuepai.com。';
} 