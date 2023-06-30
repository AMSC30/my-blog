# Vite

Vite（/vit/）是一种新型前端构建工具，通过`按需编译`等方式能够显著提升前端开发体验。它主要由两部分组成：

- 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。

- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源

[官方文档v4](https://cn.vitejs.dev/guide/)

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
- --assetsDir \<dir\> 在输出目录下放置资源的目录（默认为："assets"）(string)
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

**1. 预构建**

它们可以提高页面加载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由`esbuild`执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。

原因：

Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将以 CommonJS 或 UMD 形式提供的依赖项转换为 ES 模块。在转换 CommonJS 依赖项时，Vite 会进行智能导入分析，这样即使模块的导出是动态分配的

为了提高后续页面的加载性能，Vite将那些具有许多内部模块的 ESM 依赖项转换为单个模块。

**2. 重写导入为合法的 URL**

例如 /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们

### TypeScript

Vite 使用esbuild（是 tsc 速度的 20~30 倍）仅执行 .ts 文件的转译工作，并不执行任何类型检查。因为转译可以在每个文件的基础上进行，与 Vite 的按需编译模式完全吻合，类型检查需要了解整个模块图，对构建速度产生损害

使用 仅含类型的导入和导出 形式的语法可以避免潜在的 “仅含类型的导入被不正确打包” 的问题：

```ts
import type { T } from 'only/types'
export type { T }
```

使用vite转译ts，编译配置选项（compilerOptions）需要注意一下几点：

**1. isolatedModules**

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

导入 .css 文件将会把内容插入到`<style>`标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的作为其模块默认导出的 CSS

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

### Assets

导入一个静态资源vite会返回解析后的URL，常见的图像、媒体和字体文件类型被自动检测为资源。使用assetsInclude选项扩展内部列表

引用的资源作为构建资源图的一部分包括在内，将生成散列文件名，并可以由插件进行处理以进行优化。较小的资源体积小于 assetsInlineLimit 选项值 则会被内联为 base64 data URL

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

### public

public应该位于项目的根目录下，默认为\<root\>/public，通过publicDir配置可以进行修改。public目录中的文件不会被进行转译，不会对文件名做哈希散列化。访问public中的资源应该使用根绝对路径，并且不应该被js文件所引用

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

## 模式与环境变量

### 模式

默认情况下，开发服务器 (dev 命令) 运行在 development (开发) 模式，而 build 命令则运行在 production (生产) 模式，并加载相应的环境文件。通过传递 --mode 选项标志来覆盖命令使用的默认模式

### 环境文件

环境文件默认是项目根路径，可通过envDir配置项修改。

vite会根据模式加载不同的环境文件，提取出相应的环境变量，通过 import.meta.env 将以VITE_开头的变量以字符串形式暴露给客户端源码，修改环境变量后，需要重新启动服务器

**文件类型：**

```bash
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

**环境变量优先级：**

命令行环境变量优先级最高，指定模式下次之，通用形式最低

::: tip
请注意，如果想要在环境变量中使用 $ 符号，则必须使用 \ 对其进行转义
:::

**HTML替换：**

Vite 还支持在 HTML 文件中替换环境变量。import.meta.env 中的任何属性都可以通过特殊的 %ENV_NAME% 语法在 HTML 文件中使用：

```html
<h1>Vite is running in %MODE%</h1>
<p>Using data from %VITE_API_URL%</p>
```

如果环境变量在 import.meta.env 中不存在，比如不存在的 %NON_EXISTENT%，则会将被忽略而不被替换，这与 JS 中的 import.meta.env.NON_EXISTENT 不同，JS 中会被替换为 undefined

### 环境变量

vite打包会在一个import.meta.env对象上暴露出环境变量，转译时会对源代码中使用到的环境变量做`静态转换`

vite内建变量：

- import.meta.env.MODE: {string} 应用运行的模式，development/production
- import.meta.env.BASE_URL: {string} 部署应用时的基本 URL，由base 配置项决定。
- import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
- import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
- import.meta.env.SSR: {boolean} 应用是否运行在 server 上

## 配置

### 导出配置

vite通过命令行启动，会自动解析 项目根目录下名为 vite.config.js的文件，使用esm语法导出的配置文件，会在被加载前自动进行预处理

通过--config命令行选项，可以指定配置文件的路径

```js
/** @type {import('vite').UserConfig} */
export default {
  // ...
}
```

或者

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

如果配置文件需要基于（dev/serve 或 build）命令或者不同的 模式 来决定选项，亦或者是一个 SSR 构建（ssrBuild），defineConfig可以传递一个返回配置的函数

```js
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})
```

在开发环境下 command 的值为 serve（在 CLI 中， vite dev 和 vite serve 是 vite 的别名），而在生产环境下为 build（vite build）

这个函数也可以是异步的

```js
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite 配置
  }
})
```

配置文件中可以通过process.env获取到环境变量，vite默认是不加载env文件的，因为要等配置文件解析完成才知道需要加载哪个模式下的环境文件，通过loadEnv函数可以在配置文件中体检加载指定文件

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
```

