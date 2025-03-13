# 手写js

## 数组扁平化

数组扁平化是指将一个多维数组变为一个一维数组

```js
const arr = [1, [2, [3, [4, 5]]], 6];

// => [1, 2, 3, 4, 5, 6]
```

- 方法一：使用flat()

```js
const res1 = arr.flat(Infinity);
```

- 方法二：利用正则

```js
const res2 = JSON.stringify(arr).replace(/[|]/g, '').split(',');
```

> 数据类型都会变为字符串

- 方法三：正则改良版本

```js
const res3 = JSON.parse('[' + JSON.stringify(arr).replace(/[|]/g, '') + ']');
```

- 方法四：使用reduce

```js
const flatten = arr => {  
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);  }, [])
}
const res4 = flatten(arr);
```

- 方法五：函数递归

```js
const res5 = [];
const fn = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            fn(arr[i]);
        } else {
            res5.push(arr[i]);
        }
    }
}
fn(arr);
```

## 数组去重

```js
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]
```

- 方法一：利用Set

```js
const res1 = Array.from(new Set(arr));
```

- 方法二：两层for循环+splice

```js
const unique1 = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
        len--;
        j--;
      }
    }
  }
  return arr;
};
```

- 方法三：利用indexOf

```js
const unique2 = (arr) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) res.push(arr[i]);
  }
  return res;
};
```

当然也可以用include、filter，思路大同小异。

- 方法四：利用include

```js
const unique3 = (arr) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
};
```

- 方法五：利用filter

```js
const unique4 = (arr) => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
};
```

- 方法六：利用Map

```js
const unique5 = (arr) => {
  const map = new Map();
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true);
      res.push(arr[i]);
    }
  }
  return res;
};
```

## 类数组转化为数组

类数组是具有length属性，但不具有数组原型上的方法。常见的类数组有arguments、DOM操作方法返回的结果。

- 方法一：Array.from

```js
Array.from(document.querySelectorAll('div'))
```

- 方法二：Array.prototype.slice.call()

```js
Array.prototype.slice.call(document.querySelectorAll('div'))
```

- 方法三：扩展运算符

```js
[...document.querySelectorAll('div')]
```

- 方法四：利用concat

```js
Array.prototype.concat.apply([], document.querySelectorAll('div'));
```

## Array.prototype.filter

```js
Array.prototype.filter = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  const res = [];
  // 让O成为回调函数的对象传递（强制转换对象）
  const O = Object(this);
  // >>>0 保证len为number，且为正整数
  const len = O.length >>> 0;
  for (let i = 0; i < len; i++) {
    // 检查i是否在O的属性（会检查原型链）
    if (i in O) {
      // 回调函数调用传参
      if (callback.call(thisArg, O[i], i, O)) {
        res.push(O[i]);
      }
    }
  }
  return res;
};
```

## Array.prototype.map

```js
Array.prototype.map = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const res = [];
  // 同理
  const O = Object(this);
  const len = O.length >>> 0;
  for (let i = 0; i < len; i++) {
    if (i in O) {
      // 调用回调函数并传入新数组
      res[i] = callback.call(thisArg, O[i], i, this);
    }
  }
  return res;
};
```

## Array.prototype.forEach

forEach跟map类似，唯一不同的是forEach是没有返回值的。

```js
Array.prototype.forEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  while (k < len) {
    if (k in O) {
      callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
};
```

## Array.prototype.reduce

```js
Array.prototype.reduce = function (callback, initialValue) {
  if (this == undefined) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callbackfn + " is not a function");
  }
  const O = Object(this);
  const len = this.length >>> 0;
  let accumulator = initialValue;
  let k = 0;
  // 如果第二个参数为undefined的情况下
  // 则数组的第一个有效值作为累加器的初始值
  if (accumulator === undefined) {
    while (k < len && !(k in O)) {
      k++;
    }
    // 如果超出数组界限还没有找到累加器的初始值，则TypeError
    if (k >= len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = O[k++];
  }
  while (k < len) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[k], k, O);
    }
    k++;
  }
  return accumulator;
};
```

## Function.prototype.apply

第一个参数是绑定的this，默认为window，第二个参数是数组或类数组

```js
Function.prototype.apply = function (context = window, args) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  const fn = Symbol("fn");
  context[fn] = this;

  const res = contextfn;
  delete context[fn];
  return res;
};
```

## Function.prototype.call

与call唯一不同的是，call()方法接受的是一个参数列表

```js
Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  const fn = Symbol("fn");
  context[fn] = this;

  const res = thisfn;
  delete this.fn;
  return res;
};
```

