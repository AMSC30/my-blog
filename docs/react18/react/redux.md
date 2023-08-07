# redux语法

思想：使用集中式的全局状态来管理，并明确更新状态的模式，以便让代码具有可预测性

## 术语

### Action

action是一个拥有type属性的js对象，用来表述要派发的事件，type用来描述事件名称
比如type为todos/add，前一段表示action所属的类别或者特征，后面部分表示派发的事件

### Reducer

reducer是一个接受当前state和action的函数，返回新的状态用以更新state，根据不可变性，如果更新的是一个对象，需要将对象复制下来

### Store

store是存储状态的一个对象

### Dispatch

dispatch是store对象上的一个方法，该方法接受一个action对象，用以指定要派发的reducer

### Selector

Selector 函数可以从 store 状态树中提取指定的片段。随着应用变得越来越大，会遇到应用程序的不同部分需要读取相同的数据，selector 可以避免重复这样的读取逻辑

### creator

creator是一个创建dispatch对象的函数，creator可以传入参数作为reducer的payload，将最终结果传递给dispatch

## 原则

### 单向数据流

在state中定义数据模型，通过state渲染view页面，view页面触发事件，事件派发action更改state，state渲染新的view

### 不可变性

不可变是指不能更改原始对象，必须创建原始对象的副本

不能在 Redux 中更改 state 有几个原因：

- 它会导致 bug，例如 UI 未正确更新以显示最新值
- 更难理解状态更新的原因和方式
- 编写测试变得更加困难
- 它打破了正确使用“时间旅行调试”的能力
- 它违背了 Redux 的预期精神和使用模式

### 使用纯函数

修改改变状态的reducer应该是一个纯函数
> 纯函数：函数每次调用，相同的输入产生相同的输出，不依赖外部状态，同时不产生副作用
>

## Redux

### 语法

redux是创建store的一个库，他与框架无关，就是一个用于创建store的库

1. 创建对应的state

```js
const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]

export default initialState

```

2. 创建reducer

```js
import initialState from '../state/post'

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload]
        default:
            return state
    }
}

export default postReducer
```

3. 创建对应的action creator

```js
export const addCreator = data => {
    return {
        type: 'add',
        payload: data
    }
}
```

4. 组合reducer和state

```js
import { createStore, combineReducers } from 'redux'
import postReducer from './reducers/post'

//combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。
//合并后的 reducer 可以调用各个子 reducer，并把它们返回的结果合并成一个 state 对象。 由 combineReducers() 返回的 state 对象，会将传入的每个 reducer 返回的 state 按其传递给 combineReducers() 时对应的 key 进行命名
const reducers = combineReducers({
    post: postReducer
})

const store = createStore(reducers)

export default store
```

## React-redux

### 语法

react-redux是一个将react和redux关联起来的一个库

1. 创建provider，并将store传入

```js
import store from './store/store'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)
```

2. 在需要用到state的组件中使用useSelector这个hook，该hook接受一个返回state的函数，调用这个函数时，会将整个store树传入

```js
const posts = useSelector(state => state.post)
```

3. 使用useDispatch这个hook产生dispatch函数，用于派发action

```js
 const dispatch = useDispatch()
 dispatch(someAction)
```

## redux-toolkit

### 语法

1. 创建slice

```js
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// 导出reducer
export default counterSlice.reducer
```

2. 创建store

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

3. 操作store

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  dispatch(decrement()
  
  return (
    <div></div>
  )
}
```
