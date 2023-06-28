# ES6

```js
变量声明
let 命令
基本用法
ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1

上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。
for循环中使用let
1. 只在循环体内有效，每次循环都会生成一个新的变量
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

console.log(i);
// ReferenceError: i is not defined

如果使用var，最后输出的是10，因为存在变量提升，全局只有一个变量i。每一次循环，变量i的值都会发生改变。
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

2. 每次循环产生的新的变量是在父作用域，而循环体内部是一个单独的子作用域。所以循环变量可以在循环体内再次声明
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc

const 命令
基本用法
const声明一个只读的常量。一旦声明，常量的值就不能改变。
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.


const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
const foo;
// SyntaxError: Missing initializer in const declaration

本质
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

如果真的想将对象冻结，应该使用Object.freeze方法。
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};

与ES5不同点
不存在变量提升
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;

上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。
暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。
ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}

上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。
“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
typeof x; // ReferenceError
let x;

上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。
作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。
typeof undeclared_variable // "undefined"

上面代码中，undeclared_variable是一个不存在的变量名，结果返回“undefined”。所以，在没有let之前，typeof运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。
有些“死区”比较隐蔽，不太容易发现。
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错

上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”。如果y的默认值是x，就不会报错，因为此时x已经声明了。
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]

另外，下面的代码也会报错，与var的行为不同。
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined

上面代码报错，也是因为暂时性死区。使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。
ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。
总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
不允许重复声明
let不允许在相同作用域内，重复声明同一个变量。
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

因此，不能在函数内部重新声明参数。
function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错

不挂载到window
顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。
window.a = 1;
a // 1

a = 2;
window.a // 2

这样的设计带来了几个很大的问题
1. 没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；
2. 程序员很容易不知不觉地就创建了全局变量（比如打字出错）；
3. 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
4. 另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。
ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined

上面代码中，全局变量a由var命令声明，所以它是顶层对象的属性；全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。
块级作用域
为什么需要块级作用域？
ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。
1. 外层变量覆盖。
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined

2. 循环变量泄露。
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5

ES6 的块级作用域
1. 允许块级作用域的任意嵌套。
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};

2. 内层作用域可以定义外层作用域的同名变量。
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};

3. 取代IIFE
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}

块级作用域与函数声明
函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。
ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
  // ...
}

上面两种函数声明，根据 ES5 的规定都是非法的。
但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。
ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());

上面代码在 ES5 中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。
// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());

ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于let，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function

上面的代码在 ES6 浏览器中，都会报错。
原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
- 允许在块级作用域内声明函数。
- 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。
注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。
根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。上面的例子实际运行的代码如下。
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}

另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}

上面代码中，第一种写法没有大括号，所以不存在块级作用域，而let只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。
函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}

globalThis 对象
JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。
各环境中的顶层对象
- 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
- 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
- Node 里面，顶层对象是global，但其他环境都不支持。
this指向
- 全局环境中，this会返回顶层对象。但是，Node.js 模块中this返回的是当前模块，ES6 模块中this返回的是undefined。
- 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用。
获取环境全局对象
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

ES2020 在语言标准的层面，引入globalThis作为顶层对象。任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。
垫片库global-thisglobal-this模拟了这个提案，可以在所有环境拿到globalThis。
数值
二进制和八进制表示法
ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
0b111110111 === 503 // true
0o767 === 503 // true

从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6 进一步明确，要使用前缀0o表示。
// 非严格模式
(function(){
  console.log(0o11 === 011);
})() // true

// 严格模式
(function(){
  'use strict';
  console.log(0o11 === 011);
})() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.

如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法，Number方法返回十进制
Number('0b111')  // 7
Number('0o10')  // 8

构造函数方法
Number.isFinite()
Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

与传统的isNaN（）不同，如果参数类型不是数值，Number.isFinite一律返回false。
Number.isNaN()
Number.isNaN()用来检查一个值是否为NaN。
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true

与传统的isFinite（）不同，如果参数类型不是NaN，Number.isNaN一律返回false。
Number.parseInt(), Number.parseFloat()
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

Number.isInteger()
Number.isInteger()用来判断一个数值是否为整数。
Number.isInteger(25) // true
Number.isInteger(25.1) // false

JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
Number.isInteger(25) // true
Number.isInteger(25.0) // true

如果参数不是数值，Number.isInteger返回false。
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false

注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。
Number.isInteger(3.0000000000000002) // true

上面代码中，Number.isInteger的参数明明不是整数，但是会返回true。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。
类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true

上面代码中，5E-325由于值太小，会被自动转为0，因此返回true。
总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。
Number.EPSILON
ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"

Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。
0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 - 0.3
// 5.551115123125783e-17

5.551115123125783e-17.toFixed(20)
// '0.00000000000000005551'

上面代码解释了，为什么比较0.1 + 0.2与0.3得到的结果是false。
0.1 + 0.2 === 0.3 // false

Number.EPSILON可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即Number.EPSILON * Math.pow(2, 2)），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。
5.551115123125783e-17 < Number.EPSILON * Math.pow(2, 2)
// true

因此，Number.EPSILON的实质是一个可以接受的最小误差范围。
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true

上面的代码为浮点数运算，部署了一个误差检查函数。
安全整数和 Number.isSafeInteger()
JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1
// true

上面代码中，超出 2 的 53 次方之后，一个数就不精确了。
ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

上面代码中，可以看到 JavaScript 能够精确表示的极限。
Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。
Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}

实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。
Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003

上面代码中，9007199254740993不是一个安全整数，但是Number.isSafeInteger会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存。
9007199254740993 === 9007199254740992
// true

所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3

Math 对象的扩展
ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。
Math.trunc()
Math.trunc方法用于去除一个数的小数部分，返回整数部分。
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

对于非数值，Math.trunc内部使用Number方法将其先转为数值。
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0

对于空值和无法截取整数的值，返回NaN。
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

Math.sign()
Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
它会返回五种值。
- 参数为正数，返回+1；
- 参数为负数，返回-1；
- 参数为 0，返回0；
- 参数为-0，返回-0;
- 其他值，返回NaN。
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN。
Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN

对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};

Math.cbrt()
Math.cbrt()方法用于计算一个数的立方根。
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948732

对于非数值，Math.cbrt()方法内部也是先使用Number()方法将其转为数值。
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN

对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};

Math.clz32()
Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2

上面代码中，0 的二进制形式全为 0，所以有 32 个前导 0；1 的二进制形式是0b1，只占 1 位，所以 32 位之中有 31 个前导 0；1000 的二进制形式是0b1111101000，一共有 10 位，所以 32 位之中有 22 个前导 0。
clz32这个函数名就来自”count leading zero bits in 32-bit binary representation of a number“（计算一个数的 32 位二进制形式的前导 0 的个数）的缩写。
左移运算符（<<）与Math.clz32方法直接相关。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2

对于小数，Math.clz32方法只考虑整数部分。
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30

对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算。
Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31

Math.imul()
Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4

如果只考虑最后 32 位，大多数情况下，Math.imul(a, b)与a * b的结果是相同的，即该方法等同于(a * b)|0的效果（超过 32 位的部分溢出）。之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。
(0x7fffffff * 0x7fffffff)|0 // 0

上面这个乘法算式，返回结果为 0。但是由于这两个二进制数的最低位都是 1，所以这个结果肯定是不正确的，因为根据二进制乘法，计算结果的二进制最低位应该也是 1。这个错误就是因为它们的乘积超过了 2 的 53 次方，JavaScript 无法保存额外的精度，就把低位的值都变成了 0。Math.imul方法可以返回正确的值 1。
Math.imul(0x7fffffff, 0x7fffffff) // 1

Math.fround()
Math.fround方法返回一个数的32位单精度浮点数形式。
对于32位单精度格式来说，数值精度是24个二进制位（1 位隐藏位与 23 位有效位），所以对于 -224 至 224 之间的整数（不含两个端点），返回结果与参数本身一致。
Math.fround(0)   // 0
Math.fround(1)   // 1
Math.fround(2 ** 24 - 1)   // 16777215

如果参数的绝对值大于 224，返回的结果便开始丢失精度。
Math.fround(2 ** 24)       // 16777216
Math.fround(2 ** 24 + 1)   // 16777216

Math.fround方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数。如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变（即与64位双精度值一致）。
// 未丢失有效精度
Math.fround(1.125) // 1.125
Math.fround(7.25)  // 7.25

// 丢失精度
Math.fround(0.3)   // 0.30000001192092896
Math.fround(0.7)   // 0.699999988079071
Math.fround(1.0000000123) // 1

对于 NaN 和 Infinity，此方法返回原值。对于其它类型的非数值，Math.fround 方法会先将其转为数值，再返回单精度浮点数。
Math.fround(NaN)      // NaN
Math.fround(Infinity) // Infinity

Math.fround('5')      // 5
Math.fround(true)     // 1
Math.fround(null)     // 0
Math.fround([])       // 0
Math.fround({})       // NaN

对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.fround = Math.fround || function (x) {
  return new Float32Array([x])[0];
};

Math.hypot()
Math.hypot方法返回所有参数的平方和的平方根。
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3

上面代码中，3 的平方加上 4 的平方，等于 5 的平方。
如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。
对数方法
ES6 新增了 4 个对数相关方法。
（1） Math.expm1()
Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045

对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.expm1 = Math.expm1 || function(x) {
  return Math.exp(x) - 1;
};

（2）Math.log1p()
Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN

对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.log1p = Math.log1p || function(x) {
  return Math.log(1 + x);
};

（3）Math.log10()
Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5

对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};

（4）Math.log2()
Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29

对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};

双曲函数方法
ES6 新增了 6 个双曲函数方法。
- Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
- Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
- Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
- Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
- Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
- Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
指数运算符
ES2016 新增了一个指数运算符（**）。
2 ** 2 // 4
2 ** 3 // 8

这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512

上面代码中，首先计算的是第二个指数运算符，而不是第一个。
指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;

BigInt 数据类型
简介
JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。
一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的。
二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity

ES2020 引入了一种新的数据类型 BigInt（大整数）。
BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n
const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000

bigint类型整数具有一下特点
1. BigInt 同样可以使用各种进制表示，都要加上后缀n。
0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制

2. BigInt 与普通整数是两种值，它们之间并不相等。
42n === 42 // false

3. typeof运算符对于 BigInt 类型的数据返回bigint。
typeof 123n // 'bigint'

4. BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。
-42n // 正确
+42n // 报错

5. 支持计算70的阶乘（即70!）大整数了
let p = 1n;
for (let i = 1n; i <= 70n; i++) {
  p *= i;
}
console.log(p); // 11978571...00000000n

BigInt 对象
JavaScript 原生提供BigInt对象，可以用作构造函数生成 BigInt 类型的数值。
- 转换规则基本与Number()一致，将其他类型的值转为 BigInt。
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n

- BigInt()构造函数必须有参数，而且参数必须可以正常转为 Number 类型，下面的用法都会报错。
new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError

- 参数如果是小数，也会报错。
BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError

BigInt 对象继承了 Object 对象的两个实例方法。
- BigInt.prototype.toString()
- BigInt.prototype.valueOf()
它还继承了 Number 对象的一个实例方法。
- BigInt.prototype.toLocaleString()
此外，还提供了三个静态方法。
- BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2width - 1 之间对应的值。
- BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2width - 1 到 2width - 1 - 1 之间对应的值。
- BigInt.parseInt(string[, radix])：近似于Number.parseInt()，将一个字符串转换成指定进制的 BigInt。
const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(64, max)
// 9223372036854775807n
BigInt.asIntN(64, max + 1n)
// -9223372036854775808n
BigInt.asUintN(64, max + 1n)
// 9223372036854775808n

上面代码中，max是64位带符号的 BigInt 所能表示的最大值。如果对这个值加1n，BigInt.asIntN()将会返回一个负值，因为这时新增的一位将被解释为符号位。而BigInt.asUintN()方法由于不存在符号位，所以可以正确返回结果。
如果BigInt.asIntN()和BigInt.asUintN()指定的位数，小于数值本身的位数，那么头部的位将被舍弃。
const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(32, max) // -1n
BigInt.asUintN(32, max) // 4294967295n

上面代码中，max是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。
下面是BigInt.parseInt()的例子。
// Number.parseInt() 与 BigInt.parseInt() 的对比
Number.parseInt('9007199254740993', 10)
// 9007199254740992
BigInt.parseInt('9007199254740993', 10)
// 9007199254740993n

上面代码中，由于有效数字超出了最大限度，Number.parseInt方法返回的结果是不精确的，而BigInt.parseInt方法正确返回了对应的 BigInt。
对于二进制数组，BigInt 新增了两个类型BigUint64Array和BigInt64Array，这两种数据类型返回的都是64位 BigInt。DataView对象的实例方法DataView.prototype.getBigInt64()和DataView.prototype.getBigUint64()，返回的也是 BigInt。
转换规则
可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。
Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"

上面代码中，注意最后一个例子，转为字符串时后缀n会消失。
另外，取反运算符（!）也可以将 BigInt 转为布尔值。
!0n // true
!1n // false

数学运算
数学运算方面，BigInt 类型的+、-、*和**这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数。
9n / 5n
// 1n

几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。
- 不带符号的右移位运算符>>>
- 一元的求正运算符+
上面两个运算符用在 BigInt 会报错。前者是因为>>>运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符>>。后者是因为一元运算符+在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定+1n会报错。
BigInt 不能与普通数值进行混合运算。
1n + 1.3 // 报错

上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。比如(2n**53n + 1n) + 0.5这个表达式，如果返回 BigInt 类型，0.5这个小数部分会丢失；如果返回 Number 类型，有效精度只能保持 53 位，导致精度下降。
同样的原因，如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错。
// 错误的写法
Math.sqrt(4n) // 报错

// 正确的写法
Math.sqrt(Number(4n)) // 2

上面代码中，Math.sqrt的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用Number方法转一下类型，才能进行计算。
asm.js 里面，|0跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与|0进行运算会报错。
1n | 0 // 报错

其他运算
BigInt 对应的布尔值，与 Number 类型一致，即0n会转为false，其他值转为true。
if (0n) {
  console.log('if');
} else {
  console.log('else');
}
// else

上面代码中，0n对应false，所以会进入else子句。
比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。
0n < 1 // true
0n < true // true
0n == 0 // true
0n == false // true
0n === 0 // false

BigInt 与字符串混合运算时，会先转为字符串，再进行运算。
'' + 123n // "123"

string
模板字符串
模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
let greeting = `\`Yo\` World!`;

如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);

上面代码中，所有模板字符串的空格和换行，都是被保留的，比如<ul>标签前面会有一个换行。如果你不想要这个换行，可以使用trim方法消除它。
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());

模板字符串中嵌入变量，需要将变量名写在${}之中。
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      `User ${user.name} is not authorized to do ${action}.`);
  }
}

大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"

模板字符串之中还能调用函数。
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar

如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
如果模板字符串中的变量没有声明，将报错。
// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错

由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。
`Hello ${'World'}`
// "Hello World"

模板字符串甚至还能嵌套。
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>

如果需要引用模板字符串本身，在需要时执行，可以写成函数。
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"

应用：模板编译
下面，我们来看一个通过模板字符串，生成正式模板的实例。
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

上面代码在模板字符串之中，放置了一个常规模板。该模板使用<%...%>放置 JavaScript 代码，使用<%= ... %>输出 JavaScript 表达式。
怎么编译这个模板字符串呢？
一种思路是将其转换为 JavaScript 表达式字符串。
echo('<ul>');
for(let i=0; i < data.supplies.length; i++) {
  echo('<li>');
  echo(data.supplies[i]);
  echo('</li>');
};
echo('</ul>');

这个转换使用正则表达式就行了。
let evalExpr = /<%=(.+?)%>/g;
let expr = /<%([\s\S]+?)%>/g;

template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');

template = 'echo(`' + template + '`);';

然后，将template封装在一个函数里面返回，就可以了。
let script =
`(function parse(data){
  let output = "";

  function echo(html){
    output += html;
  }

  ${ template }

  return output;
})`;

return script;

将上面的内容拼装成一个模板编译函数compile。
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

compile函数的用法如下。
let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>

标签模板
模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。
alert`hello`
// 等同于
alert(['hello'])

标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

上面代码中，模板字符串前面有一个标识名tag，它是一个函数。整个表达式的返回值，就是tag函数处理模板字符串后的返回值。
函数tag依次会接收到多个参数。
function tag(stringArr, value1, value2){
  // ...
}

// 等同于

function tag(stringArr, ...values){
  // ...
}

tag函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。
tag函数的其他参数，都是模板字符串各个变量被替换后的值。由于本例中，模板字符串含有两个变量，因此tag会接受到value1和value2两个参数。
tag函数所有参数的实际值如下。
- 第一个参数：['Hello ', ' world ', '']
- 第二个参数: 15
- 第三个参数：50
也就是说，tag函数实际上以下面的形式调用。
tag(['Hello ', ' world ', ''], 15, 50)

我们可以按照需要编写tag函数的代码。下面是tag函数的一种写法，以及运行结果。
let a = 5;
let b = 10;

function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return "OK";
}

tag`Hello ${ a + b } world ${ a * b}`;
// "Hello "
// " world "
// ""
// 15
// 50
// "OK"

下面是一个更复杂的例子。
let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  let result = '';
  let i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }

  return result;
}

msg // "The total is 30 (31.5 with tax)"

passthru函数采用 rest 参数的写法如下。
function passthru(literals, ...values) {
  let output = "";
  let index;
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }

  output += literals[index]
  return output;
}

“标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

上面代码中，sender变量往往是用户提供的，经过SaferHTML函数处理，里面的特殊字符都会被转义。
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

message
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>

标签模板的另一个应用，就是多语言转换（国际化处理）。
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"

模板字符串本身并不能取代 Mustache 之类的模板库，因为没有条件判断和循环处理功能，但是通过标签函数，你可以自己添加这些功能。
// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
let libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;

除此之外，你甚至可以使用标签模板，在 JavaScript 语言之中嵌入其他语言。
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`

上面的代码通过jsx函数，将一个 DOM 字符串转为 React 对象。你可以在 GitHub 找到jsx函数的具体实现。
下面则是一个假想的例子，通过java函数，在 JavaScript 代码之中运行 Java 代码。
java`
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println("Hello World!"); // Display the string.
  }
}
`
HelloWorldApp.main();

模板处理函数的第一个参数（模板字符串数组），还有一个raw属性。
console.log`123`
// ["123", raw: Array[1]]

上面代码中，console.log接受的参数，实际上是一个数组。该数组有一个raw属性，保存的是转义后的原字符串。
请看下面的例子。
tag`First line\nSecond line`

function tag(strings) {
  console.log(strings.raw[0]);
  // strings.raw[0] 为 "First line\\nSecond line"
  // 打印输出 "First line\nSecond line"
}

上面代码中，tag函数的第一个参数strings，有一个raw属性，也指向一个数组。该数组的成员与strings数组完全一致。比如，strings数组是["First line\nSecond line"]，那么strings.raw数组就是["First line\\nSecond line"]。两者唯一的区别，就是字符串里面的斜杠都被转义了。比如，strings.raw 数组会将\n视为\\和n两个字符，而不是换行符。这是为了方便取得转义之前的原始模板而设计的。
模板字符串的限制
前面提到标签模板里面，可以内嵌其他语言。但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。
举例来说，标签模板里面可以嵌入 LaTEX 语言。
function latex(strings) {
  // ...
}

let document = latex`
\newcommand{\fun}{\textbf{Fun!}}  // 正常工作
\newcommand{\unicode}{\textbf{Unicode!}} // 报错
\newcommand{\xerxes}{\textbf{King!}} // 报错

