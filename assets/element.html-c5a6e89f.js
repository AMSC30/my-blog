import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const e={},p=t(`<h1 id="element" tabindex="-1"><a class="header-anchor" href="#element" aria-hidden="true">#</a> Element</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>image
概述
<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素用于插入图片，主要继承了 HTMLImageElement 接口。
浏览器提供一个原生构造函数Image，用于生成HTMLImageElement实例。
<span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img <span class="token keyword">instanceof</span> <span class="token class-name">Image</span> <span class="token comment">// true</span>
img <span class="token keyword">instanceof</span> <span class="token class-name">HTMLImageElement</span> <span class="token comment">// true</span>

Image构造函数可以接受两个整数作为参数，分别表示<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的宽度和高度。
<span class="token comment">// 语法</span>
<span class="token function">Image</span><span class="token punctuation">(</span>width<span class="token punctuation">,</span> height<span class="token punctuation">)</span>

<span class="token comment">// 用法</span>
<span class="token keyword">var</span> myImage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>实例的src属性可以定义图像的网址。
<span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;picture.jpg&#39;</span><span class="token punctuation">;</span>

新生成的<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>实例并不属于文档的一部分。如果想让它显示在文档中，必须手动插入文档。
<span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;image1.png&#39;</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>

除了使用Image构造，下面的方法也可以得到HTMLImageElement实例。

<span class="token operator">-</span> document<span class="token punctuation">.</span>images的成员
<span class="token operator">-</span> 节点选取方法（比如document<span class="token punctuation">.</span>getElementById）得到的<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>节点
<span class="token operator">-</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span>生成的<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>节点
document<span class="token punctuation">.</span>images<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">HTMLImageElement</span>
<span class="token comment">// true</span>

<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myImg&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img <span class="token keyword">instanceof</span> <span class="token class-name">HTMLImageElement</span>
<span class="token comment">// true</span>

<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img <span class="token keyword">instanceof</span> <span class="token class-name">HTMLImageElement</span>
<span class="token comment">// true</span>

HTMLImageElement实例除了具有 Node、Element、HTMLElement 接口以外，还拥有一些独有的属性。这个接口没有定义自己的方法。
特性相关的属性
（<span class="token number">1</span>）HTMLImageElement<span class="token punctuation">.</span>src
HTMLImageElement<span class="token punctuation">.</span>src属性返回图像的完整网址。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;img width=&quot;300&quot; height=&quot;400&quot; id=&quot;myImg&quot; src=&quot;http://example.com/pic.jpg&quot;&gt;</span>
<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token comment">// &lt;http://example.com/pic.jpg&gt;</span>

（<span class="token number">2</span>）HTMLImageElement<span class="token punctuation">.</span>currentSrc
HTMLImageElement<span class="token punctuation">.</span>currentSrc属性返回当前正在展示的图像的网址。JavaScript 和 <span class="token constant">CSS</span> 的 mediaQuery 都可能改变正在展示的图像。
（<span class="token number">3</span>）HTMLImageElement<span class="token punctuation">.</span>alt
HTMLImageElement<span class="token punctuation">.</span>alt属性可以读写<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>的 <span class="token constant">HTML</span> 属性alt，表示对图片的文字说明。
（<span class="token number">4</span>）HTMLImageElement<span class="token punctuation">.</span>isMap，HTMLImageElement<span class="token punctuation">.</span>useMap
HTMLImageElement<span class="token punctuation">.</span>isMap属性对应<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性ismap，返回一个布尔值，表示图像是否为服务器端的图像映射的一部分。
HTMLImageElement<span class="token punctuation">.</span>useMap属性对应<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性usemap，表示当前图像对应的<span class="token operator">&lt;</span>map<span class="token operator">&gt;</span>元素。
（<span class="token number">5</span>）HTMLImageElement<span class="token punctuation">.</span>srcset，HTMLImageElement<span class="token punctuation">.</span>sizes
HTMLImageElement<span class="token punctuation">.</span>srcset属性和HTMLImageElement<span class="token punctuation">.</span>sizes属性，分别用于读写<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的srcset属性和sizes属性。它们用于<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的响应式加载。srcset属性可以单独使用，但是sizes属性必须与srcset属性同时使用。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;img srcset=&quot;example-320w.jpg 320w,</span>
<span class="token comment">//              example-480w.jpg 480w,</span>
<span class="token comment">//              example-800w.jpg 800w&quot;</span>
<span class="token comment">//      sizes=&quot;(max-width: 320px) 280px,</span>
<span class="token comment">//             (max-width: 480px) 440px,</span>
<span class="token comment">//             800px&quot;</span>
<span class="token comment">//      id=&quot;myImg&quot;</span>
<span class="token comment">//      src=&quot;example-800w.jpg&quot;&gt;</span>
<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myImg&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>srcset
<span class="token comment">// &quot;example-320w.jpg 320w,</span>
<span class="token comment">//  example-480w.jpg 480w,</span>
<span class="token comment">//  example-800w.jpg 800w&quot;</span>

img<span class="token punctuation">.</span>sizes
<span class="token comment">// &quot;(max-width: 320px) 280px,</span>
<span class="token comment">//  (max-width: 480px) 440px,</span>
<span class="token comment">//  800px&quot;</span>

上面代码中，sizes属性指定，对于小于320px的屏幕，图像的宽度为280px；对于小于480px的屏幕，图像宽度为440px；其他情况下，图像宽度为800px。然后，浏览器会根据当前屏幕下的图像宽度，到srcset属性加载宽度最接近的图像。
HTMLImageElement<span class="token punctuation">.</span>width，HTMLImageElement<span class="token punctuation">.</span>height
width属性表示<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>的 <span class="token constant">HTML</span> 宽度，height属性表示高度。这两个属性返回的都是整数。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;img width=&quot;300&quot; height=&quot;400&quot; id=&quot;myImg&quot; src=&quot;pic.jpg&quot;&gt;</span>
<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>width <span class="token comment">// 300</span>
img<span class="token punctuation">.</span>height <span class="token comment">// 400</span>

如果图像还没有加载，这两个属性返回的都是<span class="token number">0</span>。
如果 <span class="token constant">HTML</span> 代码没有设置width和height属性，则它们返回的是图像的实际宽度和高度，即HTMLImageElement<span class="token punctuation">.</span>naturalWidth属性和HTMLImageElement<span class="token punctuation">.</span>naturalHeight属性。
HTMLImageElement<span class="token punctuation">.</span>naturalWidth，HTMLImageElement<span class="token punctuation">.</span>naturalHeight
HTMLImageElement<span class="token punctuation">.</span>naturalWidth属性表示图像的实际宽度（单位像素），HTMLImageElement<span class="token punctuation">.</span>naturalHeight属性表示实际高度。这两个属性返回的都是整数。
如果图像还没有指定或不可得，这两个属性都等于<span class="token number">0</span>。
<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>img<span class="token punctuation">.</span>naturalHeight <span class="token operator">&gt;</span> img<span class="token punctuation">.</span>naturalWidth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  img<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;portrait&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，如果图片的高度大于宽度，则设为portrait模式。
HTMLImageElement<span class="token punctuation">.</span>complete
HTMLImageElement<span class="token punctuation">.</span>complete属性返回一个布尔值，表示图表是否已经加载完成。如果<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素没有src属性，也会返回<span class="token boolean">true</span>。
HTMLImageElement<span class="token punctuation">.</span>crossOrigin
HTMLImageElement<span class="token punctuation">.</span>crossOrigin属性用于读写<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的crossorigin属性，表示跨域设置。
这个属性有两个可能的值。

<span class="token operator">-</span> anonymous：跨域请求不要求用户身份（credentials），这是默认值。
<span class="token operator">-</span> use<span class="token operator">-</span>credentials：跨域请求要求用户身份。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;img crossorigin=&quot;anonymous&quot; id=&quot;myImg&quot; src=&quot;pic.jpg&quot;&gt;</span>
<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>crossOrigin <span class="token comment">// &quot;anonymous&quot;</span>

HTMLImageElement<span class="token punctuation">.</span>referrerPolicy
HTMLImageElement<span class="token punctuation">.</span>referrerPolicy用来读写<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性referrerpolicy，表示请求图像资源时，如何处理 <span class="token constant">HTTP</span> 请求的referrer字段。
它有五个可能的值。

<span class="token operator">-</span> no<span class="token operator">-</span>referrer：不带有referrer字段。
<span class="token operator">-</span> no<span class="token operator">-</span>referrer<span class="token operator">-</span>when<span class="token operator">-</span>downgrade：如果请求的地址不是 <span class="token constant">HTTPS</span> 协议，就不带有referrer字段，这是默认值。
<span class="token operator">-</span> origin：referrer字段是当前网页的地址，包含协议、域名和端口。
<span class="token operator">-</span> origin<span class="token operator">-</span>when<span class="token operator">-</span>cross<span class="token operator">-</span>origin：如果请求的地址与当前网页是同源关系，那么referrer字段将带有完整路径，否则将只包含协议、域名和端口。
<span class="token operator">-</span> unsafe<span class="token operator">-</span>url：referrer字段包含当前网页的地址，除了协议、域名和端口以外，还包括路径。这个设置是不安全的，因为会泄漏路径信息。
HTMLImageElement<span class="token punctuation">.</span>x，HTMLImageElement<span class="token punctuation">.</span>y
HTMLImageElement<span class="token punctuation">.</span>x属性返回图像左上角相对于页面左上角的横坐标，HTMLImageElement<span class="token punctuation">.</span>y属性返回纵坐标。
事件属性
图像加载完成，会触发onload属性指定的回调函数。
<span class="token comment">// HTML 代码为 &lt;img src=&quot;example.jpg&quot; onload=&quot;loadImage()&quot;&gt;</span>
<span class="token keyword">function</span> <span class="token function">loadImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Image is loaded&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

图像加载过程中发生错误，会触发onerror属性指定的回调函数。
<span class="token comment">// HTML 代码为 &lt;img src=&quot;image.gif&quot; onerror=&quot;myFunction()&quot;&gt;</span>
<span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;There is something wrong&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

 a元素

<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素用来设置链接。除了网页元素的通用接口（Node接口、Element接口、HTMLElement接口），它还继承了HTMLAnchorElement接口和HTMLHyperlinkElementUtils接口。

属性

<span class="token constant">URL</span> 相关属性

<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素有一系列 <span class="token constant">URL</span> 相关属性，可以用来操作链接地址。这些属性的含义，可以参见Location对象的实例属性。

<span class="token operator">-</span> hash：片段识别符（以#开头）
<span class="token operator">-</span> host：主机和端口（默认端口<span class="token number">80</span>和<span class="token number">443</span>会省略）
<span class="token operator">-</span> hostname：主机名
<span class="token operator">-</span> href：完整的 <span class="token constant">URL</span>
<span class="token operator">-</span> origin：协议、域名和端口
<span class="token operator">-</span> password：主机名前的密码
<span class="token operator">-</span> pathname：路径（以<span class="token operator">/</span>开头）
<span class="token operator">-</span> port：端口
<span class="token operator">-</span> protocol：协议（包含尾部的冒号<span class="token operator">:</span>）
<span class="token operator">-</span> search：查询字符串（以<span class="token operator">?</span>开头）
<span class="token operator">-</span> username：主机名前的用户名

<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;http://user:passwd@example.com:8081/index.html?bar=1#foo&quot;&gt;test&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>hash <span class="token comment">// &quot;#foo&quot;</span>
a<span class="token punctuation">.</span>host <span class="token comment">// &quot;example.com:8081&quot;</span>
a<span class="token punctuation">.</span>hostname <span class="token comment">// &quot;example.com&quot;</span>
a<span class="token punctuation">.</span>href <span class="token comment">// &quot;http://user:passed@example.com:8081/index.html?bar=1#foo&quot;</span>
a<span class="token punctuation">.</span>origin <span class="token comment">// &quot;http://example.com:8081&quot;</span>
a<span class="token punctuation">.</span>password <span class="token comment">// &quot;passwd&quot;</span>
a<span class="token punctuation">.</span>pathname <span class="token comment">// &quot;/index.html&quot;</span>
a<span class="token punctuation">.</span>port <span class="token comment">// &quot;8081&quot;</span>
a<span class="token punctuation">.</span>protocol <span class="token comment">// &quot;http:&quot;</span>
a<span class="token punctuation">.</span>search <span class="token comment">// &quot;?bar=1&quot;</span>
a<span class="token punctuation">.</span>username <span class="token comment">// &quot;user&quot;</span>

除了origin属性是只读的，上面这些属性都是可读写的。

accessKey 属性

accessKey属性用来读写<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的快捷键。

<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;http://example.com&quot;&gt;test&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>accessKey <span class="token operator">=</span> <span class="token string">&#39;k&#39;</span><span class="token punctuation">;</span>

上面代码设置<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的快捷键为k，以后只要按下这个快捷键，浏览器就会跳转到example<span class="token punctuation">.</span>com。

注意，不同的浏览器在不同的操作系统下，唤起快捷键的功能键组合是不一样的。比如，Chrome 浏览器在 Linux 系统下，需要按下Alt <span class="token operator">+</span> k，才会跳转到example<span class="token punctuation">.</span>com。
download 属性
download属性表示当前链接不是用来浏览，而是用来下载的。它的值是一个字符串，表示用户下载得到的文件名。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;foo.jpg&quot;&gt;下载&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>download <span class="token operator">=</span> <span class="token string">&#39;bar.jpg&#39;</span><span class="token punctuation">;</span>

上面代码中，<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素是一个图片链接，默认情况下，点击后图片会在当前窗口加载。设置了download属性以后，再点击这个链接，就会下载对话框，询问用户保存位置，而且下载的文件名为bar<span class="token punctuation">.</span>jpg。
hreflang 属性
hreflang属性用来读写<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性hreflang，表示链接指向的资源的语言，比如hreflang<span class="token operator">=</span><span class="token string">&quot;en&quot;</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;https://example.com&quot; hreflang=&quot;en&quot;&gt;test&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>hreflang <span class="token comment">// &quot;en&quot;</span>

referrerPolicy 属性
referrerPolicy属性用来读写<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性referrerPolicy，指定当用户点击链接时，如何发送 <span class="token constant">HTTP</span> 头信息的referer字段。
<span class="token constant">HTTP</span> 头信息的referer字段，表示当前请求是从哪里来的。它的格式可以由<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的referrerPolicy属性指定，共有三个值可以选择。

<span class="token operator">-</span> no<span class="token operator">-</span>referrer：不发送referer字段。
<span class="token operator">-</span> origin：referer字段的值是<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的origin属性，即协议 <span class="token operator">+</span> 主机名 <span class="token operator">+</span> 端口。
<span class="token operator">-</span> unsafe<span class="token operator">-</span>url：referer字段的值是origin属性再加上路径，但不包含#片段。这种格式提供的信息最详细，可能存在信息泄漏的风险。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;https://example.com&quot; referrerpolicy=&quot;no-referrer&quot;&gt;test&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>referrerPolicy <span class="token comment">// &quot;no-referrer&quot;</span>

rel 属性
rel属性用来读写<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性rel，表示链接与当前文档的关系。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;https://example.com&quot; rel=&quot;license&quot;&gt;license.html&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>rel <span class="token comment">// &quot;license&quot;</span>

tabIndex 属性
tabIndex属性的值是一个整数，用来读写当前<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素在文档里面的 Tab 键遍历顺序。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;https://example.com&quot;&gt;test&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>tabIndex <span class="token comment">// 0</span>

target 属性
target属性用来读写<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性target。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;https://example.com&quot; target=&quot;_blank&quot;&gt;test&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>target <span class="token comment">// &quot;_blank&quot;</span>

text 属性
text属性用来读写<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的链接文本，等同于当前节点的textContent属性。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; href=&quot;https://example.com&quot;&gt;test&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>text <span class="token comment">// &quot;test&quot;</span>

type 属性
type属性用来读写<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性type，表示链接目标的 <span class="token constant">MIME</span> 类型。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;a id=&quot;test&quot; type=&quot;video/mp4&quot; href=&quot;example.mp4&quot;&gt;video&lt;/a&gt;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>type <span class="token comment">// &quot;video/mp4&quot;</span>

方法
<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的方法都是继承的，主要有以下三个。

<span class="token operator">-</span> <span class="token function">blur</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：从当前元素移除键盘焦点，详见HTMLElement接口的介绍。
<span class="token operator">-</span> <span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：当前元素得到键盘焦点，详见HTMLElement接口的介绍。
<span class="token operator">-</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回当前<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 属性href。

 button元素
<span class="token operator">&lt;</span>button<span class="token operator">&gt;</span>元素继承了HTMLButtonElement接口。它有以下的实例属性。
（<span class="token number">1</span>）HTMLButtonElement<span class="token punctuation">.</span>accessKey
HTMLButtonElement<span class="token punctuation">.</span>accessKey属性返回一个字符串，表示键盘上对应的键，通过Alt <span class="token operator">+</span> 这个键可以让按钮获得焦点。该属性可读写。
（<span class="token number">2</span>）HTMLButtonElement<span class="token punctuation">.</span>autofocus
HTMLButtonElement<span class="token punctuation">.</span>autofocus属性是一个布尔值，表示页面加载过程中，按钮是否会自动获得焦点。该属性可读写。
（<span class="token number">3</span>）HTMLButtonElement<span class="token punctuation">.</span>disabled
HTMLButtonElement<span class="token punctuation">.</span>disabled属性是一个布尔值，表示该按钮是否禁止点击。该属性可读写。
（<span class="token number">4</span>）HTMLButtonElement<span class="token punctuation">.</span>form
HTMLButtonElement<span class="token punctuation">.</span>form属性是一个表单元素，返回该按钮所在的表单。该属性只读。如果按钮不属于任何表单，该属性返回<span class="token keyword">null</span>。
（<span class="token number">5</span>）HTMLButtonElement<span class="token punctuation">.</span>formAction
HTMLButtonElement<span class="token punctuation">.</span>formAction返回一个字符串，表示表单提交的 <span class="token constant">URL</span>。该属性可读写，一旦设置了值，点击按钮就会提交到该属性指定的 <span class="token constant">URL</span>，而不是<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>元素指定的 <span class="token constant">URL</span>。
（<span class="token number">6</span>）HTMLButtonElement<span class="token punctuation">.</span>formEnctype
HTMLButtonElement<span class="token punctuation">.</span>formEnctype属性是一个字符串，表示数据提交到服务器的编码类型。该属性可读写，一旦设置了值，点击按钮会按照该属性指定的编码方式，而不是<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>元素指定的编码方式。
该属性可以取以下的值。

<span class="token operator">-</span> application<span class="token operator">/</span>x<span class="token operator">-</span>www<span class="token operator">-</span>form<span class="token operator">-</span>urlencoded（默认值）
<span class="token operator">-</span> multipart<span class="token operator">/</span>form<span class="token operator">-</span>data（上传文件的编码方式）
<span class="token operator">-</span> text<span class="token operator">/</span>plain
（<span class="token number">7</span>）HTMLButtonElement<span class="token punctuation">.</span>formMethod
HTMLButtonElement<span class="token punctuation">.</span>formMethod属性是一个字符串，表示浏览器提交表单的 <span class="token constant">HTTP</span> 方法。该属性可读写，一旦设置了值，点击后就会采用该属性指定的 <span class="token constant">HTTP</span> 方法，而不是<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>元素指定的编码方法。
（<span class="token number">8</span>）HTMLButtonElement<span class="token punctuation">.</span>formNoValidate
HTMLButtonElement<span class="token punctuation">.</span>formNoValidate属性是一个布尔值，表示点击按钮提交表单时，是否要跳过表单校验的步骤。该属性可读写，一旦设置会覆盖<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>元素的novalidate属性。
（<span class="token number">9</span>）HTMLButtonElement<span class="token punctuation">.</span>formTarget
HTMLButtonElement<span class="token punctuation">.</span>formTarget属性是一个字符串，指定了提交了表单以后，哪个窗口展示服务器返回的内容。该属性可读写，一旦设置会覆盖<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>元素的target属性。
（<span class="token number">10</span>）HTMLButtonElement<span class="token punctuation">.</span>labels
HTMLButtonElement<span class="token punctuation">.</span>labels返回NodeList实例，表示那些绑定按钮的<span class="token operator">&lt;</span>label<span class="token operator">&gt;</span>元素。该属性只读。
<span class="token comment">/*HTML 代码如下
  &lt;label id=&quot;label1&quot; for=&quot;test&quot;&gt;Label 1&lt;/label&gt;
  &lt;button id=&quot;test&quot;&gt;Button&lt;/button&gt;
  &lt;label id=&quot;label2&quot; for=&quot;test&quot;&gt;Label 2&lt;/label&gt;
*/</span>

<span class="token keyword">const</span> button <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> button<span class="token punctuation">.</span>labels<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>button<span class="token punctuation">.</span>labels<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>textContent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// &quot;Label 1&quot;</span>
<span class="token comment">// &quot;Label 2&quot;</span>

上面代码中，两个<span class="token operator">&lt;</span>label<span class="token operator">&gt;</span>元素绑定<span class="token operator">&lt;</span>button<span class="token operator">&gt;</span>元素。button<span class="token punctuation">.</span>labels返回这两个<span class="token operator">&lt;</span>label<span class="token operator">&gt;</span>元素。
（<span class="token number">11</span>）HTMLButtonElement<span class="token punctuation">.</span>name
HTMLButtonElement<span class="token punctuation">.</span>name属性是一个字符串，表示按钮元素的name属性。如果没有设置name属性，则返回空字符串。该属性可读写。
（<span class="token number">12</span>）HTMLButtonElement<span class="token punctuation">.</span>tabIndex
HTMLButtonElement<span class="token punctuation">.</span>tabIndex是一个整数，代表按钮元素的 Tab 键顺序。该属性可读写。
（<span class="token number">13</span>）HTMLButtonElement<span class="token punctuation">.</span>type
HTMLButtonElement<span class="token punctuation">.</span>type属性是一个字符串，表示按钮的行为。该属性可读写，可能取以下的值。

<span class="token operator">-</span> submit：默认值，表示提交表单。
<span class="token operator">-</span> reset：重置表单。
<span class="token operator">-</span> button：没有任何默认行为。
（<span class="token number">14</span>）HTMLButtonElement<span class="token punctuation">.</span>validationMessage
HTMLButtonElement<span class="token punctuation">.</span>validationMessage属性是一个字符串，表示没有通过校验时显示的提示信息。该属性只读。
（<span class="token number">15</span>）HTMLButtonElement<span class="token punctuation">.</span>validity
HTMLButtonElement<span class="token punctuation">.</span>validity属性返回该按钮的校验状态（ValidityState）。该属性只读。
（<span class="token number">16</span>）HTMLButtonElement<span class="token punctuation">.</span>value
HTMLButtonElement<span class="token punctuation">.</span>value属性返回该按钮绑定的值。该属性可读写。
（<span class="token number">17</span>）HTMLButtonElement<span class="token punctuation">.</span>willValidate
HTMLButtonElement<span class="token punctuation">.</span>willValidate属性是一个布尔值，表示该按钮提交表单时是否将被校验，默认为<span class="token boolean">false</span>。该属性只读。
form元素

<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>元素代表了表单，继承了 HTMLFormElement 接口。
HTMLFormElement 的实例属性
<span class="token operator">-</span> elements：返回一个类似数组的对象，成员是属于该表单的所有控件元素。该属性只读。
<span class="token operator">-</span> length：返回一个整数，表示属于该表单的控件数量。该属性只读。
<span class="token operator">-</span> name：字符串，表示该表单的名称。
<span class="token operator">-</span> method：字符串，表示提交给服务器时所使用的 <span class="token constant">HTTP</span> 方法。
<span class="token operator">-</span> target：字符串，表示表单提交后，服务器返回的数据的展示位置。
<span class="token operator">-</span> action：字符串，表示表单提交数据的 <span class="token constant">URL</span>。
<span class="token operator">-</span> enctype（或encoding）：字符串，表示表单提交数据的编码方法，可能的值有application<span class="token operator">/</span>x<span class="token operator">-</span>www<span class="token operator">-</span>form<span class="token operator">-</span>urlencoded、multipart<span class="token operator">/</span>form<span class="token operator">-</span>data和text<span class="token operator">/</span>plain。
<span class="token operator">-</span> acceptCharset：字符串，表示服务器所能接受的字符编码，多个编码格式之间使用逗号或空格分隔。
<span class="token operator">-</span> autocomplete：字符串on或off，表示浏览器是否要对<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>控件提供自动补全。
<span class="token operator">-</span> noValidate：布尔值，表示是否关闭表单的自动校验。
HTMLFormElement 的实例方法
<span class="token operator">-</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：提交表单，但是不会触发submit事件和表单的自动校验。
<span class="token operator">-</span> <span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：重置表单控件的值为默认值。
<span class="token operator">-</span> <span class="token function">checkValidity</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：如果控件能够通过自动校验，返回<span class="token boolean">true</span>，否则返回<span class="token boolean">false</span>，同时触发invalid事件。
下面是一个创建表单并提交的例子。
<span class="token keyword">var</span> f <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;form&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>
f<span class="token punctuation">.</span>action <span class="token operator">=</span> <span class="token string">&#39;/cgi-bin/some.cgi&#39;</span><span class="token punctuation">;</span>
f<span class="token punctuation">.</span>method <span class="token operator">=</span> <span class="token string">&#39;POST&#39;</span><span class="token punctuation">;</span>
f<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

 input元素
<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素主要用于表单组件，它继承了 HTMLInputElement 接口。
HTMLInputElement 的实例属性
特征属性

<span class="token operator">-</span> name：字符串，表示<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的名称。该属性可读写。
<span class="token operator">-</span> type：字符串，表示<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的类型。该属性可读写。
<span class="token operator">-</span> disabled：布尔值，表示<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点是否禁止使用。一旦被禁止使用，表单提交时不会包含该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点。该属性可读写。
<span class="token operator">-</span> autofocus：布尔值，表示页面加载时，该元素是否会自动获得焦点。该属性可读写。
<span class="token operator">-</span> required：布尔值，表示表单提交时，该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素是否必填。该属性可读写。
<span class="token operator">-</span> value：字符串，表示该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的值。该属性可读写。
<span class="token operator">-</span> validity：返回一个ValidityState对象，表示<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的校验状态。该属性只读。
<span class="token operator">-</span> validationMessage：字符串，表示该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的校验失败时，用户看到的报错信息。如果该节点不需要校验，或者通过校验，该属性为空字符串。该属性只读。
<span class="token operator">-</span> willValidate：布尔值，表示表单提交时，该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素是否会被校验。该属性只读。
表单相关属性
<span class="token operator">-</span> form：返回<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素所在的表单（<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>）节点。该属性只读。
<span class="token operator">-</span> formAction：字符串，表示表单提交时的服务器目标。该属性可读写，一旦设置了这个属性，会覆盖表单元素的action属性。
<span class="token operator">-</span> formEncType：字符串，表示表单提交时数据的编码方式。该属性可读写，一旦设置了这个属性，会覆盖表单元素的enctype的属性。
<span class="token operator">-</span> formMethod：字符串，表示表单提交时的 <span class="token constant">HTTP</span> 方法。该属性可读写，一旦设置了这个属性，会覆盖表单元素的method属性。
<span class="token operator">-</span> formNoValidate：布尔值，表示表单提交时，是否要跳过校验。该属性可读写，一旦设置了这个属性，会覆盖表单元素的formNoValidate属性。
<span class="token operator">-</span> formTarget：字符串，表示表单提交后，服务器返回数据的打开位置。该属性可读写，一旦设置了这个属性，会覆盖表单元素的target属性。
文本输入框的特有属性
以下属性只有在<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素可以输入文本时才有效。
<span class="token operator">-</span> autocomplete：字符串on或off，表示该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的输入内容可以被浏览器自动补全。该属性可读写。
<span class="token operator">-</span> maxLength：整数，表示可以输入的字符串最大长度。如果设为负整数，会报错。该属性可读写。
<span class="token operator">-</span> size：整数，表示<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的显示长度。如果类型是text或password，该属性的单位是字符个数，否则单位是像素。该属性可读写。
<span class="token operator">-</span> pattern：字符串，表示<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的值应该满足的正则表达式。该属性可读写。
<span class="token operator">-</span> placeholder：字符串，表示该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的占位符，作为对元素的提示。该字符串不能包含回车或换行。该属性可读写。
<span class="token operator">-</span> readOnly：布尔值，表示用户是否可以修改该节点的值。该属性可读写。
<span class="token operator">-</span> min：字符串，表示该节点的最小数值或日期，且不能大于max属性。该属性可读写。
<span class="token operator">-</span> max：字符串，表示该节点的最大数值或日期，且不能小于min属性。该属性可读写。
<span class="token operator">-</span> selectionStart：整数，表示选中文本的起始位置。如果没有选中文本，返回光标在<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素内部的位置。该属性可读写。
<span class="token operator">-</span> selectionEnd：整数，表示选中文本的结束位置。如果没有选中文本，返回光标在<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素内部的位置。该属性可读写。
<span class="token operator">-</span> selectionDirection：字符串，表示选中文本的方向。可能的值包括forward（与文字书写方向一致）、backward（与文字书写方向相反）和none（文字方向未知）。该属性可读写。
复选框和单选框的特有属性
如果<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素的类型是复选框（checkbox）或单选框（radio），会有下面的特有属性。
<span class="token operator">-</span> checked：布尔值，表示该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素是否选中。该属性可读写。
<span class="token operator">-</span> defaultChecked：布尔值，表示该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素默认是否选中。该属性可读写。
<span class="token operator">-</span> indeterminate：布尔值，表示该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素是否还没有确定的状态。一旦用户点击过一次，该属性就会变成<span class="token boolean">false</span>，表示用户已经给出确定的状态了。该属性可读写。
图像按钮的特有属性
如果<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素的类型是image，就会变成一个图像按钮，会有下面的特有属性。
<span class="token operator">-</span> alt：字符串，图像无法显示时的替代文本。该属性可读写。
<span class="token operator">-</span> height：字符串，表示该元素的高度（单位像素）。该属性可读写。
<span class="token operator">-</span> src：字符串，表示该元素的图片来源。该属性可读写。
<span class="token operator">-</span> width：字符串，表示该元素的宽度（单位像素）。该属性可读写。
文件上传按钮的特有属性
如果<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素的类型是file，就会变成一个文件上传按钮，会有下面的特有属性。
<span class="token operator">-</span> accept：字符串，表示该元素可以接受的文件类型，类型之间使用逗号分隔。该属性可读写。
<span class="token operator">-</span> files：返回一个FileList实例对象，包含了选中上传的一组File实例对象。
其他属性
<span class="token operator">-</span> defaultValue：字符串，表示该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的原始值。
<span class="token operator">-</span> dirName：字符串，表示文字方向。
<span class="token operator">-</span> accessKey：字符串，表示让该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点获得焦点的某个字母键。
<span class="token operator">-</span> list：返回一个<span class="token operator">&lt;</span>datalist<span class="token operator">&gt;</span>节点，该节点必须绑定<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素，且<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素的类型必须可以输入文本，否则无效。该属性只读。
<span class="token operator">-</span> multiple：布尔值，表示是否可以选择多个值。
<span class="token operator">-</span> labels：返回一个NodeList实例，代表绑定当前<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的<span class="token operator">&lt;</span>label<span class="token operator">&gt;</span>元素。该属性只读。
<span class="token operator">-</span> step：字符串，表示在min属性到max属性之间，每次递增或递减时的数值或时间。
<span class="token operator">-</span> valueAsDate：Date实例，一旦设置，该<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素的值会被解释为指定的日期。如果无法解析该属性的值，<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的值将是<span class="token keyword">null</span>。
<span class="token operator">-</span> valueAsNumber：浮点数，当前<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素的值会被解析为这个数值。
HTMLInputElement 的实例方法
<span class="token operator">-</span> <span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：当前<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素获得焦点。
<span class="token operator">-</span> <span class="token function">blur</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：移除<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素的焦点。
<span class="token operator">-</span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：选中<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素内部的所有文本。该方法不能保证<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span><span class="token function">获得焦点，最好先用focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法，再用这个方法。
<span class="token operator">-</span> <span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：模拟鼠标点击当前的<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素。
<span class="token operator">-</span> <span class="token function">setSelectionRange</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：选中<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>元素内部的一段文本，但不会将焦点转移到选中的文本。该方法接受三个参数，第一个参数是开始的位置（从<span class="token number">0</span>开始），第二个参数是结束的位置（不包括该位置），第三个参数是可选的，表示选择的方向，有三个可能的值（forward、backward和默认值none）。
<span class="token operator">-</span> <span class="token function">setRangeText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">：新文本替换选中的文本。该方法接受四个参数，第一个参数是新文本，第二个参数是替换的开始位置</span><span class="token punctuation">(</span>从<span class="token number">0</span>开始计算<span class="token punctuation">)</span>，第三个参数是结束位置（该位置不包括在内），第四个参数表示替换后的行为（可选），有四个可能的值：select（选中新插入的文本）、start（光标位置移到插入的文本之前）、end（光标位置移到插入的文本之后）、preserve（默认值，如果原先就有文本被选中且本次替换位置与原先选中位置有交集，则替换后同时选中新插入的文本与原先选中的文本，否则保持原先选中的文本）。
<span class="token operator">-</span> <span class="token function">setCustomValidity</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：该方法用于自定义校验失败时的报错信息。它的参数就是报错的提示信息。注意，一旦设置了自定义报错信息，该字段就不会校验通过了，因此用户重新输入时，必须将自定义报错信息设为空字符串，请看下面的例子。
<span class="token operator">-</span> <span class="token function">checkValidity</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回一个布尔值，表示当前节点的校验结果。如果返回<span class="token boolean">false</span>，表示不满足校验要求，否则就是校验成功或不必校验。
<span class="token operator">-</span> <span class="token function">stepDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：将当前<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的值减少一个步长。该方法可以接受一个整数n作为参数，表示一次性减少n个步长，默认是<span class="token number">1</span>。有几种情况会抛错：当前<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点不适合递减或递增、当前节点没有step属性、<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>节点的值不能转为数字、递减之后的值小于min属性或大于max属性。
<span class="token operator">-</span> <span class="token function">stepUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：将当前<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span><span class="token function">节点的值增加一个步长。其他与stepDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法相同。
<span class="token function">下面是setSelectionRange</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的一个例子。
<span class="token comment">/*HTML 代码如下
  &lt;p&gt;&lt;input type=&quot;text&quot; id=&quot;mytextbox&quot; size=&quot;20&quot; value=&quot;HelloWorld&quot;/&gt;&lt;/p&gt;
  &lt;p&gt;&lt;button onclick=&quot;SelectText()&quot;&gt;选择文本&lt;/button&gt;&lt;/p&gt;

*/</span>

<span class="token keyword">function</span> <span class="token function">SelectText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;mytextbox&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  input<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  input<span class="token punctuation">.</span><span class="token function">setSelectionRange</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，点击按钮以后，会选中llo三个字符。
<span class="token function">下面是setCustomValidity</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的例子。
<span class="token comment">/*HTML 代码如下
  &lt;form id=&quot;form&quot;&gt;
    &lt;input id=&quot;field&quot; type=&quot;text&quot; pattern=&quot;[a-f,0-9]{4}&quot; autocomplete=off&gt;
  &lt;/form&gt;
*/</span>

<span class="token keyword">const</span> form   <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#form&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> field  <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#field&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

form<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;submit&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 防止这个例子发出 POST 请求</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

field<span class="token punctuation">.</span><span class="token function-variable function">oninvalid</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">setCustomValidity</span><span class="token punctuation">(</span><span class="token string">&#39;必须是一个 4 位十六进制数&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

field<span class="token punctuation">.</span><span class="token function-variable function">oninput</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">setCustomValidity</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，输入框必须输入一个<span class="token number">4</span>位的十六进制数。如果不满足条件（比如输入xxx），按下回车键以后，就会提示自定义的报错信息。一旦自定义了报错信息，输入框就会一直处于校验失败状态，因此重新输入时，必须把自定义报错信息设为空字符串。另外，为了避免自动补全提示框遮住报错信息，必须将输入框的autocomplete属性关闭。

 option元素
<span class="token operator">&lt;</span>option<span class="token operator">&gt;</span>元素表示下拉框（<span class="token operator">&lt;</span>select<span class="token operator">&gt;</span>，<span class="token operator">&lt;</span>optgroup<span class="token operator">&gt;</span>或<span class="token operator">&lt;</span>datalist<span class="token operator">&gt;</span>）里面的一个选项。它是 HTMLOptionElement 接口的实例。
属性
除了继承 HTMLElement 接口的属性和方法，HTMLOptionElement 接口具有下面的属性。
<span class="token operator">-</span> disabled：布尔值，表示该项是否可选择。
<span class="token operator">-</span> defaultSelected：布尔值，表示该项是否默认选中。一旦设为<span class="token boolean">true</span>，该项的值就是<span class="token operator">&lt;</span>select<span class="token operator">&gt;</span>的默认值。
<span class="token operator">-</span> form：返回<span class="token operator">&lt;</span>option<span class="token operator">&gt;</span>所在的表单元素。如果不属于任何表单，则返回<span class="token keyword">null</span>。该属性只读。
<span class="token operator">-</span> index：整数，表示该选项在整个下拉列表里面的位置。该属性只读。
<span class="token operator">-</span> label：字符串，表示对该选项的说明。如果该属性未设置，则返回该选项的文本内容。
<span class="token operator">-</span> selected：布尔值，表示该选项是否选中。
<span class="token operator">-</span> text：字符串，该选项的文本内容。
<span class="token operator">-</span> value：字符串，该选项的值。表单提交时，上传的就是选中项的这个属性。
<span class="token function">Option</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 构造函数
<span class="token function">浏览器原生提供Option</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成 HTMLOptionElement 实例。
<span class="token keyword">new</span> <span class="token class-name">Option</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> value<span class="token punctuation">,</span> defaultSelected<span class="token punctuation">,</span> selected<span class="token punctuation">)</span>

它接受四个参数，都是可选的。

<span class="token operator">-</span> text：字符串，表示该选项的文本内容。如果省略，返回空字符串。
<span class="token operator">-</span> value：字符串，表示该选项的值。如果省略，默认返回text属性的值。
<span class="token operator">-</span> defaultSelected：布尔值，表示该项是否默认选中，默认为<span class="token boolean">false</span>。注意，即使设为<span class="token boolean">true</span>，也不代表该项的selected属性为<span class="token boolean">true</span>。
<span class="token operator">-</span> selected：布尔值，表示该项是否选中，默认为<span class="token boolean">false</span>。
<span class="token keyword">var</span> newOption <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Option</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;world&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

newOption<span class="token punctuation">.</span>text <span class="token comment">// &quot;hello&quot;</span>
newOption<span class="token punctuation">.</span>value <span class="token comment">// &quot;world&quot;</span>
newOption<span class="token punctuation">.</span>defaultSelected <span class="token comment">// true</span>
newOption<span class="token punctuation">.</span>selected <span class="token comment">// false</span>

上面代码中，newOption的defaultSelected属性为<span class="token boolean">true</span>，但是它没有被选中（即selected属性为<span class="token boolean">false</span>）。
video
概述
<span class="token operator">&lt;</span>video<span class="token operator">&gt;</span>元素用来加载视频，是HTMLVideoElement对象的实例。<span class="token operator">&lt;</span>audio<span class="token operator">&gt;</span>元素用来加载音频，是HTMLAudioElement对象的实例。而HTMLVideoElement和HTMLAudioElement都继承了HTMLMediaElement，所以这两个 <span class="token constant">HTML</span> 元素有许多共同的属性和方法，可以放在一起介绍。
理论上，这两个 <span class="token constant">HTML</span> 元素直接用src属性指定媒体文件，就可以使用了。
<span class="token operator">&lt;</span>audio src<span class="token operator">=</span><span class="token string">&quot;background_music.mp3&quot;</span><span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>video src<span class="token operator">=</span><span class="token string">&quot;news.mov&quot;</span> width<span class="token operator">=</span><span class="token number">320</span> height<span class="token operator">=</span><span class="token number">240</span><span class="token operator">/</span><span class="token operator">&gt;</span>

注意，<span class="token operator">&lt;</span>video<span class="token operator">&gt;</span>元素有width属性和height属性，可以指定宽和高。<span class="token operator">&lt;</span>audio<span class="token operator">&gt;</span>元素没有这两个属性，因为它的播放器外形是浏览器给定的，不能指定。
实际上，不同的浏览器支持不同的媒体格式，我们不得不用<span class="token operator">&lt;</span>source<span class="token operator">&gt;</span>元素指定同一个媒体文件的不同格式。
<span class="token operator">&lt;</span>audio id<span class="token operator">=</span><span class="token string">&quot;music&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>source src<span class="token operator">=</span><span class="token string">&quot;music.mp3&quot;</span> type<span class="token operator">=</span><span class="token string">&quot;audio/mpeg&quot;</span><span class="token operator">&gt;</span>  
  <span class="token operator">&lt;</span>source src<span class="token operator">=</span><span class="token string">&quot;music.ogg&quot;</span> type<span class="token operator">=</span><span class="token string">&#39;audio/ogg; codec=&quot;vorbis&quot;&#39;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>audio<span class="token operator">&gt;</span>

浏览器遇到支持的格式，就会忽略后面的格式。
这两个元素都有一个controls属性，只有打开这个属性，才会显示控制条。注意，<span class="token operator">&lt;</span>audio<span class="token operator">&gt;</span>元素如果不打开controls属性，根本不会显示，而是直接在背景播放。
HTMLMediaElement 接口
HTMLMediaElement并没有对应的 <span class="token constant">HTML</span> 元素，而是作为<span class="token operator">&lt;</span>video<span class="token operator">&gt;</span>和<span class="token operator">&lt;</span>audio<span class="token operator">&gt;</span>的基类，定义一些它们共同的属性和方法。
HTMLMediaElement接口有以下属性。

<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>audioTracks：返回一个类似数组的对象，表示媒体文件包含的音轨。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>autoplay：布尔值，表示媒体文件是否自动播放，对应 <span class="token constant">HTML</span> 属性autoplay。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>buffered：返回一个 TimeRanges <span class="token function">对象，表示浏览器缓冲的内容。该对象的length属性返回缓存里面有多少段内容，start</span><span class="token punctuation">(</span>rangeId<span class="token punctuation">)</span><span class="token function">方法返回指定的某段内容（从0开始）开始的时间点，end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>返回指定的某段内容结束的时间点。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>controls：布尔值，表示是否显示媒体文件的控制栏，对应 <span class="token constant">HTML</span> 属性controls。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>controlsList：返回一个类似数组的对象，表示是否显示控制栏的某些控件。该对象包含三个可能的值：nodownload、nofullscreen和noremoteplayback。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>crossOrigin：字符串，表示跨域请求时是否附带用户信息（比如 Cookie），对应 <span class="token constant">HTML</span> 属性crossorigin。该属性只有两个可能的值：anonymous和use<span class="token operator">-</span>credentials。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>currentSrc：字符串，表示当前正在播放的媒体文件的绝对路径。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>currentTime：浮点数，表示当前播放的时间点。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>defaultMuted：布尔值，表示默认是否关闭音量，对应 <span class="token constant">HTML</span> 属性muted。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>defaultPlaybackRate：浮点数，表示默认的播放速率，默认是<span class="token number">1.0</span>。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>disableRemotePlayback：布尔值，是否允许远程回放，即远程回放的时候是否会有工具栏。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>duration：浮点数，表示媒体文件的时间长度（单位秒）。如果当前没有媒体文件，该属性返回<span class="token number">0</span>。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>ended：布尔值，表示当前媒体文件是否已经播放结束。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>error：返回最近一次报错的错误对象，如果没有报错，返回<span class="token keyword">null</span>。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>loop：布尔值，表示媒体文件是否会循环播放，对应 <span class="token constant">HTML</span> 属性loop。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>muted：布尔值，表示音量是否关闭。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>networkState：当前网络状态，共有四个可能的值。<span class="token number">0</span>表示没有数据；<span class="token number">1</span>表示媒体元素处在激活状态，但是还没开始下载；<span class="token number">2</span>表示下载中；<span class="token number">3</span>表示没有找到媒体文件。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>paused：布尔值，表示媒体文件是否处在暂停状态。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>playbackRate：浮点数，表示媒体文件的播放速度，<span class="token number">1.0</span>是正常速度。如果是负数，表示向后播放。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>played：返回一个 TimeRanges 对象，表示播放的媒体内容。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>preload：字符串，表示应该预加载哪些内容，可能的值为none、metadata和auto。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>readyState：整数，表示媒体文件的准备状态，可能的值为<span class="token number">0</span>（没有任何数据）、<span class="token number">1</span>（已获取元数据）、<span class="token number">2</span>（可播放当前帧，但不足以播放多个帧）、<span class="token number">3</span>（可以播放多帧，至少为两帧）、<span class="token number">4</span>（可以流畅播放）。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>seekable：返回一个 TimeRanges 对象，表示一个用户可以搜索的媒体内容范围。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>seeking：布尔值，表示媒体文件是否正在寻找新位置。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>src：布尔值，表示媒体文件的 <span class="token constant">URL</span>，对应 <span class="token constant">HTML</span> 属性src。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>srcObject：返回src属性对应的媒体文件资源，可能是MediaStream、MediaSource、Blob或File对象。直接指定这个属性，就可以播放媒体文件。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>textTracks：返回一个类似数组的对象，包含所有文本轨道。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>videoTracks：返回一个类似数组的对象，包含多有视频轨道。该属性只读。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span>volume：浮点数，表示音量。<span class="token number">0.0</span> 表示静音，<span class="token number">1.0</span> 表示最大音量。
HTMLMediaElement接口有如下方法。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span><span class="token function">addTextTrack</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：添加文本轨道（比如字幕）到媒体文件。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span><span class="token function">captureStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回一个 MediaStream 对象，用来捕获当前媒体文件的流内容。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span><span class="token function">canPlayType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：该方法接受一个 <span class="token constant">MIME</span> 字符串作为参数，用来判断这种类型的媒体文件是否可以播放。该方法返回一个字符串，有三种可能的值，probably表示似乎可播放，maybe表示无法在不播放的情况下判断是否可播放，空字符串表示无法播放。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span><span class="token function">fastSeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：该方法接受一个浮点数作为参数，表示指定的时间（单位秒）。该方法将媒体文件移动到指定时间。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：重新加载媒体文件。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：暂停播放。该方法没有返回值。
<span class="token operator">-</span> HTMLMediaElement<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：开始播放。该方法返回一个 Promise 对象。
<span class="token function">下面是play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的一个例子。
<span class="token keyword">var</span> myVideo <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myVideoElement&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

myVideo
<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;playing&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

HTMLVideoElement 接口
HTMLVideoElement接口代表了<span class="token operator">&lt;</span>video<span class="token operator">&gt;</span>元素。这个接口继承了HTMLMediaElement接口，并且有一些自己的属性和方法。
HTMLVideoElement 接口的属性。

<span class="token operator">-</span> HTMLVideoElement<span class="token punctuation">.</span>height：字符串，表示视频播放区域的高度（单位像素），对应 <span class="token constant">HTML</span> 属性height。
<span class="token operator">-</span> HTMLVideoElement<span class="token punctuation">.</span>width：字符串，表示视频播放区域的宽度（单位像素），对应 <span class="token constant">HTML</span> 属性width。
<span class="token operator">-</span> HTMLVideoElement<span class="token punctuation">.</span>videoHeight：该属性只读，返回一个整数，表示视频文件自身的高度（单位像素）。
<span class="token operator">-</span> HTMLVideoElement<span class="token punctuation">.</span>videoWidth：该属性只读，返回一个整数，表示视频文件自身的宽度（单位像素）。
<span class="token operator">-</span> HTMLVideoElement<span class="token punctuation">.</span>poster：字符串，表示一个图像文件的 <span class="token constant">URL</span>，用来在无法获取视频文件时替代显示，对应 <span class="token constant">HTML</span> 属性poster。
HTMLVideoElement 接口的方法。
<span class="token operator">-</span> HTMLVideoElement<span class="token punctuation">.</span><span class="token function">getVideoPlaybackQuality</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回一个对象，包含了当前视频回放的一些数据。
HTMLAudioElement 接口
HTMLAudioElement接口代表了<span class="token operator">&lt;</span>audio<span class="token operator">&gt;</span>元素。
<span class="token function">该接口继承了HTMLMediaElement，但是没有定义自己的属性和方法。浏览器原生提供一个Audio</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，返回的就是HTMLAudioElement实例。
<span class="token keyword">var</span> song <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Audio</span><span class="token punctuation">(</span><span class="token punctuation">[</span>URLString<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">Audio</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数接受一个字符串作为参数，表示媒体文件的 <span class="token constant">URL</span>。如果省略这个参数，可以稍后通过src属性指定。
生成HTMLAudioElement实例以后，不用插入 <span class="token constant">DOM</span><span class="token function">，可以直接用play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法在背景播放。
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Audio</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">canPlayType</span><span class="token punctuation">(</span><span class="token string">&#39;audio/wav&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;soundeffect.wav&#39;</span><span class="token punctuation">;</span>
  a<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

事件
<span class="token operator">&lt;</span>video<span class="token operator">&gt;</span>和<span class="token operator">&lt;</span>audio<span class="token operator">&gt;</span>元素有以下事件。

<span class="token operator">-</span> loadstart：开始加载媒体文件时触发。
<span class="token operator">-</span> progress：媒体文件加载过程中触发，大概是每秒触发<span class="token number">2</span>到<span class="token number">8</span>次。
<span class="token operator">-</span> loadedmetadata：媒体文件元数据加载成功时触发。
<span class="token operator">-</span> loadeddata：当前播放位置加载成功后触发。
<span class="token operator">-</span> canplay：已经加载了足够的数据，可以开始播放时触发，后面可能还会请求数据。
<span class="token operator">-</span> canplaythrough：已经加载了足够的数据，可以一直播放时触发，后面不需要继续请求数据。
<span class="token operator">-</span> suspend：已经缓冲了足够的数据，暂时停止下载时触发。
<span class="token operator">-</span> stalled：尝试加载数据，但是没有数据返回时触发。
<span class="token operator">-</span> <span class="token function">play：调用play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法时或自动播放启动时触发。如果已经加载了足够的数据，这个事件后面会紧跟playing事件，否则会触发waiting事件。
<span class="token operator">-</span> waiting：由于没有足够的缓存数据，无法播放或播放停止时触发。一旦缓冲数据足够开始播放，后面就会紧跟playing事件。
<span class="token operator">-</span> playing：媒体开始播放时触发。
<span class="token operator">-</span> timeupdate：currentTime属性变化时触发，每秒可能触发<span class="token number">4</span>到<span class="token number">60</span>次。
<span class="token operator">-</span> <span class="token function">pause：调用pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法、播放暂停时触发。
<span class="token operator">-</span> seeking：脚本或者用户要求播放某个没有缓冲的位置，播放停止开始加载数据时触发。此时，seeking属性返回<span class="token boolean">true</span>。
<span class="token operator">-</span> seeked：seeking属性变回<span class="token boolean">false</span>时触发。
<span class="token operator">-</span> ended：媒体文件播放完毕时触发。
<span class="token operator">-</span> durationchange：duration属性变化时触发。
<span class="token operator">-</span> volumechange：音量变化时触发。
<span class="token operator">-</span> ratechange：播放速度或默认的播放速度变化时触发。
<span class="token operator">-</span> abort：停止加载媒体文件时触发，通常是用户主动要求停止下载。
<span class="token operator">-</span> error：网络或其他原因导致媒体文件无法加载时触发。
<span class="token operator">-</span> emptied：由于error或abort事件导致networkState属性变成无法获取数据时触发。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function l(c,i){return s(),a("div",null,o)}const r=n(e,[["render",l],["__file","element.html.vue"]]);export{r as default};
