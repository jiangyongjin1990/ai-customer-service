#!/usr/bin/env python3

# 读取原始文件
with open('page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 读取替换内容
with open('temp-section.jsx', 'r', encoding='utf-8') as f:
    replacement = f.read()

# 找到起始部分
start_line = 0
end_line = 0
for i, line in enumerate(lines):
    if 'Product Features Section' in line:
        start_feature_section = i
    if '用小嘉 AI，让客服团队更出色' in line:
        start_line = i - 10  # 向上多取几行以确保包含完整的section开始
        break

# 找到结束部分
for i in range(start_line, len(lines)):
    if 'Customer Testimonials Section' in lines[i]:
        end_line = i
        break

if start_line > 0 and end_line > start_line:
    # 构建新的文件内容
    new_content = lines[:start_feature_section] + [replacement] + lines[end_line:]
    
    # 写入文件
    with open('page.tsx.new', 'w', encoding='utf-8') as f:
        f.writelines(new_content)
    
    print(f"已找到要替换的代码块({start_line}到{end_line}行)，替换结果保存在page.tsx.new文件中")
else:
    print("未找到匹配的代码块") 