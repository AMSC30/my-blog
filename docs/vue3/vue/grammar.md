# Vue3语法

Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型。[官方文档](https://cn.vuejs.org/)

## 基本语法

### 选项式API

使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例

```js
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### 组合式API

通过组合式 API，我们可以使用导入的`API函数`来描述组件逻辑。在单文件组件中，组合式 API 通常会与 `<script setup>` 搭配使用。这个 setup attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。比如，`<script setup>` 中的导入和顶层变量/函数都能够在模板中直接使用

```js
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### 组合式函数

组合式函数是一个利用 Vue 的`组合式 API`来封装和复用`有状态`逻辑的函数，一个组合式函数可以调用一个或多个其他的组合式函数，通常以“use”作为开头

组合式函数在`<script setup>`或`setup()`钩子中，应始终被同步地调用

### 应用创建

每个 Vue 应用都是通过 createApp 函数创建一个新的应用实例，传入 createApp 的对象实际上是一个组件，这个组件将作为应用的根组件，其他所有的组件都是这个组件的子组件
应用实例必须在调用`mount`方法后才能渲染出来，该方法接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串。
应用根组件的内容将会被渲染在容器元素里面。容器元素自己将不会被视为应用的一部分。
`mount`方法应该始终在整个应用配置和资源注册完成后被调用。同时请注意，不同于其他资源注册方法，它的返回值是根组件实例而非应用实例

### setup函数

setup() 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：

- 需要在非单文件组件中使用组合式 API 时。
- 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时

在 setup() 函数中返回的对象会暴露给模板和组件实例，setup()自身并不含对组件实例的访问权，即在 setup()中访问this会是 undefined，其他的选项也可以通过组件实例(this)来获取 setup() 暴露的属性

**1. 参数**

**1.）props**

props 是响应式的，并且会在传入新的 props 时同步更新，如果解构了 props 对象，解构出的变量将会丢失响应性，所以通过props.xxx进行访问属性

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

**2.)context**

上下文对象暴露了其他一些在 setup 中可能会用到的值

```js
export default {
  setup(props, context) {
    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log(context.attrs)

    // 插槽（非响应式的对象，等价于 $slots）
    console.log(context.slots)

    // 触发事件（函数，等价于 $emit）
    console.log(context.emit)

    // 暴露公共属性（函数）
    console.log(context.expose)
  }
}
```

**2. 返回值**

setup一般返回一个对象提供给模板和选项使用，特殊情况下，可以返回一个渲染函数，可以在渲染函数中使用同一作用域下声明的响应式状态

```js
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

这时候在父组件中通过模板引用就会出现问题，可以利用`expose`api解决

```js
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

## 响应式

### 声明

**1. reactive**
使用 reactive() 函数创建一个响应式对象或数组

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

在 Vue 中，状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到

对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身

依靠深层响应性，响应式对象内的嵌套对象依然是代理

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

局限性：

- 仅对`对象类型`有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的`原始类型`无效
- 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失

**2. ref**

reactive() 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制。为此，Vue 提供了一个 ref() 方法来允许我们创建可以使用任何值类型的响应式 ref,
ref() 将传入参数的值包装为一个带 .value 属性的 ref 对象

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

**1）当值为对象类型时，会用 reactive() 自动转换它的 .value**

```js
const objectRef = ref({ count: 0 })

// 这是响应式的替换
objectRef.value = { count: 1 }
```

**2）ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性**

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
callSomeFunction(obj.foo)

// 仍然是响应式的
const { foo, bar } = obj
```

**3）解包**

- 当 ref 在模板中作为`顶层属性`被访问时，它们会被自动“解包”，所以不需要使用 .value
- ref 是`文本插值`（即一个 `{{ }}` 符号）计算的最终值，它也将被解包
- 当一个ref被嵌套在一个`响应式对象`中，作为属性被访问或更改时，它会自动解包
- ref 作为响应式`数组`或像`Map`这种原生集合类型的元素被访问时，不会进行解包

**4）模板引用**

为了通过组合式 API 获得该模板引用，我们需要声明一个同名的 ref

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

只可以在组件挂载后才能访问模板引用。如果想在模板中的表达式上访问 input，在初次渲染时会是 null

当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

除了使用字符串值作名字，ref attribute 还可以绑定为一个`函数`，会在每次组件更新时都被调用。该函数会收到`元素引用`作为其第一个参数，当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null

```html
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```

模板引用也可以被用在一个子组件上，引用中获得的值是组件实例，如果一个子组件使用的是选项式 API 或没有使用`<script setup>`，被引用的组件实例和该子组件的 this 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易，当然也因此，应该只在绝对需要时才使用组件引用。大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```

