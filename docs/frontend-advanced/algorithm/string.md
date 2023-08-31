# 字符串算法案例

## 反转字符串

链接：<https://leetcode.cn/problems/reverse-string/>

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题

代码示例：

```js
var reverseString = function (s) {
  let start = 0,
    end = s.length - 1

  while (start < end) {
    let temp = s[start]
    s[start] = s[end]
    s[end] = temp
  }
}
```

## 反转字符串II

链接：<https://leetcode.cn/problems/reverse-string-ii/>

给定一个字符串 s 和一个整数 k，从字符串开头算起, 每计数至 2k 个字符，就反转这 2k 个字符中的前 k 个字符。

如果剩余字符少于 k 个，则将剩余字符全部反转。

如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样

代码示例：

```js
var reverseStr = function(s, k) {
    const len = s.length;
    let resArr = s.split(""); 
    for(let i = 0; i < len; i += 2 * k) {  // 每隔 2k 个字符的前 k 个字符进行反转
        let l = i - 1, r = i + k > len ? len : i + k;
        while(++l < --r) [resArr[l], resArr[r]] = [resArr[r], resArr[l]];
    }
    return resArr.join("");
};
```

## 替换空格

链接：<https://leetcode.cn/problems/ti-huan-kong-ge-lcof/>

请实现一个函数，把字符串 s 中的每个空格替换成"%20"

代码示例：

```js
var replaceSpace = function (s) {
  s = s.split('')
  let spaceCount = 0
  let oldLength = s.length
  for (let i = 0; i < oldLength; i++) {
    if (s[i] === ' ') spaceCount++
  }
  let newLength = oldLength + spaceCount * 2
  for (let left = oldLength - 1, right = newLength - 1; left > -1; left--, right--) {
    if (s[left] === ' ') {
      s[right] = '0'
      s[right - 1] = '2'
      s[right - 2] = '%'
      right -= 2
    } else {
      s[right] = s[left]
    }
  }
  return s.join('')
}
```

## 翻转字符串里的单词

链接：<https://leetcode.cn/problems/reverse-words-in-a-string/>

给你一个字符串 s ，请你反转字符串中 单词 的顺序。

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。

注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格

```js
 var reverseWords = function(s) {
   // 字符串转数组
   const strArr = Array.from(s);
   // 移除多余空格
   removeExtraSpaces(strArr);
   // 翻转
   reverse(strArr, 0, strArr.length - 1);

   let start = 0;

   for(let i = 0; i <= strArr.length; i++) {
     if (strArr[i] === ' ' || i === strArr.length) {
       // 翻转单词
       reverse(strArr, start, i - 1);
       start = i + 1;
     }
   }

   return strArr.join('');
};

// 删除多余空格
function removeExtraSpaces(strArr) {
  let slowIndex = 0;
  let fastIndex = 0;

  while(fastIndex < strArr.length) {
    // 移除开始位置和重复的空格
    if (strArr[fastIndex] === ' ' && (fastIndex === 0 || strArr[fastIndex - 1] === ' ')) {
      fastIndex++;
    } else {
      strArr[slowIndex++] = strArr[fastIndex++];
    }
  }

  // 移除末尾空格
  strArr.length = strArr[slowIndex - 1] === ' ' ? slowIndex - 1 : slowIndex;
}

// 翻转从 start 到 end 的字符
function reverse(strArr, start, end) {
  let left = start;
  let right = end;

  while(left < right) {
    // 交换
    [strArr[left], strArr[right]] = [strArr[right], strArr[left]];
    left++;
    right--;
  }
}
```

## 左旋转字符串

链接：<https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/>

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"

代码示例：

```js
var reverseLeftWords = function (s, n) {
  s = s.split('')
  let len = s.length

  reverseWords(s, 0, len - 1)
  reverseWords(s, 0, len - n - 1)
  reverseWords(s, len - n, len - 1)
  return s.join('')
}

var reverseWords = function (s, start, end) {
  while (start < end) {
    const temp = s[start]
    s[start] = s[end]
    s[end] = temp
    start++
    end--
  }
}
```

## 重复的子字符串

链接：<https://leetcode.cn/problems/repeated-substring-pattern/>

给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成

代码示例：

```js
var repeatedSubstringPattern = function (s) {
  // 1. 设置 s 的长度 length
  const length = s.length;

  // 2. 设置每次累加的长度
  let str = '';

  // 3. 遍历字符串
  for (let i = 0; i < s.length - 1; i++) {
    // 3.1 累加字符串
    str += s[i];
    // 3.2 判断是否为重复的长度
    if (s === str.repeat(Math.floor(length / str.length))) {
      return true;
    }
  }

  // 4. 如果不存在，则返回 false
  return false;
}
```
