# BOM

```js
window 对象
概述
浏览器里面，window对象（注意，w为小写）指当前的浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属。一个变量如果未声明，那么默认就是顶层对象的属性。
a = 1;
window.a // 1

上面代码中，a是一个没有声明就直接赋值的变量，它自动成为顶层对象的属性。
window有自己的实体含义，其实不适合当作最高一层的顶层对象，这是一个语言的设计失误。最早，设计这门语言的时候，原始设想是语言内置的对象越少越好，这样可以提高浏览器的性能。因此，语言设计者 Brendan Eich 就把window对象当作顶层对象，所有未声明就赋值的变量都自动变成window对象的属性。这种设计使得编译阶段无法检测出未声明变量，但到了今天已经没有办法纠正了。
属性
window.name
window.name属性是一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的target属性使用。
window.name = 'Hello World!';
console.log(window.name)
// "Hello World!"

该属性只能保存字符串，如果写入的值不是字符串，会自动转成字符串。各个浏览器对这个值的储存容量有所不同，但是一般来说，可以高达几MB。
只要浏览器窗口不关闭，这个属性是不会消失的。举例来说，访问a.com时，该页面的脚本设置了window.name，接下来在同一个窗口里面载入了b.com，新页面的脚本可以读到上一个网页设置的window.name。页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性保存的值就会消失，因为这时窗口已经不存在了。
window.closed，window.opener
window.closed属性返回一个布尔值，表示窗口是否关闭。
window.closed // false

上面代码检查当前窗口是否关闭。这种检查意义不大，因为只要能运行代码，当前窗口肯定没有关闭。这个属性一般用来检查，使用脚本打开的新窗口是否关闭。
var popup = window.open();

if ((popup !== null) && !popup.closed) {
  // 窗口仍然打开着
}

window.opener属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回null。
window.open().opener === window // true

上面表达式会打开一个新窗口，然后返回true。
如果两个窗口之间不需要通信，建议将子窗口的opener属性显式设为null，这样可以减少一些安全隐患。
var newWin = window.open('example.html', 'newWindow', 'height=400,width=400');
newWin.opener = null;

上面代码中，子窗口的opener属性设为null，两个窗口之间就没办法再联系了。
通过opener属性，可以获得父窗口的全局属性和方法，但只限于两个窗口同源的情况（参见《同源限制》一章），且其中一个窗口由另一个打开。<a>元素添加rel="noopener"属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 URL 的风险。
<a href="https://an.evil.site" target="_blank" rel="noopener">
恶意网站
</a>

window.self，window.window
window.self和window.window属性都指向窗口本身。这两个属性只读。
window.self === window // true
window.window === window // true

window.frames，window.length
window.frames属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素。window.frames[0]表示页面中第一个框架窗口。
如果iframe元素设置了id或name属性，那么就可以用属性值，引用这个iframe窗口。比如<iframe name="myIFrame">可以用frames['myIFrame']或者frames.myIFrame来引用。
frames属性实际上是window对象的别名。
frames === window // true

因此，frames[0]也可以用window[0]表示。但是，从语义上看，frames更清晰，而且考虑到window还是全局对象，因此推荐表示多窗口时，总是使用frames[0]的写法。更多介绍请看下文的《多窗口操作》部分。
window.length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window.length就返回0。
window.frames.length === window.length // true

上面代码表示，window.frames.length与window.length应该是相等的。
window.frameElement
window.frameElement属性主要用于当前窗口嵌在另一个网页的情况（嵌入<object>、<iframe>或<embed>元素），返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回null。
// HTML 代码如下
// <iframe src="about.html"></iframe>

// 下面的脚本在 about.html 里面
var frameEl = window.frameElement;
if (frameEl) {
  frameEl.src = 'other.html';
}

上面代码中，frameEl变量就是<iframe>元素。
window.top，window.parent
window.top属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。
window.parent属性指向父窗口。如果当前窗口没有父窗口，window.parent指向自身。
if (window.parent !== window.top) {
  // 表明当前窗口嵌入不止一层
}

对于不包含框架的网页，这两个属性等同于window对象。
window.status
window.status属性用于读写浏览器状态栏的文本。但是，现在很多浏览器都不允许改写状态栏文本，所以使用这个方法不一定有效。
window.devicePixelRatio
window.devicePixelRatio属性返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率。也就是说，它表示一个 CSS 像素由多少个物理像素组成。它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片。
位置大小属性
以下属性返回window对象的位置信息和大小信息。
（1）window.screenX，window.screenY
window.screenX和window.screenY属性，返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。
（2） window.innerHeight，window.innerWidth
window.innerHeight和window.innerWidth属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。
用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因此可见部分（视口）就变小了。
注意，这两个属性值包括滚动条的高度和宽度。
（3）window.outerHeight，window.outerWidth
window.outerHeight和window.outerWidth属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。
（4）window.scrollX，window.scrollY
window.scrollX属性返回页面的水平滚动距离，window.scrollY属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读。
注意，这两个属性的返回值不是整数，而是双精度浮点数。如果页面没有滚动，它们的值就是0。
举例来说，如果用户向下拉动了垂直滚动条75像素，那么window.scrollY就是75左右。用户水平向右拉动水平滚动条200像素，window.scrollX就是200左右。
if (window.scrollY < 75) {
  window.scroll(0, 75);
}

上面代码中，如果页面向下滚动的距离小于75像素，那么页面向下滚动75像素。
（5）window.pageXOffset，window.pageYOffset
window.pageXOffset属性和window.pageYOffset属性，是window.scrollX和window.scrollY别名。
组件属性
组件属性返回浏览器的组件对象。这样的属性有下面几个。

- window.locationbar：地址栏对象
- window.menubar：菜单栏对象
- window.scrollbars：窗口的滚动条对象
- window.toolbar：工具栏对象
- window.statusbar：状态栏对象
- window.personalbar：用户安装的个人工具栏对象
这些对象的visible属性是一个布尔值，表示这些组件是否可见。这些属性只读。
window.locationbar.visible
window.menubar.visible
window.scrollbars.visible
window.toolbar.visible
window.statusbar.visible
window.personalbar.visible

全局对象属性
全局对象属性指向一些浏览器原生的全局对象。

- window.document：指向document对象，详见《document 对象》一章。注意，这个属性有同源限制。只有来自同源的脚本才能读取这个属性。
- window.location：指向Location对象，用于获取当前窗口的 URL 信息。它等同于document.location属性，详见《Location 对象》一章。
- window.navigator：指向Navigator对象，用于获取环境信息，详见《Navigator 对象》一章。
- window.history：指向History对象，表示浏览器的浏览历史，详见《History 对象》一章。
- window.localStorage：指向本地储存的 localStorage 数据，详见《Storage 接口》一章。
- window.sessionStorage：指向本地储存的 sessionStorage 数据，详见《Storage 接口》一章。
- window.console：指向console对象，用于操作控制台，详见《console 对象》一章。
- window.screen：指向Screen对象，表示屏幕信息，详见《Screen 对象》一章。
window.isSecureContext
window.isSecureContext属性返回一个布尔值，表示当前窗口是否处在加密环境。如果是 HTTPS 协议，就是true，否则就是false。
方法
window.alert()，window.prompt()，window.confirm()
window.alert()、window.prompt()、window.confirm()都是浏览器与用户互动的全局方法。它们会弹出不同的对话框，要求用户做出回应。注意，这三个方法弹出的对话框，都是浏览器统一规定的式样，无法定制。
（1）window.alert()
window.alert()方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。
window.alert('Hello World');

用户只有点击“确定”按钮，对话框才会消失。对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了。
window.alert()方法的参数只能是字符串，没法使用 CSS 样式，但是可以用\n指定换行。
alert('本条提示\n分成两行');

（2）window.prompt()
window.prompt()方法弹出的对话框，提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。
var result = prompt('您的年龄？', 25)

上面代码会跳出一个对话框，文字提示为“您的年龄？”，要求用户在对话框中输入自己的年龄（默认显示25）。用户填入的值，会作为返回值存入变量result。
window.prompt()的返回值有两种情况，可能是字符串（有可能是空字符串），也有可能是null。具体分成三种情况。

1. 用户输入信息，并点击“确定”，则用户输入的信息就是返回值。
2. 用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
3. 用户点击了“取消”（或者按了 ESC 按钮），则返回值是null。
window.prompt()方法的第二个参数是可选的，但是最好总是提供第二个参数，作为输入框的默认值。
（3）window.confirm()
window.confirm()方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户是否同意。
var result = confirm('你最近好吗？');

上面代码弹出一个对话框，上面只有一行文字“你最近好吗？”，用户选择点击“确定”或“取消”。
confirm方法返回一个布尔值，如果用户点击“确定”，返回true；如果用户点击“取消”，则返回false。
var okay = confirm('Please confirm this message.');
if (okay) {
  // 用户按下“确定”
} else {
  // 用户按下“取消”
}

confirm的一个用途是，用户离开当前页面时，弹出一个对话框，问用户是否真的要离开。
window.onunload = function () {
  return window.confirm('你确定要离开当面页面吗？');
}

这三个方法都具有堵塞效应，一旦弹出对话框，整个页面就是暂停执行，等待用户做出反应。
window.open(), window.close()，window.stop()
（1）window.open()
window.open方法用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项。它会返回新窗口的引用，如果无法新建窗口，则返回null。
var popup = window.open('somefile.html');

上面代码会让浏览器弹出一个新建窗口，网址是当前域名下的somefile.html。
open方法一共可以接受三个参数。
window.open(url, windowName, [windowFeatures])

- url：字符串，表示新窗口的网址。如果省略，默认网址就是about:blank。
- windowName：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则占用该窗口，不再新建窗口。如果省略，就默认使用_blank，表示新建一个没有名字的窗口。另外还有几个预设值，_self表示当前窗口，_top表示顶层窗口，_parent表示上一层窗口。
- windowFeatures：字符串，内容为逗号分隔的键值对（详见下文），表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整 UI 的新窗口。如果新建的是一个已经存在的窗口，则该参数不起作用，浏览器沿用以前窗口的参数。
下面是一个例子。
var popup = window.open(
  'somepage.html',
  'DefinitionsWindows',
  'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
);

上面代码表示，打开的新窗口高度和宽度都为200像素，没有地址栏，但有状态栏和滚动条，允许用户调整大小。
第三个参数可以设定如下属性。

- left：新窗口距离屏幕最左边的距离（单位像素）。注意，新窗口必须是可见的，不能设置在屏幕以外的位置。
- top：新窗口距离屏幕最顶部的距离（单位像素）。
- height：新窗口内容区域的高度（单位像素），不得小于100。
- width：新窗口内容区域的宽度（单位像素），不得小于100。
- outerHeight：整个浏览器窗口的高度（单位像素），不得小于100。
- outerWidth：整个浏览器窗口的宽度（单位像素），不得小于100。
- menubar：是否显示菜单栏。
- toolbar：是否显示工具栏。
- location：是否显示地址栏。
- personalbar：是否显示用户自己安装的工具栏。
- status：是否显示状态栏。
- dependent：是否依赖父窗口。如果依赖，那么父窗口最小化，该窗口也最小化；父窗口关闭，该窗口也关闭。
- minimizable：是否有最小化按钮，前提是dialog=yes。
- noopener：新窗口将与父窗口切断联系，即新窗口的window.opener属性返回null，父窗口的window.open()方法也返回null。
- resizable：新窗口是否可以调节大小。
- scrollbars：是否允许新窗口出现滚动条。
- dialog：新窗口标题栏是否出现最大化、最小化、恢复原始大小的控件。
- titlebar：新窗口是否显示标题栏。
- alwaysRaised：是否显示在所有窗口的顶部。
- alwaysLowered：是否显示在父窗口的底下。
- close：新窗口是否显示关闭按钮。
对于那些可以打开和关闭的属性，设为yes或1或不设任何值就表示打开，比如status=yes、status=1、status都会得到同样的结果。如果想设为关闭，不用写no，而是直接省略这个属性即可。也就是说，如果在第三个参数中设置了一部分属性，其他没有被设置的yes/no属性都会被设成no，只有titlebar和关闭按钮除外（它们的值默认为yes）。
上面这些属性，属性名与属性值之间用等号连接，属性与属性之间用逗号分隔。
'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'

另外，open()方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许open方法指向该窗口。
window.open方法返回新窗口的引用。
var windowB = window.open('windowB.html', 'WindowB');
windowB.window.name // "WindowB"

注意，如果新窗口和父窗口不是同源的（即不在同一个域），它们彼此不能获取对方窗口对象的内部属性。
下面是另一个例子。
var w = window.open();
console.log('已经打开新窗口');
w.location = 'http://example.com';

上面代码先打开一个新窗口，然后在该窗口弹出一个对话框，再将网址导向example.com。
由于open这个方法很容易被滥用，许多浏览器默认都不允许脚本自动新建窗口。只允许在用户点击链接或按钮时，脚本做出反应，弹出新窗口。因此，有必要检查一下打开新窗口是否成功。
var popup = window.open();
if (popup === null) {
  // 新建窗口失败
}

（2）window.close()
window.close方法用于关闭当前窗口，一般只用来关闭window.open方法新建的窗口。
popup.close()

该方法只对顶层窗口有效，iframe框架之中的窗口使用该方法无效。
（3）window.stop()
window.stop()方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。
window.stop()

window.moveTo()，window.moveBy()
window.moveTo()方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。
window.moveTo(100, 200)

上面代码将窗口移动到屏幕(100, 200)的位置。
window.moveBy()方法将窗口移动到一个相对位置。它接受两个参数，分别是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。
window.moveBy(25, 50)

上面代码将窗口向右移动25像素、向下移动50像素。
为了防止有人滥用这两个方法，随意移动用户的窗口，目前只有一种情况，浏览器允许用脚本移动窗口：该窗口是用window.open()方法新建的，并且窗口里只有它一个 Tab 页。除此以外的情况，使用上面两个方法都是无效的。
window.resizeTo()，window.resizeBy()
window.resizeTo()方法用于缩放窗口到指定大小。
它接受两个参数，第一个是缩放后的窗口宽度（outerWidth属性，包含滚动条、标题栏等等），第二个是缩放后的窗口高度（outerHeight属性）。
window.resizeTo(
  window.screen.availWidth / 2,
  window.screen.availHeight / 2
)

上面代码将当前窗口缩放到，屏幕可用区域的一半宽度和高度。
window.resizeBy()方法用于缩放窗口。它与window.resizeTo()的区别是，它按照相对的量缩放，window.resizeTo()需要给出缩放后的绝对大小。
它接受两个参数，第一个是水平缩放的量，第二个是垂直缩放的量，单位都是像素。
window.resizeBy(-200, -200)

上面的代码将当前窗口的宽度和高度，都缩小200像素。
window.scrollTo()，window.scroll()，window.scrollBy()
window.scrollTo方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。
window.scrollTo(x-coord, y-coord)

它也可以接受一个配置对象作为参数。
window.scrollTo(options)

配置对象options有三个属性。

- top：滚动后页面左上角的垂直坐标，即 y 坐标。
- left：滚动后页面左上角的水平坐标，即 x 坐标。
- behavior：字符串，表示滚动的方式，有三个可能值（smooth、instant、auto），默认值为auto。
window.scrollTo({
  top: 1000,
  behavior: 'smooth'
});

window.scroll()方法是window.scrollTo()方法的别名。
window.scrollBy()方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。
window.scrollBy(0, window.innerHeight)

上面代码用于将网页向下滚动一屏。
如果不是要滚动整个文档，而是要滚动某个元素，可以使用下面三个属性和方法。

- Element.scrollTop
- Element.scrollLeft
- Element.scrollIntoView()
window.print()
window.print方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。
常见的打印按钮代码如下。
document.getElementById('printLink').onclick = function () {
  window.print();
}

非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。
if (typeof window.print === 'function') {
  // 支持打印功能
}

window.focus()，window.blur()
window.focus()方法会激活窗口，使其获得焦点，出现在其他窗口的前面。
var popup = window.open('popup.html', 'Popup Window');

if ((popup !== null) && !popup.closed) {
  popup.focus();
}

上面代码先检查popup窗口是否依然存在，确认后激活该窗口。
window.blur()方法将焦点从窗口移除。
当前窗口获得焦点时，会触发focus事件；当前窗口失去焦点时，会触发blur事件。
window.getSelection()
window.getSelection方法返回一个Selection对象，表示用户现在选中的文本。
var selObj = window.getSelection();

使用Selection对象的toString方法可以得到选中的文本。
var selectedText = selObj.toString();

window.getComputedStyle()，window.matchMedia()
window.getComputedStyle()方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象，详见《CSS 操作》一章。
window.matchMedia()方法用来检查 CSS 的mediaQuery语句，详见《CSS 操作》一章。
window.requestAnimationFrame()
window.requestAnimationFrame()方法跟setTimeout类似，都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，window.requestAnimationFrame()则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，requestAnimationFrame()会暂停执行。
如果某个函数会改变网页的布局，一般就放在window.requestAnimationFrame()里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。
该方法接受一个回调函数作为参数。
window.requestAnimationFrame(callback)

上面代码中，callback是一个回调函数。callback执行时，它的参数就是系统传入的一个高精度时间戳（performance.now()的返回值），单位是毫秒，表示距离网页加载的时间。
window.requestAnimationFrame()的返回值是一个整数，这个整数可以传入window.cancelAnimationFrame()，用来取消回调函数的执行。
下面是一个window.requestAnimationFrame()执行网页动画的例子。
var element = document.getElementById('animate');
element.style.position = 'absolute';

var start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  // 元素不断向左移，最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px';
  // 如果距离第一次执行不超过 2000 毫秒，
  // 就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);

上面代码定义了一个网页动画，持续时间是2秒，会让元素向右移动。
window.requestIdleCallback()
window.requestIdleCallback()跟setTimeout类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用window.requestIdleCallback()将其推迟执行，以保证网页性能。
它跟window.requestAnimationFrame()的区别在于，后者指定回调函数在下一次浏览器重排时执行，问题在于下一次重排时，系统资源未必空闲，不一定能保证在16毫秒之内完成；window.requestIdleCallback()可以保证回调函数在系统资源空闲时执行。
该方法接受一个回调函数和一个配置对象作为参数。配置对象可以指定一个推迟执行的最长时间，如果过了这个时间，回调函数不管系统资源有无空闲，都会执行。
window.requestIdleCallback(callback[, options])

callback参数是一个回调函数。该回调函数执行时，系统会传入一个IdleDeadline对象作为参数。IdleDeadline对象有一个didTimeout属性（布尔值，表示是否为超时调用）和一个timeRemaining()方法（返回该空闲时段剩余的毫秒数）。
options参数是一个配置对象，目前只有timeout一个属性，用来指定回调函数推迟执行的最大毫秒数。该参数可选。
window.requestIdleCallback()方法返回一个整数。该整数可以传入window.cancelIdleCallback()取消回调函数。
下面是一个例子。
requestIdleCallback(myNonEssentialWork);

function myNonEssentialWork(deadline) {
  while (deadline.timeRemaining() > 0) {
    doWorkIfNeeded();
  }
}

上面代码中，requestIdleCallback()用来执行非关键任务myNonEssentialWork。该任务先确认本次空闲时段有剩余时间，然后才真正开始执行任务。
下面是指定timeout的例子。
requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 });

上面代码指定，processPendingAnalyticsEvents必须在未来2秒之内执行。
如果由于超时导致回调函数执行，则deadline.timeRemaining()返回0，deadline.didTimeout返回true。
如果多次执行window.requestIdleCallback()，指定多个回调函数，那么这些回调函数将排成一个队列，按照先进先出的顺序执行。
事件
window对象可以接收以下事件。
load 事件和 onload 属性
load事件发生在文档在浏览器窗口加载完毕时。window.onload属性可以指定这个事件的回调函数。
window.onload = function() {
  var elements = document.getElementsByClassName('example');
  for (var i = 0; i < elements.length; i++) {
    var elt = elements[i];
    // ...
  }
};

上面代码在网页加载完毕后，获取指定元素并进行处理。
error 事件和 onerror 属性
浏览器脚本发生错误时，会触发window对象的error事件。我们可以通过window.onerror属性对该事件指定回调函数。
window.onerror = function (message, filename, lineno, colno, error) {
  console.log("出错了！--> %s", error.stack);
};

由于历史原因，window的error事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。

- 出错信息
- 出错脚本的网址
- 行号
- 列号
- 错误对象
老式浏览器只支持前三个参数。
并不是所有的错误，都会触发 JavaScript 的error事件（即让 JavaScript 报错）。一般来说，只有 JavaScript 脚本的错误，才会触发这个事件，而像资源文件不存在之类的错误，都不会触发。
下面是一个例子，如果整个页面未捕获错误超过3个，就显示警告。
window.onerror = function(msg, url, line) {
  if (onerror.num++ > onerror.max) {
    alert('ERROR: ' + msg + '\n' + url + ':' + line);
    return true;
  }
}
onerror.max = 3;
onerror.num = 0;

需要注意的是，如果脚本网址与网页网址不在同一个域（比如使用了 CDN），浏览器根本不会提供详细的出错信息，只会提示出错，错误类型是“Script error.”，行号为0，其他信息都没有。这是浏览器防止向外部脚本泄漏信息。一个解决方法是在脚本所在的服务器，设置Access-Control-Allow-Origin的 HTTP 头信息。
Access-Control-Allow-Origin: *

然后，在网页的<script>标签中设置crossorigin属性。
<script crossorigin="anonymous" src="//example.com/file.js"></script>

上面代码的crossorigin="anonymous"表示，读取文件不需要身份信息，即不需要 cookie 和 HTTP 认证信息。如果设为crossorigin="use-credentials"，就表示浏览器会上传 cookie 和 HTTP 认证信息，同时还需要服务器端打开 HTTP 头信息Access-Control-Allow-Credentials。
window 对象的事件监听属性
除了具备元素节点都有的 GlobalEventHandlers 接口，window对象还具有以下的事件监听函数属性。

- window.onafterprint：afterprint事件的监听函数。
- window.onbeforeprint：beforeprint事件的监听函数。
- window.onbeforeunload：beforeunload事件的监听函数。
- window.onhashchange：hashchange事件的监听函数。
- window.onlanguagechange: languagechange的监听函数。
- window.onmessage：message事件的监听函数。
- window.onmessageerror：MessageError事件的监听函数。
- window.onoffline：offline事件的监听函数。
- window.ononline：online事件的监听函数。
- window.onpagehide：pagehide事件的监听函数。
- window.onpageshow：pageshow事件的监听函数。
- window.onpopstate：popstate事件的监听函数。
- window.onstorage：storage事件的监听函数。
- window.onunhandledrejection：未处理的 Promise 对象的reject事件的监听函数。
- window.onunload：unload事件的监听函数。
多窗口操作
由于网页可以使用iframe元素，嵌入其他网页，因此一个网页之中会形成多个窗口。如果子窗口之中又嵌入别的网页，就会形成多级窗口。
窗口的引用
各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。
- top：顶层窗口，即最上层的那个窗口
- parent：父窗口
- self：当前窗口，即自身
下面代码可以判断，当前窗口是否为顶层窗口。
if (window.top === window.self) {
  // 当前窗口是顶层窗口
} else {
  // 当前窗口是子窗口
}

下面的代码让父窗口的访问历史后退一次。
window.parent.history.back();

与这些变量对应，浏览器还提供一些特殊的窗口名，供window.open()方法、<a>标签、<form>标签等引用。

- _top：顶层窗口
- _parent：父窗口
- _blank：新窗口
下面代码就表示在顶层窗口打开链接。
<a href="somepage.html" target="_top">Link</a>

iframe 元素
对于iframe嵌入的窗口，document.getElementById方法可以拿到该窗口的 DOM 节点，然后使用contentWindow属性获得iframe节点包含的window对象。
var frame = document.getElementById('theFrame');
var frameWindow = frame.contentWindow;

上面代码中，frame.contentWindow可以拿到子窗口的window对象。然后，在满足同源限制的情况下，可以读取子窗口内部的属性。
// 获取子窗口的标题
frameWindow.title

<iframe>元素的contentDocument属性，可以拿到子窗口的document对象。
var frame = document.getElementById('theFrame');
var frameDoc = frame.contentDocument;

// 等同于
var frameDoc = frame.contentWindow.document;

<iframe>元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，否则只有使用window.postMessage方法。
<iframe>窗口内部，使用window.parent引用父窗口。如果当前页面没有父窗口，则window.parent属性返回自身。因此，可以通过window.parent是否等于window.self，判断当前窗口是否为iframe窗口。
if (window.parent !== window.self) {
  // 当前窗口是子窗口
}

<iframe>窗口的window对象，有一个frameElement属性，返回<iframe>在父窗口中的 DOM 节点。对于非嵌入的窗口，该属性等于null。
var f1Element = document.getElementById('f1');
var f1Window = f1Element.contentWindow;

f1Window.frameElement === f1Element // true
window.frameElement === null // true

window.frames 属性
window.frames属性返回一个类似数组的对象，成员是所有子窗口的window对象。可以使用这个属性，实现窗口之间的互相引用。比如，frames[0]返回第一个子窗口，frames[1].frames[2]返回第二个子窗口内部的第三个子窗口，parent.frames[1]返回父窗口的第二个子窗口。
注意，window.frames每个成员的值，是框架内的窗口（即框架的window对象），而不是iframe标签在父窗口的 DOM 节点。如果要获取每个框架内部的 DOM 树，需要使用window.frames[0].document的写法。
另外，如果<iframe>元素设置了name或id属性，那么属性值会自动成为全局变量，并且可以通过window.frames属性引用，返回子窗口的window对象。
// HTML 代码为 <iframe id="myFrame">
window.myFrame // [HTMLIFrameElement]
frames.myframe === myFrame // true

另外，name属性的值会自动成为子窗口的名称，可以用在window.open方法的第二个参数，或者<a>和<frame>标签的target属性。
History 对象
概述
window.history属性指向 History 对象，它表示当前窗口的浏览历史。
History 对象保存了当前窗口访问过的所有页面网址。下面代码表示当前窗口一共访问过3个网址。
window.history.length // 3

由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。
// 后退到前一个网址
history.back()

// 等同于
history.go(-1)

浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。
属性
History 对象主要有两个属性。

- History.length：当前窗口访问过的网址数量（包括当前网页）
- History.state：History 堆栈最上层的状态值（详见下文）
// 当前窗口访问过多少个网页
window.history.length // 1

// History 对象的当前状态
// 通常是 undefined，即未设置
window.history.state // undefined

方法
History.back()、History.forward()、History.go()
这三个方法用于在历史之中移动。

- History.back()：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
- History.forward()：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
- History.go()：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go(1)相当于forward()，go(-1)相当于back()。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为0，相当于刷新当前页面。
history.back();
history.forward();
history.go(-2);

history.go(0)相当于刷新当前页面。
history.go(0); // 刷新当前页面

注意，移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。
History.pushState()，
History.pushState()方法用于在历史中添加一条记录。
window.history.pushState(state, title, url)

该方法接受三个参数，依次为：

- state：一个与添加的记录相关联的状态对象，主要用于popstate事件。该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填null。
- title：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
假定当前网址是example.com/1.html，使用pushState()方法在浏览记录（History 对象）中添加一个新记录。
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');

添加新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。这时，在地址栏输入一个新的地址(比如访问google.com)，然后点击了倒退按钮，页面的 URL 将显示2.html；你再点击一次倒退按钮，URL 将显示1.html。
总之，pushState()方法不会触发页面刷新，只是导致 History 对象发生变化，地址栏会有反应。
使用该方法之后，就可以用History.state属性读出状态对象。
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
history.state // {foo: "bar"}

如果pushState的 URL 参数设置了一个新的锚点值（即hash），并不会触发hashchange事件。反过来，如果 URL 的锚点值变了，则会在 History 对象创建一条浏览记录。
如果pushState()方法设置了一个跨域网址，则会报错。
// 报错
// 当前网址为 <http://example.com>
history.pushState(null, '', 'https://twitter.com/hello');

上面代码中，pushState想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上，因为这个方法不会导致页面跳转。
History.replaceState()
History.replaceState()方法用来修改 History 对象的当前记录，其他都与pushState()方法一模一样。
假定当前网页是example.com/example.html。
history.pushState({page: 1}, 'title 1', '?page=1')
// URL 显示为 <http://example.com/example.html?page=1>

history.pushState({page: 2}, 'title 2', '?page=2');
// URL 显示为 <http://example.com/example.html?page=2>

history.replaceState({page: 3}, 'title 3', '?page=3');
// URL 显示为 <http://example.com/example.html?page=3>

history.back()
// URL 显示为 <http://example.com/example.html?page=1>

history.back()
// URL 显示为 <http://example.com/example.html>

history.go(2)
// URL 显示为 <http://example.com/example.html?page=3>

popstate 事件
每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。
注意，仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。
使用的时候，可以为popstate事件指定回调函数。
window.onpopstate = function (event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
};

// 或者
window.addEventListener('popstate', function(event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
});

回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前 URL 所提供的状态对象（即这两个方法的第一个参数）。上面代码中的event.state，就是通过pushState和replaceState方法，为当前 URL 绑定的state对象。
这个state对象也可以直接通过history对象读取。
var currentState = history.state;

注意，页面第一次加载的时候，浏览器不会触发popstate事件。
Location 对象
Location对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过window.location和document.location属性，可以拿到这个对象。
属性
Location对象提供以下属性。

- Location.href：整个 URL。
- Location.protocol：当前 URL 的协议，包括冒号（:）。
- Location.host：主机。如果端口不是协议默认的80和433，则还会包括冒号（:）和端口。
- Location.hostname：主机名，不包括端口。
- Location.port：端口号。
- Location.pathname：URL 的路径部分，从根路径/开始。
- Location.search：查询字符串部分，从问号?开始。
- Location.hash：片段字符串部分，从#开始。
- Location.username：域名前面的用户名。
- Location.password：域名前面的密码。
- Location.origin：URL 的协议、主机名和端口。
// 当前网址为
// <http://user:passwd@www.example.com:4097/path/a.html?x=111#part1>
document.location.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol
// "http:"
document.location.host
// "www.example.com:4097"
document.location.hostname
// "www.example.com"
document.location.port
// "4097"
document.location.pathname
// "/path/a.html"
document.location.search
// "?x=111"
document.location.hash
// "#part1"
document.location.username
// "user"
document.location.password
// "passwd"
document.location.origin
// "http://user:passwd@www.example.com:4097"

这些属性里面，只有origin属性是只读的，其他属性都可写。
注意，如果对Location.href写入新的 URL 地址，浏览器会立刻跳转到这个新地址。
// 跳转到新网址
document.location.href = 'http://www.example.com';

这个特性常常用于让网页自动滚动到新的锚点。
document.location.href = '#top';
// 等同于
document.location.hash = '#top';

直接改写location，相当于写入href属性。
document.location = 'http://www.example.com';
// 等同于
document.location.href = 'http://www.example.com';

另外，Location.href属性是浏览器唯一允许跨域写入的属性，即非同源的窗口可以改写另一个窗口（比如子窗口与父窗口）的Location.href属性，导致后者的网址跳转。Location的其他属性都不允许跨域写入。
方法
（1）Location.assign()
assign方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。
// 跳转到新的网址
document.location.assign('http://www.example.com')

（2）Location.replace()
replace方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。
它与assign方法的差异在于，replace会在浏览器的浏览历史History里面删除当前网址，也就是说，一旦使用了该方法，后退按钮就无法回到当前网页了，相当于在浏览历史里面，使用新的 URL 替换了老的 URL。它的一个应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。
// 跳转到新的网址
document.location.replace('http://www.example.com')

（3）Location.reload()
reload方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。
它接受一个布尔值作为参数。如果参数为true，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即scrollTop === 0）。如果参数是false或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。
// 向服务器重新请求当前网址
window.location.reload(true);

（4）Location.toString()
toString方法返回整个 URL 字符串，相当于读取Location.href属性。
URL 的编码和解码
网页的 URL 只能包含合法的字符。合法字符分成两类。

- URL 元字符：分号（;），逗号（,），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）
- 语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（'），圆括号（()）
除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（%）加上两个大写的十六进制字母。
比如，UTF-8 的操作系统上，<http://www.example.com/q=春节这个> URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成<http://www.example.com/q=%E6%98%A5%E8%8A%82。其中，“春”转成了%E6%98%A5，“节”转成了%E8%8A%82。这是因为“春”和“节”的> UTF-8 编码分别是E6 98 A5和E8 8A 82，将每个字节前面加上百分号，就构成了 URL 编码。
JavaScript 提供四个 URL 的编码/解码方法。
- encodeURI()
- encodeURIComponent()
- decodeURI()
- decodeURIComponent()
encodeURI()
encodeURI()方法用于转码整个 URL。它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。
encodeURI('http://www.example.com/q=春节')
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"

encodeURIComponent()
encodeURIComponent()方法用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。所以，它不能用于转码整个 URL。它接受一个参数，就是 URL 的片段。
encodeURIComponent('春节')
// "%E6%98%A5%E8%8A%82"
encodeURIComponent('http://www.example.com/q=春节')
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"

上面代码中，encodeURIComponent()会连 URL 元字符一起转义，所以如果转码整个 URL 就会出错。
decodeURI()
decodeURI()方法用于整个 URL 的解码。它是encodeURI()方法的逆运算。它接受一个参数，就是转码后的 URL。
decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
// "http://www.example.com/q=春节"

decodeURIComponent()
decodeURIComponent()用于URL 片段的解码。它是encodeURIComponent()方法的逆运算。它接受一个参数，就是转码后的 URL 片段。
decodeURIComponent('%E6%98%A5%E8%8A%82')
// "春节"

URL 接口
浏览器原生提供URL()接口，它是一个构造函数，用来构造、解析和编码 URL。一般情况下，通过window.URL可以拿到这个构造函数。
构造函数
URL()作为构造函数，可以生成 URL 实例。它接受一个表示 URL 的字符串作为参数。如果参数不是合法的 URL，会报错。
var url = new URL('http://www.example.com/index.html');
url.href
// "http://www.example.com/index.html"

上面示例生成了一个 URL 实例，用来代表指定的网址。
除了字符串，URL()的参数也可以是另一个 URL 实例。这时，URL()会自动读取该实例的href属性，作为实际参数。
如果 URL 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"

var url2 = new URL('page2.html', 'http://example.com/page1.html');
url2.href
// "http://example.com/page2.html"

var url3 = new URL('..', 'http://example.com/a/b.html')
url3.href
// "http://example.com/"

上面代码中，返回的 URL 实例的路径都是在第二个参数的基础上，切换到第一个参数得到的。最后一个例子里面，第一个参数是..，表示上层路径。
实例属性
URL 实例的属性与Location对象的属性基本一致，返回当前 URL 的信息。

- URL.href：返回整个 URL
- URL.protocol：返回协议，以冒号:结尾
- URL.hostname：返回域名
- URL.host：返回域名与端口，包含:号，默认的80和443端口会省略
- URL.port：返回端口
- URL.origin：返回协议、域名和端口
- URL.pathname：返回路径，以斜杠/开头
- URL.search：返回查询字符串，以问号?开头
- URL.searchParams：返回一个URLSearchParams实例，该属性是Location对象没有的
- URL.hash：返回片段识别符，以井号#开头
- URL.password：返回域名前面的密码
- URL.username：返回域名前面的用户名
var url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1');

url.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
url.protocol
// "http:"
url.hostname
// "www.example.com"
url.host
// "www.example.com:4097"
url.port
// "4097"
url.origin
// "http://www.example.com:4097"
url.pathname
// "/path/a.html"
url.search
// "?x=111"
url.searchParams
// URLSearchParams {}
url.hash
// "#part1"
url.password
// "passwd"
url.username
// "user"

这些属性里面，只有origin属性是只读的，其他属性都可写，并且会立即生效。
var url = new URL('http://example.com/index.html#part1');

url.pathname = 'index2.html';
url.href // "http://example.com/index2.html#part1"

url.hash = '#part2';
url.href // "http://example.com/index2.html#part2"

上面代码中，改变 URL 实例的pathname属性和hash属性，都会实时反映在 URL 实例当中。
静态方法
（1）URL.createObjectURL()
URL.createObjectURL()方法用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了File对象或Blob对象的 URL。
// HTML 代码如下
// <div id="display"/>
// <input
//   type="file"
//   id="fileElem"
//   multiple
//   accept="image/*"
//   onchange="handleFiles(this.files)"
//  >
var div = document.getElementById('display');

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(files[i]);
    div.appendChild(img);
  }
}

上面代码中，URL.createObjectURL()方法用来为上传的文件生成一个 URL 字符串，作为<img>元素的图片来源。
该方法生成的 URL 就像下面的样子。
blob:<http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1>

注意，每次使用URL.createObjectURL()方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用URL.revokeObjectURL()方法释放这个实例。
（2）URL.revokeObjectURL()
URL.revokeObjectURL()方法用来释放URL.createObjectURL()方法生成的 URL 实例。它的参数就是URL.createObjectURL()方法返回的 URL 字符串。
下面为上一段的示例加上URL.revokeObjectURL()。
var div = document.getElementById('display');

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(files[i]);
    div.appendChild(img);
    img.onload = function() {
      window.URL.revokeObjectURL(this.src);
    }
  }
}

上面代码中，一旦图片加载成功以后，为本地文件生成的 URL 字符串就没用了，于是可以在img.onload回调函数里面，通过URL.revokeObjectURL()方法卸载这个 URL 实例。
URLSearchParams 对象
概述
URLSearchParams对象是浏览器的原生对象，用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。
它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号?有没有都行，也可以是对应查询字符串的数组或对象。
// 方法一：传入字符串
var params = new URLSearchParams('?foo=1&bar=2');
// 等同于
var params = new URLSearchParams(document.location.search);

// 方法二：传入数组
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);

// 方法三：传入对象
var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});

URLSearchParams会对查询字符串自动编码。
var params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"

上面代码中，foo的值是汉字，URLSearchParams对其自动进行 URL 编码。
浏览器向服务器发送表单数据时，可以直接使用URLSearchParams实例作为表单数据。
const params = new URLSearchParams({foo: 1, bar: 2});
fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)

上面代码中，fetch命令向服务器发送命令时，可以直接使用URLSearchParams实例。
URLSearchParams可以与URL()接口结合使用。
var url = new URL(window.location);
var foo = url.searchParams.get('foo') || 'somedefault';

上面代码中，URL 实例的searchParams属性就是一个URLSearchParams实例，所以可以使用URLSearchParams接口的get方法。
URLSearchParams实例有遍历器接口，可以用for...of循环遍历（详见《ES6 标准入门》的《Iterator》一章）。
var params = new URLSearchParams({'foo': 1 , 'bar': 2});

for (var p of params) {
  console.log(p[0] + ': ' + p[1]);
}
// foo: 1
// bar: 2

URLSearchParams没有实例属性，只有实例方法。
URLSearchParams.toString()
toString方法返回实例的字符串形式。
var url = new URL('https://example.com?foo=1&bar=2');
var params = new URLSearchParams(url.search);

params.toString() // "foo=1&bar=2'

那么需要字符串的场合，会自动调用toString方法。
var params = new URLSearchParams({version: 2.0});
window.location.href = location.pathname + '?' + params;

上面代码中，location.href赋值时，可以直接使用params对象。这时就会自动调用toString方法。
URLSearchParams.append()
append()方法用来追加一个查询参数。它接受两个参数，第一个为键名，第二个为键值，没有返回值。
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.append('baz', 3);
params.toString() // "foo=1&bar=2&baz=3"

append()方法不会识别是否键名已经存在。
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.append('foo', 3);
params.toString() // "foo=1&bar=2&foo=3"

上面代码中，查询字符串里面foo已经存在了，但是append依然会追加一个同名键。
URLSearchParams.delete()
delete()方法用来删除指定的查询参数。它接受键名作为参数。
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.delete('bar');
params.toString() // "foo=1"

URLSearchParams.has()
has()方法返回一个布尔值，表示查询字符串是否包含指定的键名。
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.has('bar') // true
params.has('baz') // false

URLSearchParams.set()
set()方法用来设置查询字符串的键值。
它接受两个参数，第一个是键名，第二个是键值。如果是已经存在的键，键值会被改写，否则会被追加。
var params = new URLSearchParams('?foo=1');
params.set('foo', 2);
params.toString() // "foo=2"
params.set('bar', 3);
params.toString() // "foo=2&bar=3"

上面代码中，foo是已经存在的键，bar是还不存在的键。
如果有多个的同名键，set会移除现存所有的键。
var params = new URLSearchParams('?foo=1&foo=2');
params.set('foo', 3);
params.toString() // "foo=3"

下面是一个替换当前 URL 的例子。
// URL: <https://example.com?version=1.0>
var params = new URLSearchParams(location.search.slice(1));
params.set('version', '2.0');

window.history.replaceState({}, '', location.pathname + `?` + params);
// URL: <https://example.com?version=2.0>

URLSearchParams.get()，URLSearchParams.getAll()
get()方法用来读取查询字符串里面的指定键。它接受键名作为参数。
var params = new URLSearchParams('?foo=1');
params.get('foo') // "1"
params.get('bar') // null

两个地方需要注意。第一，它返回的是字符串，如果原始值是数值，需要转一下类型；第二，如果指定的键名不存在，返回值是null。
如果有多个的同名键，get返回位置最前面的那个键值。
var params = new URLSearchParams('?foo=3&foo=2&foo=1');
params.get('foo') // "3"

上面代码中，查询字符串有三个foo键，get方法返回最前面的键值3。
getAll()方法返回一个数组，成员是指定键的所有键值。它接受键名作为参数。
var params = new URLSearchParams('?foo=1&foo=2');
params.getAll('foo') // ["1", "2"]

上面代码中，查询字符串有两个foo键，getAll返回的数组就有两个成员。
URLSearchParams.sort()
sort()方法对查询字符串里面的键进行排序，规则是按照 Unicode 码点从小到大排列。
该方法没有返回值，或者说返回值是undefined。
var params = new URLSearchParams('c=4&a=2&b=3&a=1');
params.sort();
params.toString() // "a=2&a=1&b=3&c=4"

上面代码中，如果有两个同名的键a，它们之间不会排序，而是保留原始的顺序。
URLSearchParams.keys()，URLSearchParams.values()，URLSearchParams.entries()
这三个方法都返回一个遍历器对象，供for...of循环遍历。它们的区别在于，keys方法返回的是键名的遍历器，values方法返回的是键值的遍历器，entries返回的是键值对的遍历器。
var params = new URLSearchParams('a=1&b=2');

for(var p of params.keys()) {
  console.log(p);
}
// a
// b

for(var p of params.values()) {
  console.log(p);
}
// 1
// 2

for(var p of params.entries()) {
  console.log(p);
}
// ["a", "1"]
// ["b", "2"]

如果直接对URLSearchParams进行遍历，其实内部调用的就是entries接口。
for (var p of params) {}
// 等同于
for (var p of params.entries()) {}

Navigator 对象
window.navigator属性指向一个包含浏览器和系统信息的 Navigator 对象。脚本通过这个属性了解用户的环境信息。
属性
Navigator.userAgent
navigator.userAgent属性返回浏览器的 User Agent 字符串，表示浏览器的厂商和版本信息。
下面是 Chrome 浏览器的userAgent。
navigator.userAgent
// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"

通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且用户可以改变这个字符串。这个字符串的格式并无统一规定，也无法保证未来的适用性，各种上网设备层出不穷，难以穷尽。所以，现在一般不再通过它识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的 JavaScript 功能。
不过，通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串。
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}

如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。
/mobi|android|touch|mini/i.test(ua)

Navigator.plugins
Navigator.plugins属性返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件，比如 Flash、ActiveX 等。
var pluginsLength = navigator.plugins.length;

for (var i = 0; i < pluginsLength; i++) {
  console.log(navigator.plugins[i].name);
  console.log(navigator.plugins[i].filename);
  console.log(navigator.plugins[i].description);
  console.log(navigator.plugins[i].version);
}

Navigator.platform
Navigator.platform属性返回用户的操作系统信息，比如MacIntel、Win32、Linux x86_64等 。
navigator.platform
// "Linux x86_64"

Navigator.onLine
navigator.onLine属性返回一个布尔值，表示用户当前在线还是离线（浏览器断线）。
navigator.onLine // true

有时，浏览器可以连接局域网，但是局域网不能连通外网。这时，有的浏览器的onLine属性会返回true，所以不能假定只要是true，用户就一定能访问互联网。不过，如果是false，可以断定用户一定离线。
用户变成在线会触发online事件，变成离线会触发offline事件，可以通过window.ononline和window.onoffline指定这两个事件的回调函数。
window.addEventListener('offline', function(e) { console.log('offline'); });
window.addEventListener('online', function(e) { console.log('online'); });

Navigator.language，Navigator.languages
Navigator.language属性返回一个字符串，表示浏览器的首选语言。该属性只读。
navigator.language // "en"

Navigator.languages属性返回一个数组，表示用户可以接受的语言。Navigator.language总是这个数组的第一个成员。HTTP 请求头信息的Accept-Language字段，就来自这个数组。
navigator.languages  // ["en-US", "en", "zh-CN", "zh", "zh-TW"]

如果这个属性发生变化，就会在window对象上触发languagechange事件。
Navigator.geolocation
Navigator.geolocation属性返回一个 Geolocation 对象，包含用户地理位置的信息。注意，该 API 只有在 HTTPS 协议下可用，否则调用下面方法时会报错。
Geolocation 对象提供下面三个方法。

- Geolocation.getCurrentPosition()：得到用户的当前位置
- Geolocation.watchPosition()：监听用户位置变化
- Geolocation.clearWatch()：取消watchPosition()方法指定的监听函数
注意，调用这三个方法时，浏览器会跳出一个对话框，要求用户给予授权。
Navigator.cookieEnabled
navigator.cookieEnabled属性返回一个布尔值，表示浏览器的 Cookie 功能是否打开。
navigator.cookieEnabled // true

注意，这个属性反映的是浏览器总的特性，与是否储存某个具体的网站的 Cookie 无关。用户可以设置某个网站不得储存 Cookie，这时cookieEnabled返回的还是true。
方法
Navigator.javaEnabled()
navigator.javaEnabled()方法返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。
navigator.javaEnabled() // false

Navigator.sendBeacon()
Navigator.sendBeacon()方法用于向服务器异步发送数据，详见《XMLHttpRequest 对象》一章。
实验性属性
Navigator 对象有一些实验性属性，在部分浏览器可用。
Navigator.deviceMemory
navigator.deviceMemory属性返回当前计算机的内存数量（单位为 GB）。该属性只读，只在 HTTPS 环境下可用。
它的返回值是一个近似值，四舍五入到最接近的2的幂，通常是 0.25、0.5、1、2、4、8。实际内存超过 8GB，也返回8。
if (navigator.deviceMemory > 1) {
  await import('./costly-module.js');
}

上面示例中，只有当前内存大于 1GB，才加载大型的脚本。
Navigator.hardwareConcurrency
navigator.hardwareConcurrency属性返回用户计算机上可用的逻辑处理器的数量。该属性只读。
现代计算机的 CPU 有多个物理核心，每个物理核心有时支持一次运行多个线程。因此，四核 CPU 可以提供八个逻辑处理器核心。
if (navigator.hardwareConcurrency > 4) {
  await import('./costly-module.js');
}

上面示例中，可用的逻辑处理器大于4，才会加载大型脚本。
该属性通过用于创建 Web Worker，每个可用的逻辑处理器都创建一个 Worker。
let workerList = [];

for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
  let newWorker = {
    worker: new Worker('cpuworker.js'),
    inUse: false
  };
  workerList.push(newWorker);
}

上面示例中，有多少个可用的逻辑处理器，就创建多少个 Web Worker。
Navigator.connection
navigator.connection属性返回一个对象，包含当前网络连接的相关信息。

- downlink：有效带宽估计值（单位：兆比特/秒，Mbps），四舍五入到每秒 25KB 的最接近倍数。
- downlinkMax：当前连接的最大下行链路速度（单位：兆比特每秒，Mbps）。
- effectiveType：返回连接的等效类型，可能的值为slow-2g、2g、3g、4g。
- rtt：当前连接的估计有效往返时间，四舍五入到最接近的25毫秒的倍数。
- saveData：用户是否设置了浏览器的减少数据使用量选项（比如不加载图片），返回true或者false。
- type：当前连接的介质类型，可能的值为bluetooth、cellular、ethernet、none、wifi、wimax、other、unknown。
if (navigator.connection.effectiveType === '4g') {
  await import('./costly-module.js');
}

上面示例中，如果网络连接是 4G，则加载大型脚本。
Screen 对象
Screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。window.screen属性指向这个对象。
该对象有下面的属性。

- Screen.height：浏览器窗口所在的屏幕的高度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
- Screen.width：浏览器窗口所在的屏幕的宽度（单位像素）。
- Screen.availHeight：浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于height减去那些被系统组件的高度。
- Screen.availWidth：浏览器窗口可用的屏幕宽度（单位像素）。
- Screen.pixelDepth：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。
- Screen.colorDepth：Screen.pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
- Screen.orientation：返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary表示颠倒的竖放。
下面是Screen.orientation的例子。
window.screen.orientation
// { angle: 0, type: "landscape-primary", onchange: null }

下面的例子保证屏幕分辨率大于 1024 x 768。
if (window.screen.width >= 1024 && window.screen.height >= 768) {
  // 分辨率不低于 1024x768
}

下面是根据屏幕的宽度，将用户导向不同网页的代码。
if ((screen.width <= 800) && (screen.height <= 600)) {
  window.location.replace('small.html');
} else {
  window.location.replace('wide.html');
}

console
console 对象
console对象是 JavaScript 的原生对象，它有点像 Unix 系统的标准输出stdout和标准错误stderr，可以输出各种信息到控制台，并且还提供了很多有用的辅助方法。
console的常见用途有两个。

- 调试程序，显示网页代码运行时的错误信息。
- 提供了一个命令行接口，用来与网页代码互动。
console对象的浏览器实现，包含在浏览器自带的开发工具之中。以 Chrome 浏览器的“开发者工具”（Developer Tools）为例，可以使用下面三种方法的打开它。

1. 按 F12 或者Control + Shift + i（PC）/ Command + Option + i（Mac）。
2. 浏览器菜单选择“工具/开发者工具”。
3. 在一个页面元素上，打开右键菜单，选择其中的“Inspect Element”。
打开开发者工具以后，顶端有多个面板。

- Elements：查看网页的 HTML 源码和 CSS 代码。
- Resources：查看网页加载的各种资源文件（比如代码文件、字体文件 CSS 文件等），以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage等）。
- Network：查看网页的 HTTP 通信情况。
- Sources：查看网页加载的脚本源码。
- Timeline：查看各种网页行为随时间变化的情况。
- Performance：查看网页的性能情况，比如 CPU 和内存消耗。
- Console：用来运行 JavaScript 命令。
这些面板都有各自的用途，以下只介绍Console面板（又称为控制台）。
Console面板基本上就是一个命令行窗口，你可以在提示符下，键入各种命令。
console 对象的静态方法
console对象提供的各种静态方法，用来与控制台窗口互动。
console.log()，console.info()，console.debug()
console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出。
console.log('Hello World')
// Hello World
console.log('a', 'b', 'c')
// a b c

console.log方法会自动在每次输出的结尾，添加换行符。
console.log(1);
console.log(2);
console.log(3);
// 1
// 2
// 3

如果第一个参数是格式字符串（使用了格式占位符），console.log方法将依次用后面的参数替换占位符，然后再进行输出。
console.log(' %s + %s = %s', 1, 1, 2)
//  1 + 1 = 2

上面代码中，console.log方法的第一个参数有三个占位符（%s），第二、三、四个参数会在显示时，依次替换掉这个三个占位符。
console.log方法支持以下占位符，不同类型的数据必须使用对应的占位符。

- %s 字符串
- %d 整数
- %i 整数
- %f 浮点数
- %o 对象的链接
- %c CSS 格式字符串
var number = 11 * 9;
var color = 'red';

console.log('%d %s balloons', number, color);
// 99 red balloons

上面代码中，第二个参数是数值，对应的占位符是%d，第三个参数是字符串，对应的占位符是%s。
使用%c占位符时，对应的参数必须是 CSS 代码，用来对输出内容进行 CSS 渲染。
console.log(
  '%cThis text is styled!',
  'color: red; background: yellow; font-size: 24px;'
)

上面代码运行后，输出的内容将显示为黄底红字。
console.log方法的两种参数格式，可以结合在一起使用。
console.log(' %s + %s ', 1, 1, '= 2')
// 1 + 1  = 2

如果参数是一个对象，console.log会显示该对象的值。
console.log({foo: 'bar'})
// Object {foo: "bar"}
console.log(Date)
// function Date() { [native code] }

上面代码输出Date对象的值，结果为一个构造函数。
console.info是console.log方法的别名，用法完全一样。只不过console.info方法会在输出信息的前面，加上一个蓝色图标。
console.debug方法与console.log方法类似，会在控制台输出调试信息。但是，默认情况下，console.debug输出的信息不会显示，只有在打开显示级别在verbose的情况下，才会显示。
console对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义console.log方法。
['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});

console.log("出错了！");
// 2014-05-18T09:00.000Z 出错了！

上面代码表示，使用自定义的console.log方法，可以在显示结果添加当前时间。
console.warn()，console.error()
warn方法和error方法也是在控制台输出信息，它们与log方法的不同之处在于，warn方法输出信息时，在最前面加一个黄色三角，表示警告；error方法输出信息时，在最前面加一个红色的叉，表示出错。同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都一样。
console.error('Error: %s (%i)', 'Server is not responding', 500)
// Error: Server is not responding (500)
console.warn('Warning! Too few nodes (%d)', document.childNodes.length)
// Warning! Too few nodes (1)

可以这样理解，log方法是写入标准输出（stdout），warn方法和error方法是写入标准错误（stderr）。
console.table()
对于某些复合类型的数据，console.table方法可以将其转为表格显示。
var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];

console.table(languages);

上面代码的language变量，转为表格显示如下。
(index)
name
fileExtension
0
"JavaScript"
".js"
1
"TypeScript"
".ts"
2
"CoffeeScript"
".coffee"

下面是显示表格内容的例子。
var languages = {
  csharp: { name: "C#", paradigm: "object-oriented" },
  fsharp: { name: "F#", paradigm: "functional" }
};

console.table(languages);

上面代码的language，转为表格显示如下。
(index)
name
paradigm
csharp
"C#"
"object-oriented"
fsharp
"F#"
"functional"

console.count()
count方法用于计数，输出它被调用了多少次。
function greet(user) {
  console.count();
  return 'hi ' + user;
}

greet('bob')
//  : 1
// "hi bob"

greet('alice')
//  : 2
// "hi alice"

greet('bob')
//  : 3
// "hi bob"

上面代码每次调用greet函数，内部的console.count方法就输出执行次数。
该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。
function greet(user) {
  console.count(user);
  return "hi " + user;
}

greet('bob')
// bob: 1
// "hi bob"

greet('alice')
// alice: 1
// "hi alice"

greet('bob')
// bob: 2
// "hi bob"

上面代码根据参数的不同，显示bob执行了两次，alice执行了一次。
console.dir()，console.dirxml()
dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。
console.log({f1: 'foo', f2: 'bar'})
// Object {f1: "foo", f2: "bar"}

console.dir({f1: 'foo', f2: 'bar'})
// Object
//   f1: "foo"
//   f2: "bar"
//   __proto__: Object

上面代码显示dir方法的输出结果，比log方法更易读，信息也更丰富。
该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性。
console.dir(document.body)

Node 环境之中，还可以指定以代码高亮的形式输出。
console.dir(obj, {colors: true})

dirxml方法主要用于以目录树的形式，显示 DOM 节点。
console.dirxml(document.body)

如果参数不是 DOM 节点，而是普通的 JavaScript 对象，console.dirxml等同于console.dir。
console.dirxml([1, 2, 3])
// 等同于
console.dir([1, 2, 3])

console.assert()
console.assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。
它接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。
console.assert(false, '判断条件不成立')
// Assertion failed: 判断条件不成立

// 相当于
try {
  if (!false) {
    throw new Error('判断条件不成立');
  }
} catch(e) {
  console.error(e);
}

下面是一个例子，判断子节点的个数是否大于等于500。
console.assert(list.childNodes.length < 500, '节点个数大于等于500')

上面代码中，如果符合条件的节点小于500个，不会有任何输出；只有大于等于500时，才会在控制台提示错误，并且显示指定文本。
console.time()，console.timeEnd()
这两个方法用于计时，可以算出一个操作所花费的准确时间。
console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};

console.timeEnd('Array initialize');
// Array initialize: 1914.481ms

time方法表示计时开始，timeEnd方法表示计时结束。它们的参数是计时器的名称。调用timeEnd方法之后，控制台会显示“计时器名称: 所耗费的时间”。
console.group()，console.groupEnd()，console.groupCollapsed()
console.group和console.groupEnd这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
console.group('一级分组');
console.log('一级分组的内容');

console.group('二级分组');
console.log('二级分组的内容');

console.groupEnd(); // 二级分组结束
console.groupEnd(); // 一级分组结束

上面代码会将“二级分组”显示在“一级分组”内部，并且“一级分组”和“二级分组”前面都有一个折叠符号，可以用来折叠本级的内容。
console.groupCollapsed方法与console.group方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。
console.groupCollapsed('Fetching Data');

console.log('Request Sent');
console.error('Error: Server not responding (500)');

console.groupEnd();

上面代码只显示一行”Fetching Data“，点击后才会展开，显示其中包含的两行。
console.trace()，console.clear()
console.trace方法显示当前执行的代码在堆栈中的调用路径。
console.trace()
// console.trace()
//   (anonymous function)
//   InjectedScript._evaluateOn
//   InjectedScript._evaluateAndWrap
//   InjectedScript.evaluate

console.clear方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的“Preserve log”选项，console.clear方法将不起作用。
控制台命令行 API
浏览器控制台中，除了使用console对象，还可以使用一些控制台自带的命令行方法。
（1）$_
$_属性返回上一个表达式的值。
2 + 2
// 4
$_
// 4

（2）$0 - $4
控制台保存了最近5个在 Elements 面板选中的 DOM 元素，$0代表倒数第一个（最近一个），$1代表倒数第二个，以此类推直到$4。
（3）$(selector)
$(selector)返回第一个匹配的元素，等同于document.querySelector()。注意，如果页面脚本对$有定义，则会覆盖原始的定义。比如，页面里面有 jQuery，控制台执行$(selector)就会采用 jQuery 的实现，返回一个数组。
（4）$$(selector)
$$(selector)返回选中的 DOM 对象，等同于document.querySelectorAll。
（5）$x(path)
$x(path)方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。
$x("//p[a]")

上面代码返回所有包含a元素的p元素。
（6）inspect(object)
inspect(object)方法打开相关面板，并选中相应的元素，显示它的细节。DOM 元素在Elements面板中显示，比如inspect(document)会在 Elements 面板显示document元素。JavaScript 对象在控制台面板Profiles面板中显示，比如inspect(window)。
（7）getEventListeners(object)
getEventListeners(object)方法返回一个对象，该对象的成员为object登记了回调函数的各种事件（比如click或keydown），每个事件对应一个数组，数组的成员为该事件的回调函数。
（8）keys(object)，values(object)
keys(object)方法返回一个数组，包含object的所有键名。
values(object)方法返回一个数组，包含object的所有键值。
var o = {'p1': 'a', 'p2': 'b'};

keys(o)
// ["p1", "p2"]
values(o)
// ["a", "b"]

（9）monitorEvents(object[, events]) ，unmonitorEvents(object[, events])
monitorEvents(object[, events])方法监听特定对象上发生的特定事件。事件发生时，会返回一个Event对象，包含该事件的相关信息。unmonitorEvents方法用于停止监听。
monitorEvents(window, "resize");
monitorEvents(window, ["resize", "scroll"])

上面代码分别表示单个事件和多个事件的监听方法。
monitorEvents($0, 'mouse');
unmonitorEvents($0, 'mousemove');

上面代码表示如何停止监听。
monitorEvents允许监听同一大类的事件。所有事件可以分成四个大类。

- mouse："mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"
- key："keydown", "keyup", "keypress", "textInput"
- touch："touchstart", "touchmove", "touchend", "touchcancel"
- control："resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"
monitorEvents($("#msg"), "key");

上面代码表示监听所有key大类的事件。
（10）其他方法
命令行 API 还提供以下方法。

- clear()：清除控制台的历史。
- copy(object)：复制特定 DOM 元素到剪贴板。
- dir(object)：显示特定对象的所有属性，是console.dir方法的别名。
- dirxml(object)：显示特定对象的 XML 形式，是console.dirxml方法的别名。
debugger 语句
debugger语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到debugger语句时会自动停下。如果没有除错工具，debugger语句不会产生任何结果，JavaScript 引擎自动跳过这一句。
Chrome 浏览器中，当代码运行到debugger语句时，就会暂停运行，自动打开脚本源码界面。
for(var i = 0; i < 5; i++){
  console.log(i);
  if (i === 2) debugger;
}

上面代码打印出0，1，2以后，就会暂停，自动打开源码界面，等待进一步处理。
```