## Function.prototype.bind

```js
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }
  // 保存this的值
  var self = this;

  return function F() {
    // 考虑new的情况
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, [...args, ...arguments]);
  };
};
```

## debounce（防抖）

触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。

```js
function debounce(fn, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this

    if (immediate && !timeout) {
      fn.apply(context, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
```

防抖常应用于用户进行搜索输入节约请求资源，window触发resize事件时进行防抖只触发一次。

## throttle（节流）

高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率。

- 标志版本

```js
const throttle = (fn, time) => {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  };
};
```

- 时间版本

```js
function throttle(fn, intervalTime) {
  let startTime = 0;

  return function () {
    if(!startTime) {
      startTime = Date.now()
      return
    }

    let context = this;

    let endTime = Date.now();

    if (endTime - startTime > intervalTime) {
      fn.apply(context, arguments);
      startTime = endTime;
    }
  };
}
```

- 精确版本

```js
function throttle(fn, delay) {
  let timer = null
  let startTime = 0
  return function () {
    let context = this
    // 第一次触发
    if (!startTime) {
      startTime = Date.now()
      timer = setTimeout(() => {
        fn.apply(context, arguments)
      }, delay)
      return
    }

    let endTime = Date.now()
    const remainTime = delay - (endTime - startTime)
    clearTimeout(timer)

    if (remainTime <= 0) {
      fn.apply(context, arguments)
      startTime = Date.now()
    } else {
      timer = setTimeout(() => {
        fn.apply(context, arguments)
      }, remainTime)
    }
  }
}
```

## 函数珂里化

指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)
经典面试题：实现add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;

```js
function add() {
  const _args = [...arguments];
  function fn() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function () {
    return _args.reduce((sum, cur) => sum + cur);
  };
  return fn;
}
```

## 模拟new操作

3个步骤：

1. 以ctor.prototype为原型创建一个对象。
2. 执行构造函数并将this绑定到新创建的对象上。
3. 判断构造函数执行返回的结果是否是引用数据类型，若是则返回构造函数执行的结果，否则返回创建的对象。

```js
function newOperator(ctor, ...args) {
  if (typeof ctor !== "function") {
    throw new TypeError("Type Error");
  }
  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);

  const isObject = typeof res === "object" && res !== null;
  const isFunction = typeof res === "function";
  return isObject || isFunction ? res : obj;
}
```

## instanceof

instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。

```js
const myInstanceof = (left, right) => {
  // 基本数据类型都返回false
  if (typeof left !== "object" || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};
```

## 原型继承

这里只写寄生组合继承了，中间还有几个演变过来的继承但都有一些缺陷

```js
function Parent(Parent) {
  this.name = "parent";
}
function Child() {
  Parent.call(this);
  this.type = "children";
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Object.is
Object.is解决的主要是这两个问题：
+0 === -0  // true
NaN === NaN // false
const is = (x, y) => {
  if (x === y) {
    // +0和-0应该不相等
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
};
```

## Object.assign

Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象（请注意这个操作是浅拷贝）

```js
Object.defineProperty(Object, "assign", {
  value: function (target, ...args) {
    if (target == null) {
      return new TypeError("Cannot convert undefined or null to object");
    }

    // 目标对象需要统一是引用数据类型，若不是会自动转换const to = Object(target);for (let i = 0; i < args.length; i++) {  // 每一个源对象  const nextSource = args[i];  if (nextSource !== null) {    // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）    for (const nextKey in nextSource) {      if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {        to[nextKey] = nextSource[nextKey];      }    }  }}return to;
  },
  // 不可枚举
  enumerable: false,
  writable: true,
  configurable: true,
});
```

## 深拷贝

递归的完整版本（考虑到了Symbol属性）：

- 完成版本

```js
const cloneDeep = (target, hash = new WeakMap()) => {
  // 对于传入参数处理
  if (typeof target !== "object" || target === null) {
    return target;
  }
  // 哈希表中存在直接返回
  if (hash.has(target)) return hash.get(target);

  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);

  // 针对Symbol属性
  const symKeys = Object.getOwnPropertySymbols(target);
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      if (typeof target[symKey] === "object" && target[symKey] !== null) {
        cloneTarget[symKey] = cloneDeep1(target[symKey]);
      } else {
        cloneTarget[symKey] = target[symKey];
      }
    });
  }

  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      cloneTarget[i] =
        typeof target[i] === "object" && target[i] !== null
          ? cloneDeep1(target[i], hash)
          : target[i];
    }
  }
  return cloneTarget;
};
```