Breve over the h goes \u{h}ere // 报错
`

上面代码中，变量document内嵌的模板字符串，对于 LaTEX 语言来说完全是合法的，但是 JavaScript 引擎会报错。原因就在于字符串的转义。
模板字符串会将\u00FF和\u{42}当作 Unicode 字符进行转义，所以\unicode解析时报错；而\x56会被当作十六进制字符串转义，所以\xerxes会报错。也就是说，\u和\x在 LaTEX 里面有特殊含义，但是 JavaScript 将它们转义了。
为了解决这个问题，ES2018 放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回undefined，而不是报错，并且从raw属性上面可以得到原始字符串。
function tag(strs) {
  strs[0] === undefined
  strs.raw[0] === "\\unicode and \\u{55}";
}
tag`\unicode and \u{55}`

上面代码中，模板字符串原本是应该报错的，但是由于放松了对字符串转义的限制，所以不报错了，JavaScript 引擎将第一个字符设置为undefined，但是raw属性依然可以得到原始字符串，因此tag函数还是可以对原字符串进行处理。
注意，这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。
let bad = `bad escape sequence: \unicode`; // 报错


字符串的新增方法
String.fromCodePoint()
ES5 提供String.fromCharCode()方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于0xFFFF的字符。
String.fromCharCode(0x20BB7)
// "ஷ"

上面代码中，String.fromCharCode()不能识别大于0xFFFF的码点，所以0x20BB7就发生了溢出，最高位2被舍弃了，最后返回码点U+0BB7对应的字符，而不是码点U+20BB7对应的字符。
ES6 提供了String.fromCodePoint()方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足。在作用上，正好与下面的codePointAt()方法相反。
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true

上面代码中，如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。
注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。
String.raw()
ES6 还为原生的 String 对象，提供了一个raw()方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

如果原字符串的斜杠已经转义，那么String.raw()会进行再次转义。
String.raw`Hi\\n`
// 返回 "Hi\\\\n"

String.raw`Hi\\n` === "Hi\\\\n" // true

String.raw()方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。
String.raw()本质上是一个正常的函数，只是专用于模板字符串的标签函数。如果写成正常函数的形式，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组，对应模板字符串解析后的值。
// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"

上面代码中，String.raw()方法的第一个参数是一个对象，它的raw属性等同于原始的模板字符串解析后得到的数组。
作为函数，String.raw()的代码实现基本如下。
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}

实例方法
codePointAt()
JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271

上面代码中，汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是0x20BB7，UTF-16 编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。对于这种4个字节的字符，JavaScript 不能正确处理，字符串长度会误判为2，而且charAt()方法无法读取整个字符，charCodeAt()方法只能分别返回前两个字节和后两个字节的值。
ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97

codePointAt()方法的参数，是字符在字符串中的位置（从 0 开始）。上面代码中，JavaScript 将“𠮷a”视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的20BB7）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，codePointAt()方法的结果与charCodeAt()方法相同。
总之，codePointAt()方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt()方法相同。
codePointAt()方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString()方法转换一下。
let s = '𠮷a';

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"

你可能注意到了，codePointAt()方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt()方法传入 2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。
let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61

另一种方法也可以，使用扩展运算符（...）进行展开运算。
let arr = [...'𠮷a']; // arr.length === 2
arr.forEach(
  ch => console.log(ch.codePointAt(0).toString(16))
);
// 20bb7
// 61

codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false

normalize()
许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode 提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。
这两种表示方法，在视觉和语义上都等价，但是 JavaScript 不能识别。
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2

上面代码表示，JavaScript 将合成字符视为两个字符，导致两种表示方法不相等。
ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true

normalize方法可以接受一个参数来指定normalize的方式，参数的四个可选值如下。
- NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
- NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
- NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文。）
- NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。
'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2

上面代码表示，NFC参数返回字符的合成形式，NFD参数返回字符的分解形式。
不过，normalize方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过 Unicode 编号区间判断。
验证：includes(), startsWith(), endsWith()
传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。
- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

这三个方法都支持第二个参数，表示开始搜索的位置。
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false

endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
复制：repeat()
repeat方法返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

- 如果是小数，会被取整。
'na'.repeat(2.9) // "nana"

- 如果repeat的参数是负数或者Infinity，会报错。
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError

但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。
'na'.repeat(-0.9) // ""

参数NaN等同于 0。
'na'.repeat(NaN) // ""

如果repeat的参数是字符串，则会先转换成数字。
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"

补全：padStart()，padEnd()
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

1. 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

2. 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
'abc'.padStart(10, '0123456789')
// '0123456abc'

3. 如果省略第二个参数，默认使用空格补全长度。
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

裁剪：trimStart()，trimEnd()
ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"

上面代码中，trimStart()只消除头部的空格，保留尾部的空格。trimEnd()也是类似行为。
除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。
浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。
匹配：matchAll()
matchAll()方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。
替换：replaceAll()
历史上，字符串的实例方法replace()只能替换第一个匹配。
'aabbcc'.replace('b', '_')
// 'aa_bcc'

上面例子中，replace()只将第一个b替换成了下划线。
如果要替换所有的匹配，不得不使用正则表达式的g修饰符。
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'

正则表达式毕竟不是那么方便和直观，ES2021 引入了replaceAll()方法，可以一次性替换所有匹配。
'aabbcc'.replaceAll('b', '_')
// 'aa__cc'

它的用法与replace()相同，返回一个新字符串，不会改变原字符串。
String.prototype.replaceAll(searchValue, replacement)

上面代码中，searchValue是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有g修饰符）。
如果searchValue是一个不带有g修饰符的正则表达式，replaceAll()会报错。这一点跟replace()不同。
// 不报错
'aabbcc'.replace(/b/, '_')

// 报错
'aabbcc'.replaceAll(/b/, '_')

上面例子中，/b/不带有g修饰符，会导致replaceAll()报错。
replaceAll()的第二个参数replacement是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。
- $&：匹配的子字符串。
- $`：匹配结果前面的文本。
- $'：匹配结果后面的文本。
- $n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
- $$：指代美元符号$。
下面是一些例子。
// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'

replaceAll()的第二个参数replacement除了为字符串，也可以是一个函数，该函数的返回值将替换掉第一个参数searchValue匹配的文本。
'aabbcc'.replaceAll('b', () => '_')
// 'aa__cc'

上面例子中，replaceAll()的第二个参数是一个函数，该函数的返回值会替换掉所有b的匹配。
这个替换函数可以接受多个参数。第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}

str.replaceAll(regex, replacer)
// 123 - abc - 456

上面例子中，正则表达式有三个组匹配，所以replacer()函数的第一个参数match是捕捉到的匹配内容（即字符串123abc456），后面三个参数p1、p2、p3则依次为三个组匹配。

数组
扩展运算符
含义
扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]

该运算符主要用于函数调用。
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42

上面代码中，array.push(...items)和add(...numbers)这两行，都是函数的调用，它们都使用了扩展运算符。该运算符将一个数组，变为参数序列。
扩展运算符与正常的函数参数可以结合使用，非常灵活。
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);

扩展运算符后面还可以放置表达式。
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];

如果扩展运算符后面是一个空数组，则不产生任何效果。
[...[], 1]
// [1]

注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
(...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2

上面三种情况，扩展运算符都放在圆括号里面，但是前两种情况会报错，因为扩展运算符所在的括号不是函数调用。
替代函数的 apply 方法
由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);

下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);

上面代码中，由于 JavaScript 不提供求数组最大元素的函数，所以只能套用Math.max函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用Math.max了。
另一个例子是通过push函数，将一个数组添加到另一个数组的尾部。
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);

上面代码的 ES5 写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。
下面是另外一个例子。
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);

扩展运算符的应用
（1）复制数组
数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
a1 // [2, 2]

上面代码中，a2并不是a1的克隆，而是指向同一份数据的另一个指针。修改a2，会直接导致a1的变化。
ES5 只能用变通方法来复制数组。
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

上面代码中，a1会返回原数组的克隆，再修改a2就不会对a1产生影响。
扩展运算符提供了复制数组的简便写法。
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;

上面的两种写法，a2都是a1的克隆。
（2）合并数组
扩展运算符提供了数组合并的新写法。
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

不过，这两种方法都是浅拷贝，使用的时候需要注意。
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true

上面代码中，a3和a4是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。如果修改了引用指向的值，会同步反映到新数组。
（3）与解构赋值结合
扩展运算符可以与解构赋值结合起来，用于生成数组。
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

下面是另外一些例子。
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错

（4）字符串
扩展运算符还可以将字符串转为真正的数组。
[...'hello']
// [ "h", "e", "l", "l", "o" ]

上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3

上面代码的第一种写法，JavaScript 会将四个字节的 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写。
function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y') // 3

凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'

上面代码中，如果不用扩展运算符，字符串的reverse操作就不正确。
（5）实现了 Iterator 接口的对象
任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];

上面代码中，querySelectorAll方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。
Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
}

console.log([...5]) // [0, 1, 2, 3, 4]

上面代码中，先定义了Number对象的遍历器接口，扩展运算符将5自动转成Number实例以后，就会调用这个接口，就会返回自定义的结果。
对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];

上面代码中，arrayLike是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。
（6）Map 和 Set 结构，Generator 函数
扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]

Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]

上面代码中，变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。
如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。
const obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object

新增方法
Array.from()
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
下面是一个类似数组的对象，Array.from将它转为真正的数组。
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

上面代码中，字符串和 Set 结构都具有 Iterator 接口，因此可以被Array.from转为真正的数组。
如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
Array.from([1, 2, 3])
// [1, 2, 3]

值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
// arguments对象
function foo() {
  const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]

扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]

上面代码中，Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。
对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

下面的例子是取出一组 DOM 节点的文本内容。
let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)

下面的例子将数组中布尔值为false的成员转为0。
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

另一个例子是返回各种数据的类型。
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']

如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。
Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']

上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。
Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
function countSymbols(string) {
  return Array.from(string).length;
}

Array.of()
Array.of()方法用于将一组值，转换为数组。
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

上面代码中，Array()方法没有参数、一个参数、三个参数时，返回的结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数只有一个正整数时，实际上是指定数组的长度。
Array.of()基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]

Array.of()总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
Array.of()方法可以用下面的代码模拟实现。
function ArrayOf(){
  return [].slice.call(arguments);
}

实例方法
copyWithin()
数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
Array.prototype.copyWithin(target, start = 0, end = this.length)

它接受三个参数。
- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
这三个参数都应该是数值，如果不是，会自动转为数值。
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

上面代码表示将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。
下面是更多例子。
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]

find() 和 findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
[1, 4, -5, 10].find((n) => n < 0)
// -5

上面代码找出数组中第一个小于 0 的成员。
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10

上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2

这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26

上面的代码中，find函数接收了第二个参数person对象，回调函数中的this对象指向person对象。
另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0

上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。
fill()
fill方法使用给定值，填充一个数组。
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

上面代码表示，fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。
注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]

entries()，keys() 和 values()
entries()，keys()和values()用于遍历数组，keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']

includes()
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true

没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。
if (arr.indexOf(el) !== -1) {
  // ...
}

indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
[NaN].indexOf(NaN)
// -1

includes使用的是不一样的判断算法，就没有这个问题。
[NaN].includes(NaN)
// true

下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false

另外，Map 和 Set 数据结构有一个has方法，需要注意与includes区分。
- Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
- Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。
 flat()，flatMap()
数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]

上面代码中，原数组的成员里面有一个数组，flat()方法将子数组的成员取出来，添加在原来的位置。
flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

上面代码中，flat()的参数为2，表示要“拉平”两层的嵌套数组。
如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

如果原数组有空位，flat()方法会跳过空位。
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]

flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]

flatMap()只能展开一层数组。
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]

上面代码中，遍历函数返回的是一个双层的数组，但是默认只能展开一层，因此flatMap()返回的还是一个嵌套数组。
flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])

flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。
数组的空位
数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
Array(3) // [, , ,]

注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false

上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。
ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
- forEach(), filter(), reduce(), every() 和some()都会跳过空位。
- map()会跳过空位，但会保留这个值
- join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"

ES6 则是明确将空位转为undefined。
Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]

扩展运算符（...）也会将空位转为undefined。
[...['a',,'b']]
// [ "a", undefined, "b" ]

copyWithin()会连空位一起拷贝。
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

fill()会将空位视为正常的数组位置。
new Array(3).fill('a') // ["a","a","a"]

for...of循环也会遍历空位。
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1

上面代码中，数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。
entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0

由于空位的处理规则非常不统一，所以建议避免出现空位。
Array.prototype.sort() 的排序稳定性
排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。
const arr = [
  'peach',
  'straw',
  'apple',
  'spork'
];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]

上面代码对数组arr按照首字母进行排序。排序结果中，straw在spork的前面，跟原始顺序一致，所以排序算法stableSorting是稳定排序。
const unstableSorting = (s1, s2) => {
  if (s1[0] <= s2[0]) return -1;
  return 1;
};

arr.sort(unstableSorting)
// ["apple", "peach", "spork", "straw"]

上面代码中，排序结果是spork在straw前面，跟原始顺序相反，所以排序算法unstableSorting是不稳定的。
常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的，堆排序、快速排序等是不稳定的。不稳定排序的主要缺点是，多重排序时可能会产生问题。假设有一个姓和名的列表，要求按照“姓氏为主要关键字，名字为次要关键字”进行排序。开发者可能会先按名字排序，再按姓氏进行排序。如果排序算法是稳定的，这样就可以达到“先姓氏，后名字”的排序效果。如果是不稳定的，就不行。
早先的 ECMAScript 没有规定，Array.prototype.sort()的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。这个规定已经做到了，现在 JavaScript 各个主要实现的默认排序算法都是稳定的。

对象
属性的简洁表示法
ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};

上面代码中，变量foo直接写在大括号里面。这时，属性名就是变量名, 属性值就是变量值。下面是另一个例子。
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}

除了属性简写，方法也可以简写。
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
};

下面是一个实际的例子。
let birth = '2000/01/01';

const Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};

这种写法用于函数的返回值，将会非常方便。
function getPoint() {
  const x = 1;
  const y = 10;
  return {x, y};
}

getPoint()
// {x:1, y:10}

CommonJS 模块输出一组变量，就非常合适使用简洁写法。
let ms = {};

function getItem (key) {
  return key in ms ? ms[key] : null;
}

function setItem (key, value) {
  ms[key] = value;
}

function clear () {
  ms = {};
}

module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};

属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
const cart = {
  _wheels: 4,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}

简洁写法在打印对象时也很有用。
let user = {
  name: 'test'
};

let foo = {
  bar: 'baz'
};

console.log(user, foo)
// {name: "test"} {bar: "baz"}
console.log({user, foo})
// {user: {name: "test"}, foo: {bar: "baz"}}

上面代码中，console.log直接输出user和foo两个对象时，就是两组键值对，可能会混淆。把它们放在大括号里面输出，就变成了对象的简洁表示法，每组键值对前面会打印对象名，这样就比较清晰了。
注意，简写的对象方法不能用作构造函数，会报错。
const obj = {
  f() {
    this.foo = 'bar';
  }
};

new obj.f() // 报错

上面代码中，f是一个简写的对象方法，所以obj.f不能当作构造函数使用。
属性名表达式
JavaScript 定义对象的属性，有两种方法。
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;

上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。
但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。
var obj = {
  foo: true,
  abc: 123
};

ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};

下面是另一个例子。
let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

表达式还可以用于定义方法名。
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi

注意，属性名表达式与简洁表示法，不能同时使用，会报错。
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};

注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}

上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。
方法的 name 属性
函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
const person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name   // "sayName"

上面代码中，方法的name属性返回函数名（即方法名）。
如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"

有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"

如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""

上面代码中，key1对应的 Symbol 值有描述，key2没有。
属性的可枚举性和遍历
可枚举性
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。
目前，有四个操作会忽略enumerable为false的属性。
- for...in循环：只遍历对象自身的和继承的可枚举的属性。
- Object.keys()：返回对象自身的所有可枚举的属性的键名。
- JSON.stringify()：只串行化对象自身的可枚举的属性。
- Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
这四个操作之中，前三个是 ES5 就有的，最后一个Object.assign()是 ES6 新增的。其中，只有for...in会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉for...in操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的toString方法，以及数组的length属性，就通过“可枚举性”，从而避免被for...in遍历到。
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false

所有 Class 的原型的方法都是不可枚举的。
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false

尽量不要用for...in循环，而用Object.keys()代替。
属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性。
1. for...in
循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
2. Object.keys(obj)
返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
3. Object.getOwnPropertyNames(obj)
返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
4. Object.getOwnPropertySymbols(obj)
返回一个数组，包含对象自身的所有 Symbol 属性的键名。
5. Reflect.ownKeys(obj)
返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
属性遍历的次序规则
- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]

super 关键字
我们知道，this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"

注意，super关键字表示原型对象时，只有对象方法的简写法可以让 JavaScript 引擎确认，用在其他地方都会报错。
本质上：super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}

const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"

解构赋值
对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

上面代码中，变量z是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们连同值一起拷贝过来。
- 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误

- 解构赋值必须是最后一个参数，否则会报错。
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误

- 解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2

- 不能复制继承自原型对象的属性。
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined

上面代码中，对象o3复制了o2，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。
解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}

扩展运算符
对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，浅拷贝到当前对象之中。
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}

如果扩展运算符后面是一个空对象，则没有任何效果。
{...{}, a: 1}
// { a: 1 }

如果扩展运算符后面不是对象，则会自动将其转为对象。
// 等同于 {...Object(1)}
{...1} // {}

上面代码中，扩展运算符后面是整数1，会自动转为数值的包装对象Number{1}。由于该对象没有自身属性，所以返回一个空对象。
下面的例子都是类似的道理。
// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}

但是，如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

对象的扩展运算符等同于使用Object.assign()方法。
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);

上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

上面代码中，写法一的__proto__属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。
扩展运算符可以用于合并两个对象。
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);

如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });

上面代码中，a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。
这用来修改现有对象部分的属性就很方便了。
let newVersion = {
  ...previousVersion,
  name: 'New Name' // Override the name property
};

上面代码中，newVersion对象自定义了name属性，其他属性全部复制自previousVersion对象。
如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。
let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);

与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};

扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。
let a = {
  get x() {
    throw new Error('not throw yet');
  }
}

let aWithXGetter = { ...a }; // 报错

上面例子中，取值函数get在扩展a对象时会自动执行，导致报错。
链判断运算符
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value

上面代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。
下面是判断对象方法是否存在，如果存在就立即执行的例子。
iterator.return?.()

上面代码中，iterator.return如果有定义，就会调用该方法，否则iterator.return直接返回undefined，不再执行?.后面的部分。
对于那些可能没有实现的方法，这个运算符尤其有用。
if (myForm.checkValidity?.() === false) {
  // 表单校验失败
  return;
}

上面代码中，老式浏览器的表单可能没有checkValidity这个方法，这时?.运算符就会返回undefined，判断语句就变成了undefined === false，所以就会跳过下面的代码。
链判断运算符有三种用法。
- obj?.prop // 对象属性
- obj?.[expr] // 同上
- func?.(...args) // 函数或对象方法的调用
下面是obj?.[expr]用法的一个例子。
let hex = "#C0FFEE".match(/#([A-Z]+)/i)?.[1];

上面例子中，字符串的match()方法，如果没有发现匹配会返回null，如果发现匹配会返回一个数组，?.运算符起到了判断作用。
下面是?.运算符常见形式，以及不使用该运算符时的等价形式。
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

上面代码中，特别注意后两种形式，如果a?.b()里面的a.b不是函数，不可调用，那么a?.b()是会报错的。a?.()也是如此，如果a不是null或undefined，但也不是函数，那么a?.()会报错。
使用这个运算符，有几个注意点。
（1）短路机制
?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行。
a?.[++x]
// 等同于
a == null ? undefined : a[++x]

上面代码中，如果a是undefined或null，那么x不会进行递增运算。也就是说，链判断运算符一旦为真，右侧的表达式就不再求值。
（2）delete 运算符
delete a?.b
// 等同于
a == null ? undefined : delete a.b

上面代码中，如果a是undefined或null，会直接返回undefined，而不会进行delete运算。
（3）括号的影响
如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响。
(a?.b).c
// 等价于
(a == null ? undefined : a.b).c

上面代码中，?.对圆括号外部没有影响，不管a对象是否存在，圆括号后面的.c总是会执行。
一般来说，使用?.运算符的场合，不应该使用圆括号。
（4）报错场合
以下写法是禁止的，会报错。
// 构造函数
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

// 链判断运算符的左侧是 super
super?.()
super?.foo

// 链运算符用于赋值运算符左侧
a?.b = c

（5）右侧不得为十进制数值
为了保证兼容以前的代码，允许foo?.3:0被解析成foo ? .3 : 0，因此规定如果?.后面紧跟一个十进制数字，那么?.不再被看成是一个完整的运算符，而会按照三元运算符进行处理，也就是说，那个小数点会归属于后面的十进制数字，形成一个小数。
Null 判断运算符
读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。
const headerText = response.settings.headerText || 'Hello, world!';
const animationDuration = response.settings.animationDuration || 300;
const showSplashScreen = response.settings.showSplashScreen || true;

上面的三行代码都通过||运算符指定默认值，但是这样写是错的。开发者的原意是，只要属性的值为null或undefined，默认值就会生效，但是属性的值如果为空字符串或false或0，默认值也会生效。
为了避免这种情况，ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;

上面代码中，默认值只有在左侧属性值为null或undefined时，才会生效。
这个运算符的一个目的，就是跟链判断运算符?.配合使用，为null或undefined的值设置默认值。
const animationDuration = response.settings?.animationDuration ?? 300;

上面代码中，如果response.settings是null或undefined，或者response.settings.animationDuration是null或undefined，就会返回默认值300。也就是说，这一行代码包括了两级属性的判断。
这个运算符很适合判断函数参数是否赋值。
function Component(props) {
  const enable = props.enabled ?? true;
  // …
}

上面代码判断props参数的enabled属性是否赋值，基本等同于下面的写法。
function Component(props) {
  const {
    enabled: enable = true,
  } = props;
  // …
}

??有一个运算优先级问题，它与&&和||的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。
// 报错
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || rhs

上面四个表达式都会报错，必须加入表明优先级的括号。
(lhs && middle) ?? rhs;
lhs && (middle ?? rhs);

(lhs ?? middle) && rhs;
lhs ?? (middle && rhs);

(lhs || middle) ?? rhs;
lhs || (middle ?? rhs);

(lhs ?? middle) || rhs;
lhs ?? (middle || rhs);


新增方法
Object.is()
==和===存在的问题
1. ==会自动转换数据类型
2. ===NaN不等于自身
3. ===+0等于-0
ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

ES5 可以通过下面的代码，部署Object.is。
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});

