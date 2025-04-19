#!/usr/bin/env python3

def main():
    # 标识需要删除的区域
    start_marker = "用小嘉 AI，让客服团队更出色"
    
    # 保留模块外的结构
    replacement = """
          {/* 其他内容... */}
        </div>
      </motion.section>
    
      {/* --- Customer Testimonials Section --- */}
    """
    
    # 读取文件
    with open('ai-customer-service/src/app/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 找到开始和结束位置
    marker_pos = content.find(start_marker)
    if marker_pos == -1:
        print("找不到要删除的部分")
        return
    
    # 找到 <motion.h3 开始标签 (从句点向前倒退)
    h3_start = content.rfind("<motion.h3", 0, marker_pos)
    if h3_start == -1:
        print("找不到 motion.h3 标签")
        return
    
    # 找到 h3 标签的开始行
    separator_comment = content.rfind("{/* Separator Title */}", 0, h3_start)
    if separator_comment == -1:
        print("找不到 Separator Title 注释")
        return
    
    # 找到该部分代码的结束位置（TestimonialsSection前）
    testimonials_start = content.find("{/* --- Customer Testimonials Section --- */}", marker_pos)
    if testimonials_start == -1:
        print("找不到 Customer Testimonials Section 注释")
        return
    
    # 从代码中删除该部分
    new_content = content[:separator_comment] + replacement + content[testimonials_start:]
    
    # 保存到新文件
    with open('ai-customer-service/src/app/page.tsx.new', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("已成功删除 '用小嘉 AI，让客服团队更出色' 部分，结果已保存到 page.tsx.new")

if __name__ == "__main__":
    main() 