# Event

```js
事件流
一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。
- 第一阶段：从window对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- 第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
- 第三阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。
这种三阶段的传播模型，使得同一个事件会在多个节点上触发。
<div>
  <p>点击</p>
</div>

如果对这两个节点，都设置click事件的监听函数（每个节点的捕获阶段和冒泡阶段，各设置一个监听函数），共计设置四个监听函数。然后，对<p>点击，click事件会触发四次。
var phases = {
  1: 'capture',
  2: 'target',
  3: 'bubble'
};

var div = document.querySelector('div');
var p = document.querySelector('p');

div.addEventListener('click', callback, true);
p.addEventListener('click', callback, true);
div.addEventListener('click', callback, false);
p.addEventListener('click', callback, false);

function callback(event) {
  var tag = event.currentTarget.tagName;
  var phase = phases[event.eventPhase];
  console.log("Tag: '" + tag + "'. EventPhase: '" + phase + "'");
}

// 点击以后的结果
// Tag: 'DIV'. EventPhase: 'capture'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'DIV'. EventPhase: 'bubble'

上面代码表示，click事件被触发了四次：<div>节点的捕获阶段和冒泡阶段各1次，<p>节点的目标阶段触发了2次。
1. 捕获阶段：事件从<div>向<p>传播时，触发<div>的click事件；
2. 目标阶段：事件从<div>到达<p>时，触发<p>的click事件；
3. 冒泡阶段：事件从<p>传回<div>时，再次触发<div>的click事件。
其中，<p>节点有两个监听函数（addEventListener方法第三个参数的不同，会导致绑定两个监听函数），因此它们都会因为click事件触发一次。所以，<p>会在target阶段有两次输出。
注意，浏览器总是假定click事件的目标节点，就是点击位置嵌套最深的那个节点（本例是<div>节点里面的<p>节点）。所以，<p>节点的捕获阶段和冒泡阶段，都会显示为target阶段。
事件传播的最上层对象是window，接着依次是document，html（document.documentElement）和body（document.body）。也就是说，上例的事件传播顺序，在捕获阶段依次为window、document、html、body、div、p，在冒泡阶段依次为p、div、body、html、document、window。
事件处理程序
浏览器的事件模型，就是通过监听函数（listener）对事件做出反应。事件发生后，浏览器监听到了这个事件，就会执行对应的监听函数。这是事件驱动编程模式（event-driven）的主要编程方式。
JavaScript 有三种方法，可以为事件绑定监听函数。
HTML 
HTML 语言允许在元素的属性中，直接定义某些事件的监听代码。
<body onload="doSomething()">
<div onclick="console.log('触发事件')">

元素的事件监听属性，都是on加上事件名，比如onload就是on + load，表示load事件的监听代码。
注意，这些属性的值是将会执行的代码，而不是一个函数。
<!-- 正确 -->
<body onload="doSomething()">

<!-- 错误 -->
<body onload="doSomething">

一旦指定的事件发生，on-属性的值是原样传入 JavaScript 引擎执行。因此如果要执行函数，不要忘记加上一对圆括号。
使用这个方法指定的监听代码，只会在冒泡阶段触发。
<div onclick="console.log(2)">
  <button onclick="console.log(1)">点击</button>
</div>

上面代码中，<button>是<div>的子元素。<button>的click事件，也会触发<div>的click事件。由于on-属性的监听代码，只在冒泡阶段触发，所以点击结果是先输出1，再输出2，即事件从子元素开始冒泡到父元素。
直接设置on-属性，与通过元素节点的setAttribute方法设置on-属性，效果是一样的。
el.setAttribute('onclick', 'doSomething()');
// 等同于
// <Element onclick="doSomething()">

DOM0
元素节点对象的事件属性，同样可以指定监听函数。
window.onload = doSomething;

div.onclick = function (event) {
  console.log('触发事件');
};

使用这个方法指定的监听函数，也是只会在冒泡阶段触发。
注意，这种方法与 HTML 的on-属性的差异是，它的值是函数名（doSomething），而不像后者，必须给出完整的监听代码（doSomething()）。
DOM2
事件的本质是程序各个组成部分之间的一种通信方式，也是异步编程的一种实现。
DOM 的事件操作（监听和触发），都定义在EventTarget接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，XMLHttpRequest、AudioNode、AudioContext）也部署了这个接口。
该接口主要提供三个实例方法。
- addEventListener：绑定事件的监听函数
- removeEventListener：移除事件的监听函数
- dispatchEvent：触发事件
EventTarget.addEventListener()
EventTarget.addEventListener()用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。
target.addEventListener(type, listener[, useCapture]);

该方法接受三个参数。
- type：事件名称，大小写敏感。
- listener：监听函数。事件发生时，会调用该监听函数。
- useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为false（监听函数只在冒泡阶段被触发）。该参数可选。
下面是一个例子。
function hello() {
  console.log('Hello world');
}

var button = document.getElementById('btn');
button.addEventListener('click', hello, false);

首先，第二个参数除了监听函数，还可以是一个具有handleEvent方法的对象。
buttonElement.addEventListener('click', {
  handleEvent: function (event) {
    console.log('click');
  }
});

上面代码中，addEventListener方法的第二个参数，就是一个具有handleEvent方法的对象。
其次，第三个参数除了布尔值useCapture，还可以是一个属性配置对象。该对象有以下属性。
- *capture：布尔值，表示该事件是否在捕获阶段触发监听函数。
- *once：布尔值，表示监听函数是否只触发一次，然后就自动移除。
- *passive：布尔值，表示监听函数不会调用事件的preventDefault方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。
如果希望事件监听函数只执行一次，可以打开属性配置对象的once属性。
element.addEventListener('click', function (event) {
  // 只执行一次的代码
}, {once: true});

addEventListener方法可以为针对当前对象的同一个事件，添加多个不同的监听函数。这些函数按照添加顺序触发，即先添加先触发。如果为同一个事件多次添加同一个监听函数，该函数只会执行一次，多余的添加将自动被去除（不必使用removeEventListener方法手动去除）。
function hello() {
  console.log('Hello world');
}

document.addEventListener('click', hello, false);
document.addEventListener('click', hello, false);

如果希望向监听函数传递参数，可以用匿名函数包装一下监听函数。
function print(x) {
  console.log(x);
}

var el = document.getElementById('div1');
el.addEventListener('click', function () { print('Hello'); }, false);

监听函数内部的this，指向当前事件所在的那个对象。
// HTML 代码如下
// <p id="para">Hello</p>
var para = document.getElementById('para');
para.addEventListener('click', function (e) {
  console.log(this.nodeName); // "P"
}, false);

EventTarget.removeEventListener()
EventTarget.removeEventListener方法用来移除addEventListener方法添加的事件监听函数。该方法没有返回值。
div.addEventListener('click', listener, false);
div.removeEventListener('click', listener, false);

removeEventListener方法的参数，与addEventListener方法完全一致。它的第一个参数“事件类型”，大小写敏感。
注意，removeEventListener方法移除的监听函数，必须是addEventListener方法添加的那个监听函数，而且必须在同一个元素节点，并且第三个参数要相同。
div.addEventListener('click', function (e) {}, false);
div.removeEventListener('click', function (e) {}, false);

上面代码中，removeEventListener方法无效，因为监听函数不是同一个匿名函数。
element.addEventListener('mousedown', handleMouseDown, true);
element.removeEventListener("mousedown", handleMouseDown, false);

上面代码中，removeEventListener方法也是无效的，因为第三个参数不一样。
EventTarget.dispatchEvent()
EventTarget.dispatchEvent方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了Event.preventDefault()，则返回值为false，否则为true。
target.dispatchEvent(event)

dispatchEvent方法的参数是一个Event对象的实例（详见《Event 对象》章节）。
para.addEventListener('click', hello, false);
var event = new Event('click');
para.dispatchEvent(event);

如果dispatchEvent方法的参数为空，或者不是一个有效的事件对象，将报错。
下面代码根据dispatchEvent方法的返回值，判断事件是否被取消了。
var canceled = !cb.dispatchEvent(event);
if (canceled) {
  console.log('事件取消');
} else {
  console.log('事件未取消');
}

小结
第一种“HTML 的 on- 属性”，违反了 HTML 与 JavaScript 代码相分离的原则，将两者写在一起，不利于代码分工，因此不推荐使用。
第二种“元素节点的事件属性”的缺点在于，同一个事件只能定义一个监听函数，也就是说，如果定义两次onclick属性，后一次定义会覆盖前一次。因此，也不推荐使用。
第三种EventTarget.addEventListener是推荐的指定监听函数的方法。它有如下优点：
- 同一个事件可以添加多个监听函数。
- 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发监听函数。
- 除了 DOM 节点，其他对象（比如window、XMLHttpRequest等）也有这个接口，它等于是整个 JavaScript 统一的监听函数接口。
事件类型
鼠标事件
鼠标事件的种类
鼠标事件指与鼠标相关的事件，继承了MouseEvent接口
- click事件
用户在同一个位置先完成mousedown动作，再完成mouseup动作。因此，触发顺序是，mousedown首先触发，mouseup接着触发，click最后触发。

- dblclick事件
在mousedown、mouseup、click之后触发。

- mouseover事件和mouseenter事件
都是鼠标进入一个节点时触发。mouseenter事件只触发一次，而只要鼠标在节点内部移动，mouseover事件会在子节点上触发多次。
/* HTML 代码如下
 <ul>
   <li>item 1</li>
   <li>item 2</li>
  <li>item 3</li>
 </ul>
*/

var ul = document.querySelector('ul');

// 进入 ul 节点以后，mouseenter 事件只会触发一次
// 以后只要鼠标在节点内移动，都不会再触发这个事件
// event.target 是 ul 节点
ul.addEventListener('mouseenter', function (event) {
  event.target.style.color = 'purple';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);

// 进入 ul 节点以后，只要在子节点上移动，mouseover 事件会触发多次
// event.target 是 li 节点
ul.addEventListener('mouseover', function (event) {
  event.target.style.color = 'orange';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);

- mouseout事件和mouseleave事件
都是鼠标离开一个节点时触发。两者的区别是，在父元素内部离开一个子元素时，mouseleave事件不会触发，而mouseout事件会触发。
/* HTML 代码如下
 <ul>
   <li>item 1</li>
   <li>item 2</li>
  <li>item 3</li>
 </ul>
*/

var ul = document.querySelector('ul');

// 先进入 ul 节点，然后在节点内部移动，不会触发 mouseleave 事件
// 只有离开 ul 节点时，触发一次 mouseleave
// event.target 是 ul 节点
ul.addEventListener('mouseleave', function (event) {
  event.target.style.color = 'purple';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);

// 先进入 ul 节点，然后在节点内部移动，mouseout 事件会触发多次
// event.target 是 li 节点
ul.addEventListener('mouseout', function (event) {
  event.target.style.color = 'orange';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);

点击事件对象属性
触发键判断
MouseEvent.button属性返回一个数值，表示事件发生时按下了鼠标的哪个键。该属性只读。
- 0：按下主键（通常是左键），或者该事件没有初始化这个属性（比如mousemove事件）。
- 1：按下辅助键（通常是中键或者滚轮键）。
- 2：按下次键（通常是右键）。
// HTML 代码为
// <button onmouseup="whichButton(event)">点击</button>
var whichButton = function (e) {
  switch (e.button) {
    case 0:
      console.log('Left button clicked.');
      break;
    case 1:
      console.log('Middle button clicked.');
      break;
    case 2:
      console.log('Right button clicked.');
      break;
    default:
      console.log('Unexpected code: ' + e.button);
  }
}

MouseEvent.buttons属性返回一个三个比特位的值，表示同时按下了哪些键。它用来处理同时按下多个鼠标键的情况。该属性只读。
- 1：二进制为001（十进制的1），表示按下左键。
- 2：二进制为010（十进制的2），表示按下右键。
- 4：二进制为100（十进制的4），表示按下中键或滚轮键。
同时按下多个键的时候，每个按下的键对应的比特位都会有值。比如，同时按下左键和右键，会返回3（二进制为011）。
附加键判断
MouseEvent.altKey、MouseEvent.ctrlKey、MouseEvent.metaKey、MouseEvent.shiftKey这四个属性都返回一个布尔值，表示事件发生时，是否按下对应的键。它们都是只读属性。
- altKey属性：Alt 键
- ctrlKey属性：Ctrl 键
- metaKey属性：Meta 键（Mac 键盘是一个四瓣的小花，Windows 键盘是 Windows 键）
- shiftKey属性：Shift 键
// HTML 代码如下
// <body onclick="showKey(event)">
function showKey(e) {
  console.log('ALT key pressed: ' + e.altKey);
  console.log('CTRL key pressed: ' + e.ctrlKey);
  console.log('META key pressed: ' + e.metaKey);
  console.log('SHIFT key pressed: ' + e.shiftKey);
}

触发位置判断
1. MouseEvent.clientX，MouseEvent.clientY
MouseEvent.clientX属性返回鼠标位置相对于浏览器窗口左上角的水平坐标（单位像素），MouseEvent.clientY属性返回垂直坐标。这两个属性都是只读属性。
// HTML 代码为
// <body onmousedown="showCoords(event)">
function showCoords(evt){
  console.log(
    'clientX value: ' + evt.clientX + '\n' +
    'clientY value: ' + evt.clientY + '\n'
  );
}

这两个属性还分别有一个别名MouseEvent.x和MouseEvent.y。
2. MouseEvent.movementX，MouseEvent.movementY
MouseEvent.movementX属性返回当前位置与上一个mousemove事件之间的水平距离（单位像素）。数值上，它等于下面的计算公式。
currentEvent.movementX = currentEvent.screenX - previousEvent.screenX

MouseEvent.movementY属性返回当前位置与上一个mousemove事件之间的垂直距离（单位像素）。数值上，它等于下面的计算公式。
currentEvent.movementY = currentEvent.screenY - previousEvent.screenY。

这两个属性都是只读属性。
3. MouseEvent.screenX，MouseEvent.screenY
MouseEvent.screenX属性返回鼠标位置相对于屏幕左上角的水平坐标（单位像素），MouseEvent.screenY属性返回垂直坐标。这两个属性都是只读属性。
// HTML 代码如下
// <body onmousedown="showCoords(event)">
function showCoords(evt) {
  console.log(
    'screenX value: ' + evt.screenX + '\n',
    'screenY value: ' + evt.screenY + '\n'
  );
}

4. MouseEvent.offsetX，MouseEvent.offsetY
MouseEvent.offsetX属性返回鼠标位置与目标节点左侧的padding边缘的水平距离（单位像素），MouseEvent.offsetY属性返回与目标节点上方的padding边缘的垂直距离。这两个属性都是只读属性。
/* HTML 代码如下
  <style>
    p {
      width: 100px;
      height: 100px;
      padding: 100px;
    }
  </style>
  <p>Hello</p>
*/
var p = document.querySelector('p');
p.addEventListener(
  'click',
  function (e) {
    console.log(e.offsetX);
    console.log(e.offsetY);
  },
  false
);

上面代码中，鼠标如果在p元素的中心位置点击，会返回150 150。因此中心位置距离左侧和上方的padding边缘，等于padding的宽度（100像素）加上元素内容区域一半的宽度（50像素）。
5. MouseEvent.pageX，MouseEvent.pageY
MouseEvent.pageX属性返回鼠标位置与文档左侧边缘的距离（单位像素），MouseEvent.pageY属性返回与文档上侧边缘的距离（单位像素）。它们的返回值都包括文档不可见的部分。这两个属性都是只读。
/* HTML 代码如下
  <style>
    body {
      height: 2000px;
    }
  </style>
*/
document.body.addEventListener(
  'click',
  function (e) {
    console.log(e.pageX);
    console.log(e.pageY);
  },
  false
);

WheelEvent 接口
WheelEvent 接口继承了 MouseEvent 实例，代表鼠标滚轮事件的实例对象。目前，鼠标滚轮相关的事件只有一个wheel事件，用户滚动鼠标的滚轮，就生成这个事件的实例。
浏览器原生提供WheelEvent()构造函数，用来生成WheelEvent实例。
var wheelEvent = new WheelEvent(type, options);

WheelEvent()构造函数可以接受两个参数，第一个是字符串，表示事件类型，对于滚轮事件来说，这个值目前只能是wheel。第二个参数是事件的配置对象。该对象的属性除了Event、UIEvent的配置属性以外，还可以接受以下几个属性，所有属性都是可选的。
- deltaX：数值，表示滚轮的水平滚动量，默认值是 0.0。
- deltaY：数值，表示滚轮的垂直滚动量，默认值是 0.0。
- deltaZ：数值，表示滚轮的 Z 轴滚动量，默认值是 0.0。
- deltaMode：数值，表示相关的滚动事件的单位，适用于上面三个属性。0表示滚动单位为像素，1表示单位为行，2表示单位为页，默认为0。

实例属性
WheelEvent事件实例除了具有Event和MouseEvent的实例属性和实例方法，还有一些自己的实例属性，但是没有自己的实例方法。
下面的属性都是只读属性。
- WheelEvent.deltaX：数值，表示滚轮的水平滚动量。
- WheelEvent.deltaY：数值，表示滚轮的垂直滚动量。
- WheelEvent.deltaZ：数值，表示滚轮的 Z 轴滚动量。
- WheelEvent.deltaMode：数值，表示上面三个属性的单位，0是像素，1是行，2是页。
键盘事件
键盘事件的种类
1. 种类
- keydown：按下键盘时触发。
- keypress：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发keydown事件，再触发这个事件。
- keyup：松开键盘时触发该事件。
2. 长按可打印字符触发顺序
- keydown
- keypress
- keydown
- keypress
- ...（重复以上过程）
- keyup
键盘事件对象属性
触发键判断
1. KeyboardEvent.code
KeyboardEvent.code属性返回一个字符串，表示当前按下的键的字符串形式。该属性只读。
下面是一些常用键的字符串形式，其他键请查文档。
- 数字键0 - 9：返回digit0 - digit9
- 字母键a - z：返回KeyA - KeyZ
- 功能键F1 - F12：返回 F1 - F12
- 方向键：返回ArrowDown、ArrowUp、ArrowLeft、ArrowRight
- Alt 键：返回AltLeft或AltRight
- Shift 键：返回ShiftLeft或ShiftRight
- Ctrl 键：返回ControlLeft或ControlRight
2. KeyboardEvent.key
KeyboardEvent.key属性返回一个字符串，表示按下的键名。该属性只读。
如果按下的键代表可打印字符，则返回这个字符，比如数字、字母。
如果按下的键代表不可打印的特殊字符，则返回预定义的键值，比如 Backspace，Tab，Enter，Shift，Control，Alt，CapsLock，Esc，Spacebar，PageUp，PageDown，End，Home，Left，Right，Up，Down，PrintScreen，Insert，Del，Win，F1～F12，NumLock，Scroll 等。
如果同时按下一个控制键和一个符号键，则返回符号键的键名。比如，按下 Ctrl + a，则返回a；按下 Shift + a，则返回大写的A。
如果无法识别键名，返回字符串Unidentified。
附加键判断
- KeyboardEvent.altKey：是否按下 Alt 键
- KeyboardEvent.ctrlKey：是否按下 Ctrl 键
- KeyboardEvent.metaKey：是否按下 meta 键（Mac 系统是一个四瓣的小花，Windows 系统是 windows 键）
- KeyboardEvent.shiftKey：是否按下 Shift 键
位置区域判断
KeyboardEvent.location属性返回一个整数，表示按下的键处在键盘的哪一个区域。它可能取以下值。
- 0：处在键盘的主区域，或者无法判断处于哪一个区域。
- 1：处在键盘的左侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
- 2：处在键盘的右侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
- 3：处在数字小键盘。
3. KeyboardEvent.repeat
KeyboardEvent.repeat返回一个布尔值，代表该键是否被按着不放，以便判断是否重复这个键，即浏览器会持续触发keydown和keypress事件，直到用户松开手为止。
KeyboardEvent.getModifierState()
KeyboardEvent.getModifierState()方法返回一个布尔值，表示是否按下或激活指定的功能键。它的常用参数如下。
- Alt：Alt 键
- CapsLock：大写锁定键
- Control：Ctrl 键
- Meta：Meta 键
- NumLock：数字键盘开关键
- Shift：Shift 键
if (
  event.getModifierState('Control') +
  event.getModifierState('Alt') +
  event.getModifierState('Meta') > 1
) {
  return;
}

触摸事件
触摸操作概述
浏览器的触摸 API 由三个部分组成。
Touch接口的实例对象用来表示触摸点（一根手指或者一根触摸笔），包括位置、大小、形状、压力、目标元素等属性。
TouchList接口的实例对象表示触摸动作由多个触摸点（多根手指）组成。
TouchEvent接口的实例对象代表由触摸引发的事件，只有触摸屏才会引发这一类事件。
很多时候，触摸事件和鼠标事件同时触发，即使这个时候并没有用到鼠标。这是为了让那些只定义鼠标事件、没有定义触摸事件的代码，在触摸屏的情况下仍然能用。如果想避免这种情况，可以用event.preventDefault方法阻止发出鼠标事件。
Touch 构造函数
Touch 接口代表单个触摸点。触摸点可能是一根手指，也可能是一根触摸笔。
浏览器原生提供Touch构造函数，用来生成Touch实例。
var touch = new Touch(touchOptions);

Touch构造函数接受一个配置对象作为参数，它有以下属性。
- identifier：必需，类型为整数，表示触摸点的唯一 ID。
- target：必需，类型为元素节点，表示触摸点开始时所在的网页元素。
- clientX：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的水平距离，默认为0。
- clientY：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的垂直距离，默认为0。
- screenX：可选，类型为数值，表示触摸点相对于屏幕左上角的水平距离，默认为0。
- screenY：可选，类型为数值，表示触摸点相对于屏幕左上角的垂直距离，默认为0。
- pageX：可选，类型为数值，表示触摸点相对于网页左上角的水平位置（即包括页面的滚动距离），默认为0。
- pageY：可选，类型为数值，表示触摸点相对于网页左上角的垂直位置（即包括页面的滚动距离），默认为0。
- radiusX：可选，类型为数值，表示触摸点周围受到影响的椭圆范围的 X 轴半径，默认为0。
- radiusY：可选：类型为数值，表示触摸点周围受到影响的椭圆范围的 Y 轴半径，默认为0。
- rotationAngle：可选，类型为数值，表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间，默认值为0。
- force：可选，类型为数值，范围在0到1之间，表示触摸压力。0代表没有压力，1代表硬件所能识别的最大压力，默认为0。
Touch 实例属性
（1）Touch.identifier
Touch.identifier属性返回一个整数，表示触摸点的唯一 ID。这个值在整个触摸过程保持不变，直到触摸事件结束。
someElement.addEventListener('touchmove', function (e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    console.log(e.changedTouches[i].identifier);
  }
}, false);

（2）Touch.screenX，Touch.screenY，Touch.clientX，Touch.clientY，pageX，pageY
Touch.screenX属性和Touch.screenY属性，分别表示触摸点相对于屏幕左上角的横坐标和纵坐标，与页面是否滚动无关。
Touch.clientX属性和Touch.clientY属性，分别表示触摸点相对于浏览器视口左上角的横坐标和纵坐标，与页面是否滚动无关。
Touch.pageX属性和Touch.pageY属性，分别表示触摸点相对于当前页面左上角的横坐标和纵坐标，包含了页面滚动带来的位移。
（3）Touch.radiusX，Touch.radiusY，Touch.rotationAngle
Touch.radiusX属性和Touch.radiusY属性，分别返回触摸点周围受到影响的椭圆范围的 X 轴半径和 Y 轴半径，单位为像素。乘以 2 就可以得到触摸范围的宽度和高度。
Touch.rotationAngle属性表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间。
上面这三个属性共同定义了用户与屏幕接触的区域，对于描述手指这一类非精确的触摸，很有帮助。指尖接触屏幕，触摸范围会形成一个椭圆，这三个属性就用来描述这个椭圆区域。
下面是一个示例。
div.addEventListener('touchstart', rotate);
div.addEventListener('touchmove', rotate);
div.addEventListener('touchend', rotate);

function rotate(e) {
  var touch = e.changedTouches.item(0);
  e.preventDefault();

  src.style.width = touch.radiusX * 2 + 'px';
  src.style.height = touch.radiusY * 2 + 'px';
  src.style.transform = 'rotate(' + touch.rotationAngle + 'deg)';
};

（4）Touch.force
Touch.force属性返回一个0到1之间的数值，表示触摸压力。0代表没有压力，1代表硬件所能识别的最大压力。
（5）Touch.target
Touch.target属性返回一个元素节点，代表触摸发生时所在的那个元素节点。即使触摸点已经离开了这个节点，该属性依然不变。
TouchList 接口
TouchList接口表示一组触摸点的集合。它的实例是一个类似数组的对象，成员是Touch的实例对象，表示所有触摸点。用户用三根手指触摸，产生的TouchList实例就会包含三个成员，每根手指的触摸点对应一个Touch实例对象。
它的实例主要通过触摸事件的TouchEvent.touches、TouchEvent.changedTouches、TouchEvent.targetTouches这几个属性获取。
它的实例属性和实例方法只有两个。
- TouchList.length：数值，表示成员数量（即触摸点的数量）。
- TouchList.item()：返回指定位置的成员，它的参数是该成员的位置编号（从零开始）。
TouchEvent 接口
TouchEvent 接口继承了 Event 接口，表示由触摸引发的事件实例，通常来自触摸屏或轨迹板。除了被继承的属性以外，它还有一些自己的属性。
浏览器原生提供TouchEvent()构造函数，用来生成触摸事件的实例。
new TouchEvent(type, options)

TouchEvent()构造函数可以接受两个参数，第一个参数是字符串，表示事件类型；第二个参数是事件的配置对象，该参数是可选的，对象的所有属性也是可选的。除了Event接口的配置属性，该接口还有一些自己的配置属性。
- touches：TouchList实例，代表所有的当前处于活跃状态的触摸点，默认值是一个空数组[]。
- targetTouches：TouchList实例，代表所有处在触摸的目标元素节点内部、且仍然处于活动状态的触摸点，默认值是一个空数组[]。
- changedTouches：TouchList实例，代表本次触摸事件的相关触摸点，默认值是一个空数组[]。
- ctrlKey：布尔值，表示 Ctrl 键是否同时按下，默认值为false。
- shiftKey：布尔值，表示 Shift 键是否同时按下，默认值为false。
- altKey：布尔值，表示 Alt 键是否同时按下，默认值为false。
- metaKey：布尔值，表示 Meta 键（或 Windows 键）是否同时按下，默认值为false。
实例属性
TouchEvent 接口的实例具有Event实例的所有属性和方法，此外还有一些它自己的实例属性，这些属性全部都是只读。
（1）TouchEvent.altKey，TouchEvent.ctrlKey，TouchEvent.shiftKey，TouchEvent.metaKey
- TouchEvent.altKey：布尔值，表示触摸时是否按下了 Alt 键。
- TouchEvent.ctrlKey：布尔值，表示触摸时是否按下了 Ctrl 键。
- TouchEvent.shiftKey：布尔值：表示触摸时是否按下了 Shift 键。
- TouchEvent.metaKey：布尔值，表示触摸时是否按下了 Meta 键（或 Windows 键）。
下面是一个示例。
someElement.addEventListener('touchstart', function (e) {
  console.log('altKey = ' + e.altKey);
  console.log('ctrlKey = ' + e.ctrlKey);
  console.log('metaKey = ' + e.metaKey);
  console.log('shiftKey = ' + e.shiftKey);
}, false);

（2）TouchEvent.changedTouches
TouchEvent.changedTouches属性返回一个TouchList实例，成员是一组Touch实例对象，表示本次触摸事件的相关触摸点。
对于不同的时间，该属性的含义有所不同。
- touchstart事件：被激活的触摸点
- touchmove事件：发生变化的触摸点
- touchend事件：消失的触摸点（即不再被触碰的点）
下面是一个示例。
someElement.addEventListener('touchmove', function (e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    console.log(e.changedTouches[i].identifier);
  }
}, false);

（3）TouchEvent.touches
TouchEvent.touches属性返回一个TouchList实例，成员是所有仍然处于活动状态（即触摸中）的触摸点。一般来说，一个手指就是一个触摸点。
下面是一个示例。
someElement.addEventListener('touchstart', function (e) {
  switch (e.touches.length) {
    // 一根手指触摸
    case 1: handle_one_touch(e); break;
    // 两根手指触摸
    case 2: handle_two_touches(e); break;
    // 三根手指触摸
    case 3: handle_three_touches(e); break;
    // 其他情况
    default: console.log('Not supported'); break;
  }
}, false);

（4）TouchEvent.targetTouches
TouchEvent.targetTouches属性返回一个TouchList实例，成员是触摸事件的目标元素节点内部、所有仍然处于活动状态（即触摸中）的触摸点。
function touches_in_target(ev) {
  return (ev.touches.length === ev.targetTouches.length ? true : false);
}

上面代码用来判断，是否所有触摸点都在目标元素内。
触摸事件的种类
触摸引发的事件，有以下几种。可以通过TouchEvent.type属性，查看到底发生的是哪一种事件。
- touchstart：用户开始触摸时触发，它的target属性返回发生触摸的元素节点。
- touchend：用户不再接触触摸屏时（或者移出屏幕边缘时）触发，它的target属性与touchstart事件一致的，就是开始触摸时所在的元素节点。它的changedTouches属性返回一个TouchList实例，包含所有不再触摸的触摸点（即Touch实例对象）。
- touchmove：用户移动触摸点时触发，它的target属性与touchstart事件一致。如果触摸的半径、角度、力度发生变化，也会触发该事件。
- touchcancel：触摸点取消时触发，比如在触摸区域跳出一个模态窗口（modal window）、触摸点离开了文档区域（进入浏览器菜单栏）、用户的触摸点太多，超过了支持的上限（自动取消早先的触摸点）。
下面是一个例子。
var el = document.getElementsByTagName('canvas')[0];
el.addEventListener('touchstart', handleStart, false);
el.addEventListener('touchmove', handleMove, false);

function handleStart(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    console.log(touches[i].pageX, touches[i].pageY);
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    var touch = touches[i];
    console.log(touch.pageX, touch.pageY);
  }
}



拖拉事件
拖拉事件的种类
拖拉的对象有好几种，包括元素节点、图片、链接、选中的文字等等。在网页中，除了元素节点默认不可以拖拉，其他（图片、链接、选中的文字）都可以直接拖拉。为了让元素节点可拖拉，可以将该节点的draggable属性设为true。
<div draggable="true">
  此区域可拖拉
</div>

draggable属性可用于任何元素节点，但是图片（<img>）和链接（<a>）不加这个属性，就可以拖拉。对于它们，用到这个属性的时候，往往是将其设为false，防止拖拉这两种元素。
注意，一旦某个元素节点的draggable属性设为true，就无法再用鼠标选中该节点内部的文字或子节点了。
当元素节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件。
- drag：拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）。
- dragstart：用户开始拖拉时，在被拖拉的节点上触发，该事件的target属性是被拖拉的节点。通常应该在这个事件的监听函数中，指定拖拉的数据。
- dragend：拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的target属性是被拖拉的节点。它与dragstart事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，dragend事件总是会触发的。
- dragenter：拖拉进入当前节点时，在当前节点上触发一次，该事件的target属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。
- dragover：拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点。该事件与dragenter事件的区别是，dragenter事件在进入该节点时触发，然后只要没有离开这个节点，dragover事件会持续触发。
- dragleave：拖拉操作离开当前节点范围时，在当前节点上触发，该事件的target属性是当前节点。如果要在视觉上显示拖拉离开操作当前节点，就在这个事件的监听函数中设置。
- drop：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许drop，即使在该节点上方松开鼠标键，也不会触发该事件。如果用户按下 ESC 键，取消这个操作，也不会触发该事件。该事件的监听函数负责取出拖拉数据，并进行相关处理。
下面的例子展示，如何动态改变被拖动节点的背景色。
div.addEventListener('dragstart', function (e) {
  this.style.backgroundColor = 'red';
}, false);

div.addEventListener('dragend', function (e) {
  this.style.backgroundColor = 'green';
}, false);

下面是一个例子，展示如何实现将一个节点从当前父节点，拖拉到另一个父节点中。
/* HTML 代码如下
 <div class="dropzone">
   <div id="draggable" draggable="true">
     该节点可拖拉
   </div>
 </div>
 <div class="dropzone"></div>
 <div class="dropzone"></div>
 <div class="dropzone"></div>
*/

// 被拖拉节点
var dragged;

document.addEventListener('dragstart', function (event) {
  // 保存被拖拉节点
  dragged = event.target;
  // 被拖拉节点的背景色变透明
  event.target.style.opacity = 0.5;
}, false);

document.addEventListener('dragend', function (event) {
  // 被拖拉节点的背景色恢复正常
  event.target.style.opacity = '';
}, false);

document.addEventListener('dragover', function (event) {
  // 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
  event.preventDefault();
}, false);

document.addEventListener('dragenter', function (event) {
  // 目标节点的背景色变紫色
  // 由于该事件会冒泡，所以要过滤节点
  if (event.target.className === 'dropzone') {
    event.target.style.background = 'purple';
  }
}, false);

document.addEventListener('dragleave', function( event ) {
  // 目标节点的背景色恢复原样
  if (event.target.className === 'dropzone') {
    event.target.style.background = '';
  }
}, false);

document.addEventListener('drop', function( event ) {
  // 防止事件默认行为（比如某些元素节点上可以打开链接），
  event.preventDefault();
  if (event.target.className === 'dropzone') {
    // 恢复目标节点背景色
    event.target.style.background = '';
    // 将被拖拉节点插入目标节点
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild( dragged );
  }
}, false);

关于拖拉事件，有以下几个注意点。
- 拖拉过程只触发以上这些拖拉事件，尽管鼠标在移动，但是鼠标事件不会触发。
- 将文件从操作系统拖拉进浏览器，不会触发dragstart和dragend事件。
- dragenter和dragover事件的监听函数，用来取出拖拉的数据（即允许放下被拖拉的元素）。由于网页的大部分区域不适合作为放下拖拉元素的目标节点，所以这两个事件的默认设置为当前节点不允许接受被拖拉的元素。如果想要在目标节点上放下的数据，首先必须阻止这两个事件的默认行为。
<div ondragover="return false">
<div ondragover="event.preventDefault()">

上面代码中，如果不取消拖拉事件或者阻止默认行为，就不能在div节点上放下被拖拉的节点。
DataTransfer 接口概述
所有拖拉事件的实例都有一个DragEvent.dataTransfer属性，用来读写需要传递的数据。这个属性的值是一个DataTransfer接口的实例。
浏览器原生提供一个DataTransfer()构造函数，用来生成DataTransfer实例对象。
var dataTrans = new DataTransfer();

DataTransfer()构造函数不接受参数。
拖拉的数据分成两方面：数据的种类（又称格式）和数据的值。数据的种类是一个 MIME 字符串（比如text/plain、image/jpeg），数据的值是一个字符串。一般来说，如果拖拉一段文本，则数据默认就是那段文本；如果拖拉一个链接，则数据默认就是链接的 URL。
拖拉事件开始时，开发者可以提供数据类型和数据值。拖拉过程中，开发者通过dragenter和dragover事件的监听函数，检查数据类型，以确定是否允许放下（drop）被拖拉的对象。比如，在只允许放下链接的区域，检查拖拉的数据类型是否为text/uri-list。
DataTransfer 的实例属性
1. dropEffect
DataTransfer.dropEffect属性用来设置放下（drop）被拖拉节点时的效果，会影响到拖拉经过相关区域时鼠标的形状。它可能取下面的值。
- copy：复制被拖拉的节点
- move：移动被拖拉的节点
- link：创建指向被拖拉的节点的链接
- none：无法放下被拖拉的节点
除了上面这些值，设置其他的值都是无效的。
target.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
});

上面代码中，被拖拉元素一旦drop，接受的区域会复制该节点。
dropEffect属性一般在dragenter和dragover事件的监听函数中设置，对于dragstart、drag、dragleave这三个事件，该属性不起作用。因为该属性只对接受被拖拉的节点的区域有效，对被拖拉的节点本身是无效的。进入目标区域后，拖拉行为会初始化成设定的效果。
2. DataTransfer.effectAllowed
DataTransfer.effectAllowed属性设置本次拖拉中允许的效果。它可能取下面的值。
- copy：复制被拖拉的节点
- move：移动被拖拉的节点
- link：创建指向被拖拉节点的链接
- copyLink：允许copy或link
- copyMove：允许copy或move
- linkMove：允许link或move
- all：允许所有效果
- none：无法放下被拖拉的节点
- uninitialized：默认值，等同于all
如果某种效果是不允许的，用户就无法在目标节点中达成这种效果。
这个属性与dropEffect属性是同一件事的两个方面。前者设置被拖拉的节点允许的效果，后者设置接受拖拉的区域的效果，它们往往配合使用。
dragstart事件的监听函数，可以用来设置这个属性。其他事件的监听函数里面设置这个属性是无效的。
source.addEventListener('dragstart', function (e) {
  e.dataTransfer.effectAllowed = 'move';
});

target.addEventListener('dragover', function (e) {
  e.dataTransfer.dropEffect = 'move';
});

只要dropEffect属性和effectAllowed属性之中，有一个为none，就无法在目标节点上完成drop操作。
3. DataTransfer.files
DataTransfer.files属性是一个 FileList 对象，包含一组本地文件，可以用来在拖拉操作中传送。如果本次拖拉不涉及文件，则该属性为空的 FileList 对象。
下面就是一个接收拖拉文件的例子。
// HTML 代码如下
// <div id="output" style="min-height: 200px;border: 1px solid black;">
//   文件拖拉到这里
// </div>

var div = document.getElementById('output');

div.addEventListener("dragenter", function( event ) {
  div.textContent = '';
  event.stopPropagation();
  event.preventDefault();
}, false);

div.addEventListener("dragover", function( event ) {
  event.stopPropagation();
  event.preventDefault();
}, false);

div.addEventListener("drop", function( event ) {
  event.stopPropagation();
  event.preventDefault();
  var files = event.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    div.textContent += files[i].name + ' ' + files[i].size + '字节\n';
  }
}, false);

上面代码中，通过dataTransfer.files属性读取被拖拉的文件的信息。如果想要读取文件内容，就要使用FileReader对象。
div.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();

  var fileList = e.dataTransfer.files;
  if (fileList.length > 0) {
    var file = fileList[0];
    var reader = new FileReader();
    reader.onloadend = function(e) {
      if (e.target.readyState === FileReader.DONE) {
        var content = reader.result;
        div.innerHTML = 'File: ' + file.name + '\n\n' + content;
      }
    }
    reader.readAsBinaryString(file);
  }
});

4. DataTransfer.types
DataTransfer.types属性是一个只读的数组，每个成员是一个字符串，里面是拖拉的数据格式（通常是 MIME 值）。比如，如果拖拉的是文字，对应的成员就是text/plain。
下面是一个例子，通过检查dataTransfer属性的类型，决定是否允许在当前节点执行drop操作。
function contains(list, value){
  for (var i = 0; i < list.length; ++i) {
    if(list[i] === value) return true;
  }
  return false;
}

function doDragOver(event) {
  var isLink = contains(event.dataTransfer.types, 'text/uri-list');
  if (isLink) event.preventDefault();
}

上面代码中，只有当被拖拉的节点有一个是链接时，才允许在当前节点放下。
5. DataTransfer.items
DataTransfer.items属性返回一个类似数组的只读对象（DataTransferItemList 实例），每个成员就是本次拖拉的一个对象（DataTransferItem 实例）。如果本次拖拉不包含对象，则返回一个空对象。
DataTransferItemList 实例具有以下的属性和方法。
- length：返回成员的数量
- add(data, type)：增加一个指定内容和类型（比如text/html和text/plain）的字符串作为成员
- add(file)：add方法的另一种用法，增加一个文件作为成员
- remove(index)：移除指定位置的成员
- clear()：移除所有的成员
DataTransferItem 实例具有以下的属性和方法。
- kind：返回成员的种类（string还是file）。
- type：返回成员的类型（通常是 MIME 值）。
- getAsFile()：如果被拖拉是文件，返回该文件，否则返回null。
- getAsString(callback)：如果被拖拉的是字符串，将该字符传入指定的回调函数处理。该方法是异步的，所以需要传入回调函数。
下面是一个例子。
div.addEventListener('drop', function (e) {
  e.preventDefault();
  if (e.dataTransfer.items != null) {
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      console.log(e.dataTransfer.items[i].kind + ': ' + e.dataTransfer.items[i].type);
    }
  }
});

DataTransfer 的实例方法
DataTransfer.setData()
DataTransfer.setData()方法用来设置拖拉事件所带有的数据。该方法没有返回值。
event.dataTransfer.setData('text/plain', 'Text to drag');

该方法接受两个参数，都是字符串。第一个参数表示数据类型（比如text/plain），第二个参数是具体数据。如果指定类型的数据在dataTransfer属性不存在，那么这些数据将被加入，否则原有的数据将被新数据替换。
如果是拖拉文本框或者拖拉选中的文本，会默认将对应的文本数据，添加到dataTransfer属性，不用手动指定。
<div draggable="true">
  aaa
</div>

上面代码中，拖拉这个<div>元素会自动带上文本数据aaa。
使用setData方法，可以替换到原有数据。
<div
  draggable="true"
  ondragstart="event.dataTransfer.setData('text/plain', 'bbb')"
>
  aaa
</div>

上面代码中，拖拉数据实际上是bbb，而不是aaa。
下面是添加其他类型的数据。由于text/plain是最普遍支持的格式，为了保证兼容性，建议最后总是保存一份纯文本格式的数据。
var dt = event.dataTransfer;

// 添加链接
dt.setData('text/uri-list', 'http://www.example.com');
dt.setData('text/plain', 'http://www.example.com');

// 添加 HTML 代码
dt.setData('text/html', 'Hello there, <strong>stranger</strong>');
dt.setData('text/plain', 'Hello there, <strong>stranger</strong>');

// 添加图像的 URL
dt.setData('text/uri-list', imageurl);
dt.setData('text/plain', imageurl);

可以一次提供多种格式的数据。
var dt = event.dataTransfer;
dt.setData('application/x-bookmark', bookmarkString);
dt.setData('text/uri-list', 'http://www.example.com');
dt.setData('text/plain', 'http://www.example.com');

上面代码中，通过在同一个事件上面，存放三种类型的数据，使得拖拉事件可以在不同的对象上面，drop不同的值。注意，第一种格式是一个自定义格式，浏览器默认无法读取，这意味着，只有某个部署了特定代码的节点，才可能drop（读取到）这个数据。
DataTransfer.getData()
DataTransfer.getData()方法接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用setData方法添加的数据）。如果指定类型的数据不存在，则返回空字符串。通常只有drop事件触发后，才能取出数据。
下面是一个drop事件的监听函数，用来取出指定类型的数据。
function onDrop(event) {
  var data = event.dataTransfer.getData('text/plain');
  event.target.textContent = data;
  event.preventDefault();
}

上面代码取出拖拉事件的文本数据，将其替换成当前节点的文本内容。注意，这时还必须取消浏览器的默认行为，因为假如用户拖拉的是一个链接，浏览器默认会在当前窗口打开这个链接。
getData方法返回的是一个字符串，如果其中包含多项数据，就必须手动解析。
function doDrop(event) {
  var lines = event.dataTransfer.getData('text/uri-list').split('\n');
  for (let line of lines) {
    let link = document.createElement('a');
    link.href = line;
    link.textContent = line;
    event.target.appendChild(link);
  }
  event.preventDefault();
}

上面代码中，getData方法返回的是一组链接，就必须自行解析。
类型值指定为URL，可以取出第一个有效链接。
var link = event.dataTransfer.getData('URL');

下面的例子是从多种类型的数据里面取出数据。
function doDrop(event) {
  var types = event.dataTransfer.types;
  var supportedTypes = ['text/uri-list', 'text/plain'];
  types = supportedTypes.filter(function (value) { types.includes(value) });
  if (types.length) {
    var data = event.dataTransfer.getData(types[0]);
  }
  event.preventDefault();
}

DataTransfer.clearData()
DataTransfer.clearData()方法接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。如果没有指定类型，则删除所有数据。如果指定类型不存在，则调用该方法不会产生任何效果。
event.dataTransfer.clearData('text/uri-list');

该方法不会移除拖拉的文件，因此调用该方法后，DataTransfer.types属性可能依然会返回Files类型（前提是存在文件拖拉）。
注意，该方法只能在dragstart事件的监听函数之中使用，因为这是拖拉操作的数据唯一可写的时机。
DataTransfer.setDragImage()
拖动过程中（dragstart事件触发后），浏览器会显示一张图片跟随鼠标一起移动，表示被拖动的节点。这张图片是自动创造的，通常显示为被拖动节点的外观，不需要自己动手设置。
DataTransfer.setDragImage()方法可以自定义这张图片。它接受三个参数。第一个是<img>节点或者<canvas>节点，如果省略或为null，则使用被拖动的节点的外观；第二个和第三个参数为鼠标相对于该图片左上角的横坐标和纵坐标。
下面是一个例子。
/* HTML 代码如下
 <div id="drag-with-image" class="dragdemo" draggable="true">
   drag me
 </div>
*/

var div = document.getElementById('drag-with-image');
div.addEventListener('dragstart', function (e) {
  var img = document.createElement('img');
  img.src = 'http://path/to/img';
  e.dataTransfer.setDragImage(img, 0, 0);
}, false);

表单事件
表单事件的种类
input 事件
input事件当<input>、<select>、<textarea>的值发生变化时触发。
对于复选框（<input type=checkbox>）或单选框（<input type=radio>），用户改变选项时，也会触发这个事件。
对于打开contenteditable属性的元素，只要值发生变化，也会触发input事件。
input事件的一个特点，就是会连续触发，比如用户每按下一次按键，就会触发一次input事件。
input事件对象继承了InputEvent接口。
该事件跟change事件很像，不同之处在于input事件在元素的值发生变化后立即发生，而change在元素失去焦点时发生，而内容此时可能已经变化多次。也就是说，如果有连续变化，input事件会触发多次，而change事件只在失去焦点时触发一次。
下面是<select>元素的例子。
/* HTML 代码如下
<select id="mySelect">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
</select>
*/

function inputHandler(e) {
  console.log(e.target.value)
}

var mySelect = document.querySelector('#mySelect');
mySelect.addEventListener('input', inputHandler);

select 事件
select事件当在<input>、<textarea>里面选中文本时触发。
// HTML 代码如下
// <input id="test" type="text" value="Select me!" />

var elem = document.getElementById('test');
elem.addEventListener('select', function (e) {
  console.log(e.type); // "select"
}, false);

选中的文本可以通过event.target元素的selectionDirection、selectionEnd、selectionStart和value属性拿到。
change 事件
change事件当<input>、<select>、<textarea>的值发生变化时触发。它与input事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发，另一方面input事件必然伴随change事件。具体来说，分成以下几种情况。
- 激活单选框（radio）或复选框（checkbox）时触发。
- 用户提交时触发。比如，从下列列表（select）完成选择，在日期或文件输入框完成选择。
- 当文本框或<textarea>元素的值发生改变，并且丧失焦点时触发。
下面是一个例子。
// HTML 代码如下
// <select size="1" onchange="changeEventHandler(event);">
//   <option>chocolate</option>
//   <option>strawberry</option>
//   <option>vanilla</option>
// </select>

function changeEventHandler(event) {
  console.log(event.target.value);
}

invalid 事件
用户提交表单时，如果表单元素的值不满足校验条件，就会触发invalid事件。
<form>
  <input type="text" required oninvalid="console.log('invalid input')" />
  <button type="submit">提交</button>
</form>

上面代码中，输入框是必填的。如果不填，用户点击按钮提交时，就会触发输入框的invalid事件，导致提交被取消。
reset 事件，submit 事件
这两个事件发生在表单对象<form>上，而不是发生在表单的成员上。
reset事件当表单重置（所有表单成员变回默认值）时触发。
submit事件当表单数据向服务器提交时触发。注意，submit事件的发生对象是<form>元素，而不是<button>元素，因为提交的是表单，而不是按钮。
InputEvent 接口
InputEvent接口主要用来描述input事件的实例。该接口继承了Event接口，还定义了一些自己的实例属性和实例方法。
浏览器原生提供InputEvent()构造函数，用来生成实例对象。
new InputEvent(type, options)

InputEvent构造函数可以接受两个参数。第一个参数是字符串，表示事件名称，该参数是必需的。第二个参数是一个配置对象，用来设置事件实例的属性，该参数是可选的。配置对象的字段除了Event构造函数的配置属性，还可以设置下面的字段，这些字段都是可选的。
- inputType：字符串，表示发生变更的类型（详见下文）。
- data：字符串，表示插入的字符串。如果没有插入的字符串（比如删除操作），则返回null或空字符串。
- dataTransfer：返回一个 DataTransfer 对象实例，该属性通常只在输入框接受富文本输入时有效。
InputEvent的实例属性主要就是上面三个属性，这三个实例属性都是只读的。
（1）InputEvent.data
InputEvent.data属性返回一个字符串，表示变动的内容。
// HTML 代码如下
// <input type="text" id="myInput">
var input = document.getElementById('myInput');
input.addEventListener('input', myFunction, false);

function myFunction(e) {
  console.log(e.data);
}

上面代码中，如果手动在输入框里面输入abc，控制台会先输出a，再在下一行输出b，再在下一行输出c。然后选中abc，一次性将它们删除，控制台会输出null或一个空字符串。
（2）InputEvent.inputType
InputEvent.inputType属性返回一个字符串，表示字符串发生变更的类型。
对于常见情况，Chrome 浏览器的返回值如下。完整列表可以参考文档。
- 手动插入文本：insertText
- 粘贴插入文本：insertFromPaste
- 向后删除：deleteContentBackward
- 向前删除：deleteContentForward
（3）InputEvent.dataTransfer
InputEvent.dataTransfer属性返回一个 DataTransfer 实例。该属性只在文本框接受粘贴内容（insertFromPaste）或拖拽内容（insertFromDrop）时才有效。
资源事件
beforeunload 事件
beforeunload事件在窗口、文档、各种资源将要卸载前触发。它可以用来防止用户不小心卸载资源。
如果该事件对象的returnValue属性是一个非空字符串，那么浏览器就会弹出一个对话框，询问用户是否要卸载该资源。但是，用户指定的字符串可能无法显示，浏览器会展示预定义的字符串。如果用户点击“取消”按钮，资源就不会卸载。
window.addEventListener('beforeunload', function (event) {
  event.returnValue = '你确定离开吗？';
});

浏览器对这个事件的行为很不一致，有的浏览器调用event.preventDefault()，也会弹出对话框。IE 浏览器需要显式返回一个非空的字符串，才会弹出对话框。而且，大多数浏览器在对话框中不显示指定文本，只显示默认文本。因此，可以采用下面的写法，取得最大的兼容性。
window.addEventListener('beforeunload', function (e) {
  var confirmationMessage = '确认关闭窗口？';

  e.returnValue = confirmationMessage;
  return confirmationMessage;
});

注意，许多手机浏览器（比如 Safari）默认忽略这个事件，桌面浏览器也有办法忽略这个事件。所以，它可能根本不会生效，不能依赖它来阻止用户关闭浏览器窗口，最好不要使用这个事件。
另外，一旦使用了beforeunload事件，浏览器就不会缓存当前网页，使用“回退”按钮将重新向服务器请求网页。这是因为监听这个事件的目的，一般是为了网页状态，这时缓存页面的初始状态就没意义了。
unload 事件
unload事件在窗口关闭或者document对象将要卸载时触发。它的触发顺序排在beforeunload、pagehide事件后面。
unload事件发生时，文档处于一个特殊状态。所有资源依然存在，但是对用户来说都不可见，UI 互动全部无效。这个事件是无法取消的，即使在监听函数里面抛出错误，也不能停止文档的卸载。
window.addEventListener('unload', function(event) {
  console.log('文档将要卸载');
});

手机上，浏览器或系统可能会直接丢弃网页，这时该事件根本不会发生。而且跟beforeunload事件一样，一旦使用了unload事件，浏览器就不会缓存当前网页，理由同上。因此，任何情况下都不应该依赖这个事件，指定网页卸载时要执行的代码，可以考虑完全不使用这个事件。
load 事件，error 事件
load事件在页面或某个资源加载成功时触发。
注意，页面或资源从浏览器缓存加载，并不会触发load事件。
window.addEventListener('load', function(event) {
  console.log('所有资源都加载完成');
});

error事件是在页面或资源加载失败时触发。abort事件在用户取消加载时触发。
这三个事件实际上属于进度事件，不仅发生在document对象，还发生在各种外部资源上面。浏览网页就是一个加载各种资源的过程，图像（image）、样式表（style sheet）、脚本（script）、视频（video）、音频（audio）、Ajax请求（XMLHttpRequest）等等。这些资源和document对象、window对象、XMLHttpRequestUpload 对象，都会触发load事件和error事件。
session 历史事件
pageshow 事件，pagehide 事件
默认情况下，浏览器会在当前会话（session）缓存页面，当用户点击“前进/后退”按钮时，浏览器就会从缓存中加载页面。
pageshow事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。
第一次加载时，它的触发顺序排在load事件后面。从缓存加载时，load事件不会触发，因为网页在缓存中的样子通常是load事件的监听函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的 JavaScript 脚本（比如 DOMContentLoaded 事件的监听函数）也不会执行。
window.addEventListener('pageshow', function(event) {
  console.log('pageshow: ', event);
});

pageshow事件有一个persisted属性，返回一个布尔值。页面第一次加载时，这个属性是false；当页面从缓存加载时，这个属性是true。
window.addEventListener('pageshow', function(event){
  if (event.persisted) {
    // ...
  }
});

pagehide事件与pageshow事件类似，当用户通过“前进/后退”按钮，离开当前页面时触发。它与 unload 事件的区别在于，如果在 window 对象上定义unload事件的监听函数之后，页面不会保存在缓存中，而使用pagehide事件，页面会保存在缓存中。
pagehide事件实例也有一个persisted属性，将这个属性设为true，就表示页面要保存在缓存中；设为false，表示网页不保存在缓存中，这时如果设置了unload 事件的监听函数，该函数将在 pagehide 事件后立即运行。
如果页面包含<frame>或<iframe>元素，则<frame>页面的pageshow事件和pagehide事件，都会在主页面之前触发。
注意，这两个事件只在浏览器的history对象发生变化时触发，跟网页是否可见没有关系。
popstate 事件
popstate事件在浏览器的history对象的当前记录发生显式切换时触发。注意，调用history.pushState()或history.replaceState()，并不会触发popstate事件。该事件只在用户在history记录之间显式切换时触发，比如鼠标点击“后退/前进”按钮，或者在脚本中调用history.back()、history.forward()、history.go()时触发。
该事件对象有一个state属性，保存history.pushState方法和history.replaceState方法为当前记录添加的state对象。
window.onpopstate = function (event) {
  console.log('state: ' + event.state);
};
history.pushState({page: 1}, 'title 1', '?page=1');
history.pushState({page: 2}, 'title 2', '?page=2');
history.replaceState({page: 3}, 'title 3', '?page=3');
history.back(); // state: {"page":1}
history.back(); // state: null
history.go(2);  // state: {"page":3}

浏览器对于页面首次加载，是否触发popstate事件，处理不一样，Firefox 不触发该事件。
hashchange 事件
hashchange事件在 URL 的 hash 部分（即#号后面的部分，包括#号）发生变化时触发。该事件一般在window对象上监听。
hashchange的事件实例具有两个特有属性：oldURL属性和newURL属性，分别表示变化前后的完整 URL。
// URL 是 http://www.example.com/
window.addEventListener('hashchange', myFunction);

function myFunction(e) {
  console.log(e.oldURL);
  console.log(e.newURL);
}

location.hash = 'part2';
// http://www.example.com/
// http://www.example.com/#part2

网页状态事件
DOMContentLoaded 事件
网页下载并解析完成以后，浏览器就会在document对象上触发 DOMContentLoaded 事件。这时，仅仅完成了网页的解析（整张页面的 DOM 生成了），所有外部资源（样式表、脚本、iframe 等等）可能还没有下载结束。也就是说，这个事件比load事件，发生时间早得多。
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM生成');
});

注意，网页的 JavaScript 脚本是同步执行的，脚本一旦发生堵塞，将推迟触发DOMContentLoaded事件。
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM 生成');
});

// 这段代码会推迟触发 DOMContentLoaded 事件
for(var i = 0; i < 1000000000; i++) {
  // ...
}

readystatechange 事件
readystatechange事件当 Document 对象和 XMLHttpRequest 对象的readyState属性发生变化时触发。document.readyState有三个可能的值：loading（网页正在加载）、interactive（网页已经解析完成，但是外部资源仍然处在加载状态）和complete（网页和所有外部资源已经结束加载，load事件即将触发）。
document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    // ...
  }
}

窗口事件
scroll 事件
scroll事件在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。
window.addEventListener('scroll', callback);

该事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。推荐的做法是使用requestAnimationFrame或setTimeout控制该事件的触发频率，然后可以结合customEvent抛出一个新事件。
(function () {
  var throttle = function (type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function () {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  // 将 scroll 事件转为 optimizedScroll 事件
  throttle('scroll', 'optimizedScroll');
})();

window.addEventListener('optimizedScroll', function() {
  console.log('Resource conscious scroll callback!');
});

改用setTimeout()方法，可以放置更大的时间间隔。
(function() {
  window.addEventListener('scroll', scrollThrottler, false);

  var scrollTimeout;
  function scrollThrottler() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        scrollTimeout = null;
        actualScrollHandler();
      }, 66);
    }
  }

  function actualScrollHandler() {
    // ...
  }
}());

下面是一个更一般的throttle函数的写法。
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('scroll', throttle(callback, 1000));

上面的代码将scroll事件的触发频率，限制在一秒一次。
lodash函数库提供了现成的throttle函数，可以直接使用。
window.addEventListener('scroll', _.throttle(callback, 1000));

resize 事件
resize事件在改变浏览器窗口大小时触发，主要发生在window对象上面。
var resizeMethod = function () {
  if (document.body.clientWidth < 768) {
    console.log('移动设备的视口');
  }
};

window.addEventListener('resize', resizeMethod, true);

该事件也会连续地大量触发，所以最好像上面的scroll事件一样，通过throttle函数控制事件触发频率。
fullscreenchange 事件，fullscreenerror 事件
fullscreenchange事件在进入或退出全屏状态时触发，该事件发生在document对象上面。
document.addEventListener('fullscreenchange', function (event) {
  console.log(document.fullscreenElement);
});

fullscreenerror事件在浏览器无法切换到全屏状态时触发。
进度事件
进度事件的种类
进度事件用来描述资源加载的进度，主要由 AJAX 请求、<img>、<audio>、<video>、<style>、<link>等外部资源的加载触发，继承了ProgressEvent接口。它主要包含以下几种事件。
- abort：外部资源中止加载时（比如用户取消）触发。如果发生错误导致中止，不会触发该事件。
- error：由于错误导致外部资源无法加载时触发。
- load：外部资源加载成功时触发。
- loadstart：外部资源开始加载时触发。
- loadend：外部资源停止加载时触发，发生顺序排在error、abort、load等事件的后面。
- progress：外部资源加载过程中不断触发。
- timeout：加载超时时触发。
注意，除了资源下载，文件上传也存在这些事件。
有时候，图片加载会在脚本运行之前就完成，尤其是当脚本放置在网页底部的时候，因此有可能load和error事件的监听函数根本不会执行。所以，比较可靠的方式，是用complete属性先判断一下是否加载完成。
function loaded() {
  // ...
}

if (image.complete) {
  loaded();
} else {
  image.addEventListener('load', loaded);
}

由于 DOM 的元素节点没有提供是否加载错误的属性，所以error事件的监听函数最好放在<img>元素的 HTML 代码中，这样才能保证发生加载错误时百分之百会执行。
<img src="/wrong/url" onerror="this.style.display='none';" />

loadend事件的监听函数，可以用来取代abort事件、load事件、error事件的监听函数，因为它总是在这些事件之后发生。
req.addEventListener('loadend', loadEnd, false);

function loadEnd(e) {
  console.log('传输结束，成功失败未知');
}

loadend事件本身不提供关于进度结束的原因，但可以用它来做所有加载结束场景都需要做的一些操作。
另外，error事件有一个特殊的性质，就是不会冒泡。所以，子元素的error事件，不会触发父元素的error事件监听函数。
ProgressEvent 接口
ProgressEvent接口主要用来描述外部资源加载的进度，比如 AJAX 加载、<img>、<video>、<style>、<link>等外部资源加载。进度相关的事件都继承了这个接口。
浏览器原生提供了ProgressEvent()构造函数，用来生成事件实例。
new ProgressEvent(type, options)

ProgressEvent()构造函数接受两个参数。第一个参数是字符串，表示事件的类型，这个参数是必须的。第二个参数是一个配置对象，表示事件的属性，该参数可选。配置对象除了可以使用Event接口的配置属性，还可以使用下面的属性，所有这些属性都是可选的。
- lengthComputable：布尔值，表示加载的总量是否可以计算，默认是false。
- loaded：整数，表示已经加载的量，默认是0。
- total：整数，表示需要加载的总量，默认是0。
ProgressEvent具有对应的实例属性。
- ProgressEvent.lengthComputable
- ProgressEvent.loaded
- ProgressEvent.total
如果ProgressEvent.lengthComputable为false，ProgressEvent.total实际上是没有意义的。
下面是一个例子。
var p = new ProgressEvent('load', {
  lengthComputable: true,
  loaded: 30,
  total: 100,
});

document.body.addEventListener('load', function (e) {
  console.log('已经加载：' + (e.loaded / e.total) * 100 + '%');
});

document.body.dispatchEvent(p);
// 已经加载：30%

上面代码先构造一个load事件，抛出后被监听函数捕捉到。
下面是一个实际的例子。
var xhr = new XMLHttpRequest();

xhr.addEventListener('progress', updateProgress, false);
xhr.addEventListener('load', transferComplete, false);
xhr.addEventListener('error', transferFailed, false);
xhr.addEventListener('abort', transferCanceled, false);

xhr.open();

function updateProgress(e) {
  if (e.lengthComputable) {
    var percentComplete = e.loaded / e.total;
  } else {
    console.log('不能计算进度');
  }
}

function transferComplete(e) {
  console.log('传输结束');
}

function transferFailed(evt) {
  console.log('传输过程中发生错误');
}

function transferCanceled(evt) {
  console.log('用户取消了传输');
}

上面是下载过程的进度事件，还存在上传过程的进度事件。这时所有监听函数都要放在XMLHttpRequest.upload对象上面。
var xhr = new XMLHttpRequest();

xhr.upload.addEventListener('progress', updateProgress, false);
xhr.upload.addEventListener('load', transferComplete, false);
xhr.upload.addEventListener('error', transferFailed, false);
xhr.upload.addEventListener('abort', transferCanceled, false);

xhr.open();

剪贴板事件
- cut：将选中的内容从文档中移除，加入剪贴板时触发。
- copy：进行复制动作时触发。
- paste：剪贴板内容粘贴到文档后触发。
举例来说，如果希望禁止输入框的粘贴事件，可以使用下面的代码。
inputElement.addEventListener('paste', e => e.preventDefault());

cut、copy、paste这三个事件的事件对象都是ClipboardEvent接口的实例。ClipboardEvent有一个实例属性clipboardData，是一个 DataTransfer 对象，存放剪贴的数据。
document.addEventListener('copy', function (e) {
  e.clipboardData.setData('text/plain', 'Hello, world!');
  e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
  e.preventDefault();
});

焦点事件
焦点事件发生在元素节点和document对象上面，与获得或失去焦点相关。它主要包括以下四个事件。
- focus：元素节点获得焦点后触发，该事件不会冒泡。
- blur：元素节点失去焦点后触发，该事件不会冒泡。
- focusin：元素节点将要获得焦点时触发，发生在focus事件之前。该事件会冒泡。
- focusout：元素节点将要失去焦点时触发，发生在blur事件之前。该事件会冒泡。
这四个事件的事件对象都继承了FocusEvent接口。FocusEvent实例具有以下属性。
- FocusEvent.target：事件的目标节点。
- FocusEvent.relatedTarget：对于focusin事件，返回失去焦点的节点；对于focusout事件，返回将要接受焦点的节点；对于focus和blur事件，返回null。
由于focus和blur事件不会冒泡，只能在捕获阶段触发，所以addEventListener方法的第三个参数需要设为true。
form.addEventListener('focus', function (event) {
  event.target.style.background = 'pink';
}, true);

form.addEventListener('blur', function (event) {
  event.target.style.background = '';
}, true);

CustomEvent 接口
CustomEvent 接口用于生成自定义的事件实例。那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，就可以使用 CustomEvent 接口生成的自定义事件对象。
浏览器原生提供CustomEvent()构造函数，用来生成 CustomEvent 事件实例。
new CustomEvent(type, options)

CustomEvent()构造函数接受两个参数。第一个参数是字符串，表示事件的名字，这是必须的。第二个参数是事件的配置对象，这个参数是可选的。CustomEvent的配置对象除了接受 Event 事件的配置属性，只有一个自己的属性。
- detail：表示事件的附带数据，默认为null。
下面是一个例子。
var event = new CustomEvent('build', { 'detail': 'hello' });

function eventHandler(e) {
  console.log(e.detail);
}

document.body.addEventListener('build', function (e) {
  console.log(e.detail);
});

document.body.dispatchEvent(event);

下面是另一个例子。
var myEvent = new CustomEvent('myevent', {
  detail: {
    foo: 'bar'
  },
  bubbles: true,
  cancelable: false
});

el.addEventListener('myevent', function (event) {
  console.log('Hello ' + event.detail.foo);
});

el.dispatchEvent(myEvent);

事件对象
事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了Event.prototype对象。
Event对象本身就是一个构造函数，可以用来生成新的实例。
event = new Event(type, options);

Event构造函数接受两个参数。第一个参数type是字符串，表示事件的名称；第二个参数options是一个对象，表示事件对象的配置。该对象主要有下面两个属性。
- bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡。
- cancelable：布尔值，可选，默认为false，表示事件是否可以被取消，即能否用Event.preventDefault()取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。
var ev = new Event(
  'look',
  {
    'bubbles': true,
    'cancelable': false
  }
);
document.dispatchEvent(ev);

注意，如果不是显式指定bubbles属性为true，生成的事件就只能在“捕获阶段”触发监听函数。
// HTML 代码为
// <div><p>Hello</p></div>
var div = document.querySelector('div');
var p = document.querySelector('p');

function callback(event) {
  var tag = event.currentTarget.tagName;
  console.log('Tag: ' + tag); // 没有任何输出
}

div.addEventListener('click', callback, false);

var click = new Event('click');
p.dispatchEvent(click);

上面代码中，p元素发出一个click事件，该事件默认不会冒泡。div.addEventListener方法指定在冒泡阶段监听，因此监听函数不会触发。如果写成div.addEventListener('click', callback, true)，那么在“捕获阶段”可以监听到这个事件。
另一方面，如果这个事件在div元素上触发。
div.dispatchEvent(click);

那么，不管div元素是在冒泡阶段监听，还是在捕获阶段监听，都会触发监听函数。因为这时div元素是事件的目标，不存在是否冒泡的问题，div元素总是会接收到事件，因此导致监听函数生效。
实例属性
Event.bubbles，Event.eventPhase
Event.bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。前面说过，除非显式声明，Event构造函数生成的事件，默认是不冒泡的。
Event.eventPhase属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。
var phase = event.eventPhase;

Event.eventPhase的返回值有四种可能。
- 0，事件目前没有发生。
- 1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
- 2，事件到达目标节点，即Event.target属性指向的那个节点。
- 3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。
Event.cancelable，Event.cancelBubble，event.defaultPrevented
Event.cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。
大多数浏览器的原生事件是可以取消的。比如，取消click事件，点击链接将无效。但是除非显式声明，Event构造函数生成的事件，默认是不可以取消的。
var evt = new Event('foo');
evt.cancelable  // false

当Event.cancelable属性为true时，调用Event.preventDefault()就可以取消这个事件，阻止浏览器对该事件的默认行为。
如果事件不能取消，调用Event.preventDefault()会没有任何效果。所以使用这个方法之前，最好用Event.cancelable属性判断一下是否可以取消。
function preventEvent(event) {
  if (event.cancelable) {
    event.preventDefault();
  } else {
    console.warn('This event couldn\'t be canceled.');
    console.dir(event);
  }
}

Event.cancelBubble属性是一个布尔值，如果设为true，相当于执行Event.stopPropagation()，可以阻止事件的传播。
Event.defaultPrevented属性返回一个布尔值，表示该事件是否调用过Event.preventDefault方法。该属性只读。
if (event.defaultPrevented) {
  console.log('该事件已经取消了');
}

Event.currentTarget，Event.target
事件发生以后，会经过捕获和冒泡两个阶段，依次通过多个 DOM 节点。因此，任意事件都有两个与事件相关的节点，一个是事件的原始触发节点（Event.target），另一个是事件当前正在通过的节点（Event.currentTarget）。前者通常是后者的后代节点。
Event.currentTarget属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。
Event.target属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。
事件传播过程中，不同节点的监听函数内部的Event.target与Event.currentTarget属性的值是不一样的。
// HTML 代码为
// <p id="para">Hello <em>World</em></p>
function hide(e) {
  // 不管点击 Hello 或 World，总是返回 true
  console.log(this === e.currentTarget);

  // 点击 Hello，返回 true
  // 点击 World，返回 false
  console.log(this === e.target);
}

document.getElementById('para').addEventListener('click', hide, false);

上面代码中，<em>是<p>的子节点，点击<em>或者点击<p>，都会导致监听函数执行。这时，e.target总是指向原始点击位置的那个节点，而e.currentTarget指向事件传播过程中正在经过的那个节点。由于监听函数只有事件经过时才会触发，所以e.currentTarget总是等同于监听函数内部的this。
Event.type
Event.type属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的。该属性只读。
var evt = new Event('foo');
evt.type // "foo"

Event.timeStamp
Event.timeStamp属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。
var evt = new Event('foo');
evt.timeStamp // 3683.6999999995896

它的返回值有可能是整数，也有可能是小数（高精度时间戳），取决于浏览器的设置。
下面是一个计算鼠标移动速度的例子，显示每秒移动的像素数量。
var previousX;
var previousY;
var previousT;

window.addEventListener('mousemove', function(event) {
  if (
    previousX !== undefined &&
    previousY !== undefined &&
    previousT !== undefined
  ) {
    var deltaX = event.screenX - previousX;
    var deltaY = event.screenY - previousY;
    var deltaD = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    var deltaT = event.timeStamp - previousT;
    console.log(deltaD / deltaT * 1000);
  }

  previousX = event.screenX;
  previousY = event.screenY;
  previousT = event.timeStamp;
});

Event.isTrusted
Event.isTrusted属性返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个click事件，该事件是用户产生的；Event构造函数生成的事件，则是脚本产生的。
var evt = new Event('foo');
evt.isTrusted // false

上面代码中，evt对象是脚本产生的，所以isTrusted属性返回false。
Event.detail
Event.detail属性只有浏览器的 UI （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关。比如，对于click和dblclick事件，Event.detail是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；对于鼠标滚轮事件，Event.detail是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。
// HTML 代码如下
// <p>Hello</p>
function giveDetails(e) {
  console.log(e.detail);
}

document.querySelector('p').onclick = giveDetails;

实例方法
Event.preventDefault()
Event.preventDefault方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的cancelable属性为true，如果为false，调用该方法没有任何效果。
注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用stopPropagation()或stopImmediatePropagation()方法。
// HTML 代码为
// <input type="checkbox" id="my-checkbox" />
var cb = document.getElementById('my-checkbox');

cb.addEventListener(
  'click',
  function (e){ e.preventDefault(); },
  false
);

上面代码中，浏览器的默认行为是单击会选中单选框，取消这个行为，就导致无法选中单选框。
利用这个方法，可以为文本输入框设置校验条件。如果用户的输入不符合条件，就无法将字符输入文本框。
// HTML 代码为
// <input type="text" id="my-input" />
var input = document.getElementById('my-input');
input.addEventListener('keypress', checkName, false);

function checkName(e) {
  if (e.charCode < 97 || e.charCode > 122) {
    e.preventDefault();
  }
}

上面代码为文本框的keypress事件设定监听函数后，将只能输入小写字母，否则输入事件的默认行为（写入文本框）将被取消，导致不能向文本框输入内容。
Event.stopPropagation()
stopPropagation方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。
function stopEvent(e) {
  e.stopPropagation();
}

el.addEventListener('click', stopEvent, false);

上面代码中，click事件将不会进一步冒泡到el节点的父节点。
Event.stopImmediatePropagation()
Event.stopImmediatePropagation方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比Event.stopPropagation()更彻底。
如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了Event.stopImmediatePropagation方法，其他的监听函数就不会再执行了。
function l1(e){
  e.stopImmediatePropagation();
}

function l2(e){
  console.log('hello world');
}

el.addEventListener('click', l1, false);
el.addEventListener('click', l2, false);

上面代码在el节点上，为click事件添加了两个监听函数l1和l2。由于l1调用了event.stopImmediatePropagation方法，所以l2不会被调用。
Event.composedPath()
Event.composedPath()返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。
// HTML 代码如下
// <div>
//   <p>Hello</p>
// </div>
var div = document.querySelector('div');
var p = document.querySelector('p');

div.addEventListener('click', function (e) {
  console.log(e.composedPath());
}, false);
// [p, div, body, html, document, Window]

上面代码中，click事件的最底层节点是p，向上依次是div、body、html、document、Window。
this 的指向
监听函数内部的this指向触发事件的那个元素节点。
<button id="btn" onclick="console.log(this.id)">点击</button>

执行上面代码，点击后会输出btn。
其他两种监听函数的写法，this的指向也是如此。
// HTML 代码如下
// <button id="btn">点击</button>
var btn = document.getElementById('btn');

// 写法一
btn.onclick = function () {
  console.log(this.id);
};

// 写法二
btn.addEventListener(
  'click',
  function (e) {
    console.log(this.id);
  },
  false
);

上面两种写法，点击按钮以后也是输出btn。
事件的代理
由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。
var ul = document.querySelector('ul');

ul.addEventListener('click', function (event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});

上面代码中，click事件的监听函数定义在<ul>节点，但是实际上，它处理的是子节点<li>的click事件。这样做的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个<li>节点上定义监听函数。而且以后再添加子节点，监听函数依然有效。
如果希望事件到某个节点为止，不再传播，可以使用事件对象的stopPropagation方法。
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, true);

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, false);

上面代码中，stopPropagation方法分别在捕获阶段和冒泡阶段，阻止了事件的传播。
但是，stopPropagation方法只会阻止事件的传播，不会阻止该事件触发<p>节点的其他click事件的监听函数。也就是说，不是彻底取消click事件。
p.addEventListener('click', function (event) {
  event.stopPropagation();
  console.log(1);
});

p.addEventListener('click', function(event) {
  // 会触发
  console.log(2);
});

上面代码中，p元素绑定了两个click事件的监听函数。stopPropagation方法只能阻止这个事件的传播，不能取消这个事件，因此，第二个监听函数会触发。输出结果会先是1，然后是2。
如果想要彻底取消该事件，不再触发后面所有click的监听函数，可以使用stopImmediatePropagation方法。
p.addEventListener('click', function (event) {
  event.stopImmediatePropagation();
  console.log(1);
});

p.addEventListener('click', function(event) {
  // 不会被触发
  console.log(2);
});

上面代码中，stopImmediatePropagation方法可以彻底取消这个事件，使得后面绑定的所有click监听函数都不再触发。所以，只会输出1，不会输出2。
```
