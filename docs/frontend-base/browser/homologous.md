# 同源策略

## 什么是同源

所谓“同源”指的是“三个相同”。

- 协议相同
- 域名相同
- 端口相同
举例来说:
- <http://www.example.com/dir/page.html这个网址，协议是http://，域名是www.example.com，端口是80（默认端口可以省略），它的同源情况如下。>
- <http://www.example.com/dir2/other.html：同源>
- <http://example.com/dir/other.html：不同源（域名不同>）
- <http://v2.www.example.com/dir/other.html：不同源（域名不同>）
- <http://www.example.com:81/dir/other.html：不同源（端口不同>）
- <https://www.example.com/dir/page.html：不同源（协议不同>）

> 注意，标准规定端口不同的网址不是同源（比如8000端口和8001端口不是同源），但是浏览器没有遵守这条规定。实际上，同一个网域的不同端口，是可以互相读取 Cookie 的。
>
## 解决方式

## Cookie

### 设置document.domain

如果两个网页一级域名相同，只是次级域名不同，浏览器允许通过设置document.domain共享 Cookie。
举例来说，A 网页的网址是<http://w1.example.com/a.html，B> 网页的网址是<http://w2.example.com/b.html，那么只要设置相同的document.domain，两个网页就可以共享> Cookie。因为浏览器通过document.domain属性来检查是否同源。
// 两个网页都需要设置
document.domain = 'example.com';

注意，A 和 B 两个网页都需要设置document.domain属性，才能达到同源的目的。因为设置document.domain的同时，会把端口重置为null，因此如果只设置一个网页的document.domain，会导致两个网址的端口不同，还是达不到同源的目的。
现在，A 网页通过脚本设置一个 Cookie。
document.cookie = "test1=hello";

B 网页就可以读到这个 Cookie。
var allCookie = document.cookie;

注意，这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexedDB 无法通过这种方法

### 设置cookie的domain

服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如.example.com。
Set-Cookie: key=value; domain=.example.com; path=/

## iframe

网页中的iframe元素和window.open打开的窗口，如果两个窗口不同源，就无法拿到对方的DOM
document
.getElementById("myIFrame")
.contentWindow
.document
// Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
window.parent.document.body
// 报错

### 设置document.domain

如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的document.domain属性，就可以规避同源政策，拿到 DOM。
片段识别符
片段标识符（fragment identifier）指的是，URL 的#号后面的部分，比如<http://example.com/x.html#fragment的#fragment。如果只是改变片段标识符，页面不会重新刷新。>
父窗口可以把信息，写入子窗口的片段标识符。
var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;

子窗口通过监听hashchange事件得到通知。
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}

同样的，子窗口也可以改变父窗口的片段标识符。
parent.location.href = target + '#' + hash;

### window.postMessage()

这个 API 为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。
// 父窗口打开一个子窗口
var popup = window.open('http://bbb.com', 'title');
// 父窗口向子窗口发消息
popup.postMessage('Hello World!', 'http://bbb.com');

postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为*，表示不限制域名，向所有窗口发送。
子窗口向父窗口发送消息的写法类似。
// 子窗口向父窗口发消息
window.opener.postMessage('Nice to see you', 'http://aaa.com');

父窗口和子窗口都可以通过message事件，监听对方的消息。
// 父窗口和子窗口都可以用下面的代码，
// 监听 message 消息
window.addEventListener('message', function (e) {
  console.log(e.data);
},false);

message事件的参数是事件对象event，提供以下三个属性。

- *event.source：发送消息的窗口
- *event.origin: 消息发向的网址
- *event.data: 消息内容
下面的例子是，子窗口通过event.source属性引用父窗口，然后发送消息。
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  event.source.postMessage('Nice to see you!', '*');
}

上面代码有几个地方需要注意。首先，receiveMessage函数里面没有过滤信息的来源，任意网址发来的信息都会被处理。其次，postMessage方法中指定的目标窗口的网址是一个星号，表示该信息可以向任意网址发送。通常来说，这两种做法是不推荐的，因为不够安全，可能会被恶意利用。
event.origin属性可以过滤不是发给本窗口的消息。
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  if (event.origin !== 'http://aaa.com') return;
  if (event.data === 'Hello World') {
    event.source.postMessage('Hello', event.origin);
  } else {
    console.log(event.data);
  }
}

通过 JavaScript 脚本可以拿到其他窗口的window对象。如果是非同源的网页，目前允许一个窗口可以接触其他网页的window对象的九个属性和四个方法。

- window.closed
- window.frames
- window.length
- window.location
- window.opener
- window.parent
- window.self
- window.top
- window.window
- window.blur()
- window.close()
- window.focus()
- window.postMessage()
上面的九个属性之中，只有window.location是可读写的，其他八个全部都是只读。而且，即使是location对象，非同源的情况下，也只允许调用location.replace()方法和写入location.href属性。

## AJAX

### 服务器代理

通过架设中间服务器为浏览器的请求做转发
JSONP
JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单易用，没有兼容性问题，老式浏览器全部支持，服务端改造非常小。
原理
jsonp利用`script`标签不受同源的影响，将回调函数名作为脚本地址的查询参数，浏览器返回一段脚本，并将响应数据作为回调函数的参数
实现步骤

1. 网页添加一个`<script>`元素，将回调函数名称作为脚本地址的查询参数，告诉服务器响应后调用的函数。