Object.assign()
Object.assign()方法用于对象的合并，将源对象（source）的所有可枚举的自身属性，浅拷贝到目标对象（target）,包括symbol类型。
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

- 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

- 如果只有一个参数，Object.assign()会直接返回该参数。
const obj = {a: 1};
Object.assign(obj) === obj // true

- 首个参数必须是或者转换后必须是一个对象，后面的参数都是源对象，如果转换后不是对象，会跳过拷贝。
Object.assign(undefined) // 报错
Object.assign(null) // 报错
typeof Object.assign(2) // "object"
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

- 属性名为 Symbol 值的属性，也会被Object.assign()拷贝。
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }

- 可以用来处理数组，但是会把数组视为对象。
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]

- 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }

Object.getOwnPropertyDescriptors()
ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象，包括不可枚举的自身属性。
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }

上面代码中，Object.getOwnPropertyDescriptors()方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。
该方法的实现非常容易。
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}

该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target1 = {};
Object.assign(target1, source);

Object.getOwnPropertyDescriptor(target1, 'foo')
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }

上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }

上面代码中，两个对象合并的逻辑可以写成一个函数。
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);

Object.getOwnPropertyDescriptors()方法的另一个用处，是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。
const clone = Object.create(Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj));

// 或者

const shallowClone = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);

上面代码会克隆对象obj。
另外，Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。
const obj = {
  __proto__: prot,
  foo: 123,
};

ES6 规定__proto__只有浏览器要部署，其他环境不用部署。如果去除__proto__，上面代码就要改成下面这样。
const obj = Object.create(prot);
obj.foo = 123;

// 或者

const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);

有了Object.getOwnPropertyDescriptors()，我们就有了另一种写法。
const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);

Object.getOwnPropertyDescriptors()也可以用来实现 Mixin（混入）模式。
let mix = (object) => ({
  with: (...mixins) => mixins.reduce(
    (c, mixin) => Object.create(
      c, Object.getOwnPropertyDescriptors(mixin)
    ), object)
});

// multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a, b);

d.c // "c"
d.b // "b"
d.a // "a"

上面代码返回一个新的对象d，代表了对象a和b被混入了对象c的操作。
出于完整性的考虑，Object.getOwnPropertyDescriptors()进入标准以后，以后还会新增Reflect.getOwnPropertyDescriptors()方法。
__proto__属性
__proto__属性（前后各两个下划线），用来读取或设置当前对象的原型对象（prototype）。目前，所有浏览器（包括 IE11）都部署了这个属性。
// es5 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es6 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };

该属性没有写入 ES6 的正文，而是写入了附录，原因是__proto__前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。
实现上，__proto__调用的是Object.prototype.__proto__，具体实现如下。
Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (!status) {
      throw new TypeError();
    }
  },
});

function isObject(value) {
  return Object(value) === value;
}

如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。
Object.getPrototypeOf({ __proto__: null })
// null

Object.setPrototypeOf()
Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);

该方法等同于下面的函数。
function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

下面是一个例子。
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40

上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。
如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true

由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Object.getPrototypeOf()
该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
Object.getPrototypeOf(obj);

下面是一个例子。
function Rectangle() {
  // ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false

如果参数不是对象，会被自动转为对象。
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true

如果参数是undefined或null，它们无法转为对象，所以会报错。
Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object

Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object

Object.keys()
ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]

ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}

Object.values()
Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]

返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。
const obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)
// ["b", "c", "a"]

上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
Object.values只返回对象自身的可遍历属性。
const obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []

上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。
const obj = Object.create({}, {p:
  {
    value: 42,
    enumerable: true
  }
});
Object.values(obj) // [42]

Object.values会过滤属性名为 Symbol 值的属性。
Object.values({ [Symbol()]: 123, foo: 'abc' });
// ['abc']

如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
Object.values('foo')
// ['f', 'o', 'o']

上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。
如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。
Object.values(42) // []
Object.values(true) // []

Object.entries()
Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]

除了返回值不一样，该方法的行为与Object.values基本一致。
如果原对象的属性名是一个 Symbol 值，该属性会被忽略。
Object.entries({ [Symbol()]: 123, foo: 'abc' });
// [ [ 'foo', 'abc' ] ]

上面代码中，原对象有两个属性，Object.entries只输出属性名非 Symbol 值的属性。将来可能会有Reflect.ownEntries()方法，返回对象自身的所有属性。
Object.entries的基本用途是遍历对象的属性。
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// "one": 1
// "two": 2

Object.entries方法的另一个用处是，将对象转为真正的Map结构。
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }

自己实现Object.entries方法，非常简单。
// Generator函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}

Object.fromEntries()
Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }

该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。
// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }

该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }



函数的扩展
函数参数的默认值
基本用法
ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

- 参数变量是默认声明的，所以不能用let或const再次声明。
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

- 使用参数默认值时，函数不能有同名参数。
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context

- 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101

与解构赋值默认值结合使用
参数默认值可以与解构赋值的默认值，结合起来使用。
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。如果函数foo调用时没提供参数，变量x和y就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

上面代码指定，如果没有提供参数，函数foo的参数默认为一个空对象。
下面是另一个解构赋值默认值的例子。
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {})
// "GET"

fetch('http://example.com')
// 报错

上面代码中，如果函数fetch的第二个参数是一个对象，就可以为它的三个属性设置默认值。这种写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了双重默认值。
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}

fetch('http://example.com')
// "GET"

上面代码中，函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。
作为练习，请问下面两种写法有什么差别？
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

参数默认值的位置
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]

上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。
如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null

上面代码中，x参数对应undefined，结果触发了默认值，y参数等于null，就没有触发默认值。
函数的 length 属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2

这是因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的 rest 参数也不会计入length属性。
(function(...args) {}).length // 0

如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1

作用域
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2

上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。
再看下面的例子。
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1

上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。
如果此时，全局变量x不存在，就会报错。
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined

下面这样写，也会报错。
var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined

上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。
如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子。
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer

上面代码中，函数bar的参数func的默认值是一个匿名函数，返回值为变量foo。函数参数形成的单独作用域里面，并没有定义变量foo，所以foo指向外层的全局变量foo，因此输出outer。
如果写成下面这样，就会报错。
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar() // ReferenceError: foo is not defined

上面代码中，匿名函数里面的foo指向函数外层，但是函数外层并没有声明变量foo，所以就报错了。
下面是一个更复杂的例子。
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

上面代码中，函数foo的参数形成一个单独作用域。这个作用域里面，首先声明了变量x，然后声明了变量y，y的默认值是一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。
如果将var x = 3的var去除，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2，而外层的全局变量x依然不受影响。
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1

应用
利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter

上面代码的foo函数，如果调用的时候没有参数，就会调用默认值throwIfMissing函数，从而抛出一个错误。
从上面代码还可以看到，参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（注意函数名throwIfMissing之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在运行时执行。如果参数已经赋值，默认值中的函数就不会运行。
另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。
function foo(optional = undefined) { ··· }

rest 参数
ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10

上面代码的add函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。
下面是一个 rest 参数代替arguments变量的例子。
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

上面代码的两种写法，比较后可以发现，rest 参数的写法更自然也更简洁。
arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组push方法的例子。
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)

注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// 报错
function f(a, ...b, c) {
  // ...
}

函数的length属性，不包括 rest 参数。
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1

严格模式
从 ES5 开始，函数内部可以设定为严格模式。
function doSomething(a, b) {
  'use strict';
  // code
}

ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};

这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。
// 报错
function doSomething(value = 070) {
  'use strict';
  return value;
}

上面代码中，参数value的默认值是八进制数070，但是严格模式下不能用前缀0表示八进制，所以应该报错。但是实际上，JavaScript 引擎会先成功执行value = 070，然后进入函数体内部，发现需要用严格模式执行，这时才会报错。
虽然可以先解析函数体代码，再执行参数代码，但是这样无疑就增加了复杂性。因此，标准索性禁止了这种用法，只要参数使用了默认值、解构赋值、或者扩展运算符，就不能显式指定严格模式。
两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。
'use strict';

function doSomething(a, b = a) {
  // code
}

第二种是把函数包在一个无参数的立即执行函数里面。
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());

name 属性
函数的name属性，返回该函数的函数名。
function foo() {}
foo.name // "foo"

需要注意的是，ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

上面代码中，变量f等于一个匿名函数，ES5 和 ES6 的name属性返回的值不一样。
如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"

Function构造函数返回的函数实例，name属性的值为anonymous。
(new Function).name // "anonymous"

bind返回的函数，name属性值会加上bound前缀。
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "

箭头函数
基本用法
ES6 允许使用“箭头”（=>）定义函数。
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
var sum = (num1, num2) => { return num1 + num2; }

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });

下面是一种特殊情况，虽然可以运行，但会得到错误的结果。
let foo = () => { a: 1 };
foo() // undefined

上面代码中，原始意图是返回一个对象{ a: 1 }，但是由于引擎认为大括号是代码块，所以执行了一行语句a: 1。这时，a可以被解释为语句的标签，因此实际执行的语句是1;，然后函数就结束了，没有返回值。
如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
let fn = () => void doesNotReturn();

箭头函数可以与变量解构结合使用。
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}

箭头函数使得表达更加简洁。
const isEven = n => n % 2 === 0;
const square = n => n * n;

上面代码只用了两行，就定义了两个简单的工具函数。如果不用箭头函数，可能就要占用多行，而且还不如现在这样写醒目。
箭头函数的一个用处是简化回调函数。
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);

另一个例子是
// 正常函数写法
var result = values.sort(function (a, b) {
  return a - b;
});

// 箭头函数写法
var result = values.sort((a, b) => a - b);

下面是 rest 参数与箭头函数结合的例子。
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]

使用注意点
箭头函数有几个使用注意点。
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42

上面代码中，setTimeout()的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以打印出来的是42。
箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0

上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。
箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM 事件的回调函数封装在一个对象里面。
var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};

上面代码的init方法中，使用了箭头函数，这导致这个箭头函数里面的this，总是指向handler对象。否则，回调函数运行时，this.doSomething这一行会报错，因为此时this指向document对象。
this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
所以，箭头函数转成 ES5 的代码如下。
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}

上面代码中，转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。
请问下面的代码之中有几个this？
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。
除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]

上面代码中，箭头函数内部的变量arguments，其实是函数foo的arguments变量。
另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']

上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。
长期以来，JavaScript 语言的this对象一直是一个令人头痛的问题，在对象方法中使用this，必须非常小心。箭头函数”绑定”this，很大程度上解决了这个困扰。
不适用场合
由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数。
第一个场合是定义对象的方法，且该方法内部包括this。
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}

上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。
再看一个例子。
globalThis.s = 21;

const obj = {
  s: 42,
  m: () => console.log(this.s)
};

obj.m() // 21

上面例子中，obj.m()使用箭头函数定义。JavaScript 引擎的处理方法是，先在全局空间生成这个箭头函数，然后赋值给obj.m，这导致箭头函数内部的this指向全局对象，所以obj.m()输出的是全局空间的21，而不是对象内部的42。上面的代码实际上等同于下面的代码。
globalThis.s = 21;
globalThis.m = () => console.log(this.s);

const obj = {
  s: 42,
  m: globalThis.m
};

obj.m() // 21

由于上面这个原因，对象的属性建议使用传统的写法定义，不要用箭头函数定义。
第二个场合是需要动态this的时候，也不应使用箭头函数。
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});

上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。
另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。
嵌套的箭头函数
箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]

上面这个函数，可以使用箭头函数改写。
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]

下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12

如果觉得上面的写法可读性比较差，也可以采用下面的写法。
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12

箭头函数还有一个功能，就是可以很方便地改写 λ 演算。
// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));

上面两种写法，几乎是一一对应的。由于 λ 演算对于计算机科学非常重要，这使得我们可以用 ES6 作为替代工具，探索计算机科学。
尾调用优化
什么是尾调用？
尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
function f(x){
  return g(x);
}

上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。
以下三种情况，都不属于尾调用。
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}

上面代码中，情况一是调用函数g之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。
function f(x){
  g(x);
  return undefined;
}

尾调用不一定出现在函数尾部，只要是最后一步操作即可。
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}

上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。
尾调用优化
尾调用之所以与其他调用不同，就在于它的特殊的调用位置。
我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。
尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);

上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧，只保留g(3)的调用帧。
这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。
注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}

上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。
注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。
尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120

上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。
如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120

还有一个比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。
非尾递归的 Fibonacci 数列实现如下。
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

尾递归优化过的 Fibonacci 数列实现如下。
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity

由此可见，“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6 亦是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署“尾调用优化”。这就是说，ES6 中只要使用尾递归，就不会发生栈溢出（或者层层递归造成的超时），相对节省内存。
递归函数的改写
尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？
两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120

上面代码通过一个正常形式的阶乘函数factorial，调用尾递归函数tailFactorial，看起来就正常多了。
函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120

上面代码通过柯里化，将尾递归函数tailFactorial变为只接受一个参数的factorial。
第二种方法就简单多了，就是采用 ES6 的函数默认值。
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120

上面代码中，参数total有默认值1，所以调用时不用提供这个值。
总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。
严格模式
ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
- func.arguments：返回调用时函数的参数。
- func.caller：返回调用当前函数的那个函数。
尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。
function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();

尾递归优化的实现
尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。
它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。
下面是一个正常的递归函数。
function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}

sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)

上面代码中，sum是一个递归函数，参数x是需要累加的值，参数y控制递归次数。一旦指定sum递归 100000 次，就会报错，提示超出调用栈的最大次数。
蹦床函数（trampoline）可以将递归执行转为循环执行。
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

上面就是蹦床函数的一个实现，它接受一个函数f作为参数。只要f执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。
然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}

上面代码中，sum函数的每次执行，都会返回自身的另一个版本。
现在，使用蹦床函数执行sum，就不会发生调用栈溢出。
trampoline(sum(1, 100000))
// 100001

蹦床函数并不是真正的尾递归优化，下面的实现才是。
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001

上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。
函数参数的尾逗号
ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。
此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。
function clownsEverywhere(
  param1,
  param2
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar'
);

上面代码中，如果在param2或bar后面加一个逗号，就会报错。
如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数clownsEverywhere添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。
Function.prototype.toString()
ES2019 对函数实例的toString()方法做出了修改。
toString()方法返回函数代码本身，以前会省略注释和空格。
function /* foo comment */ foo () {}

foo.toString()
// function foo() {}

上面代码中，函数foo的原始代码包含注释，函数名foo和圆括号之间有空格，但是toString()方法都把它们省略了。
修改后的toString()方法，明确要求返回一模一样的原始代码。
function /* foo comment */ foo () {}

foo.toString()
// "function /* foo comment */ foo () {}"

catch 命令的参数省略
JavaScript 语言的try...catch结构，以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象。
try {
  // ...
} catch (err) {
  // 处理错误
}

上面代码中，catch命令后面带有参数err。
很多时候，catch代码块可能用不到这个参数。但是，为了保证语法正确，还是必须写。ES2019 做出了改变，允许catch语句省略参数。
try {
  // ...
} catch {
  // ...
}


Set 和 Map 数据结构
Set
基本用法
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
Set本身是一个构造函数，用来生成 Set 数据结构。
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4

上面代码通过add()方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。
Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56

上面代码中，例一和例二都是Set函数接受数组作为参数，例三是接受类似数组的对象作为参数。
上面代码也展示了一种去除数组重复成员的方法。
// 去除数组的重复成员
[...new Set(array)]

上面的方法也可以用于，去除字符串里面的重复字符。
[...new Set('ababbc')].join('')
// "abc"

向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

上面代码向 Set 实例添加了两次NaN，但是只会加入一个。这表明，在 Set 内部，两个NaN是相等的。
另外，两个对象总是不相等的。
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2

上面代码表示，由于两个空对象不相等，所以它们被视为两个值。
实例属性
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。
实例操作方法
- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。
上面这些属性和方法的实例如下。
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。
// 对象的写法
const properties = {
  'width': 1,
  'height': 1
};

if (properties[someName]) {
  // do something
}

// Set的写法
const properties = new Set();

properties.add('width');
properties.add('height');

if (properties.has(someName)) {
  // do something
}

Array.from方法可以将 Set 结构转为数组。
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

这就提供了去除数组重复成员的另一种方法。
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]

实例遍历方法
- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员
需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
1. keys()，values()，entries()
keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

上面代码中，entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。
Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

这意味着，可以省略values方法，直接用for...of循环遍历 Set。
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue

2. forEach()
Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9

另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。
WeakSet
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
1. WeakSet 的成员只能是对象，而不能是其他类型的值。
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set

2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
对象的引用不计入垃圾回收机制 
这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
WeakSet 结构有以下三个方法。
- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
下面是一个例子。
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

WeakSet 没有size属性，没有办法遍历它的成员。
ws.size // undefined
ws.forEach // undefined

ws.forEach(function(item){ console.log('WeakSet has ' + item)})
// TypeError: undefined is not a function

上面代码试图获取size和forEach属性，结果都不能成功。
WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
下面是 WeakSet 的另一个例子。
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}

上面代码保证了Foo的实例方法，只能在Foo的实例上调用。这里使用 WeakSet 的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。
Map
含义和基本用法
ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

Map构造函数接受数组作为参数，实际上执行的是下面的算法。
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);

事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3

如果对同一个键多次赋值，后面的值将覆盖前面的值。
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1) // "bbb"

上面代码对键1连续赋值两次，后一次的值覆盖前一次的值。
如果读取一个未知的键，则返回undefined。
new Map().get('asfddfsasadf')
// undefined

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined

同理，同样的值的两个实例，在 Map 结构中被视为两个键。
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222

Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。
如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
let map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123

属性
size属性返回 Map 结构的成员总数。
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2

操作方法
Map.prototype.set(key, value)
set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined

set方法返回的是当前的Map对象，因此可以采用链式写法。
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

Map.prototype.get(key)
get方法读取key对应的键值，如果找不到key，返回undefined。
const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!

Map.prototype.has(key)
has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true

Map.prototype.delete(key)
delete方法删除某个键，返回true。如果删除失败，返回false。
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false

Map.prototype.clear()
clear方法清除所有成员，没有返回值。
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0

遍历方法
Map 结构原生提供三个遍历器生成函数和一个遍历方法。
- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员。
需要特别注意的是，Map 的遍历顺序就是插入顺序。
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
map[Symbol.iterator] === map.entries
// true

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}

此外，Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

forEach方法还可以接受第二个参数，用来绑定this。
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);

上面代码中，forEach方法的回调函数的this，就指向reporter。
WeakMap
含义
WeakMap结构与Map结构类似，也是用于生成键值对的集合。
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"

WeakMap与Map的区别有两点。
首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key

上面代码中，如果将数值1和Symbol值作为 WeakMap 的键名，都会报错。
其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];

上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;

上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。
WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"

