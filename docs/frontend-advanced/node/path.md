# path

path模块提供了对路径操作的方法

path结构：

|──────────|───────|
<br/>
│-----------dir---------│----base----│
<br/>
│--root--│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│-name-│-ext-│
<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;home/user/dir/&nbsp;&nbsp;&nbsp;&nbsp;file&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.txt
<br/>
|──────────|───────|

## Windows 与 POSIX 的对比

node:path 模块的默认操作因运行 Node.js 应用程序的操作系统而异

在 POSIX 上：

```js
path.basename('C:\\temp\\myfile.html');
// 返回: 'C:\\temp\\myfile.html'
```

在 Windows 上：

```js
path.basename('C:\\temp\\myfile.html');
// 返回: 'myfile.html'
```

当使用 Windows 文件路径时，若要在任何操作系统上获得一致的结果，则使用 path.win32
在 POSIX 和 Windows 上：

```js
path.win32.basename('C:\\temp\\myfile.html');
// 返回: 'myfile.html'
```

当使用 POSIX 文件路径时，若要在任何操作系统上获得一致的结果，则使用 path.posix
在 POSIX 和 Windows 上：

```js
path.posix.basename('/tmp/myfile.html');
// 返回: 'myfile.html'
```

## 路径拆解

1. path.basename(path[, ext])

path.basename() 方法返回 path 的最后一部分

```js
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'
```

tips：如果path不是字符串，将会报错

<br/>
2. path.delimiter

提供特定于平台的路径定界符：windows->;  posix->：

<br/>
3. path.dirname(path)

dirname方法用于解析path所指定文件所在目录名，末尾的路径分隔符会被忽略

```js
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
```

4. path.extname(path)

extname方法用于解析path所指文件的扩展名，即 path 的最后一部分（最后一个路径分隔符后面）中从最后一次出现的 .（句点）字符到字符串的结尾。 如果 path 的最后一部分中没有 .，或者除了 path 的基本名称（参见 path.basename()）的第一个字符之外没有 . 个字符，则返回空字符串

```js
path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''

path.extname('.index.md');
// 返回: '.md'
```

## 形式转换

6. path.format(pathObject)

path.format() 方法从对象返回路径字符串

```js
path.format({
  dir: '/home/user/dir',
  base: 'file.txt'
});
```

当向 pathObject 提供属性时，存在一个属性优先于另一个属性的组合：

- 如果提供 pathObject.dir，则忽略 pathObject.root

```js
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
```

- 如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name

```js
path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored'
});
```

<br/>
2. path.isAbsolute(path)

该方法用于判断path是否为绝对路径

<br/>
3. path.parse(path)

path.parse() 方法返回一个对象，其属性表示 path 的重要元素

```js
path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

## 路径解析

1. path.relative(from,to)

path.relative() 方法根据当前工作目录返回从 from 到 to 的相对路径

```js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// 返回: '../../impl/bbb'

path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb');
// 返回: '..\\..\\impl\\bbb'
```

<br/>
2. path.resolve([...paths])

path.resolve() 方法将路径或路径片段的序列解析为绝对路径，
给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径

如果在处理完所有给定的 path 片段之后，还没有生成绝对路径，则使用当前工作目录

3. path.join([...paths])

path.join() 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径，只做拼接，不做解析

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
```

## 序列化

1. path.normalize(path)

path.normalize() 方法规范化给定的 path，解析 '..' 和 '.' 片段。
当找到多个连续的路径片段分隔符（例如 POSIX 上的 / 和 Windows 上的 \ 或 /）时，则它们将被平台特定路径片段分隔符（POSIX 上的 / 和 Windows 上的 \）的单个实例替换。 保留尾随的分隔符

```js
path.normalize('/foo/bar//baz/asdf/quux/..');
// 返回: '/foo/bar/baz/asdf'
```
