import { encrypt, generateEncryptedConfig } from '../config/emailConfig';
import fs from 'fs';
import readline from 'readline';

/**
 * 命令行工具，用于加密敏感配置并生成安全的环境变量配置
 */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('======= 敏感配置信息加密工具 =======');
console.log('此工具将帮助您安全地加密敏感信息，如邮箱密码等\n');

rl.question('请输入邮箱密码以进行加密: ', (password) => {
  if (!password) {
    console.error('错误: 密码不能为空');
    rl.close();
    return;
  }
  
  try {
    // 加密密码
    const encryptedPassword = encrypt(password);
    console.log('\n密码已成功加密!');
    
    // 读取现有的.env.local文件
    const envFilePath = '.env.local';
    let envContent = '';
    
    try {
      if (fs.existsSync(envFilePath)) {
        envContent = fs.readFileSync(envFilePath, 'utf8');
      }
    } catch (err) {
      console.log('未找到现有的.env.local文件，将创建新文件');
    }
    
    // 更新或添加加密的密码
    const emailUserMatch = envContent.match(/EMAIL_USER=(.+)/);
    const emailUser = emailUserMatch ? emailUserMatch[1] : 'support@cicicraft.xyz';
    
    // 生成更新的环境变量内容
    let updatedEnvContent = envContent;
    
    // 替换或添加EMAIL_PASSWORD
    if (envContent.includes('EMAIL_PASSWORD=')) {
      updatedEnvContent = updatedEnvContent.replace(
        /EMAIL_PASSWORD=.+/,
        `EMAIL_PASSWORD=${encryptedPassword}`
      );
    } else {
      updatedEnvContent += `\nEMAIL_PASSWORD=${encryptedPassword}`;
    }
    
    // 添加ENCRYPTION_KEY(如果不存在)
    if (!updatedEnvContent.includes('ENCRYPTION_KEY=')) {
      // 使用随机生成的密钥
      const encryptionKey = require('crypto').randomBytes(32).toString('hex');
      updatedEnvContent += `\nENCRYPTION_KEY=${encryptionKey}`;
    }
    
    // 保存更新后的.env.local文件
    fs.writeFileSync(envFilePath, updatedEnvContent);
    
    console.log(`\n已将加密后的配置更新到 ${envFilePath} 文件`);
    console.log('\n请记住:');
    console.log('1. 永远不要提交.env.local文件到版本控制系统');
    console.log('2. 要保护好加密密钥(ENCRYPTION_KEY)');
    console.log('3. 在生产环境中，应考虑使用专业的密钥管理服务\n');
    
  } catch (error) {
    console.error('加密过程中出现错误:', error);
  } finally {
    rl.close();
  }
}); 