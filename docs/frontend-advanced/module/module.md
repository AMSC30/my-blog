# ESM/CJS

## ESM

### 概述

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
除了静态加载带来的各种好处，ES6 模块还有以下好处。

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

### 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
严格模式主要有以下限制:

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

### export

一个模块就是一个独立的文件。export命令输出变量:

1. 直接在声明出输出

```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

2. 集中通过接口输出

```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

3. 集中使用别名输出

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

4. 默认导出

```js
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

注意点:

1. export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

2. export命令必须处于模块顶层

```js
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

### import

1. 通过接口名输入

```js
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

2. 为接口输入定义别名

```js
import { lastName as surname } from './profile.js';
```

3. 执行所加载的模块，多次重复执行同一句import语句，那么只会执行一次

```js
import 'lodash';
```

4. 整体加载。

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

注意点:

1. import命令输入的变量都是只读的，不允许在加载模块的脚本里面，改写接口。

```js
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

2. import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

```js
import { myMethod } from 'util';
```

3. import命令具有提升效果，会提升到整个模块的头部，首先执行。

```js
foo();

import { foo } from 'my_module';
```

import命令是编译阶段执行的，在代码运行之前。

4. 不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```js
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
```

5. 加载相同模块不会执行多次。

```js
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```

### import()

ES2020提案 引入import()函数，支持动态加载模块。

```js
import(specifier)
```

### export与import复合

如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。

```js
export { foo as myFoo , bar } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认输出
export { default } from 'foo';
```

具名接口与默认接口互改。

```js
// 具名输出改为默认输出
export { es6 as default } from './someModule';
// 默认输出改为具名输出
export { default as es6 } from './someModule';
// 整体输出改为具名输出
export * as ns from "mod";
```

### 浏览器加载ESM

浏览器加载 ES6 模块，也使用\<script\>标签，但是要加入type="module"属性。

```html
<script type="module" src="./foo.js"></script>
```

上面代码在网页中插入一个模块foo.js，由于type属性设为module，所以浏览器知道这是一个 ES6 模块。

浏览器对于带有type="module"的\<script\>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了\<script\>标签的defer属性。

ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```html
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```

## CJS

### 模块分类

在node的模块设计中，主要分为系统模块、第三方模块和自定义模块
系统模块是node提前编译成的二进制文件，在加载时省去了路径解析和文件定位步骤

### 模块查找机制

node首先会根据require后面的标识符进行路径解析，如果不以绝对或相对路径开头，首先判断是否是系统模块，如果不是，当做第三方模块处理

- 加载系统缓存

node加载模块的第一步，是通过模块标识符检查在系统缓存中是否有响应的模块

- 加载系统模块

在系统缓存中没找到相应的模块后，node从内存中读取系统模块并执行，同时进行缓存

- 加载自定义模块

自定义模块一般使用相对路径或者绝对路径进行引入

1. 当require后的文件路径没有文件后缀名时，node对查找是否有相应的[name].js文件
2. 如果没有，表示是一个文件夹，node会搜索该文件夹下的package.json中的main字段
3. 如果没有，node会按照index.js、index.json、index.node 的顺序加载文件

- 加载第三方模块

解析到标识符为第三方模块，node会从当前文件夹递归地在node_modules中查找响应的模块，后序解析流程和自定义模块相同

### 模块导入规范

#### 导入ESM

require命令不能加载ES6模块，因为es模块是异步的，只能使用import加载，并且import只能在es模块中使用。

```js
(async () => {
  await import('./my-app.mjs');
})();
```

#### 导入CJS

import命令可以加载CommonJS模块和ES6模块，对于CommonJS模块，可以使用 ES 模块默认导入或其对应的语法糖可靠地导入。

```js


import packageMain from 'commonjs-package';
import {default as packageMain} from 'commonjs-package';
// packageMain 为module.exports

// 可靠导入
import { method } from 'commonjs-package';
```

当使用 import * as m from 'cjs' 或动态导入时，可以直接观察到此模块命名空间外来对象：

```js
import * as m from 'cjs';
console.log(m);
console.log(m === await import('cjs'));
// Prints:
//   [Module] { default: <module.exports> }
//   true 
```

#### 同时支持两种格式

如果原始模块是 ES6 格式，那么需要给出一个整体输出接口，比如export default obj，使得 CommonJS 可以用import()进行加载。
如果原始模块是 CommonJS 格式，那么可以加一个包装层。

```js
// wrapper.js
import cjsModule from '../index.js';
export const foo = cjsModule.foo;
```

