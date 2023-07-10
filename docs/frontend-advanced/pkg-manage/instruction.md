# 前端包管理工具

[npm中文文档](https://www.npmrc.cn/)&nbsp;[pnpm中文文档](https://pnpm.io/zh/motivation)&nbsp;[yarn中文文档](https://www.yarnpkg.cn/)

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
2. 每用户配置文件（默认为$HOME/.npmrc;可通过CLI选项--userconfig或环境变量$NPM_CONFIG_USERCONFIG配置）
3. 全局配置文件（默认为$PREFIX/etc/.npmrc;可通过CLI选项--globalconfig或环境变量$NPM_CONFIG_GLOBALCONFIG配置）
4. npm 的内置配置文件（/path/to/npm/.npmrc）

<br/>

.npmrc配置项：

- access：\<null|public|restricted\>

设置包的权限，默认为public，非作用域的包不可以设置为restricted，更改配置后，不会改变现有包的访问权限，在publish后生效

- all: \<boolean\>

运行npm outdated和npm ls时，设置--all将显示所有过时的或已安装的软件包，而不仅仅是那些直接依赖的软件包

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

如果 \<folder\> 位于项目的根目录中，那么它的依赖项将被安装，并可能像其他类型的依赖项一样被提升到顶级node_modules。如果 \<folder\> 位于项目的根目录之外，npm 不会将包依赖项安装在node_modules中，但它会创建一个指向 \<folder\> 的符号链接

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

用于安装本地包，在包文件夹中执行不带参数的 npm link 将在全局文件夹`{prefix}/lib/node_modules/<package>`中创建一个符号链接，该符号链接链接到执行 npm link 命令的包，它还会将包中的任何`bins`链接到`{prefix}/bin/{name}`，执行带包文件夹参数的`npm link package-name`将创建一个从全局安装的package-name(取自 package.json)到当前文件夹 node_modules 的符号链接

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
  - 不管其是直接依赖还是依赖的子依赖，优先将其放置在 node_modules 根目录。
  - 当遇到相同模块时，判断已放置在依赖树的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的 node_modules 下放置该模块。

  3）根据逻辑依赖树在缓存中依次查找每个包
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

pnpm将依赖包统一存储在硬盘上的一个位置，项目中安装依赖的时候会将使用的包硬链接到这个位置，pnpm不会对相同包的不同版本分别处理，只会存储相同依赖包的不同文件

### 命令执行

#### 环境变量

与 npm 不同的是，pnpm 会校验所有的参数。 比如，pnpm install --target_arch x64 会执行失败，因为 --target_arch x64 不是 pnpm install 的有效参数

如果某些依赖需要使用环境变量，可以通过`npm_config_xxx`从cli选项中填充：

1. 设置明确的环境变量：npm_config_target_arch=x64 pnpm install
2. 使用 --config.xx 来强制使用未知选项：pnpm install --config.target_arch=x64

#### 工作目录

通过配置项，可以指定命令运行的不同工作目录，默认当前工作目录

1. -C \<path\>, --dir \<path\>

在 \<path\> 中启动 pnpm ，而不是当前的工作目录。

<br/>

2. -w, --workspace-root

在工作空间的根目录中启动 pnpm ，而不是当前的工作目录

#### 命令执行

当使用一个命令时，pnpm首先会查找自身有无该命令，如`npm install`，如果没有会在当前路径下的`package.json`的scripts中查找一个具有指定名称的脚本（所以 pnpm run lint 和 pnpm lint 等价），

如果没有指定名称的脚本，那么 pnpm 将以 shell 脚本的形式执行该命令，所以pnpm eslint和eslint等价

### pnpm命令

#### 依赖管理

1. 安装包

```bash
pnpm add <pkg>
```

安装软件包及其依赖，支持的包地址：

- 从注册表安装
- 从workspace安装，会从已配置的源处进行安装，当然取决于是否设置了 link-workspace-packages，以及是否使用了 workspace: 协议
- 从本地安装，本地安装可以使用源码文件压缩包和本地目录，如果使用本地目录，将会在node_modules中生成一个symlink，与pnpm link的行为一致
- 从远端安装tar包
- 从git安装

安装的软件包可以指定安装的位置类型：

- --save-prod -P：安装到常规的dependencies
- --save-dev -D：安装到devDependencies
- --save-optional -O：安装到optionalDependencies
- --save-peer：安装到peerDependencies
- --save-exact -E：安装一个确切的版本
- --global -g：安装到全局
- --workspace：仅添加在workspace中找到的依赖

<br/>

2. 安装项目所有依赖

```bash
pnpm install
pnpm i
```

在CI环境中, 如果存在需要更新的 lockfile 会安装失败

在 workspace内, pnpm install 下载项目所有依赖. 如果想禁用这个行为, 将 recursive-install 设置为 false

支持以下配置项：

- --force

强制重新安装依赖：重新获取并修改缓存中的包，由pnpm重新创建不兼容版本的lock文件和（或）模块目录。 安装所有 optionalDependencies，即使它们不满足当前环境（cpu、os、arch）

- --offline \<boolean\>

为 true时，pnpm会仅使用已经在缓存中的包。 如果缓存中没有找不到这个包，那么就会安装失败

- --prefer-offline \<Boolean\>

如果为 true，缺失的数据将会从服务器获取，并绕过缓存数据的过期检查。 想强制使用离线模式, 请使用 --offline.

- --prod, -P

如果环境变量中NODE_ENV被设置为 production，那么pnpm 不会安装任何属于 devDependencies 的包，如果有相关的包已经被安装了，则会清除这些包。 使用这个指令pnpm会忽略NODE_ENV ，强制pnpm以production的方式执行install命令。

- --dev, -D

仅安装devDependencies并删除已安装的dependencies，无论 NODE_ENV是什么。

- --no-optional

不安装 optionalDependencies 依赖

- --lockfile-only \<Boolean\>

使用时，只更新 pnpm-lock.yaml 和 package.json。 不写入 node_modules 目录。

- --fix-lockfile

自动修复损坏的 lock 文件。

- --frozen-lockfile \<Boolean\>

如果设置 true, pnpm 不会生成 lockfile，且如果 lockfile 跟 manifest 不同步、文件需要更新或不存在 lockfile 则会安装失败.

- --reporter=\<name\>

类型：default, append-only, ndjson, silent

silent - 不会向控制台记录任何信息，也不包含致命错误

default - 标准为 TTY 的默认输出

append-only - 始终向末尾追加输出。 没有光标操作

ndjson - 最详细报告. 打印所有ndjson 格式日志

- --shamefully-hoist \<Boolean\>

创建一个扁平node_modules 目录结构, 类似于npm 或 yarn. WARNING: 这是非常不推荐的.

- --ignore-scripts \<Boolean\>

不执行项目中`package.json`和它的依赖项中定义的任何脚本

<br/>

3. 更新包

```bash
npm update/up/upgrade [<pkg-name>]
```

更新项目中的依赖包，如果不带包名称，则更新所有依赖

可以使用以下参数：

- --recursive -r

同时更新所有子目录

- --latest -L

忽略package.json中的版本范围进行升级，可能出现跨主版本的升级，更新后会更新package.json文件

- --global -g

更新全局安装的依赖包

- --workspace

尝试链接工作区中所有的包。 版本将更新至与工作区内的包匹配的版本。

如果更新了特定的包，而在工作区内也找不到任何可更新的依赖项，则命令将会失败。

例如，如果 Express 不是工作区内的包，那么以下 命令将失败:

```bash
pnpm up -r --workspace express
```

- --prod, -P

仅更新在 dependencies 和 optionalDependencies 中的依赖项。

- --dev, -D

仅更新在 devDependencies中的依赖项。

- --no-optional

忽略在 optionalDependencies 中的依赖项。

- --interactive, -i

显示过时的依赖项并选择要更新的依赖项

<br/>

4. 删除包

```bash
pnpm remove/rm/un/uninstall <pkg-name>
```

从 node_modules 和项目的 package.json 中删除相关 packages。

可选择的配置项：

- --recursive, -r

当在工作区中使用此命令时，将从每个工作区的包中移除相关依赖(或 多个依赖)。

当不在工作区内使用时，将删除相关依赖项 (或多个依赖), 也包含子目录中对应的包 。

- --global, -g

从全局删除一个依赖包。

- --save-dev, -D

仅删除开发环境 devDependencies 中的依赖项。

- --save-optional, -O

仅移除 optionalDependencies 中的依赖项。

- --save-prod, -P

仅从 dependencies 中删除相关依赖项

<br/>

5. 链接包

```bash
pnpm link/ln
```

使当前本地包可在系统范围内或其他位置访问。

```bash
pnpm link <dir>
pnpm link --global
pnpm link --global <pkg>
```

可选择的配置项：

- --dir \<dir\>, -C

将link位置改为\<dir\>.

- pnpm link \<dir\>

从执行此命令的路径或通过\<dir\>指定的文件夹，链接package到node_modules中。

- pnpm link --global

从执行此命令的路径或通过\<dir\> 选项指定的文件夹，链接package到全局的node_modules中，所以使其可以被另一个使用pnpm link --global \<pkg\> 的package引用。

- pnpm link --global \<pkg\>

将指定的包（\<pkg\>）从全局 node_modules 链接到 package 的 node_modules，从该 package 中执行或通过 --dir 选项指定

- pnpm unlink

取消连接到系统的包

<br/>

6. 添加补丁

pnpm patch \<pkg name\>@\<version\>会将指定的包提取到一个可以随时编辑的临时目录当中，完成修改后, 运行 pnpm patch-commit \<path\> (\<path\> 是之前提取的临时目录) 以生成一个补丁文件，并提供 patchedDependencies 字段注册到你的项目中

可选的配置项：

- --edit-dir

指定包的解压目录

- --ignore-existing

忽略已有的补丁文件

#### 查看依赖

1. 检查问题

```bash
npm audit
```

检查已安装包的已知安全问题。

如果发现安全问题，请尝试通过 pnpm update 更新您的依赖项。 如果简单的更新不能解决所有问题，请使用 overrides 来强制使用 不易受攻击的版本或者运行npm audit --fix。 例如，如果 lodash@<2.1.0 易受攻击，可用这个overrides来强制使用 lodash@^2.1.0

```json
{
    "pnpm": {
        "overrides": {
            "lodash@<2.1.0": "^2.1.0"
        }
    }
}
```

可选的参数：

- --audit-level \<low|moderate|high|critical\>

仅打印大于设定等级的警告

- --fix

强制将不易受攻击的版本添加到package.json文件当中

- --json

使用json格式输出

- --dev

仅审查开发依赖项

- --prod

仅审查生产依赖项

<br/>

2. 依赖列表

```bash
pnpm list/ls
```

以一个树形结构输出所有的已安装package的版本及其依赖

<br/>

3. 查看过期依赖

```bash
pnpm outdated
```

<br/>

4. 查看依赖链

```bash
pnpm why <pkg name>
```

显示依赖于指定package的所有 package。

可选的配置项:

- --recursive, -r

在子目录所有package 中，或者如果在一个工作空间执行时，在工作空间的所有package中，显示指定 package的依赖关系树。

- --json

以 JSON 格式显示信息。

- --long

输出详细信息。

- --parseable

显示可解析的输出而不是树形视图。

- --global, -g

列出在全局安装目录的package，而不是在当前项目中。

- --prod, -P

仅仅显示在dependencies中的 package的依赖关系树。

- --dev, -D

仅仅显示在devDependencies中的 package的依赖关系树。

- --only-projects

仅显示同时也在工作区内的依赖项

### pnpm配置

pnpm大部分配置与npm相同，以下是pnpm独有的配置：

- hoist \<boolean\>

当 hoist 为 true 时，所有依赖项都会被提升到 node_modules/.pnpm/node_modules。 这使得 node_modules所有包都可以访问 未列出的依赖项

- shamefully-hoist \<boolean\>

默认情况下，pnpm 创建一个半严格的 node_modules，这意味着依赖项可以访问未声明的依赖项，但 node_modules 之外的模块不行。 通过这种布局，生态系统中的大多数的包都可以正常工作。 但是，如果某些工具仅在提升的依赖项位于根目录的 node_modules 时才有效，您可以将其设置为 true 来为您提升它们

- store-dir

包保存在磁盘上的位置

- modules-dir

全局包的安装位置

### 工作空间

一个 workspace 的根目录下必须有 pnpm-workspace.yaml 文件

默认情况下，如果可用的 packages 与已声明的可用范围相匹配，pnpm 将从工作区链接这些 packages。 例如, 如果bar引用"foo": "^1.0.0"并且foo@1.0.0存在工作区，那么pnpm会从工作区将foo@1.0.0链接到bar。 但是，如果 bar 的依赖项中有 "foo": "2.0.0"，而 foo@2.0.0 在工作空间中并不存在，则将从 npm registry 安装 foo@2.0.0 。 这种行为带来了一些不确定性。当 link-workspace-packages 选项被设置为 false 时，仅当使用 workspace: 协议声明依赖，pnpm 才会从此 workspace 链接所需的包

#### 工作区协议

pnpm 支持workspace协议`workspace:`。 当使用此协议时，pnpm 将拒绝解析除本地 workspace 包含的 package 之外的任何内容。 因此，如果设置为 "foo": "workspace:2.0.0" 时，安装将会失败，因为 "foo@2.0.0" 不存在于此 workspace 中

#### 发布workspace包

发布npm包时，如果包通过工作区写实使用了工作空间的包，这些包将会被动态替换

```json
{
    "dependencies": {
        "foo": "workspace:*",
        "bar": "workspace:~",
        "qar": "workspace:^",
        "zoo": "workspace:^1.5.0"
    }
}
```

转换后为：

```json
{
    "dependencies": {
        "foo": "1.5.0",
        "bar": "~1.5.0",
        "qar": "^1.5.0",
        "zoo": "^1.5.0"
    }
}
```

### node_modules结构

#### node_modules生成

pnpm 的 node_modules 布局使用符号链接来创建依赖项的嵌套结构，node_modules 中每个包的每个文件都是来自内容可寻址存储的硬链接
假设安装了依赖于 bar@1.0.0 的 foo@1.0.0。 pnpm 会将两个包硬链接到 node_modules 如下所示：

```text
node_modules
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    │           ├── index.js
    │           └── package.json
    └── foo@1.0.0
        └── node_modules
            └── foo -> <store>/foo
                ├── index.js
                └── package.json
```

这两个包都硬链接到一个 node_modules 文件夹（foo@1.0.0/node_modules/foo）内的子文件夹中。 这必要的：

1. 允许包自行导入自己。 foo 应该能够 require('foo/package.json') 或者 import * as package from "foo/package.json"。
2. 避免循环符号链接。 依赖以及需要依赖的包被放置在一个文件夹下。 对于 Node.js 来说，依赖是在包的内部 node_modules 中或在任何其它在父目录 node_modules 中是没有区别的

安装的下一阶段是符号链接依赖项。 bar 将被符号链接到 foo@1.0.0/node_modules 文件夹：

```text
node_modules
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    └── foo@1.0.0
        └── node_modules
            ├── foo -> <store>/foo
            └── bar -> ../../bar@1.0.0/node_modules/bar
````

接下来，处理直接依赖关系。 foo 将被符号链接至根目录的 node_modules 文件夹，因为 foo 是项目的依赖项：

```text
node_modules
├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    └── foo@1.0.0
        └── node_modules
            ├── foo -> <store>/foo
            └── bar -> ../../bar@1.0.0/node_modules/bar

```

无论依赖项的数量和依赖关系图的深度如何，布局都会保持这种结构，它与 Node 的模块解析算法完全兼容

#### peers处理

peer 依赖项（peer dependencies）会从依赖图中更高的已安装的依赖项中解析（resolve），因为它们与父级共享相同的版本。 这意味着，如果 foo@1.0.0 有两个peers依赖（bar@^1 和 baz@^1），那么它可能在一个项目中有多个不同的依赖项集合。

```text
- foo-parent-1
  - bar@1.0.0
  - baz@1.0.0
  - foo@1.0.0
- foo-parent-2
  - bar@1.0.0
  - baz@1.1.0
  - foo@1.0.0
  ```

## yarn_v2

### 约束

约束是对所有的工作区中自动执行某种规则，通过在项目（存储库）的根目录添加constraints.pro文件来创建约束

Prolog是一个基于事实的引擎。它以一个总是为真的事实列表和一个基本上读作“如果f(X)和u(X)都为真，则谓词v(X)为真”的谓词列表开始。通过计算u(X)和v(X)哪些X的值为真，Prolog能够自动计算f(X)为真的值列表

### PnP

#### 使用node_modules存在的问题

1. node_modules目录通常包含大量的文件，在有缓存的情况下也非常的耗时

2. node_modules生成是一个I/O繁重的操作，即使它可以在可能的情况下使用硬链接或写时复制，它仍然需要在操作磁盘之前进行一系列系统调用来区分文件系统的当前状态。

3. Node解析也必须进行一系列stat和readdir调用，以确定从哪里加载每个所需的文件。

4. node_modules文件夹的设计是不切实际的，因为它不允许包管理器正确地删除重复的包。

yarn通过pnp来管理依赖包和版本，并通知node解释器依赖包在磁盘上的位置，因为yarn已经知道关于依赖树的一起

Yarn生成一个.pnp.cjs文件，而不是通常的包含各种软件包副本的node_modules文件夹。.pnp.cjs文件包含各种映射：一个将包名称和版本链接到它们在磁盘上的位置，另一个将包名称和版本链接到它们的依赖项列表。有了这些查找表，Yarn可以立即告诉Node在哪里找到它需要访问的任何包，只要它们是依赖关系树的一部分，并且只要这个文件在你的环境中加载（

### yarn命令

1. install

安装项目所有依赖

支持的选项：

- --json

将输出格式化为json

- --immutable

如果安装过程中要修改锁文件，使用错误代码终止安装

- --immutable-cache

如果安装过程中要修改高速缓冲文件夹，使用错误代码终止安装

- --refresh-lockfile

安装过程中刷新锁文件的元数据

- --check-cache

总是重新获取包并保证校验和一致

- check-resolutions

验证软件包解析方案是否一致

<br/>

2. add

安装单个包，支持从github进行安装

```bash
yarn add ...
yarn add lodash
yarn add lodash@1.2.3
yarn add lodash@https://github.com/lodash/lodash
```

选项：

- --json

将输出格式化为json

- -E,--exact

不要使用任何semver修饰符

- -T,--tilde

对解析的范围使用~修饰符

- -C,--caret

对解析的范围使用^修饰符

- -D,--dev

添加包作为开发依赖项

- -P,--peer

添加包作为对等依赖项

- -O,--optional

将包添加/升级到可选的常规/对等依赖项

- --prefer-dev

将包添加/升级到开发依赖项

- --cached

重用项目内某个地方已使用的最高版本

<br/>

3. bin

获取项目中可用脚本命令的路径

选项：

- --json

以json的格式输出

<br/>

4. cache clean

删除缓存文件

```bash
yarn cache clean
```

删除本地缓存文件

选项：

- --mirror

删除全局缓存文件

- --all

删除全局和本地缓存文件

<br/>

5. constraints

检查是否满足项目约束

```bash
yarn constraints

 # 自动修复
 yarn constraints --fix
```

query：查询约束事实，将输出所有匹配到给定的prolog查询

```bash
# 列出整个工作区所有依赖项
yarn constraints query 'workspace_has_dependency(_, DependencyName, _, _).'
```

source：打印事实数据库源代码

```bash
yarn constraints source
```

<br/>

6. dedupe

执行重复数据清除

清除所有重复包数据

```bash
yarn dedupe
```

清除特定程序包重复数据

```bash
yarn dedupe <pkg-name>
```

清除特定范围内的包的重复数据

```bash
yarn dedupe @<scope>/*
```

执行重复数据检查，发现重复时退出

```bash
yarn dedupe --check
```

<br/>

7. dlx

将在临时环境中安装软件包，并运行其 二进制脚本（如果包含）。二进制文件将在当前cwd中运行。默认情况下，Yarn将下载名为command的包，但这可以是 通过使用-p,--package标志进行更改，该标志将指示Yarn 仍然运行相同的命令，但来自不同的包

使用create-react-app创建一个新的React应用 ：

```bash
yarn dlx create-react-app ./my-app
```

为单个命令安装多个软件包 ：

```bash
yarn dlx -p typescript -p ts-node ts-node --transpile-only -e "console.log('hello!')"
```

<br/>

8. exec

执行shell命令

<br/>

9. info

查看安装软件包的信息

```bash
yarn info <pkg-name>
```

选项：

- --all,-A

打印整个项目依赖包的版本

- --recursive，-R

递归打印所有依赖的包信息

- --cache

打印包的缓存信息

<br/>

10. init

初始化工作区

选项：

- -p,--private

初始化私有包

- -w,--workspace

使用packages/目录初始化工作区根目录

- -i,--install

初始化具有将在项目中锁定的特定捆绑包的包

- -n,--name

初始化具有给定名称的包

<br/>

11. tag

此命令将为包的特定版本向npm注册表添加一个标记。如果标记已经存在，它将被覆盖

添加tag：

```bash
yarn npm tag add my-pkg@2.3.4-beta.4 beta
```

列出所有tag：

```bash
yarn npm tag list <pkg-name>
```

删除tag：

```bash
yarn npm tag remove <pkg-name> <tag>
```

<br/>

12. patch

为包打补丁，用法同npm

<br/>

13. set version

为项目指定yarn的版本

从Yarn存储库下载最新版本 ：

```bash
yarn set version latest
```

从Yarn存储库下载最新的Canary版本 ：

```bash
yarn set version canary
```

从Yarn存储库下载最新的经典版本 ：

```bash
yarn set version classic
```

下载最新的Yarn 3版本 ：

```bash
yarn set version 3.x
```

下载特定的Yarn 2构建 ：

```bash
yarn set version 2.0.0-rc.30
```

切换回特定的Yarn 1版本 ：

```bash
yarn set version 1.22.1
```

使用本地文件系统的版本 ：

```bash
yarn set version ./yarn.cjs
```

使用来自URL的发布 ：

```bash
yarn set version <https://repo.yarnpkg.com/3.1.0/packages/yarnpkg-cli/bin/yarn.js>
```

下载用于调用命令的版本 ：

```bash
yarn set version self
```

<br/>

14. up

升级所有工作区的包

<br/>

15. workspace

在指定工作区执行命令

```bash
yarn workspace <workspace-name> <command>
```

列出所有工作区

```bash
yarn workspaces list
```

指定工作区安装依赖

```bash
yarn workspace focus ...
```

在每个工作区执行命令

```bash
yarn workspace foreach <command>
```

### .yarnrc.yml

Yarnrc文件（这样命名是因为它们必须被称为.yarnrc.yml）是一个可以配置Yarn内部设置的地方。虽然Yarn会自动在父目录中找到它们，但它们通常应该保存在项目的根目录中（通常是存储库）。从v2开始，它们必须用有效的Yaml编写，并具有正确的扩展名（简单地调用文件.yarnrc是不行的）。

环境变量可以通过在定义值时使用${NAME}语法从设置定义中访问。默认情况下，Yarn将要求变量存在，但这可以通过使用${NAME-fallback}（如果没有设置fallback，则返回NAME）或${NAME:-fallback}（如果没有设置fallback，则返回NAME，或者是空字符串）来关闭。

最后，请注意，大多数设置也可以通过环境变量来定义（至少对于较简单的设置;目前还不支持数组和对象）。要做到这一点，只需在名称前面加上前缀，并将其写入snake case：YARN_CACHE_FOLDER将设置该高速缓存文件夹（这些值将覆盖RC文件中可能定义的任何内容-请谨慎使用）

#### cacheFolder

cacheFolder: "./.yarn/cache"

下载的软件包在系统上的存储路径。它们将被规范化、压缩，并以具有标准化名称的zip存档的形式保存。该高速缓存被认为是由多个项目共享的相对安全的，即使多个Yarn实例在不同的项目上同时运行

#### compressionLevel

compressionLevel: "mixed"

压缩级别，0表示“无压缩，速度更快”，9表示“重度压缩，速度更慢”

#### defaultSemverRangePrefix

defaultSemverRangePrefix: "^"

语义版本依赖项范围的默认前缀，用于安装到清单的新依赖项。可能的值为"^"（默认值）、"~"或""

#### enableGlobalCache

enableGlobalCache: false

如果为true，Yarn将忽略cacheFolder设置，并将该高速缓存文件存储到共享相同配置的所有本地项目共享的文件夹中

#### enableImmutableCache

enableImmutableCache: false

如果为true，Yarn将在运行yarn install时拒绝以任何方式更改该高速缓存（无论是添加文件还是删除文件）

#### enableMirror

enableMirror: true

如果为true（默认值），Yarn将使用全局文件夹作为网络和实际缓存之间的间接连接。这使得那些还没有从零安装中受益的项目的安装速度更快

#### enableNetwork

enableNetwork: true

如果为false，Yarn将永远不会自己向网络发出任何请求，并且将抛出异常。对于CI来说，这是一个非常有用的设置，CI通常希望确保它们不会错误地从网络加载依赖项

#### globalFolder

globalFolder: "./.yarn/global"

存储所有系统全局文件的路径

#### installStatePath

installStatePath: “./. yarn/install-state.gz”

将保存安装状态的文件的路径

#### lockfileFilename

lockfileFilename: "yarn.lock"
定义将由Yarn生成的锁文件的名称

#### NodeLinker

NodeLinker: “pnp”

定义应该使用哪个链接器来安装Node包（用于启用node-modules插件），其中之一：pnp、pnpm和node-modules

### 安装过程

#### 解析

1. 加载存储在lockfile中的条目，然后根据这些数据和项目的当前状态（package.json），运行一个内部核心算法来找出缺少的条目

2. 对于这些缺失的条目中的每一个，它使用查询插件Resolver接口，询问它们是否知道与给定描述符（supportsDescriptor）及其确切标识（getCandidates）和传递依赖列表（resolve）匹配的包。

3. 一旦获得了包元数据的新列表，核心就开始对新添加的包的传递依赖性进行新的解析传递。这将重复进行，直到它发现依赖关系树中的所有包现在都将其元数据存储在锁文件中。

4. 一旦依赖关系树中的每个包范围都被解析为元数据，内核就在内存中最后一次构建树，以生成我们所说的“虚拟包”。简而言之，这些虚拟包是同一个基本包的拆分实例--我们使用它们来消除所有列出对等依赖关系的包的歧义，这些包的依赖关系集会根据它们在依赖关系树中的位置而变化（请参阅本词典条目以获取更多信息）。

#### fetch

有了组成依赖关系树的确切的包集，我们迭代它，并为每个启动一个新的缓存请求，以了解是否可以找到该包。如果不是，我们就像我们在上一步中所做的那样，我们询问我们的插件（通过Fetcher接口）他们是否知道这个包（supports），如果是，就从它的远程位置检索它（fetch）。

#### 链接

使用的软件包必须以某种方式安装在磁盘上。例如，对于原生Node应用程序，您的包必须安装到一组node_modules目录中，以便解释器可以定位它们。这就是链接器的作用。通过Linker和Installer接口，Yarn核心将与注册的插件进行通信，让它们知道依赖关系树中列出的包，并描述它们的关系（例如，它会告诉它们tapable是webpack的依赖关系）。然后，插件可以决定以他们认为合适的任何方式对这些信息做什么。

## npm/pnpm/yarn比较

|功能 |pnpm |Yarn| npm|
|----|----|----|----|
|工作空间支持（monorepo）| ✔️ |✔️| ✔️|
|隔离的node_modules |✔️ - 默认| ✔️ |✔️|
|提升的node_modules| ✔️| ✔️| ✔️ - 默认|
|自动安装peers| ✔️| ❌| ✔️|
|Plug'n'Play |✔️| ✔️ - 默认| ❌|
|零安装| ❌ |✔️ |❌|
|修补依赖项| ✔️ |✔️ |❌|
|管理Node.js 版本| ✔️ |❌| ❌|
|有锁文件| ✔️ - pnpm-lock.yaml| ✔️ - yarn.lock| ✔️ - package-lock.json|
|支持覆盖 |✔️| ✔️ - 通过 resolutions| ✔️|
|内容可寻址存储| ✔️ |❌| ❌|
|动态包执行| ✔️-通过pnpm dlx |✔️-通过yarn dlx |✔️-通过npx|
|Side-effects cache |✔️ |❌ |❌|
|Listing licenses| ✔️-Via pnpm licenses list| ✔️-Via a plugin |❌|

<br/>

1. 空间占用

不管是使用npm或者是yarn，安装依赖时一般是下载该依赖的tar包到本地离线镜像，然后解压到本地缓存，最后再将其拷贝到项目的node_modules中，所以多个项目依赖同一个版本的包，那么这个包就是在硬盘上存在多份，而pnpm安装依赖时，依赖包会被存放在统一的位置（store），然后使用该依赖的项目会硬链接对应的依赖位置

<br/>

2. node_module结构

pnpm项目根目录下的node_modules文件夹下的各个依赖文件夹都是软链接，而 .pnpm 文件夹下有所有依赖的扁平化结构，以依赖名加版本号命名目录名，其目录下的node_modules下有个相同依赖名的目录，是硬链接，除了相同依赖名的目录，如果该依赖还有其他的依赖，也会展示在同级下，是软链接，它们的真正位置也是扁平在.pnpm项目下的对应位置的硬链接，npm和yarn都使用了扁平结构处理，避免了相同版本包的重复安装，在安装依赖包时，npm/yarn会对所有依赖先进行一次排序

<br/>

3. 安全性

由于npm和yarn的扁平化处理，会出现幽灵依赖的问题，即并没有在清单中声明但是项目中可以引用
