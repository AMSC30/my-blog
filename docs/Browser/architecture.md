# 浏览器架构

## 代码嵌入网页的方法

网页中嵌入 JavaScript 代码，主要有四种方法。

- `<script>`元素直接嵌入代码。
- `<script>`标签加载外部脚本
- 事件属性
- URL 协议

## script 元素嵌入代码

`<script>`元素内部可以直接写入 JavaScript 代码。

```html
<script>

  var x = 1 + 5;

  console.log(x);

</script>
```

`<script>`标签有一个type属性，用来指定脚本类型。对 JavaScript 脚本来说，type属性可以设为两种值。

- `text/javascript`：这是默认值，也是历史上一贯设定的值。如果你省略`type`属性，默认就是这个值。对于老式浏览器，设为这个值比较好。
- `application/javascript`：对于较新的浏览器，建议设为这个值。

```HTML
<script type="application/javascript">

  console.log('Hello World');

</script>
```

由于`<script>`标签默认就是 JavaScript 代码。所以，嵌入 JavaScript 脚本时，`type`属性可以省略。

如果`type`属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在`<script>`标签之中嵌入任意的文本内容，只要加上一个浏览器不认识的`type`属性即可。

```HTML
<script id="mydata" type="x-custom-data">

  console.log('Hello World');

</script>
```

上面的代码，浏览器不会执行，也不会显示它的内容，因为不认识它的`type`属性。但是，这个`<script>`节点依然存在于 DOM 之中，可以使用`<script>`节点的`text`属性读出它的内容。

```JavaScript
document.getElementById('mydata').text

//   console.log('Hello World');
```

## script 元素加载外部脚本

`<script>`标签也可以指定加载外部的脚本文件。

```HTML
<script src="https://www.example.com/script.js"></script>
```

如果脚本文件使用了非英语字符，还应该注明字符的编码。

```HTML
<script charset="utf-8" src="https://www.example.com/script.js"></script>
```

所加载的脚本必须是纯的 JavaScript 代码，不能有`HTML`代码和`<script>`标签。

加载外部脚本和直接添加代码块，这两种方法不能混用。下面代码的`console.log`语句直接被忽略。

```HTML
<script charset="utf-8" src="example.js">

  console.log('Hello World!');

</script>
```

为了防止攻击者篡改外部脚本，`script`标签允许设置一个`integrity`属性，写入该外部脚本的 Hash 签名，用来验证脚本的一致性。

```HTML
<script src="/assets/application.js"

  integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">

</script>
```

一旦有人改了这个脚本，导致 SHA256 签名不匹配，浏览器就会拒绝加载。

## 事件属性

网页元素的事件属性（比如`onclick`和`onmouseover`），可以写入 JavaScript 代码。当指定事件发生时，就会调用这些代码。

```HTML
<button id="myBtn" onclick="console.log(this.id)">点击</button>
```

上面的事件属性代码只有一个语句。如果有多个语句，使用分号分隔即可。

## URL 协议

URL 支持`javascript:`协议，即在 URL 的位置写入代码，使用这个 URL 的时候就会执行 JavaScript 代码。

```HTML
<a href="javascript:console.log('Hello')">点击</a>
```

浏览器的地址栏也可以执行`javascript:`协议。将`javascript:console.log('Hello')`放入地址栏，按回车键也会执行这段代码。

如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。

```HTML
<a href="javascript: new Date().toLocaleTimeString();">点击</a>
```

如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转。

```JavaScript
<a href="javascript: console.log(new Date().toLocaleTimeString())">点击</a>
```

`javascript:`协议的常见用途是书签脚本 Bookmarklet。由于浏览器的书签保存的是一个网址，所以`javascript:`网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。为了防止书签替换掉当前文档，可以在脚本前加上`void`，或者在脚本最后加上`void 0`。

```HTML
<a href="javascript: void new Date().toLocaleTimeString();">点击</a>

<a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
```

## defer 属性

为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对`<script>`元素加入`defer`属性。它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。

```HTML
<script src="a.js" defer></script>

<script src="b.js" defer></script>
```

上面代码中，只有等到 DOM 加载完成后，才会执行`a.js`和`b.js`。

`defer`属性的运行流程如下。

1. 浏览器开始解析 HTML 网页。
2. 解析过程中，发现带有`defer`属性的`<script>`元素。
3. 浏览器继续往下解析 HTML 网页，同时并行下载`<script>`元素加载的外部脚本。
4. 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。

