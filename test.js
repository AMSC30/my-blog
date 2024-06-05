function curry(fn) {
    const context = this
    let preArgs = []
    return function curriedFn(...args) {
        const newArgs = [...preArgs, ...args]
        if (newArgs.length < fn.length) {
            preArgs = newArgs
            return curriedFn
        } else {
            return fn.apply(context, newArgs)
        }
    }

}
const fn = (x, y, z, a) => x + y + z + a;
const myfn = curry(fn);
console.log(myfn(1)(2)(3)(1));