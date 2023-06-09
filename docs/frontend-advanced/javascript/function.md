# 函数

作用域
什么是作用域
作用域定义了变量和其他资源的可访问性，内层作用域可以访问外层作用域
作用域的类型

1. 全局作用域：全局作用域是在任何地方都能访问的作用域，以下几种情形有全局作用域

- 定义在最外层的变量
- 未经声明而进行赋值的变量
- window对象下的属性

2. 函数作用域：函数内部声明的变量
3. 块级作用域：ES6中提出了块级作用域，通过let和const体现
什么是作用域链
作用域链体现的是作用域的关系，代码在当前作用域中没有找到变量（自有变量），会向上层查找，直到顶层作用域位置
什么是闭包
闭包是能访问外层作用域的函数
缺点 ：闭包会携带外层作用域，消耗内存，容易造成内存泄漏
this指向
this是什么
JavaScript 语言之所以有 this 的设计，跟内存里面的数据结构有关系。
var obj = { foo:  5 };

上面的代码将一个对象赋值给变量obj。JavaScript 引擎会先在内存里面，生成一个对象{ foo: 5 }，然后把这个对象的内存地址赋值给变量obj。也就是说，变量obj是一个地址（reference）。后面如果要读取obj.foo，引擎先从obj拿到内存地址，然后再从该地址读出原始的对象，返回它的foo属性。
原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，上面例子的foo属性，实际上是以下面的形式保存的。
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}

注意，foo属性的值保存在属性描述对象的value属性里面。
这样的结构是很清晰的，问题在于属性的值可能是一个函数。
var obj = { foo: function () {} };

这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性。
{
  foo: {
    [[value]]: 函数的地址
    ...
  }
}

由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。
var f = function () {};
var obj = { f: f };

// 单独执行
f()

// obj 环境执行
obj.f()

JavaScript 允许在函数体内部，引用当前环境的其他变量。
var f = function () {
  console.log(x);
};

上面代码中，函数体里面使用了变量x。该变量由运行环境提供。
现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境 （上下文对象，不是作用域对象）。
var f = function () {
  console.log(this.x);
}

上面代码中，函数体里面的this.x就是指当前运行环境的x。
var f = function () {
  console.log(this.x);
}

var x = 1;
var obj = {
  f: f,
  x: 2,
};

// 单独执行
f() // 1

// obj 环境执行
obj.f() // 2

上面代码中，函数f在全局环境执行，this.x指向全局环境的x；在obj环境执行，this.x指向obj.x。
全局中的this
全局环境使用this，它指的就是顶层对象window。
this === window // true

function f() {
  console.log(this === window);
}
f() // true

上面代码说明，不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window。
函数中的this
独立函数调用-->默认绑定
在任何环境中通过函数名+（）的形式调用，这时，this的指向跟js代码的运行模式有关

- 在混杂模式下，this指向全局的window
- 在严格模式下，this指向undefined

作为对象的方法--> 隐式绑定
如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向。

但是，这条规则很不容易把握。请看下面的代码。
var obj ={
  foo: function () {
    console.log(this);
  }
};

obj.foo() // obj

上面代码中，obj.foo方法执行时，它内部的this指向obj。
但是，下面这几种用法，都会改变this的指向。
// 情况一
(obj.foo = obj.foo)() // window
// 情况二
(false || obj.foo)() // window
// 情况三
(1, obj.foo)() // window

上面代码中，obj.foo就是一个值。这个值真正调用的时候，运行环境已经不是obj了，而是全局环境，所以this不再指向obj。
可以这样理解，JavaScript 引擎内部，obj和obj.foo储存在两个内存地址，称为地址一和地址二。obj.foo()这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this指向obj。但是，上面三种情况，都是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此this指向全局环境。上面三种情况等同于下面的代码。
// 情况一
(obj.foo = function () {
  console.log(this);
})()
// 等同于
(function () {
  console.log(this);
})()

// 情况二
(false || function () {
  console.log(this);
})()

// 情况三
(1, function () {
  console.log(this);
})()

如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层。
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};

a.b.m() // undefined

上面代码中，a.b.m方法在a对象的第二层，该方法内部的this不是指向a，而是指向a.b，因为实际执行的是下面的代码。
var b = {
  m: function() {
   console.log(this.p);
  }
};