上面代码中，先新建一个 Weakmap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。
也就是说，上面的 DOM 节点对象的引用计数是1，而不是2。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。
总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}

上面代码中，键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。
WeakMap 的语法
WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。
const wm = new WeakMap();

// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined

WeakMap 的示例
WeakMap 的例子很难演示，因为无法观察它里面的引用会自动消失。此时，其他引用都解除了，已经没有引用指向 WeakMap 的键名了，导致无法证实那个键名是不是存在。
贺师俊老师提示，如果引用所指向的值占用特别多的内存，就可以通过 Node 的process.memoryUsage方法看出来。根据这个思路，网友vtxf补充了下面的例子。
首先，打开 Node 命令行。
$ node --expose-gc

上面代码中，--expose-gc参数表示允许手动执行垃圾回收机制。
然后，执行下面的代码。
// 手动执行一次垃圾回收，保证获取的内存使用状态准确
> global.gc();
undefined

// 查看内存占用的初始状态，heapUsed 为 4M 左右
> process.memoryUsage();
{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }

> let wm = new WeakMap();
undefined

// 新建一个变量 key，指向一个 5*1024*1024 的数组
> let key = new Array(5 * 1024 * 1024);
undefined

// 设置 WeakMap 实例的键名，也指向 key 数组
// 这时，key 数组实际被引用了两次，
// 变量 key 引用一次，WeakMap 的键名引用了第二次
// 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
> wm.set(key, 1);
WeakMap {}

> global.gc();
undefined

// 这时内存占用 heapUsed 增加到 45M 了
> process.memoryUsage();
{ rss: 67538944,
  heapTotal: 7376896,
  heapUsed: 45782816,
  external: 8945 }

// 清除变量 key 对数组的引用，
// 但没有手动清除 WeakMap 实例的键名对数组的引用
> key = null;
null

// 再次执行垃圾回收
> global.gc();
undefined

// 内存占用 heapUsed 变回 4M 左右，
// 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
> process.memoryUsage();
{ rss: 20639744,
  heapTotal: 8425472,
  heapUsed: 3979792,
  external: 8956 }

上面代码中，只要外部的引用消失，WeakMap 内部的引用，就会自动被垃圾回收清除。由此可见，有了 WeakMap 的帮助，解决内存泄漏就会简单很多。
Chrome 浏览器的 Dev Tools 的 Memory 面板，有一个垃圾桶的按钮，可以强制垃圾回收（garbage collect）。这个按钮也能用来观察 WeakMap 里面的引用是否消失。
WeakMap 的用途
前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子。
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);

上面代码中，document.getElementById('logo')是一个 DOM 节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
WeakMap 的另一个用处是部署私有属性。
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE

上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

Symbol
概述
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值，Symbol 值通过Symbol函数生成，可以作为对象的属性。
let s = Symbol();

typeof s
// "symbol"

typeof运算符的结果，表明变量s是 Symbol 数据类型，而不是字符串之类的其他类型。
Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串。
let s1 = Symbol('foo');
s1 // Symbol(foo)
s1.toString() // "Symbol(foo)"

const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)

- 相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false

- Symbol 值不能与其他类型的值进行运算，会报错。
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string

- Symbol 值可以显式转为字符串和布尔值。
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

let sym = Symbol();
Boolean(sym) // true
!sym  // false

description属性
ES2019 提供了一个实例属性description，直接返回 Symbol 的描述。
const sym = Symbol('foo');

sym.description // "foo"

作为属性名的 Symbol
由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

属性名的遍历
Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]

上面代码是Object.getOwnPropertySymbols()方法的示例，可以获取所有 Symbol 属性名。
下面是另一个例子，Object.getOwnPropertySymbols()方法与for...in循环、Object.getOwnPropertyNames方法进行对比的例子。
const obj = {};
const foo = Symbol('foo');

obj[foo] = 'bar';

for (let i in obj) {
  console.log(i); // 无输出
}

Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [Symbol(foo)]

上面代码中，使用for...in循环和Object.getOwnPropertyNames()方法都得不到 Symbol 键名，需要使用Object.getOwnPropertySymbols()方法。
另一个新的 API，Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]

由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]

上面代码中，对象x的size属性是一个 Symbol 值，所以Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种非私有的内部方法的效果。
Symbol.for()，Symbol.keyFor()
有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true

上面代码中，s1和s2都是 Symbol 值，但是它们都是由同样参数的Symbol.for方法生成的，所以实际上是同一个值。
Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false

上面代码中，由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。
Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined。
注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
function foo() {
  return Symbol.for('bar');
}

const x = foo();
const y = Symbol.for('bar');
console.log(x === y); // true

上面代码中，Symbol.for('bar')是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值。
Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
// true

上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到。
实例：模块的 Singleton 模式
Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。
对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？
很容易想到，可以把实例放到顶层对象global。
// mod.js
function A() {
  this.foo = 'hello';
}

if (!global._foo) {
  global._foo = new A();
}

module.exports = global._foo;

然后，加载上面的mod.js。
const a = require('./mod.js');
console.log(a.foo);

上面代码中，变量a任何时候加载的都是A的同一个实例。
但是，这里有一个问题，全局变量global._foo是可写的，任何文件都可以修改。
global._foo = { foo: 'world' };

const a = require('./mod.js');
console.log(a.foo);

上面的代码，会使得加载mod.js的脚本都失真。
为了防止这种情况出现，我们就可以使用 Symbol。
// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];

上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。
global[Symbol.for('foo')] = { foo: 'world' };

const a = require('./mod.js');

如果键名使用Symbol方法生成，那么外部将无法引用这个值，当然也就无法改写。
// mod.js
const FOO_KEY = Symbol('foo');

// 后面代码相同 ……

上面代码将导致其他脚本都无法引用FOO_KEY。但这样也有一个问题，就是如果多次执行这个脚本，每次得到的FOO_KEY都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，但是用户可以手动清除缓存，所以也不是绝对可靠。
内置的 Symbol 值
除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。
Symbol.hasInstance
对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true

上面代码中，MyClass是一个类，new MyClass()会返回一个实例。该实例的Symbol.hasInstance方法，会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。
下面是另一个例子。
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

// 等同于
const Even = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false

Symbol.isConcatSpreadable
对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

上面代码说明，数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果。
类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']

Symbol.isConcatSpreadable属性也可以定义在类里面。
class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array {
  constructor(args) {
    super(args);
  }
  get [Symbol.isConcatSpreadable] () {
    return false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]

上面代码中，类A1是可展开的，类A2是不可展开的，所以使用concat时有不一样的结果。
注意，Symbol.isConcatSpreadable的位置差异，A1是定义在实例上，A2是定义在类本身，效果相同。
Symbol.species
对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true

上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它们也是MyArray的实例。
Symbol.species属性就是为了解决这个问题而提供的。现在，我们可以为MyArray设置Symbol.species属性。
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}

上面代码中，由于定义了Symbol.species属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义Symbol.species属性要采用get取值器。默认的Symbol.species属性等同于下面的写法。
static get [Symbol.species]() {
  return this;
}

现在，再来看前面的例子。
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}

const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true

上面代码中，a.map(x => x)生成的衍生对象，就不是MyArray的实例，而直接就是Array的实例。
再看一个例子。
class T1 extends Promise {
}

class T2 extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
}

new T1(r => r()).then(v => v) instanceof T1 // true
new T2(r => r()).then(v => v) instanceof T2 // false

上面代码中，T2定义了Symbol.species属性，T1没有。结果就导致了创建衍生对象时（then方法），T1调用的是自身的构造方法，而T2调用的是Promise的构造方法。
总之，Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。
Symbol.match
对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1

Symbol.replace
对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)

下面是一个例子。
const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]

Symbol.replace方法会收到两个参数，第一个参数是replace方法正在作用的对象，上面例子是Hello，第二个参数是替换后的值，上面例子是World。
Symbol.search
对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0

Symbol.split
对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)

下面是一个例子。
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

'foobar'.split(new MySplitter('foo'))
// ['', 'bar']

'foobar'.split(new MySplitter('bar'))
// ['foo', '']

'foobar'.split(new MySplitter('baz'))
// 'foobar'

上面方法使用Symbol.split方法，重新定义了字符串对象的split方法的行为，
Symbol.iterator
对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]

对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器，详细介绍参见《Iterator 和 for...of 循环》一章。
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
}
// 1
// 2

Symbol.toPrimitive
对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。
- Number：该场合需要转成数值
- String：该场合需要转成字符串
- Default：该场合可以转成数值，也可以转成字符串
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'

Symbol.toStringTag
对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"

ES6 新增内置对象的Symbol.toStringTag属性值如下。
- JSON[Symbol.toStringTag]：'JSON'
- Math[Symbol.toStringTag]：'Math'
- Module 对象M[Symbol.toStringTag]：'Module'
- ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
- DataView.prototype[Symbol.toStringTag]：'DataView'
- Map.prototype[Symbol.toStringTag]：'Map'
- Promise.prototype[Symbol.toStringTag]：'Promise'
- Set.prototype[Symbol.toStringTag]：'Set'
- %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
- WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
- WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
- %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
- %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
- %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
- Symbol.prototype[Symbol.toStringTag]：'Symbol'
- Generator.prototype[Symbol.toStringTag]：'Generator'
- GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'
Symbol.unscopables
对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']

上面代码说明，数组有 7 个属性，会被with命令排除。
// 没有 unscopables 时
class MyClass {
  foo() { return 1; }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 1
}

// 有 unscopables 时
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 2
}

上面代码通过指定Symbol.unscopables属性，使得with语法块不会在当前作用域寻找foo属性，即foo将指向外层作用域的变量。

Proxy
基本使用
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
var proxy = new Proxy(target, handler);

target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
下面是另一个拦截读取属性行为的例子。
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35

注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。
如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

作为原型对象
Proxy 实例也可以作为其他对象的原型对象。
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35

上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。
同一个拦截器函数，可以设置拦截多个操作。
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true

对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。
Proxy 实例的方法
get()
get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误

上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。
get方法可以继承。
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"

利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63

如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed

set()
set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
    return true;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错

注意，如果目标对象自身的某个属性不可写，那么set方法将不起作用。
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false
});

const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
    return true;
  }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"

注意，set代理应当返回一个布尔值。严格模式下，set代理如果没有返回true，就会报错。
'use strict';
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
    // 无论有没有下面这一行，都会报错
    return false;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'

apply()
apply方法拦截函数的调用、call和apply操作。
apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
};

下面是一个例子。
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"

上面代码中，变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。
下面是另外一个例子。
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
另外，直接调用Reflect.apply方法，也会被拦截。
Reflect.apply(proxy, null, [9, 10]) // 38

has()
has()方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
has()方法可以接受两个参数，分别是目标对象、需查询的属性名。
下面的例子使用has()方法隐藏某些属性，不被in运算符发现。
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false

上面代码中，如果原对象的属性名的第一个字符是下划线，proxy.has()就会返回false，从而不会被in运算符发现。
如果原对象不可配置或者禁止扩展，这时has()拦截会报错。
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

'a' in p // TypeError is thrown

上面代码中，obj对象禁止扩展，结果使用has拦截就会报错。也就是说，如果某个属性不可配置（或者目标对象不可扩展），则has()方法就不得“隐藏”（即返回false）目标对象的该属性。
值得注意的是，has()方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has()方法不判断一个属性是对象自身的属性，还是继承的属性。
另外，虽然for...in循环也用到了in运算符，但是has()拦截对for...in循环不生效。
let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// true

for (let a in oproxy1) {
  console.log(oproxy1[a]);
}
// 张三
// 59

for (let b in oproxy2) {
  console.log(oproxy2[b]);
}
// 李四
// 99

上面代码中，has()拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被for...in循环所排除。
construct()
construct()方法用于拦截new命令，下面是拦截对象的写法。
const handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};

construct()方法可以接受三个参数。
- target：目标对象。
- args：构造函数的参数数组。
- newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）。
const p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// "called: 1"
// 10

construct()方法返回的必须是一个对象，否则会报错。
const p = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    return 1;
  }
});

new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')

另外，由于construct()拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。
const p = new Proxy({}, {
  construct: function(target, argumentsList) {
    return {};
  }
});

new p() // 报错
// Uncaught TypeError: p is not a constructor

上面例子中，拦截的目标对象不是一个函数，而是一个对象（new Proxy()的第一个参数），导致报错。
注意，construct()方法中的this指向的是handler，而不是实例对象。
const handler = {
  construct: function(target, args) {
    console.log(this === handler);
    return new target(...args);
  }
}

let p = new Proxy(function () {}, handler);
new p() // true

deleteProperty()
deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property

上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。
注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。
defineProperty()
defineProperty()方法拦截了Object.defineProperty()操作。
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效

上面代码中，defineProperty()方法内部没有任何操作，只返回false，导致添加新属性总是无效。注意，这里的false只是用来提示操作失败，本身并不能阻止添加新属性。
注意，如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。
getOwnPropertyDescriptor()
getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }

上面代码中，handler.getOwnPropertyDescriptor()方法对于第一个字符为下划线的属性名会返回undefined。
getPrototypeOf()
getPrototypeOf()方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
- Object.prototype.__proto__
- Object.prototype.isPrototypeOf()
- Object.getPrototypeOf()
- Reflect.getPrototypeOf()
- instanceof
下面是一个例子。
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true

上面代码中，getPrototypeOf()方法拦截Object.getPrototypeOf()，返回proto对象。
注意，getPrototypeOf()方法的返回值必须是对象或者null，否则报错。另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回目标对象的原型对象。
isExtensible()
isExtensible()方法拦截Object.isExtensible()操作。
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true

上面代码设置了isExtensible()方法，在调用Object.isExtensible时会输出called。
注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。
这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
Object.isExtensible(proxy) === Object.isExtensible(target)

下面是一个例子。
var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')

ownKeys()
ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
- Object.getOwnPropertyNames()
- Object.getOwnPropertySymbols()
- Object.keys()
- for...in循环
下面是拦截Object.keys()的例子。
let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]

上面代码拦截了对于target对象的Object.keys()操作，只返回a、b、c三个属性之中的a属性。
下面的例子是拦截第一个字符为下划线的属性名。
let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"

注意，使用Object.keys()方法时，有三类属性会被ownKeys()方法自动过滤，不会返回。
- 目标对象上不存在的属性
- 属性名为 Symbol 值
- 不可遍历（enumerable）的属性
let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// ['a']

上面代码中，ownKeys()方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、不可遍历的属性（key），结果都被自动过滤掉。
ownKeys()方法还可以拦截Object.getOwnPropertyNames()。
var p = new Proxy({}, {
  ownKeys: function(target) {
    return ['a', 'b', 'c'];
  }
});

Object.getOwnPropertyNames(p)
// [ 'a', 'b', 'c' ]

for...in循环也受到ownKeys()方法的拦截。
const obj = { hello: 'world' };
const proxy = new Proxy(obj, {
  ownKeys: function () {
    return ['a', 'b'];
  }
});

for (let key in proxy) {
  console.log(key); // 没有任何输出
}

上面代码中，ownkeys()指定只返回a和b属性，由于obj没有这两个属性，因此for...in循环不会有任何输出。
ownKeys()方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
var obj = {};

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return [123, true, undefined, null, {}, []];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 123 is not a valid property name

上面代码中，ownKeys()方法虽然返回一个数组，但是每一个数组成员都不是字符串或 Symbol 值，因此就报错了。
如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys()方法返回，否则报错。
var obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10 }
);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'

上面代码中，obj对象的a属性是不可配置的，这时ownKeys()方法返回的数组之中，必须包含a，否则会报错。
另外，如果目标对象是不可扩展的（non-extensible），这时ownKeys()方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。
var obj = {
  a: 1
};

Object.preventExtensions(obj);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible

上面代码中，obj对象是不可扩展的，这时ownKeys()方法返回的数组之中，包含了obj对象的多余属性b，所以导致了报错。
preventExtensions()
preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible

上面代码中，proxy.preventExtensions()方法返回true，但这时Object.isExtensible(proxy)会返回true，因此报错。
为了防止出现这个问题，通常要在proxy.preventExtensions()方法里面，调用一次Object.preventExtensions()。
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// "called"
// Proxy {}

setPrototypeOf()
setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。
下面是一个例子。
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden

上面代码中，只要修改target的原型对象，就会报错。
注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。
Proxy.revocable()
Proxy.revocable()方法返回一个可取消的 Proxy 实例。
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked

Proxy.revocable()方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。
Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
this 问题
虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true

上面代码中，一旦proxy代理target，target.m()内部的this就是指向proxy，而不是target。
下面是一个例子，由于this指向的变化，导致 Proxy 无法代理目标对象。
const _name = new WeakMap();

class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}

const jane = new Person('Jane');
jane.name // 'Jane'

const proxy = new Proxy(jane, {});
proxy.name // undefined

上面代码中，目标对象jane的name属性，实际保存在外部WeakMap对象_name上面，通过this键区分。由于通过proxy.name访问时，this指向proxy，导致无法取到值，所以返回undefined。
此外，有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.

上面代码中，getDate()方法只能在Date对象实例上面拿到，如果this不是Date对象实例就会报错。这时，this绑定原始对象，就可以解决这个问题。
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1

另外，Proxy 拦截函数内部的this，指向的是handler对象。
const handler = {
  get: function (target, key, receiver) {
    console.log(this === handler);
    return 'Hello, ' + key;
  },
  set: function (target, key, value) {
    console.log(this === handler);
    target[key] = value;
    return true;
  }
};

const proxy = new Proxy({}, handler);

proxy.foo
// true
// Hello, foo

proxy.foo = 1
// true

上面例子中，get()和set()拦截函数内部的this，指向的都是handler对象。
实例：Web 服务的客户端
Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。
const service = createWebService('http://example.com/data');

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});

上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl + '/' + propKey);
    }
  });
}

同理，Proxy 也可以用来实现数据库的 ORM 层。
Reflect
概述
Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。
1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。
2. 修改某些Object方法的返回结果，让其变得更合理。
比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}

3. 让Object操作都变成函数行为。
某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true

4. Reflect对象的方法与Proxy对象的方法一一对应，只要是 Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});

上面代码中，Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。
下面是另一个例子。
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});

上面代码中，每一个Proxy对象的拦截操作（get、delete、has），内部都调用对应的Reflect方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。
有了Reflect对象以后，很多操作会更易读。
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1

静态方法
Reflect对象一共有 13 个静态方法。
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)
上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。下面是对它们的解释。
Reflect.get(target, name, receiver)
Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3

如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8

如果第一个参数不是对象，Reflect.get方法会报错。
Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错

Reflect.set(target, name, value, receiver)
Reflect.set方法设置target对象的name属性等于value。
var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}

myObject.foo // 1

Reflect.set(myObject, 'foo', 2);
myObject.foo // 2

Reflect.set(myObject, 'bar', 3)
myObject.foo // 3

如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1

注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty

上面代码中，Proxy.set拦截里面使用了Reflect.set，而且传入了receiver，导致触发Proxy.defineProperty拦截。这是因为Proxy.set的receiver参数总是指向当前的 Proxy实例（即上例的obj），而Reflect.set一旦传入receiver，就会将属性赋值到receiver上面（即obj），导致触发defineProperty拦截。如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set

如果第一个参数不是对象，Reflect.set会报错。
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错

Reflect.has(obj, name)
Reflect.has方法对应name in obj里面的in运算符。
var myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true

如果Reflect.has()方法的第一个参数不是对象，会报错。
Reflect.deleteProperty(obj, name)
Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');

该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。
如果Reflect.deleteProperty()方法的第一个参数不是对象，会报错。
Reflect.construct(target, args)
Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);

如果Reflect.construct()方法的第一个参数不是函数，会报错。
Reflect.getPrototypeOf(obj)
Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
const myObj = new FancyThing();

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;

Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。
Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1) // 报错

Reflect.setPrototypeOf(obj, newProto)
Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。
const myObj = {};

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);

// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);

myObj.length // 0

如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf方法返回false。
Reflect.setPrototypeOf({}, null)
// true
Reflect.setPrototypeOf(Object.freeze({}), null)
// false

如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
Object.setPrototypeOf(1, {})
// 1

Reflect.setPrototypeOf(1, {})
// TypeError: Reflect.setPrototypeOf called on non-object

如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Reflect.setPrototypeOf(null, {})
// TypeError: Reflect.setPrototypeOf called on non-object

Reflect.apply(func, thisArg, args)
Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);

