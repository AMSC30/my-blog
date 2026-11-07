import{_ as c,p as r,q as t,s as e,R as i,t as d,Y as s,n as a}from"./framework-e1bed10d.js";const o="/my-blog/assets/img01-a08c3a03.jpg",v="/my-blog/assets/img02-b7ddaf86.png",u="/my-blog/assets/img03-e1cd596b.jpg",m="/my-blog/assets/img04-4c11571a.jpg",b="/my-blog/assets/img05-22b165d4.jpg",h="/my-blog/assets/img06-769ca65d.jpg",p="/my-blog/assets/img07-4db4ade4.jpg",_="/my-blog/assets/img08-b713be15.jpg",l="/my-blog/assets/img09-8b08f962.png",g="/my-blog/assets/img10-21fb39c1.jpg",x="/my-blog/assets/img11-75799cd4.jpg",I="/my-blog/assets/img12-b13d15ba.jpg",k="/my-blog/assets/img13-6730e38a.jpg",z={},J=e("h1",{id:"nginx指南",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#nginx指南","aria-hidden":"true"},"#"),i(" Nginx指南")],-1),y=e("p",null,[e("code",null,"Nginx"),i(" 是开源、高性能、高可靠的 "),e("code",null,"Web"),i(" 和反向代理服务器，而且支持热部署，几乎可以做到 7 * 24 小时不间断运行，即使运行几个月也不需要重新启动，还能在不间断服务的情况下对软件版本进行热更新最重要的是， "),e("code",null,"Nginx"),i(" 是免费的并可以商业化，配置使用也比较简单。")],-1),j=e("p",null,[e("strong",null,"Nginx 特点")],-1),R=e("li",null,"高并发、高性能；",-1),f=e("li",null,"模块化架构使得它的扩展性非常好；",-1),G=e("li",null,[i("异步非阻塞的事件驱动模型这点和 "),e("code",null,"Node.js"),i(" 相似；")],-1),E={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E9%AB%98%E5%8F%AF%E9%9D%A0%E6%80%A7&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLpq5jlj6_pnaDmgKciLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.46LR0AiyEsrNl_fzdrDM-1chk_rE4RovUCErVKt0h7A&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},O=e("li",null,"热部署、平滑升级；",-1),C=e("li",null,"完全开源，生态繁荣；",-1),N=e("h2",{id:"nginx-作用",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#nginx-作用","aria-hidden":"true"},"#"),i(),e("strong",null,"Nginx 作用")],-1),M=e("p",null,"Nginx 的最重要的几个使用场景：",-1),L={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmlofku7bns7vnu58iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.85GMVR9GXJRYarl8txP61cr4DJl9vt48zMwdOnR0NXo&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},A=e("li",null,"反向代理服务，延伸出包括缓存、负载均衡等；",-1),U=e("li",null,[e("code",null,"API"),i(" 服务， "),e("code",null,"OpenResty"),i(" ；")],-1),X=e("code",null,"Node.js",-1),w=e("code",null,"Nginx",-1),Z=e("code",null,"Node.js",-1),Y=e("code",null,"HTTP",-1),V={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=2&q=%E5%BC%82%E6%AD%A5%E9%9D%9E%E9%98%BB%E5%A1%9E&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlvILmraXpnZ7pmLvloZ4iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.jhWcyj8MQR2jDqxBzkmW_13E8BuZq9fNCz6FIUUlhcQ&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},H=e("code",null,"Nginx",-1),q=e("code",null,"Node.js",-1),F=e("code",null,"Nginx",-1),B=e("code",null,"Node.js",-1),S=e("code",null,"Nginx",-1),W=e("code",null,"Node.js",-1),D={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E4%B8%9A%E5%8A%A1%E9%80%BB%E8%BE%91&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLkuJrliqHpgLvovpEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.4hZMfl35yBmvqDi4wbdd3aP_U5mLxePf8BtATF_2FaE&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},T=e("p",null,[e("img",{src:o,alt:"Nginx 和 Node.js 组合示意图"})],-1),P=e("strong",null,"Nginx 安装",-1),$=e("code",null,"LinuxcentOS 7.x",-1),K={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmk43kvZzns7vnu58iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.ubN2d8TQiPI1JyqlHXPBmZQEADnkTOH9TpzSFGtR2T0&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Q=e("code",null,"Nginx",-1),ee=e("code",null,"yum",-1),ie=e("code",null,"Nginx",-1),ne=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install nginx -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后，通过 <code>rpm -ql nginx</code> 命令查看 <code>Nginx</code> 的安装信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Nginx配置文件
/etc/nginx/nginx.conf # nginx 主配置文件
/etc/nginx/nginx.conf.default

# 可执行程序文件
/usr/bin/nginx-upgrade
/usr/sbin/nginx

# nginx库文件
/usr/lib/systemd/system/nginx.service # 用于配置系统守护进程
/usr/lib64/nginx/modules # Nginx模块目录

# 帮助文档
/usr/share/doc/nginx-1.16.1
/usr/share/doc/nginx-1.16.1/CHANGES
/usr/share/doc/nginx-1.16.1/README
/usr/share/doc/nginx-1.16.1/README.dynamic
/usr/share/doc/nginx-1.16.1/UPGRADE-NOTES-1.6-to-1.10

# 静态资源目录
/usr/share/nginx/html/404.html
/usr/share/nginx/html/50x.html
/usr/share/nginx/html/index.html

# 存放Nginx日志文件
/var/log/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要关注的文件夹有两个：</p>`,4),de=e("code",null,"1. /etc/nginx/conf.d/",-1),se=e("code",null,"/etc/nginx/nginx.conf",-1),le=e("code",null,"2. /usr/share/nginx/html/",-1),ce={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLpnZnmgIHmlofku7YiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.WieiGyjUzTnKBWbl_cdZVFkxqJbTfythLW8ytnIQZ38&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},re=e("strong",null,"Nginx 常用命令",-1),te=e("code",null,"systemctl",-1),ae=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 开机配置
systemctl enable nginx # 开机自动启动
systemctl disable nginx # 关闭开机自动启动

# 启动Nginx
systemctl start nginx # 启动Nginx成功后，可以直接访问主机IP，此时会展示Nginx默认页面

# 停止Nginx
systemctl stop nginx

# 重启Nginx
systemctl restart nginx

# 重新加载Nginx
systemctl reload nginx

# 查看 Nginx 运行状态
systemctl status nginx

# 查看Nginx进程
ps -ef | grep nginx

# 杀死Nginx进程
kill -9 pid # 根据上面查看到的Nginx进程号，杀死Nginx进程，-9 表示强制结束进程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Nginx</code> 应用程序命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>nginx -s reload # 向主进程发送信号，重新加载配置文件，热重启
nginx -s reopen # 重启 Nginx
nginx -s stop # 快速关闭
nginx -s quit # 等待工作进程处理完成后关闭
nginx -T # 查看当前 Nginx 最终的配置
nginx -t # 检查配置是否有问题
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-核心配置" tabindex="-1"><a class="header-anchor" href="#nginx-核心配置" aria-hidden="true">#</a> <strong>Nginx 核心配置</strong></h2><h2 id="配置文件结构" tabindex="-1"><a class="header-anchor" href="#配置文件结构" aria-hidden="true">#</a> <strong>配置文件结构</strong></h2><p><code>Nginx</code> 的典型配置示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># main段配置信息
user  nginx; # 运行用户，默认即是nginx，可以不进行设置
worker_processes  auto; # Nginx 进程数，一般设置为和 CPU 核数一样
error_log  /var/log/nginx/error.log warn; # Nginx 的错误日志存放目录
pid        /var/run/nginx.pid; # Nginx 服务启动时的 pid 存放位置

# events段配置信息
events {
    use epoll; # 使用epoll的I/O模型(如果你不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)
    worker_connections 1024; # 每个进程允许最大并发数
}

# http段配置信息
# 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置
http {
    # 设置日志模式
    log_format  main &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;
                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;
                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;

    access_log  /var/log/nginx/access.log main; # Nginx访问日志存放位置

    sendfile            on; # 开启高效传输模式
    tcp_nopush          on; # 减少网络报文段的数量
    tcp_nodelay         on;
    keepalive_timeout   65; # 保持连接的时间，也叫超时时间，单位秒
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types; # 文件扩展名与类型映射表
    default_type        application/octet-stream; # 默认文件类型

    include /etc/nginx/conf.d/*.conf; # 加载子配置项
    
    # server段配置信息
    server {
     listen       80; # 配置监听的端口
     server_name  localhost; # 配置的域名
      
     # location段配置信息
     location / {
      root   /usr/share/nginx/html; # 网站根目录
      index  index.html index.htm; # 默认首页文件
      deny 172.168.22.11; # 禁止访问的ip地址，可以为all
      allow 172.168.33.44；# 允许访问的ip地址，可以为all
     }
     
     error_page 500 502 503 504 /50x.html; # 默认50x对应的访问页面
     error_page 400 404 error.html; # 同上
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),oe={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlhajlsYDphY3nva4iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.9X8I6rKpsakMB2bRytxb8hIw6nibM4Gx0_7aEhgkIXY&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},ve=e("li",null,[e("code",null,"events"),i(" 配置影响 "),e("code",null,"Nginx"),i(" 服务器与用户的网络连接；")],-1),ue=e("li",null,[e("code",null,"http"),i(" 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置；")],-1),me=e("code",null,"server",-1),be={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E8%99%9A%E6%8B%9F%E4%B8%BB%E6%9C%BA&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLomZrmi5_kuLvmnLoiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.ceTkrYBdjoQ2zNp_E5g0kttOahuzrqwk6RewzZGzPcc&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},he=e("code",null,"http",-1),pe=e("code",null,"server",-1),_e=e("li",null,[e("code",null,"location"),i(" 用于配置匹配的 "),e("code",null,"uri"),i(" ；")],-1),ge=e("li",null,[e("code",null,"upstream"),i(" 配置后端服务器具体地址，负载均衡配置不可或缺的部分；")],-1),xe=s('<p>用一张图清晰的展示它的层级结构：</p><p><img src="'+v+`" alt="Nginx 配置文件层级结构图"></p><h2 id="配置文件-main-段核心参数" tabindex="-1"><a class="header-anchor" href="#配置文件-main-段核心参数" aria-hidden="true">#</a> <strong>配置文件 main 段核心参数</strong></h2><h2 id="user" tabindex="-1"><a class="header-anchor" href="#user" aria-hidden="true">#</a> <strong>user</strong></h2><p>指定运行 <code>Nginx</code> 的 <code>woker</code> 子进程的属主和属组，其中组可以不指定。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>user USERNAME [GROUP]

user nginx lion; # 用户是nginx;组是lion
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>pid</strong>指定运行 <code>Nginxmaster</code> 主进程的 <code>pid</code> 文件存放路径。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pid /opt/nginx/logs/nginx.pid # master主进程的的pid存放在nginx.pid的文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="worker-rlimit-nofile-number" tabindex="-1"><a class="header-anchor" href="#worker-rlimit-nofile-number" aria-hidden="true">#</a> <strong>worker_rlimit_nofile_number</strong></h3>`,9),Ie=e("code",null,"worker",-1),ke={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E6%96%87%E4%BB%B6%E5%8F%A5%E6%9F%84&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmlofku7blj6Xmn4QiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.dR9jY37R6ghe6T-xakVGDA6ZJiuahICbjjFIWTfNa4c&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},ze=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>worker_rlimit_nofile 20480; # 可以理解成每个worker子进程的最大连接数量。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>worker_rlimit_core</strong>指定 <code>worker</code> 子进程异常终止后的 <code>core</code> 文件，用于记录分析问题。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>worker_rlimit_core 50M; # 存放大小限制
working_directory /opt/nginx/tmp; # 存放目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="worker-processes-number" tabindex="-1"><a class="header-anchor" href="#worker-processes-number" aria-hidden="true">#</a> <strong>worker_processes_number</strong></h3><p>指定 <code>Nginx</code> 启动的 <code>worker</code> 子进程数量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>worker_processes 4; # 指定具体子进程数量
worker_processes auto; # 与当前cpu物理核心数一致
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="worker-cpu-affinity" tabindex="-1"><a class="header-anchor" href="#worker-cpu-affinity" aria-hidden="true">#</a> <strong>worker_cpu_affinity</strong></h3><p>将每个 <code>worker</code> 子进程与我们的 <code>cpu</code> 物理核心绑定。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>worker_cpu_affinity 0001 0010 0100 1000; # 4个物理核心，4个worker子进程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+u+'" alt="worker_cpu_affinity 配置示例图"></p>',10),Je=e("code",null,"worker",-1),ye=e("code",null,"CPU",-1),je=e("code",null,"worker",-1),Re=e("code",null,"CPU",-1),fe={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E8%BF%9B%E7%A8%8B%E5%88%87%E6%8D%A2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLov5vnqIvliIfmjaIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.tKJ1dg9c9Qe4l3XQ2zFLwAbCeTEB1GXE-1A6Cf7Z7hk&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Ge=e("strong",null,"worker_priority",-1),Ee=e("code",null,"worker",-1),Oe=e("code",null,"nice",-1),Ce=e("code",null,"Nginx",-1),Ne=e("code",null,"Nginx",-1),Me=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>worker_priority -10; # 120-10=110，110就是最终的优先级
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Linux</code> 默认进程的优先级值是120，值越小越优先；<code>nice</code> 定范围为 <code>-20</code> 到 <code>+19</code> 。[备注] 应用的默认优先级值是120加上 <code>nice</code> 值等于它最终的值，这个值越小，优先级越高。</p><h3 id="worker-shutdown-timeout" tabindex="-1"><a class="header-anchor" href="#worker-shutdown-timeout" aria-hidden="true">#</a> <strong>worker_shutdown_timeout</strong></h3><p>指定 <code>worker</code> 子进程优雅退出时的超时时间。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>worker_shutdown_timeout 5s;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="timer-resolution" tabindex="-1"><a class="header-anchor" href="#timer-resolution" aria-hidden="true">#</a> <strong>timer_resolution</strong></h3>`,6),Le=e("code",null,"worker",-1),Ae={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E7%B3%BB%E7%BB%9F%E8%B0%83%E7%94%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLns7vnu5_osIPnlKgiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.o9qD5JXKakqVAQg63olq3eC-EEnFv8DV3XT9nbbFXxA&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Ue=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>timer_resolution 100ms;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 <code>Linux</code> 系统中，用户需要获取计时器时需要向操作系统内核发送请求，有请求就必然会有开销，因此这个间隔越大开销就越小。<strong>daemon</strong>指定 <code>Nginx</code> 的运行方式，前台还是后台，前台用于调试，后台用于生产。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>daemon off; # 默认是on，后台运行模式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="配置文件-events-段核心参数" tabindex="-1"><a class="header-anchor" href="#配置文件-events-段核心参数" aria-hidden="true">#</a> <strong>配置文件 events 段核心参数</strong></h2><h3 id="use" tabindex="-1"><a class="header-anchor" href="#use" aria-hidden="true">#</a> <strong>use</strong></h3><p><code>Nginx</code> 使用何种事件驱动模型。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use method; # 不推荐配置它，让nginx自己选择

method 可选值为：select、poll、kqueue、epoll、/dev/poll、eventport
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="worker-connections" tabindex="-1"><a class="header-anchor" href="#worker-connections" aria-hidden="true">#</a> <strong>worker_connections</strong></h3><p><code>worker</code> 子进程能够处理的最大并发连接数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>worker_connections 1024 # 每个子进程的最大连接数为1024
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>accept_mutex</strong></p>`,11),Xe={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E4%BA%92%E6%96%A5%E9%94%81&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLkupLmlqXplIEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.TF_ZUc4ZNPmKm7-MG0j2AoGcp81H2BQJhXNM14sGuiY&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},we=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>accept_mutex on # 默认是off关闭的，这里推荐打开
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>server_name 指令</strong>指定虚拟主机域名。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server_name name1 name2 name3

# 示例：
server_name www.nginx.com;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>域名匹配的四种写法：</p><ul><li>精确匹配：<code>server_name www.nginx.com</code> ;</li><li>左侧通配：<code>server_name *.nginx.com</code> ;</li><li>右侧统配：<code>server_name www.nginx.*</code> ;</li><li>正则匹配：<code>server_name ~^www\\.nginx\\.*$</code> ;</li></ul><p>匹配优先级：<strong>精确匹配 &gt; 左侧通配符匹配 &gt; 右侧通配符匹配 &gt; 正则表达式匹配</strong><code>server_name</code> 配置实例：1、配置本地 <code>DNS</code> 解析 <code>vim /etc/hosts</code> （ <code>macOS</code> 系统）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 添加如下内容，其中 121.42.11.34 是阿里云服务器IP地址
121.42.11.34 www.nginx-test.com
121.42.11.34 mail.nginx-test.com
121.42.11.34 www.nginx-test.org
121.42.11.34 doc.nginx-test.com
121.42.11.34 www.nginx-test.cn
121.42.11.34 fe.nginx-test.club
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),Ze={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E8%99%9A%E6%8B%9F%E5%9F%9F%E5%90%8D&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLomZrmi5_ln5_lkI0iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.r7wXTmtjRjcwpLmjZzzjbAi509EPMH_AYf_8IYiZMZs&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Ye=e("code",null,"DNS",-1),Ve=s(`<p>2、配置阿里云 <code>Nginx</code> ，<code>vim /etc/nginx/nginx.conf</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 这里只列举了http端中的sever端配置

# 左匹配
server {
 listen 80;
 server_name *.nginx-test.com;
 root /usr/share/nginx/html/nginx-test/left-match/;
 location / {
  index index.html;
 }
}

# 正则匹配
server {
 listen 80;
 server_name ~^.*\\.nginx-test\\..*$;
 root /usr/share/nginx/html/nginx-test/reg-match/;
 location / {
  index index.html;
 }
}

# 右匹配
server {
 listen 80;
 server_name www.nginx-test.*;
 root /usr/share/nginx/html/nginx-test/right-match/;
 location / {
  index index.html;
 }
}

# 完全匹配
server {
 listen 80;
 server_name www.nginx-test.com;
 root /usr/share/nginx/html/nginx-test/all-match/;
 location / {
  index index.html;
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、访问分析</p><ul><li>当访问 <code>www.nginx-test.com</code> 时，都可以被匹配上，因此选择优先级最高的“完全匹配”；</li><li>当访问 <code>mail.nginx-test.com</code> 时，会进行“左匹配”；</li><li>当访问 <code>www.nginx-test.org</code> 时，会进行“右匹配”；</li><li>当访问 <code>doc.nginx-test.com</code> 时，会进行“左匹配”；</li><li>当访问 <code>www.nginx-test.cn</code> 时，会进行“右匹配”；</li><li>当访问 <code>fe.nginx-test.club</code> 时，会进行“正则匹配”；</li></ul><h2 id="root" tabindex="-1"><a class="header-anchor" href="#root" aria-hidden="true">#</a> <strong>root</strong></h2><p>指定静态资源目录位置，它可以写在 <code>http</code> 、 <code>server</code> 、 <code>location</code> 等配置中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root path

例如：
location /image {
 root /opt/nginx/static;
}

当用户访问 www.test.com/image/1.png 时，实际在服务器找的路径是 /opt/nginx/static/image/1.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>[注意] <code>root</code> 会将定义路径与 <code>URI</code> 叠加， <code>alias</code> 则只取定义路径。</p><h2 id="alias" tabindex="-1"><a class="header-anchor" href="#alias" aria-hidden="true">#</a> <strong>alias</strong></h2><p>它也是指定静态资源目录位置，它只能写在 <code>location</code> 中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location /image {
 alias /opt/nginx/static/image/;
}

当用户访问 www.test.com/image/1.png 时，实际在服务器找的路径是 /opt/nginx/static/image/1.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>[注意] 使用 alias 末尾一定要添加 <code>/</code> ，并且它只能位于 <code>location</code> 中。<strong>location</strong>配置路径。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location [ = | ~ | ~* | ^~ ] uri {
 ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>匹配规则：</p><ul><li><code>=</code> 精确匹配；</li><li><code>~</code> 正则匹配，区分大小写；</li><li><code>~*</code> 正则匹配，不区分大小写；</li><li><code>^~</code> 匹配到即停止搜索；</li></ul><p>匹配优先级：<code>=</code> &gt; <code>^~</code> &gt; <code>~</code> &gt; <code>~*</code> &gt; 不带任何字符。实例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
  listen 80;
  server_name www.nginx-test.com;
  
  # 只有当访问 www.nginx-test.com/match_all/ 时才会匹配到/usr/share/nginx/html/match_all/index.html
  location = /match_all/ {
      root /usr/share/nginx/html
      index index.html
  }
  
  # 当访问 www.nginx-test.com/1.jpg 等路径时会去 /usr/share/nginx/images/1.jpg 找对应的资源
  location ~ \\.(jpeg|jpg|png|svg)$ {
   root /usr/share/nginx/images;
  }
  
  # 当访问 www.nginx-test.com/bbs/ 时会匹配上 /usr/share/nginx/html/bbs/index.html
  location ^~ /bbs/ {
   root /usr/share/nginx/html;
    index index.html index.htm;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>location 中的反斜线</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location /test {
 ...
}

location /test/ {
 ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>不带 <code>/</code> 当访问 <code>www.nginx-test.com/test</code> 时， <code>Nginx</code> 先找是否有 <code>test</code> 目录，如果有则找 <code>test</code> 目录下的 <code>index.html</code> ；如果没有 <code>test</code> 目录， <code>nginx</code> 则会找是否有 <code>test</code> 文件。</li><li>带 <code>/</code> 当访问 <code>www.nginx-test.com/test</code> 时， <code>Nginx</code> 先找是否有 <code>test</code> 目录，如果有则找 <code>test</code> 目录下的 <code>index.html</code> ，如果没有它也不会去找是否存在 <code>test</code> 文件。</li></ul><h3 id="return" tabindex="-1"><a class="header-anchor" href="#return" aria-hidden="true">#</a> <strong>return</strong></h3>`,21),He={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E5%93%8D%E5%BA%94%E7%A0%81&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlk43lupTnoIEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.wiGBvG52ut4BuW3kyVPI4rA5apnPZ_Oo0bTVKzPWKHA&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},qe=e("code",null,"URL",-1),Fe=e("code",null,"return",-1),Be=e("code",null,"location",-1),Se=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>return code [text];
return code URL;
return URL;

例如：
location / {
 return 404; # 直接返回状态码
}

location / {
 return 404 &quot;pages not found&quot;; # 返回状态码 + 一段文本
}

location / {
 return 302 /bbs ; # 返回状态码 + 重定向地址
}

location / {
 return https://www.baidu.com ; # 返回重定向地址
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rewrite" tabindex="-1"><a class="header-anchor" href="#rewrite" aria-hidden="true">#</a> <strong>rewrite</strong></h2><p>根据指定正则表达式匹配规则，重写 <code>URL</code> 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：rewrite 正则表达式 要替换的内容 [flag];

上下文：server、location、if

示例：rewrite /images/(.*\\.jpg)$ /pic/$1; # $1是前面括号(.*\\.jpg)的反向引用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>flag</code> 可选值的含义：</p><ul><li><code>last</code> 重写后的 <code>URL</code> 发起新请求，再次进入 <code>server</code> 段，重试 <code>location</code> 的中的匹配；</li><li><code>break</code> 直接使用重写后的 <code>URL</code> ，不再匹配其它 <code>location</code> 中语句；</li><li><code>redirect</code> 返回302临时重定向；</li><li><code>permanent</code> 返回301永久重定向；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server{
  listen 80;
  server_name fe.lion.club; # 要在本地hosts文件进行配置
  root html;
  location /search {
   rewrite ^/(.*) https://www.baidu.com redirect;
  }
  
  location /images {
   rewrite /images/(.*) /pics/$1;
  }
  
  location /pics {
   rewrite /pics/(.*) /photos/$1;
  }
  
  location /photos {
  
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照这个配置我们来分析：</p><ul><li>当访问 <code>fe.lion.club/search</code> 时，会自动帮我们重定向到 <code>https://www.baidu.com</code>。</li><li>当访问 <code>fe.lion.club/images/1.jpg</code> 时，第一步重写 <code>URL</code> 为 <code>fe.lion.club/pics/1.jpg</code> ，找到 <code>pics</code> 的 <code>location</code> ，继续重写 <code>URL</code> 为 <code>fe.lion.club/photos/1.jpg</code> ，找到 <code>/photos</code> 的 <code>location</code> 后，去 <code>html/photos</code> 目录下寻找 <code>1.jpg</code> 静态资源。</li></ul><h2 id="if-指令" tabindex="-1"><a class="header-anchor" href="#if-指令" aria-hidden="true">#</a> <strong>if 指令</strong></h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：if (condition) {...}

上下文：server、location

示例：
if($http_user_agent ~ Chrome){
  rewrite /(.*)/browser/$1 break;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>condition</code> 判断条件：</p>`,12),We=s("<li><code>$variable</code> 仅为变量时，值为空或以0开头字符串都会被当做 <code>false</code> 处理；</li><li><code>=</code> 或 <code>!=</code> 相等或不等；</li><li><code>~</code> 正则匹配；</li><li><code>! ~</code> 非正则匹配；</li><li><code>~*</code> 正则匹配，不区分大小写；</li><li><code>-f</code> 或 <code>! -f</code> 检测文件存在或不存在；</li><li><code>-d</code> 或 <code>! -d</code> 检测目录存在或不存在；</li>",7),De=e("code",null,"-e",-1),Te=e("code",null,"! -e",-1),Pe={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E7%AC%A6%E5%8F%B7%E9%93%BE%E6%8E%A5&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLnrKblj7fpk77mjqUiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.RUprqw513gdAbY8Cy9RZIx2XLbmkmIVbInBF5KFP-Vk&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},$e=e("li",null,[e("code",null,"-x"),i(" 或 "),e("code",null,"! -x"),i(" 检测文件可以执行或不可执行；")],-1),Ke=s(`<p>实例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
  listen 8080;
  server_name localhost;
  root html;
  
  location / {
   if ( $uri = &quot;/images/&quot; ){
     rewrite (.*) /pics/ break;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当访问 <code>localhost:8080/images/</code> 时，会进入 <code>if</code> 判断里面执行 <code>rewrite</code> 命令。<strong>autoindex</strong>用户请求以 <code>/</code> 结尾时，列出目录结构，可以用于快速搭建静态资源下载网站。<code>autoindex.conf</code> 配置信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
  listen 80;
  server_name fe.lion-test.club;
  
  location /download/ {
    root /opt/source;
    
    autoindex on; # 打开 autoindex，，可选参数有 on | off
    autoindex_exact_size on; # 修改为off，以KB、MB、GB显示文件大小，默认为on，以bytes显示出⽂件的确切⼤⼩
    autoindex_format html; # 以html的方式进行格式化，可选参数有 html | json | xml
    autoindex_localtime off; # 显示的⽂件时间为⽂件的服务器时间。默认为off，显示的⽂件时间为GMT时间
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当访问 <code>fe.lion.com/download/</code> 时，会把服务器 <code>/opt/source/download/</code> 路径下的文件展示出来，如下图所示：</p><p><img src="`+m+'" alt="展示 autoindex 开启后列出的目录结构"></p><p><strong>变量</strong><code>Nginx</code> 提供给使用者的变量非常多，但是终究是一个完整的请求过程所产生数据， <code>Nginx</code> 将这些数据以变量的形式提供给使用者。下面列举些项目中常用的变量：</p><p><img src="'+b+`" alt="Nginx 常用变量列举"></p><p>实例演示 <code>var.conf</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server{
 listen 8081;
 server_name var.lion-test.club;
 root /usr/share/nginx/html;
 location / {
  return 200 &quot;
remote_addr: $remote_addr
remote_port: $remote_port
server_addr: $server_addr
server_port: $server_port
server_protocol: $server_protocol
binary_remote_addr: $binary_remote_addr
connection: $connection
uri: $uri
request_uri: $request_uri
scheme: $scheme
request_method: $request_method
request_length: $request_length
args: $args
arg_pid: $arg_pid
is_args: $is_args
query_string: $query_string
host: $host
http_user_agent: $http_user_agent
http_referer: $http_referer
http_via: $http_via
request_time: $request_time
https: $https
request_filename: $request_filename
document_root: $document_root
&quot;;
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们访问 <code>http://var.lion-test.club:8081/test?pid=121414&amp;cid=sadasd</code> 时，由于 <code>Nginx</code> 中写了 <code>return</code> 方法，因此 <code>chrome</code> 浏览器会默认为我们下载一个文件，下面展示的就是下载的文件内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>remote_addr: 27.16.220.84
remote_port: 56838
server_addr: 172.17.0.2
server_port: 8081
server_protocol: HTTP/1.1
binary_remote_addr: 茉
connection: 126
uri: /test/
request_uri: /test/?pid=121414&amp;cid=sadasd
scheme: http
request_method: GET
request_length: 518
args: pid=121414&amp;cid=sadasd
arg_pid: 121414
is_args: ?
query_string: pid=121414&amp;cid=sadasd
host: var.lion-test.club
http_user_agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
http_referer:
http_via:
request_time: 0.000
https:
request_filename: /usr/share/nginx/html/test/
document_root: /usr/share/nginx/html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Nginx</code> 的配置还有非常多，以上只是罗列了一些常用的配置，在实际项目中还是要学会查阅文档。<strong>Nginx 应用核心概念</strong>代理是在服务器和客户端之间假设的一层服务器，代理将接收客户端的请求并将它转发给服务器，然后将服务端的响应转发给客户端。不管是正向代理还是反向代理，实现的都是上面的功能。</p><p><img src="`+h+'" alt="代理服务器在客户端和原始服务器之间的示意"></p><p><strong>正向代理</strong></p>',15),Qe={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=3&q=%E5%8E%9F%E5%A7%8B%E6%9C%8D%E5%8A%A1%E5%99%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLljp_lp4vmnI3liqHlmagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MywiemRfdG9rZW4iOm51bGx9.qHHC2ZrwbEIccJMJf6wAR_dPEv8im7HA9iGheTh_O5U&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},ei={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=4&q=%E6%AD%A3%E5%90%91%E4%BB%A3%E7%90%86&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmraPlkJHku6PnkIYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6NCwiemRfdG9rZW4iOm51bGx9.umQWr6GQy_vEqqA1Mu9LWsfWRv9nJZdGn2jtZUO-L3M&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},ii=e("strong",null,"反向代理",-1),ni={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=2&q=%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlj43lkJHku6PnkIbmnI3liqHlmagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.gmAjdrHHnqR9x4_7twSUhcCljuNCxlR7UB19y2XvmGo&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},di=e("p",null,"反向代理是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。反向代理对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。反向代理的优势：",-1),si=e("ul",null,[e("li",null,"隐藏真实服务器；"),e("li",null,"负载均衡便于横向扩充后端动态服务；"),e("li",null,"动静分离，提升系统健壮性；")],-1),li={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=2&q=%E5%8A%A8%E9%9D%99%E5%88%86%E7%A6%BB&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLliqjpnZnliIbnprsiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.90TBkfHAzeowhL2EPVDKVOpzPiice_AgoriqOAlG4Lo&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},ci={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=7&q=%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLotJ_ovb3lnYfooaEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6NywiemRfdG9rZW4iOm51bGx9.xM5yX9rKY9-9M-xXBgV-bvjLgvrJMekIodH7LEAgRU8&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},ri=e("strong",null,"动静分离",-1),ti=e("code",null,"web",-1),ai={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmnrbmnoTorr7orqEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.feFEhFAMMTQovwhMP9ktRPX9wyH-T3N1pg4insfxn8A&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},oi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E5%8F%AF%E7%BB%B4%E6%8A%A4%E6%80%A7&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlj6_nu7TmiqTmgKciLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.2IEssTsGGsk9pXZJDl3mbYkdHnAwFPSR-LQASnzymL8&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},vi=e("p",null,[e("img",{src:p,alt:"动静分离架构示意"})],-1),ui=e("p",null,[i("一般来说，都需要将动态资源和静态资源分开，由于 "),e("code",null,"Nginx"),i(" 的高并发和静态资源缓存等特性，经常将静态资源部署在 "),e("code",null,"Nginx"),i(" 上。如果请求的是静态资源，直接到静态资源目录获取资源，如果是动态资源的请求，则利用反向代理的原理，把请求转发给对应后台应用去处理，从而实现动静分离。")],-1),mi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLliY3lkI7nq6_liIbnprsiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.KpK9RbgheLe6zSbX5TemKBEVlmNMeaOxfY-gOOeqzAw&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},bi=e("strong",null,"负载均衡",-1),hi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E9%9B%86%E7%BE%A4&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLpm4bnvqQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.GnzsbISOryKnVHmMTMrSzrNHS1ldfszvxBRsx1tXdzk&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},pi=e("code",null,"Nginx",-1),_i=e("code",null,"B",-1),gi=e("code",null,"B",-1),xi=e("p",null,[e("img",{src:_,alt:"Nginx 负载均衡示意（地铁工作人员分流）"})],-1),Ii=e("p",null,[e("code",null,"Nginx"),i(" 实现负载均衡的策略：")],-1),ki={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E8%BD%AE%E8%AF%A2%E7%AD%96%E7%95%A5&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLova7or6LnrZbnlaUiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.x5CYsbde8kkgfFdbhiuroTtvKs-nd5KfkDRJjqWBgF4&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},zi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=6&q=%E6%9C%8D%E5%8A%A1%E7%AB%AF&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmnI3liqHnq68iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6NiwiemRfdG9rZW4iOm51bGx9.3eu1KnfBO_DVCWFQKu5A66v0y_Ol7XV6QyJVfr7x6fE&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Ji={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E6%9C%80%E5%B0%8F%E8%BF%9E%E6%8E%A5%E6%95%B0&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmnIDlsI_ov57mjqXmlbAiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.DyG-XMDp-Um7VZ3WTCZLbeKXosBDCtE1s_pChCzuIpQ&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},yi=e("li",null,"最快响应时间策略：优先分配给响应时间最短的服务器。",-1),ji=e("li",null,[i("客户端 "),e("code",null,"ip"),i(" 绑定策略：来自同一个 "),e("code",null,"ip"),i(" 的请求永远只分配一台服务器，有效解决了动态网页存在的 "),e("code",null,"session"),i(" 共享问题。")],-1),Ri=s('<h2 id="nginx-实战配置在配置反向代理和负载均衡等等功能之前-有两个核心模块是我们必须要掌握的-这两个模块应该说是-nginx-应用配置中的核心-它们分别是-upstream-、proxy-pass-。upstream用于定义上游服务器-指的就是后台提供的应用服务器-的相关信息" tabindex="-1"><a class="header-anchor" href="#nginx-实战配置在配置反向代理和负载均衡等等功能之前-有两个核心模块是我们必须要掌握的-这两个模块应该说是-nginx-应用配置中的核心-它们分别是-upstream-、proxy-pass-。upstream用于定义上游服务器-指的就是后台提供的应用服务器-的相关信息" aria-hidden="true">#</a> <strong>Nginx 实战配置</strong>在配置反向代理和负载均衡等等功能之前，有两个核心模块是我们必须要掌握的，这两个模块应该说是 <code>Nginx</code> 应用配置中的核心，它们分别是：<code>upstream</code> 、<code>proxy_pass</code> 。<strong>upstream</strong>用于定义上游服务器（指的就是后台提供的应用服务器）的相关信息</h2><p><img src="'+l+`" alt="upstream 模块说明图"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：upstream name {
 ...
}

上下文：http

示例：
upstream back_end_server{
  server 192.168.100.33:8081
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>upstream</code> 内可使用的指令：</p>`,4),fi=s("<li><code>server</code> 定义上游服务器地址；</li><li><code>zone</code> 定义共享内存，用于跨 <code>worker</code> 子进程；</li><li><code>keepalive</code> 对上游服务启用长连接；</li><li><code>keepalive_requests</code> 一个长连接最多请求 <code>HTTP</code> 的个数；</li><li><code>keepalive_timeout</code> 空闲情形下，一个长连接的超时时长；</li><li><code>hash</code> 哈希负载均衡算法；</li>",6),Gi=e("code",null,"ip_hash",-1),Ei=e("code",null,"IP",-1),Oi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=2&q=%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLotJ_ovb3lnYfooaHnrpfms5UiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.arN71cEdfNSc2_k-A12lBMS0XLyqoiyij2z4d3UAlaA&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Ci=e("code",null,"least_conn",-1),Ni={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E6%9C%80%E5%B0%91%E8%BF%9E%E6%8E%A5%E6%95%B0&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmnIDlsJHov57mjqXmlbAiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.LVQpnLq6NTNrxHlxSZswjV6kT_hl9Ps_Ce4iujjw-nY&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Mi=e("li",null,[e("code",null,"least_time"),i(" 最短响应时间负载均衡算法；")],-1),Li=e("li",null,[e("code",null,"random"),i(" 随机负载均衡算法；")],-1),Ai=s(`<h3 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> <strong>server</strong></h3><p>定义上游服务器地址。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：server address [parameters]

上下文：upstream
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>parameters</code> 可选值：</p>`,4),Ui=e("code",null,"weight=number",-1),Xi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E6%9D%83%E9%87%8D%E5%80%BC&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmnYPph43lgLwiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.0_sF7c-9PvPrTdHYd7iS1WCP3qKd8_hRqJNmR-2wnqw&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},wi=e("code",null,"max_conns=number",-1),Zi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=2&q=%E6%9C%80%E5%A4%A7%E5%B9%B6%E5%8F%91%E8%BF%9E%E6%8E%A5%E6%95%B0&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmnIDlpKflubblj5Hov57mjqXmlbAiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.4HHtbQKpyy1JUovwkIYzaLY2zsp7WcyXGp5xHcl0Hh4&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Yi=e("li",null,[e("code",null,"fail_timeout=time"),i(" 服务器不可用的判定时间；")],-1),Vi=e("li",null,[e("code",null,"max_fails=numer"),i(" 服务器不可用的检查次数；")],-1),Hi=e("li",null,[e("code",null,"backup"),i(" 备份服务器，仅当其他服务器都不可用时才会启用；")],-1),qi=e("li",null,[e("code",null,"down"),i(" 标记服务器长期不可用，离线维护；")],-1),Fi=s(`<h3 id="keepalive" tabindex="-1"><a class="header-anchor" href="#keepalive" aria-hidden="true">#</a> <strong>keepalive</strong></h3><p>限制每个 <code>worker</code> 子进程与上游服务器空闲长连接的最大数量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>keepalive connections;

上下文：upstream

示例：keepalive 16;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="keepalive-requests" tabindex="-1"><a class="header-anchor" href="#keepalive-requests" aria-hidden="true">#</a> <strong>keepalive_requests</strong></h3>`,4),Bi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=5&q=%E9%95%BF%E8%BF%9E%E6%8E%A5&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLplb_ov57mjqUiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6NSwiemRfdG9rZW4iOm51bGx9.mczAUNdkPTn63EdUWY8iOoCSHeV4SOMF1ixyatQmjoA&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Si=e("code",null,"HTTP",-1),Wi=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：keepalive_requests number;

默认值：keepalive_requests 100;

上下文：upstream
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>keepalive_timeout</strong>空闲长连接的最长保持时间。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：keepalive_timeout time;

默认值：keepalive_timeout 60s;

上下文：upstream
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置实例" tabindex="-1"><a class="header-anchor" href="#配置实例" aria-hidden="true">#</a> <strong>配置实例</strong></h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream back_end{
 server 127.0.0.1:8081 weight=3 max_conns=1000 fail_timeout=10s max_fails=2;
  keepalive 32;
  keepalive_requests 50;
  keepalive_timeout 30s;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="proxy-pass" tabindex="-1"><a class="header-anchor" href="#proxy-pass" aria-hidden="true">#</a> <strong>proxy_pass</strong></h2><p>用于配置代理服务器。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：proxy_pass URL;

上下文：location、if、limit_except

示例：
proxy_pass http://127.0.0.1:8081
proxy_pass http://127.0.0.1:8081/proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>URL</code> 参数原则<code>1. URL</code> 必须以 <code>http</code> 或 <code>https</code> 开头；<code>2. URL</code> 中可以携带变量；<code>3. URL</code> 中是否带 <code>URI</code> ，会直接影响发往上游请求的 <code>URL</code> ；接下来让我们来看看两种常见的 <code>URL</code> 用法：</p><ol><li><code>proxy_pass http://192.168.100.33:8081</code></li><li><code>proxy_pass http://192.168.100.33:8081/</code></li></ol><p>这两种用法的区别就是带 <code>/</code> 和不带 <code>/</code> ，在配置代理时它们的区别可大了：</p><ul><li>不带 <code>/</code> 意味着 <code>Nginx</code> 不会修改用户 <code>URL</code> ，而是直接透传给上游的应用服务器；</li><li>带 <code>/</code> 意味着 <code>Nginx</code> 会修改用户 <code>URL</code> ，修改方法是将 <code>location</code> 后的 <code>URL</code> 从用户 <code>URL</code> 中删除；</li></ul><p>不带 <code>/</code> 的用法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location /bbs/{
  proxy_pass http://127.0.0.1:8080;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：1. 用户请求 <code>URL</code> ：<code>/bbs/abc/test.html</code>2. 请求到达 <code>Nginx</code> 的 <code>URL</code> ：<code>/bbs/abc/test.html</code>3 .请求到达上游应用服务器的 <code>URL</code> ：<code>/bbs/abc/test.html</code>带 <code>/</code> 的用法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location /bbs/{
  proxy_pass http://127.0.0.1:8080/;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),Di=e("code",null,"URL",-1),Ti=e("code",null,"/bbs/abc/test.html",-1),Pi=e("code",null,"Nginx",-1),$i=e("code",null,"URL",-1),Ki=e("code",null,"/bbs/abc/test.html",-1),Qi={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=4&q=%E5%BA%94%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlupTnlKjmnI3liqHlmagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6NCwiemRfdG9rZW4iOm51bGx9.DoCCWclzpbeb-WsHAR7KHqBLzWMXccLdbNayyLhYLvk&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},en=e("code",null,"URL",-1),nn=e("code",null,"/abc/test.html",-1),dn=e("code",null,"/bbs",-1),sn=e("code",null,"root",-1),ln=e("code",null,"alias",-1),cn=e("strong",null,"配置反向代理",-1),rn={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=2&q=%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLkupHmnI3liqHlmagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.TV4wWVfksyGoPhcrT6Xb1nIPQgYQ8bXnuPsk_eJaovk&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},tn=e("code",null,"IP",-1),an=e("code",null,"121.42.11.34",-1),on=e("code",null,"121.5.180.193",-1),vn=e("code",null,"121.42.11.34",-1),un=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># /etc/nginx/conf.d/proxy.conf
server{
  listen 8080;
  server_name localhost;
  
  location /proxy/ {
    root /usr/share/nginx/html/proxy;
    index index.html;
  }
}

# /usr/share/nginx/html/proxy/index.html
&lt;h1&gt; 121.42.11.34 proxy html &lt;/h1&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后重启 <code>Nginx</code> 服务器 <code>nginx -s reload</code> 。</p><p>把 <code>121.5.180.193</code> 服务器作为代理服务器，做如下配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream back_end {
  server 121.42.11.34:8080 weight=2 max_conns=1000 fail_timeout=10s max_fails=3;
  keepalive 32;
  keepalive_requests 80;
  keepalive_timeout 20s;
}

server {
  listen 80;
  server_name proxy.lion.club;
  location /proxy {
   proxy_pass http://back_end/proxy;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地机器要访问 <code>proxy.lion.club</code> 域名，因此需要配置本地 <code>hosts</code> ，通过命令：<code>vim /etc/hosts</code> 进入配置文件，添加如下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>121.5.180.193 proxy.lion.club
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+l+`" alt="upstream 模块说明图"></p><p>分析：当访问 <code>proxy.lion.club/proxy</code> 时通过 <code>upstream</code> 的配置找到 <code>121.42.11.34:8080</code> ；因此访问地址变为 <code>http://121.42.11.34:8080/proxy</code> ；连接到 <code>121.42.11.34</code> 服务器，找到 <code>8080</code> 端口提供的 <code>server</code> ；通过 <code>server</code> 找到 <code>/usr/share/nginx/html/proxy/index.html</code> 资源，最终展示出来。</p><h2 id="配置负载均衡" tabindex="-1"><a class="header-anchor" href="#配置负载均衡" aria-hidden="true">#</a> <strong>配置负载均衡</strong></h2><p>配置负载均衡主要是要使用 <code>upstream</code> 指令。我们把 <code>121.42.11.34</code> 服务器作为上游服务器，做如下配置（ <code>/etc/nginx/conf.d/balance.conf</code> ）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server{
  listen 8020;
  location / {
   return 200 &#39;return 8020 \\n&#39;;
  }
}

server{
  listen 8030;
  location / {
   return 200 &#39;return 8030 \\n&#39;;
  }
}

server{
  listen 8040;
  location / {
   return 200 &#39;return 8040 \\n&#39;;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后：<code>1. nginx -t</code> 检测配置是否正确；<code>2. nginx -s reload</code> 重启 <code>Nginx</code> 服务器；3. 执行 <code>ss -nlt</code> 命令查看端口是否被占用，从而判断 <code>Nginx</code> 服务是否正确启动。把 <code>121.5.180.193</code> 服务器作为代理服务器，做如下配置（ <code>/etc/nginx/conf.d/balance.conf</code> ）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream demo_server {
  server 121.42.11.34:8020;
  server 121.42.11.34:8030;
  server 121.42.11.34:8040;
}

server {
  listen 80;
  server_name balance.lion.club;
  
  location /balance/ {
   proxy_pass http://demo_server;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后重启 <code>Nginx</code> 服务器。并且在需要访问的客户端配置好 <code>ip</code> 和域名的映射关系。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># /etc/hosts

121.5.180.193 balance.lion.club
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在客户端机器执行 <code>curl http://balance.lion.club/balance/</code> 命令：</p><p><img src="`+l+'" alt="upstream 模块说明图"></p>',17),mn=e("code",null,"Nginx",-1),bn=e("strong",null,"hash 算法",-1),hn=e("code",null,"hash key",-1),pn=e("code",null,"hash",-1),_n={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E7%AE%97%E6%B3%95%E6%98%A0%E5%B0%84&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLnrKfms5XmmKDlsIQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.xRzo5GoDjZh9u2g9PAHt5pKiL4uGGSkiMb05Jm_wne8&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},gn=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream demo_server {
  hash $request_uri;
  server 121.42.11.34:8020;
  server 121.42.11.34:8030;
  server 121.42.11.34:8040;
}

server {
  listen 80;
  server_name balance.lion.club;
  
  location /balance/ {
   proxy_pass http://demo_server;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),xn=e("code",null,"hash $request_uri",-1),In=e("code",null,"request_uri",-1),kn=e("code",null,"hash",-1),zn=e("code",null,"key",-1),Jn=e("code",null,"URI",-1),yn={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=2&q=ip_hash&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiJpcF9oYXNoIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MTcwMzM1NjIzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjIsInpkX3Rva2VuIjpudWxsfQ.NFW56AwsxK1qhPjUZs7Xx0ukgFq1k94fuZoHp9bVaH8&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},jn=e("code",null,"ip",-1),Rn=e("code",null,"ip",-1),fn=e("code",null,"session",-1),Gn=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream demo_server {
  ip_hash;
  server 121.42.11.34:8020;
  server 121.42.11.34:8030;
  server 121.42.11.34:8040;
}

server {
  listen 80;
  server_name balance.lion.club;
  
  location /balance/ {
   proxy_pass http://demo_server;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最少连接数算法" tabindex="-1"><a class="header-anchor" href="#最少连接数算法" aria-hidden="true">#</a> <strong>最少连接数算法</strong></h3><p>各个 <code>worker</code> 子进程通过读取共享内存的数据，来获取后端服务器的信息。来挑选一台当前已建立连接数最少的服务器进行分配请求。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：least_conn;

上下文：upstream;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream demo_server {
  zone test 10M; # zone可以设置共享内存空间的名字和大小
  least_conn;
  server 121.42.11.34:8020;
  server 121.42.11.34:8030;
  server 121.42.11.34:8040;
}

server {
  listen 80;
  server_name balance.lion.club;
  
  location /balance/ {
   proxy_pass http://demo_server;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后你会发现，负载均衡的配置其实一点都不复杂。</p><h2 id="配置缓存缓存可以非常有效的提升性能-因此不论是客户端-浏览器-还是代理服务器-nginx-乃至上游服务器都多少会涉及到缓存。可见缓存在每个环节都是非常重要的。下面让我们来学习-nginx-中如何设置缓存策略。proxy-cache存储一些之前被访问过、而且可能将要被再次访问的资源-使用户可以直接从代理服务器获得-从而减少上游服务器的压力-加快整个访问速度" tabindex="-1"><a class="header-anchor" href="#配置缓存缓存可以非常有效的提升性能-因此不论是客户端-浏览器-还是代理服务器-nginx-乃至上游服务器都多少会涉及到缓存。可见缓存在每个环节都是非常重要的。下面让我们来学习-nginx-中如何设置缓存策略。proxy-cache存储一些之前被访问过、而且可能将要被再次访问的资源-使用户可以直接从代理服务器获得-从而减少上游服务器的压力-加快整个访问速度" aria-hidden="true">#</a> <strong>配置缓存</strong>缓存可以非常有效的提升性能，因此不论是客户端（浏览器），还是代理服务器（ <code>Nginx</code> ），乃至上游服务器都多少会涉及到缓存。可见缓存在每个环节都是非常重要的。下面让我们来学习 <code>Nginx</code> 中如何设置缓存策略。<strong>proxy_cache</strong>存储一些之前被访问过、而且可能将要被再次访问的资源，使用户可以直接从代理服务器获得，从而减少上游服务器的压力，加快整个访问速度</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：proxy_cache zone | off ; # zone 是共享内存的名称

默认值：proxy_cache off;

上下文：http、server、location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>proxy_cache_path</strong></p><p>设置缓存文件的存放路径。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：proxy_cache_path path [level=levels] ...可选参数省略，下面会详细列举

默认值：proxy_cache_path off

上下文：http
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数含义：</p><ul><li><code>path</code> 缓存文件的存放路径；</li><li><code>level path</code> 的目录层级；</li><li><code>keys_zone</code> 设置共享内存；</li><li><code>inactive</code> 在指定时间内没有被访问，缓存会被清理，默认10分钟；</li></ul><h3 id="proxy-cache-key" tabindex="-1"><a class="header-anchor" href="#proxy-cache-key" aria-hidden="true">#</a> <strong>proxy_cache_key</strong></h3><p>设置缓存文件的 <code>key</code> 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：proxy_cache_key

默认值：proxy_cache_key $scheme$proxy_host$request_uri;

上下文：http、server、location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>proxy_cache_valid</strong>配置什么状态码可以被缓存，以及缓存时长。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：proxy_cache_valid [code...] time;

上下文：http、server、location

配置示例：proxy_cache_valid 200 304 2m;; # 说明对于状态为200和304的缓存文件的缓存时间是2分钟
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="proxy-no-cache" tabindex="-1"><a class="header-anchor" href="#proxy-no-cache" aria-hidden="true">#</a> <strong>proxy_no_cache</strong></h3><p>定义相应保存到缓存的条件，如果字符串参数的至少一个值不为空且不等于“ 0”，则将不保存该响应到缓存。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：proxy_no_cache string;

上下文：http、server、location

示例：proxy_no_cache $http_pragma    $http_authorization;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="proxy-cache-bypass" tabindex="-1"><a class="header-anchor" href="#proxy-cache-bypass" aria-hidden="true">#</a> <strong>proxy_cache_bypass</strong></h3><p>定义条件，在该条件下将不会从缓存中获取响应。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法：proxy_cache_bypass string;

上下文：http、server、location

示例：proxy_cache_bypass $http_pragma    $http_authorization;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="upstream-cache-status-变量" tabindex="-1"><a class="header-anchor" href="#upstream-cache-status-变量" aria-hidden="true">#</a> <strong>upstream_cache_status 变量</strong></h3>`,26),En={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E5%93%8D%E5%BA%94%E5%A4%B4&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlk43lupTlpLQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.1JZ9Tog25P6vXaLxp0qsRqIeyTvN0fZ0PQDlCN8-j3I&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},On=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MISS: 未命中缓存
HIT：命中缓存
EXPIRED: 缓存过期
STALE: 命中了陈旧缓存
REVALIDDATED: Nginx验证陈旧缓存依然有效
UPDATING: 内容陈旧，但正在更新
BYPASS: X响应从原始服务器获取
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置实例-1" tabindex="-1"><a class="header-anchor" href="#配置实例-1" aria-hidden="true">#</a> <strong>配置实例</strong></h3><p>我们把 <code>121.42.11.34</code> 服务器作为上游服务器，做如下配置（ <code>/etc/nginx/conf.d/cache.conf</code> ）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
  listen 1010;
  root /usr/share/nginx/html/1010;
  location / {
   index index.html;
  }
}

server {
  listen 1020;
  root /usr/share/nginx/html/1020;
  location / {
   index index.html;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把 <code>121.5.180.193</code> 服务器作为代理服务器，做如下配置（ <code>/etc/nginx/conf.d/cache.conf</code> ）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>proxy_cache_path /etc/nginx/cache_temp levels=2:2 keys_zone=cache_zone:30m max_size=2g inactive=60m use_temp_path=off;

upstream cache_server{
  server 121.42.11.34:1010;
  server 121.42.11.34:1020;
}

server {
  listen 80;
  server_name cache.lion.club;
  location / {
    proxy_cache cache_zone; # 设置缓存内存，上面配置中已经定义好的
    proxy_cache_valid 200 5m; # 缓存状态为200的请求，缓存时长为5分钟
    proxy_cache_key $request_uri; # 缓存文件的key为请求的URI
    add_header Nginx-Cache-Status $upstream_cache_status # 把缓存状态设置为头部信息，响应给客户端
    proxy_pass http://cache_server; # 代理转发
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>缓存就是这样配置，我们可以在 <code>/etc/nginx/cache_temp</code> 路径下找到相应的缓存文件。<strong>对于一些实时性要求非常高的页面或数据来说，就不应该去设置缓存，下面来看看如何配置不缓存的内容。</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...

server {
  listen 80;
  server_name cache.lion.club;
  # URI 中后缀为 .txt 或 .text 的设置变量值为 &quot;no cache&quot;
  if ($request_uri ~ \\.(txt|text)$) {
   set $cache_name &quot;no cache&quot;
  }
  
  location / {
    proxy_no_cache $cache_name; # 判断该变量是否有值，如果有值则不进行缓存，如果没有值则进行缓存
    proxy_cache cache_zone; # 设置缓存内存
    proxy_cache_valid 200 5m; # 缓存状态为200的请求，缓存时长为5分钟
    proxy_cache_key $request_uri; # 缓存文件的key为请求的URI
    add_header Nginx-Cache-Status $upstream_cache_status # 把缓存状态设置为头部信息，响应给客户端
    proxy_pass http://cache_server; # 代理转发
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),Cn=e("strong",null,"HTTPS",-1),Nn=e("code",null,"HTTPS",-1),Mn=e("code",null,"HTTPS",-1),Ln=e("strong",null,"HTTPS 工作流程",-1),An=e("code",null,"https://www.baidu.com",-1),Un=e("code",null,"HTTPS",-1),Xn=e("code",null,"CA",-1),wn=e("code",null,"CA",-1),Zn={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E7%A7%81%E9%92%A5%E8%A7%A3%E5%AF%86&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLnp4HpkqXop6Plr4YiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.qzkG8c7MFJQ2304HIWuUWhXvt0vwHgKKAU-3VW5yR7c&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Yn={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=5&q=%E5%8A%A0%E5%AF%86&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLliqDlr4YiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6NSwiemRfdG9rZW4iOm51bGx9.YyytUKE7IJhpsWaBSmt_yPDkYPOnmSLgVvqN1SljgWA&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Vn=e("code",null,"HTTPS",-1),Hn={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlr7nnp7DliqDlr4YiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.yD3-3Frnq0DocVjjXyiuwpYSBqML1ui8O8H7AviZSk4&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},qn=s(`<h3 id="配置证书" tabindex="-1"><a class="header-anchor" href="#配置证书" aria-hidden="true">#</a> <strong>配置证书</strong></h3><p>下载证书的压缩文件，里面有个 <code>Nginx</code> 文件夹，把 <code>xxx.crt</code> 和 <code>xxx.key</code> 文件拷贝到服务器目录，再进行如下配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
  listen 443 ssl http2 default_server; # SSL 访问端口号为 443
  server_name lion.club; # 填写绑定证书的域名(我这里是随便写的)
  ssl_certificate /etc/nginx/https/lion.club_bundle.crt; # 证书地址
  ssl_certificate_key /etc/nginx/https/lion.club.key; # 私钥地址
  ssl_session_timeout 10m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 支持ssl协议版本，默认为后三个，主流版本是[TLSv1.2]
 
  location / {
    root         /usr/share/nginx/html;
    index        index.html index.htm;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此配置后就能正常访问 <code>HTTPS</code> 版的网站了。</p>`,4),Fn={id:"配置跨域-cors先简单回顾下跨域究竟是怎么回事。跨域的定义同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。通常不允许不同源间的读操作。同源的定义如果两个页面的协议-端口-如果有指定-和域名都相同-则两个页面具有相同的源。下面给出了与-url-http-store-company-com-dir-page-html-的源进行对比的示例",tabindex:"-1"},Bn=e("a",{class:"header-anchor",href:"#配置跨域-cors先简单回顾下跨域究竟是怎么回事。跨域的定义同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。通常不允许不同源间的读操作。同源的定义如果两个页面的协议-端口-如果有指定-和域名都相同-则两个页面具有相同的源。下面给出了与-url-http-store-company-com-dir-page-html-的源进行对比的示例","aria-hidden":"true"},"#",-1),Sn=e("strong",null,"配置跨域 CORS",-1),Wn=e("strong",null,"跨域的定义",-1),Dn={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E6%81%B6%E6%84%8F%E6%96%87%E4%BB%B6&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLmgbbmhI_mlofku7YiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.CYkg68iS1j-CUGLIVO8-YxN83_OKyBlgT_-ZYIWp10I&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Tn={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E8%AF%BB%E6%93%8D%E4%BD%9C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLor7vmk43kvZwiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.hPE3sWLzfMXsKU7qaJIbopc1jTXaj9OgCxYErZrC4C0&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Pn=e("strong",null,"同源的定义",-1),$n=e("code",null,"http://store.company.com/dir/page.html",-1),Kn=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://store.company.com/dir2/other.html 同源
https://store.company.com/secure.html 不同源，协议不同
http://store.company.com:81/dir/etc.html 不同源，端口不同
http://news.company.com/dir/other.html 不同源，主机不同
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同源会有如下限制：</p><ul><li><code>Web</code> 数据层面，同源策略限制了不同源的站点读取当前站点的 <code>Cookie</code> 、 <code>IndexDB</code> 、 <code>LocalStorage</code> 等数据。</li><li><code>DOM</code> 层面，同源策略限制了来自不同源的 <code>JavaScript</code> 脚本对当前 <code>DOM</code> 对象读和写的操作。</li><li>网络层面，同源策略限制了通过 <code>XMLHttpRequest</code> 等方式将站点的数据发送给不同源的站点。</li></ul><h3 id="nginx-解决跨域的原理" tabindex="-1"><a class="header-anchor" href="#nginx-解决跨域的原理" aria-hidden="true">#</a> <strong>Nginx 解决跨域的原理</strong></h3><p>例如：</p><ul><li>前端 <code>server</code> 的域名为：<code>fe.server.com</code></li><li>后端服务的域名为：<code>dev.server.com</code></li></ul><p>现在我在 <code>fe.server.com</code> 对 <code>dev.server.com</code> 发起请求一定会出现跨域。现在我们只需要启动一个 <code>Nginx</code> 服务器，将 <code>server_name</code> 设置为 <code>fe.server.com</code> 然后设置相应的 <code>location</code> 以拦截前端需要跨域的请求，最后将请求代理回 <code>dev.server.com</code> 。如下面的配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
 listen      80;
 server_name  fe.server.com;
 location / {
  proxy_pass dev.server.com;
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样可以完美绕过浏览器的同源策略：<code>fe.server.com</code> 访问 <code>Nginx</code> 的 <code>fe.server.com</code> 属于同源访问，而 <code>Nginx</code> 对服务端转发的请求不会触发浏览器的同源策略。<strong>配置开启 gzip 压缩</strong><code>GZIP</code> 是规定的三种标准 <code>HTTP</code> 压缩格式之一。目前绝大多数的网站都在使用 <code>GZIP</code> 传输 <code>HTML</code> 、<code>CSS</code> 、 <code>JavaScript</code> 等资源文件。对于文本文件， <code>GZiP</code> 的效果非常明显，开启后传输所需流量大约会降至 <code>1/4~1/3</code> 。并不是每个浏览器都支持 <code>gzip</code> 的，如何知道客户端是否支持 <code>gzip</code> 呢，请求头中的 <code>Accept-Encoding</code> 来标识对压缩的支持。</p><p><img src="`+g+'" alt="请求头中 Accept-Encoding 标识对压缩支持的示意图"></p><p>启用 <code>gzip</code> 同时需要客户端和服务端的支持，如果客户端支持 <code>gzip</code> 的解析，那么只要服务端能够返回 <code>gzip</code> 的文件就可以启用 <code>gzip</code> 了,我们可以通过 <code>Nginx</code> 的配置来让服务端支持 <code>gzip</code> 。下面的 <code>respone</code> 中 <code>content-encoding:gzip</code> ，指服务端开启了 <code>gzip</code> 的压缩方式。</p><p><img src="'+x+`" alt="response 中 content-encoding:gzip 服务端开启 gzip 压缩方式的示意图"></p><p>在 <code>/etc/nginx/conf.d/</code> 文件夹中新建配置文件 <code>gzip.conf</code> ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># # 默认off，是否开启gzip
gzip on;
# 要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

# ---- 以上两个参数开启就可以支持Gzip压缩了 ---- #

# 默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 .gz 文件内容；
gzip_static on;

# 默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；
gzip_proxied any;

# 用于在响应消息头中添加 Vary：Accept-Encoding，使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩；
gzip_vary on;

# gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；
gzip_comp_level 6;

# 获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；
gzip_buffers 16 8k;

# 允许压缩的页面最小字节数，页面字节数从header头中的 Content-Length 中进行获取。默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；
# gzip_min_length 1k;

# 默认 1.1，启用 gzip 所需的 HTTP 最低版本；
gzip_http_version 1.1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实也可以通过前端构建工具例如 <code>webpack</code> 、<code>rollup</code> 等在打生产包时就做好 <code>Gzip</code> 压缩，然后放到 <code>Nginx</code> 服务器中，这样可以减少服务器的开销，加快访问速度。</p>`,15),Qn=e("code",null,"Nginx",-1),ed=e("code",null,"Nginx",-1),id=e("code",null,"Nginx",-1),nd=e("strong",null,"Nginx 架构进程结构",-1),dd={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E5%A4%9A%E8%BF%9B%E7%A8%8B%E7%BB%93%E6%9E%84&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLlpJrov5vnqIvnu5PmnoQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG90cm9rZW4iOm51bGx9&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},sd=e("code",null,"Nginx",-1),ld=e("p",null,[e("img",{src:I,alt:"Nginx 多进程架构模型图"})],-1),cd=e("code",null,"Nginx",-1),rd={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E7%88%B6%E8%BF%9B%E7%A8%8B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLniLbov5vnqIsiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG90cm9rZW4iOm51bGx9&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},td=e("code",null,"Master Process",-1),ad=e("code",null,"Child Processes",-1),od=e("p",null,[e("code",null,"Master Process"),i(" 用来管理子进程的，其本身并不真正处理用户请求。")],-1),vd=e("li",null,[i("某个子进程 "),e("code",null,"down"),i(" 掉的话，它会向 "),e("code",null,"Master"),i(" 进程发送一条消息，表明自己不可用了，此时 "),e("code",null,"Master"),i(" 进程会去新起一个子进程。")],-1),ud=e("code",null,"Master",-1),md=e("code",null,"work",-1),bd={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=3&q=%E7%83%AD%E9%83%A8%E7%BD%B2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLng63pg6jnvbIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MywiemRfdG90cm9rZW4iOm51bGx9&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},hd=e("li",null,[e("p",null,"子进程间是通过共享内存的方式进行通信的。")],-1),pd=s('<h2 id="配置文件重载原理" tabindex="-1"><a class="header-anchor" href="#配置文件重载原理" aria-hidden="true">#</a> <strong>配置文件重载原理</strong></h2><p><code>reload</code> 重载配置文件的流程：1. 向 <code>master</code> 进程发送 <code>HUP</code> 信号（ <code>reload</code> 命令）；<code>2. master</code> 进程检查配置语法是否正确；<code>3. master</code> 进程打开监听端口；<code>4. master</code> 进程使用新的配置文件启动新的 <code>worker</code> 子进程；<code>5. master</code> 进程向老的 <code>worker</code> 子进程发送 <code>QUIT</code> 信号；6. 老的 <code>worker</code> 进程关闭监听句柄，处理完当前连接后关闭进程；7. 整个过程 <code>Nginx</code> 始终处于平稳运行中，实现了平滑升级，用户无感知；</p><h2 id="nginx-模块化管理机制" tabindex="-1"><a class="header-anchor" href="#nginx-模块化管理机制" aria-hidden="true">#</a> <strong>Nginx 模块化管理机制</strong></h2>',3),_d=e("code",null,"Nginx",-1),gd=e("code",null,"Nginx",-1),xd={href:"https://zhida.zhihu.com/search?content_id=170335623&content_type=Article&match_order=1&q=%E9%AB%98%E5%86%85%E8%81%9A&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODc2NjU5MjYsInEiOiLpq5jlhoXogZoiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzAzMzU2MjMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG90cm9rZW4iOm51bGx9&zhida_source=entity",target:"_blank",rel:"noopener noreferrer"},Id=e("p",null,[e("img",{src:k,alt:"Nginx 模块化结构示意图"})],-1),kd=e("p",null,[e("strong",null,"END")],-1);function zd(Jd,yd){const n=a("ExternalLinkIcon");return r(),t("div",null,[J,y,j,e("ul",null,[R,f,G,e("li",null,[i("相对于其它服务器来说它可以连续几个月甚至更长而不需要重启服务器使得它具有"),e("a",E,[i("高可靠性"),d(n)]),i("；")]),O,C]),N,M,e("ol",null,[e("li",null,[i("静态资源服务，通过本地"),e("a",L,[i("文件系统"),d(n)]),i("提供服务；")]),A,U]),e("p",null,[i("对于前端来说 "),X,i(" 并不陌生， "),w,i(" 和 "),Z,i(" 的很多理念类似， "),Y,i(" 服务器、事件驱动、"),e("a",V,[i("异步非阻塞"),d(n)]),i("等，且 "),H,i(" 的大部分功能使用 "),q,i(" 也可以实现，但 "),F,i(" 和 "),B,i(" 并不冲突，都有自己擅长的领域。"),S,i(" 擅长于底层服务器端资源的处理（静态资源处理转发、反向代理，负载均衡等）， "),W,i(" 更擅长上层具体"),e("a",D,[i("业务逻辑"),d(n)]),i("的处理，两者可以完美组合。用一张图表示：")]),T,e("p",null,[P,i("本文演示的是 "),$,i(" 的"),e("a",K,[i("操作系统"),d(n)]),i("上安装 "),Q,i(" ，至于在其它操作系统上进行安装可以网上自行搜索，都非常简单的。使用 "),ee,i(" 安装 "),ie,i(" ：")]),ne,e("p",null,[de,i(" 是子配置项存放处， "),se,i(" 主配置文件会默认把这个文件夹中所有子配置项都引入；"),le,i(),e("a",ce,[i("静态文件"),d(n)]),i("都放在这个文件夹，也可以根据你自己的习惯放在其他地方；"),re,te,i(" 系统命令：")]),ae,e("ul",null,[e("li",null,[e("a",oe,[i("全局配置"),d(n)]),i("，对全局生效；")]),ve,ue,e("li",null,[me,i(" 配置"),e("a",be,[i("虚拟主机"),d(n)]),i("的相关参数，一个 "),he,i(" 块中可以有多个 "),pe,i(" 块；")]),_e,ge]),xe,e("p",null,[i("指定 "),Ie,i(" 子进程可以打开的最大"),e("a",ke,[i("文件句柄"),d(n)]),i("数。")]),ze,e("p",null,[i("将每个 "),Je,i(" 子进程与特定 "),ye,i(" 物理核心绑定，优势在于，避免同一个 "),je,i(" 子进程在不同的 "),Re,i(" 核心上切换，缓存失效，降低性能。但其并不能真正的避免"),e("a",fe,[i("进程切换"),d(n)]),i("。"),Ge,i("指定 "),Ee,i(" 子进程的 "),Oe,i(" 值，以调整运行 "),Ce,i(" 的优先级，通常设定为负值，以优先调用 "),Ne,i(" 。")]),Me,e("p",null,[Le,i(" 子进程内部使用的计时器精度，调整时间间隔越大，"),e("a",Ae,[i("系统调用"),d(n)]),i("越少，有利于性能提升；反之，系统调用越多，性能下降。")]),Ue,e("p",null,[i("是否打开负载均衡"),e("a",Xe,[i("互斥锁"),d(n)]),i("。")]),we,e("p",null,[i("[注意] 这里使用的是"),e("a",Ze,[i("虚拟域名"),d(n)]),i("进行测试，因此需要配置本地 "),Ye,i(" 解析，如果使用阿里云上购买的域名，则需要在阿里云上设置好域名解析。")]),Ve,e("p",null,[i("停止处理请求，直接返回"),e("a",He,[i("响应码"),d(n)]),i("或重定向到其他 "),qe,i(" ；执行 "),Fe,i(" 指令后， "),Be,i(" 中后续指令将不会被执行。")]),Se,e("ul",null,[We,e("li",null,[De,i(" 或 "),Te,i(" 检测文件、目录、"),e("a",Pe,[i("符号链接"),d(n)]),i("等存在或不存在；")]),$e]),Ke,e("blockquote",null,[e("p",null,[i("正向代理，意思是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标("),e("a",Qe,[i("原始服务器"),d(n)]),i(")，然后代理向原始服务器转交请求并将获得的内容返回给客户端。")])]),e("p",null,[e("a",ei,[i("正向代理"),d(n)]),i("是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。正向代理对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。"),ii]),e("ul",null,[e("li",null,[i("反向代理*（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个"),e("a",ni,[i("反向代理服务器"),d(n)]),i("。")])]),di,si,e("p",null,[i("那么“"),e("a",li,[i("动静分离"),d(n)]),i("”是什么？"),e("a",ci,[i("负载均衡"),d(n)]),i("又是什么？"),ri,i("动静分离是指在 "),ti,i(" 服务器架构中，将静态页面与动态页面或者静态内容接口和动态内容接口分开不同系统访问的"),e("a",ai,[i("架构设计"),d(n)]),i("方法，进而提示整个服务的访问性和"),e("a",oi,[i("可维护性"),d(n)]),i("。")]),vi,ui,e("p",null,[i("使用"),e("a",mi,[i("前后端分离"),d(n)]),i("后，可以很大程度提升静态资源的访问速度，即使动态服务不可用，静态资源的访问也不会受到影响。"),bi,i("一般情况下，客户端发送多个请求到服务器，服务器处理请求，其中一部分可能要操作一些资源比如数据库、静态资源等，服务器处理完毕后，再将结果返回给客户端。这种模式对于早期的系统来说，功能要求不复杂，且并发请求相对较少的情况下还能胜任，成本也低。随着信息数量不断增长，访问量和数据量飞速增长，以及系统业务复杂度持续增加，这种做法已无法满足要求，并发量特别大时，服务器容易崩。很明显这是由于服务器性能的瓶颈造成的问题，除了堆机器之外，最重要的做法就是负载均衡。请求爆发式增长的情况下，单个机器性能再强劲也无法满足要求了，这个时候"),e("a",hi,[i("集群"),d(n)]),i("的概念产生了，单个服务器解决不了的问题，可以使用多个服务器，然后将请求分发到各个服务器上，将负载分发到不同的服务器，这就是负载均衡，核心是「分摊压力」。"),pi,i(" 实现负载均衡，一般来说指的是将请求转发给服务器集群。举个具体的例子，晚高峰乘坐地铁的时候，入站口经常会有地铁工作人员大喇叭“请走 "),_i,i(" 口， "),gi,i(" 口人少车空....”，这个工作人员的作用就是负载均衡。")]),xi,Ii,e("ul",null,[e("li",null,[e("a",ki,[i("轮询策略"),d(n)]),i("：默认情况下采用的策略，将所有客户端请求轮询分配给"),e("a",zi,[i("服务端"),d(n)]),i("。这种策略是可以正常工作的，但是如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户。")]),e("li",null,[e("a",Ji,[i("最小连接数"),d(n)]),i("策略：将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。")]),yi,ji]),Ri,e("ul",null,[fi,e("li",null,[Gi,i(" 依据 "),Ei,i(" 进行哈希计算的"),e("a",Oi,[i("负载均衡算法"),d(n)]),i("；")]),e("li",null,[Ci,i(),e("a",Ni,[i("最少连接数"),d(n)]),i("负载均衡算法；")]),Mi,Li]),Ai,e("ul",null,[e("li",null,[Ui,i(),e("a",Xi,[i("权重值"),d(n)]),i("，默认为1；")]),e("li",null,[wi,i(" 上游服务器的"),e("a",Zi,[i("最大并发连接数"),d(n)]),i("；")]),Yi,Vi,Hi,qi]),Fi,e("p",null,[i("单个"),e("a",Bi,[i("长连接"),d(n)]),i("可以处理的最多 "),Si,i(" 请求个数。")]),Wi,e("p",null,[i("分析：1. 用户请求 "),Di,i(" ："),Ti,i("2. 请求到达 "),Pi,i(" 的 "),$i,i(" ："),Ki,i("3. 请求到达上游"),e("a",Qi,[i("应用服务器"),d(n)]),i("的 "),en,i(" ："),nn,i("并没有拼接上 "),dn,i(" ，这点和 "),sn,i(" 与 "),ln,i(" 之间的区别是保持一致的。"),cn,i("这里为了演示更加接近实际，作者准备了两台"),e("a",rn,[i("云服务器"),d(n)]),i("，它们的公网 "),tn,i(" 分别是："),an,i(" 与 "),on,i(" 。我们把 "),vn,i(" 服务器作为上游服务器，做如下配置：")]),un,e("p",null,[i("接下来，我们再来了解下 "),mn,i(" 的其它分发策略。"),bn,i("通过制定关键字作为 "),hn,i(" ，基于 "),pn,i(),e("a",_n,[i("算法映射"),d(n)]),i("到特定的上游服务器中。关键字可以包含有变量、字符串。")]),gn,e("p",null,[xn,i(" 表示使用 "),In,i(" 变量作为 "),kn,i(" 的 "),zn,i(" 值，只要访问的 "),Jn,i(" 保持不变，就会一直分发给同一台服务器。**"),e("a",yn,[i("ip_hash"),d(n)]),i("**根据客户端的请求 "),jn,i(" 进行判断，只要 "),Rn,i(" 地址不变就永远分配到同一台主机。它可以有效解决后台服务器 "),fn,i(" 保持的问题。")]),Gn,e("p",null,[i("它存储了缓存是否命中的信息，会设置在"),e("a",En,[i("响应头"),d(n)]),i("信息中，在调试中非常有用。")]),On,e("p",null,[Cn,i("在学习如何配置 "),Nn,i(" 之前，我们先来简单回顾下 "),Mn,i(" 的工作流程是怎么样的？它是如何进行加密保证安全的？"),Ln,i("1. 客户端（浏览器）访问 "),An,i(" 百度网站；2. 百度服务器返回 "),Un,i(" 使用的 "),Xn,i(" 证书；3. 浏览器验证 "),wn,i(" 证书是否为合法证书；4. 验证通过，证书合法，生成一串随机数并使用公钥（证书中提供的）进行加密；5. 发送公钥加密后的随机数给百度服务器；6. 百度服务器拿到密文，通过私钥进行解密，获取到随机数（公钥加密，"),e("a",Zn,[i("私钥解密"),d(n)]),i("，反之也可以）；7. 百度服务器把要发送给浏览器的内容，使用随机数进行"),e("a",Yn,[i("加密"),d(n)]),i("后传输给浏览器；8. 此时浏览器可以使用随机数进行解密，获取到服务器的真实传输内容；这就是 "),Vn,i(" 的基本运作原理，使用"),e("a",Hn,[i("对称加密"),d(n)]),i("和非对称机密配合使用，保证传输内容的安全性。")]),qn,e("h3",Fn,[Bn,i(),Sn,i("先简单回顾下跨域究竟是怎么回事。"),Wn,i("同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在"),e("a",Dn,[i("恶意文件"),d(n)]),i("的重要安全机制。通常不允许不同源间的"),e("a",Tn,[i("读操作"),d(n)]),i("。"),Pn,i("如果两个页面的协议，端口（如果有指定）和域名都相同，则两个页面具有相同的源。下面给出了与 URL "),$n,i(" 的源进行对比的示例")]),Kn,e("p",null,[i("关于 "),Qn,i(" 的实际应用就学习到这里，相信通过掌握了 "),ed,i(" 核心配置以及实战配置，之后再遇到什么需求，我们也能轻松应对。接下来，让我们再深入一点学习下 "),id,i(" 的架构。"),nd,e("a",dd,[i("多进程结构"),d(n)]),i(),sd,i(" 的进程模型图：")]),ld,e("p",null,[i("多进程中的 "),cd,i(" 进程架构如下图所示，会有一个"),e("a",rd,[i("父进程"),d(n)]),i("（ "),td,i(" ），它会有很多子进程（ "),ad,i(" ）。")]),e("ul",null,[e("li",null,[od,e("ul",null,[vd,e("li",null,[i("某个配置文件被修改了 "),ud,i(" 进程会去通知 "),md,i(" 进程获取新的配置信息，这也就是我们所说的"),e("a",bd,[i("热部署"),d(n)]),i("。")])])]),hd]),pd,e("p",null,[_d,i(" 的内部结构是由核心部分和一系列的功能模块所组成。这样划分是为了使得每个模块的功能相对简单，便于开发，同时也便于对系统进行功能扩展。"),gd,i(" 的模块是互相独立的,低耦合"),e("a",xd,[i("高内聚"),d(n)]),i("。")]),Id,kd])}const Rd=c(z,[["render",zd],["__file","guide.html.vue"]]);export{Rd as default};
