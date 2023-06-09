# 对象

原型对象概述
构造函数的缺点
JavaScript 通过构造函数生成新对象，因此构造函数可以视为对象的模板。实例对象的属性和方法，可以定义在构造函数内部。
function Cat (name, color) {
  this.name = name;
  this.color = color;
}

var cat1 = new Cat('大毛', '白色');

cat1.name // '大毛'
cat1.color // '白色'

上面代码中，Cat函数是一个构造函数，函数内部定义了name属性和color属性，所有实例对象（上例是cat1）都会生成这两个属性，即这两个属性会定义在实例对象上面。
缺点：同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function () {
    console.log('喵喵');
  };
}

var cat1 = new Cat('大毛', '白色');
var cat2 = new Cat('二毛', '黑色');

cat1.meow === cat2.meow
// false

prototype 属性的作用
JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。
下面，先看怎么为对象指定原型。JavaScript 规定，每个函数都有一个prototype属性，指向一个对象。
function f() {}
typeof f.prototype // "object"

对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'

上面代码中，构造函数Animal的prototype属性，就是实例对象cat1和cat2的原型对象。原型对象上添加一个color属性，结果，实例对象都共享了该属性。
原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。
Animal.prototype.color = 'yellow';

cat1.color // "yellow"
cat2.color // "yellow"

上面代码中，原型对象的color属性的值变为yellow，两个实例对象的color属性立刻跟着变了。这是因为实例对象其实没有color属性，都是读取原型对象的color属性。也就是说，当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法。这就是原型对象的特殊之处。
如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法。
cat1.color = 'black';

cat1.color // 'black'
cat2.color // 'yellow'
Animal.prototype.color // 'yellow';

上面代码中，实例对象cat1的color属性改为black，就使得它不再去原型对象读取color属性，后者的值依然为yellow。
总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。
Animal.prototype.walk = function () {
  console.log(this.name + ' is walking');
};

上面代码中，Animal.prototype对象上面定义了一个walk方法，这个方法将可以在所有Animal实例对象上面调用。
原型链
什么是原型链
一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……
原型链的尽头
如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的。
那么，Object.prototype对象有没有它的原型呢？回答是Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null。
Object.getPrototypeOf(Object.prototype)
// null

对象属性的查找顺序
读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）。
注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。
举例来说，如果让构造函数的prototype属性指向一个数组，就意味着实例对象可以调用数组方法。
var MyArray = function () {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length // 3
mine instanceof Array // true

constructor 属性
prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。
function P() {}
P.prototype.constructor === P // true

由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承。
function P() {}
var p = new P();

p.constructor === P // true
p.constructor === P.prototype.constructor // true
p.hasOwnProperty('constructor') // false

constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。
constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype = {
  method: function () {}
};

Person.prototype.constructor === Person // false
Person.prototype.constructor === Object // true

所以，修改原型对象时，一般要同时修改constructor属性的指向。
// 坏的写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好的写法
C.prototype.method1 = function (...) { ... };

如果不能确定constructor属性是什么函数，还有一个办法：通过name属性，从实例得到构造函数的名称。
function Foo() {}
var f = new Foo();
f.constructor.name // "Foo"

instanceof 运算符
instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。
var v = new Vehicle();
v instanceof Vehicle // true

instanceof运算符的左边是实例对象，右边是构造函数。它会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链上。因此，下面两种写法是等价的。
v instanceof Vehicle
// 等同于
Vehicle.prototype.isPrototypeOf(v)

上面代码中，Vehicle是对象v的构造函数，它的原型对象是Vehicle.prototype，isPrototypeOf()方法是 JavaScript 提供的原生方法，用于检查某个对象是否为另一个对象的原型，详细解释见后文。
由于instanceof检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回true。
var d = new Date();
d instanceof Date // true
d instanceof Object // true

由于任意对象（除了null）都是Object的实例，所以instanceof运算符可以判断一个值是否为非null的对象。
var obj = { foo: 123 };
obj instanceof Object // true

null instanceof Object // false

instanceof的原理是检查右边构造函数的prototype属性，是否在左边对象的原型链上。有一种特殊情况，就是左边对象的原型链上，只有null对象。这时，instanceof判断会失真。
var obj = Object.create(null);
typeof obj // "object"
obj instanceof Object // false

上面代码中，Object.create(null)返回一个新对象obj，它的原型是null（Object.create()的详细介绍见后文）。右边的构造函数Object的prototype属性，不在左边的原型链上，因此instanceof就认为obj不是Object的实例。这是唯一的instanceof运算符判断会失真的情况（一个对象的原型是null）。
instanceof运算符的一个用处，是判断值的类型。
var x = [1, 2, 3];
var y = {};
x instanceof Array // true
y instanceof Object // true

上面代码中，instanceof运算符判断，变量x是数组，变量y是对象。
注意，instanceof运算符只能用于对象，不适用原始类型的值。
var s = 'hello';
s instanceof String // false

上面代码中，字符串不是String对象的实例（因为字符串不是对象），所以返回false。
此外，对于undefined和null，instanceof运算符总是返回false。
undefined instanceof Object // false
null instanceof Object // false

利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。
function Fubar (foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}

上面代码使用instanceof运算符，在函数体内部判断this关键字是否为构造函数Fubar的实例。如果不是，就表明忘了加new命令。
对象创建
对象字面量
使用对象字面量，直接用大括号将属性和方法包裹的形式
var person={
  name:"Jason",
  age:21
}

缺点：使用对象字面量的方式，当创建多个对象时会产生重复代码
工厂函数
使用工厂函数，将属性和方法作为工厂函数的参数传入，返回一个对象
function createPerson(name,age,job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    alert(this.name);
  };
  return o;
}
  var person1 = createPerson('Nike',29,'teacher');
  var person2 = createPerson('Arvin',20,'student');

