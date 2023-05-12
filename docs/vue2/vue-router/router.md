# router 对象

VueRouter 的实现是一个类，它的定义在 `src/index.js` 中，`VueRouter` 定义了一些属性和方法，我们先从它的构造函数看，当我们执行 `new VueRouter` 的时候做了哪些事情。

## router实例化

```js
constructor (options) {
  // 存储vue实例
  this.app = null // vue根实例
  this.apps = []

  this.options = options
  
  // router钩子函数
  this.beforeHooks = []
  this.resolveHooks = []
  this.afterHooks = []

  // 路由匹配器matcher
  this.matcher = createMatcher(options.routes || [], this)

  let mode = options.mode || 'hash'
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
  if (this.fallback) {
    mode = 'hash'
  }
  if (!inBrowser) {
    mode = 'abstract'
  }
  // 路由模式
  this.mode = mode

  // history实例
  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base)
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback)
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base)
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, `invalid mode: ${mode}`)
      }
  }
}
```

从代码中可以看到，router的初始化除了初始化自身的一些基本属性，最重要的是`matcher`实例和`history`实例，`matcher`对象的主要工作是将路由配置进行处理，使配置对象扁平化、根据路径参数匹配到路由配置，生成最终的路由对象；`history`对象的主要作用是根据路由配置，解析出`配置`、`router`对象、`vue`实例中定义的钩子函数，按照规定的顺序执行，更新`history`对象和`根vue`对象的`route`，同时`恢复页面滚动`和`浏览器路径`的更新

## init过程

初始化执行init的代码如下：

```js
init (app) {

  this.apps.push(app)

  if (this.app) {
    return
  }

  // 唯一的根实例
  this.app = app

  const history = this.history

   if (history instanceof HTML5History || history instanceof HashHistory) {
      const handleInitialScroll = routeOrError => {
        const from = history.current
        const expectScroll = this.options.scrollBehavior
        const supportsScroll = supportsPushState && expectScroll

        if (supportsScroll && 'fullPath' in routeOrError) {
          handleScroll(this, routeOrError, from, false)
        }
      }
      const setupListeners = routeOrError => {
        // 监听路由改变
        history.setupListeners()
        handleInitialScroll(routeOrError)
      }
      // 根据浏览器初始路径进行跳转，因为可能不是根路径
      history.transitionTo(
        history.getCurrentLocation(),
        setupListeners,
        setupListeners
      )
    }
  // 在history中注册cb，当路由确认后，需要更新vue实例和history对象的route对象，下面回调则是更新根实例的_route
  history.listen(route => {
    this.apps.forEach((app) => {
      app._route = route
    })
  })
}
```