使用了`<script setup>`的组件是默认私有的：一个父组件无法访问到一个使用了`<script setup>`的子组件中的任何东西，除非子组件在其中通过`defineExpose`宏显式暴露

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>
```

**3. readonly**

接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理，只读代理是深层的，想要避免深层的转换行为，可以使用shadowReadonly

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})

// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!
```

**4. shallowRef**

ref() 的浅层作用形式，常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的

```js
const state = shallowRef({ count: 1 })

// 不会触发更改
state.value.count = 2

// 会触发更改
state.value = { count: 2 }
```

**5. triggerRef**

强制触发依赖于一个浅层ref的副作用，由于深层的属性更新不会触发视图的更新，可以通过这个api解决

**6. shallowReactive**

reactive() 的浅层作用形式，一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了

**7. shallowReadonly**

readonly() 的浅层作用形式

**8. toRaw**

返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象

**9.markRaw**

将一个对象标记为不可被转为代理。返回该对象本身

**10. effectScope**

创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理

```js
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

// 处理掉当前作用域内的所有 effect
scope.stop()
```

### 工具

**1. isRef**

检查某个值是否为 ref

**2. unref**

如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖

**3. toRef**

可以将值、refs 或 getters 规范化为 refs (3.3+)，也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然

```js
// 按原样返回现有的 ref
toRef(existingRef)

// 创建一个只读的 ref，当访问 .value 时会调用此 getter 函数
toRef(() => props.foo)

// 从非函数的值中创建普通的 ref
// 等同于 ref(1)
toRef(1)

const state = reactive({
  foo: 1,
  bar: 2
})

// 双向 ref，会与源属性同步
const fooRef = toRef(state, 'foo')

// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2

// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3
```

**4. toRefs**

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的，对于解构时很有用

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型：{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// 这个 ref 和源属性已经“链接上了”
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

**5. isProxy**

检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理

**6. isReactive**

检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理

**7. isReadonly**

检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值

## 模板语法

### 文本插值

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

```html
<span>Message: {{ msg }}</span>
```

### 原始HTML--v-html

双大括号会将数据解释为`纯文本`，而不是 HTML。若想插入 HTML，你需要使用`v-html`指令

### 属性绑定--v-bind

双大括号不能在 HTML attributes 中使用。想要响应式地绑定一个 attribute，应该使用`v-bind`指令

**1. 简写**

以`:`开头的属性是使用`v-bind`属性绑定的简写形式

**2. 动态绑定多个值**

如果有一个包含多个属性的对象，需要将这个对象的所有属性传递给单个元素，可以使用不带参数的属性绑定

```vue
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
<div v-bind="objectOfAttrs"></div>
```

**3. 动态参数**

在指令参数上使用一个js表达式，将表达式包含在一对方括号内，可以实现属性的动态绑定

```html
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```

这里的 attributeName 会作为一个 JavaScript 表达式被动态执行，计算得到的值会被用作最终的参数，
动态参数中表达式的值应当是一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。其他非字符串的值会触发警告

**4. class绑定**

class绑定可用于动态切换元素的class，与普通的class可以共存

**1）使用对象**

```html
<div :class="{ active: isActive }"></div>
```

当isActive为true时，元素上的class将会有active，既可以接受一个内联的对象，也可以绑定一个对象变量

**2）使用数组**

使用数组时，数组的项可以是`class字符串`

```vue
const activeClass = ref('active')
<div :class="[activeClass, 'text-danger']"></div>
```

也可以是一个`对象`

```vue
<div :class="[{ active: isActive }, errorClass]"></div>
```

也可以是一个返回`对象`或者`字符串`的`表达式`

```vue
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

**3）组件上使用**

对于只有一个根元素的组件，当你使用了 class attribute 时，这些 class 会被添加到根元素上并与该元素上已有的 class 合并，如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs 属性来实现指定

```vue
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

**5. style绑定**

**1）使用对象**

通过对style传入一个对象表达式，控制元素的style属性，对象的key可以是cameCase形式，也可以是用引号包裹的kebab-cased形式，也可以传入一个对象变量，这样使模板更加简洁

```vue
const activeColor = ref('red')
const fontSize = ref(30)
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

**2）使用数组**

为style绑定一个包含多个样式对象的数组，这些对象在渲染时会进行合并

**3）样式多值**

可以对一个样式属性提供多个 (不同前缀的) 值

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 display: flex

### 条件渲染--v-if

**1. v-if**

v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

**2. v-else**​
也可以使用 v-else 为 v-if 添加一个“else 区块”。

```html
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

**3. v-else-if**

v-else-if 提供的是相应于 v-if 的“else if 区块”。它可以连续多次重复使用

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

一个使用 v-else-if 的元素必须紧跟在一个 v-if 或一个 v-else-if 元素后面

**4. v-show**

v-show也可以用来按条件显示一个元素

```html
<h1 v-show="ok">Hello!</h1>
```

::: warning
v-show 不支持在 `<template>` 元素上使用，也不能和 v-else 搭配使用
:::

**5. v-if vs. v-show​**

v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的`事件监听器`和`子组件`都会被`销毁与重建`。

v-if 也是`惰性`的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

v-show 简单许多，元素无论初始条件如何，`始终会`被渲染，只有 CSS display 属性会被切换。

总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适

### 列表渲染--v-for

**1. 语法**

使用 v-for 指令基于一个数组、对象或者数字来渲染一个列表，需要使用`item in items`或者`item of items`的形式

数组形式：

```vue
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

对象形式：

```vue
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
<ul>
  <li v-for="(value, key, index) in myObject">
    {{ value }}
  </li>
</ul>
```

范围形式：

```html
<span v-for="n in 10">{{ n }}</span>
```

**2. 解构**

定义变量别名时可以使用解构

```html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

::: info
推荐在任何可行的时候为 v-for 提供一个 key attribute，除非所迭代的 DOM 内容非常简单 (例如：不包含组件或有状态的 DOM 元素)，或者你想有意采用默认行为来提高性能。

key 绑定的值期望是一个基础类型的值，例如字符串或 number 类型。不要用对象作为 v-for 的 key
:::

### 事件绑定--v-on

使用 v-on 指令 (简写为 @) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。

**1. 事件处理器形式**

**1.）内联事件处理器**

```vue
const count = ref(0)
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

**2.）方法名**

```vue
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}
<button @click="greet">Greet</button>
```

方法接收原生的dom事件对象作为参数

**3.）函数声明**

函数声明的方式与直接使用方法名类型，使用方法名会从函数作用域中查找函数声明

```vue
<button @click="(event)=>{alert('hello')}">Greet</button>
```

**4.）函数调用**

直接调用方法

```vue
<button @click="say('hello',$event)">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

