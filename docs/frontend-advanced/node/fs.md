# fs

文件系统操作有同步、回调、promise使用形式，使用回调形式，在内存和执行时间方面更可取

## 文件操作

1. fs.appendFile(path, data[, options], callback)

异步地将数据追加到文件，如果该文件尚不存在，则创建该文件

- path \<string\> | \<Buffer\> | \<URL\> | \<number\> 文件名或文件描述符
- data 、<string、> | 、<Buffer、>
- options 、<Object、> | 、<string、>
  - encoding 、<string、> | 、<null、> 默认值: 'utf8'
  - mode 、<integer、> 默认值: 0o666
  - flag 、<string、>  默认值: 'a'。

```js
import { appendFile } from 'node:fs';

appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

appendFile('message.txt', 'data to append', 'utf8', callback);
```

<br/>
2. fs.writeFile(file, data[, options], callback)

当 file 是文件名时，将数据异步地写入文件，如果文件已存在则替换该文件。 data 可以是字符串或缓冲区，当 file 是文件描述符时，其行为类似于直接调用 fs.write()（推荐）

```js
import { writeFile } from 'node:fs';

writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

fs.writeFile 是一个便捷的方法，其在内部执行多次 write 调用以写入传给它的缓冲区。 对于性能敏感的代码，则考虑使用`fs.createWriteStream()`

将 fs.writeFile() 与文件描述符一起使用:

与直接调用 fs.write() 不同的是，在一些异常情况下，fs.write() 可能只写入缓冲区的一部分，需要重试写入剩余的数据，而 fs.writeFile() 会重试直到数据完全写入（或发生错误）。

其含义是常见的混淆来源。 在文件描述符的情况下，文件不会被替换！ 数据不一定写入文件的开头，文件的原始数据可以保留在新写入的数据之前和/或之后

例如，如果连续调用 fs.writeFile() 两次，首先写入字符串 'Hello'，然后写入字符串 ', World'，该文件将包含 'Hello, World'，并且可能包含文件的一些原始数据（这取决于原始文件的大小和文件描述符的位置）。 如果使用文件名而不是描述符，则文件将保证仅包含 ', World'

<br/>
3. fs.readFile(path[, options], callback)

异步地读取文件的全部内容

- path \<string\> | \<Buffer\> | \<URL\> | \<integer\> 文件名或文件描述符
- options \<Object\> | \<string\>
  - encoding \<string\> | \<null\> 默认值: null 如果未指定编码，则返回原始缓冲区
  - flag \<string\> 请参阅对文件系统 flags 的支持。 默认值: 'r'。
  - signal \<AbortSignal\> 允许中止正在进行的读取文件

```js
readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data); // 原始缓冲区
});

readFile('/etc/passwd', 'utf8',  (err, data) => {
  if (err) throw err;
  console.log(data); // 文件内容
});
```

可以使用 AbortSignal 中止正在进行的请求。 如果请求被中止，回调将被使用 AbortError 调用：

```js
import { readFile } from 'node:fs';

const controller = new AbortController();
const signal = controller.signal;
readFile(fileInfo[0].name, { signal }, (err, buf) => {
  // ...
});
// 当想中止请求时
controller.abort();
```

fs.readFile() 函数缓冲整个文件。 为了最小化内存成本，在可能的情况下优先通过 fs.createReadStream() 进行流式传输

<br/>
4. fs.copyFile(src, dest[, mode], callback)

异步地将文件从 src 复制到 dest。 默认情况下，如果 dest 已经存在，则会被覆盖，如果在打开目标文件进行写入后发生错误，Node.js 将尝试删除目标文件

- src \<string\> | \<Buffer\> | \<URL\> 要复制的源文件名
- dest \<string\> | \<Buffer\> | \<URL\> 复制操作的目标文件名
- mode \<integer\> 复制操作的修饰符。 默认值: 0。
- callback \<Function\>

```js
import { copyFile, constants } from 'node:fs';

function callback(err) {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
}

// 默认情况下将创建或覆盖 destination.txt。
copyFile('source.txt', 'destination.txt', callback);

