# 贪心算法

贪心的本质是选择每一阶段的局部最优，从而达到全局最优。

## 贪心一般解题步骤

贪心算法一般分为如下四步：

1. 将问题分解为若干个子问题
2. 找出适合的贪心策略
3. 求解每一个子问题的最优解
4. 将局部最优解堆叠成全局最优解

## 算法案例

### 分发饼干

链接：<https://leetcode.cn/problems/assign-cookies/description/>

代码示例：

```js
var findContentChildren = function(g, s) {
    // 先进行排序
    g = g.sort((a,b)=>a-b)
    s = s.sort((a,b)=>a-b)

    let result = 0
    let index = s.length - 1

    for(let i = g.length - 1; i >= 0; i--){
        if(s[index]&&s[index]>=g[i]){
            result++
            index--
        }
    }

    return result
};
```

## 最大子数组和

链接：<https://leetcode.cn/problems/maximum-subarray/description/>

代码示例：

```js
var maxSubArray = function(nums) {
    let result = -Infinity
    let count = 0
    for(let i = 0; i < nums.length; i++) {
        count += nums[i]
        if(count > result) {
            result = count
        }
        if(count < 0) {
            count = 0
        }
    }
    return result
};
```

## 买卖股票的最佳时机 II

链接：<https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/>

代码示例：

```js
var maxProfit = function(prices) {
    let result = 0

    for(let i = 0; i < prices.length - 1; i++){
        if(prices[i]<prices[i+1]){
            result+= prices[i+1] - prices[i]
        }
    }

    return result
};
```

### 跳跃游戏

链接：<https://leetcode.cn/problems/jump-game/>

代码示例：

```js
var canJump = function(nums) {
    if(nums.length === 1) return true
    let cover = 0
    for(let i = 0; i <= cover; i++) {
        cover = Math.max(cover, i + nums[i])
        if(cover >= nums.length - 1) {
            return true
        }
    }
    return false
};
```

### 跳跃游戏 II

链接：<https://leetcode.cn/problems/jump-game-ii/description/>

代码示例：

```js
var jump = function(nums) {
    let curIndex = 0
    let nextIndex = 0
    let steps = 0
    for(let i = 0; i < nums.length - 1; i++) {
        nextIndex = Math.max(nums[i] + i, nextIndex)
        if(i === curIndex) {
            curIndex = nextIndex
            steps++
        }
    }

    return steps
};
```

### K 次取反后最大化的数组和

链接：<https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/description/>

代码示例：

```js
var largestSumAfterKNegations = function(nums, k) {
    nums.sort((a, b) => Math.abs(b) - Math.abs(a)); // 排序
    let sum = 0;
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] < 0 && k-- > 0) { // 负数取反（k 数量足够时）
            nums[i] = -nums[i];
        }
        sum += nums[i]; // 求和
    }
    if(k % 2 > 0) { // k 有多余的（k若消耗完则应为 -1）
        sum -= 2 * nums[nums.length - 1]; // 减去两倍的最小值（因为之前加过一次）
    }
    return sum;
};
```

### 加油站

链接：<https://leetcode.cn/problems/gas-station/description/>

代码示例：

```js
var canCompleteCircuit = function(gas, cost) {
   const gasLen = gas.length
    let start = 0
    let curSum = 0
    let totalSum = 0

    for(let i = 0; i < gasLen; i++) {
        curSum += gas[i] - cost[i]
        totalSum += gas[i] - cost[i]
        if(curSum < 0) {
            curSum = 0
            start = i + 1
        }
    }

    if(totalSum < 0) return -1

    return start
};
```

### 分发糖果

链接：<https://leetcode.cn/problems/candy/description/>

代码示例：

