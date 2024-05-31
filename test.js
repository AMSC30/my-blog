function throttle(fn, delay) {

    let startTime = Date.now()
    let timer = null

    return function (...args) {

        const context = this
        const now = Date.now()
        const fromExecuteTime = now - startTime - delay
        const needExecute = fromExecuteTime >= 0

        clearTimeout(timer)
        if (!needExecute) {
            timer = setTimeout(() => { fn.apply(context, args) }, fromExecuteTime)
        } else {
            fn.apply(context, args)
            startTime = Date.now()
        }

    }
}