// 通过使用 COPYFILE_EXCL，如果 destination.txt 存在，则该操作将失败。
copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL, callback);
```

<br/>
5. fs.truncate(path[, len], callback)

- path \<string\> | \<Buffer\> | \<URL\>
- len \<integer\> 默认值： 0
- callback \<Function\>
- err \<Error\> | \<AggregateError\>

截断文件。 除了可能的异常之外，没有为完成回调提供任何参数。 文件描述符也可以作为第一个参数传入。 在这种情况下，`fs.ftruncate()` 被调用

## 文件夹操作

1. fs.mkdir(path[, options], callback)

异步地创建目录，回调给出一个可能的异常和创建的第一个目录路径（如果 recursive 为 true）。 当 recursive 为 true 时，如果没有创建目录，则 path 仍然为 undefined

- path \<string\> | \<Buffer\> | \<URL\>
- options \<Object\> | \<integer\>
  - recursive \<boolean\> 默认值: false
  - mode \<string\> | \<integer\> Windows 上不支持。 默认值: 0o777。

```js
import { mkdir } from 'node:fs';

// 创建 /tmp/a/apple，不管 `/tmp` 和 /tmp/a 是否存在。
mkdir('/tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});
```

<br/>
2. fs.mkdtemp(prefix[, options], callback)

- prefix \<string\>
- options \<string\> | \<Object\>
- encoding \<string\> 默认值： 'utf8'
- callback \<Function\>
- err \<Error\>
- directory \<string\>

创建唯一的临时目录。

生成六个随机字符，附加在所需的 prefix 后面以创建唯一的临时目录。 由于平台的不一致，请避免在 prefix 中尾随 X 字符。 某些平台，尤其是 BSD，可能返回六个以上的随机字符，并将 prefix 中的尾随 X 字符替换为随机字符。

创建的目录路径作为字符串传递给回调的第二个参数

```js
import { mkdtemp } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

mkdtemp(join(tmpdir(), 'foo-'), (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // Prints: /tmp/foo-itXde2 or C:\Users\...\AppData\Local\Temp\foo-itXde2
});
```

<br/>
3. fs.readdir(path[, options], callback)

读取目录的内容。 回调有两个参数 (err, files)，其中 files 是目录中文件名的数组，不包括 '.' 和 '..'。

```js
fs.readdir('../../promise', { withFileTypes: true }, (err, data) => {
    if (!err) console.log(data)
})
```

<br/>
4. fs.cp(src, dest[, options], callback)

将整个目录结构从 src 异步地复制到 dest，包括子目录和文件

- src \<string\> | \<URL\> 要复制的源路径。
- dest \<string\> | \<URL\> 要复制到的目标路径。
- options \<Object\>
  - dereference \<boolean\> 取消引用符号链接。 默认值: false。
  - errorOnExist \<boolean\> 当 force 为 false 且目标存在时，则抛出错误。 默认值: false。
  - filter \<Function\> 过滤复制文件/目录的函数。 返回 true 则复制条目，返回 false 则忽略它。 也可以返回解决为 true 或 false 的 Promise 默认值: undefined。
  - force \<boolean\> 覆盖现有的文件或目录。 如果将此设置为 false 并且目标存在，则复制操作将忽略错误。 使用 errorOnExist 选项更改此行为。 默认值: true。
  - preserveTimestamps \<boolean\> 当为 true 时，则 src 的时间戳将被保留。 默认值: false。
  - recursive \<boolean\> 递归地复制目录 默认值: false
  - verbatimSymlinks \<boolean\> 当为 true 时，则符号链接的路径解析将被跳过。 默认值: false

<br/>
5. fs.rmdir(path[, options], callback)

异步地删除文件夹，在文件（而不是目录）上使用 fs.rmdir()，则在 Windows 上会导致 ENOENT 错误，在 POSIX 上会导致 ENOTDIR 错误

- path \<string\> | \<Buffer\> | \<URL\>
- options \<Object\>
  - maxRetries 、<integer、> 如果遇到 EBUSY、EMFILE、ENFILE、ENOTEMPTY 或 EPERM 错误，Node.js 将在每次尝试时以 retryDelay 毫秒的线性退避等待时间重试该操作。 此选项表示重试次数。 如果 recursive 选项不为 true，则忽略此选项。 默认值: 0。
  - recursive 、<boolean、> 如果为 true，则执行递归目录删除。 在递归模式下，操作将在失败时重试。 默认值: false。 已弃用。
  - retryDelay 、<integer、> 重试之间等待的时间（以毫秒为单位）。 如果 recursive 选项不为 true，则忽略此选项。 默认值: 100。

## 链接操作

1. fs.link(existingPath, newPath, callback)

- existingPath \<string\> | \<Buffer\> | \<URL\>
- newPath \<string\> | \<Buffer\> | \<URL\>
- callback \<Function\>
- err \<Error\>

创建从 existingPath 到 newPath 的新链接。 除了可能的异常之外，没有为完成回调提供任何参数

<br/>
2. fs.readlink(path[, options], callback)

- path \<string\> | \<Buffer\> | \<URL\>
- options \<string\> | \<Object\>
- encoding \<string\> 默认值： 'utf8'
- callback \<Function\>
err \<Error\>
- linkString \<string\> | \<Buffer\>

读取 path 引用的符号链接的内容。 回调有两个参数 (err, linkString)。

可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性（指定用于传给回调的链接路径的字符编码）的对象。 如果将 encoding 设置为 'buffer'，则返回的链接路径将作为 \<Buffer\> 对象传入

<br/>
3. fs.symlink(target, path[, type], callback)

- target \<string\> | \<Buffer\> | \<URL\>
- path \<string\> | \<Buffer\> | \<URL\>
- type \<string\> | \<null\> 默认值： null
- callback \<Function\>
- err \<Error\>

创建名为 path 指向 target 的链接。 除了可能的异常之外，没有为完成回调提供任何参数

<br/>
4. fs.unlink(path, callback)

- path \<string\> | \<Buffer\> | \<URL\>
- callback \<Function\>
- err \<Error\>

异步地删除文件或符号链接。 除了可能的异常之外，没有为完成回调提供任何参数。

```js
import { unlink } from 'node:fs';
// Assuming that 'path/file.txt' is a regular file.
unlink('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was deleted');
});
```

fs.unlink() 不适用于目录，无论是空目录还是其他目录。 要删除目录，请使用 fs.rmdir()

## 共有方法

1. fs.rm(path[, options], callback)

异步地删除文件和目录

- path \<string\> | \<Buffer\> | \<URL\>
- options \<Object\>
  - force \<boolean\> 当为 true 时，如果 path 不存在，则异常将被忽略。 默认值: false。
  - maxRetries 、<integer、> 如果遇到 EBUSY、EMFILE、ENFILE、ENOTEMPTY 或 EPERM 错误，Node.js 将在每次尝试时以 retryDelay 毫秒的线性退避等待时间重试该操作。 此选项表示重试次数。 如果 recursive 选项不为 true，则忽略此选项。 默认值: 0。
  - recursive 、<boolean、> 如果为 true，则执行递归删除。 在递归模式下，操作将在失败时重试。 默认值: false。
  - retryDelay 、<integer、> 重试之间等待的时间（以毫秒为单位）。 如果 recursive 选项不为 true，则忽略此选项。 默认值: 100。

<br/>
2. fs.rename(oldPath, newPath, callback)
将 oldPath 处的文件异步重命名为作为 newPath 提供的路径名。 如果 newPath 已经存在，则它将被覆盖。 如果在 newPath 中有目录，则会引发错误

- oldPath \<string\> | \<Buffer\> | \<URL\>
- newPath \<string\> | \<Buffer\> | \<URL\>

```js
import { rename } from 'node:fs';