**2. 事件修饰符**

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

::: info
使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 @click.prevent.self 会阻止元素及其子元素的所有点击事件的默认行为，而 @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为

请勿同时使用 .passive 和 .prevent，因为 .passive 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 .prevent 会被忽略，并且浏览器会抛出警告
:::

**3. 按键别名修饰符**

.enter/ .tab/ .delete (捕获“Delete”和“Backspace”两个按键)/ .esc/ .space/ .up/ .down/ .left/ .right

**4. 系统按键修饰符**

.ctrl/ .alt/ .shift/ .meta

**5. 鼠标按键修饰符**

.left/ .right/ .middle

### 自定义指令

**1. Vue中重用代码的方式**

在Vue中有常用的三种重用代码的方式：组件、组合式函数和自定义指令。

- 组件是主要的构建模块，包含重用的界面结构和交互逻辑

- 组合式函数侧重于有状态的逻辑。

- 自定义指令主要是为了重用涉及普通元素的底层`DOM`访问的逻辑

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数

**2. 指令注册**

**1）全局注册**

将一个自定义指令全局注册到应用层级

```js
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```

**2）局部注册**

在没有使用`<script setup>`的情况下，自定义指令需要通过 directives 选项注册

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

使用`<script setup>`的情况下，指令名称需要以`小写v`开头并通过cameCase的方式进行命名

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

**3. 指令钩子**

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },

  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},

  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},

  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},

  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},

  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},

  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

**4.钩子参数**

- el：指令绑定到的元素。这可以用于直接操作 DOM。

- binding：一个对象，包含以下属性。
  - value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
  - oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
  - arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
  - modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
  - instance：使用该指令的组件实例。
  - dir：指令的定义对象。
- vnode：代表绑定元素的底层 VNode。
- prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。

当在组件上使用自定义指令时，它会始终应用于组件的根节点

## 组件化

### 组件注册

**1. 全局注册**
调用应用实例的component方法，让组件在当前vue应用中全局可用，调用方法后返回应用实例，因此支持链式调用

