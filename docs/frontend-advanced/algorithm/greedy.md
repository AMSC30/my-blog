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
