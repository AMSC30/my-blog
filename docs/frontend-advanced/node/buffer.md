# buffer

Buffer 对象用于表示固定长度的字节序列

## 构造函数方法

1. Buffer.alloc(size[, fill[, encoding]])

创建一个拥有size个字节的新buffer如果 fill 为 undefined，则 Buffer 将以零填充
如果 size 大于 buffer.constants.MAX_LENGTH 或小于 0或不为数字，将抛出错误

```js
const buf = Buffer.alloc(5);

console.log(buf);
// 打印: <Buffer 00 00 00 00 00>
```

如果指定了 fill，则分配的 Buffer 将通过调用 buf.fill(fill) 进行初始化

```js
const buf = Buffer.alloc(5, 'a');

console.log(buf);
// 打印: <Buffer 61 61 61 61 61>
```

如果同时指定了 fill 和 encoding，则分配的 Buffer 将通过调用 buf.fill(fill, encoding) 进行初始化。

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

console.log(buf);
// 打印: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
```

调用 Buffer.alloc() 可能比替代的 Buffer.allocUnsafe() 慢得多，但可确保新创建的 Buffer 实例的内容永远不会包含来自先前分配的敏感数据，包括可能尚未分配给 Buffer 的数据

2. Buffer.allocUnsafe(size)

分配 size 个字节的新 Buffer。 如果 size 大于 buffer.constants.MAX_LENGTH 或小于 0或不为数字，则抛出错误

```js
const buf = Buffer.allocUnsafe(10);

console.log(buf);
// 打印（内容可能会有所不同）: <Buffer a0 8b 28 3f 01 00 00 00 50 32>

buf.fill(0);

console.log(buf);
// 打印: <Buffer 00 00 00 00 00 00 00 00 00 00>
```

Buffer 模块预先分配了大小为 Buffer.poolSize 的内部 Buffer 实例作为池，用于快速分配使用 Buffer.allocUnsafe()、Buffer.from(array)、Buffer.concat() 创建的新 Buffer 实例，仅当 size 小于或等于 Buffer.poolSize >> 1（Buffer.poolSize 除以二再向下取整）时才使用弃用的 new Buffer(size) 构造函数

使用此预先分配的内部内存池是调用 Buffer.alloc(size, fill) 与调用 Buffer.alloc(size, fill) 之间的关键区别。 具体来说，Buffer.alloc(size, fill) 永远不会使用内部的 Buffer 池，而 Buffer.allocUnsafe(size).fill(fill) 会在 size 小于或等于 Buffer.poolSize 的一半时使用内部的 Buffer 池。 当应用程序需要 Buffer.allocUnsafe() 提供的额外性能时，差异很细微，但可能很重要

3. Buffer.concat(list[, totalLength])

将 list 中的所有 Buffer 实例连接在一起产生新的buffer
如果列表没有条目，或者 totalLength 为 0，则返回新的零长度 Buffer。
如果未提供 totalLength，则从 list 中的 Buffer 实例通过相加其长度来计算。
如果提供了 totalLength，则将其强制为无符号整数。 如果 list 中 Buffer 的组合长度超过 totalLength，则结果截断为 totalLength

```js
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);
// 打印: 42

const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

console.log(bufA);
// 打印: <Buffer 00 00 00 00 ...>
console.log(bufA.length);
// 打印: 42

Buffer.concat() 也像 Buffer.allocUnsafe() 一样使用内部 Buffer 池
```

4. Buffer.from(array)

使用 0 – 255 范围内的字节 array 分配新的 Buffer。 该范围之外的数组条目将被截断以符合它

```js
import { Buffer } from 'node:buffer';

// 创建包含字符串 'buffer' 的 UTF-8 字节的新缓冲区。
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

Buffer.from(array) 和 Buffer.from(string) 也像 Buffer.allocUnsafe() 一样使用内部 Buffer 池
```

5. Buffer.from(buffer)

将传入的 buffer 数据复制到新的 Buffer 实例上，产生一个新的buffer

```js
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('buffer');
const buf2 = Buffer.from(buf1);

buf1[0] = 0x61;

