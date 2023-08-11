# 链表算法案例

## 解题分析

**1. 一个原则**

一个原则就是 画图，尤其是对于新手来说。不管是简单题还是难题一定要画图，这是贯穿链表题目的一个准则。
画图可以减少我们的认知负担，这其实和打草稿，备忘录道理是一样的，将存在脑子里的东西放到纸上。举一个不太恰当的例子就是你的脑子就是 CPU，脑子的记忆就是寄存器。寄存器的容量有限，我们需要把不那么频繁使用的东西放到内存，把寄存器用在真正该用的地方，这个内存就是纸或者电脑平板等一切你可以画图的东西。
画的好看不好看都不重要，能看清就行了。用笔随便勾画一下， 能看出关系就够了

**2. 两个考点**

除了设计类题目，其考点无法就两点：

- **指针的修改**

其中指针修改最典型的就是链表反转。其实链表反转就是修改指针，对于数组这种支持随机访问的数据结构来说， 反转很容易， 只需要头尾不断交换即可

```js
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }
  return arr;
}
```

而对于链表：

```js
const reverse = head => {
    let pre = null
    let next = head.next
    while(head){
        head.next = pre
        pre = head
        head = next
        next = head.next
    }
    return pre
}
```

- **链表的拼接**

链表的价值就在于其不必要求物理内存的连续性，以及对插入和删除的友好

**3. 三个注意**

链表最容易出错的地方就是我们应该注意的地方。链表最容易出的错 90 % 集中在以下三种情况：

- **出现了环，造成死循环**

- **分不清边界，导致边界条件出错**

- **搞不懂递归怎么做**

**4. 四个技巧**

- **虚拟头**

- **快慢指针**

- **穿针引线**

- **先穿再排后判空**

## 移除链表元素

链接：<https://leetcode.cn/problems/remove-linked-list-elements/>

删除链表中等于给定值 val 的所有节点

代码示例：

 ```js
 class LinkNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Initialize your data structure here.
 * 单链表 储存头尾节点 和 节点数量
 */
var MyLinkedList = function() {
    this._size = 0;
    this._tail = null;
    this._head = null;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.getNode = function(index) {
    if(index < 0 || index >= this._size) return null;
    // 创建虚拟头节点
    let cur = new LinkNode(0, this._head);
    // 0 -> head
    while(index-- >= 0) {
        cur = cur.next;
    }
    return cur;
};
MyLinkedList.prototype.get = function(index) {
    if(index < 0 || index >= this._size) return -1;
    // 获取当前节点
    return this.getNode(index).val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    const node = new LinkNode(val, this._head);
    this._head = node;
    this._size++;
    if(!this._tail) {
        this._tail = node;
    }
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    const node = new LinkNode(val, null);
    this._size++;
    if(this._tail) {
        this._tail.next = node;
        this._tail = node;
        return;
    }
    this._tail = node;
    this._head = node;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if(index > this._size) return;
    if(index <= 0) {
        this.addAtHead(val);
        return;
    }
    if(index === this._size) {
        this.addAtTail(val);
        return;
    }
    // 获取目标节点的上一个的节点
    const node = this.getNode(index - 1);
    node.next = new LinkNode(val, node.next);
    this._size++;
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if(index < 0 || index >= this._size) return;
    if(index === 0) {
        this._head = this._head.next;
        // 如果删除的这个节点同时是尾节点，要处理尾节点
        if(index === this._size - 1){
            this._tail = this._head
        }
        this._size--;
        return;
    }
    // 获取目标节点的上一个的节点
    const node = this.getNode(index - 1);    
    node.next = node.next.next;
    // 处理尾节点
    if(index === this._size - 1) {
        this._tail = node;
    }
    this._size--;
};

// MyLinkedList.prototype.out = function() {
//     let cur = this._head;
//     const res = [];
//     while(cur) {
//         res.push(cur.val);
//         cur = cur.next;
//     }
// };
/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```

## 反转链表

链接：<https://leetcode.cn/problems/reverse-linked-list/>

反转一个单链表

代码示例：

```js
var reverseList = function(head) {
    let pre = null

    while(head){
        const next = head.next
        head.next = pre
        pre = head
        head = next
    }
    return pre
};
```

## 两两交换链表中的节点

链接：<https://leetcode.cn/problems/swap-nodes-in-pairs/>

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换

代码示例：

```js
var swapPairs = function(head) {
    const temp = new ListNode(0,head)
    let op = temp
    while(op.next && op.next.next){
        let pre = op.next,cur = op.next.next;
        pre.next = cur.next
        cur.next = pre
        op.next = cur
        op = pre
    }
    return temp.next
};
```

## 删除链表的倒数第 N 个结点

链接：<https://leetcode.cn/problems/remove-nth-node-from-end-of-list/>

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点

代码示例：

```js
var removeNthFromEnd = function(head, n) {
    let count = 0
    let fast= slow = newNode = new ListNode(0,head)

    while(fast.next) {
       count++
       fast = fast.next

       if(count > n){
           slow = slow.next
       }
    }
    
    if(count>=n){
        slow.next = slow.next.next
    }
    return newNode.next
};
```

## 链表相交

 链接：<https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/>

 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null

 代码示例：

 ```js
 var getIntersectionNode = function(headA, headB) {

    if(headA===null||headB===null) return null

    let aLen = 1
    let bLen = 1
    let tempA = headA
    let tempB = headB
    while(tempA.next){
        aLen++
        tempA = tempA.next
    }
    while(tempB.next){
        bLen++
        tempB = tempB.next
    }

    let interval = Math.abs(aLen-bLen)

    if(aLen>bLen){
        for(let i = 0;i<interval;i++){
            headA = headA.next
        }
    }else{
        for(let i=0;i<interval;i++){
            headB = headB.next
        }
    }

    while(headA){
        if(headA===headB){
            return headA
        }
        headA = headA.next
        headB = headB.next
    }

    return null


};
 ```
