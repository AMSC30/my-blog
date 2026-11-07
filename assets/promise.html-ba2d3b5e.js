import{_ as n,p as s,q as a,Y as p}from"./framework-e1bed10d.js";const e={},t=p(`<h1 id="promise规范" tabindex="-1"><a class="header-anchor" href="#promise规范" aria-hidden="true">#</a> Promise规范</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>promise是一个具有then方法的对象或函数
状态
promise必须处在一下三种状态之一：

<span class="token operator">-</span> pendding
promise 的初始状态，只能转为 fulfilled 或者 rejected 状态

<span class="token operator">-</span> fulfilled
最终态，标识成功的 promise，不可变化（逆转），此时 promise 伴随着一个 value 值

<span class="token operator">-</span> rejected
最终态，标识失败的 promise，不可变化（逆转），此时 promise 伴随着一个 reason 值

构造函数入参
入参是一个执行器函数，接收 resolve 和 reject 两个参数，用于改变 promise 的状态
执行器执行过程中的任何错误都会 reject
then
promise 应该提供一个 then 方法，用于访问最终的结果
该方法可以被调用多次，注册后的多个回调依次调用
then 方法的返回值是一个新的 promise<span class="token punctuation">,</span>新的 promise 的状态根据回调的返回值和回调的类型来确定
一句话理解：一个 promise 上根据回调类型和回调调用后的返回值返回新的 promise 的函数

<span class="token operator">-</span> 使用
promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>onFulfilled<span class="token punctuation">,</span> onRejected<span class="token punctuation">)</span>

<span class="token operator">-</span> 参数
then 方法的参数都是可选参数，如果不是函数将会被忽略，回调函数都会作为微任务 执行，回调的执行不能在 promise 状态为已处理 之前调用，并且调用不超过 一次

<span class="token number">1.</span> onFulfilled
作为成功的回调，回调参数为 promise 的 value

<span class="token number">2.</span> onRejected
失败的回调，回调参数为 promise 的 reason

微任务是异步任务的一种
回调不是函数，then 方法返回调用 then 方法的 promise 对象的状态和值的 promise 对象

<span class="token operator">-</span> 回调的返回值
  <span class="token number">1.</span> 回调返回一个 js 常规类型值或者是一个不具有then方法的函数或对象，或者不返回值，then 方法返回一个 fulfilled 的 promise
  <span class="token number">2.</span> 回调返回一个成功的 promise 对象，then 方法返回一个具有这个 value 的成功 promise
  <span class="token number">3.</span> 回调返回一个失败的 promise 对象，then 方法返回一个具有这个 reason 的失败 promise
  <span class="token number">4.</span> 回调执行过程中报错或者人为抛出 error，then 方法返回一个失败的 promise
  <span class="token number">5.</span> 回调执行返回的是一个具有then方法的函数或对象，调用then方法
promise的实现
<span class="token keyword">const</span> promiseState <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">pending</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token literal-property property">fulfilled</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">rejected</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyPromise</span> <span class="token punctuation">{</span>
    state <span class="token operator">=</span> promiseState<span class="token punctuation">.</span>pending
    value <span class="token operator">=</span> <span class="token keyword">null</span>
    fulfilledCallbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    rejectedCallbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">MyPromise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;promise need call with new...&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>executor <span class="token operator">||</span> <span class="token keyword">typeof</span> executor <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;constructor MyPromise need a function executor and it is required&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">executor</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onFulFilled<span class="token punctuation">,</span> onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> onFulFilled <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">onFulFilled</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> value
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> onRejected <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">error</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> error
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token function-variable function">resolveHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">onFulFilled</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolvePromise</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span> value<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">const</span> <span class="token function-variable function">rejectHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolvePromise</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span> value<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> promiseState<span class="token punctuation">.</span>fulfilled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolveHandler<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> promiseState<span class="token punctuation">.</span>rejected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">setTimeout</span><span class="token punctuation">(</span>rejectHandler<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> promiseState<span class="token punctuation">.</span>pending<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>fulfilledCallbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolveHandler<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>

                <span class="token keyword">this</span><span class="token punctuation">.</span>rejectedCallbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token function">setTimeout</span><span class="token punctuation">(</span>rejectHandler<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> p1
    <span class="token punctuation">}</span>
    <span class="token function">resolvePromise</span><span class="token punctuation">(</span><span class="token parameter">promise<span class="token punctuation">,</span> value<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1.如果不返回值，默认为undefined</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 2.如果返回了相同的promise</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>promise <span class="token operator">===</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;The promise and the return value are the same&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 3.如果返回的是promise</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">MyPromise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
                <span class="token parameter">val</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolvePromise</span><span class="token punctuation">(</span>promise<span class="token punctuation">,</span> val<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token parameter">error</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 如果返回的是对象，根据是否具有then方法做不同的处理</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>

            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">const</span> then <span class="token operator">=</span> value<span class="token punctuation">.</span>then
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> then <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token function">then</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>
                            value<span class="token punctuation">,</span>
                            <span class="token parameter">val</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolvePromise</span><span class="token punctuation">(</span>promise<span class="token punctuation">,</span> val<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token parameter">error</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                                <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">)</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> promiseState<span class="token punctuation">.</span>pending<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> promiseState<span class="token punctuation">.</span>fulfilled
            <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>fulfilledCallbacks<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>fulfilledCallbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> promiseState<span class="token punctuation">.</span>pending<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>reason <span class="token keyword">instanceof</span> <span class="token class-name">Error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                reason <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;reject reason need typeof error&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> promiseState<span class="token punctuation">.</span>rejected
            <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> reason
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rejectedCallbacks<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>rejectedCallbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reason<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span>MyPromise <span class="token operator">=</span> MyPromise
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[t];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","promise.html.vue"]]);export{r as default};