### vite配置

**root**

默认： process.cwd()

项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。

**base**

默认： /

开发或生产环境服务的公共基础路径。合法的值包括以下几种：

- 绝对 URL 路径名，例如 /foo/
- 完整的 URL，例如 <https://foo.com/>
- 空字符串或 ./（用于嵌入形式的开发）

**mode**

默认： 'development' 用于开发，'production' 用于构建

在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。

**define**

定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。

为了与 esbuild 的行为保持一致，表达式必须为一个 JSON 对象（null、boolean、number、string、数组或对象），亦或是一个单独的标识符。

**plugins**

需要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化（flatten）。

**publicDir**

默认： "public"

作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录，并且始终按原样提供或复制而无需进行转换。该值可以是文件系统的绝对路径，也可以是相对于项目根目录的相对路径。

将 publicDir 设定为 false 可以关闭此项功能。

**cacheDir**

默认： "node_modules/.vite"
存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite 生成的某些缓存文件，使用缓存可以提高性能。如需重新生成缓存文件，你可以使用 --force 命令行选项或手动删除目录。此选项的值可以是文件的绝对路径，也可以是以项目根目录为基准的相对路径。当没有检测到 package.json 时，则默认为 .vite。

**resolve.alias**

类型：Record\<string, string\> | Array\<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }\>

将会被传递到 @rollup/plugin-alias 作为 entries 的选项。也可以是一个对象，或一个 { find, replacement, customResolver } 的数组。

当使用文件系统路径的别名时，请始终使用绝对路径。相对路径的别名值会原封不动地被使用，因此无法被正常解析。

**resolve.conditions**

类型： string[]

解决程序包中 情景导出 时的其他允许条件。

一个带有情景导出的包可能在它的 package.json 中有以下 exports 字段：

```json
{
  "exports": {
    ".": {
      "import": "./index.esm.js",
      "require": "./index.cjs.js"
    }
  }
}
```

在这里，import 和 require 被称为“情景”。情景可以嵌套，并且应该从最特定的到最不特定的指定。

Vite 有一个“允许的情景”列表，并且会匹配列表中第一个情景。默认允许的情景是：import，module，browser，default 和基于当前情景为 production/development。resolve.conditions 配置项使得我们可以指定其他允许的情景。

**resolve.mainFields**

默认： ['module', 'jsnext:main', 'jsnext']

package.json 中，在解析包的入口点时尝试的字段列表。注意：这比从 exports 字段解析的情景导出优先级低：如果一个入口点从 exports 成功解析，resolve.mainFields 将被忽略。

在未来，resolve.mainFields 的默认值会变成 ['browser', 'module', 'jsnext:main', 'jsnext'] 而这个选项将被移除。

