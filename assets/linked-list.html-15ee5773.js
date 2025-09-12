import{_ as t,p as o,q as c,s as n,R as s,t as p,Y as a,n as l}from"./framework-e1bed10d.js";const i={},u=a(`<h1 id="链表算法案例" tabindex="-1"><a class="header-anchor" href="#链表算法案例" aria-hidden="true">#</a> 链表算法案例</h1><h2 id="解题分析" tabindex="-1"><a class="header-anchor" href="#解题分析" aria-hidden="true">#</a> 解题分析</h2><p><strong>1. 一个原则</strong></p><p>一个原则就是 画图，尤其是对于新手来说。不管是简单题还是难题一定要画图，这是贯穿链表题目的一个准则。 画图可以减少我们的认知负担，这其实和打草稿，备忘录道理是一样的，将存在脑子里的东西放到纸上。举一个不太恰当的例子就是你的脑子就是 CPU，脑子的记忆就是寄存器。寄存器的容量有限，我们需要把不那么频繁使用的东西放到内存，把寄存器用在真正该用的地方，这个内存就是纸或者电脑平板等一切你可以画图的东西。 画的好看不好看都不重要，能看清就行了。用笔随便勾画一下， 能看出关系就够了</p><p><strong>2. 两个考点</strong></p><p>除了设计类题目，其考点无法就两点：</p><ul><li><strong>指针的修改</strong></li></ul><p>其中指针修改最典型的就是链表反转。其实链表反转就是修改指针，对于数组这种支持随机访问的数据结构来说， 反转很容易， 只需要头尾不断交换即可</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">reverseArray</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>left<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>right<span class="token operator">--</span><span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> arr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而对于链表：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">reverse</span> <span class="token operator">=</span> <span class="token parameter">head</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> pre <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">let</span> next <span class="token operator">=</span> head<span class="token punctuation">.</span>next
    <span class="token keyword">while</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">{</span>
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> pre
        pre <span class="token operator">=</span> head
        head <span class="token operator">=</span> next
        next <span class="token operator">=</span> head<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> pre
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>链表的拼接</strong></li></ul><p>链表的价值就在于其不必要求物理内存的连续性，以及对插入和删除的友好</p><p><strong>3. 三个注意</strong></p><p>链表最容易出错的地方就是我们应该注意的地方。链表最容易出的错 90 % 集中在以下三种情况：</p><ul><li><p><strong>出现了环，造成死循环</strong></p></li><li><p><strong>分不清边界，导致边界条件出错</strong></p></li><li><p><strong>搞不懂递归怎么做</strong></p></li></ul><p><strong>4. 四个技巧</strong></p><ul><li><p><strong>虚拟头</strong></p></li><li><p><strong>快慢指针</strong></p></li><li><p><strong>穿针引线</strong></p></li><li><p><strong>先穿再排后判空</strong></p></li></ul><h2 id="移除链表元素" tabindex="-1"><a class="header-anchor" href="#移除链表元素" aria-hidden="true">#</a> 移除链表元素</h2>`,19),r={href:"https://leetcode.cn/problems/remove-linked-list-elements/",target:"_blank",rel:"noopener noreferrer"},d=a(`<p>删除链表中等于给定值 val 的所有节点</p><p>代码示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">LinkNode</span> <span class="token punctuation">{</span>
   <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val<span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
* Initialize your data structure here.
* 单链表 储存头尾节点 和 节点数量
*/</span>
<span class="token keyword">var</span> <span class="token function-variable function">MyLinkedList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">index</span>
* <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
*/</span>
<span class="token class-name">MyLinkedList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getNode</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token comment">// 创建虚拟头节点</span>
   <span class="token keyword">let</span> cur <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">// 0 -&gt; head</span>
   <span class="token keyword">while</span><span class="token punctuation">(</span>index<span class="token operator">--</span> <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> cur<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">MyLinkedList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">get</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token comment">// 获取当前节点</span>
   <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getNode</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span>val<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">val</span>
* <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span>
*/</span>
<span class="token class-name">MyLinkedList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">addAtHead</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkNode</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_tail<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* Append a node of value val to the last element of the linked list. 
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">val</span>
* <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span>
*/</span>
<span class="token class-name">MyLinkedList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">addAtTail</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkNode</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_tail<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>_tail<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
       <span class="token keyword">return</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">index</span> 
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">val</span>
* <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span>
*/</span>
<span class="token class-name">MyLinkedList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">addAtIndex</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addAtHead</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addAtTail</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// 获取目标节点的上一个的节点</span>
   <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getNode</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   node<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkNode</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> node<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* Delete the index-th node in the linked list, if the index is valid. 
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">index</span>
* <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span>
*/</span>
<span class="token class-name">MyLinkedList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">deleteAtIndex</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
       <span class="token comment">// 如果删除的这个节点同时是尾节点，要处理尾节点</span>
       <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head
       <span class="token punctuation">}</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">--</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// 获取目标节点的上一个的节点</span>
   <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getNode</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
   node<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
   <span class="token comment">// 处理尾节点</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">--</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// MyLinkedList.prototype.out = function() {</span>
<span class="token comment">//     let cur = this._head;</span>
<span class="token comment">//     const res = [];</span>
<span class="token comment">//     while(cur) {</span>
<span class="token comment">//         res.push(cur.val);</span>
<span class="token comment">//         cur = cur.next;</span>
<span class="token comment">//     }</span>
<span class="token comment">// };</span>
<span class="token doc-comment comment">/**
* Your MyLinkedList object will be instantiated and called as such:
* var obj = new MyLinkedList()
* var param_1 = obj.get(index)
* obj.addAtHead(val)
* obj.addAtTail(val)
* obj.addAtIndex(index,val)
* obj.deleteAtIndex(index)
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反转链表" tabindex="-1"><a class="header-anchor" href="#反转链表" aria-hidden="true">#</a> 反转链表</h2>`,4),k={href:"https://leetcode.cn/problems/reverse-linked-list/",target:"_blank",rel:"noopener noreferrer"},v=a(`<p>反转一个单链表</p><p>代码示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">reverseList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> pre <span class="token operator">=</span> <span class="token keyword">null</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> next <span class="token operator">=</span> head<span class="token punctuation">.</span>next
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> pre
        pre <span class="token operator">=</span> head
        head <span class="token operator">=</span> next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> pre
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="两两交换链表中的节点" tabindex="-1"><a class="header-anchor" href="#两两交换链表中的节点" aria-hidden="true">#</a> 两两交换链表中的节点</h2>`,4),m={href:"https://leetcode.cn/problems/swap-nodes-in-pairs/",target:"_blank",rel:"noopener noreferrer"},b=a(`<p>给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换</p><p>代码示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">swapPairs</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> temp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>head<span class="token punctuation">)</span>
    <span class="token keyword">let</span> op <span class="token operator">=</span> temp
    <span class="token keyword">while</span><span class="token punctuation">(</span>op<span class="token punctuation">.</span>next <span class="token operator">&amp;&amp;</span> op<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> pre <span class="token operator">=</span> op<span class="token punctuation">.</span>next<span class="token punctuation">,</span>cur <span class="token operator">=</span> op<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        pre<span class="token punctuation">.</span>next <span class="token operator">=</span> cur<span class="token punctuation">.</span>next
        cur<span class="token punctuation">.</span>next <span class="token operator">=</span> pre
        op<span class="token punctuation">.</span>next <span class="token operator">=</span> cur
        op <span class="token operator">=</span> pre
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> temp<span class="token punctuation">.</span>next
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除链表的倒数第-n-个结点" tabindex="-1"><a class="header-anchor" href="#删除链表的倒数第-n-个结点" aria-hidden="true">#</a> 删除链表的倒数第 N 个结点</h2>`,4),h={href:"https://leetcode.cn/problems/remove-nth-node-from-end-of-list/",target:"_blank",rel:"noopener noreferrer"},w=a(`<p>给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点</p><p>代码示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">removeNthFromEnd</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> fast<span class="token operator">=</span> slow <span class="token operator">=</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>head<span class="token punctuation">)</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>fast<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       count<span class="token operator">++</span>
       fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next

       <span class="token keyword">if</span><span class="token punctuation">(</span>count <span class="token operator">&gt;</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
           slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">if</span><span class="token punctuation">(</span>count<span class="token operator">&gt;=</span>n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        slow<span class="token punctuation">.</span>next <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> newNode<span class="token punctuation">.</span>next
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链表相交" tabindex="-1"><a class="header-anchor" href="#链表相交" aria-hidden="true">#</a> 链表相交</h2>`,4),y={href:"https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/",target:"_blank",rel:"noopener noreferrer"},f=a(`<p>给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null</p><p>代码示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">getIntersectionNode</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">headA<span class="token punctuation">,</span> headB</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

   <span class="token keyword">if</span><span class="token punctuation">(</span>headA<span class="token operator">===</span><span class="token keyword">null</span><span class="token operator">||</span>headB<span class="token operator">===</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>

   <span class="token keyword">let</span> aLen <span class="token operator">=</span> <span class="token number">1</span>
   <span class="token keyword">let</span> bLen <span class="token operator">=</span> <span class="token number">1</span>
   <span class="token keyword">let</span> tempA <span class="token operator">=</span> headA
   <span class="token keyword">let</span> tempB <span class="token operator">=</span> headB
   <span class="token keyword">while</span><span class="token punctuation">(</span>tempA<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">{</span>
       aLen<span class="token operator">++</span>
       tempA <span class="token operator">=</span> tempA<span class="token punctuation">.</span>next
   <span class="token punctuation">}</span>
   <span class="token keyword">while</span><span class="token punctuation">(</span>tempB<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">{</span>
       bLen<span class="token operator">++</span>
       tempB <span class="token operator">=</span> tempB<span class="token punctuation">.</span>next
   <span class="token punctuation">}</span>

   <span class="token keyword">let</span> interval <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>aLen<span class="token operator">-</span>bLen<span class="token punctuation">)</span>

   <span class="token keyword">if</span><span class="token punctuation">(</span>aLen<span class="token operator">&gt;</span>bLen<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>interval<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           headA <span class="token operator">=</span> headA<span class="token punctuation">.</span>next
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
       <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>interval<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           headB <span class="token operator">=</span> headB<span class="token punctuation">.</span>next
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">while</span><span class="token punctuation">(</span>headA<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">if</span><span class="token punctuation">(</span>headA<span class="token operator">===</span>headB<span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token keyword">return</span> headA
       <span class="token punctuation">}</span>
       headA <span class="token operator">=</span> headA<span class="token punctuation">.</span>next
       headB <span class="token operator">=</span> headB<span class="token punctuation">.</span>next
   <span class="token punctuation">}</span>

   <span class="token keyword">return</span> <span class="token keyword">null</span>


<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function x(g,_){const e=l("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[s("链接："),n("a",r,[s("https://leetcode.cn/problems/remove-linked-list-elements/"),p(e)])]),d,n("p",null,[s("链接："),n("a",k,[s("https://leetcode.cn/problems/reverse-linked-list/"),p(e)])]),v,n("p",null,[s("链接："),n("a",m,[s("https://leetcode.cn/problems/swap-nodes-in-pairs/"),p(e)])]),b,n("p",null,[s("链接："),n("a",h,[s("https://leetcode.cn/problems/remove-nth-node-from-end-of-list/"),p(e)])]),w,n("p",null,[s("链接："),n("a",y,[s("https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/"),p(e)])]),f])}const A=t(i,[["render",x],["__file","linked-list.html.vue"]]);export{A as default};