console.log(buf1.toString());
// 打印: auffer
console.log(buf2.toString());
// 打印: buffer
```

6. Buffer.from(string[, encoding])

创建包含 string 的新 Buffer。 encoding 参数标识将 string 转换为字节时要使用的字符编码

```js
const buf1 = Buffer.from('this is a tést');
const buf2 = Buffer.from('7468697320697320612074c3a97374', 'hex');

console.log(buf1.toString());
// 打印: this is a tést
console.log(buf2.toString());
// 打印: this is a tést
console.log(buf1.toString('latin1'));
// 打印: this is a tÃ©st
```

7. Buffer.compare(buf1, buf2)

比较 buf1 和 buf2，通常用于对 Buffer 实例的数组进行排序

```js
const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare));
// 打印: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// （此结果相当于：[buf2, buf1]。）
```

8. Buffer.isBuffer(obj)

如果 obj 是 Buffer，则返回 true，否则返回 false

```js
Buffer.isBuffer(Buffer.alloc(10)); // true
Buffer.isBuffer(Buffer.from('foo')); // true
Buffer.isBuffer('a string'); // false
Buffer.isBuffer([]); // false
Buffer.isBuffer(new Uint8Array(1024)); // false
```

9. Buffer.isEncoding(encoding)
如果 encoding 是支持的字符编码的名称，则返回 true，否则返回 false。

```js
console.log(Buffer.isEncoding('utf8'));
// 打印: true

console.log(Buffer.isEncoding('hex'));
// 打印: true

console.log(Buffer.isEncoding('utf/8'));
// 打印: false

console.log(Buffer.isEncoding(''));
// 打印: false
```

10. Buffer.poolSize

这是用于池的预分配内部 Buffer 实例的大小（以字节为单位）。 该值可以修改

实例方法

1. buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
将 buf 与 target 进行比较并返回数字，该数字指示 buf 在排序顺序中是在 target 之前、之后还是与 target 相同。 比较基于每个 Buffer 中的实际字节序列

- 如果 target 与 buf 相同，则返回 0
- 如果排序时 target 应该在 buf 之前，则返回 1。
- 如果排序时 target 应该在 buf 之后，则返回 -1。

```js
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
const buf3 = Buffer.from('ABCD');

console.log(buf1.compare(buf1));
// 打印: 0
console.log(buf1.compare(buf2));
// 打印: -1
console.log(buf1.compare(buf3));
// 打印: -1
console.log(buf2.compare(buf1));
// 打印: 1
console.log(buf2.compare(buf3));
// 打印: 1
console.log([buf1, buf2, buf3].sort(Buffer.compare));
// 打印: [ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ]
// （此结果相当于：[buf1, buf3, buf2]。）
```

2. buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

将数据从 buf 的区域复制到 target 的区域，即使 target 内存区域与 buf 重叠

- target \<Buffer> | \<Uint8Array> 要复制到的 Buffer 或 Uint8Array。
- targetStart \<integer> target 内开始写入的偏移量。 默认值: 0。
- sourceStart \<integer> buf 内开始复制的偏移量。 默认值: 0。
- sourceEnd \<integer> buf 内停止复制的偏移量（不包括）。 默认值: buf.length.

```js
// 创建两个 `Buffer` 实例。
const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf1[i] = i + 97;
}

// 将 `buf1` 字节 16 到 19 复制到 `buf2` 中，从 `buf2` 的字节 8 开始。
buf1.copy(buf2, 8, 16, 20);
// 这相当于：
// buf2.set(buf1.subarray(16, 20), 8);

console.log(buf2.toString('ascii', 0, 25));
// 打印: !!!!!!!!qrst!!!!!!!!!!!!!
```

3. buf.equals(otherBuffer)

如果 buf 和 otherBuffer 具有完全相同的字节，则返回 true，否则返回 false

```js
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('414243', 'hex');
const buf3 = Buffer.from('ABCD');