**resolve.extensions**

默认： ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']

导入时想要省略的扩展名列表。

注意，不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。

**css.modules**

```ts
interface CSSModulesOptions {
  scopeBehaviour?: 'global' | 'local'
  globalModulePaths?: RegExp[]
  generateScopedName?:
    | string
    | ((name: string, filename: string, css: string) => string)
  hashPrefix?: string
  /**

- 默认：null
   */
  localsConvention?:
    | 'camelCase'
    | 'camelCaseOnly'
    | 'dashes'
    | 'dashesOnly'
    | null
}
```

配置 CSS modules 的行为。选项将被传递给 postcss-modules。

**css.postcss**

内联的 PostCSS 配置（格式同 postcss.config.js），或者一个（默认基于项目根目录的）自定义的 PostCSS 配置路径。

**css.preprocessorOptions**

指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键。

所有预处理器选项还支持 additionalData 选项，可以用于为每个样式内容注入额外代码。如果注入的是实际的样式而不仅仅是变量时，那么这些样式将会在最终的打包产物中重复出现。

```js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
      less: {
        math: 'parens-division',
      },
      styl: {
        define: {
          $specialColor: new stylus.nodes.RGBA(51, 197, 255, 1),
        },
      },
    },
  },
})
```

**json.namedExports**

是否支持从 .json 文件中进行按名导入。

**json.stringify**

默认： false

若设置为 true，会禁用按名导入，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。

**esbuild**

类型： ESBuildOptions | false

ESBuildOptions 继承自 esbuild 转换选项。最常见的用例是自定义 JSX：

```js
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})
```

默认情况下，esbuild 会被应用在 ts、jsx、tsx 文件。你可以通过 esbuild.include 和 esbuild.exclude 对要处理的文件类型进行配置，这两个配置的值可以是一个正则表达式、一个 picomatch 模式，或是一个值为这两种类型的数组。

可以通过 esbuild.jsxInject 来自动为每一个被 esbuild 转换的文件注入 JSX helper。

```js
export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})
```

当 build.minify 为 true 时，所有最小化的优化过程都会被默认应用，要禁用它的 某些特定方面，请设置 esbuild.minifyIdentifiers、esbuild.minifySyntax 或 esbuild.minifyWhitespace 三种选项其中任意一种为 false。注意 esbuild.minify 选项无法用于覆盖 build.minify。

设置为 false 来禁用 esbuild 转换。

assetsInclude
类型： string | RegExp | (string | RegExp)[]

从 JavaScript 导入它们将返回解析后的 URL 字符串

```js
export default defineConfig({
  assetsInclude: ['**/*.gltf'],
})
```

**logLevel**

类型： 'info' | 'warn' | 'error' | 'silent'

调整控制台输出的级别，默认为 'info'。

**clearScreen**
默认： true

设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下可以通过 --clearScreen false 设置。

**envDir**

默认： root

用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。

**envPrefix**

默认： VITE_

以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。

### server配置

**server.host**

默认： 'localhost'

指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址

**server.port**

默认值： 5173

指定开发服务器端口。如果端口已经被使用，Vite 会自动尝试下一个可用的端口

**server.https**

启用 TLS + HTTP/2，当 server.proxy选项也被使用时，将会仅使用 TLS。

需要一个合法可用的证书。对基本使用的配置需求来说，你可以添加 @vitejs/plugin-basic-ssl 到项目插件中，它会自动创建和缓存一个自签名的证书。但我们推荐你创建和使用你自己的证书

**server.open**

开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名

**server.proxy**

为开发服务器配置自定义代理规则。期望接收一个 { key: options } 对象。任何请求路径以 key 值开头的请求将被代理到对应的目标。如果 key 值以 ^ 开头，将被识别为 RegExp

```js
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      '/foo': 'http://localhost:4567',
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
      // 使用 proxy 实例
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
      // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true,
      },
    },
  },
})
```

