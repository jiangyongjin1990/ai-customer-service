import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSecureEmailConfig } from '@config/emailConfig';

/**
 * 处理联系表单提交，发送邮件通知
 */
export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json();
    const { name, contact, company } = body;
    
    // 获取安全的邮件配置
    const emailConfig = getSecureEmailConfig();
    if (!emailConfig) {
      throw new Error('无法获取邮件配置');
    }
    
    // 创建邮件传输器，使用安全配置
    const transporter = nodemailer.createTransport(emailConfig);
    
    // 邮件内容
    const mailOptions = {
      from: `维普特智能客服 <${process.env.EMAIL_USER || 'support@cicicraft.xyz'}>`,
      to: 'jyj854017734@gmail.com', // 目标邮箱
      subject: '新的客户咨询信息',
      html: `
        <h2>收到新的客户咨询信息</h2>
        <p><strong>提交时间:</strong> ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
        <p><strong>称呼:</strong> ${name || '未提供'}</p>
        <p><strong>联系方式:</strong> ${contact}</p>
        <p><strong>公司名称:</strong> ${company || '未提供'}</p>
      `,
    };
    
    // 发送邮件
    await transporter.sendMail(mailOptions);
    
    // 返回成功响应
    return NextResponse.json({ success: true, message: '提交成功' });
  } catch (error) {
    console.error('发送邮件失败:', error);
    
    // 返回错误响应
    return NextResponse.json(
      { success: false, message: '提交失败，请稍后再试' },
      { status: 500 }
    );
  }
} 