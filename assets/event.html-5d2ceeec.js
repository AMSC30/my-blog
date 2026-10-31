import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const p={},e=t(`<h1 id="event" tabindex="-1"><a class="header-anchor" href="#event" aria-hidden="true">#</a> Event</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>事件流
一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。
<span class="token operator">-</span> 第一阶段：从window对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
<span class="token operator">-</span> 第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
<span class="token operator">-</span> 第三阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。
这种三阶段的传播模型，使得同一个事件会在多个节点上触发。
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>点击<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

如果对这两个节点，都设置click事件的监听函数（每个节点的捕获阶段和冒泡阶段，各设置一个监听函数），共计设置四个监听函数。然后，对<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>点击，click事件会触发四次。
<span class="token keyword">var</span> phases <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;capture&#39;</span><span class="token punctuation">,</span>
  <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;target&#39;</span><span class="token punctuation">,</span>
  <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;bubble&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> callback<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> callback<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> callback<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> callback<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> tag <span class="token operator">=</span> event<span class="token punctuation">.</span>currentTarget<span class="token punctuation">.</span>tagName<span class="token punctuation">;</span>
  <span class="token keyword">var</span> phase <span class="token operator">=</span> phases<span class="token punctuation">[</span>event<span class="token punctuation">.</span>eventPhase<span class="token punctuation">]</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Tag: &#39;&quot;</span> <span class="token operator">+</span> tag <span class="token operator">+</span> <span class="token string">&quot;&#39;. EventPhase: &#39;&quot;</span> <span class="token operator">+</span> phase <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 点击以后的结果</span>
<span class="token comment">// Tag: &#39;DIV&#39;. EventPhase: &#39;capture&#39;</span>
<span class="token comment">// Tag: &#39;P&#39;. EventPhase: &#39;target&#39;</span>
<span class="token comment">// Tag: &#39;P&#39;. EventPhase: &#39;target&#39;</span>
<span class="token comment">// Tag: &#39;DIV&#39;. EventPhase: &#39;bubble&#39;</span>

上面代码表示，click事件被触发了四次：<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>节点的捕获阶段和冒泡阶段各<span class="token number">1</span>次，<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>节点的目标阶段触发了<span class="token number">2</span>次。
<span class="token number">1.</span> 捕获阶段：事件从<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>向<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>传播时，触发<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>的click事件；
<span class="token number">2.</span> 目标阶段：事件从<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>到达<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>时，触发<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>的click事件；
<span class="token number">3.</span> 冒泡阶段：事件从<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>传回<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>时，再次触发<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>的click事件。
其中，<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>节点有两个监听函数（addEventListener方法第三个参数的不同，会导致绑定两个监听函数），因此它们都会因为click事件触发一次。所以，<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>会在target阶段有两次输出。
注意，浏览器总是假定click事件的目标节点，就是点击位置嵌套最深的那个节点（本例是<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>节点里面的<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>节点）。所以，<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>节点的捕获阶段和冒泡阶段，都会显示为target阶段。
事件传播的最上层对象是window，接着依次是document，html（document<span class="token punctuation">.</span>documentElement）和body（document<span class="token punctuation">.</span>body）。也就是说，上例的事件传播顺序，在捕获阶段依次为window、document、html、body、div、p，在冒泡阶段依次为p、div、body、html、document、window。
事件处理程序
浏览器的事件模型，就是通过监听函数（listener）对事件做出反应。事件发生后，浏览器监听到了这个事件，就会执行对应的监听函数。这是事件驱动编程模式（event<span class="token operator">-</span>driven）的主要编程方式。
JavaScript 有三种方法，可以为事件绑定监听函数。
<span class="token constant">HTML</span> 
<span class="token constant">HTML</span> 语言允许在元素的属性中，直接定义某些事件的监听代码。
<span class="token operator">&lt;</span>body onload<span class="token operator">=</span><span class="token string">&quot;doSomething()&quot;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>div onclick<span class="token operator">=</span><span class="token string">&quot;console.log(&#39;触发事件&#39;)&quot;</span><span class="token operator">&gt;</span>

元素的事件监听属性，都是on加上事件名，比如onload就是on <span class="token operator">+</span> load，表示load事件的监听代码。
注意，这些属性的值是将会执行的代码，而不是一个函数。
<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 正确 <span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body onload<span class="token operator">=</span><span class="token string">&quot;doSomething()&quot;</span><span class="token operator">&gt;</span>

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 错误 <span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body onload<span class="token operator">=</span><span class="token string">&quot;doSomething&quot;</span><span class="token operator">&gt;</span>

一旦指定的事件发生，on<span class="token operator">-</span>属性的值是原样传入 JavaScript 引擎执行。因此如果要执行函数，不要忘记加上一对圆括号。
使用这个方法指定的监听代码，只会在冒泡阶段触发。
<span class="token operator">&lt;</span>div onclick<span class="token operator">=</span><span class="token string">&quot;console.log(2)&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>button onclick<span class="token operator">=</span><span class="token string">&quot;console.log(1)&quot;</span><span class="token operator">&gt;</span>点击<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

上面代码中，<span class="token operator">&lt;</span>button<span class="token operator">&gt;</span>是<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>的子元素。<span class="token operator">&lt;</span>button<span class="token operator">&gt;</span>的click事件，也会触发<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>的click事件。由于on<span class="token operator">-</span>属性的监听代码，只在冒泡阶段触发，所以点击结果是先输出<span class="token number">1</span>，再输出<span class="token number">2</span>，即事件从子元素开始冒泡到父元素。
直接设置on<span class="token operator">-</span>属性，与通过元素节点的setAttribute方法设置on<span class="token operator">-</span>属性，效果是一样的。
el<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;onclick&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;doSomething()&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token comment">// &lt;Element onclick=&quot;doSomething()&quot;&gt;</span>

<span class="token constant">DOM0</span>
元素节点对象的事件属性，同样可以指定监听函数。
window<span class="token punctuation">.</span>onload <span class="token operator">=</span> doSomething<span class="token punctuation">;</span>

div<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;触发事件&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

使用这个方法指定的监听函数，也是只会在冒泡阶段触发。
注意，这种方法与 <span class="token constant">HTML</span> 的on<span class="token operator">-</span><span class="token function">属性的差异是，它的值是函数名（doSomething），而不像后者，必须给出完整的监听代码（doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span>）。
<span class="token constant">DOM2</span>
事件的本质是程序各个组成部分之间的一种通信方式，也是异步编程的一种实现。
<span class="token constant">DOM</span> 的事件操作（监听和触发），都定义在EventTarget接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，XMLHttpRequest、AudioNode、AudioContext）也部署了这个接口。
该接口主要提供三个实例方法。
<span class="token operator">-</span> addEventListener：绑定事件的监听函数
<span class="token operator">-</span> removeEventListener：移除事件的监听函数
<span class="token operator">-</span> dispatchEvent：触发事件
EventTarget<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
EventTarget<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。
target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> listener<span class="token punctuation">[</span><span class="token punctuation">,</span> useCapture<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法接受三个参数。
<span class="token operator">-</span> type：事件名称，大小写敏感。
<span class="token operator">-</span> listener：监听函数。事件发生时，会调用该监听函数。
<span class="token operator">-</span> useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为<span class="token boolean">false</span>（监听函数只在冒泡阶段被触发）。该参数可选。
下面是一个例子。
<span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello world&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> button <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
button<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> hello<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

首先，第二个参数除了监听函数，还可以是一个具有handleEvent方法的对象。
buttonElement<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">handleEvent</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，addEventListener方法的第二个参数，就是一个具有handleEvent方法的对象。
其次，第三个参数除了布尔值useCapture，还可以是一个属性配置对象。该对象有以下属性。
<span class="token operator">-</span> <span class="token operator">*</span>capture：布尔值，表示该事件是否在捕获阶段触发监听函数。
<span class="token operator">-</span> <span class="token operator">*</span>once：布尔值，表示监听函数是否只触发一次，然后就自动移除。
<span class="token operator">-</span> <span class="token operator">*</span>passive：布尔值，表示监听函数不会调用事件的preventDefault方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。
如果希望事件监听函数只执行一次，可以打开属性配置对象的once属性。
element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 只执行一次的代码</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">once</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

addEventListener方法可以为针对当前对象的同一个事件，添加多个不同的监听函数。这些函数按照添加顺序触发，即先添加先触发。如果为同一个事件多次添加同一个监听函数，该函数只会执行一次，多余的添加将自动被去除（不必使用removeEventListener方法手动去除）。
<span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello world&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> hello<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> hello<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

如果希望向监听函数传递参数，可以用匿名函数包装一下监听函数。
<span class="token keyword">function</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

监听函数内部的<span class="token keyword">this</span>，指向当前事件所在的那个对象。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;p id=&quot;para&quot;&gt;Hello&lt;/p&gt;</span>
<span class="token keyword">var</span> para <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;para&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
para<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>nodeName<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;P&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

EventTarget<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
EventTarget<span class="token punctuation">.</span>removeEventListener方法用来移除addEventListener方法添加的事件监听函数。该方法没有返回值。
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

removeEventListener方法的参数，与addEventListener方法完全一致。它的第一个参数“事件类型”，大小写敏感。
注意，removeEventListener方法移除的监听函数，必须是addEventListener方法添加的那个监听函数，而且必须在同一个元素节点，并且第三个参数要相同。
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，removeEventListener方法无效，因为监听函数不是同一个匿名函数。
element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mousedown&#39;</span><span class="token punctuation">,</span> handleMouseDown<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;mousedown&quot;</span><span class="token punctuation">,</span> handleMouseDown<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，removeEventListener方法也是无效的，因为第三个参数不一样。
EventTarget<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
EventTarget<span class="token punctuation">.</span>dispatchEvent方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了Event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，则返回值为<span class="token boolean">false</span>，否则为<span class="token boolean">true</span>。
target<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>

dispatchEvent方法的参数是一个Event对象的实例（详见《Event 对象》章节）。
para<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> hello<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
para<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>

如果dispatchEvent方法的参数为空，或者不是一个有效的事件对象，将报错。
下面代码根据dispatchEvent方法的返回值，判断事件是否被取消了。
<span class="token keyword">var</span> canceled <span class="token operator">=</span> <span class="token operator">!</span>cb<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>canceled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;事件取消&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;事件未取消&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

小结
第一种“<span class="token constant">HTML</span> 的 on<span class="token operator">-</span> 属性”，违反了 <span class="token constant">HTML</span> 与 JavaScript 代码相分离的原则，将两者写在一起，不利于代码分工，因此不推荐使用。
第二种“元素节点的事件属性”的缺点在于，同一个事件只能定义一个监听函数，也就是说，如果定义两次onclick属性，后一次定义会覆盖前一次。因此，也不推荐使用。
第三种EventTarget<span class="token punctuation">.</span>addEventListener是推荐的指定监听函数的方法。它有如下优点：
<span class="token operator">-</span> 同一个事件可以添加多个监听函数。
<span class="token operator">-</span> 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发监听函数。
<span class="token operator">-</span> 除了 <span class="token constant">DOM</span> 节点，其他对象（比如window、XMLHttpRequest等）也有这个接口，它等于是整个 JavaScript 统一的监听函数接口。
事件类型
鼠标事件
鼠标事件的种类
鼠标事件指与鼠标相关的事件，继承了MouseEvent接口
<span class="token operator">-</span> click事件
用户在同一个位置先完成mousedown动作，再完成mouseup动作。因此，触发顺序是，mousedown首先触发，mouseup接着触发，click最后触发。

<span class="token operator">-</span> dblclick事件
在mousedown、mouseup、click之后触发。

<span class="token operator">-</span> mouseover事件和mouseenter事件
都是鼠标进入一个节点时触发。mouseenter事件只触发一次，而只要鼠标在节点内部移动，mouseover事件会在子节点上触发多次。
<span class="token comment">/* HTML 代码如下
 &lt;ul&gt;
   &lt;li&gt;item 1&lt;/li&gt;
   &lt;li&gt;item 2&lt;/li&gt;
  &lt;li&gt;item 3&lt;/li&gt;
 &lt;/ul&gt;
*/</span>

<span class="token keyword">var</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 进入 ul 节点以后，mouseenter 事件只会触发一次</span>
<span class="token comment">// 以后只要鼠标在节点内移动，都不会再触发这个事件</span>
<span class="token comment">// event.target 是 ul 节点</span>
ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mouseenter&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;purple&#39;</span><span class="token punctuation">;</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 进入 ul 节点以后，只要在子节点上移动，mouseover 事件会触发多次</span>
<span class="token comment">// event.target 是 li 节点</span>
ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mouseover&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;orange&#39;</span><span class="token punctuation">;</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">-</span> mouseout事件和mouseleave事件
都是鼠标离开一个节点时触发。两者的区别是，在父元素内部离开一个子元素时，mouseleave事件不会触发，而mouseout事件会触发。
<span class="token comment">/* HTML 代码如下
 &lt;ul&gt;
   &lt;li&gt;item 1&lt;/li&gt;
   &lt;li&gt;item 2&lt;/li&gt;
  &lt;li&gt;item 3&lt;/li&gt;
 &lt;/ul&gt;
*/</span>

<span class="token keyword">var</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 先进入 ul 节点，然后在节点内部移动，不会触发 mouseleave 事件</span>
<span class="token comment">// 只有离开 ul 节点时，触发一次 mouseleave</span>
<span class="token comment">// event.target 是 ul 节点</span>
ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mouseleave&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;purple&#39;</span><span class="token punctuation">;</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 先进入 ul 节点，然后在节点内部移动，mouseout 事件会触发多次</span>
<span class="token comment">// event.target 是 li 节点</span>
ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mouseout&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;orange&#39;</span><span class="token punctuation">;</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

点击事件对象属性
触发键判断
MouseEvent<span class="token punctuation">.</span>button属性返回一个数值，表示事件发生时按下了鼠标的哪个键。该属性只读。
<span class="token operator">-</span> <span class="token number">0</span>：按下主键（通常是左键），或者该事件没有初始化这个属性（比如mousemove事件）。
<span class="token operator">-</span> <span class="token number">1</span>：按下辅助键（通常是中键或者滚轮键）。
<span class="token operator">-</span> <span class="token number">2</span>：按下次键（通常是右键）。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;button onmouseup=&quot;whichButton(event)&quot;&gt;点击&lt;/button&gt;</span>
<span class="token keyword">var</span> <span class="token function-variable function">whichButton</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>button<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Left button clicked.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Middle button clicked.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Right button clicked.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Unexpected code: &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>button<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

MouseEvent<span class="token punctuation">.</span>buttons属性返回一个三个比特位的值，表示同时按下了哪些键。它用来处理同时按下多个鼠标键的情况。该属性只读。
<span class="token operator">-</span> <span class="token number">1</span>：二进制为<span class="token number">001</span>（十进制的<span class="token number">1</span>），表示按下左键。
<span class="token operator">-</span> <span class="token number">2</span>：二进制为<span class="token number">010</span>（十进制的<span class="token number">2</span>），表示按下右键。
<span class="token operator">-</span> <span class="token number">4</span>：二进制为<span class="token number">100</span>（十进制的<span class="token number">4</span>），表示按下中键或滚轮键。
同时按下多个键的时候，每个按下的键对应的比特位都会有值。比如，同时按下左键和右键，会返回<span class="token number">3</span>（二进制为<span class="token number">011</span>）。
附加键判断
MouseEvent<span class="token punctuation">.</span>altKey、MouseEvent<span class="token punctuation">.</span>ctrlKey、MouseEvent<span class="token punctuation">.</span>metaKey、MouseEvent<span class="token punctuation">.</span>shiftKey这四个属性都返回一个布尔值，表示事件发生时，是否按下对应的键。它们都是只读属性。
<span class="token operator">-</span> altKey属性：Alt 键
<span class="token operator">-</span> ctrlKey属性：Ctrl 键
<span class="token operator">-</span> metaKey属性：Meta 键（Mac 键盘是一个四瓣的小花，Windows 键盘是 Windows 键）
<span class="token operator">-</span> shiftKey属性：Shift 键
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;body onclick=&quot;showKey(event)&quot;&gt;</span>
<span class="token keyword">function</span> <span class="token function">showKey</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;ALT key pressed: &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>altKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;CTRL key pressed: &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>ctrlKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;META key pressed: &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>metaKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;SHIFT key pressed: &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>shiftKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

触发位置判断
<span class="token number">1.</span> MouseEvent<span class="token punctuation">.</span>clientX，MouseEvent<span class="token punctuation">.</span>clientY
MouseEvent<span class="token punctuation">.</span>clientX属性返回鼠标位置相对于浏览器窗口左上角的水平坐标（单位像素），MouseEvent<span class="token punctuation">.</span>clientY属性返回垂直坐标。这两个属性都是只读属性。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;body onmousedown=&quot;showCoords(event)&quot;&gt;</span>
<span class="token keyword">function</span> <span class="token function">showCoords</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
    <span class="token string">&#39;clientX value: &#39;</span> <span class="token operator">+</span> evt<span class="token punctuation">.</span>clientX <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span> <span class="token operator">+</span>
    <span class="token string">&#39;clientY value: &#39;</span> <span class="token operator">+</span> evt<span class="token punctuation">.</span>clientY <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

这两个属性还分别有一个别名MouseEvent<span class="token punctuation">.</span>x和MouseEvent<span class="token punctuation">.</span>y。
<span class="token number">2.</span> MouseEvent<span class="token punctuation">.</span>movementX，MouseEvent<span class="token punctuation">.</span>movementY
MouseEvent<span class="token punctuation">.</span>movementX属性返回当前位置与上一个mousemove事件之间的水平距离（单位像素）。数值上，它等于下面的计算公式。
currentEvent<span class="token punctuation">.</span>movementX <span class="token operator">=</span> currentEvent<span class="token punctuation">.</span>screenX <span class="token operator">-</span> previousEvent<span class="token punctuation">.</span>screenX

MouseEvent<span class="token punctuation">.</span>movementY属性返回当前位置与上一个mousemove事件之间的垂直距离（单位像素）。数值上，它等于下面的计算公式。
currentEvent<span class="token punctuation">.</span>movementY <span class="token operator">=</span> currentEvent<span class="token punctuation">.</span>screenY <span class="token operator">-</span> previousEvent<span class="token punctuation">.</span>screenY。

这两个属性都是只读属性。
<span class="token number">3.</span> MouseEvent<span class="token punctuation">.</span>screenX，MouseEvent<span class="token punctuation">.</span>screenY
MouseEvent<span class="token punctuation">.</span>screenX属性返回鼠标位置相对于屏幕左上角的水平坐标（单位像素），MouseEvent<span class="token punctuation">.</span>screenY属性返回垂直坐标。这两个属性都是只读属性。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;body onmousedown=&quot;showCoords(event)&quot;&gt;</span>
<span class="token keyword">function</span> <span class="token function">showCoords</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
    <span class="token string">&#39;screenX value: &#39;</span> <span class="token operator">+</span> evt<span class="token punctuation">.</span>screenX <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;screenY value: &#39;</span> <span class="token operator">+</span> evt<span class="token punctuation">.</span>screenY <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token number">4.</span> MouseEvent<span class="token punctuation">.</span>offsetX，MouseEvent<span class="token punctuation">.</span>offsetY
MouseEvent<span class="token punctuation">.</span>offsetX属性返回鼠标位置与目标节点左侧的padding边缘的水平距离（单位像素），MouseEvent<span class="token punctuation">.</span>offsetY属性返回与目标节点上方的padding边缘的垂直距离。这两个属性都是只读属性。
<span class="token comment">/* HTML 代码如下
  &lt;style&gt;
    p {
      width: 100px;
      height: 100px;
      padding: 100px;
    }
  &lt;/style&gt;
  &lt;p&gt;Hello&lt;/p&gt;
*/</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>offsetX<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>offsetY<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，鼠标如果在p元素的中心位置点击，会返回<span class="token number">150</span> <span class="token number">150</span>。因此中心位置距离左侧和上方的padding边缘，等于padding的宽度（<span class="token number">100</span>像素）加上元素内容区域一半的宽度（<span class="token number">50</span>像素）。
<span class="token number">5.</span> MouseEvent<span class="token punctuation">.</span>pageX，MouseEvent<span class="token punctuation">.</span>pageY
MouseEvent<span class="token punctuation">.</span>pageX属性返回鼠标位置与文档左侧边缘的距离（单位像素），MouseEvent<span class="token punctuation">.</span>pageY属性返回与文档上侧边缘的距离（单位像素）。它们的返回值都包括文档不可见的部分。这两个属性都是只读。
<span class="token comment">/* HTML 代码如下
  &lt;style&gt;
    body {
      height: 2000px;
    }
  &lt;/style&gt;
*/</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>pageX<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>pageY<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

WheelEvent 接口
WheelEvent 接口继承了 MouseEvent 实例，代表鼠标滚轮事件的实例对象。目前，鼠标滚轮相关的事件只有一个wheel事件，用户滚动鼠标的滚轮，就生成这个事件的实例。
<span class="token function">浏览器原生提供WheelEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成WheelEvent实例。
<span class="token keyword">var</span> wheelEvent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WheelEvent</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">WheelEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数可以接受两个参数，第一个是字符串，表示事件类型，对于滚轮事件来说，这个值目前只能是wheel。第二个参数是事件的配置对象。该对象的属性除了Event、UIEvent的配置属性以外，还可以接受以下几个属性，所有属性都是可选的。
<span class="token operator">-</span> deltaX：数值，表示滚轮的水平滚动量，默认值是 <span class="token number">0.0</span>。
<span class="token operator">-</span> deltaY：数值，表示滚轮的垂直滚动量，默认值是 <span class="token number">0.0</span>。
<span class="token operator">-</span> deltaZ：数值，表示滚轮的 <span class="token constant">Z</span> 轴滚动量，默认值是 <span class="token number">0.0</span>。
<span class="token operator">-</span> deltaMode：数值，表示相关的滚动事件的单位，适用于上面三个属性。<span class="token number">0</span>表示滚动单位为像素，<span class="token number">1</span>表示单位为行，<span class="token number">2</span>表示单位为页，默认为<span class="token number">0</span>。

实例属性
WheelEvent事件实例除了具有Event和MouseEvent的实例属性和实例方法，还有一些自己的实例属性，但是没有自己的实例方法。
下面的属性都是只读属性。
<span class="token operator">-</span> WheelEvent<span class="token punctuation">.</span>deltaX：数值，表示滚轮的水平滚动量。
<span class="token operator">-</span> WheelEvent<span class="token punctuation">.</span>deltaY：数值，表示滚轮的垂直滚动量。
<span class="token operator">-</span> WheelEvent<span class="token punctuation">.</span>deltaZ：数值，表示滚轮的 <span class="token constant">Z</span> 轴滚动量。
<span class="token operator">-</span> WheelEvent<span class="token punctuation">.</span>deltaMode：数值，表示上面三个属性的单位，<span class="token number">0</span>是像素，<span class="token number">1</span>是行，<span class="token number">2</span>是页。
键盘事件
键盘事件的种类
<span class="token number">1.</span> 种类
<span class="token operator">-</span> keydown：按下键盘时触发。
<span class="token operator">-</span> keypress：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发keydown事件，再触发这个事件。
<span class="token operator">-</span> keyup：松开键盘时触发该事件。
<span class="token number">2.</span> 长按可打印字符触发顺序
<span class="token operator">-</span> keydown
<span class="token operator">-</span> keypress
<span class="token operator">-</span> keydown
<span class="token operator">-</span> keypress
<span class="token operator">-</span> <span class="token operator">...</span>（重复以上过程）
<span class="token operator">-</span> keyup
键盘事件对象属性
触发键判断
<span class="token number">1.</span> KeyboardEvent<span class="token punctuation">.</span>code
KeyboardEvent<span class="token punctuation">.</span>code属性返回一个字符串，表示当前按下的键的字符串形式。该属性只读。
下面是一些常用键的字符串形式，其他键请查文档。
<span class="token operator">-</span> 数字键<span class="token number">0</span> <span class="token operator">-</span> <span class="token number">9</span>：返回digit0 <span class="token operator">-</span> digit9
<span class="token operator">-</span> 字母键a <span class="token operator">-</span> z：返回KeyA <span class="token operator">-</span> KeyZ
<span class="token operator">-</span> 功能键<span class="token constant">F1</span> <span class="token operator">-</span> <span class="token constant">F12</span>：返回 <span class="token constant">F1</span> <span class="token operator">-</span> <span class="token constant">F12</span>
<span class="token operator">-</span> 方向键：返回ArrowDown、ArrowUp、ArrowLeft、ArrowRight
<span class="token operator">-</span> Alt 键：返回AltLeft或AltRight
<span class="token operator">-</span> Shift 键：返回ShiftLeft或ShiftRight
<span class="token operator">-</span> Ctrl 键：返回ControlLeft或ControlRight
<span class="token number">2.</span> KeyboardEvent<span class="token punctuation">.</span>key
KeyboardEvent<span class="token punctuation">.</span>key属性返回一个字符串，表示按下的键名。该属性只读。
如果按下的键代表可打印字符，则返回这个字符，比如数字、字母。
如果按下的键代表不可打印的特殊字符，则返回预定义的键值，比如 Backspace，Tab，Enter，Shift，Control，Alt，CapsLock，Esc，Spacebar，PageUp，PageDown，End，Home，Left，Right，Up，Down，PrintScreen，Insert，Del，Win，<span class="token constant">F1</span>～<span class="token constant">F12</span>，NumLock，Scroll 等。
如果同时按下一个控制键和一个符号键，则返回符号键的键名。比如，按下 Ctrl <span class="token operator">+</span> a，则返回a；按下 Shift <span class="token operator">+</span> a，则返回大写的<span class="token constant">A</span>。
如果无法识别键名，返回字符串Unidentified。
附加键判断
<span class="token operator">-</span> KeyboardEvent<span class="token punctuation">.</span>altKey：是否按下 Alt 键
<span class="token operator">-</span> KeyboardEvent<span class="token punctuation">.</span>ctrlKey：是否按下 Ctrl 键
<span class="token operator">-</span> KeyboardEvent<span class="token punctuation">.</span>metaKey：是否按下 meta 键（Mac 系统是一个四瓣的小花，Windows 系统是 windows 键）
<span class="token operator">-</span> KeyboardEvent<span class="token punctuation">.</span>shiftKey：是否按下 Shift 键
位置区域判断
KeyboardEvent<span class="token punctuation">.</span>location属性返回一个整数，表示按下的键处在键盘的哪一个区域。它可能取以下值。
<span class="token operator">-</span> <span class="token number">0</span>：处在键盘的主区域，或者无法判断处于哪一个区域。
<span class="token operator">-</span> <span class="token number">1</span>：处在键盘的左侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
<span class="token operator">-</span> <span class="token number">2</span>：处在键盘的右侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
<span class="token operator">-</span> <span class="token number">3</span>：处在数字小键盘。
<span class="token number">3.</span> KeyboardEvent<span class="token punctuation">.</span>repeat
KeyboardEvent<span class="token punctuation">.</span>repeat返回一个布尔值，代表该键是否被按着不放，以便判断是否重复这个键，即浏览器会持续触发keydown和keypress事件，直到用户松开手为止。
KeyboardEvent<span class="token punctuation">.</span><span class="token function">getModifierState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
KeyboardEvent<span class="token punctuation">.</span><span class="token function">getModifierState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法返回一个布尔值，表示是否按下或激活指定的功能键。它的常用参数如下。
<span class="token operator">-</span> Alt：Alt 键
<span class="token operator">-</span> CapsLock：大写锁定键
<span class="token operator">-</span> Control：Ctrl 键
<span class="token operator">-</span> Meta：Meta 键
<span class="token operator">-</span> NumLock：数字键盘开关键
<span class="token operator">-</span> Shift：Shift 键
<span class="token keyword">if</span> <span class="token punctuation">(</span>
  event<span class="token punctuation">.</span><span class="token function">getModifierState</span><span class="token punctuation">(</span><span class="token string">&#39;Control&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span>
  event<span class="token punctuation">.</span><span class="token function">getModifierState</span><span class="token punctuation">(</span><span class="token string">&#39;Alt&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span>
  event<span class="token punctuation">.</span><span class="token function">getModifierState</span><span class="token punctuation">(</span><span class="token string">&#39;Meta&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

触摸事件
触摸操作概述
浏览器的触摸 <span class="token constant">API</span> 由三个部分组成。
Touch接口的实例对象用来表示触摸点（一根手指或者一根触摸笔），包括位置、大小、形状、压力、目标元素等属性。
TouchList接口的实例对象表示触摸动作由多个触摸点（多根手指）组成。
TouchEvent接口的实例对象代表由触摸引发的事件，只有触摸屏才会引发这一类事件。
很多时候，触摸事件和鼠标事件同时触发，即使这个时候并没有用到鼠标。这是为了让那些只定义鼠标事件、没有定义触摸事件的代码，在触摸屏的情况下仍然能用。如果想避免这种情况，可以用event<span class="token punctuation">.</span>preventDefault方法阻止发出鼠标事件。
Touch 构造函数
Touch 接口代表单个触摸点。触摸点可能是一根手指，也可能是一根触摸笔。
浏览器原生提供Touch构造函数，用来生成Touch实例。
<span class="token keyword">var</span> touch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Touch</span><span class="token punctuation">(</span>touchOptions<span class="token punctuation">)</span><span class="token punctuation">;</span>

Touch构造函数接受一个配置对象作为参数，它有以下属性。
<span class="token operator">-</span> identifier：必需，类型为整数，表示触摸点的唯一 <span class="token constant">ID</span>。
<span class="token operator">-</span> target：必需，类型为元素节点，表示触摸点开始时所在的网页元素。
<span class="token operator">-</span> clientX：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的水平距离，默认为<span class="token number">0</span>。
<span class="token operator">-</span> clientY：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的垂直距离，默认为<span class="token number">0</span>。
<span class="token operator">-</span> screenX：可选，类型为数值，表示触摸点相对于屏幕左上角的水平距离，默认为<span class="token number">0</span>。
<span class="token operator">-</span> screenY：可选，类型为数值，表示触摸点相对于屏幕左上角的垂直距离，默认为<span class="token number">0</span>。
<span class="token operator">-</span> pageX：可选，类型为数值，表示触摸点相对于网页左上角的水平位置（即包括页面的滚动距离），默认为<span class="token number">0</span>。
<span class="token operator">-</span> pageY：可选，类型为数值，表示触摸点相对于网页左上角的垂直位置（即包括页面的滚动距离），默认为<span class="token number">0</span>。
<span class="token operator">-</span> radiusX：可选，类型为数值，表示触摸点周围受到影响的椭圆范围的 <span class="token constant">X</span> 轴半径，默认为<span class="token number">0</span>。
<span class="token operator">-</span> radiusY：可选：类型为数值，表示触摸点周围受到影响的椭圆范围的 <span class="token constant">Y</span> 轴半径，默认为<span class="token number">0</span>。
<span class="token operator">-</span> rotationAngle：可选，类型为数值，表示触摸区域的椭圆的旋转角度，单位为度数，在<span class="token number">0</span>到<span class="token number">90</span>度之间，默认值为<span class="token number">0</span>。
<span class="token operator">-</span> force：可选，类型为数值，范围在<span class="token number">0</span>到<span class="token number">1</span>之间，表示触摸压力。<span class="token number">0</span>代表没有压力，<span class="token number">1</span>代表硬件所能识别的最大压力，默认为<span class="token number">0</span>。
Touch 实例属性
（<span class="token number">1</span>）Touch<span class="token punctuation">.</span>identifier
Touch<span class="token punctuation">.</span>identifier属性返回一个整数，表示触摸点的唯一 <span class="token constant">ID</span>。这个值在整个触摸过程保持不变，直到触摸事件结束。
someElement<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchmove&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> e<span class="token punctuation">.</span>changedTouches<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>changedTouches<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>identifier<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

（<span class="token number">2</span>）Touch<span class="token punctuation">.</span>screenX，Touch<span class="token punctuation">.</span>screenY，Touch<span class="token punctuation">.</span>clientX，Touch<span class="token punctuation">.</span>clientY，pageX，pageY
Touch<span class="token punctuation">.</span>screenX属性和Touch<span class="token punctuation">.</span>screenY属性，分别表示触摸点相对于屏幕左上角的横坐标和纵坐标，与页面是否滚动无关。
Touch<span class="token punctuation">.</span>clientX属性和Touch<span class="token punctuation">.</span>clientY属性，分别表示触摸点相对于浏览器视口左上角的横坐标和纵坐标，与页面是否滚动无关。
Touch<span class="token punctuation">.</span>pageX属性和Touch<span class="token punctuation">.</span>pageY属性，分别表示触摸点相对于当前页面左上角的横坐标和纵坐标，包含了页面滚动带来的位移。
（<span class="token number">3</span>）Touch<span class="token punctuation">.</span>radiusX，Touch<span class="token punctuation">.</span>radiusY，Touch<span class="token punctuation">.</span>rotationAngle
Touch<span class="token punctuation">.</span>radiusX属性和Touch<span class="token punctuation">.</span>radiusY属性，分别返回触摸点周围受到影响的椭圆范围的 <span class="token constant">X</span> 轴半径和 <span class="token constant">Y</span> 轴半径，单位为像素。乘以 <span class="token number">2</span> 就可以得到触摸范围的宽度和高度。
Touch<span class="token punctuation">.</span>rotationAngle属性表示触摸区域的椭圆的旋转角度，单位为度数，在<span class="token number">0</span>到<span class="token number">90</span>度之间。
上面这三个属性共同定义了用户与屏幕接触的区域，对于描述手指这一类非精确的触摸，很有帮助。指尖接触屏幕，触摸范围会形成一个椭圆，这三个属性就用来描述这个椭圆区域。
下面是一个示例。
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchstart&#39;</span><span class="token punctuation">,</span> rotate<span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchmove&#39;</span><span class="token punctuation">,</span> rotate<span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchend&#39;</span><span class="token punctuation">,</span> rotate<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">rotate</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> touch <span class="token operator">=</span> e<span class="token punctuation">.</span>changedTouches<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  src<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> touch<span class="token punctuation">.</span>radiusX <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token string">&#39;px&#39;</span><span class="token punctuation">;</span>
  src<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> touch<span class="token punctuation">.</span>radiusY <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token string">&#39;px&#39;</span><span class="token punctuation">;</span>
  src<span class="token punctuation">.</span>style<span class="token punctuation">.</span>transform <span class="token operator">=</span> <span class="token string">&#39;rotate(&#39;</span> <span class="token operator">+</span> touch<span class="token punctuation">.</span>rotationAngle <span class="token operator">+</span> <span class="token string">&#39;deg)&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

（<span class="token number">4</span>）Touch<span class="token punctuation">.</span>force
Touch<span class="token punctuation">.</span>force属性返回一个<span class="token number">0</span>到<span class="token number">1</span>之间的数值，表示触摸压力。<span class="token number">0</span>代表没有压力，<span class="token number">1</span>代表硬件所能识别的最大压力。
（<span class="token number">5</span>）Touch<span class="token punctuation">.</span>target
Touch<span class="token punctuation">.</span>target属性返回一个元素节点，代表触摸发生时所在的那个元素节点。即使触摸点已经离开了这个节点，该属性依然不变。
TouchList 接口
TouchList接口表示一组触摸点的集合。它的实例是一个类似数组的对象，成员是Touch的实例对象，表示所有触摸点。用户用三根手指触摸，产生的TouchList实例就会包含三个成员，每根手指的触摸点对应一个Touch实例对象。
它的实例主要通过触摸事件的TouchEvent<span class="token punctuation">.</span>touches、TouchEvent<span class="token punctuation">.</span>changedTouches、TouchEvent<span class="token punctuation">.</span>targetTouches这几个属性获取。
它的实例属性和实例方法只有两个。
<span class="token operator">-</span> TouchList<span class="token punctuation">.</span>length：数值，表示成员数量（即触摸点的数量）。
<span class="token operator">-</span> TouchList<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回指定位置的成员，它的参数是该成员的位置编号（从零开始）。
TouchEvent 接口
TouchEvent 接口继承了 Event 接口，表示由触摸引发的事件实例，通常来自触摸屏或轨迹板。除了被继承的属性以外，它还有一些自己的属性。
<span class="token function">浏览器原生提供TouchEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成触摸事件的实例。
<span class="token keyword">new</span> <span class="token class-name">TouchEvent</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> options<span class="token punctuation">)</span>

<span class="token function">TouchEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数可以接受两个参数，第一个参数是字符串，表示事件类型；第二个参数是事件的配置对象，该参数是可选的，对象的所有属性也是可选的。除了Event接口的配置属性，该接口还有一些自己的配置属性。
<span class="token operator">-</span> touches：TouchList实例，代表所有的当前处于活跃状态的触摸点，默认值是一个空数组<span class="token punctuation">[</span><span class="token punctuation">]</span>。
<span class="token operator">-</span> targetTouches：TouchList实例，代表所有处在触摸的目标元素节点内部、且仍然处于活动状态的触摸点，默认值是一个空数组<span class="token punctuation">[</span><span class="token punctuation">]</span>。
<span class="token operator">-</span> changedTouches：TouchList实例，代表本次触摸事件的相关触摸点，默认值是一个空数组<span class="token punctuation">[</span><span class="token punctuation">]</span>。
<span class="token operator">-</span> ctrlKey：布尔值，表示 Ctrl 键是否同时按下，默认值为<span class="token boolean">false</span>。
<span class="token operator">-</span> shiftKey：布尔值，表示 Shift 键是否同时按下，默认值为<span class="token boolean">false</span>。
<span class="token operator">-</span> altKey：布尔值，表示 Alt 键是否同时按下，默认值为<span class="token boolean">false</span>。
<span class="token operator">-</span> metaKey：布尔值，表示 Meta 键（或 Windows 键）是否同时按下，默认值为<span class="token boolean">false</span>。
实例属性
TouchEvent 接口的实例具有Event实例的所有属性和方法，此外还有一些它自己的实例属性，这些属性全部都是只读。
（<span class="token number">1</span>）TouchEvent<span class="token punctuation">.</span>altKey，TouchEvent<span class="token punctuation">.</span>ctrlKey，TouchEvent<span class="token punctuation">.</span>shiftKey，TouchEvent<span class="token punctuation">.</span>metaKey
<span class="token operator">-</span> TouchEvent<span class="token punctuation">.</span>altKey：布尔值，表示触摸时是否按下了 Alt 键。
<span class="token operator">-</span> TouchEvent<span class="token punctuation">.</span>ctrlKey：布尔值，表示触摸时是否按下了 Ctrl 键。
<span class="token operator">-</span> TouchEvent<span class="token punctuation">.</span>shiftKey：布尔值：表示触摸时是否按下了 Shift 键。
<span class="token operator">-</span> TouchEvent<span class="token punctuation">.</span>metaKey：布尔值，表示触摸时是否按下了 Meta 键（或 Windows 键）。
下面是一个示例。
someElement<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchstart&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;altKey = &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>altKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;ctrlKey = &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>ctrlKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;metaKey = &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>metaKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;shiftKey = &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>shiftKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

（<span class="token number">2</span>）TouchEvent<span class="token punctuation">.</span>changedTouches
TouchEvent<span class="token punctuation">.</span>changedTouches属性返回一个TouchList实例，成员是一组Touch实例对象，表示本次触摸事件的相关触摸点。
对于不同的时间，该属性的含义有所不同。
<span class="token operator">-</span> touchstart事件：被激活的触摸点
<span class="token operator">-</span> touchmove事件：发生变化的触摸点
<span class="token operator">-</span> touchend事件：消失的触摸点（即不再被触碰的点）
下面是一个示例。
someElement<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchmove&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> e<span class="token punctuation">.</span>changedTouches<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>changedTouches<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>identifier<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

（<span class="token number">3</span>）TouchEvent<span class="token punctuation">.</span>touches
TouchEvent<span class="token punctuation">.</span>touches属性返回一个TouchList实例，成员是所有仍然处于活动状态（即触摸中）的触摸点。一般来说，一个手指就是一个触摸点。
下面是一个示例。
someElement<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchstart&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>touches<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 一根手指触摸</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token function">handle_one_touch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token comment">// 两根手指触摸</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token function">handle_two_touches</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token comment">// 三根手指触摸</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token function">handle_three_touches</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token comment">// 其他情况</span>
    <span class="token keyword">default</span><span class="token operator">:</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Not supported&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

（<span class="token number">4</span>）TouchEvent<span class="token punctuation">.</span>targetTouches
TouchEvent<span class="token punctuation">.</span>targetTouches属性返回一个TouchList实例，成员是触摸事件的目标元素节点内部、所有仍然处于活动状态（即触摸中）的触摸点。
<span class="token keyword">function</span> <span class="token function">touches_in_target</span><span class="token punctuation">(</span><span class="token parameter">ev</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>ev<span class="token punctuation">.</span>touches<span class="token punctuation">.</span>length <span class="token operator">===</span> ev<span class="token punctuation">.</span>targetTouches<span class="token punctuation">.</span>length <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码用来判断，是否所有触摸点都在目标元素内。
触摸事件的种类
触摸引发的事件，有以下几种。可以通过TouchEvent<span class="token punctuation">.</span>type属性，查看到底发生的是哪一种事件。
<span class="token operator">-</span> touchstart：用户开始触摸时触发，它的target属性返回发生触摸的元素节点。
<span class="token operator">-</span> touchend：用户不再接触触摸屏时（或者移出屏幕边缘时）触发，它的target属性与touchstart事件一致的，就是开始触摸时所在的元素节点。它的changedTouches属性返回一个TouchList实例，包含所有不再触摸的触摸点（即Touch实例对象）。
<span class="token operator">-</span> touchmove：用户移动触摸点时触发，它的target属性与touchstart事件一致。如果触摸的半径、角度、力度发生变化，也会触发该事件。
<span class="token operator">-</span> touchcancel：触摸点取消时触发，比如在触摸区域跳出一个模态窗口（modal window）、触摸点离开了文档区域（进入浏览器菜单栏）、用户的触摸点太多，超过了支持的上限（自动取消早先的触摸点）。
下面是一个例子。
<span class="token keyword">var</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;canvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchstart&#39;</span><span class="token punctuation">,</span> handleStart<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;touchmove&#39;</span><span class="token punctuation">,</span> handleMove<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">handleStart</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  evt<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> touches <span class="token operator">=</span> evt<span class="token punctuation">.</span>changedTouches<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> touches<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>touches<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>pageX<span class="token punctuation">,</span> touches<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>pageY<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">handleMove</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  evt<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> touches <span class="token operator">=</span> evt<span class="token punctuation">.</span>changedTouches<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> touches<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> touch <span class="token operator">=</span> touches<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>touch<span class="token punctuation">.</span>pageX<span class="token punctuation">,</span> touch<span class="token punctuation">.</span>pageY<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



拖拉事件
拖拉事件的种类
拖拉的对象有好几种，包括元素节点、图片、链接、选中的文字等等。在网页中，除了元素节点默认不可以拖拉，其他（图片、链接、选中的文字）都可以直接拖拉。为了让元素节点可拖拉，可以将该节点的draggable属性设为<span class="token boolean">true</span>。
<span class="token operator">&lt;</span>div draggable<span class="token operator">=</span><span class="token string">&quot;true&quot;</span><span class="token operator">&gt;</span>
  此区域可拖拉
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

draggable属性可用于任何元素节点，但是图片（<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>）和链接（<span class="token operator">&lt;</span>a<span class="token operator">&gt;</span>）不加这个属性，就可以拖拉。对于它们，用到这个属性的时候，往往是将其设为<span class="token boolean">false</span>，防止拖拉这两种元素。
注意，一旦某个元素节点的draggable属性设为<span class="token boolean">true</span>，就无法再用鼠标选中该节点内部的文字或子节点了。
当元素节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件。
<span class="token operator">-</span> drag：拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）。
<span class="token operator">-</span> dragstart：用户开始拖拉时，在被拖拉的节点上触发，该事件的target属性是被拖拉的节点。通常应该在这个事件的监听函数中，指定拖拉的数据。
<span class="token operator">-</span> dragend：拖拉结束时（释放鼠标键或按下 <span class="token constant">ESC</span> 键）在被拖拉的节点上触发，该事件的target属性是被拖拉的节点。它与dragstart事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，dragend事件总是会触发的。
<span class="token operator">-</span> dragenter：拖拉进入当前节点时，在当前节点上触发一次，该事件的target属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。
<span class="token operator">-</span> dragover：拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点。该事件与dragenter事件的区别是，dragenter事件在进入该节点时触发，然后只要没有离开这个节点，dragover事件会持续触发。
<span class="token operator">-</span> dragleave：拖拉操作离开当前节点范围时，在当前节点上触发，该事件的target属性是当前节点。如果要在视觉上显示拖拉离开操作当前节点，就在这个事件的监听函数中设置。
<span class="token operator">-</span> drop：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许drop，即使在该节点上方松开鼠标键，也不会触发该事件。如果用户按下 <span class="token constant">ESC</span> 键，取消这个操作，也不会触发该事件。该事件的监听函数负责取出拖拉数据，并进行相关处理。
下面的例子展示，如何动态改变被拖动节点的背景色。
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragstart&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragend&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">&#39;green&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

下面是一个例子，展示如何实现将一个节点从当前父节点，拖拉到另一个父节点中。
<span class="token comment">/* HTML 代码如下
 &lt;div class=&quot;dropzone&quot;&gt;
   &lt;div id=&quot;draggable&quot; draggable=&quot;true&quot;&gt;
     该节点可拖拉
   &lt;/div&gt;
 &lt;/div&gt;
 &lt;div class=&quot;dropzone&quot;&gt;&lt;/div&gt;
 &lt;div class=&quot;dropzone&quot;&gt;&lt;/div&gt;
 &lt;div class=&quot;dropzone&quot;&gt;&lt;/div&gt;
*/</span>

<span class="token comment">// 被拖拉节点</span>
<span class="token keyword">var</span> dragged<span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragstart&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 保存被拖拉节点</span>
  dragged <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">;</span>
  <span class="token comment">// 被拖拉节点的背景色变透明</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>opacity <span class="token operator">=</span> <span class="token number">0.5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragend&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 被拖拉节点的背景色恢复正常</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>opacity <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragover&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 防止拖拉效果被重置，允许被拖拉的节点放入目标节点</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragenter&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 目标节点的背景色变紫色</span>
  <span class="token comment">// 由于该事件会冒泡，所以要过滤节点</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>className <span class="token operator">===</span> <span class="token string">&#39;dropzone&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token string">&#39;purple&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragleave&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">event</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 目标节点的背景色恢复原样</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>className <span class="token operator">===</span> <span class="token string">&#39;dropzone&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;drop&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">event</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 防止事件默认行为（比如某些元素节点上可以打开链接），</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>className <span class="token operator">===</span> <span class="token string">&#39;dropzone&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 恢复目标节点背景色</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token comment">// 将被拖拉节点插入目标节点</span>
    dragged<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>dragged<span class="token punctuation">)</span><span class="token punctuation">;</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span> dragged <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

关于拖拉事件，有以下几个注意点。
<span class="token operator">-</span> 拖拉过程只触发以上这些拖拉事件，尽管鼠标在移动，但是鼠标事件不会触发。
<span class="token operator">-</span> 将文件从操作系统拖拉进浏览器，不会触发dragstart和dragend事件。
<span class="token operator">-</span> dragenter和dragover事件的监听函数，用来取出拖拉的数据（即允许放下被拖拉的元素）。由于网页的大部分区域不适合作为放下拖拉元素的目标节点，所以这两个事件的默认设置为当前节点不允许接受被拖拉的元素。如果想要在目标节点上放下的数据，首先必须阻止这两个事件的默认行为。
<span class="token operator">&lt;</span>div ondragover<span class="token operator">=</span><span class="token string">&quot;return false&quot;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>div ondragover<span class="token operator">=</span><span class="token string">&quot;event.preventDefault()&quot;</span><span class="token operator">&gt;</span>

上面代码中，如果不取消拖拉事件或者阻止默认行为，就不能在div节点上放下被拖拉的节点。
DataTransfer 接口概述
所有拖拉事件的实例都有一个DragEvent<span class="token punctuation">.</span>dataTransfer属性，用来读写需要传递的数据。这个属性的值是一个DataTransfer接口的实例。
<span class="token function">浏览器原生提供一个DataTransfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成DataTransfer实例对象。
<span class="token keyword">var</span> dataTrans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataTransfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">DataTransfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数不接受参数。
拖拉的数据分成两方面：数据的种类（又称格式）和数据的值。数据的种类是一个 <span class="token constant">MIME</span> 字符串（比如text<span class="token operator">/</span>plain、image<span class="token operator">/</span>jpeg），数据的值是一个字符串。一般来说，如果拖拉一段文本，则数据默认就是那段文本；如果拖拉一个链接，则数据默认就是链接的 <span class="token constant">URL</span>。
拖拉事件开始时，开发者可以提供数据类型和数据值。拖拉过程中，开发者通过dragenter和dragover事件的监听函数，检查数据类型，以确定是否允许放下（drop）被拖拉的对象。比如，在只允许放下链接的区域，检查拖拉的数据类型是否为text<span class="token operator">/</span>uri<span class="token operator">-</span>list。
DataTransfer 的实例属性
<span class="token number">1.</span> dropEffect
DataTransfer<span class="token punctuation">.</span>dropEffect属性用来设置放下（drop）被拖拉节点时的效果，会影响到拖拉经过相关区域时鼠标的形状。它可能取下面的值。
<span class="token operator">-</span> copy：复制被拖拉的节点
<span class="token operator">-</span> move：移动被拖拉的节点
<span class="token operator">-</span> link：创建指向被拖拉的节点的链接
<span class="token operator">-</span> none：无法放下被拖拉的节点
除了上面这些值，设置其他的值都是无效的。
target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragover&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>dropEffect <span class="token operator">=</span> <span class="token string">&#39;copy&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，被拖拉元素一旦drop，接受的区域会复制该节点。
dropEffect属性一般在dragenter和dragover事件的监听函数中设置，对于dragstart、drag、dragleave这三个事件，该属性不起作用。因为该属性只对接受被拖拉的节点的区域有效，对被拖拉的节点本身是无效的。进入目标区域后，拖拉行为会初始化成设定的效果。
<span class="token number">2.</span> DataTransfer<span class="token punctuation">.</span>effectAllowed
DataTransfer<span class="token punctuation">.</span>effectAllowed属性设置本次拖拉中允许的效果。它可能取下面的值。
<span class="token operator">-</span> copy：复制被拖拉的节点
<span class="token operator">-</span> move：移动被拖拉的节点
<span class="token operator">-</span> link：创建指向被拖拉节点的链接
<span class="token operator">-</span> copyLink：允许copy或link
<span class="token operator">-</span> copyMove：允许copy或move
<span class="token operator">-</span> linkMove：允许link或move
<span class="token operator">-</span> all：允许所有效果
<span class="token operator">-</span> none：无法放下被拖拉的节点
<span class="token operator">-</span> uninitialized：默认值，等同于all
如果某种效果是不允许的，用户就无法在目标节点中达成这种效果。
这个属性与dropEffect属性是同一件事的两个方面。前者设置被拖拉的节点允许的效果，后者设置接受拖拉的区域的效果，它们往往配合使用。
dragstart事件的监听函数，可以用来设置这个属性。其他事件的监听函数里面设置这个属性是无效的。
source<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragstart&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>effectAllowed <span class="token operator">=</span> <span class="token string">&#39;move&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragover&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>dropEffect <span class="token operator">=</span> <span class="token string">&#39;move&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

只要dropEffect属性和effectAllowed属性之中，有一个为none，就无法在目标节点上完成drop操作。
<span class="token number">3.</span> DataTransfer<span class="token punctuation">.</span>files
DataTransfer<span class="token punctuation">.</span>files属性是一个 FileList 对象，包含一组本地文件，可以用来在拖拉操作中传送。如果本次拖拉不涉及文件，则该属性为空的 FileList 对象。
下面就是一个接收拖拉文件的例子。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id=&quot;output&quot; style=&quot;min-height: 200px;border: 1px solid black;&quot;&gt;</span>
<span class="token comment">//   文件拖拉到这里</span>
<span class="token comment">// &lt;/div&gt;</span>

<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;output&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;dragenter&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">event</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  div<span class="token punctuation">.</span>textContent <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;dragover&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">event</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;drop&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">event</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> files <span class="token operator">=</span> event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>files<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    div<span class="token punctuation">.</span>textContent <span class="token operator">+=</span> files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39; &#39;</span> <span class="token operator">+</span> files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>size <span class="token operator">+</span> <span class="token string">&#39;字节\\n&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，通过dataTransfer<span class="token punctuation">.</span>files属性读取被拖拉的文件的信息。如果想要读取文件内容，就要使用FileReader对象。
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;drop&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> fileList <span class="token operator">=</span> e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>files<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fileList<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> file <span class="token operator">=</span> fileList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    reader<span class="token punctuation">.</span><span class="token function-variable function">onloadend</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>readyState <span class="token operator">===</span> FileReader<span class="token punctuation">.</span><span class="token constant">DONE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> content <span class="token operator">=</span> reader<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
        div<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;File: &#39;</span> <span class="token operator">+</span> file<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;\\n\\n&#39;</span> <span class="token operator">+</span> content<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    reader<span class="token punctuation">.</span><span class="token function">readAsBinaryString</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token number">4.</span> DataTransfer<span class="token punctuation">.</span>types
DataTransfer<span class="token punctuation">.</span>types属性是一个只读的数组，每个成员是一个字符串，里面是拖拉的数据格式（通常是 <span class="token constant">MIME</span> 值）。比如，如果拖拉的是文字，对应的成员就是text<span class="token operator">/</span>plain。
下面是一个例子，通过检查dataTransfer属性的类型，决定是否允许在当前节点执行drop操作。
<span class="token keyword">function</span> <span class="token function">contains</span><span class="token punctuation">(</span><span class="token parameter">list<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> list<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>list<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> value<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">doDragOver</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> isLink <span class="token operator">=</span> <span class="token function">contains</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>types<span class="token punctuation">,</span> <span class="token string">&#39;text/uri-list&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isLink<span class="token punctuation">)</span> event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，只有当被拖拉的节点有一个是链接时，才允许在当前节点放下。
<span class="token number">5.</span> DataTransfer<span class="token punctuation">.</span>items
DataTransfer<span class="token punctuation">.</span>items属性返回一个类似数组的只读对象（DataTransferItemList 实例），每个成员就是本次拖拉的一个对象（DataTransferItem 实例）。如果本次拖拉不包含对象，则返回一个空对象。
DataTransferItemList 实例具有以下的属性和方法。
<span class="token operator">-</span> length：返回成员的数量
<span class="token operator">-</span> <span class="token function">add</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> type<span class="token punctuation">)</span>：增加一个指定内容和类型（比如text<span class="token operator">/</span>html和text<span class="token operator">/</span>plain）的字符串作为成员
<span class="token operator">-</span> <span class="token function">add</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span>：add方法的另一种用法，增加一个文件作为成员
<span class="token operator">-</span> <span class="token function">remove</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>：移除指定位置的成员
<span class="token operator">-</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：移除所有的成员
DataTransferItem 实例具有以下的属性和方法。
<span class="token operator">-</span> kind：返回成员的种类（string还是file）。
<span class="token operator">-</span> type：返回成员的类型（通常是 <span class="token constant">MIME</span> 值）。
<span class="token operator">-</span> <span class="token function">getAsFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：如果被拖拉是文件，返回该文件，否则返回<span class="token keyword">null</span>。
<span class="token operator">-</span> <span class="token function">getAsString</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>：如果被拖拉的是字符串，将该字符传入指定的回调函数处理。该方法是异步的，所以需要传入回调函数。
下面是一个例子。
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;drop&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>items <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>items<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>kind <span class="token operator">+</span> <span class="token string">&#39;: &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

DataTransfer 的实例方法
DataTransfer<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
DataTransfer<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法用来设置拖拉事件所带有的数据。该方法没有返回值。
event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Text to drag&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法接受两个参数，都是字符串。第一个参数表示数据类型（比如text<span class="token operator">/</span>plain），第二个参数是具体数据。如果指定类型的数据在dataTransfer属性不存在，那么这些数据将被加入，否则原有的数据将被新数据替换。
如果是拖拉文本框或者拖拉选中的文本，会默认将对应的文本数据，添加到dataTransfer属性，不用手动指定。
<span class="token operator">&lt;</span>div draggable<span class="token operator">=</span><span class="token string">&quot;true&quot;</span><span class="token operator">&gt;</span>
  aaa
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

上面代码中，拖拉这个<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>元素会自动带上文本数据aaa。
使用setData方法，可以替换到原有数据。
<span class="token operator">&lt;</span>div
  draggable<span class="token operator">=</span><span class="token string">&quot;true&quot;</span>
  ondragstart<span class="token operator">=</span><span class="token string">&quot;event.dataTransfer.setData(&#39;text/plain&#39;, &#39;bbb&#39;)&quot;</span>
<span class="token operator">&gt;</span>
  aaa
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

上面代码中，拖拉数据实际上是bbb，而不是aaa。
下面是添加其他类型的数据。由于text<span class="token operator">/</span>plain是最普遍支持的格式，为了保证兼容性，建议最后总是保存一份纯文本格式的数据。
<span class="token keyword">var</span> dt <span class="token operator">=</span> event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">;</span>

<span class="token comment">// 添加链接</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/uri-list&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加 HTML 代码</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello there, &lt;strong&gt;stranger&lt;/strong&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello there, &lt;strong&gt;stranger&lt;/strong&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加图像的 URL</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/uri-list&#39;</span><span class="token punctuation">,</span> imageurl<span class="token punctuation">)</span><span class="token punctuation">;</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">,</span> imageurl<span class="token punctuation">)</span><span class="token punctuation">;</span>

可以一次提供多种格式的数据。
<span class="token keyword">var</span> dt <span class="token operator">=</span> event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">;</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;application/x-bookmark&#39;</span><span class="token punctuation">,</span> bookmarkString<span class="token punctuation">)</span><span class="token punctuation">;</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/uri-list&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dt<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://www.example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，通过在同一个事件上面，存放三种类型的数据，使得拖拉事件可以在不同的对象上面，drop不同的值。注意，第一种格式是一个自定义格式，浏览器默认无法读取，这意味着，只有某个部署了特定代码的节点，才可能drop（读取到）这个数据。
DataTransfer<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
DataTransfer<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用setData方法添加的数据）。如果指定类型的数据不存在，则返回空字符串。通常只有drop事件触发后，才能取出数据。
下面是一个drop事件的监听函数，用来取出指定类型的数据。
<span class="token keyword">function</span> <span class="token function">onDrop</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> data <span class="token operator">=</span> event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>textContent <span class="token operator">=</span> data<span class="token punctuation">;</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码取出拖拉事件的文本数据，将其替换成当前节点的文本内容。注意，这时还必须取消浏览器的默认行为，因为假如用户拖拉的是一个链接，浏览器默认会在当前窗口打开这个链接。
getData方法返回的是一个字符串，如果其中包含多项数据，就必须手动解析。
<span class="token keyword">function</span> <span class="token function">doDrop</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> lines <span class="token operator">=</span> event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token string">&#39;text/uri-list&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> line <span class="token keyword">of</span> lines<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> link <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    link<span class="token punctuation">.</span>href <span class="token operator">=</span> line<span class="token punctuation">;</span>
    link<span class="token punctuation">.</span>textContent <span class="token operator">=</span> line<span class="token punctuation">;</span>
    event<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>link<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，getData方法返回的是一组链接，就必须自行解析。
类型值指定为<span class="token constant">URL</span>，可以取出第一个有效链接。
<span class="token keyword">var</span> link <span class="token operator">=</span> event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token string">&#39;URL&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

下面的例子是从多种类型的数据里面取出数据。
<span class="token keyword">function</span> <span class="token function">doDrop</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> types <span class="token operator">=</span> event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span>types<span class="token punctuation">;</span>
  <span class="token keyword">var</span> supportedTypes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;text/uri-list&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  types <span class="token operator">=</span> supportedTypes<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> types<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>types<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> data <span class="token operator">=</span> event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span>types<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

DataTransfer<span class="token punctuation">.</span><span class="token function">clearData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
DataTransfer<span class="token punctuation">.</span><span class="token function">clearData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。如果没有指定类型，则删除所有数据。如果指定类型不存在，则调用该方法不会产生任何效果。
event<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span><span class="token function">clearData</span><span class="token punctuation">(</span><span class="token string">&#39;text/uri-list&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该方法不会移除拖拉的文件，因此调用该方法后，DataTransfer<span class="token punctuation">.</span>types属性可能依然会返回Files类型（前提是存在文件拖拉）。
注意，该方法只能在dragstart事件的监听函数之中使用，因为这是拖拉操作的数据唯一可写的时机。
DataTransfer<span class="token punctuation">.</span><span class="token function">setDragImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
拖动过程中（dragstart事件触发后），浏览器会显示一张图片跟随鼠标一起移动，表示被拖动的节点。这张图片是自动创造的，通常显示为被拖动节点的外观，不需要自己动手设置。
DataTransfer<span class="token punctuation">.</span><span class="token function">setDragImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法可以自定义这张图片。它接受三个参数。第一个是<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>节点或者<span class="token operator">&lt;</span>canvas<span class="token operator">&gt;</span>节点，如果省略或为<span class="token keyword">null</span>，则使用被拖动的节点的外观；第二个和第三个参数为鼠标相对于该图片左上角的横坐标和纵坐标。
下面是一个例子。
<span class="token comment">/* HTML 代码如下
 &lt;div id=&quot;drag-with-image&quot; class=&quot;dragdemo&quot; draggable=&quot;true&quot;&gt;
   drag me
 &lt;/div&gt;
*/</span>

<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;drag-with-image&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;dragstart&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  img<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;http://path/to/img&#39;</span><span class="token punctuation">;</span>
  e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">.</span><span class="token function">setDragImage</span><span class="token punctuation">(</span>img<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

表单事件
表单事件的种类
input 事件
input事件当<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>select<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>textarea<span class="token operator">&gt;</span>的值发生变化时触发。
对于复选框（<span class="token operator">&lt;</span>input type<span class="token operator">=</span>checkbox<span class="token operator">&gt;</span>）或单选框（<span class="token operator">&lt;</span>input type<span class="token operator">=</span>radio<span class="token operator">&gt;</span>），用户改变选项时，也会触发这个事件。
对于打开contenteditable属性的元素，只要值发生变化，也会触发input事件。
input事件的一个特点，就是会连续触发，比如用户每按下一次按键，就会触发一次input事件。
input事件对象继承了InputEvent接口。
该事件跟change事件很像，不同之处在于input事件在元素的值发生变化后立即发生，而change在元素失去焦点时发生，而内容此时可能已经变化多次。也就是说，如果有连续变化，input事件会触发多次，而change事件只在失去焦点时触发一次。
下面是<span class="token operator">&lt;</span>select<span class="token operator">&gt;</span>元素的例子。
<span class="token comment">/* HTML 代码如下
&lt;select id=&quot;mySelect&quot;&gt;
  &lt;option value=&quot;1&quot;&gt;1&lt;/option&gt;
  &lt;option value=&quot;2&quot;&gt;2&lt;/option&gt;
  &lt;option value=&quot;3&quot;&gt;3&lt;/option&gt;
&lt;/select&gt;
*/</span>

<span class="token keyword">function</span> <span class="token function">inputHandler</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> mySelect <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#mySelect&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mySelect<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> inputHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>

select 事件
select事件当在<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>textarea<span class="token operator">&gt;</span>里面选中文本时触发。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input id=&quot;test&quot; type=&quot;text&quot; value=&quot;Select me!&quot; /&gt;</span>

<span class="token keyword">var</span> elem <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
elem<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;select&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;select&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

选中的文本可以通过event<span class="token punctuation">.</span>target元素的selectionDirection、selectionEnd、selectionStart和value属性拿到。
change 事件
change事件当<span class="token operator">&lt;</span>input<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>select<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>textarea<span class="token operator">&gt;</span>的值发生变化时触发。它与input事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发，另一方面input事件必然伴随change事件。具体来说，分成以下几种情况。
<span class="token operator">-</span> 激活单选框（radio）或复选框（checkbox）时触发。
<span class="token operator">-</span> 用户提交时触发。比如，从下列列表（select）完成选择，在日期或文件输入框完成选择。
<span class="token operator">-</span> 当文本框或<span class="token operator">&lt;</span>textarea<span class="token operator">&gt;</span>元素的值发生改变，并且丧失焦点时触发。
下面是一个例子。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;select size=&quot;1&quot; onchange=&quot;changeEventHandler(event);&quot;&gt;</span>
<span class="token comment">//   &lt;option&gt;chocolate&lt;/option&gt;</span>
<span class="token comment">//   &lt;option&gt;strawberry&lt;/option&gt;</span>
<span class="token comment">//   &lt;option&gt;vanilla&lt;/option&gt;</span>
<span class="token comment">// &lt;/select&gt;</span>

<span class="token keyword">function</span> <span class="token function">changeEventHandler</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

invalid 事件
用户提交表单时，如果表单元素的值不满足校验条件，就会触发invalid事件。
<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;text&quot;</span> required oninvalid<span class="token operator">=</span><span class="token string">&quot;console.log(&#39;invalid input&#39;)&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>button type<span class="token operator">=</span><span class="token string">&quot;submit&quot;</span><span class="token operator">&gt;</span>提交<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>form<span class="token operator">&gt;</span>

上面代码中，输入框是必填的。如果不填，用户点击按钮提交时，就会触发输入框的invalid事件，导致提交被取消。
reset 事件，submit 事件
这两个事件发生在表单对象<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>上，而不是发生在表单的成员上。
reset事件当表单重置（所有表单成员变回默认值）时触发。
submit事件当表单数据向服务器提交时触发。注意，submit事件的发生对象是<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>元素，而不是<span class="token operator">&lt;</span>button<span class="token operator">&gt;</span>元素，因为提交的是表单，而不是按钮。
InputEvent 接口
InputEvent接口主要用来描述input事件的实例。该接口继承了Event接口，还定义了一些自己的实例属性和实例方法。
<span class="token function">浏览器原生提供InputEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成实例对象。
<span class="token keyword">new</span> <span class="token class-name">InputEvent</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> options<span class="token punctuation">)</span>

InputEvent构造函数可以接受两个参数。第一个参数是字符串，表示事件名称，该参数是必需的。第二个参数是一个配置对象，用来设置事件实例的属性，该参数是可选的。配置对象的字段除了Event构造函数的配置属性，还可以设置下面的字段，这些字段都是可选的。
<span class="token operator">-</span> inputType：字符串，表示发生变更的类型（详见下文）。
<span class="token operator">-</span> data：字符串，表示插入的字符串。如果没有插入的字符串（比如删除操作），则返回<span class="token keyword">null</span>或空字符串。
<span class="token operator">-</span> dataTransfer：返回一个 DataTransfer 对象实例，该属性通常只在输入框接受富文本输入时有效。
InputEvent的实例属性主要就是上面三个属性，这三个实例属性都是只读的。
（<span class="token number">1</span>）InputEvent<span class="token punctuation">.</span>data
InputEvent<span class="token punctuation">.</span>data属性返回一个字符串，表示变动的内容。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input type=&quot;text&quot; id=&quot;myInput&quot;&gt;</span>
<span class="token keyword">var</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myInput&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
input<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> myFunction<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码中，如果手动在输入框里面输入abc，控制台会先输出a，再在下一行输出b，再在下一行输出c。然后选中abc，一次性将它们删除，控制台会输出<span class="token keyword">null</span>或一个空字符串。
（<span class="token number">2</span>）InputEvent<span class="token punctuation">.</span>inputType
InputEvent<span class="token punctuation">.</span>inputType属性返回一个字符串，表示字符串发生变更的类型。
对于常见情况，Chrome 浏览器的返回值如下。完整列表可以参考文档。
<span class="token operator">-</span> 手动插入文本：insertText
<span class="token operator">-</span> 粘贴插入文本：insertFromPaste
<span class="token operator">-</span> 向后删除：deleteContentBackward
<span class="token operator">-</span> 向前删除：deleteContentForward
（<span class="token number">3</span>）InputEvent<span class="token punctuation">.</span>dataTransfer
InputEvent<span class="token punctuation">.</span>dataTransfer属性返回一个 DataTransfer 实例。该属性只在文本框接受粘贴内容（insertFromPaste）或拖拽内容（insertFromDrop）时才有效。
资源事件
beforeunload 事件
beforeunload事件在窗口、文档、各种资源将要卸载前触发。它可以用来防止用户不小心卸载资源。
如果该事件对象的returnValue属性是一个非空字符串，那么浏览器就会弹出一个对话框，询问用户是否要卸载该资源。但是，用户指定的字符串可能无法显示，浏览器会展示预定义的字符串。如果用户点击“取消”按钮，资源就不会卸载。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;beforeunload&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>returnValue <span class="token operator">=</span> <span class="token string">&#39;你确定离开吗？&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

浏览器对这个事件的行为很不一致，有的浏览器调用event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，也会弹出对话框。<span class="token constant">IE</span> 浏览器需要显式返回一个非空的字符串，才会弹出对话框。而且，大多数浏览器在对话框中不显示指定文本，只显示默认文本。因此，可以采用下面的写法，取得最大的兼容性。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;beforeunload&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> confirmationMessage <span class="token operator">=</span> <span class="token string">&#39;确认关闭窗口？&#39;</span><span class="token punctuation">;</span>

  e<span class="token punctuation">.</span>returnValue <span class="token operator">=</span> confirmationMessage<span class="token punctuation">;</span>
  <span class="token keyword">return</span> confirmationMessage<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，许多手机浏览器（比如 Safari）默认忽略这个事件，桌面浏览器也有办法忽略这个事件。所以，它可能根本不会生效，不能依赖它来阻止用户关闭浏览器窗口，最好不要使用这个事件。
另外，一旦使用了beforeunload事件，浏览器就不会缓存当前网页，使用“回退”按钮将重新向服务器请求网页。这是因为监听这个事件的目的，一般是为了网页状态，这时缓存页面的初始状态就没意义了。
unload 事件
unload事件在窗口关闭或者document对象将要卸载时触发。它的触发顺序排在beforeunload、pagehide事件后面。
unload事件发生时，文档处于一个特殊状态。所有资源依然存在，但是对用户来说都不可见，<span class="token constant">UI</span> 互动全部无效。这个事件是无法取消的，即使在监听函数里面抛出错误，也不能停止文档的卸载。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;unload&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;文档将要卸载&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

手机上，浏览器或系统可能会直接丢弃网页，这时该事件根本不会发生。而且跟beforeunload事件一样，一旦使用了unload事件，浏览器就不会缓存当前网页，理由同上。因此，任何情况下都不应该依赖这个事件，指定网页卸载时要执行的代码，可以考虑完全不使用这个事件。
load 事件，error 事件
load事件在页面或某个资源加载成功时触发。
注意，页面或资源从浏览器缓存加载，并不会触发load事件。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;所有资源都加载完成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

error事件是在页面或资源加载失败时触发。abort事件在用户取消加载时触发。
这三个事件实际上属于进度事件，不仅发生在document对象，还发生在各种外部资源上面。浏览网页就是一个加载各种资源的过程，图像（image）、样式表（style sheet）、脚本（script）、视频（video）、音频（audio）、Ajax请求（XMLHttpRequest）等等。这些资源和document对象、window对象、XMLHttpRequestUpload 对象，都会触发load事件和error事件。
session 历史事件
pageshow 事件，pagehide 事件
默认情况下，浏览器会在当前会话（session）缓存页面，当用户点击“前进<span class="token operator">/</span>后退”按钮时，浏览器就会从缓存中加载页面。
pageshow事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。
第一次加载时，它的触发顺序排在load事件后面。从缓存加载时，load事件不会触发，因为网页在缓存中的样子通常是load事件的监听函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的 JavaScript 脚本（比如 DOMContentLoaded 事件的监听函数）也不会执行。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;pageshow&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;pageshow: &#39;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

pageshow事件有一个persisted属性，返回一个布尔值。页面第一次加载时，这个属性是<span class="token boolean">false</span>；当页面从缓存加载时，这个属性是<span class="token boolean">true</span>。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;pageshow&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>persisted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

pagehide事件与pageshow事件类似，当用户通过“前进<span class="token operator">/</span>后退”按钮，离开当前页面时触发。它与 unload 事件的区别在于，如果在 window 对象上定义unload事件的监听函数之后，页面不会保存在缓存中，而使用pagehide事件，页面会保存在缓存中。
pagehide事件实例也有一个persisted属性，将这个属性设为<span class="token boolean">true</span>，就表示页面要保存在缓存中；设为<span class="token boolean">false</span>，表示网页不保存在缓存中，这时如果设置了unload 事件的监听函数，该函数将在 pagehide 事件后立即运行。
如果页面包含<span class="token operator">&lt;</span>frame<span class="token operator">&gt;</span>或<span class="token operator">&lt;</span>iframe<span class="token operator">&gt;</span>元素，则<span class="token operator">&lt;</span>frame<span class="token operator">&gt;</span>页面的pageshow事件和pagehide事件，都会在主页面之前触发。
注意，这两个事件只在浏览器的history对象发生变化时触发，跟网页是否可见没有关系。
popstate 事件
popstate事件在浏览器的history对象的当前记录发生显式切换时触发。注意，调用history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>或history<span class="token punctuation">.</span><span class="token function">replaceState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，并不会触发popstate事件。该事件只在用户在history记录之间显式切换时触发，比如鼠标点击“后退<span class="token operator">/</span>前进”按钮，或者在脚本中调用history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span>、history<span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span>、history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span>时触发。
该事件对象有一个state属性，保存history<span class="token punctuation">.</span>pushState方法和history<span class="token punctuation">.</span>replaceState方法为当前记录添加的state对象。
window<span class="token punctuation">.</span><span class="token function-variable function">onpopstate</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;state: &#39;</span> <span class="token operator">+</span> event<span class="token punctuation">.</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;title 1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;?page=1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;title 2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;?page=2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">replaceState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;title 3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;?page=3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// state: {&quot;page&quot;:1}</span>
history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// state: null</span>
history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// state: {&quot;page&quot;:3}</span>

浏览器对于页面首次加载，是否触发popstate事件，处理不一样，Firefox 不触发该事件。
hashchange 事件
hashchange事件在 <span class="token constant">URL</span> 的 hash 部分（即#号后面的部分，包括#号）发生变化时触发。该事件一般在window对象上监听。
hashchange的事件实例具有两个特有属性：oldURL属性和newURL属性，分别表示变化前后的完整 <span class="token constant">URL</span>。
<span class="token comment">// URL 是 http://www.example.com/</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;hashchange&#39;</span><span class="token punctuation">,</span> myFunction<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>oldURL<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>newURL<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

location<span class="token punctuation">.</span>hash <span class="token operator">=</span> <span class="token string">&#39;part2&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// http://www.example.com/</span>
<span class="token comment">// http://www.example.com/#part2</span>

网页状态事件
DOMContentLoaded 事件
网页下载并解析完成以后，浏览器就会在document对象上触发 DOMContentLoaded 事件。这时，仅仅完成了网页的解析（整张页面的 <span class="token constant">DOM</span> 生成了），所有外部资源（样式表、脚本、iframe 等等）可能还没有下载结束。也就是说，这个事件比load事件，发生时间早得多。
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;DOMContentLoaded&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;DOM生成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，网页的 JavaScript 脚本是同步执行的，脚本一旦发生堵塞，将推迟触发DOMContentLoaded事件。
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;DOMContentLoaded&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;DOM 生成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 这段代码会推迟触发 DOMContentLoaded 事件</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

readystatechange 事件
readystatechange事件当 Document 对象和 XMLHttpRequest 对象的readyState属性发生变化时触发。document<span class="token punctuation">.</span>readyState有三个可能的值：loading（网页正在加载）、interactive（网页已经解析完成，但是外部资源仍然处在加载状态）和complete（网页和所有外部资源已经结束加载，load事件即将触发）。
document<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token string">&#39;interactive&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

窗口事件
scroll 事件
scroll事件在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">该事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。推荐的做法是使用requestAnimationFrame或setTimeout控制该事件的触发频率，然后可以结合customEvent抛出一个新事件。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> <span class="token function-variable function">throttle</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> name<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> obj <span class="token operator">||</span> window<span class="token punctuation">;</span>
    <span class="token keyword">var</span> running <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>running<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
      running <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        obj<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CustomEvent</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        running <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    obj<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// 将 scroll 事件转为 optimizedScroll 事件</span>
  <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;optimizedScroll&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;optimizedScroll&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Resource conscious scroll callback!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">改用setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">方法，可以放置更大的时间间隔。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span> scrollThrottler<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> scrollTimeout<span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">scrollThrottler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>scrollTimeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      scrollTimeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        scrollTimeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token function">actualScrollHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">actualScrollHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

下面是一个更一般的throttle函数的写法。
<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> time <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>time <span class="token operator">+</span> wait <span class="token operator">-</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      time <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span> <span class="token function">throttle</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面的代码将scroll事件的触发频率，限制在一秒一次。
lodash函数库提供了现成的throttle函数，可以直接使用。
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span> _<span class="token punctuation">.</span><span class="token function">throttle</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

resize 事件
resize事件在改变浏览器窗口大小时触发，主要发生在window对象上面。
<span class="token keyword">var</span> <span class="token function-variable function">resizeMethod</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientWidth <span class="token operator">&lt;</span> <span class="token number">768</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;移动设备的视口&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;resize&#39;</span><span class="token punctuation">,</span> resizeMethod<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

该事件也会连续地大量触发，所以最好像上面的scroll事件一样，通过throttle函数控制事件触发频率。
fullscreenchange 事件，fullscreenerror 事件
fullscreenchange事件在进入或退出全屏状态时触发，该事件发生在document对象上面。
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;fullscreenchange&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>fullscreenElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fullscreenerror事件在浏览器无法切换到全屏状态时触发。
进度事件
进度事件的种类
进度事件用来描述资源加载的进度，主要由 <span class="token constant">AJAX</span> 请求、<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>audio<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>video<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>link<span class="token operator">&gt;</span>等外部资源的加载触发，继承了ProgressEvent接口。它主要包含以下几种事件。
<span class="token operator">-</span> abort：外部资源中止加载时（比如用户取消）触发。如果发生错误导致中止，不会触发该事件。
<span class="token operator">-</span> error：由于错误导致外部资源无法加载时触发。
<span class="token operator">-</span> load：外部资源加载成功时触发。
<span class="token operator">-</span> loadstart：外部资源开始加载时触发。
<span class="token operator">-</span> loadend：外部资源停止加载时触发，发生顺序排在error、abort、load等事件的后面。
<span class="token operator">-</span> progress：外部资源加载过程中不断触发。
<span class="token operator">-</span> timeout：加载超时时触发。
注意，除了资源下载，文件上传也存在这些事件。
有时候，图片加载会在脚本运行之前就完成，尤其是当脚本放置在网页底部的时候，因此有可能load和error事件的监听函数根本不会执行。所以，比较可靠的方式，是用complete属性先判断一下是否加载完成。
<span class="token keyword">function</span> <span class="token function">loaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>image<span class="token punctuation">.</span>complete<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">loaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  image<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> loaded<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

由于 <span class="token constant">DOM</span> 的元素节点没有提供是否加载错误的属性，所以error事件的监听函数最好放在<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的 <span class="token constant">HTML</span> 代码中，这样才能保证发生加载错误时百分之百会执行。
<span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token string">&quot;/wrong/url&quot;</span> onerror<span class="token operator">=</span><span class="token string">&quot;this.style.display=&#39;none&#39;;&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>

loadend事件的监听函数，可以用来取代abort事件、load事件、error事件的监听函数，因为它总是在这些事件之后发生。
req<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;loadend&#39;</span><span class="token punctuation">,</span> loadEnd<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">loadEnd</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;传输结束，成功失败未知&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

loadend事件本身不提供关于进度结束的原因，但可以用它来做所有加载结束场景都需要做的一些操作。
另外，error事件有一个特殊的性质，就是不会冒泡。所以，子元素的error事件，不会触发父元素的error事件监听函数。
ProgressEvent 接口
ProgressEvent接口主要用来描述外部资源加载的进度，比如 <span class="token constant">AJAX</span> 加载、<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>video<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>、<span class="token operator">&lt;</span>link<span class="token operator">&gt;</span>等外部资源加载。进度相关的事件都继承了这个接口。
<span class="token function">浏览器原生提供了ProgressEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成事件实例。
<span class="token keyword">new</span> <span class="token class-name">ProgressEvent</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> options<span class="token punctuation">)</span>

<span class="token function">ProgressEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数接受两个参数。第一个参数是字符串，表示事件的类型，这个参数是必须的。第二个参数是一个配置对象，表示事件的属性，该参数可选。配置对象除了可以使用Event接口的配置属性，还可以使用下面的属性，所有这些属性都是可选的。
<span class="token operator">-</span> lengthComputable：布尔值，表示加载的总量是否可以计算，默认是<span class="token boolean">false</span>。
<span class="token operator">-</span> loaded：整数，表示已经加载的量，默认是<span class="token number">0</span>。
<span class="token operator">-</span> total：整数，表示需要加载的总量，默认是<span class="token number">0</span>。
ProgressEvent具有对应的实例属性。
<span class="token operator">-</span> ProgressEvent<span class="token punctuation">.</span>lengthComputable
<span class="token operator">-</span> ProgressEvent<span class="token punctuation">.</span>loaded
<span class="token operator">-</span> ProgressEvent<span class="token punctuation">.</span>total
如果ProgressEvent<span class="token punctuation">.</span>lengthComputable为<span class="token boolean">false</span>，ProgressEvent<span class="token punctuation">.</span>total实际上是没有意义的。
下面是一个例子。
<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProgressEvent</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">lengthComputable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">loaded</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
  <span class="token literal-property property">total</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;已经加载：&#39;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>loaded <span class="token operator">/</span> e<span class="token punctuation">.</span>total<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span> <span class="token operator">+</span> <span class="token string">&#39;%&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 已经加载：30%</span>

上面代码先构造一个load事件，抛出后被监听函数捕捉到。
下面是一个实际的例子。
<span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span> updateProgress<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> transferComplete<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> transferFailed<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> transferCanceled<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">updateProgress</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>lengthComputable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> percentComplete <span class="token operator">=</span> e<span class="token punctuation">.</span>loaded <span class="token operator">/</span> e<span class="token punctuation">.</span>total<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;不能计算进度&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transferComplete</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;传输结束&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transferFailed</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;传输过程中发生错误&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transferCanceled</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;用户取消了传输&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面是下载过程的进度事件，还存在上传过程的进度事件。这时所有监听函数都要放在XMLHttpRequest<span class="token punctuation">.</span>upload对象上面。
<span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

xhr<span class="token punctuation">.</span>upload<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span> updateProgress<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span>upload<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> transferComplete<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span>upload<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> transferFailed<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span>upload<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span> transferCanceled<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

剪贴板事件
<span class="token operator">-</span> cut：将选中的内容从文档中移除，加入剪贴板时触发。
<span class="token operator">-</span> copy：进行复制动作时触发。
<span class="token operator">-</span> paste：剪贴板内容粘贴到文档后触发。
举例来说，如果希望禁止输入框的粘贴事件，可以使用下面的代码。
inputElement<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;paste&#39;</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

cut、copy、paste这三个事件的事件对象都是ClipboardEvent接口的实例。ClipboardEvent有一个实例属性clipboardData，是一个 DataTransfer 对象，存放剪贴的数据。
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;copy&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span>clipboardData<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello, world!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  e<span class="token punctuation">.</span>clipboardData<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&#39;text/html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&lt;b&gt;Hello, world!&lt;/b&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

焦点事件
焦点事件发生在元素节点和document对象上面，与获得或失去焦点相关。它主要包括以下四个事件。
<span class="token operator">-</span> focus：元素节点获得焦点后触发，该事件不会冒泡。
<span class="token operator">-</span> blur：元素节点失去焦点后触发，该事件不会冒泡。
<span class="token operator">-</span> focusin：元素节点将要获得焦点时触发，发生在focus事件之前。该事件会冒泡。
<span class="token operator">-</span> focusout：元素节点将要失去焦点时触发，发生在blur事件之前。该事件会冒泡。
这四个事件的事件对象都继承了FocusEvent接口。FocusEvent实例具有以下属性。
<span class="token operator">-</span> FocusEvent<span class="token punctuation">.</span>target：事件的目标节点。
<span class="token operator">-</span> FocusEvent<span class="token punctuation">.</span>relatedTarget：对于focusin事件，返回失去焦点的节点；对于focusout事件，返回将要接受焦点的节点；对于focus和blur事件，返回<span class="token keyword">null</span>。
由于focus和blur事件不会冒泡，只能在捕获阶段触发，所以addEventListener方法的第三个参数需要设为<span class="token boolean">true</span>。
form<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;focus&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token string">&#39;pink&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

form<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;blur&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

CustomEvent 接口
CustomEvent 接口用于生成自定义的事件实例。那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，就可以使用 CustomEvent 接口生成的自定义事件对象。
<span class="token function">浏览器原生提供CustomEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成 CustomEvent 事件实例。
<span class="token keyword">new</span> <span class="token class-name">CustomEvent</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> options<span class="token punctuation">)</span>

<span class="token function">CustomEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数接受两个参数。第一个参数是字符串，表示事件的名字，这是必须的。第二个参数是事件的配置对象，这个参数是可选的。CustomEvent的配置对象除了接受 Event 事件的配置属性，只有一个自己的属性。
<span class="token operator">-</span> detail：表示事件的附带数据，默认为<span class="token keyword">null</span>。
下面是一个例子。
<span class="token keyword">var</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomEvent</span><span class="token punctuation">(</span><span class="token string">&#39;build&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string-property property">&#39;detail&#39;</span><span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">eventHandler</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>detail<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;build&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>detail<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>

下面是另一个例子。
<span class="token keyword">var</span> myEvent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomEvent</span><span class="token punctuation">(</span><span class="token string">&#39;myevent&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">detail</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">bubbles</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">cancelable</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;myevent&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello &#39;</span> <span class="token operator">+</span> event<span class="token punctuation">.</span>detail<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

el<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>myEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>

事件对象
<span class="token class-name">事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了Event</span><span class="token punctuation">.</span>prototype对象。
Event对象本身就是一个构造函数，可以用来生成新的实例。
event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

Event构造函数接受两个参数。第一个参数type是字符串，表示事件的名称；第二个参数options是一个对象，表示事件对象的配置。该对象主要有下面两个属性。
<span class="token operator">-</span> bubbles：布尔值，可选，默认为<span class="token boolean">false</span>，表示事件对象是否冒泡。
<span class="token operator">-</span> cancelable：布尔值，可选，默认为<span class="token boolean">false</span>，表示事件是否可以被取消，即能否用Event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。
<span class="token keyword">var</span> ev <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span>
  <span class="token string">&#39;look&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;bubbles&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;cancelable&#39;</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>ev<span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，如果不是显式指定bubbles属性为<span class="token boolean">true</span>，生成的事件就只能在“捕获阶段”触发监听函数。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;div&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;/div&gt;</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> tag <span class="token operator">=</span> event<span class="token punctuation">.</span>currentTarget<span class="token punctuation">.</span>tagName<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Tag: &#39;</span> <span class="token operator">+</span> tag<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 没有任何输出</span>
<span class="token punctuation">}</span>

div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> callback<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> click <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>click<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，p元素发出一个click事件，该事件默认不会冒泡。div<span class="token punctuation">.</span>addEventListener方法指定在冒泡阶段监听，因此监听函数不会触发。如果写成div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> callback<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>，那么在“捕获阶段”可以监听到这个事件。
另一方面，如果这个事件在div元素上触发。
div<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>click<span class="token punctuation">)</span><span class="token punctuation">;</span>

那么，不管div元素是在冒泡阶段监听，还是在捕获阶段监听，都会触发监听函数。因为这时div元素是事件的目标，不存在是否冒泡的问题，div元素总是会接收到事件，因此导致监听函数生效。
实例属性
Event<span class="token punctuation">.</span>bubbles，Event<span class="token punctuation">.</span>eventPhase
Event<span class="token punctuation">.</span>bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。前面说过，除非显式声明，Event构造函数生成的事件，默认是不冒泡的。
Event<span class="token punctuation">.</span>eventPhase属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。
<span class="token keyword">var</span> phase <span class="token operator">=</span> event<span class="token punctuation">.</span>eventPhase<span class="token punctuation">;</span>

Event<span class="token punctuation">.</span>eventPhase的返回值有四种可能。
<span class="token operator">-</span> <span class="token number">0</span>，事件目前没有发生。
<span class="token operator">-</span> <span class="token number">1</span>，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
<span class="token operator">-</span> <span class="token number">2</span>，事件到达目标节点，即Event<span class="token punctuation">.</span>target属性指向的那个节点。
<span class="token operator">-</span> <span class="token number">3</span>，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。
Event<span class="token punctuation">.</span>cancelable，Event<span class="token punctuation">.</span>cancelBubble，event<span class="token punctuation">.</span>defaultPrevented
Event<span class="token punctuation">.</span>cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。
大多数浏览器的原生事件是可以取消的。比如，取消click事件，点击链接将无效。但是除非显式声明，Event构造函数生成的事件，默认是不可以取消的。
<span class="token keyword">var</span> evt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
evt<span class="token punctuation">.</span>cancelable  <span class="token comment">// false</span>

当Event<span class="token punctuation">.</span>cancelable属性为<span class="token boolean">true</span>时，调用Event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>就可以取消这个事件，阻止浏览器对该事件的默认行为。
如果事件不能取消，调用Event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>会没有任何效果。所以使用这个方法之前，最好用Event<span class="token punctuation">.</span>cancelable属性判断一下是否可以取消。
<span class="token keyword">function</span> <span class="token function">preventEvent</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>cancelable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;This event couldn\\&#39;t be canceled.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Event<span class="token punctuation">.</span>cancelBubble属性是一个布尔值，如果设为<span class="token boolean">true</span>，相当于执行Event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，可以阻止事件的传播。
Event<span class="token punctuation">.</span>defaultPrevented属性返回一个布尔值，表示该事件是否调用过Event<span class="token punctuation">.</span>preventDefault方法。该属性只读。
<span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>defaultPrevented<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;该事件已经取消了&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

Event<span class="token punctuation">.</span>currentTarget，Event<span class="token punctuation">.</span>target
事件发生以后，会经过捕获和冒泡两个阶段，依次通过多个 <span class="token constant">DOM</span> 节点。因此，任意事件都有两个与事件相关的节点，一个是事件的原始触发节点（Event<span class="token punctuation">.</span>target），另一个是事件当前正在通过的节点（Event<span class="token punctuation">.</span>currentTarget）。前者通常是后者的后代节点。
Event<span class="token punctuation">.</span>currentTarget属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。
Event<span class="token punctuation">.</span>target属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。
事件传播过程中，不同节点的监听函数内部的Event<span class="token punctuation">.</span>target与Event<span class="token punctuation">.</span>currentTarget属性的值是不一样的。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;p id=&quot;para&quot;&gt;Hello &lt;em&gt;World&lt;/em&gt;&lt;/p&gt;</span>
<span class="token keyword">function</span> <span class="token function">hide</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 不管点击 Hello 或 World，总是返回 true</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 点击 Hello，返回 true</span>
  <span class="token comment">// 点击 World，返回 false</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;para&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> hide<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，<span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>是<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>的子节点，点击<span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>或者点击<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>，都会导致监听函数执行。这时，e<span class="token punctuation">.</span>target总是指向原始点击位置的那个节点，而e<span class="token punctuation">.</span>currentTarget指向事件传播过程中正在经过的那个节点。由于监听函数只有事件经过时才会触发，所以e<span class="token punctuation">.</span>currentTarget总是等同于监听函数内部的<span class="token keyword">this</span>。
Event<span class="token punctuation">.</span>type
Event<span class="token punctuation">.</span>type属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的。该属性只读。
<span class="token keyword">var</span> evt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
evt<span class="token punctuation">.</span>type <span class="token comment">// &quot;foo&quot;</span>

Event<span class="token punctuation">.</span>timeStamp
Event<span class="token punctuation">.</span>timeStamp属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。
<span class="token keyword">var</span> evt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
evt<span class="token punctuation">.</span>timeStamp <span class="token comment">// 3683.6999999995896</span>

它的返回值有可能是整数，也有可能是小数（高精度时间戳），取决于浏览器的设置。
下面是一个计算鼠标移动速度的例子，显示每秒移动的像素数量。
<span class="token keyword">var</span> previousX<span class="token punctuation">;</span>
<span class="token keyword">var</span> previousY<span class="token punctuation">;</span>
<span class="token keyword">var</span> previousT<span class="token punctuation">;</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mousemove&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    previousX <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span>
    previousY <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span>
    previousT <span class="token operator">!==</span> <span class="token keyword">undefined</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> deltaX <span class="token operator">=</span> event<span class="token punctuation">.</span>screenX <span class="token operator">-</span> previousX<span class="token punctuation">;</span>
    <span class="token keyword">var</span> deltaY <span class="token operator">=</span> event<span class="token punctuation">.</span>screenY <span class="token operator">-</span> previousY<span class="token punctuation">;</span>
    <span class="token keyword">var</span> deltaD <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>deltaX<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>deltaY<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> deltaT <span class="token operator">=</span> event<span class="token punctuation">.</span>timeStamp <span class="token operator">-</span> previousT<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>deltaD <span class="token operator">/</span> deltaT <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  previousX <span class="token operator">=</span> event<span class="token punctuation">.</span>screenX<span class="token punctuation">;</span>
  previousY <span class="token operator">=</span> event<span class="token punctuation">.</span>screenY<span class="token punctuation">;</span>
  previousT <span class="token operator">=</span> event<span class="token punctuation">.</span>timeStamp<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Event<span class="token punctuation">.</span>isTrusted
Event<span class="token punctuation">.</span>isTrusted属性返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个click事件，该事件是用户产生的；Event构造函数生成的事件，则是脚本产生的。
<span class="token keyword">var</span> evt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
evt<span class="token punctuation">.</span>isTrusted <span class="token comment">// false</span>

上面代码中，evt对象是脚本产生的，所以isTrusted属性返回<span class="token boolean">false</span>。
Event<span class="token punctuation">.</span>detail
Event<span class="token punctuation">.</span>detail属性只有浏览器的 <span class="token constant">UI</span> （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关。比如，对于click和dblclick事件，Event<span class="token punctuation">.</span>detail是鼠标按下的次数（<span class="token number">1</span>表示单击，<span class="token number">2</span>表示双击，<span class="token number">3</span>表示三击）；对于鼠标滚轮事件，Event<span class="token punctuation">.</span>detail是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是<span class="token number">3</span>的倍数。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;p&gt;Hello&lt;/p&gt;</span>
<span class="token keyword">function</span> <span class="token function">giveDetails</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>detail<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>onclick <span class="token operator">=</span> giveDetails<span class="token punctuation">;</span>

实例方法
Event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Event<span class="token punctuation">.</span>preventDefault方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的cancelable属性为<span class="token boolean">true</span>，如果为<span class="token boolean">false</span>，调用该方法没有任何效果。
<span class="token function">注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">或stopImmediatePropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;input type=&quot;checkbox&quot; id=&quot;my-checkbox&quot; /&gt;</span>
<span class="token keyword">var</span> cb <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;my-checkbox&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

cb<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span> e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，浏览器的默认行为是单击会选中单选框，取消这个行为，就导致无法选中单选框。
利用这个方法，可以为文本输入框设置校验条件。如果用户的输入不符合条件，就无法将字符输入文本框。
<span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;input type=&quot;text&quot; id=&quot;my-input&quot; /&gt;</span>
<span class="token keyword">var</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;my-input&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
input<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;keypress&#39;</span><span class="token punctuation">,</span> checkName<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">checkName</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>charCode <span class="token operator">&lt;</span> <span class="token number">97</span> <span class="token operator">||</span> e<span class="token punctuation">.</span>charCode <span class="token operator">&gt;</span> <span class="token number">122</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

上面代码为文本框的keypress事件设定监听函数后，将只能输入小写字母，否则输入事件的默认行为（写入文本框）将被取消，导致不能向文本框输入内容。
Event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
stopPropagation方法阻止事件在 <span class="token constant">DOM</span> 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。
<span class="token keyword">function</span> <span class="token function">stopEvent</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> stopEvent<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，click事件将不会进一步冒泡到el节点的父节点。
Event<span class="token punctuation">.</span><span class="token function">stopImmediatePropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Event<span class="token punctuation">.</span>stopImmediatePropagation方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比Event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>更彻底。
如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了Event<span class="token punctuation">.</span>stopImmediatePropagation方法，其他的监听函数就不会再执行了。
<span class="token keyword">function</span> <span class="token function">l1</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">stopImmediatePropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">l2</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> l1<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> l2<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码在el节点上，为click事件添加了两个监听函数l1和l2。由于l1调用了event<span class="token punctuation">.</span>stopImmediatePropagation方法，所以l2不会被调用。
Event<span class="token punctuation">.</span><span class="token function">composedPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Event<span class="token punctuation">.</span><span class="token function">composedPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div&gt;</span>
<span class="token comment">//   &lt;p&gt;Hello&lt;/p&gt;</span>
<span class="token comment">// &lt;/div&gt;</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">composedPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// [p, div, body, html, document, Window]</span>

上面代码中，click事件的最底层节点是p，向上依次是div、body、html、document、Window。
<span class="token keyword">this</span> 的指向
监听函数内部的<span class="token keyword">this</span>指向触发事件的那个元素节点。
<span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">&quot;btn&quot;</span> onclick<span class="token operator">=</span><span class="token string">&quot;console.log(this.id)&quot;</span><span class="token operator">&gt;</span>点击<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>

执行上面代码，点击后会输出btn。
其他两种监听函数的写法，<span class="token keyword">this</span>的指向也是如此。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;button id=&quot;btn&quot;&gt;点击&lt;/button&gt;</span>
<span class="token keyword">var</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 写法一</span>
btn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 写法二</span>
btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

上面两种写法，点击按钮以后也是输出btn。
事件的代理
由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。
<span class="token keyword">var</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>tagName<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// some code</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，click事件的监听函数定义在<span class="token operator">&lt;</span>ul<span class="token operator">&gt;</span>节点，但是实际上，它处理的是子节点<span class="token operator">&lt;</span>li<span class="token operator">&gt;</span>的click事件。这样做的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个<span class="token operator">&lt;</span>li<span class="token operator">&gt;</span>节点上定义监听函数。而且以后再添加子节点，监听函数依然有效。
如果希望事件到某个节点为止，不再传播，可以使用事件对象的stopPropagation方法。
<span class="token comment">// 事件传播到 p 元素后，就不再向下传播了</span>
p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 事件冒泡到 p 元素后，就不再向上冒泡了</span>
p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，stopPropagation方法分别在捕获阶段和冒泡阶段，阻止了事件的传播。
但是，stopPropagation方法只会阻止事件的传播，不会阻止该事件触发<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>节点的其他click事件的监听函数。也就是说，不是彻底取消click事件。
p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 会触发</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，p元素绑定了两个click事件的监听函数。stopPropagation方法只能阻止这个事件的传播，不能取消这个事件，因此，第二个监听函数会触发。输出结果会先是<span class="token number">1</span>，然后是<span class="token number">2</span>。
如果想要彻底取消该事件，不再触发后面所有click的监听函数，可以使用stopImmediatePropagation方法。
p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">stopImmediatePropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 不会被触发</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

上面代码中，stopImmediatePropagation方法可以彻底取消这个事件，使得后面绑定的所有click监听函数都不再触发。所以，只会输出<span class="token number">1</span>，不会输出<span class="token number">2</span>。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","event.html.vue"]]);export{k as default};
