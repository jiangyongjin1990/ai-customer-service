import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSecureEmailConfig } from '@config/emailConfig';

/**
 * 验证联系表单数据
 * @param data 表单数据对象
 * @returns 验证结果，包含是否有效和错误信息
 */
function validateContactData(data: any) {
  const { contact } = data;
  
  if (!contact || typeof contact !== 'string' || contact.trim() === '') {
    return { 
      isValid: false, 
      message: '联系方式不能为空' 
    };
  }
  
  return { isValid: true };
}

/**
 * 处理联系表单提交，发送邮件通知
 */
export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json();
    const { name, contact, company } = body;
    
    // 验证输入数据
    const validation = validateContactData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400 }
      );
    }
    
    // 获取安全的邮件配置
    const emailConfig = getSecureEmailConfig();
    if (!emailConfig) {
      console.error('邮件配置缺失');
      return NextResponse.json(
        { success: false, message: '服务器配置错误，请联系管理员' },
        { status: 500 }
      );
    }
    
    // 验证邮件凭据
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      console.error('邮件凭据缺失');
      return NextResponse.json(
        { success: false, message: '邮件服务未正确配置，请联系管理员' },
        { status: 500 }
      );
    }
    
    // 创建邮件传输器，使用安全配置
    const transporter = nodemailer.createTransport(emailConfig);
    
    // 邮件内容
    const mailOptions = {
      from: `维普特智能客服 <${process.env.EMAIL_USER || 'support@cicicraft.xyz'}>`,
      to: process.env.NOTIFICATION_EMAIL || 'jyj854017734@gmail.com', // 目标邮箱，优先使用环境变量
      subject: '新的客户咨询信息',
      html: `
        <h2>收到新的客户咨询信息</h2>
        <p><strong>提交时间:</strong> ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
        <p><strong>称呼:</strong> ${name || '未提供'}</p>
        <p><strong>联系方式:</strong> ${contact}</p>
        <p><strong>公司名称:</strong> ${company || '未提供'}</p>
      `,
    };
    
    try {
      // 发送邮件
      await transporter.sendMail(mailOptions);
      
      // 返回成功响应
      return NextResponse.json({ success: true, message: '提交成功' });
    } catch (emailError: any) {
      console.error('邮件发送失败:', emailError);
      return NextResponse.json(
        { 
          success: false, 
          message: '邮件发送失败，请稍后再试',
          error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('处理联系表单失败:', error);
    
    // 返回错误响应
    return NextResponse.json(
      { 
        success: false, 
        message: '提交失败，请稍后再试',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 