Reflect.defineProperty(target, propertyKey, attributes)
Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。
function MyDate() {
  /*…*/
}

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});

如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，比如Reflect.defineProperty(1, 'foo')。
这个方法可以与Proxy.defineProperty配合使用。
const p = new Proxy({}, {
  defineProperty(target, prop, descriptor) {
    console.log(descriptor);
    return Reflect.defineProperty(target, prop, descriptor);
  }
});

p.foo = 'bar';
// {value: "bar", writable: true, enumerable: true, configurable: true}

p.foo // "bar"

上面代码中，Proxy.defineProperty对属性赋值设置了拦截，然后使用Reflect.defineProperty完成了赋值。
Reflect.getOwnPropertyDescriptor(target, propertyKey)
Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
});

// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');

// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');

Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是，如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法。
Reflect.isExtensible (target)
Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
const myObject = {};

// 旧写法
Object.isExtensible(myObject) // true

// 新写法
Reflect.isExtensible(myObject) // true

如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。
Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错

Reflect.preventExtensions(target)
Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
var myObject = {};

// 旧写法
Object.preventExtensions(myObject) // Object {}

// 新写法
Reflect.preventExtensions(myObject) // true

如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，而Reflect.preventExtensions会报错。
// ES5 环境
Object.preventExtensions(1) // 报错

// ES6 环境
Object.preventExtensions(1) // 1

// 新写法
Reflect.preventExtensions(1) // 报错

Reflect.ownKeys (target)
Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]

如果Reflect.ownKeys()方法的第一个参数不是对象，会报错。
实例：使用 Proxy 实现观察者模式
观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20

上面代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。
下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}

上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。
ArrayBuffer
ArrayBuffer对象、TypedArray视图和DataView视图是 JavaScript 操作二进制数据的一个接口。这些对象早就存在，属于独立的规格（2011 年 2 月发布），ES6 将它们纳入了 ECMAScript 规格，并且增加了新的方法。它们都是以数组的语法处理二进制数据，所以统称为二进制数组。
这个接口的原始设计目的，与 WebGL 项目有关。所谓 WebGL，就是指浏览器与显卡之间的通信接口，为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本格式传递一个 32 位整数，两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像 C 语言那样，直接操作字节，将 4 个字节的 32 位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。
二进制数组就是在这种背景下诞生的。它很像 C 语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了 JavaScript 处理二进制数据的能力，使得开发者有可能通过 JavaScript 与操作系统的原生接口进行二进制通信。
二进制数组由三类对象组成。
（1）ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
（2）TypedArray视图：共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。
（3）DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。
简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。
TypedArray视图支持的数据类型一共有 9 种（DataView视图支持除Uint8C以外的其他 8 种）。
数据类型
字节长度
含义
对应的 C 语言类型
Int8
1
8 位带符号整数
signed char
Uint8
1
8 位不带符号整数
unsigned char
Uint8C
1
8 位不带符号整数（自动过滤溢出）
unsigned char
Int16
2
16 位带符号整数
short
Uint16
2
16 位不带符号整数
unsigned short
Int32
4
32 位带符号整数
int
Uint32
4
32 位不带符号的整数
unsigned int
Float32
4
32 位浮点数
float
Float64
8
64 位浮点数
double


注意，二进制数组并不是真正的数组，而是类似数组的对象。
很多浏览器操作的 API，用到了二进制数组操作二进制数据，下面是其中的几个。
- Canvas
- Fetch API
- File API
- WebSockets
- XMLHttpRequest
ArrayBuffer 对象
概述
ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。
ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。
const buf = new ArrayBuffer(32);

上面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 0。可以看到，ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。
为了读写这段内容，需要为它指定视图。DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。
const buf = new ArrayBuffer(32);
const dataView = new DataView(buf);
dataView.getUint8(0) // 0

上面代码对一段 32 字节的内存，建立DataView视图，然后以不带符号的 8 位整数格式，从头读取 8 位二进制数据，结果得到 0，因为原始内存的ArrayBuffer对象，默认所有位都是 0。
另一种TypedArray视图，与DataView视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。
const buffer = new ArrayBuffer(12);

const x1 = new Int32Array(buffer);
x1[0] = 1;
const x2 = new Uint8Array(buffer);
x2[0]  = 2;

x1[0] // 2

上面代码对同一段内存，分别建立两种视图：32 位带符号整数（Int32Array构造函数）和 8 位不带符号整数（Uint8Array构造函数）。由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图。
TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层的ArrayBuffer实例，并同时完成对这段内存的赋值。
const typedArray = new Uint8Array([0,1,2]);
typedArray.length // 3

typedArray[0] = 5;
typedArray // [5, 1, 2]

上面代码使用TypedArray视图的Uint8Array构造函数，新建一个不带符号的 8 位整数视图。可以看到，Uint8Array直接使用普通数组作为参数，对底层内存的赋值同时完成。
ArrayBuffer.prototype.byteLength
ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度。
const buffer = new ArrayBuffer(32);
buffer.byteLength
// 32

如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。
if (buffer.byteLength === n) {
  // 成功
} else {
  // 失败
}

ArrayBuffer.prototype.slice()
ArrayBuffer实例有一个slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);

上面代码拷贝buffer对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的ArrayBuffer对象。slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去。
slice方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。
除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。
ArrayBuffer.isView()
ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。
const buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer) // false

const v = new Int32Array(buffer);
ArrayBuffer.isView(v) // true

TypedArray 视图
概述
ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。ArrayBuffer有两种视图，一种是TypedArray视图，另一种是DataView视图。前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。
目前，TypedArray视图一共包括 9 种类型，每一种视图都是一种构造函数。
- Int8Array：8 位有符号整数，长度 1 个字节。
- Uint8Array：8 位无符号整数，长度 1 个字节。
- Uint8ClampedArray：8 位无符号整数，长度 1 个字节，溢出处理不同。
- Int16Array：16 位有符号整数，长度 2 个字节。
- Uint16Array：16 位无符号整数，长度 2 个字节。
- Int32Array：32 位有符号整数，长度 4 个字节。
- Uint32Array：32 位无符号整数，长度 4 个字节。
- Float32Array：32 位浮点数，长度 4 个字节。
- Float64Array：64 位浮点数，长度 8 个字节。
这 9 个构造函数生成的数组，统称为TypedArray视图。它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用。普通数组与 TypedArray 数组的差异主要在以下方面。
- TypedArray 数组的所有成员，都是同一种类型。
- TypedArray 数组的成员是连续的，不会有空位。
- TypedArray 数组成员的默认值为 0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是 10 个空位；new Uint8Array(10)返回一个 TypedArray 数组，里面 10 个成员都是 0。
- TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。
构造函数
TypedArray 数组提供 9 种构造函数，用来生成相应类型的数组实例。
构造函数有多种用法。
（1）TypedArray(buffer, byteOffset=0, length?)
同一个ArrayBuffer对象之上，可以根据不同的数据类型，建立多个视图。
// 创建一个8字节的ArrayBuffer
const b = new ArrayBuffer(8);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
const v1 = new Int32Array(b);

// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
const v2 = new Uint8Array(b, 2);

// 创建一个指向b的Int16视图，开始于字节2，长度为2
const v3 = new Int16Array(b, 2, 2);

上面代码在一段长度为 8 个字节的内存（b）之上，生成了三个视图：v1、v2和v3。
视图的构造函数可以接受三个参数：
- 第一个参数（必需）：视图对应的底层ArrayBuffer对象。
- 第二个参数（可选）：视图开始的字节序号，默认从 0 开始。
- 第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。
因此，v1、v2和v3是重叠的：v1[0]是一个 32 位整数，指向字节 0 ～字节 3；v2[0]是一个 8 位无符号整数，指向字节 2；v3[0]是一个 16 位整数，指向字节 2 ～字节 3。只要任何一个视图对内存有所修改，就会在另外两个视图上反应出来。
注意，byteOffset必须与所要建立的数据类型一致，否则会报错。
const buffer = new ArrayBuffer(8);
const i16 = new Int16Array(buffer, 1);
// Uncaught RangeError: start offset of Int16Array should be a multiple of 2

上面代码中，新生成一个 8 个字节的ArrayBuffer对象，然后在这个对象的第一个字节，建立带符号的 16 位整数视图，结果报错。因为，带符号的 16 位整数需要两个字节，所以byteOffset参数必须能够被 2 整除。
如果想从任意字节开始解读ArrayBuffer对象，必须使用DataView视图，因为TypedArray视图只提供 9 种固定的解读格式。
（2）TypedArray(length)
视图还可以不通过ArrayBuffer对象，直接分配内存而生成。
const f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];

上面代码生成一个 8 个成员的Float64Array数组（共 64 字节），然后依次对每个成员赋值。这时，视图构造函数的参数就是成员的个数。可以看到，视图数组的赋值操作与普通数组的操作毫无两样。
（3）TypedArray(typedArray)
TypedArray 数组的构造函数，可以接受另一个TypedArray实例作为参数。
const typedArray = new Int8Array(new Uint8Array(4));

上面代码中，Int8Array构造函数接受一个Uint8Array实例作为参数。
注意，此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的。新数组会开辟一段新的内存储存数据，不会在原数组的内存之上建立视图。
const x = new Int8Array([1, 1]);
const y = new Int8Array(x);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 1

上面代码中，数组y是以数组x为模板而生成的，当x变动的时候，y并没有变动。
如果想基于同一段内存，构造不同的视图，可以采用下面的写法。
const x = new Int8Array([1, 1]);
const y = new Int8Array(x.buffer);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 2

（4）TypedArray(arrayLikeObject)
构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。
const typedArray = new Uint8Array([1, 2, 3, 4]);

注意，这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图。
上面代码从一个普通的数组，生成一个 8 位无符号整数的TypedArray实例。
TypedArray 数组也可以转换回普通数组。
const normalArray = [...typedArray];
// or
const normalArray = Array.from(typedArray);
// or
const normalArray = Array.prototype.slice.call(typedArray);

数组方法
普通数组的操作方法和属性，对 TypedArray 数组完全适用。
- TypedArray.prototype.copyWithin(target, start[, end = this.length])
- TypedArray.prototype.entries()
- TypedArray.prototype.every(callbackfn, thisArg?)
- TypedArray.prototype.fill(value, start=0, end=this.length)
- TypedArray.prototype.filter(callbackfn, thisArg?)
- TypedArray.prototype.find(predicate, thisArg?)
- TypedArray.prototype.findIndex(predicate, thisArg?)
- TypedArray.prototype.forEach(callbackfn, thisArg?)
- TypedArray.prototype.indexOf(searchElement, fromIndex=0)
- TypedArray.prototype.join(separator)
- TypedArray.prototype.keys()
- TypedArray.prototype.lastIndexOf(searchElement, fromIndex?)
- TypedArray.prototype.map(callbackfn, thisArg?)
- TypedArray.prototype.reduce(callbackfn, initialValue?)
- TypedArray.prototype.reduceRight(callbackfn, initialValue?)
- TypedArray.prototype.reverse()
- TypedArray.prototype.slice(start=0, end=this.length)
- TypedArray.prototype.some(callbackfn, thisArg?)
- TypedArray.prototype.sort(comparefn)
- TypedArray.prototype.toLocaleString(reserved1?, reserved2?)
- TypedArray.prototype.toString()
- TypedArray.prototype.values()
上面所有方法的用法，请参阅数组方法的介绍，这里不再重复了。
注意，TypedArray 数组没有concat方法。如果想要合并多个 TypedArray 数组，可以用下面这个函数。
function concatenate(resultConstructor, ...arrays) {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new resultConstructor(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4))
// Uint8Array [1, 2, 3, 4]

另外，TypedArray 数组与普通数组一样，部署了 Iterator 接口，所以可以被遍历。
let ui8 = Uint8Array.of(0, 1, 2);
for (let byte of ui8) {
  console.log(byte);
}
// 0
// 1
// 2

字节序
字节序指的是数值在内存中的表示方式。
const buffer = new ArrayBuffer(16);
const int32View = new Int32Array(buffer);

for (let i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2;
}

上面代码生成一个 16 字节的ArrayBuffer对象，然后在它的基础上，建立了一个 32 位整数的视图。由于每个 32 位整数占据 4 个字节，所以一共可以写入 4 个整数，依次为 0，2，4，6。
如果在这段数据上接着建立一个 16 位整数的视图，则可以读出完全不一样的结果。
const int16View = new Int16Array(buffer);

for (let i = 0; i < int16View.length; i++) {
  console.log("Entry " + i + ": " + int16View[i]);
}
// Entry 0: 0
// Entry 1: 0
// Entry 2: 2
// Entry 3: 0
// Entry 4: 4
// Entry 5: 0
// Entry 6: 6
// Entry 7: 0

由于每个 16 位整数占据 2 个字节，所以整个ArrayBuffer对象现在分成 8 段。然后，由于 x86 体系的计算机都采用小端字节序（little endian），相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址，所以就得到了上面的结果。
比如，一个占据四个字节的 16 进制数0x12345678，决定其大小的最重要的字节是“12”，最不重要的是“78”。小端字节序将最不重要的字节排在前面，储存顺序就是78563412；大端字节序则完全相反，将最重要的字节排在前面，储存顺序就是12345678。目前，所有个人电脑几乎都是小端字节序，所以 TypedArray 数组内部也采用小端字节序读写数据，或者更准确的说，按照本机操作系统设定的字节序读写数据。
这并不意味大端字节序不重要，事实上，很多网络设备和特定的操作系统采用的是大端字节序。这就带来一个严重的问题：如果一段数据是大端字节序，TypedArray 数组将无法正确解析，因为它只能处理小端字节序！为了解决这个问题，JavaScript 引入DataView对象，可以设定字节序，下文会详细介绍。
下面是另一个例子。
// 假定某段buffer包含如下字节 [0x02, 0x01, 0x03, 0x07]
const buffer = new ArrayBuffer(4);
const v1 = new Uint8Array(buffer);
v1[0] = 2;
v1[1] = 1;
v1[2] = 3;
v1[3] = 7;

const uInt16View = new Uint16Array(buffer);

// 计算机采用小端字节序
// 所以头两个字节等于258
if (uInt16View[0] === 258) {
  console.log('OK'); // "OK"
}

// 赋值运算
uInt16View[0] = 255;    // 字节变为[0xFF, 0x00, 0x03, 0x07]
uInt16View[0] = 0xff05; // 字节变为[0x05, 0xFF, 0x03, 0x07]
uInt16View[1] = 0x0210; // 字节变为[0x05, 0xFF, 0x10, 0x02]

下面的函数可以用来判断，当前视图是小端字节序，还是大端字节序。
const BIG_ENDIAN = Symbol('BIG_ENDIAN');
const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

function getPlatformEndianness() {
  let arr32 = Uint32Array.of(0x12345678);
  let arr8 = new Uint8Array(arr32.buffer);
  switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) + (arr8[3])) {
    case 0x12345678:
      return BIG_ENDIAN;
    case 0x78563412:
      return LITTLE_ENDIAN;
    default:
      throw new Error('Unknown endianness');
  }
}

总之，与普通数组相比，TypedArray 数组的最大优点就是可以直接操作内存，不需要数据类型转换，所以速度快得多。
BYTES_PER_ELEMENT 属性
每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数。
Int8Array.BYTES_PER_ELEMENT // 1
Uint8Array.BYTES_PER_ELEMENT // 1
Uint8ClampedArray.BYTES_PER_ELEMENT // 1
Int16Array.BYTES_PER_ELEMENT // 2
Uint16Array.BYTES_PER_ELEMENT // 2
Int32Array.BYTES_PER_ELEMENT // 4
Uint32Array.BYTES_PER_ELEMENT // 4
Float32Array.BYTES_PER_ELEMENT // 4
Float64Array.BYTES_PER_ELEMENT // 8

这个属性在TypedArray实例上也能获取，即有TypedArray.prototype.BYTES_PER_ELEMENT。
ArrayBuffer 与字符串的互相转换
ArrayBuffer 和字符串的相互转换，使用原生 TextEncoder 和 TextDecoder 方法。为了便于说明用法，下面的代码都按照 TypeScript 的用法，给出了类型签名。
/**
 * Convert ArrayBuffer/TypedArray to String via TextDecoder
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
 */
function ab2str(
  input: ArrayBuffer | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array,
  outputEncoding: string = 'utf8',
): string {
  const decoder = new TextDecoder(outputEncoding)
  return decoder.decode(input)
}

/**
 * Convert String to ArrayBuffer via TextEncoder
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/TextEncoder
 */
function str2ab(input: string): ArrayBuffer {
  const view = str2Uint8Array(input)
  return view.buffer
}

/** Convert String to Uint8Array */
function str2Uint8Array(input: string): Uint8Array {
  const encoder = new TextEncoder()
  const view = encoder.encode(input)
  return view
}

上面代码中，ab2str()的第二个参数outputEncoding给出了输出编码的编码，一般保持默认值（utf-8），其他可选值参见官方文档或 Node.js 文档。
溢出
不同的视图类型，所能容纳的数值范围是确定的。超出这个范围，就会出现溢出。比如，8 位视图只能容纳一个 8 位的二进制值，如果放入一个 9 位的值，就会溢出。
TypedArray 数组的溢出处理规则，简单来说，就是抛弃溢出的位，然后按照视图类型进行解释。
const uint8 = new Uint8Array(1);

uint8[0] = 256;
uint8[0] // 0

uint8[0] = -1;
uint8[0] // 255

上面代码中，uint8是一个 8 位视图，而 256 的二进制形式是一个 9 位的值100000000，这时就会发生溢出。根据规则，只会保留后 8 位，即00000000。uint8视图的解释规则是无符号的 8 位整数，所以00000000就是0。
负数在计算机内部采用“2 的补码”表示，也就是说，将对应的正数值进行否运算，然后加1。比如，-1对应的正值是1，进行否运算以后，得到11111110，再加上1就是补码形式11111111。uint8按照无符号的 8 位整数解释11111111，返回结果就是255。
一个简单转换规则，可以这样表示。
- 正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去 1。
- 负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值的绝对值，再加上 1。
上面的“余值”就是模运算的结果，即 JavaScript 里面的%运算符的结果。
12 % 4 // 0
12 % 5 // 2

上面代码中，12 除以 4 是没有余值的，而除以 5 会得到余值 2。
请看下面的例子。
const int8 = new Int8Array(1);

int8[0] = 128;
int8[0] // -128

int8[0] = -129;
int8[0] // 127

上面例子中，int8是一个带符号的 8 位整数视图，它的最大值是 127，最小值是-128。输入值为128时，相当于正向溢出1，根据“最小值加上余值（128 除以 127 的余值是 1），再减去 1”的规则，就会返回-128；输入值为-129时，相当于负向溢出1，根据“最大值减去余值的绝对值（-129 除以-128 的余值的绝对值是 1），再加上 1”的规则，就会返回127。
Uint8ClampedArray视图的溢出规则，与上面的规则不同。它规定，凡是发生正向溢出，该值一律等于当前数据类型的最大值，即 255；如果发生负向溢出，该值一律等于当前数据类型的最小值，即 0。
const uint8c = new Uint8ClampedArray(1);

uint8c[0] = 256;
uint8c[0] // 255

uint8c[0] = -1;
uint8c[0] // 0

上面例子中，uint8C是一个Uint8ClampedArray视图，正向溢出时都返回 255，负向溢出都返回 0。
TypedArray.prototype.buffer
TypedArray实例的buffer属性，返回整段内存区域对应的ArrayBuffer对象。该属性为只读属性。
const a = new Float32Array(64);
const b = new Uint8Array(a.buffer);

上面代码的a视图对象和b视图对象，对应同一个ArrayBuffer对象，即同一段内存。
TypedArray.prototype.byteLength，TypedArray.prototype.byteOffset
byteLength属性返回 TypedArray 数组占据的内存长度，单位为字节。byteOffset属性返回 TypedArray 数组从底层ArrayBuffer对象的哪个字节开始。这两个属性都是只读属性。
const b = new ArrayBuffer(8);

const v1 = new Int32Array(b);
const v2 = new Uint8Array(b, 2);
const v3 = new Int16Array(b, 2, 2);

v1.byteLength // 8
v2.byteLength // 6
v3.byteLength // 4

v1.byteOffset // 0
v2.byteOffset // 2
v3.byteOffset // 2

TypedArray.prototype.length
length属性表示 TypedArray 数组含有多少个成员。注意将 length 属性和 byteLength 属性区分，前者是成员长度，后者是字节长度。
const a = new Int16Array(8);