有了`defer`属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在`DOMContentLoaded`事件触发前执行（即刚刚读取完`</html>`标签），而且可以保证执行顺序就是它们在页面上出现的顺序。

对于内置而不是加载外部脚本的`script`标签，以及动态生成的`script`标签，`defer`属性不起作用。另外，使用`defer`加载的外部脚本不应该使用`document.write`方法。

## async 属性

解决“阻塞效应”的另一个方法是对`<script>`元素加入`async`属性。

```HTML
<script src="a.js" async></script>

<script src="b.js" async></script>
```

`async`属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。

1. 浏览器开始解析 HTML 网页。
2. 解析过程中，发现带有`async`属性的`script`标签。
3. 浏览器继续往下解析 HTML 网页，同时并行下载`<script>`标签中的外部脚本。
4. 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
5. 脚本执行完毕，浏览器恢复解析 HTML 网页。

`async`属性可以保证脚本下载的同时，浏览器继续渲染。需要注意的是，一旦采用这个属性，就无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。另外，使用`async`属性的脚本文件里面的代码，不应该使用`document.write`方法。

`defer`属性和`async`属性到底应该使用哪一个？

一般来说，如果脚本之间没有依赖关系，就使用`async`属性，如果脚本之间有依赖关系，就使用`defer`属性。如果同时使用`async`和`defer`属性，后者不起作用，浏览器行为由`async`属性决定。

## 脚本的动态加载

`<script>`元素还可以动态生成，生成后再插入页面，从而实现脚本的动态加载。

```JavaScript
['a.js', 'b.js'].forEach(function(src) {

  var script = document.createElement('script');

  script.src = src;

  document.head.appendChild(script);

});
```

这种方法的好处是，动态生成的`script`标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。

如果想避免这个问题，可以设置async属性为`false`。

```JavaScript
['a.js', 'b.js'].forEach(function(src) {

  var script = document.createElement('script');

  script.src = src;

  script.async = false;

  document.head.appendChild(script);

});
```

上面的代码不会阻塞页面渲染，而且可以保证`b.js`在`a.js`后面执行。不过需要注意的是，在这段代码后面加载的脚本文件，会因此都等待`b.js`执行完成后再执行。

如果想为动态加载的脚本指定回调函数，可以使用下面的写法。

```JavaScript
function loadScript(src, done) {

  var js = document.createElement('script');

  js.src = src;

  js.onload = function() {

    done();

  };

  js.onerror = function() {

    done(new Error('Failed to load script ' + src));

  };

  document.head.appendChild(js);

}
```

## 加载使用的协议

如果不指定协议，浏览器默认采用 HTTP 协议下载。

```HTML
<script src="example.js"></script>

```

上面的`example.js`默认就是采用 HTTP 协议下载，如果要采用 HTTPS 协议下载，必需写明。

```HTML
<script src="https://example.js"></script>
```

但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。

```HTML
<script src="//example.js"></script>
```

# 浏览器架构

## 多进程架构

以谷歌浏览器为例，采用多进程架构，主要包括浏览器进程、渲染进程、GPU进程、插件进程，其中，浏览器进程和GPU进程一般只有一个，渲染进程和插件进程会有多个，具体数量根据浏览器打开多少个标签决定

**浏览器进程（Browser process）**

浏览器进程负责管理 Chrome 应用本身，包括地址栏、书签、前进和后退按钮等除了渲染外的大部分工作，浏览器进程包括几个线程：

- UI 线程：负责绘制工具栏中的按钮、地址栏、启动或者通知渲染进程进行渲染工作等。
- 文件存储线程：负责文件等功能。
- 网络线程：负责从网络中获取数据并验证数据的安全性。

**渲染进程（Renderer process）**

渲染进程负责站点的渲染，其中也包括 JavaScript 代码的运行，web worker 的管理等。

**插件进程（Plugin process）**

插件进程负责为浏览器提供各种额外的插件功能，例如 flash。

**GPU 进程（GPU process）**

GPU 进程负责提供成像的功能。

**多进程架构的优点**

当我们访问一个站点时，渲染进程会负责运行站点的代码，渲染站点的页面，同时响应用户的交互动作，当我们在 Chrome 中打开三个页签同时访问三个站点时，如果其中一个没有响应，我们可以关闭它然后使用其他的页签，这是因为 Chrome 为每个站点创建一个独立的渲染进程，专门处理当前站点的渲染工作。如果所有的页面运行在同一个进程中，当有一个页面没有响应时，所有的页面就都卡住了。

