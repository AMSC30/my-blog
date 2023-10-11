# 树结构算法案例

## 翻转二叉树

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

## 二叉树的右视图

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

## 二叉树的层平均值

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

## N 叉树的层序遍历

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

## 在每个树行中找最大值

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

## 填充每个节点的下一个右侧节点指针

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

## 二叉树的最大深度

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

## 二叉树的最小深度

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

## 对称二叉树

链接：<https://leetcode.cn/problems/symmetric-tree/>

给你一个二叉树的根节点 root ， 检查它是否轴对称

代码示例：

```js
var isSymmetric = function(root) {
    if(!root) return true
    const compare = (left,right)=>{
        if(left === null && right !== null || left !== null && right === null) {
            return false;
        } else if(left === null && right === null) {
            return true;
        } else if(left.val !== right.val) {
            return false;
        }
        // 3. 确定单层递归逻辑
        let outSide = compare(left.left, right.right);
        let inSide = compare(left.right, right.left);
        return outSide && inSide;
    }
    return compare(root.left,root.right)
};
```

## 完全二叉树节点个数

链接：<https://leetcode.cn/problems/count-complete-tree-nodes/>

给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点

代码示例：

```js
var countNodes = function(root) {

    
    const count = (node)=>{
        if(!node) return 0

        const leftCount = count(node.left)
        const rightCount = count(node.right)

        return leftCount+rightCount+1
    }

    return count(root)
};
```

## 二叉树的所有路径

链接：<https://leetcode.cn/problems/binary-tree-paths/>

代码示例：

```js
var binaryTreePaths = function(root) {
    if(!root) return []
    const res = [];
    const walkPath = (node,path)=>{
        if(!node.left&&!node.right){
           return res.push(path+node.val)
        }
        path = path+node.val+'->'
        node.left&&walkPath(node.left,path)
        node.right&&walkPath(node.right,path)
    }
    walkPath(root,"")
    return res
};
```

## 左叶子之和

链接：<https://leetcode.cn/problems/sum-of-left-leaves/description/>

代码示例：

```js
var sumOfLeftLeaves = function(root) {
    let total = 0

    if(!root) return total

    const calc = (node, isLeft = false)=>{
        if(isLeft && !node.left && !node.right) {
            console.log(node.val)
            total += node.val
        } else {
            node.left && calc(node.left, true)
            node.right && calc(node.right, false)
        }
    }

    calc(root)

    return total
};
```

## 找树左下角的值

链接：<https://leetcode.cn/problems/find-bottom-left-tree-value/>

代码示例：

```js
var findBottomLeftValue = function(root) {
    let result  = null

    const stack = [root]

    while(stack.length){
        result = stack[0]
        
        let length = stack.length

        for(let i = 0; i<length;i++){
            const node  = stack.shift()
            
            node.left && stack.push(node.left)
            node.right && stack.push(node.right)
        }

    }
    return result.val
};
```

## 合并二叉树

链接：<https://leetcode.cn/problems/merge-two-binary-trees/>

代码示例：

```js
var mergeTrees = function(root1, root2) {
    let root = null

    const walkTree = (parent,node1, node2)=>{
        const value1 = node1?node1.val:0
        const value2 = node2?node2.val:0

        parent.val = value1+value2
        
        if((node1&&node1.left) || (node2&&node2.left)){
            parent.left = new TreeNode()
            walkTree(parent.left,node1?node1.left:null,node2?node2.left:null)
        }
        if(node1&&node1.right || node2&&node2.right){
            parent.right = new TreeNode()
            walkTree(parent.right,node1?node1.right:null,node2?node2.right:null)
        }

        
    }

    if(root1||root2){
        root = new TreeNode()
        walkTree(root,root1,root2)
    }

    return root
};
```

## 二叉搜索树中的搜索

链接：<https://leetcode.cn/problems/search-in-a-binary-search-tree/description/>

代码示例：

```js
var searchBST = function(root, val) {
    const search = (node,target)=>{
        if(!node) return null
        if(node.val===target) return node
        if(node.val>target) return search(node.left,target)
        if(node.val<target) return search(node.right,target)
    }
    return search(root,val)
};
```

## 验证二叉搜索树

链接：<https://leetcode.cn/problems/validate-binary-search-tree/description/>

代码示例：

```js
var isValidBST = function(root) {
    const result = []

    const walk = (node)=>{
        if(!node) return
        node.left && walk(node.left)
        result.push(node.val)
        node.right && walk(node.right)
    }

    walk(root)

    return result.every((item,index)=>{

        if(index===result.length-1) return true

        return item<result[index+1]
    })
};
```

## 二叉搜索树的最小绝对差

链接：<https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description/>

代码示例：

```js
var getMinimumDifference = function(root) {
    const result = []

    const walk = (node)=>{
        if(!node) return
        node.left && walk(node.left)
        result.push(node.val)
        node.right && walk(node.right)
    }

    walk(root)
    
    let min = Math.abs(result[0]-result[1]) 

    result.forEach((item,index)=>{
        if(index===0) return 
        min = Math.min(min,Math.abs(item-result[index-1])) 
    })

    return min
};
```

## 二叉树的最近公共祖先

链接：<https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/>

代码示例：

```js
var lowestCommonAncestor = function(root, p, q) {
    const walkTree = (node, p, q)=>{
        if(node===null || node===p || node===q) return node

        const left = walkTree(node.left,p,q)
        const right = walkTree(node.right,p,q)

        if(left&&right) return node

        return left?left:right

    }
    return walkTree(root, p, q)
};
```
