import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const p={},o=t(`<h1 id="bom" tabindex="-1"><a class="header-anchor" href="#bom" aria-hidden="true">#</a> BOM</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window 对象
概述
浏览器里面，window对象（注意，w为小写）指当前的浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属。一个变量如果未声明，那么默认就是顶层对象的属性。
a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>a <span class="token comment">// 1</span>

上面代码中，a是一个没有声明就直接赋值的变量，它自动成为顶层对象的属性。
window有自己的实体含义，其实不适合当作最高一层的顶层对象，这是一个语言的设计失误。最早，设计这门语言的时候，原始设想是语言内置的对象越少越好，这样可以提高浏览器的性能。因此，语言设计者 Brendan Eich 就把window对象当作顶层对象，所有未声明就赋值的变量都自动变成window对象的属性。这种设计使得编译阶段无法检测出未声明变量，但到了今天已经没有办法纠正了。
属性
window<span class="token punctuation">.</span>name
window<span class="token punctuation">.</span>name属性是一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的target属性使用。
window<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;Hello World!&#39;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token comment">// &quot;Hello World!&quot;</span>

该属性只能保存字符串，如果写入的值不是字符串，会自动转成字符串。各个浏览器对这个值的储存容量有所不同，但是一般来说，可以高达几<span class="token constant">MB</span>。
只要浏览器窗口不关闭，这个属性是不会消失的。举例来说，访问a<span class="token punctuation">.</span>com时，该页面的脚本设置了window<span class="token punctuation">.</span>name，接下来在同一个窗口里面载入了b<span class="token punctuation">.</span>com，新页面的脚本可以读到上一个网页设置的window<span class="token punctuation">.</span>name。页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性保存的值就会消失，因为这时窗口已经不存在了。
window<span class="token punctuation">.</span>closed，window<span class="token punctuation">.</span>opener
window<span class="token punctuation">.</span>closed属性返回一个布尔值，表示窗口是否关闭。
window<span class="token punctuation">.</span>closed <span class="token comment">// false</span>

上面代码检查当前窗口是否关闭。这种检查意义不大，因为只要能运行代码，当前窗口肯定没有关闭。这个属性一般用来检查，使用脚本打开的新窗口是否关闭。
<span class="token keyword">var</span> popup <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>popup <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>popup<span class="token punctuation">.</span>closed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 窗口仍然打开着</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span>opener属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回<span class="token keyword">null</span>。
window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>opener <span class="token operator">===</span> window <span class="token comment">// true</span>

上面表达式会打开一个新窗口，然后返回<span class="token boolean">true</span>。
如果两个窗口之间不需要通信，建议将子窗口的opener属性显式设为<span class="token keyword">null</span>，这样可以减少一些安全隐患。
<span class="token keyword">var</span> newWin <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;example.html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;newWindow&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;height=400,width=400&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
newWin<span class="token punctuation">.</span>opener <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

上面代码中，子窗口的opener属性设为<span class="token keyword">null</span>，两个窗口之间就没办法再联系了。
通过opener属性，可以获得父窗口的全局属性和方法，但只限于两个窗口同源的情况（参见《同源限制》一章），且其中一个窗口由另一个打开。<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>元素添加rel<span class="token operator">=</span><span class="token string">&quot;noopener&quot;</span>属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 <span class="token constant">URL</span> 的风险。
<span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">&quot;https://an.evil.site&quot;</span> target<span class="token operator">=</span><span class="token string">&quot;_blank&quot;</span> rel<span class="token operator">=</span><span class="token string">&quot;noopener&quot;</span><span class="token operator">&gt;</span>
恶意网站
<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>

window<span class="token punctuation">.</span>self，window<span class="token punctuation">.</span>window
window<span class="token punctuation">.</span>self和window<span class="token punctuation">.</span>window属性都指向窗口本身。这两个属性只读。
window<span class="token punctuation">.</span>self <span class="token operator">===</span> window <span class="token comment">// true</span>
window<span class="token punctuation">.</span>window <span class="token operator">===</span> window <span class="token comment">// true</span>

window<span class="token punctuation">.</span>frames，window<span class="token punctuation">.</span>length
window<span class="token punctuation">.</span>frames属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素。window<span class="token punctuation">.</span>frames<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>表示页面中第一个框架窗口。
如果iframe元素设置了id或name属性，那么就可以用属性值，引用这个iframe窗口。比如<span class="token operator">&lt;</span>iframe name<span class="token operator">=</span><span class="token string">&quot;myIFrame&quot;</span><span class="token operator">&gt;</span>可以用frames<span class="token punctuation">[</span><span class="token string">&#39;myIFrame&#39;</span><span class="token punctuation">]</span>或者frames<span class="token punctuation">.</span>myIFrame来引用。
frames属性实际上是window对象的别名。
frames <span class="token operator">===</span> window <span class="token comment">// true</span>

因此，frames<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>也可以用window<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>表示。但是，从语义上看，frames更清晰，而且考虑到window还是全局对象，因此推荐表示多窗口时，总是使用frames<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>的写法。更多介绍请看下文的《多窗口操作》部分。
window<span class="token punctuation">.</span>length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window<span class="token punctuation">.</span>length就返回<span class="token number">0</span>。
window<span class="token punctuation">.</span>frames<span class="token punctuation">.</span>length <span class="token operator">===</span> window<span class="token punctuation">.</span>length <span class="token comment">// true</span>

上面代码表示，window<span class="token punctuation">.</span>frames<span class="token punctuation">.</span>length与window<span class="token punctuation">.</span>length应该是相等的。
window<span class="token punctuation">.</span>frameElement
window<span class="token punctuation">.</span>frameElement属性主要用于当前窗口嵌在另一个网页的情况（嵌入<span class="token operator">&lt;</span>object<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>或<span class="token operator">&lt;</span>embed<span class="token operator">&gt;</span>元素），返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回<span class="token keyword">null</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;iframe src=&quot;about.html&quot;&gt;&lt;/iframe&gt;</span>

<span class="token comment">// 下面的脚本在 about.html 里面</span>
<span class="token keyword">var</span> frameEl <span class="token operator">=</span> window<span class="token punctuation">.</span>frameElement<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>frameEl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  frameEl<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;other.html&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，frameEl变量就是<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>元素。
window<span class="token punctuation">.</span>top，window<span class="token punctuation">.</span>parent
window<span class="token punctuation">.</span>top属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。
window<span class="token punctuation">.</span>parent属性指向父窗口。如果当前窗口没有父窗口，window<span class="token punctuation">.</span>parent指向自身。
<span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>parent <span class="token operator">!==</span> window<span class="token punctuation">.</span>top<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 表明当前窗口嵌入不止一层</span>
<span class="token punctuation">}</span>

对于不包含框架的网页，这两个属性等同于window对象。
window<span class="token punctuation">.</span>status
window<span class="token punctuation">.</span>status属性用于读写浏览器状态栏的文本。但是，现在很多浏览器都不允许改写状态栏文本，所以使用这个方法不一定有效。
window<span class="token punctuation">.</span>devicePixelRatio
window<span class="token punctuation">.</span>devicePixelRatio属性返回一个数值，表示一个 <span class="token constant">CSS</span> 像素的大小与一个物理像素的大小之间的比率。也就是说，它表示一个 <span class="token constant">CSS</span> 像素由多少个物理像素组成。它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片。
位置大小属性
以下属性返回window对象的位置信息和大小信息。
（<span class="token number">1</span>）window<span class="token punctuation">.</span>screenX，window<span class="token punctuation">.</span>screenY
window<span class="token punctuation">.</span>screenX和window<span class="token punctuation">.</span>screenY属性，返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。
（<span class="token number">2</span>） window<span class="token punctuation">.</span>innerHeight，window<span class="token punctuation">.</span>innerWidth
window<span class="token punctuation">.</span>innerHeight和window<span class="token punctuation">.</span>innerWidth属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。
用户放大网页的时候（比如将网页从<span class="token number">100</span><span class="token operator">%</span>的大小放大为<span class="token number">200</span><span class="token operator">%</span>），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是<span class="token number">960</span>像素），只是每个像素占据的屏幕空间变大了，因此可见部分（视口）就变小了。
注意，这两个属性值包括滚动条的高度和宽度。
（<span class="token number">3</span>）window<span class="token punctuation">.</span>outerHeight，window<span class="token punctuation">.</span>outerWidth
window<span class="token punctuation">.</span>outerHeight和window<span class="token punctuation">.</span>outerWidth属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。
（<span class="token number">4</span>）window<span class="token punctuation">.</span>scrollX，window<span class="token punctuation">.</span>scrollY
window<span class="token punctuation">.</span>scrollX属性返回页面的水平滚动距离，window<span class="token punctuation">.</span>scrollY属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读。
注意，这两个属性的返回值不是整数，而是双精度浮点数。如果页面没有滚动，它们的值就是<span class="token number">0</span>。
举例来说，如果用户向下拉动了垂直滚动条<span class="token number">75</span>像素，那么window<span class="token punctuation">.</span>scrollY就是<span class="token number">75</span>左右。用户水平向右拉动水平滚动条<span class="token number">200</span>像素，window<span class="token punctuation">.</span>scrollX就是<span class="token number">200</span>左右。
<span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>scrollY <span class="token operator">&lt;</span> <span class="token number">75</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  window<span class="token punctuation">.</span><span class="token function">scroll</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">75</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，如果页面向下滚动的距离小于<span class="token number">75</span>像素，那么页面向下滚动<span class="token number">75</span>像素。
（<span class="token number">5</span>）window<span class="token punctuation">.</span>pageXOffset，window<span class="token punctuation">.</span>pageYOffset
window<span class="token punctuation">.</span>pageXOffset属性和window<span class="token punctuation">.</span>pageYOffset属性，是window<span class="token punctuation">.</span>scrollX和window<span class="token punctuation">.</span>scrollY别名。
组件属性
组件属性返回浏览器的组件对象。这样的属性有下面几个。

<span class="token operator">-</span> window<span class="token punctuation">.</span>locationbar：地址栏对象
<span class="token operator">-</span> window<span class="token punctuation">.</span>menubar：菜单栏对象
<span class="token operator">-</span> window<span class="token punctuation">.</span>scrollbars：窗口的滚动条对象
<span class="token operator">-</span> window<span class="token punctuation">.</span>toolbar：工具栏对象
<span class="token operator">-</span> window<span class="token punctuation">.</span>statusbar：状态栏对象
<span class="token operator">-</span> window<span class="token punctuation">.</span>personalbar：用户安装的个人工具栏对象
这些对象的visible属性是一个布尔值，表示这些组件是否可见。这些属性只读。
window<span class="token punctuation">.</span>locationbar<span class="token punctuation">.</span>visible
window<span class="token punctuation">.</span>menubar<span class="token punctuation">.</span>visible
window<span class="token punctuation">.</span>scrollbars<span class="token punctuation">.</span>visible
window<span class="token punctuation">.</span>toolbar<span class="token punctuation">.</span>visible
window<span class="token punctuation">.</span>statusbar<span class="token punctuation">.</span>visible
window<span class="token punctuation">.</span>personalbar<span class="token punctuation">.</span>visible

全局对象属性
全局对象属性指向一些浏览器原生的全局对象。

<span class="token operator">-</span> window<span class="token punctuation">.</span>document：指向document对象，详见《document 对象》一章。注意，这个属性有同源限制。只有来自同源的脚本才能读取这个属性。
<span class="token operator">-</span> window<span class="token punctuation">.</span>location：指向Location对象，用于获取当前窗口的 <span class="token constant">URL</span> 信息。它等同于document<span class="token punctuation">.</span>location属性，详见《Location 对象》一章。
<span class="token operator">-</span> window<span class="token punctuation">.</span>navigator：指向Navigator对象，用于获取环境信息，详见《Navigator 对象》一章。
<span class="token operator">-</span> window<span class="token punctuation">.</span>history：指向History对象，表示浏览器的浏览历史，详见《History 对象》一章。
<span class="token operator">-</span> window<span class="token punctuation">.</span>localStorage：指向本地储存的 localStorage 数据，详见《Storage 接口》一章。
<span class="token operator">-</span> window<span class="token punctuation">.</span>sessionStorage：指向本地储存的 sessionStorage 数据，详见《Storage 接口》一章。
<span class="token operator">-</span> window<span class="token punctuation">.</span>console：指向console对象，用于操作控制台，详见《console 对象》一章。
<span class="token operator">-</span> window<span class="token punctuation">.</span>screen：指向Screen对象，表示屏幕信息，详见《Screen 对象》一章。
window<span class="token punctuation">.</span>isSecureContext
window<span class="token punctuation">.</span>isSecureContext属性返回一个布尔值，表示当前窗口是否处在加密环境。如果是 <span class="token constant">HTTPS</span> 协议，就是<span class="token boolean">true</span>，否则就是<span class="token boolean">false</span>。
方法
window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">confirm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>、window<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>、window<span class="token punctuation">.</span><span class="token function">confirm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>都是浏览器与用户互动的全局方法。它们会弹出不同的对话框，要求用户做出回应。注意，这三个方法弹出的对话框，都是浏览器统一规定的式样，无法定制。
（<span class="token number">1</span>）window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。
window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;Hello World&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

用户只有点击“确定”按钮，对话框才会消失。对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了。
window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的参数只能是字符串，没法使用 <span class="token constant">CSS</span> 样式，但是可以用\\n指定换行。
<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;本条提示\\n分成两行&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

（<span class="token number">2</span>）window<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法弹出的对话框，提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。
<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">&#39;您的年龄？&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span>

上面代码会跳出一个对话框，文字提示为“您的年龄？”，要求用户在对话框中输入自己的年龄（默认显示<span class="token number">25</span>）。用户填入的值，会作为返回值存入变量result。
window<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的返回值有两种情况，可能是字符串（有可能是空字符串），也有可能是<span class="token keyword">null</span>。具体分成三种情况。

<span class="token number">1.</span> 用户输入信息，并点击“确定”，则用户输入的信息就是返回值。
<span class="token number">2.</span> 用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
<span class="token number">3.</span> 用户点击了“取消”（或者按了 <span class="token constant">ESC</span> 按钮），则返回值是<span class="token keyword">null</span>。
window<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的第二个参数是可选的，但是最好总是提供第二个参数，作为输入框的默认值。
（<span class="token number">3</span>）window<span class="token punctuation">.</span><span class="token function">confirm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">confirm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户是否同意。
<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token string">&#39;你最近好吗？&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码弹出一个对话框，上面只有一行文字“你最近好吗？”，用户选择点击“确定”或“取消”。
confirm方法返回一个布尔值，如果用户点击“确定”，返回<span class="token boolean">true</span>；如果用户点击“取消”，则返回<span class="token boolean">false</span>。
<span class="token keyword">var</span> okay <span class="token operator">=</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token string">&#39;Please confirm this message.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>okay<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 用户按下“确定”</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 用户按下“取消”</span>
<span class="token punctuation">}</span>

confirm的一个用途是，用户离开当前页面时，弹出一个对话框，问用户是否真的要离开。
window<span class="token punctuation">.</span><span class="token function-variable function">onunload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> window<span class="token punctuation">.</span><span class="token function">confirm</span><span class="token punctuation">(</span><span class="token string">&#39;你确定要离开当面页面吗？&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

这三个方法都具有堵塞效应，一旦弹出对话框，整个页面就是暂停执行，等待用户做出反应。
window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> window<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
（<span class="token number">1</span>）window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span>open方法用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项。它会返回新窗口的引用，如果无法新建窗口，则返回<span class="token keyword">null</span>。
<span class="token keyword">var</span> popup <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;somefile.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码会让浏览器弹出一个新建窗口，网址是当前域名下的somefile<span class="token punctuation">.</span>html。
open方法一共可以接受三个参数。
window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> windowName<span class="token punctuation">,</span> <span class="token punctuation">[</span>windowFeatures<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token operator">-</span> url：字符串，表示新窗口的网址。如果省略，默认网址就是about<span class="token operator">:</span>blank。
<span class="token operator">-</span> windowName：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则占用该窗口，不再新建窗口。如果省略，就默认使用_blank，表示新建一个没有名字的窗口。另外还有几个预设值，_self表示当前窗口，_top表示顶层窗口，_parent表示上一层窗口。
<span class="token operator">-</span> windowFeatures：字符串，内容为逗号分隔的键值对（详见下文），表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整 <span class="token constant">UI</span> 的新窗口。如果新建的是一个已经存在的窗口，则该参数不起作用，浏览器沿用以前窗口的参数。
下面是一个例子。
<span class="token keyword">var</span> popup <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>
  <span class="token string">&#39;somepage.html&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;DefinitionsWindows&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码表示，打开的新窗口高度和宽度都为<span class="token number">200</span>像素，没有地址栏，但有状态栏和滚动条，允许用户调整大小。
第三个参数可以设定如下属性。

<span class="token operator">-</span> left：新窗口距离屏幕最左边的距离（单位像素）。注意，新窗口必须是可见的，不能设置在屏幕以外的位置。
<span class="token operator">-</span> top：新窗口距离屏幕最顶部的距离（单位像素）。
<span class="token operator">-</span> height：新窗口内容区域的高度（单位像素），不得小于<span class="token number">100</span>。
<span class="token operator">-</span> width：新窗口内容区域的宽度（单位像素），不得小于<span class="token number">100</span>。
<span class="token operator">-</span> outerHeight：整个浏览器窗口的高度（单位像素），不得小于<span class="token number">100</span>。
<span class="token operator">-</span> outerWidth：整个浏览器窗口的宽度（单位像素），不得小于<span class="token number">100</span>。
<span class="token operator">-</span> menubar：是否显示菜单栏。
<span class="token operator">-</span> toolbar：是否显示工具栏。
<span class="token operator">-</span> location：是否显示地址栏。
<span class="token operator">-</span> personalbar：是否显示用户自己安装的工具栏。
<span class="token operator">-</span> status：是否显示状态栏。
<span class="token operator">-</span> dependent：是否依赖父窗口。如果依赖，那么父窗口最小化，该窗口也最小化；父窗口关闭，该窗口也关闭。
<span class="token operator">-</span> minimizable：是否有最小化按钮，前提是dialog<span class="token operator">=</span>yes。
<span class="token operator">-</span> noopener：新窗口将与父窗口切断联系，即新窗口的window<span class="token punctuation">.</span>opener属性返回<span class="token keyword">null</span>，父窗口的window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法也返回<span class="token keyword">null</span>。
<span class="token operator">-</span> resizable：新窗口是否可以调节大小。
<span class="token operator">-</span> scrollbars：是否允许新窗口出现滚动条。
<span class="token operator">-</span> dialog：新窗口标题栏是否出现最大化、最小化、恢复原始大小的控件。
<span class="token operator">-</span> titlebar：新窗口是否显示标题栏。
<span class="token operator">-</span> alwaysRaised：是否显示在所有窗口的顶部。
<span class="token operator">-</span> alwaysLowered：是否显示在父窗口的底下。
<span class="token operator">-</span> close：新窗口是否显示关闭按钮。
对于那些可以打开和关闭的属性，设为yes或<span class="token number">1</span>或不设任何值就表示打开，比如status<span class="token operator">=</span>yes、status<span class="token operator">=</span><span class="token number">1</span>、status都会得到同样的结果。如果想设为关闭，不用写no，而是直接省略这个属性即可。也就是说，如果在第三个参数中设置了一部分属性，其他没有被设置的yes<span class="token operator">/</span>no属性都会被设成no，只有titlebar和关闭按钮除外（它们的值默认为yes）。
上面这些属性，属性名与属性值之间用等号连接，属性与属性之间用逗号分隔。
<span class="token string">&#39;height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes&#39;</span>

<span class="token function">另外，open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许open方法指向该窗口。
window<span class="token punctuation">.</span>open方法返回新窗口的引用。
<span class="token keyword">var</span> windowB <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;windowB.html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;WindowB&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
windowB<span class="token punctuation">.</span>window<span class="token punctuation">.</span>name <span class="token comment">// &quot;WindowB&quot;</span>

注意，如果新窗口和父窗口不是同源的（即不在同一个域），它们彼此不能获取对方窗口对象的内部属性。
下面是另一个例子。
<span class="token keyword">var</span> w <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;已经打开新窗口&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
w<span class="token punctuation">.</span>location <span class="token operator">=</span> <span class="token string">&#39;http://example.com&#39;</span><span class="token punctuation">;</span>

上面代码先打开一个新窗口，然后在该窗口弹出一个对话框，再将网址导向example<span class="token punctuation">.</span>com。
由于open这个方法很容易被滥用，许多浏览器默认都不允许脚本自动新建窗口。只允许在用户点击链接或按钮时，脚本做出反应，弹出新窗口。因此，有必要检查一下打开新窗口是否成功。
<span class="token keyword">var</span> popup <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>popup <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 新建窗口失败</span>
<span class="token punctuation">}</span>

（<span class="token number">2</span>）window<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span>close方法用于关闭当前窗口，一般只用来关闭window<span class="token punctuation">.</span>open方法新建的窗口。
popup<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

该方法只对顶层窗口有效，iframe框架之中的窗口使用该方法无效。
（<span class="token number">3</span>）window<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。
window<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

window<span class="token punctuation">.</span><span class="token function">moveTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">moveBy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">moveTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。
window<span class="token punctuation">.</span><span class="token function">moveTo</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span>

<span class="token function">上面代码将窗口移动到屏幕</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span>的位置。
window<span class="token punctuation">.</span><span class="token function">moveBy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法将窗口移动到一个相对位置。它接受两个参数，分别是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。
window<span class="token punctuation">.</span><span class="token function">moveBy</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span>

上面代码将窗口向右移动<span class="token number">25</span>像素、向下移动<span class="token number">50</span>像素。
为了防止有人滥用这两个方法，随意移动用户的窗口，目前只有一种情况，浏览器允许用脚本移动窗口：该窗口是用window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法新建的，并且窗口里只有它一个 Tab 页。除此以外的情况，使用上面两个方法都是无效的。
window<span class="token punctuation">.</span><span class="token function">resizeTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">resizeBy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">resizeTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于缩放窗口到指定大小。
它接受两个参数，第一个是缩放后的窗口宽度（outerWidth属性，包含滚动条、标题栏等等），第二个是缩放后的窗口高度（outerHeight属性）。
window<span class="token punctuation">.</span><span class="token function">resizeTo</span><span class="token punctuation">(</span>
  window<span class="token punctuation">.</span>screen<span class="token punctuation">.</span>availWidth <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span>
  window<span class="token punctuation">.</span>screen<span class="token punctuation">.</span>availHeight <span class="token operator">/</span> <span class="token number">2</span>
<span class="token punctuation">)</span>

上面代码将当前窗口缩放到，屏幕可用区域的一半宽度和高度。
window<span class="token punctuation">.</span><span class="token function">resizeBy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于缩放窗口。它与window<span class="token punctuation">.</span><span class="token function">resizeTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的区别是，它按照相对的量缩放，window<span class="token punctuation">.</span><span class="token function">resizeTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>需要给出缩放后的绝对大小。
它接受两个参数，第一个是水平缩放的量，第二个是垂直缩放的量，单位都是像素。
window<span class="token punctuation">.</span><span class="token function">resizeBy</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">)</span>

上面的代码将当前窗口的宽度和高度，都缩小<span class="token number">200</span>像素。
window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">scroll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">scrollBy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span>scrollTo方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。
window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span>x<span class="token operator">-</span>coord<span class="token punctuation">,</span> y<span class="token operator">-</span>coord<span class="token punctuation">)</span>

它也可以接受一个配置对象作为参数。
window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>

配置对象options有三个属性。

<span class="token operator">-</span> top：滚动后页面左上角的垂直坐标，即 y 坐标。
<span class="token operator">-</span> left：滚动后页面左上角的水平坐标，即 x 坐标。
<span class="token operator">-</span> behavior：字符串，表示滚动的方式，有三个可能值（smooth、instant、auto），默认值为auto。
window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">behavior</span><span class="token operator">:</span> <span class="token string">&#39;smooth&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

window<span class="token punctuation">.</span><span class="token function">scroll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法是window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的别名。
window<span class="token punctuation">.</span><span class="token function">scrollBy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。
window<span class="token punctuation">.</span><span class="token function">scrollBy</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">)</span>

上面代码用于将网页向下滚动一屏。
如果不是要滚动整个文档，而是要滚动某个元素，可以使用下面三个属性和方法。

<span class="token operator">-</span> Element<span class="token punctuation">.</span>scrollTop
<span class="token operator">-</span> Element<span class="token punctuation">.</span>scrollLeft
<span class="token operator">-</span> Element<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span>print方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。
常见的打印按钮代码如下。
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;printLink&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  window<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window<span class="token punctuation">.</span>print <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 支持打印功能</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">blur</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法会激活窗口，使其获得焦点，出现在其他窗口的前面。
<span class="token keyword">var</span> popup <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;popup.html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Popup Window&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>popup <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>popup<span class="token punctuation">.</span>closed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  popup<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码先检查popup窗口是否依然存在，确认后激活该窗口。
window<span class="token punctuation">.</span><span class="token function">blur</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法将焦点从窗口移除。
当前窗口获得焦点时，会触发focus事件；当前窗口失去焦点时，会触发blur事件。
window<span class="token punctuation">.</span><span class="token function">getSelection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span>getSelection方法返回一个Selection对象，表示用户现在选中的文本。
<span class="token keyword">var</span> selObj <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getSelection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

使用Selection对象的toString方法可以得到选中的文本。
<span class="token keyword">var</span> selectedText <span class="token operator">=</span> selObj<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象，详见《<span class="token constant">CSS</span> 操作》一章。
window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来检查 <span class="token constant">CSS</span> 的mediaQuery语句，详见《<span class="token constant">CSS</span> 操作》一章。
window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法跟setTimeout类似，都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab <span class="token function">页时，requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>会暂停执行。
如果某个函数会改变网页的布局，一般就放在window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。
该方法接受一个回调函数作为参数。
window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>

上面代码中，callback是一个回调函数。callback执行时，它的参数就是系统传入的一个高精度时间戳（performance<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的返回值），单位是毫秒，表示距离网页加载的时间。
window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的返回值是一个整数，这个整数可以传入window<span class="token punctuation">.</span><span class="token function">cancelAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，用来取消回调函数的执行。
下面是一个window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>执行网页动画的例子。
<span class="token keyword">var</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;animate&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token string">&#39;absolute&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> start <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">step</span><span class="token punctuation">(</span><span class="token parameter">timestamp</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>start<span class="token punctuation">)</span> start <span class="token operator">=</span> timestamp<span class="token punctuation">;</span>
  <span class="token keyword">var</span> progress <span class="token operator">=</span> timestamp <span class="token operator">-</span> start<span class="token punctuation">;</span>
  <span class="token comment">// 元素不断向左移，最大不超过200像素</span>
  element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>progress <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;px&#39;</span><span class="token punctuation">;</span>
  <span class="token comment">// 如果距离第一次执行不超过 2000 毫秒，</span>
  <span class="token comment">// 就继续执行动画</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>progress <span class="token operator">&lt;</span> <span class="token number">2000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>step<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>step<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码定义了一个网页动画，持续时间是<span class="token number">2</span>秒，会让元素向右移动。
window<span class="token punctuation">.</span><span class="token function">requestIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">requestIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>跟setTimeout类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用window<span class="token punctuation">.</span><span class="token function">requestIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>将其推迟执行，以保证网页性能。
它跟window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的区别在于，后者指定回调函数在下一次浏览器重排时执行，问题在于下一次重排时，系统资源未必空闲，不一定能保证在<span class="token number">16</span>毫秒之内完成；window<span class="token punctuation">.</span><span class="token function">requestIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>可以保证回调函数在系统资源空闲时执行。
该方法接受一个回调函数和一个配置对象作为参数。配置对象可以指定一个推迟执行的最长时间，如果过了这个时间，回调函数不管系统资源有无空闲，都会执行。
window<span class="token punctuation">.</span><span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>callback<span class="token punctuation">[</span><span class="token punctuation">,</span> options<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token function">callback参数是一个回调函数。该回调函数执行时，系统会传入一个IdleDeadline对象作为参数。IdleDeadline对象有一个didTimeout属性（布尔值，表示是否为超时调用）和一个timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法（返回该空闲时段剩余的毫秒数）。
options参数是一个配置对象，目前只有timeout一个属性，用来指定回调函数推迟执行的最大毫秒数。该参数可选。
window<span class="token punctuation">.</span><span class="token function">requestIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个整数。该整数可以传入window<span class="token punctuation">.</span><span class="token function">cancelIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>取消回调函数。
下面是一个例子。
<span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>myNonEssentialWork<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">myNonEssentialWork</span><span class="token punctuation">(</span><span class="token parameter">deadline</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>deadline<span class="token punctuation">.</span><span class="token function">timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">doWorkIfNeeded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">上面代码中，requestIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>用来执行非关键任务myNonEssentialWork。该任务先确认本次空闲时段有剩余时间，然后才真正开始执行任务。
下面是指定timeout的例子。
<span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>processPendingAnalyticsEvents<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">2000</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码指定，processPendingAnalyticsEvents必须在未来<span class="token number">2</span>秒之内执行。
如果由于超时导致回调函数执行，则deadline<span class="token punctuation">.</span><span class="token function">timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span>返回<span class="token number">0</span>，deadline<span class="token punctuation">.</span>didTimeout返回<span class="token boolean">true</span>。
如果多次执行window<span class="token punctuation">.</span><span class="token function">requestIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，指定多个回调函数，那么这些回调函数将排成一个队列，按照先进先出的顺序执行。
事件
window对象可以接收以下事件。
load 事件和 onload 属性
load事件发生在文档在浏览器窗口加载完毕时。window<span class="token punctuation">.</span>onload属性可以指定这个事件的回调函数。
window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> elements <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">&#39;example&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> elements<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> elt <span class="token operator">=</span> elements<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

上面代码在网页加载完毕后，获取指定元素并进行处理。
error 事件和 onerror 属性
浏览器脚本发生错误时，会触发window对象的error事件。我们可以通过window<span class="token punctuation">.</span>onerror属性对该事件指定回调函数。
window<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">message<span class="token punctuation">,</span> filename<span class="token punctuation">,</span> lineno<span class="token punctuation">,</span> colno<span class="token punctuation">,</span> error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;出错了！--&gt; %s&quot;</span><span class="token punctuation">,</span> error<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

由于历史原因，window的error事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。

<span class="token operator">-</span> 出错信息
<span class="token operator">-</span> 出错脚本的网址
<span class="token operator">-</span> 行号
<span class="token operator">-</span> 列号
<span class="token operator">-</span> 错误对象
老式浏览器只支持前三个参数。
并不是所有的错误，都会触发 JavaScript 的error事件（即让 JavaScript 报错）。一般来说，只有 JavaScript 脚本的错误，才会触发这个事件，而像资源文件不存在之类的错误，都不会触发。
下面是一个例子，如果整个页面未捕获错误超过<span class="token number">3</span>个，就显示警告。
window<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">msg<span class="token punctuation">,</span> url<span class="token punctuation">,</span> line</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>onerror<span class="token punctuation">.</span>num<span class="token operator">++</span> <span class="token operator">&gt;</span> onerror<span class="token punctuation">.</span>max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;ERROR: &#39;</span> <span class="token operator">+</span> msg <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span> <span class="token operator">+</span> url <span class="token operator">+</span> <span class="token string">&#39;:&#39;</span> <span class="token operator">+</span> line<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
onerror<span class="token punctuation">.</span>max <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
onerror<span class="token punctuation">.</span>num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

需要注意的是，如果脚本网址与网页网址不在同一个域（比如使用了 <span class="token constant">CDN</span>），浏览器根本不会提供详细的出错信息，只会提示出错，错误类型是“Script error<span class="token punctuation">.</span>”，行号为<span class="token number">0</span>，其他信息都没有。这是浏览器防止向外部脚本泄漏信息。一个解决方法是在脚本所在的服务器，设置Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Origin的 <span class="token constant">HTTP</span> 头信息。
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Origin<span class="token operator">:</span> <span class="token operator">*</span>

然后，在网页的<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>标签中设置crossorigin属性。
<span class="token operator">&lt;</span>script crossorigin<span class="token operator">=</span><span class="token string">&quot;anonymous&quot;</span> src<span class="token operator">=</span><span class="token string">&quot;//example.com/file.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>

上面代码的crossorigin<span class="token operator">=</span><span class="token string">&quot;anonymous&quot;</span>表示，读取文件不需要身份信息，即不需要 cookie 和 <span class="token constant">HTTP</span> 认证信息。如果设为crossorigin<span class="token operator">=</span><span class="token string">&quot;use-credentials&quot;</span>，就表示浏览器会上传 cookie 和 <span class="token constant">HTTP</span> 认证信息，同时还需要服务器端打开 <span class="token constant">HTTP</span> 头信息Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Credentials。
window 对象的事件监听属性
除了具备元素节点都有的 GlobalEventHandlers 接口，window对象还具有以下的事件监听函数属性。

<span class="token operator">-</span> window<span class="token punctuation">.</span>onafterprint：afterprint事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onbeforeprint：beforeprint事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onbeforeunload：beforeunload事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onhashchange：hashchange事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onlanguagechange<span class="token operator">:</span> languagechange的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onmessage：message事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onmessageerror：MessageError事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onoffline：offline事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>ononline：online事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onpagehide：pagehide事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onpageshow：pageshow事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onpopstate：popstate事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onstorage：storage事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onunhandledrejection：未处理的 Promise 对象的reject事件的监听函数。
<span class="token operator">-</span> window<span class="token punctuation">.</span>onunload：unload事件的监听函数。
多窗口操作
由于网页可以使用iframe元素，嵌入其他网页，因此一个网页之中会形成多个窗口。如果子窗口之中又嵌入别的网页，就会形成多级窗口。
窗口的引用
各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。
<span class="token operator">-</span> top：顶层窗口，即最上层的那个窗口
<span class="token operator">-</span> parent：父窗口
<span class="token operator">-</span> self：当前窗口，即自身
下面代码可以判断，当前窗口是否为顶层窗口。
<span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>top <span class="token operator">===</span> window<span class="token punctuation">.</span>self<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 当前窗口是顶层窗口</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 当前窗口是子窗口</span>
<span class="token punctuation">}</span>

下面的代码让父窗口的访问历史后退一次。
window<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

与这些变量对应，浏览器还提供一些特殊的窗口名，供window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法、<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>标签、<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>标签等引用。

<span class="token operator">-</span> _top：顶层窗口
<span class="token operator">-</span> _parent：父窗口
<span class="token operator">-</span> _blank：新窗口
下面代码就表示在顶层窗口打开链接。
<span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">&quot;somepage.html&quot;</span> target<span class="token operator">=</span><span class="token string">&quot;_top&quot;</span><span class="token operator">&gt;</span>Link<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>

iframe 元素
对于iframe嵌入的窗口，document<span class="token punctuation">.</span>getElementById方法可以拿到该窗口的 <span class="token constant">DOM</span> 节点，然后使用contentWindow属性获得iframe节点包含的window对象。
<span class="token keyword">var</span> frame <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;theFrame&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> frameWindow <span class="token operator">=</span> frame<span class="token punctuation">.</span>contentWindow<span class="token punctuation">;</span>

上面代码中，frame<span class="token punctuation">.</span>contentWindow可以拿到子窗口的window对象。然后，在满足同源限制的情况下，可以读取子窗口内部的属性。
<span class="token comment">// 获取子窗口的标题</span>
frameWindow<span class="token punctuation">.</span>title

<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>元素的contentDocument属性，可以拿到子窗口的document对象。
<span class="token keyword">var</span> frame <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;theFrame&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> frameDoc <span class="token operator">=</span> frame<span class="token punctuation">.</span>contentDocument<span class="token punctuation">;</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">var</span> frameDoc <span class="token operator">=</span> frame<span class="token punctuation">.</span>contentWindow<span class="token punctuation">.</span>document<span class="token punctuation">;</span>

<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，否则只有使用window<span class="token punctuation">.</span>postMessage方法。
<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>窗口内部，使用window<span class="token punctuation">.</span>parent引用父窗口。如果当前页面没有父窗口，则window<span class="token punctuation">.</span>parent属性返回自身。因此，可以通过window<span class="token punctuation">.</span>parent是否等于window<span class="token punctuation">.</span>self，判断当前窗口是否为iframe窗口。
<span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>parent <span class="token operator">!==</span> window<span class="token punctuation">.</span>self<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 当前窗口是子窗口</span>
<span class="token punctuation">}</span>

<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>窗口的window对象，有一个frameElement属性，返回<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>在父窗口中的 <span class="token constant">DOM</span> 节点。对于非嵌入的窗口，该属性等于<span class="token keyword">null</span>。
<span class="token keyword">var</span> f1Element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;f1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> f1Window <span class="token operator">=</span> f1Element<span class="token punctuation">.</span>contentWindow<span class="token punctuation">;</span>

f1Window<span class="token punctuation">.</span>frameElement <span class="token operator">===</span> f1Element <span class="token comment">// true</span>
window<span class="token punctuation">.</span>frameElement <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token comment">// true</span>

window<span class="token punctuation">.</span>frames 属性
window<span class="token punctuation">.</span>frames属性返回一个类似数组的对象，成员是所有子窗口的window对象。可以使用这个属性，实现窗口之间的互相引用。比如，frames<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>返回第一个子窗口，frames<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>frames<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>返回第二个子窗口内部的第三个子窗口，parent<span class="token punctuation">.</span>frames<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>返回父窗口的第二个子窗口。
注意，window<span class="token punctuation">.</span>frames每个成员的值，是框架内的窗口（即框架的window对象），而不是iframe标签在父窗口的 <span class="token constant">DOM</span> 节点。如果要获取每个框架内部的 <span class="token constant">DOM</span> 树，需要使用window<span class="token punctuation">.</span>frames<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>document的写法。
另外，如果<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>元素设置了name或id属性，那么属性值会自动成为全局变量，并且可以通过window<span class="token punctuation">.</span>frames属性引用，返回子窗口的window对象。
<span class="token comment">// HTML 代码为 &lt;iframe id=&quot;myFrame&quot;&gt;</span>
window<span class="token punctuation">.</span>myFrame <span class="token comment">// [HTMLIFrameElement]</span>
frames<span class="token punctuation">.</span>myframe <span class="token operator">===</span> myFrame <span class="token comment">// true</span>

另外，name属性的值会自动成为子窗口的名称，可以用在window<span class="token punctuation">.</span>open方法的第二个参数，或者<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>和<span class="token operator">&lt;</span>frame<span class="token operator">&gt;</span>标签的target属性。
History 对象
概述
window<span class="token punctuation">.</span>history属性指向 History 对象，它表示当前窗口的浏览历史。
History 对象保存了当前窗口访问过的所有页面网址。下面代码表示当前窗口一共访问过<span class="token number">3</span>个网址。
window<span class="token punctuation">.</span>history<span class="token punctuation">.</span>length <span class="token comment">// 3</span>

由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。
<span class="token comment">// 后退到前一个网址</span>
history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 等同于</span>
history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>

浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。
属性
History 对象主要有两个属性。

<span class="token operator">-</span> History<span class="token punctuation">.</span>length：当前窗口访问过的网址数量（包括当前网页）
<span class="token operator">-</span> History<span class="token punctuation">.</span>state：History 堆栈最上层的状态值（详见下文）
<span class="token comment">// 当前窗口访问过多少个网页</span>
window<span class="token punctuation">.</span>history<span class="token punctuation">.</span>length <span class="token comment">// 1</span>

<span class="token comment">// History 对象的当前状态</span>
<span class="token comment">// 通常是 undefined，即未设置</span>
window<span class="token punctuation">.</span>history<span class="token punctuation">.</span>state <span class="token comment">// undefined</span>

方法
History<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span>、History<span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span>、History<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
这三个方法用于在历史之中移动。

<span class="token operator">-</span> History<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
<span class="token operator">-</span> History<span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
<span class="token operator">-</span> History<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token function">相当于forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">，go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token function">相当于back</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为<span class="token number">0</span>，相当于刷新当前页面。
history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>相当于刷新当前页面。
history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 刷新当前页面</span>

注意，移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。
History<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，
History<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于在历史中添加一条记录。
window<span class="token punctuation">.</span>history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> title<span class="token punctuation">,</span> url<span class="token punctuation">)</span>

该方法接受三个参数，依次为：

<span class="token operator">-</span> state：一个与添加的记录相关联的状态对象，主要用于popstate事件。该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填<span class="token keyword">null</span>。
<span class="token operator">-</span> title：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
<span class="token operator">-</span> url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
假定当前网址是example<span class="token punctuation">.</span>com<span class="token operator">/</span><span class="token number">1.</span><span class="token function">html，使用pushState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法在浏览记录（History 对象）中添加一个新记录。
<span class="token keyword">var</span> stateObj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span>stateObj<span class="token punctuation">,</span> <span class="token string">&#39;page 2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

添加新记录后，浏览器地址栏立刻显示example<span class="token punctuation">.</span>com<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">.</span>html，但并不会跳转到<span class="token number">2</span><span class="token punctuation">.</span>html，甚至也不会检查<span class="token number">2.</span><span class="token function">html是否存在，它只是成为浏览历史中的最新记录。这时，在地址栏输入一个新的地址</span><span class="token punctuation">(</span>比如访问google<span class="token punctuation">.</span>com<span class="token punctuation">)</span>，然后点击了倒退按钮，页面的 <span class="token constant">URL</span> 将显示<span class="token number">2</span><span class="token punctuation">.</span>html；你再点击一次倒退按钮，<span class="token constant">URL</span> 将显示<span class="token number">1</span><span class="token punctuation">.</span>html。
<span class="token function">总之，pushState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法不会触发页面刷新，只是导致 History 对象发生变化，地址栏会有反应。
使用该方法之后，就可以用History<span class="token punctuation">.</span>state属性读出状态对象。
<span class="token keyword">var</span> stateObj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span>stateObj<span class="token punctuation">,</span> <span class="token string">&#39;page 2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span>state <span class="token comment">// {foo: &quot;bar&quot;}</span>

如果pushState的 <span class="token constant">URL</span> 参数设置了一个新的锚点值（即hash），并不会触发hashchange事件。反过来，如果 <span class="token constant">URL</span> 的锚点值变了，则会在 History 对象创建一条浏览记录。
<span class="token function">如果pushState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法设置了一个跨域网址，则会报错。
<span class="token comment">// 报错</span>
<span class="token comment">// 当前网址为 &lt;http://example.com&gt;</span>
history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;https://twitter.com/hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，pushState想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上，因为这个方法不会导致页面跳转。
History<span class="token punctuation">.</span><span class="token function">replaceState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
History<span class="token punctuation">.</span><span class="token function">replaceState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来修改 History <span class="token function">对象的当前记录，其他都与pushState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法一模一样。
假定当前网页是example<span class="token punctuation">.</span>com<span class="token operator">/</span>example<span class="token punctuation">.</span>html。
history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;title 1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;?page=1&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// URL 显示为 &lt;http://example.com/example.html?page=1&gt;</span>

history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;title 2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;?page=2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// URL 显示为 &lt;http://example.com/example.html?page=2&gt;</span>

history<span class="token punctuation">.</span><span class="token function">replaceState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;title 3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;?page=3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// URL 显示为 &lt;http://example.com/example.html?page=3&gt;</span>

history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// URL 显示为 &lt;http://example.com/example.html?page=1&gt;</span>

history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// URL 显示为 &lt;http://example.com/example.html&gt;</span>

history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment">// URL 显示为 &lt;http://example.com/example.html?page=3&gt;</span>

popstate 事件
每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。
<span class="token function">注意，仅仅调用pushState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">方法或replaceState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span>、History<span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span>、History<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。
使用的时候，可以为popstate事件指定回调函数。
window<span class="token punctuation">.</span><span class="token function-variable function">onpopstate</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;location: &#39;</span> <span class="token operator">+</span> document<span class="token punctuation">.</span>location<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;state: &#39;</span> <span class="token operator">+</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 或者</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;popstate&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;location: &#39;</span> <span class="token operator">+</span> document<span class="token punctuation">.</span>location<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;state: &#39;</span> <span class="token operator">+</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前 <span class="token constant">URL</span> 所提供的状态对象（即这两个方法的第一个参数）。上面代码中的event<span class="token punctuation">.</span>state，就是通过pushState和replaceState方法，为当前 <span class="token constant">URL</span> 绑定的state对象。
这个state对象也可以直接通过history对象读取。
<span class="token keyword">var</span> currentState <span class="token operator">=</span> history<span class="token punctuation">.</span>state<span class="token punctuation">;</span>

注意，页面第一次加载的时候，浏览器不会触发popstate事件。
Location 对象
Location对象是浏览器提供的原生对象，提供 <span class="token constant">URL</span> 相关的信息和操作方法。通过window<span class="token punctuation">.</span>location和document<span class="token punctuation">.</span>location属性，可以拿到这个对象。
属性
Location对象提供以下属性。

<span class="token operator">-</span> Location<span class="token punctuation">.</span>href：整个 <span class="token constant">URL</span>。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>protocol：当前 <span class="token constant">URL</span> <span class="token literal-property property">的协议，包括冒号（</span><span class="token operator">:</span>）。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>host：主机。如果端口不是协议默认的<span class="token number">80</span>和<span class="token number">433</span><span class="token literal-property property">，则还会包括冒号（</span><span class="token operator">:</span>）和端口。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>hostname：主机名，不包括端口。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>port：端口号。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>pathname：<span class="token constant">URL</span> 的路径部分，从根路径<span class="token operator">/</span>开始。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>search：查询字符串部分，从问号<span class="token operator">?</span>开始。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>hash：片段字符串部分，从#开始。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>username：域名前面的用户名。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>password：域名前面的密码。
<span class="token operator">-</span> Location<span class="token punctuation">.</span>origin：<span class="token constant">URL</span> 的协议、主机名和端口。
<span class="token comment">// 当前网址为</span>
<span class="token comment">// &lt;http://user:passwd@www.example.com:4097/path/a.html?x=111#part1&gt;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href
<span class="token comment">// &quot;http://user:passwd@www.example.com:4097/path/a.html?x=111#part1&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>protocol
<span class="token comment">// &quot;http:&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>host
<span class="token comment">// &quot;www.example.com:4097&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hostname
<span class="token comment">// &quot;www.example.com&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>port
<span class="token comment">// &quot;4097&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>pathname
<span class="token comment">// &quot;/path/a.html&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>search
<span class="token comment">// &quot;?x=111&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash
<span class="token comment">// &quot;#part1&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>username
<span class="token comment">// &quot;user&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>password
<span class="token comment">// &quot;passwd&quot;</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>origin
<span class="token comment">// &quot;http://user:passwd@www.example.com:4097&quot;</span>

这些属性里面，只有origin属性是只读的，其他属性都可写。
注意，如果对Location<span class="token punctuation">.</span>href写入新的 <span class="token constant">URL</span> 地址，浏览器会立刻跳转到这个新地址。
<span class="token comment">// 跳转到新网址</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">;</span>

这个特性常常用于让网页自动滚动到新的锚点。
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">&#39;#top&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash <span class="token operator">=</span> <span class="token string">&#39;#top&#39;</span><span class="token punctuation">;</span>

直接改写location，相当于写入href属性。
document<span class="token punctuation">.</span>location <span class="token operator">=</span> <span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">;</span>

另外，Location<span class="token punctuation">.</span>href属性是浏览器唯一允许跨域写入的属性，即非同源的窗口可以改写另一个窗口（比如子窗口与父窗口）的Location<span class="token punctuation">.</span>href属性，导致后者的网址跳转。Location的其他属性都不允许跨域写入。
方法
（<span class="token number">1</span>）Location<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
assign方法接受一个 <span class="token constant">URL</span> 字符串作为参数，使得浏览器立刻跳转到新的 <span class="token constant">URL</span>。如果参数不是有效的 <span class="token constant">URL</span> 字符串，则会报错。
<span class="token comment">// 跳转到新的网址</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">)</span>

（<span class="token number">2</span>）Location<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
replace方法接受一个 <span class="token constant">URL</span> 字符串作为参数，使得浏览器立刻跳转到新的 <span class="token constant">URL</span>。如果参数不是有效的 <span class="token constant">URL</span> 字符串，则会报错。
它与assign方法的差异在于，replace会在浏览器的浏览历史History里面删除当前网址，也就是说，一旦使用了该方法，后退按钮就无法回到当前网页了，相当于在浏览历史里面，使用新的 <span class="token constant">URL</span> 替换了老的 <span class="token constant">URL</span>。它的一个应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。
<span class="token comment">// 跳转到新的网址</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">)</span>

（<span class="token number">3</span>）Location<span class="token punctuation">.</span><span class="token function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
reload方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。
它接受一个布尔值作为参数。如果参数为<span class="token boolean">true</span>，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即scrollTop <span class="token operator">===</span> <span class="token number">0</span>）。如果参数是<span class="token boolean">false</span>或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。
<span class="token comment">// 向服务器重新请求当前网址</span>
window<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">reload</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

（<span class="token number">4</span>）Location<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
toString方法返回整个 <span class="token constant">URL</span> 字符串，相当于读取Location<span class="token punctuation">.</span>href属性。
<span class="token constant">URL</span> 的编码和解码
网页的 <span class="token constant">URL</span> 只能包含合法的字符。合法字符分成两类。

<span class="token operator">-</span> <span class="token constant">URL</span> 元字符：分号（<span class="token punctuation">;</span>），逗号（<span class="token punctuation">,</span>），斜杠（<span class="token operator">/</span>），问号（<span class="token operator">?</span>），冒号（<span class="token operator">:</span>），at（@），<span class="token operator">&amp;</span>，等号（<span class="token operator">=</span>），加号（<span class="token operator">+</span>），美元符号（$），井号（#）
<span class="token operator">-</span> 语义字符：a<span class="token operator">-</span>z，<span class="token constant">A</span><span class="token operator">-</span><span class="token constant">Z</span>，<span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span>，连词号（<span class="token operator">-</span>），下划线（_），点（<span class="token punctuation">.</span>），感叹号（<span class="token operator">!</span>），波浪线（<span class="token operator">~</span>），星号（<span class="token operator">*</span>），单引号（&#39;<span class="token function">），圆括号（</span><span class="token punctuation">(</span><span class="token punctuation">)</span>）
除了以上字符，其他字符出现在 <span class="token constant">URL</span> 之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（<span class="token operator">%</span>）加上两个大写的十六进制字母。
比如，<span class="token constant">UTF</span><span class="token operator">-</span><span class="token number">8</span> 的操作系统上，<span class="token operator">&lt;</span>http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>www<span class="token punctuation">.</span>example<span class="token punctuation">.</span>com<span class="token operator">/</span>q<span class="token operator">=</span>春节这个<span class="token operator">&gt;</span> <span class="token constant">URL</span> 之中，汉字“春节”不是 <span class="token constant">URL</span> 的合法字符，所以被浏览器自动转成<span class="token operator">&lt;</span>http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>www<span class="token punctuation">.</span>example<span class="token punctuation">.</span>com<span class="token operator">/</span>q<span class="token operator">=</span><span class="token operator">%</span><span class="token constant">E6</span><span class="token operator">%</span><span class="token number">98</span><span class="token operator">%</span><span class="token constant">A5</span><span class="token operator">%</span><span class="token constant">E8</span><span class="token operator">%</span>8A<span class="token operator">%</span><span class="token number">82</span>。其中，“春”转成了<span class="token operator">%</span><span class="token constant">E6</span><span class="token operator">%</span><span class="token number">98</span><span class="token operator">%</span><span class="token constant">A5</span>，“节”转成了<span class="token operator">%</span><span class="token constant">E8</span><span class="token operator">%</span>8A<span class="token operator">%</span><span class="token number">82</span>。这是因为“春”和“节”的<span class="token operator">&gt;</span> <span class="token constant">UTF</span><span class="token operator">-</span><span class="token number">8</span> 编码分别是<span class="token constant">E6</span> <span class="token number">98</span> <span class="token constant">A5</span>和<span class="token constant">E8</span> 8A <span class="token number">82</span>，将每个字节前面加上百分号，就构成了 <span class="token constant">URL</span> 编码。
JavaScript 提供四个 <span class="token constant">URL</span> 的编码<span class="token operator">/</span>解码方法。
<span class="token operator">-</span> <span class="token function">encodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> <span class="token function">encodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> <span class="token function">decodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">-</span> <span class="token function">decodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">encodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">encodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于转码整个 <span class="token constant">URL</span>。它的参数是一个字符串，代表整个 <span class="token constant">URL</span>。它会将元字符和语义字符之外的字符，都进行转义。
<span class="token function">encodeURI</span><span class="token punctuation">(</span><span class="token string">&#39;http://www.example.com/q=春节&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;http://www.example.com/q=%E6%98%A5%E8%8A%82&quot;</span>

<span class="token function">encodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">encodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于转码 <span class="token constant">URL</span> 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。所以，它不能用于转码整个 <span class="token constant">URL</span>。它接受一个参数，就是 <span class="token constant">URL</span> 的片段。
<span class="token function">encodeURIComponent</span><span class="token punctuation">(</span><span class="token string">&#39;春节&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;%E6%98%A5%E8%8A%82&quot;</span>
<span class="token function">encodeURIComponent</span><span class="token punctuation">(</span><span class="token string">&#39;http://www.example.com/q=春节&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82&quot;</span>

<span class="token function">上面代码中，encodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>会连 <span class="token constant">URL</span> 元字符一起转义，所以如果转码整个 <span class="token constant">URL</span> 就会出错。
<span class="token function">decodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">decodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于整个 <span class="token constant">URL</span> <span class="token function">的解码。它是encodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的逆运算。它接受一个参数，就是转码后的 <span class="token constant">URL</span>。
<span class="token function">decodeURI</span><span class="token punctuation">(</span><span class="token string">&#39;http://www.example.com/q=%E6%98%A5%E8%8A%82&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;http://www.example.com/q=春节&quot;</span>

<span class="token function">decodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">decodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>用于<span class="token constant">URL</span> <span class="token function">片段的解码。它是encodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的逆运算。它接受一个参数，就是转码后的 <span class="token constant">URL</span> 片段。
<span class="token function">decodeURIComponent</span><span class="token punctuation">(</span><span class="token string">&#39;%E6%98%A5%E8%8A%82&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;春节&quot;</span>

<span class="token constant">URL</span> 接口
浏览器原生提供<span class="token constant">URL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>接口，它是一个构造函数，用来构造、解析和编码 <span class="token constant">URL</span>。一般情况下，通过window<span class="token punctuation">.</span><span class="token constant">URL</span>可以拿到这个构造函数。
构造函数
<span class="token constant">URL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>作为构造函数，可以生成 <span class="token constant">URL</span> 实例。它接受一个表示 <span class="token constant">URL</span> 的字符串作为参数。如果参数不是合法的 <span class="token constant">URL</span>，会报错。
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&#39;http://www.example.com/index.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
url<span class="token punctuation">.</span>href
<span class="token comment">// &quot;http://www.example.com/index.html&quot;</span>

上面示例生成了一个 <span class="token constant">URL</span> 实例，用来代表指定的网址。
除了字符串，<span class="token constant">URL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>的参数也可以是另一个 <span class="token constant">URL</span> 实例。这时，<span class="token constant">URL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>会自动读取该实例的href属性，作为实际参数。
如果 <span class="token constant">URL</span> 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。
<span class="token keyword">var</span> url1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
url1<span class="token punctuation">.</span>href
<span class="token comment">// &quot;http://example.com/index.html&quot;</span>

<span class="token keyword">var</span> url2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&#39;page2.html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://example.com/page1.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
url2<span class="token punctuation">.</span>href
<span class="token comment">// &quot;http://example.com/page2.html&quot;</span>

<span class="token keyword">var</span> url3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&#39;..&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://example.com/a/b.html&#39;</span><span class="token punctuation">)</span>
url3<span class="token punctuation">.</span>href
<span class="token comment">// &quot;http://example.com/&quot;</span>

上面代码中，返回的 <span class="token constant">URL</span> 实例的路径都是在第二个参数的基础上，切换到第一个参数得到的。最后一个例子里面，第一个参数是<span class="token punctuation">.</span><span class="token punctuation">.</span>，表示上层路径。
实例属性
<span class="token constant">URL</span> 实例的属性与Location对象的属性基本一致，返回当前 <span class="token constant">URL</span> 的信息。

<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>href：返回整个 <span class="token constant">URL</span>
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>protocol：返回协议，以冒号<span class="token operator">:</span>结尾
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>hostname：返回域名
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>host：返回域名与端口，包含<span class="token operator">:</span>号，默认的<span class="token number">80</span>和<span class="token number">443</span>端口会省略
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>port：返回端口
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>origin：返回协议、域名和端口
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>pathname：返回路径，以斜杠<span class="token operator">/</span>开头
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>search：返回查询字符串，以问号<span class="token operator">?</span>开头
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>searchParams：返回一个URLSearchParams实例，该属性是Location对象没有的
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>hash：返回片段识别符，以井号#开头
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>password：返回域名前面的密码
<span class="token operator">-</span> <span class="token constant">URL</span><span class="token punctuation">.</span>username：返回域名前面的用户名
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&#39;http://user:passwd@www.example.com:4097/path/a.html?x=111#part1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

url<span class="token punctuation">.</span>href
<span class="token comment">// &quot;http://user:passwd@www.example.com:4097/path/a.html?x=111#part1&quot;</span>
url<span class="token punctuation">.</span>protocol
<span class="token comment">// &quot;http:&quot;</span>
url<span class="token punctuation">.</span>hostname
<span class="token comment">// &quot;www.example.com&quot;</span>
url<span class="token punctuation">.</span>host
<span class="token comment">// &quot;www.example.com:4097&quot;</span>
url<span class="token punctuation">.</span>port
<span class="token comment">// &quot;4097&quot;</span>
url<span class="token punctuation">.</span>origin
<span class="token comment">// &quot;http://www.example.com:4097&quot;</span>
url<span class="token punctuation">.</span>pathname
<span class="token comment">// &quot;/path/a.html&quot;</span>
url<span class="token punctuation">.</span>search
<span class="token comment">// &quot;?x=111&quot;</span>
url<span class="token punctuation">.</span>searchParams
<span class="token comment">// URLSearchParams {}</span>
url<span class="token punctuation">.</span>hash
<span class="token comment">// &quot;#part1&quot;</span>
url<span class="token punctuation">.</span>password
<span class="token comment">// &quot;passwd&quot;</span>
url<span class="token punctuation">.</span>username
<span class="token comment">// &quot;user&quot;</span>

这些属性里面，只有origin属性是只读的，其他属性都可写，并且会立即生效。
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&#39;http://example.com/index.html#part1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

url<span class="token punctuation">.</span>pathname <span class="token operator">=</span> <span class="token string">&#39;index2.html&#39;</span><span class="token punctuation">;</span>
url<span class="token punctuation">.</span>href <span class="token comment">// &quot;http://example.com/index2.html#part1&quot;</span>

url<span class="token punctuation">.</span>hash <span class="token operator">=</span> <span class="token string">&#39;#part2&#39;</span><span class="token punctuation">;</span>
url<span class="token punctuation">.</span>href <span class="token comment">// &quot;http://example.com/index2.html#part2&quot;</span>

上面代码中，改变 <span class="token constant">URL</span> 实例的pathname属性和hash属性，都会实时反映在 <span class="token constant">URL</span> 实例当中。
静态方法
（<span class="token number">1</span>）<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来为上传<span class="token operator">/</span>下载的文件、流媒体文件生成一个 <span class="token constant">URL</span> 字符串。这个字符串代表了File对象或Blob对象的 <span class="token constant">URL</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;display&quot;/&gt;</span>
<span class="token comment">// &lt;input</span>
<span class="token comment">//   type=&quot;file&quot;</span>
<span class="token comment">//   id=&quot;fileElem&quot;</span>
<span class="token comment">//   multiple</span>
<span class="token comment">//   accept=&quot;image/*&quot;</span>
<span class="token comment">//   onchange=&quot;handleFiles(this.files)&quot;</span>
<span class="token comment">//  &gt;</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;display&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">handleFiles</span><span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    img<span class="token punctuation">.</span>src <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    div<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

上面代码中，<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来为上传的文件生成一个 <span class="token constant">URL</span> 字符串，作为<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的图片来源。
该方法生成的 <span class="token constant">URL</span> 就像下面的样子。
<span class="token literal-property property">blob</span><span class="token operator">:</span><span class="token operator">&lt;</span>http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">/</span>c745ef73<span class="token operator">-</span>ece9<span class="token operator">-</span>46da<span class="token operator">-</span>8f66<span class="token operator">-</span>ebes574789b1<span class="token operator">&gt;</span>

注意，每次使用<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法，都会在内存里面生成一个 <span class="token constant">URL</span> 实例。如果不再需要该方法生成的 <span class="token constant">URL</span> 字符串，为了节省内存，可以使用<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法释放这个实例。
（<span class="token number">2</span>）<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来释放<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法生成的 <span class="token constant">URL</span> 实例。它的参数就是<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回的 <span class="token constant">URL</span> 字符串。
下面为上一段的示例加上<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;display&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">handleFiles</span><span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    img<span class="token punctuation">.</span>src <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    div<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
    img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>src<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

上面代码中，一旦图片加载成功以后，为本地文件生成的 <span class="token constant">URL</span> 字符串就没用了，于是可以在img<span class="token punctuation">.</span>onload回调函数里面，通过<span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法卸载这个 <span class="token constant">URL</span> 实例。
URLSearchParams 对象
概述
URLSearchParams对象是浏览器的原生对象，用来构造、解析和处理 <span class="token constant">URL</span> 的查询字符串（即 <span class="token constant">URL</span> 问号后面的部分）。
它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号<span class="token operator">?</span>有没有都行，也可以是对应查询字符串的数组或对象。
<span class="token comment">// 方法一：传入字符串</span>
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token string">&#39;?foo=1&amp;bar=2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>search<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方法二：传入数组</span>
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方法三：传入对象</span>
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">&#39;foo&#39;</span> <span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">,</span> <span class="token string-property property">&#39;bar&#39;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

URLSearchParams会对查询字符串自动编码。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">&#39;foo&#39;</span><span class="token operator">:</span> <span class="token string">&#39;你好&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;foo=%E4%BD%A0%E5%A5%BD&quot;</span>

上面代码中，foo的值是汉字，URLSearchParams对其自动进行 <span class="token constant">URL</span> 编码。
浏览器向服务器发送表单数据时，可以直接使用URLSearchParams实例作为表单数据。
<span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">bar</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;https://example.com/api&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">body</span><span class="token operator">:</span> params
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span>

上面代码中，fetch命令向服务器发送命令时，可以直接使用URLSearchParams实例。
URLSearchParams可以与<span class="token constant">URL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>接口结合使用。
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> url<span class="token punctuation">.</span>searchParams<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;somedefault&#39;</span><span class="token punctuation">;</span>

上面代码中，<span class="token constant">URL</span> 实例的searchParams属性就是一个URLSearchParams实例，所以可以使用URLSearchParams接口的<span class="token keyword">get</span>方法。
URLSearchParams实例有遍历器接口，可以用<span class="token keyword">for</span><span class="token operator">...</span><span class="token keyword">of</span>循环遍历（详见《<span class="token constant">ES6</span> 标准入门》的《Iterator》一章）。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">&#39;foo&#39;</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">,</span> <span class="token string-property property">&#39;bar&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> p <span class="token keyword">of</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&#39;: &#39;</span> <span class="token operator">+</span> p<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// foo: 1</span>
<span class="token comment">// bar: 2</span>

URLSearchParams没有实例属性，只有实例方法。
URLSearchParams<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
toString方法返回实例的字符串形式。
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&#39;https://example.com?foo=1&amp;bar=2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span>url<span class="token punctuation">.</span>search<span class="token punctuation">)</span><span class="token punctuation">;</span>

params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;foo=1&amp;bar=2&#39;</span>

那么需要字符串的场合，会自动调用toString方法。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">version</span><span class="token operator">:</span> <span class="token number">2.0</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> location<span class="token punctuation">.</span>pathname <span class="token operator">+</span> <span class="token string">&#39;?&#39;</span> <span class="token operator">+</span> params<span class="token punctuation">;</span>

上面代码中，location<span class="token punctuation">.</span>href赋值时，可以直接使用params对象。这时就会自动调用toString方法。
URLSearchParams<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来追加一个查询参数。它接受两个参数，第一个为键名，第二个为键值，没有返回值。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">&#39;foo&#39;</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">,</span> <span class="token string-property property">&#39;bar&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;baz&#39;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;foo=1&amp;bar=2&amp;baz=3&quot;</span>

<span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法不会识别是否键名已经存在。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">&#39;foo&#39;</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">,</span> <span class="token string-property property">&#39;bar&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;foo=1&amp;bar=2&amp;foo=3&quot;</span>

上面代码中，查询字符串里面foo已经存在了，但是append依然会追加一个同名键。
URLSearchParams<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来删除指定的查询参数。它接受键名作为参数。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">&#39;foo&#39;</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">,</span> <span class="token string-property property">&#39;bar&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;foo=1&quot;</span>

URLSearchParams<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">has</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个布尔值，表示查询字符串是否包含指定的键名。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">&#39;foo&#39;</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">,</span> <span class="token string-property property">&#39;bar&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
params<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">&#39;baz&#39;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>

URLSearchParams<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来设置查询字符串的键值。
它接受两个参数，第一个是键名，第二个是键值。如果是已经存在的键，键值会被改写，否则会被追加。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token string">&#39;?foo=1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;foo=2&quot;</span>
params<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;foo=2&amp;bar=3&quot;</span>

上面代码中，foo是已经存在的键，bar是还不存在的键。
如果有多个的同名键，<span class="token keyword">set</span>会移除现存所有的键。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token string">&#39;?foo=1&amp;foo=2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;foo=3&quot;</span>

下面是一个替换当前 <span class="token constant">URL</span> 的例子。
<span class="token comment">// URL: &lt;https://example.com?version=1.0&gt;</span>
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span>search<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;version&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2.0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

window<span class="token punctuation">.</span>history<span class="token punctuation">.</span><span class="token function">replaceState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> location<span class="token punctuation">.</span>pathname <span class="token operator">+</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">?</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// URL: &lt;https://example.com?version=2.0&gt;</span>

URLSearchParams<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，URLSearchParams<span class="token punctuation">.</span><span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来读取查询字符串里面的指定键。它接受键名作为参数。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token string">&#39;?foo=1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;1&quot;</span>
params<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span> <span class="token comment">// null</span>

两个地方需要注意。第一，它返回的是字符串，如果原始值是数值，需要转一下类型；第二，如果指定的键名不存在，返回值是<span class="token keyword">null</span>。
如果有多个的同名键，<span class="token keyword">get</span>返回位置最前面的那个键值。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token string">&#39;?foo=3&amp;foo=2&amp;foo=1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;3&quot;</span>

上面代码中，查询字符串有三个foo键，<span class="token keyword">get</span>方法返回最前面的键值<span class="token number">3</span>。
<span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个数组，成员是指定键的所有键值。它接受键名作为参数。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token string">&#39;?foo=1&amp;foo=2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">getAll</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span> <span class="token comment">// [&quot;1&quot;, &quot;2&quot;]</span>

上面代码中，查询字符串有两个foo键，getAll返回的数组就有两个成员。
URLSearchParams<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法对查询字符串里面的键进行排序，规则是按照 Unicode 码点从小到大排列。
该方法没有返回值，或者说返回值是<span class="token keyword">undefined</span>。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token string">&#39;c=4&amp;a=2&amp;b=3&amp;a=1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
params<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;a=2&amp;a=1&amp;b=3&amp;c=4&quot;</span>

上面代码中，如果有两个同名的键a，它们之间不会排序，而是保留原始的顺序。
URLSearchParams<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，URLSearchParams<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，URLSearchParams<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
这三个方法都返回一个遍历器对象，供<span class="token keyword">for</span><span class="token operator">...</span><span class="token keyword">of</span>循环遍历。它们的区别在于，keys方法返回的是键名的遍历器，values方法返回的是键值的遍历器，entries返回的是键值对的遍历器。
<span class="token keyword">var</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token string">&#39;a=1&amp;b=2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> p <span class="token keyword">of</span> params<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// a</span>
<span class="token comment">// b</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> p <span class="token keyword">of</span> params<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> p <span class="token keyword">of</span> params<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// [&quot;a&quot;, &quot;1&quot;]</span>
<span class="token comment">// [&quot;b&quot;, &quot;2&quot;]</span>

如果直接对URLSearchParams进行遍历，其实内部调用的就是entries接口。
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> p <span class="token keyword">of</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> p <span class="token keyword">of</span> params<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Navigator 对象
window<span class="token punctuation">.</span>navigator属性指向一个包含浏览器和系统信息的 Navigator 对象。脚本通过这个属性了解用户的环境信息。
属性
Navigator<span class="token punctuation">.</span>userAgent
navigator<span class="token punctuation">.</span>userAgent属性返回浏览器的 User Agent 字符串，表示浏览器的厂商和版本信息。
下面是 Chrome 浏览器的userAgent。
navigator<span class="token punctuation">.</span>userAgent
<span class="token comment">// &quot;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36&quot;</span>

通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且用户可以改变这个字符串。这个字符串的格式并无统一规定，也无法保证未来的适用性，各种上网设备层出不穷，难以穷尽。所以，现在一般不再通过它识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的 JavaScript 功能。
不过，通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串。
<span class="token keyword">var</span> ua <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">mobi</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 手机浏览器</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 非手机浏览器</span>
<span class="token punctuation">}</span>

如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。
<span class="token operator">/</span>mobi<span class="token operator">|</span>android<span class="token operator">|</span>touch<span class="token operator">|</span>mini<span class="token operator">/</span>i<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span>

Navigator<span class="token punctuation">.</span>plugins
Navigator<span class="token punctuation">.</span>plugins属性返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件，比如 Flash、ActiveX 等。
<span class="token keyword">var</span> pluginsLength <span class="token operator">=</span> navigator<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> pluginsLength<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>plugins<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>plugins<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>plugins<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>plugins<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

Navigator<span class="token punctuation">.</span>platform
Navigator<span class="token punctuation">.</span>platform属性返回用户的操作系统信息，比如MacIntel、Win32、Linux x86_64等 。
navigator<span class="token punctuation">.</span>platform
<span class="token comment">// &quot;Linux x86_64&quot;</span>

Navigator<span class="token punctuation">.</span>onLine
navigator<span class="token punctuation">.</span>onLine属性返回一个布尔值，表示用户当前在线还是离线（浏览器断线）。
navigator<span class="token punctuation">.</span>onLine <span class="token comment">// true</span>

有时，浏览器可以连接局域网，但是局域网不能连通外网。这时，有的浏览器的onLine属性会返回<span class="token boolean">true</span>，所以不能假定只要是<span class="token boolean">true</span>，用户就一定能访问互联网。不过，如果是<span class="token boolean">false</span>，可以断定用户一定离线。
用户变成在线会触发online事件，变成离线会触发offline事件，可以通过window<span class="token punctuation">.</span>ononline和window<span class="token punctuation">.</span>onoffline指定这两个事件的回调函数。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;offline&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;offline&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;online&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;online&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Navigator<span class="token punctuation">.</span>language，Navigator<span class="token punctuation">.</span>languages
Navigator<span class="token punctuation">.</span>language属性返回一个字符串，表示浏览器的首选语言。该属性只读。
navigator<span class="token punctuation">.</span>language <span class="token comment">// &quot;en&quot;</span>

Navigator<span class="token punctuation">.</span>languages属性返回一个数组，表示用户可以接受的语言。Navigator<span class="token punctuation">.</span>language总是这个数组的第一个成员。<span class="token constant">HTTP</span> 请求头信息的Accept<span class="token operator">-</span>Language字段，就来自这个数组。
navigator<span class="token punctuation">.</span>languages  <span class="token comment">// [&quot;en-US&quot;, &quot;en&quot;, &quot;zh-CN&quot;, &quot;zh&quot;, &quot;zh-TW&quot;]</span>

如果这个属性发生变化，就会在window对象上触发languagechange事件。
Navigator<span class="token punctuation">.</span>geolocation
Navigator<span class="token punctuation">.</span>geolocation属性返回一个 Geolocation 对象，包含用户地理位置的信息。注意，该 <span class="token constant">API</span> 只有在 <span class="token constant">HTTPS</span> 协议下可用，否则调用下面方法时会报错。
Geolocation 对象提供下面三个方法。

<span class="token operator">-</span> Geolocation<span class="token punctuation">.</span><span class="token function">getCurrentPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：得到用户的当前位置
<span class="token operator">-</span> Geolocation<span class="token punctuation">.</span><span class="token function">watchPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：监听用户位置变化
<span class="token operator">-</span> Geolocation<span class="token punctuation">.</span><span class="token function">clearWatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">：取消watchPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法指定的监听函数
注意，调用这三个方法时，浏览器会跳出一个对话框，要求用户给予授权。
Navigator<span class="token punctuation">.</span>cookieEnabled
navigator<span class="token punctuation">.</span>cookieEnabled属性返回一个布尔值，表示浏览器的 Cookie 功能是否打开。
navigator<span class="token punctuation">.</span>cookieEnabled <span class="token comment">// true</span>

注意，这个属性反映的是浏览器总的特性，与是否储存某个具体的网站的 Cookie 无关。用户可以设置某个网站不得储存 Cookie，这时cookieEnabled返回的还是<span class="token boolean">true</span>。
方法
Navigator<span class="token punctuation">.</span><span class="token function">javaEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
navigator<span class="token punctuation">.</span><span class="token function">javaEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。
navigator<span class="token punctuation">.</span><span class="token function">javaEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// false</span>

Navigator<span class="token punctuation">.</span><span class="token function">sendBeacon</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Navigator<span class="token punctuation">.</span><span class="token function">sendBeacon</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用于向服务器异步发送数据，详见《XMLHttpRequest 对象》一章。
实验性属性
Navigator 对象有一些实验性属性，在部分浏览器可用。
Navigator<span class="token punctuation">.</span>deviceMemory
navigator<span class="token punctuation">.</span>deviceMemory属性返回当前计算机的内存数量（单位为 <span class="token constant">GB</span>）。该属性只读，只在 <span class="token constant">HTTPS</span> 环境下可用。
它的返回值是一个近似值，四舍五入到最接近的<span class="token number">2</span>的幂，通常是 <span class="token number">0.25</span>、<span class="token number">0.5</span>、<span class="token number">1</span>、<span class="token number">2</span>、<span class="token number">4</span>、<span class="token number">8</span>。实际内存超过 8GB，也返回<span class="token number">8</span>。
<span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>deviceMemory <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./costly-module.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面示例中，只有当前内存大于 1GB，才加载大型的脚本。
Navigator<span class="token punctuation">.</span>hardwareConcurrency
navigator<span class="token punctuation">.</span>hardwareConcurrency属性返回用户计算机上可用的逻辑处理器的数量。该属性只读。
现代计算机的 <span class="token constant">CPU</span> 有多个物理核心，每个物理核心有时支持一次运行多个线程。因此，四核 <span class="token constant">CPU</span> 可以提供八个逻辑处理器核心。
<span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>hardwareConcurrency <span class="token operator">&gt;</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./costly-module.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面示例中，可用的逻辑处理器大于<span class="token number">4</span>，才会加载大型脚本。
该属性通过用于创建 Web Worker，每个可用的逻辑处理器都创建一个 Worker。
<span class="token keyword">let</span> workerList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> window<span class="token punctuation">.</span>navigator<span class="token punctuation">.</span>hardwareConcurrency<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> newWorker <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">worker</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token string">&#39;cpuworker.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">inUse</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  workerList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newWorker<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面示例中，有多少个可用的逻辑处理器，就创建多少个 Web Worker。
Navigator<span class="token punctuation">.</span>connection
navigator<span class="token punctuation">.</span>connection属性返回一个对象，包含当前网络连接的相关信息。

<span class="token operator">-</span> downlink：有效带宽估计值（单位：兆比特<span class="token operator">/</span>秒，Mbps），四舍五入到每秒 25KB 的最接近倍数。
<span class="token operator">-</span> downlinkMax：当前连接的最大下行链路速度（单位：兆比特每秒，Mbps）。
<span class="token operator">-</span> effectiveType：返回连接的等效类型，可能的值为slow<span class="token operator">-</span>2g、2g、3g、4g。
<span class="token operator">-</span> rtt：当前连接的估计有效往返时间，四舍五入到最接近的<span class="token number">25</span>毫秒的倍数。
<span class="token operator">-</span> saveData：用户是否设置了浏览器的减少数据使用量选项（比如不加载图片），返回<span class="token boolean">true</span>或者<span class="token boolean">false</span>。
<span class="token operator">-</span> type：当前连接的介质类型，可能的值为bluetooth、cellular、ethernet、none、wifi、wimax、other、unknown。
<span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>connection<span class="token punctuation">.</span>effectiveType <span class="token operator">===</span> <span class="token string">&#39;4g&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./costly-module.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面示例中，如果网络连接是 4G，则加载大型脚本。
Screen 对象
Screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。window<span class="token punctuation">.</span>screen属性指向这个对象。
该对象有下面的属性。

<span class="token operator">-</span> Screen<span class="token punctuation">.</span>height：浏览器窗口所在的屏幕的高度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
<span class="token operator">-</span> Screen<span class="token punctuation">.</span>width：浏览器窗口所在的屏幕的宽度（单位像素）。
<span class="token operator">-</span> Screen<span class="token punctuation">.</span>availHeight：浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于height减去那些被系统组件的高度。
<span class="token operator">-</span> Screen<span class="token punctuation">.</span>availWidth：浏览器窗口可用的屏幕宽度（单位像素）。
<span class="token operator">-</span> Screen<span class="token punctuation">.</span>pixelDepth：整数，表示屏幕的色彩位数，比如<span class="token number">24</span>表示屏幕提供<span class="token number">24</span>位色彩。
<span class="token operator">-</span> Screen<span class="token punctuation">.</span>colorDepth：Screen<span class="token punctuation">.</span>pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
<span class="token operator">-</span> Screen<span class="token punctuation">.</span>orientation：返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape<span class="token operator">-</span>primary表示横放，landscape<span class="token operator">-</span>secondary表示颠倒的横放，portrait<span class="token operator">-</span>primary表示竖放，portrait<span class="token operator">-</span>secondary表示颠倒的竖放。
下面是Screen<span class="token punctuation">.</span>orientation的例子。
window<span class="token punctuation">.</span>screen<span class="token punctuation">.</span>orientation
<span class="token comment">// { angle: 0, type: &quot;landscape-primary&quot;, onchange: null }</span>

下面的例子保证屏幕分辨率大于 <span class="token number">1024</span> x <span class="token number">768</span>。
<span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>screen<span class="token punctuation">.</span>width <span class="token operator">&gt;=</span> <span class="token number">1024</span> <span class="token operator">&amp;&amp;</span> window<span class="token punctuation">.</span>screen<span class="token punctuation">.</span>height <span class="token operator">&gt;=</span> <span class="token number">768</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 分辨率不低于 1024x768</span>
<span class="token punctuation">}</span>

下面是根据屏幕的宽度，将用户导向不同网页的代码。
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span>width <span class="token operator">&lt;=</span> <span class="token number">800</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>screen<span class="token punctuation">.</span>height <span class="token operator">&lt;=</span> <span class="token number">600</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  window<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;small.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  window<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;wide.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console
console 对象
console对象是 JavaScript 的原生对象，它有点像 Unix 系统的标准输出stdout和标准错误stderr，可以输出各种信息到控制台，并且还提供了很多有用的辅助方法。
console的常见用途有两个。

<span class="token operator">-</span> 调试程序，显示网页代码运行时的错误信息。
<span class="token operator">-</span> 提供了一个命令行接口，用来与网页代码互动。
console对象的浏览器实现，包含在浏览器自带的开发工具之中。以 Chrome 浏览器的“开发者工具”（Developer Tools）为例，可以使用下面三种方法的打开它。

<span class="token number">1.</span> 按 <span class="token constant">F12</span> 或者Control <span class="token operator">+</span> Shift <span class="token operator">+</span> i（<span class="token constant">PC</span>）<span class="token operator">/</span> Command <span class="token operator">+</span> Option <span class="token operator">+</span> i（Mac）。
<span class="token number">2.</span> 浏览器菜单选择“工具<span class="token operator">/</span>开发者工具”。
<span class="token number">3.</span> 在一个页面元素上，打开右键菜单，选择其中的“Inspect Element”。
打开开发者工具以后，顶端有多个面板。

<span class="token operator">-</span> Elements：查看网页的 <span class="token constant">HTML</span> 源码和 <span class="token constant">CSS</span> 代码。
<span class="token operator">-</span> Resources：查看网页加载的各种资源文件（比如代码文件、字体文件 <span class="token constant">CSS</span> 文件等），以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage等）。
<span class="token operator">-</span> Network：查看网页的 <span class="token constant">HTTP</span> 通信情况。
<span class="token operator">-</span> Sources：查看网页加载的脚本源码。
<span class="token operator">-</span> Timeline：查看各种网页行为随时间变化的情况。
<span class="token operator">-</span> Performance：查看网页的性能情况，比如 <span class="token constant">CPU</span> 和内存消耗。
<span class="token operator">-</span> Console：用来运行 JavaScript 命令。
这些面板都有各自的用途，以下只介绍Console面板（又称为控制台）。
Console面板基本上就是一个命令行窗口，你可以在提示符下，键入各种命令。
console 对象的静态方法
console对象提供的各种静态方法，用来与控制台窗口互动。
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，console<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span>log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出。
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello World&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// Hello World</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// a b c</span>

console<span class="token punctuation">.</span>log方法会自动在每次输出的结尾，添加换行符。
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>
<span class="token comment">// 3</span>

如果第一个参数是格式字符串（使用了格式占位符），console<span class="token punctuation">.</span>log方法将依次用后面的参数替换占位符，然后再进行输出。
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39; %s + %s = %s&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment">//  1 + 1 = 2</span>

上面代码中，console<span class="token punctuation">.</span>log方法的第一个参数有三个占位符（<span class="token operator">%</span>s），第二、三、四个参数会在显示时，依次替换掉这个三个占位符。
console<span class="token punctuation">.</span>log方法支持以下占位符，不同类型的数据必须使用对应的占位符。

<span class="token operator">-</span> <span class="token operator">%</span>s 字符串
<span class="token operator">-</span> <span class="token operator">%</span>d 整数
<span class="token operator">-</span> <span class="token operator">%</span>i 整数
<span class="token operator">-</span> <span class="token operator">%</span>f 浮点数
<span class="token operator">-</span> <span class="token operator">%</span>o 对象的链接
<span class="token operator">-</span> <span class="token operator">%</span>c <span class="token constant">CSS</span> 格式字符串
<span class="token keyword">var</span> number <span class="token operator">=</span> <span class="token number">11</span> <span class="token operator">*</span> <span class="token number">9</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> color <span class="token operator">=</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;%d %s balloons&#39;</span><span class="token punctuation">,</span> number<span class="token punctuation">,</span> color<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 99 red balloons</span>

上面代码中，第二个参数是数值，对应的占位符是<span class="token operator">%</span>d，第三个参数是字符串，对应的占位符是<span class="token operator">%</span>s。
使用<span class="token operator">%</span>c占位符时，对应的参数必须是 <span class="token constant">CSS</span> 代码，用来对输出内容进行 <span class="token constant">CSS</span> 渲染。
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
  <span class="token string">&#39;%cThis text is styled!&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;color: red; background: yellow; font-size: 24px;&#39;</span>
<span class="token punctuation">)</span>

上面代码运行后，输出的内容将显示为黄底红字。
console<span class="token punctuation">.</span>log方法的两种参数格式，可以结合在一起使用。
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39; %s + %s &#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;= 2&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 1 + 1  = 2</span>

如果参数是一个对象，console<span class="token punctuation">.</span>log会显示该对象的值。
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// Object {foo: &quot;bar&quot;}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Date<span class="token punctuation">)</span>
<span class="token comment">// function Date() { [native code] }</span>

上面代码输出Date对象的值，结果为一个构造函数。
console<span class="token punctuation">.</span>info是console<span class="token punctuation">.</span>log方法的别名，用法完全一样。只不过console<span class="token punctuation">.</span>info方法会在输出信息的前面，加上一个蓝色图标。
console<span class="token punctuation">.</span>debug方法与console<span class="token punctuation">.</span>log方法类似，会在控制台输出调试信息。但是，默认情况下，console<span class="token punctuation">.</span>debug输出的信息不会显示，只有在打开显示级别在verbose的情况下，才会显示。
console对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义console<span class="token punctuation">.</span>log方法。
<span class="token punctuation">[</span><span class="token string">&#39;log&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;info&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;warn&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">=</span> console<span class="token punctuation">[</span>method<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>
    console<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toISOString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;出错了！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 2014-05-18T09:00.000Z 出错了！</span>

上面代码表示，使用自定义的console<span class="token punctuation">.</span>log方法，可以在显示结果添加当前时间。
console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
warn方法和error方法也是在控制台输出信息，它们与log方法的不同之处在于，warn方法输出信息时，在最前面加一个黄色三角，表示警告；error方法输出信息时，在最前面加一个红色的叉，表示出错。同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都一样。
console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;Error: %s (%i)&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Server is not responding&#39;</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
<span class="token comment">// Error: Server is not responding (500)</span>
console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;Warning! Too few nodes (%d)&#39;</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
<span class="token comment">// Warning! Too few nodes (1)</span>

可以这样理解，log方法是写入标准输出（stdout），warn方法和error方法是写入标准错误（stderr）。
console<span class="token punctuation">.</span><span class="token function">table</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
对于某些复合类型的数据，console<span class="token punctuation">.</span>table方法可以将其转为表格显示。
<span class="token keyword">var</span> languages <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;JavaScript&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">fileExtension</span><span class="token operator">:</span> <span class="token string">&quot;.js&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;TypeScript&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">fileExtension</span><span class="token operator">:</span> <span class="token string">&quot;.ts&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;CoffeeScript&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">fileExtension</span><span class="token operator">:</span> <span class="token string">&quot;.coffee&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">table</span><span class="token punctuation">(</span>languages<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">上面代码的language变量，转为表格显示如下。</span>
<span class="token punctuation">(</span>index<span class="token punctuation">)</span>
name
fileExtension
<span class="token number">0</span>
<span class="token string">&quot;JavaScript&quot;</span>
<span class="token string">&quot;.js&quot;</span>
<span class="token number">1</span>
<span class="token string">&quot;TypeScript&quot;</span>
<span class="token string">&quot;.ts&quot;</span>
<span class="token number">2</span>
<span class="token string">&quot;CoffeeScript&quot;</span>
<span class="token string">&quot;.coffee&quot;</span>

下面是显示表格内容的例子。
<span class="token keyword">var</span> languages <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">csharp</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;C#&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">paradigm</span><span class="token operator">:</span> <span class="token string">&quot;object-oriented&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fsharp</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;F#&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">paradigm</span><span class="token operator">:</span> <span class="token string">&quot;functional&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">table</span><span class="token punctuation">(</span>languages<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">上面代码的language，转为表格显示如下。</span>
<span class="token punctuation">(</span>index<span class="token punctuation">)</span>
name
paradigm
csharp
<span class="token string">&quot;C#&quot;</span>
<span class="token string">&quot;object-oriented&quot;</span>
fsharp
<span class="token string">&quot;F#&quot;</span>
<span class="token string">&quot;functional&quot;</span>

console<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
count方法用于计数，输出它被调用了多少次。
<span class="token keyword">function</span> <span class="token function">greet</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token string">&#39;hi &#39;</span> <span class="token operator">+</span> user<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">greet</span><span class="token punctuation">(</span><span class="token string">&#39;bob&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//  : 1</span>
<span class="token comment">// &quot;hi bob&quot;</span>

<span class="token function">greet</span><span class="token punctuation">(</span><span class="token string">&#39;alice&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//  : 2</span>
<span class="token comment">// &quot;hi alice&quot;</span>

<span class="token function">greet</span><span class="token punctuation">(</span><span class="token string">&#39;bob&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//  : 3</span>
<span class="token comment">// &quot;hi bob&quot;</span>

上面代码每次调用greet函数，内部的console<span class="token punctuation">.</span>count方法就输出执行次数。
该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。
<span class="token keyword">function</span> <span class="token function">greet</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token string">&quot;hi &quot;</span> <span class="token operator">+</span> user<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">greet</span><span class="token punctuation">(</span><span class="token string">&#39;bob&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// bob: 1</span>
<span class="token comment">// &quot;hi bob&quot;</span>

<span class="token function">greet</span><span class="token punctuation">(</span><span class="token string">&#39;alice&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// alice: 1</span>
<span class="token comment">// &quot;hi alice&quot;</span>

<span class="token function">greet</span><span class="token punctuation">(</span><span class="token string">&#39;bob&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// bob: 2</span>
<span class="token comment">// &quot;hi bob&quot;</span>

上面代码根据参数的不同，显示bob执行了两次，alice执行了一次。
console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，console<span class="token punctuation">.</span><span class="token function">dirxml</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">f1</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">f2</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// Object {f1: &quot;foo&quot;, f2: &quot;bar&quot;}</span>

console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">f1</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">f2</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// Object</span>
<span class="token comment">//   f1: &quot;foo&quot;</span>
<span class="token comment">//   f2: &quot;bar&quot;</span>
<span class="token comment">//   __proto__: Object</span>

上面代码显示dir方法的输出结果，比log方法更易读，信息也更丰富。
该方法对于输出 <span class="token constant">DOM</span> 对象非常有用，因为会显示 <span class="token constant">DOM</span> 对象的所有属性。
console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">)</span>

Node 环境之中，还可以指定以代码高亮的形式输出。
console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">colors</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

dirxml方法主要用于以目录树的形式，显示 <span class="token constant">DOM</span> 节点。
console<span class="token punctuation">.</span><span class="token function">dirxml</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">)</span>

如果参数不是 <span class="token constant">DOM</span> 节点，而是普通的 JavaScript 对象，console<span class="token punctuation">.</span>dirxml等同于console<span class="token punctuation">.</span>dir。
console<span class="token punctuation">.</span><span class="token function">dirxml</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// 等同于</span>
console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">assert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span>assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。
它接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为<span class="token boolean">false</span>，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。
console<span class="token punctuation">.</span><span class="token function">assert</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&#39;判断条件不成立&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// Assertion failed: 判断条件不成立</span>

<span class="token comment">// 相当于</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;判断条件不成立&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

下面是一个例子，判断子节点的个数是否大于等于<span class="token number">500</span>。
console<span class="token punctuation">.</span><span class="token function">assert</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">500</span><span class="token punctuation">,</span> <span class="token string">&#39;节点个数大于等于500&#39;</span><span class="token punctuation">)</span>

上面代码中，如果符合条件的节点小于<span class="token number">500</span>个，不会有任何输出；只有大于等于<span class="token number">500</span>时，才会在控制台提示错误，并且显示指定文本。
console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
这两个方法用于计时，可以算出一个操作所花费的准确时间。
console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&#39;Array initialize&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> array<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> array<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token string">&#39;Array initialize&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Array initialize: 1914.481ms</span>

<span class="token literal-property property">time方法表示计时开始，timeEnd方法表示计时结束。它们的参数是计时器的名称。调用timeEnd方法之后，控制台会显示“计时器名称</span><span class="token operator">:</span> 所耗费的时间”。
console<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，console<span class="token punctuation">.</span><span class="token function">groupEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，console<span class="token punctuation">.</span><span class="token function">groupCollapsed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span>group和console<span class="token punctuation">.</span>groupEnd这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠<span class="token operator">/</span>展开。
console<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token string">&#39;一级分组&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;一级分组的内容&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token string">&#39;二级分组&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;二级分组的内容&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">groupEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 二级分组结束</span>
console<span class="token punctuation">.</span><span class="token function">groupEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 一级分组结束</span>

上面代码会将“二级分组”显示在“一级分组”内部，并且“一级分组”和“二级分组”前面都有一个折叠符号，可以用来折叠本级的内容。
console<span class="token punctuation">.</span>groupCollapsed方法与console<span class="token punctuation">.</span>group方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。
console<span class="token punctuation">.</span><span class="token function">groupCollapsed</span><span class="token punctuation">(</span><span class="token string">&#39;Fetching Data&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Request Sent&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;Error: Server not responding (500)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">groupEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码只显示一行”Fetching Data“，点击后才会展开，显示其中包含的两行。
console<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，console<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span>trace方法显示当前执行的代码在堆栈中的调用路径。
console<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// console.trace()</span>
<span class="token comment">//   (anonymous function)</span>
<span class="token comment">//   InjectedScript._evaluateOn</span>
<span class="token comment">//   InjectedScript._evaluateAndWrap</span>
<span class="token comment">//   InjectedScript.evaluate</span>

console<span class="token punctuation">.</span>clear方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的“Preserve log”选项，console<span class="token punctuation">.</span>clear方法将不起作用。
控制台命令行 <span class="token constant">API</span>
浏览器控制台中，除了使用console对象，还可以使用一些控制台自带的命令行方法。
（<span class="token number">1</span>）$_
$_属性返回上一个表达式的值。
<span class="token number">2</span> <span class="token operator">+</span> <span class="token number">2</span>
<span class="token comment">// 4</span>
$_
<span class="token comment">// 4</span>

（<span class="token number">2</span>）$0 <span class="token operator">-</span> $4
控制台保存了最近<span class="token number">5</span>个在 Elements 面板选中的 <span class="token constant">DOM</span> 元素，$0代表倒数第一个（最近一个），$1代表倒数第二个，以此类推直到$4。
<span class="token function">（3）$</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span>
<span class="token function">$</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span>返回第一个匹配的元素，等同于document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。注意，如果页面脚本对$有定义，则会覆盖原始的定义。比如，页面里面有 <span class="token function">jQuery，控制台执行$</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span>就会采用 jQuery 的实现，返回一个数组。
<span class="token function">（4）$$</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span>
<span class="token function">$$</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span>返回选中的 <span class="token constant">DOM</span> 对象，等同于document<span class="token punctuation">.</span>querySelectorAll。
<span class="token function">（5）$x</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
<span class="token function">$x</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>方法返回一个数组，包含匹配特定 XPath 表达式的所有 <span class="token constant">DOM</span> 元素。
<span class="token function">$x</span><span class="token punctuation">(</span><span class="token string">&quot;//p[a]&quot;</span><span class="token punctuation">)</span>

上面代码返回所有包含a元素的p元素。
<span class="token function">（6）inspect</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>
<span class="token function">inspect</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>方法打开相关面板，并选中相应的元素，显示它的细节。<span class="token constant">DOM</span> <span class="token function">元素在Elements面板中显示，比如inspect</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span>会在 Elements 面板显示document元素。JavaScript <span class="token function">对象在控制台面板Profiles面板中显示，比如inspect</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span>。
<span class="token function">（7）getEventListeners</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>
<span class="token function">getEventListeners</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>方法返回一个对象，该对象的成员为object登记了回调函数的各种事件（比如click或keydown），每个事件对应一个数组，数组的成员为该事件的回调函数。
<span class="token function">（8）keys</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token function">，values</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>
<span class="token function">keys</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>方法返回一个数组，包含object的所有键名。
<span class="token function">values</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>方法返回一个数组，包含object的所有键值。
<span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string-property property">&#39;p1&#39;</span><span class="token operator">:</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string-property property">&#39;p2&#39;</span><span class="token operator">:</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">keys</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span>
<span class="token comment">// [&quot;p1&quot;, &quot;p2&quot;]</span>
<span class="token function">values</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span>
<span class="token comment">// [&quot;a&quot;, &quot;b&quot;]</span>

<span class="token function">（9）monitorEvents</span><span class="token punctuation">(</span>object<span class="token punctuation">[</span><span class="token punctuation">,</span> events<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token function">，unmonitorEvents</span><span class="token punctuation">(</span>object<span class="token punctuation">[</span><span class="token punctuation">,</span> events<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token function">monitorEvents</span><span class="token punctuation">(</span>object<span class="token punctuation">[</span><span class="token punctuation">,</span> events<span class="token punctuation">]</span><span class="token punctuation">)</span>方法监听特定对象上发生的特定事件。事件发生时，会返回一个Event对象，包含该事件的相关信息。unmonitorEvents方法用于停止监听。
<span class="token function">monitorEvents</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> <span class="token string">&quot;resize&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">monitorEvents</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;resize&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;scroll&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

上面代码分别表示单个事件和多个事件的监听方法。
<span class="token function">monitorEvents</span><span class="token punctuation">(</span>$0<span class="token punctuation">,</span> <span class="token string">&#39;mouse&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">unmonitorEvents</span><span class="token punctuation">(</span>$0<span class="token punctuation">,</span> <span class="token string">&#39;mousemove&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码表示如何停止监听。
monitorEvents允许监听同一大类的事件。所有事件可以分成四个大类。

<span class="token operator">-</span> mouse：<span class="token string">&quot;mousedown&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mouseup&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;click&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dblclick&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mousemove&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mouseover&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mouseout&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mousewheel&quot;</span>
<span class="token operator">-</span> key：<span class="token string">&quot;keydown&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;keyup&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;keypress&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;textInput&quot;</span>
<span class="token operator">-</span> touch：<span class="token string">&quot;touchstart&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;touchmove&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;touchend&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;touchcancel&quot;</span>
<span class="token operator">-</span> control：<span class="token string">&quot;resize&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;scroll&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;zoom&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;focus&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;blur&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;select&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;submit&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;reset&quot;</span>
<span class="token function">monitorEvents</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;#msg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码表示监听所有key大类的事件。
（<span class="token number">10</span>）其他方法
命令行 <span class="token constant">API</span> 还提供以下方法。

<span class="token operator">-</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：清除控制台的历史。
<span class="token operator">-</span> <span class="token function">copy</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>：复制特定 <span class="token constant">DOM</span> 元素到剪贴板。
<span class="token operator">-</span> <span class="token function">dir</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>：显示特定对象的所有属性，是console<span class="token punctuation">.</span>dir方法的别名。
<span class="token operator">-</span> <span class="token function">dirxml</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span>：显示特定对象的 <span class="token constant">XML</span> 形式，是console<span class="token punctuation">.</span>dirxml方法的别名。
<span class="token keyword">debugger</span> 语句
<span class="token keyword">debugger</span>语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到<span class="token keyword">debugger</span>语句时会自动停下。如果没有除错工具，<span class="token keyword">debugger</span>语句不会产生任何结果，JavaScript 引擎自动跳过这一句。
Chrome 浏览器中，当代码运行到<span class="token keyword">debugger</span>语句时，就会暂停运行，自动打开脚本源码界面。
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">debugger</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码打印出<span class="token number">0</span>，<span class="token number">1</span>，<span class="token number">2</span>以后，就会暂停，自动打开源码界面，等待进一步处理。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),e=[o];function c(i,l){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","bom.html.vue"]]);export{r as default};
