# webpack

```js
入口配置
上下文
上下文用于入口和加载器解析出绝对路径，默认使用node进程的当前工作目录，配置时建议配置
入口
入口配置的形式多样

1. name：如果传入一个字符串或者字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个属性的键(key)会是 chunk 的名称，该属性的值描述了 chunk 的入口点
2. 描述符：传入一个对象时，属性值用于描述入口信息
entry: {
    home: './home.js',
    shared: ['react', 'react-dom', 'redux', 'react-redux'],// 为入口指定多个文件
    personal: {
      import: './personal.js',
      filename: 'pages/personal.js',// 自定义输出文件名
      dependOn: ['shared','home'],// 共享的依赖，不会打包到personal中，为string或者array
      chunkLoading: 'jsonp',
      asyncChunks: true, // Create async chunks that are loaded on demand.
      layer: 'name of layer', // set the layer for an entry point
    },
  },

3. 函数
返回一个入口配置的函数
module.exports = {
  //...
  entry: () => './demo',
};
// 或者
module.exports = {
  //...
  entry: () => new Promise((resolve) => resolve(['./demo', './demo2'])),
};

mode
设置方式

1. 通过配置的方式
module.exports = {
  mode: 'development',
};

2. 通过cli的方式
webpack --mode=development

模式区别
无法复制加载中的内容
资源处理
style

1. css
在js中导入样式文件，需要使用到基本的css-loader和style-loader，style-loader处理完成后，返回js字符串，代码的执行会在html中动态插入style标签
2. less
处理less资源时，使用到less和less-loader
3. scss
image
处理图片资源，可使用系统内置的asset/resource，在html中使用src引入图片，html-loader会将图片资源处理到输出目录，并返回最终的路径，在css中通过url引入图片，webpack以相同的方式处理
字体文件
处理字体文件，在css中声明字体并将文件通过url的方式引入，处理逻辑同图片引入方法
加载数据
1. json
json模块数据加载是内置的，与node一样，可以直接导入，json中的数据视作默认导出
2. csv
加载csv需要使用csv-loader，csv-loader处理后data为一个数组，数组的每一项均为一个数组
name,age
amsc30,12
// 转换后
[["name","age"],["amsc30","12"],[""]]

解析规则
路径分类

1. 绝对路径
类似于import '/home/me/file,这种绝对路径不需要做进一步解析
2. 相对路径  
类似于import './file',使用import或者require的资源文件所在的目录会被认为是上下文目录，根据此上下文拼接成模块的绝对路径
3. 模块路径
类似于import 'module/lib/file'，在 resolve.modules 中指定的所有目录中检索模块。 你可以通过配置别名的方式来替换初始模块路径，具体请参照 resolve.alias 配置选项
文件查找
在获取到文件路径后，resolver会检查路径是指向文件还是文件夹
1. 如果是文件

- 如果文件具有扩展名，直接完成解析进行打包
- 如果不具有扩展名，使用resolve.extensions作为文件扩展名进行解析

2. 如果是文件夹

- 检查是否有package.json并根据resolve.mainFields中配置的字段进行查找，根据符合配置要求的第一个字段来确定文件路径
- 如果不存在package.json或者resolve.mainFields没有返回有效的路径，则会根据 resolve.mainFiles配置选项中指定的文件名顺序查找，看是否能在 import/require 的目录下匹配到一个存在的文件名
解析配置
配置模块该如何解析

1. alias
创建 import 或 require 的别名，来确保模块引入变得更简单，可在给定对象的键后添加$，表示精确匹配
无法复制加载中的内容
2. descriptionFiles
[string] = ['package.json']
指定用于描述的json文件
3. enforceExtension
boolean = false
如果是 true，将不允许无扩展名文件。默认如果 ./foo 有 .js 扩展，require('./foo') 可以正常运行。但如果启用此选项，只有 require('./foo.js') 能够正常工作
4. extensions
[string] = ['.js', '.json', '.wasm']
解析后缀名的选项
以上这样使用 resolve.extensions 会 覆盖默认数组，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。然而你可以使用 '...' 访问默认拓展名
5. mainFields
当从 npm 包中导入模块时（例如，import * as D3 from 'd3'），此选项将决定在 package.json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同
6. mainFiles
[string] = ['index']
当解析到目录并且没有package.json文件时，要解析的文件名，相当于在请求路径后面拼接，然后再根据extensions的顺序进行解析
7. modules
[string] = ['node_modules']
告诉 webpack 解析模块时应该搜索的目录。
8. plugins
[Plugin]
应该使用的额外的解析插件列表
9. preferRelative
boolean
当启用此选项时，webpack 更倾向于将模块请求解析为相对请求，而不使用来自 node_modules 目录下的模块
10. preferAbsolute
boolean
解析时，首选的绝对路径为 resolve.roots
11. roots
[string]
服务器相关URL（以'/'开头）的请求被解决的目录列表，默认为上下文配置选项。在非Windows系统上，这些请求首先被解析为一个绝对路径。
const fixtures = path.resolve(__dirname, 'fixtures');
module.exports = {
  //...
  resolve: {
    roots: [__dirname, fixtures],
  },
};

配置选项
每个规则可以分为三部分，条件、结果、嵌套规则

- 条件：一种是资源的绝对路径，主要通过test,include,resource进行匹配，一种是请求者的绝对路径，主要通过resource进行匹配
- 结果：规则结果在规则条件匹配时使用，包括应用的loader和parser
- 规则嵌套：这些规则用于在规则条件(rule condition)匹配时进行取值。每个嵌套规则包含它自己的条件
条件

1. rule.enforce
string pre | post
指定loader的种类，没有值表示普通loader

- Pitching 阶段: loader 上的 pitch 方法，按照 后置(post)、行内(inline)、普通(normal)、前置(pre) 的顺序调用。
- Normal 阶段: loader 上的 常规方法，按照 前置(pre)、普通(normal)、行内(inline)、后置(post) 的顺序调用。模块源码的转换， 发生在这个阶段
所有普通 loader 可以通过在请求中加上 ! 前缀来忽略（覆盖）。
所有普通和前置 loader 可以通过在请求中加上 -! 前缀来忽略（覆盖）。
所有普通，后置和前置 loader 可以通过在请求中加上 !! 前缀来忽略（覆盖）。
// 禁用普通 loaders
import { a } from '!./file1.js';

// 禁用前置和普通 loaders
import { b } from '-!./file2.js';

// 禁用所有的 laoders
import { c } from '!!./file3.js';

2. rule.exclude
排除所有符合条件的模块，不适用loader进行转换
3. rule.include
引入符合条件的模块
4. rule.issuer
资源的请求者模块
5. noParse
防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中 不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能
module.exports = {
  module: {
    noParse: /jquery|lodash/,
  },
};

module.exports = {
  module: {
    noParse: (content) => /jquery|lodash/.test(content),
  },
};

6. Rule.resourceQuery
与资源查询相匹配的 Condition。此选项用于测试请求字符串的查询部分（即从问号开始
7. Rule.test
引入所有通过断言测试的模块
8. Rule.scheme
匹配使用的 schema
module.exports = {
  module: {
    rules: [
      {
        scheme: 'data',
        type: 'asset/resource',
      },
    ],
  },
};

结果

1. generator
统一配置资源生成器的选项
 module: {
    generator: {
      asset: {
        // asseet 模块的 generator 选项

        // 自定义 asset 模块的 publicPath，自 webpack 5.28.0 起可用
        publicPath: 'assets/',

        // 将静态资源输出到相对于 'output.path' 的指定文件夹中，webpack 5.67.0 后可用
        outputPath: 'cdn-assets/',
      },
      'asset/inline': {
        // asset/内联模块的 generator 选项
      },
   }

2. parser
统一配置解析器的选项，配置方式同generator
3. rule.loader
rule.use的简写
4. rule.parser
boolean | object
模块解析配置
5. Rule.parser.dataUrlCondition
object = { maxSize number = 8096 } function (source, { filename, module }) => boolean
如果模块大小小于设置的maxSize值或者通过一个函数返回true，模块会作为一个base64注入到请求者中，否则会输出到目标目录下
6. Rule.parser.parse
如果 Rule.type 被设置成 'json'，那么 Rules.parser.parse 选择可能会是一个方法，该方法实现自定义的逻辑，以解析模块的源和并将它转换成 JavaScript 对象。 它可能在没有特定加载器的时候，对将 toml, yaml 和其它非 JSON 文件导入成导入非常有用
7. Rule.generator.dataUrl
object = { encoding string = 'base64' | false, mimetype string = undefined | false } function (content, { filename, module }) => string

- encoding: 当被设置为'base64'，模块源码会用 Baes64 算法 编码。设置 encoding 为 false，会禁用编码。
- mimetype: 为数据链接(data URI)设置的一个 mimetype 值。默认根据模块资源后缀设置

8. Rule.generator.filename
与output.path和output.assetModuleFilename相同，指定文件的生成路径，具有更高的优先级
9. Rule.generator.publicPath
与output.publicPath相同，指定文件的publicPath，具有更高的优先级
10. Rule.generator.outputPath
将静态资源输出到相对于 'output.path' 的指定文件夹中。只有当 'publicPath' 被用来匹配文件夹结构时才会需要设置该配置
嵌套规则
1. oneOf
规则数组，当规则匹配时，只使用第一个匹配规则
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /inline/, // foo.css?inline
            use: 'url-loader',
          },
          {
            resourceQuery: /external/, // foo.css?external
            use: 'file-loader',
          },
        ],
      },
    ],
  },
};

2. Rule.sideEffects
表明模块的哪一部分包含副作用
输出管理
输出管理用于指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」
处理模板文件
使用html-webpack-plugin可以在打包过程中将默认的或指定的html模板输出到output中
dist清理
在output中配置clear为true，每次打包前，webpack根据配置的输出目录path进行清理之前的目录文件
配置选项
1. assetModuleFilename
string = '[hash][ext][query]'
用于配置asset modules的输出文件名，优先级高于output.filename
2. auxiliaryComment
string object
为库的输出容器中添加注释，如果是字符串，则为每种类型添加，如果是对象，为指定的库类型添加
3. chunkLoading
false string: 'jsonp' | 'import-scripts' | 'require' | 'async-node' | 'import' | <any string>
打包后加载chunk的方式，默认值有 'jsonp' (web)、'import' (ESM)、'importScripts' (WebWorker)、'require' (sync node.js)、'async-node' (async node.js)，还有其他值可由插件添加
4. clean
boolean { dry?: boolean, keep?: RegExp | string | ((filename: string) => boolean) }
打包之前删除清除输出目录或者输出目录下的某些文件
5. compareBeforeEmit
boolean = true
告知 webpack 在写入到输出文件系统时检查输出的文件是否已经存在并且拥有相同内容，当在磁盘中已经存在有相同内容的文件时，webpack 将不会写入输出文件
6. crossOriginLoading
boolean = false string: 'anonymous' | 'use-credentials'
告诉 webpack 启用 cross-origin 属性 加载 chunk。仅在 target 设置为 'web' 时生效，通过使用 JSONP 来添加脚本标签，实现按需加载模块
6. filename
string function (pathData, assetInfo) => string
此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
对于单个入口起点，filename 会是一个静态名称。
当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle，应该使用字符串占位来指定每个bundle的唯一名称
占位符包含：name、id、contenthash、fullhash、hash、chunkhash、ext
此选项被称为文件名，但还是可以使用像 'js/[name]/bundle.js' 这样的文件夹结构
7. chunkFilename
string = '[id].js' function (pathData, assetInfo) => string
指定异步加载chunk的文件名
8. globalObject
string = 'self'
当输出为 library 时，尤其是当 libraryTarget 为 'umd'时，此选项将决定使用哪个全局对象来挂载 library。为了使 UMD 构建在浏览器和 Node.js 上均可用，应将 output.globalObject 选项设置为 'this'。对于类似 web 的目标，默认为 self。
入口点的返回值将会使用 output.library.name 赋值给全局对象。依赖于 target 配置项，全局对象将会发生对应的改变，例如：self, global 或者 globalThis
9. hashDigest
string = 'hex'
在生成 hash 时使用的编码方式
10. hashDigestLength
number = 20
散列摘要的前缀长度
11. library
从入口输出一个库

- 如果你将 entry 设置为一个 array，那么只有数组中的最后一个会被暴露
- 如果你将 entry 设置为一个 object，所以入口都可以通过 library 的 array 语法暴露
module.exports = {
  // …
  entry: {
    a: './src/a.js',
    b: './src/b.js',
  },
  output: {
    filename: '[name].js',
    library: ['MyLibrary', '[name]'], // name is a placeholder here
  },
};

12. library.name
指定库的名称
13. library.type
指定库的暴露方式，决定导出的变量如何挂载
string

- var：声明为一个变量
var MyLibrary = _entry_return_;
// 在加载了 `MyLibrary` 的单独脚本中
MyLibrary.doSomething();

- this、self、global、window：挂在到对应对象下
this['MyLibrary'] = _entry_return_;
// 在一个单独的脚本中
this.MyLibrary.doSomething();
MyLibrary.doSomething(); // 如果 `this` 为 window 对象

window['MyLibrary'] = _entry_return_;
window.MyLibrary.doSomething();

global['MyLibrary'] = _entry_return_;
global.MyLibrary.doSomething();

- commonjs：赋值给exports对象
exports['MyLibrary'] = _entry_return_;
require('MyLibrary').doSomething();

注意，不设置 output.library.name 将导致入口起点返回的所有属性都被赋值给给定的对象；不检查现有的属性名

- commonjs2:将入口返回值赋值给exports属性
module.exports = _entry_return_;
require('MyLibrary').doSomething();

- umd：这将在所有模块定义下暴露你的库, 允许它与 CommonJS、AMD 和作为全局变量工作
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['MyLibrary'] = factory();
  else root['MyLibrary'] = factory();
})(global, function () {
  return _entry_return_;
});

14. library.export
指定哪一个导出应该暴露为一个库，决定了导出的变量
15. library.auxiliaryComment
在umd包装器中添加注释
16. path
打包结果的输出文件夹
17. pathinfo
在bundle中引入所包含模块信息的相关注释
18. publicPath
此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」
module.exports = {
  //...
  output: {
    // One of the below
    publicPath: 'auto', // It automatically determines the public path from either `import.meta.url`, `document.currentScript`, `<script />` or `self.location`.
    publicPath: 'https://cdn.example.com/assets/', // CDN（总是 HTTPS 协议）
    publicPath: '//cdn.example.com/assets/', // CDN（协议相同）
    publicPath: '/assets/', // 相对于服务(server-relative)
    publicPath: 'assets/', // 相对于 HTML 页面
    publicPath: '../assets/', // 相对于 HTML 页面
    publicPath: '', // 相对于 HTML 页面（目录相同）
  },
};

在编译时(compile time)无法知道输出文件的 publicPath 的情况下，可以留空，然后在入口文件(entry file)处使用自由变量(free variable) __webpack_public_path__，以便在运行时(runtime)进行动态设置。
__webpack_public_path__ = myRuntimePublicPath;

// 应用程序入口的其他部分

19. module
以模块类型输出js文件，当启用时，webpack 会在内部将 output.iife 设置为 false，将 output.scriptType 为 'module'，并将 terserOptions.module 设置为 true
如果你需要使用 webpack 构建一个库以供别人使用，当 output.module 为 true 时，一定要将 output.libraryTarget 设置为 'module'
开发环境
source-map
source-map用于打包文件与源码的映射
dev-server
webpack-dev-server用于启动一个本地的服务器，插件打包后不会输出在工程目录中，服务启动后可以通过 <http://[devServer.host>]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问
dev-server配置
1. allowedHosts
'auto' | 'all' [string]
将允许访问开发服务器的服务列入白名单
2. client.overlay
boolean = true object: { errors boolean = true, warnings boolean = true }
当出现编译错误或警告时，在浏览器中显示全屏覆盖
3. client.progress
在浏览器中以百分比显示编译进度。
4. client.reconnect
boolean = true number
告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
5. compress
启用gzip压缩
6. https
默认情况下，开发服务器将通过 HTTP 提供服务。可以选择使用 HTTPS 提供服务，默认使用自签名证书
也可以提供自己的证书
module.exports = {
  devServer: {
    https: {
      ca: './path/to/server.pem',
      pfx: './path/to/server.pfx',
      key: './path/to/server.key',
      cert: './path/to/server.crt',
      passphrase: 'webpack-dev-server',
      requestCert: true,
    },
  },
};

7. headers
array function object
为所有响应添加 headers
8. host
'local-ip' | 'local-ipv4' | 'local-ipv6' string
指定要使用的 host。如果你想让你的服务器可以被外部访问，像这样指定：
module.exports = {
  //...
  devServer: {
    host: '0.0.0.0',
  },
};

9. hot
'only' boolean = true
启用 webpack 的 热模块替换 特性
启用热模块替换功能，在构建失败时不刷新页面作为回退，使用 hot: 'only'
10. open
告诉 dev-server 在服务器已经启动后打开浏览器。设置其为 true 以打开你的默认浏览器
11. Port
指定监听的端口号
12. proxy
代理某些url，webpack-dev-serve使用http-proxy-middleware进行代理，http-proxy-middleware 的某些功能不需要target键，例如 它的 router 功能，但是仍然需要在此处的配置中包含target，否则webpack-dev-server 不会将其传递给 http-proxy-middleware

- target：目标服务器
- pathRewrite：重写请求路径
- secure：默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果需要，配置false
- changeOrigin：默认情况下，会保留主机头的来源，可以设置为true来覆盖此行为

有时不想代理所有内容。 可以基于函数的返回值绕过代理。
在该功能中，可以访问请求，响应和代理选项。

- 返回 null 或 undefined 以继续使用代理处理请求。
- 返回 false 会为请求产生 404 错误。
- 返回提供服务的路径，而不是继续代理请求。
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        },
      },
    },
  },
};

如果想将多个特定路径代理到同一目标，则可以使用一个或多个带有 context 属性的对象的数组
module.exports = {
  //...
  devServer: {
    proxy: [
      {
        context: ['/auth', '/api'],
        target: 'http://localhost:3000',
      },
    ],
  },
};

13. static
boolean string object [string, object]
该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用
module.exports = {
  //...
  devServer: {
    static: false,
  },
};

监听单个目录：
module.exports = {
  // ...
  devServer: {
    static: ['assets'],
  },
};

监听多个进后台资源目录：
module.exports = {
  // ...
  devServer: {
    static: ['assets', 'css'],
  },
};

14. static.directory
string = path.join(process.cwd(), 'public')
告诉服务器从哪里提供内容。只有在你希望提供静态文件时才需要这样做。static.publicPath 将会被用来决定应该从哪里提供 bundle，并具有优先级
15. static.publicPath
告诉服务器在哪个 URL 上提供 static.directory 的内容。例如为在 /serve-public-path-url/manifest.json 中的 assets/manifest.json 提供服务,可以接受一个对象数组
16. static.serveIndex
告诉开发服务器启用后使用 serveIndex 中间件。
serveIndex 中间件会在查看没有 index.html 文件的目录时生成目录列表
17. static.watch
通过 static.directory 配置项告诉 dev-server 监听文件。默认启用，文件更改将触发整个页面重新加载。可以通过将 watch 设置为 false 禁用

代码分割
代码分割能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间
入口
入口分离是在配置文件中配置多个入口，从每个入口开始打包成不同的bundle
缺陷：无法去除重复的模块
分离重复的模块。
动态导入
webpack可以识别import()语法，将模块导入到单独的文件中
预获取与预加载
在声明 import 时，使用内置指令webpackPrefetch或webpackPreload，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器
与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。
splitChunksPlugin
SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
默认情况下，它只会影响到按需加载的 chunks，因为修改 initial chunks 会影响到项目的 HTML 文件中的脚本标签。
webpack 将根据以下条件自动拆分 chunks，主要根据体积、共享或来自node_ modules、并行加载数量三个方面：
- 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
- 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
- 当加载初始化页面时，并发请求的最大数量小于或等于 30
当尝试满足最后两个条件时，最好使用较大的 chunks。

1. automaticNameDelimiter
默认情况下，webpack 将使用 chunk 的来源和名称生成名称（例如 vendors~main.js）。此选项使你可以指定用于生成名称的分隔符
2. chunks
这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享
3. maxAsyncRequests
按需加载时的最大并行请求数量
4. maxInitialRequests
入口点的最大并行请求数
5. minChunks
拆分前必须共享模块的最小 chunks 数
6. minSize
number = 20000 { [index: string]: number }
7. minSizeReduction
生成 chunk 所需的主 chunk（bundle）的最小体积（以字节为单位）缩减。这意味着如果分割成一个 chunk 并没有减少主 chunk（bundle）的给定字节数，它将不会被分割，即使它满足 splitChunks.minSize。
为了生成 chunk，splitChunks.minSizeReduction 与 splitChunks.minSize 都需要被满足。
8. maxSize
）告诉 webpack 尝试将大于 maxSize 个字节的 chunk 分割成较小的部分。 这些较小的部分在体积上至少为 minSize（仅次于 maxSize）。 该算法是确定性的，对模块的更改只会产生局部影响。这样，在使用长期缓存时就可以使用它并且不需要记录。maxSize 只是一个提示，当模块大于 maxSize 或者拆分不符合 minSize 时可能会被违反。
当 chunk 已经有一个名称时，每个部分将获得一个从该名称派生的新名称。 根据 optimization.splitChunks.hidePathInfo 的值，它将添加一个从第一个模块名称或其哈希值派生的密钥。
maxSize 选项旨在与 HTTP/2 和长期缓存一起使用。它增加了请求数量以实现更好的缓存。它还可以用于减小文件大小，以加快二次构建速度

- 设置 maxSize 的值会同时设置 maxAsyncSize 和 maxInitialSize 的值
- maxInitialSize 仅会影响初始加载 chunks，maxAsyncSize 仅会影响按需加载 chunk
- maxSize 比 maxInitialRequest/maxAsyncRequests 具有更高的优先级。实际优先级是 maxInitialRequest/maxAsyncRequests < maxSize < minSize

9. usedExports
弄清哪些 export 被模块使用，以混淆 export 名称，省略未使用的 export，并生成有效的代码。 当它为 true 时：分析每个运行时使用的出口，当它为 "global" 时：分析所有运行时的全局 export 组合）
10. cacheGroups
缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项。但是 test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置。将它们设置为 false以禁用任何默认缓存组
11. cacheGroup.reuseExistingChunk
如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块。这可能会影响 chunk 的结果文件名
12. cacheGroup.priority
一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。默认组的优先级为负，以允许自定义组获得更高的优先级（自定义组的默认值为 0）
13. cacheGroup.test
function (module, { chunkGraph, moduleGraph }) => boolean RegExp string
控制此缓存组选择的模块。省略它会选择所有模块。它可以匹配绝对模块资源路径或 chunk 名称。匹配 chunk 名称时，将选择 chunk 中的所有模块
14. cacheGroup.filename
string function (pathData, assetInfo) => string
仅在初始 chunk 时才允许覆盖文件名。 也可以在 output.filename 中使用所有占位符
通过提供以文件名开头的路径 'js/vendor/bundle.js'，可以创建文件夹结构
15. cacheGroup.enforce
告诉 webpack 忽略 splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests 和 splitChunks.maxInitialRequests 选项，并始终为此缓存组创建 chunk

环境变量
webpack 命令行 环境配置 的 --env 参数，可以允许你传入任意数量的环境变量。而在 webpack.config.js 中可以访问到这些环境变量
npx webpack --env goal=local --env production --progress

此时配置文件需要导出一个接受env为参数并返回配置对象的函数
const path = require('path');

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};

指定mode
指定 mode 会自动地配置 DefinePlugin

NODE_ENV
技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，server tools(服务期工具)、build scripts(构建脚本) 和 client-side libraries(客户端库) 的行为。然而，与预期相反，在构建脚本 webpack.config.js 中 process.env.NODE_ENV 并没有被设置为 "production"，因此，在 webpack 配置文件中，process.env.NODE_ENV === 'production' ? '[name].[contenthash].bundle.js' : '[name].bundle.js' 这样的条件语句，无法按照预期运行。但是在开发人员源代码中，同样是可以使用环境变量的
构建性能
通用环境

1. 版本：尽量使用最新版本的node和webpack
2. loader：将loader用在尽量少的模块中
3. 解析： 尽量通过配置提高解析速度

- 减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中条目数量，因为他们会增加文件系统调用的次数。
- 如果你不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false。
- 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 resolve.cacheWithContext: false。

4. dll： 为更改不频繁的代码使用dllplugin生成单独的编译结果，但是也增加了构建过成功的复杂度
5. 使chunk较小： 尽量保证更小更少的chunk，移除未引用的代码，只编译当前源码
6. worker池： 使用thread-loader将非常消耗资源的loader分流给一个工作池
开发环境
1. 增量编译： 使用 webpack 的 watch mode(监听模式)。而不使用其他工具来 watch 文件和调用 webpack 。内置的 watch mode 会记录时间戳并将此信息传递给 compilation 以使缓存失效。在某些配置环境中，watch mode 会回退到 poll mode(轮询模式)。监听许多文件会导致 CPU 大量负载。在这些情况下，可以使用 watchOptions.poll 来增加轮询的间隔时间。
2. 在内存中编译： 使用webpack-dev-serve通过在内存中编译而不写入磁盘
3. 使用合理的devtool： 在大多数情况下，最佳选择是 eval-cheap-module-source-map
4. 避免使用在生产环境中使用的工具： 一些代码压缩和混淆破坏的plugin和loader一般是为生产环境打包时才会用到，在开发环境下应避免使用这些工具
5. 避免额外的优化步骤： 在生产环境中可能需要执行额外的算法任务，来优化输出结果和性能，在开发环境中这种优化不是很有必要
6. 输出结果不携带路径信息： Webpack 会在输出的 bundle 中生成路径信息。然而，在打包数千个模块的项目中，这会导致造成垃圾回收性能压力。在 options.output.pathinfo 设置中关闭
生产环境
1. 使用较为合理的sourceMap： sourceMap相当耗费资源，生产环境中可以适当取消生成sourceMap
tree-shaking
tree-shaking可以帮助我们不对未使用的代码进行打包，减小构建结果的体积
tree-shaking的实现依赖于es6的静态应用，也就是import和export，结合配置中optimization.usedExports和package.json中的sideEffects，对未使用的代码进行删除
"side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export
所有导入文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css-loader 并 import 一个 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除
tree-shaking与sideEffects
sideEffects 更为有效 是因为它允许跳过整个模块/文件和整个文件子树。
usedExports 依赖于 terser 去检测语句中的副作用（代码分析）。它是一个 JavaScript 任务而且没有像 sideEffects 一样简单直接。而且它不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的
在使用 tree shaking 时必须有 ModuleConcatenationPlugin 的支持，您可以通过设置配置项 mode: "production" 以启用它。如果您没有如此做，请记得手动引入 ModuleConcatenationPlugin
shimming
预置全局变量
预置全局变量可以在编写模块代码的过程中，不必显式得引入模块变量，这需要使用到providePlugin
 const path = require('path');
const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
  ],
 };

这样，在模块任何地方使用到_时，webpack就会将lodash包引入并提供给需要使用的模块
还可以使用 ProvidePlugin 暴露出某个模块中单个导出，通过配置一个“数组路径”（例如 [module, child, ...children?]）实现此功能。所以，我们假想如下，无论 join 方法在何处调用，我们都只会获取到 lodash 中提供的 join 方法
修改this指向
通过使用 imports-loader可以覆盖 this 指向
  module: {
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?wrapper=window',
      },
    ],
  },

optimization

1. chunkIds
boolean = false string: 'natural' | 'named' | 'size' | 'total-size' | 'deterministic'
告知 webpack 当选择模块 id 时需要使用哪种算法。将 optimization.chunkIds 设置为 false 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。optimization.chunkIds 的默认值是 false：

- 如果环境是开发环境，那么 optimization.chunkIds 会被设置成 'named'，但当在生产环境中时，它会被设置成 'deterministic'
- 如果上述的条件都不符合, optimization.chunkIds 会被默认设置为 'natural'
无法复制加载中的内容

2. emitOnErrors
boolean = false
使用 optimization.emitOnErrors 在编译时每当有错误时，就会发送静态资源。这样可以确保出错的静态资源被发送出来。关键错误会被发送到生成的代码中，并会在运行时报错
3. flagIncludedChunks
告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。optimization.flagIncludedChunks 默认会在 production 模式 中启用，其他情况禁用
4. innerGraph
optimization.innerGraph 告知 webpack 是否对未使用的导出内容，实施内部图形分析(graph analysis)
5. mergeDuplicateChunks
告知 webpack 合并含有相同模块的 chunk。将 optimization.mergeDuplicateChunks 设置为 false 以禁用这项优化
6. minimize
告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle
7. minimizer
[TerserPlugin] 或 [function (compiler)]
允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // <https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions>
        },
      }),
    ],
  },
};

或，使用函数的形式：
module.exports = {
  optimization: {
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({
          /*你的配置*/
        }).apply(compiler);
      },
    ],
  },
};

在 optimization.minimizer 中可以使用 '...' 来访问默认值。
module.exports = {
  optimization: {
    minimizer: [new CssMinimizer(), '...'],
  },
};

8. moduleIds
boolean: false string: 'natural' | 'named' | 'deterministic' | 'size'
告知 webpack 当选择模块 id 时需要使用哪种算法。将 optimization.moduleIds 设置为 false 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。
下述选项字符串值均未被支持:
无法复制加载中的内容
9. nodeEnv
boolean = false string
告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串。如果 optimization.nodeEnv 不是 false，则会使用 DefinePlugin，optimization.nodeEnv 默认值取决于 mode，如果为 falsy 值，则会回退到 "production"。
可能的值：

- 任何字符串：用于设置 process.env.NODE_ENV 的值。
- false：不修改/设置 process.env.NODE_ENV的值。

10. removeEmptyChunks
如果 chunk 为空，告知 webpack 检测或移除这些 chunk。将 optimization.removeEmptyChunks 设置为 false 以禁用这项优化
11. runtimeChunk
object string boolean
默认值是 false：每个入口 chunk 中直接嵌入 runtime，将 optimization.runtimeChunk 设置为 true 或 'multiple'，会为每个入口添加一个只含有 runtime 的额外 chunk，值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
12. sideEffects
boolean = true string: 'flag'
告知 webpack 去辨识 package.json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块
13. splitChunks
对于动态导入模块，默认使用 webpack v4+ 提供的全新的通用分块策略(common chunk strategy)
14. usedExports
告知 webpack 去决定每个模块使用的导出内容。这取决于 optimization.providedExports 选项。由 optimization.usedExports 收集的信息会被其它优化手段或者代码生成使用，比如未使用的导出内容不会被生成，当所有的使用都适配，导出名称会被处理做单个标记字符。 在压缩工具中的无用代码清除会受益于该选项，而且能够去除未使用的导出内容
15. providedExports
告知 webpack 去确定那些由模块提供的导出内容，为 export * from ... 生成更多高效的代码。默认 optimization.providedExports 会被启用
performance
1. assetFilter
function(assetFilename) => boolean
此属性允许 webpack 控制用于计算性能提示的文件
module.exports = {
  performance: {
    // 控制只提示js类型的文件
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
};

2. hints
string = 'warning': 'error' | 'warning' boolean: false
打开或关闭提示，指定提示的类型
module.exports = {
  //...
  performance: {
    hints: false,// 不提示
    hints: 'warning' // 提示警告类型
    hints: 'error' // 提示错误类型
  },
};

3. maxAssetSize
资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积(单位: bytes)，控制 webpack 何时生成性能提示
4. maxEntrypointSize
入口起点表示针对指定的入口，对于所有资源，要充分利用初始加载时(initial load time)期间。此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示
模块方法
ES6
1. import（）
动态加载模块，调用 import 的之处，被视为分割点，意思是，被请求的模块和它引用的所有子模块，会分割到一个单独的 chunk 中
不能使用完全动态的 import 语句，例如 import(foo)。是因为 foo 可能是系统或项目中任何文件的任何路径。
import() 必须至少包含一些关于模块的路径信息。打包可以限定于一个特定的目录或文件集，以便于在使用动态表达式时 - 包括可能在 import() 调用中请求的每个模块。例如， import(`./locale/${language}.json`) 会把 .locale 目录中的每个 .json 文件打包到新的 chunk 中。在运行时，计算完变量 language 后，就可以使用像 english.json 或 german.json 的任何文件。
// 想象我们有一个从 cookies 或其他存储中获取语言的方法
const language = detectVisitorLanguage();
import(`./locale/${language}.json`).then((module) => {
  // do something with the translations
});

2. 魔法注释
通过在 import 中添加注释，我们可以进行诸如给 chunk 命名或选择不同模式的操作
webpackChunkName: 新 chunk 的名称。 从 webpack 2.6.0 开始，占位符 [index] 和 [request] 分别支持递增的数字或实际的解析文件名。 添加此注释后，将单独的给我们的 chunk 命名为 [my-chunk-name].js 而不是 [id].js。
webpackMode：从 webpack 2.6.0 开始，可以指定以不同的模式解析动态导入。支持以下选项：

- 'lazy' (默认值)：为每个 import() 导入的模块生成一个可延迟加载（lazy-loadable）的 chunk。
- 'lazy-once'：生成一个可以满足所有 import() 调用的单个可延迟加载（lazy-loadable）的 chunk。此 chunk 将在第一次 import() 时调用时获取，随后的 import() 则使用相同的网络响应。注意，这种模式仅在部分动态语句中有意义，例如 import(`./locales/${language}.json`)，其中可能含有多个被请求的模块路径。
- 'eager'：不会生成额外的 chunk。所有的模块都被当前的 chunk 引入，并且没有额外的网络请求。但是仍会返回一个 resolved 状态的 Promise。与静态导入相比，在调用 import() 完成之前，该模块不会被执行。
- 'weak'：尝试加载模块，如果该模块函数已经以其他方式加载，（即另一个 chunk 导入过此模块，或包含模块的脚本被加载）。仍会返回 Promise， 但是只有在客户端上已经有该 chunk 时才会成功解析。如果该模块不可用，则返回 rejected 状态的 Promise，且网络请求永远都不会执行。当需要的 chunks 始终在（嵌入在页面中的）初始请求中手动提供，而不是在应用程序导航在最初没有提供的模块导入的情况下触发，这对于通用渲染（SSR）是非常有用的。
webpackPrefetch：告诉浏览器将来可能需要该资源来进行某些导航跳转。
webpackPreload：告诉浏览器在当前导航期间可能需要该资源。
注意：所有选项都可以像这样组合 /*webpackMode: "lazy-once", webpackChunkName: "all-i18n-data"*/。这会按没有花括号的 JSON5 对象去解析。它会被包裹在 JavaScript 对象中，并使用 node VM 执行。所以你不需要添加花括号。

webpackInclude：在导入解析（import resolution）过程中，用于匹配的正则表达式。只有匹配到的模块才会被打包。
webpackExclude：在导入解析（import resolution）过程中，用于匹配的正则表达式。所有匹配到的模块都不会被打包。

webpackExports: 告知 webpack 只构建指定出口的动态 import() 模块。它可以减小 chunk 的大小。从 webpack 5.0.0-beta.18 起可用。
import(
  /*webpackInclude: /\.json$/*/
  /*webpackExclude: /\.noimport\.json$/*/
  /*webpackChunkName: "my-chunk-name"*/
  /*webpackMode: "lazy"*/
  /*webpackPrefetch: true*/
  /*webpackPreload: true*/
  `./locale/${language}`
);

Webpack

1. require.context
require.context(
  (directory: String),
  (includeSubdirs: Boolean) /*可选的，默认值是 true*/,
  (filter: RegExp) /*可选的，默认值是 /^\.\/.*$/，所有文件 */,
  (mode: String)  /* 可选的， 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once'，默认值是 'sync' */
)

创建模块上下文，返回具有三个属性的函数

- resolve：是一个函数，它返回 request 被解析后得到的模块 id。
- keys：也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
- id：是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到
使用返回的函数可以加载模块
runtime
manifest
tapable
tapable提供了一个订阅发布中心，支持同步/异步、并行/串行执行订阅的事件回调
hook分类

1. 同步hook
SyncHook：串行执行回调，忽略每个事件函数的返回值
SyncBailHook：保险类型，当其中一个事件函数返回非undefined，中断后面事件函数的执行SyncWaterfallHook：瀑布类型，前面事件函数执行后的非undefined会传递后面的事件函数，如果事件函数接收多个参数，只能替换第一个参数
SyncLoopHook：循环类型，如果其中一个事件函数返回非undefined，将从头执行事件函数
2. 异步串行hook
AsyncSeriesHook：callAsync和promise中的回调函数无法获取到参数
AsyncSeriesBailHook
AsyncSeriesWaterfalHook：可获取回调或者promise中的值
3. 异步并行Hook
AsyncParallelHook、AsyncParallelBailHook
```
