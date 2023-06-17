# Vite

Vite（/vit/）是一种新型前端构建工具，通过`按需编译`等方式能够显著提升前端开发体验。它主要由两部分组成：

- 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。

- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源

[官方文档](https://cn.vuejs.org/)

## 命令行

### vite

在当前目录下启动vite开发服务器

选项：

- --host [host]   指定主机名称 (string)
- --port \<port\>   指定端口 (number)
- --https   使用 TLS + HTTP/2 (boolean)
- --open [path]   启动时打开浏览器 (boolean | string)
- --cors   启用 CORS (boolean)
- --strictPort   如果指定的端口已在使用中，则退出 (boolean)
- --force   强制优化器忽略缓存并重新构建 (boolean)
- -c, --config \<file\>   使用指定的配置文件 (string)
- --base \<path\>   公共基础路径（默认为：/）(string)
- -l, --logLevel \<level\>   Info | warn | error | silent (string)
- --clearScreen   允许或禁用打印日志时清除屏幕 (boolean)
- -d, --debug [feat]   显示调试日志 (string | boolean)
- -f, --filter \<filter\>   过滤调试日志 (string)
- -m, --mode \<mode\>   设置环境模式 (string)
- -h, --help   显示可用的 CLI 选项
- -v, --version   显示版本号

### vite build

构建生产版本

选项：

- --target \<target\>     编译目标（默认为："modules"）(string)
- --outDir \<dir\> 输出目录（默认为：dist）(string)
  - - --assetsDir \<dir\> 在输出目录下放置资源的目录（默认为："assets"）(string)
- --assetsInlineLimit \<number\> 静态资源内联为 base64 编码的阈值，以字节为单位（默认为：4096）(number)
- --ssr [entry] 为服务端渲染配置指定入口文件 (string)
- --sourcemap [output] 构建后输出 source map 文件（默认为：false）(boolean | "inline" | "hidden")
- --minify [minifier] 允许或禁用最小化混淆，或指定使用哪种混淆器（默认为："esbuild"）(boolean | "terser" | "esbuild")
- --manifest [name] 构建后生成 manifest.json 文件 (boolean | string)
- --ssrManifest [name] 构建后生成 SSR manifest.json 文件 (boolean | string)
- --force 强制优化器忽略缓存并重新构建（实验性）(boolean)
- --emptyOutDir 若输出目录在根目录外，强制清空输出目录 (boolean)
- -w, --watch 在磁盘中模块发生变化时，重新构建 (boolean)
- -c, --config \<file\> 使用指定的配置文件 (string)
- --base \<path\> 公共基础路径（默认为：/）(string)
- -l, --logLevel \<level\> Info | warn | error | silent (string)
- --clearScreen 允许或禁用打印日志时清除屏幕 (boolean)
- -d, --debug [feat] 显示调试日志 (string | boolean)
- -f, --filter \<filter\> 过滤调试日志 (string)
- -m, --mode \<mode\> 设置环境模式 (string)
- -h, --help 显示可用的 CLI 选项

### vite optimize

预构建依赖。

选项:

- --force 强制优化器忽略缓存并重新构建 (boolean)
- -c, --config \<file\> 使用指定的配置文件 (string)
- --base \<path\> 公共基础路径（默认为：/）(string)
- -l, --logLevel \<level\> Info | warn | error | silent (string)
- --clearScreen 允许或禁用打印日志时清除屏幕 (boolean)
- -d, --debug [feat] 显示调试日志 (string | boolean)
- -f, --filter \<filter\> 过滤调试日志 (string)
- -m, --mode \<mode\> 设置环境模式 (string)
- -h, --help 显示可用的 CLI 选项

### vite preview

本地预览构建产物。不要将其用作生产服务器，因为它不是为此而设计的。

选项:

- --host [host] 指定主机名称 (string)
- --port \<port\> 指定端口 (number)
- --strictPort 如果指定的端口已在使用中，则退出 (boolean)
- --https 使用 TLS + HTTP/2 (boolean)
- --open [path] 启动时打开浏览器 (boolean | string)
- --outDir \<dir\> 输出目录（默认为：dist)(string)
- -c, --config \<file\> 使用指定的配置文件 (string)
- --base \<path\> 公共基础路径（默认为：/）(string)
- -l, --logLevel \<level\> Info | warn | error | silent (string)
- --clearScreen 允许或禁用打印日志时清除屏幕 (boolean)
- -d, --debug [feat] 显示调试日志 (string | boolean)
- -f, --filter \<filter\> 过滤调试日志 (string)
- -m, --mode \<mode\> 设置环境模式 (string)
- -h, --help 显示可用的 CLI 选项

## 资源处理

### npm依赖解析

对于以下情况：

```js
import { someMethod } from 'my-dep'
```

在浏览器中对于这种导入会抛出一个错误，Vite 将会检测到所有被加载的源文件中的此类裸模块导入，并执行以下操作:

- 预构建

它们可以提高页面加载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由`esbuild`执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。

原因：

Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将以 CommonJS 或 UMD 形式提供的依赖项转换为 ES 模块。在转换 CommonJS 依赖项时，Vite 会进行智能导入分析，这样即使模块的导出是动态分配的

为了提高后续页面的加载性能，Vite将那些具有许多内部模块的 ESM 依赖项转换为单个模块。

- 重写导入为合法的 URL

例如 /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们

### TypeScript

Vite 使用esbuild（是 tsc 速度的 20~30 倍）仅执行 .ts 文件的转译工作，并不执行任何类型检查。因为转译可以在每个文件的基础上进行，与 Vite 的按需编译模式完全吻合，类型检查需要了解整个模块图，对构建速度产生损害