**多进程的缺点**

虽然多进程的架构优于单进程架构，但由于进程独享自己的私有内存，以渲染进程为例，虽然渲染的站点不同，但工作内容大体相似，为了完成渲染工作它们会在自己的内存中包含相同的功能，例如 V8 引擎（用于解析和运行 Javascript），这意味着这部分相同的功能需要占用每个进程的内存空间。为了节省内存，Chrome 限制了最大进程数，最大进程数取决于硬件的能力，同时**当使用多个页签访问相同的站点时浏览器不会创建新的渲染进程**。

## 输入url到渲染过程

### 数据获取阶段

1. 导航确认

在浏览器地址栏中输入关键字或者网络地址，UI线程判断是搜索还是网络资源访问，如果是网络资源访问，将地址交给网络线程，同时浏览器标签栏出现加载图标并创建或查找当前站点的渲染进程

1. 数据获取

网络线程在接收到来自UI线程的地址后，首先检查本地是否有缓存，如果没有就发起网络访问，接收到资源后根据资源的响应头进行处理并对资源做安全检查（比如同源检查），如果响应头中的资源类型是zip或其他类型的文件，网络进程将数据发送给下载管理器，检查通过后通知UI线程可以进行渲染

1. 提交确认

浏览器进程向渲染进程提交一个确认，如果渲染进程能够通过网络线程继续获取数据，渲染进程确认本次提交，开始渲染页面

### 页面渲染阶段

1. 构造DOM

当渲染进程接收到导航过程中浏览器进程的提交文档信息并开始接收HTML数据时，主线程开始解析HTML并将其转换为DOM。

DOM是能够被浏览器理解的结构，并且通过JavaScript可以进行修改。

当HTML解析器遇到了script标签，它会暂停HTML文档的解析，并且去加载-》解析-》执行js代码，因为js中可能存在类似于document.write这样的改变DOM结构的语句。

1. 样式计算

样式计算的目的是为了计算出DOM节点中每个元素的具体样式，这个阶段大体分为三步来完成。

- 把CSS转换为浏览器能够理解的结构，和HTML文件一样，浏览器也是无法直接理解这些纯文本的CSS样式，所以当渲染引擎接收到CSS文本，会将CSS文本转换为浏览器可以理解的结构---styleSheets。并且该结构同时具备了查询和修改功能，也就是后续的样式操作。
- 转换样式表中的属性值，使其标准化，也就是对styleSheets的属性值进行标准化操作。
- 计算出DOM树中每个节点的具体样式，通过CSS的继承规则和层叠规则，最终会输入每个DOM节点的样式，并被保存在ComputedStyle的结构内。

1. 创建渲染树

有了DOM树和cssStyle树上后，渲染线程需要知道每个节点的计算样式，生成renderTree。

1. 创建布局树

我们还不知道DOM树上的元素在屏幕上的具体位置，接下来就是要计算DOM树中可见元素的几何位置，生成layoutTree，这个过程就是布局

1. 绘制

在得到元素在屏幕中的位置后，还需要确定绘制顺序。在绘制步骤中，主线程遍历布局树以创建绘制记录。绘制记录的顺序是：先背景，后文字，再矩形

1. 合成

现在渲染进程知道了DOM结构，每个元素的样式，元素在页面上的几何位置，元素的渲染先后。渲染进程将这些信息转换为屏幕上的像素的过程被叫做栅格化。

合成是一种将页面的各个部分进行分层的技术，分别对不同的图层进行栅格化，并在合成线程中作为页面进行合成。因为图层都已经被栅格化，在发生滚动的时候，只需要进行图层的移动来合成一个新的帧就行了。

当图层的绘制列表准备好之后，主线程会把该绘制列表提交给合成线程，因为有些图层可能会很大，比如有些界面需要滚动好久才能滚动到底部，这时候，合成线程就会将图层划分为图块来优先满足 浏览器可视区域的渲染，这些图块的大小通常是256X256或者 512X512， 然后合成线程会按照 可视区域附近的图块来优先生成位图，这里生成位图的操作就是栅格化。

同时渲染进程维护了一个栅格化的线程池，所有图块栅格化都是在线程池中执行的：