rename('oldFile.txt', 'newFile.txt', (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});
```

<br/>
3. fs.watch(filename[, options][, listener])

监听文件或者目录的变化，监听器回调有两个参数 (eventType, filename)。 eventType 是 'rename' 或 'change'，filename 是触发事件的文件的名称

- filename \<string\> | \<Buffer\> | \<URL\>
- options \<string\> | \<Object\>
  - persistent \<boolean\> 指示只要正在监视文件，进程是否应继续运行。 默认值: true。
  - recursive \<boolean\> 指示是应监视所有子目录，还是仅监视当前目录。 这在指定目录时适用，并且仅在受支持的平台上有效（请参见注意事项）。 默认值: false。
  - encoding \<string\> 指定用于传给监听器的文件名的字符编码。 默认值: 'utf8'。
  - signal \<AbortSignal\> 允许使用中止信号关闭监视器。
- listener \<Function\> | \<undefined\> 默认值: undefined
  - eventType \<string>\
  - filename \<string\> | \<Buffer\>

## 创建流

1. fs.createReadStream(path[, options])

创建文件读取流

- path \<string\> | \<Buffer\> | \<URL\>
- options \<string\> | \<Object\>
  - flags \<string\> 请参阅对文件系统 flags 的支持。 默认值: 'r'。
  - encoding \<string\> 默认值: null
  - fd \<integer\> | \<FileHandle\> 默认值: null
  - mode \<integer\> 默认值: 0o666
  - autoClose \<boolean\> 默认值: true
  - emitClose \<boolean\> 默认值: true
  - start \<integer\>
  - end \<integer\> 默认值: Infinity
  - highWaterMark \<integer\> 默认值: 64 * 1024
  - fs \<Object\> | \<null\> 默认值: null

```js
import { createReadStream } from 'node:fs';