var a = {
  p: 'Hello',
  b: b
};

(a.b).m() // 等同于 b.m()

如果要达到预期效果，只有写成下面这样。
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

如果这时将嵌套对象内部的方法赋值给一个变量，this依然会指向全局对象。
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

var hello = a.b.m;
hello() // undefined

上面代码中，m是多层对象内部的一个方法。为求简便，将其赋值给hello变量，结果调用时，this指向了顶层对象。为了避免这个问题，可以只将m所在的对象赋值给hello，这样调用时，this的指向就不会变。
var hello = a.b;
hello.m() // Hello

作为构造函数调用-->new绑定
构造函数中的this，指的是实例对象。
var Obj = function (p) {
  this.p = p;
};

上面代码定义了一个构造函数Obj。由于this指向实例对象，所以在构造函数内部定义this.p，就相当于定义实例对象有一个p属性。
var o = new Obj('Hello World!');
o.p // "Hello World!"

使用注意点
通过call、apply、bind调用-->显式绑定

1. Function.prototype.call()
函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。
var obj = {};

var f = function () {
  return this;
};

f() === window // true
f.call(obj) === obj // true

上面代码中，全局环境运行函数f时，this指向全局环境（浏览器为window对象）；call方法可以改变this的指向，指定this指向对象obj，然后在对象obj的作用域中运行函数f。
call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。
var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456

上面代码中，a函数中的this关键字，如果指向全局对象，返回结果为123。如果使用call方法将this关键字指向obj对象，返回结果为456。可以看到，如果call方法没有参数，或者参数为null或undefined，则等同于指向全局对象。
如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法。
var f = function () {
  return this;
};

f.call(5)
// Number {[[PrimitiveValue]]: 5}

上面代码中，call的参数为5，不是对象，会被自动转成包装对象（Number的实例），绑定f内部的this。
call方法还可以接受多个参数。
func.call(thisValue, arg1, arg2, ...)

call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。
function add(a, b) {
  return a + b;
}

add.call(this, 1, 2) // 3

上面代码中，call方法指定函数add内部的this绑定当前环境（对象），并且参数为1和2，因此函数add运行后得到3。
call方法的一个应用是调用对象的原生方法。
var obj = {};
obj.hasOwnProperty('toString') // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false

上面代码中，hasOwnProperty是obj对象继承的方法，如果这个方法一旦被覆盖，就不会得到正确结果。call方法可以解决这个问题，它将hasOwnProperty方法的原始定义放到obj对象上执行，这样无论obj上有没有同名方法，都不会影响结果。

2. Function.prototype.apply()
apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。
func.apply(thisValue, [arg1, arg2, ...])

apply方法的第一个参数也是this所要指向的那个对象，如果设为null或undefined，则等同于指定全局对象。第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。原函数的参数，在call方法中必须一个个添加，但是在apply方法中，必须以数组形式添加。
function f(x, y){
  console.log(x + y);
}

f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2

上面代码中，f函数本来接受两个参数，使用apply方法以后，就变成可以接受一个数组作为参数。
利用这一点，可以做一些有趣的应用。
（1）找出数组最大元素
JavaScript 不提供找出数组最大元素的函数。结合使用apply方法和Math.max方法，就可以返回数组的最大元素。
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a) // 15

（2）将数组的空元素变为undefined
通过apply方法，利用Array构造函数将数组的空元素变成undefined。
Array.apply(null, ['a', ,'b'])
// [ 'a', undefined, 'b' ]

空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined。因此，遍历内部元素的时候，会得到不同的结果。
var a = ['a', , 'b'];

function print(i) {
  console.log(i);
}

a.forEach(print)
// a
// b

Array.apply(null, a).forEach(print)
// a
// undefined
// b

（3）转换类似数组的对象
另外，利用数组对象的slice方法，可以将一个类似数组的对象（比如arguments对象）转为真正的数组。
Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]

上面代码的apply方法的参数都是对象，但是返回结果都是数组，这就起到了将对象转成数组的目的。从上面代码可以看到，这个方法起作用的前提是，被处理的对象必须有length属性，以及相对应的数字键。
（4）绑定回调函数的对象
前面的按钮点击事件的例子，可以改写如下。
var o = new Object();