console.log(buf1.equals(buf2));
// 打印: true
console.log(buf1.equals(buf3));
// 打印: false
```

4. buf.fill(value[, offset[, end]][, encoding])

用指定的 value 填充 buf。 如果没有给定 offset 和 end，则整个 buf 都会被填满

- value \<string> | \<Buffer> | \<Uint8Array> | \<integer> 用于填充 buf 的值。
- offset \<integer> 在开始填充 buf 之前要跳过的字节数。 默认值: 0。
- end \<integer> 停止填充 buf（不包括在内）的位置。 默认值: buf.length.
- encoding \<string> 如果 value 是字符串，则为 value 的编码。 默认值: 'utf8'。

```js
// 用 ASCII 字符 'h' 填充 `Buffer`。

const b = Buffer.allocUnsafe(50).fill('h');

console.log(b.toString());
// 打印: hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

如果 fill() 操作的最终写入落在多字节字符上，则仅写入适合 buf 的该字符的字节
// 用在 UTF-8 中占用两个字节的字符填充 `Buffer`。

console.log(Buffer.allocUnsafe(5).fill('\u0222'));
// 打印: <Buffer c8 a2 c8 a2 c8>

如果 value 包含无效字符，则截断；如果没有有效的填充数据，则抛出异常
const buf = Buffer.allocUnsafe(5);

console.log(buf.fill('a'));
// 打印: <Buffer 61 61 61 61 61>
console.log(buf.fill('aazz', 'hex'));
// 打印: <Buffer aa aa aa aa aa>
console.log(buf.fill('zz', 'hex'));
// 抛出异常。
```

5. buf.includes(value[, byteOffset][, encoding])

- value \<string> | \<Buffer> | \<Uint8Array> | \<integer> 要搜索的内容。
- byteOffset \<integer> 开始搜索 buf 的位置。 如果为负数，则从 buf 的末尾开始计算偏移量。 默认值: 0。
- encoding \<string> 如果 value 是字符串，则这就是它的编码。 默认值: 'utf8'。

6. buf.indexOf(value[, byteOffset][, encoding])

- value \<string> | \<Buffer> | \<Uint8Array> | \<integer> 要搜索的内容。
- byteOffset \<integer> 开始搜索 buf 的位置。 如果为负数，则从 buf 的末尾开始计算偏移量。 默认值: 0。
- encoding \<string> 如果 value 是字符串，则这是用于确定将在 buf 中搜索的字符串的二进制表示的编码。 默认值: 'utf8'。

7. toJSON()

返回 buf 的 JSON 表示

```js
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

console.log(json);
// 打印: {"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value) :
    value;
});

console.log(copy);
// 打印: <Buffer 01 02 03 04 05>
```

8. toString([encoding[, start[, end]]])

根据 encoding 中指定的字符编码将 buf 解码为字符串。 start 和 end 可以传入仅解码 buf 的子集。

- encoding \<string> 要使用的字符编码。 默认值: 'utf8'。
- start \<integer> 开始解码的字节偏移量。 默认值: 0。
- end \<integer> 停止解码的字节偏移量（不包括在内）。 默认值: buf.length.

9. write(string[, offset[, length]][, encoding])

根据 encoding 中的字符编码将 string 写入 buf 的 offset 处。 length 参数是要写入的字节数。 如果 buf 没有足够的空间来容纳整个字符串，则只会写入 string 的一部分。 但是，不会写入部分编码的字符。

- string \<string> 要写入 buf 的字符串。
- offset \<integer> 开始写入 string 之前要跳过的字节数。 默认值: 0。
- length \<integer> 要写入的最大字节数（写入的字节数不会超过 buf.length - offset）。 默认值: buf.length - offset。
- encoding \<string> string 的字符编码。 默认值: 'utf8'。

```js
const buf = Buffer.alloc(256);

const len = buf.write('\u00bd + \u00bc = \u00be', 0);

console.log(`${len} bytes: ${buf.toString('utf8', 0, len)}`);
// 打印: 12 bytes: ½ + ¼ = ¾

const buffer = Buffer.alloc(10);

const length = buffer.write('abcd', 8);

console.log(`${length} bytes: ${buffer.toString('utf8', 8, 10)}`);
// 打印: 2 bytes : ab
```

10. 迭代方法:keys（）、values（）、entries（）

实例属性

1. Length
buf 中的字节数