```js
var candy = function(ratings) {
    let candys = new Array(ratings.length).fill(1)

    for(let i = 1; i < ratings.length; i++) {
        if(ratings[i] > ratings[i - 1]) {
            candys[i] = candys[i - 1] + 1
        }
    }

    for(let i = ratings.length - 2; i >= 0; i--) {
        if(ratings[i] > ratings[i + 1]) {
            candys[i] = Math.max(candys[i], candys[i + 1] + 1)
        }
    }

    let count = candys.reduce((a, b) => {
        return a + b
    })

    return count
};
```

### 柠檬水找零

链接：<https://leetcode.cn/problems/lemonade-change/description/>

代码示例：

```js
var lemonadeChange = function(bills) {
    let fiveCount = 0
    let tenCount = 0
    for(let i = 0 ; i < bills.length; i++){
        let currentMoney = bills[i]
        let needMoney = currentMoney - 5

        if(needMoney === 0){
            fiveCount++
        }else if(needMoney === 5 ){
            if(fiveCount > 0){
                fiveCount--
                tenCount++
            }else {
                return false
            }
        }else{
            if(tenCount>0&&fiveCount>0){
                tenCount--
                fiveCount--
            }else if(fiveCount>2){
                fiveCount -= 3
            }else{
                return false
            }
        }
    }
    return true
};
```

### 用最少数量的箭引爆气球

链接：<https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description/>

代码示例：

```js
var findMinArrowShots = function(points) {
    points = points.sort((a, b) => a[0] - b[0])
    let result = 1

    for(let i = 1; i < points.length; i++){
        const [start] = points[i]
        if(start > points[i-1][1]){
            result++
        }else {
            points[i][1]= Math.min(points[i-1][1],points[i][1])
        }
    }

    return result
};
```

### 无重叠区间

链接：<https://leetcode.cn/problems/non-overlapping-intervals/description/>

代码示例：

```js
var eraseOverlapIntervals = function(intervals) {
    intervals = intervals.sort((a, b)=>a[0] - b[0])
    let min = intervals[0][1]
    let result = 0
    for(let i = 1; i < intervals.length; i++){
        const item = intervals[i]
        // 重叠
        if(item[0] < min){
            min = Math.min(min,item[1])
            result++
        }else{
            // 不重叠，重置min
            min = item[1]
        }
    }
    return result
};
```

### 划分字母区间

链接：<https://leetcode.cn/problems/partition-labels/description/>

代码示例：

```js
var partitionLabels = function(s) {
    // 记录字符的最远位置
    const positionMap = {}
    for(let i = 0 ; i < s.length; i++){
        positionMap[s[i]]=i
    }

    let prePosition = -1
    let result = []
    let maxPosition = positionMap[s[0]]
    for(let i = 0; i < s.length; i++){
        maxPosition = Math.max(maxPosition,positionMap[s[i]])
        if(i === maxPosition){
            result.push(maxPosition - prePosition)
            prePosition = maxPosition
        }
    }
    return result
};
```

### 合并区间

链接：<https://leetcode.cn/problems/merge-intervals/description/>

代码示例：

```js
var merge = function(intervals) {
    // 排序
    intervals = intervals.sort((a, b)=>a[0] - b[0])

    let result = []
    for(let i = 0; i < intervals.length; i++){
        const intervalItem = intervals[i]
        const lastResult = result[result.length-1]
        // 重叠
        if(lastResult && intervalItem[0] <= lastResult[1]){
           lastResult[1] = Math.max(intervalItem[1],lastResult[1])
        }else{
            result.push(intervalItem)
        }
    }
    return result
};
```

### 单调递增的数字

链接：<https://leetcode.cn/problems/monotone-increasing-digits/description/>

代码示例：

```js
var monotoneIncreasingDigits = function(n) {
    n = n.toString().split('').map(item => {
        return item * 1
    })
    
    let flag = Infinity
    for(let i = n.length - 1; i > 0; i--) {
        if(n [i - 1] > n[i]) {
            flag = i
            n[i - 1] = n[i - 1] - 1
            n[i] = 9
        }
    }

    for(let i = flag; i < n.length; i++) {
        n[i] = 9
    }

    n = n.join('')
    return +n
};
```
