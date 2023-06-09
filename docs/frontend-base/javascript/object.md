# object

概述
构造函数方法
Object.keys()
Object.keys方法的参数是一个对象，返回一个由所有可遍历的key组成的字符串数组
var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj) // ["p1", "p2"]

Object.getOwnPropertyNames()
Object.getOwnPropertyNames接受一个对象作为参数，返回一个由对象自身所有key组成的字符串数组
var obj = {
  p1: 123,
  p2: 456
};

Object.getOwnPropertyNames(obj) // ["p1", "p2"]

其他方法
除了上面提到的两个方法，Object还有不少其他静态方法，将在后文逐一详细介绍。
（1）与属性描述符有关

- Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
- Object.defineProperty()：通过描述对象，定义某个属性。
- Object.defineProperties()：通过描述对象，定义多个属性。
（2）与属性操作有关
- Object.preventExtensions()：防止对象扩展。
- Object.isExtensible()：判断对象是否可扩展。
- Object.seal()：禁止对象配置。
- Object.isSealed()：判断一个对象是否可配置。
- Object.freeze()：冻结一个对象。
- Object.isFrozen()：判断一个对象是否被冻结。
（3）与原型有关
- Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
- Object.getPrototypeOf()：获取对象的Prototype对象。
实例方法
Object实例对象的方法，主要有以下六个。
- Object.prototype.valueOf()：返回当前对象对应的值。
- Object.prototype.toString()：返回当前对象对应的字符串形式。
- Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。
- Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
- Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。
- Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举。
Object.prototype.valueOf()
valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身。
var obj = new Object();
obj.valueOf() === obj // true

valueOf方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法
var obj = new Object();
1 + obj // "1[object Object]"

Object.prototype.toString()
toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。
var o1 = new Object();
o1.toString() // "[object Object]"

var o2 = {a:1};
o2.toString() // "[object Object]"

数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法。
[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"

toString() 的应用：判断数据类型
Object.prototype.toString方法返回对象的类型字符串，因此可以用来判断一个值的类型。
var obj = {};
obj.toString() // "[object Object]"

上面代码调用空对象的toString方法，结果返回一个字符串object Object，其中第二个Object表示该值的构造函数。这是一个十分有用的判断数据类型的方法。
由于实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法，所以为了得到类型字符串，最好直接使用Object.prototype.toString方法。通过函数的call方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。
Object.prototype.toString.call(value)

上面代码表示对value这个值调用Object.prototype.toString方法。
不同数据类型的Object.prototype.toString方法返回值如下。

- 数值：返回[object Number]。
- 字符串：返回[object String]。
- 布尔值：返回[object Boolean]。
- undefined：返回[object Undefined]。
- null：返回[object Null]。
- 数组：返回[object Array]。
- arguments 对象：返回[object Arguments]。
- 函数：返回[object Function]。
- Error 对象：返回[object Error]。
- Date 对象：返回[object Date]。
- RegExp 对象：返回[object RegExp]。
- 其他对象：返回[object Object]。
这就是说，Object.prototype.toString可以看出一个值到底是什么类型。
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"

利用这个特性，可以写出一个比typeof运算符更准确的类型判断函数。
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"

在上面这个type函数的基础上，还可以加上专门判断某种类型数据的方法。
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true

Object.prototype.toLocaleString()
Object.prototype.toLocaleString方法与toString的返回结果相同，也是返回一个值的字符串形式。
var obj = {};
obj.toString(obj) // "[object Object]"
obj.toLocaleString(obj) // "[object Object]"

这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值。
var person = {
  toString: function () {
    return 'Henry Norman Bethune';
  },
  toLocaleString: function () {
    return '白求恩';
  }
};

person.toString() // Henry Norman Bethune
person.toLocaleString() // 白求恩

上面代码中，toString()方法返回对象的一般字符串形式，toLocaleString()方法返回本地的字符串形式。
目前，主要有三个对象自定义了toLocaleString方法。

- Array.prototype.toLocaleString()
- Number.prototype.toLocaleString()
- Date.prototype.toLocaleString()
举例来说，日期的实例对象的toString和toLocaleString返回值就不一样，而且toLocaleString的返回值跟用户设定的所在地域相关。
var date = new Date();
date.toString() // "Tue Jan 01 2018 12:01:33 GMT+0800 (CST)"
date.toLocaleString() // "1/01/2018, 12:01:33 PM"

Object.prototype.hasOwnProperty()
Object.prototype.hasOwnProperty方法接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性。
var obj = {
  p: 123
};

obj.hasOwnProperty('p') // true
obj.hasOwnProperty('toString') // false

上面代码中，对象obj自身具有p属性，所以返回true。toString属性是继承的，所以返回false。
属性描述对象
概述
JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。
下面是属性描述对象的一个例子。
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}

