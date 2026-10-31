import{_ as n,p as e,q as s,Y as a}from"./framework-e1bed10d.js";const i={},d=a(`<h1 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h1><p>Redis是一个基于<code>内存</code>的<code>key-value</code>数据库</p><h2 id="操作命令" tabindex="-1"><a class="header-anchor" href="#操作命令" aria-hidden="true">#</a> 操作命令</h2><h3 id="字符串操作命令" tabindex="-1"><a class="header-anchor" href="#字符串操作命令" aria-hidden="true">#</a> 字符串操作命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 增</span>
SET key value            设置key和value
SETEX key seconds value  设置key和value，在seconds秒后过期
SETNX key value          当key不存在时，设置key的值为value

<span class="token comment"># 查</span>
GET key                  根据key获取value

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hash操作命令" tabindex="-1"><a class="header-anchor" href="#hash操作命令" aria-hidden="true">#</a> Hash操作命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 增</span>
HSET KEY FIELD VALUE    将哈希表key中的field设置为value

<span class="token comment"># 删</span>
HDEL KEY FIELD          删除哈希表key中的field，当删除完以后，key也就不存在了

<span class="token comment"># 查</span>
HGET KEY FIELD          查询哈希表key中的field
HKEYS KEY               查询哈希表key中的所有key
HVALS KEY               查询哈希表key中所有的value

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="列表操作命令" tabindex="-1"><a class="header-anchor" href="#列表操作命令" aria-hidden="true">#</a> 列表操作命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 增</span>
LPUSH KEY VALUE1 VALUE2 <span class="token punctuation">..</span>. VALUEN   向key中按顺序插入到列表头部

<span class="token comment"># 删</span>
RPOP KEY                            删除并获取key的最后一个值

<span class="token comment"># 查</span>
LRANGE KEY START STOP               获取指定范围的值
LLEN KEY                            获取key中值的个数

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="集合操作命令" tabindex="-1"><a class="header-anchor" href="#集合操作命令" aria-hidden="true">#</a> 集合操作命令</h4><p>集合是string类型的无序集合，在集合中元素不能重复</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 增</span>
SADD key value1 value2 <span class="token punctuation">[</span><span class="token punctuation">..</span>.valueN<span class="token punctuation">]</span>    向集合中插入元素

<span class="token comment"># 删</span>
SREM KEY VALUE1 <span class="token punctuation">[</span><span class="token punctuation">..</span>.VALUEN<span class="token punctuation">]</span>           删除集合中一个或多个成员

<span class="token comment"># 查</span>
SMENBERS KEY                          返回集合中的所有元素
SCARD KEY                             获取集合中的成员数量
SINTER KEY1 <span class="token punctuation">[</span>KEY2<span class="token punctuation">]</span>                    返回所有给定集合的交集
SUNION KEY1 <span class="token punctuation">[</span>KEY2<span class="token punctuation">]</span>                    返回给定集合的并集
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="有序集合操作命令" tabindex="-1"><a class="header-anchor" href="#有序集合操作命令" aria-hidden="true">#</a> 有序集合操作命令</h4><p>有序集合是string类型的集合，不允许有重复成员，每个元素通过指定一个分数作为排序依据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 增</span>
ZADD KEY SCORE1 VALUE1 <span class="token punctuation">[</span><span class="token punctuation">..</span>.SCOREN VALUEN<span class="token punctuation">]</span>    向key中添加元素
ARANGE KEY START STOP                        通过索引返回集合中的成员
ZINCRBY KEY INCREMENT VALUE                  有序集合中对指定成员的分数加上增量increment
ZREM KEY VALUE1 <span class="token punctuation">[</span><span class="token punctuation">..</span>.VALUEN<span class="token punctuation">]</span>                  移除集合中的成员
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通用命令" tabindex="-1"><a class="header-anchor" href="#通用命令" aria-hidden="true">#</a> 通用命令</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>KEYS PATTERN        查找符合给定格式的所有key
EXISTS KEY          检查给定key是否存在
TYPE KEY            返回key所存储的值的类型
DEL KEY             如果key存在，则删除key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),l=[d];function c(r,u){return e(),s("div",null,l)}const t=n(i,[["render",c],["__file","redis-base.html.vue"]]);export{t as default};