**2. 局部注册**
在使用`<script setup>`的单文件组件中，导入的组件可以直接在模板中使用，无需注册，如果没有使用`<script setup>`，则需要使用 components 选项来显式注册

**3. 组件名格式**
在整个指引中，我们都使用 PascalCase 作为组件名的注册格式，这是因为：

- PascalCase 是合法的 JavaScript 标识符。这使得在 JavaScript 中导入和注册组件都很容易，同时 IDE 也能提供较好的自动补全。

- `<PascalCase />`在模板中更明显地表明了这是一个 Vue 组件，而不是原生 HTML 元素。同时也能够将 Vue 组件和自定义元素 (web components) 区分开来

### 生命周期

**1. onMounted**

注册一个回调函数，在组件挂载完成后执行

挂载标准：

- 所有同步子组件（不包含异步或<Suspens></Suspens>树中的组件）
- 自身的DOM树已经创建并插入到父容器中，根组件也已经插入到DOM中

**2. onUpdated**

注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用，父组件的更新钩子将在其子组件的更新钩子之后调用

不要在这个钩子中更改组件状态，否则可能产生无限循环

**3. onUnmounted**

注册一个回调函数，在组件实例被卸载之后调用，常用于清理组件的副作用

卸载标准：

- 所有子组件都已经卸载
- 所有响应式作用都已经停止

**4. onBeforeMount**

注册一个钩子，在组件被挂载之前被调用，此时已经完成响应式状态的设置

**5. onBeforeUpdate**

注册一个钩子，在组件更新前被调用，此时状态已经更改，同时也可以在这个钩子中更改状态

**6. onBeforeUnmount**

注册一个钩子，在组件实例被卸载之前调用

**7. onErrorCaptured**

注册一个钩子，在捕获了后代组件传递的错误时调用

```ts
function onErrorCaptured(callback: ErrorCapturedHook): void

type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void
```

这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串。可以通过返回 false 来阻止错误继续向上传递

**1）错误来源**

- 组件渲染
- 事件处理器
- 生命周期钩子
- setup() 函数
- 侦听器
- 自定义指令钩子
- 过渡钩子

**2）错误传递规则**

- 默认情况下，所有的错误都会被发送到应用级的 app.config.errorHandler (前提是这个函数已经定义)，这样这些错误都能在一个统一的地方报告给分析服务。
- 如果组件的继承链或组件链上存在多个 errorCaptured 钩子，对于同一个错误，这些钩子会被按从底至上的顺序一一调用。这个过程被称为“向上传递”，类似于原生 DOM 事件的冒泡机制。
- 如果 errorCaptured 钩子本身抛出了一个错误，那么这个错误和原来捕获到的错误都将被发送到 app.config.errorHandler。
- errorCaptured 钩子可以通过返回 false 来阻止错误继续向上传递。即表示“这个错误已经被处理了，应当被忽略”，它将阻止其他的 errorCaptured 钩子或 app.config.errorHandler 因这个错误而被调用

**8. onActivated**

注册一个回调函数，若组件实例是`<KeepAlive>`缓存树的一部分，当组件被插入到 DOM 中时调用

**9.onDeactivated()**

注册一个回调函数，若组件实例是`<KeepAlive>`缓存树的一部分，当组件从 DOM 中被移除时调用

### 计算属性

computed() 方法期望接收一个`getter`函数，返回值为一个计算属性`ref`

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

Vue 的计算属性会自动追踪响应式依赖。它会检测到 publishedBooksMessage 依赖于 author.books，所以当 author.books 改变时，任何依赖于 publishedBooksMessage 的绑定都会同时更新

计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

### 监听器

与计算属性相比，计算属性是将值通过计算缓存下来，而监听器主要是在依赖的状态发生变化时执行一些`副作用`

watch方法允许添加一个监听器，watch 的第一个参数可以是不同形式的“数据源”：它可以是一个`ref (包括计算属性)`、一个`响应式对象`、一个`getter函数`、或多个数据源组成的`数组`
watch一个响应式对象，默认是深层监听的，回调会在嵌套的每个属性变化时调用，当需要监听对象的某个属性时，需要使用`getter`函数