你可以把这个文件的后缀名改为.mjs，或者将它放在一个子目录，再在这个子目录里面放一个单独的package.json文件，指明{ type: "module" }。
另一种做法是在package.json文件的exports字段，指明两种格式模块各自的加载入口。

```json
"exports"：{
  "require": "./index.js"，
  "import": "./esm/wrapper.js"
}
```

上面代码指定require和import，加载该模块会自动切换到不一样的入口文件。

## ESM与CJS差异

1. CommonJS 模块是运行时同步加载，ES6 模块是编译时异步加载并输出接口。

2. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

3. 在es模块中，无require、exports、module.exports、__filename或__dirname

## 循环加载

### CJS循环加载

CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
让我们来看，Node 官方文档里面的例子。脚本文件a.js代码如下。

```js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

上面代码之中，a.js脚本先输出一个done变量，然后加载另一个脚本文件b.js。注意，此时a.js代码就停在这里，等待b.js执行完毕，再往下执行。
再看b.js的代码。

```js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

上面代码之中，b.js执行到第二行，就会去加载a.js，这时，就发生了“循环加载”。系统会去a.js模块对应对象的exports属性取值，可是因为a.js还没有执行完，从exports属性只能取回已经执行的部分，而不是最后的值。
a.js已经执行的部分，只有一行。

```js
exports.done = false;
```

因此，对于b.js来说，它从a.js只输入一个变量done，值为false。
然后，b.js接着往下执行，等到全部执行完毕，再把执行权交还给a.js。于是，a.js接着往下执行，直到执行完毕。我们写一个脚本main.js，验证这个过程。

```js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

执行main.js，运行结果如下。

```bash
node main.js

# 在 b.js 之中，a.done = false
# b.js 执行完毕
# 在 a.js 之中，b.done = true
# a.js 执行完毕
# 在 main.js 之中, a.done=true, b.done=true
```

上面的代码证明了两件事。一是，在b.js之中，a.js没有执行完毕，只执行了第一行。二是，main.js执行到第二行时，不会再次执行b.js，而是输出缓存的b.js的执行结果，即它的第四行。
exports.done = true;

总之，CommonJS 输入的是被输出值的拷贝，不是引用。
另外，由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。

```js
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
```

上面代码中，如果发生循环加载，require('a').foo的值很可能后面会被改写，改用require('a')会更保险一点。

### ESM循环加载

ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。
请看下面这个例子。

```js
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
```

上面代码中，a.mjs加载b.mjs，b.mjs又加载a.mjs，构成循环加载。执行a.mjs，结果如下。

```bash
$ node --experimental-modules a.mjs
b.mjs
ReferenceError: foo is not defined
```

上面代码中，执行a.mjs以后会报错，foo变量未定义，这是为什么？
让我们一行行来看，ES6 循环加载是怎么处理的。首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。接着，执行b.mjs的时候，已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行。执行到第三行console.log(foo)的时候，才发现这个接口根本没定义，因此报错。
解决这个问题的方法，就是让b.mjs运行的时候，foo已经有定义了。这可以通过将foo写成函数来解决。

```js
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
```

这时再执行a.mjs就可以得到预期结果。

```bash
$ node --experimental-modules a.mjs
b.mjs
foo
a.mjs
bar
```

这是因为函数具有提升作用，在执行import {bar} from './b'时，函数foo就已经有定义了，所以b.mjs加载的时候不会报错。这也意味着，如果把函数foo改写成函数表达式，也会报错。

```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
const foo = () => 'foo';
export {foo};
```

上面代码的第四行，改成了函数表达式，就不具有提升作用，执行就会报错。
我们再来看 ES6 模块加载器SystemJS给出的一个例子。

```js
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
```

上面代码中，even.js里面的函数even有一个参数n，只要不等于 0，就会减去 1，传入加载的odd()。odd.js也会做类似操作。
运行上面这段代码，结果如下。

```bash
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
```

上面代码中，参数n从 10 变为 0 的过程中，even()一共会执行 6 次，所以变量counter等于 6。第二次调用even()时，参数n从 20 变为 0，even()一共会执行 11 次，加上前面的 6 次，所以变量counter等于 17。

这个例子要是改写成 CommonJS，就根本无法执行，会报错。

```js
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
```

上面代码中，even.js加载odd.js，而odd.js又去加载even.js，形成“循环加载”。这时，执行引擎就会输出even.js已经执行的部分（不存在任何结果），所以在odd.js之中，变量even等于undefined，等到后面调用even(n - 1)就会报错。

```bash
$ node
> var m = require('./even');
> m.even(10)
TypeError: even is not a function
```
