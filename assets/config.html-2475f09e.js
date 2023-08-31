import{_ as n,p as s,q as a,Y as p}from"./framework-e1bed10d.js";const e={},t=p(`<h1 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack" aria-hidden="true">#</a> webpack</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>入口配置
上下文
上下文用于入口和加载器解析出绝对路径，默认使用node进程的当前工作目录，配置时建议配置
入口
入口配置的形式多样

<span class="token number">1.</span> name：如果传入一个字符串或者字符串数组，chunk 会被命名为 <span class="token function">main。如果传入一个对象，则每个属性的键</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>会是 chunk 的名称，该属性的值描述了 chunk 的入口点
<span class="token number">2.</span> 描述符：传入一个对象时，属性值用于描述入口信息
<span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">home</span><span class="token operator">:</span> <span class="token string">&#39;./home.js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">shared</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;react&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;react-dom&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;redux&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;react-redux&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">// 为入口指定多个文件</span>
    <span class="token literal-property property">personal</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">import</span><span class="token operator">:</span> <span class="token string">&#39;./personal.js&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;pages/personal.js&#39;</span><span class="token punctuation">,</span><span class="token comment">// 自定义输出文件名</span>
      <span class="token literal-property property">dependOn</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;shared&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">// 共享的依赖，不会打包到personal中，为string或者array</span>
      <span class="token literal-property property">chunkLoading</span><span class="token operator">:</span> <span class="token string">&#39;jsonp&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">asyncChunks</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// Create async chunks that are loaded on demand.</span>
      <span class="token literal-property property">layer</span><span class="token operator">:</span> <span class="token string">&#39;name of layer&#39;</span><span class="token punctuation">,</span> <span class="token comment">// set the layer for an entry point</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token number">3.</span> 函数
返回一个入口配置的函数
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token function-variable function">entry</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&#39;./demo&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 或者</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token function-variable function">entry</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;./demo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;./demo2&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

mode
设置方式

<span class="token number">1.</span> 通过配置的方式
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">2.</span> 通过cli的方式
webpack <span class="token operator">--</span>mode<span class="token operator">=</span>development

模式区别
无法复制加载中的内容
资源处理
style

<span class="token number">1.</span> css
在js中导入样式文件，需要使用到基本的css<span class="token operator">-</span>loader和style<span class="token operator">-</span>loader，style<span class="token operator">-</span>loader处理完成后，返回js字符串，代码的执行会在html中动态插入style标签
<span class="token number">2.</span> less
处理less资源时，使用到less和less<span class="token operator">-</span>loader
<span class="token number">3.</span> scss
image
处理图片资源，可使用系统内置的asset<span class="token operator">/</span>resource，在html中使用src引入图片，html<span class="token operator">-</span>loader会将图片资源处理到输出目录，并返回最终的路径，在css中通过url引入图片，webpack以相同的方式处理
字体文件
处理字体文件，在css中声明字体并将文件通过url的方式引入，处理逻辑同图片引入方法
加载数据
<span class="token number">1.</span> json
json模块数据加载是内置的，与node一样，可以直接导入，json中的数据视作默认导出
<span class="token number">2.</span> csv
加载csv需要使用csv<span class="token operator">-</span>loader，csv<span class="token operator">-</span>loader处理后data为一个数组，数组的每一项均为一个数组
name<span class="token punctuation">,</span>age
amsc30<span class="token punctuation">,</span><span class="token number">12</span>
<span class="token comment">// 转换后</span>
<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">&quot;amsc30&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;12&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

解析规则
路径分类

<span class="token number">1.</span> 绝对路径
类似于<span class="token keyword">import</span> &#39;<span class="token operator">/</span>home<span class="token operator">/</span>me<span class="token operator">/</span>file<span class="token punctuation">,</span>这种绝对路径不需要做进一步解析
<span class="token number">2.</span> 相对路径  
类似于<span class="token keyword">import</span> <span class="token string">&#39;./file&#39;</span><span class="token punctuation">,</span>使用<span class="token keyword">import</span>或者require的资源文件所在的目录会被认为是上下文目录，根据此上下文拼接成模块的绝对路径
<span class="token number">3.</span> 模块路径
类似于<span class="token keyword">import</span> <span class="token string">&#39;module/lib/file&#39;</span>，在 resolve<span class="token punctuation">.</span>modules 中指定的所有目录中检索模块。 你可以通过配置别名的方式来替换初始模块路径，具体请参照 resolve<span class="token punctuation">.</span>alias 配置选项
文件查找
在获取到文件路径后，resolver会检查路径是指向文件还是文件夹
<span class="token number">1.</span> 如果是文件

<span class="token operator">-</span> 如果文件具有扩展名，直接完成解析进行打包
<span class="token operator">-</span> 如果不具有扩展名，使用resolve<span class="token punctuation">.</span>extensions作为文件扩展名进行解析

<span class="token number">2.</span> 如果是文件夹

<span class="token operator">-</span> 检查是否有<span class="token keyword">package</span><span class="token punctuation">.</span>json并根据resolve<span class="token punctuation">.</span>mainFields中配置的字段进行查找，根据符合配置要求的第一个字段来确定文件路径
<span class="token operator">-</span> 如果不存在<span class="token keyword">package</span><span class="token punctuation">.</span>json或者resolve<span class="token punctuation">.</span>mainFields没有返回有效的路径，则会根据 resolve<span class="token punctuation">.</span>mainFiles配置选项中指定的文件名顺序查找，看是否能在 <span class="token keyword">import</span><span class="token operator">/</span>require 的目录下匹配到一个存在的文件名
解析配置
配置模块该如何解析

<span class="token number">1.</span> alias
创建 <span class="token keyword">import</span> 或 require 的别名，来确保模块引入变得更简单，可在给定对象的键后添加$，表示精确匹配
无法复制加载中的内容
<span class="token number">2.</span> descriptionFiles
<span class="token punctuation">[</span>string<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;package.json&#39;</span><span class="token punctuation">]</span>
指定用于描述的json文件
<span class="token number">3.</span> enforceExtension
boolean <span class="token operator">=</span> <span class="token boolean">false</span>
如果是 <span class="token boolean">true</span>，将不允许无扩展名文件。默认如果 <span class="token punctuation">.</span><span class="token operator">/</span>foo 有 <span class="token punctuation">.</span>js <span class="token function">扩展，require</span><span class="token punctuation">(</span><span class="token string">&#39;./foo&#39;</span><span class="token punctuation">)</span> 可以正常运行。但如果启用此选项，只有 <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./foo.js&#39;</span><span class="token punctuation">)</span> 能够正常工作
<span class="token number">4.</span> extensions
<span class="token punctuation">[</span>string<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.wasm&#39;</span><span class="token punctuation">]</span>
解析后缀名的选项
以上这样使用 resolve<span class="token punctuation">.</span>extensions 会 覆盖默认数组，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。然而你可以使用 <span class="token string">&#39;...&#39;</span> 访问默认拓展名
<span class="token number">5.</span> mainFields
当从 npm 包中导入模块时（例如，<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">D3</span> <span class="token keyword">from</span> <span class="token string">&#39;d3&#39;</span>），此选项将决定在 <span class="token keyword">package</span><span class="token punctuation">.</span>json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同
<span class="token number">6.</span> mainFiles
<span class="token punctuation">[</span>string<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;index&#39;</span><span class="token punctuation">]</span>
当解析到目录并且没有<span class="token keyword">package</span><span class="token punctuation">.</span>json文件时，要解析的文件名，相当于在请求路径后面拼接，然后再根据extensions的顺序进行解析
<span class="token number">7.</span> modules
<span class="token punctuation">[</span>string<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;node_modules&#39;</span><span class="token punctuation">]</span>
告诉 webpack 解析模块时应该搜索的目录。
<span class="token number">8.</span> plugins
<span class="token punctuation">[</span>Plugin<span class="token punctuation">]</span>
应该使用的额外的解析插件列表
<span class="token number">9.</span> preferRelative
boolean
当启用此选项时，webpack 更倾向于将模块请求解析为相对请求，而不使用来自 node_modules 目录下的模块
<span class="token number">10.</span> preferAbsolute
boolean
解析时，首选的绝对路径为 resolve<span class="token punctuation">.</span>roots
<span class="token number">11.</span> roots
<span class="token punctuation">[</span>string<span class="token punctuation">]</span>
服务器相关<span class="token constant">URL</span>（以<span class="token string">&#39;/&#39;</span>开头）的请求被解决的目录列表，默认为上下文配置选项。在非Windows系统上，这些请求首先被解析为一个绝对路径。
<span class="token keyword">const</span> fixtures <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;fixtures&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">roots</span><span class="token operator">:</span> <span class="token punctuation">[</span>__dirname<span class="token punctuation">,</span> fixtures<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

配置选项
每个规则可以分为三部分，条件、结果、嵌套规则

<span class="token operator">-</span> 条件：一种是资源的绝对路径，主要通过test<span class="token punctuation">,</span>include<span class="token punctuation">,</span>resource进行匹配，一种是请求者的绝对路径，主要通过resource进行匹配
<span class="token operator">-</span> 结果：规则结果在规则条件匹配时使用，包括应用的loader和parser
<span class="token operator">-</span> <span class="token function">规则嵌套：这些规则用于在规则条件</span><span class="token punctuation">(</span>rule condition<span class="token punctuation">)</span>匹配时进行取值。每个嵌套规则包含它自己的条件
条件

<span class="token number">1.</span> rule<span class="token punctuation">.</span>enforce
string pre <span class="token operator">|</span> post
指定loader的种类，没有值表示普通loader

<span class="token operator">-</span> Pitching 阶段<span class="token operator">:</span> loader 上的 pitch 方法，按照 <span class="token function">后置</span><span class="token punctuation">(</span>post<span class="token punctuation">)</span><span class="token function">、行内</span><span class="token punctuation">(</span>inline<span class="token punctuation">)</span><span class="token function">、普通</span><span class="token punctuation">(</span>normal<span class="token punctuation">)</span><span class="token function">、前置</span><span class="token punctuation">(</span>pre<span class="token punctuation">)</span> 的顺序调用。
<span class="token operator">-</span> Normal 阶段<span class="token operator">:</span> loader 上的 常规方法，按照 <span class="token function">前置</span><span class="token punctuation">(</span>pre<span class="token punctuation">)</span><span class="token function">、普通</span><span class="token punctuation">(</span>normal<span class="token punctuation">)</span><span class="token function">、行内</span><span class="token punctuation">(</span>inline<span class="token punctuation">)</span><span class="token function">、后置</span><span class="token punctuation">(</span>post<span class="token punctuation">)</span> 的顺序调用。模块源码的转换， 发生在这个阶段
所有普通 loader 可以通过在请求中加上 <span class="token operator">!</span> 前缀来忽略（覆盖）。
所有普通和前置 loader 可以通过在请求中加上 <span class="token operator">-</span><span class="token operator">!</span> 前缀来忽略（覆盖）。
所有普通，后置和前置 loader 可以通过在请求中加上 <span class="token operator">!</span><span class="token operator">!</span> 前缀来忽略（覆盖）。
<span class="token comment">// 禁用普通 loaders</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> a <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;!./file1.js&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 禁用前置和普通 loaders</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> b <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;-!./file2.js&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 禁用所有的 laoders</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> c <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;!!./file3.js&#39;</span><span class="token punctuation">;</span>

<span class="token number">2.</span> rule<span class="token punctuation">.</span>exclude
排除所有符合条件的模块，不适用loader进行转换
<span class="token number">3.</span> rule<span class="token punctuation">.</span>include
引入符合条件的模块
<span class="token number">4.</span> rule<span class="token punctuation">.</span>issuer
资源的请求者模块
<span class="token number">5.</span> noParse
防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中 不应该含有 <span class="token keyword">import</span><span class="token punctuation">,</span> require<span class="token punctuation">,</span> define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">noParse</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">jquery|lodash</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">noParse</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">jquery|lodash</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">6.</span> Rule<span class="token punctuation">.</span>resourceQuery
与资源查询相匹配的 Condition。此选项用于测试请求字符串的查询部分（即从问号开始
<span class="token number">7.</span> Rule<span class="token punctuation">.</span>test
引入所有通过断言测试的模块
<span class="token number">8.</span> Rule<span class="token punctuation">.</span>scheme
匹配使用的 schema
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">scheme</span><span class="token operator">:</span> <span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;asset/resource&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

结果

<span class="token number">1.</span> generator
统一配置资源生成器的选项
 <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">asset</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// asseet 模块的 generator 选项</span>

        <span class="token comment">// 自定义 asset 模块的 publicPath，自 webpack 5.28.0 起可用</span>
        <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;assets/&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// 将静态资源输出到相对于 &#39;output.path&#39; 的指定文件夹中，webpack 5.67.0 后可用</span>
        <span class="token literal-property property">outputPath</span><span class="token operator">:</span> <span class="token string">&#39;cdn-assets/&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string-property property">&#39;asset/inline&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// asset/内联模块的 generator 选项</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span>

<span class="token number">2.</span> parser
统一配置解析器的选项，配置方式同generator
<span class="token number">3.</span> rule<span class="token punctuation">.</span>loader
rule<span class="token punctuation">.</span>use的简写
<span class="token number">4.</span> rule<span class="token punctuation">.</span>parser
boolean <span class="token operator">|</span> object
模块解析配置
<span class="token number">5.</span> Rule<span class="token punctuation">.</span>parser<span class="token punctuation">.</span>dataUrlCondition
object <span class="token operator">=</span> <span class="token punctuation">{</span> maxSize number <span class="token operator">=</span> <span class="token number">8096</span> <span class="token punctuation">}</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> <span class="token punctuation">{</span> filename<span class="token punctuation">,</span> module <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> boolean
如果模块大小小于设置的maxSize值或者通过一个函数返回<span class="token boolean">true</span>，模块会作为一个base64注入到请求者中，否则会输出到目标目录下
<span class="token number">6.</span> Rule<span class="token punctuation">.</span>parser<span class="token punctuation">.</span>parse
如果 Rule<span class="token punctuation">.</span>type 被设置成 <span class="token string">&#39;json&#39;</span>，那么 Rules<span class="token punctuation">.</span>parser<span class="token punctuation">.</span>parse 选择可能会是一个方法，该方法实现自定义的逻辑，以解析模块的源和并将它转换成 JavaScript 对象。 它可能在没有特定加载器的时候，对将 toml<span class="token punctuation">,</span> yaml 和其它非 <span class="token constant">JSON</span> 文件导入成导入非常有用
<span class="token number">7.</span> Rule<span class="token punctuation">.</span>generator<span class="token punctuation">.</span>dataUrl
object <span class="token operator">=</span> <span class="token punctuation">{</span> encoding string <span class="token operator">=</span> <span class="token string">&#39;base64&#39;</span> <span class="token operator">|</span> <span class="token boolean">false</span><span class="token punctuation">,</span> mimetype string <span class="token operator">=</span> <span class="token keyword">undefined</span> <span class="token operator">|</span> <span class="token boolean">false</span> <span class="token punctuation">}</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">content<span class="token punctuation">,</span> <span class="token punctuation">{</span> filename<span class="token punctuation">,</span> module <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> string

<span class="token operator">-</span> encoding<span class="token operator">:</span> 当被设置为<span class="token string">&#39;base64&#39;</span>，模块源码会用 Baes64 算法 编码。设置 encoding 为 <span class="token boolean">false</span>，会禁用编码。
<span class="token operator">-</span> mimetype<span class="token operator">:</span> <span class="token function">为数据链接</span><span class="token punctuation">(</span>data <span class="token constant">URI</span><span class="token punctuation">)</span>设置的一个 mimetype 值。默认根据模块资源后缀设置

<span class="token number">8.</span> Rule<span class="token punctuation">.</span>generator<span class="token punctuation">.</span>filename
与output<span class="token punctuation">.</span>path和output<span class="token punctuation">.</span>assetModuleFilename相同，指定文件的生成路径，具有更高的优先级
<span class="token number">9.</span> Rule<span class="token punctuation">.</span>generator<span class="token punctuation">.</span>publicPath
与output<span class="token punctuation">.</span>publicPath相同，指定文件的publicPath，具有更高的优先级
<span class="token number">10.</span> Rule<span class="token punctuation">.</span>generator<span class="token punctuation">.</span>outputPath
将静态资源输出到相对于 <span class="token string">&#39;output.path&#39;</span> 的指定文件夹中。只有当 <span class="token string">&#39;publicPath&#39;</span> 被用来匹配文件夹结构时才会需要设置该配置
嵌套规则
<span class="token number">1.</span> oneOf
规则数组，当规则匹配时，只使用第一个匹配规则
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">oneOf</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">resourceQuery</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">inline</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// foo.css?inline</span>
            <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">&#39;url-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">resourceQuery</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">external</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// foo.css?external</span>
            <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">&#39;file-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">2.</span> Rule<span class="token punctuation">.</span>sideEffects
表明模块的哪一部分包含副作用
输出管理
输出管理用于指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」
处理模板文件
使用html<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin可以在打包过程中将默认的或指定的html模板输出到output中
dist清理
在output中配置clear为<span class="token boolean">true</span>，每次打包前，webpack根据配置的输出目录path进行清理之前的目录文件
配置选项
<span class="token number">1.</span> assetModuleFilename
string <span class="token operator">=</span> <span class="token string">&#39;[hash][ext][query]&#39;</span>
用于配置asset modules的输出文件名，优先级高于output<span class="token punctuation">.</span>filename
<span class="token number">2.</span> auxiliaryComment
string object
为库的输出容器中添加注释，如果是字符串，则为每种类型添加，如果是对象，为指定的库类型添加
<span class="token number">3.</span> chunkLoading
<span class="token boolean">false</span> <span class="token literal-property property">string</span><span class="token operator">:</span> <span class="token string">&#39;jsonp&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;import-scripts&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;require&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;async-node&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;import&#39;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>any string<span class="token operator">&gt;</span>
打包后加载chunk的方式，默认值有 <span class="token string">&#39;jsonp&#39;</span> <span class="token punctuation">(</span>web<span class="token punctuation">)</span>、<span class="token string">&#39;import&#39;</span> <span class="token punctuation">(</span><span class="token constant">ESM</span><span class="token punctuation">)</span>、<span class="token string">&#39;importScripts&#39;</span> <span class="token punctuation">(</span>WebWorker<span class="token punctuation">)</span>、<span class="token string">&#39;require&#39;</span> <span class="token punctuation">(</span>sync node<span class="token punctuation">.</span>js<span class="token punctuation">)</span>、<span class="token string">&#39;async-node&#39;</span> <span class="token punctuation">(</span><span class="token keyword">async</span> node<span class="token punctuation">.</span>js<span class="token punctuation">)</span>，还有其他值可由插件添加
<span class="token number">4.</span> clean
boolean <span class="token punctuation">{</span> dry<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span> keep<span class="token operator">?</span><span class="token operator">:</span> RegExp <span class="token operator">|</span> string <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">filename</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> boolean<span class="token punctuation">)</span> <span class="token punctuation">}</span>
打包之前删除清除输出目录或者输出目录下的某些文件
<span class="token number">5.</span> compareBeforeEmit
boolean <span class="token operator">=</span> <span class="token boolean">true</span>
告知 webpack 在写入到输出文件系统时检查输出的文件是否已经存在并且拥有相同内容，当在磁盘中已经存在有相同内容的文件时，webpack 将不会写入输出文件
<span class="token number">6.</span> crossOriginLoading
boolean <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token literal-property property">string</span><span class="token operator">:</span> <span class="token string">&#39;anonymous&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;use-credentials&#39;</span>
告诉 webpack 启用 cross<span class="token operator">-</span>origin 属性 加载 chunk。仅在 target 设置为 <span class="token string">&#39;web&#39;</span> 时生效，通过使用 <span class="token constant">JSONP</span> 来添加脚本标签，实现按需加载模块
<span class="token number">6.</span> filename
string <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">pathData<span class="token punctuation">,</span> assetInfo</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> string
此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output<span class="token punctuation">.</span>path 选项指定的目录下。
对于单个入口起点，filename 会是一个静态名称。
<span class="token function">当通过多个入口起点</span><span class="token punctuation">(</span>entry point<span class="token punctuation">)</span><span class="token function">、代码拆分</span><span class="token punctuation">(</span>code splitting<span class="token punctuation">)</span><span class="token function">或各种插件</span><span class="token punctuation">(</span>plugin<span class="token punctuation">)</span>创建多个 bundle，应该使用字符串占位来指定每个bundle的唯一名称
占位符包含：name、id、contenthash、fullhash、hash、chunkhash、ext
此选项被称为文件名，但还是可以使用像 <span class="token string">&#39;js/[name]/bundle.js&#39;</span> 这样的文件夹结构
<span class="token number">7.</span> chunkFilename
string <span class="token operator">=</span> <span class="token string">&#39;[id].js&#39;</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">pathData<span class="token punctuation">,</span> assetInfo</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> string
指定异步加载chunk的文件名
<span class="token number">8.</span> globalObject
string <span class="token operator">=</span> <span class="token string">&#39;self&#39;</span>
当输出为 library 时，尤其是当 libraryTarget 为 <span class="token string">&#39;umd&#39;</span>时，此选项将决定使用哪个全局对象来挂载 library。为了使 <span class="token constant">UMD</span> 构建在浏览器和 Node<span class="token punctuation">.</span>js 上均可用，应将 output<span class="token punctuation">.</span>globalObject 选项设置为 <span class="token string">&#39;this&#39;</span>。对于类似 web 的目标，默认为 self。
入口点的返回值将会使用 output<span class="token punctuation">.</span>library<span class="token punctuation">.</span>name 赋值给全局对象。依赖于 target 配置项，全局对象将会发生对应的改变，例如：self<span class="token punctuation">,</span> global 或者 globalThis
<span class="token number">9.</span> hashDigest
string <span class="token operator">=</span> <span class="token string">&#39;hex&#39;</span>
在生成 hash 时使用的编码方式
<span class="token number">10.</span> hashDigestLength
number <span class="token operator">=</span> <span class="token number">20</span>
散列摘要的前缀长度
<span class="token number">11.</span> library
从入口输出一个库

<span class="token operator">-</span> 如果你将 entry 设置为一个 array，那么只有数组中的最后一个会被暴露
<span class="token operator">-</span> 如果你将 entry 设置为一个 object，所以入口都可以通过 library 的 array 语法暴露
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// …</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">&#39;./src/a.js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token string">&#39;./src/b.js&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;[name]&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// name is a placeholder here</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">12.</span> library<span class="token punctuation">.</span>name
指定库的名称
<span class="token number">13.</span> library<span class="token punctuation">.</span>type
指定库的暴露方式，决定导出的变量如何挂载
string

<span class="token operator">-</span> <span class="token keyword">var</span>：声明为一个变量
<span class="token keyword">var</span> MyLibrary <span class="token operator">=</span> _entry_return_<span class="token punctuation">;</span>
<span class="token comment">// 在加载了 \`MyLibrary\` 的单独脚本中</span>
MyLibrary<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">-</span> <span class="token keyword">this</span>、self、global、window：挂在到对应对象下
<span class="token keyword">this</span><span class="token punctuation">[</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> _entry_return_<span class="token punctuation">;</span>
<span class="token comment">// 在一个单独的脚本中</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>MyLibrary<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
MyLibrary<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果 \`this\` 为 window 对象</span>

window<span class="token punctuation">[</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> _entry_return_<span class="token punctuation">;</span>
window<span class="token punctuation">.</span>MyLibrary<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

global<span class="token punctuation">[</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> _entry_return_<span class="token punctuation">;</span>
global<span class="token punctuation">.</span>MyLibrary<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">-</span> commonjs：赋值给exports对象
exports<span class="token punctuation">[</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> _entry_return_<span class="token punctuation">;</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

注意，不设置 output<span class="token punctuation">.</span>library<span class="token punctuation">.</span>name 将导致入口起点返回的所有属性都被赋值给给定的对象；不检查现有的属性名

<span class="token operator">-</span> commonjs2<span class="token operator">:</span>将入口返回值赋值给exports属性
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> _entry_return_<span class="token punctuation">;</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">-</span> umd：这将在所有模块定义下暴露你的库<span class="token punctuation">,</span> 允许它与 CommonJS、<span class="token constant">AMD</span> <span class="token function">和作为全局变量工作</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">webpackUniversalModuleDefinition</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> factory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> exports <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> module <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span>
    module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> define <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span> define<span class="token punctuation">.</span>amd<span class="token punctuation">)</span> <span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> exports <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span> exports<span class="token punctuation">[</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span> root<span class="token punctuation">[</span><span class="token string">&#39;MyLibrary&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>global<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> _entry_return_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token number">14.</span> library<span class="token punctuation">.</span>export
指定哪一个导出应该暴露为一个库，决定了导出的变量
<span class="token number">15.</span> library<span class="token punctuation">.</span>auxiliaryComment
在umd包装器中添加注释
<span class="token number">16.</span> path
打包结果的输出文件夹
<span class="token number">17.</span> pathinfo
在bundle中引入所包含模块信息的相关注释
<span class="token number">18.</span> publicPath
此选项指定在浏览器中所引用的「此输出目录对应的公开 <span class="token constant">URL</span>」
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// One of the below</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;auto&#39;</span><span class="token punctuation">,</span> <span class="token comment">// It automatically determines the public path from either \`i<wbr>mport.meta.url\`, \`document.currentScript\`, \`&lt;script /&gt;\` or \`self.location\`.</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;https://cdn.example.com/assets/&#39;</span><span class="token punctuation">,</span> <span class="token comment">// CDN（总是 HTTPS 协议）</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;//cdn.example.com/assets/&#39;</span><span class="token punctuation">,</span> <span class="token comment">// CDN（协议相同）</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;/assets/&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 相对于服务(server-relative)</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;assets/&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 相对于 HTML 页面</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;../assets/&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 相对于 HTML 页面</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 相对于 HTML 页面（目录相同）</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">在编译时</span><span class="token punctuation">(</span>compile time<span class="token punctuation">)</span>无法知道输出文件的 publicPath <span class="token function">的情况下，可以留空，然后在入口文件</span><span class="token punctuation">(</span>entry file<span class="token punctuation">)</span><span class="token function">处使用自由变量</span><span class="token punctuation">(</span>free variable<span class="token punctuation">)</span> <span class="token function">__webpack_public_path__，以便在运行时</span><span class="token punctuation">(</span>runtime<span class="token punctuation">)</span>进行动态设置。
__webpack_public_path__ <span class="token operator">=</span> myRuntimePublicPath<span class="token punctuation">;</span>

<span class="token comment">// 应用程序入口的其他部分</span>

<span class="token number">19.</span> module
以模块类型输出js文件，当启用时，webpack 会在内部将 output<span class="token punctuation">.</span>iife 设置为 <span class="token boolean">false</span>，将 output<span class="token punctuation">.</span>scriptType 为 <span class="token string">&#39;module&#39;</span>，并将 terserOptions<span class="token punctuation">.</span>module 设置为 <span class="token boolean">true</span>
如果你需要使用 webpack 构建一个库以供别人使用，当 output<span class="token punctuation">.</span>module 为 <span class="token boolean">true</span> 时，一定要将 output<span class="token punctuation">.</span>libraryTarget 设置为 <span class="token string">&#39;module&#39;</span>
开发环境
source<span class="token operator">-</span>map
source<span class="token operator">-</span>map用于打包文件与源码的映射
dev<span class="token operator">-</span>server
webpack<span class="token operator">-</span>dev<span class="token operator">-</span>server用于启动一个本地的服务器，插件打包后不会输出在工程目录中，服务启动后可以通过 <span class="token operator">&lt;</span>http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span><span class="token punctuation">[</span>devServer<span class="token punctuation">.</span>host<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token punctuation">[</span>devServer<span class="token punctuation">.</span>port<span class="token punctuation">]</span><span class="token operator">/</span><span class="token punctuation">[</span>output<span class="token punctuation">.</span>publicPath<span class="token punctuation">]</span><span class="token operator">/</span><span class="token punctuation">[</span>output<span class="token punctuation">.</span>filename<span class="token punctuation">]</span> 进行访问
dev<span class="token operator">-</span>server配置
<span class="token number">1.</span> allowedHosts
<span class="token string">&#39;auto&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;all&#39;</span> <span class="token punctuation">[</span>string<span class="token punctuation">]</span>
将允许访问开发服务器的服务列入白名单
<span class="token number">2.</span> client<span class="token punctuation">.</span>overlay
boolean <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token literal-property property">object</span><span class="token operator">:</span> <span class="token punctuation">{</span> errors boolean <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> warnings boolean <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
当出现编译错误或警告时，在浏览器中显示全屏覆盖
<span class="token number">3.</span> client<span class="token punctuation">.</span>progress
在浏览器中以百分比显示编译进度。
<span class="token number">4.</span> client<span class="token punctuation">.</span>reconnect
boolean <span class="token operator">=</span> <span class="token boolean">true</span> number
告诉 dev<span class="token operator">-</span>server 它应该尝试重新连接客户端的次数。当为 <span class="token boolean">true</span> 时，它将无限次尝试重新连接。
<span class="token number">5.</span> compress
启用gzip压缩
<span class="token number">6.</span> https
默认情况下，开发服务器将通过 <span class="token constant">HTTP</span> 提供服务。可以选择使用 <span class="token constant">HTTPS</span> 提供服务，默认使用自签名证书
也可以提供自己的证书
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">https</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">ca</span><span class="token operator">:</span> <span class="token string">&#39;./path/to/server.pem&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">pfx</span><span class="token operator">:</span> <span class="token string">&#39;./path/to/server.pfx&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;./path/to/server.key&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">cert</span><span class="token operator">:</span> <span class="token string">&#39;./path/to/server.crt&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">passphrase</span><span class="token operator">:</span> <span class="token string">&#39;webpack-dev-server&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">requestCert</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">7.</span> headers
array <span class="token keyword">function</span> object
为所有响应添加 headers
<span class="token number">8.</span> host
<span class="token string">&#39;local-ip&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;local-ipv4&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;local-ipv6&#39;</span> string
指定要使用的 host。如果你想让你的服务器可以被外部访问，像这样指定：
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;0.0.0.0&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">9.</span> hot
<span class="token string">&#39;only&#39;</span> boolean <span class="token operator">=</span> <span class="token boolean">true</span>
启用 webpack 的 热模块替换 特性
启用热模块替换功能，在构建失败时不刷新页面作为回退，使用 hot<span class="token operator">:</span> <span class="token string">&#39;only&#39;</span>
<span class="token number">10.</span> open
告诉 dev<span class="token operator">-</span>server 在服务器已经启动后打开浏览器。设置其为 <span class="token boolean">true</span> 以打开你的默认浏览器
<span class="token number">11.</span> Port
指定监听的端口号
<span class="token number">12.</span> proxy
代理某些url，webpack<span class="token operator">-</span>dev<span class="token operator">-</span>serve使用http<span class="token operator">-</span>proxy<span class="token operator">-</span>middleware进行代理，http<span class="token operator">-</span>proxy<span class="token operator">-</span>middleware 的某些功能不需要target键，例如 它的 router 功能，但是仍然需要在此处的配置中包含target，否则webpack<span class="token operator">-</span>dev<span class="token operator">-</span>server 不会将其传递给 http<span class="token operator">-</span>proxy<span class="token operator">-</span>middleware

<span class="token operator">-</span> target：目标服务器
<span class="token operator">-</span> pathRewrite：重写请求路径
<span class="token operator">-</span> secure：默认情况下，将不接受在 <span class="token constant">HTTPS</span> 上运行且证书无效的后端服务器。 如果需要，配置<span class="token boolean">false</span>
<span class="token operator">-</span> changeOrigin：默认情况下，会保留主机头的来源，可以设置为<span class="token boolean">true</span>来覆盖此行为

有时不想代理所有内容。 可以基于函数的返回值绕过代理。
在该功能中，可以访问请求，响应和代理选项。

<span class="token operator">-</span> 返回 <span class="token keyword">null</span> 或 <span class="token keyword">undefined</span> 以继续使用代理处理请求。
<span class="token operator">-</span> 返回 <span class="token boolean">false</span> 会为请求产生 <span class="token number">404</span> 错误。
<span class="token operator">-</span> 返回提供服务的路径，而不是继续代理请求。
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:3000&#39;</span><span class="token punctuation">,</span>
        <span class="token function-variable function">bypass</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> proxyOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>accept<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;html&#39;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Skipping proxy for browser request.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token string">&#39;/index.html&#39;</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

如果想将多个特定路径代理到同一目标，则可以使用一个或多个带有 context 属性的对象的数组
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">context</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;/auth&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/api&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:3000&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">13.</span> <span class="token keyword">static</span>
boolean string object <span class="token punctuation">[</span>string<span class="token punctuation">,</span> object<span class="token punctuation">]</span>
该配置项允许配置从目录提供静态文件的选项（默认是 <span class="token string">&#39;public&#39;</span> 文件夹）。将其设置为 <span class="token boolean">false</span> 以禁用
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

监听单个目录：
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;assets&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

监听多个进后台资源目录：
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;assets&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">14.</span> <span class="token keyword">static</span><span class="token punctuation">.</span>directory
string <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;public&#39;</span><span class="token punctuation">)</span>
告诉服务器从哪里提供内容。只有在你希望提供静态文件时才需要这样做。<span class="token keyword">static</span><span class="token punctuation">.</span>publicPath 将会被用来决定应该从哪里提供 bundle，并具有优先级
<span class="token number">15.</span> <span class="token keyword">static</span><span class="token punctuation">.</span>publicPath
告诉服务器在哪个 <span class="token constant">URL</span> 上提供 <span class="token keyword">static</span><span class="token punctuation">.</span>directory 的内容。例如为在 <span class="token operator">/</span>serve<span class="token operator">-</span><span class="token keyword">public</span><span class="token operator">-</span>path<span class="token operator">-</span>url<span class="token operator">/</span>manifest<span class="token punctuation">.</span>json 中的 assets<span class="token operator">/</span>manifest<span class="token punctuation">.</span>json 提供服务<span class="token punctuation">,</span>可以接受一个对象数组
<span class="token number">16.</span> <span class="token keyword">static</span><span class="token punctuation">.</span>serveIndex
告诉开发服务器启用后使用 serveIndex 中间件。
serveIndex 中间件会在查看没有 index<span class="token punctuation">.</span>html 文件的目录时生成目录列表
<span class="token number">17.</span> <span class="token keyword">static</span><span class="token punctuation">.</span>watch
通过 <span class="token keyword">static</span><span class="token punctuation">.</span>directory 配置项告诉 dev<span class="token operator">-</span>server 监听文件。默认启用，文件更改将触发整个页面重新加载。可以通过将 watch 设置为 <span class="token boolean">false</span> 禁用

代码分割
代码分割能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间
入口
入口分离是在配置文件中配置多个入口，从每个入口开始打包成不同的bundle
缺陷：无法去除重复的模块
分离重复的模块。
动态导入
webpack可以识别<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span>语法，将模块导入到单独的文件中
预获取与预加载
在声明 <span class="token keyword">import</span> 时，使用内置指令webpackPrefetch或webpackPreload，可以让 webpack 输出 <span class="token string">&quot;resource hint(资源提示)&quot;</span>，来告知浏览器
与 prefetch 指令相比，preload 指令有许多不同之处：

<span class="token operator">-</span> preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
<span class="token operator">-</span> preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
<span class="token operator">-</span> preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
<span class="token operator">-</span> 浏览器支持程度不同。
splitChunksPlugin
SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
默认情况下，它只会影响到按需加载的 chunks，因为修改 initial chunks 会影响到项目的 <span class="token constant">HTML</span> 文件中的脚本标签。
webpack 将根据以下条件自动拆分 chunks，主要根据体积、共享或来自node_ modules、并行加载数量三个方面：
<span class="token operator">-</span> 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
<span class="token operator">-</span> 新的 chunk 体积大于 20kb（在进行 min<span class="token operator">+</span>gz 之前的体积）
<span class="token operator">-</span> 当按需加载 chunks 时，并行请求的最大数量小于或等于 <span class="token number">30</span>
<span class="token operator">-</span> 当加载初始化页面时，并发请求的最大数量小于或等于 <span class="token number">30</span>
当尝试满足最后两个条件时，最好使用较大的 chunks。

<span class="token number">1.</span> automaticNameDelimiter
默认情况下，webpack 将使用 chunk 的来源和名称生成名称（例如 vendors<span class="token operator">~</span>main<span class="token punctuation">.</span>js）。此选项使你可以指定用于生成名称的分隔符
<span class="token number">2.</span> chunks
这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，<span class="token keyword">async</span> 和 initial。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享
<span class="token number">3.</span> maxAsyncRequests
按需加载时的最大并行请求数量
<span class="token number">4.</span> maxInitialRequests
入口点的最大并行请求数
<span class="token number">5.</span> minChunks
拆分前必须共享模块的最小 chunks 数
<span class="token number">6.</span> minSize
number <span class="token operator">=</span> <span class="token number">20000</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>index<span class="token operator">:</span> string<span class="token punctuation">]</span><span class="token operator">:</span> number <span class="token punctuation">}</span>
<span class="token number">7.</span> minSizeReduction
生成 chunk 所需的主 chunk（bundle）的最小体积（以字节为单位）缩减。这意味着如果分割成一个 chunk 并没有减少主 chunk（bundle）的给定字节数，它将不会被分割，即使它满足 splitChunks<span class="token punctuation">.</span>minSize。
为了生成 chunk，splitChunks<span class="token punctuation">.</span>minSizeReduction 与 splitChunks<span class="token punctuation">.</span>minSize 都需要被满足。
<span class="token number">8.</span> maxSize
）告诉 webpack 尝试将大于 maxSize 个字节的 chunk 分割成较小的部分。 这些较小的部分在体积上至少为 minSize（仅次于 maxSize）。 该算法是确定性的，对模块的更改只会产生局部影响。这样，在使用长期缓存时就可以使用它并且不需要记录。maxSize 只是一个提示，当模块大于 maxSize 或者拆分不符合 minSize 时可能会被违反。
当 chunk 已经有一个名称时，每个部分将获得一个从该名称派生的新名称。 根据 optimization<span class="token punctuation">.</span>splitChunks<span class="token punctuation">.</span>hidePathInfo 的值，它将添加一个从第一个模块名称或其哈希值派生的密钥。
maxSize 选项旨在与 <span class="token constant">HTTP</span><span class="token operator">/</span><span class="token number">2</span> 和长期缓存一起使用。它增加了请求数量以实现更好的缓存。它还可以用于减小文件大小，以加快二次构建速度

<span class="token operator">-</span> 设置 maxSize 的值会同时设置 maxAsyncSize 和 maxInitialSize 的值
<span class="token operator">-</span> maxInitialSize 仅会影响初始加载 chunks，maxAsyncSize 仅会影响按需加载 chunk
<span class="token operator">-</span> maxSize 比 maxInitialRequest<span class="token operator">/</span>maxAsyncRequests 具有更高的优先级。实际优先级是 maxInitialRequest<span class="token operator">/</span>maxAsyncRequests <span class="token operator">&lt;</span> maxSize <span class="token operator">&lt;</span> minSize

<span class="token number">9.</span> usedExports
弄清哪些 <span class="token keyword">export</span> 被模块使用，以混淆 <span class="token keyword">export</span> 名称，省略未使用的 <span class="token keyword">export</span>，并生成有效的代码。 当它为 <span class="token boolean">true</span> 时：分析每个运行时使用的出口，当它为 <span class="token string">&quot;global&quot;</span> 时：分析所有运行时的全局 <span class="token keyword">export</span> 组合）
<span class="token number">10.</span> cacheGroups
缓存组可以继承和<span class="token operator">/</span>或覆盖来自 splitChunks<span class="token punctuation">.</span><span class="token operator">*</span> 的任何选项。但是 test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置。将它们设置为 <span class="token boolean">false</span>以禁用任何默认缓存组
<span class="token number">11.</span> cacheGroup<span class="token punctuation">.</span>reuseExistingChunk
如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块。这可能会影响 chunk 的结果文件名
<span class="token number">12.</span> cacheGroup<span class="token punctuation">.</span>priority
一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。默认组的优先级为负，以允许自定义组获得更高的优先级（自定义组的默认值为 <span class="token number">0</span>）
<span class="token number">13.</span> cacheGroup<span class="token punctuation">.</span>test
<span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module<span class="token punctuation">,</span> <span class="token punctuation">{</span> chunkGraph<span class="token punctuation">,</span> moduleGraph <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> boolean RegExp string
控制此缓存组选择的模块。省略它会选择所有模块。它可以匹配绝对模块资源路径或 chunk 名称。匹配 chunk 名称时，将选择 chunk 中的所有模块
<span class="token number">14.</span> cacheGroup<span class="token punctuation">.</span>filename
string <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">pathData<span class="token punctuation">,</span> assetInfo</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> string
仅在初始 chunk 时才允许覆盖文件名。 也可以在 output<span class="token punctuation">.</span>filename 中使用所有占位符
通过提供以文件名开头的路径 <span class="token string">&#39;js/vendor/bundle.js&#39;</span>，可以创建文件夹结构
<span class="token number">15.</span> cacheGroup<span class="token punctuation">.</span>enforce
告诉 webpack 忽略 splitChunks<span class="token punctuation">.</span>minSize、splitChunks<span class="token punctuation">.</span>minChunks、splitChunks<span class="token punctuation">.</span>maxAsyncRequests 和 splitChunks<span class="token punctuation">.</span>maxInitialRequests 选项，并始终为此缓存组创建 chunk

环境变量
webpack 命令行 环境配置 的 <span class="token operator">--</span>env 参数，可以允许你传入任意数量的环境变量。而在 webpack<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js 中可以访问到这些环境变量
npx webpack <span class="token operator">--</span>env goal<span class="token operator">=</span>local <span class="token operator">--</span>env production <span class="token operator">--</span>progress

此时配置文件需要导出一个接受env为参数并返回配置对象的函数
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">env</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// Use env.&lt;YOUR VARIABLE&gt; here:</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Goal: &#39;</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span>goal<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#39;local&#39;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Production: &#39;</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span>production<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

指定mode
指定 mode 会自动地配置 DefinePlugin

<span class="token constant">NODE_ENV</span>
技术上讲，<span class="token constant">NODE_ENV</span> 是一个由 Node<span class="token punctuation">.</span>js <span class="token function">暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境</span><span class="token punctuation">(</span>dev<span class="token operator">-</span>vs<span class="token operator">-</span>prod<span class="token punctuation">)</span>下，server <span class="token function">tools</span><span class="token punctuation">(</span>服务期工具<span class="token punctuation">)</span>、build <span class="token function">scripts</span><span class="token punctuation">(</span>构建脚本<span class="token punctuation">)</span> 和 client<span class="token operator">-</span>side <span class="token function">libraries</span><span class="token punctuation">(</span>客户端库<span class="token punctuation">)</span> 的行为。然而，与预期相反，在构建脚本 webpack<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js 中 process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> 并没有被设置为 <span class="token string">&quot;production&quot;</span>，因此，在 webpack 配置文件中，process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;[name].[contenthash].bundle.js&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;[name].bundle.js&#39;</span> 这样的条件语句，无法按照预期运行。但是在开发人员源代码中，同样是可以使用环境变量的
构建性能
通用环境

<span class="token number">1.</span> 版本：尽量使用最新版本的node和webpack
<span class="token number">2.</span> loader：将loader用在尽量少的模块中
<span class="token number">3.</span> 解析： 尽量通过配置提高解析速度

<span class="token operator">-</span> 减少 resolve<span class="token punctuation">.</span>modules<span class="token punctuation">,</span> resolve<span class="token punctuation">.</span>extensions<span class="token punctuation">,</span> resolve<span class="token punctuation">.</span>mainFiles<span class="token punctuation">,</span> resolve<span class="token punctuation">.</span>descriptionFiles 中条目数量，因为他们会增加文件系统调用的次数。
<span class="token operator">-</span> 如果你不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve<span class="token punctuation">.</span>symlinks<span class="token operator">:</span> <span class="token boolean">false</span>。
<span class="token operator">-</span> 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 resolve<span class="token punctuation">.</span>cacheWithContext<span class="token operator">:</span> <span class="token boolean">false</span>。

<span class="token number">4.</span> dll： 为更改不频繁的代码使用dllplugin生成单独的编译结果，但是也增加了构建过成功的复杂度
<span class="token number">5.</span> 使chunk较小： 尽量保证更小更少的chunk，移除未引用的代码，只编译当前源码
<span class="token number">6.</span> worker池： 使用thread<span class="token operator">-</span>loader将非常消耗资源的loader分流给一个工作池
开发环境
<span class="token number">1.</span> 增量编译： 使用 webpack 的 watch <span class="token function">mode</span><span class="token punctuation">(</span>监听模式<span class="token punctuation">)</span>。而不使用其他工具来 watch 文件和调用 webpack 。内置的 watch mode 会记录时间戳并将此信息传递给 compilation 以使缓存失效。在某些配置环境中，watch mode 会回退到 poll <span class="token function">mode</span><span class="token punctuation">(</span>轮询模式<span class="token punctuation">)</span>。监听许多文件会导致 <span class="token constant">CPU</span> 大量负载。在这些情况下，可以使用 watchOptions<span class="token punctuation">.</span>poll 来增加轮询的间隔时间。
<span class="token number">2.</span> 在内存中编译： 使用webpack<span class="token operator">-</span>dev<span class="token operator">-</span>serve通过在内存中编译而不写入磁盘
<span class="token number">3.</span> 使用合理的devtool： 在大多数情况下，最佳选择是 eval<span class="token operator">-</span>cheap<span class="token operator">-</span>module<span class="token operator">-</span>source<span class="token operator">-</span>map
<span class="token number">4.</span> 避免使用在生产环境中使用的工具： 一些代码压缩和混淆破坏的plugin和loader一般是为生产环境打包时才会用到，在开发环境下应避免使用这些工具
<span class="token number">5.</span> 避免额外的优化步骤： 在生产环境中可能需要执行额外的算法任务，来优化输出结果和性能，在开发环境中这种优化不是很有必要
<span class="token number">6.</span> 输出结果不携带路径信息： Webpack 会在输出的 bundle 中生成路径信息。然而，在打包数千个模块的项目中，这会导致造成垃圾回收性能压力。在 options<span class="token punctuation">.</span>output<span class="token punctuation">.</span>pathinfo 设置中关闭
生产环境
<span class="token number">1.</span> 使用较为合理的sourceMap： sourceMap相当耗费资源，生产环境中可以适当取消生成sourceMap
tree<span class="token operator">-</span>shaking
tree<span class="token operator">-</span>shaking可以帮助我们不对未使用的代码进行打包，减小构建结果的体积
tree<span class="token operator">-</span>shaking的实现依赖于es6的静态应用，也就是<span class="token keyword">import</span>和<span class="token keyword">export</span>，结合配置中optimization<span class="token punctuation">.</span>usedExports和<span class="token keyword">package</span><span class="token punctuation">.</span>json中的sideEffects，对未使用的代码进行删除
<span class="token string">&quot;side effect(副作用)&quot;</span> 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 <span class="token keyword">export</span> 或多个 <span class="token keyword">export</span>
所有导入文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css<span class="token operator">-</span>loader 并 <span class="token keyword">import</span> 一个 <span class="token constant">CSS</span> 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除
tree<span class="token operator">-</span>shaking与sideEffects
sideEffects 更为有效 是因为它允许跳过整个模块<span class="token operator">/</span>文件和整个文件子树。
usedExports 依赖于 terser 去检测语句中的副作用（代码分析）。它是一个 JavaScript 任务而且没有像 sideEffects 一样简单直接。而且它不能跳转子树<span class="token operator">/</span>依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（<span class="token constant">HOC</span>）在这种情况下是会出问题的
在使用 tree shaking 时必须有 ModuleConcatenationPlugin 的支持，您可以通过设置配置项 mode<span class="token operator">:</span> <span class="token string">&quot;production&quot;</span> 以启用它。如果您没有如此做，请记得手动引入 ModuleConcatenationPlugin
shimming
预置全局变量
预置全局变量可以在编写模块代码的过程中，不必显式得引入模块变量，这需要使用到providePlugin
 <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

 module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">,</span>
   <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;main.js&#39;</span><span class="token punctuation">,</span>
     <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProvidePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">_</span><span class="token operator">:</span> <span class="token string">&#39;lodash&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
 <span class="token punctuation">}</span><span class="token punctuation">;</span>

这样，在模块任何地方使用到_时，webpack就会将lodash包引入并提供给需要使用的模块
还可以使用 ProvidePlugin 暴露出某个模块中单个导出，通过配置一个“数组路径”（例如 <span class="token punctuation">[</span>module<span class="token punctuation">,</span> child<span class="token punctuation">,</span> <span class="token operator">...</span>children<span class="token operator">?</span><span class="token punctuation">]</span>）实现此功能。所以，我们假想如下，无论 join 方法在何处调用，我们都只会获取到 lodash 中提供的 join 方法
修改<span class="token keyword">this</span>指向
通过使用 imports<span class="token operator">-</span>loader可以覆盖 <span class="token keyword">this</span> 指向
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">&#39;imports-loader?wrapper=window&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

optimization

<span class="token number">1.</span> chunkIds
boolean <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token literal-property property">string</span><span class="token operator">:</span> <span class="token string">&#39;natural&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;named&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;size&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;total-size&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;deterministic&#39;</span>
告知 webpack 当选择模块 id 时需要使用哪种算法。将 optimization<span class="token punctuation">.</span>chunkIds 设置为 <span class="token boolean">false</span> 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。optimization<span class="token punctuation">.</span>chunkIds 的默认值是 <span class="token boolean">false</span>：

<span class="token operator">-</span> 如果环境是开发环境，那么 optimization<span class="token punctuation">.</span>chunkIds 会被设置成 <span class="token string">&#39;named&#39;</span>，但当在生产环境中时，它会被设置成 <span class="token string">&#39;deterministic&#39;</span>
<span class="token operator">-</span> 如果上述的条件都不符合<span class="token punctuation">,</span> optimization<span class="token punctuation">.</span>chunkIds 会被默认设置为 <span class="token string">&#39;natural&#39;</span>
无法复制加载中的内容

<span class="token number">2.</span> emitOnErrors
boolean <span class="token operator">=</span> <span class="token boolean">false</span>
使用 optimization<span class="token punctuation">.</span>emitOnErrors 在编译时每当有错误时，就会发送静态资源。这样可以确保出错的静态资源被发送出来。关键错误会被发送到生成的代码中，并会在运行时报错
<span class="token number">3.</span> flagIncludedChunks
告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。optimization<span class="token punctuation">.</span>flagIncludedChunks 默认会在 production 模式 中启用，其他情况禁用
<span class="token number">4.</span> innerGraph
optimization<span class="token punctuation">.</span>innerGraph 告知 webpack <span class="token function">是否对未使用的导出内容，实施内部图形分析</span><span class="token punctuation">(</span>graph analysis<span class="token punctuation">)</span>
<span class="token number">5.</span> mergeDuplicateChunks
告知 webpack 合并含有相同模块的 chunk。将 optimization<span class="token punctuation">.</span>mergeDuplicateChunks 设置为 <span class="token boolean">false</span> 以禁用这项优化
<span class="token number">6.</span> minimize
告知 webpack 使用 TerserPlugin 或其它在 optimization<span class="token punctuation">.</span>minimizer定义的插件压缩 bundle
<span class="token number">7.</span> minimizer
<span class="token punctuation">[</span>TerserPlugin<span class="token punctuation">]</span> 或 <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
允许你通过提供一个或多个定制过的 TerserPlugin <span class="token function">实例，覆盖默认压缩工具</span><span class="token punctuation">(</span>minimizer<span class="token punctuation">)</span>
<span class="token keyword">const</span> TerserPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;terser-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">parallel</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">terserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">// &lt;https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions&gt;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

或，使用函数的形式：
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> TerserPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;terser-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token comment">/*你的配置*/</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

在 optimization<span class="token punctuation">.</span>minimizer 中可以使用 <span class="token string">&#39;...&#39;</span> 来访问默认值。
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CssMinimizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;...&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">8.</span> moduleIds
<span class="token literal-property property">boolean</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token literal-property property">string</span><span class="token operator">:</span> <span class="token string">&#39;natural&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;named&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;deterministic&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;size&#39;</span>
告知 webpack 当选择模块 id 时需要使用哪种算法。将 optimization<span class="token punctuation">.</span>moduleIds 设置为 <span class="token boolean">false</span> 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。
<span class="token literal-property property">下述选项字符串值均未被支持</span><span class="token operator">:</span>
无法复制加载中的内容
<span class="token number">9.</span> nodeEnv
boolean <span class="token operator">=</span> <span class="token boolean">false</span> string
告知 webpack 将 process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> 设置为一个给定字符串。如果 optimization<span class="token punctuation">.</span>nodeEnv 不是 <span class="token boolean">false</span>，则会使用 DefinePlugin，optimization<span class="token punctuation">.</span>nodeEnv 默认值取决于 mode，如果为 falsy 值，则会回退到 <span class="token string">&quot;production&quot;</span>。
可能的值：

<span class="token operator">-</span> 任何字符串：用于设置 process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> 的值。
<span class="token operator">-</span> <span class="token boolean">false</span>：不修改<span class="token operator">/</span>设置 process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span>的值。

<span class="token number">10.</span> removeEmptyChunks
如果 chunk 为空，告知 webpack 检测或移除这些 chunk。将 optimization<span class="token punctuation">.</span>removeEmptyChunks 设置为 <span class="token boolean">false</span> 以禁用这项优化
<span class="token number">11.</span> runtimeChunk
object string boolean
默认值是 <span class="token boolean">false</span>：每个入口 chunk 中直接嵌入 runtime，将 optimization<span class="token punctuation">.</span>runtimeChunk 设置为 <span class="token boolean">true</span> 或 <span class="token string">&#39;multiple&#39;</span>，会为每个入口添加一个只含有 runtime 的额外 chunk，值 <span class="token string">&quot;single&quot;</span> 会创建一个在所有生成 chunk 之间共享的运行时文件
<span class="token number">12.</span> sideEffects
boolean <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token literal-property property">string</span><span class="token operator">:</span> <span class="token string">&#39;flag&#39;</span>
告知 webpack 去辨识 <span class="token keyword">package</span><span class="token punctuation">.</span>json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块
<span class="token number">13.</span> splitChunks
对于动态导入模块，默认使用 webpack v4<span class="token operator">+</span> <span class="token function">提供的全新的通用分块策略</span><span class="token punctuation">(</span>common chunk strategy<span class="token punctuation">)</span>
<span class="token number">14.</span> usedExports
告知 webpack 去决定每个模块使用的导出内容。这取决于 optimization<span class="token punctuation">.</span>providedExports 选项。由 optimization<span class="token punctuation">.</span>usedExports 收集的信息会被其它优化手段或者代码生成使用，比如未使用的导出内容不会被生成，当所有的使用都适配，导出名称会被处理做单个标记字符。 在压缩工具中的无用代码清除会受益于该选项，而且能够去除未使用的导出内容
<span class="token number">15.</span> providedExports
告知 webpack 去确定那些由模块提供的导出内容，为 <span class="token keyword">export</span> <span class="token operator">*</span> from <span class="token operator">...</span> 生成更多高效的代码。默认 optimization<span class="token punctuation">.</span>providedExports 会被启用
performance
<span class="token number">1.</span> assetFilter
<span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">assetFilename</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> boolean
此属性允许 webpack 控制用于计算性能提示的文件
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">performance</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 控制只提示js类型的文件</span>
    <span class="token function-variable function">assetFilter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">assetFilename</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> assetFilename<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">2.</span> hints
string <span class="token operator">=</span> <span class="token string">&#39;warning&#39;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;warning&#39;</span> <span class="token literal-property property">boolean</span><span class="token operator">:</span> <span class="token boolean">false</span>
打开或关闭提示，指定提示的类型
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">performance</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">hints</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">// 不提示</span>
    <span class="token literal-property property">hints</span><span class="token operator">:</span> <span class="token string">&#39;warning&#39;</span> <span class="token comment">// 提示警告类型</span>
    <span class="token literal-property property">hints</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span> <span class="token comment">// 提示错误类型</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">3.</span> maxAssetSize
<span class="token function">资源</span><span class="token punctuation">(</span>asset<span class="token punctuation">)</span>是从 webpack <span class="token function">生成的任何文件。此选项根据单个资源体积</span><span class="token punctuation">(</span>单位<span class="token operator">:</span> bytes<span class="token punctuation">)</span>，控制 webpack 何时生成性能提示
<span class="token number">4.</span> maxEntrypointSize
<span class="token function">入口起点表示针对指定的入口，对于所有资源，要充分利用初始加载时</span><span class="token punctuation">(</span>initial load time<span class="token punctuation">)</span>期间。此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示
模块方法
<span class="token constant">ES6</span>
<span class="token number">1.</span> <span class="token keyword">import</span>（）
动态加载模块，调用 <span class="token keyword">import</span> 的之处，被视为分割点，意思是，被请求的模块和它引用的所有子模块，会分割到一个单独的 chunk 中
不能使用完全动态的 <span class="token keyword">import</span> 语句，例如 <span class="token keyword">import</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>。是因为 foo 可能是系统或项目中任何文件的任何路径。
<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 必须至少包含一些关于模块的路径信息。打包可以限定于一个特定的目录或文件集，以便于在使用动态表达式时 <span class="token operator">-</span> 包括可能在 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 调用中请求的每个模块。例如， <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">./locale/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>language<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.json</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span> 会把 <span class="token punctuation">.</span>locale 目录中的每个 <span class="token punctuation">.</span>json 文件打包到新的 chunk 中。在运行时，计算完变量 language 后，就可以使用像 english<span class="token punctuation">.</span>json 或 german<span class="token punctuation">.</span>json 的任何文件。
<span class="token comment">// 想象我们有一个从 cookies 或其他存储中获取语言的方法</span>
<span class="token keyword">const</span> language <span class="token operator">=</span> <span class="token function">detectVisitorLanguage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">./locale/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>language<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.json</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// do something with the translations</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token number">2.</span> 魔法注释
通过在 <span class="token keyword">import</span> 中添加注释，我们可以进行诸如给 chunk 命名或选择不同模式的操作
<span class="token literal-property property">webpackChunkName</span><span class="token operator">:</span> 新 chunk 的名称。 从 webpack <span class="token number">2.6</span><span class="token number">.0</span> 开始，占位符 <span class="token punctuation">[</span>index<span class="token punctuation">]</span> 和 <span class="token punctuation">[</span>request<span class="token punctuation">]</span> 分别支持递增的数字或实际的解析文件名。 添加此注释后，将单独的给我们的 chunk 命名为 <span class="token punctuation">[</span>my<span class="token operator">-</span>chunk<span class="token operator">-</span>name<span class="token punctuation">]</span><span class="token punctuation">.</span>js 而不是 <span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">.</span>js。
webpackMode：从 webpack <span class="token number">2.6</span><span class="token number">.0</span> 开始，可以指定以不同的模式解析动态导入。支持以下选项：

<span class="token operator">-</span> <span class="token string">&#39;lazy&#39;</span> <span class="token punctuation">(</span>默认值<span class="token punctuation">)</span>：为每个 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 导入的模块生成一个可延迟加载（lazy<span class="token operator">-</span>loadable）的 chunk。
<span class="token operator">-</span> <span class="token string">&#39;lazy-once&#39;</span>：生成一个可以满足所有 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 调用的单个可延迟加载（lazy<span class="token operator">-</span>loadable）的 chunk。此 chunk 将在第一次 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 时调用时获取，随后的 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 则使用相同的网络响应。注意，这种模式仅在部分动态语句中有意义，例如 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">./locales/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>language<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.json</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>，其中可能含有多个被请求的模块路径。
<span class="token operator">-</span> <span class="token string">&#39;eager&#39;</span>：不会生成额外的 chunk。所有的模块都被当前的 chunk 引入，并且没有额外的网络请求。但是仍会返回一个 resolved 状态的 Promise。与静态导入相比，在调用 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 完成之前，该模块不会被执行。
<span class="token operator">-</span> <span class="token string">&#39;weak&#39;</span>：尝试加载模块，如果该模块函数已经以其他方式加载，（即另一个 chunk 导入过此模块，或包含模块的脚本被加载）。仍会返回 Promise， 但是只有在客户端上已经有该 chunk 时才会成功解析。如果该模块不可用，则返回 rejected 状态的 Promise，且网络请求永远都不会执行。当需要的 chunks 始终在（嵌入在页面中的）初始请求中手动提供，而不是在应用程序导航在最初没有提供的模块导入的情况下触发，这对于通用渲染（<span class="token constant">SSR</span>）是非常有用的。
webpackPrefetch：告诉浏览器将来可能需要该资源来进行某些导航跳转。
webpackPreload：告诉浏览器在当前导航期间可能需要该资源。
注意：所有选项都可以像这样组合 <span class="token comment">/*webpackMode: &quot;lazy-once&quot;, webpackChunkName: &quot;all-i18n-data&quot;*/</span>。这会按没有花括号的 <span class="token constant">JSON5</span> 对象去解析。它会被包裹在 JavaScript 对象中，并使用 node <span class="token constant">VM</span> 执行。所以你不需要添加花括号。

webpackInclude：在导入解析（<span class="token keyword">import</span> resolution）过程中，用于匹配的正则表达式。只有匹配到的模块才会被打包。
webpackExclude：在导入解析（<span class="token keyword">import</span> resolution）过程中，用于匹配的正则表达式。所有匹配到的模块都不会被打包。

<span class="token literal-property property">webpackExports</span><span class="token operator">:</span> 告知 webpack 只构建指定出口的动态 <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 模块。它可以减小 chunk 的大小。从 webpack <span class="token number">5.0</span><span class="token number">.0</span><span class="token operator">-</span>beta<span class="token punctuation">.</span><span class="token number">18</span> 起可用。
<span class="token keyword">import</span><span class="token punctuation">(</span>
  <span class="token comment">/*webpackInclude: /\\.json$/*/</span>
  <span class="token comment">/*webpackExclude: /\\.noimport\\.json$/*/</span>
  <span class="token comment">/*webpackChunkName: &quot;my-chunk-name&quot;*/</span>
  <span class="token comment">/*webpackMode: &quot;lazy&quot;*/</span>
  <span class="token comment">/*webpackPrefetch: true*/</span>
  <span class="token comment">/*webpackPreload: true*/</span>
  <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">./locale/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>language<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

Webpack

<span class="token number">1.</span> require<span class="token punctuation">.</span>context
require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span>directory<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>includeSubdirs<span class="token operator">:</span> Boolean<span class="token punctuation">)</span> <span class="token comment">/*可选的，默认值是 true*/</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>filter<span class="token operator">:</span> RegExp<span class="token punctuation">)</span> <span class="token comment">/*可选的，默认值是 /^\\.\\/.*$/，所有文件 */</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>mode<span class="token operator">:</span> String<span class="token punctuation">)</span>  <span class="token comment">/* 可选的， &#39;sync&#39; | &#39;eager&#39; | &#39;weak&#39; | &#39;lazy&#39; | &#39;lazy-once&#39;，默认值是 &#39;sync&#39; */</span>
<span class="token punctuation">)</span>

创建模块上下文，返回具有三个属性的函数

<span class="token operator">-</span> resolve：是一个函数，它返回 request 被解析后得到的模块 id。
<span class="token operator">-</span> keys：也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
<span class="token operator">-</span> id：是上下文模块里面所包含的模块 id<span class="token punctuation">.</span> 它可能在你使用 module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span>accept 的时候被用到
使用返回的函数可以加载模块
runtime
manifest
tapable
tapable提供了一个订阅发布中心，支持同步<span class="token operator">/</span>异步、并行<span class="token operator">/</span>串行执行订阅的事件回调
hook分类

<span class="token number">1.</span> 同步hook
SyncHook：串行执行回调，忽略每个事件函数的返回值
SyncBailHook：保险类型，当其中一个事件函数返回非<span class="token keyword">undefined</span>，中断后面事件函数的执行SyncWaterfallHook：瀑布类型，前面事件函数执行后的非<span class="token keyword">undefined</span>会传递后面的事件函数，如果事件函数接收多个参数，只能替换第一个参数
SyncLoopHook：循环类型，如果其中一个事件函数返回非<span class="token keyword">undefined</span>，将从头执行事件函数
<span class="token number">2.</span> 异步串行hook
AsyncSeriesHook：callAsync和promise中的回调函数无法获取到参数
AsyncSeriesBailHook
AsyncSeriesWaterfalHook：可获取回调或者promise中的值
<span class="token number">3.</span> 异步并行Hook
AsyncParallelHook、AsyncParallelBailHook
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[t];function l(i,c){return s(),a("div",null,o)}const r=n(e,[["render",l],["__file","config.html.vue"]]);export{r as default};