```js
const x = ref(0)
const y = ref(0)
const obj = reactive({ count: 0 })

// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

::: info
watch 默认是懒执行的：仅当数据源变化时，才会执行回调,可以通过传入 immediate: true 选项来强制侦听器的回调立即执行
:::

**1. 自动跟踪**

使用watch，需要我们明确指定跟踪源，通过`watchEffect`允许自动跟踪回调的响应式依赖，但是回调会立即执行

优点：

- 对于有多个依赖项的侦听器来说，使用 watchEffect() 可以消除手动维护依赖列表的负担
- 侦听一个嵌套数据结构中的几个属性，watchEffect() 可能会比深度侦听器更有效，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性

watch vs. watchEffect​：

- watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：
- watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

**2. 回调触发时机**

用户创建的侦听器回调，都会在 Vue 组件更新之前被调用，如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，需要指明 flush: 'post' 选项

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

或者使用内置的别名

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

**3. 停止监听**

在`setup()`或`<script setup>`中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止

如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，必须手动停止它，以防内存泄漏

```vue
<script setup>
import { watchEffect } from 'vue'

const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
</script>
```

### 属性传递

**1. 声明**

在使用`<script setup>`的单文件组件中，props 可以使用 defineProps() 宏来声明，在没有使用`<script setup>`的组件中，prop 可以使用 props 选项来声明，
传递给 defineProps() 的参数和提供给 props 选项的值是相同的，两种声明方式背后其实使用的都是 prop 选项

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```

- 所有 prop 默认都是可选的，除非声明了 required: true。
- 除 Boolean 外的未传递的可选 prop 将会有一个默认值 undefined。
- Boolean 类型的未传递 prop 将被转换为 false。这可以通过为它设置 default 来更改——例如：设置为 default: undefined 将与非布尔类型的 prop 的行为保持一致。
- 如果声明了 default 值，那么在 prop 的值被解析为 undefined 时，无论 prop 是未被传递还是显式指明的 undefined，都会改为 default 值

**2. 继承**

属性传入到组件内部，如果组件没有进行props和emits声明，未被消费的属性和事件会被根组件继承

当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上，如果组件的根节点是另一个组件，属性会深层次得传递，如果透传的属性符合声明，也可以作为props传递给深层次组件

如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 inheritAttrs: false

```vue
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>
```

从3.3开始可以使用defineOptions

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```

和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。如果 $attrs 没有被显式绑定，将会抛出一个运行时警告

如果需要，可以在`<script setup>`中使用 useAttrs() API 来访问一个组件的所有透传 attribute

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

如果没有使用`<script setup>`，attrs 会作为 setup() 上下文对象的一个属性暴露

```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

**2. 依赖注入**

**1）提供**

要为组件后代提供数据，需要使用到`provide()`函数

provide() 函数接收两个参数。

第一个参数被称为注入名，可以是一个字符串或是一个 Symbol。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 provide()，使用不同的注入名，注入不同的依赖值

第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 ref

```vue
<script setup>
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
provide(/* 注入名 */ 'message', /* 值 */ 'hello!')

</script>
```

除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

**2）注入**

要注入上层组件提供的数据，需使用`inject()`函数，如果提供的值是一个 ref，注入进来的会是该 ref 对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接

如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message', '这是默认值')
</script>
```

### 事件监听

在组件的模板表达式中，可以直接使用 $emit 方法触发自定义事件

```html
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

在`<script setup>`中，defineEmits() 会返回一个相同作用的emit函数

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

emits 选项还支持对象语法，它允许我们对触发事件的参数进行验证

```vue
<script setup>
const emit = defineEmits({
  submit(payload) {
    // 通过返回值为 `true` 还是为 `false` 来判断
    // 验证是否通过
  }
})
</script>
```

显式地使用了 setup 函数,则事件需要通过 emits 选项来定义，emit 函数也被暴露在 setup() 的上下文对象上

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

### 插槽

**1. 渲染作用域**

插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的，插槽内容无法访问子组件的数据

**2. 默认插槽**

在外部没有提供任何内容的情况下，可以为插槽指定默认内容

```html
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```

**3. 具名插槽**

在一个组件中，可能会包含多个插槽出口，对于这种场景，`<slot>`元素可以有一个特殊的属性`name`，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容，如果没有定义name属性，会隐式地命名为`default`

向插槽出口传递内容时，可以通过`v-slot`指令，指令参数为插槽的名称，参数可以是动态的，和属性绑定的动态参数一样

```vue
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

v-slot 有对应的简写 #，因此`<template v-slot:header>`可以简写为`<template #header>`

**4. 作用域插槽**

作用域插槽用于访问子组件的数据

```vue
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

**5.具名作用域插槽**

```vue
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```
