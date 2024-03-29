# 程序包基础

## Stage模型应用程序包结构

在开发态，一个应用包含一个或者多个Module。

Module是HarmonyOS应用/服务的基本功能单元，包含了`源代码`、`资源文件`、`第三方库及应用`和`服务配置文件`，每一个Module都可以独立进行编译和运行。

Module分为`Ability`和`Library`两种类型，“Ability”类型的Module对应于编译后的`HAP（Harmony Ability Package）`；“Library”类型的Module对应于`HAR（Harmony Archive）`，或者`HSP（Harmony Shared Package）`。

HAP是HarmonyOS应用安装的基本单位，包含了编译后的代码、资源、三方库及配置文件。HAP可分为Entry和Feature两种类型。

- Entry类型的HAP：是应用的`主模块`，在`module.json5`配置文件中的type标签配置为`entry`类型。在同一个应用中，同一设备类型只支持一个Entry类型的HAP，通常用于实现应用的入口界面、入口图标、主特性功能等。
- Feature类型的HAP：是应用的`动态特性模块`，在`module.json5`配置文件中的type标签配置为`feature`类型。一个应用程序包可以包含一个或多个Feature类型的HAP，也可以不包含；Feature类型的HAP通常用于实现应用的特性功能，可以配置成按需下载安装，也可以配置成随Entry类型的HAP一起下载安装。

每个HarmonyOS应用可以包含多个.hap文件，一个应用中的.hap文件合在一起称为一个`Bundle`，而bundleName就是应用的唯一标识。需要特别说明的是：在应用上架到应用市场时，需要把应用包含的所有.hap文件（即Bundle）打包为一个`.app`后缀的文件用于上架，这个.app文件称为`App Pack（Application Package）`，其中同时包含了描述App Pack属性的`pack.info`文件；在云端（服务器）分发和终端设备安装时，都是以`HAP`为单位进行分发和安装的

因此，应用程序基于stage模型的包结构如下

<img src="../images/app.png"/>

## 多HAP构建视图

<img src="../images/build.png"/>

**IDE开发态视图**

- AppScope目录

1. app.json5：配置应用全局描述信息，例如应用包名、版本号、应用图标、应用名称和依赖的SDK版本号等。
2. resources目录：放置应用的图标资源和应用名称字符串资源。

> 说明：该目录由IDE自动生成，名称不可更改。AppScope目录下面的文件名与Entry、Feature模块下面的文件名不能重复，否则IDE会报错。

- entry或者feature目录

1. resources目录：放置该Module中所使用到的资源。
2. ets目录：开发者的业务逻辑。
4. module.json5：配置该Module的描述信息，如：Module的名称、Module的入口代码路径、包含的组件信息等。

**编译打包后的视图**

一个开发态的Module编译后生成一个部署态的HAP，Module和HAP一一对应。

HAP中的module.json由开发视图中的app.json5和module.json5合成。

所有的HAP最终会编译到一个App Pack中（以.app为后缀的包文件），用于发布到应用市场。

## 共享包

OpenHarmony提供了两种共享包，`HAR（Harmony Archive）`静态共享包，和`HSP（Harmony Shared Package）`动态共享包。

HAR与HSP都是为了实现代码和资源的共享，都可以包含代码、C++库、资源和配置文件

HAR中的代码和资源跟随使用方编译，如果有多个使用方，它们的编译产物中会存在多份相同拷贝；而HSP中的代码和资源可以独立编译，运行时在一个进程中代码也只会存在一份

### HAR

HAR（Harmony Archive）是静态共享包，可以包含代码、C++库、资源和配置文件。通过HAR可以实现多个模块或多个工程共享`ArkUI组件`、`资源`等相关代码。HAR不同于HAP，`不能独立安装运行在设备上`，只能作为应用模块的依赖项被引用

**1. 创建HAR模块**

HAR模块默认不开启混淆能力，开启混淆能力，需要把HAR模块的build-profile.json5文件中的artifactType字段设置为obfuscation

- 鼠标移到工程目录顶部，单击右键，选择New > Module，在工程中添加模块
- 在Choose Your Ability Template界面中，选择`Static Library`，并单击Next
- 在Configure New Module界面中，设置新添加的模块信息，设置完成后，单击Finish完成创建

**2. 导出组件、接口、资源**

index.ets文件是HAR导出声明文件的入口，HAR需要导出的接口，统一在index.ets文件中导出。index.ets文件是DevEco Studio默认自动生成的，用户也可以自定义，在模块的oh-package.json5文件中的main字段配置入口声明文件