使用 仅含类型的导入和导出 形式的语法可以避免潜在的 “仅含类型的导入被不正确打包” 的问题：

```ts
import type { T } from 'only/types'
export type { T }
```

使用vite转译ts，编译配置选项（compilerOptions）需要注意一下几点：

**1.isolatedModules**

因为 esbuild 只执行没有类型信息的转译，它并不支持某些特性，如 const enum 和隐式类型导入，isolatedModules应该设置为true，TS 会警告你不要使用隔离（isolated）转译的功能

> 一些库（如：vue）不能很好地与 "isolatedModules": true 共同工作。你可以在上游仓库修复好之前暂时使用 "skipLibCheck": true 来缓解这个错误。

**2. useDefineForClassFields**

从 Vite v2.5.0 开始，如果 TypeScript 的 target 是 ESNext 或 ES2022 及更新版本，此选项默认值则为 true(大多数符合预期)

如果正在使用一个严重依赖 class fields 的库，请注意该库对此选项的预期设置

### Vue

Vite 为 Vue 提供第一优先级支持：

- Vue 3 单文件组件支持：@vitejs/plugin-vue
- Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
- Vue 2.7 SFC 支持：@vitejs/plugin-vue2
- Vue 2.7 JSX support via @vitejs/plugin-vue2-jsx

### JSX

.jsx 和 .tsx 文件同样开箱即用。JSX 的转译同样是通过 esbuild

如果不是在 React 或 Vue 中使用 JSX，自定义的 jsxFactory 和 jsxFragment 可以使用 esbuild 选项 进行配置。例如对 Preact：

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})
```

可以使用 jsxInject（这是一个仅在 Vite 中使用的选项）为 JSX 注入 helper，以避免手动导入：

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})
```

### CSS

导入 .css 文件将会把内容插入到`<style>`标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的、作为其模块默认导出的 CSS

**1. @import 内联和变基**

Vite 通过 postcss-import 预配置支持了 CSS @import 内联，Vite 的路径别名也遵从 CSS @import。换句话说，所有 CSS url() 引用，即使导入的文件在不同的目录中，也总是自动变基，以确保正确性。

Sass 和 Less 文件也支持 @import 别名和 URL 变基

**2. PostCSS**

如果项目包含有效的 PostCSS 配置 (任何受 postcss-load-config 支持的格式，例如 postcss.config.js)，它将会自动应用于所有已导入的 CSS。

**3. CSS Modules**

任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象：

```css
/* example.module.css */
.red {
  color: red;
}
```

```js
import classes from './example.module.css'
document.getElementById('foo').className = classes.red
```

**4. CSS 预处理器**

提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖

由于 Vite 的目标仅为现代浏览器，因此建议使用原生 CSS 变量和实现 CSSWG 草案的 PostCSS 插件（例如 postcss-nesting）来编写简单的、符合未来标准的 CSS

**5. 禁用 CSS 注入页面**

自动注入 CSS 内容的行为可以通过 ?inline 参数来关闭。在关闭时，被处理过的 CSS 字符串将会作为该模块的默认导出，但样式并没有被注入到页面中。

```js
import './foo.css' // 样式将会注入页面
import otherStyles from './bar.css?inline' // 样式不会注入页面
```

> 自 Vite 4 起，CSS 文件的默认导入和按名导入（例如 import style from './foo.css'）将弃用。请使用 ?inline 参数代替。

### 静态资源处理

导入一个静态资源会返回解析后的 URL：

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

添加一些特殊的查询参数可以更改资源被引入的方式：

```js
// 显式加载资源为一个 URL
import assetAsURL from './asset.js?url'

// 以字符串形式加载资源
import assetAsString from './shader.glsl?raw'

// 加载为 Web Worker
import Worker from './worker.js?worker'

// 在构建时 Web Worker 内联为 base64 字符串
import InlineWorker from './worker.js?worker&inline'
```

### JSON

可以被直接导入 —— 同样支持具名导入：

``` js
// 导入整个对象
import json from './example.json'
// 对一个根字段使用具名导入 —— 有效帮助 treeshaking！
import { field } from './example.json'
```

### Glob 导入

Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块(默认动态导入)
**1. 动态导入**

```js
const modules = import.meta.glob('./dir/*.js')

// 以上将会被转译为下面的样子：

const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js'),
}
```

**2. 静态导入**

```js
const modules = import.meta.glob('./dir/*.js', { eager: true })

// 以上会被转译为下面的样子：
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
}
```

**3. 导入形式**

import.meta.glob 都支持以字符串形式导入文件，类似于以字符串形式导入资源，{ as: 'url' } 还支持将资源作为 URL 加载

```js
const modules = import.meta.glob('./dir/*.js', { as: 'raw', eager: true })

// 上面的代码会被转换为下面这样：
const modules = {
  './dir/foo.js': 'export default "foo"\n',
  './dir/bar.js': 'export default "bar"\n',
}
```

**4. 多个匹配模式**

第一个参数可以是一个 glob 数组：

```js
const modules = import.meta.glob(['./dir/*.js', './another/*.js'])
```

**5. 具名导入**

通过`import`选项，可以指定导入的内容，默认是default

```js
const modules = import.meta.glob('./dir/*.js', { import: 'setup' })

// vite 生成的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js').then((m) => m.setup),
  './dir/bar.js': () => import('./dir/bar.js').then((m) => m.setup),
}
```

当与 eager 一同存在时，甚至可以对这些模块进行 tree-shaking。

```ts
const modules = import.meta.glob('./dir/*.js', {
  import: 'setup',
  eager: true,
})

// vite 生成的代码
import { setup as __glob__0_0 } from './dir/foo.js'
import { setup as __glob__0_1 } from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
}
```

## 热模块替换
