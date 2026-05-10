import re
import os
import requests
from urllib.parse import urlparse, unquote
import hashlib
import time

# 文件路径
md_file = r'E:\Projects\my-blog\docs\backend-base\spring\spring.md'
images_dir = r'E:\Projects\my-blog\docs\backend-base\spring\images'

# 创建images文件夹
if not os.path.exists(images_dir):
    os.makedirs(images_dir)

# 读取markdown文件
with open(md_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 匹配所有图片链接
pattern = r'!\[([^\]]*)\]\((https?://[^)]+)\)'
matches = re.findall(pattern, content)

print(f'Found {len(matches)} image links')

# 创建session来保持连接和cookies
session = requests.Session()

# 设置默认headers，模拟浏览器
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
})

# 用于跟踪已下载的图片，避免重复下载
downloaded_images = {}
failed_count = 0
success_count = 0

for idx, (alt_text, url) in enumerate(matches, 1):
    # 提取URL部分（去掉可能的锚点）
    clean_url = url.split('#')[0]
    
    # 生成文件名
    parsed_url = urlparse(clean_url)
    path = unquote(parsed_url.path)
    filename = os.path.basename(path)
    
    # 如果文件名太长或没有扩展名，使用hash生成
    if len(filename) > 100 or '.' not in filename:
        file_hash = hashlib.md5(clean_url.encode()).hexdigest()[:8]
        ext = os.path.splitext(path)[1] or '.png'
        filename = f'{file_hash}{ext}'
    
    # 检查是否已经下载过相同的URL
    if clean_url in downloaded_images:
        local_filename = downloaded_images[clean_url]
        print(f'[{idx}/{len(matches)}] Skip duplicate: {filename}')
        continue
    
    # 下载图片
    try:
        print(f'[{idx}/{len(matches)}] Downloading: {filename}')
        
        # 根据域名设置referer
        parsed = urlparse(clean_url)
        referer = f'{parsed.scheme}://{parsed.netloc}/'
        session.headers.update({'Referer': referer})
        
        # 发送请求
        response = session.get(clean_url, timeout=30, stream=True)
        
        if response.status_code == 200:
            filepath = os.path.join(images_dir, filename)
            
            # 如果文件已存在，添加序号
            counter = 1
            base_filename = filename
            while os.path.exists(filepath):
                name, ext = os.path.splitext(base_filename)
                filename = f'{name}_{counter}{ext}'
                filepath = os.path.join(images_dir, filename)
                counter += 1
            
            # 写入文件
            with open(filepath, 'wb') as img_file:
                for chunk in response.iter_content(chunk_size=8192):
                    img_file.write(chunk)
            
            downloaded_images[clean_url] = filename
            success_count += 1
            print(f'  ✓ Success: {filename}')
            
            # 礼貌性延迟，避免请求过快
            time.sleep(0.5)
        else:
            failed_count += 1
            print(f'  ✗ Failed ({response.status_code}): {filename}')
            
    except Exception as e:
        failed_count += 1
        print(f'  ✗ Error: {filename} - {str(e)}')
        continue
    
    # 替换markdown中的链接为相对路径
    old_link = f'![{alt_text}]({url})'
    new_link = f'![{alt_text}](images/{filename})'
    content = content.replace(old_link, new_link)

# 保存修改后的markdown文件
with open(md_file, 'w', encoding='utf-8') as f:
    f.write(content)

# 关闭session
session.close()

print(f'\n{"="*50}')
print(f'Completed!')
print(f'Successfully downloaded: {success_count} images')
print(f'Failed: {failed_count} images')
print(f'Skipped duplicates: {len(matches) - success_count - failed_count} images')
print(f'Images saved to: {images_dir}')
print(f'{"="*50}')
