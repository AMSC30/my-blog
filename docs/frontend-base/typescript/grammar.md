# TypeScript

## 简介

js是一门动态类型语言，许多错误在代码运行时才会体现出来，TS是js的一个超集，提供了一套静态类型检测系统，在编写代码时就提前报告错误

## 基本类型使用

### null、undefined

null与undefined类型都只有一个值

```ts
let n1: null = null
let u1: undefined = undefined
```

### number

number类型的值可以是二进制、八进制、十进制、十六进制

```ts
let a: number = 1
let b: number = 0b010
let c: number = 0o123
let d: number = 0xa23fe
let e: number
```

### boolean、string

```ts
let ba: boolean = true
let sa: string = '1212'
let sb: string = `template`
```

### 数组类型

**1. 普通数组类型定义**
普通数组是定义若干个同一类型值，数组中的成员类型是相同的

```ts
let ab: string[] = ['aa']
let aa: Array<string> = [] // 不推荐 jsx中有冲突
```

**2. 元祖类型**
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同

```ts
type StringNumberPair = [string, number];
```

在元组类型中，可以写一个可选属性，但可选元素必须在最后面，而且也会影响类型的 length

```ts
type Either2dOr3d = [number, number, number?];
```

剩余属性也是可用的

```ts
type Either2dOr3d = [number, number, ...number[]];
```

当使用剩余属性，元祖不会设置length属性

### 函数

函数允许定义参数和返回值的类型

**1. 参数类型**

```ts
function printFn3(a: number, b: number) {
    console.log(a, b)
}
```

**2. 定义函数类型**

```ts
type fn1Type = (a1: number, a2: string) => string

const printFn1: fn1Type = (a1, a2)=> {
    return a1 + a2
}

// 表达式方式
const printFn1:(a1:number,a2:string)=>string= (a1, a2)=> {
    return a1 + a2
}
```

**3. 参数默认值**

```ts
function printFn3(a: number, b: number = 12) {
    console.log(a, b)
}

type fn1Type = (a1: number, a2: string) => string

const printFn1: fn1Type = (a1, a2='hello')=> {
    return a1 + a2
}
```

**4. 可选类型**

```ts
function printFn2(a: number, b?: string) {
    console.log(a, b)
}
```

### unknow

unknow类型只能赋值给any和unknow类型

### any

any类型可以赋值给任何类型，可以访问他的任意属性，可以像方法一样调用，可以给他赋值任何类型的值

### void

void类型表示不是任何类型，当函数不会返回任何值或者返回undefined，其返回值是void

### 字面量类型

字面量类型定义了变量的值，一般与联合类型一同使用

```ts
type Direction= 'left' | 'right' | 'bottom'

let direction: Direction = 'top' // 报错
```

### 联合类型

**1. 声明联合类型**

```ts
function printId(id: number | string) {
  console.log(id.toUpperCase());
}
```

**2. 使用联合类型**
联合类型的使用需要满足每个类型

```ts
function printId(id: number | string) {
  console.log(id);
}
```

**3. 当传入的值的类型不适合所有使用时，可以使用类型收缩**

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

**4. 联合类型与交叉类型**

```ts
interface Foo {
  foo: string;
  name: string;
}
interface Bar {
  bar: string;
  name: string;
}
```

联合类型 A | B 表示一个集合，该集合是与类型A关联的一组值和与类型 B 关联的一组值的并集，拥有A和B的部分属性。交叉类型 A & B 表示一个集合，该集合是与类型 A 关联的一组值和与类型 B 关联的一组值的交集，同时拥有A和B的所有属性。
因此，Foo | Bar 表示有 foo 和 name 属性的对象集和有 bar 和 name 属性的对象集的并集。属于这类集合的对象都含有 name 属性。有些有 foo 属性，有些有 bar 属性。
而 Foo & Bar 表示具有 foo 和 name 属性的对象集和具有 bar 和 name 属性的对象集的交集。换句话说，集合包含了属于由 Foo 和 Bar 表示的集合的对象。只有具有这三个属性（foo、bar 和 name）的对象才属于交集。
在交集中，如果属性名相同但是类型不同，编译器会报错

### 类型断言

类型断言用于为一个值指定类型

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

### 非空断言

当在代码中确定某个值不可能为undefined和null

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

## 接口

接口描述了对象应该具有的结构

