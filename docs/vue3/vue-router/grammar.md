# vue-router4

[官方文档](https://router.vuejs.org/zh/)

## 动态路由

动态路由的动态段用`:`表示，当一个路由被匹配时，它的 params 的值将在每个组件中以 this.$route.params 的形式暴露出来

|匹配模式 |匹配路径 |$route.params|
|-------|--------|-------------|
|/users/:username |/users/eduardo |{ username: 'eduardo' }|
|/users/:username/posts/:postId |/users/eduardo/posts/123 |{ username: 'eduardo', postId: '123' }|

动态路由支持正则表达式

常规参数只匹配 url 片段之间的字符，用 / 分隔。如果我们想匹配任意路径，我们可以使用自定义的 路径参数 正则表达式，在 路径参数 后面的括号中加入 正则表达式 :

```js
const routes = [
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

在这个特定的场景中，我们在括号之间使用了自定义正则表达式，并将pathMatch参数标记为可选可重复

## 命名视图

针对某个路径下，想在布局中针对此路径显示多个视图，可以对`router-view`使用命名的方式，在路由配置中指定每个视图需要渲染的组件

如果没有命名，`router-view`组件有个默认的`default`名称

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 的缩写
        LeftSidebar,
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        RightSidebar,
      },
    },
  ],
})
```

## 导航守卫

导航守卫主要用来通过跳转或取消的方式守卫导航

**参数：**

- to: 即将要进入的目标 用一种标准化的方式
- from: 当前导航正要离开的路由 用一种标准化的方式
- 可选的next：在版本4以前用来调用下一个导航

**返回值：**

- false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
- 路由地址: 通过一个路由地址跳转到一个不同的地址，就像你调用 router.push() 一样，你可以设置诸如 replace: true 或 name: 'home' 之类的配置。当前的导航被中断，然后进行一个新的导航，就和 from 一样
- 抛出Error：取消导航并且调用 router.onError() 注册过的回调
- undefined、true，则导航是有效的，并调用下一个导航守卫

### 全局守卫

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中

**1. beforeEach**

一个全局前置守卫，当一个导航触发时调用

**2. beforeResolve**

全局解析守卫，在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用

**3. afterEach**

全局后置钩子，对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用，不会接受nex函数，同时也不会改变导航

### 路由守卫

**1. beforeEnter**

只在进入路由时触发，不会在 params、query 或 hash 改变时触发

### 组件守卫

**1. beforeRouteEnter**

在渲染该组件的对应路由被验证前调用，不能获取组件实例 `this` ！，因为当守卫执行时，组件实例还没被创建！

**2. beforeRouteUpdate**

在路由改变时，重用的组件将会执行这个钩子

**3. beforeRotueLeave**

路由改变时，需要销毁的组件将会执行这个钩子

> 除了beforeRouteEnter，另外两个钩子都可以访问组件实例

### 完整流程

- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫(2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 组合式API

### 访问router和route

由于在setup函数中无法访问组件实例，就不能通过`this.$router`或`this.$route`访问，需要使用`useRouter`和`useRoute`函数
在模板中我们仍然可以访问 $router 和 $route

### 导航守卫

在任何由`<router-view>`渲染的组件中，可以使用`onBeforeRouteLeave`和`onBeforeRouteUpdate`在组件中注册组件守卫