属性描述对象提供6个元属性。
（1）value
value是该属性的属性值，默认为undefined。
（2）writable
writable是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为true。
（3）enumerable
enumerable是一个布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性。
（4）configurable
configurable是一个布尔值，表示可配置性，默认为true。如果设为false，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value属性除外）。也就是说，configurable属性控制了属性描述对象的可写性。
（5）get
get是一个函数，表示该属性的取值函数（getter），默认为undefined。
（6）set
set是一个函数，表示该属性的存值函数（setter），默认为undefined。
Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptor()方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

上面代码中，Object.getOwnPropertyDescriptor()方法获取obj.p的属性描述对象。
注意，Object.getOwnPropertyDescriptor()方法只能用于对象自身的属性，不能用于继承的属性。
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'toString')
// undefined

上面代码中，toString是obj对象继承的属性，Object.getOwnPropertyDescriptor()无法获取。
Object.getOwnPropertyNames()
Object.getOwnPropertyNames方法返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历。
var obj = Object.defineProperties({}, {
  p1: { value: 1, enumerable: true },
  p2: { value: 2, enumerable: false }
});

Object.getOwnPropertyNames(obj)
// ["p1", "p2"]

上面代码中，obj.p1是可遍历的，obj.p2是不可遍历的。Object.getOwnPropertyNames会将它们都返回。
这跟Object.keys的行为不同，Object.keys只返回对象自身的可遍历属性的全部属性名。
Object.keys([]) // []
Object.getOwnPropertyNames([]) // [ 'length' ]

Object.keys(Object.prototype) // []
Object.getOwnPropertyNames(Object.prototype)
// ['hasOwnProperty',
//  'valueOf',
//  'constructor',
//  'toLocaleString',
//  'isPrototypeOf',
//  'propertyIsEnumerable',
//  'toString']

上面代码中，数组自身的length属性是不可遍历的，Object.keys不会返回该属性。第二个例子的Object.prototype也是一个对象，所有实例对象都会继承它，它自身的属性都是不可遍历的。
Object.defineProperty()，Object.defineProperties()
Object.defineProperty()方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，它的用法如下。
Object.defineProperty(object, propertyName, attributesObject)

Object.defineProperty方法接受三个参数，依次如下。

- object：属性所在的对象
- propertyName：字符串，表示属性名
- attributesObject：属性描述对象
举例来说，定义obj.p可以写成下面这样。
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});

obj.p // 123

obj.p = 246;
obj.p // 123

上面代码中，Object.defineProperty()方法定义了obj.p属性。由于属性描述对象的writable属性为false，所以obj.p属性不可写。注意，这里的Object.defineProperty方法的第一个参数是{}（一个新建的空对象），p属性直接定义在这个空对象上面，然后返回这个对象，这是Object.defineProperty()的常见用法。
如果属性已经存在，Object.defineProperty()方法相当于更新该属性的属性描述对象。
如果一次性定义或修改多个属性，可以使用Object.defineProperties()方法。
var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});

obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"

上面代码中，Object.defineProperties()同时定义了obj对象的三个属性。其中，p3属性定义了取值函数get，即每次读取该属性，都会调用这个取值函数。
注意，一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，或者同时定义value属性，否则会报错。
var obj = {};

