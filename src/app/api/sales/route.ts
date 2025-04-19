import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * 获取销售团队信息的API
 * @returns 销售团队信息的JSON响应
 */
export async function GET() {
  try {
    // 读取销售团队数据文件
    const dataPath = path.join(process.cwd(), 'src/data/salesTeam.json');
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const salesData = JSON.parse(fileContents);
    
    // 返回销售团队数据
    return NextResponse.json({ 
      success: true,
      data: salesData
    });
  } catch (error) {
    console.error('获取销售团队信息失败:', error);
    return NextResponse.json({ 
      success: false,
      error: "获取销售团队信息失败"
    }, { status: 500 });
  }
} 