a.length // 8
a.byteLength // 16

TypedArray.prototype.set()
TypedArray 数组的set方法用于复制数组（普通数组或 TypedArray 数组），也就是将一段内容完全复制到另一段内存。
const a = new Uint8Array(8);
const b = new Uint8Array(8);

b.set(a);

上面代码复制a数组的内容到b数组，它是整段内存的复制，比一个个拷贝成员的那种复制快得多。
set方法还可以接受第二个参数，表示从b对象的哪一个成员开始复制a对象。
const a = new Uint16Array(8);
const b = new Uint16Array(10);

b.set(a, 2)

上面代码的b数组比a数组多两个成员，所以从b[2]开始复制。
TypedArray.prototype.subarray()
subarray方法是对于 TypedArray 数组的一部分，再建立一个新的视图。
const a = new Uint16Array(8);
const b = a.subarray(2,3);

a.byteLength // 16
b.byteLength // 2

subarray方法的第一个参数是起始的成员序号，第二个参数是结束的成员序号（不含该成员），如果省略则包含剩余的全部成员。所以，上面代码的a.subarray(2,3)，意味着 b 只包含a[2]一个成员，字节长度为 2。
TypedArray.prototype.slice()
TypeArray 实例的slice方法，可以返回一个指定位置的新的TypedArray实例。
let ui8 = Uint8Array.of(0, 1, 2);
ui8.slice(-1)
// Uint8Array [ 2 ]

上面代码中，ui8是 8 位无符号整数数组视图的一个实例。它的slice方法可以从当前视图之中，返回一个新的视图实例。
slice方法的参数，表示原数组的具体位置，开始生成新数组。负值表示逆向的位置，即-1 为倒数第一个位置，-2 表示倒数第二个位置，以此类推。
TypedArray.of()
TypedArray 数组的所有构造函数，都有一个静态方法of，用于将参数转为一个TypedArray实例。
Float32Array.of(0.151, -8, 3.7)
// Float32Array [ 0.151, -8, 3.7 ]

下面三种方法都会生成同样一个 TypedArray 数组。
// 方法一
let tarr = new Uint8Array([1,2,3]);

// 方法二
let tarr = Uint8Array.of(1,2,3);

// 方法三
let tarr = new Uint8Array(3);
tarr[0] = 1;
tarr[1] = 2;
tarr[2] = 3;

TypedArray.from()
静态方法from接受一个可遍历的数据结构（比如数组）作为参数，返回一个基于这个结构的TypedArray实例。
Uint16Array.from([0, 1, 2])
// Uint16Array [ 0, 1, 2 ]

这个方法还可以将一种TypedArray实例，转为另一种。
const ui16 = Uint16Array.from(Uint8Array.of(0, 1, 2));
ui16 instanceof Uint16Array // true

from方法还可以接受一个函数，作为第二个参数，用来对每个元素进行遍历，功能类似map方法。
Int8Array.of(127, 126, 125).map(x => 2 * x)
// Int8Array [ -2, -4, -6 ]

Int16Array.from(Int8Array.of(127, 126, 125), x => 2 * x)
// Int16Array [ 254, 252, 250 ]

上面的例子中，from方法没有发生溢出，这说明遍历不是针对原来的 8 位整数数组。也就是说，from会将第一个参数指定的 TypedArray 数组，拷贝到另一段内存之中，处理之后再将结果转成指定的数组格式。
复合视图
由于视图的构造函数可以指定起始位置和长度，所以在同一段内存之中，可以依次存放不同类型的数据，这叫做“复合视图”。
const buffer = new ArrayBuffer(24);

const idView = new Uint32Array(buffer, 0, 1);
const usernameView = new Uint8Array(buffer, 4, 16);
const amountDueView = new Float32Array(buffer, 20, 1);

上面代码将一个 24 字节长度的ArrayBuffer对象，分成三个部分：
- 字节 0 到字节 3：1 个 32 位无符号整数
- 字节 4 到字节 19：16 个 8 位整数
- 字节 20 到字节 23：1 个 32 位浮点数
这种数据结构可以用如下的 C 语言描述：
struct someStruct {
  unsigned long id;
  char username[16];
  float amountDue;
};

DataView 视图
如果一段数据包括多种类型（比如服务器传来的 HTTP 数据），这时除了建立ArrayBuffer对象的复合视图以外，还可以通过DataView视图进行操作。
DataView视图提供更多操作选项，而且支持设定字节序。本来，在设计目的上，ArrayBuffer对象的各种TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。
DataView视图本身也是构造函数，接受一个ArrayBuffer对象作为参数，生成视图。
new DataView(ArrayBuffer buffer [, 字节起始位置 [, 长度]]);

下面是一个例子。
const buffer = new ArrayBuffer(24);
const dv = new DataView(buffer);

DataView实例有以下属性，含义与TypedArray实例的同名方法相同。
- DataView.prototype.buffer：返回对应的 ArrayBuffer 对象
- DataView.prototype.byteLength：返回占据的内存字节长度
- DataView.prototype.byteOffset：返回当前视图从对应的 ArrayBuffer 对象的哪个字节开始
DataView实例提供 8 个方法读取内存。
- getInt8：读取 1 个字节，返回一个 8 位整数。
- getUint8：读取 1 个字节，返回一个无符号的 8 位整数。
- getInt16：读取 2 个字节，返回一个 16 位整数。
- getUint16：读取 2 个字节，返回一个无符号的 16 位整数。
- getInt32：读取 4 个字节，返回一个 32 位整数。
- getUint32：读取 4 个字节，返回一个无符号的 32 位整数。
- getFloat32：读取 4 个字节，返回一个 32 位浮点数。
- getFloat64：读取 8 个字节，返回一个 64 位浮点数。
这一系列get方法的参数都是一个字节序号（不能是负数，否则会报错），表示从哪个字节开始读取。
const buffer = new ArrayBuffer(24);
const dv = new DataView(buffer);

// 从第1个字节读取一个8位无符号整数
const v1 = dv.getUint8(0);

// 从第2个字节读取一个16位无符号整数
const v2 = dv.getUint16(1);

// 从第4个字节读取一个16位无符号整数
const v3 = dv.getUint16(3);

上面代码读取了ArrayBuffer对象的前 5 个字节，其中有一个 8 位整数和两个十六位整数。
如果一次读取两个或两个以上字节，就必须明确数据的存储方式，到底是小端字节序还是大端字节序。默认情况下，DataView的get方法使用大端字节序解读数据，如果需要使用小端字节序解读，必须在get方法的第二个参数指定true。
// 小端字节序
const v1 = dv.getUint16(1, true);

// 大端字节序
const v2 = dv.getUint16(3, false);

// 大端字节序
const v3 = dv.getUint16(3);

DataView 视图提供 8 个方法写入内存。
- setInt8：写入 1 个字节的 8 位整数。
- setUint8：写入 1 个字节的 8 位无符号整数。
- setInt16：写入 2 个字节的 16 位整数。
- setUint16：写入 2 个字节的 16 位无符号整数。
- setInt32：写入 4 个字节的 32 位整数。
- setUint32：写入 4 个字节的 32 位无符号整数。
- setFloat32：写入 4 个字节的 32 位浮点数。
- setFloat64：写入 8 个字节的 64 位浮点数。
这一系列set方法，接受两个参数，第一个参数是字节序号，表示从哪个字节开始写入，第二个参数为写入的数据。对于那些写入两个或两个以上字节的方法，需要指定第三个参数，false或者undefined表示使用大端字节序写入，true表示使用小端字节序写入。
// 在第1个字节，以大端字节序写入值为25的32位整数
dv.setInt32(0, 25, false);

// 在第5个字节，以大端字节序写入值为25的32位整数
dv.setInt32(4, 25);

// 在第9个字节，以小端字节序写入值为2.5的32位浮点数
dv.setFloat32(8, 2.5, true);

如果不确定正在使用的计算机的字节序，可以采用下面的判断方式。
const littleEndian = (function() {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
})();

如果返回true，就是小端字节序；如果返回false，就是大端字节序。
二进制数组的应用
大量的 Web API 用到了ArrayBuffer对象和它的视图对象。
AJAX
传统上，服务器通过 AJAX 操作只能返回文本数据，即responseType属性默认为text。XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；如果不知道，就设为blob。
let xhr = new XMLHttpRequest();
xhr.open('GET', someUrl);
xhr.responseType = 'arraybuffer';

xhr.onload = function () {
  let arrayBuffer = xhr.response;
  // ···
};

xhr.send();

如果知道传回来的是 32 位整数，可以像下面这样处理。
xhr.onreadystatechange = function () {
  if (req.readyState === 4 ) {
    const arrayResponse = xhr.response;
    const dataView = new DataView(arrayResponse);
    const ints = new Uint32Array(dataView.byteLength / 4);

    xhrDiv.style.backgroundColor = "#00FF00";
    xhrDiv.innerText = "Array is " + ints.length + "uints long";
  }
}

Canvas
网页Canvas元素输出的二进制像素数据，就是 TypedArray 数组。
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const uint8ClampedArray = imageData.data;

需要注意的是，上面代码的uint8ClampedArray虽然是一个 TypedArray 数组，但是它的视图类型是一种针对Canvas元素的专有类型Uint8ClampedArray。这个视图类型的特点，就是专门针对颜色，把每个字节解读为无符号的 8 位整数，即只能取值 0 ～ 255，而且发生运算的时候自动过滤高位溢出。这为图像处理带来了巨大的方便。
举例来说，如果把像素的颜色值设为Uint8Array类型，那么乘以一个 gamma 值的时候，就必须这样计算：
u8[i] = Math.min(255, Math.max(0, u8[i] * gamma));

因为Uint8Array类型对于大于 255 的运算结果（比如0xFF+1），会自动变为0x00，所以图像处理必须要像上面这样算。这样做很麻烦，而且影响性能。如果将颜色值设为Uint8ClampedArray类型，计算就简化许多。
pixels[i] *= gamma;

Uint8ClampedArray类型确保将小于 0 的值设为 0，将大于 255 的值设为 255。注意，IE 10 不支持该类型。
WebSocket
WebSocket可以通过ArrayBuffer，发送或接收二进制数据。
let socket = new WebSocket('ws://127.0.0.1:8081');
socket.binaryType = 'arraybuffer';

// Wait until socket is open
socket.addEventListener('open', function (event) {
  // Send binary data
  const typedArray = new Uint8Array(4);
  socket.send(typedArray.buffer);
});

// Receive binary data
socket.addEventListener('message', function (event) {
  const arrayBuffer = event.data;
  // ···
});

Fetch API
Fetch API 取回的数据，就是ArrayBuffer对象。
fetch(url)
.then(function(response){
  return response.arrayBuffer()
})
.then(function(arrayBuffer){
  // ...
});

File API
如果知道一个文件的二进制数据类型，也可以将这个文件读取为ArrayBuffer对象。
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];
const reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.onload = function () {
  const arrayBuffer = reader.result;
  // ···
};

下面以处理 bmp 文件为例。假定file变量是一个指向 bmp 文件的文件对象，首先读取文件。
const reader = new FileReader();
reader.addEventListener("load", processimage, false);
reader.readAsArrayBuffer(file);

然后，定义处理图像的回调函数：先在二进制数据之上建立一个DataView视图，再建立一个bitmap对象，用于存放处理后的数据，最后将图像展示在Canvas元素之中。
function processimage(e) {
  const buffer = e.target.result;
  const datav = new DataView(buffer);
  const bitmap = {};
  // 具体的处理步骤
}

具体处理图像数据时，先处理 bmp 的文件头。具体每个文件头的格式和定义，请参阅有关资料。
bitmap.fileheader = {};
bitmap.fileheader.bfType = datav.getUint16(0, true);
bitmap.fileheader.bfSize = datav.getUint32(2, true);
bitmap.fileheader.bfReserved1 = datav.getUint16(6, true);
bitmap.fileheader.bfReserved2 = datav.getUint16(8, true);
bitmap.fileheader.bfOffBits = datav.getUint32(10, true);

接着处理图像元信息部分。
bitmap.infoheader = {};
bitmap.infoheader.biSize = datav.getUint32(14, true);
bitmap.infoheader.biWidth = datav.getUint32(18, true);
bitmap.infoheader.biHeight = datav.getUint32(22, true);
bitmap.infoheader.biPlanes = datav.getUint16(26, true);
bitmap.infoheader.biBitCount = datav.getUint16(28, true);
bitmap.infoheader.biCompression = datav.getUint32(30, true);
bitmap.infoheader.biSizeImage = datav.getUint32(34, true);
bitmap.infoheader.biXPelsPerMeter = datav.getUint32(38, true);
bitmap.infoheader.biYPelsPerMeter = datav.getUint32(42, true);
bitmap.infoheader.biClrUsed = datav.getUint32(46, true);
bitmap.infoheader.biClrImportant = datav.getUint32(50, true);

最后处理图像本身的像素信息。
const start = bitmap.fileheader.bfOffBits;
bitmap.pixels = new Uint8Array(buffer, start);

至此，图像文件的数据全部处理完成。下一步，可以根据需要，进行图像变形，或者转换格式，或者展示在Canvas网页元素之中。
SharedArrayBuffer
JavaScript 是单线程的，Web worker 引入了多线程：主线程用来与用户互动，Worker 线程用来承担计算任务。每个线程的数据都是隔离的，通过postMessage()通信。下面是一个例子。
// 主线程
const w = new Worker('myworker.js');

上面代码中，主线程新建了一个 Worker 线程。该线程与主线程之间会有一个通信渠道，主线程通过w.postMessage向 Worker 线程发消息，同时通过message事件监听 Worker 线程的回应。
// 主线程
w.postMessage('hi');
w.onmessage = function (ev) {
  console.log(ev.data);
}

上面代码中，主线程先发一个消息hi，然后在监听到 Worker 线程的回应后，就将其打印出来。
Worker 线程也是通过监听message事件，来获取主线程发来的消息，并作出反应。
// Worker 线程
onmessage = function (ev) {
  console.log(ev.data);
  postMessage('ho');
}

线程之间的数据交换可以是各种格式，不仅仅是字符串，也可以是二进制数据。这种交换采用的是复制机制，即一个进程将需要分享的数据复制一份，通过postMessage方法交给另一个进程。如果数据量比较大，这种通信的效率显然比较低。很容易想到，这时可以留出一块内存区域，由主线程与 Worker 线程共享，两方都可以读写，那么就会大大提高效率，协作起来也会比较简单（不像postMessage那么麻烦）。
ES2017 引入SharedArrayBufferSharedArrayBuffer，允许 Worker 线程与主线程共享同一块内存。SharedArrayBuffer的 API 与ArrayBuffer一模一样，唯一的区别是后者无法共享数据。
// 主线程

// 新建 1KB 共享内存
const sharedBuffer = new SharedArrayBuffer(1024);

// 主线程将共享内存的地址发送出去
w.postMessage(sharedBuffer);

// 在共享内存上建立视图，供写入数据
const sharedArray = new Int32Array(sharedBuffer);

上面代码中，postMessage方法的参数是SharedArrayBuffer对象。
Worker 线程从事件的data属性上面取到数据。
// Worker 线程
onmessage = function (ev) {
  // 主线程共享的数据，就是 1KB 的共享内存
  const sharedBuffer = ev.data;

  // 在共享内存上建立视图，方便读写
  const sharedArray = new Int32Array(sharedBuffer);

  // ...
};

共享内存也可以在 Worker 线程创建，发给主线程。
SharedArrayBuffer与ArrayBuffer一样，本身是无法读写的，必须在上面建立视图，然后通过视图读写。
// 分配 10 万个 32 位整数占据的内存空间
const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 100000);

// 建立 32 位整数视图
const ia = new Int32Array(sab);  // ia.length == 100000

// 新建一个质数生成器
const primes = new PrimeGenerator();

// 将 10 万个质数，写入这段内存空间
for ( let i=0 ; i < ia.length ; i++ )
  ia[i] = primes.next();

// 向 Worker 线程发送这段共享内存
w.postMessage(ia);

Worker 线程收到数据后的处理如下。
// Worker 线程
let ia;
onmessage = function (ev) {
  ia = ev.data;
  console.log(ia.length); // 100000
  console.log(ia[37]); // 输出 163，因为这是第38个质数
};

Atomics 对象
多线程共享内存，最大的问题就是如何防止两个线程同时修改某个地址，或者说，当一个线程修改共享内存以后，必须有一个机制让其他线程同步。SharedArrayBuffer API 提供Atomics对象，保证所有共享内存的操作都是“原子性”的，并且可以在所有线程内同步。
什么叫“原子性操作”呢？现代编程语言中，一条普通的命令被编译器处理以后，会变成多条机器指令。如果是单线程运行，这是没有问题的；多线程环境并且共享内存时，就会出问题，因为这一组机器指令的运行期间，可能会插入其他线程的指令，从而导致运行结果出错。请看下面的例子。
// 主线程
ia[42] = 314159;  // 原先的值 191
ia[37] = 123456;  // 原先的值 163

// Worker 线程
console.log(ia[37]);
console.log(ia[42]);
// 可能的结果
// 123456
// 191

上面代码中，主线程的原始顺序是先对 42 号位置赋值，再对 37 号位置赋值。但是，编译器和 CPU 为了优化，可能会改变这两个操作的执行顺序（因为它们之间互不依赖），先对 37 号位置赋值，再对 42 号位置赋值。而执行到一半的时候，Worker 线程可能就会来读取数据，导致打印出123456和191。
下面是另一个例子。
// 主线程
const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 100000);
const ia = new Int32Array(sab);

for (let i = 0; i < ia.length; i++) {
  ia[i] = primes.next(); // 将质数放入 ia
}

// worker 线程
ia[112]++; // 错误
Atomics.add(ia, 112, 1); // 正确

上面代码中，Worker 线程直接改写共享内存ia[112]++是不正确的。因为这行语句会被编译成多条机器指令，这些指令之间无法保证不会插入其他进程的指令。请设想如果两个线程同时ia[112]++，很可能它们得到的结果都是不正确的。
Atomics对象就是为了解决这个问题而提出，它可以保证一个操作所对应的多条机器指令，一定是作为一个整体运行的，中间不会被打断。也就是说，它所涉及的操作都可以看作是原子性的单操作，这可以避免线程竞争，提高多线程共享内存时的操作安全。所以，ia[112]++要改写成Atomics.add(ia, 112, 1)。
Atomics对象提供多种方法。
（1）Atomics.store()，Atomics.load()
store()方法用来向共享内存写入数据，load()方法用来从共享内存读出数据。比起直接的读写操作，它们的好处是保证了读写操作的原子性。
此外，它们还用来解决一个问题：多个线程使用共享内存的某个位置作为开关（flag），一旦该位置的值变了，就执行特定操作。这时，必须保证该位置的赋值操作，一定是在它前面的所有可能会改写内存的操作结束后执行；而该位置的取值操作，一定是在它后面所有可能会读取该位置的操作开始之前执行。store()方法和load()方法就能做到这一点，编译器不会为了优化，而打乱机器指令的执行顺序。
Atomics.load(typedArray, index)
Atomics.store(typedArray, index, value)

store()方法接受三个参数：typedArray对象（SharedArrayBuffer 的视图）、位置索引和值，返回typedArray[index]的值。load()方法只接受两个参数：typedArray对象（SharedArrayBuffer 的视图）和位置索引，也是返回typedArray[index]的值。
// 主线程 main.js
ia[42] = 314159;  // 原先的值 191
Atomics.store(ia, 37, 123456);  // 原先的值是 163

// Worker 线程 worker.js
while (Atomics.load(ia, 37) == 163);
console.log(ia[37]);  // 123456
console.log(ia[42]);  // 314159

上面代码中，主线程的Atomics.store()向 42 号位置的赋值，一定是早于 37 位置的赋值。只要 37 号位置等于 163，Worker 线程就不会终止循环，而对 37 号位置和 42 号位置的取值，一定是在Atomics.load()操作之后。
下面是另一个例子。
// 主线程
const worker = new Worker('worker.js');
const length = 10;
const size = Int32Array.BYTES_PER_ELEMENT * length;
// 新建一段共享内存
const sharedBuffer = new SharedArrayBuffer(size);
const sharedArray = new Int32Array(sharedBuffer);
for (let i = 0; i < 10; i++) {
  // 向共享内存写入 10 个整数
  Atomics.store(sharedArray, i, 0);
}
worker.postMessage(sharedBuffer);

