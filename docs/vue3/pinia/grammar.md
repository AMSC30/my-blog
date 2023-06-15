# Pinia语法

Pinia是一个拥有组合式 API 的 Vue 状态管理库，是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态

[官方文档](https://pinia.vuejs.org/zh/introduction.html)

## store

### defineStore

Store 是用 defineStore() 定义的，它的第一个参数要求是一个独一无二的名字，被用作id并且是必须传入的，第二个参数是一个setup函数或者option对象

```js
import { defineStore } from 'pinia'
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

defineStore函数的返回值可以随意命名，但是最好用`use`开头

### option

与 Vue 的选项式 API 类似，我们也可以传入一个带有 state、actions 与 getters 属性的 Option 对象

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      // 通过this访问state的属性
      this.count++
    },
  },
})
```

可以认为 state 是 store 的数据 (data)，getters 是 store 的计算属性 (computed)，而 actions 则是方法 (methods)

### setup

与 Vue 组合式 API 的 setup 函数 相似，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

在 Setup Store 中：

- ref() 就是 state 属性
- computed() 就是 getters
- function() 就是 actions

Setup store 比 Option Store 带来了更多的灵活性，因为你可以在一个 store 内创建侦听器

### 在 setup() 外部使用 store

其他地方使用 store，需要将原本被传递给app的 pinia 实例传递给 useStore() 函数：

```js
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.beforeEach((to) => {
  // ✅这会正常工作，因为它确保了正确的 store 被用于
  // 当前正在运行的应用
  const main = useMainStore(pinia)

  if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})
```

## state

Pinia 中，state 被定义为一个返回初始状态的函数

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

### 读写state

默认情况下，通过`store实例`访问state，直接对其进行读写。

```js
const store = useStore()
store.count++
```

### 重置state

通过调用store的`$reset()`方法将state重置为初始值。

```js
const store = useStore()

store.$reset()
```

### 变更 state

除了用store.count++直接改变 store，你可以调用$patch方法

$patch方法接收一个补丁对象或者一个函数，在修改集合的时候，使用函数的方式显得更简单点

补丁对象：

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

函数：

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

两种变更 store 方法的主要区别是，$patch()将多个变更归入devtools的同一个条目中

### 订阅 state

通过 store 的 $subscribe() 方法侦听 state 及其变化，$subscribe方法接收一个回调函数，当store的state变化时，调用回调函数并将修改信息和最终的state传递给回调函数

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
})
```

默认情况下，state subscription 会被绑定到添加它们的组件上 (如果 store 在组件的 setup() 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果想在组件卸载后依旧保留它们，将 `{ detached: true }` 作为第二个参数，以将 state subscription 从当前组件中分离

## getter

### 创建

Getter 完全等同于 store 的 state 的计算值。通过 defineStore() 中的`getters`属性来定义它们,getter 仅依赖 state

使用其他 getter时，常规函数定义的getter可以通过 `this` 访问 `store` 实例

```js
export const useStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 自动推断出返回类型是一个 number
    doubleCount(state) {
      return state.count * 2
    },
    // 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.doubleCount + 1
    },
  },
})
```

### getter传参

Getter只是幕后的计算属性，所以不可以向它们传递任何参数。不过，你可以从 getter 返回一个函数，该函数可以接受任意参数：

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

### 访问其他 store 的 getter

想要使用另一个 store 的 getter 的话，直接在 getter 内使用：

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## Action

### 定义

Action 相当于组件中的 method。通过 defineStore() 中的 actions 属性来定义，也可通过 this 访问整个 store 实例

```js
export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

### 调用

调用时直接通过store进行调用，就像调用对象方法一样

```vue
<script setup>
const store = useCounterStore()
// 将 action 作为 store 的方法进行调用
store.randomizeCounter()
</script>
<template>
  <!-- 即使在模板中也可以 -->
  <button @click="store.randomizeCounter()">Randomize</button>
</template>
```

不使用 setup()，可以使用 mapActions() 辅助函数将 action 属性映射为你组件中的方法。

```js
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  methods: {
    // 访问组件内的 this.increment()
    // 与从 store.increment() 调用相同
    ...mapActions(useCounterStore, ['increment'])
    // 与上述相同，但将其注册为this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'increment' }),
  },
}
```

### 订阅 action

通过 store.$onAction() 来监听 action 和它们的结果。传递给它的回调函数会在 action 本身之前执行。

after 表示在action执行结果resolve后执行一个回调函数，onError在 action 抛出错误或 reject 时执行一个回调函数

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now()
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// 手动删除监听器
unsubscribe()
```

默认情况下，action 订阅器会被绑定到添加它们的组件上(如果 store 在组件的 setup() 内)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 true 作为第二个参数传递给 action 订阅器，以便将其从当前组件中分离：

```vue
<script setup>
const someStore = useSomeStore()
// 此订阅器即便在组件卸载之后仍会被保留
someStore.$onAction(callback, true)
</script>
```

## 插件

### 定义与使用

Pinia 插件是一个函数，可以选择性地返回要添加到 store 的属性。它接收一个可选参数，即 context。

```js
export function myPiniaPlugin(context) {
  context.pinia // 用 `createPinia()` 创建的 pinia。 
  context.app // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  context.store // 该插件想扩展的 store
  context.options // 定义传给 `defineStore()` 的 store 的可选对象。
}
```

然后用 pinia.use() 将这个函数传给 pinia：

```js
pinia.use(myPiniaPlugin)
```

### 扩展store

扩展store是为每个创建的store添加属性，包括添加一个ref对象

通过插件直接返回一个对象：

```js
pinia.use(() => ({ hello: 'world' }))
```

通过获得的store进行设置:

```js
pinia.use(({store})=> (store.hello="word"))
```

### 添加新的外部属性

当添加外部属性、第三方库的类实例或非响应式的简单值时，先用 markRaw() 来包装一下它，再将它传给 pinia

```js
import { markRaw } from 'vue'
// 根据你的路由器的位置来调整
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

### 添加订阅

可以在插件中使用 store.$subscribe 和 store.$onAction

```js
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // 响应 store 变化
  })
  store.$onAction(() => {
    // 响应 store actions
  })
})
```

### 添加新的选项

在定义 store 时，可以创建新的选项，以便在插件中使用它们(使用 setup 语法时，自定义选项作为第 3 个参数传递)。

例如，你可以创建一个 debounce 选项，允许你让任何 action 实现防抖。

```js
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // 这将在后面被一个插件读取
  debounce: {
    // 让 action searchContacts 防抖 300ms
    searchContacts: 300,
  },
})
```

然后，该插件可以读取该选项来包装 action，并替换原始 action：

```js
// 使用任意防抖库
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // 我们正在用新的 action 来覆盖这些 action
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      )
      return debouncedActions
    }, {})
  }
})
```