- 普通版本

```js
function deepClone(source) {
  if (source === null) return source;

  if (source instanceof Date) return new Date(source);

  if (source instanceof RegExp) return new RegExp(source);

  if (typeof source !== "object") return source;

  let target = new source.constructor();

  for (let key in source) {
    target[key] = deepClone(source[key]);
  }

  return target;
}
```

## Promise

实现思路：Promise源码实现

```js
const PENDDING = "PEDDING",
  FULFILED = "FULFILED",
  REJECTED = "REJECTED";

const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject(new TypeError("promise and x refer to the same object"));
  }

  if ((typeof x === "object" && x !== null) || typeof x !== "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            resolvePromise(promise, r, resolve, reject);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      reject(error);
    }
  } else {
    reject(x);
  }
};

class MyPromise {
  constructor(executor) {
    this.status = PENDDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolveCallbackList = [];
    this.onRejectCallbackList = [];

    const resolve = (val) => {
      if (this.status === PENDDING) {
        this.status = FULFILED;
        this.value = val;

        // 发布
        this.onResolveCallbackList.forEach((fn) => fn(this.value));
      }
    };

    const reject = (reason) => {
      if (this.status === PENDDING) {
        this.status = REJECTED;
        this.reason = reason;

        // 发布
        this.onRejectCallbackList.forEach((fn) => fn(this.reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      this.status = REJECTED;
      this.reason = error.message;
    }
  }
  then(onResolve, onReject) {
    const promise1 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILED) {
        setTimeout(() => {
          try {
            let x = onResolve(this.value);
            resolvePromise(promise1, x, resolve, reject);
          } catch (error) {
            reject();
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onReject(this.reason);
            resolvePromise(promise1, x, resolve, reject);
          } catch (error) {
            reject();
          }
        }, 0);
      }

      if (this.status === PENDDING) {
        // 订阅
        this.onResolveCallbackList.push(() => {
          try {
            let x = onResolve(this.value);
            resolvePromise(promise1, x, resolve, reject);
          } catch (error) {
            reject();
          }
        });
        this.onRejectCallbackList.push(() => {
          try {
            let x = onReject(this.reason);
            resolvePromise(promise1, x, resolve, reject);
          } catch (error) {
            reject();
          }
        });
      }
    });
    return promise1;
  }
}

module.exports = MyPromise;
```

## Promise.all

Promise.all是支持链式调用的，本质上就是返回了一个Promise实例，通过resolve和reject来改变实例状态。

```js
Promise.myAll = function (promiseArr) {
  return new Promise((resolve, reject) => {
    const ans = [];
    let index = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i]
        .then((res) => {
          ans[i] = res;
          index++;
          if (index === promiseArr.length) {
            resolve(ans);
          }
        })
        .catch((err) => reject(err));
    }
  });
};
```

## Promise.race

```js
Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p) => {
      // 如果不是Promise实例需要转化为Promise实例
      Promise.resolve(p).then(
        (val) => resolve(val),
        (err) => reject(err)
      );
    });
  });
};
```

## Promise并行限制

就是实现有并行限制的Promise调度器问题。

```js
class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCounts = 0;
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;

    this.queue
      .shift()()
      .then(() => {
        this.runCounts--;
        this.request();
      });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
// 2
// 3
// 1
// 4
```

## JSONP

script标签不遵循同源协议，可以用来进行跨域请求，优点就是兼容性好但仅限于GET请求

```js
const jsonp = ({ url, params, callbackName }) => {
  const generateUrl = () => {
    let dataSrc = "";
    for (let key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        dataSrc += `${key}=${params[key]}&`;
      }
    }
    dataSrc += `callback=${callbackName}`;
    return `${url}?${dataSrc}`;
  };
  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement("script");
    scriptEle.src = generateUrl();
    document.body.appendChild(scriptEle);
    window[callbackName] = (data) => {
      resolve(data);
      document.removeChild(scriptEle);
    };
  });
};
```

## AJAX

```js
const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Mscrosoft.XMLHttp");
    xhr.open("GET", url, false);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
};
```

## 图片懒加载

可以给img标签统一自定义属性src='default.png'，当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。

```js
function lazyload() {
  const imgs = document.getElementsByTagName("img");
  const len = imgs.length;
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight =
    document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}
```

// 可以使用节流优化一下

```js
window.addEventListener("scroll", lazyload);
```

## 滚动加载

原理就是监听页面滚动事件，分析clientHeight、scrollTop、offsetTop三者的属性关系。

