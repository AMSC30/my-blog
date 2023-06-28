# JS模块化

```js
模块化本质上是一种提高开发效率的技术方案
js的诞生之初，只是用于页面动画和表单提交这些简单逻辑，并没有模块化和命名空间的概念

优点：
- 有效避免全局变量污染
- 有利于按需加载
- 提高代码的可复用和可维护性
没有模块化
没有模块化的概念，不同的文件通过脚本标签引入
问题：污染了全局作用域，不利于大型项目和多人协作的项目的开发，

函数作用域
通过IIFE（本质是函数作用域或者说闭包）实现简单的模块化
- 实现：
const module = （()=>{
    const a = 'hello'
    const sayHello = ()=>{
        console.log(`${a} zhaowa`)
    }
    return {
        a,
        sayHello
    }
}）（）

module.sayHello()


- 优化：有额外依赖
const module = （(moduleA,moduleB)=>{
    const a = 'hello'
    const sayHello = ()=>{
        console.log(`${a} zhaowa`)
    }
    return {
        a,
        sayHello
    }
}）（moduleA,moduleB）

module.sayHello()


Common.js
1. Common.js规范，由node.js制定,从框架方面解决了模块使用方式
- 特征：通过module+exports对外暴露，通过require导入模块
- 优点：在框架层面解决了依赖、全局变量污染的问题
- 缺点：主要针对的服务端，模块同步加载

webpack对CommonJS的实现
首先定义一个入口文件和依赖模块
//index.js
'use strict';
var bar = require('./bar');
function foo() {
    return bar.bar();
}

//bar.js
'use strict';
exports.bar = function () {
    return 1;
}


通过webpack打包得到打包结果
;(function (modules) {
    var installedModules = {}
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }
        // Create a new module (and put it into the cache)
        var module = (installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        })
        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
        // Flag the module as loaded
        module.l = true
        // Return the exports of the module
        return module.exports
    }
    __webpack_require__.m = modules
    __webpack_require__.c = installedModules
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            })
        }
    }
    __webpack_require__.n = function (module) {
        var getter =
            module && module.__esModule
                ? function getDefault() {
                        return module['default']
                  }
                : function getModuleExports() {
                        return module
                  }
        __webpack_require__.d(getter, 'a', getter)
        return getter
    }
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    }
    __webpack_require__.p = ''
    return __webpack_require__((__webpack_require__.s = 0))
})([
    function (module, exports, __webpack_require__) {
        'use strict'

        var bar = __webpack_require__(1)
        bar.bar()
    },
    function (module, exports, __webpack_require__) {
        'use strict'

        exports.bar = function () {
            return 1
        }
    }
])


webpack对commonjs的实现主要是通过IIFE+实现require函数，require函数是一个闭包，保存模块函数和已缓存模块的引用

每个模块变成了什么：每个模块都被打包成一个函数，函数的代码就是我们在模块文件中编写的代码，函数接收module、exports、require三个参数，也是在commonjs中用到的三个变量

IIFE干了些什么：IIFE的执行，将所有的模块以数组的形式传入，定义已加载模块的缓存和require函数的实行

require怎么实现 ：require函数接收一个id，标识模块，首先函数判断已加载模块中是否有缓存，如果有缓存，直接返回缓存的模块数据，如果没有缓存，通过modules[id]拿到模块函数，并执行，得到结果返回并缓存

伪代码的实现 ：
;(modules => {
    // 定义缓存module
    const installedModules = {}

    // 定义require函数
    const require = moduleId => {
        // 判断缓存
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }
        // 定义缓存
        const module = (installedModules[moduleId] = {
            l: false,
            exports: {}
        })
        // 执行模块
        modules[moduleId].call(module.exports, module, module.exports, require)

        return module.exports
    }
    require(modules[0])
})([moduleA, moduleB, moduleC])


AMD 
AMD规范，允许使用回调函数实现的异步加载，通过require.js实现
定义模块
通过define(id?: String, dependencies?: String[], factory: Function|Object)定义模块
id 是模块的名字，它是可选的参数。dependencies 指定了所要依赖的模块列表，它是一个数组，也是可选的参数，每个依赖的模块的输出将作为参数一次传入 factory 中。如果没有指定 dependencies，那么它的默认值是 ["require", "exports", "module"]

define('myModule',['module1','module2'],function(require, exports, module) {}）


引入模块 
通过require(moduleId,cb)引入模块
require(['myModule'], function(myModule) {});


- 优点：可以在浏览器中异步加载模块
- 缺点：1. 需要引入第三方库，2. 同时不能按需加载(依赖前置）

CMD
CMD规范，实现了按需加载,通过sea.js实现
- 特征：通过define(module,function(require, exports, module) {}))定义模块
- 优点：按需加载
- 缺点：需要引入第三方库，依赖于打包，加载逻辑存在于每个模块中，扩大模块体积

AMD与CMD的异同
相同点：都定义了异步加载模块的方式
不同点：
2. 定义模块时对依赖的处理不同，AMD推崇依赖前置，在定义模块时就要声明依赖的模块，CMD推崇就近原则，在使用到的地方再require模块
3. 模块的执行处理不同，AMD在加载完模块后立即执行，都加载完成后进入回调逻辑，CMD会加载所有的模块，加载完后执行回调，遇到require的地方才会执行相应的依赖
ESmodule
ESModule，在语言层面规定了浏览器模块化标准
- 特征：通过export导出，通过import引入
// 基本使用
export const aa = 1
export function aaa (){}
export const aaaa = ()=>{}
export { a, b as c }
import { a, c as d }
import * as aa from "*.js"

// 默认导出
export { a, b } as default
// 等同于
export default { a ,b }

// 动态导入
import('a.js').then(({default})=>{})

- 优点：统一了模块化的形态
- 缺点：不借助webpack的情况下，本质上还是运行时的依赖分析

webpack对ES Module的实现

首先定义入口文件和es依赖模块
// m.js
'use strict';
export default function bar () {
    return 1;
};
export function foo () {
    return 2;
}

// index.js
'use strict';
import bar, {foo} from './m';
bar();
foo();


webpack得到打包后的文件
;(function (modules) {
    var installedModules = {}
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }
        var module = (installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        })
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
        module.l = true
        return module.exports
    }
    __webpack_require__.m = modules
    __webpack_require__.c = installedModules
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            })
        }
    }
    __webpack_require__.n = function (module) {
        var getter =
            module && module.__esModule
                ? function getDefault() {
                        return module['default']
                  }
                : function getModuleExports() {
                        return module
                  }
        __webpack_require__.d(getter, 'a', getter)
        return getter
    }
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    }
    __webpack_require__.p = ''
    return __webpack_require__((__webpack_require__.s = 0))
})([
    function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        Object.defineProperty(__webpack_exports__, '__esModule', { value: true })
        var __WEBPACK_IMPORTED_MODULE_0__m__ = __webpack_require__(1)

        Object(__WEBPACK_IMPORTED_MODULE_0__m__['a' /* default */])()
        Object(__WEBPACK_IMPORTED_MODULE_0__m__['b' /* foo */])()
    },
    function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_exports__['a'] = bar
        __webpack_exports__['b'] = foo

        function bar() {
            return 1
        }
        function foo() {
            return 2
        }
    }
])

Webpack对ES Module与Commonjs的实现差不多，都是将模块包装在函数当中，将各个模块放在一个数组中传入立即执行函数，定义require函数来加载模块

区别：
4. ES Module中，模块打上了_esmodule标记，标识是一个ES Module，
5. cmmonjs的加载 和分析 都是在运行 时，esmodule是在编译 时进行加载  和分析 （依赖分析）
6. commonjs输出的是值的拷贝 ，并且可以更改，多个地方更改互不影响，esmodule输出的是值的引用 ，多个地方引用同一个值，在运行时做动态映射 ，也导入的值不可更改，

webpack对模块化的兼容实现
// t表示工厂函数
(function(global,t){
    // 环境判断
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define([], t)
        : 'object' == typeof exports
        ? (exports.math = t())
        : (global.math = t())
}
})(slef,t)

// commonjs 环境判断
typeof module === 'object' && typeof exports === 'object'
module.exports = t()

// amd环境判断
define.amd && typeof define === 'function'
define([],t)

// 左后是浏览器环境
global.math = t()

```