```ts
// 定义字面量,可混合
interface Person {
  name: string | number;
  setTime(d: Date)?: void; // 属性值为函数
  (start: number): string; //函数签名, 可以作为一个函数调用
  new (name:string):obj;//构造签名 可以作为构造函数使用
}

function greet(person: Person) {
  return "Hello " + person.name;
}

// 定义函数
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
// 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的,下面也是可以的
let mySearch: SearchFunc = function(src: string, sub: string) {
  let result = source.search(subString);
  return result > -1;
};

// 定义构造函数
interface ClockConstructor {
  new (hour: number, minute: number);
}
interface ClockInterface {
  tick();
}
const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};

// 定义数组
interface StringArray {
}
let myArray: StringArray= ["Bob", "Fred"];
let myStr: string = myArray[0];
```

### 属性修饰符

**1. 属性类型**
属性名称后面添加冒号跟上类型，标识属性值的类型

```ts
interface SomeType {
  prop: string;
}

function doSomething(obj: SomeType) {
  obj.prop = "hello";
}

// 定义属性方法
interface SomeType {
    say():string
}
```

**2. 可选属性**
`:`前加上`?`标识是可选属性

```ts
interface SomeType {
  prop?: string;
}

function doSomething(obj: SomeType) {

  obj.prop = "hello";

}
```

**3. 只读属性**
属性名前增加关键字readonly标识属性值的不可变

```ts
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
}
```

### 索引签名

有的时候，你不能提前知道一个类型里的所有属性的名字，但是你知道这些值的特征，你就可以用一个索引签名 (index signature) 来描述可能的值的类型

- 一个索引签名值的属性类型必须是 string 或者是 number

```ts
interface StringArray {
}

interface NumberDictionary {
}
```

- 限制: 属性类型被包含在索引类型的签名中,如果属性类型与索引签名返回的类型不同，将会出现错误

```ts

interface  {
  age: number; // ok
  name: string; // error
}
interface  {
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

- 为索引签名指定只读

```ts

interface  {
  readonly [length: number]: string;
}
```

### 接口继承

当多个对象类型具有相同的属性及属性值的类型，可以使用继承，使用 extends关键字允许我们有效的从其他声明过的类型中拷贝成员，并且随意添加新成员

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {
  background: string
}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
  background: "blue"
};
```

继承的接口中，不能含有相同名称的非函数类型并且不同类型的属性

### 泛型接口

定义一个接口时，我们可能不能够确定某些属性的类型，通过为接口指定泛型，可以动态的指定类型

```ts
interface Box<Type> {
  contents: Type;
}

let boxA: Box<string> = { contents: "hello" };
```

### 类型别名与接口异同

**相同点：**

1. type和interface都可以用来定义函数或者对象
2. type和interface都是可以扩展的，type可以扩展interface，interface可以扩展type

**不同点：**

1. 扩展方式不同：类型通过交叉进行扩展，接口通过继承扩展

```ts
interface Animal {
  name: string
}

type fish = {
  age:number
}

interface Bear extends Animal {
  honey: boolean
}
interface Bear extends fish {
  honey: boolean
}

type other = fish & Animal
type other = fish & fish
```

2. 合并方式不同：类型不可以进行声明合并，接口可以进行声明合并

```ts
interface Window {
  title: string
}

interface Window {
  ts: number
}

// 等同于
interface Window {
    title: string,
    ts: number
}
```

接口的非函数成员必须是唯一的，如果不是唯一的，那他们的类型必须相同
接口的相同函数成员会被当做重载，后面的优先级会高于前面的优先级

3. type可以进行typeof操作

```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div
```

## 函数

在基本使用中我们介绍了函数参数及返回值类型的基本定义方式,但本质上函数也是一个值,在声明函数类型的值的变量时,可以为该变量指定函数的结构,即参数和返回值的类型

```ts
// 在声明时定义
function add(x: number, y: number): number {
    return x + y;
}
let myAdd = function(x: number, y: number): number { return x + y; };

// 使用别名
type add = (a:number,b:number) => number

type add = {
  description: string;
  (a:number,b:number): number;
};

// 使用接口
interface add {
    description: string;
    (a:number,b:number):number
}
```

### 函数签名

在使用函数时，我们可能不是直接调用函数，而是使用函数上的某个属性和方法或者要当作构造函数调用，那么就不能使用传统的函数类型的定义，需要使用调用签名或者构造签名

```ts
// 调用签名
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

### 参数

有时候定义函数的参数时，参数是可选的

```ts
// 可选参数,只能在必选参数后面
function f(x?: number) {
  // ...
}

// 默认值
function f(x: number=10) {
  // ...
}
function f(x?: number=10) {
  // ...
}

