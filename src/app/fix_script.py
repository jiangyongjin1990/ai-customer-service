import re

# 读取原始文件
with open('page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 找到包含"用小嘉 AI，让客服团队更出色"的部分及其相关内容
pattern = r'({/\* Separator Title \*/}.*?用小嘉 AI，让客服团队更出色.*?{/\* 大模型电话客服 \*/}.*?</div>\s*</div>)'
result = re.sub(pattern, '', content, flags=re.DOTALL)

# 写入修改后的文件
with open('page_fixed.tsx', 'w', encoding='utf-8') as f:
    f.write(result)

print("文件已修复，结果保存在page_fixed.tsx") 