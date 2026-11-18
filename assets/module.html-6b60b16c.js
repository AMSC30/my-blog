import{_ as n,p as s,q as a,Y as p}from"./framework-e1bed10d.js";const t={},e=p(`<h1 id="js模块化" tabindex="-1"><a class="header-anchor" href="#js模块化" aria-hidden="true">#</a> JS模块化</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>模块化本质上是一种提高开发效率的技术方案
js的诞生之初，只是用于页面动画和表单提交这些简单逻辑，并没有模块化和命名空间的概念

优点：
<span class="token operator">-</span> 有效避免全局变量污染
<span class="token operator">-</span> 有利于按需加载
<span class="token operator">-</span> 提高代码的可复用和可维护性
没有模块化
没有模块化的概念，不同的文件通过脚本标签引入
问题：污染了全局作用域，不利于大型项目和多人协作的项目的开发，

函数作用域
通过<span class="token constant">IIFE</span>（本质是函数作用域或者说闭包）实现简单的模块化
<span class="token operator">-</span> 实现：
<span class="token keyword">const</span> module <span class="token operator">=</span> <span class="token function">（</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>a<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> zhaowa</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        a<span class="token punctuation">,</span>
        sayHello
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>）（）

module<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token operator">-</span> 优化：有额外依赖
<span class="token keyword">const</span> module <span class="token operator">=</span> <span class="token function">（</span><span class="token punctuation">(</span><span class="token parameter">moduleA<span class="token punctuation">,</span>moduleB</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>a<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> zhaowa</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        a<span class="token punctuation">,</span>
        sayHello
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>）（moduleA<span class="token punctuation">,</span>moduleB）

module<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


Common<span class="token punctuation">.</span>js
<span class="token number">1.</span> Common<span class="token punctuation">.</span>js规范，由node<span class="token punctuation">.</span>js制定<span class="token punctuation">,</span>从框架方面解决了模块使用方式
<span class="token operator">-</span> 特征：通过module<span class="token operator">+</span>exports对外暴露，通过require导入模块
<span class="token operator">-</span> 优点：在框架层面解决了依赖、全局变量污染的问题
<span class="token operator">-</span> 缺点：主要针对的服务端，模块同步加载

webpack对CommonJS的实现
首先定义一个入口文件和依赖模块
<span class="token comment">//index.js</span>
<span class="token string">&#39;use strict&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./bar&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> bar<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//bar.js</span>
<span class="token string">&#39;use strict&#39;</span><span class="token punctuation">;</span>
exports<span class="token punctuation">.</span><span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


通过webpack打包得到打包结果
<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">modules</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> installedModules <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token parameter">moduleId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Check if module is in cache</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">.</span>exports
        <span class="token punctuation">}</span>
        <span class="token comment">// Create a new module (and put it into the cache)</span>
        <span class="token keyword">var</span> module <span class="token operator">=</span> <span class="token punctuation">(</span>installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">i</span><span class="token operator">:</span> moduleId<span class="token punctuation">,</span>
            <span class="token literal-property property">l</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token literal-property property">exports</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token comment">// Execute the module function</span>
        modules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>exports<span class="token punctuation">,</span> module<span class="token punctuation">,</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">,</span> __webpack_require__<span class="token punctuation">)</span>
        <span class="token comment">// Flag the module as loaded</span>
        module<span class="token punctuation">.</span>l <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token comment">// Return the exports of the module</span>
        <span class="token keyword">return</span> module<span class="token punctuation">.</span>exports
    <span class="token punctuation">}</span>
    __webpack_require__<span class="token punctuation">.</span>m <span class="token operator">=</span> modules
    __webpack_require__<span class="token punctuation">.</span>c <span class="token operator">=</span> installedModules
    __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">d</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> name<span class="token punctuation">,</span> getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>__webpack_require__<span class="token punctuation">.</span><span class="token function">o</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> name<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token literal-property property">get</span><span class="token operator">:</span> getter
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">n</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> getter <span class="token operator">=</span>
            module <span class="token operator">&amp;&amp;</span> module<span class="token punctuation">.</span>__esModule
                <span class="token operator">?</span> <span class="token keyword">function</span> <span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">return</span> module<span class="token punctuation">[</span><span class="token string">&#39;default&#39;</span><span class="token punctuation">]</span>
                  <span class="token punctuation">}</span>
                <span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">getModuleExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">return</span> module
                  <span class="token punctuation">}</span>
        __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> getter<span class="token punctuation">)</span>
        <span class="token keyword">return</span> getter
    <span class="token punctuation">}</span>
    __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">o</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">object<span class="token punctuation">,</span> property</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>object<span class="token punctuation">,</span> property<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    __webpack_require__<span class="token punctuation">.</span>p <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
    <span class="token keyword">return</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token punctuation">(</span>__webpack_require__<span class="token punctuation">.</span>s <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> __webpack_require__</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;use strict&#39;</span>

        <span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        bar<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> __webpack_require__</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;use strict&#39;</span>

        exports<span class="token punctuation">.</span><span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>


webpack对commonjs的实现主要是通过<span class="token constant">IIFE</span><span class="token operator">+</span>实现require函数，require函数是一个闭包，保存模块函数和已缓存模块的引用

每个模块变成了什么：每个模块都被打包成一个函数，函数的代码就是我们在模块文件中编写的代码，函数接收module、exports、require三个参数，也是在commonjs中用到的三个变量

<span class="token constant">IIFE</span>干了些什么：<span class="token constant">IIFE</span>的执行，将所有的模块以数组的形式传入，定义已加载模块的缓存和require函数的实行

require怎么实现 ：require函数接收一个id，标识模块，首先函数判断已加载模块中是否有缓存，如果有缓存，直接返回缓存的模块数据，如果没有缓存，通过modules<span class="token punctuation">[</span>id<span class="token punctuation">]</span>拿到模块函数，并执行，得到结果返回并缓存

伪代码的实现 ：
<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token parameter">modules</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义缓存module</span>
    <span class="token keyword">const</span> installedModules <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 定义require函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">require</span> <span class="token operator">=</span> <span class="token parameter">moduleId</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断缓存</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">.</span>exports
        <span class="token punctuation">}</span>
        <span class="token comment">// 定义缓存</span>
        <span class="token keyword">const</span> module <span class="token operator">=</span> <span class="token punctuation">(</span>installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">l</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token literal-property property">exports</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token comment">// 执行模块</span>
        modules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>exports<span class="token punctuation">,</span> module<span class="token punctuation">,</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">,</span> require<span class="token punctuation">)</span>

        <span class="token keyword">return</span> module<span class="token punctuation">.</span>exports
    <span class="token punctuation">}</span>
    <span class="token function">require</span><span class="token punctuation">(</span>modules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">[</span>moduleA<span class="token punctuation">,</span> moduleB<span class="token punctuation">,</span> moduleC<span class="token punctuation">]</span><span class="token punctuation">)</span>


<span class="token constant">AMD</span> 
<span class="token constant">AMD</span>规范，允许使用回调函数实现的异步加载，通过require<span class="token punctuation">.</span>js实现
定义模块
<span class="token function">通过define</span><span class="token punctuation">(</span>id<span class="token operator">?</span><span class="token operator">:</span> String<span class="token punctuation">,</span> dependencies<span class="token operator">?</span><span class="token operator">:</span> String<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">factory</span><span class="token operator">:</span> Function<span class="token operator">|</span>Object<span class="token punctuation">)</span>定义模块
id 是模块的名字，它是可选的参数。dependencies 指定了所要依赖的模块列表，它是一个数组，也是可选的参数，每个依赖的模块的输出将作为参数一次传入 factory 中。如果没有指定 dependencies，那么它的默认值是 <span class="token punctuation">[</span><span class="token string">&quot;require&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;exports&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">]</span>

<span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;myModule&#39;</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">&#39;module1&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;module2&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>）


引入模块 
<span class="token function">通过require</span><span class="token punctuation">(</span>moduleId<span class="token punctuation">,</span>cb<span class="token punctuation">)</span>引入模块
<span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;myModule&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">myModule</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token operator">-</span> 优点：可以在浏览器中异步加载模块
<span class="token operator">-</span> 缺点：<span class="token number">1.</span> 需要引入第三方库，<span class="token number">2.</span> <span class="token function">同时不能按需加载</span><span class="token punctuation">(</span>依赖前置）

<span class="token constant">CMD</span>
<span class="token constant">CMD</span>规范，实现了按需加载<span class="token punctuation">,</span>通过sea<span class="token punctuation">.</span>js实现
<span class="token operator">-</span> <span class="token function">特征：通过define</span><span class="token punctuation">(</span>module<span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>定义模块
<span class="token operator">-</span> 优点：按需加载
<span class="token operator">-</span> 缺点：需要引入第三方库，依赖于打包，加载逻辑存在于每个模块中，扩大模块体积

<span class="token constant">AMD</span>与<span class="token constant">CMD</span>的异同
相同点：都定义了异步加载模块的方式
不同点：
<span class="token number">2.</span> 定义模块时对依赖的处理不同，<span class="token constant">AMD</span>推崇依赖前置，在定义模块时就要声明依赖的模块，<span class="token constant">CMD</span>推崇就近原则，在使用到的地方再require模块
<span class="token number">3.</span> 模块的执行处理不同，<span class="token constant">AMD</span>在加载完模块后立即执行，都加载完成后进入回调逻辑，<span class="token constant">CMD</span>会加载所有的模块，加载完后执行回调，遇到require的地方才会执行相应的依赖
ESmodule
ESModule，在语言层面规定了浏览器模块化标准
<span class="token operator">-</span> 特征：通过<span class="token keyword">export</span>导出，通过<span class="token keyword">import</span>引入
<span class="token comment">// 基本使用</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> aa <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">aaa</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">aaaa</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> b <span class="token keyword">as</span> c <span class="token punctuation">}</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> c <span class="token keyword">as</span> d <span class="token punctuation">}</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> aa <span class="token keyword">from</span> <span class="token string">&quot;*.js&quot;</span>

<span class="token comment">// 默认导出</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> b <span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token keyword">default</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> a <span class="token punctuation">,</span>b <span class="token punctuation">}</span>

<span class="token comment">// 动态导入</span>
<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;a.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span><span class="token keyword">default</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token operator">-</span> 优点：统一了模块化的形态
<span class="token operator">-</span> 缺点：不借助webpack的情况下，本质上还是运行时的依赖分析

webpack对<span class="token constant">ES</span> Module的实现

首先定义入口文件和es依赖模块
<span class="token comment">// m.js</span>
<span class="token string">&#39;use strict&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">bar</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// index.js</span>
<span class="token string">&#39;use strict&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> bar<span class="token punctuation">,</span> <span class="token punctuation">{</span>foo<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./m&#39;</span><span class="token punctuation">;</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


webpack得到打包后的文件
<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">modules</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> installedModules <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token parameter">moduleId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">.</span>exports
        <span class="token punctuation">}</span>
        <span class="token keyword">var</span> module <span class="token operator">=</span> <span class="token punctuation">(</span>installedModules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">i</span><span class="token operator">:</span> moduleId<span class="token punctuation">,</span>
            <span class="token literal-property property">l</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token literal-property property">exports</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        modules<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>exports<span class="token punctuation">,</span> module<span class="token punctuation">,</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">,</span> __webpack_require__<span class="token punctuation">)</span>
        module<span class="token punctuation">.</span>l <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">return</span> module<span class="token punctuation">.</span>exports
    <span class="token punctuation">}</span>
    __webpack_require__<span class="token punctuation">.</span>m <span class="token operator">=</span> modules
    __webpack_require__<span class="token punctuation">.</span>c <span class="token operator">=</span> installedModules
    __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">d</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> name<span class="token punctuation">,</span> getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>__webpack_require__<span class="token punctuation">.</span><span class="token function">o</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> name<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token literal-property property">get</span><span class="token operator">:</span> getter
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">n</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> getter <span class="token operator">=</span>
            module <span class="token operator">&amp;&amp;</span> module<span class="token punctuation">.</span>__esModule
                <span class="token operator">?</span> <span class="token keyword">function</span> <span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">return</span> module<span class="token punctuation">[</span><span class="token string">&#39;default&#39;</span><span class="token punctuation">]</span>
                  <span class="token punctuation">}</span>
                <span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">getModuleExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">return</span> module
                  <span class="token punctuation">}</span>
        __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> getter<span class="token punctuation">)</span>
        <span class="token keyword">return</span> getter
    <span class="token punctuation">}</span>
    __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">o</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">object<span class="token punctuation">,</span> property</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>object<span class="token punctuation">,</span> property<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    __webpack_require__<span class="token punctuation">.</span>p <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
    <span class="token keyword">return</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token punctuation">(</span>__webpack_require__<span class="token punctuation">.</span>s <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module<span class="token punctuation">,</span> __webpack_exports__<span class="token punctuation">,</span> __webpack_require__</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;use strict&#39;</span>
        Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token string">&#39;__esModule&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">var</span> __WEBPACK_IMPORTED_MODULE_0__m__ <span class="token operator">=</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

        <span class="token function">Object</span><span class="token punctuation">(</span>__WEBPACK_IMPORTED_MODULE_0__m__<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span> <span class="token comment">/* default */</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">Object</span><span class="token punctuation">(</span>__WEBPACK_IMPORTED_MODULE_0__m__<span class="token punctuation">[</span><span class="token string">&#39;b&#39;</span> <span class="token comment">/* foo */</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module<span class="token punctuation">,</span> __webpack_exports__<span class="token punctuation">,</span> __webpack_require__</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;use strict&#39;</span>
        __webpack_exports__<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> bar
        __webpack_exports__<span class="token punctuation">[</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> foo

        <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">2</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

Webpack对<span class="token constant">ES</span> Module与Commonjs的实现差不多，都是将模块包装在函数当中，将各个模块放在一个数组中传入立即执行函数，定义require函数来加载模块

区别：
<span class="token number">4.</span> <span class="token constant">ES</span> Module中，模块打上了_esmodule标记，标识是一个<span class="token constant">ES</span> Module，
<span class="token number">5.</span> cmmonjs的加载 和分析 都是在运行 时，esmodule是在编译 时进行加载  和分析 （依赖分析）
<span class="token number">6.</span> commonjs输出的是值的拷贝 ，并且可以更改，多个地方更改互不影响，esmodule输出的是值的引用 ，多个地方引用同一个值，在运行时做动态映射 ，也导入的值不可更改，

webpack对模块化的兼容实现
<span class="token comment">// t表示工厂函数</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">global<span class="token punctuation">,</span>t</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 环境判断</span>
    <span class="token string">&#39;object&#39;</span> <span class="token operator">==</span> <span class="token keyword">typeof</span> exports <span class="token operator">&amp;&amp;</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">==</span> <span class="token keyword">typeof</span> module
        <span class="token operator">?</span> <span class="token punctuation">(</span>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">==</span> <span class="token keyword">typeof</span> define <span class="token operator">&amp;&amp;</span> define<span class="token punctuation">.</span>amd
        <span class="token operator">?</span> <span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">==</span> <span class="token keyword">typeof</span> exports
        <span class="token operator">?</span> <span class="token punctuation">(</span>exports<span class="token punctuation">.</span>math <span class="token operator">=</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token punctuation">(</span>global<span class="token punctuation">.</span>math <span class="token operator">=</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>slef<span class="token punctuation">,</span>t<span class="token punctuation">)</span>

<span class="token comment">// commonjs 环境判断</span>
<span class="token keyword">typeof</span> module <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> exports <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// amd环境判断</span>
define<span class="token punctuation">.</span>amd <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> define <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>t<span class="token punctuation">)</span>

<span class="token comment">// 左后是浏览器环境</span>
global<span class="token punctuation">.</span>math <span class="token operator">=</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","module.html.vue"]]);export{r as default};