// 剩余参数,只能在所有参数最后面
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

### 函数重载

一些 JavaScript 函数在调用的时候可以传入不同数量和类型的参数
在 TypeScript 中，我们可以通过写重载签名 (overlaod signatures) 说明一个函数的不同调用方法。 我们需要写一些函数签名 (通常两个或者更多)，然后再写函数体的内容：

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
```

我们写了一个兼容签名的函数实现，我们称之为实现签名 (implementation signature)
这个签名不能被直接调用。尽管我们在函数声明中，在一个必须参数后，声明了两个可选参数，它依然不能被传入两个参数进行调用
实现签名必须和重载签名必须兼容（compatible），写进函数体的签名是对外部来说是“不可见”的，这也就意味着外界“看不到”它的签名，自然不能按照实现签名的方式来调用
泛型函数

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

## Class

## 属性

声明一个class时，可以声明该类的属性，并对其进行类型注解和初始化，构造函数运行时，会初始化声明的属性

```ts
class Person {
    name:string
    // 初始值
    age:number = 12
    // 只读
    readonly weight:number = 150
}
```

### 成员类型

- Public 公开的
public是类成员的默认修饰，public类型的成员在任何地方都是可见并可修改的

- Protected 受保护的
protected类型的成员只在子类中可见

- Private 私有的
private类型的成员只能在当前类中访问

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

- Static 静态的
静态的属性和方法不能被实例访问，只能类访问，静态属性和方法也可以被继承

### 接口实现

接口实现实际上是对类的检查，检查该类是否满足接口，而不会改变类方法的类型

```ts
interface  {
  check (s: string): boolean;
}

class  implements  {
  check(s) {
    return s.toLowerCase() === "ok";
  }
}
```

### 继承

一个类可以继承一个基类，派生类具有基类所有的属性和方法，并且可以添加其他的属性和方法
如果派生类覆盖了基类的方法，需要遵循基类的约定，以下方式会出现问题

```ts
class Base {
  greet() {
    console.log("Hello, world!");
  }
}

class Derived extends Base {
  // Make this parameter required
  greet(name: string) {
    console.log(`Hello, ${name.toUpperCase()}`);
  }
}
```

基类和派生类的初始化顺序如下

- 基类字段被初始化
- 基类构造函数运行
- 派生类字段被初始化
- 派生类构造函数运行

## 装饰器

装饰器是对类、方法、属性、参数进行一些扩展
使用装饰器以@expression的形式，对expression求值后，应该返回一个函数，函数的参数为声明信息

### 装饰器组合

使用多个装饰器，可以写在同一行，也可以分开写在不同行，如下：

```text
@g @f

@g
@f
```

当使用多个装饰器时，顺序如下

- 从上到下求值获取装饰器
- 从下到上执行装饰器函数

```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}

// 结果如下
f(): evaluated
g(): evaluated
g(): called
f(): called
```

### 类装饰器

类装饰器用在类声明前，紧靠类的声明，类装饰器在运行时会将类的构造函数传递给类装饰器，如果类装饰器返回一个值，他会替换掉原先的构造函数

- 简单使用

```ts
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

- 返回新的构造函数

```ts
function classDecorator(constructor: { new (m?: string): any }) {
    return class extends constructor {
        property = 'new property'
        hello = 'override'
        constructor(m?: string) {
            super(m)
        }
        sayHello() {
            console.log(this.hello)
        }
    }
}

@classDecorator
class Greeter {
    property = 'property'
    hello: string
    constructor(m?: string) {
        if (m) {
            this.hello = m
        }
    }
    sayHello() {
        console.log(this.hello)
    }
}
new Greeter().sayHello()
```

### 方法装饰器

方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的_属性描述符_上，可以用来监视，修改或者替换方法定义。

方法装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的_属性描述符_。
如果方法装饰器返回一个值，它会被用作方法的_属性描述符_。

- 简单使用

```ts
function enumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = function () {
        console.log(1212)
    }
}

class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }

    @enumerable
    greet() {
        console.log('Hello, ' + this.greeting)
    }
}
new Greeter('zxx').greet()
```

- 返回一个属性描述符

```ts
function enumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return {
        value() {
            console.log('zxx')
        },
        enumerable: true,
        writable: true,
        configurable: true
    }
}

class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }

    @enumerable
    greet() {
        console.log('Hello, ' + this.greeting)
    }
}
new Greeter('zxx').greet()
```

### 访问器装饰器