```js
<script src="http://api.foo.com?callback=bar"></script>
```

2. 服务器收到请求后，拼接一个字符串，将 JSON 数据放在函数名里面，作为字符串返回（bar({...})）。
3. 客户端会将服务器返回的字符串，作为代码解析，因为浏览器认为，这是`<script>`标签请求的脚本内容。这时，客户端只要定义了bar()函数，就能在该函数体内，拿到服务器返回的 JSON 数据。

### WebSocket

WebSocket 是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
下面是一个例子，浏览器发出的 WebSocket 请求的头信息（摘自维基百科）。
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: <http://example.com>

上面代码中，有一个字段是Origin，表示该请求的请求源（origin），即发自哪个域名。
正是因为有了Origin这个字段，所以 WebSocket 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat

### CORS

CORS 属于跨源 AJAX 请求的根本解决方法，允许任何类型的请求。CORS的整个过程都由浏览器自动完成，与AJAX通信的写法并没有什么区别，实现的关键是服务器，只要服务器实现了CORS接口，就可以进行CORS通信
简单请求
定义
只要同时满足以下两大条件，就属于简单请求。

1. 请求方法是以下三种方法之一。

- HEAD
- GET
- POST

2. HTTP 的头信息不超出以下几种字段。

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
简单一句话，一个请求拥有简单的请求方法和请求头，就是一个简单请求
基本流程
对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个Origin字段。
GET /cors HTTP/1.1
Origin: <http://api.bob.com>
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

如果Origin指定的源不在许可范围内，服务器会返回一个正常的 HTTP 回应。
浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。
注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是200。
如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。
Access-Control-Allow-Origin: <http://api.bob.com>
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8

（1）Access-Control-Allow-Origin
该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
（2）Access-Control-Allow-Credentials
该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。设为true，即表示服务器明确许可，浏览器可以把 Cookie 包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送 Cookie，不发送该字段即可。
（3）Access-Control-Expose-Headers
该字段可选。CORS 请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个服务器返回的基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。
withCredentials 属性
CORS 请求默认不包含 Cookie 信息（以及 HTTP 认证信息等），这是为了降低 CSRF 攻击的风险。但是某些场合，服务器可能需要拿到 Cookie，这时需要服务器显式指定Access-Control-Allow-Credentials字段，告诉浏览器可以发送 Cookie。
Access-Control-Allow-Credentials: true

同时，开发者必须在 AJAX 请求中打开withCredentials属性。
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

否则，即使服务器要求发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理。
但是，有的浏览器默认将withCredentials属性设为true。这导致如果省略withCredentials设置，这些浏览器可能还是会一起发送 Cookie。这时，可以显式关闭withCredentials。
xhr.withCredentials = false;

需要注意的是，如果服务器要求浏览器发送 Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨域）原网页代码中的document.cookie也无法读取服务器域名下的 Cookie。
非简单请求
预检请求
非简单请求是那种对服务器提出特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为“预检”请求（preflight）。浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 方法和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。这是为了防止这些新增的请求，对传统的没有 CORS 支持的服务器形成压力，给服务器一个提前拒绝的机会，这样可以防止服务器收到大量DELETE和PUT请求，这些传统的表单不可能跨域发出的请求。
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();

浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。下面是这个“预检”请求的 HTTP 头信息。
OPTIONS /cors HTTP/1.1
Origin: <http://api.bob.com>
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

“预检”请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。
除了Origin字段，“预检”请求的头信息包括两个特殊字段。
（1）Access-Control-Request-Method
该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是PUT。
（2）Access-Control-Request-Headers
该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段，上例是X-Custom-Header。
预检请求的回应
服务器收到“预检”请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: <http://api.bob.com>
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain

上面的 HTTP 回应中，关键的是Access-Control-Allow-Origin字段，表示<http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。>
Access-Control-Allow-Origin: *

如果服务器否定了“预检”请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段，或者明确表示请求不符合条件。
OPTIONS <http://api.bob.com> HTTP/1.1
Status: 200
Access-Control-Allow-Origin: <https://notyourdomain.com>
Access-Control-Allow-Method: POST

上面的服务器回应，Access-Control-Allow-Origin字段明确不包括发出请求的<http://api.bob.com。>
这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。
XMLHttpRequest cannot load <http://api.alice.com>.
Origin <http://api.bob.com> is not allowed by Access-Control-Allow-Origin.

服务器回应的其他 CORS 相关字段如下。
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000

（1）Access-Control-Allow-Methods
该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次“预检”请求。
（2）Access-Control-Allow-Headers
如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在“预检”中请求的字段。
（3）Access-Control-Allow-Credentials
该字段与简单请求时的含义相同。
（4）Access-Control-Max-Age
该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。
浏览器的正常请求和回应
一旦服务器通过了“预检”请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。
下面是“预检”请求之后，浏览器的正常 CORS 请求。
PUT /cors HTTP/1.1
Origin: <http://api.bob.com>
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

上面头信息的Origin字段是浏览器自动添加的。
下面是服务器正常的回应。
Access-Control-Allow-Origin: <http://api.bob.com>
Content-Type: text/html; charset=utf-8

上面头信息中，Access-Control-Allow-Origin字段是每次回应都必定包含的。
与 JSONP 的比较
CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。JSONP 只支持GET请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。
