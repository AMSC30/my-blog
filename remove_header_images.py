import re

# 文件路径
md_file = r'E:\Projects\my-blog\docs\backend-base\spring\spring.md'

# 读取文件
with open(md_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 统计删除的行数
deleted_count = 0
new_lines = []

# 遍历每一行，删除包含"标头.jpg"的行
for line in lines:
    if '![标头.jpg]' in line:
        deleted_count += 1
        print(f'Deleted line with 标头.jpg')
    else:
        new_lines.append(line)

# 写回文件
with open(md_file, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f'\nCompleted!')
print(f'Deleted {deleted_count} lines containing "标头.jpg"')
print(f'File saved: {md_file}')