访问器装饰器应用于访问器的_属性描述符_并且可以用来监视，修改或替换一个访问器的定义
访问器装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的_属性描述符_。
如果访问器装饰器返回一个值，它会被用作方法的_属性描述符_。

```ts
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

class Point {
    private _x: number;
private_y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}
```

### 属性装饰器

_属性装饰器_声明在一个属性声明之前（紧靠着属性声明）
属性装饰器表达式会在运行时当作函数被调用，传入下列 2 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
注意 _属性描述符_不会做为参数传入属性装饰器，这与 TypeScript 是如何初始化属性装饰器的有关。 因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，并且没办法监视或修改一个属性的初始化方法。返回值也会被忽略。 因此，属性描述符只能用来监视类中是否声明了某个名字的属性。
如果访问符装饰器返回一个值，它会被用作方法的_属性描述符_。

```ts
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}
```

### 参数修饰器

_参数装饰器_声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明
参数装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。
参数装饰器只能用来监视一个方法的参数是否被传入。
参数装饰器的返回值会被忽略。

## 枚举

### 数字枚举

```ts
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
//后面的值依次递增为2,3,4， 如果不初始化up为1，将从0开始递增
```

### 字符串枚举

在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```ts
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

### 枚举作为类型

```ts
enum ShapeKind {
    Circle,
    Square,
}
interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}
interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}
let c: Circle = {
    kind: ShapeKind.Square,
    radius: 100,
}
```

### 根据值获取键

```ts
enum Color { Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);
```

## 操作符

### keyof操作符

对一个对象类型(type、class、interface)使用 keyof 操作符，会返回该对象属性名组成的一个字符串或者数字字面量的联合

```ts
type Point = { x: number; y: number };
type P = keyof Point;

// type P = x | y
```

如果对象类型的定义是通过索引签名，那么直接返回签名类型

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number
```

### typeof操作符

TypeScript 添加的 typeof 方法可以在类型上下文（type context）中使用，用于获取一个变量或者属性的类型

```ts
let s = "hello";
let n: typeof s;
// let n: string
```

- 对函数类型使用ReturnType，返回函数的返回值的类型

```ts
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
/// type K = boolean
```

- 对函数值使用typeof，返回函数类型定义，再使用ReturnType，返回函数返回值类型

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;

// type P = {
//    x: number;
//    y: number;
// }
```

- 对对象使用，返回对象的类型定义

```ts
const person = { name: "kevin", age: "18" }
type Kevin = typeof person;

// type Kevin = {
//                 name: string;
//                 age: string;
// }
```

## 工具类型

### Partial\<Type\>

构造一个类型，其中 Type 的所有属性都设置为 optional。此实用程序将返回表示给定类型的所有子集的类型。

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

### Required\<Type\>

构造一个由 Type 设置为 required 的所有属性组成的类型。与partial相反。

```ts
// @errors: 2741
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5 };
```

### Readonly\<Type\>

构造一个类型，其中 Type 的所有属性都设置为 readonly，这意味着不能重新分配构造类型的属性。

```ts
// @errors: 2540
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello";
```

### Record\<Keys, Type\>

构造一个对象类型，其属性键为 Keys，属性值为 Type。此实用程序可用于将一种类型的属性映射到另一种类型。

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris;
// ^?
```

### Pick\<Type, Keys\>

通过从 Type 中选取一组属性键（字符串文字或字符串文字的并集）来构造一个类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo;
// ^?
```

### Omit\<Type, Keys\>

通过从 Type 中选取所有属性然后删除键（字符串文字或字符串文字的并集）来构造一个类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
```

### Exclude\<Type, ExcludedUnion\>

通过从 Type 中排除所有可分配给 ExcludedUnion 的联合成员来构造一个类型。

```ts
type T0 = Exclude<"a" | "b" | "c", "a">;
//    ^?
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
//    ^?
type T2 = Exclude<string | number | (() => void), Function>;
//    ^?
```

### Extract<Type, Union>

通过从 Type 中提取可分配给 Union 的所有联合成员来构造类型。

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
//    ^?
type T1 = Extract<string | number | (() => void), Function>;
//    ^?
```

### ReturnType\<Type\>

构造一个由函数 Type 的返回类型组成的类型。

```ts
// @errors: 2344 2344
declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>;
// type T0 = string
type T1 = ReturnType<(s: string) => void>;
// type T0 = void
type T4 = ReturnType<typeof f1>;
//  type T4 = {a: number,b: string}
```

### InstanceType\<Type\>
