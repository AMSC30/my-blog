# 前端包管理工具

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

npmrc配置生效的优先级如下

1. 每个项目的配置文件（/path/to/my/project/.npmrc）
2. 每用户配置文件（默认为$HOME/.npmrc;可通过CLI选项--userconfig或环境变量配置$NPM_CONFIG_USERCONFIG）
3. 全局配置文件（默认为$PREFIX/etc/npmrc;可通过CLI选项--globalconfig或环境变量配置$NPM_CONFIG_GLOBALCONFIG）
4. npm 的内置配置文件（/path/to/npm/npmrc）

获取配置文件信息

```bash
npm config ls -l
```

修改配置文件

```bash
npm config set <key> <value> [-g|--global]
npm config get <key>
npm config delete <key>
npm config list [-l] [--json]
npm config edit
npm get <key>
npm set <key> <value> [-g|--global]
```

#### 日志文件

所有日志都将写入调试日志，如果命令执行失败，将会打印日志文件路径

logs目录的默认位置是npm缓存中名为_logs的目录。这可以通过logs-dir配置选项进行更改，如果目录不存在将会创建

- 指定日志路径

```bash
npm <command> --logs-dir=c
```

- 指定日志数量

当日志文件数量超过`logs-max`时，将从`logs-dir`中删除日志文件，最旧的日志将首先被删除

```bash
npm <command> --logs-max=1
```

### 用户操作

#### 登录

```bash
npm login
```

#### 查看当前注册表登录用户

```bash
npm whoami
```

#### 配置用户信息

```bash
npm profile get
```

#### 设置用户信息

```bash
npm profile set <prop> <value>
```

#### 添加用户

在注册表中创建一个新用户，并将凭据保存到.npmrc文件，如果未指定注册表，则使用默认注册表

```bash
npm adduser
```

### npm包操作

#### 安装包

安装包的来源可以是npm官方的注册表、本地包、git仓库中的包，使用npm官方注册表中的包，可以对包指定范围，因此使用install命令安装包是可能会存在以下情况

npm注册表中的包：

```text
[<@scope>/]<pkg>
[<@scope>/]<pkg>@<tag>
[<@scope>/]<pkg>@<version>
[<@scope>/]<pkg>@<version range>
```

本地包：

```text
./my-package
/opt/npm/my-package
```

git仓库的包:

```text
https://github.com/npm/cli.git
git@github.com:npm/cli.git
git+ssh://git@github.com/npm/cli#v6.0.0
github:npm/cli#HEAD
npm/cli#c12ea07
```

- 本地安装

```bash
npm install <package>
```

- 全局安装

```bash
npm install -g <package>
```

- 安装为开发依赖

```bash
npm install --save-dev <package>
```

- 安装为生产依赖

```bash
npm install --save-prod <package>
```

如果本地package.js中没有安装包的信息，默认安装最新版本，否则按照package.js中版本规则进行安装

- npm ci

Npm ci的功能类似于npm install，但是前者更快更严格，常用于生产环境的持续集成，使用npm ci安装依赖，有以下几个特点

1. 缓存优先
2. 必须存在package-lock.json
3. 自动删除node_modules

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
npm version <version_number>
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

### 常用功能

#### 访问-access

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

#### 缓存

清除缓存

```bash
npm cache clean --force
```

- 打开包文档

```bash
npm docs <package>
```

- 链接

```bash
npm link <package>
```

- Ping注册表

```bash
npm ping [--registry <registry>]
```

- 本地前缀

```bash
npm prefix [-g]
```

- git仓库

```bash
npm repo [<pkg>]
```

> 此命令尝试猜测指定包的源码仓库的 URL ，然后再使用 --browser 配置参数打开它。 如果没有提供包名称，它将在当前文件夹中搜索package.json 文件， 并使用其 name 属性的值

- 搜索与查看

```bash
npm search <pkg-keyword>

npm view <pkg>
```

### npx与npm

npx：npx 是一个本地或远程命令执行器，用于调用项目内部模块，执行时会在当前目录和全局安装目录寻找安装的可执行文件，同时如果执行命令的依赖包没有安装到局部和全局，npx会将依赖包下载安装到一个临时目录，在使用完成后对依赖包进行删除

- --no-install：强制使用本地模块，如果项目目录和全局都不存在，将报错
- --ignore-exist：忽略本地已有的模块

### instal过程

- 第一版：嵌套结构
npm按package中的定义顺序递归的安装依赖包

问题：

1. 导致层级过深，路径长度不符合操作系统
2. 重复安装

- 第二版：扁平结构（3.x版本开始）
npm按package中的定义顺序安装包，如果node_modules下不存在，则安装在其下方，如果存在同时符合版本范围，忽略安装，如果存在但是不符合版本范围，安装在依赖包的node_modules下--包的版本受package中定义得顺序

问题：

1. 没有解决依赖包冗余的问题
2. 项目中可以使用不存在package.json中的依赖包

- 第三版：lock文件（5.x版本开始）
npm使用lock，依然使用扁平结构，lock文件的结构和项目node_modules安装包的结构一一对应，在第一次安装包时，会根据lock文件进行安装，保证了lock文件与node_modules的结构相同，同时提升安装速度

问题 ：
项目中可以使用不存在package.json中的依赖

## pnpm

依赖存储方式
pnpm将依赖包统一存储在硬盘上的一个位置，项目中安装依赖的时候会将使用的包硬链接到这个位置
pnpm不会对相同包的不同版本分别处理，只会存储相同依赖包的不同文件
