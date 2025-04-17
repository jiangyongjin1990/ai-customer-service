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
    }, 20000); // 20秒超时
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
    } catch (error) {
      console.error("API调用失败:", error);
      // 生成备用回复
      reply = generateFallbackReply(userMessage);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("处理请求时出错:", error);
    return NextResponse.json(
      { error: "服务器处理请求时出错" },
      { status: 500 }
    );
  }
}

/**
 * @description 调用DeepSeek API获取聊天回复
 * @param {string} message - 用户消息
 * @returns {Promise<string>} API响应
 */
async function callDeepseekAPI(message: string): Promise<string> {
  // 使用硅基流动API进行DeepSeekR1调用
  const API_KEY = process.env.GUIJI_API_KEY || process.env.DEEPSEEK_API_KEY || "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  
  if (!API_KEY || API_KEY === "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    console.error("缺少API密钥");
    throw new Error("服务配置错误：缺少API密钥");
  }
  
  // 硅基流动API端点
  const API_URL = "https://api.guiji.ai/v1/chat/completions";

  console.log("调用DeepSeekR1 API...");

  try {
    // 使用Promise.race实现超时控制
    const timeoutPromise = new Promise<Response>((_, reject) => {
      setTimeout(() => reject(new Error('请求超时: 15000ms')), 15000);
    });

    const fetchPromise = fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-r1",
        messages: [
          {
            role: "system",
            content: "你是维普特AI客服，一个专业的AI客服助手。你的任务是礼貌地回答用户关于AI客服产品的问题，提供有关价格、功能、集成方式等信息。保持回答简洁、专业且有帮助。如果不确定某个问题的答案，可以引导用户联系我们的销售团队获取更多信息。"
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API 响应错误:", response.status, errorText);
      throw new Error(`API调用失败: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("API响应:", data);

    // 检查响应结构
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error("API响应格式错误:", data);
      throw new Error("API响应格式错误");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("调用API时出错:", error);
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