Object.defineProperty(obj, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value

Object.defineProperty(obj, 'p', {
  writable: true,
  get: function() { return 456; }
});
// TypeError: Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute

上面代码中，同时定义了get属性和value属性，以及将writable属性设为true，就会报错。
Object.defineProperty()和Object.defineProperties()参数里面的属性描述对象，writable、configurable、enumerable这三个属性的默认值都为false。
var obj = {};
Object.defineProperty(obj, 'foo', {});
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }

上面代码中，定义obj.foo时用了一个空的属性描述对象，就可以看到各个元属性的默认值。
Object.prototype.propertyIsEnumerable()
实例对象的propertyIsEnumerable()方法返回一个布尔值，用来判断某个属性是否可遍历。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false。
var obj = {};
obj.p = 123;

obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false

上面代码中，obj.p是可遍历的，而obj.toString是继承的属性。
元属性
属性描述对象的各个属性称为“元属性”，因为它们可以看作是控制属性的属性。
value
value属性是目标属性的值。
var obj = {};
obj.p = 123;

Object.getOwnPropertyDescriptor(obj, 'p').value
// 123

Object.defineProperty(obj, 'p', { value: 246 });
obj.p // 246

上面代码是通过value属性，读取或改写obj.p的例子。
writable
writable属性是一个布尔值，决定了目标属性的值（value）是否可以被改变。
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});

obj.a // 37
obj.a = 25;
obj.a // 37

上面代码中，obj.a的writable属性是false。然后，改变obj.a的值，不会有任何效果。
注意，正常模式下，对writable为false的属性赋值不会报错，只会默默失败。但是，严格模式下会报错，即使对a属性重新赋予一个同样的值。
'use strict';
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});

obj.a = 37;
// Uncaught TypeError: Cannot assign to read only property 'a' of object

上面代码是严格模式，对obj.a任何赋值行为都会报错。
如果原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性。
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);

obj.foo = 'b';
obj.foo // 'a'

上面代码中，proto是原型对象，它的foo属性不可写。obj对象继承proto，也不可以再自定义这个属性了。如果是严格模式，这样做还会抛出一个错误。
但是，有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制。原因是这种情况下，原型链会被完全忽视。
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);
Object.defineProperty(obj, 'foo', {
  value: 'b'
});

obj.foo // "b"

enumerable
enumerable（可遍历性）返回一个布尔值，表示目标属性是否可遍历。
JavaScript 的早期版本，for...in循环是基于in运算符的。我们知道，in运算符不管某个属性是对象自身的还是继承的，都会返回true。
var obj = {};
'toString' in obj // true

上面代码中，toString不是obj对象自身的属性，但是in运算符也返回true，这导致了toString属性也会被for...in循环遍历。
这显然不太合理，后来就引入了“可遍历性”这个概念。只有可遍历的属性，才会被for...in循环遍历，同时还规定toString这一类实例对象继承的原生属性，都是不可遍历的，这样就保证了for...in循环的可用性。
具体来说，如果一个属性的enumerable为false，下面三个操作不会取到该属性。

- for..in循环
- Object.keys方法
- JSON.stringify方法
因此，enumerable可以用来设置“秘密”属性。
var obj = {};

Object.defineProperty(obj, 'x', {
  value: 123,
  enumerable: false
});

obj.x // 123

for (var key in obj) {
  console.log(key);
}
// undefined

Object.keys(obj)  // []
JSON.stringify(obj) // "{}"

上面代码中，obj.x属性的enumerable为false，所以一般的遍历操作都无法获取该属性，使得它有点像“秘密”属性，但不是真正的私有属性，还是可以直接获取它的值。
注意，for...in循环包括继承的属性，Object.keys方法不包括继承的属性。如果需要获取对象自身的所有属性，不管是否可遍历，可以使用Object.getOwnPropertyNames方法。
另外，JSON.stringify方法会排除enumerable为false的属性，有时可以利用这一点。如果对象的 JSON 格式输出要排除某些属性，就可以把这些属性的enumerable设为false。
configurable
configurable(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。也就是说，configurable为false时，value、writable、enumerable和configurable都不能被修改了。
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(obj, 'p', {value: 2})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {writable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {enumerable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {configurable: true})
// TypeError: Cannot redefine property: p

上面代码中，obj.p的configurable为false。然后，改动value、writable、enumerable、configurable，结果都报错。
注意，writable只有在false改为true会报错，true改为false是允许的。
var obj = Object.defineProperty({}, 'p', {
  writable: true,
  configurable: false
});

Object.defineProperty(obj, 'p', {writable: false})
// 修改成功

至于value，只要writable和configurable有一个为true，就允许改动。
var o1 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: true,
  configurable: false
});