**server.headers**

指定服务器响应的 header

**server.watch**

传递给 chokidar 的文件系统监听器选项

Vite 服务器默认会忽略对 .git/ 和 node_modules/ 目录的监听。如果你需要对 node_modules/ 内的包进行监听，你可以为 server.watch.ignored 赋值一个取反的 glob 模式

**server.base**

在 HTTP 请求中预留此文件夹，用于代理 Vite 作为子文件夹时使用。应该以 / 字符开始

**server.origin**

用于定义开发调试阶段生成资源的 origin。

```js
export default defineConfig({
  server: {
    origin: 'http://127.0.0.1:8080',
  },
})
```

### 构建配置

**build.target**

设置最终构建的浏览器兼容目标，目标值可以是一个es版本，也可以是一个浏览器版本或是两者组合的数组，默认值是modules，vite会将modules替换为['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']

**build.outDir**

相对于项目根目录指定输出路径，默认dist

**build.assetsDir**

相对于outDir指定生成静态资源的存放路径，默认assets

**build.assetsInlineLimit**

指定引用资源内联为base64编码的，避免额外的的http请求，默认4096，设置为0可以禁用此选项

**build.cssCodeSplit**

控制css代码拆分，如启用，在异步chunk中使用的css导入会内联到异步chunk中，chunk加载时一并加载，如禁用，项目中的css会被提取到一个css文件中

**build.cssTarget**

设置css压缩的目标浏览器

应只在针对非主流浏览器时使用。 最直观的示例是当你要兼容的场景是安卓微信中的 webview 时，它支持大多数现代的 JavaScript 功能，但并不支持 CSS 中的 #RGBA 十六进制颜色符号。 这种情况下，你需要将 build.cssTarget 设置为 chrome61，以防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式

**build.cssMinify**

覆盖 CSS 最小化压缩的配置，而不是使用默认的 build.minify，这样就可以单独配置 JS 和 CSS 的最小化压缩方式。Vite 使用 esbuild 来最小化 CSS

**build.rollupOptions**

自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并

**build.lib**

类型： { entry: string | string[] | { [entryAlias: string]: string }, name?: string, formats?: ('es' | 'cjs' | 'umd' | 'iife')[], fileName?: string | ((format: ModuleFormat, entryName: string) => string) }

构建为库。entry 是必需的，因为库不能使用 HTML 作为入口。name 则是暴露的全局变量，并且在 formats 包含 'umd' 或 'iife' 时是必需的。默认 formats 是 ['es', 'umd']，如果使用了多个配置入口，则是 ['es', 'cjs']。fileName 是输出的包文件名，默认 fileName 是 package.json 的 name 选项，同时，它还可以被定义为参数为 format 和 entryAlias 的函数

**build.minify**

类型： boolean | 'terser' | 'esbuild'

默认： 'esbuild'

设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。

在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。

当设置为 'terser' 时必须先安装 Terser

**build.terserOptions**

传递给 Terser 的更多 minify 选项

**build.chunkSizeWarningLimit**

类型： number

默认： 500

规定触发警告的 chunk 大小（以kb为单位）。它将与未压缩的 chunk 大小进行比较，因为 JavaScript 大小本身与执行时间相关

### 依赖优化配置

**optimizeDeps.entries**

类型： string | string[]

默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项（忽略了node_modules、build.outDir、tests 和 coverage）。如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点。

**optimizeDeps.exclude**

类型： string[]

在预构建中强制排除的依赖项，CommonJS 的依赖不应该排除在优化外。

如果一个 ESM 依赖被排除在优化外，但是却有一个嵌套的 CommonJS 依赖，则应该为该 CommonJS 依赖添加 optimizeDeps.include。例如：

```js
export default defineConfig({
  optimizeDeps: {
    include: ['esm-dep > cjs-dep'],
  },
})
```

**optimizeDeps.include**

类型： string[]

默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。