```json
{
  "main": "index.ets"
}
```

导出UI组件

```js
// library/src/main/ets/components/MainPage/MainPage.ets
@Component
export struct MainPage {
  @State message: string = 'Hello World'
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}

// library/index.ets
export { MainPage } from './src/main/ets/components/MainPage/MainPage'
```

导出接口

```js
// library/src/main/ts/test.ets
export class Log {
    static info(msg) {
        console.info(msg);
    }
}

export function func() {
  return "har func";
}

export function func2() {
  return "har func2";
}

// library/index.ets
export { Log } from './src/main/ts/test'
export { func } from './src/main/ts/test'
export { func2 } from './src/main/ts/test'
```

导出资源

HAR模块编译打包时会把资源打包到HAR中。在编译构建HAP时，DevEco Studio会从HAP模块及依赖的模块中收集资源文件，如果不同模块下的资源文件出现重名冲突时，DevEco Studio会按照以下优先级进行覆盖（优先级由高到低）：

- AppScope（仅API9的Stage模型支持）。
- HAP包自身模块。
- 依赖的HAR模块，如果依赖的多个HAR之间有资源冲突，会按照依赖顺序进行覆盖（依赖顺序在前的优先级较高

**3. 编译HAR模块**

开发完库模块后，选中模块名，然后通过DevEco Studio菜单栏的Build > Make Module ${libraryName}进行编译构建，编译构建的HAR可在模块下的build目录下获取，包格式为*.har

> 在编译构建HAR的过程中，不会将模块中的C++代码直接打包进.har文件中，而是将C++代码编译成动态依赖库.so文件放置在.har文件中的libs目录下。在编译构建HAR的过程中，会生成资源文件ResourceTable.txt，以便编辑器可以对HAR中的资源文件进行联想。因此，如果不使用DevEco Studio对HAR进行构建，则DevEco Studio的编辑器会无法联想HAR中的资源

**4. 发布HAR模块**

- 在库模块中（与src文件夹同一级目录下），添加如下文件：

a). 新建README.md文件：在README.md文件中必须包含包的介绍和引用方式，还可以根据包的内容添加更详细介绍。

b). 新建CHANGELOG.md文件：填写HAR的版本更新记录。

c). 添加LICENSE文件：LICENSE许可文件。

- 重新编译库模块，生成*.har文件。
- 利用工具ssh-keygen生成公、私钥，可执行以下命令：

```bash
# OHPM包管理器只支持加密密钥认证，请在生成公私钥时输入密码
ssh-keygen -m PEM -t RSA -b 4096 -f your_key_path
```

- 登录OpenHarmony三方库中心仓官网，单击主页右上角的个人中心，新增OHPM公钥，将公钥文件（your_publicKey.pub）的内容粘贴到公钥输入框中。
- 打开命令行工具，执行如下命令设置私钥路径。

```bash
ohpm config set key_path your_key_path
```

- 登录OpenHarmony三方库中心仓，单击主页右上角的个人中心，复制发布码，获取发布码并配置到 .ohpmrc 文件中，可执行如下命令：

```bash
ohpm config set publish_id your_publish_id
```

- 执行如下命令发布HAR，<HAR路径>需指定为.har文件的具体路径

```bash
ohpm publish <HAR路径>
```

**5. 引用HAR**

- 引用ohpm仓中的HAR

a）设置仓库地址

```bash
ohpm config set registry your_registry1,your_registry2
```

b）执行安装命令

```bash
ohpm install @ohos/lottie
```

- 引用本地文件夹

在Terminal窗口中，执行如下命令进行安装，并会在oh-package.json5中自动添加依赖

```bash
ohpm install ../folder
```

- 引用本地HAR
在Terminal窗口中，执行如下命令进行安装，并会在oh-package.json5中自动添加依赖

```bash
ohpm install ./package.har
```

> 以上三种方式均可以先在oh-package.json5中配置然后执行ohpm install完成

**6. 引用HAR中的组件、接口、资源**

- 引用组件

```js
// entry/src/main/ets/pages/index.ets
import { MainPage } from "@ohos/library"

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  build() {
    Row() {
      // 引用HAR的ArkUI组件
      MainPage()
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

- 引用接口

```js
// entry/src/main/ets/pages/index.ets
import { Log } from "@ohos/library"
import { func } from "@ohos/library"