缺点： 对于对象的类型不好判断
构造函数
function Person(name,age,job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){
    alert(this.name);
  };
}
var person1 = new Person('Nike',29,'teacher');
var person2 = new Person('Arvin',20,'student');

对比发现

- 构造函数没有显式地创建一个对象
- 没有return语句
- 方便判断类型
缺点： 所有通过构造函数创建的实例都有自己的属性和方法，对于某些公共的属性和方法会重复定义，造成内存浪费
原型模式
将公共的属性和方法通过原型的方式定义
function Person(){}
  Person.prototype.name = 'Nike';
  Person.prototype.age = 20;
  Person.prototype.jbo = 'teacher';
  Person.prototype.sayName = function(){
    alert(this.name)
  };
var person1 = new Person();
var person2 = new Person();
person1.name ='Greg';alert(person1.name);

缺点：

1. 对于原型上引用类型的属性，所有实例进行共享，当一个实例改变了原型对象上的属性，其他实例访问的结果也会发生变化
2. 无法初始化参数
组合构造函数与原型模式
function Person(name,age,job){
  this.name =name;
  this.age = age;
  this.job = job;
}
Person.prototype = {
 constructor:Person,
 sayName: function(){
   alert(this.name); };
}
var person1 = new Person('Nike',20,'teacher');

继承
原型链继承
原型链继承是使用父类的实例作为子类的原型对象，这样子类就可以访问父类的属性和方法
function Parent() {
    this.a = 1
}
Parent.prototype.b = 2
function Son() {}
Son.prototype = new Parent()

要向子类原型添加新的属性，必须在父类实例作为子类原型后添加
缺点：

1. 所有实例共享一个父类实例，出现引用类型问题
2. 无法向父类构造函数传参
3. 无法实现多继承
借用构造函数继承
借用构造函数继承，思想是在子类构造函数中调用父类构造函数
function Parent() {
    this.a = 1
}
function Son() {
    Parent.call(this)
    this.b = 2
}

借用构造函数继承实现了部分继承，同时可以实现多重继承
缺点：

1. 只能继承父类属性和方法，无法继承父类原型属性和方法
2. 每个子类实例拥有父类方法的副本，消耗内存
组合继承
        function Person(name, age) {
            this.name = name,
            this.age = age,
            this.setAge = function () { }
        }
        Person.prototype.setAge = function () {
            console.log("111")
        }
        function Student(name, age, price) {
            Person.call(this,name,age)
            this.price = price
            this.setScore = function () { }
        }
        Student.prototype = new Person()
        Student.prototype.constructor = Student//组合继承也是需要修复构造函数指向的
        Student.prototype.sayHello = function () { }
        var s1 = new Student('Tom', 20, 15000)
        var s2 = new Student('Jack', 22, 14000)
        console.log(s1)
        console.log(s1.constructor) //Student
        console.log(p1.constructor) //Person

组合原型链和构造函数，实现了多继承，继承了父类的所有属性和方法，同时可以向父类传参，实现了函数复用，避免了引用属性共享的问题
缺点： 调用了两次父类构造函数
原型式继承
原型是继承不涉及父类构造函数，直接利用一个父类对象作为子类的原型对象
function Woker(o){
    function Empty(){};
    Empty.prototype = o;
    return new Empty();
}
var mine = {
    name: 'jia',
    age: 18,
    job: '打杂的'
};
var anotherMine =Woker(mine);

缺点：

1. 无法实现复用(方法是后添加的)
2. 无法判断对象类型
寄生式继承
寄生式是在原型式的外包裹一层，用于为子类实例添加方法和属性
function createAnother(o) {
    var person = Woker(o);
    person.show=function() {
        console.log(`我是jia`)
    }
    return person;
}
var mine = {
    name: 'jia',
    age: 18,
    job: '打杂的'
};
var anotherMine = createAnother(mine);  

缺点： 没有实现复用
寄生组合式继承
//父类构造函数
function Parents(surname){
  this.surname=surname;
}
Parents.prototype.getSurname=function(){
  console.log(this.surname);
}
//子类构造函数
function Child(surname,age){
   Parents.call(this,surname);
   this.age=age;
}

child.prototype = Object.create(parents.prototype);
child.prototype.constructor = child;

Child.prototype.getAge=function(){
         console.log(this.age);
}