**optimizeDeps.esbuildOptions**

类型： EsbuildBuildOptions

在依赖扫描和优化过程中传递给 esbuild 的选项。

某些选项进行了省略，因为修改它们与 Vite 的优化方案并不兼容。

忽略了 external 选项，请使用 Vite 的 optimizeDeps.exclude 选项
plugins 与 Vite 的 dep 插件合并

**optimizeDeps.force**

类型： boolean

设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。

**optimizeDeps.disabled**

类型： boolean | 'build' | 'dev'

默认： 'build'

禁用依赖优化，值为 true 将在构建和开发期间均禁用优化器。传 'build' 或 'dev' 将仅在其中一种模式下禁用优化器。默认情况下，仅在开发阶段启用依赖优化。

## 插件

若要使用一个插件，需要将它添加到项目的 devDependencies 并在 vite.config.js 配置文件中的 plugins 数组中引入它，接受包含多个插件作为单个元素的预设，数组在内部被扁平化

通常创建一个插件是一个返回对象的的工厂函数，这样可以接受允许用户自定义插件行为的选项

### 约定

插件不使用 Vite 特有的钩子，可以作为兼容 Rollup 的插件来实现，Rollup 插件应该有一个带`rollup-plugin-`前缀，Vite插件应该有一个带`vite-plugin-`前缀

如果只适用于特定的框架，它的名字应该遵循以下前缀格式：

- vite-plugin-vue- 前缀作为 Vue 插件
- vite-plugin-react- 前缀作为 React 插件
- vite-plugin-svelte- 前缀作为 Svelte 插件

### 插件获取

获取插件有以下几种方式：