Object.defineProperty(o1, 'p', {value: 2})
// 修改成功

var o2 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  configurable: true
});

Object.defineProperty(o2, 'p', {value: 2})
// 修改成功

另外，writable为false时，直接目标属性赋值，不报错，但不会成功。
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  configurable: false
});

obj.p = 2;
obj.p // 1

上面代码中，obj.p的writable为false，对obj.p直接赋值不会生效。如果是严格模式，还会报错。
可配置性决定了目标属性是否可以被删除（delete）。
var obj = Object.defineProperties({}, {
  p1: { value: 1, configurable: true },
  p2: { value: 2, configurable: false }
});

delete obj.p1 // true
delete obj.p2 // false

obj.p1 // undefined
obj.p2 // 2

上面代码中，obj.p1的configurable是true，所以可以被删除，obj.p2就无法删除。
存取器
除了直接定义以外，属性还可以用存取器（accessor）定义。其中，存值函数称为setter，使用属性描述对象的set属性；取值函数称为getter，使用属性描述对象的get属性。
一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，可以实现许多高级特性，比如定制属性的读取和赋值行为。
var obj = Object.defineProperty({}, 'p', {
  get: function () {
    return 'getter';
  },
  set: function (value) {
    console.log('setter: ' + value);
  }
});

obj.p // "getter"
obj.p = 123 // "setter: 123"

上面代码中，obj.p定义了get和set属性。obj.p取值时，就会调用get；赋值时，就会调用set。
JavaScript 还提供了存取器的另一种写法。
// 写法二
var obj = {
  get p() {
    return 'getter';
  },
  set p(value) {
    console.log('setter: ' + value);
  }
};

上面两种写法，虽然属性p的读取和赋值行为是一样的，但是有一些细微的区别。第一种写法，属性p的configurable和enumerable都为false，从而导致属性p是不可遍历的；第二种写法，属性p的configurable和enumerable都为true，因此属性p是可遍历的。实际开发中，写法二更常用。
注意，取值函数get不能接受参数，存值函数set只能接受一个参数（即属性的值）。
存取器往往用于，属性的值依赖对象内部数据的场合。
var obj ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw new Error('新的值必须大于当前值');
  }
};

obj.next // 5

obj.next = 10;
obj.next // 10

obj.next = 5;
// Uncaught Error: 新的值必须大于当前值

上面代码中，next属性的存值函数和取值函数，都依赖于内部属性$n。
对象的拷贝
有时，我们需要将一个对象的所有属性，拷贝到另一个对象，可以用下面的方法实现。
var extend = function (to, from) {
  for (var property in from) {
    to[property] = from[property];
  }

  return to;
}

extend({}, {
  a: 1
})
// {a: 1}

上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值。
extend({}, {
  get a() { return 1 }
})
// {a: 1}

为了解决这个问题，我们可以通过Object.defineProperty方法来拷贝属性。
var extend = function (to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
}

extend({}, { get a(){ return 1 } })
// { get a(){ return 1 } })

上面代码中，hasOwnProperty那一行用来过滤掉继承的属性，否则可能会报错，因为Object.getOwnPropertyDescriptor读不到继承属性的属性描述对象。
控制对象状态
有时需要冻结对象的读写状态，防止对象被改变。JavaScript 提供了三种冻结方法，最弱的一种是Object.preventExtensions，其次是Object.seal，最强的是Object.freeze。
Object.preventExtensions()
Object.preventExtensions方法可以使得一个对象无法再添加新的属性。
var obj = new Object();
Object.preventExtensions(obj);

Object.defineProperty(obj, 'p', {
  value: 'hello'
});
// TypeError: Cannot define property:p, object is not extensible.

obj.p = 1;
obj.p // undefined

