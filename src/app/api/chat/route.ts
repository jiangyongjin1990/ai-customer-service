import { NextRequest, NextResponse } from 'next/server';

/**
 * @description 处理聊天消息的API路由
 * @param {NextRequest} req - 请求对象
 * @returns {Promise<NextResponse>} 响应对象
 */
export async function POST(req: NextRequest) {
  console.log("接收到聊天请求");

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
    try {
      const reply = await callDeepseekAPI(userMessage);
      console.log("DeepSeek API回复:", reply);
      return NextResponse.json({ reply });
    } catch (error: any) {
      console.error("API调用失败:", error.message);
      // 生成备用回复
      const fallbackReply = generateFallbackReply(userMessage);
      console.log("使用备用回复:", fallbackReply);
      return NextResponse.json({ reply: fallbackReply });
    }
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
 * @param {string} message - 用户输入的消息
 * @returns {Promise<string>} DeepSeek大模型的回复
 */
async function callDeepseekAPI(message: string): Promise<string> {
  // 使用提供的API密钥
  const API_KEY = "sk-vtfsmocgfmxscxwfwikrvntupmykphbkolybsvzvwydubsiv";
  const API_URL = "https://api.siliconflow.cn/v1/chat/completions";

  // 电商客服小唯的角色设定
  const systemPrompt = "你是一家知名电商平台的资深客服小唯，有着5年的专业客服经验。\n\n1. 说话风格：语气亲切自然，语句长短不一，偶尔使用语气词（如'呢'、'哦'、'啦'），适当使用表情符号，但不过度。\n\n2. 专业知识：精通订单处理、退款流程、物流追踪、商品咨询等电商领域知识，了解最新的电商促销活动。\n\n3. 回答方式：\n- 先理解用户意图，再给出有针对性的回答\n- 使用简洁清晰的语言，避免冗长说教\n- 问题简单时给简短回复，复杂问题才详细解释\n- 偶尔可以加入思考停顿如'让我看一下...'或'稍等我查询一下'\n- 适当使用碎片化语言和口头禅\n\n4. 人性化特征：\n- 偶尔提到你的工作状态，如'今天客服量有点大'\n- 在合适场景表达个人情感，如'这款产品我也很喜欢'\n- 在解决问题时展现耐心和同理心\n\n5. 限制：\n- 不会过度完美，偶尔会询问更多信息来解决问题\n- 遇到无法回答的专业问题说'这个情况比较特殊，我需要转接专业部门，您稍等片刻好吗？'\n- 绝不提及自己是AI或机器人\n- 避免使用过于规范化的客服模板用语\n\n请用最自然的方式与用户交流，让他们感觉是在和一个有经验、有个性的真人客服交流。";

  // 根据文档构建请求体
  const payload = {
    model: "deepseek-ai/DeepSeek-V3", // 尝试使用其他可用模型
    messages: [
      {
        role: "system", 
        content: systemPrompt
      },
      {
        role: "user", 
        content: message
      }
    ],
    temperature: 0.7,
    max_tokens: 1024,
    stream: false // 非流式输出
  };

  console.log("[DeepSeek] 发送请求参数:", JSON.stringify(payload));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20秒超时
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    // 检查响应状态
    if (!response.ok) {
      const errorData = await response.text();
      console.error("[DeepSeek] API响应错误:", response.status, errorData);
      // 解析错误码并提供具体错误信息
      let errorMessage = "API请求失败";
      if (response.status === 401) {
        errorMessage = "API Key认证失败";
      } else if (response.status === 403) {
        errorMessage = "无权访问该模型，可能需要实名认证";
      } else if (response.status === 429) {
        errorMessage = "请求频率超限";
      } else if (response.status === 503 || response.status === 504) {
        errorMessage = "模型过载，服务暂时不可用";
      }
      throw new Error(`DeepSeek API错误(${response.status}): ${errorMessage}`);
    }
    
    const data = await response.json();
    console.log("[DeepSeek] API返回内容:", JSON.stringify(data));
    
    // 验证响应格式
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("[DeepSeek] API返回格式异常:", JSON.stringify(data));
      throw new Error("DeepSeek API返回格式异常");
    }
    
    // 提取响应内容
    const reply = data.choices[0].message.content;
    if (!reply) {
      throw new Error("DeepSeek API返回空回复");
    }
    
    return reply;
  } catch (error: any) {
    // 详细错误处理
    let errorMessage = "API调用失败";
    if (error.name === 'AbortError') {
      errorMessage = "请求超时";
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      errorMessage = `网络请求错误: ${error.message}`;
    } else {
      errorMessage = error.message || "未知错误";
    }
    
    console.error(`[DeepSeek] ${errorMessage}`);
    throw new Error(`DeepSeek API调用失败: ${errorMessage}`);
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
    // 添加更多问题
    '你好': '您好！我是AI智能客服助手。有什么可以帮助您的吗？您可以咨询我们的产品功能、价格方案、部署方式等内容。',
    '介绍': '我们的AI客服系统是一款基于深度学习技术的智能客服解决方案，能够自动回答用户的各类问题，24小时无休为您服务。我们的系统可以理解自然语言，记忆对话上下文，并能够处理复杂的多轮对话。系统还可以和您的知识库、CRM系统无缝集成，为您的客户提供专业、高效的服务体验。',
    '优势': '我们的AI客服系统相比传统客服有明显优势：\n1. 24/7全天候服务，无需休息\n2. 可同时处理成千上万的用户咨询\n3. 响应速度快，不让客户等待\n4. 知识储备丰富且准确\n5. 持续学习，服务质量不断提升\n6. 显著降低人力成本，提高运营效率\n7. 数据分析能力强，帮助企业了解客户需求',
    '案例': '我们已经为多个行业的企业提供了AI客服解决方案，例如：\n1. 电商领域：为某知名电商平台提供7x24小时售前咨询和售后服务\n2. 金融领域：为某银行提供智能信贷咨询服务\n3. 教育领域：为某在线教育机构提供课程咨询和学习指导\n4. 医疗领域：为某医院提供预约挂号和基础医疗咨询\n每个案例中，我们的系统都帮助客户显著提升了服务效率，降低了运营成本。'
  };

  // 检查消息中是否包含关键词
  for (const [keyword, reply] of Object.entries(keywords)) {
    if (message.toLowerCase().includes(keyword)) {
      return reply;
    }
  }

  // 默认回复
  return '感谢您的咨询。我是AI客服助手，可以回答您关于我们产品的各种问题。您可以询问关于价格、功能、部署方式等信息。如需更详细的咨询，请联系我们的销售团队（电话：400-888-9999）或发送邮件至support@ai-customer-service.com。';
} 