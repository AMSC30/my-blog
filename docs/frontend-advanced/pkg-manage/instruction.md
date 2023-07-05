# 前端包管理工具

[npm中文文档](https://www.npmrc.cn/)

## NPM包认识

### NPM包范围及可见性

|范围 |访问级别 |可以查看和下载 |可以写（发表）|
|----|----|----|----|
|组织| 私人| 组织中对包具有读访问权限的团队成员| 组织中对包具有读写访问权限的团队成员|
|组织| 公众| 所有人| 组织中对包具有读写访问权限的团队成员|
|用户| 私人| 包所有者和已被授予对包的读访问权限的用户| 已被授予对包的读写访问权限的包所有者和用户|
|用户| 公众| 所有人| 已被授予对包的读写访问权限的包所有者和用户|
|无作用域| 公众| 所有人| 已被授予对包的读写访问权限的包所有者和用户|

> 只有用户帐户可以创建和管理无作用域的包。组织只能管理限定范围的包

### package.json

每个NPM包中都必须包含package.json文件，package.json文件必须包含"name"和"version"字段。"name"字段包含包的名称，必须是小写字母和一个单词，并且可以包含连字符和下划线。"version"字段必须采用x.x.x格式。使用npm init创建，包含若干默认配置：

**1. name：包名**

包名，默认为当前目录名。

包含作用域在内，包名不能大于214个字符，并且不得包含大写字母，作用域的包名可以以点或下划线开始，不能包含为url安全的字符

**2. version：版本**

默认为1.0.0

**递增规则**

- 首次发布： 从1.0.0开始->1.0.0
- 向后兼容的bug修复： 递增第三位数->1.0.1
- 向后兼容的新功能： 递增中间的数字，并将最后一个数字重置为零->1.1.0
- 破坏向后兼容性的更改： 递增第一位数字，并将中间和最后一位数字重置为零->2.0.0

**可接受范围**

- 补丁版本：1.0或1.0.x或~1.0.4
- 次要版本：1或1.x或^1.0.4
- 主要版本：#1或#2

**3. description**

用于描述包的信息，可以用于npm search

**4. scripts**

package.json文件中的scripts属性支持数字、内置脚本及其预设生命周期事件以及任意脚本。这些都可以通过npm run-script \<stage\>或npm run \<stage\>运行，匹配名称的前置或者后置脚本会在特定生命周期运行

执行npm ci或者npm install时，会触发以下生命周期：

```text
preinstall->install->postinstall->prepublish->preprepare->prepare->postprepare
```

执行npm publish时，会触发以下生命周期：

```text
prepublishOnly->prepack->prepare->postpack->publish->postpublish
```

执行npm start时，会触发以下生命周期：

```text
prestart->start->poststart
```

执行npm stop时，会触发以下生命周期：

```text
prestop->stop->poststop
```

执行npm restart时，如果没有在脚本中定义restart命令，那么stop和start会执行，并触发相应的生命周期脚本，定义了restart脚本，将触发以下生命周期：

```text
prerestart->restart->postrestart
```

执行npm test时，会触发以下生命周期：

```text
pretest->test->posttest
```

执行npm version时，会触发以下生命周期：

```text
preversion->version->postversion
```

定义了自定义脚本时，触发方式如下：

```text
pre<user-defined>-><user-defined>->post<user-defined>
```

**5. keywords**

描述npm包的关键词数组

**6. author**

包作者信息

**7. homepage**

项目主页的url，一般是git仓库中的readme文件地址

**8. main**

包的的导入入口，如果没有配置，默认是包根目录下的index.js文件，它应该是基于包的根目录。

当使用require导入包如require('foo')，将会返回导入入口的exports

**9. browser**

如果模块是在浏览器中使用，最好设置这个字段而不是main字段，这样有助于提示用户依赖的node可能不可用

**10. bin**

bin提供了通过命令运行包中文件的可能，借助npm安装可执行文件的功能，全局安装此软件包时， 会将对应的js文件创建一个符号链接（name）到/usr/local/bin下，或者将创建一个cmd（Windows命令文件），它执行指定的在bin字段中添加了一个文件，因此可以通过name或name.cmd（在 Windows PowerShell）
>在文件首部需要加上 #!/usr/bin/env node

**11. dependencies**

dependencies：您的应用程序在生产中需要的包，使用--save-prod(-D)

devDependencies：仅用于本地开发和测试的软件包，使用--save-dev(-S)

peerDependencies：通常用于插件包中，表示使用插件的主体应该已经安装了插件需要使用到的依赖包，安装插件时不需要安装peerDependencies中的依赖，在v7以前，peerDependencies中的依赖是不会自动安装的，当发现已安装的依赖与插件所需要的版本不一致时会触发警告，npm v7开始，peerDependencies是`默认安装`

**12. workspace**

工作区支持在一个顶级根包中从本地管理多个包，自动化连接将作为npm install的一部分，避免手动link，每一个本地包都是一个单个工作区，执行npm install时，会将工作区中的包符号连接到根包中的node_modules中

创建一个工作区，需要在根包的package.json中定义：

```json
{
  "name": "my-workspaces-powered-project",
  "workspaces": [
    "packages/a"
  ]
}
```

向工作区添加依赖：

```bash
npm install -w <workspace-name>
```

同理，uninstall、ci命令支持相同的语法，安装的模块会在根包的node_modules中

指定在多个工作区执行命令，可以使用：

```bash
npm start --workspace=<workspace-name> --workspace=<workspace-name>
# 或者
npm start -w <workspace-name> -w <workspace-name>
```

指定在所有工作区执行(如果存在命令)，可以使用：

```bash
npm start --workspaces --if-present
```

**13.engine**

指定包运行的环境

 ```json
 {
  "engines": {
    "node": ">=0.10.3 <15",
    "npm": "~1.0.20"
  }
}
```

**14. private**

如果在package.json中设置"private": true，那么npm将不会发布这个包

## NPM

### npm组成

- 网站: 是开发者查找包（package）、设置参数以及管理 npm 使用体验的主要途径
- 注册表: 是一个巨大的数据库，保存了每个包（package）的信息
- 命令行工具: 通过命令行或终端运行。开发者通过 CLI 与 npm 打交道

### npm配置

#### 命令行配置

命令行配置具有最高的优先级

--flag1 --flag2将同时设置配置参数true，而--flag1 --flag2 bar将设置flag1于true，并且flag2到bar。最后，--flag1 --flag2 --bar将两个配置参数都设置为true，并将其bar作为命令参数。

#### 环境变量配置

任何以npm_config_开头的环境变量都将被解释为配置参数。

例如，放入npm_config_foo=bar您的环境会将foo 配置参数设置为bar。任何未赋值的环境配置都将被赋予值true。配置值不区分大小写，因此NPM_CONFIG_FOO=bar工作方式相同。但请注意，在 npm-scripts 内部，npm 将设置自己的环境变量，Node 会优先选择那些小写版本而不是你可能设置的任何大写版本

#### .npmrc配置

.npmrc配置生效的优先级如下：

1. 每个项目的配置文件（/path/to/my/project/.npmrc）
2. 每用户配置文件（默认为$HOME/.npmrc;可通过CLI选项--userconfig或环境变量配置$NPM_CONFIG_USERCONFIG）
3. 全局配置文件（默认为$PREFIX/etc/npmrc;可通过CLI选项--globalconfig或环境变量配置$NPM_CONFIG_GLOBALCONFIG）
4. npm 的内置配置文件（/path/to/npm/npmrc）

<br/>

.npmrc配置项：

- access：\<null|public|restricted\>

设置包的权限，默认为public，非作用域的包不可以设置为restricted，更改配置后，不会改变现有包的访问权限，在publish后生效

- all: \<boolean\>

运行npm outdated和npm ls时，设置--all将显示所有 过时的或已安装的软件包，而不仅仅是那些直接依赖的软件包 目前的项目

- bin-links: \<boolean\>

控制在执行npm install时是否创建符号链接，可解决一些文件系统不支持符号链接的问题

- cache：\<string\>

缓存目录路径

- commit-hooks: \<boolean\>

执行npm version命令时运行git commit hook

- depth：\<number|null\>

如果设置了all，默认为infinity，否则默认为1；

设置执行npm ls时的包需要到达的深度

- engine-strict: \<boolean\>

默认值为false，是否严格匹配当前node的版本，如果包中声明的node版本与当前系统版本不符合并且该选项为true，npm会停止安装对应的包

- force: \<boolean\>

消除保护措施，防止不好的副作用、常见错误等发生，主要体现在以下几点：

1. 允许全局安装非npm文件
2. 允许使用npm cache clean删除缓存文件夹
3. 允许安装具有engine声明并且与环境node不匹配的包，即使engine-strict已启用

- format-package-lock: \<boolean\>

格式化package-lock.json为人类可读文件

- include: \<prod|dev|optional|peer\>

定义要安装的依赖类型

- init-version: \<string\>

使用npm init时指定的初始版本号，默认为'1.0.0'

- install-strategy: \<hoisted|nested|shallow|linked>

指定安装包时在node_modules中的策略，hoisted：在顶层非重复安装，并根据需要在目录结构中重复；nested：安装在每个包中，不提升到顶层；shallow：只安装在dep顶层的包

- json: \<boolean\>

是否输出为json数据，而不是正常输出

- legacy-peer-deps: \<boolean\>

指定包是否忽略peer依赖，false表示忽略，如v3-v6，从v7开始默认安装

- lockfile-version: \<number\>

锁文件版本。在v5和v6中，使用1版本，缺少一些数据导致安装速度较慢

- loglevel：\<silent|error|warn|notice|http|info|verbose\>

默认值为notice，将显示更高级别的日志

- logs-dir: \<path\>

npm的log目录位置，默认为缓存中的_logs目录

- logs-max: \<number\>

日志文件的最大存储数量，超过数量后将按照生成时间删除，默认为10，如果设置为0，不会有日志写入文件当中

- message：\<string\>

使用npm version创建版本时要提交的git信息，信息中的“%s”将会替换为版本号

- package-lock: \<boolean\>

如果设置为false，安装时将忽略package-lock.json文件，如果为true，将会阻止写入package-lock.json文件

- package-lock-only: \<boolean\>

如果设置为true，则当前操作将仅使用package-lock.json， 忽略node_modules

对于update，这意味着仅更新package-lock.json， 而不是检查node_modules和下载依赖项

对于list，这意味着输出将基于 package-lock.json，而不是node_modules的内容

- prefix：\<string\>

全局包安装的路径

- progress：\<boolean\>

是否在控制台显示进度条

- registry: \<string\>

注册表地址

- scope：\<string\>

将操作限定在作用域内进行，安装包时将安装作用域包，使用npm init也将创建一个作用域包

- usage: \<boolean\>

显示有关命令的简短用法输出

- workspace：\<string\>

指定命令执行的工作空间，如果使用workspaces表示在所有工作区中执行

#### config命令

config命令用于通过子命令在命令行配置.npmrc文件

获取配置文件信息：

```bash
npm config ls -l [--json]

# 用户配置
npm config list [--json]
```

修改配置文件：

```bash
npm config set <key> <value> [-g|--global]
npm config set key=value [-g|--global]

npm set <key> <value> [-g|--global]

npm config get <key>
npm get <key>

npm config delete <key>

npm config edit
```

config选项：

- json：使用json格式输出，非原始格式
- location：global/user/project 配置文件目标对象

### npm命令

#### 用户操作

- 登录

```bash
npm login
```

- 查看当前注册表登录用户

```bash
npm whoami
```

- 配置用户信息

```bash
npm profile get
```

- 设置用户信息

```bash
npm profile set <prop> <value>
```

- 添加用户

在注册表中创建一个新用户，并将凭据保存到.npmrc文件，如果未指定注册表，则使用默认注册表

```bash
npm adduser
```

#### 安装包

安装包的来源可以是npm官方的注册表、本地包、git仓库中的包，使用npm官方注册表中的包，可以对包指定范围

**npm包类型**

使用install命令安装包是可能会存在以下情况：

```text
# npm注册表中的包：
[<@scope>/]<pkg>
[<@scope>/]<pkg>@<tag>
[<@scope>/]<pkg>@<version>
[<@scope>/]<pkg>@<version range>

# 本地包：
./my-package
/opt/npm/my-package

# git仓库的包:
git@github.com:npm/cli.git
git+ssh://git@github.com/npm/cli#v6.0.0
github:npm/cli#HEAD
npm/cli#c12ea07
```

**安装命令**

```bash
# 本地安装
npm install <package>

# 全局安装
npm install -g <package>

#安装为开发依赖
npm install --save-dev <package>
npm install -D <package>

# 安装为生产依赖
npm install --save-prod <package>
npm install -P <package>
```

如果本地package.js中没有安装包的信息，默认安装最新版本，否则按照package.js中版本规则进行安装；如果包有一个 package-lock，或一个 npm shrinkwrap 文件，或一个 yarn lock 文件，依赖项的安装将由该文件驱动，并遵循shrinkwrap、package-lock、yarn-lock的优先级进行

```bash
npm install <folder>
```

如果 \<folder\> 位于项目的根目录中，那么它的依赖项将被安装，并可能像其他类型的依赖项一样被提升到顶级 node_modules。如果 \<folder\> 位于项目的根目录之外，npm 不会将包依赖项安装在 \<folder\> 目录中，但它会创建一个指向 \<folder\> 的符号链接

**npm ci**

npm ci的功能类似于npm install，但是前者更快更严格，常用于生产环境的持续集成，使用npm ci安装依赖，有以下几个特点：

1. 必须存在package-lock.json
2. 如果package.json中的版本与package-lock.json中的版本不符，将会报错
3. 单次执行只能安装项目所有包，不能用于安装单个包
4. 执行前，会主动删除node_modules文件夹，如果存在的话
5. npm ci会优先从缓存中取

#### 更新包

- 更新本地包

```bash
# 局部更新
npm update <package>

# 更新本地所有
npm update
```

- 查找可以更新的包

```bash
npm outdated
```

此命令将检查注册表以查看当前是否有任何（或特定）已安装的已过时的软件包。

默认情况下，仅显示根项目的直接依赖项和配置的工作区的直接依赖项。也用于 --all 查找所有过时的元依赖项

- 更新全局包

```bash
# 局部更新
npm update -g <package>

# 整体更新
npm update -g
```

- 查找可以更新的包

```bash
npm outdated -g --depth=0
```

#### 卸载包

- 卸载本地包

```bash
# 卸载node_modules中的包
npm uninstall <package-name>

# 从package.json中删除
npm uninstall --save <package-name>

# 从package.json中删除
npm uninstall --save-dev <package-name>
```

- 卸载全局包

```bash
npm uninstall -g <package>
```

#### 发布包

发布的包中必须要一个readme文件，用于在网站上显示的包信息

```bash
npm publish [<tarball>|<folder>] [--tag <tag>] [--access <public|restricted>] [--otp otpcode] [--dry-run]
```

- 更新版本号

```bash
npm version <version_number | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git>
```

> 该操作会更新package.json中的版本号

- 发布私有包到公共范围

```bash
npm publish --access=public
```

- 更新站点包信息

```bash
npm version patch
npm publish
```

- 将标记添加到特定的版本

```bash
npm dist-tag add <package>@<version> [<tag>]
```

默认情况下，npm会将发布的包标记为latest，我们可以主动修改标签

```bash
npm publish --tag beta
```

#### 其他命令

- access

设置已发布包的访问级别

设置一个包为public或者private：

```bash
npm access get status [<package>]
npm access set status=public|private [<package>]
```

授予/移除个人或组织对包的访问、读写权限：

```bash
npm access grant <read-only|read-write> <scope:team> [<package>]
npm access revoke <scope:team> [<package>]
```

显示用户或团队能够访问的所有包以及访问级别，只读公共包除外:

```bash
npm access list packages [<user>|<scope>|<scope:team> [<package>]
npm access list collaborators [<package> [<user>]]
```

- cache

清除缓存

```bash
npm cache clean --force
```

- docs

```bash
npm docs <package>
```

- exec

该命令可以在npm包中执行命令，就和执行npm run一样，格式如下

```bash
npm exec -- <pkg>[@<version>] [args...]
npm exec --package=<pkg>[@<version>] -- <cmd> [args...]
npm exec -c '<cmd> [args...]'
npm exec --package=foo -c '<cmd> [args...]'
```

--package 选项指定的任何包将在被执行命令的 PATH 中提供，以及任何本地安装的包可执行文件,如果任何被请求的包没有出现在本地项目依赖项中，那么它们会被安装到 npm 缓存中的一个文件夹中
，如果没有提供 -c 或 --call 选项，则使用位置参数生成命令字符串；如果没有提供 --package 选项，那么 npm 将尝试从package.json中的bin字段获取

- explain

```bash
npm explain <package-spec>

alias: why
```

打印当前安装包的依赖链

- init

```bash
npm init <initializer>
```

initializer会被转换为create-initializer，然后使用npm exec安装并执行相应的bin，等同于npx initializer，命令行参数也将传递给初始化包，用例如下：

```bash
npm init foo --yes -> npm exec create-foo -- --yes
npm init @usr/foo -> npm exec @usr/create-foo
npm init @usr -> npm exec @usr/create
npm init @usr@2.0.0 -> npm exec @usr/create@2.0.0
npm init @usr/foo@2.0.0 -> npm exec @usr/create-foo@2.0.0
```

如果省略了initializer，将会执行init行为

- link

用于安装本地包，不带参数的包文件夹中的 npm link 将在全局文件夹 {prefix}/lib/node_modules/\<package\> 中创建一个符号链接，该符号链接链接到执行 npm link 命令的包。它还会将包中的任何 bins 链接到 {prefix}/bin/{name}，带参数的包文件夹执行npm link package-name将创建一个从全局安装的package-name(取自 package.json)到当前文件夹 node_modules/ 的符号链接

```bash
npm link <package>
```

> 也可以在使用包的地方使用npm link package-path的方式

- ping

```bash
npm ping [--registry <registry>]
```

- pkg

用于检索和设置字段的语法是可以在 package.json 中找到的嵌套对象属性的点分隔表示，它与 npm view 中用于从注册表中检索信息的符号相同

```bash
npm pkg set <key>=<value> [<key>=<value> ...]
npm pkg get [<key> [<key> ...]]
npm pkg delete <key> [<key> ...]
npm pkg set [<array>[<index>].<key>=<value> ...]
npm pkg set [<array>[].<key>=<value> ...]
```

- prefix

```bash
npm prefix [-g]
```

- git仓库

此命令尝试猜测指定包的源码仓库的 URL ，然后再使用 --browser 配置参数打开它。 如果没有提供包名称，它将在当前文件夹中搜索package.json 文件， 并使用其 name 属性的值

```bash
npm repo [<pkg>]
```

- search

在注册中心中搜索与搜索词匹配的包。npm search 通过包元数据对注册表中的所有文件执行线性、增量、按词法顺序的搜索

```bash
npm search <pkg-keyword>

```

- view

查询包的详细信息

```bash
npm view <pkg>
```

### npx

npx主要解决了调用非全局的内部模块的问题，运行时，会到node_modules/.bin路径下和$PATH环境变量中检查命令是否存在，如果执行命令的依赖包没有安装到局部和全局，npx会将依赖包下载安装到一个临时目录，在使用完成后对依赖包进行删除

```bash
npx -- <pkg>[@<version>] [args...]
npx --package=<pkg>[@<version>] -- <cmd> [args...]
npx -c '<cmd> [args...]'
npx --package=foo -c '<cmd> [args...]'
npx gitUrl
```

--no-install：强制使用本地模块，如果项目目录和全局都不存在，将报错

--ignore-exist：忽略本地已有的模块

### install细节

#### 演进

**第一版：嵌套结构**

npm按package中的定义顺序递归的安装依赖包

问题：

1. 导致层级过深，路径长度不符合操作系统
2. 重复安装

**第二版：扁平结构（3.x后)**

