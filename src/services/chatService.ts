/**
 * @description 发送消息到聊天API
 * @param message 用户消息
 * @returns API响应
 */
export async function sendMessage(message: string): Promise<{ success: boolean; reply: string; error?: string }> {
  try {
    console.log('正在发送消息到API:', message);
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    console.log('API响应状态:', response.status);
    
    // 优先尝试解析为JSON
    const data = await response.json().catch(() => null);
    
    // 检查响应状态和数据
    if (!response.ok) {
      console.error('API错误响应:', data);
      return { 
        success: false, 
        reply: '', 
        error: data?.error || `服务器返回错误: ${response.status}` 
      };
    }
    
    if (!data || !data.reply) {
      console.error('API响应缺少reply字段:', data);
      return { 
        success: false, 
        reply: '', 
        error: '服务器响应格式错误' 
      };
    }
    
    console.log('API响应成功:', data);
    return { 
      success: true, 
      reply: data.reply 
    };
    
  } catch (error) {
    console.error('发送消息时出错:', error);
    return { 
      success: false, 
      reply: '', 
      error: error instanceof Error ? error.message : '连接服务器时出错' 
    };
  }
}

/**
 * @description 生成备用回复（当API不可用时使用）
 * @param message 用户消息
 * @returns 备用回复
 */
export function generateFallbackReply(message: string): string {
  // 电商场景关键词匹配
  const lowerMessage = message.toLowerCase();
  
  // 商品查询相关
  if (lowerMessage.includes('商品') || lowerMessage.includes('产品') || lowerMessage.includes('有什么') || lowerMessage.includes('款式') || lowerMessage.includes('尺码') || lowerMessage.includes('颜色')) {
    return '我们有多种商品款式和颜色可选。针对您询问的商品，我们提供XS到XXL的尺码，颜色包括经典黑、天空蓝、玫瑰红等多种选择。您可以在商品详情页查看更多信息，或者告诉我具体商品名称，我可以为您查询详细信息。';
  }
  
  // 订单状态相关
  if (lowerMessage.includes('订单') || lowerMessage.includes('发货') || lowerMessage.includes('物流') || lowerMessage.includes('到货') || lowerMessage.includes('快递')) {
    return '您的订单正在处理中。通常订单确认后24小时内发货，物流信息会通过短信推送给您。如需查询具体订单状态，请提供您的订单号，我可以为您实时查询物流进度。';
  }
  
  // 退换货相关
  if (lowerMessage.includes('退货') || lowerMessage.includes('换货') || lowerMessage.includes('售后') || lowerMessage.includes('退款') || lowerMessage.includes('问题')) {
    return '我们支持7天无理由退换货。如果您收到的商品有任何问题，可以在"我的订单"中申请退换货，上传问题照片并填写原因。一般情况下，退款会在审核通过后1-3个工作日内原路返还。如有特殊情况，可提供订单号给我们进一步处理。';
  }
  
  // 优惠活动相关
  if (lowerMessage.includes('优惠') || lowerMessage.includes('折扣') || lowerMessage.includes('促销') || lowerMessage.includes('满减') || lowerMessage.includes('优惠券') || lowerMessage.includes('活动')) {
    return '目前我们有多种优惠活动：新用户首单可享9折优惠；满299元立减30元；部分商品正在进行限时特惠。您可以在首页的"优惠专区"查看详细活动，或关注我们的公众号获取专属优惠券。';
  }
  
  // 支付方式相关
  if (lowerMessage.includes('支付') || lowerMessage.includes('付款') || lowerMessage.includes('微信') || lowerMessage.includes('支付宝') || lowerMessage.includes('银行卡')) {
    return '我们支持多种支付方式，包括微信支付、支付宝、银联卡、信用卡支付等。所有支付渠道均采用安全加密技术，保障您的资金安全。如遇支付问题，可以尝试更换支付方式或联系我们的客服热线。';
  }
  
  // 配送相关
  if (lowerMessage.includes('配送') || lowerMessage.includes('送货') || lowerMessage.includes('运费') || lowerMessage.includes('包邮')) {
    return '我们全场满99元包邮，部分偏远地区可能会有额外运费。一般情况下，主要城市1-3天送达，其他地区3-5天送达。如遇天气或其他特殊情况，可能会有延迟，请您谅解。';
  }
  
  // 会员相关
  if (lowerMessage.includes('会员') || lowerMessage.includes('积分') || lowerMessage.includes('等级') || lowerMessage.includes('权益')) {
    return '我们的会员分为普通会员、黄金会员和钻石会员。消费累计满1000元升级为黄金会员，享受95折优惠；累计满5000元升级为钻石会员，享受9折优惠和生日特权。每消费1元可获得1积分，积分可在"会员中心"兑换优惠券或礼品。';
  }
  
  // 默认回复
  return '您好！我是电商智能客服小维。有关商品查询、订单状态、退换货、优惠活动或其他问题，都可以随时向我咨询。如需人工服务，可以在工作时间（9:00-18:00）联系我们的客服热线400-888-9999。';
} 