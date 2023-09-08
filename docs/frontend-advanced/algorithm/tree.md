# 非线性结构--树

## 一、是什么

在计算机领域，树形数据结构是一类重要的非线性数据结构，可以表示数据之间一对多的关系。以树与二叉树最为常用，直观看来，树是以分支关系定义的层次结构

二叉树满足以下两个条件：

- 本身是有序树
- 树中包含的各个结点的不能超过 2，即只能是 0、1 或者 2

如下图，左侧的为二叉树，而右侧的因为头结点的子结点超过2，因此不属于二叉树：

 ![](https://static.vue-js.com/66758800-1dfe-11ec-a752-75723a64e8f5.png)

同时，二叉树可以继续进行分类，分成了满二叉树和完全二叉树：

- 满二叉树：如果一棵二叉树只有度为0的结点和度为2的结点，并且度为0的结点在同一层上，则这棵二叉树为满二叉树

 ![](https://static.vue-js.com/759db050-1dfe-11ec-a752-75723a64e8f5.png)

- 完全二叉树：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2^(h-1) 个节点

 ![](https://static.vue-js.com/84ae31f0-1dfe-11ec-8e64-91fdec0f05a1.png)

## 二、二叉树分类

### 满二叉树

如果一棵二叉树只有度为0的结点和度为2的结点，并且度为0的结点在同一层上，则这棵二叉树为满二叉树。满二叉树有2^k-1个节点

### 完全二叉树

除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层（h从1开始），则该层包含 1~ 2^(h-1) 个节点

### 二叉搜索树

二叉搜索树是一个有序树。

- 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
- 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
- 它的左、右子树也分别为二叉排序树

## 三、操作

关于二叉树的遍历，常见的有：

1. 深度优先遍历

- 前序遍历
- 中序遍历
- 后序遍历

2. 广度优先遍历

- 层序遍历

### 前序遍历

前序遍历的实现思想是：

- 访问根节点
- 访问当前节点的左子树
- 若当前节点无左子树，则访问当前节点的右子树

根据遍历特性，递归版本用代码表示则如下：

```js
const preOrder = (root) => {
  if(!root){ return }
  console.log(root)
  preOrder(root.left)
  preOrder(root.right)
}
```

如果不使用递归版本，可以借助栈先进后出的特性实现，先将根节点压入栈，再分别压入右节点和左节点，直到栈中没有元素，如下：

```js
const preOrder = (root) => {
  if(!root){ return }
  const stack = [root]
  while (stack.length) {
    const n = stack.pop()
    console.log(n.val)
    if (n.right) {
      stack.push(n.right)
    }
    if (n.left) {
      stack.push(n.left)
    }
  }
}
```

### 中序遍历

前序遍历的实现思想是：

- 访问当前节点的左子树
- 访问根节点
- 访问当前节点的右子

递归版本很好理解，用代码表示则如下：

```js
const inOrder = (root) => {
  if (!root) { return }
  inOrder(root.left)
  console.log(root.val)
  inOrder(root.right)
}
```

非递归版本也是借助栈先进后出的特性，可以一直首先一直压入节点的左元素，当左节点没有后，才开始进行出栈操作，压入右节点，然后有依次压入左节点，如下：

```js
const inOrder = (root) => {
  if (!root) { return }
  const stack = [root]
  let p = root
  while(stack.length || p){
    while (p) {
      stack.push(p)
      p = p.left
    }
    const n = stack.pop()
    console.log(n.val)
    p = n.right
  }
}
```

### 后序遍历

前序遍历的实现思想是：

- 访问当前节点的左子树
- 访问当前节点的右子
- 访问根节点

递归版本，用代码表示则如下：

```js
const postOrder = (root) => {
  if (!root) { return }
  postOrder(root.left)
  postOrder(root.right)
  console.log(n.val)
 }
```

后序遍历非递归版本实际根全序遍历是逆序关系，可以再多创建一个栈用来进行输出，如下：

```js
const preOrder = (root) => {
  if(!root){ return }
  const stack = [root]
  const outPut = []
  while (stack.length) {
    const n = stack.pop()
    outPut.push(n.val)
    if (n.right) {
      stack.push(n.right)
    }
    if (n.left) {
      stack.push(n.left)
    }
  }
  while (outPut.length) {
    const n = outPut.pop()
    console.log(n.val)
  }
}
```

### 层序遍历

按照二叉树中的层次从左到右依次遍历每层中的结点

借助队列先进先出的特性，从树的根结点开始，依次将其左孩子和右孩子入队。而后每次队列中一个结点出队，都将其左孩子和右孩子入队，直到树中所有结点都出队，出队结点的先后顺序就是层次遍历的最终结果

用代码表示则如下：

```js
const levelOrder = (root) => {
    if (!root) { return [] }
    const queue = [[root, 0]]
    const res = []
    while (queue.length) {
        const n = queue.shift()
        const [node, leval] = n
        if (!res[leval]) {
            res[leval] = [node.val]
        } else {
            res[leval].push(node.val)
        }
        if (node.left) { queue.push([node.left, leval + 1]) }
        if (node.right) { queue.push([node.right, leval + 1]) }
    }
    return res
};
```

## 算法案例

### 翻转二叉树

链接：<https://leetcode.cn/problems/invert-binary-tree/>

给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点

代码示例：

```js
var invertTree = function (root) {
  if (!root) return
  swapChild(root)
  invertTree(root.left)
  invertTree(root.right)
  return root
}
var swapChild = function (node) {
  const left = node.left
  node.left = node.right
  node.right = left
}
```

### 二叉树的右视图

链接：<https://leetcode.cn/problems/binary-tree-right-side-view/>

给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值

代码示例：

```js
var rightSideView = function(root) {
    const res = []
    if(!root) return res
    const queue = [root]
    while(queue.length){
        let length = queue.length

        while(length--){
            const node = queue.shift()

            if(length===0){
                res.push(node.val)
            }
            node.left&&queue.push(node.left)
            node.right&&queue.push(node.right)
        }
    }
    return res
};
```

### 二叉树的层平均值

链接：<https://leetcode.cn/problems/average-of-levels-in-binary-tree/>

给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10-5 以内的答案可以被接受。
代码示例：

```js
var averageOfLevels = function(root) {
    const result = []

    const queue = [root]

    while(queue.length){
        let length = queue.length
        let total =0
        for(let i =0;i<length;i++){
            const node = queue.shift()
            total+=node.val
            node.left&&queue.push(node.left)
            node.right && queue.push(node.right)
        }
        result.push(total/length)
    }
    return result
};
```

### N 叉树的层序遍历

链接：<https://leetcode.cn/problems/n-ary-tree-level-order-traversal/>

给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。

树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）

代码示例：

```js
var levelOrder = function(root) {
    const result = []
    
    if(!root) return result

    const queue = [root]

    while(queue.length){
        let length = queue.length
        const levelResult = []
        result.push(levelResult)
        while(length--){
            const node = queue.shift()
            levelResult.push(node.val)

            if(node.children){
                for(const child of node.children){
                    child&&queue.push(child)
                }
            }
        }
    }
    return result
};
```

### 在每个树行中找最大值

链接：<https://leetcode.cn/problems/find-largest-value-in-each-tree-row/>

给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值

代码示例：

```js
var largestValues = function(root) {
    const res = []

    if(!root) return res

    const queue = [root]

    while(queue.length){
        let length = queue.length
        let max = 0
        while(length--){
            const node = queue.shift()

            max = Math.max(max,node.val)

            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        res.push(max)
    }

    return res
};
```

### 填充每个节点的下一个右侧节点指针

链接：<https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/>

给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点

代码示例：

```js
var connect = function(root) {

    if(!root) return root

    const queue = [root]

    while(queue.length){
        let length = queue.length
 
        while(length--){
            const node = queue.shift()

            node.next = length?queue[0]:null

            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
    }

    return root
};
```

### 二叉树的最大深度

链接：<https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/>

给定一个二叉树 root ，返回其最大深度。

二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数

代码示例：

```js
var maxDepth = function(root) {
    let depth = 0

     if(!root) return depth

    const queue = [root]

    while(queue.length){
        let length = queue.length
 
        while(length--){
            const node = queue.shift()

            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }

        depth++
    }

    return depth
};
```

### 二叉树的最小深度

链接：<https://leetcode.cn/problems/minimum-depth-of-binary-tree/>

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点

代码示例：

```js
var minDepth = function(root) {
    let depth = 0

    if(!root) return depth

    const queue = [root]

    while(queue.length){
        depth++
        
        let length = queue.length
 
        while(length--){

            const node = queue.shift()

            if(!node.left&&!node.right) return depth

            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }

    }

};
```

### 对称二叉树

链接：<https://leetcode.cn/problems/symmetric-tree/>

给你一个二叉树的根节点 root ， 检查它是否轴对称

代码示例：

```js
```
