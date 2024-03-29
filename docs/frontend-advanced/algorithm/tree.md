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
