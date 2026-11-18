import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const p={},e=t(`<h1 id="router-对象" tabindex="-1"><a class="header-anchor" href="#router-对象" aria-hidden="true">#</a> router 对象</h1><p>VueRouter 的实现是一个类，它的定义在 <code>src/index.js</code> 中，<code>VueRouter</code> 定义了一些属性和方法，我们先从它的构造函数看，当我们执行 <code>new VueRouter</code> 的时候做了哪些事情。</p><h2 id="router实例化" tabindex="-1"><a class="header-anchor" href="#router实例化" aria-hidden="true">#</a> router实例化</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 存储vue实例</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>app <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// vue根实例</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>apps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">=</span> options
  
  <span class="token comment">// router钩子函数</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>beforeHooks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>resolveHooks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>afterHooks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token comment">// 路由匹配器matcher</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>matcher <span class="token operator">=</span> <span class="token function">createMatcher</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>routes <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>

  <span class="token keyword">let</span> mode <span class="token operator">=</span> options<span class="token punctuation">.</span>mode <span class="token operator">||</span> <span class="token string">&#39;hash&#39;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>fallback <span class="token operator">=</span> mode <span class="token operator">===</span> <span class="token string">&#39;history&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>supportsPushState <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>fallback <span class="token operator">!==</span> <span class="token boolean">false</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>fallback<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mode <span class="token operator">=</span> <span class="token string">&#39;hash&#39;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>inBrowser<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mode <span class="token operator">=</span> <span class="token string">&#39;abstract&#39;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 路由模式</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">=</span> mode

  <span class="token comment">// history实例</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>mode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;history&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>history <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HTML5History</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>base<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;hash&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>history <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashHistory</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>base<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fallback<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;abstract&#39;</span><span class="token operator">:</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>history <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AbstractHistory</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>base<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assert</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">invalid mode: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>mode<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从代码中可以看到，router的初始化除了初始化自身的一些基本属性，最重要的是<code>matcher</code>实例和<code>history</code>实例，<code>matcher</code>对象的主要工作是将路由配置进行处理，使配置对象扁平化、根据路径参数匹配到路由配置，生成最终的路由对象；<code>history</code>对象的主要作用是根据路由配置，解析出<code>配置</code>、<code>router</code>对象、<code>vue</code>实例中定义的钩子函数，按照规定的顺序执行，更新<code>history</code>对象和<code>根vue</code>对象的<code>route</code>，同时<code>恢复页面滚动</code>和<code>浏览器路径</code>的更新</p><h2 id="init过程" tabindex="-1"><a class="header-anchor" href="#init过程" aria-hidden="true">#</a> init过程</h2><p>初始化执行init的代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">init</span> <span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">this</span><span class="token punctuation">.</span>apps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>app<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 唯一的根实例</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>app <span class="token operator">=</span> app

  <span class="token keyword">const</span> history <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>history

   <span class="token keyword">if</span> <span class="token punctuation">(</span>history <span class="token keyword">instanceof</span> <span class="token class-name">HTML5History</span> <span class="token operator">||</span> history <span class="token keyword">instanceof</span> <span class="token class-name">HashHistory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token function-variable function">handleInitialScroll</span> <span class="token operator">=</span> <span class="token parameter">routeOrError</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> from <span class="token operator">=</span> history<span class="token punctuation">.</span>current
        <span class="token keyword">const</span> expectScroll <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>scrollBehavior
        <span class="token keyword">const</span> supportsScroll <span class="token operator">=</span> supportsPushState <span class="token operator">&amp;&amp;</span> expectScroll

        <span class="token keyword">if</span> <span class="token punctuation">(</span>supportsScroll <span class="token operator">&amp;&amp;</span> <span class="token string">&#39;fullPath&#39;</span> <span class="token keyword">in</span> routeOrError<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">handleScroll</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> routeOrError<span class="token punctuation">,</span> from<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> <span class="token function-variable function">setupListeners</span> <span class="token operator">=</span> <span class="token parameter">routeOrError</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 监听路由改变</span>
        history<span class="token punctuation">.</span><span class="token function">setupListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">handleInitialScroll</span><span class="token punctuation">(</span>routeOrError<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 根据浏览器初始路径进行跳转，因为可能不是根路径</span>
      history<span class="token punctuation">.</span><span class="token function">transitionTo</span><span class="token punctuation">(</span>
        history<span class="token punctuation">.</span><span class="token function">getCurrentLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        setupListeners<span class="token punctuation">,</span>
        setupListeners
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token comment">// 在history中注册cb，当路由确认后，需要更新vue实例和history对象的route对象，下面回调则是更新根实例的_route</span>
  history<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token parameter">route</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>apps<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      app<span class="token punctuation">.</span>_route <span class="token operator">=</span> route
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","router.html.vue"]]);export{r as default};