上面代码中，主线程用Atomics.store()方法写入数据。下面是 Worker 线程用Atomics.load()方法读取数据。
// worker.js
self.addEventListener('message', (event) => {
  const sharedArray = new Int32Array(event.data);
  for (let i = 0; i < 10; i++) {
    const arrayValue = Atomics.load(sharedArray, i);
    console.log(`The item at array index ${i} is ${arrayValue}`);
  }
}, false);

（2）Atomics.exchange()
Worker 线程如果要写入数据，可以使用上面的Atomics.store()方法，也可以使用Atomics.exchange()方法。它们的区别是，Atomics.store()返回写入的值，而Atomics.exchange()返回被替换的值。
// Worker 线程
self.addEventListener('message', (event) => {
  const sharedArray = new Int32Array(event.data);
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      const storedValue = Atomics.store(sharedArray, i, 1);
      console.log(`The item at array index ${i} is now ${storedValue}`);
    } else {
      const exchangedValue = Atomics.exchange(sharedArray, i, 2);
      console.log(`The item at array index ${i} was ${exchangedValue}, now 2`);
    }
  }
}, false);

上面代码将共享内存的偶数位置的值改成1，奇数位置的值改成2。
（3）Atomics.wait()，Atomics.notify()
使用while循环等待主线程的通知，不是很高效，如果用在主线程，就会造成卡顿，Atomics对象提供了wait()和notify()两个方法用于等待通知。这两个方法相当于锁内存，即在一个线程进行操作时，让其他线程休眠（建立锁），等到操作结束，再唤醒那些休眠的线程（解除锁）。
Atomics.notify()方法以前叫做Atomics.wake()，后来进行了改名。
// Worker 线程
self.addEventListener('message', (event) => {
  const sharedArray = new Int32Array(event.data);
  const arrayIndex = 0;
  const expectedStoredValue = 50;
  Atomics.wait(sharedArray, arrayIndex, expectedStoredValue);
  console.log(Atomics.load(sharedArray, arrayIndex));
}, false);

上面代码中，Atomics.wait()方法等同于告诉 Worker 线程，只要满足给定条件（sharedArray的0号位置等于50），就在这一行 Worker 线程进入休眠。
主线程一旦更改了指定位置的值，就可以唤醒 Worker 线程。
// 主线程
const newArrayValue = 100;
Atomics.store(sharedArray, 0, newArrayValue);
const arrayIndex = 0;
const queuePos = 1;
Atomics.notify(sharedArray, arrayIndex, queuePos);

上面代码中，sharedArray的0号位置改为100，然后就执行Atomics.notify()方法，唤醒在sharedArray的0号位置休眠队列里的一个线程。
Atomics.wait()方法的使用格式如下。
Atomics.wait(sharedArray, index, value, timeout)

它的四个参数含义如下。
- sharedArray：共享内存的视图数组。
- index：视图数据的位置（从0开始）。
- value：该位置的预期值。一旦实际值等于预期值，就进入休眠。
- timeout：整数，表示过了这个时间以后，就自动唤醒，单位毫秒。该参数可选，默认值是Infinity，即无限期的休眠，只有通过Atomics.notify()方法才能唤醒。
Atomics.wait()的返回值是一个字符串，共有三种可能的值。如果sharedArray[index]不等于value，就返回字符串not-equal，否则就进入休眠。如果Atomics.notify()方法唤醒，就返回字符串ok；如果因为超时唤醒，就返回字符串timed-out。
Atomics.notify()方法的使用格式如下。
Atomics.notify(sharedArray, index, count)

它的三个参数含义如下。
- sharedArray：共享内存的视图数组。
- index：视图数据的位置（从0开始）。
- count：需要唤醒的 Worker 线程的数量，默认为Infinity。
Atomics.notify()方法一旦唤醒休眠的 Worker 线程，就会让它继续往下运行。
请看一个例子。
// 主线程
console.log(ia[37]);  // 163
Atomics.store(ia, 37, 123456);
Atomics.notify(ia, 37, 1);

// Worker 线程
Atomics.wait(ia, 37, 163);
console.log(ia[37]);  // 123456

上面代码中，视图数组ia的第 37 号位置，原来的值是163。Worker 线程使用Atomics.wait()方法，指定只要ia[37]等于163，就进入休眠状态。主线程使用Atomics.store()方法，将123456写入ia[37]，然后使用Atomics.notify()方法唤醒 Worker 线程。
另外，基于wait和notify这两个方法的锁内存实现，可以看 Lars T Hansen 的 js-lock-and-condition 这个库。
注意，浏览器的主线程不宜设置休眠，这会导致用户失去响应。而且，主线程实际上会拒绝进入休眠。
（4）运算方法
共享内存上面的某些运算是不能被打断的，即不能在运算过程中，让其他线程改写内存上面的值。Atomics 对象提供了一些运算方法，防止数据被改写。
Atomics.add(sharedArray, index, value)

Atomics.add用于将value加到sharedArray[index]，返回sharedArray[index]旧的值。
Atomics.sub(sharedArray, index, value)

Atomics.sub用于将value从sharedArray[index]减去，返回sharedArray[index]旧的值。
Atomics.and(sharedArray, index, value)

Atomics.and用于将value与sharedArray[index]进行位运算and，放入sharedArray[index]，并返回旧的值。
Atomics.or(sharedArray, index, value)

Atomics.or用于将value与sharedArray[index]进行位运算or，放入sharedArray[index]，并返回旧的值。
Atomics.xor(sharedArray, index, value)

Atomic.xor用于将vaule与sharedArray[index]进行位运算xor，放入sharedArray[index]，并返回旧的值。
（5）其他方法
Atomics对象还有以下方法。
- Atomics.compareExchange(sharedArray, index, oldval, newval)：如果sharedArray[index]等于oldval，就写入newval，返回oldval。
- Atomics.isLockFree(size)：返回一个布尔值，表示Atomics对象是否可以处理某个size的内存锁定。如果返回false，应用程序就需要自己来实现锁定。
Atomics.compareExchange的一个用途是，从 SharedArrayBuffer 读取一个值，然后对该值进行某个操作，操作结束以后，检查一下 SharedArrayBuffer 里面原来那个值是否发生变化（即被其他线程改写过）。如果没有改写过，就将它写回原来的位置，否则读取新的值，再重头进行一次操作。
Class 
基本语法
类的定义
定义类可以时候类声明和class表达式的方式
- class声明
class Point {
  // ...
}

- class表达式
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用，如果内部没有用到Me，可以省略
通过表达式可以写出立即执行
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"

类的构造方法
通过new命令生成对象实例时，constructor方法自动调用。如果没有显式定义，一个空的constructor()方法会被默认添加。
class Point {
}

// 等同于
class Point {
  constructor() {}
}

constructor()方法默认返回实例对象（即this），也可以指定返回另外一个对象。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false

类的属性定义
- 顶部属性
class foo {
  bar = 'hello';
  baz = 'world';
  constructor() {
    // ...
  }
}

这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。
- 构造方法中的属性
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

- 静态属性
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
class MyClass {
  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
MyClass.myStaticProp=1

Class 内部只有静态方法，没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字。
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}

- 属性拦截
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'

类的方法定义
- 原型方法
//定义类
class Point {
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

- 静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
静态方法中的this指向类，并且可以被子类继承
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function

- 属性表达式
类的属性名，可以采用表达式。
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}

类的实例
生成类的实例使用new命令，如果忘记加上new，像函数那样调用Class，将会报错。
class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);

实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

所有实例共享一个原型对象，可以通过实例的__proto__属性为“类”添加方法。
__proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
特点
- 严格模式
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
- 不存在提升
类不存在变量提升（hoist），这一点与 ES5 完全不同。
new Foo(); // ReferenceError
class Foo {}

- name 属性
由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
class Point {}
Point.name // "Point"

name属性总是返回紧跟在class关键字后面的类名。
私有方法和私有属性
现有的解决方案
将私有方法的名字命名为一个Symbol值。
const bar = Symbol('bar');
const snaf = Symbol('snaf');

class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};

上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。
const inst = new myClass();

Reflect.ownKeys(myClass.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]

私有属性的提案
目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}

上面代码中，#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。
const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错

下面是另一个例子。
class Point {
  #x;

  constructor(x = 0) {
    this.#x = +x;
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = +value;
  }
}

上面代码中，#x就是私有属性，在Point类之外是读取不到这个属性的。由于井号#是属性名的一部分，使用时必须带有#一起使用，所以#x和x是两个不同的属性。
之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，是因为 JavaScript 是一门动态语言，没有类型声明，使用独立的符号似乎是唯一的比较方便可靠的方法，能够准确地区分一种属性是否为私有属性。另外，Ruby 语言使用@表示私有属性，ES6 没有用这个符号而使用#，是因为@已经被留给了 Decorator。
这种写法不仅可以写私有属性，还可以用来写私有方法。
class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() {
    return this.#a + this.#b;
  }
  printSum() {
    console.log(this.#sum());
  }
}

上面代码中，#sum()就是一个私有方法。
另外，私有属性也可以设置 getter 和 setter 方法。
class Counter {
  #xValue = 0;

  constructor() {
    super();
    // ...
  }

  get #x() { return #xValue; }
  set #x(value) {
    this.#xValue = value;
  }
}

上面代码中，#x是一个私有属性，它的读写都通过get #x()和set #x()来完成。
私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性。
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo.getPrivateValue(new Foo()); // 42

上面代码允许从实例foo上面引用私有属性。
私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错

上面代码中，#totallyRandomNumber是私有属性，#computeRandomNumber()是私有方法，只能在FakeMath这个类的内部调用，外部调用就会报错。
new.target 的应用
ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined
1. 确定构造函数的调用方式
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错

Class 内部调用new.target，返回当前 Class
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true

2. 限制类的独立使用，必须继承
子类继承父类时，new.target会返回子类。
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确

继承
语法
Class 可以通过extends关键字实现继承
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}

子类必须在constructor方法中调用super方法
子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。所以在调用super方法后才能使用this对象
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError

ES5与ES6的继承机制
ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
ES6 的继承，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
从子类获取父类 
Object.getPrototypeOf方法可以用来从子类上获取父类。
Object.getPrototypeOf(ColorPoint) === Point
// true

super 关键字
1. super作为函数调用时，代表父类的构造函数。
class A {}

class B extends A {
  constructor() {
    super();
  }
}

super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。
2. super在类的普通方法中作为访问使用，指向父类的原型对象，方法中的this指向子类实例
class A {
  x = 1;
   constructor() {
     y = 2;
   
  }
  p() {
    return 2;
  }
  say() {
      return this.x
  }
}

class B extends A {
  constructor() {
    x = 2;
    super();
    console.log(super.p()); // 2 父类原型对象中的p方法
    console.log(super.say()); // 2 say中的this指向B super.say.call(this)
    console.log(super.y); // undefined 父类原型对象上不存在y属性
  }
}

let b = new B();

3. super在类的普通方法中作为属性赋值使用，super就是this，赋值的属性会变成子类实例的属性。
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3; // 属性赋值，指向this
    console.log(super.x); // undefined 访问属性，指向父类
    console.log(this.x); // 3
  }
}

let b = new B();

4. 在子类静态方法之中，super作为对象，指向父类，而不是父类的原型对象，this指向当前的子类。
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2

5. 可以在任意一个对象中，使用super关键字。
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]

装饰器
装饰器是一种函数，写成@ + 函数名。它可以放在类和类方法的定义前面。
@frozen class Foo {
  @configurable(false)
  @enumerable(true)
  method() {}

  @throttle(500)
  expensiveMethod() {}
}

上面代码一共使用了四个装饰器，一个用在类本身，另外三个用在类方法。它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能。
类的装饰
装饰器可以用来装饰整个类。
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true

基本上，装饰器的行为就是下面这样。
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;

也就是说，装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。
function testable(target) {
  // ...
}

上面代码中，testable函数的参数target，就是会被装饰的类。
如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false

注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。
前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作。
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true

上面代码中，装饰器函数testable是在目标类的prototype对象上添加属性，因此就可以在实例上调用。
下面是另外一个例子。
// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// main.js
import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'

上面代码通过装饰器mixins，把Foo对象的方法添加到了MyClass的实例上面。可以用Object.assign()模拟这个功能。
const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'

实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);

有了装饰器，就可以改写上面的代码。
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}

相对来说，后一种写法看上去更容易理解。
方法的装饰
装饰器不仅可以装饰类，还可以装饰类的属性。
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}

上面代码中，装饰器readonly用来装饰“类”的name方法。
装饰器函数readonly一共可以接受三个参数。
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);

装饰器第一个参数是类的原型对象，上例是Person.prototype，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时target参数指的是类本身）；第二个参数是所要装饰的属性名，第三个参数是该属性的描述对象。
另外，上面代码说明，装饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。
下面是另一个例子，修改属性描述对象的enumerable属性，使得该属性不可遍历。
class Person {
  @nonenumerable
  get kidCount() { return this.children.length; }
}

function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

下面的@log装饰器，可以起到输出日志的作用。
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);

上面代码中，@log装饰器的作用就是在执行原始的操作之前，执行一次console.log，从而达到输出日志的目的。
装饰器有注释的作用。
@testable
class Person {
  @readonly
  @nonenumerable
  name() { return `${this.first} ${this.last}` }
}

从上面代码中，我们一眼就能看出，Person类是可测试的，而name方法是只读和不可枚举的。
下面是使用 Decorator 写法的组件，看上去一目了然。
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @Prop() first: string;
  @Prop() last: string;
  @State() isVisible: boolean = true;

  render() {
    return (
      <p>Hello, my name is {this.first} {this.last}</p>
    );
  }
}

如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1

上面代码中，外层装饰器@dec(1)先进入，但是内层装饰器@dec(2)先执行。
除了注释，装饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。
为什么装饰器不能用于函数？
装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}

上面的代码，意图是执行后counter等于 1，但是实际上结果是counter等于 0。因为函数提升，使得实际执行的代码是下面这样。
var counter;
var add;

@add
function foo() {
}

counter = 0;

add = function () {
  counter++;
};

下面是另一个例子。
var readOnly = require("some-decorator");

@readOnly
function foo() {
}

上面代码也有问题，因为实际执行是下面这样。
var readOnly;

@readOnly
function foo() {
}

readOnly = require("some-decorator");

总之，由于存在函数提升，使得装饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。
另一方面，如果一定要装饰函数，可以采用高阶函数的形式直接执行。
function doSomething(name) {
  console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

const wrapped = loggingDecorator(doSomething);

core-decorators.js
core-decorators.js是一个第三方模块，提供了几个常见的装饰器，通过它可以更好地理解装饰器。
（1）@autobind
autobind装饰器使得方法中的this对象，绑定原始对象。
import { autobind } from 'core-decorators';

class Person {
  @autobind
  getPerson() {
    return this;
  }
}

let person = new Person();
let getPerson = person.getPerson;

getPerson() === person;
// true

（2）@readonly
readonly装饰器使得属性或方法不可写。
import { readonly } from 'core-decorators';

class Meal {
  @readonly
  entree = 'steak';
}

var dinner = new Meal();
dinner.entree = 'salmon';
// Cannot assign to read only property 'entree' of [object Object]

（3）@override
override装饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。
import { override } from 'core-decorators';

class Parent {
  speak(first, second) {}
}

class Child extends Parent {
  @override
  speak() {}
  // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}

// or

class Child extends Parent {
  @override
  speaks() {}
  // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  //
  //   Did you mean "speak"?
}

（4）@deprecate (别名@deprecated)
deprecate或deprecated装饰器在控制台显示一条警告，表示该方法将废除。
import { deprecate } from 'core-decorators';

class Person {
  @deprecate
  facepalm() {}

  @deprecate('We stopped facepalming')
  facepalmHard() {}

  @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  facepalmHarder() {}
}

let person = new Person();

person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming

person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
//
//     See http://knowyourmeme.com/memes/facepalm for more details.
//

（5）@suppressWarnings
suppressWarnings装饰器抑制deprecated装饰器导致的console.warn()调用。但是，异步代码发出的调用除外。
import { suppressWarnings } from 'core-decorators';

class Person {
  @deprecated
  facepalm() {}

  @suppressWarnings
  facepalmWithoutWarning() {
    this.facepalm();
  }
}

let person = new Person();

person.facepalmWithoutWarning();
// no warning is logged

使用装饰器实现自动发布事件
我们可以使用装饰器，使得对象的方法被调用时，自动发出一个事件。
const postal = require("postal/lib/postal.lodash");

export default function publish(topic, channel) {
  const channelName = channel || '/';
  const msgChannel = postal.channel(channelName);
  msgChannel.subscribe(topic, v => {
    console.log('频道: ', channelName);
    console.log('事件: ', topic);
    console.log('数据: ', v);
  });

  return function(target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function() {
      let value = fn.apply(this, arguments);
      msgChannel.publish(topic, value);
    };
  };
}

上面代码定义了一个名为publish的装饰器，它通过改写descriptor.value，使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是Postal.js。
它的用法如下。
// index.js
import publish from './publish';

class FooComponent {
  @publish('foo.some.message', 'component')
  someMethod() {
    return { my: 'data' };
  }
  @publish('foo.some.other')
  anotherMethod() {
    // ...
  }
}

let foo = new FooComponent();

foo.someMethod();
foo.anotherMethod();

以后，只要调用someMethod或者anotherMethod，就会自动发出一个事件。
$ bash-node index.js
频道:  component
事件:  foo.some.message
数据:  { my: 'data' }

频道:  /
事件:  foo.some.other
数据:  undefined

Mixin
在装饰器的基础上，可以实现Mixin模式。所谓Mixin模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。
请看下面的例子。
const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'

上面代码之中，对象Foo有一个foo方法，通过Object.assign方法，可以将foo方法“混入”MyClass类，导致MyClass的实例obj对象都具有foo方法。这就是“混入”模式的一个简单实现。
下面，我们部署一个通用脚本mixins.js，将 Mixin 写成一个装饰器。
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

然后，就可以使用上面这个装饰器，为类“混入”各种方法。
import { mixins } from './mixins';

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // "foo"

通过mixins这个装饰器，实现了在MyClass类上面“混入”Foo对象的foo方法。
不过，上面的方法会改写MyClass类的prototype对象，如果不喜欢这一点，也可以通过类的继承实现 Mixin。
class MyClass extends MyBaseClass {
  /* ... */
}

上面代码中，MyClass继承了MyBaseClass。如果我们想在MyClass里面“混入”一个foo方法，一个办法是在MyClass和MyBaseClass之间插入一个混入类，这个类具有foo方法，并且继承了MyBaseClass的所有方法，然后MyClass再继承这个类。
let MyMixin = (superclass) => class extends superclass {
  foo() {
    console.log('foo from MyMixin');
  }
};

上面代码中，MyMixin是一个混入类生成器，接受superclass作为参数，然后返回一个继承superclass的子类，该子类包含一个foo方法。
接着，目标类再去继承这个混入类，就达到了“混入”foo方法的目的。
class MyClass extends MyMixin(MyBaseClass) {
  /* ... */
}

let c = new MyClass();
c.foo(); // "foo from MyMixin"

如果需要“混入”多个方法，就生成多个混入类。
class MyClass extends Mixin1(Mixin2(MyBaseClass)) {
  /* ... */
}

这种写法的一个好处，是可以调用super，因此可以避免在“混入”过程中覆盖父类的同名方法。
let Mixin1 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin1');
    if (super.foo) super.foo();
  }
};

let Mixin2 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin2');
    if (super.foo) super.foo();
  }
};

class S {
  foo() {
    console.log('foo from S');
  }
}

class C extends Mixin1(Mixin2(S)) {
  foo() {
    console.log('foo from C');
    super.foo();
  }
}

上面代码中，每一次混入发生时，都调用了父类的super.foo方法，导致父类的同名方法没有被覆盖，行为被保留了下来。
new C().foo()
// foo from C
// foo from Mixin1
// foo from Mixin2
// foo from S

Trait
Trait 也是一种装饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。
下面采用traits-decorator这个第三方模块作为例子。这个模块提供的traits装饰器，不仅可以接受对象，还可以接受 ES6 类作为参数。
import { traits } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') }
};

@traits(TFoo, TBar)
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar

上面代码中，通过traits装饰器，在MyClass类上面“混入”了TFoo类的foo方法和TBar对象的bar方法。
Trait 不允许“混入”同名方法。
import { traits } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

