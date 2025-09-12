import{_ as n,p as s,q as a,Y as e}from"./framework-e1bed10d.js";const t={},p=e(`<h1 id="error" tabindex="-1"><a class="header-anchor" href="#error" aria-hidden="true">#</a> Error</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Error 实例对象
JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例。
<span class="token keyword">var</span> err <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;出错了&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
err<span class="token punctuation">.</span>message <span class="token comment">// &quot;出错了&quot;</span>

<span class="token function">上面代码中，我们调用Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">构造函数，生成一个实例对象err。Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数接受一个参数，表示错误提示，可以从实例的message属性读到这个参数。抛出Error实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。
JavaScript 语言标准只提到，Error实例对象必须有message属性，表示出错时的提示信息，没有提到其他属性。大多数 JavaScript 引擎，对Error实例还提供name和stack属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。

<span class="token operator">-</span> message：错误提示信息
<span class="token operator">-</span> name：错误名称（非标准属性）
<span class="token operator">-</span> stack：错误的堆栈（非标准属性）
使用name和message这两个属性，可以对发生什么错误有一个大概的了解。
<span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: &#39;</span> <span class="token operator">+</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

stack属性用来查看错误发生时的堆栈。
<span class="token keyword">function</span> <span class="token function">throwit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">catchit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token function">throwit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// print stack trace</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">catchit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// Error</span>
<span class="token comment">//    at throwit (~/examples/throwcatch.js:9:11)</span>
<span class="token comment">//    at catchit (~/examples/throwcatch.js:3:9)</span>
<span class="token comment">//    at repl:1:5</span>

上面代码中，错误堆栈的最内层是throwit函数，然后是catchit函数，最后是函数的运行环境。
原生错误类型
Error实例对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他<span class="token number">6</span>种错误对象。也就是说，存在Error的<span class="token number">6</span>个派生对象。
SyntaxError 对象
SyntaxError对象是解析代码时发生的语法错误。
<span class="token comment">// 变量名错误</span>
<span class="token keyword">var</span> 1a<span class="token punctuation">;</span>
<span class="token comment">// Uncaught SyntaxError: Invalid or unexpected token</span>

<span class="token comment">// 缺少括号</span>
console<span class="token punctuation">.</span>log <span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught SyntaxError: Unexpected string</span>

上面代码的错误，都是在语法解析阶段就可以发现，所以会抛出SyntaxError。第一个错误提示是“token 非法”，第二个错误提示是“字符串不符合要求”。
ReferenceError 对象
ReferenceError对象是引用一个不存在的变量时发生的错误。
<span class="token comment">// 使用一个不存在的变量</span>
unknownVariable
<span class="token comment">// Uncaught ReferenceError: unknownVariable is not defined</span>

另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果赋值。
<span class="token comment">// 等号左侧不是变量</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">// Uncaught ReferenceError: Invalid left-hand side in assignment</span>

上面代码对函数console<span class="token punctuation">.</span>log的运行结果赋值，结果引发了ReferenceError错误。
RangeError 对象
RangeError对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
<span class="token comment">// 数组长度不得为负数</span>
<span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment">// Uncaught RangeError: Invalid array length</span>

TypeError 对象
TypeError对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用<span class="token keyword">new</span>命令，就会抛出这种错误，因为<span class="token keyword">new</span>命令的参数应该是一个构造函数。
<span class="token keyword">new</span> <span class="token class-name">123</span>
<span class="token comment">// Uncaught TypeError: 123 is not a constructor</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">unknownMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// Uncaught TypeError: obj.unknownMethod is not a function</span>

上面代码的第二种情况，调用对象不存在的方法，也会抛出TypeError错误，因为obj<span class="token punctuation">.</span>unknownMethod的值是<span class="token keyword">undefined</span>，而不是一个函数。
URIError 对象
URIError对象是 <span class="token constant">URI</span> <span class="token function">相关函数的参数不正确时抛出的错误，主要涉及encodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、decodeURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、encodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、decodeURIComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、escape</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">和unescape</span><span class="token punctuation">(</span><span class="token punctuation">)</span>这六个函数。
<span class="token function">decodeURI</span><span class="token punctuation">(</span><span class="token string">&#39;%2&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// URIError: URI malformed</span>

EvalError 对象
eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。
总结
以上这<span class="token number">6</span>种派生错误，连同原始的Error对象，都是构造函数。开发者可以使用它们，手动生成错误对象的实例。这些构造函数都接受一个参数，代表错误提示信息（message）。
<span class="token keyword">var</span> err1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;出错了！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> err2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RangeError</span><span class="token punctuation">(</span><span class="token string">&#39;出错了，变量超出有效范围！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> err3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;出错了，变量类型无效！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

err1<span class="token punctuation">.</span>message <span class="token comment">// &quot;出错了！&quot;</span>
err2<span class="token punctuation">.</span>message <span class="token comment">// &quot;出错了，变量超出有效范围！&quot;</span>
err3<span class="token punctuation">.</span>message <span class="token comment">// &quot;出错了，变量类型无效！&quot;</span>

自定义错误
除了 JavaScript 原生提供的七种错误对象，还可以定义自己的错误对象。
<span class="token keyword">function</span> <span class="token function">UserError</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message <span class="token operator">||</span> <span class="token string">&#39;默认信息&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;UserError&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">UserError</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UserError</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> UserError<span class="token punctuation">;</span>

上面代码自定义一个错误对象UserError，让它继承Error对象。然后，就可以生成这种自定义类型的错误了。
<span class="token keyword">new</span> <span class="token class-name">UserError</span><span class="token punctuation">(</span><span class="token string">&#39;这是自定义的错误！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">throw</span> 语句
<span class="token keyword">throw</span>语句的作用是手动中断程序执行，抛出一个错误。
<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;x 必须为正数&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Uncaught ReferenceError: x is not defined</span>

上面代码中，如果变量x小于等于<span class="token number">0</span>，就手动抛出一个错误，告诉用户x的值不正确，整个程序就会在这里中断执行。可以看到，<span class="token keyword">throw</span>抛出的错误就是它的参数，这里是一个Error实例。
<span class="token keyword">throw</span>也可以抛出自定义错误。
<span class="token keyword">function</span> <span class="token function">UserError</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message <span class="token operator">||</span> <span class="token string">&#39;默认信息&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;UserError&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UserError</span><span class="token punctuation">(</span><span class="token string">&#39;出错了！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught UserError {message: &quot;出错了！&quot;, name: &quot;UserError&quot;}</span>

上面代码中，<span class="token keyword">throw</span>抛出的是一个UserError实例。
实际上，<span class="token keyword">throw</span>可以抛出任何类型的值。也就是说，它的参数可以是任何值。
<span class="token comment">// 抛出一个字符串</span>
<span class="token keyword">throw</span> <span class="token string">&#39;Error！&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught Error！</span>

<span class="token comment">// 抛出一个数值</span>
<span class="token keyword">throw</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught 42</span>

<span class="token comment">// 抛出一个布尔值</span>
<span class="token keyword">throw</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught true</span>

<span class="token comment">// 抛出一个对象</span>
<span class="token keyword">throw</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">toString</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;Error!&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught {toString: ƒ}</span>

对于 JavaScript 引擎来说，遇到<span class="token keyword">throw</span>语句，程序就中止了。引擎会接收到<span class="token keyword">throw</span>抛出的信息，可能是一个错误实例，也可能是其他类型的值。
异常传播
异常沿着执行栈向上传播
错误处理
<span class="token keyword">try</span><span class="token operator">...</span>catch 结构
一旦发生错误，程序就中止执行了。JavaScript 提供了<span class="token keyword">try</span><span class="token operator">...</span>catch结构，允许对错误进行处理，选择是否往下执行。
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;出错了!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Error: 出错了!</span>
<span class="token comment">//   at &lt;anonymous&gt;:3:9</span>
<span class="token comment">//   ...</span>

上面代码中，<span class="token keyword">try</span>代码块抛出错误（上例用的是<span class="token keyword">throw</span>语句），JavaScript 引擎就立即把代码的执行，转到catch代码块，或者说错误被catch代码块捕获了。catch接受一个参数，表示<span class="token keyword">try</span>代码块抛出的值。
如果你不确定某些代码是否会报错，就可以把它们放在<span class="token keyword">try</span><span class="token operator">...</span>catch代码块之中，便于进一步对错误进行处理。
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理错误</span>
<span class="token punctuation">}</span>

上面代码中，如果函数f执行报错，就会进行catch代码块，接着对错误进行处理。
catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token string">&quot;出错了&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 111</span>
<span class="token comment">// 222</span>

上面代码中，<span class="token keyword">try</span>代码块抛出的错误，被catch代码块捕获后，程序会继续向下执行。
catch代码块之中，还可以再抛出错误，甚至使用嵌套的<span class="token keyword">try</span><span class="token operator">...</span>catch结构。
<span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> n<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">&lt;=</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// Uncaught 100</span>

上面代码中，catch代码之中又抛出了一个错误。
为了捕捉不同类型的错误，catch代码块之中可以加入判断语句。
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">EvalError</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">RangeError</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

上面代码中，catch捕获错误之后，会判断错误类型（EvalError还是RangeError），进行不同的处理。
finally 代码块
<span class="token keyword">try</span><span class="token operator">...</span>catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。
<span class="token keyword">function</span> <span class="token function">cleansUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;出错了……&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;此行不会执行&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;完成清理工作&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">cleansUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 完成清理工作</span>
<span class="token comment">// Uncaught Error: 出错了……</span>
<span class="token comment">//    at cleansUp (&lt;anonymous&gt;:3:11)</span>
<span class="token comment">//    at &lt;anonymous&gt;:10:1</span>

上面代码中，由于没有catch语句块，一旦发生错误，代码就会中断执行。中断执行之前，会先执行finally代码块，然后再向用户提示报错信息。
<span class="token keyword">function</span> <span class="token function">idle</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&#39;result&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;FINALLY&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">idle</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// hello</span>
<span class="token comment">// FINALLY</span>

上面代码中，<span class="token keyword">try</span>代码块没有发生错误，而且里面还包括<span class="token keyword">return</span>语句，但是finally代码块依然会执行。而且，这个函数的返回值还是result。
下面的例子说明，<span class="token keyword">return</span>语句的执行是排在finally代码之前，只是等finally代码执行完毕后才返回。
<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">countUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> count<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    count<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">countUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 0</span>
count
<span class="token comment">// 1</span>

上面代码说明，<span class="token keyword">return</span>语句里面的count的值，是在finally代码块运行之前就获取了。
下面是finally代码块用法的典型场景。
<span class="token function">openFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">writeFile</span><span class="token punctuation">(</span>Data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
  <span class="token function">closeFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

上面代码首先打开一个文件，然后在<span class="token keyword">try</span>代码块中写入文件，如果没有发生错误，则运行finally代码块关闭文件；一旦发生错误，则先使用catch代码块处理错误，再使用finally代码块关闭文件。
下面的例子充分反映了<span class="token keyword">try</span><span class="token operator">...</span>catch<span class="token operator">...</span>finally这三者之间的执行顺序。
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> <span class="token string">&#39;bug&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 这句原本会延迟到 finally 代码块结束再执行</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 这句会覆盖掉前面那句 return</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
  <span class="token punctuation">}</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 0</span>
<span class="token comment">// 1</span>
<span class="token comment">// 3</span>

result
<span class="token comment">// false</span>

上面代码中，catch代码块结束执行之前，会先执行finally代码块。
catch代码块之中，触发转入finally代码块的标志，不仅有<span class="token keyword">return</span>语句，还有<span class="token keyword">throw</span>语句。
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token string">&#39;出错了！&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;捕捉到内部错误&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> e<span class="token punctuation">;</span> <span class="token comment">// 这句原本会等到finally结束再执行</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 直接返回</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 此处不会执行</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;caught outer &quot;bogus&quot;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//  捕捉到内部错误</span>

上面代码中，进入catch代码块之后，一遇到<span class="token keyword">throw</span>语句，就会去执行finally代码块，其中有<span class="token keyword">return</span> <span class="token boolean">false</span>语句，因此就直接返回了，不再会回去执行catch代码块剩下的部分了。
<span class="token keyword">try</span>代码块内部，还可以再使用<span class="token keyword">try</span>代码块。
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    consle<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello world!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Finally&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Will I run?&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Finally</span>
<span class="token comment">// consle is not defined</span>

上面代码中，<span class="token keyword">try</span>里面还有一个<span class="token keyword">try</span>。内层的<span class="token keyword">try</span>报错（console拼错了），这时会执行内层的finally代码块，然后抛出错误，被外层的catch捕获。
<span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>catch
该方式处理rejected状态的promise对象
window<span class="token operator">-</span>unhandledrejection
window<span class="token operator">-</span>error
在window对象上绑定error事件的回调，可以捕获到全局任何地方未被捕获到的错误
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","error.html.vue"]]);export{r as default};