- [官方插件](https://cn.vitejs.dev/plugins/)
- [社区插件](https://github.com/vitejs/awesome-vite#plugins)
- [兼容rollup插件](https://vite-rollup-plugins.patak.dev/)
- [npm搜索vite插件](https://www.npmjs.com/search?q=vite-plugin&ranking=popularity)
- [npm搜索rollup插件](https://www.npmjs.com/search?q=rollup-plugin&ranking=popularity)

### 按需应用

默认情况下插件在开发 (serve) 和生产 (build) 模式中都会调用。如果插件在服务或构建期间按需使用，请使用 apply 属性指明它们仅在 'build' 或 'serve' 模式时调用：

```js
// vite.config.js
import typescript2 from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...typescript2(),
      apply: 'build',
    },
  ],
})
```

### 插件调用顺序

一个 Vite 插件可以额外指定一个 enforce 属性（类似于 webpack 加载器）来调整它的应用顺序。enforce 的值可以是pre 或 post。解析后的插件将按照以下顺序排列

- Alias
- 带有 enforce: 'pre' 的用户插件
- Vite 核心插件
- 没有 enforce 值的用户插件
- Vite 构建用的插件
- 带有 enforce: 'post' 的用户插件
- Vite 后置构建插件（最小化，manifest，报告）

### 虚拟模块

虚拟模块是一种在插件中定义导入内容的方式，在 Vite（以及 Rollup）中都以 virtual: 为前缀，使用了虚拟模块的插件在解析时应该将模块 ID 加上前缀 \0，这一约定来自 rollup 生态

### 插件钩子

**通用钩子**

<br>

1. 在启动服务器时调用：

- [options](https://rollupjs.org/plugin-development/#options)

类型： (options: InputOptions) => InputOptions | null

替换或操作传递给 rollup.rollup 的选项对象。返回 null 不会替换任何内容。如果只需要读取选项，则建议使用 buildStart 钩子，因为该钩子可以访问所有 options 钩子的转换过滤后的选项

<br>

- [buildStart](https://rollupjs.org/plugin-development/#buildstart)

类型： (options: InputOptions) => void

此钩子过滤了所有 options 钩子的转换，并且还包含未设置选项的正确默认值

<br>

2. 在每个传入模块请求时调用：

- [resolveId](https://rollupjs.org/plugin-development/#resolveid)

类型: ResolveIdHook

定义一个自定义解析器，可以用于定位第三方依赖项等

类型定义:

```ts
type ResolveIdHook = (
 source: string, // 路径
 importer: string | undefined, // 完整路径
 options: {
  assertions: Record<string, string>;
  custom?: { [plugin: string]: any };
  isEntry: boolean;
 }
) => ResolveIdResult;

type ResolveIdResult = string | null | false | PartialResolvedId;

interface PartialResolvedId {
 id: string;
 external?: boolean | 'absolute' | 'relative';
 assertions?: Record<string, string> | null;
 meta?: { [plugin: string]: any } | null;
 moduleSideEffects?: boolean | 'no-treeshake' | null;
 resolvedBy?: string | null;
 syntheticNamedExports?: boolean | string | null;
}
```

<br>

- [load](https://rollupjs.org/plugin-development/#load)

类型： (id: string) => LoadResult

定义自定义加载器。返回 null 将延迟到其他 load 函数（最终默认从文件系统加载）。为了避免额外的解析开销，例如由于某些原因该钩子已经使用 this.parse 生成 AST，该钩子可以选择返回一个 { code, ast, map } 对象。ast 必须是一个具有每个节点的 start 和 end 属性的标准 ESTree AST。如果转换不移动代码，则可以通过将 map 设置为 null 来保留现有的源码映射

moduleSideEffects：如果为false，并且没有其他模块从该模块中导入任何内容，将永远不会进行打包；如果为true，将进行打包；如果为`no-treeshake`，即使内容为空，也会生成对应内容

类型定义：

```ts
type LoadResult = string | null | SourceDescription;

interface SourceDescription {
 code: string;
 map?: string | SourceMap;
 ast?: ESTree.Program;
 assertions?: { [key: string]: string } | null;
 meta?: { [plugin: string]: any } | null;
 moduleSideEffects?: boolean | 'no-treeshake' | null;
 syntheticNamedExports?: boolean | string | null;
}
```

<br>

- [transform](https://rollupjs.org/plugin-development/#transform)

类型：(code: string, id: string) => TransformResult

用于转换模块

类型定义：

```ts
type TransformResult = string | null | Partial<SourceDescription>;

interface SourceDescription {
 code: string;
 map?: string | SourceMap;
 ast?: ESTree.Program;
 assertions?: { [key: string]: string } | null;
 meta?: { [plugin: string]: any } | null;
 moduleSideEffects?: boolean | 'no-treeshake' | null;
 syntheticNamedExports?: boolean | string | null;
}
```

在服务器关闭时调用：

<br>

- [buildEnd](https://rollupjs.org/plugin-development/#buildend)

类型： (error?: Error) => void

在 Rollup 完成产物但尚未调用 generate 或 write 之前调用；也可以返回一个 Promise。如果在构建过程中发生错误，则将其传递给此钩子

<br>

- [closeBundle](https://rollupjs.org/plugin-development/#closebundle)

类型:  () => Promise\<void\> | void

可用于清理可能正在运行的任何外部服务。Rollup 的 CLI 将确保在每次运行后调用此钩子，但是 JavaScript API 的用户有责任在生成产物后手动调用 bundle.close()。因此，任何依赖此功能的插件都应在其文档中仔细提到这一点

**vite钩子**

<br>

- config

类型：(config: UserConfig, env: { mode: string, command: string }) => UserConfig | null | void

允许是一个异步函数

在解析配置前调用，获得配置文件和命令行参数合并过的原始配置，同时接受运行的环境参数mode和command，可以直接在配置对象上进行修改而不返回任何东西，也可以翻译一个处理后的配置对象

> 用户插件在运行这个钩子之前会被解析，因此在 config 钩子中注入其他插件不会有任何效果

<br>

- configResolved

类型：(config: ResolvedConfig) => void | Promise\<void\>

允许是一个异步函数

在解析vite配置后调用，用于存储和读取config

```js
const examplePlugin = () => {
  let config

  return {
    name: 'read-config',

    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },

    // 在其他钩子中使用存储的配置
    transform(code, id) {
      if (config.command === 'serve') {
        // dev: 由开发服务器调用的插件
      } else {
        // build: 由 Rollup 调用的插件
      }
    },
  }
}
```

<br>

- configureServer

类型： (server: ViteDevServer) => (() => void) | void | Promise\<(() => void) | void\>

适用于配置开发服务器的钩子。最常见的用例是在内部 connect 应用程序中添加自定义中间件，钩子中定义的中间件默认在内置中间件前调用，如果需要在后调用可以返回一个函数

<br>

- handleHotUpdate

类型： (ctx: HmrContext) => Array\<ModuleNode\> | void | Promise<Array\<ModuleNode\> | void>

执行自定义 HMR 更新处理。钩子接收一个带有以下签名的上下文对象：

```ts
interface HmrContext {
  file: string
  timestamp: number
  modules: Array<ModuleNode>
  read: () => string | Promise<string>
  server: ViteDevServer
}
```

modules: 是受更改文件影响的模块数组。它是一个数组，因为单个文件可能映射到多个服务模块（例如 Vue 单文件组件）。

read: 这是一个异步读函数，它返回文件的内容。之所以这样做，是因为在某些系统上，文件更改的回调函数可能会在编辑器完成文件更新之前过快地触发，并 fs.readFile 直接会返回空内容。传入的 read 函数规范了这种行为。

<br>
钩子可以选择:

1. 过滤和缩小受影响的模块列表，使 HMR 更准确。

2. 返回一个空数组，并通过向客户端发送自定义事件来执行完整的自定义 HMR 处理:

```js
handleHotUpdate({ server }) {
  server.ws.send({
    type: 'custom',
    event: 'special-update',
    data: {}
  })
  return []
}
```

客户端代码应该使用 HMR API 注册相应的处理器（这应该被相同插件的 transform 钩子注入）：

```js
if (import.meta.hot) {
  import.meta.hot.on('special-update', (data) => {
    // 执行自定义更新
  })
}
```

<br>

- transformIndexHtml

类型： IndexHtmlTransformHook | { order?: 'pre' | 'post', handler: IndexHtmlTransformHook }

可以是一个异步钩子

转换 index.html 的专用钩子，钩子接收当前的 HTML 字符串和转换上下文。钩子默认在html被转换前进行调用，与order为pre效果相同，如果指定了order为post，钩子将在所有未定义order的钩子被应用后进行调用

上下文在开发期间暴露ViteDevServer实例，在构建期间暴露 Rollup 输出的包。

钩子返回值可以是以下几种形式：

1. 经过转换的 HTML 字符串
2. 注入到现有 HTML 中的标签描述符对象数组（{ tag, attrs, children }）。每个标签也可以指定它应该被注入到哪里（默认是在 \<head\> 之前）
3. 一个包含 { html, tags } 的对象

钩子签名：

```ts
type IndexHtmlTransformHook = (
  html: string,
  ctx: {
    path: string
    filename: string
    server?: ViteDevServer
    bundle?: import('rollup').OutputBundle
    chunk?: import('rollup').OutputChunk
  },
) =>
  | IndexHtmlTransformResult
  | void
  | Promise<IndexHtmlTransformResult | void>

  type IndexHtmlTransformResult =
  | string
  | HtmlTagDescriptor[]
  | {
      html: string
      tags: HtmlTagDescriptor[]
    }

  interface HtmlTagDescriptor {
    tag: string
    attrs?: Record<string, string>
    children?: string | HtmlTagDescriptor[]
    /**
     * 默认： 'head-prepend'
     */
    injectTo?: 'head' | 'body' | 'head-prepend' | 'body-prepend'
  }
```
