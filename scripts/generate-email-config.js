#!/usr/bin/env node

/**
 * 邮件配置生成工具
 * 用于生成加密的邮件密码配置，可添加到.env.local文件中
 */

const { generateEncryptedConfig } = require('../config/emailConfig');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== 邮件配置生成工具 ===');
console.log('此工具将生成可添加到.env.local的加密邮件密码');
console.log('注意: 密码会在命令行中明文输入，请确保环境安全\n');

rl.question('请输入邮箱密码 (输入后将加密): ', (password) => {
  try {
    if (!password) {
      console.error('错误: 密码不能为空');
      rl.close();
      return;
    }
    
    const encryptedConfig = generateEncryptedConfig(password);
    
    console.log('\n=== 生成的配置 ===');
    console.log('请将以下内容添加到.env.local文件:');
    console.log('\n' + encryptedConfig);
    console.log('\n其他需要配置的邮件相关环境变量:');
    console.log('EMAIL_HOST=smtp服务器地址, 例如: smtp.feishu.cn');
    console.log('EMAIL_PORT=smtp端口, 例如: 465');
    console.log('EMAIL_USER=邮箱地址');
    console.log('EMAIL_SECURE=true或false (通常为true)');
    console.log('ENCRYPTION_KEY=自定义的32字符加密密钥 (可选，默认使用内置密钥)');
  } catch (error) {
    console.error('生成配置时出错:', error);
  } finally {
    rl.close();
  }
}); 