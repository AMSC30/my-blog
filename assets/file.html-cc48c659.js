import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const p={},e=t(`<h1 id="file" tabindex="-1"><a class="header-anchor" href="#file" aria-hidden="true">#</a> File</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>File 对象
File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。
最常见的使用场合是表单的文件上传控件（<span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;file&quot;</span><span class="token operator">&gt;</span>），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input id=&quot;fileItem&quot; type=&quot;file&quot;&gt;</span>
<span class="token keyword">var</span> file <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;fileItem&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
file <span class="token keyword">instanceof</span> <span class="token class-name">File</span> <span class="token comment">// true</span>

构造函数
<span class="token function">浏览器原生提供一个File</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成 File 实例对象。
<span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> name <span class="token punctuation">[</span><span class="token punctuation">,</span> options<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token function">File</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数接受三个参数。

<span class="token operator">-</span> array：一个数组，成员可以是二进制对象或字符串，表示文件的内容。
<span class="token operator">-</span> name：字符串，表示文件名或文件路径。
<span class="token operator">-</span> options：配置对象，设置实例的属性。该参数可选。
第三个参数配置对象，可以设置两个属性。
<span class="token operator">-</span> type：字符串，表示实例对象的 <span class="token constant">MIME</span> 类型，默认值为空字符串。
<span class="token operator">-</span> lastModified：时间戳，表示上次修改的时间，默认为Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。
下面是一个例子。
<span class="token keyword">var</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string">&#39;foo.txt&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

实例属性和实例方法
File 对象有以下实例属性。

<span class="token operator">-</span> File<span class="token punctuation">.</span>lastModified：最后修改时间
<span class="token operator">-</span> File<span class="token punctuation">.</span>name：文件名或文件路径
<span class="token operator">-</span> File<span class="token punctuation">.</span>size：文件大小（单位字节）
<span class="token operator">-</span> File<span class="token punctuation">.</span>type：文件的 <span class="token constant">MIME</span> 类型
<span class="token keyword">var</span> myFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;file.bin&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">lastModified</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2018</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myFile<span class="token punctuation">.</span>lastModified <span class="token comment">// 1517414400000</span>
myFile<span class="token punctuation">.</span>name <span class="token comment">// &quot;file.bin&quot;</span>
myFile<span class="token punctuation">.</span>size <span class="token comment">// 0</span>
myFile<span class="token punctuation">.</span>type <span class="token comment">// &quot;&quot;</span>

File 对象没有自己的实例方法，由于继承了 Blob 对象，因此可以使用 Blob <span class="token function">的实例方法slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。
FileList 对象
FileList对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。它主要出现在两个场合。

<span class="token operator">-</span> 文件控件节点（<span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;file&quot;</span><span class="token operator">&gt;</span>）的files属性，返回一个 FileList 实例。
<span class="token operator">-</span> 拖拉一组文件时，目标区的DataTransfer<span class="token punctuation">.</span>files属性，返回一个 FileList 实例。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input id=&quot;fileItem&quot; type=&quot;file&quot;&gt;</span>
<span class="token keyword">var</span> files <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;fileItem&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>files<span class="token punctuation">;</span>
files <span class="token keyword">instanceof</span> <span class="token class-name">FileList</span> <span class="token comment">// true</span>

FileList 的实例属性主要是length，表示包含多少个文件。
FileList <span class="token function">的实例方法主要是item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，用来返回指定位置的实例。它接受一个整数作为参数，表示位置的序号（从零开始）。但是，由于 FileList 的实例是一个类似数组的对象，可以直接用方括号运算符，即myFileList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>等同于myFileList<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token function">，所以一般用不到item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法。
Blob 对象
简介
Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。
<span class="token function">浏览器原生提供Blob</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成实例对象。
<span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span>array <span class="token punctuation">[</span><span class="token punctuation">,</span> options<span class="token punctuation">]</span><span class="token punctuation">)</span>

Blob构造函数接受两个参数。第一个参数是数组，成员是字符串或二进制对象，表示新生成的Blob实例对象的内容；第二个参数是可选的，是一个配置对象，目前只有一个属性type，它的值是一个字符串，表示数据的 <span class="token constant">MIME</span> 类型，默认是空字符串。
<span class="token keyword">var</span> htmlFragment <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;&lt;a id=&quot;a&quot;&gt;&lt;b id=&quot;b&quot;&gt;hey!&lt;/b&gt;&lt;/a&gt;&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myBlob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span>htmlFragment<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span> <span class="token operator">:</span> <span class="token string">&#39;text/html&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

实例属性和实例方法
Blob具有两个实例属性size和type，分别返回数据的大小和类型。
<span class="token keyword">var</span> htmlFragment <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;&lt;a id=&quot;a&quot;&gt;&lt;b id=&quot;b&quot;&gt;hey!&lt;/b&gt;&lt;/a&gt;&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myBlob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span>htmlFragment<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span> <span class="token operator">:</span> <span class="token string">&#39;text/html&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

myBlob<span class="token punctuation">.</span>size <span class="token comment">// 32</span>
myBlob<span class="token punctuation">.</span>type <span class="token comment">// &quot;text/html&quot;</span>

Blob具有一个实例方法slice，用来拷贝原来的数据，返回的也是一个Blob实例。
myBlob<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end<span class="token punctuation">,</span> contentType<span class="token punctuation">)</span>

slice方法有三个参数，都是可选的。它们依次是起始的字节位置（默认为<span class="token number">0</span>）、结束的字节位置（默认为size属性的值，该位置本身将不包含在拷贝的数据之中）、新实例的数据类型（默认为空字符串）。
获取文件信息
文件选择器<span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;file&quot;</span><span class="token operator">&gt;</span>用来让用户选取文件。出于安全考虑，浏览器不允许脚本自行设置这个控件的value属性，即文件必须是用户手动选取的，不能是脚本指定的。一旦用户选好了文件，脚本就可以读取这个文件。
文件选择器返回一个 FileList 对象，该对象是一个类似数组的成员，每个成员都是一个 File 实例对象。File 实例对象是一个特殊的 Blob 实例，增加了name和lastModifiedDate属性。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input type=&quot;file&quot; accept=&quot;image/*&quot; multiple onchange=&quot;fileinfo(this.files)&quot;/&gt;</span>

<span class="token keyword">function</span> <span class="token function">fileinfo</span><span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> f <span class="token operator">=</span> files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      f<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token comment">// 文件名，不含路径</span>
      f<span class="token punctuation">.</span>size<span class="token punctuation">,</span> <span class="token comment">// 文件大小，Blob 实例属性</span>
      f<span class="token punctuation">.</span>type<span class="token punctuation">,</span> <span class="token comment">// 文件类型，Blob 实例属性</span>
      f<span class="token punctuation">.</span>lastModifiedDate <span class="token comment">// 文件的最后修改时间</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

除了文件选择器，拖放 <span class="token constant">API</span> 的dataTransfer<span class="token punctuation">.</span>files返回的也是一个FileList 对象，它的成员因此也是 File 实例对象。
ArrayBuffer 对象
ArrayBuffer 对象表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。这个对象可以看作内存数据的表达。
<span class="token function">浏览器原生提供ArrayBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数，用来生成实例。它接受一个整数作为参数，表示这段二进制数据占用多少个字节。
<span class="token keyword">var</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

ArrayBuffer 对象有实例属性byteLength，表示当前实例占用的内存长度（单位字节）。
<span class="token keyword">var</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span>byteLength <span class="token comment">// 8</span>

ArrayBuffer <span class="token function">对象有实例方法slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，用来复制一部分内存。它接受两个整数参数，分别表示复制的开始位置（从<span class="token number">0</span>开始）和结束位置（复制时不包括结束位置），如果省略第二个参数，则表示一直复制到结束。
<span class="token keyword">var</span> buf1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> buf2 <span class="token operator">=</span> buf1<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

FileReader 对象
FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。
浏览器原生提供一个FileReader构造函数，用来生成 FileReader 实例。
<span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

实例属性。

<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>error：读取文件时产生的错误对象
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>readyState：整数，表示读取文件时的当前状态。一共有三种可能的状态，<span class="token number">0</span>表示尚未加载任何数据，<span class="token number">1</span>表示数据正在加载，<span class="token number">2</span>表示加载完成。
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>result：读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。
实例事件
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>onabort：abort事件（用户终止读取操作）的监听函数。
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>onerror：error事件（读取错误）的监听函数。
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>onload：load事件（读取操作完成）的监听函数，通常在这个函数里面使用result属性，拿到文件内容。
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>onloadstart：loadstart事件（读取操作开始）的监听函数。
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>onloadend：loadend事件（读取操作结束）的监听函数。
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span>onprogress：progress事件（读取操作进行中）的监听函数。
下面是监听load事件的一个例子。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input type=&quot;file&quot; onchange=&quot;onChange(event)&quot;&gt;</span>

<span class="token keyword">function</span> <span class="token function">onChange</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> file <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  reader<span class="token punctuation">.</span><span class="token function">readAsText</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

实例方法。

<span class="token operator">-</span> FileReader<span class="token punctuation">.</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：终止读取操作，readyState属性将变成<span class="token number">2</span>。
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span><span class="token function">readAsArrayBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：以 ArrayBuffer 的格式读取文件，读取完成后result属性将返回一个 ArrayBuffer 实例。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input type=&quot;file&quot; onchange=&quot;typefile(this.files[0])&quot;&gt;&lt;/input&gt;</span>
<span class="token keyword">function</span> <span class="token function">typefile</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 文件开头的四个字节，生成一个 Blob 对象</span>
  <span class="token keyword">var</span> slice <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 读取这四个字节</span>
  reader<span class="token punctuation">.</span><span class="token function">readAsArrayBuffer</span><span class="token punctuation">(</span>slice<span class="token punctuation">)</span><span class="token punctuation">;</span>
  reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> buffer <span class="token operator">=</span> reader<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
    <span class="token comment">// 将这四个字节的内容，视作一个32位整数</span>
    <span class="token keyword">var</span> view <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataView</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> magic <span class="token operator">=</span> view<span class="token punctuation">.</span><span class="token function">getUint32</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 根据文件的前四个字节，判断它的类型</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>magic<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token number">0x89504E47</span><span class="token operator">:</span> file<span class="token punctuation">.</span>verified_type <span class="token operator">=</span> <span class="token string">&#39;image/png&#39;</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">0x47494638</span><span class="token operator">:</span> file<span class="token punctuation">.</span>verified_type <span class="token operator">=</span> <span class="token string">&#39;image/gif&#39;</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">0x25504446</span><span class="token operator">:</span> file<span class="token punctuation">.</span>verified_type <span class="token operator">=</span> <span class="token string">&#39;application/pdf&#39;</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">0x504b0304</span><span class="token operator">:</span> file<span class="token punctuation">.</span>verified_type <span class="token operator">=</span> <span class="token string">&#39;application/zip&#39;</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>name<span class="token punctuation">,</span> file<span class="token punctuation">.</span>verified_type<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token operator">-</span> FileReader<span class="token punctuation">.</span><span class="token function">readAsBinaryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：读取完成后，result属性将返回原始的二进制字符串。
<span class="token operator">-</span> FileReader<span class="token punctuation">.</span><span class="token function">readAsDataURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：读取完成后，result属性将返回一个 Data <span class="token constant">URL</span> 格式（Base64 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于<span class="token operator">&lt;</span>img<span class="token operator">&gt;</span>元素的src属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀data<span class="token operator">:</span><span class="token operator">*</span><span class="token comment">/*;base64,从字符串里删除以后，再进行解码。
/*HTML 代码如下
  &lt;input type=&quot;file&quot; onchange=&quot;previewFile()&quot;&gt;
  &lt;img src=&quot;&quot; height=&quot;200&quot;&gt;
*/</span>

<span class="token keyword">function</span> <span class="token function">previewFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> preview <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> file    <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;input[type=file]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> reader  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  reader<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    preview<span class="token punctuation">.</span>src <span class="token operator">=</span> reader<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    reader<span class="token punctuation">.</span><span class="token function">readAsDataURL</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token operator">-</span> FileReader<span class="token punctuation">.</span><span class="token function">readAsText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：读取完成后，result属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 <span class="token constant">UTF</span><span class="token operator">-</span><span class="token number">8</span>。
<span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input type=&quot;file&quot; onchange=&quot;readfile(this.files[0])&quot;&gt;&lt;/input&gt;</span>
<span class="token comment">// &lt;pre id=&quot;output&quot;&gt;&lt;/pre&gt;</span>
<span class="token keyword">function</span> <span class="token function">readfile</span><span class="token punctuation">(</span><span class="token parameter">f</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  reader<span class="token punctuation">.</span><span class="token function">readAsText</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>
  reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> text <span class="token operator">=</span> reader<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
    <span class="token keyword">var</span> out <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;output&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    out<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    out<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  reader<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Error&#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

FormData 对象
概述
表单数据以键值对的形式向服务器发送，这个过程是浏览器自动完成的。但是有时候，我们希望通过脚本完成这个过程，构造或编辑表单的键值对，然后通过脚本发送给服务器。浏览器原生提供了 FormData 对象来完成这项工作。
<span class="token function">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>首先是一个构造函数，用来生成表单的实例。
<span class="token keyword">var</span> formdata <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span>form<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>构造函数的参数是一个 <span class="token constant">DOM</span> 的表单元素，构造函数会自动处理表单的键值对。这个参数是可选的，如果省略该参数，就表示一个空的表单。
下面是一个表单。
<span class="token operator">&lt;</span>form id<span class="token operator">=</span><span class="token string">&quot;myForm&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;myForm&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>label <span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;username&quot;</span><span class="token operator">&gt;</span>用户名：<span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;text&quot;</span> id<span class="token operator">=</span><span class="token string">&quot;username&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;username&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>label <span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;useracc&quot;</span><span class="token operator">&gt;</span>账号：<span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;text&quot;</span> id<span class="token operator">=</span><span class="token string">&quot;useracc&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;useracc&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>label <span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;userfile&quot;</span><span class="token operator">&gt;</span>上传文件：<span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;file&quot;</span> id<span class="token operator">=</span><span class="token string">&quot;userfile&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;userfile&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;submit&quot;</span> value<span class="token operator">=</span><span class="token string">&quot;Submit!&quot;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>form<span class="token operator">&gt;</span>

<span class="token function">我们用FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>处理上面这个表单。
<span class="token keyword">var</span> myForm <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;myForm&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span>myForm<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取某个控件的值</span>
formData<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;username&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;&quot;</span>

<span class="token comment">// 设置某个控件的值</span>
formData<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;username&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;张三&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

formData<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;username&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;张三&quot;</span>

实例方法
FormData 提供以下实例方法。

<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>：获取指定键名对应的键值，参数为键名。如果有多个同名的键值对，则返回第一个键值对的键值。
<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">getAll</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>：返回一个数组，表示指定键名对应的所有键值。如果有多个同名的键值对，数组会包含所有的键值。
<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>：设置指定键名的键值，参数为键名。如果键名不存在，会添加这个键值对，否则会更新指定键名的键值。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>：删除一个键值对，参数为键名。
<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>：添加一个键值对。如果键名重复，则会生成两个相同键名的键值对。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>：返回一个布尔值，表示是否具有该键名的键值对。
<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回一个遍历器对象，用于<span class="token keyword">for</span><span class="token operator">...</span><span class="token keyword">of</span>循环遍历所有的键名。
<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回一个遍历器对象，用于<span class="token keyword">for</span><span class="token operator">...</span><span class="token keyword">of</span>循环遍历所有的键值。
<span class="token operator">-</span> FormData<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span>：返回一个遍历器对象，用于<span class="token keyword">for</span><span class="token operator">...</span><span class="token keyword">of</span>循环遍历所有的键值对。如果直接用<span class="token keyword">for</span><span class="token operator">...</span><span class="token keyword">of</span>循环遍历 FormData 实例，默认就会调用这个方法。
<span class="token function">下面是get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token function">、append</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法的例子。
<span class="token keyword">var</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

formData<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;username&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;张三&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;username&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;李四&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
formData<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;username&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &quot;张三&quot;</span>
formData<span class="token punctuation">.</span><span class="token function">getAll</span><span class="token punctuation">(</span><span class="token string">&#39;username&#39;</span><span class="token punctuation">)</span> <span class="token comment">// [&quot;张三&quot;, &quot;李四&quot;]</span>

formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;userpic[]&#39;</span><span class="token punctuation">,</span> myFileInput<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;user1.jpg&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;userpic[]&#39;</span><span class="token punctuation">,</span> myFileInput<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;user2.jpg&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

下面是遍历器的例子。
<span class="token keyword">var</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;key1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;value1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;key2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;value2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">of</span> formData<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// &quot;key1&quot;</span>
<span class="token comment">// &quot;key2&quot;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> value <span class="token keyword">of</span> formData<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// &quot;value1&quot;</span>
<span class="token comment">// &quot;value2&quot;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> pair <span class="token keyword">of</span> formData<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pair<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&#39;: &#39;</span> <span class="token operator">+</span> pair<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// key1: value1</span>
<span class="token comment">// key2: value2</span>

<span class="token comment">// 等同于遍历 formData.entries()</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> pair <span class="token keyword">of</span> formData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pair<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&#39;: &#39;</span> <span class="token operator">+</span> pair<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// key1: value1</span>
<span class="token comment">// key2: value2</span>

文件上传
通过表单上传
通过文件输入框选择本地文件，提交表单的时候，浏览器就会把这个文件发送到服务器。
将表单<span class="token operator">&lt;</span>form<span class="token operator">&gt;</span>元素的method属性设为<span class="token constant">POST</span>，enctype属性设为multipart<span class="token operator">/</span>form<span class="token operator">-</span>data，enctype属性决定了 <span class="token constant">HTTP</span> 头信息的Content<span class="token operator">-</span>Type字段的值，默认情况下这个字段的值是application<span class="token operator">/</span>x<span class="token operator">-</span>www<span class="token operator">-</span>form<span class="token operator">-</span>urlencoded，但是文件上传的时候要改成multipart<span class="token operator">/</span>form<span class="token operator">-</span>data
<span class="token operator">&lt;</span>form method<span class="token operator">=</span><span class="token string">&quot;post&quot;</span> enctype<span class="token operator">=</span><span class="token string">&quot;multipart/form-data&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>label <span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;file&quot;</span><span class="token operator">&gt;</span>选择一个文件<span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;file&quot;</span> id<span class="token operator">=</span><span class="token string">&quot;file&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;myFile&quot;</span> multiple<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;submit&quot;</span> id<span class="token operator">=</span><span class="token string">&quot;submit&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;submit_button&quot;</span> value<span class="token operator">=</span><span class="token string">&quot;上传&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>form<span class="token operator">&gt;</span>

multiple属性，指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件

通过<span class="token constant">AJAX</span>上传
首先通过input元素获取到文件对象
<span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;file&quot;</span> id<span class="token operator">=</span><span class="token string">&quot;file&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;myFile&quot;</span> multiple<span class="token operator">&gt;</span>

然后组装formdata参数
<span class="token keyword">var</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> file <span class="token operator">=</span> files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token comment">// 只上传图片文件</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">.</span>type<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">&#39;image.*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;photos[]&#39;</span><span class="token punctuation">,</span> file<span class="token punctuation">,</span> file<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

最后，使用 Ajax 向服务器上传文件。
<span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;handler.php&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

xhr<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">!==</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;An error occurred!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span><span class="token punctuation">;</span>

除了发送 FormData 实例，也可以直接 <span class="token constant">AJAX</span> 发送文件。
<span class="token keyword">var</span> file <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;test-input&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;myserver/uploads&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Content-Type&#39;</span><span class="token punctuation">,</span> file<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>

文件下载
下载方式
使用window<span class="token punctuation">.</span>open和location<span class="token punctuation">.</span>href
window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;downloadFile.zip&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">&#39;downloadFile.zip&#39;</span><span class="token punctuation">;</span>

使用这两种方式与使用a标签方式差不多，简单直接，缺点也很多：

<span class="token number">1.</span> 需要注意url长度和编码的问题
<span class="token number">2.</span> 对于浏览器可预览的链接，如图片、文本，可能无法直接下载
<span class="token number">3.</span> 无法感知到下载进度
<span class="token number">4.</span> 无法添加header进行鉴权
使用a标签的download属性
使用download属性可以下载图片、文件，并指定文件的文件名
 <span class="token keyword">const</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>
 a<span class="token punctuation">.</span>href <span class="token operator">=</span> url
 a<span class="token punctuation">.</span>download <span class="token operator">=</span> <span class="token string">&#39;file&#39;</span>
 a<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

使用该属性可以对图片进行下载，而不是进行预览，同样有以下缺点

<span class="token number">1.</span> 对于跨源的资源，只能预览，无法下载
<span class="token number">2.</span> 无法添加header进行鉴权
<span class="token number">3.</span> 有浏览器兼容性问题
判断浏览器是否支持download属性方式下载
<span class="token keyword">const</span> isSupport <span class="token operator">=</span> <span class="token string">&#39;download&#39;</span> <span class="token keyword">in</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

url生成
后端提供地址
可以使用后端提供的资源地址或者下载地址
Blob对象或者File对象生成object url
<span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
xhr<span class="token punctuation">.</span>responseType <span class="token operator">=</span> <span class="token string">&#39;blob&#39;</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
xhr<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">304</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;msSaveOrOpenBlob&#39;</span> <span class="token keyword">in</span> navigator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            navigator<span class="token punctuation">.</span><span class="token function">msSaveOrOpenBlob</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>response<span class="token punctuation">,</span> name<span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// const blob = new Blob([this.response], { type: xhr.getResponseHeader(&#39;Content-Type&#39;) });</span>
        <span class="token comment">// const url = URL.createObjectURL(blob);</span>
        <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>response<span class="token punctuation">)</span>
        <span class="token keyword">const</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>
        a<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">&#39;none&#39;</span>
        a<span class="token punctuation">.</span>href <span class="token operator">=</span> url
        a<span class="token punctuation">.</span>download <span class="token operator">=</span> name
        document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
        a<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
        <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

使用ajax可以向后端传递header进行鉴权，但是也存在兼容性问题，在Safari浏览器下载时可能存在问题
Blob对象或者File对象生成Data url
使用base64的方式与接口调用方式差不多，只是生成url的方式不同，这个生成的是data url
各对象之间转换
无法复制加载中的内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","file.html.vue"]]);export{r as default};