npm按package中的定义顺序安装包，如果node_modules下不存在，则安装在其下方，如果存在同时符合版本范围，忽略安装，如果存在但是不符合版本范围，安装在依赖包的node_modules下，包的版本受package中定义得顺序

问题：

1. 没有彻底解决重复安装的问题（与顺序有关）
2. 项目中可以使用不存在package.json中的依赖包（幽灵依赖）

**第三版：lock文件（5.x后）**

为了解决顺序导致的不确定性，npm使用lock锁定依赖结构，依然使用扁平结构，lock文件的结构和项目node_modules安装包的结构一一对应，在第一次安装包时，会根据lock文件进行安装，保证了lock文件与node_modules的结构相同，同时提升安装速度

问题 ：

项目中可以使用不存在package.json中的依赖

#### 安装过程

1. 检查 .npmrc 文件：优先级为：项目级的 .npmrc 文件 > 用户级的 .npmrc 文件> 全局级的 .npmrc 文件 > npm 内置的 .npmrc 文件
2. 检查有无 lock 文件。

- 无 lock 文件：

  1）从 npm 远程仓库获取包信息

  2）根据 package.json 构建逻辑依赖树：
  - 不管其是直接依赖还是子依赖的依赖，优先将其放置在 node_modules 根目录。
  - 当遇到相同模块时，判断已放置在依赖树的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的 node_modules 下放置该模块。

  3）根据逻辑依赖书在缓存中依次查找每个包
  - 不存在缓存：
    - 从 npm 远程仓库下载包
    - 校验包的完整性
    - 校验不通过
      - 重新下载
    - 校验通过：
      - 将下载的包复制到 npm 缓存目录
      - 将下载的包按照依赖结构解压到 node_modules
  - 存在缓存
    - 将缓存按照依赖结构解压到 node_modules

  4）生成 lock 文件
- 有 lock 文件：
  - 检查 package.json 中的依赖版本是否和 package-lock.json 中的依赖有冲突。
    - 没有冲突，直接跳过获取包信息、构建依赖树过程，开始在缓存中查找包信息，后续过程相同
    - 有冲突，报错，需要手动解决冲突

流程图如下：
<img src="./install.png"/>

## pnpm

依赖存储方式
pnpm将依赖包统一存储在硬盘上的一个位置，项目中安装依赖的时候会将使用的包硬链接到这个位置
pnpm不会对相同包的不同版本分别处理，只会存储相同依赖包的不同文件