```js
const loadingImg =
  "https://tse4-mm.cn.bing.net/th/id/OIP.7wM10eCjv4AyEVgs3vg2lwHaEK?w=323&h=180&c=7&o=5&pid=1.7";
const imgURLList = [
  "https://tse1-mm.cn.bing.net/th/id/OET.ee94864c36bc484383dbb1055317c2d1?w=272&h=135&c=7&rs=1&o=5&pid=1.9",
  "https://tse1-mm.cn.bing.net/th/id/OET.ee94864c36bc484383dbb1055317c2d1?w=272&h=135&c=7&rs=1&o=5&pid=1.9",
  "https://tse1-mm.cn.bing.net/th/id/OET.13c9503a2a1d4e5eb673139f3d5e20ae?w=272&h=135&c=7&rs=1&o=5&pid=1.9",
  "https://tse1-mm.cn.bing.net/th/id/OET.5f89daecf3a84a2fa850e82d4aab510d?w=272&h=135&c=7&rs=1&o=5&pid=1.9",
  "https://tse1-mm.cn.bing.net/th/id/OET.18e0e2026f7f40e7bb3ed99decfd4155?w=272&h=135&c=7&rs=1&o=5&pid=1.9",
  "https://tse1-mm.cn.bing.net/th/id/OET.a86fcd056df740d8ab87a3103593d334?w=272&h=135&c=7&rs=1&o=5&pid=1.9",
];
function createImg(url) {
  const img = new Image();
  img.src = loadingImg;
  img.style.width = "100%";
  img.height = 500;
  img["data-src"] = url;
  document.body.appendChild(img);
  loadImg(img, url);
  window.addEventListener("scroll", () => {
    loadImg(img, url);
  });
}
function loadImg(img, url) {
  const offsetTop = img.offsetTop;
  const scroll = document.documentElement.scrollTop;
  const clientHeight = document.body.clientHeight;
  if (offsetTop <= scroll + clientHeight) {
    const realImg = new Image();
    realImg.onload = () => {
      img.src = url;
    };
    realImg.src = url;
  }
}
imgURLList.forEach(createImg);
```

## 渲染几万条数据不卡住页面

渲染大数据时，合理使用createDocumentFragment和requestAnimationFrame，将操作切分为一小段一小段执行。

```js
setTimeout(() => {
  // 插入十万条数据
  const total = 100000;
  // 一次插入的数据
  const once = 20;
  // 插入数据需要的次数
  const loopCount = Math.ceil(total / once);
  let countOfRender = 0;
  const ul = document.querySelector("ul");
  // 添加数据的方法
  function add() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < once; i++) {
      const li = document.createElement("li");
      li.innerText = Math.floor(Math.random() * total);
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    countOfRender += 1;
    loop();
  }
  function loop() {
    if (countOfRender < loopCount) {
      window.requestAnimationFrame(add);
    }
  }
  loop();
}, 0);
```

## 打印出当前网页使用了多少种HTML元素

```js
const fn = () => {
  return [
    ...new Set([...document.querySelectorAll("*")].map((el) => el.tagName)),
  ].length;
};
```

值得注意的是：DOM操作返回的是类数组，需要转换为数组之后才可以调用数组的方法。

## 将VirtualDom转化为真实DOM结构

这是当前SPA应用的核心概念之一

```js
// vnode结构：
// {
//   tag,
//   attrs,
//   children,
// }

//Virtual DOM => DOM
function render(vnode, container) {
  container.appendChild(_render(vnode));
}
function_render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => render(child, dom));
  return dom;
}
```

## 字符串解析问题

```js
var a = {
  b: 123,
  c: "456",
  e: "789",
};
var str = "a123aa456aa {a.d}aaaa";
// 实现函数使得将str字符串中的{}内的变量替换，如果属性不存在保持原样（比如{a.d}）
// 类似于模版字符串，但有一点出入，实际上原理大差不差
const fn1 = (str, obj) => {
  let res = "";
  // 标志位，标志前面是否有{
  let flag = false;
  let start;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      flag = true;
      start = i + 1;
      continue;
    }
    if (!flag) res += str[i];
    else {
      if (str[i] === "}") {
        flag = false;
        res += match(str.slice(start, i), obj);
      }
    }
  }
  return res;
};
// 对象匹配操作
const match = (str, obj) => {
  const keys = str.split(".").slice(1);
  let index = 0;
  let o = obj;
  while (index < keys.length) {
    const key = keys[index];
    if (!o[key]) {
      return `{${str}}`;
    } else {
      o = o[key];
    }
    index++;
  }
  return o;
};
```