@Entry
@Component
struct Index {
  build() {
    Row() {
      Column() {
        Button('Button')
          .onClick(()=>{
            // 引用HAR的类和方法
            Log.info("har msg");
            func();
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

- 引用资源

```js
// entry/src/main/ets/pages/index.ets
@Entry
@Component
struct Index {
  build() {
    Row() {
      Column() {
        // 引用HAR的字符串资源
        Text($r("app.string.hello_har"))
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        // 引用HAR的图片资源
        Image($r("app.media.icon_har"))
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

### HSP

**1. 创建HSP模块**

- 鼠标移到工程目录顶部，单击鼠标右键，选择New > Module，开始创建新的Module
- 模板类型选择Shared Library，点击Next
- 在Configure New Module界面中，设置新添加的模块信息，设置完成后，单击Finish完成创建

**2. 导出**

导出同HAR导出

**3. 编译模块**

编译同HAR编译，但同时会编译出har和hsp两种包

**4. 引入**

在使用方entry/feature模块的oh-package.json5文件中添加HSP模块引用

```js
{
  ...
  "dependencies": {
    "sharedlibrary": "file:../sharedlibrary"
  }
}
```

将鼠标放置在报错处会出现提示，在提示框中点击Run 'ohpm install'

> 在HSP中，通过如$r(app.string.xxxx)的方式使用本模块resources目录下的资源。如果使用相对路径的方式，例如： 在HSP模块中使用Image("common/example.png")，实际上该Image组件访问的是HSP调用方（如entry）下的资源entry/src/main/ets/common/example.png。
>
## 资源访问

应用开发过程中，有两种资源：

- 应用资源：借助资源文件能力，开发者在应用中自定义资源，自行管理这些资源在不同的设备或配置中的表现。

- 系统资源：开发者直接使用系统预置的资源定义（即分层参数，同一资源ID在设备类型、深浅色等不同配置下有不同的取值）。

### resources目录

应用开发中使用的各类资源文件，需要放入特定子目录中存储管理。resources目录包括三大类目录，一类为base目录，一类为限定词目录，还有一类为rawfile目录。stage模型多工程情况下共有的资源文件放到AppScope下的resources目录。

- base目录

默认存在，应用使用某资源时，系统会根据当前设备状态优先从相匹配的限定词目录中寻找该资源。只有当resources目录中没有与设备状态匹配的限定词目录，或者在限定词目录中找不到该资源时，才会去base目录中查找

- 限定词目录

需要开发者自行创建，可以由一个或多个表征应用场景或设备特征的限定词组合而成，包括移动国家码和移动网络码、语言、文字、国家或地区、横竖屏、设备类型、颜色模式和屏幕密度等维度，限定词之间通过下划线（_）或者中划线（-）连接

- rawfile目录

原始文件目录，不会根据设备状态去匹配不同的资源，目录中的资源文件会被直接打包进应用，不经过编译，也不会被赋予资源文件ID，通过指定文件路径和文件名来引用

### 资源组目录

base目录与限定词目录下面可以创建资源组目录（包括element、media、profile），用于存放特定类型的资源文件，详见资源组目录说明

- element

表示元素资源，以下每一类数据都采用相应的JSON文件来表征（目录下只支持文件类型）。element目录中的文件名称建议与下面的文件名保持一致。每个文件中只能包含同一类型数据。

boolean.json、color.json、float.json、intarray.json、integer.json、pattern.json、plural.json、strarray.json、string.json

- media

表示媒体资源，包括图片、音频、视频等非文本格式的文件（目录下只支持文件类型）。文件名可自定义，例如：icon.png。

- profile

表示自定义配置文件，其文件内容可通过包管理接口获取（目录下只支持文件类型）。文件名可自定义，例如：test_profile.json。

### 访问应用资源

在工程中，通过"$r('app.type.name')"的形式引用应用资源。app代表是应用内resources目录中定义的资源；type代表资源类型（或资源的存放位置），可以取“color”、“float”、“string”、“plural”、“media”，name代表资源命名，由开发者定义资源时确定。

引用rawfile下资源时使用"$rawfile('filename')"的形式，filename需要表示为rawfile目录下的文件相对路径，文件名需要包含后缀，路径开头不可以以"/"开头。

访问rawfile文件的descriptor时，可使用资源管理getRawFd接口，其返回值descriptor.fd为hap包的fd，访问此rawfile文件需要结合{fd, offset, length}一起使用

### 访问系统资源

开发者可以通过“$r('sys.type.resource_id')”的形式引用系统资源。sys代表是系统资源；type代表资源类型，可以取“color”、“float”、“string”、“media”；resource_id代表资源id
