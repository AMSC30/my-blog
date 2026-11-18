import{_ as a,p as s,q as n,Y as e}from"./framework-e1bed10d.js";const t="/my-blog/assets/mysqladmin-b8255c32.png",p={},l=e(`<h1 id="_15mysql管理" tabindex="-1"><a class="header-anchor" href="#_15mysql管理" aria-hidden="true">#</a> 15MySQL管理</h1><h2 id="系统数据库" tabindex="-1"><a class="header-anchor" href="#系统数据库" aria-hidden="true">#</a> 系统数据库</h2><p>Mysql数据库安装完成后，自带了一下四个数据库，具体作用如下：</p><table><thead><tr><th>数据库</th><th>含义</th></tr></thead><tbody><tr><td>mysql</td><td>存储MySQL服务器正常运行所需要的各种信息 （时区、主从、用户、权限等）</td></tr><tr><td>information_schema</td><td>提供了访问数据库元数据的各种表和视图，包含数据库、表、字段类型及访问权限等</td></tr><tr><td>performance_schema</td><td>为MySQL服务器运行时状态提供了一个底层监控功能，主要用于收集数据库服务器性能参数</td></tr><tr><td>sys</td><td>包含了一系列方便 DBA 和开发人员利用 performance_schema性能数据库进行性能调优和诊断的视图</td></tr></tbody></table><h2 id="常用工具" tabindex="-1"><a class="header-anchor" href="#常用工具" aria-hidden="true">#</a> 常用工具</h2><h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h3><p>该mysql不是指mysql服务，而是指mysql的客户端工具</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>语法 ： 
 mysql <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>database<span class="token punctuation">]</span>
选项 ： 
 -u, <span class="token parameter variable">--user</span><span class="token operator">=</span>name <span class="token comment">#指定用户名</span>
 -p, --password<span class="token punctuation">[</span><span class="token operator">=</span>name<span class="token punctuation">]</span> <span class="token comment">#指定密码</span>
 -h, <span class="token parameter variable">--host</span><span class="token operator">=</span>name <span class="token comment">#指定服务器IP或域名</span>
 -P, <span class="token parameter variable">--port</span><span class="token operator">=</span>port <span class="token comment">#指定连接端口</span>
 -e, <span class="token parameter variable">--execute</span><span class="token operator">=</span>name <span class="token comment">#执行SQL语句并退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-e选项可以在Mysql客户端执行SQL语句，而不用连接到MySQL数据库再执行，对于一些批处理脚本，这种方式尤其方便</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql <span class="token parameter variable">-uroot</span> –p123456 db01 <span class="token parameter variable">-e</span> <span class="token string">&quot;select * from stu&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="mysqladmin" tabindex="-1"><a class="header-anchor" href="#mysqladmin" aria-hidden="true">#</a> mysqladmin</h3><p>mysqladmin 是一个执行管理操作的客户端程序。可以用它来检查服务器的配置和当前状态、创建并删除数据库等</p><p>通过<code>mysqladmin --help</code>可以查看支持的选项和命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>语法: 
 mysqladmin <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token builtin class-name">command</span> <span class="token punctuation">..</span>.
选项:
 -u, <span class="token parameter variable">--user</span><span class="token operator">=</span>name <span class="token comment">#指定用户名</span>
 -p, --password<span class="token punctuation">[</span><span class="token operator">=</span>name<span class="token punctuation">]</span> <span class="token comment">#指定密码</span>
 -h, <span class="token parameter variable">--host</span><span class="token operator">=</span>name <span class="token comment">#指定服务器IP或域名</span>
 -P, <span class="token parameter variable">--port</span><span class="token operator">=</span>port <span class="token comment">#指定连接端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>支持的命令 <img src="`+t+`" alt="mysqladmin"></p><h3 id="mysqlbinlog" tabindex="-1"><a class="header-anchor" href="#mysqlbinlog" aria-hidden="true">#</a> mysqlbinlog</h3><p>由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使用到mysqlbinlog 日志管理工具</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>语法 ：
mysqlbinlog <span class="token punctuation">[</span>options<span class="token punctuation">]</span> log-files1 log-files2 <span class="token punctuation">..</span>.
选项 ：
-d, <span class="token parameter variable">--database</span><span class="token operator">=</span>name 指定数据库名称，只列出指定的数据库相关操作
-o, <span class="token parameter variable">--offset</span><span class="token operator">=</span><span class="token comment"># 忽略掉日志中的前n行命令</span>
-r,--result-file<span class="token operator">=</span>name 将输出的文本格式日志输出到指定文件
-s, --short-form 显示简单格式， 省略掉一些信息
--start-datatime<span class="token operator">=</span>date1 --stop-datetime<span class="token operator">=</span>date2 指定日期间隔内的所有日志
--start-position<span class="token operator">=</span>pos1 --stop-position<span class="token operator">=</span>pos2 指定位置间隔内的所有日志
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mysqlshow" tabindex="-1"><a class="header-anchor" href="#mysqlshow" aria-hidden="true">#</a> mysqlshow</h3><p>mysqlshow 客户端对象查找工具，用来很快地查找存在哪些数据库、数据库中的表、表中的列或者索引</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>语法 ：
mysqlshow <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>db_name <span class="token punctuation">[</span>table_name <span class="token punctuation">[</span>col_name<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
选项 ：
<span class="token parameter variable">--count</span> 显示数据库及表的统计信息（数据库，表 均可以不指定）
<span class="token parameter variable">-i</span> 显示指定数据库或者指定表的状态信息

<span class="token comment"># 示例：</span>
<span class="token comment">#查询test库中每个表中的字段书，及行数</span>
mysqlshow <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p2143</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">--count</span>
<span class="token comment">#查询test库中book表的详细情况</span>
mysqlshow <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p2143</span> <span class="token builtin class-name">test</span> book <span class="token parameter variable">--count</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mysqldump" tabindex="-1"><a class="header-anchor" href="#mysqldump" aria-hidden="true">#</a> mysqldump</h3><p>mysqldump 客户端工具用来备份数据库或在不同数据库之间进行数据迁移。备份内容包含创建表，及插入表的SQL语句</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#语法 ：</span>
mysqldump <span class="token punctuation">[</span>options<span class="token punctuation">]</span> db_name <span class="token punctuation">[</span>tables<span class="token punctuation">]</span>
mysqldump <span class="token punctuation">[</span>options<span class="token punctuation">]</span> --database/-B db1 <span class="token punctuation">[</span>db2 db3<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
mysqldump <span class="token punctuation">[</span>options<span class="token punctuation">]</span> --all-databases/-A
<span class="token comment">#连接选项 ：</span>
-u, <span class="token parameter variable">--user</span><span class="token operator">=</span>name 指定用户名
-p, --password<span class="token punctuation">[</span><span class="token operator">=</span>name<span class="token punctuation">]</span> 指定密码
-h, <span class="token parameter variable">--host</span><span class="token operator">=</span>name 指定服务器ip或域名
-P, <span class="token parameter variable">--port</span><span class="token operator">=</span>port 指定连接端口
<span class="token comment">#输出选项：</span>
--add-drop-database 在每个数据库创建语句前加上 drop database 语句
--add-drop-table 在每个表创建语句前加上 drop table 语句 , 默认开启 <span class="token punctuation">;</span> 不开启 <span class="token punctuation">(</span>--skip-add-drop-table<span class="token punctuation">)</span>
-n, --no-create-db 不包含数据库的创建语句
-t, --no-create-info 不包含数据表的创建语句
<span class="token parameter variable">-d</span> --no-data 不包含数据
-T, <span class="token parameter variable">--tab</span><span class="token operator">=</span>name 自动生成两个文件：一个.sql文件，创建表结构的语句；一个.txt文件，数据文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mysqlimport" tabindex="-1"><a class="header-anchor" href="#mysqlimport" aria-hidden="true">#</a> mysqlimport</h3><p>mysqlimport 是客户端数据导入工具，用来导入mysqldump 加 -T 参数后导出的文本文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法 ：</span>
mysqlimport <span class="token punctuation">[</span>options<span class="token punctuation">]</span> db_name textfile1 <span class="token punctuation">[</span>textfile2<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token comment"># 示例 ：</span>
mysqlimport <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p2143</span> <span class="token builtin class-name">test</span> /tmp/city.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="source" tabindex="-1"><a class="header-anchor" href="#source" aria-hidden="true">#</a> source</h3><p>如果需要导入sql文件,可以使用mysql中的source 指令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法 ：</span>
<span class="token builtin class-name">source</span> /root/xxxxx.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,30),i=[l];function o(r,c){return s(),n("div",null,i)}const m=a(p,[["render",o],["__file","15manage.html.vue"]]);export{m as default};