o.f = function () {
  console.log(this === o);
}

var f = function (){
  o.f.apply(o);
  // 或者 o.f.call(o);
};

// jQuery 的写法
$('#button').on('click', f);

上面代码中，点击按钮以后，控制台将会显示true。由于apply()方法（或者call()方法）不仅绑定函数执行时所在的对象，还会立即执行函数，因此不得不把绑定语句写在一个函数体内。更简洁的写法是采用下面介绍的bind()方法。
显式绑定传入null或者undefined
传入null或者undefined将被忽略，会当做默认绑定处理
3. Function.prototype.bind()
bind()方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。
var d = new Date();
d.getTime() // 1481869925657

var print = d.getTime;
print() // Uncaught TypeError: this is not a Date object.

上面代码中，我们将d.getTime()方法赋给变量print，然后调用print()就报错了。这是因为getTime()方法内部的this，绑定Date对象的实例，赋给变量print以后，内部的this已经不指向Date对象的实例了。
bind()方法可以解决这个问题。
var print = d.getTime.bind(d);
print() // 1481869925657

上面代码中，bind()方法将getTime()方法内部的this绑定到d对象，这时就可以安全地将这个方法赋值给其他变量了。
bind方法的参数就是所要绑定this的对象，下面是一个更清晰的例子。
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1

上面代码中，counter.inc()方法被赋值给变量func。这时必须用bind()方法将inc()内部的this，绑定到counter，否则就会出错。
this绑定到其他对象也是可以的。
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var obj = {
  count: 100
};
var func = counter.inc.bind(obj);
func();
obj.count // 101

上面代码中，bind()方法将inc()方法内部的this，绑定到obj对象。结果调用func函数以后，递增的就是obj内部的count属性。
bind()还可以接受更多的参数，将这些参数绑定原函数的参数。
var add = function (x, y) {
  return x *this.m + y* this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);
newAdd(5) // 20

上面代码中，bind()方法除了绑定this对象，还将add()函数的第一个参数x绑定成5，然后返回一个新函数newAdd()，这个函数只要再接受一个参数y就能运行了。
如果bind()方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window）。
function add(x, y) {
  return x + y;
}

var plus5 = add.bind(null, 5);
plus5(10) // 15

上面代码中，函数add()内部并没有this，使用bind()方法的主要目的是绑定参数x，以后每次运行新函数plus5()，就只需要提供另一个参数y就够了。而且因为add()内部没有this，所以bind()的第一个参数是null，不过这里如果是其他对象，也没有影响。
bind()方法有一些使用注意点。
（1）每一次返回一个新函数
bind()方法每运行一次，就返回一个新函数，这会产生一些问题。比如，监听事件的时候，不能写成下面这样。
element.addEventListener('click', o.m.bind(o));

上面代码中，click事件绑定bind()方法生成的一个匿名函数。这样会导致无法取消绑定，所以下面的代码是无效的。
element.removeEventListener('click', o.m.bind(o));

正确的方法是写成下面这样：
var listener = o.m.bind(o);
element.addEventListener('click', listener);
//  ...
element.removeEventListener('click', listener);

（2）结合回调函数使用
回调函数是 JavaScript 最常用的模式之一，但是一个常见的错误是，将包含this的方法直接当作回调函数。解决方法就是使用bind()方法，将counter.inc()绑定counter。
var counter = {
  count: 0,
  inc: function () {
    'use strict';
    this.count++;
  }
};

function callIt(callback) {
  callback();
}

callIt(counter.inc.bind(counter));
counter.count // 1

上面代码中，callIt()方法会调用回调函数。这时如果直接把counter.inc传入，调用时counter.inc()内部的this就会指向全局对象。使用bind()方法将counter.inc绑定counter以后，就不会有这个问题，this总是指向counter。
还有一种情况比较隐蔽，就是某些数组方法可以接受一个函数当作参数。这些函数内部的this指向，很可能也会出错。
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) {
      console.log(this.name);
    });
  }
};

obj.print()
// 没有任何输出

