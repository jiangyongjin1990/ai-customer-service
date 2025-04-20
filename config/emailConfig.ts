import crypto from 'crypto';

/**
 * 安全的邮件配置处理工具
 * 用于加密和解密邮件配置信息
 */

// 加密密钥 - 生产环境中应通过其他安全方式存储或生成
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'a_complex_32_char_encryption_key_1234';
const IV_LENGTH = 16; // 对于AES, IV需要16位

/**
 * 加密字符串
 * @param text 要加密的文本
 * @returns 加密后的文本
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc', 
    Buffer.from(ENCRYPTION_KEY), 
    iv
  );
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * 解密字符串
 * @param encryptedText 加密的文本
 * @returns 解密后的文本
 */
export function decrypt(encryptedText: string): string {
  try {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedData = textParts[1];
    
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('解密失败:', error);
    return '';
  }
}

/**
 * 获取安全的邮件配置
 * 从环境变量中获取并解密敏感信息
 */
export function getSecureEmailConfig() {
  try {
    // 尝试解密密码如果它是加密的
    const passwordEnv = process.env.EMAIL_PASSWORD || '';
    const password = passwordEnv.includes(':') ? decrypt(passwordEnv) : passwordEnv;
    
    return {
      host: process.env.EMAIL_HOST || 'smtp.feishu.cn',
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: password,
      },
    };
  } catch (error) {
    console.error('获取邮件配置失败:', error);
    return null;
  }
}

/**
 * 生成加密的环境变量配置
 * 用于加密敏感信息并生成可添加到.env.local的配置
 * 仅应在开发环境使用
 */
export function generateEncryptedConfig(emailPassword: string): string {
  const encryptedPassword = encrypt(emailPassword);
  return `EMAIL_PASSWORD=${encryptedPassword}`;
} 