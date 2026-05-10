import re

# 文件路径
md_file = r'E:\Projects\my-blog\docs\backend-base\spring\spring.md'

# 读取文件
with open(md_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 统计替换次数
# 匹配 ![alt](images/xxx) 但不匹配 ![alt](./images/xxx)
pattern = r'!\[([^\]]*)\]\(images/'
replacement = r'![\1](./images/'

# 计算匹配数量
matches = re.findall(pattern, content)
count = len(matches)

print(f'Found {count} image links to update')

# 执行替换
new_content = re.sub(pattern, replacement, content)

# 写回文件
with open(md_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Completed!')
print(f'Updated {count} image links from "images/" to "./images/"')
print(f'File saved: {md_file}')