上面代码中，obj.print内部this.times的this是指向obj的，这个没有问题。但是，forEach()方法的回调函数内部的this.name却是指向全局对象，导致没有办法取到值。稍微改动一下，就可以看得更清楚。
obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this === window);
  });
};

obj.print()
// true
// true
// true

解决这个问题，也是通过bind()方法绑定this。
obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this.name);
  }.bind(this));
};

obj.print()
// 张三
// 张三
// 张三

（3）结合call()方法使用
利用bind()方法，可以改写一些 JavaScript 原生方法的使用形式，以数组的slice()方法为例。
[1, 2, 3].slice(0, 1) // [1]
// 等同于
Array.prototype.slice.call([1, 2, 3], 0, 1) // [1]

上面的代码中，数组的slice方法从[1, 2, 3]里面，按照指定的开始位置和结束位置，切分出另一个数组。这样做的本质是在[1, 2, 3]上面调用Array.prototype.slice()方法，因此可以用call方法表达这个过程，得到同样的结果。
call()方法实质上是调用Function.prototype.call()方法，因此上面的表达式可以用bind()方法改写。
var slice = Function.prototype.call.bind(Array.prototype.slice);
slice([1, 2, 3], 0, 1) // [1]

上面代码的含义就是，将Array.prototype.slice变成Function.prototype.call方法所在的对象，调用时就变成了Array.prototype.slice.call。类似的写法还可以用于其他数组方法。
var push = Function.prototype.call.bind(Array.prototype.push);
var pop = Function.prototype.call.bind(Array.prototype.pop);

var a = [1 ,2 ,3];
push(a, 4)
a // [1, 2, 3, 4]

pop(a)
a // [1, 2, 3]

如果再进一步，将Function.prototype.call方法绑定到Function.prototype.bind对象，就意味着bind的调用形式也可以被改写。
function f() {
  console.log(this.v);
}

var o = { v: 123 };
var bind = Function.prototype.call.bind(Function.prototype.bind);
bind(f, o)() // 123

上面代码的含义就是，将Function.prototype.bind方法绑定在Function.prototype.call上面，所以bind方法就可以直接使用，不需要在函数实例上使用。
箭头函数中的this
ES6新增的箭头函数中的this执行箭头函数定义时外层的执行环境
箭头函数的this无法修改，通过也不能作为构造函数调用
绑定方式的优先级
new绑定 > 显式绑定 > 隐式绑定 > 默认绑定
编程范式
面向过程
面向过程编程是一个基本的编程风格（关注的是动词），其表现形式为通过一个一个的步骤（函数）来实现我们的功能，但是在程序的执行过程中会产生很多临时的变量，同时复用性不高，此时函数式编程应运而生
函数式编程
函数式编程是在面向过程编程的基础上对功能的实现进行封装，使代码更加简洁直观，不用过于关心实现的过程
函数式编程的特点

1. 函数是一等公民
一等公民指的是在编程语言中同其他的数据类型平等对待，主要包括三层含义

- 可以将函数赋值给变量
- 可以将函数作为函数的参数进行传递
- 可以将函数作为函数的返回值进行返回

2. 无状态
无状态指的是，函数内部的执行，不依赖外部变量，只通过参数来确定函数执行结果

3. 无副作用
无副作用指的是，在函数的执行过程中，不改变外部比变量或者一个对象，如果要改变一个对象，那么应该创建一个新的对象来进行修改
函数式编程的应用

4. 组合函数
函数组合就是将多个函数组合成一个函数

5. 函数柯里化
柯里化是将一个多元函数转换为一元函数

6. 偏函数

7. 尾递归

8. 链式调用
面向对象与命令式编程
面向对象编程是将问题相关的一个一个事物的行为和特性进行封装成一个对象（关注的是主谓），通过对象的组合调用来实现程序，其体现形式为对象和命令的调用
面向对象特点

- 封装：将一个个事物封装成一个个对象，对外暴露api
- 继承：为了代码的复用，从父类继承允许继承的属性和方法
- 多态：不同的对象调用同一操作，产生不同的结果（本质上是将做什么和谁去做进行分离）
声明式编程
声明式指的是在编程过程中在意点在于我要做什么，而不去过度关心要怎么做，具体的实现交给我们的函数去完成