上面代码中，obj对象经过Object.preventExtensions以后，就无法添加新属性了。
Object.isExtensible()
Object.isExtensible方法用于检查一个对象是否使用了Object.preventExtensions方法。也就是说，检查是否可以为一个对象添加属性。
var obj = new Object();

Object.isExtensible(obj) // true
Object.preventExtensions(obj);
Object.isExtensible(obj) // false

上面代码中，对obj对象使用Object.preventExtensions方法以后，再使用Object.isExtensible方法，返回false，表示已经不能添加新属性了。
Object.seal()
Object.seal方法使得一个对象既无法添加新属性，也无法删除旧属性。
var obj = { p: 'hello' };
Object.seal(obj);

delete obj.p;
obj.p // "hello"

obj.x = 'world';
obj.x // undefined

上面代码中，obj对象执行Object.seal方法以后，就无法添加新属性和删除旧属性了。
Object.seal实质是把属性描述对象的configurable属性设为false，因此属性描述对象不再能改变了。
var obj = {
  p: 'a'
};

// seal方法之前
Object.getOwnPropertyDescriptor(obj, 'p')
// Object {
//   value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

Object.seal(obj);

// seal方法之后
Object.getOwnPropertyDescriptor(obj, 'p')
// Object {
//   value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: false
// }

Object.defineProperty(obj, 'p', {
  enumerable: false
})
// TypeError: Cannot redefine property: p

上面代码中，使用Object.seal方法之后，属性描述对象的configurable属性就变成了false，然后改变enumerable属性就会报错。
Object.seal只是禁止新增或删除属性，并不影响修改某个属性的值。
var obj = { p: 'a' };
Object.seal(obj);
obj.p = 'b';
obj.p // 'b'

上面代码中，Object.seal方法对p属性的value无效，是因为此时p属性的可写性由writable决定。
Object.isSealed()
Object.isSealed方法用于检查一个对象是否使用了Object.seal方法。
var obj = { p: 'a' };

Object.seal(obj);
Object.isSealed(obj) // true

这时，Object.isExtensible方法也返回false。
var obj = { p: 'a' };

Object.seal(obj);
Object.isExtensible(obj) // false

Object.freeze()
Object.freeze方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。
var obj = {
  p: 'hello'
};

Object.freeze(obj);

obj.p = 'world';
obj.p // "hello"

obj.t = 'hello';
obj.t // undefined

delete obj.p // false
obj.p // "hello"

上面代码中，对obj对象进行Object.freeze()以后，修改属性、新增属性、删除属性都无效了。这些操作并不报错，只是默默地失败。如果在严格模式下，则会报错。
Object.isFrozen()
Object.isFrozen方法用于检查一个对象是否使用了Object.freeze方法。
var obj = {
  p: 'hello'
};

Object.freeze(obj);
Object.isFrozen(obj) // true

使用Object.freeze方法以后，Object.isSealed将会返回true，Object.isExtensible返回false。
var obj = {
  p: 'hello'
};

Object.freeze(obj);

Object.isSealed(obj) // true
Object.isExtensible(obj) // false

Object.isFrozen的一个用途是，确认某个对象没有被冻结后，再对它的属性赋值。
var obj = {
  p: 'hello'
};

Object.freeze(obj);

if (!Object.isFrozen(obj)) {
  obj.p = 'world';
}

上面代码中，确认obj没有被冻结后，再对它的属性赋值，就不会报错了。
局限性
上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
proto.t = 'hello';
obj.t
// hello

上面代码中，对象obj本身不能新增属性，但是可以在它的原型对象上新增属性，就依然能够在obj上读到。
一种解决方案是，把obj的原型也冻结住。
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
Object.preventExtensions(proto);

proto.t = 'hello';
obj.t // undefined

另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。
var obj = {
  foo: 1,
  bar: ['a', 'b']
};
Object.freeze(obj);

obj.bar.push('c');
obj.bar // ["a", "b", "c"]

上面代码中，obj.bar属性指向一个数组，obj对象被冻结以后，这个指向无法改变，即无法指向其他值，但是所指向的数组是可以改变的。
