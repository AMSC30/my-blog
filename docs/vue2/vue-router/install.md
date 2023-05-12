# 路由安装

Vue-Router 的入口文件是 `src/index.js`，其中定义了 `VueRouter` 类，也实现了 `install` 的静态方法：`VueRouter.install = install`，它的定义在 `src/install.js` 中。

```js
export let _Vue
export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

// 全局注册实例的beforeCreate生命周期钩子，在实例init时调用
  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        // options中有router对象，一般出现在根实例当中
        // 指定实例的routerRoot，根实例是本身
        this._routerRoot = this

        // 在根实例上挂载router对象
        this._router = this.$options.router

        // 使用根实例作为参数，调用router的init方法初始化router实例
        this._router.init(this)

        // 响应式处理根实例的_route属性，此时router的history对象已经初始化完成
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 如果不是根实例，则从父实例当中获取到根实例，不能直接取$root
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  // 定义实例的$router属性，从router挂载的根实例上获取
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  // 定义实例的$route属性，从router挂载的根实例上获取
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
  // 全局注册组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

当用户执行 `Vue.use(VueRouter)` 的时候，实际上就是在执行 `install` 函数，为了确保 `install` 逻辑只执行一次，用了 `install.installed` 变量做已安装的标志位。另外用一个全局的 `_Vue` 来接收参数 `Vue`，因为作为 Vue 的插件对 `Vue` 对象是有依赖的，但又不能去单独去 `import Vue`，因为那样会增加包体积，所以就通过这种方式拿到 `Vue` 对象。

Vue-Router 安装最重要的一步就是利用 `Vue.mixin` 去把 `beforeCreate` 和 `destroyed` 钩子函数注入到每一个组件中。`Vue.mixin` 的定义，在 `vue/src/core/global-api/mixin.js` 中：

```js
export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // 合并
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

## 总结

那么到此为止，我们分析了 Vue-Router 的安装过程，Vue 编写插件的时候通常要提供静态的 `install` 方法，我们通过 `Vue.use(plugin)` 时候，就是在执行 `install` 方法。`Vue-Router` 的 `install` 方法会给每一个组件注入 `beforeCreate` 和 `destoryed` 钩子函数，在 `beforeCreate` 做一些私有属性定义和路由初始化工作