createReadStream('sample.txt', { start: 90, end: 99 });
```

<br/>
2. fs.createWriteStream(path[, options])

创建文件的可写流

- path \<string\> | \<Buffer\> | \<URL\>
- options \<string\> | \<Object>\
  - flags \<string\> 请参阅对文件系统 flags 的支持。 默认值: 'w'。
  - encoding \<string\> 默认值: 'utf8'
  - fd \<integer\> | \<FileHandle\> 默认值: null
  - mode \<integer\> 默认值: 0o666
  - autoClose \<boolean\> 默认值: true
  - emitClose \<boolean\> 默认值: true
  - start \<integer\>
  - fs \<Object\> | \<null\> 默认值: null

## 文件状态

1. fs.chmod(path,mode,callback)

 用于修改文件的权限,除了可能的异常之外，没有为完成回调提供任何参数

- path \<string\> | \<Buffer\> | \<URL\>
- mode \<string\> | \<integer\>
- callback \<Function\>
  - err \<Error\>

```js

import { chmod } from 'node:fs';

chmod('my_file.txt', 0o775, (err) => {
  if (err) throw err;
  console.log('The permissions for file "my_file.txt" have been changed!');
});

```

文件权限使用mode方式进行指定：
|常量|八进制|描述|
|----|----|----|
|fs.constants.S_IRUSR|   0o400|   所有者可读取|
|fs.constants.S_IWUSR|  0o200 | 所有者可写入
|fs.constants.S_IXUSR|   0o100 | 所有者可执行/搜索|
|fs.constants.S_IRGRP|   0o40|    群组可读取|
|fs.constants.S_IWGRP|  0o20|    群组可写入|
|fs.constants.S_IXGRP|   0o10 |   群组可执行/搜索|
|fs.constants.S_IROTH|   0o4|      其他人可读取|
|fs.constants.S_IWOTH|  0o2 |     其他人可写入|
|fs.constants.S_IXOTH|   0o1|     其他人可执行/搜索|

<br/>
2. fs.open(path[, flags[, mode]], callback)

异步地打开文件,mode 设置文件模式（权限和粘滞位），但前提是文件已创建

- path \<string\> | \<Buffer\> | \<URL\>
- flags \<string\> | \<number\> 请参阅对文件系统 flags 的支持。 默认值: 'r'。
- mode \<string\> | \<integer\> 默认值: 0o666 （可读可写）

<br/>
3. fs.close(fd[, callback])

关闭文件描述如

- fd \<integer\>
- callback \<Function\>
  - err \<Error\>

<br/>
4. fs.stat(path[, options], callback)

获取文件信息

- path \<string\> | \<Buffer\> | \<URL\>
- options \<Object\>
  - bigint \<boolean\> 返回的 \<fs.Stats\> 对象中的数值是否应为 bigint。 默认值: false。

<br/>
5. fs.access (path,mode,callback)

用于获取文件或目录的权限，不建议在调用open方法检查文件的可访问性，应该直接使用文件的读写、执行操作，在具体的操作中对错误进行处理

```js
import { access, constants } from 'node:fs';

const file = 'package.json';

// 检查当前目录中是否存在该文件。
access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});

// 检查文件是否可读。
access(file, constants.R_OK, (err) => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
});

// 检查文件是否可写。
access(file, constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
});

// 检查文件是否可读可写。
access(file, constants.R_OK | constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not' : 'is'} readable and writable`);
});
```

<br/>
6. fs.chown(path, uid, gid, callback)

异步地更改文件的所有者和群组。 除了可能的异常之外，没有为完成回调提供任何参数
