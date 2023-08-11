# 数组算法案例

数组是存放在连续内存空间上的相同类型数据的集合，可以方便的通过下标索引的方式获取到下标下对应的数据，因为数组的在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，就难免要移动其他元素的地址

## 移除元素

链接：<https://leetcode.cn/problems/remove-element>

描述：

给你一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素

解题思路：

通过一个快指针和慢指针在一个for循环下完成两个for循环的工作。

快指针：寻找新数组的元素 ，新数组就是不含有目标元素的数组

慢指针：指向更新 新数组下标的位置

代码实现：

```js
const removeElement = (arr, target) => {
    const len = arr.length
    let slowIndex = 0
    for (let fastIndex = 0; fastIndex < len; fastIndex++) {
        if (arr[fastIndex] !== target) {
            arr[slowIndex] = arr[fastIndex]
            slowIndex++
        }
    }
    return slowIndex + 1
}
```

## 有序数组的平方

链接：<https://leetcode.cn/problems/squares-of-a-sorted-array/>

描述：

给你一个按`非递减顺序`排序的整数数组nums，返回`每个数字的平方`组成的新数组，要求也按`非递减顺序`排序

解题思路：

由于有序数组的平方以后，可能不是有序的，如负数平方以后应该在数组中靠后的位置，我们可以创建一个新的结果数组，从结果数组的末尾开始，将较小的值放在数组前面，可以考虑首尾双指针，因为是有序的，那么首尾指针平方后，一定有一个最大值，将较大的值放在结果数组的最前方

代码实现：

```js
const sortedSquares = arr => {
    const result = []
    let resultIndex = (fastIndex = arr.length - 1)
    let slowIndex = 0

    while (slowIndex <= fastIndex) {
        const slowData = Math.pow(arr[slowIndex], 2)
        const fastData = Math.pow(arr[fastIndex], 2)
        if (slowData > fastData) {
            result[resultIndex] = slowData
            slowIndex++
        } else {
            result[resultIndex] = fastData
            fastIndex--
        }
        resultIndex--
    }
    return result
}
```

## 长度最小的子数组

链接：<https://leetcode.cn/problems/minimum-size-subarray-sum/>

描述：

给定一个含有n个正整数的数组和一个正整数s ，找出该数组中满足其和≥s的长度最小的连续子数组，并返回其长度。如果不存在符合条件的子数组，返回 0

解题思路：

由于是一个连续的子数组，可以使用滑动窗口，使用双指针，当子数组和大于等于s时，慢指针向右移动，当小于s时，快指针向右移动

代码实现：

```js
const minSubArrayLen = (arr, target) => {
    let sum = 0
    let slowIndex = 0
    let minLen = 0
    for (let fastIndex = 0; fastIndex < arr.length; fastIndex++) {
        const data = arr[fastIndex]
        if (data >= target) return 1
        sum += data
        while (sum >= target && fastIndex > slowIndex) {
            minLen =
                minLen === 0
                    ? fastIndex - slowIndex + 1
                    : Math.min(minLen, fastIndex - slowIndex + 1)

            sum -= arr[slowIndex++]
        }
    }
    return minLen
}
```

## 螺旋矩阵

链接：<https://leetcode.cn/problems/spiral-matrix-ii/>

给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵

代码示例：

```js
var generateMatrix = function (n) {
    let startX = (startY = 0) // 起始位置
    let loop = Math.floor(n / 2) // 旋转圈数
    let mid = Math.floor(n / 2) // 中间位置
    let offset = 1 // 控制每一层填充元素个数
    let count = 1 // 更新填充数字
    let res = new Array(n).fill(0).map(() => new Array(n).fill(0))

    while (loop--) {
        let row = startX,
            col = startY
        // 上行从左到右（左闭右开）
        for (; col < startY + n - offset; col++) {
            res[row][col] = count++
        }
        // 右列从上到下（左闭右开）
        for (; row < startX + n - offset; row++) {
            res[row][col] = count++
        }
        // 下行从右到左（左闭右开）
        for (; col > startY; col--) {
            res[row][col] = count++
        }
        // 左列做下到上（左闭右开）
        for (; row > startX; row--) {
            res[row][col] = count++
        }

        // 更新起始位置
        startX++
        startY++

        // 更新offset
        offset += 2
    }
    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2 === 1) {
        res[mid][mid] = count
    }
    return res
}```
