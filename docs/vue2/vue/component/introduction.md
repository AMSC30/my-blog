# 介绍

组件在我们日常的开发过程中出现频率是非常高的，它也是`Vue`的两大核心之一：**数据驱动**和**组件化**。

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
