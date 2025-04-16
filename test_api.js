// 测试硅基流动 DeepSeek API
const fetch = require('node-fetch');

const API_KEY = 'sk-vtfsmocgfmxscxwfwikrvntupmykphbkolybsvzvwydubsiv';

async function testDeepSeekAPI() {
  console.log('开始测试硅基流动 DeepSeek API...');
  
  try {
    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1',
        messages: [
          {
            role: 'system',
            content: '你是一个有帮助的AI助手。'
          },
          {
            role: 'user',
            content: '你好，请简单介绍一下自己。'
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
        stream: false,
      }),
    });
    
    console.log('响应状态码:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API错误:', JSON.stringify(errorData, null, 2));
      return;
    }
    
    const data = await response.json();
    console.log('API响应成功!');
    console.log('回复内容:', data.choices[0].message.content);
    
  } catch (error) {
    console.error('请求发送失败:', error);
  }
}

// 执行测试
testDeepSeekAPI(); 
const fetch = require('node-fetch');

const API_KEY = 'sk-vtfsmocgfmxscxwfwikrvntupmykphbkolybsvzvwydubsiv';

async function testDeepSeekAPI() {
  console.log('开始测试硅基流动 DeepSeek API...');
  
  try {
    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1',
        messages: [
          {
            role: 'system',
            content: '你是一个有帮助的AI助手。'
          },
          {
            role: 'user',
            content: '你好，请简单介绍一下自己。'
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
        stream: false,
      }),
    });
    
    console.log('响应状态码:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API错误:', JSON.stringify(errorData, null, 2));
      return;
    }
    
    const data = await response.json();
    console.log('API响应成功!');
    console.log('回复内容:', data.choices[0].message.content);
    
  } catch (error) {
    console.error('请求发送失败:', error);
  }
}

// 执行测试
testDeepSeekAPI(); 