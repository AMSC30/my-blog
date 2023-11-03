# 动态规划

## 定义

如果某一问题有很多重叠子问题，使用动态规划是最有效的。动态规划中每一个状态一定是由上一个状态推导出来的，这一点就区分于贪心，贪心没有状态推导，而是从局部直接选最优的，

动规是由前一个状态推导出来的，而贪心是局部直接选最优的

## 解题步骤

1. 确定dp数组（dp table）以及下标的含义
2. 确定递推公式
3. dp数组如何初始化
4. 确定遍历顺序
5. 举例推导dp数组

## 算法案例

### 爬楼梯

链接：<https://leetcode.cn/problems/climbing-stairs/description/>

代码示例：

```js
var climbStairs = function(n) {
     // dp[i] 为第 i 阶楼梯有多少种方法爬到楼顶
    // dp[i] = dp[i - 1] + dp[i - 2]
    let dp = [1 , 2]
    for(let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n - 1]
};
```

### 使用最小花费爬楼梯

链接：<https://leetcode.cn/problems/min-cost-climbing-stairs/>

代码示例：

```js
var minCostClimbingStairs = function(cost) {

    if(cost.length < 2) return 0

      const result = [0,0]
      for(let i = 2; i <= cost.length; i++){
          result[i] = Math.min(result[i-1] + cost[i - 1], result[i - 2] + cost[i-2])
      }
      return result[cost.length]
};
```

### 不同路径

链接：<https://leetcode.cn/problems/unique-paths/description/>

代码示例：

```js
var uniquePaths = function(m, n) {
    // dp数组
    const dp = Array(m).fill().map(item => Array(n))

    for(let i = 0; i < m; i++){
        dp[i][0] = 1
    }
    for(let i = 0; i < n; i++){
        dp[0][i] = 1
    }
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            dp[i][j] = dp[i - 1][j] + dp[i][j -1]
        }
    }
    return dp[m - 1][n - 1]
};
```

### 整数拆分

链接：<https://leetcode.cn/problems/integer-break/description/>

代码示例：

```js
var integerBreak = function(n) {
 let dp = new Array(n + 1).fill(0)
    dp[2] = 1

    for(let i = 3; i <= n; i++) {
        for(let j = 1; j <= i / 2; j++) {
            dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
        }
    }
    return dp[n]
};
```
