# Promise规范

```js
promise是一个具有then方法的对象或函数
状态
promise必须处在一下三种状态之一：

- pendding
promise 的初始状态，只能转为 fulfilled 或者 rejected 状态

- fulfilled
最终态，标识成功的 promise，不可变化（逆转），此时 promise 伴随着一个 value 值

- rejected
最终态，标识失败的 promise，不可变化（逆转），此时 promise 伴随着一个 reason 值

构造函数入参
入参是一个执行器函数，接收 resolve 和 reject 两个参数，用于改变 promise 的状态
执行器执行过程中的任何错误都会 reject
then
promise 应该提供一个 then 方法，用于访问最终的结果
该方法可以被调用多次，注册后的多个回调依次调用
then 方法的返回值是一个新的 promise,新的 promise 的状态根据回调的返回值和回调的类型来确定
一句话理解：一个 promise 上根据回调类型和回调调用后的返回值返回新的 promise 的函数

- 使用
promise.then(onFulfilled, onRejected)

- 参数
then 方法的参数都是可选参数，如果不是函数将会被忽略，回调函数都会作为微任务 执行，回调的执行不能在 promise 状态为已处理 之前调用，并且调用不超过 一次

1. onFulfilled
作为成功的回调，回调参数为 promise 的 value

2. onRejected
失败的回调，回调参数为 promise 的 reason

微任务是异步任务的一种
回调不是函数，then 方法返回调用 then 方法的 promise 对象的状态和值的 promise 对象

- 回调的返回值
  1. 回调返回一个 js 常规类型值或者是一个不具有then方法的函数或对象，或者不返回值，then 方法返回一个 fulfilled 的 promise
  2. 回调返回一个成功的 promise 对象，then 方法返回一个具有这个 value 的成功 promise
  3. 回调返回一个失败的 promise 对象，then 方法返回一个具有这个 reason 的失败 promise
  4. 回调执行过程中报错或者人为抛出 error，then 方法返回一个失败的 promise
  5. 回调执行返回的是一个具有then方法的函数或对象，调用then方法
promise的实现
const promiseState = {
    pending: 0,
    fulfilled: 1,
    rejected: 2
}

class MyPromise {
    state = promiseState.pending
    value = null
    fulfilledCallbacks = []
    rejectedCallbacks = []

    constructor(executor) {
        if (!this instanceof MyPromise) {
            throw new Error('promise need call with new...')
        }

        if (!executor || typeof executor !== 'function') {
            throw new Error('constructor MyPromise need a function executor and it is required')
        }

        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }
    then(onFulFilled, onRejected) {
        if (typeof onFulFilled !== 'function') {
            onFulFilled = value => value
        }
        if (typeof onRejected !== 'function') {
            onRejected = error => {
                throw error
            }
        }
        const p1 = new MyPromise((resolve, reject) => {
            const resolveHandler = () => {
                try {
                    const value = onFulFilled(this.value)
                    this.resolvePromise(p1, value, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }
            const rejectHandler = () => {
                try {
                    const value = onRejected(this.value)
                    this.resolvePromise(p1, value, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }
            if (this.state === promiseState.fulfilled) {
                setTimeout(resolveHandler, 0)
            }
            if (this.state === promiseState.rejected) {
                setTimeout(rejectHandler, 0)
            }
            if (this.state === promiseState.pending) {
                this.fulfilledCallbacks.push(() => {
                    setTimeout(resolveHandler, 0)
                })

                this.rejectedCallbacks.push(() => {
                    setTimeout(rejectHandler, 0)
                })
            }
        })
        return p1
    }
    resolvePromise(promise, value, resolve, reject) {
        // 1.如果不返回值，默认为undefined
        if (value === undefined) {
            return resolve(undefined)
        }

        // 2.如果返回了相同的promise
        if (promise === value) {
            return reject(new Error('The promise and the return value are the same'))
        }
        // 3.如果返回的是promise
        if (value instanceof MyPromise) {
            return value.then(
                val => {
                    this.resolvePromise(promise, val, resolve, reject)
                },
                error => {
                    reject(error)
                }
            )
        }

        // 如果返回的是对象，根据是否具有then方法做不同的处理
        if (typeof value === 'object' || typeof value === 'function') {
            if (value === null) return resolve(value)

            try {
                const then = value.then
                if (typeof then === 'function') {
                    try {
                        then.call(
                            value,
                            val => {
                                this.resolvePromise(promise, val, resolve, reject)
                            },
                            error => {
                                reject(error)
                            }
                        )
                    } catch (error) {
                        reject(error)
                    }
                } else {
                    resolve(value)
                }
            } catch (error) {
                reject(error)
            }
        } else {
            resolve(value)
        }
    }
    resolve(value) {
        if (this.state === promiseState.pending) {
            this.state = promiseState.fulfilled
            this.value = value
            if (this.fulfilledCallbacks.length) {
                this.fulfilledCallbacks.forEach(fn => {
                    fn(this.value)
                })
            }
        }
    }
    reject(reason) {
        if (this.state === promiseState.pending) {
            if (!reason instanceof Error) {
                reason = new TypeError('reject reason need typeof error')
            }
            this.state = promiseState.rejected
            this.value = reason
            if (this.rejectedCallbacks.length) {
                this.rejectedCallbacks.forEach(fn => fn(this.reason))
            }
        }
    }
}
window.MyPromise = MyPromise
```
