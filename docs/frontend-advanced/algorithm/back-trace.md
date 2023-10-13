# 回溯算法及案例

## 回溯概念基础

### 什么是回溯法

回溯法也可以叫做回溯搜索法，它是一种搜索的方式，回溯是递归的副产品，只要有递归就会有回溯

### 回溯法解决的问题

回溯法，一般可以解决如下几种问题：

1. 组合问题：N个数里面按一定规则找出k个数的集合
2. 切割问题：一个字符串按一定规则有几种切割方式
3. 子集问题：一个N个数的集合里有多少符合条件的子集
4. 排列问题：N个数按一定规则全排列，有几种排列方式
5. 棋盘问题：N皇后，解数独等等

> 组合是不强调元素顺序的，排列是强调元素顺序。

### 如何理解回溯法

回溯的本质是穷举，穷举所有可能

回溯法解决的问题都可以抽象为树形结构，因为回溯法解决的都是在集合中递归查找子集，集合的大小就构成了树的宽度，递归的深度，都构成的树的深度。

递归就要有终止条件，所以必然是一棵高度有限的树（N叉树）。

### 回溯三部曲

1. 回溯函数模板返回值以及参数,代码如下：

```bash
void backtracking(参数)
```

2. 回溯函数终止条件

既然是树形结构，就知道遍历树形结构一定要有终止条件。所以回溯也有要终止条件。

什么时候达到了终止条件，树中就可以看出，一般来说搜到叶子节点了，也就找到了满足条件的一条答案，把这个答案存放起来，并结束本层递归。

回溯函数终止条件伪代码如下：

```bash
if (终止条件) {
    存放结果;
    return;
}
```

3. 回溯搜索的遍历过程

回溯函数遍历过程伪代码如下：

```bash
for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
    处理节点;
    backtracking(路径，选择列表); // 递归
    回溯，撤销处理结果
}
```

for循环就是遍历集合区间，可以理解一个节点有多少个孩子，这个for循环就执行多少次。

分析完过程，回溯算法模板框架如下：

```bash
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```

## 算法案例

### 组合

链接：<https://leetcode.cn/problems/combinations/description/>

代码示例：

```js
var combine = function(n, k) {
    let result = []
    let path = []

    const combineHelper = (n, k, startIndex) => {
        if (path.length === k) {
            result.push([...path])
            return
        }

        for (let i = startIndex; i <= n - (k - path.length) + 1; ++i) {
            path.push(i)
            combineHelper(n, k, i + 1)
            path.pop()
        }
    }
    combineHelper(n, k, 1)
    return result
};
```

### 电话号码的字母组合

链接：<https://leetcode.cn/problems/combinations/description/>

代码示例：

```js
var letterCombinations = function (digits) {
  const k = digits.length
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  if (!k) return []
  if (k === 1) return map[digits].split('')

  const res = [],
    path = []
  

  function backtracking(n, k, a) {
    if (path.length === k) {
      res.push(path.join(''))
      return
    }
    for (const v of map[n[a]]) {
      path.push(v)
      backtracking(n, k, a + 1)
      path.pop()
    }
  }

  backtracking(digits, k, 0)
  return res
}

```

### 组合总和

链接：<https://leetcode.cn/problems/combinations/description/>

代码示例：

```js
var combinationSum = function (candidates, target) {
  const res = [],
    path = []
  candidates.sort((a, b) => a - b) // 排序
  backtracking(0, 0)
  return res
  function backtracking(j, sum) {
    if (sum === target) {
      res.push(Array.from(path))
      return
    }
    for (let i = j; i < candidates.length; i++) {
      const n = candidates[i]
      if (n > target - sum) break
      path.push(n)
      sum += n
      backtracking(i, sum)
      path.pop()
      sum -= n
    }
  }
}
```

### 组合总和II

链接：<https://leetcode.cn/problems/combination-sum-ii/>

代码示例：

```js
var combinationSum2 = function(candidates, target) {
    const result = []
    const path = []
    let source = 0

    candidates.sort((a, b) => a - b) // 排序

    const backtrace = (j)=>{
        if(source==target){
            result.push([...path])
            return
        } 

        for(let i =j;i<candidates.length;i++){
            const data = candidates[i]

            if(i > j && candidates[i] === candidates[i-1]){
              //若当前元素和前一个元素相等
              //则本次循环结束，防止出现重复组合
              continue;
            }

            if(data > target - source) break

            path.push(data)
            source+=data

            backtrace(i+1)

            path.pop()
            source -= data
        }
    }
    backtrace(0)
    return result
};
```

### 切割复原IP地址

链接：<https://leetcode.cn/problems/restore-ip-addresses/>

代码示例：

```js
var restoreIpAddresses = function(s) {
    const result = []
    const path = []
    const backtrace = (i)=>{
        // 终止条件
        if(path.length>4) return 
        if(path.length === 4 && i === s.length){
            return result.push(path.join('.'))
        }

        // 单层逻辑
        for(let j = 1; j <= 3; j++){
            let k = i + j
            let str = s.slice(i,k)
            if(str > 255 ||(str.length>1&& str[0]==='0')) break
            path.push(str)
            backtrace(k)
            path.pop()
        }
    }
    backtrace(0)
    return result
};
```

### 子集

链接：<https://leetcode.cn/problems/subsets/>

代码示例：

```js
var subsets = function(nums) {
    let result = []
    let path = []
    function backtracking(startIndex) {
        result.push([...path])
        for(let i = startIndex; i < nums.length; i++) {
            path.push(nums[i])
            backtracking(i + 1)
            path.pop()
        }
    }
    backtracking(0)
    return result
};
```

### 子集 II

链接：<https://leetcode.cn/problems/subsets-ii/description/>

代码示例：

```js
var subsetsWithDup = function(nums) {
    // 排序，好去重
    nums = nums.sort((a,b)=>a-b)

    const result = []
    const path = []

    const backTrace = (start)=>{
        result.push([...path])

        // 终止条件
        if(start === nums.length) return

        // 单层逻辑
        for(let i = start; i < nums.length; i++){
            // 去重
            if(i > start && nums[i] === nums[i-1]) continue
            
            path.push(nums[i])
            backTrace(i+1)
            path.pop()

        }
    }

    backTrace(0)

    return result
};
```

### 全排列

链接：<https://leetcode.cn/problems/permutations/description/>

代码示例：

```js
var permute = function (nums) {
  const result = []
  const path = []
  const backTrace = () => {
    if (path.length === nums.length) {
      return result.push([...path])
    }
    for (let i = 0; i < nums.length; i++) {
      if (path.includes(nums[i])) continue
      path.push(nums[i])
      backTrace()
      path.pop()
    }
  }
  backTrace()
  return result
}

```

### 全排列 II

链接：<https://leetcode.cn/problems/permutations-ii/description/>

代码示例：

```js
 var permuteUnique = function (nums) {
    nums.sort((a, b) => {
        return a - b
    })
    let result = []
    let path = []

    function backtracing( used) {
        if (path.length === nums.length) {
            result.push([...path])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue
            }
            if (!used[i]) {
                used[i] = true
                path.push(nums[i])
                backtracing(used)
                path.pop()
                used[i] = false
            }
        }
    }
    backtracing([])
    return result
};
```