![img](https://my8kowrlpi.feishu.cn/space/api/box/stream/download/asynccode/?code=NGJhYjM1NGU1NWU3MDhjMjZmOGYzZTRmYmNhN2I4OTBfa21yZWtDM0Rlb1QwOHBIaWZCSzU3UmZ6MFpLeDdHcTFfVG9rZW46Ym94Y25Gb0pITmNOWWhWU3NHNFh1WDBGQWNoXzE2ODAyNzMzMzM6MTY4MDI3NjkzM19WNA)

栅格化的过程会使用GPU来加速生成，使用GPU生成位图的过程叫做快速栅格化，或者GPU栅格化，生成的位图都被保存在GPU内存中。

一旦所有的图块都被栅格化，合成线程就会生成一个绘制图块的命令--“Draw Quad”, 然后将该命令提交给浏览器进程。

浏览器进程接收到命令后，会将页面内容绘制到内存中，最后再将内存显示在屏幕上。

![img](https://my8kowrlpi.feishu.cn/space/api/box/stream/download/asynccode/?code=YzliMmIzNjg0ZWY2NzhlMGQ1ODZjYmY3NDg2NmI5MDlfUlRDc3hQaEhqd0VoRmFCUDhacFJWN3lWbXcweDZjZXhfVG9rZW46Ym94Y25vemVOQ0FxMkI3a096UzJtS0p6QUZmXzE2ODAyNzMzMzM6MTY4MDI3NjkzM19WNA)

## 渲染引擎

渲染引擎的主要作用是，将网页代码渲染为用户视觉可以感知的平面文档。

不同的浏览器有不同的渲染引擎。

- Firefox：Gecko 引擎
- Safari：WebKit 引擎
- Chrome：Blink 引擎
- IE: Trident 引擎
- Edge: EdgeHTML 引擎

渲染引擎处理网页，通常分成四个阶段。

1. 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
2. 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
3. 布局：计算出渲染树的布局（layout）。
4. 绘制：将渲染树绘制到屏幕。

以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。

## JavaScript 引擎

JavaScript 引擎的主要作用是，读取网页中的 JavaScript 代码，对其处理后运行。

JavaScript 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。这样的好处是运行和修改都比较方便，刷新页面就可以重新解释；缺点是每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言。

为了提高运行速度，目前的浏览器都将 JavaScript 进行一定程度的编译，生成类似字节码（bytecode）的中间代码，以提高运行速度。

早期，浏览器内部对 JavaScript 的处理过程如下：

1. 读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
2. 对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
3. 使用“翻译器”（translator），将代码转为字节码（bytecode）。
4. 使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。

逐行解释将字节码转为机器码，是很低效的。为了提高运行速度，现代浏览器改为采用“即时编译”（Just In Time compiler，缩写 JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升。

字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为 JavaScript 引擎。并非所有的 JavaScript 虚拟机运行时都有字节码，有的 JavaScript 虚拟机基于源码，即只要有可能，就通过 JIT（just in time）编译器直接把源码编译成机器码运行，省略字节码步骤。这一点与其他采用虚拟机（比如 Java）的语言不尽相同。这样做的目的，是为了尽可能地优化代码、提高性能。

# 回流和重绘

渲染树转换为网页布局，称为“布局流”（flow）；布局显示到页面的这个过程，称为“绘制”（paint）。它们都具有阻塞效应，并且会耗费很多时间和计算资源。

页面生成以后，脚本操作和样式表操作，都会触发“重流”（reflow）和“重绘”（repaint）。用户的互动也会触发重流和重绘，比如设置了鼠标悬停（`a:hover`）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。

重流和重绘并不一定一起发生，重流必然导致重绘，重绘不一定需要重流。比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。

大多数情况下，浏览器会智能判断，将重流和重绘只限制到相关的子树上面，最小化所耗费的代价，而不会全局重新生成网页。

作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；再比如，重绘`table`布局和`flex`布局，开销都会比较大。

```JavaScript
var foo = document.getElementById('foobar');



foo.style.color = 'blue';

foo.style.marginTop = '30px';
```

上面的代码只会导致一次重绘，因为浏览器会累积 DOM 变动，然后一次性执行。

## 优化

**css：**

1. 避免使用table布局
2. 避免使用多层内联样式
3. 使用transform代替top
4. 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上
5. 开启硬件加速
6. 将频繁重绘和回流的元素设置为图层（will-change）

**js：**

1. 避免频繁操作dom和样式
2. 避免频繁读取会引发回流/重绘的属性