@traits(TFoo, TBar)
class MyClass { }
// 报错
// throw new Error('Method named: ' + methodName + ' is defined twice.');
//        ^
// Error: Method named: foo is defined twice.

上面代码中，TFoo和TBar都有foo方法，结果traits装饰器报错。
一种解决方法是排除TBar的foo方法。
import { traits, excludes } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

@traits(TFoo, TBar::excludes('foo'))
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar

上面代码使用绑定运算符（::）在TBar上排除foo方法，混入时就不会报错了。
另一种方法是为TBar的foo方法起一个别名。
import { traits, alias } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

@traits(TFoo, TBar::alias({foo: 'aliasFoo'}))
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.aliasFoo() // foo
obj.bar() // bar

上面代码为TBar的foo方法起了别名aliasFoo，于是MyClass也可以混入TBar的foo方法了。
alias和excludes方法，可以结合起来使用。
@traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
class MyClass {}

上面代码排除了TExample的foo方法和bar方法，为baz方法起了别名exampleBaz。
as方法则为上面的代码提供了另一种写法。
@traits(TExample::as({excludes:['foo', 'bar'], alias: {baz: 'exampleBaz'}}))
class MyClass {}

Promise 对象
构造函数使用
ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

原型方法
Promise.prototype.then()
then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});

Promise.prototype.catch()
Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});

- 如果 Promise 状态已经变成resolved，再抛出错误是无效的。
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok

- Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});

- 跟传统的try/catch代码块不同的是，如果没有使用catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123

Promise.prototype.finally()
finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});

finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
finally方法总是会返回原来的值。
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})

构造函数方法
Promise.all()
Promise.all()方法用于将多个 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，包装成一个新的 Promise 实例。
const p = Promise.all([p1, p2, p3]);

Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
p的状态确定 
1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数
注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]

Promise.race()
Promise.race()方法接收多个 Promise 实例，包装成一个新的 Promise 实例，只要有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理
const p = Promise.race([p1, p2, p3]);

Promise.allSettled()
Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。无论传入的promise是fulfilled还是rejected，返回的新的实例总是fulfilled，新实例回调的参数是传入allsettled函数的promise，当我们只关注状态不关注值的时候，这个方法很有用
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();

Promise.any()
该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
Promise.any()跟Promise.race()方法很像，只有一点不同，就是不会因为某个 Promise 变成rejected状态而结束。
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];
try {
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
  console.log(error);
}

Promise.resolve()
有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
const jsPromise = Promise.resolve($.ajax('/whatever.json'));

上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。
Promise.resolve()等价于下面的写法。
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

Promise.resolve()方法的参数分成四种情况。
（1）参数是一个 Promise 实例
如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
（2）参数是一个thenable对象
thenable对象指的是具有then方法的对象，比如下面这个对象。
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法。
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});

上面代码中，thenable对象的then()方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then()方法指定的回调函数，输出42。
（3）参数不是具有then()方法的对象，或根本就不是对象
如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved。
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello

上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数。
（4）不带有任何参数
Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。
const p = Promise.resolve();

p.then(function () {
  // ...
});

上面代码的变量p就是一个 Promise 对象。
需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three

上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
Promise.reject()
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了

上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。
Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true

上面代码中，Promise.reject()方法的参数是一个字符串，后面catch()方法的参数e就是这个字符串。
应用
加载图片
我们可以将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};

Generator 函数与 Promise 的结合
使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);

上面代码的 Generator 函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。
Promise.try()
实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。一般就会采用下面的写法。
Promise.resolve().then(f)

上面的写法有一个缺点，就是如果f是同步函数，那么它会在本轮事件循环的末尾执行。
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now

上面代码中，函数f是同步的，但是用 Promise 包装了以后，就变成异步执行了。
那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用async函数来写。
const f = () => console.log('now');
(async () => f())();
console.log('next');
// now
// next

上面代码中，第二行是一个立即执行的匿名函数，会立即执行里面的async函数，因此如果f是同步的，就会得到同步的结果；如果f是异步的，就可以用then指定下一步，就像下面的写法。
(async () => f())()
.then(...)

需要注意的是，async () => f()会吃掉f()抛出的错误。所以，如果想捕获错误，要使用promise.catch方法。
(async () => f())()
.then(...)
.catch(...)

第二种写法是使用new Promise()。
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now
// next

上面代码也是使用立即执行的匿名函数，执行new Promise()。这种情况下，同步函数也是同步执行的。
鉴于这是一个很常见的需求，所以现在有一个提案，提供Promise.try方法替代上面的写法。
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next

事实上，Promise.try存在已久，Promise 库BluebirdBluebird、QQ和whenwhen，早就提供了这个方法。
由于Promise.try为所有操作提供了统一的处理机制，所以如果想用then方法管理流程，最好都用Promise.try包装一下。这样有许多好处，其中一点就是可以更好地管理异常。
function getUsername(userId) {
  return database.users.get({id: userId})
  .then(function(user) {
    return user.name;
  });
}

上面代码中，database.users.get()返回一个 Promise 对象，如果抛出异步错误，可以用catch方法捕获，就像下面这样写。
database.users.get({id: userId})
.then(...)
.catch(...)

但是database.users.get()可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用try...catch去捕获。
try {
  database.users.get({id: userId})
  .then(...)
  .catch(...)
} catch (e) {
  // ...
}

上面这样的写法就很笨拙了，这时就可以统一用promise.catch()捕获所有同步和异步的错误。
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)

事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。

async 函数
含义
async 函数是什么？一句话，它就是 Generator 函数的语法糖。
async函数对 Generator 函数的改进，体现在以下四点。
1. 内置执行器。
Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
asyncReadFile();

2. 更好的语义。
async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
3. 更广的适用性。
co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
4. 返回值是 Promise。
async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
语法
async函数的语法规则总体上比较简单，难点是错误处理机制。
返回值
async函数返回一个 Promise 对象。
async函数内部return语句返回的值，会成为then方法回调函数的参数。
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log('resolve', v),
  e => console.log('reject', e)
)
//reject Error: 出错了

async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
await 命令
正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
实际是将返回的值使用resolvePromise（p,value,resolve,reject）
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123

await命令后面的 Promise 对象如果变为reject状态，整个async函数都会中断执行，reject的参数会被catch方法的回调函数接收到。
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了

阻止中断执行的方式 
1. 使用try...catch可以使后面的异步操作继续执行
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world

2. await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world

顶层 await
根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。
// 报错
const data = await fetch('https://api.example.com');

上面代码中，await命令独立使用，没有放在 async 函数里面，就会报错。
目前，有一个语法提案，允许在模块的顶层独立使用await命令，使得上面那行代码不会报错了。这个提案的目的，是借用await解决模块异步加载的问题。
// awaiting.js
let output;
async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
}
main();
export { output };

上面代码中，模块awaiting.js的输出值output，取决于异步操作。我们把异步操作包装在一个 async 函数里面，然后调用这个函数，只有等里面的异步操作都执行，变量output才会有值，否则就返回undefined。
上面的代码也可以写成立即执行函数的形式。
// awaiting.js
let output;
(async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})();
export { output };

下面是加载这个模块的写法。
// usage.js
import { output } from "./awaiting.js";

function outputPlusValue(value) { return output + value }

console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100), 1000);

上面代码中，outputPlusValue()的执行结果，完全取决于执行的时间。如果awaiting.js里面的异步操作没执行完，加载进来的output的值就是undefined。
目前的解决方法，就是让原始模块输出一个 Promise 对象，从这个 Promise 对象判断异步操作有没有结束。
// awaiting.js
let output;
export default (async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})();
export { output };

上面代码中，awaiting.js除了输出output，还默认输出一个 Promise 对象（async 函数立即执行后，返回一个 Promise 对象），从这个对象判断异步操作是否结束。
下面是加载这个模块的新的写法。
// usage.js
import promise, { output } from "./awaiting.js";

function outputPlusValue(value) { return output + value }

promise.then(() => {
  console.log(outputPlusValue(100));
  setTimeout(() => console.log(outputPlusValue(100), 1000);
});

上面代码中，将awaiting.js对象的输出，放在promise.then()里面，这样就能保证异步操作完成以后，才去读取output。
这种写法比较麻烦，等于要求模块的使用者遵守一个额外的使用协议，按照特殊的方法使用这个模块。一旦你忘了要用 Promise 加载，只使用正常的加载方法，依赖这个模块的代码就可能出错。而且，如果上面的usage.js又有对外的输出，等于这个依赖链的所有模块都要使用 Promise 加载。
顶层的await命令，就是为了解决这个问题。它保证只有异步操作完成，模块才会输出值。
// awaiting.js
const dynamic = import(someMission);
const data = fetch(url);
export const output = someProcess((await dynamic).default, await data);

上面代码中，两个异步操作在输出的时候，都加上了await命令。只有等到异步操作完成，这个模块才会输出值。
加载这个模块的写法如下。
// usage.js
import { output } from "./awaiting.js";
function outputPlusValue(value) { return output + value }

console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100), 1000);

上面代码的写法，与普通的模块加载完全一样。也就是说，模块的使用者完全不用关心，依赖模块的内部有没有异步操作，正常加载即可。
这时，模块的加载会等待依赖模块（上例是awaiting.js）的异步操作完成，才执行后面的代码，有点像暂停在那里。所以，它总是会得到正确的output，不会因为加载时机的不同，而得到不一样的值。
注意，顶层await只能用在 ES6 模块，不能用在 CommonJS 模块。这是因为 CommonJS 模块的require()是同步加载，如果有顶层await，就没法处理加载了。
下面是顶层await的一些使用场景。
// import() 方法加载
const strings = await import(`/i18n/${navigator.language}`);

// 数据库操作
const connection = await dbConnector();

// 依赖回滚
let jQuery;
try {
  jQuery = await import('https://cdn-a.com/jQuery');
} catch {
  jQuery = await import('https://cdn-b.com/jQuery');
}

注意，如果加载多个包含顶层await命令的模块，加载命令是同步执行的。
// x.js
console.log("X1");
await new Promise(r => setTimeout(r, 1000));
console.log("X2");

// y.js
console.log("Y");

// z.js
import "./x.js";
import "./y.js";
console.log("Z");

上面代码有三个模块，最后的z.js加载x.js和y.js，打印结果是X1、Y、X2、Z。这说明，z.js并没有等待x.js加载完成，再去加载y.js。
顶层的await命令有点像，交出代码的执行权给其他的模块加载，等异步操作完成后，再拿回执行权，继续向下执行。
Module 
概述
ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
// ES6模块
import { stat, exists, readFile } from 'fs';

这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
除了静态加载带来的各种好处，ES6 模块还有以下好处。
- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。
严格模式
ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
严格模式主要有以下限制。
- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）
其中，尤其需要注意this的限制。ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。
export 命令
一个模块就是一个独立的文件。export命令输出变量。
输出变量写法 
1. 直接在声明出输出
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

2. 集中通过接口输出
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };

3. 集中使用别名输出
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

4. 默认导出
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;

注意点 
1. export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

2. export命令必须处于模块顶层
function foo() {
  export default 'bar' // SyntaxError
}
foo()

import 命令
输入变量写法
1. 通过接口名输入
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

2. 为接口输入定义别名
import { lastName as surname } from './profile.js';

3. 执行所加载的模块，多次重复执行同一句import语句，那么只会执行一次
import 'lodash';

4. 整体加载。
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));

注意点 
1. import命令输入的变量都是只读的，不允许在加载模块的脚本里面，改写接口。
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;

2. import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
import { myMethod } from 'util';

3. import命令具有提升效果，会提升到整个模块的头部，首先执行。
foo();

import { foo } from 'my_module';

import命令是编译阶段执行的，在代码运行之前。
4. 不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}

5. 加载相同模块不会执行多次。
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';

export 与 import 的复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
export { foo as myFoo , bar } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认输出
export { default } from 'foo';

具名接口与默认接口互改。
// 具名输出改为默认输出
export { es6 as default } from './someModule';
// 默认输出改为具名输出
export { default as es6 } from './someModule';
// 整体输出改为具名输出
export * as ns from "mod";

import()
ES2020提案 引入import()函数，支持动态加载模块。
import(specifier)

Module 的加载实现
浏览器加载
浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
<script type="module" src="./foo.js"></script>

上面代码在网页中插入一个模块foo.js，由于type属性设为module，所以浏览器知道这是一个 ES6 模块。
浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。
ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
<script type="module">
  import utils from "./utils.js";

  // other code
</script>

ES6的模块加载方法
JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
CommonJS 模块的加载方法
CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}

上面代码就是 Node 内部加载模块后生成的一个对象。该对象的id属性是模块名，exports属性是模块输出的各个接口，loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。
以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
CommonJS与ES6模块使用
node加载模块方式
.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置，如果为module，按ES6模块加载，如果没有type字段，按CommonJS加载。
CommonJS 模块加载 ES6 模块
CommonJS 的require()命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。
(async () => {
  await import('./my-app.mjs');
})();

ES6 模块加载 CommonJS 模块
ES6 模块的import命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';

加载单一的输出项，可以写成下面这样。
import packageMain from 'commonjs-package';
const { method } = packageMain;

同时支持两种格式的模块
如果原始模块是 ES6 格式，那么需要给出一个整体输出接口，比如export default obj，使得 CommonJS 可以用import()进行加载。
如果原始模块是 CommonJS 格式，那么可以加一个包装层。
import cjsModule from '../index.js';
export const foo = cjsModule.foo;

你可以把这个文件的后缀名改为.mjs，或者将它放在一个子目录，再在这个子目录里面放一个单独的package.json文件，指明{ type: "module" }。
另一种做法是在package.json文件的exports字段，指明两种格式模块各自的加载入口。
"exports"：{
  "require": "./index.js"，
  "import": "./esm/wrapper.js"
}

上面代码指定require()和import，加载该模块会自动切换到不一样的入口文件。
Node.js 的内置模块
Node.js 的内置模块可以整体加载，也可以加载指定的输出项。
// 整体加载
import EventEmitter from 'events';
const e = new EventEmitter();

// 加载指定的输出项
import { readFile } from 'fs';
readFile('./foo.txt', (err, source) => {
  if (err) {
    console.error(err);
  } else {
    console.log(source);
  }
});

ES6 模块与 CommonJS 模块的差异
1. CommonJS 模块是运行时同步加载，ES6 模块是编译时异步加载并输出接口。
2. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
循环加载
CommonJS 模块的循环加载
CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
让我们来看，Node 官方文档里面的例子。脚本文件a.js代码如下。
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');

上面代码之中，a.js脚本先输出一个done变量，然后加载另一个脚本文件b.js。注意，此时a.js代码就停在这里，等待b.js执行完毕，再往下执行。
再看b.js的代码。
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');

上面代码之中，b.js执行到第二行，就会去加载a.js，这时，就发生了“循环加载”。系统会去a.js模块对应对象的exports属性取值，可是因为a.js还没有执行完，从exports属性只能取回已经执行的部分，而不是最后的值。
a.js已经执行的部分，只有一行。
exports.done = false;

因此，对于b.js来说，它从a.js只输入一个变量done，值为false。
然后，b.js接着往下执行，等到全部执行完毕，再把执行权交还给a.js。于是，a.js接着往下执行，直到执行完毕。我们写一个脚本main.js，验证这个过程。
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);

执行main.js，运行结果如下。
$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true

上面的代码证明了两件事。一是，在b.js之中，a.js没有执行完毕，只执行了第一行。二是，main.js执行到第二行时，不会再次执行b.js，而是输出缓存的b.js的执行结果，即它的第四行。
exports.done = true;

总之，CommonJS 输入的是被输出值的拷贝，不是引用。
另外，由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};

上面代码中，如果发生循环加载，require('a').foo的值很可能后面会被改写，改用require('a')会更保险一点。
ES6 模块的循环加载
ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。
请看下面这个例子。
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';

上面代码中，a.mjs加载b.mjs，b.mjs又加载a.mjs，构成循环加载。执行a.mjs，结果如下。
$ node --experimental-modules a.mjs
b.mjs
ReferenceError: foo is not defined

上面代码中，执行a.mjs以后会报错，foo变量未定义，这是为什么？
让我们一行行来看，ES6 循环加载是怎么处理的。首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。接着，执行b.mjs的时候，已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行。执行到第三行console.log(foo)的时候，才发现这个接口根本没定义，因此报错。
解决这个问题的方法，就是让b.mjs运行的时候，foo已经有定义了。这可以通过将foo写成函数来解决。
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};

这时再执行a.mjs就可以得到预期结果。
$ node --experimental-modules a.mjs
b.mjs
foo
a.mjs
bar

这是因为函数具有提升作用，在执行import {bar} from './b'时，函数foo就已经有定义了，所以b.mjs加载的时候不会报错。这也意味着，如果把函数foo改写成函数表达式，也会报错。
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
const foo = () => 'foo';
export {foo};

上面代码的第四行，改成了函数表达式，就不具有提升作用，执行就会报错。
我们再来看 ES6 模块加载器SystemJS给出的一个例子。
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n !== 0 && even(n - 1);
}

上面代码中，even.js里面的函数even有一个参数n，只要不等于 0，就会减去 1，传入加载的odd()。odd.js也会做类似操作。
运行上面这段代码，结果如下。
$ babel-node
> import * as m from './even.js';
> m.even(10);
true
> m.counter
6
> m.even(20)
true
> m.counter
17

上面代码中，参数n从 10 变为 0 的过程中，even()一共会执行 6 次，所以变量counter等于 6。第二次调用even()时，参数n从 20 变为 0，even()一共会执行 11 次，加上前面的 6 次，所以变量counter等于 17。
这个例子要是改写成 CommonJS，就根本无法执行，会报错。
// even.js
var odd = require('./odd');
var counter = 0;
exports.counter = counter;
exports.even = function (n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
var even = require('./even').even;
module.exports = function (n) {
  return n != 0 && even(n - 1);
}

上面代码中，even.js加载odd.js，而odd.js又去加载even.js，形成“循环加载”。这时，执行引擎就会输出even.js已经执行的部分（不存在任何结果），所以在odd.js之中，变量even等于undefined，等到后面调用even(n - 1)就会报错。
$ node
> var m = require('./even');
> m.even(10)
TypeError: even is not a function

package.json
main 字段
package.json文件中使用main字段，指定模块加载的入口文件。
// ./node_modules/es-module-package/package.json
{
  "type": "module",
  "main": "./src/index.js"
}

然后，import命令就可以加载这个模块。
// ./my-app.mjs

import { something } from 'es-module-package';
// 实际加载的是 ./node_modules/es-module-package/src/index.js

exports 字段
exports字段的优先级高于main字段。它有多种用法。
1. 脚本别名
package.json文件的exports字段可以指定脚本或子目录的别名。
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./submodule": "./src/submodule.js"
  }
}

上面的代码指定src/submodule.js别名为submodule，然后就可以从别名加载这个文件。
import submodule from 'es-module-package/submodule';
// 加载 ./node_modules/es-module-package/src/submodule.js

2. 子目录别名
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/": "./src/features/"
  }
}

import feature from 'es-module-package/features/x.js';
// 加载 ./node_modules/es-module-package/src/features/x.js

如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。
// 报错
import submodule from 'es-module-package/private-module.js';

// 不报错
import submodule from './node_modules/es-module-package/private-module.js';

3. main 的别名
exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，并且可以直接简写成exports字段的值。
{
  "exports": {
    ".": "./main.js"
  }
}

// 等同于
{
  "exports": "./main.js"
}

由于exports字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。
{
  "main": "./main-legacy.cjs",
  "exports": {
    ".": "./main-modern.cjs"
  }
}

4. 条件加载
利用.这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。目前，这个功能需要在 Node.js 运行的时候，打开--experimental-conditional-exports标志。
{
  "type": "module",
  "exports": {
    ".": {
      "require": "./main.cjs",
      "default": "./main.js"
    }
  }
}

上面代码中，别名.的require条件指定require()命令的入口文件（即 CommonJS 的入口），default条件指定其他情况的入口（即 ES6 的入口）。
上面的写法可以简写如下。
{
  "exports": {
    "require": "./main.cjs",
    "default": "./main.js"
  }
}

注意，如果同时还有其他别名，就不能采用简写，否则或报错。
{
  // 报错
  "exports": {
    "./feature": "./lib/feature.js",
    "require": "./main.cjs",
    "default": "./main.js"
  }
}
```
