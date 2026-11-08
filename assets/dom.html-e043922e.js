import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const e={},p=t(`<h1 id="dom" tabindex="-1"><a class="header-anchor" href="#dom" aria-hidden="true">#</a> DOM</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Node 接口
所有 <span class="token constant">DOM</span> 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。这是 <span class="token constant">DOM</span> 操作的基础。
节点属性
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>nodeType
nodeType属性返回一个整数值，表示节点的类型。
document<span class="token punctuation">.</span>nodeType <span class="token comment">// 9</span>

上面代码中，文档节点的类型值为<span class="token number">9</span>。
Node 对象定义了几个常量，对应这些类型值。
document<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> Node<span class="token punctuation">.</span><span class="token constant">DOCUMENT_NODE</span> <span class="token comment">// true</span>

上面代码中，文档节点的nodeType属性等于常量Node<span class="token punctuation">.</span><span class="token constant">DOCUMENT_NODE</span>。
不同节点的nodeType属性值和对应的常量如下。

<span class="token operator">-</span> 文档节点（document）：<span class="token number">9</span>，对应常量Node<span class="token punctuation">.</span><span class="token constant">DOCUMENT_NODE</span>
<span class="token operator">-</span> 元素节点（element）：<span class="token number">1</span>，对应常量Node<span class="token punctuation">.</span><span class="token constant">ELEMENT_NODE</span>
<span class="token operator">-</span> 属性节点（attr）：<span class="token number">2</span>，对应常量Node<span class="token punctuation">.</span><span class="token constant">ATTRIBUTE_NODE</span>
<span class="token operator">-</span> 文本节点（text）：<span class="token number">3</span>，对应常量Node<span class="token punctuation">.</span><span class="token constant">TEXT_NODE</span>
<span class="token operator">-</span> 文档片断节点（DocumentFragment）：<span class="token number">11</span>，对应常量Node<span class="token punctuation">.</span><span class="token constant">DOCUMENT_FRAGMENT_NODE</span>
<span class="token operator">-</span> 文档类型节点（DocumentType）：<span class="token number">10</span>，对应常量Node<span class="token punctuation">.</span><span class="token constant">DOCUMENT_TYPE_NODE</span>
<span class="token operator">-</span> 注释节点（Comment）：<span class="token number">8</span>，对应常量Node<span class="token punctuation">.</span><span class="token constant">COMMENT_NODE</span>
确定节点类型时，使用nodeType属性是常用方法。
<span class="token keyword">var</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>firstChild<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> Node<span class="token punctuation">.</span><span class="token constant">ELEMENT_NODE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;该节点是元素节点&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>nodeName
nodeName属性返回节点的名称。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;d1&quot;&gt;hello world&lt;/div&gt;</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;d1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;DIV&quot;</span>

上面代码中，元素节点<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>的nodeName属性就是大写的标签名<span class="token constant">DIV</span>。
不同节点的nodeName属性值如下。

<span class="token operator">-</span> 文档节点（document）：#document
<span class="token operator">-</span> 元素节点（element）：大写的标签名
<span class="token operator">-</span> 属性节点（attr）：属性的名称
<span class="token operator">-</span> 文本节点（text）：#text
<span class="token operator">-</span> 文档片断节点（DocumentFragment）：#document<span class="token operator">-</span>fragment
<span class="token operator">-</span> 文档类型节点（DocumentType）：文档的类型
<span class="token operator">-</span> 注释节点（Comment）：#comment
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>nodeValue
nodeValue属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。
只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的nodeValue可以返回结果，其他类型的节点一律返回<span class="token keyword">null</span>。同样的，也只有这三类节点可以设置nodeValue属性的值，其他类型的节点设置无效。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;d1&quot;&gt;hello world&lt;/div&gt;</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;d1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span>nodeValue <span class="token comment">// null</span>
div<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>nodeValue <span class="token comment">// &quot;hello world&quot;</span>

<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>textContent
textContent属性返回当前节点和它的所有后代节点的文本内容。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div id=&quot;divA&quot;&gt;This is &lt;span&gt;some&lt;/span&gt; text&lt;/div&gt;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;divA&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>textContent
<span class="token comment">// This is some text</span>

textContent属性自动忽略当前节点内部的 <span class="token constant">HTML</span> 标签，返回所有文本内容。
该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 <span class="token constant">HTML</span> 标签转义。这很适合用于用户提供的内容。
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>textContent <span class="token operator">=</span> <span class="token string">&#39;&lt;p&gt;GoodBye!&lt;/p&gt;&#39;</span><span class="token punctuation">;</span>

对于文本节点（text）、注释节点（comment）和属性节点（attr），textContent属性的值与nodeValue属性相同。对于其他类型的节点，该属性会将每个子节点（不包括注释节点）的内容连接在一起返回。如果一个节点没有子节点，则返回空字符串。
文档节点（document）和文档类型节点（doctype）的textContent属性为<span class="token keyword">null</span>。如果要读取整个文档的内容，可以使用document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>textContent。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>baseURI
baseURI属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径的 <span class="token constant">URL</span>。该属性为只读。
<span class="token comment">// 当前网页的网址为</span>
<span class="token comment">// &lt;http://www.example.com/index.html&gt;</span>
document<span class="token punctuation">.</span>baseURI
<span class="token comment">// &quot;http://www.example.com/index.html&quot;</span>

该属性的值一般由当前网址的 <span class="token constant">URL</span>（即window<span class="token punctuation">.</span>location属性）决定，但是可以使用 <span class="token constant">HTML</span> 的<span class="token operator">&lt;</span>base<span class="token operator">&gt;</span>标签，改变该属性的值。
<span class="token operator">&lt;</span>base href<span class="token operator">=</span><span class="token string">&quot;http://www.example.com/page.html&quot;</span><span class="token operator">&gt;</span>

设置了以后，baseURI属性就返回<span class="token operator">&lt;</span>base<span class="token operator">&gt;</span>标签设置的值。
节点关系
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>ownerDocument
Node<span class="token punctuation">.</span>ownerDocument属性返回当前节点所在的顶层文档对象，即document对象。
<span class="token keyword">var</span> d <span class="token operator">=</span> p<span class="token punctuation">.</span>ownerDocument<span class="token punctuation">;</span>
d <span class="token operator">===</span> document <span class="token comment">// true</span>

document对象本身的ownerDocument属性，返回<span class="token keyword">null</span>。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>nextSibling
Node<span class="token punctuation">.</span>nextSibling属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;d1&quot;&gt;hello&lt;/div&gt;&lt;div id=&quot;d2&quot;&gt;world&lt;/div&gt;</span>
<span class="token keyword">var</span> d1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;d1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> d2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;d2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

d1<span class="token punctuation">.</span>nextSibling <span class="token operator">===</span> d2 <span class="token comment">// true</span>

注意，该属性还包括文本节点和注释节点（<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> comment <span class="token operator">--</span><span class="token operator">&gt;</span>）。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。
nextSibling属性可以用来遍历所有子节点。
<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>firstChild<span class="token punctuation">;</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>el <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>nodeName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  el <span class="token operator">=</span> el<span class="token punctuation">.</span>nextSibling<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>previousSibling
previousSibling属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;d1&quot;&gt;hello&lt;/div&gt;&lt;div id=&quot;d2&quot;&gt;world&lt;/div&gt;</span>
<span class="token keyword">var</span> d1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;d1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> d2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;d2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

d2<span class="token punctuation">.</span>previousSibling <span class="token operator">===</span> d1 <span class="token comment">// true</span>

上面代码中，d2<span class="token punctuation">.</span>previousSibling就是d2前面的同级节点d1。
注意，该属性还包括文本节点和注释节点。因此如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>parentNode
parentNode属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。
<span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>parentNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  node<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

文档节点（document）和文档片段节点（documentfragment）的父节点都是<span class="token keyword">null</span>。另外，对于那些生成后还没插入 <span class="token constant">DOM</span> 树的节点，父节点也是<span class="token keyword">null</span>。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>parentElement
parentElement属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回<span class="token keyword">null</span>，主要用于ie浏览器中。
<span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>parentElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  node<span class="token punctuation">.</span>parentElement<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点（documentfragment）。parentElement属性相当于把后两种父节点都排除了。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>firstChild，Node<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>lastChild
firstChild属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;p id=&quot;p1&quot;&gt;&lt;span&gt;First span&lt;/span&gt;&lt;/p&gt;</span>
<span class="token keyword">var</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;p1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p1<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;SPAN&quot;</span>

上面代码中，p元素的第一个子节点是span元素。
注意，firstChild返回的除了元素节点，还可能是文本节点或注释节点。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;p id=&quot;p1&quot;&gt;</span>
<span class="token comment">//   &lt;span&gt;First span&lt;/span&gt;</span>
<span class="token comment">//  &lt;/p&gt;</span>
<span class="token keyword">var</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;p1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p1<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;#text&quot;</span>

上面代码中，p元素与span元素之间有空白字符，这导致firstChild返回的是文本节点。
lastChild属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回<span class="token keyword">null</span>。用法与firstChild属性相同。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>childNodes
childNodes属性返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点。
<span class="token keyword">var</span> children <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>

上面代码中，children就是ul元素的所有子节点。
使用该属性，可以遍历某个节点的所有子节点。
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> children <span class="token operator">=</span> div<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

文档节点（document）就有两个子节点：文档类型节点（docType）和 <span class="token constant">HTML</span> 根元素节点。
<span class="token keyword">var</span> children <span class="token operator">=</span> document<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>nodeType<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 10</span>
<span class="token comment">// 1</span>

上面代码中，文档节点的第一个子节点的类型是<span class="token number">10</span>（即文档类型节点），第二个子节点的类型是<span class="token number">1</span>（即元素节点）。
注意，除了元素节点，childNodes属性的返回值还包括文本节点和注释节点。如果当前节点不包括任何子节点，则返回一个空的NodeList集合。由于NodeList对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>isConnected
isConnected属性返回一个布尔值，表示当前节点是否在文档之中。
<span class="token keyword">var</span> test <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
test<span class="token punctuation">.</span>isConnected <span class="token comment">// false</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span>
test<span class="token punctuation">.</span>isConnected <span class="token comment">// true</span>

节点操作
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>

如果参数节点是 <span class="token constant">DOM</span> <span class="token function">已经存在的节点，appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法会将其从原来的位置，移动到新位置。
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>div<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">如果appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的参数是DocumentFragment节点，那么插入的是DocumentFragment的所有子节点，而不是DocumentFragment节点本身。返回值是一个空的DocumentFragment节点。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasChildNodes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
hasChildNodes方法返回一个布尔值，表示当前节点是否有子节点。
<span class="token keyword">var</span> foo <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>foo<span class="token punctuation">.</span><span class="token function">hasChildNodes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>childNodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

注意，子节点包括所有类型的节点，并不仅仅是元素节点。哪怕节点只包含一个空格，hasChildNodes方法也会返回<span class="token boolean">true</span>。
判断一个节点有没有子节点，有许多种方法，下面是其中的三种。

<span class="token operator">-</span> node<span class="token punctuation">.</span><span class="token function">hasChildNodes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> node<span class="token punctuation">.</span>firstChild <span class="token operator">!==</span> <span class="token keyword">null</span>
<span class="token operator">-</span> node<span class="token punctuation">.</span>childNodes <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span>
hasChildNodes方法结合firstChild属性和nextSibling属性，可以遍历当前节点的所有后代节点。
<span class="token keyword">function</span> <span class="token function">DOMComb</span><span class="token punctuation">(</span><span class="token parameter">parent<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span><span class="token function">hasChildNodes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> node <span class="token operator">=</span> parent<span class="token punctuation">.</span>firstChild<span class="token punctuation">;</span> node<span class="token punctuation">;</span> node <span class="token operator">=</span> node<span class="token punctuation">.</span>nextSibling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">DOMComb</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">callback</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 用法</span>
<span class="token function">DOMComb</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">,</span> console<span class="token punctuation">.</span>log<span class="token punctuation">)</span>

<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。
<span class="token keyword">var</span> cloneUL <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法有一些使用注意点。
（<span class="token number">1</span>）克隆一个节点，会拷贝该节点的所有属性，但是会丧失addEventListener方法和on<span class="token operator">-</span>属性（即node<span class="token punctuation">.</span>onclick <span class="token operator">=</span> fn），添加在这个节点上的事件回调函数。
（<span class="token number">2</span>）该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如Node<span class="token punctuation">.</span>appendChild这样的方法添加到文档之中。
（<span class="token number">3</span>）克隆一个节点之后，<span class="token constant">DOM</span> 有可能出现两个有相同id属性（即id<span class="token operator">=</span><span class="token string">&quot;xxx&quot;</span>）的网页元素，这时应该修改其中一个元素的id属性。如果原节点有name属性，可能也需要修改。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
insertBefore方法用于将某个节点插入父节点内部的指定位置。
<span class="token keyword">var</span> insertedNode <span class="token operator">=</span> parentNode<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> referenceNode<span class="token punctuation">)</span><span class="token punctuation">;</span>

insertBefore方法接受两个参数，第一个参数是所要插入的节点newNode，第二个参数是父节点parentNode内部的一个子节点referenceNode。newNode将插在referenceNode这个子节点的前面。返回值是插入的新节点newNode。
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>firstChild<span class="token punctuation">)</span><span class="token punctuation">;</span>

如果insertBefore方法的第二个参数为<span class="token keyword">null</span>，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，如果所要插入的节点是当前 <span class="token constant">DOM</span> 现有的节点，则该节点将从原有的位置移除，插入新的位置。
由于不存在insertAfter方法，如果新节点要插在父节点的某个子节点后面，可以用insertBefore方法结合nextSibling属性模拟。
parent<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s2<span class="token punctuation">.</span>nextSibling<span class="token punctuation">)</span><span class="token punctuation">;</span>

如果要插入的节点是DocumentFragment类型，那么插入的将是DocumentFragment的所有子节点，而不是DocumentFragment节点本身。返回值将是一个空的DocumentFragment节点。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
removeChild方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
<span class="token keyword">var</span> divA <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
divA<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>divA<span class="token punctuation">)</span><span class="token punctuation">;</span>

下面是如何移除当前节点的所有子节点。
<span class="token keyword">var</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;top&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>element<span class="token punctuation">.</span>firstChild<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  element<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>element<span class="token punctuation">.</span>firstChild<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

被移除的节点依然存在于内存之中，但不再是 <span class="token constant">DOM</span> 的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。
如果参数节点不是当前节点的子节点，removeChild方法将报错。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">replaceChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
replaceChild方法用于将一个新的节点，替换当前节点的某一个子节点。
<span class="token keyword">var</span> replacedNode <span class="token operator">=</span> parentNode<span class="token punctuation">.</span><span class="token function">replaceChild</span><span class="token punctuation">(</span>newChild<span class="token punctuation">,</span> oldChild<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，replaceChild方法接受两个参数，第一个参数newChild是用来替换的新节点，第二个参数oldChild是将要替换走的子节点。返回值是替换走的那个节点oldChild。
<span class="token keyword">var</span> divA <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;divA&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newSpan <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;span&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
newSpan<span class="token punctuation">.</span>textContent <span class="token operator">=</span> <span class="token string">&#39;Hello World!&#39;</span><span class="token punctuation">;</span>
divA<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">replaceChild</span><span class="token punctuation">(</span>newSpan<span class="token punctuation">,</span> divA<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
contains方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。

<span class="token operator">-</span> 参数节点为当前节点。
<span class="token operator">-</span> 参数节点为当前节点的子节点。
<span class="token operator">-</span> 参数节点为当前节点的后代节点。
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span>

上面代码检查参数节点node，是否包含在当前文档之中。
注意，当前节点传入contains方法，返回<span class="token boolean">true</span>。
nodeA<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>nodeA<span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">compareDocumentPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
compareDocumentPosition方法的用法，与contains方法完全一致，返回一个六个比特位的二进制值，表示参数节点与当前节点的关系。
二进制值
十进制值
含义
<span class="token number">000000</span>
<span class="token number">0</span>
两个节点相同
<span class="token number">000001</span>
<span class="token number">1</span>
两个节点不在同一个文档（即有一个节点不在当前文档）
<span class="token number">000010</span>
<span class="token number">2</span>
参数节点在当前节点的前面
<span class="token number">000100</span>
<span class="token number">4</span>
参数节点在当前节点的后面
<span class="token number">001000</span>
<span class="token number">8</span>
参数节点包含当前节点
<span class="token number">010000</span>
<span class="token number">16</span>
当前节点包含参数节点
<span class="token number">100000</span>
<span class="token number">32</span>
浏览器内部使用

<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;mydiv&quot;&gt;</span>
<span class="token comment">//   &lt;form&gt;&lt;input id=&quot;test&quot; /&gt;&lt;/form&gt;</span>
<span class="token comment">// &lt;/div&gt;</span>

<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mydiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span><span class="token function">compareDocumentPosition</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token comment">// 20</span>
input<span class="token punctuation">.</span><span class="token function">compareDocumentPosition</span><span class="token punctuation">(</span>div<span class="token punctuation">)</span> <span class="token comment">// 10</span>

上面代码中，节点div包含节点input（二进制<span class="token number">010000</span>），而且节点input在节点div的后面（二进制<span class="token number">000100</span>），所以第一个compareDocumentPosition方法返回<span class="token number">20</span>（二进制<span class="token number">010100</span>，即<span class="token number">010000</span> <span class="token operator">+</span> <span class="token number">000100</span>），第二个compareDocumentPosition方法返回<span class="token number">10</span>（二进制<span class="token number">001010</span>）。
由于compareDocumentPosition返回值的含义，定义在每一个比特位上，所以如果要检查某一种特定的含义，就需要使用比特位运算符。
<span class="token keyword">var</span> head <span class="token operator">=</span> document<span class="token punctuation">.</span>head<span class="token punctuation">;</span>
<span class="token keyword">var</span> body <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span><span class="token function">compareDocumentPosition</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;文档结构正确&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;body&gt; 不能在 &lt;head&gt; 前面&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，compareDocumentPosition的返回值与<span class="token number">4</span>（又称掩码）进行与运算（<span class="token operator">&amp;</span>），得到一个布尔值，表示<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>是否在<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>前面。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">isEqualNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name">，Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">isSameNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。
<span class="token keyword">var</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p1<span class="token punctuation">.</span><span class="token function">isEqualNode</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span> <span class="token comment">// true</span>

isSameNode方法返回一个布尔值，表示两个节点是否为同一个节点。
<span class="token keyword">var</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p1<span class="token punctuation">.</span><span class="token function">isSameNode</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span> <span class="token comment">// false</span>
p1<span class="token punctuation">.</span><span class="token function">isSameNode</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
normalize方法用于清理当前节点内部的所有文本节点（text）。它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。
<span class="token keyword">var</span> wrapper <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

wrapper<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token string">&#39;Part 1 &#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
wrapper<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token string">&#39;Part 2 &#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

wrapper<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length <span class="token comment">// 2</span>
wrapper<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
wrapper<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length <span class="token comment">// 1</span>

上面代码使用normalize方法之前，wrapper节点有两个毗邻的文本子节点。使用normalize方法之后，两个文本子节点被合并成一个。
该方法是Text<span class="token punctuation">.</span>splitText的逆方法，可以查看《Text 节点对象》一章，了解更多内容。
<span class="token class-name">Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">getRootNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">getRootNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回当前节点所在文档的根节点document，与ownerDocument属性的作用相同。
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span><span class="token function">getRootNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> document
<span class="token comment">// true</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span><span class="token function">getRootNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>ownerDocument
<span class="token comment">// true</span>

该方法可用于document节点自身，这一点与document<span class="token punctuation">.</span>ownerDocument不同。
document<span class="token punctuation">.</span><span class="token function">getRootNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// document</span>
document<span class="token punctuation">.</span>ownerDocument <span class="token comment">// null</span>

nodelist
NodeList 接口
节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。<span class="token constant">DOM</span> 提供两种节点集合，用于容纳多个节点：NodeList和HTMLCollection。主要区别是，NodeList可以包含各种类型的节点，HTMLCollection只能包含 <span class="token constant">HTML</span> 元素节点。
概述
NodeList实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到NodeList实例。

<span class="token operator">-</span> Node<span class="token punctuation">.</span>childNodes
<span class="token operator">-</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>等节点搜索方法
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes <span class="token keyword">instanceof</span> <span class="token class-name">NodeList</span> <span class="token comment">// true</span>

NodeList实例很像数组，可以使用length属性和forEach方法。但是，它不是数组，不能使用pop或push之类数组特有的方法。
<span class="token keyword">var</span> children <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>

Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>children<span class="token punctuation">)</span> <span class="token comment">// false</span>

children<span class="token punctuation">.</span>length <span class="token comment">// 34</span>
children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>log<span class="token punctuation">)</span>

如果NodeList实例要使用数组方法，可以将其转为真正的数组。
<span class="token keyword">var</span> children <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>
<span class="token keyword">var</span> nodeArr <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>children<span class="token punctuation">)</span><span class="token punctuation">;</span>

除了使用forEach方法遍历 NodeList 实例，还可以使用<span class="token keyword">for</span>循环。
<span class="token keyword">var</span> children <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> item <span class="token operator">=</span> children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

注意，NodeList 实例可能是动态集合，也可能是静态集合。所谓动态集合就是一个活的集合，<span class="token constant">DOM</span> 删除或新增一个相关节点，都会立刻反映在 NodeList 实例。目前，只有Node<span class="token punctuation">.</span>childNodes返回的是一个动态集合，其他的 NodeList 都是静态集合。
<span class="token keyword">var</span> children <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>
children<span class="token punctuation">.</span>length <span class="token comment">// 18</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
children<span class="token punctuation">.</span>length <span class="token comment">// 19</span>

上面代码中，文档增加一个子节点，NodeList 实例children的length属性就增加了<span class="token number">1</span>。
<span class="token class-name">NodeList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>length
length属性返回 NodeList 实例包含的节点数量。
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length
<span class="token comment">// 0</span>

上面代码中，document<span class="token punctuation">.</span>querySelectorAll返回一个 NodeList 集合。对于那些不存在的 <span class="token constant">HTML</span> 标签，length属性返回<span class="token number">0</span>。
<span class="token class-name">NodeList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
forEach方法用于遍历 NodeList 的所有成员。它接受一个回调函数作为参数，每一轮遍历就执行一次这个回调函数，用法与数组实例的forEach方法完全一致。
<span class="token keyword">var</span> children <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>
children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> i<span class="token punctuation">,</span> list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，回调函数f的三个参数依次是当前成员、位置和当前 NodeList 实例。forEach方法的第二个参数，用于绑定回调函数内部的<span class="token keyword">this</span>，该参数可省略。
<span class="token class-name">NodeList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
item方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token function">上面代码中，item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>返回第一个成员。
如果参数值大于实际长度，或者索引不合法（比如负数），item方法返回<span class="token keyword">null</span>。如果省略参数，item方法会报错。
所有类似数组的对象，都可以使用方括号运算符取出成员。一般情况下，都是使用方括号运算符，而不使用item方法。
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

<span class="token class-name">NodeList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name">，NodeList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name">，NodeList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
这三个方法都返回一个 <span class="token constant">ES6</span> 的遍历器对象，可以通过<span class="token keyword">for</span><span class="token operator">...</span><span class="token keyword">of</span><span class="token function">循环遍历获取每一个成员的信息。区别在于，keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">返回键名的遍历器，values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">返回键值的遍历器，entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span>返回的遍历器同时包含键名和键值的信息。
<span class="token keyword">var</span> children <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">of</span> children<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 0</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>
<span class="token comment">// ...</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> value <span class="token keyword">of</span> children<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// #text</span>
<span class="token comment">// &lt;script&gt;</span>
<span class="token comment">// ...</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> entry <span class="token keyword">of</span> children<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Array [ 0, #text ]</span>
<span class="token comment">// Array [ 1, &lt;script&gt; ]</span>
<span class="token comment">// ...</span>

HTMLCollection 接口
概述
HTMLCollection是一个节点对象的集合，只能包含元素节点（element），不能包含其他类型的节点。它的返回值是一个类似数组的对象，但是与NodeList接口不同，HTMLCollection没有forEach方法，只能使用<span class="token keyword">for</span>循环遍历。
返回HTMLCollection实例的，主要是一些Document对象的集合属性，比如document<span class="token punctuation">.</span>links、document<span class="token punctuation">.</span>forms、document<span class="token punctuation">.</span>images等。
document<span class="token punctuation">.</span>links <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCollection</span> <span class="token comment">// true</span>

HTMLCollection实例都是动态集合，节点的变化会实时反映在集合中。
如果元素节点有id或name属性，那么HTMLCollection实例上面，可以使用id属性或name属性引用该节点元素。如果没有对应的节点，则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;img id=&quot;pic&quot; src=&quot;http://example.com/foo.jpg&quot;&gt;</span>

<span class="token keyword">var</span> pic <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;pic&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>images<span class="token punctuation">.</span>pic <span class="token operator">===</span> pic <span class="token comment">// true</span>

上面代码中，document<span class="token punctuation">.</span>images是一个HTMLCollection实例，可以通过<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的id属性值，从HTMLCollection实例上取到这个元素。
<span class="token class-name">HTMLCollection</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>length
length属性返回HTMLCollection实例包含的成员数量。
document<span class="token punctuation">.</span>links<span class="token punctuation">.</span>length <span class="token comment">// 18</span>

<span class="token class-name">HTMLCollection</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
item方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。
<span class="token keyword">var</span> c <span class="token operator">=</span> document<span class="token punctuation">.</span>images<span class="token punctuation">;</span>
<span class="token keyword">var</span> img0 <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">上面代码中，item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>表示返回<span class="token number">0</span>号位置的成员。由于方括号运算符也具有同样作用，而且使用更方便，所以一般情况下，总是使用方括号运算符。
如果参数值超出成员数量或者不合法（比如小于<span class="token number">0</span>），那么item方法返回<span class="token keyword">null</span>。
<span class="token class-name">HTMLCollection</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">namedItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
namedItem方法的参数是一个字符串，表示id属性或name属性的值，返回对应的元素节点。如果没有对应的节点，则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;img id=&quot;pic&quot; src=&quot;http://example.com/foo.jpg&quot;&gt;</span>

<span class="token keyword">var</span> pic <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;pic&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>images<span class="token punctuation">.</span><span class="token function">namedItem</span><span class="token punctuation">(</span><span class="token string">&#39;pic&#39;</span><span class="token punctuation">)</span> <span class="token operator">===</span> pic <span class="token comment">// true</span>

document
Document 节点
概述
document节点对象代表整个文档，每张网页都有自己的document对象。window<span class="token punctuation">.</span>document属性就指向这个对象。只要浏览器开始载入 <span class="token constant">HTML</span> 文档，该对象就存在了，可以直接使用。
document对象有不同的办法可以获取。

<span class="token operator">-</span> 正常的网页，直接使用document或window<span class="token punctuation">.</span>document。
<span class="token operator">-</span> iframe框架里面的网页，使用iframe节点的contentDocument属性。
<span class="token operator">-</span> Ajax 操作返回的文档，使用XMLHttpRequest对象的responseXML属性。
<span class="token operator">-</span> 内部节点的ownerDocument属性。
document对象继承了EventTarget接口和Node接口，并且混入（mixin）了ParentNode接口。这意味着，这些接口的方法都可以在document对象上调用。除此之外，document对象还有很多自己的属性和方法。
属性
快捷方式属性
以下属性是指向文档内部的某个节点的快捷方式。
（<span class="token number">1</span>）document<span class="token punctuation">.</span>defaultView
document<span class="token punctuation">.</span>defaultView属性返回document对象所属的window对象。如果当前文档不属于window对象，该属性返回<span class="token keyword">null</span>。
document<span class="token punctuation">.</span>defaultView <span class="token operator">===</span> window <span class="token comment">// true</span>

（<span class="token number">2</span>）document<span class="token punctuation">.</span>doctype
对于 <span class="token constant">HTML</span> 文档来说，document对象一般有两个子节点。第一个子节点是document<span class="token punctuation">.</span>doctype，指向<span class="token operator">&lt;</span><span class="token constant">DOCTYPE</span><span class="token operator">&gt;</span>节点，即文档类型（Document Type Declaration，简写<span class="token constant">DTD</span>）节点。<span class="token constant">HTML</span> 的文档类型节点，一般写成<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">&gt;</span>。如果网页没有声明 <span class="token constant">DTD</span>，该属性返回<span class="token keyword">null</span>。
<span class="token keyword">var</span> doctype <span class="token operator">=</span> document<span class="token punctuation">.</span>doctype<span class="token punctuation">;</span>
doctype <span class="token comment">// &quot;&lt;!DOCTYPE html&gt;&quot;</span>
doctype<span class="token punctuation">.</span>name <span class="token comment">// &quot;html&quot;</span>

document<span class="token punctuation">.</span>firstChild通常就返回这个节点。
（<span class="token number">3</span>）document<span class="token punctuation">.</span>documentElement
document<span class="token punctuation">.</span>documentElement属性返回当前文档的根元素节点（root）。它通常是document节点的第二个子节点，紧跟在document<span class="token punctuation">.</span>doctype节点后面。<span class="token constant">HTML</span>网页的该属性，一般是<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>节点。
（<span class="token number">4</span>）document<span class="token punctuation">.</span>body，document<span class="token punctuation">.</span>head
document<span class="token punctuation">.</span>body属性指向<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>节点，document<span class="token punctuation">.</span>head属性指向<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>节点。
这两个属性总是存在的，如果网页源码里面省略了<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>或<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>，浏览器会自动创建。另外，这两个属性是可写的，如果改写它们的值，相当于移除所有子节点。
（<span class="token number">5</span>）document<span class="token punctuation">.</span>scrollingElement
document<span class="token punctuation">.</span>scrollingElement属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。
标准模式下，这个属性返回的文档的根元素document<span class="token punctuation">.</span>documentElement（即<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>）。兼容（quirk）模式下，返回的是<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>元素，如果该元素不存在，返回<span class="token keyword">null</span>。
<span class="token comment">// 页面滚动到浏览器顶部</span>
document<span class="token punctuation">.</span>scrollingElement<span class="token punctuation">.</span>scrollTop <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

（<span class="token number">6</span>）document<span class="token punctuation">.</span>activeElement
document<span class="token punctuation">.</span>activeElement属性返回获得当前焦点（focus）的 <span class="token constant">DOM</span> 元素。通常，这个属性返回的是<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>textarea<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>select<span class="token operator">&gt;</span>等表单元素，如果当前没有焦点元素，返回<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>元素或<span class="token keyword">null</span>。
（<span class="token number">7</span>）document<span class="token punctuation">.</span>fullscreenElement
document<span class="token punctuation">.</span>fullscreenElement属性返回当前以全屏状态展示的 <span class="token constant">DOM</span> 元素。如果不是全屏状态，该属性返回<span class="token keyword">null</span>。
<span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>fullscreenElement<span class="token punctuation">.</span>nodeName <span class="token operator">==</span> <span class="token string">&#39;VIDEO&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;全屏播放视频&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，通过document<span class="token punctuation">.</span>fullscreenElement可以知道<span class="token operator">&lt;</span>video<span class="token operator">&gt;</span>元素有没有处在全屏状态，从而判断用户行为。
节点集合属性
以下属性返回一个HTMLCollection实例，表示文档内部特定元素的集合。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。
（<span class="token number">1</span>）document<span class="token punctuation">.</span>links
document<span class="token punctuation">.</span>links属性返回当前文档所有设定了href属性的<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>及<span class="token operator">&lt;</span>area<span class="token operator">&gt;</span>节点。
<span class="token comment">// 打印文档所有的链接</span>
<span class="token keyword">var</span> links <span class="token operator">=</span> document<span class="token punctuation">.</span>links<span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> links<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>links<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

（<span class="token number">2</span>）document<span class="token punctuation">.</span>forms
document<span class="token punctuation">.</span>forms属性返回所有<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>表单节点。
<span class="token keyword">var</span> selectForm <span class="token operator">=</span> document<span class="token punctuation">.</span>forms<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

除了使用位置序号，id属性和name属性也可以用来引用表单。
<span class="token comment">/*HTML 代码如下
  &lt;form name=&quot;foo&quot; id=&quot;bar&quot;&gt;&lt;/form&gt;
*/</span>
document<span class="token punctuation">.</span>forms<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> document<span class="token punctuation">.</span>forms<span class="token punctuation">.</span>foo <span class="token comment">// true</span>
document<span class="token punctuation">.</span>forms<span class="token punctuation">.</span>bar <span class="token operator">===</span> document<span class="token punctuation">.</span>forms<span class="token punctuation">.</span>foo <span class="token comment">// true</span>

（<span class="token number">3</span>）document<span class="token punctuation">.</span>images
document<span class="token punctuation">.</span>images属性返回页面所有<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>图片节点。
<span class="token keyword">var</span> imglist <span class="token operator">=</span> document<span class="token punctuation">.</span>images<span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> imglist<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>imglist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>src <span class="token operator">===</span> <span class="token string">&#39;banner.gif&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

上面代码在所有img标签中，寻找某张图片。
（<span class="token number">4</span>）document<span class="token punctuation">.</span>embeds，document<span class="token punctuation">.</span>plugins
document<span class="token punctuation">.</span>embeds属性和document<span class="token punctuation">.</span>plugins属性，都返回所有<span class="token operator">&lt;</span>embed<span class="token operator">&gt;</span>节点。
（<span class="token number">5</span>）document<span class="token punctuation">.</span>scripts
document<span class="token punctuation">.</span>scripts属性返回所有<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>节点。
<span class="token keyword">var</span> scripts <span class="token operator">=</span> document<span class="token punctuation">.</span>scripts<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>scripts<span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">0</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;当前网页有脚本&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

（<span class="token number">6</span>）document<span class="token punctuation">.</span>styleSheets
document<span class="token punctuation">.</span>styleSheets属性返回文档内嵌或引入的样式表集合，详细介绍请看《<span class="token constant">CSS</span> 对象模型》一章。
（<span class="token number">7</span>）小结
除了document<span class="token punctuation">.</span>styleSheets，以上的集合属性返回的都是HTMLCollection实例。
document<span class="token punctuation">.</span>links <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCollection</span> <span class="token comment">// true</span>
document<span class="token punctuation">.</span>images <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCollection</span> <span class="token comment">// true</span>
document<span class="token punctuation">.</span>forms <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCollection</span> <span class="token comment">// true</span>
document<span class="token punctuation">.</span>embeds <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCollection</span> <span class="token comment">// true</span>
document<span class="token punctuation">.</span>scripts <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCollection</span> <span class="token comment">// true</span>

HTMLCollection实例是类似数组的对象，所以这些属性都有length属性，都可以使用方括号运算符引用成员。如果成员有id或name属性，还可以用这两个属性的值，在HTMLCollection实例上引用到这个成员。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;form name=&quot;myForm&quot;&gt;</span>
document<span class="token punctuation">.</span>myForm <span class="token operator">===</span> document<span class="token punctuation">.</span>forms<span class="token punctuation">.</span>myForm <span class="token comment">// true</span>

文档静态信息属性
（<span class="token number">1</span>）document<span class="token punctuation">.</span>documentURI，document<span class="token punctuation">.</span><span class="token constant">URL</span>
document<span class="token punctuation">.</span>documentURI属性和document<span class="token punctuation">.</span><span class="token constant">URL</span>属性都返回一个字符串，表示当前文档的网址。不同之处是它们继承自不同的接口，documentURI继承自Document接口，可用于所有文档；<span class="token constant">URL</span>继承自HTMLDocument接口，只能用于 <span class="token constant">HTML</span> 文档。
document<span class="token punctuation">.</span><span class="token constant">URL</span>
<span class="token comment">// &lt;http://www.example.com/about&gt;</span>

document<span class="token punctuation">.</span>documentURI <span class="token operator">===</span> document<span class="token punctuation">.</span><span class="token constant">URL</span>
<span class="token comment">// true</span>

如果文档的锚点（#anchor）变化，这两个属性都会跟着变化。
（<span class="token number">2</span>）document<span class="token punctuation">.</span>domain
document<span class="token punctuation">.</span>domain属性返回当前文档的域名，不包含协议和端口。比如，网页的网址是<span class="token operator">&lt;</span>http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>www<span class="token punctuation">.</span>example<span class="token punctuation">.</span>com<span class="token operator">:</span><span class="token number">80</span><span class="token operator">/</span>hello<span class="token punctuation">.</span>html，那么document<span class="token punctuation">.</span>domain属性就等于www<span class="token punctuation">.</span>example<span class="token punctuation">.</span>com。如果无法获取域名，该属性返回<span class="token keyword">null</span>。<span class="token operator">&gt;</span>
document<span class="token punctuation">.</span>domain基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把document<span class="token punctuation">.</span>domain设为对应的上级域名。比如，当前域名是a<span class="token punctuation">.</span>sub<span class="token punctuation">.</span>example<span class="token punctuation">.</span>com，则document<span class="token punctuation">.</span>domain属性可以设置为sub<span class="token punctuation">.</span>example<span class="token punctuation">.</span>com，也可以设为example<span class="token punctuation">.</span>com。修改后，document<span class="token punctuation">.</span>domain相同的两个网页，可以读取对方的资源，比如设置的 Cookie。
另外，设置document<span class="token punctuation">.</span>domain会导致端口被改成<span class="token keyword">null</span>。因此，如果通过设置document<span class="token punctuation">.</span>domain来进行通信，双方网页都必须设置这个值，才能保证端口相同。
（<span class="token number">3</span>）document<span class="token punctuation">.</span>location
Location对象是浏览器提供的原生对象，提供 <span class="token constant">URL</span> 相关的信息和操作方法。通过window<span class="token punctuation">.</span>location和document<span class="token punctuation">.</span>location属性，可以拿到这个对象
（<span class="token number">4</span>）document<span class="token punctuation">.</span>lastModified
document<span class="token punctuation">.</span>lastModified属性返回一个字符串，表示当前文档最后修改的时间。不同浏览器的返回值，日期格式是不一样的。
document<span class="token punctuation">.</span>lastModified
<span class="token comment">// &quot;03/07/2018 11:18:27&quot;</span>

注意，document<span class="token punctuation">.</span>lastModified属性的值是字符串，所以不能直接用来比较。Date<span class="token punctuation">.</span>parse方法将其转为Date实例，才能比较两个网页。
<span class="token keyword">var</span> lastVisitedDate <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&#39;01/01/2018&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>lastModified<span class="token punctuation">)</span> <span class="token operator">&gt;</span> lastVisitedDate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;网页已经变更&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

如果页面上有 JavaScript 生成的内容，document<span class="token punctuation">.</span>lastModified属性返回的总是当前时间。
（<span class="token number">5</span>）document<span class="token punctuation">.</span>title
document<span class="token punctuation">.</span>title属性返回当前文档的标题。默认情况下，返回<span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值。
document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;新标题&#39;</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>title <span class="token comment">// &quot;新标题&quot;</span>

（<span class="token number">6</span>）document<span class="token punctuation">.</span>characterSet
document<span class="token punctuation">.</span>characterSet属性返回当前文档的编码，比如<span class="token constant">UTF</span><span class="token operator">-</span><span class="token number">8</span>、<span class="token constant">ISO</span><span class="token operator">-</span><span class="token number">8859</span><span class="token operator">-</span><span class="token number">1</span>等等。
（<span class="token number">7</span>）document<span class="token punctuation">.</span>referrer
document<span class="token punctuation">.</span>referrer属性返回一个字符串，表示当前文档的访问者来自哪里。
document<span class="token punctuation">.</span>referrer
<span class="token comment">// &quot;https://example.com/path&quot;</span>

如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，document<span class="token punctuation">.</span>referrer返回一个空字符串。
document<span class="token punctuation">.</span>referrer的值，总是与 <span class="token constant">HTTP</span> 头信息的Referer字段保持一致。但是，document<span class="token punctuation">.</span>referrer的拼写有两个r，而头信息的Referer字段只有一个r。
（<span class="token number">8</span>）document<span class="token punctuation">.</span>dir
document<span class="token punctuation">.</span>dir返回一个字符串，表示文字方向。它只有两个可能的值：rtl表示文字从右到左，阿拉伯文是这种方式；ltr表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式。
（<span class="token number">9</span>）document<span class="token punctuation">.</span>compatMode
compatMode属性返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）。
一般来说，如果网页代码的第一行设置了明确的<span class="token constant">DOCTYPE</span>（比如<span class="token operator">&lt;</span><span class="token operator">!</span>doctype html<span class="token operator">&gt;</span>），document<span class="token punctuation">.</span>compatMode的值都为CSS1Compat。
文档状态属性
（<span class="token number">1</span>）document<span class="token punctuation">.</span>hidden
document<span class="token punctuation">.</span>hidden属性返回一个布尔值，表示当前页面是否可见。如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得document<span class="token punctuation">.</span>hidden返回<span class="token boolean">true</span>。。
（<span class="token number">2</span>）document<span class="token punctuation">.</span>visibilityState
document<span class="token punctuation">.</span>visibilityState返回文档的可见状态。
它的值有四种可能。

<span class="token operator">-</span> <span class="token operator">*</span>visible：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
<span class="token operator">-</span> <span class="token operator">*</span>hidden：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
<span class="token operator">-</span> <span class="token operator">*</span>prerender：页面处于正在渲染状态，对于用户来说，该页面不可见。
<span class="token operator">-</span> <span class="token operator">*</span>unloaded：页面从内存里面卸载了。
这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。
（<span class="token number">3</span>）document<span class="token punctuation">.</span>readyState
document<span class="token punctuation">.</span>readyState属性返回当前文档的状态，共有三种可能的值。
<span class="token operator">-</span> loading：加载 <span class="token constant">HTML</span> 代码阶段（尚未完成解析）
<span class="token operator">-</span> interactive：加载外部资源阶段
<span class="token operator">-</span> complete：加载完成
这个属性变化的过程如下。

<span class="token number">1.</span> 浏览器开始解析 <span class="token constant">HTML</span> 文档，document<span class="token punctuation">.</span>readyState属性等于loading。
<span class="token number">2.</span> 浏览器遇到 <span class="token constant">HTML</span> 文档中的<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>元素，并且没有<span class="token keyword">async</span>或defer属性，就暂停解析，开始执行脚本，这时document<span class="token punctuation">.</span>readyState属性还是等于loading。
<span class="token number">3.</span> <span class="token constant">HTML</span> 文档解析完成，document<span class="token punctuation">.</span>readyState属性变成interactive。
<span class="token number">4.</span> 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，document<span class="token punctuation">.</span>readyState属性变成complete。
下面的代码用来检查网页是否加载成功。
<span class="token comment">// 基本检查</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token string">&#39;complete&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 轮询检查</span>
<span class="token keyword">var</span> interval <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token string">&#39;complete&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">clearInterval</span><span class="token punctuation">(</span>interval<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>cookie
document<span class="token punctuation">.</span>cookie属性用来操作浏览器 Cookie，详见《浏览器模型》部分的《Cookie》章节。
document<span class="token punctuation">.</span>designMode
document<span class="token punctuation">.</span>designMode属性控制当前文档是否可编辑。该属性只有两个值on和off，默认值为off。一旦设为on，用户就可以编辑整个文档的内容。
下面代码打开iframe元素内部文档的designMode属性，就能将其变为一个所见即所得的编辑器。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;iframe id=&quot;editor&quot; src=&quot;about:blank&quot;&gt;&lt;/iframe&gt;</span>
<span class="token keyword">var</span> editor <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;editor&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
editor<span class="token punctuation">.</span>contentDocument<span class="token punctuation">.</span>designMode <span class="token operator">=</span> <span class="token string">&#39;on&#39;</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>currentScript
document<span class="token punctuation">.</span>currentScript属性只用在<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>元素的内嵌脚本或加载的外部脚本之中，返回当前脚本所在的那个 <span class="token constant">DOM</span> 节点，即<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>元素的 <span class="token constant">DOM</span> 节点。
<span class="token operator">&lt;</span>script id<span class="token operator">=</span><span class="token string">&quot;foo&quot;</span><span class="token operator">&gt;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
    document<span class="token punctuation">.</span>currentScript <span class="token operator">===</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>

上面代码中，document<span class="token punctuation">.</span>currentScript就是<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>元素节点。
document<span class="token punctuation">.</span>implementation
document<span class="token punctuation">.</span>implementation属性返回一个DOMImplementation对象。该对象有三个方法，主要用于创建独立于当前文档的新的 Document 对象。

<span class="token operator">-</span> DOMImplementation<span class="token punctuation">.</span><span class="token function">createDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：创建一个 <span class="token constant">XML</span> 文档。
<span class="token operator">-</span> DOMImplementation<span class="token punctuation">.</span><span class="token function">createHTMLDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：创建一个 <span class="token constant">HTML</span> 文档。
<span class="token operator">-</span> DOMImplementation<span class="token punctuation">.</span><span class="token function">createDocumentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：创建一个 DocumentType 对象。
下面是创建 <span class="token constant">HTML</span> 文档的例子。
<span class="token keyword">var</span> doc <span class="token operator">=</span> document<span class="token punctuation">.</span>implementation<span class="token punctuation">.</span><span class="token function">createHTMLDocument</span><span class="token punctuation">(</span><span class="token string">&#39;Title&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> doc<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;hello world&#39;</span><span class="token punctuation">;</span>
doc<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">replaceChild</span><span class="token punctuation">(</span>
  doc<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span>
  document<span class="token punctuation">.</span>documentElement
<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，第一步生成一个新的 <span class="token constant">HTML</span> 文档doc，然后用它的根元素document<span class="token punctuation">.</span>documentElement替换掉document<span class="token punctuation">.</span>documentElement。这会使得当前文档的内容全部消失，变成hello world。
方法
document<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>open方法清除当前文档所有内容，使得文档处于可写状态，供document<span class="token punctuation">.</span>write方法写入内容。
document<span class="token punctuation">.</span>close方法用来关闭document<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>打开的文档。
document<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">writeln</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>write方法用于向当前文档写入内容。
在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行document<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>），document<span class="token punctuation">.</span>write写入的内容就会追加在已有内容的后面。
<span class="token comment">// 页面显示“helloworld”</span>
document<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;world&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，document<span class="token punctuation">.</span>write会当作 <span class="token constant">HTML</span> 代码解析，不会转义。
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;p&gt;hello world&lt;/p&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，document<span class="token punctuation">.</span>write会将<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>当作 <span class="token constant">HTML</span> 标签解释。
如果页面已经解析完成（DOMContentLoaded事件发生之后），再调用write方法，它会先调用open方法，擦除当前文档所有内容，然后再写入。
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;DOMContentLoaded&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;p&gt;Hello World!&lt;/p&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 等同于</span>
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;DOMContentLoaded&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;p&gt;Hello World!&lt;/p&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

如果在页面渲染过程中调用write方法，并不会自动调用open方法。（可以理解成，open方法已调用，但close方法还未调用。）
<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
hello
<span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">&quot;text/javascript&quot;</span><span class="token operator">&gt;</span>
  document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;world&quot;</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">&gt;</span>

在浏览器打开上面网页，将会显示hello world。
document<span class="token punctuation">.</span>write是 JavaScript 语言标准化之前就存在的方法，现在完全有更符合标准的方法向文档写入内容（比如对innerHTML属性赋值）。所以，除了某些特殊情况，应该尽量避免使用document<span class="token punctuation">.</span>write这个方法。
document<span class="token punctuation">.</span>writeln方法与write方法完全一致，除了会在输出内容的尾部添加换行符。
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 12</span>

document<span class="token punctuation">.</span><span class="token function">writeln</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">writeln</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>
<span class="token comment">//</span>

注意，writeln方法添加的是 <span class="token constant">ASCII</span> 码的换行符，渲染成 <span class="token constant">HTML</span> 网页时不起作用，即在网页上显示不出换行。网页上的换行，必须显式写入<span class="token operator">&lt;</span>br<span class="token operator">&gt;</span>。
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>querySelector方法接受一个 <span class="token constant">CSS</span> 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回<span class="token keyword">null</span>。
<span class="token keyword">var</span> el1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.myclass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> el2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#myParent &gt; [ng-click]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>querySelectorAll方法与querySelector用法类似，区别是返回一个NodeList对象，包含所有匹配给定选择器的节点。
elementList <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&#39;.myclass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

这两个方法的参数，可以是逗号分隔的多个 <span class="token constant">CSS</span> 选择器，返回匹配其中一个选择器的元素节点，这与 <span class="token constant">CSS</span> 选择器的规则是一致的。
<span class="token keyword">var</span> matches <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&#39;div.note, div.alert&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码返回<span class="token keyword">class</span>属性是note或alert的div元素。
这两个方法都支持复杂的 <span class="token constant">CSS</span> 选择器。
<span class="token comment">// 选中 data-foo-bar 属性等于 someval 的元素</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&#39;[data-foo-bar=&quot;someval&quot;]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 选中 myForm 表单中所有不通过验证的元素</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&#39;#myForm :invalid&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 选中div元素，那些 class 含 ignore 的除外</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&#39;DIV:not(.ignore)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 同时选中 div，a，script 三类元素</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&#39;DIV, A, SCRIPT&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

但是，它们不支持 <span class="token constant">CSS</span> <span class="token literal-property property">伪元素的选择器（比如</span><span class="token operator">:</span>first<span class="token operator">-</span>line和<span class="token operator">:</span>first<span class="token operator">-</span>letter）和伪类的选择器（比如<span class="token operator">:</span>link和<span class="token operator">:</span>visited），即无法选中伪元素和伪类。
如果querySelectorAll方法的参数是字符串<span class="token operator">*</span>，则会返回文档中的所有元素节点。另外，querySelectorAll的返回结果不是动态集合，不会实时反映元素节点的变化。
最后，这两个方法除了定义在document对象上，还定义在元素节点上，即在元素节点上也可以调用。
document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法搜索 <span class="token constant">HTML</span> 标签名，返回符合条件的元素。它的返回值是一个类似数组对象（HTMLCollection实例），可以实时反映 <span class="token constant">HTML</span> 文档的变化。如果没有任何匹配的元素，就返回一个空集。
<span class="token keyword">var</span> paras <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
paras <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCollection</span> <span class="token comment">// true</span>

<span class="token constant">HTML</span> <span class="token function">标签名是大小写不敏感的，因此getElementsByTagName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的参数也是大小写不敏感的。另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序。
如果传入<span class="token operator">*</span>，就可以返回文档中所有 <span class="token constant">HTML</span> 元素。
<span class="token keyword">var</span> allElements <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，元素节点本身也定义了getElementsByTagName方法，返回该元素的后代元素中符合条件的元素。也就是说，这个方法不仅可以在document对象上调用，也可以在任何元素节点上调用。
<span class="token keyword">var</span> firstPara <span class="token operator">=</span> document<span class="token punctuation">.</span>getElementsByTagName<span class="token punctuation">[</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> spans <span class="token operator">=</span> firstPara<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;span&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码选中第一个p元素内部的所有span元素。
document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个类似数组的对象（HTMLCollection实例），包括了所有<span class="token keyword">class</span>名字符合指定条件的元素，元素的变化实时反映在返回结果中。
<span class="token keyword">var</span> elements <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span>names<span class="token punctuation">)</span><span class="token punctuation">;</span>

由于<span class="token keyword">class</span>是保留字，所以 JavaScript 一律使用className表示 <span class="token constant">CSS</span> 的<span class="token keyword">class</span>。
参数可以是多个<span class="token keyword">class</span>，它们之间使用空格分隔。
<span class="token keyword">var</span> elements <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">&#39;foo bar&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码返回同时具有foo和bar两个<span class="token keyword">class</span>的元素，foo和bar的顺序不重要。
注意，正常模式下，<span class="token constant">CSS</span> 的<span class="token keyword">class</span>是大小写敏感的。（quirks mode下，大小写不敏感。）
<span class="token function">与getElementsByTagName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">方法一样，getElementsByClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法不仅可以在document对象上调用，也可以在任何元素节点上调用。
<span class="token comment">// 非document对象上调用</span>
<span class="token keyword">var</span> elements <span class="token operator">=</span> rootElement<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span>names<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementsByName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span><span class="token function">getElementsByName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于选择拥有name属性的 <span class="token constant">HTML</span> 元素（比如<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>radio<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>frame<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>embed<span class="token operator">&gt;</span>和<span class="token operator">&lt;</span>object<span class="token operator">&gt;</span>等），返回一个类似数组的的对象（NodeList实例），因为name属性相同的元素可能不止一个。
<span class="token comment">// 表单为 &lt;form name=&quot;x&quot;&gt;&lt;/form&gt;</span>
<span class="token keyword">var</span> forms <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByName</span><span class="token punctuation">(</span><span class="token string">&#39;x&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
forms<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tagName <span class="token comment">// &quot;FORM&quot;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回匹配指定id属性的元素节点。如果没有发现匹配的节点，则返回<span class="token keyword">null</span>。
<span class="token keyword">var</span> elem <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;para1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，该方法的参数是大小写敏感的。比如，如果某个节点的id属性是main，那么document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;Main&#39;</span><span class="token punctuation">)</span>将返回<span class="token keyword">null</span>。
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法与document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法都能获取元素节点，不同之处是document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的参数使用 <span class="token constant">CSS</span> 选择器语法，document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的参数是元素的id属性。
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myElement&#39;</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#myElement&#39;</span><span class="token punctuation">)</span>

上面代码中，两个方法都能选中id为myElement的元素，但是document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token punctuation">)</span>比document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token punctuation">)</span>效率高得多。
另外，这个方法只能在document对象上使用，不能在其他元素节点上使用。
document<span class="token punctuation">.</span><span class="token function">elementFromPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">elementsFromPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span><span class="token function">elementFromPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回位于页面指定位置最上层的元素节点。
<span class="token keyword">var</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">elementFromPoint</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">上面代码选中在</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span>这个坐标位置的最上层的那个 <span class="token constant">HTML</span> 元素。
elementFromPoint方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。如果位于该位置的 <span class="token constant">HTML</span> 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回<span class="token keyword">null</span>。
document<span class="token punctuation">.</span><span class="token function">elementsFromPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>返回一个数组，成员是位于指定坐标（相对于视口）的所有元素。
<span class="token keyword">var</span> elements <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">elementsFromPoint</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>createElement方法用来生成元素节点，并返回该节点。
<span class="token keyword">var</span> newDiv <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

createElement方法的参数为元素的标签名，即元素节点的tagName属性，对于 <span class="token constant">HTML</span> 网页大小写不敏感，即参数为div或<span class="token constant">DIV</span>返回的是同一种节点。如果参数里面包含尖括号（即<span class="token operator">&lt;</span>和<span class="token operator">&gt;</span>）会报错。
document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// DOMException: The tag name provided (&#39;&lt;div&gt;&#39;) is not a valid name</span>

注意，document<span class="token punctuation">.</span>createElement的参数可以是自定义的标签名。
document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>createTextNode方法用来生成文本节点（Text实例），并返回该节点。它的参数是文本节点的内容。
<span class="token keyword">var</span> newDiv <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newContent <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
newDiv<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>newContent<span class="token punctuation">)</span><span class="token punctuation">;</span>

这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 <span class="token constant">HTML</span> 代码渲染。因此，可以用来展示用户的输入，避免 <span class="token constant">XSS</span> 攻击。
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;span&gt;Foo &amp; bar&lt;/span&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>div<span class="token punctuation">.</span>innerHTML<span class="token punctuation">)</span>
<span class="token comment">// &amp;lt;span&amp;gt;Foo &amp;amp; bar&amp;lt;/span&amp;gt;</span>

需要注意的是，该方法不对单引号和双引号转义，所以不能用来对 <span class="token constant">HTML</span> 属性赋值。
<span class="token keyword">function</span> <span class="token function">escapeHtml</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  div<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> div<span class="token punctuation">.</span>innerHTML<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> userWebsite <span class="token operator">=</span> <span class="token string">&#39;&quot; onmouseover=&quot;alert(\\&#39;derp\\&#39;)&quot; &quot;&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> profileLink <span class="token operator">=</span> <span class="token string">&#39;&lt;a href=&quot;&#39;</span> <span class="token operator">+</span> <span class="token function">escapeHtml</span><span class="token punctuation">(</span>userWebsite<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;&quot;&gt;Bob&lt;/a&gt;&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;target&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> profileLink<span class="token punctuation">;</span>
<span class="token comment">// &lt;a href=&quot;&quot; onmouseover=&quot;alert(&#39;derp&#39;)&quot; &quot;&quot;&gt;Bob&lt;/a&gt;</span>

上面代码中，由于createTextNode方法不转义双引号，导致onmouseover方法被注入了代码。
document<span class="token punctuation">.</span><span class="token function">createAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>createAttribute方法生成一个新的属性节点（Attr实例），并返回它。
<span class="token keyword">var</span> attribute <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createAttribute</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>createAttribute方法的参数name，是属性的名称。
<span class="token keyword">var</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;my_attrib&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">&#39;newVal&#39;</span><span class="token punctuation">;</span>

node<span class="token punctuation">.</span><span class="token function">setAttributeNode</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 或者</span>
node<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;my_attrib&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;newVal&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码为div1节点，插入一个值为newVal的my_attrib属性。
document<span class="token punctuation">.</span><span class="token function">createComment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>createComment方法生成一个新的注释节点，并返回该节点。
<span class="token keyword">var</span> CommentNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createComment</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>createComment方法的参数是一个字符串，会成为注释节点的内容。
document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>createDocumentFragment方法生成一个空的文档片段对象（DocumentFragment实例）。
<span class="token keyword">var</span> docFragment <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

DocumentFragment是一个存在于内存的 <span class="token constant">DOM</span> 片段，不属于当前文档，常常用来生成一段较复杂的 <span class="token constant">DOM</span> 结构，然后再插入当前文档。这样做的好处在于，因为DocumentFragment不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 <span class="token constant">DOM</span> 有更好的性能表现。
<span class="token keyword">var</span> docfrag <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> li <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  li<span class="token punctuation">.</span>textContent <span class="token operator">=</span> e<span class="token punctuation">;</span>
  docfrag<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>li<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> element  <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>docfrag<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，文档片断docfrag包含四个<span class="token operator">&lt;</span>li<span class="token operator">&gt;</span>节点，这些子节点被一次性插入了当前文档。
document<span class="token punctuation">.</span><span class="token function">createEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>createEvent方法生成一个事件对象（Event实例），该对象可以被element<span class="token punctuation">.</span>dispatchEvent方法使用，触发指定事件。
<span class="token keyword">var</span> event <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createEvent</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>createEvent方法的参数是事件类型，比如UIEvents、MouseEvents、MutationEvents、HTMLEvents。
<span class="token keyword">var</span> event <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createEvent</span><span class="token punctuation">(</span><span class="token string">&#39;Event&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
event<span class="token punctuation">.</span><span class="token function">initEvent</span><span class="token punctuation">(</span><span class="token string">&#39;build&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;build&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;build&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码新建了一个名为build的事件实例，然后触发该事件。
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
这三个方法用于处理document节点的事件。它们都继承自EventTarget接口，详细介绍参见《EventTarget 接口》一章。
<span class="token comment">// 添加事件监听函数</span>
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 移除事件监听函数</span>
document<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 触发事件</span>
<span class="token keyword">var</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">hasFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>hasFocus方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。
<span class="token keyword">var</span> focused <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">hasFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点。比如，用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。
document<span class="token punctuation">.</span><span class="token function">adoptNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">importNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>adoptNode方法将某个节点及其子节点，从原来所在的文档或DocumentFragment里面移除，归属当前document对象，返回插入后的新节点。插入的节点对象的ownerDocument属性，会变成当前的document对象，而parentNode属性是<span class="token keyword">null</span>。
<span class="token keyword">var</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">adoptNode</span><span class="token punctuation">(</span>externalNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，document<span class="token punctuation">.</span>adoptNode方法只是改变了节点的归属，并没有将这个节点插入新的文档树。所以，还要再用appendChild方法或insertBefore方法，将新节点插入当前文档树。
document<span class="token punctuation">.</span>importNode方法则是从原来所在的文档或DocumentFragment里面，拷贝某个节点及其子节点，让它们归属当前document对象。拷贝的节点对象的ownerDocument属性，会变成当前的document对象，而parentNode属性是<span class="token keyword">null</span>。
<span class="token keyword">var</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">importNode</span><span class="token punctuation">(</span>externalNode<span class="token punctuation">,</span> deep<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>importNode方法的第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（<span class="token boolean">false</span>）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为<span class="token boolean">true</span>。
注意，document<span class="token punctuation">.</span>importNode方法只是拷贝外部节点，这时该节点的父节点是<span class="token keyword">null</span>。下一步还必须将这个节点插入当前文档树。
<span class="token keyword">var</span> iframe <span class="token operator">=</span> document<span class="token punctuation">.</span>getElementsByTagName<span class="token punctuation">[</span><span class="token string">&#39;iframe&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> oldNode <span class="token operator">=</span> iframe<span class="token punctuation">.</span>contentWindow<span class="token punctuation">.</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myNode&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">importNode</span><span class="token punctuation">(</span>oldNode<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;container&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>newNode<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码从iframe窗口，拷贝一个指定节点myNode，插入当前文档。
document<span class="token punctuation">.</span><span class="token function">createNodeIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>createNodeIterator方法返回一个子节点遍历器。
<span class="token keyword">var</span> nodeIterator <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createNodeIterator</span><span class="token punctuation">(</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">,</span>
  NodeFilter<span class="token punctuation">.</span><span class="token constant">SHOW_ELEMENT</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码返回<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>元素子节点的遍历器。
document<span class="token punctuation">.</span>createNodeIterator方法第一个参数为所要遍历的根节点，第二个参数为所要遍历的节点类型，这里指定为元素节点（NodeFilter<span class="token punctuation">.</span><span class="token constant">SHOW_ELEMENT</span>）。几种主要的节点类型写法如下。

<span class="token operator">-</span> 所有节点：NodeFilter<span class="token punctuation">.</span><span class="token constant">SHOW_ALL</span>
<span class="token operator">-</span> 元素节点：NodeFilter<span class="token punctuation">.</span><span class="token constant">SHOW_ELEMENT</span>
<span class="token operator">-</span> 文本节点：NodeFilter<span class="token punctuation">.</span><span class="token constant">SHOW_TEXT</span>
<span class="token operator">-</span> 评论节点：NodeFilter<span class="token punctuation">.</span><span class="token constant">SHOW_COMMENT</span>
document<span class="token punctuation">.</span><span class="token function">createNodeIterator方法返回一个“遍历器”对象（NodeFilter实例）。该实例的nextNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">方法和previousNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法，可以用来遍历所有子节点。
<span class="token keyword">var</span> nodeIterator <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createNodeIterator</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> pars <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> currentNode<span class="token punctuation">;</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>currentNode <span class="token operator">=</span> nodeIterator<span class="token punctuation">.</span><span class="token function">nextNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pars<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>currentNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，使用遍历器的nextNode方法，将根节点的所有子节点，依次读入一个数组。nextNode方法先返回遍历器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回<span class="token keyword">null</span>。previousNode方法则是先将指针移向上一个节点，然后返回该节点。
<span class="token keyword">var</span> nodeIterator <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createNodeIterator</span><span class="token punctuation">(</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">,</span>
  NodeFilter<span class="token punctuation">.</span><span class="token constant">SHOW_ELEMENT</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> currentNode <span class="token operator">=</span> nodeIterator<span class="token punctuation">.</span><span class="token function">nextNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> previousNode <span class="token operator">=</span> nodeIterator<span class="token punctuation">.</span><span class="token function">previousNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

currentNode <span class="token operator">===</span> previousNode <span class="token comment">// true</span>

上面代码中，currentNode和previousNode都指向同一个的节点。
注意，遍历器返回的第一个节点，总是根节点。
pars<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> document<span class="token punctuation">.</span>body <span class="token comment">// true</span>

document<span class="token punctuation">.</span><span class="token function">createTreeWalker</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>createTreeWalker方法返回一个 <span class="token constant">DOM</span> 的子树遍历器。它与document<span class="token punctuation">.</span>createNodeIterator方法基本是类似的，区别在于它返回的是TreeWalker实例，后者返回的是NodeIterator实例。另外，它的第一个节点不是根节点。
document<span class="token punctuation">.</span>createTreeWalker方法的第一个参数是所要遍历的根节点，第二个参数指定所要遍历的节点类型（与document<span class="token punctuation">.</span>createNodeIterator方法的第二个参数相同）。
<span class="token keyword">var</span> treeWalker <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTreeWalker</span><span class="token punctuation">(</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">,</span>
  NodeFilter<span class="token punctuation">.</span><span class="token constant">SHOW_ELEMENT</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> nodeList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">while</span><span class="token punctuation">(</span>treeWalker<span class="token punctuation">.</span><span class="token function">nextNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  nodeList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>treeWalker<span class="token punctuation">.</span>currentNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码遍历<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>节点下属的所有元素节点，将它们插入nodeList数组。
document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">queryCommandSupported</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，document<span class="token punctuation">.</span><span class="token function">queryCommandEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
（<span class="token number">1</span>）document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
如果document<span class="token punctuation">.</span>designMode属性设为on，那么整个文档用户可编辑；如果元素的contenteditable属性设为<span class="token boolean">true</span>，那么该元素可编辑。这两种情况下，可以使用document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法，改变内容的样式，比如document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token string">&#39;bold&#39;</span><span class="token punctuation">)</span>会使得字体加粗。
document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span>command<span class="token punctuation">,</span> showDefaultUI<span class="token punctuation">,</span> input<span class="token punctuation">)</span>

该方法接受三个参数。

<span class="token operator">-</span> command：字符串，表示所要实施的样式。
<span class="token operator">-</span> showDefaultUI：布尔值，表示是否要使用默认的用户界面，建议总是设为<span class="token boolean">false</span>。
<span class="token operator">-</span> input：字符串，表示该样式的辅助内容，比如生成超级链接时，这个参数就是所要链接的网址。如果第二个参数设为<span class="token boolean">true</span>，那么浏览器会弹出提示框，要求用户在提示框输入该参数。但是，不是所有浏览器都支持这样做，为了兼容性，还是需要自己部署获取这个参数的方式。
<span class="token keyword">var</span> url <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">&#39;请输入网址&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token string">&#39;createlink&#39;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，先提示用户输入所要链接的网址，然后手动生成超级链接。注意，第二个参数是<span class="token boolean">false</span>，表示此时不需要自动弹出提示框。
document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的返回值是一个布尔值。如果为<span class="token boolean">false</span>，表示这个方法无法生效。
这个方法大部分情况下，只对选中的内容生效。如果有多个内容可编辑区域，那么只对当前焦点所在的元素生效。
document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法可以执行的样式改变有很多种，下面是其中的一些：bold、insertLineBreak、selectAll、createLink、insertOrderedList、subscript、<span class="token keyword">delete</span>、insertUnorderedList、superscript、formatBlock、insertParagraph、undo、forwardDelete、insertText、unlink、insertImage、italic、unselect、insertHTML、redo。这些值都可以用作第一个参数，它们的含义不难从字面上看出来。
（<span class="token number">2</span>）document<span class="token punctuation">.</span><span class="token function">queryCommandSupported</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span><span class="token function">queryCommandSupported</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个布尔值，表示浏览器是否支持document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的某个命令。
<span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">queryCommandSupported</span><span class="token punctuation">(</span><span class="token string">&#39;SelectAll&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;浏览器支持选中可编辑区域的所有内容&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

（<span class="token number">3</span>）document<span class="token punctuation">.</span><span class="token function">queryCommandEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span><span class="token function">queryCommandEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个布尔值，表示当前是否可用document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的某个命令。比如，bold（加粗）命令只有存在文本选中时才可用，如果没有选中文本，就不可用。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;input type=&quot;button&quot; value=&quot;Copy&quot; onclick=&quot;doCopy()&quot;&gt;</span>

<span class="token keyword">function</span> <span class="token function">doCopy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 浏览器是否支持 copy 命令（选中内容复制到剪贴板）</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">queryCommandSupported</span><span class="token punctuation">(</span><span class="token string">&#39;copy&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">copyText</span><span class="token punctuation">(</span><span class="token string">&#39;你好&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;浏览器不支持&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">copyText</span><span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;textarea&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
  input<span class="token punctuation">.</span>value <span class="token operator">=</span> text<span class="token punctuation">;</span>
  input<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  input<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 当前是否有选中文字</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">queryCommandEnabled</span><span class="token punctuation">(</span><span class="token string">&#39;copy&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> success <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token string">&#39;copy&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    input<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Copy Ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;queryCommandEnabled is false&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

上面代码中，先判断浏览器是否支持copy命令（允许可编辑区域的选中内容，复制到剪贴板），如果支持，就新建一个临时文本框，里面写入内容“你好”，并将其选中。然后，判断是否选中成功，如果成功，就将“你好”复制到剪贴板，再删除那个临时文本框。
document<span class="token punctuation">.</span><span class="token function">getSelection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
这个方法指向window<span class="token punctuation">.</span><span class="token function">getSelection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，参见window对象一节的介绍。
Element 节点
简介
Element节点对象对应网页的 <span class="token constant">HTML</span> 元素。每一个 <span class="token constant">HTML</span> 元素，在 <span class="token constant">DOM</span> 树上都会转化成一个Element节点对象（以下简称元素节点）。
元素节点的nodeType属性都是<span class="token number">1</span>。
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;P&quot;</span>
p<span class="token punctuation">.</span>nodeType <span class="token comment">// 1</span>

Element对象继承了Node接口，因此Node的属性和方法在Element对象都存在。
此外，不同的 <span class="token constant">HTML</span> 元素对应的元素节点是不一样的，浏览器使用不同的构造函数，生成不同的元素节点，比如<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span><span class="token function">元素的构造函数是HTMLAnchorElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，<span class="token operator">&lt;</span>button<span class="token operator">&gt;</span><span class="token function">是HTMLButtonElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。因此，元素节点不是一种对象，而是许多种对象，这些对象除了继承Element对象的属性和方法，还有各自独有的属性和方法。
元素特性的相关属性
（<span class="token number">1</span>）Element<span class="token punctuation">.</span>id
Element<span class="token punctuation">.</span>id属性返回指定元素的id属性，该属性可读写。
<span class="token comment">// HTML 代码为 &lt;p id=&quot;foo&quot;&gt;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>id <span class="token comment">// &quot;foo&quot;</span>

注意，id属性的值是大小写敏感，即浏览器能正确识别<span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;foo&quot;</span><span class="token operator">&gt;</span>和<span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;FOO&quot;</span><span class="token operator">&gt;</span>这两个元素的id属性，但是最好不要这样命名。
（<span class="token number">2</span>）Element<span class="token punctuation">.</span>tagName
Element<span class="token punctuation">.</span>tagName属性返回指定元素的大写标签名，与nodeName属性的值相等。
<span class="token comment">// HTML代码为</span>
<span class="token comment">// &lt;span id=&quot;myspan&quot;&gt;Hello&lt;/span&gt;</span>
<span class="token keyword">var</span> span <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myspan&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
span<span class="token punctuation">.</span>id <span class="token comment">// &quot;myspan&quot;</span>
span<span class="token punctuation">.</span>tagName <span class="token comment">// &quot;SPAN&quot;</span>

（<span class="token number">3</span>）Element<span class="token punctuation">.</span>dir
Element<span class="token punctuation">.</span>dir属性用于读写当前元素的文字方向，可能是从左到右（<span class="token string">&quot;ltr&quot;</span>），也可能是从右到左（<span class="token string">&quot;rtl&quot;</span>）。
（<span class="token number">4</span>）Element<span class="token punctuation">.</span>accessKey
Element<span class="token punctuation">.</span>accessKey属性用于读写分配给当前元素的快捷键。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;button accesskey=&quot;h&quot; id=&quot;btn&quot;&gt;点击&lt;/button&gt;</span>
<span class="token keyword">var</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
btn<span class="token punctuation">.</span>accessKey <span class="token comment">// &quot;h&quot;</span>

上面代码中，btn元素的快捷键是h，按下Alt <span class="token operator">+</span> h就能将焦点转移到它上面。
（<span class="token number">5</span>）Element<span class="token punctuation">.</span>draggable
Element<span class="token punctuation">.</span>draggable属性返回一个布尔值，表示当前元素是否可拖动。该属性可读写。
（<span class="token number">6</span>）Element<span class="token punctuation">.</span>lang
Element<span class="token punctuation">.</span>lang属性返回当前元素的语言设置。该属性可读写。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;html lang=&quot;en&quot;&gt;</span>
document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>lang <span class="token comment">// &quot;en&quot;</span>

（<span class="token number">7</span>）Element<span class="token punctuation">.</span>tabIndex
Element<span class="token punctuation">.</span>tabIndex属性返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。
tabIndex属性值如果是负值（通常是<span class="token operator">-</span><span class="token number">1</span>），则 Tab 键不会遍历到该元素。如果是正整数，则按照顺序，从小到大遍历。如果两个元素的tabIndex属性的正整数值相同，则按照出现的顺序遍历。遍历完所有tabIndex为正整数的元素以后，再遍历所有tabIndex等于<span class="token number">0</span>、或者属性值是非法值、或者没有tabIndex属性的元素，顺序为它们在网页中出现的顺序。
（<span class="token number">8</span>）Element<span class="token punctuation">.</span>title
Element<span class="token punctuation">.</span>title属性用来读写当前元素的 <span class="token constant">HTML</span> 属性title。该属性通常用来指定，鼠标悬浮时弹出的文字提示框。
元素状态的相关属性
（<span class="token number">1</span>）Element<span class="token punctuation">.</span>hidden
Element<span class="token punctuation">.</span>hidden属性返回一个布尔值，表示当前元素的hidden属性，用来控制当前元素是否可见。该属性可读写。
<span class="token keyword">var</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> mydiv <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mydiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  mydiv<span class="token punctuation">.</span>hidden <span class="token operator">=</span> <span class="token operator">!</span>mydiv<span class="token punctuation">.</span>hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，该属性与 <span class="token constant">CSS</span> 设置是互相独立的。<span class="token constant">CSS</span> 对这个元素可见性的设置，Element<span class="token punctuation">.</span>hidden并不能反映出来。也就是说，这个属性并不能用来判断当前元素的实际可见性。
<span class="token constant">CSS</span> 的设置高于Element<span class="token punctuation">.</span>hidden。如果 <span class="token constant">CSS</span> <span class="token literal-property property">指定了该元素不可见（display</span><span class="token operator">:</span> none）或可见（display<span class="token operator">:</span> hidden），那么Element<span class="token punctuation">.</span>hidden并不能改变该元素实际的可见性。换言之，这个属性只在 <span class="token constant">CSS</span> 没有明确设定当前元素的可见性时才有效。
（<span class="token number">2</span>）Element<span class="token punctuation">.</span>contentEditable，Element<span class="token punctuation">.</span>isContentEditable
<span class="token constant">HTML</span> 元素可以设置contentEditable属性，使得元素的内容可以编辑。
<span class="token operator">&lt;</span>div contenteditable<span class="token operator">&gt;</span><span class="token number">123</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

上面代码中，<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>元素有contenteditable属性，因此用户可以在网页上编辑这个区块的内容。
Element<span class="token punctuation">.</span>contentEditable属性返回一个字符串，表示是否设置了contenteditable属性，有三种可能的值。该属性可写。

<span class="token operator">-</span> <span class="token string">&quot;true&quot;</span>：元素内容可编辑
<span class="token operator">-</span> <span class="token string">&quot;false&quot;</span>：元素内容不可编辑
<span class="token operator">-</span> <span class="token string">&quot;inherit&quot;</span>：元素是否可编辑，继承了父元素的设置
Element<span class="token punctuation">.</span>isContentEditable属性返回一个布尔值，同样表示是否设置了contenteditable属性。该属性只读。
Element<span class="token punctuation">.</span>attributes
Element<span class="token punctuation">.</span>attributes属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点，详见《属性的操作》一章。
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> attrs <span class="token operator">=</span> p<span class="token punctuation">.</span>attributes<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> attrs<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attrs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;-&gt;&#39;</span> <span class="token operator">+</span> attrs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码遍历p元素的所有属性。
Element<span class="token punctuation">.</span>className，Element<span class="token punctuation">.</span>classList
className属性用来读写当前元素节点的<span class="token keyword">class</span>属性。它的值是一个字符串，每个<span class="token keyword">class</span>之间用空格分割。
classList属性返回一个类似数组的对象，当前元素节点的每个<span class="token keyword">class</span>就是这个对象的一个成员。
<span class="token comment">// HTML 代码 &lt;div class=&quot;one two three&quot; id=&quot;myDiv&quot;&gt;&lt;/div&gt;</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span>className
<span class="token comment">// &quot;one two three&quot;</span>

div<span class="token punctuation">.</span>classList
<span class="token comment">// {</span>
<span class="token comment">//   0: &quot;one&quot;</span>
<span class="token comment">//   1: &quot;two&quot;</span>
<span class="token comment">//   2: &quot;three&quot;</span>
<span class="token comment">//   length: 3</span>
<span class="token comment">// }</span>

上面代码中，className属性返回一个空格分隔的字符串，而classList属性指向一个类似数组的对象，该对象的length属性（只读）返回当前元素的<span class="token keyword">class</span>数量。
classList对象有下列方法。

<span class="token operator">-</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：增加一个 <span class="token keyword">class</span>。
<span class="token operator">-</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：移除一个 <span class="token keyword">class</span>。
<span class="token operator">-</span> <span class="token function">contains</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：检查当前元素是否包含某个 <span class="token keyword">class</span>。
<span class="token operator">-</span> <span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：将某个 <span class="token keyword">class</span> 移入或移出当前元素。
<span class="token operator">-</span> <span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回指定索引位置的 <span class="token keyword">class</span>。
<span class="token operator">-</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：将 <span class="token keyword">class</span> 的列表转为字符串。
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;myCssClass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&#39;myCssClass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token string">&#39;myCssClass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果 myCssClass 不存在就加入，否则移除</span>
div<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;myCssClass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回 true 或者 false</span>
div<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回第一个 Class</span>
div<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

下面比较一下，className和classList在添加和删除某个 <span class="token keyword">class</span> 时的写法。
<span class="token keyword">var</span> foo <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加class</span>
foo<span class="token punctuation">.</span>className <span class="token operator">+=</span> <span class="token string">&#39;bold&#39;</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;bold&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 删除class</span>
foo<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&#39;bold&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span>className <span class="token operator">=</span> foo<span class="token punctuation">.</span>className<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^bold$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

toggle方法可以接受一个布尔值，作为第二个参数。如果为<span class="token boolean">true</span>，则添加该属性；如果为<span class="token boolean">false</span>，则去除该属性。
el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">,</span> boolValue<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>boolValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

Element<span class="token punctuation">.</span>dataset
网页元素可以自定义data<span class="token operator">-</span>属性，用来添加数据。
<span class="token operator">&lt;</span>div data<span class="token operator">-</span>timestamp<span class="token operator">=</span><span class="token string">&quot;1522907809292&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

上面代码中，<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>元素有一个自定义的data<span class="token operator">-</span>timestamp属性，用来为该元素添加一个时间戳。
Element<span class="token punctuation">.</span>dataset属性返回一个对象，可以从这个对象读写data<span class="token operator">-</span>属性。
<span class="token comment">// &lt;article</span>
<span class="token comment">//   id=&quot;foo&quot;</span>
<span class="token comment">//   data-columns=&quot;3&quot;</span>
<span class="token comment">//   data-index-number=&quot;12314&quot;</span>
<span class="token comment">//   data-parent=&quot;cars&quot;&gt;</span>
<span class="token comment">//   ...</span>
<span class="token comment">// &lt;/article&gt;</span>
<span class="token keyword">var</span> article <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
article<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>columns <span class="token comment">// &quot;3&quot;</span>
article<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>indexNumber <span class="token comment">// &quot;12314&quot;</span>
article<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>parent <span class="token comment">// &quot;cars&quot;</span>

注意，dataset上面的各个属性返回都是字符串。
<span class="token constant">HTML</span> 代码中，data<span class="token operator">-</span>属性的属性名，只能包含英文字母、数字、连词线（<span class="token operator">-</span>）、点（<span class="token punctuation">.</span>）、冒号（<span class="token operator">:</span>）和下划线（_）。它们转成 JavaScript 对应的dataset属性名，规则如下。

<span class="token operator">-</span> 开头的data<span class="token operator">-</span>会省略。
<span class="token operator">-</span> 如果连词线后面跟了一个英文字母，那么连词线会取消，该字母变成大写。
<span class="token operator">-</span> 其他字符不变。
因此，data<span class="token operator">-</span>abc<span class="token operator">-</span>def对应dataset<span class="token punctuation">.</span>abcDef，data<span class="token operator">-</span>abc<span class="token operator">-</span><span class="token number">1</span>对应dataset<span class="token punctuation">[</span><span class="token string">&quot;abc-1&quot;</span><span class="token punctuation">]</span>。
除了使用dataset读写data<span class="token operator">-</span>属性，也可以使用Element<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>和Element<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，通过完整的属性名读写这些属性。
<span class="token keyword">var</span> mydiv <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mydiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mydiv<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">;</span>
mydiv<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;data-foo&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;bar&quot;</span>

Element<span class="token punctuation">.</span>innerHTML
Element<span class="token punctuation">.</span>innerHTML属性返回一个字符串，等同于该元素包含的所有 <span class="token constant">HTML</span> 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括<span class="token operator">&lt;</span><span class="token constant">HTML</span><span class="token operator">&gt;</span>和<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>元素。
如果将innerHTML属性设为空，等于删除所有它包含的所有节点。
el<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>

注意，读取属性值的时候，如果文本节点包含<span class="token operator">&amp;</span>、小于号（<span class="token operator">&lt;</span>）和大于号（<span class="token operator">&gt;</span>），innerHTML属性会将它们转为实体形式<span class="token operator">&amp;</span>amp<span class="token punctuation">;</span>、<span class="token operator">&amp;</span>lt<span class="token punctuation">;</span>、<span class="token operator">&amp;</span>gt<span class="token punctuation">;</span>。如果想得到原文，建议使用element<span class="token punctuation">.</span>textContent属性。
<span class="token comment">// HTML代码如下 &lt;p id=&quot;para&quot;&gt; 5 &gt; 3 &lt;/p&gt;</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;para&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML
<span class="token comment">// 5 &amp;gt; 3</span>

写入的时候，如果插入的文本包含 <span class="token constant">HTML</span> 标签，会被解析成为节点对象插入 <span class="token constant">DOM</span>。注意，如果文本之中含有<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>标签，虽然可以生成script节点，但是插入的代码不会执行。
<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&quot;&lt;script&gt;alert(&#39;haha&#39;)&lt;/script&gt;&quot;</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> name<span class="token punctuation">;</span>

上面代码将脚本插入内容，脚本并不会执行。但是，innerHTML还是有安全风险的。
<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&quot;&lt;img src=x onerror=alert(1)&gt;&quot;</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> name<span class="token punctuation">;</span>

上面代码中，alert方法是会执行的。因此为了安全考虑，如果插入的是文本，最好用textContent属性代替innerHTML。
Element<span class="token punctuation">.</span>outerHTML
Element<span class="token punctuation">.</span>outerHTML属性返回一个字符串，表示当前元素节点的所有 <span class="token constant">HTML</span> 代码，包括该元素本身和所有子元素。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;d&quot;&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;/div&gt;</span>
<span class="token keyword">var</span> d <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
d<span class="token punctuation">.</span>outerHTML
<span class="token comment">// &#39;&lt;div id=&quot;d&quot;&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;/div&gt;&#39;</span>

outerHTML属性是可读写的，对它进行赋值，等于替换掉当前元素。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;container&quot;&gt;&lt;div id=&quot;d&quot;&gt;Hello&lt;/div&gt;&lt;/div&gt;</span>
<span class="token keyword">var</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;container&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> d <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
container<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;DIV&quot;</span>
d<span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;DIV&quot;</span>

d<span class="token punctuation">.</span>outerHTML <span class="token operator">=</span> <span class="token string">&#39;&lt;p&gt;Hello&lt;/p&gt;&#39;</span><span class="token punctuation">;</span>
container<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;P&quot;</span>
d<span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;DIV&quot;</span>

上面代码中，变量d代表子节点，它的outerHTML属性重新赋值以后，内层的div元素就不存在了，被p元素替换了。但是，变量d依然指向原来的div元素，这表示被替换的<span class="token constant">DIV</span>元素还存在于内存中。
注意，如果一个节点没有父节点，设置outerHTML属性会报错。
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span>outerHTML <span class="token operator">=</span> <span class="token string">&#39;&lt;p&gt;test&lt;/p&gt;&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// DOMException: This element has no parent node.</span>

上面代码中，div元素没有父节点，设置outerHTML属性会报错。
Element<span class="token punctuation">.</span>clientHeight，Element<span class="token punctuation">.</span>clientWidth
Element<span class="token punctuation">.</span>clientHeight属性返回一个整数值，表示元素节点的 <span class="token constant">CSS</span> 高度（单位像素），只对块级元素生效，对于行内元素返回<span class="token number">0</span>。如果块级元素没有设置 <span class="token constant">CSS</span> 高度，则返回实际高度。
除了元素本身的高度，它还包括padding部分，但是不包括border、margin。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。
Element<span class="token punctuation">.</span>clientWidth属性返回元素节点的 <span class="token constant">CSS</span> 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和padding，如果有垂直滚动条，还要减去垂直滚动条的宽度。
document<span class="token punctuation">.</span>documentElement的clientHeight属性，返回当前视口的高度（即浏览器窗口的高度），等同于window<span class="token punctuation">.</span>innerHeight属性减去水平滚动条的高度（如果有的话）。document<span class="token punctuation">.</span>body的高度则是网页的实际高度。一般来说，document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight大于document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight。
<span class="token comment">// 视口高度</span>
document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight

<span class="token comment">// 网页总高度</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight

Element<span class="token punctuation">.</span>clientLeft，Element<span class="token punctuation">.</span>clientTop
Element<span class="token punctuation">.</span>clientLeft属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的padding和margin。如果没有设置左边框，或者是行内元素（display<span class="token operator">:</span> inline），该属性返回<span class="token number">0</span>。该属性总是返回整数值，如果是小数，会四舍五入。
Element<span class="token punctuation">.</span>clientTop属性等于网页元素顶部边框的宽度（单位像素），其他特点都与clientLeft相同。
Element<span class="token punctuation">.</span>scrollHeight，Element<span class="token punctuation">.</span>scrollWidth
Element<span class="token punctuation">.</span>scrollHeight属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括padding，但是不包括border、margin以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（<span class="token operator">:</span><span class="token operator">:</span>before或<span class="token operator">:</span><span class="token operator">:</span>after）的高度。
Element<span class="token punctuation">.</span>scrollWidth属性表示当前元素的总宽度（单位像素），其他地方都与scrollHeight属性类似。这两个属性只读。
整张网页的总高度可以从document<span class="token punctuation">.</span>documentElement或document<span class="token punctuation">.</span>body上读取。
<span class="token comment">// 返回网页的总高度</span>
document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>scrollHeight
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>scrollHeight

注意，如果元素节点的内容出现溢出，即使溢出的内容是隐藏的，scrollHeight属性仍然返回元素的总高度。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;myDiv&quot; style=&quot;height: 200px; overflow: hidden;&quot;&gt;...&lt;div&gt;</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>scrollHeight <span class="token comment">// 356</span>

上面代码中，即使myDiv元素的 <span class="token constant">CSS</span> 高度只有<span class="token number">200</span>像素，且溢出部分不可见，但是scrollHeight仍然会返回该元素的原始高度。
Element<span class="token punctuation">.</span>scrollLeft，Element<span class="token punctuation">.</span>scrollTop
Element<span class="token punctuation">.</span>scrollLeft属性表示当前元素的水平滚动条向右侧滚动的像素数量，Element<span class="token punctuation">.</span>scrollTop属性表示当前元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于<span class="token number">0</span>。
如果要查看整张网页的水平的和垂直的滚动距离，要从document<span class="token punctuation">.</span>documentElement元素上读取。
document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>scrollLeft
document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>scrollTop

这两个属性都可读写，设置该属性的值，会导致浏览器将当前元素自动滚动到相应的位置。
Element<span class="token punctuation">.</span>offsetParent
Element<span class="token punctuation">.</span>offsetParent属性返回最靠近当前元素的、并且 <span class="token constant">CSS</span> 的position属性不等于<span class="token keyword">static</span>的上层元素。
<span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">&quot;position: absolute;&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>span<span class="token operator">&gt;</span>Hello<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

上面代码中，span元素的offsetParent属性就是div元素。
该属性主要用于确定子元素位置偏移的计算基准，Element<span class="token punctuation">.</span>offsetTop和Element<span class="token punctuation">.</span>offsetLeft就是offsetParent元素计算的。
如果该元素是不可见的（display属性为none），或者位置是固定的（position属性为fixed），则offsetParent属性返回<span class="token keyword">null</span>。
<span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">&quot;position: absolute;&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>span style<span class="token operator">=</span><span class="token string">&quot;display: none;&quot;</span><span class="token operator">&gt;</span>Hello<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

上面代码中，span元素的offsetParent属性是<span class="token keyword">null</span>。
如果某个元素的所有上层节点的position属性都是<span class="token keyword">static</span>，则Element<span class="token punctuation">.</span>offsetParent属性指向<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>元素。
Element<span class="token punctuation">.</span>offsetHeight，Element<span class="token punctuation">.</span>offsetWidth
Element<span class="token punctuation">.</span>offsetHeight属性返回一个整数，表示元素的 <span class="token constant">CSS</span> 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）。
Element<span class="token punctuation">.</span>offsetWidth属性表示元素的 <span class="token constant">CSS</span> 水平宽度（单位像素），其他都与Element<span class="token punctuation">.</span>offsetHeight一致。
这两个属性都是只读属性，只比Element<span class="token punctuation">.</span>clientHeight和Element<span class="token punctuation">.</span>clientWidth多了边框的高度或宽度。如果元素的 <span class="token constant">CSS</span> <span class="token literal-property property">设为不可见（比如display</span><span class="token operator">:</span> none<span class="token punctuation">;</span>），则返回<span class="token number">0</span>。
Element<span class="token punctuation">.</span>offsetLeft，Element<span class="token punctuation">.</span>offsetTop
Element<span class="token punctuation">.</span>offsetLeft返回当前元素左上角相对于Element<span class="token punctuation">.</span>offsetParent节点的水平位移，Element<span class="token punctuation">.</span>offsetTop返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。
下面的代码可以算出元素左上角相对于整张网页的坐标。
<span class="token keyword">function</span> <span class="token function">getElementPosition</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>e <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
    x <span class="token operator">+=</span> e<span class="token punctuation">.</span>offsetLeft<span class="token punctuation">;</span>
    y <span class="token operator">+=</span> e<span class="token punctuation">.</span>offsetTop<span class="token punctuation">;</span>
    e <span class="token operator">=</span> e<span class="token punctuation">.</span>offsetParent<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> x<span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> y<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

Element<span class="token punctuation">.</span>style
每个元素节点都有style用来读写该元素的行内样式信息，具体介绍参见《<span class="token constant">CSS</span> 操作》一章。
Element<span class="token punctuation">.</span>children，Element<span class="token punctuation">.</span>childElementCount
Element<span class="token punctuation">.</span>children属性返回一个类似数组的对象（HTMLCollection实例），包括当前元素节点的所有子元素。如果当前元素没有子元素，则返回的对象包含零个成员。
<span class="token keyword">if</span> <span class="token punctuation">(</span>para<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> children <span class="token operator">=</span> para<span class="token punctuation">.</span>children<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

上面代码遍历了para元素的所有子元素。
这个属性与Node<span class="token punctuation">.</span>childNodes属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点。
Element<span class="token punctuation">.</span>childElementCount属性返回当前元素节点包含的子元素节点的个数，与Element<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length的值相同。
Element<span class="token punctuation">.</span>firstElementChild，Element<span class="token punctuation">.</span>lastElementChild
Element<span class="token punctuation">.</span>firstElementChild属性返回当前元素的第一个元素子节点，Element<span class="token punctuation">.</span>lastElementChild返回最后一个元素子节点。
如果没有元素子节点，这两个属性返回<span class="token keyword">null</span>。
Element<span class="token punctuation">.</span>nextElementSibling，Element<span class="token punctuation">.</span>previousElementSibling
Element<span class="token punctuation">.</span>nextElementSibling属性返回当前元素节点的后一个同级元素节点，如果没有则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;div-01&quot;&gt;Here is div-01&lt;/div&gt;</span>
<span class="token comment">// &lt;div id=&quot;div-02&quot;&gt;Here is div-02&lt;/div&gt;</span>
<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div-01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span>nextElementSibling
<span class="token comment">// &lt;div id=&quot;div-02&quot;&gt;Here is div-02&lt;/div&gt;</span>

Element<span class="token punctuation">.</span>previousElementSibling属性返回当前元素节点的前一个同级元素节点，如果没有则返回<span class="token keyword">null</span>。
属性相关方法
元素节点提供六个方法，用来操作属性。

<span class="token operator">-</span> <span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：读取某个属性的值
<span class="token operator">-</span> <span class="token function">getAttributeNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回当前元素的所有属性名
<span class="token operator">-</span> <span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：写入属性值
<span class="token operator">-</span> <span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：某个属性是否存在
<span class="token operator">-</span> <span class="token function">hasAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：当前元素是否有属性
<span class="token operator">-</span> <span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：删除属性
Element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>querySelector方法接受 <span class="token constant">CSS</span> 选择器作为参数，返回父元素的第一个匹配的子元素。如果没有找到匹配的子元素，就返回<span class="token keyword">null</span>。
<span class="token keyword">var</span> content <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;content&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> el <span class="token operator">=</span> content<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码返回content节点的第一个p元素。
Element<span class="token punctuation">.</span>querySelector方法可以接受任何复杂的 <span class="token constant">CSS</span> 选择器。
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;style[type=&#39;text/css&#39;], style:not([type])&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，这个方法无法选中伪元素。
它可以接受多个选择器，它们之间使用逗号分隔。
element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div, p&#39;</span><span class="token punctuation">)</span>

上面代码返回element的第一个div或p子元素。
需要注意的是，浏览器执行querySelector方法时，是先在全局范围内搜索给定的 <span class="token constant">CSS</span> 选择器，然后过滤出哪些属于当前元素的子元素。因此，会有一些违反直觉的结果，下面是一段 <span class="token constant">HTML</span> 代码。
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>blockquote id<span class="token operator">=</span><span class="token string">&quot;outer&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>Hello<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;inner&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>World<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>blockquote<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

那么，像下面这样查询的话，实际上返回的是第一个p元素，而不是第二个。
<span class="token keyword">var</span> outer <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;outer&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
outer<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div p&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// &lt;p&gt;Hello&lt;/p&gt;</span>

Element<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>querySelectorAll方法接受 <span class="token constant">CSS</span> 选择器作为参数，返回一个NodeList实例，包含所有匹配的子元素。
<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> matches <span class="token operator">=</span> el<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&#39;div.highlighted &gt; p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法的执行机制与querySelector方法相同，也是先在全局范围内查找，再过滤出当前元素的子元素。因此，选择器实际上针对整个文档的。
它也可以接受多个 <span class="token constant">CSS</span> 选择器，它们之间使用逗号分隔。如果选择器里面有伪元素的选择器，则总是返回一个空的NodeList实例。
Element<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>getElementsByClassName方法返回一个HTMLCollection实例，成员是当前元素节点的所有具有指定 <span class="token keyword">class</span> 的子元素节点。该方法与document<span class="token punctuation">.</span>getElementsByClassName方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。
element<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">&#39;red test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，该方法的参数大小写敏感。
由于HTMLCollection实例是一个活的集合，document对象的任何变化会立刻反应到实例，下面的代码不会生效。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;example&quot;&gt;</span>
<span class="token comment">//   &lt;p class=&quot;foo&quot;&gt;&lt;/p&gt;</span>
<span class="token comment">//   &lt;p class=&quot;foo&quot;&gt;&lt;/p&gt;</span>
<span class="token comment">// &lt;/div&gt;</span>
<span class="token keyword">var</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;example&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> matches <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span> matches<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  matches<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  matches<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 执行后，HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;example&quot;&gt;</span>
<span class="token comment">//   &lt;p&gt;&lt;/p&gt;</span>
<span class="token comment">//   &lt;p class=&quot;foo bar&quot;&gt;&lt;/p&gt;</span>
<span class="token comment">// &lt;/div&gt;</span>

上面代码中，matches集合的第一个成员，一旦被拿掉 <span class="token keyword">class</span> 里面的foo，就会立刻从matches里面消失，导致出现上面的结果。
Element<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个HTMLCollection实例，成员是当前节点的所有匹配指定标签名的子元素节点。该方法与document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。
<span class="token keyword">var</span> table <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;forecast-table&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> cells <span class="token operator">=</span> table<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;td&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，该方法的参数是大小写不敏感的，因为 <span class="token constant">HTML</span> 标签名也是大小写不敏感。
Element<span class="token punctuation">.</span><span class="token function">closest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>closest方法接受一个 <span class="token constant">CSS</span> 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）。如果没有任何节点匹配 <span class="token constant">CSS</span> 选择器，则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;article&gt;</span>
<span class="token comment">//   &lt;div id=&quot;div-01&quot;&gt;Here is div-01</span>
<span class="token comment">//     &lt;div id=&quot;div-02&quot;&gt;Here is div-02</span>
<span class="token comment">//       &lt;div id=&quot;div-03&quot;&gt;Here is div-03&lt;/div&gt;</span>
<span class="token comment">//     &lt;/div&gt;</span>
<span class="token comment">//   &lt;/div&gt;</span>
<span class="token comment">// &lt;/article&gt;</span>

<span class="token keyword">var</span> div03 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div-03&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// div-03 最近的祖先节点</span>
div03<span class="token punctuation">.</span><span class="token function">closest</span><span class="token punctuation">(</span><span class="token string">&quot;#div-02&quot;</span><span class="token punctuation">)</span> <span class="token comment">// div-02</span>
div03<span class="token punctuation">.</span><span class="token function">closest</span><span class="token punctuation">(</span><span class="token string">&quot;div div&quot;</span><span class="token punctuation">)</span> <span class="token comment">// div-03</span>
div03<span class="token punctuation">.</span><span class="token function">closest</span><span class="token punctuation">(</span><span class="token string">&quot;article &gt; div&quot;</span><span class="token punctuation">)</span> <span class="token comment">//div-01</span>
div03<span class="token punctuation">.</span><span class="token function">closest</span><span class="token punctuation">(</span><span class="token string">&quot;:not(div)&quot;</span><span class="token punctuation">)</span> <span class="token comment">// article</span>

上面代码中，由于closest方法将当前节点也考虑在内，所以第二个closest方法返回div<span class="token operator">-</span><span class="token number">03</span>。
Element<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>matches方法返回一个布尔值，表示当前元素是否匹配给定的 <span class="token constant">CSS</span> 选择器。
<span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&#39;.someClass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Match!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

事件相关方法
以下三个方法与Element节点的事件相关。这些方法都继承自EventTarget接口，详见相关章节。

<span class="token operator">-</span> Element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：添加事件的回调函数
<span class="token operator">-</span> Element<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：移除事件监听函数
<span class="token operator">-</span> Element<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：触发事件
element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>

Element<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>scrollIntoView方法滚动当前元素，进入浏览器的可见区域，类似于设置window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash的效果。
el<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 等同于el.scrollIntoView(true)</span>
el<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法可以接受一个布尔值作为参数。如果为<span class="token boolean">true</span>，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为<span class="token boolean">false</span>，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为<span class="token boolean">true</span>。
Element<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>getBoundingClientRect方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 <span class="token constant">CSS</span> 盒状模型的所有信息。
<span class="token keyword">var</span> rect <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，getBoundingClientRect方法返回的rect对象，具有以下属性（全部为只读）。

<span class="token operator">-</span> x：元素左上角相对于视口的横坐标
<span class="token operator">-</span> y：元素左上角相对于视口的纵坐标
<span class="token operator">-</span> height：元素高度
<span class="token operator">-</span> width：元素宽度
<span class="token operator">-</span> left：元素左上角相对于视口的横坐标，与x属性相等
<span class="token operator">-</span> right：元素右边界相对于视口的横坐标（等于x <span class="token operator">+</span> width）
<span class="token operator">-</span> top：元素顶部相对于视口的纵坐标，与y属性相等
<span class="token operator">-</span> bottom：元素底部相对于视口的纵坐标（等于y <span class="token operator">+</span> height）
由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将left属性加上window<span class="token punctuation">.</span>scrollX，top属性加上window<span class="token punctuation">.</span>scrollY。
注意，getBoundingClientRect方法的所有属性，都把边框（border属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，width和height包括了元素本身 <span class="token operator">+</span> padding <span class="token operator">+</span> border。
另外，上面的这些属性，都是继承自原型的属性，Object<span class="token punctuation">.</span>keys会返回一个空数组，这一点也需要注意。
<span class="token keyword">var</span> rect <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>rect<span class="token punctuation">)</span> <span class="token comment">// []</span>

上面代码中，rect对象没有自身属性，而Object<span class="token punctuation">.</span>keys方法只返回对象自身的属性，所以返回了一个空数组。
Element<span class="token punctuation">.</span><span class="token function">getClientRects</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>getClientRects方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形（所以方法名中的Rect用的是复数）。每个矩形都有bottom、height、left、right、top和width六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。
对于盒状元素（比如<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>和<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>），该方法返回的对象中只有该元素一个成员。对于行内元素（比如<span class="token operator">&lt;</span>span<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>），该方法返回的对象有多少个成员，取决于该元素在页面上占据多少行。这是它和Element<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的主要区别，后者对于行内元素总是返回一个矩形。
<span class="token operator">&lt;</span>span id<span class="token operator">=</span><span class="token string">&quot;inline&quot;</span><span class="token operator">&gt;</span>Hello World Hello World Hello World<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>

上面代码是一个行内元素<span class="token operator">&lt;</span>span<span class="token operator">&gt;</span>，如果它在页面上占据三行，getClientRects方法返回的对象就有三个成员，如果它在页面上占据一行，getClientRects方法返回的对象就只有一个成员。
<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;inline&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span><span class="token function">getClientRects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token comment">// 3</span>
el<span class="token punctuation">.</span><span class="token function">getClientRects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>left <span class="token comment">// 8</span>
el<span class="token punctuation">.</span><span class="token function">getClientRects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>right <span class="token comment">// 113.908203125</span>
el<span class="token punctuation">.</span><span class="token function">getClientRects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>bottom <span class="token comment">// 31.200000762939453</span>
el<span class="token punctuation">.</span><span class="token function">getClientRects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>height <span class="token comment">// 23.200000762939453</span>
el<span class="token punctuation">.</span><span class="token function">getClientRects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>width <span class="token comment">// 105.908203125</span>

这个方法主要用于判断行内元素是否换行，以及行内元素的每一行的位置偏移。
注意，如果行内元素包括换行符，那么该方法会把换行符考虑在内。
<span class="token operator">&lt;</span>span id<span class="token operator">=</span><span class="token string">&quot;inline&quot;</span><span class="token operator">&gt;</span>
  Hello World
  Hello World
  Hello World
<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>

上面代码中，<span class="token operator">&lt;</span>span<span class="token operator">&gt;</span>节点内部有三个换行符，即使 <span class="token constant">HTML</span> <span class="token function">语言忽略换行符，将它们显示为一行，getClientRects</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法依然会返回三个成员。如果行宽设置得特别窄，上面的<span class="token operator">&lt;</span>span<span class="token operator">&gt;</span>元素显示为<span class="token number">6</span>行，那么就会返回六个成员。
Element<span class="token punctuation">.</span><span class="token function">insertAdjacentElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>insertAdjacentElement方法在相对于当前元素的指定位置，插入一个新的节点。该方法返回被插入的节点，如果插入失败，返回<span class="token keyword">null</span>。
element<span class="token punctuation">.</span><span class="token function">insertAdjacentElement</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">;</span>

Element<span class="token punctuation">.</span>insertAdjacentElement方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。

<span class="token operator">-</span> beforebegin：当前元素之前
<span class="token operator">-</span> afterbegin：当前元素内部的第一个子节点前面
<span class="token operator">-</span> beforeend：当前元素内部的最后一个子节点后面
<span class="token operator">-</span> afterend：当前元素之后
注意，beforebegin和afterend这两个值，只在当前节点有父节点时才会生效。如果当前节点是由脚本创建的，没有父节点，那么插入会失败。
<span class="token keyword">var</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span>
p1<span class="token punctuation">.</span><span class="token function">insertAdjacentElement</span><span class="token punctuation">(</span><span class="token string">&#39;afterend&#39;</span><span class="token punctuation">,</span> p2<span class="token punctuation">)</span> <span class="token comment">// null</span>

上面代码中，p1没有父节点，所以插入p2到它后面就失败了。
如果插入的节点是一个文档里现有的节点，它会从原有位置删除，放置到新的位置。
Element<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，Element<span class="token punctuation">.</span><span class="token function">insertAdjacentText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>insertAdjacentHTML方法用于将一个 <span class="token constant">HTML</span> 字符串，解析生成 <span class="token constant">DOM</span> 结构，插入相对于当前节点的指定位置。
element<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法接受两个参数，第一个是一个表示指定位置的字符串，第二个是待解析的 <span class="token constant">HTML</span> 字符串。第一个参数只能设置下面四个值之一。

<span class="token operator">-</span> beforebegin：当前元素之前
<span class="token operator">-</span> afterbegin：当前元素内部的第一个子节点前面
<span class="token operator">-</span> beforeend：当前元素内部的最后一个子节点后面
<span class="token operator">-</span> afterend：当前元素之后
<span class="token comment">// HTML 代码：&lt;div id=&quot;one&quot;&gt;one&lt;/div&gt;</span>
<span class="token keyword">var</span> d1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;one&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
d1<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span><span class="token string">&#39;afterend&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&lt;div id=&quot;two&quot;&gt;two&lt;/div&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 执行后的 HTML 代码：</span>
<span class="token comment">// &lt;div id=&quot;one&quot;&gt;one&lt;/div&gt;&lt;div id=&quot;two&quot;&gt;two&lt;/div&gt;</span>

该方法只是在现有的 <span class="token constant">DOM</span> 结构里面插入节点，这使得它的执行速度比innerHTML方法快得多。
注意，该方法不会转义 <span class="token constant">HTML</span> 字符串，这导致它不能用来插入用户输入的内容，否则会有安全风险。
Element<span class="token punctuation">.</span>insertAdjacentText方法在相对于当前节点的指定位置，插入一个文本节点，用法与Element<span class="token punctuation">.</span>insertAdjacentHTML方法完全一致。
<span class="token comment">// HTML 代码：&lt;div id=&quot;one&quot;&gt;one&lt;/div&gt;</span>
<span class="token keyword">var</span> d1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;one&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
d1<span class="token punctuation">.</span><span class="token function">insertAdjacentText</span><span class="token punctuation">(</span><span class="token string">&#39;afterend&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;two&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 执行后的 HTML 代码：</span>
<span class="token comment">// &lt;div id=&quot;one&quot;&gt;one&lt;/div&gt;two</span>

Element<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>remove方法继承自 ChildNode 接口，用于将当前元素节点从它的父节点移除。
<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mydiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码将el节点从 <span class="token constant">DOM</span> 树里面移除。
Element<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，Element<span class="token punctuation">.</span><span class="token function">blur</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>focus方法用于将当前页面的焦点，转移到指定元素上。
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;my-span&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法可以接受一个对象作为参数。参数对象的preventScroll属性是一个布尔值，指定是否将当前元素停留在原始位置，而不是滚动到可见区域。
<span class="token keyword">function</span> <span class="token function">getFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">preventScroll</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码会让btn元素获得焦点，并滚动到可见区域。
最后，从document<span class="token punctuation">.</span>activeElement属性可以得到当前获得焦点的元素。
Element<span class="token punctuation">.</span>blur方法用于将焦点从当前元素移除。
Element<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>click方法用于在当前元素上模拟一次鼠标点击，相当于触发了click事件。
ParentNode 接口，ChildNode 接口
节点对象除了继承 Node 接口以外，还拥有其他接口。ParentNode接口表示当前节点是一个父节点，提供一些处理子节点的方法。ChildNode接口表示当前节点是一个子节点，提供一些相关方法。
ParentNode 接口
如果当前节点是父节点，就会混入了（mixin）ParentNode接口。由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会拥有ParentNode接口。
ParentNode<span class="token punctuation">.</span>children
children属性返回一个HTMLCollection实例，成员是当前节点的所有元素子节点。该属性只读。
下面是遍历某个节点的所有元素子节点的示例。
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> el<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

注意，children属性只包括元素子节点，不包括其他类型的子节点（比如文本子节点）。如果没有元素类型的子节点，返回值HTMLCollection实例的length属性为<span class="token number">0</span>。
另外，HTMLCollection是动态集合，会实时反映 <span class="token constant">DOM</span> 的任何变化。
ParentNode<span class="token punctuation">.</span>firstElementChild
firstElementChild属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回<span class="token keyword">null</span>。
document<span class="token punctuation">.</span>firstElementChild<span class="token punctuation">.</span>nodeName
<span class="token comment">// &quot;HTML&quot;</span>

上面代码中，document节点的第一个元素子节点是<span class="token operator">&lt;</span><span class="token constant">HTML</span><span class="token operator">&gt;</span>。
ParentNode<span class="token punctuation">.</span>lastElementChild
lastElementChild属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回<span class="token keyword">null</span>。
document<span class="token punctuation">.</span>lastElementChild<span class="token punctuation">.</span>nodeName
<span class="token comment">// &quot;HTML&quot;</span>

上面代码中，document节点的最后一个元素子节点是<span class="token operator">&lt;</span><span class="token constant">HTML</span><span class="token operator">&gt;</span>（因为document只包含这一个元素子节点）。
ParentNode<span class="token punctuation">.</span>childElementCount
childElementCount属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回<span class="token number">0</span>。
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>childElementCount <span class="token comment">// 13</span>

ParentNode<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，ParentNode<span class="token punctuation">.</span><span class="token function">prepend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
（<span class="token number">1</span>）ParentNode<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。
该方法不仅可以添加元素子节点（参数为元素节点），还可以添加文本子节点（参数为字符串）。
<span class="token keyword">var</span> parent <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">;</span>

<span class="token comment">// 添加元素子节点</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
parent<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加文本子节点</span>
parent<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加多个元素子节点</span>
<span class="token keyword">var</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
parent<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加元素子节点和文本子节点</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
parent<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法没有返回值。
<span class="token class-name">注意，该方法与Node</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法有三点不同。

<span class="token operator">-</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">允许字符串作为参数，appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>只允许子节点作为参数。
<span class="token operator">-</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">没有返回值，而appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>返回添加的子节点。
<span class="token operator">-</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">可以添加多个子节点和字符串（即允许多个参数），appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>只能添加一个节点（即只允许一个参数）。
（<span class="token number">2</span>）ParentNode<span class="token punctuation">.</span><span class="token function">prepend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">prepend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与append</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法完全一致，也是没有返回值。
ChildNode 接口
如果一个节点有父节点，那么该节点就拥有了ChildNode接口。
ChildNode<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于从父节点移除当前节点。
el<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

上面代码在 <span class="token constant">DOM</span> 里面移除了el节点。
ChildNode<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，ChildNode<span class="token punctuation">.</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
（<span class="token number">1</span>）ChildNode<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。
注意，该方法不仅可以插入元素节点，还可以插入文本节点。
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 插入元素节点</span>
el<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 插入文本节点</span>
el<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 插入多个元素节点</span>
el<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> p1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 插入元素节点和文本节点</span>
el<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> <span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

（<span class="token number">2</span>）ChildNode<span class="token punctuation">.</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与before方法完全相同。
ChildNode<span class="token punctuation">.</span><span class="token function">replaceWith</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">replaceWith</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。
<span class="token keyword">var</span> span <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;span&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span><span class="token function">replaceWith</span><span class="token punctuation">(</span>span<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，el节点将被span节点替换。
text
Text 节点和 DocumentFragment 节点
Text 节点的概念
文本节点（Text）代表元素节点（Element）和属性节点（Attribute）的文本内容。如果一个节点只包含一段文本，那么它就有一个文本子节点，代表该节点的文本内容。
通常我们使用父节点的firstChild、nextSibling等属性获取文本节点，或者使用Document节点的createTextNode方法创造一个文本节点。
<span class="token comment">// 获取文本节点</span>
<span class="token keyword">var</span> textNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>firstChild<span class="token punctuation">;</span>

<span class="token comment">// 创造文本节点</span>
<span class="token keyword">var</span> textNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token string">&#39;Hi&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>textNode<span class="token punctuation">)</span><span class="token punctuation">;</span>

浏览器原生提供一个Text构造函数。它返回一个文本节点实例。它的参数就是该文本节点的文本内容。
<span class="token comment">// 空字符串</span>
<span class="token keyword">var</span> text1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 非空字符串</span>
<span class="token keyword">var</span> text2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string">&#39;This is a text node&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，由于空格也是一个字符，所以哪怕只有一个空格，也会形成文本节点。比如，<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span> <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>包含一个空格，它的子节点就是一个文本节点。
文本节点除了继承Node接口，还继承了CharacterData接口。Node接口的属性和方法请参考《Node 接口》一章，这里不再重复介绍了，以下的属性和方法大部分来自CharacterData接口。
Text 节点的属性
data
data属性等同于nodeValue属性，用来设置或读取文本节点的内容。
<span class="token comment">// 读取文本内容</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>data
<span class="token comment">// 等同于</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>nodeValue

<span class="token comment">// 设置文本内容</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token string">&#39;Hello World&#39;</span><span class="token punctuation">;</span>

wholeText
wholeText属性将当前文本节点与毗邻的文本节点，作为一个整体返回。大多数情况下，wholeText属性的返回值，与data属性和textContent属性相同。但是，某些特殊情况会有差异。
举例来说，<span class="token constant">HTML</span> 代码如下。
<span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;para&quot;</span><span class="token operator">&gt;</span><span class="token constant">A</span> <span class="token operator">&lt;</span>em<span class="token operator">&gt;</span><span class="token constant">B</span><span class="token operator">&lt;</span><span class="token operator">/</span>em<span class="token operator">&gt;</span> <span class="token constant">C</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>

这时，文本节点的wholeText属性和data属性，返回值相同。
<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;para&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>wholeText <span class="token comment">// &quot;A &quot;</span>
el<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>data <span class="token comment">// &quot;A &quot;</span>

但是，一旦移除<span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>节点，wholeText属性与data属性就会有差异，因为这时其实<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>节点下面包含了两个毗邻的文本节点。
el<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>para<span class="token punctuation">.</span>childNodes<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>wholeText <span class="token comment">// &quot;A C&quot;</span>
el<span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span>data <span class="token comment">// &quot;A &quot;</span>

length
<span class="token function">length属性返回当前文本节点的文本长度。</span>
<span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token comment">// 5</span>

nextElementSibling，previousElementSibling
nextElementSibling属性返回紧跟在当前文本节点后面的那个同级元素节点。如果取不到元素节点，则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 为</span>
<span class="token comment">// &lt;div&gt;Hello &lt;em&gt;World&lt;/em&gt;&lt;/div&gt;</span>
<span class="token keyword">var</span> tn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>firstChild<span class="token punctuation">;</span>
tn<span class="token punctuation">.</span>nextElementSibling
<span class="token comment">// &lt;em&gt;World&lt;/em&gt;</span>

previousElementSibling属性返回当前文本节点前面最近的同级元素节点。如果取不到元素节点，则返回<span class="token keyword">null</span>：。
Text 节点的方法
<span class="token function">appendData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">，deleteData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">，insertData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">，replaceData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">，subStringData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
以下<span class="token number">5</span>个方法都是编辑Text节点文本内容的方法。

<span class="token operator">-</span> <span class="token function">appendData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：在Text节点尾部追加字符串。
<span class="token operator">-</span> <span class="token function">deleteData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：删除Text节点内部的子字符串，第一个参数为子字符串开始位置，第二个参数为子字符串长度。
<span class="token operator">-</span> <span class="token function">insertData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：在Text节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。
<span class="token operator">-</span> <span class="token function">replaceData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。
<span class="token operator">-</span> <span class="token function">subStringData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：用于获取子字符串，第一个参数为子字符串在Text节点中的开始位置，第二个参数为子字符串长度。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;p&gt;Hello World&lt;/p&gt;</span>
<span class="token keyword">var</span> pElementText <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>firstChild<span class="token punctuation">;</span>

pElementText<span class="token punctuation">.</span><span class="token function">appendData</span><span class="token punctuation">(</span><span class="token string">&#39;!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 页面显示 Hello World!</span>
pElementText<span class="token punctuation">.</span><span class="token function">deleteData</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 页面显示 Hello W</span>
pElementText<span class="token punctuation">.</span><span class="token function">insertData</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello &#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 页面显示 Hello WHello</span>
pElementText<span class="token punctuation">.</span><span class="token function">replaceData</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&#39;World&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 页面显示 Hello WWorld</span>
pElementText<span class="token punctuation">.</span><span class="token function">substringData</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 页面显示不变，返回&quot;World &quot;</span>

<span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
remove方法用于移除当前Text节点。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;p&gt;Hello World&lt;/p&gt;</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>firstChild<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 现在 HTML 代码为</span>
<span class="token comment">// &lt;p&gt;&lt;/p&gt;</span>

<span class="token function">splitText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
splitText方法将Text节点一分为二，变成两个毗邻的Text节点。它的参数就是分割位置（从零开始），分割到该位置的字符前结束。如果分割位置不存在，将报错。
分割后，该方法返回分割位置后方的字符串，而原Text节点变成只包含分割位置前方的字符串。
<span class="token comment">// html 代码为 &lt;p id=&quot;p&quot;&gt;foobar&lt;/p&gt;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> textnode <span class="token operator">=</span> p<span class="token punctuation">.</span>firstChild<span class="token punctuation">;</span>

<span class="token keyword">var</span> newText <span class="token operator">=</span> textnode<span class="token punctuation">.</span><span class="token function">splitText</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
newText <span class="token comment">// &quot;bar&quot;</span>
textnode <span class="token comment">// &quot;foo&quot;</span>

父元素节点的normalize方法可以将毗邻的两个Text节点合并。
接上面的例子，文本节点的splitText方法将一个Text节点分割成两个，父元素的normalize方法可以实现逆操作，将它们合并。
p<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length <span class="token comment">// 2</span>

<span class="token comment">// 将毗邻的两个 Text 节点合并</span>
p<span class="token punctuation">.</span><span class="token function">normalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length <span class="token comment">// 1</span>

DocumentFragment 节点
DocumentFragment节点代表一个文档的片段，本身就是一个完整的 <span class="token constant">DOM</span> 树形结构。它没有父节点，parentNode返回<span class="token keyword">null</span>，但是可以插入任意数量的子节点。它不属于当前文档，操作DocumentFragment节点，要比直接操作 <span class="token constant">DOM</span> 树快得多。
它一般用于构建一个 <span class="token constant">DOM</span> 结构，然后插入当前文档。document<span class="token punctuation">.</span>createDocumentFragment方法，以及浏览器原生的DocumentFragment构造函数，可以创建一个空的DocumentFragment节点。然后再使用其他 <span class="token constant">DOM</span> 方法，向其添加子节点。
<span class="token keyword">var</span> docFrag <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">var</span> docFrag <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> li <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
li<span class="token punctuation">.</span>textContent <span class="token operator">=</span> <span class="token string">&#39;Hello World&#39;</span><span class="token punctuation">;</span>
docFrag<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>li<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>docFrag<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码创建了一个DocumentFragment节点，然后将一个li节点添加在它里面，最后将DocumentFragment节点移动到原文档。
<span class="token function">注意，DocumentFragment节点本身不能被插入当前文档。当它作为appendChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、insertBefore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、replaceChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦DocumentFragment节点被添加进当前文档，它自身就变成了空节点（textContent属性为空字符串），可以被再次使用。如果想要保存DocumentFragment节点的内容，可以使用cloneNode方法。
document
  <span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>docFrag<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面这样添加DocumentFragment节点进入当前文档，不会清空DocumentFragment节点。
下面是一个例子，使用DocumentFragment反转一个指定节点的所有子节点的顺序。
<span class="token keyword">function</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> f <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>lastChild<span class="token punctuation">)</span> f<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>lastChild<span class="token punctuation">)</span><span class="token punctuation">;</span>
  n<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

DocumentFragment节点对象没有自己的属性和方法，全部继承自Node节点和ParentNode接口。也就是说，DocumentFragment节点比Node节点多出以下四个属性。

<span class="token operator">-</span> children：返回一个动态的HTMLCollection集合对象，包括当前DocumentFragment对象的所有子元素节点。
<span class="token operator">-</span> firstElementChild：返回当前DocumentFragment对象的第一个子元素节点，如果没有则返回<span class="token keyword">null</span>。
<span class="token operator">-</span> lastElementChild：返回当前DocumentFragment对象的最后一个子元素节点，如果没有则返回<span class="token keyword">null</span>。
<span class="token operator">-</span> childElementCount：返回当前DocumentFragment对象的所有子元素数量。
属性的操作
<span class="token constant">HTML</span> 元素包括标签名和若干个键值对，这个键值对就称为“属性”（attribute）。
<span class="token operator">&lt;</span>a id<span class="token operator">=</span><span class="token string">&quot;test&quot;</span> href<span class="token operator">=</span><span class="token string">&quot;http://www.example.com&quot;</span><span class="token operator">&gt;</span>
  链接
<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>

上面代码中，a元素包括两个属性：id属性和href属性。
属性本身是一个对象（Attr对象），但是实际上，这个对象极少使用。一般都是通过元素节点对象（HTMlElement对象）来操作属性。本章介绍如何操作这些属性。
Element<span class="token punctuation">.</span>attributes 属性
元素对象有一个attributes属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。其他类型的节点对象，虽然也有attributes属性，但返回的都是<span class="token keyword">null</span>，因此可以把这个属性视为元素对象独有的。
单个属性可以通过序号引用，也可以通过属性名引用。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;body bgcolor=&quot;yellow&quot; onload=&quot;&quot;&gt;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>attributes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>attributes<span class="token punctuation">.</span>bgcolor
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>attributes<span class="token punctuation">[</span><span class="token string">&#39;ONLOAD&#39;</span><span class="token punctuation">]</span>

注意，上面代码的三种方法，返回的都是属性节点对象，而不是属性值。
属性节点对象有name和value属性，对应该属性的属性名和属性值，等同于nodeName属性和nodeValue属性。
<span class="token comment">// HTML代码为</span>
<span class="token comment">// &lt;div id=&quot;mydiv&quot;&gt;</span>
<span class="token keyword">var</span> n <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mydiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

n<span class="token punctuation">.</span>attributes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token comment">// &quot;id&quot;</span>
n<span class="token punctuation">.</span>attributes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nodeName <span class="token comment">// &quot;id&quot;</span>

n<span class="token punctuation">.</span>attributes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token comment">// &quot;mydiv&quot;</span>
n<span class="token punctuation">.</span>attributes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nodeValue <span class="token comment">// &quot;mydiv&quot;</span>

下面代码可以遍历一个元素节点的所有属性。
<span class="token keyword">var</span> para <span class="token operator">=</span> document<span class="token punctuation">.</span>getElementsByTagName<span class="token punctuation">[</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;result&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>para<span class="token punctuation">.</span><span class="token function">hasAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> attrs <span class="token operator">=</span> para<span class="token punctuation">.</span>attributes<span class="token punctuation">;</span>
  <span class="token keyword">var</span> output <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> attrs<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    output <span class="token operator">+=</span> attrs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;-&gt;&#39;</span> <span class="token operator">+</span> attrs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  result<span class="token punctuation">.</span>textContent <span class="token operator">=</span> output<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  result<span class="token punctuation">.</span>textContent <span class="token operator">=</span> <span class="token string">&#39;No attributes to show&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

元素的标准属性
<span class="token constant">HTML</span> 元素的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性。
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>id <span class="token comment">// &quot;test&quot;</span>
a<span class="token punctuation">.</span>href <span class="token comment">// &quot;http://www.example.com/&quot;</span>

上面代码中，a元素标签的属性id和href，自动成为节点对象的属性。
这些属性都是可写的。
<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myImage&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;http://www.example.com/image.jpg&#39;</span><span class="token punctuation">;</span>

上面的写法，会立刻替换掉img对象的src属性，即会显示另外一张图片。
这种修改属性的方法，常常用于添加表单的属性。
<span class="token keyword">var</span> f <span class="token operator">=</span> document<span class="token punctuation">.</span>forms<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
f<span class="token punctuation">.</span>action <span class="token operator">=</span> <span class="token string">&#39;submit.php&#39;</span><span class="token punctuation">;</span>
f<span class="token punctuation">.</span>method <span class="token operator">=</span> <span class="token string">&#39;POST&#39;</span><span class="token punctuation">;</span>

上面代码为表单添加提交网址和提交方法。
注意，这种用法虽然可以读写属性，但是无法删除属性，<span class="token keyword">delete</span>运算符在这里不会生效。
<span class="token constant">HTML</span> 元素的属性名是大小写不敏感的，但是 JavaScript 对象的属性名是大小写敏感的。转换规则是，转为 JavaScript 属性名时，一律采用小写。如果属性名包括多个单词，则采用骆驼拼写法，即从第二个单词开始，每个单词的首字母采用大写，比如onClick。
有些 <span class="token constant">HTML</span> 属性名是 JavaScript 的保留字，转为 JavaScript 属性时，必须改名。主要是以下两个。

<span class="token operator">-</span> <span class="token keyword">for</span>属性改为htmlFor
<span class="token operator">-</span> <span class="token keyword">class</span>属性改为className
另外，<span class="token constant">HTML</span> 属性值一般都是字符串，但是 JavaScript 属性会自动转换类型。比如，将字符串<span class="token boolean">true</span>转为布尔值，将onClick的值转为一个函数，将style属性的值转为一个CSSStyleDeclaration对象。因此，可以对这些属性赋予各种类型的值。
属性操作的标准方法
概述
元素节点提供六个方法，用来操作属性。
<span class="token operator">-</span> <span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> <span class="token function">getAttributeNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> <span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> <span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> <span class="token function">hasAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> <span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
这有几点注意。
（<span class="token number">1</span>）适用性
这六个方法对所有属性（包括用户自定义的属性）都适用。
（<span class="token number">2</span>）返回值
<span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>只返回字符串，不会返回其他类型的值。
（<span class="token number">3</span>）属性名
这些方法只接受属性的标准名称，不用改写保留字，比如<span class="token keyword">for</span>和<span class="token keyword">class</span>都可以直接使用。另外，这些方法对于属性名是大小写不敏感的。
<span class="token keyword">var</span> image <span class="token operator">=</span> document<span class="token punctuation">.</span>images<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
image<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;class&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;myImage&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，setAttribute方法直接使用<span class="token keyword">class</span>作为属性名，不用写成className。
Element<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>getAttribute方法返回当前元素节点的指定属性。如果指定属性不存在，则返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div id=&quot;div1&quot; align=&quot;left&quot;&gt;</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;align&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;left&quot;</span>

Element<span class="token punctuation">.</span><span class="token function">getAttributeNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span><span class="token function">getAttributeNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span>返回一个数组，成员是当前元素的所有属性的名字。如果当前元素没有任何属性，则返回一个空数组。使用Element<span class="token punctuation">.</span>attributes属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。
<span class="token keyword">var</span> mydiv <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mydiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mydiv<span class="token punctuation">.</span><span class="token function">getAttributeNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> value <span class="token operator">=</span> mydiv<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

上面代码用于遍历某个节点的所有属性。
Element<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>setAttribute方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;button&gt;Hello World&lt;/button&gt;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
b<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;myButton&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
b<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;disabled&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，button元素的name属性被设成myButton，disabled属性被设成<span class="token boolean">true</span>。
这里有两个地方需要注意，首先，属性值总是字符串，其他类型的值会自动转成字符串，比如布尔值<span class="token boolean">true</span>就会变成字符串<span class="token boolean">true</span>；其次，上例的disable属性是一个布尔属性，对于<span class="token operator">&lt;</span>button<span class="token operator">&gt;</span>元素来说，这个属性不需要属性值，只要设置了就总是会生效，因此setAttribute方法里面可以将disabled属性设成任意值。
Element<span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>hasAttribute方法返回一个布尔值，表示当前元素节点是否包含指定属性。
<span class="token keyword">var</span> d <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>d<span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;align&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  d<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;align&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码检查div节点是否含有align属性。如果有，则设置为居中对齐。
Element<span class="token punctuation">.</span><span class="token function">hasAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>hasAttributes方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回<span class="token boolean">false</span>，否则返回<span class="token boolean">true</span>。
<span class="token keyword">var</span> foo <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span><span class="token function">hasAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

Element<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Element<span class="token punctuation">.</span>removeAttribute方法移除指定属性。该方法没有返回值。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div id=&quot;div1&quot; align=&quot;left&quot; width=&quot;200px&quot;&gt;</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;align&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 现在的HTML代码为</span>
<span class="token comment">// &lt;div id=&quot;div1&quot; width=&quot;200px&quot;&gt;</span>

dataset 属性
有时，需要在<span class="token constant">HTML</span>元素上附加数据，供 JavaScript 脚本使用。一种解决方法是自定义属性。
<span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;mydiv&quot;</span> foo<span class="token operator">=</span><span class="token string">&quot;bar&quot;</span><span class="token operator">&gt;</span>

<span class="token function">上面代码为div元素自定义了foo属性，然后可以用getAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">和setAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>读写这个属性。
<span class="token keyword">var</span> n <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mydiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
n<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>
n<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;baz&#39;</span><span class="token punctuation">)</span>

这种方法虽然可以达到目的，但是会使得 <span class="token constant">HTML</span> 元素的属性不符合标准，导致网页代码通不过校验。
更好的解决方法是，使用标准提供的data<span class="token operator">-</span><span class="token operator">*</span>属性。
<span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;mydiv&quot;</span> data<span class="token operator">-</span>foo<span class="token operator">=</span><span class="token string">&quot;bar&quot;</span><span class="token operator">&gt;</span>

然后，使用元素节点对象的dataset属性，它指向一个对象，可以用来操作 <span class="token constant">HTML</span> 元素标签的data<span class="token operator">-</span><span class="token operator">*</span>属性。
<span class="token keyword">var</span> n <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mydiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
n<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>foo <span class="token comment">// bar</span>
n<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">&#39;baz&#39;</span>

上面代码中，通过dataset<span class="token punctuation">.</span>foo读写data<span class="token operator">-</span>foo属性。
删除一个data<span class="token operator">-</span><span class="token operator">*</span>属性，可以直接使用<span class="token keyword">delete</span>命令。
<span class="token keyword">delete</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>foo<span class="token punctuation">;</span>

<span class="token function">除了dataset属性，也可以用getAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;data-foo&#39;</span><span class="token punctuation">)</span><span class="token function">、removeAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;data-foo&#39;</span><span class="token punctuation">)</span><span class="token function">、setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;data-foo&#39;</span><span class="token punctuation">)</span><span class="token function">、hasAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;data-foo&#39;</span><span class="token punctuation">)</span>等方法操作data<span class="token operator">-</span><span class="token operator">*</span>属性。
注意，data<span class="token operator">-</span>后面的属性名有限制，只能包含字母、数字、连词线（<span class="token operator">-</span>）、点（<span class="token punctuation">.</span>）、冒号（<span class="token operator">:</span>）和下划线（_<span class="token punctuation">)</span>。而且，属性名不应该使用<span class="token constant">A</span>到<span class="token constant">Z</span>的大写字母，比如不能有data<span class="token operator">-</span>helloWorld这样的属性名，而要写成data<span class="token operator">-</span>hello<span class="token operator">-</span>world。
转成dataset的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。反过来，dataset的键名转成属性名时，所有大写字母都会被转成连词线<span class="token operator">+</span>该字母的小写形式，其他字符不变。比如，dataset<span class="token punctuation">.</span>helloWorld会转成data<span class="token operator">-</span>hello<span class="token operator">-</span>world。
<span class="token constant">CSS</span> 操作
<span class="token constant">CSS</span> 与 JavaScript 是两个有着明确分工的领域，前者负责页面的视觉效果，后者负责与用户的行为互动。但是，它们毕竟同属网页开发的前端，因此不可避免有着交叉和互相配合。本章介绍如何通过 JavaScript 操作 <span class="token constant">CSS</span>。
<span class="token constant">HTML</span> 元素的 style 属性
操作 <span class="token constant">CSS</span> <span class="token function">样式最简单的方法，就是使用网页元素节点的getAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">方法、setAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">方法和removeAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法，直接读写或删除网页元素的style属性。
div<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>
  <span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;background-color:red;&#39;</span> <span class="token operator">+</span> <span class="token string">&#39;border:1px solid black;&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面的代码相当于下面的 <span class="token constant">HTML</span> 代码。
<span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">&quot;background-color:red; border:1px solid black;&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>

style不仅可以使用字符串读写，它本身还是一个对象，部署了 CSSStyleDeclaration 接口（详见下面的介绍），可以直接读写个别属性。
e<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> <span class="token string">&#39;18px&#39;</span><span class="token punctuation">;</span>
e<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;black&#39;</span><span class="token punctuation">;</span>

CSSStyleDeclaration 接口
简介
CSSStyleDeclaration 接口用来操作元素的样式。三个地方部署了这个接口。

<span class="token operator">-</span> 元素节点的style属性（Element<span class="token punctuation">.</span>style）
<span class="token operator">-</span> CSSStyle实例的style属性
<span class="token operator">-</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的返回值
CSSStyleDeclaration 接口可以直接读写 <span class="token constant">CSS</span> 的样式属性，不过，连词号需要变成骆驼拼写法。
<span class="token keyword">var</span> divStyle <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">;</span>

divStyle<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">;</span>
divStyle<span class="token punctuation">.</span>border <span class="token operator">=</span> <span class="token string">&#39;1px solid black&#39;</span><span class="token punctuation">;</span>
divStyle<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token string">&#39;100px&#39;</span><span class="token punctuation">;</span>
divStyle<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token string">&#39;100px&#39;</span><span class="token punctuation">;</span>
divStyle<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> <span class="token string">&#39;10em&#39;</span><span class="token punctuation">;</span>

divStyle<span class="token punctuation">.</span>backgroundColor <span class="token comment">// red</span>
divStyle<span class="token punctuation">.</span>border <span class="token comment">// 1px solid black</span>
divStyle<span class="token punctuation">.</span>height <span class="token comment">// 100px</span>
divStyle<span class="token punctuation">.</span>width <span class="token comment">// 100px</span>

如果 <span class="token constant">CSS</span> 属性名是 JavaScript 保留字，则规则名之前需要加上字符串css，比如float写成cssFloat。
注意，该对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号。比如，divStyle<span class="token punctuation">.</span>width不能写为<span class="token number">100</span>，而要写为100px。
另外，Element<span class="token punctuation">.</span>style返回的只是行内样式，并不是该元素的全部样式。通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。元素的全部样式要通过window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>得到。
CSSStyleDeclaration 实例属性
（<span class="token number">1</span>）CSSStyleDeclaration<span class="token punctuation">.</span>cssText
CSSStyleDeclaration<span class="token punctuation">.</span>cssText属性用来读写当前规则的所有样式声明文本。
<span class="token keyword">var</span> divStyle <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">;</span>

divStyle<span class="token punctuation">.</span>cssText <span class="token operator">=</span> <span class="token string">&#39;background-color: red;&#39;</span>

<span class="token operator">-</span> <span class="token string">&#39;border: 1px solid black;&#39;</span>
<span class="token operator">-</span> <span class="token string">&#39;height: 100px;&#39;</span>
<span class="token operator">-</span> <span class="token string">&#39;width: 100px;&#39;</span><span class="token punctuation">;</span>

注意，cssText的属性值不用改写 <span class="token constant">CSS</span> 属性名。
删除一个元素的所有行内样式，最简便的方法就是设置cssText为空字符串。
divStyle<span class="token punctuation">.</span>cssText <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>

（<span class="token number">2</span>）CSSStyleDeclaration<span class="token punctuation">.</span>length
CSSStyleDeclaration<span class="token punctuation">.</span>length属性返回一个整数值，表示当前规则包含多少条样式声明。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;myDiv&quot;</span>
<span class="token comment">//   style=&quot;height: 1px;width: 100%;background-color: #CA1;&quot;</span>
<span class="token comment">// &gt;&lt;/div&gt;</span>
<span class="token keyword">var</span> myDiv <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> divStyle <span class="token operator">=</span> myDiv<span class="token punctuation">.</span>style<span class="token punctuation">;</span>
divStyle<span class="token punctuation">.</span>length <span class="token comment">// 3</span>

上面代码中，myDiv元素的行内样式共包含<span class="token number">3</span>条样式规则。
（<span class="token number">3</span>）CSSStyleDeclaration<span class="token punctuation">.</span>parentRule
CSSStyleDeclaration<span class="token punctuation">.</span>parentRule属性返回当前规则所属的那个样式块（CSSRule 实例）。如果不存在所属的样式块，该属性返回<span class="token keyword">null</span>。
该属性只读，且只在使用 CSSRule 接口时有意义。
<span class="token keyword">var</span> declaration <span class="token operator">=</span> document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>rules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>style<span class="token punctuation">;</span>
declaration<span class="token punctuation">.</span>parentRule <span class="token operator">===</span> document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>rules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token comment">// true</span>

CSSStyleDeclaration 实例方法
（<span class="token number">1</span>）CSSStyleDeclaration<span class="token punctuation">.</span><span class="token function">getPropertyPriority</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
CSSStyleDeclaration<span class="token punctuation">.</span>getPropertyPriority方法接受 <span class="token constant">CSS</span> 样式的属性名作为参数，返回一个字符串，表示有没有设置important优先级。如果有就返回important，否则返回空字符串。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div id=&quot;myDiv&quot; style=&quot;margin: 10px!important; color: red;&quot;/&gt;</span>
<span class="token keyword">var</span> style <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">;</span>
style<span class="token punctuation">.</span>margin <span class="token comment">// &quot;10px&quot;</span>
style<span class="token punctuation">.</span><span class="token function">getPropertyPriority</span><span class="token punctuation">(</span><span class="token string">&#39;margin&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;important&quot;</span>
style<span class="token punctuation">.</span><span class="token function">getPropertyPriority</span><span class="token punctuation">(</span><span class="token string">&#39;color&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;&quot;</span>

上面代码中，margin属性有important优先级，color属性没有。
（<span class="token number">2</span>）CSSStyleDeclaration<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
CSSStyleDeclaration<span class="token punctuation">.</span>getPropertyValue方法接受 <span class="token constant">CSS</span> 样式属性名作为参数，返回一个字符串，表示该属性的属性值。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div id=&quot;myDiv&quot; style=&quot;margin: 10px!important; color: red;&quot;/&gt;</span>
<span class="token keyword">var</span> style <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">;</span>
style<span class="token punctuation">.</span>margin <span class="token comment">// &quot;10px&quot;</span>
style<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token string">&quot;margin&quot;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;10px&quot;</span>

（<span class="token number">3</span>）CSSStyleDeclaration<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
CSSStyleDeclaration<span class="token punctuation">.</span>item方法接受一个整数值作为参数，返回该位置的 <span class="token constant">CSS</span> 属性名。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div id=&quot;myDiv&quot; style=&quot;color: red; background-color: white;&quot;/&gt;</span>
<span class="token keyword">var</span> style <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">;</span>
style<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// &quot;color&quot;</span>
style<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// &quot;background-color&quot;</span>

上面代码中，<span class="token number">0</span>号位置的 <span class="token constant">CSS</span> 属性名是color，<span class="token number">1</span>号位置的 <span class="token constant">CSS</span> 属性名是background<span class="token operator">-</span>color。
如果没有提供参数，这个方法会报错。如果参数值超过实际的属性数目，这个方法返回一个空字符值。
（<span class="token number">4</span>）CSSStyleDeclaration<span class="token punctuation">.</span><span class="token function">removeProperty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
CSSStyleDeclaration<span class="token punctuation">.</span>removeProperty方法接受一个属性名作为参数，在 <span class="token constant">CSS</span> 规则里面移除这个属性，返回这个属性原来的值。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div id=&quot;myDiv&quot; style=&quot;color: red; background-color: white;&quot;&gt;</span>
<span class="token comment">//   111</span>
<span class="token comment">// &lt;/div&gt;</span>
<span class="token keyword">var</span> style <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">;</span>
style<span class="token punctuation">.</span><span class="token function">removeProperty</span><span class="token punctuation">(</span><span class="token string">&#39;color&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &#39;red&#39;</span>
<span class="token comment">// HTML 代码变为</span>
<span class="token comment">// &lt;div id=&quot;myDiv&quot; style=&quot;background-color: white;&quot;&gt;</span>

上面代码中，删除color属性以后，字体颜色从红色变成默认颜色。
（<span class="token number">5</span>）CSSStyleDeclaration<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
CSSStyleDeclaration<span class="token punctuation">.</span>setProperty方法用来设置新的 <span class="token constant">CSS</span> 属性。该方法没有返回值。
该方法可以接受三个参数。

<span class="token operator">-</span> 第一个参数：属性名，该参数是必需的。
<span class="token operator">-</span> 第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。
<span class="token operator">-</span> 第三个参数：优先级，该参数可选。如果设置，唯一的合法值是important，表示 <span class="token constant">CSS</span> 规则里面的<span class="token operator">!</span>important。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div id=&quot;myDiv&quot; style=&quot;color: red; background-color: white;&quot;&gt;</span>
<span class="token comment">//   111</span>
<span class="token comment">// &lt;/div&gt;</span>
<span class="token keyword">var</span> style <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myDiv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">;</span>
style<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&#39;border&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;1px solid blue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码执行后，myDiv元素就会出现蓝色的边框。
<span class="token constant">CSS</span> 模块的侦测
<span class="token constant">CSS</span> 的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对 <span class="token constant">CSS</span> 模块的支持情况都不一样。有时候，需要知道当前浏览器是否支持某个模块，这就叫做“<span class="token constant">CSS</span>模块的侦测”。
一个比较普遍适用的方法是，判断元素的style对象的某个属性值是否为字符串。
<span class="token keyword">typeof</span> element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>animationName <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">typeof</span> element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>transform <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">;</span>

如果该 <span class="token constant">CSS</span> 属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。如果该属性不存在，则会返回<span class="token keyword">undefined</span>。
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">[</span><span class="token string">&#39;maxWidth&#39;</span><span class="token punctuation">]</span> <span class="token comment">// &quot;&quot;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">[</span><span class="token string">&#39;maximumWidth&#39;</span><span class="token punctuation">]</span> <span class="token comment">// undefined</span>

上面代码说明，这个浏览器支持max<span class="token operator">-</span>width属性，但是不支持maximum<span class="token operator">-</span>width属性。
注意，不管 <span class="token constant">CSS</span> 属性名的写法带不带连词线，style属性上都能反映出该属性是否存在。
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">[</span><span class="token string">&#39;backgroundColor&#39;</span><span class="token punctuation">]</span> <span class="token comment">// &quot;&quot;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">[</span><span class="token string">&#39;background-color&#39;</span><span class="token punctuation">]</span> <span class="token comment">// &quot;&quot;</span>

另外，使用的时候，需要把不同浏览器的 <span class="token constant">CSS</span> 前缀也考虑进去。
<span class="token keyword">var</span> content <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;content&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">typeof</span> content<span class="token punctuation">.</span>style<span class="token punctuation">[</span><span class="token string">&#39;webkitAnimation&#39;</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span>

这种侦测方法可以写成一个函数。
<span class="token keyword">function</span> <span class="token function">isPropertySupported</span><span class="token punctuation">(</span><span class="token parameter">property</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>property <span class="token keyword">in</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> prefixes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Moz&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Webkit&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;O&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ms&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Khtml&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> prefProperty <span class="token operator">=</span> property<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> property<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> prefixes<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span>prefixes<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> prefProperty<span class="token punctuation">)</span> <span class="token keyword">in</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">isPropertySupported</span><span class="token punctuation">(</span><span class="token string">&#39;background-clip&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// true</span>

<span class="token constant">CSS</span> 对象
浏览器原生提供 <span class="token constant">CSS</span> 对象，为 JavaScript 操作 <span class="token constant">CSS</span> 提供一些工具方法。
这个对象目前有两个静态方法。
<span class="token constant">CSS</span><span class="token punctuation">.</span><span class="token function">escape</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">CSS</span><span class="token punctuation">.</span>escape方法用于转义 <span class="token constant">CSS</span> 选择器里面的特殊字符。
<span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;foo#bar&quot;</span><span class="token operator">&gt;</span>

上面代码中，该元素的id属性包含一个#号，该字符在 <span class="token constant">CSS</span> 选择器里面有特殊含义。不能直接写成document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#foo#bar&#39;</span><span class="token punctuation">)</span>，只能写成document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#foo\\\\#bar&#39;</span><span class="token punctuation">)</span>。这里必须使用双斜杠的原因是，单引号字符串本身会转义一次斜杠。
<span class="token constant">CSS</span><span class="token punctuation">.</span>escape方法就用来转义那些特殊字符。
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> <span class="token constant">CSS</span><span class="token punctuation">.</span><span class="token function">escape</span><span class="token punctuation">(</span><span class="token string">&#39;foo#bar&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token constant">CSS</span><span class="token punctuation">.</span><span class="token function">supports</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">CSS</span><span class="token punctuation">.</span>supports方法返回一个布尔值，表示当前环境是否支持某一句 <span class="token constant">CSS</span> 规则。
它的参数有两种写法，一种是第一个参数是属性名，第二个参数是属性值；另一种是整个参数就是一行完整的 <span class="token constant">CSS</span> 语句。
<span class="token comment">// 第一种写法</span>
<span class="token constant">CSS</span><span class="token punctuation">.</span><span class="token function">supports</span><span class="token punctuation">(</span><span class="token string">&#39;transform-origin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;5px&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// 第二种写法</span>
<span class="token constant">CSS</span><span class="token punctuation">.</span><span class="token function">supports</span><span class="token punctuation">(</span><span class="token string">&#39;display: table-cell&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

注意，第二种写法的参数结尾不能带有分号，否则结果不准确。
<span class="token constant">CSS</span><span class="token punctuation">.</span><span class="token function">supports</span><span class="token punctuation">(</span><span class="token string">&#39;display: table-cell;&#39;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>

window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
行内样式（inline style）具有最高的优先级，改变行内样式，通常会立即反映出来。但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。
window<span class="token punctuation">.</span>getComputedStyle方法，就用来返回浏览器计算后得到的最终规则。它接受一个节点对象作为参数，返回一个 CSSStyleDeclaration 实例，包含了指定节点的最终样式信息。所谓“最终样式信息”，指的是各种 <span class="token constant">CSS</span> 规则叠加后的结果。
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> styleObj <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>div<span class="token punctuation">)</span><span class="token punctuation">;</span>
styleObj<span class="token punctuation">.</span>backgroundColor

上面代码中，得到的背景色就是div元素真正的背景色。
注意，CSSStyleDeclaration 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是只读的。
<span class="token literal-property property">getComputedStyle方法还可以接受第二个参数，表示当前元素的伪元素（比如</span><span class="token operator">:</span>before、<span class="token operator">:</span>after、<span class="token operator">:</span>first<span class="token operator">-</span>line、<span class="token operator">:</span>first<span class="token operator">-</span>letter等）。
<span class="token keyword">var</span> result <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>div<span class="token punctuation">,</span> <span class="token string">&#39;:before&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

下面的例子是如何获取元素的高度。
<span class="token keyword">var</span> elem <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;elem-container&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> styleObj <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>elem<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> height <span class="token operator">=</span> styleObj<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">var</span> height <span class="token operator">=</span> styleObj<span class="token punctuation">[</span><span class="token string">&#39;height&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> height <span class="token operator">=</span> styleObj<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token string">&#39;height&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码得到的height属性，是浏览器最终渲染出来的高度，比其他方法得到的高度更可靠。由于styleObj是 CSSStyleDeclaration 实例，所以可以使用各种 CSSStyleDeclaration 的实例属性和方法。
有几点需要注意。

<span class="token operator">-</span> CSSStyleDeclaration 实例返回的 <span class="token constant">CSS</span> <span class="token function">值都是绝对单位。比如，长度都是像素单位（返回值包括px后缀），颜色是rgb</span><span class="token punctuation">(</span>#<span class="token punctuation">,</span> #<span class="token punctuation">,</span> #<span class="token punctuation">)</span><span class="token function">或rgba</span><span class="token punctuation">(</span>#<span class="token punctuation">,</span> #<span class="token punctuation">,</span> #<span class="token punctuation">,</span> #<span class="token punctuation">)</span>格式。
<span class="token operator">-</span> <span class="token constant">CSS</span> 规则的简写形式无效。比如，想读取margin属性的值，不能直接读，只能读marginLeft、marginTop等属性；再比如，font属性也是不能直接读的，只能读font<span class="token operator">-</span>size等单个属性。
<span class="token operator">-</span> 如果读取 <span class="token constant">CSS</span> 原始的属性名，要用方括号运算符，比如styleObj<span class="token punctuation">[</span><span class="token string">&#39;z-index&#39;</span><span class="token punctuation">]</span>；如果读取骆驼拼写法的 <span class="token constant">CSS</span> 属性名，可以直接读取styleObj<span class="token punctuation">.</span>zIndex。
<span class="token operator">-</span> 该方法返回的 CSSStyleDeclaration 实例的cssText属性无效，返回<span class="token keyword">undefined</span>。
<span class="token constant">CSS</span> 伪元素
<span class="token constant">CSS</span> 伪元素是通过 <span class="token constant">CSS</span> 向 <span class="token constant">DOM</span> <span class="token literal-property property">添加的元素，主要是通过</span><span class="token operator">:</span>before和<span class="token operator">:</span>after选择器生成，然后用content属性指定伪元素的内容。
下面是一段 <span class="token constant">HTML</span> 代码。

<span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;test&quot;</span><span class="token operator">&gt;</span>Test content<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token constant">CSS</span> <span class="token literal-property property">添加伪元素</span><span class="token operator">:</span>before的写法如下。
# test<span class="token operator">:</span>before <span class="token punctuation">{</span>
  <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;Before &#39;</span><span class="token punctuation">;</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span> #<span class="token constant">FF0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

节点元素的style对象无法读写伪元素的样式，这时就要用到window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。JavaScript 获取伪元素，可以使用下面的方法。
<span class="token keyword">var</span> test <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> result <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>test<span class="token punctuation">,</span> <span class="token string">&#39;:before&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>content<span class="token punctuation">;</span>
<span class="token keyword">var</span> color <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>test<span class="token punctuation">,</span> <span class="token string">&#39;:before&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>color<span class="token punctuation">;</span>

此外，也可以使用 CSSStyleDeclaration 实例的getPropertyValue方法，获取伪元素的属性。
<span class="token keyword">var</span> result <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>test<span class="token punctuation">,</span> <span class="token string">&#39;:before&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token string">&#39;content&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> color <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>test<span class="token punctuation">,</span> <span class="token string">&#39;:before&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

StyleSheet 接口
概述
StyleSheet接口代表网页的一张样式表，包括<span class="token operator">&lt;</span>link<span class="token operator">&gt;</span>元素加载的样式表和<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>元素内嵌的样式表。
document对象的styleSheets属性，可以返回当前页面的所有StyleSheet实例（即所有样式表）。它是一个类似数组的对象。
<span class="token keyword">var</span> sheets <span class="token operator">=</span> document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">;</span>
<span class="token keyword">var</span> sheet <span class="token operator">=</span> document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
sheet <span class="token keyword">instanceof</span> <span class="token class-name">StyleSheet</span> <span class="token comment">// true</span>

如果是<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>元素嵌入的样式表，还有另一种获取StyleSheet实例的方法，就是这个节点元素的sheet属性。
<span class="token comment">// HTML 代码为 &lt;style id=&quot;myStyle&quot;&gt;&lt;/style&gt;</span>
<span class="token keyword">var</span> myStyleSheet <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myStyle&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sheet<span class="token punctuation">;</span>
myStyleSheet <span class="token keyword">instanceof</span> <span class="token class-name">StyleSheet</span> <span class="token comment">// true</span>

严格地说，StyleSheet接口不仅包括网页样式表，还包括 <span class="token constant">XML</span> 文档的样式表。所以，它有一个子类CSSStyleSheet表示网页的 <span class="token constant">CSS</span> 样式表。我们在网页里面拿到的样式表实例，实际上是CSSStyleSheet的实例。这个子接口继承了StyleSheet的所有属性和方法，并且定义了几个自己的属性，下面把这两个接口放在一起介绍。
实例属性
StyleSheet实例有以下属性。
（<span class="token number">1</span>）StyleSheet<span class="token punctuation">.</span>disabled
StyleSheet<span class="token punctuation">.</span>disabled返回一个布尔值，表示该样式表是否处于禁用状态。手动设置disabled属性为<span class="token boolean">true</span>，等同于在<span class="token operator">&lt;</span>link<span class="token operator">&gt;</span>元素里面，将这张样式表设为alternate stylesheet，即该样式表将不会生效。
注意，disabled属性只能在 JavaScript 脚本中设置，不能在 <span class="token constant">HTML</span> 语句中设置。
（<span class="token number">2</span>）Stylesheet<span class="token punctuation">.</span>href
Stylesheet<span class="token punctuation">.</span>href返回样式表的网址。对于内嵌样式表，该属性返回<span class="token keyword">null</span>。该属性只读。
document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>href

（<span class="token number">3</span>）StyleSheet<span class="token punctuation">.</span>media
StyleSheet<span class="token punctuation">.</span>media属性返回一个类似数组的对象（MediaList实例），成员是表示适用媒介的字符串。表示当前样式表是用于屏幕（screen），还是用于打印（print）或手持设备（handheld），或各种媒介都适用（all）。该属性只读，默认值是screen。
document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>media<span class="token punctuation">.</span>mediaText
<span class="token comment">// &quot;all&quot;</span>

MediaList实例的appendMedium方法，用于增加媒介；deleteMedium方法用于删除媒介。
document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>media<span class="token punctuation">.</span><span class="token function">appendMedium</span><span class="token punctuation">(</span><span class="token string">&#39;handheld&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>media<span class="token punctuation">.</span><span class="token function">deleteMedium</span><span class="token punctuation">(</span><span class="token string">&#39;print&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

（<span class="token number">4</span>）StyleSheet<span class="token punctuation">.</span>title
StyleSheet<span class="token punctuation">.</span>title属性返回样式表的title属性。
（<span class="token number">5</span>）StyleSheet<span class="token punctuation">.</span>type
StyleSheet<span class="token punctuation">.</span>type属性返回样式表的type属性，通常是text<span class="token operator">/</span>css。
document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>type  <span class="token comment">// &quot;text/css&quot;</span>

（<span class="token number">6</span>）StyleSheet<span class="token punctuation">.</span>parentStyleSheet
<span class="token constant">CSS</span> 的@<span class="token keyword">import</span>命令允许在样式表中加载其他样式表。StyleSheet<span class="token punctuation">.</span>parentStyleSheet属性返回包含了当前样式表的那张样式表。如果当前样式表是顶层样式表，则该属性返回<span class="token keyword">null</span>。
<span class="token keyword">if</span> <span class="token punctuation">(</span>stylesheet<span class="token punctuation">.</span>parentStyleSheet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  sheet <span class="token operator">=</span> stylesheet<span class="token punctuation">.</span>parentStyleSheet<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  sheet <span class="token operator">=</span> stylesheet<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

（<span class="token number">7</span>）StyleSheet<span class="token punctuation">.</span>ownerNode
StyleSheet<span class="token punctuation">.</span>ownerNode属性返回StyleSheet对象所在的 <span class="token constant">DOM</span> 节点，通常是<span class="token operator">&lt;</span>link<span class="token operator">&gt;</span>或<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>。对于那些由其他样式表引用的样式表，该属性为<span class="token keyword">null</span>。
<span class="token comment">// HTML代码为</span>
<span class="token comment">// &lt;link rel=&quot;StyleSheet&quot; href=&quot;example.css&quot; type=&quot;text/css&quot; /&gt;</span>
document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>ownerNode <span class="token comment">// [object HTMLLinkElement]</span>

（<span class="token number">8</span>）CSSStyleSheet<span class="token punctuation">.</span>cssRules
CSSStyleSheet<span class="token punctuation">.</span>cssRules属性指向一个类似数组的对象（CSSRuleList实例），里面每一个成员就是当前样式表的一条 <span class="token constant">CSS</span> 规则。使用该规则的cssText属性，可以得到 <span class="token constant">CSS</span> 规则对应的字符串。
<span class="token keyword">var</span> sheet <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#styleElement&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sheet<span class="token punctuation">;</span>

sheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cssText
<span class="token comment">// &quot;body { background-color: red; margin: 20px; }&quot;</span>

sheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cssText
<span class="token comment">// &quot;p { line-height: 1.4em; color: blue; }&quot;</span>

每条 <span class="token constant">CSS</span> 规则还有一个style属性，指向一个对象，用来读写具体的 <span class="token constant">CSS</span> 命令。
cssStyleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">;</span>
cssStyleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;purple&#39;</span><span class="token punctuation">;</span>

（<span class="token number">9</span>）CSSStyleSheet<span class="token punctuation">.</span>ownerRule
有些样式表是通过@<span class="token keyword">import</span>规则输入的，它的ownerRule属性会返回一个CSSRule实例，代表那行@<span class="token keyword">import</span>规则。如果当前样式表不是通过@<span class="token keyword">import</span>引入的，ownerRule属性返回<span class="token keyword">null</span>。
实例方法
（<span class="token number">1</span>）CSSStyleSheet<span class="token punctuation">.</span><span class="token function">insertRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
CSSStyleSheet<span class="token punctuation">.</span>insertRule方法用于在当前样式表的插入一个新的 <span class="token constant">CSS</span> 规则。
<span class="token keyword">var</span> sheet <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#styleElement&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sheet<span class="token punctuation">;</span>
sheet<span class="token punctuation">.</span><span class="token function">insertRule</span><span class="token punctuation">(</span><span class="token string">&#39;#block { color: white }&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sheet<span class="token punctuation">.</span><span class="token function">insertRule</span><span class="token punctuation">(</span><span class="token string">&#39;p { color: red }&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法可以接受两个参数，第一个参数是表示 <span class="token constant">CSS</span> 规则的字符串，这里只能有一条规则，否则会报错。第二个参数是该规则在样式表的插入位置（从<span class="token number">0</span>开始），该参数可选，默认为<span class="token number">0</span>（即默认插在样式表的头部）。注意，如果插入位置大于现有规则的数目，会报错。
该方法的返回值是新插入规则的位置序号。
注意，浏览器对脚本在样式表里面插入规则有很多限制。所以，这个方法最好放在<span class="token keyword">try</span><span class="token operator">...</span>catch里使用。
（<span class="token number">2</span>）CSSStyleSheet<span class="token punctuation">.</span><span class="token function">deleteRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
CSSStyleSheet<span class="token punctuation">.</span>deleteRule方法用来在样式表里面移除一条规则，它的参数是该条规则在cssRules对象中的位置。该方法没有返回值。
document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">deleteRule</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

实例：添加样式表
网页添加样式表有两种方式。一种是添加一张内置样式表，即在文档中添加一个<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>节点。
<span class="token comment">// 写法一</span>
<span class="token keyword">var</span> style <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;style&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
style<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;media&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;screen&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
style<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;body{color:red}&#39;</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>style<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 写法二</span>
<span class="token keyword">var</span> style <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> style <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;style&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>style<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> style<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
style<span class="token punctuation">.</span>sheet<span class="token punctuation">.</span><span class="token function">insertRule</span><span class="token punctuation">(</span><span class="token string">&#39;.foo{color:red;}&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

另一种是添加外部样式表，即在文档中添加一个<span class="token operator">&lt;</span>link<span class="token operator">&gt;</span>节点，然后将href属性指向外部样式表的 <span class="token constant">URL</span>。
<span class="token keyword">var</span> linkElm <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
linkElm<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;rel&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;stylesheet&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
linkElm<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;text/css&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
linkElm<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;reset-min.css&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>linkElm<span class="token punctuation">)</span><span class="token punctuation">;</span>

CSSRuleList 接口
CSSRuleList 接口是一个类似数组的对象，表示一组 <span class="token constant">CSS</span> 规则，成员都是 CSSRule 实例。
获取 CSSRuleList 实例，一般是通过StyleSheet<span class="token punctuation">.</span>cssRules属性。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;style id=&quot;myStyle&quot;&gt;</span>
<span class="token comment">//   h1 { color: red; }</span>
<span class="token comment">//   p { color: blue; }</span>
<span class="token comment">// &lt;/style&gt;</span>
<span class="token keyword">var</span> myStyleSheet <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myStyle&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sheet<span class="token punctuation">;</span>
<span class="token keyword">var</span> crl <span class="token operator">=</span> myStyleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">;</span>
crl <span class="token keyword">instanceof</span> <span class="token class-name">CSSRuleList</span> <span class="token comment">// true</span>

CSSRuleList 实例里面，每一条规则（CSSRule 实例）可以通过rules<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>或者rules<span class="token punctuation">[</span>index<span class="token punctuation">]</span>拿到。<span class="token constant">CSS</span> 规则的条数通过rules<span class="token punctuation">.</span>length拿到。还是用上面的例子。
crl<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">CSSRule</span> <span class="token comment">// true</span>
crl<span class="token punctuation">.</span>length <span class="token comment">// 2</span>

注意，添加规则和删除规则不能在 CSSRuleList 实例操作，而要在它的父元素 StyleSheet 实例上，通过StyleSheet<span class="token punctuation">.</span><span class="token function">insertRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span>和StyleSheet<span class="token punctuation">.</span><span class="token function">deleteRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span>操作。
CSSRule 接口
概述
一条 <span class="token constant">CSS</span> 规则包括两个部分：<span class="token constant">CSS</span> 选择器和样式声明。下面就是一条典型的 <span class="token constant">CSS</span> 规则。
<span class="token punctuation">.</span>myClass <span class="token punctuation">{</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span> red<span class="token punctuation">;</span>
  background<span class="token operator">-</span>color<span class="token operator">:</span> yellow<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

JavaScript 通过 CSSRule 接口操作 <span class="token constant">CSS</span> 规则。一般通过 CSSRuleList 接口（StyleSheet<span class="token punctuation">.</span>cssRules）获取 CSSRule 实例。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;style id=&quot;myStyle&quot;&gt;</span>
<span class="token comment">//   .myClass {</span>
<span class="token comment">//     color: red;</span>
<span class="token comment">//     background-color: yellow;</span>
<span class="token comment">//   }</span>
<span class="token comment">// &lt;/style&gt;</span>
<span class="token keyword">var</span> myStyleSheet <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myStyle&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sheet<span class="token punctuation">;</span>
<span class="token keyword">var</span> ruleList <span class="token operator">=</span> myStyleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">;</span>
<span class="token keyword">var</span> rule <span class="token operator">=</span> ruleList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
rule <span class="token keyword">instanceof</span> <span class="token class-name">CSSRule</span> <span class="token comment">// true</span>

CSSRule 实例的属性
（<span class="token number">1</span>）CSSRule<span class="token punctuation">.</span>cssText
CSSRule<span class="token punctuation">.</span>cssText属性返回当前规则的文本，还是使用上面的例子。
rule<span class="token punctuation">.</span>cssText
<span class="token comment">// &quot;.myClass { color: red; background-color: yellow; }&quot;</span>

如果规则是加载（@<span class="token keyword">import</span>）其他样式表，cssText属性返回@<span class="token keyword">import</span> <span class="token string">&#39;url&#39;</span>。
（<span class="token number">2</span>）CSSRule<span class="token punctuation">.</span>parentStyleSheet
CSSRule<span class="token punctuation">.</span>parentStyleSheet属性返回当前规则所在的样式表对象（StyleSheet 实例），还是使用上面的例子。
rule<span class="token punctuation">.</span>parentStyleSheet <span class="token operator">===</span> myStyleSheet <span class="token comment">// true</span>

（<span class="token number">3</span>）CSSRule<span class="token punctuation">.</span>parentRule
CSSRule<span class="token punctuation">.</span>parentRule属性返回包含当前规则的父规则，如果不存在父规则（即当前规则是顶层规则），则返回<span class="token keyword">null</span>。
父规则最常见的情况是，当前规则包含在@media规则代码块之中。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;style id=&quot;myStyle&quot;&gt;</span>
<span class="token comment">//   @supports (display: flex) {</span>
<span class="token comment">//     @media screen and (min-width: 900px) {</span>
<span class="token comment">//       article {</span>
<span class="token comment">//         display: flex;</span>
<span class="token comment">//       }</span>
<span class="token comment">//     }</span>
<span class="token comment">//  }</span>
<span class="token comment">// &lt;/style&gt;</span>
<span class="token keyword">var</span> myStyleSheet <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myStyle&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sheet<span class="token punctuation">;</span>
<span class="token keyword">var</span> ruleList <span class="token operator">=</span> myStyleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">;</span>

<span class="token keyword">var</span> rule0 <span class="token operator">=</span> ruleList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
rule0<span class="token punctuation">.</span>cssText
<span class="token comment">// &quot;@supports (display: flex) {</span>
<span class="token comment">//    @media screen and (min-width: 900px) {</span>
<span class="token comment">//      article { display: flex; }</span>
<span class="token comment">//    }</span>
<span class="token comment">// }&quot;</span>

<span class="token comment">// 由于这条规则内嵌其他规则，</span>
<span class="token comment">// 所以它有 cssRules 属性，且该属性是 CSSRuleList 实例</span>
rule0<span class="token punctuation">.</span>cssRules <span class="token keyword">instanceof</span> <span class="token class-name">CSSRuleList</span> <span class="token comment">// true</span>

<span class="token keyword">var</span> rule1 <span class="token operator">=</span> rule0<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
rule1<span class="token punctuation">.</span>cssText
<span class="token comment">// &quot;@media screen and (min-width: 900px) {</span>
<span class="token comment">//   article { display: flex; }</span>
<span class="token comment">// }&quot;</span>

<span class="token keyword">var</span> rule2 <span class="token operator">=</span> rule1<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
rule2<span class="token punctuation">.</span>cssText
<span class="token comment">// &quot;article { display: flex; }&quot;</span>

rule1<span class="token punctuation">.</span>parentRule <span class="token operator">===</span> rule0 <span class="token comment">// true</span>
rule2<span class="token punctuation">.</span>parentRule <span class="token operator">===</span> rule1 <span class="token comment">// true</span>

（<span class="token number">4</span>）CSSRule<span class="token punctuation">.</span>type
CSSRule<span class="token punctuation">.</span>type属性返回一个整数值，表示当前规则的类型。
最常见的类型有以下几种。

<span class="token operator">-</span> <span class="token number">1</span>：普通样式规则（CSSStyleRule 实例）
<span class="token operator">-</span> <span class="token number">3</span>：@<span class="token keyword">import</span>规则
<span class="token operator">-</span> <span class="token number">4</span>：@media规则（CSSMediaRule 实例）
<span class="token operator">-</span> <span class="token number">5</span>：@font<span class="token operator">-</span>face规则
CSSStyleRule 接口
如果一条 <span class="token constant">CSS</span> 规则是普通的样式规则（不含特殊的 <span class="token constant">CSS</span> 命令），那么除了 CSSRule 接口，它还部署了 CSSStyleRule 接口。
CSSStyleRule 接口有以下两个属性。
（<span class="token number">1</span>）CSSStyleRule<span class="token punctuation">.</span>selectorText
CSSStyleRule<span class="token punctuation">.</span>selectorText属性返回当前规则的选择器。
<span class="token keyword">var</span> stylesheet <span class="token operator">=</span> document<span class="token punctuation">.</span>styleSheets<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
stylesheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>selectorText <span class="token comment">// &quot;.myClass&quot;</span>

注意，这个属性是可写的。
（<span class="token number">2</span>）CSSStyleRule<span class="token punctuation">.</span>style
CSSStyleRule<span class="token punctuation">.</span>style属性返回一个对象（CSSStyleDeclaration 实例），代表当前规则的样式声明，也就是选择器后面的大括号里面的部分。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;style id=&quot;myStyle&quot;&gt;</span>
<span class="token comment">//   p { color: red; }</span>
<span class="token comment">// &lt;/style&gt;</span>
<span class="token keyword">var</span> styleSheet <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myStyle&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sheet<span class="token punctuation">;</span>
styleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>style <span class="token keyword">instanceof</span> <span class="token class-name">CSSStyleDeclaration</span>
<span class="token comment">// true</span>

CSSStyleDeclaration 实例的cssText属性，可以返回所有样式声明，格式为字符串。
styleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>cssText
<span class="token comment">// &quot;color: red;&quot;</span>
styleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>selectorText
<span class="token comment">// &quot;p&quot;</span>

CSSMediaRule 接口
如果一条 <span class="token constant">CSS</span> 规则是@media代码块，那么它除了 CSSRule 接口，还部署了 CSSMediaRule 接口。
该接口主要提供media属性和conditionText属性。前者返回代表@media规则的一个对象（MediaList 实例），后者返回@media规则的生效条件。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;style id=&quot;myStyle&quot;&gt;</span>
<span class="token comment">//   @media screen and (min-width: 900px) {</span>
<span class="token comment">//     article { display: flex; }</span>
<span class="token comment">//   }</span>
<span class="token comment">// &lt;/style&gt;</span>
<span class="token keyword">var</span> styleSheet <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myStyle&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sheet<span class="token punctuation">;</span>
styleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">CSSMediaRule</span>
<span class="token comment">// true</span>

styleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>media
<span class="token comment">//  {</span>
<span class="token comment">//    0: &quot;screen and (min-width: 900px)&quot;,</span>
<span class="token comment">//    appendMedium: function,</span>
<span class="token comment">//    deleteMedium: function,</span>
<span class="token comment">//    item: function,</span>
<span class="token comment">//    length: 1,</span>
<span class="token comment">//    mediaText: &quot;screen and (min-width: 900px)&quot;</span>
<span class="token comment">// }</span>

styleSheet<span class="token punctuation">.</span>cssRules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>conditionText
<span class="token comment">// &quot;screen and (min-width: 900px)&quot;</span>

window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
基本用法
window<span class="token punctuation">.</span>matchMedia方法用来将 <span class="token constant">CSS</span> 的MediaQueryMediaQuery条件语句，转换成一个 MediaQueryList 实例。
<span class="token keyword">var</span> mdl <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&#39;(min-width: 400px)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mdl <span class="token keyword">instanceof</span> <span class="token class-name">MediaQueryList</span> <span class="token comment">// true</span>

上面代码中，变量mdl就是 mediaQueryList 的实例。
注意，如果参数不是有效的MediaQuery条件语句，window<span class="token punctuation">.</span>matchMedia不会报错，依然返回一个 MediaQueryList 实例。
window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&#39;bad string&#39;</span><span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">MediaQueryList</span> <span class="token comment">// true</span>

MediaQueryList 接口的实例属性
MediaQueryList 实例有三个属性。
（<span class="token number">1</span>）MediaQueryList<span class="token punctuation">.</span>media
MediaQueryList<span class="token punctuation">.</span>media属性返回一个字符串，表示对应的 MediaQuery 条件语句。
<span class="token keyword">var</span> mql <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&#39;(min-width: 400px)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mql<span class="token punctuation">.</span>media <span class="token comment">// &quot;(min-width: 400px)&quot;</span>

（<span class="token number">2</span>）MediaQueryList<span class="token punctuation">.</span>matches
MediaQueryList<span class="token punctuation">.</span>matches属性返回一个布尔值，表示当前页面是否符合指定的 MediaQuery 条件语句。
<span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&#39;(min-width: 400px)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>matches<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/*当前视口不小于 400 像素*/</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">/*当前视口小于 400 像素*/</span>
<span class="token punctuation">}</span>

下面的例子根据mediaQuery是否匹配当前环境，加载相应的 <span class="token constant">CSS</span> 样式表。
<span class="token keyword">var</span> result <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&quot;(max-width: 700px)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">.</span>matches<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> linkElm <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  linkElm<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;rel&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;stylesheet&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  linkElm<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;text/css&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  linkElm<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;small.css&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  document<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>linkElm<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

（<span class="token number">3</span>）MediaQueryList<span class="token punctuation">.</span>onchange
如果 MediaQuery 条件语句的适配环境发生变化，会触发change事件。MediaQueryList<span class="token punctuation">.</span>onchange属性用来指定change事件的监听函数。该函数的参数是change事件对象（MediaQueryListEvent 实例），该对象与 MediaQueryList 实例类似，也有media和matches属性。
<span class="token keyword">var</span> mql <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&#39;(max-width: 600px)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mql<span class="token punctuation">.</span><span class="token function-variable function">onchange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>matches<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/*视口不超过 600 像素*/</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">/*视口超过 600 像素*/</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

上面代码中，change事件发生后，存在两种可能。一种是显示宽度从<span class="token number">600</span>像素以上变为以下，另一种是从<span class="token number">600</span>像素以下变为以上，所以在监听函数内部要判断一下当前是哪一种情况。
MediaQueryList 接口的实例方法
MediaQueryList 实例有两个方法MediaQueryList<span class="token punctuation">.</span><span class="token function">addListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>和MediaQueryList<span class="token punctuation">.</span><span class="token function">removeListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，用来为change事件添加或撤销监听函数。
<span class="token keyword">var</span> mql <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&#39;(max-width: 600px)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 指定监听函数</span>
mql<span class="token punctuation">.</span><span class="token function">addListener</span><span class="token punctuation">(</span>mqCallback<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 撤销监听函数</span>
mql<span class="token punctuation">.</span><span class="token function">removeListener</span><span class="token punctuation">(</span>mqCallback<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">mqCallback</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>matches<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/*视口不超过 600 像素*/</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">/*视口超过 600 像素*/</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

注意，MediaQueryList<span class="token punctuation">.</span><span class="token function">removeListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法不能撤销MediaQueryList<span class="token punctuation">.</span>onchange属性指定的监听函数。
Mutation Observer <span class="token constant">API</span>
概述
Mutation Observer <span class="token constant">API</span> 用来监视 <span class="token constant">DOM</span> 变动。<span class="token constant">DOM</span> 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 <span class="token constant">API</span> 都可以得到通知。
概念上，它很接近事件，可以理解为 <span class="token constant">DOM</span> 发生变动就会触发 Mutation Observer 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，<span class="token constant">DOM</span> 的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，<span class="token constant">DOM</span> 的变动并不会马上触发，而是要等到当前所有 <span class="token constant">DOM</span> 操作都结束才触发。
这样设计是为了应付 <span class="token constant">DOM</span> 变动频繁的特点。举例来说，如果文档中连续插入<span class="token number">1000</span>个<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>元素，就会连续触发<span class="token number">1000</span>个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 Mutation Observer 完全不同，只在<span class="token number">1000</span>个段落都插入结束后才会触发，而且只触发一次。
Mutation Observer 有以下特点。

<span class="token operator">-</span> 它等待所有脚本任务完成后，才会运行（即异步触发方式）。
<span class="token operator">-</span> 它把 <span class="token constant">DOM</span> 变动记录封装成一个数组进行处理，而不是一条条个别处理 <span class="token constant">DOM</span> 变动。
<span class="token operator">-</span> 它既可以观察 <span class="token constant">DOM</span> 的所有类型变动，也可以指定只观察某一类变动。
MutationObserver 构造函数
使用时，首先使用MutationObserver构造函数，新建一个观察器实例，同时指定这个实例的回调函数。
<span class="token keyword">var</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中的回调函数，会在每次 <span class="token constant">DOM</span> 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例，下面是一个例子。
<span class="token keyword">var</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">mutations<span class="token punctuation">,</span> observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  mutations<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">mutation</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mutation<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

MutationObserver 的实例方法
<span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来启动监听，它接受两个参数。

<span class="token operator">-</span> 第一个参数：所要观察的 <span class="token constant">DOM</span> 节点
<span class="token operator">-</span> 第二个参数：一个配置对象，指定所要观察的特定变动
<span class="token keyword">var</span> article <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;article&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span>  options <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;childList&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;attributes&#39;</span><span class="token operator">:</span><span class="token boolean">true</span>
<span class="token punctuation">}</span> <span class="token punctuation">;</span>

observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>article<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">上面代码中，observe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法接受两个参数，第一个是所要观察的<span class="token constant">DOM</span>元素是article，第二个是所要观察的变动类型（子节点变动和属性变动）。
观察器所能观察的 <span class="token constant">DOM</span> 变动类型（即上面代码的options对象），有以下几种。

<span class="token operator">-</span> childList：子节点的变动（指新增，删除或者更改）。
<span class="token operator">-</span> attributes：属性的变动。
<span class="token operator">-</span> characterData：节点内容或节点文本的变动。
想要观察哪一种变动类型，就在option对象中指定它的值为<span class="token boolean">true</span>。需要注意的是，至少必须同时指定这三种观察的一种，若均未指定将报错。
除了变动类型，options对象还可以设定以下属性：
<span class="token operator">-</span> subtree：布尔值，表示是否将该观察器应用于该节点的所有后代节点。
<span class="token operator">-</span> attributeOldValue：布尔值，表示观察attributes变动时，是否需要记录变动前的属性值。
<span class="token operator">-</span> characterDataOldValue：布尔值，表示观察characterData变动时，是否需要记录变动前的值。
<span class="token operator">-</span> attributeFilter：数组，表示需要观察的特定属性（比如<span class="token punctuation">[</span><span class="token string">&#39;class&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">]</span>）。
<span class="token comment">// 开始监听文档根节点（即&lt;html&gt;标签）的变动</span>
mutationObserver<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">attributes</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">characterData</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">childList</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">subtree</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attributeOldValue</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">characterDataOldValue</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">对一个节点添加观察器，就像使用addEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法一样，多次添加同一个观察器是无效的，回调函数依然只会触发一次。如果指定不同的options对象，以后面添加的那个为准，类似覆盖。
下面的例子是观察新增的子节点。
<span class="token keyword">var</span> insertedNodes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">mutations</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  mutations<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">mutation</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> mutation<span class="token punctuation">.</span>addedNodes<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      insertedNodes<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>mutation<span class="token punctuation">.</span>addedNodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>insertedNodes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>document<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">childList</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">subtree</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，takeRecords（）
<span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来停止观察。调用该方法后，<span class="token constant">DOM</span> 再发生变动，也不会触发观察器。
observer<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">takeRecords</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组。
observer<span class="token punctuation">.</span><span class="token function">takeRecords</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

下面是一个例子。
<span class="token comment">// 保存所有没有被观察器处理的变动</span>
<span class="token keyword">var</span> changes <span class="token operator">=</span> mutationObserver<span class="token punctuation">.</span><span class="token function">takeRecords</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 停止观察</span>
mutationObserver<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

MutationRecord 对象
<span class="token constant">DOM</span> 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息。Mutation Observer 处理的就是一个个MutationRecord实例所组成的数组。
MutationRecord对象包含了<span class="token constant">DOM</span>的相关信息，有如下属性：

<span class="token operator">-</span> type：观察的变动类型（attributes、characterData或者childList）。
<span class="token operator">-</span> target：发生变动的<span class="token constant">DOM</span>节点。
<span class="token operator">-</span> addedNodes：新增的<span class="token constant">DOM</span>节点。
<span class="token operator">-</span> removedNodes：删除的<span class="token constant">DOM</span>节点。
<span class="token operator">-</span> previousSibling：前一个同级节点，如果没有则返回<span class="token keyword">null</span>。
<span class="token operator">-</span> nextSibling：下一个同级节点，如果没有则返回<span class="token keyword">null</span>。
<span class="token operator">-</span> attributeName：发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
<span class="token operator">-</span> oldValue：变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回<span class="token keyword">null</span>。
应用示例
子元素的变动
下面的例子说明如何读取变动记录。
<span class="token keyword">var</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">records</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  records<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">record</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Mutation type: &#39;</span> <span class="token operator">+</span> record<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Mutation target: &#39;</span> <span class="token operator">+</span> record<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> mo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> option <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;childList&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;subtree&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

mo<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">,</span> option<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码的观察器，观察<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>的所有下级节点（childList表示观察子节点，subtree表示观察后代节点）的变动。回调函数会在控制台显示所有变动的类型和目标节点。
属性的变动
下面的例子说明如何追踪属性的变动。
<span class="token keyword">var</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">records</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  records<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">record</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Previous attribute value: &#39;</span> <span class="token operator">+</span> record<span class="token punctuation">.</span>oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> mo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;#my_element&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;attributes&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;attributeOldValue&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

mo<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码先设定追踪属性变动（<span class="token string">&#39;attributes&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span>），然后设定记录变动前的值。实际发生变动时，会将变动前的值显示在控制台。
取代 DOMContentLoaded 事件
网页加载的时候，<span class="token constant">DOM</span> 节点的生成会产生变动记录，因此只要观察 <span class="token constant">DOM</span> 的变动，就能在第一时间触发相关事件，也就没有必要使用DOMContentLoaded事件。
<span class="token keyword">var</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">childList</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">subtree</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，监听document<span class="token punctuation">.</span>documentElement（即网页的<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span><span class="token constant">HTML</span> 节点）的子节点的变动，subtree属性指定监听还包括后代节点。因此，任意一个网页元素一旦生成，就能立刻被监听到。
下面的代码，使用MutationObserver对象封装一个监听 <span class="token constant">DOM</span> <span class="token function">生成的函数。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">win</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token string">&#39;use strict&#39;</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> listeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> doc <span class="token operator">=</span> win<span class="token punctuation">.</span>document<span class="token punctuation">;</span>
  <span class="token keyword">var</span> MutationObserver <span class="token operator">=</span> win<span class="token punctuation">.</span>MutationObserver <span class="token operator">||</span> win<span class="token punctuation">.</span>WebKitMutationObserver<span class="token punctuation">;</span>
  <span class="token keyword">var</span> observer<span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">ready</span><span class="token punctuation">(</span><span class="token parameter">selector<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 储存选择器和回调函数</span>
    listeners<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">selector</span><span class="token operator">:</span> selector<span class="token punctuation">,</span>
      <span class="token literal-property property">fn</span><span class="token operator">:</span> fn
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>observer<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 监听document变化</span>
      observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>check<span class="token punctuation">)</span><span class="token punctuation">;</span>
      observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>doc<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">childList</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtree</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 检查该节点是否已经在DOM中</span>
    <span class="token function">check</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">check</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 检查是否匹配已储存的节点</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> listeners<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">var</span> listener <span class="token operator">=</span> listeners<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token comment">// 检查指定节点是否有匹配</span>
      <span class="token keyword">var</span> elements <span class="token operator">=</span> doc<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span>listener<span class="token punctuation">.</span>selector<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> elements<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">var</span> element <span class="token operator">=</span> elements<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// 确保回调函数只会对该元素调用一次</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>element<span class="token punctuation">.</span>ready<span class="token punctuation">)</span><span class="token punctuation">{</span>
          element<span class="token punctuation">.</span>ready <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
          <span class="token comment">// 对该节点调用回调函数</span>
          listener<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 对外暴露ready</span>
  win<span class="token punctuation">.</span>ready <span class="token operator">=</span> ready<span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用方法</span>
<span class="token function">ready</span><span class="token punctuation">(</span><span class="token string">&#39;.foo&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","dom.html.vue"]]);export{k as default};
