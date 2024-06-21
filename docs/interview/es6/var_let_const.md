# var、let、const的区别

## 一、var

使用`var`声明的变量存在变量提升的情况

```js
console.log(a) // undefined
var a = 20
```

在编译阶段，编译器会将其变成以下执行

```js
var a
console.log(a)
a = 20
```

使用`var`，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明

```js
var a = 20 
var a = 30
console.log(a) // 30
```

在函数中使用使用`var`声明变量时候，该变量是局部的

```js
var a = 20
function change(){
    var a = 30
}
change()
console.log(a) // 20 
```

而如果在函数内不使用`var`，该变量是全局的

```js
var a = 20
function change(){
   a = 30
}
change()
console.log(a) // 30 
```

## 二、let

用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效

```js
{
    let a = 20
}
console.log(a) // ReferenceError: a is not defined.
```

不存在变量提升

```js
console.log(a) // 报错ReferenceError
let a = 2
```

这表示在声明它之前，变量`a`是不存在的，这时如果用到它，就会抛出一个错误

只要块级作用域内存在`let`命令，这个区域就不再受外部影响

```js
var a = 123
if (true) {
    a = 'abc' // ReferenceError
    let a;
}
```

使用`let`声明变量前，该变量都不可用，也就是大家常说的“暂时性死区”

最后，`let`不允许在相同作用域中重复声明

```js
let a = 20
let a = 30
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

注意的是相同作用域，下面这种情况是不会报错的

```js
let a = 20
{
    let a = 30
}
```

因此，我们不能在函数内部重新声明参数

```js
function func(arg) {
  let arg;
}
func()
// Uncaught SyntaxError: Identifier 'arg' has already been declared
```

## 三、const

`const`声明一个只读的常量，一旦声明，常量的值就不能改变

```js
const a = 1
a = 3
// TypeError: Assignment to constant variable.
```

这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值

```js
const a;
// SyntaxError: Missing initializer in const declaration
```

如果之前用`var`或`let`声明过变量，再用`const`声明同样会报错

```js
var a = 20
let b = 20
const a = 30
const b = 30
// 都会报错
```

`const`实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量

对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的，并不能确保改变量的结构不变

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

其它情况，`const`与`let`一致

## 四、区别

`var`、`let`、`const`三者区别可以围绕下面五点展开：

- 变量记录方式不同导致变量提升和暂时性死区
- 块级作用域
- 重复声明
- 修改声明的变量
- 使用

### 变量记录

创建执行上下文的时候，会通过词法环境和变量环境对变量和外部环境进行记录，对于var生命的变量，会记录在变量环境中，同时初始化为undefined，导致了变量提升；对于let和const声明的变量记录在词法环境中，并记录为未初始化（unInitialize），等到代码执行到变量声明的位置的时候，才进行赋值，导致了暂时性死区

```js
// var
console.log(a)  // undefined
var a = 10

// let 
console.log(b)  // Cannot access 'b' before initialization
let b = 10

// const
console.log(c)  // Cannot access 'c' before initialization
const c = 10
```

### 块级作用域

`var`不存在块级作用域，`let`和`const`存在块级作用域，无法在块作用域外部对变量进行访问

```js
// var
{
    var a = 20
}
console.log(a)  // 20

// let
{
    let b = 20
}
console.log(b)  // Uncaught ReferenceError: b is not defined

// const
{
    const c = 20
}
console.log(c)  // Uncaught ReferenceError: c is not defined
```

### 重复声明

`var`允许重复声明变量，`let`和`const`在同一作用域不允许重复声明变量

```js
// var
var a = 10
var a = 20 // 20

// let
let b = 10
let b = 20 // Identifier 'b' has already been declared

// const
const c = 10
const c = 20 // Identifier 'c' has already been declared
```

### 使用

能用`const`的情况尽量使用`const`，其他情况下大多数使用`let`，避免使用`var`

## 参考文献

- <https://es6.ruanyifeng.com/>
