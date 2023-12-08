# 开发

## 模型概述

<img src="../images/develop-model.png"/>

## stage模型

### UIAbility

UIAbility组件是一种包含UI界面的应用组件，主要用于和用户交互。是系统调度的基本单元，为应用提供绘制界面的窗口

一个UIAbility组件中可以通过多个页面来实现一个功能模块。每一个UIAbility组件实例，都对应于一个最近任务列表中的任务

#### 生命周期

UIAbility的生命周期包括Create、Foreground、Background、Destroy四个状态，UIAbility类提供了一系列回调，通过这些回调可以知道当前UIAbility实例的某个状态发生改变

状态如下：

<img src="../images/UIAbility-lifecycle.png"/>

1. Create状态

Create状态为在应用加载过程中，UIAbility实例创建完成时触发，系统会调用onCreate()回调。可以在该回调中进行应用初始化操作，例如变量定义资源加载等，用于后续的UI界面展示

<br/>

2. WindowStageCreate状态

UIAbility实例创建完成之后，在进入Foreground之前，系统会创建一个WindowStage。WindowStage创建完成后会进入onWindowStageCreate()回调，可以在该回调中设置UI界面加载、设置WindowStage的事件订阅

在onWindowStageCreate()回调中通过loadContent()方法设置应用要加载的页面并根据需要订阅WindowStage的事件（获焦/失焦、可见/不可见）

<br/>

3. Foreground和Background状态

Foreground和Background状态分别在UIAbility实例切换至前台和切换至后台时触发，对应于onForeground()回调和onBackground()回调。

onForeground()回调，在UIAbility的UI界面可见之前，如UIAbility切换至前台时触发。可以在onForeground()回调中申请系统需要的资源，或者重新申请在onBackground()中释放的资源。

onBackground()回调，在UIAbility的UI界面完全不可见之后，如UIAbility切换至后台时候触发。可以在onBackground()回调中释放UI界面不可见时无用的资源，或者在此回调中执行较为耗时的操作，例如状态保存等

<br/>

4. WindowStageDestroy状态

在UIAbility实例销毁之前，则会先进入onWindowStageDestroy()回调，可以在该回调中释放UI界面资源

<br/>

5. Destroy状态

Destroy状态在UIAbility实例销毁时触发。可以在onDestroy()回调中进行系统资源的释放、数据的保存等操作

#### 启动模式

1. singleton模式

singleton启动模式为单实例模式，也是默认情况下的启动模式。

每次调用startAbility()方法时，如果应用进程中该类型的UIAbility实例已经存在，则复用系统中的UIAbility实例。系统中只存在唯一一个该UIAbility实例，即在最近任务列表中只存在一个该类型的UIAbility实例

如果需要使用singleton启动模式，在module.json5配置文件中的"launchType"字段配置为"singleton"即可

<br/>

2. standard模式

standard启动模式为标准实例模式，每次调用startAbility()方法时，都会在应用进程中创建一个新的该类型UIAbility实例。即在最近任务列表中可以看到有多个该类型的UIAbility实例

standard启动模式的开发使用，在module.json5配置文件中的"launchType"字段配置为"standard"即可

<br/>

3. specified模式

specified启动模式为指定实例模式，针对一些特殊场景使用（例如文档应用中每次新建文档希望都能新建一个文档实例，重复打开一个已保存的文档希望打开的都是同一个文档实例）。

在UIAbility实例创建之前，允许开发者为该实例创建一个唯一的字符串Key，创建的UIAbility实例绑定Key之后，后续每次调用startAbility()方法时，都会询问应用使用哪个Key对应的UIAbility实例来响应startAbility()请求。运行时由UIAbility内部业务决定是否创建多实例，如果匹配有该UIAbility实例的Key，则直接拉起与之绑定的UIAbility实例，否则创建一个新的UIAbility实例

#### 基本用法

1. 指定启动页面

应用中的UIAbility在启动过程中，需要指定启动页面，否则应用启动后会因为没有默认加载页面而导致白屏。可以在UIAbility的onWindowStageCreate()生命周期回调中，通过WindowStage对象的loadContent()方法设置启动页面

```js
import UIAbility from '@ohos.app.ability.UIAbility';
import Window from '@ohos.window';

export default class EntryAbility extends UIAbility {
    onWindowStageCreate(windowStage: Window.WindowStage) {
        // Main window is created, set main page for this ability
        windowStage.loadContent('pages/Index', (err, data) => {
            // ...
        });
    }

    // ...
}
```

<br/>

2. 获取上下文信息

UIAbility类拥有自身的上下文信息，该信息为UIAbilityContext类的实例，UIAbilityContext类拥有abilityInfo、currentHapModuleInfo等属性。通过UIAbilityContext可以获取UIAbility的相关配置信息，如包代码路径、Bundle名称、Ability名称和应用程序需要的环境状态等属性信息，以及可以获取操作UIAbility实例的方法（如startAbility()、connectServiceExtensionAbility()、terminateSelf()等）

在UIAbility中可以通过`this.context`获取UIAbility实例的上下文信息

在页面中通过`getContext(this)`获取UIAbility实例的上下文信息，包括导入依赖资源context模块和在组件中定义一个context变量两个部分

#### UIAbility组件与UI的数据同步

1. 使用EventHub进行数据通信

以使用EventHub实现UIAbility与UI之间的数据通信为例，基类Context提供了EventHub对象

- 在UIAbility中调用eventHub.on()方法注册一个自定义事件“event1”

```js
import UIAbility from '@ohos.app.ability.UIAbility';

const TAG: string = '[Example].[Entry].[EntryAbility]';

export default class EntryAbility extends UIAbility {
    func1(...data) {
        // 触发事件，完成相应的业务操作
        console.info(TAG, '1. ' + JSON.stringify(data));
    }

    onCreate(want, launch) {
        // 获取eventHub
        let eventhub = this.context.eventHub;
        // 执行订阅操作
        eventhub.on('event1', this.func1);
        eventhub.on('event1', (...data) => {
            // 触发事件，完成相应的业务操作
            console.info(TAG, '2. ' + JSON.stringify(data));
        });
    }
}
```

- 在UI界面中通过eventHub.emit()方法触发该事件，在触发事件的同时，根据需要传入参数信息

```js
import common from '@ohos.app.ability.common';

@Entry
@Component
struct Index {
  private context = getContext(this) as common.UIAbilityContext;

  eventHubFunc() {
    // 不带参数触发自定义“event1”事件
    this.context.eventHub.emit('event1');
    // 带1个参数触发自定义“event1”事件
    this.context.eventHub.emit('event1', 1);
    // 带2个参数触发自定义“event1”事件
    this.context.eventHub.emit('event1', 2, 'test');
    // 开发者可以根据实际的业务场景设计事件传递的参数
  }

  // 页面展示
  build() {
    // ...
  }
}
```

- 在自定义事件“event1”使用完成后，可以根据需要调用eventHub.off()方法取消该事件的订阅。

```js
// context为UIAbility实例的AbilityContext
this.context.eventHub.off('event1');
```

<br/>

2. 使用globalThis进行数据同步

globalThis是ArkTS引擎实例内部的一个全局对象，引擎内部的UIAbility/ExtensionAbility/Page都可以使用，因此可以使用globalThis全局对象进行数据同步

#### UIAbility组件间交互

1. 启动应用内的UIAbility

- 在AAbility中通过context的startAbility方法启用BAbility，并将want参数传递过去
- 在BAbility的onCreate生命周期回调接收到want参数
- 完成业务后(如支付)，调用BAbility的context的terminateSelf方法关闭当前UIAbility实例

<br/>

2. 启动应用内的UIAbility并获取返回结果

- 调用startAbilityForResult()方法启动UIAbility，want为UIAbility实例启动的入口参数
- 在BAbility中调用terminateSelfWithResult()方法，入参abilityResult为BAbility需要返回给AAbility的信息
- AAbility通过startAbilityForResult的回调函数接收结果

<br/>

3. 启动其他应用的UIAbility

启动UIAbility有显式Want启动和隐式Want启动两种方式，推荐使用隐式Want启动。

显式Want启动：启动一个确定应用的UIAbility，在want参数中需要设置该应用bundleName和abilityName，当需要拉起某个明确的UIAbility时，通常使用显式Want启动方式。

隐式Want启动：根据匹配条件由用户选择启动哪一个UIAbility，即不明确指出要启动哪一个UIAbility（abilityName参数未设置），在调用startAbility()方法时，其入参want中指定了一系列的entities字段（表示目标UIAbility额外的类别信息，如浏览器、视频播放器）和actions字段（表示要执行的通用操作，如查看、分享、应用详情等）等参数信息，然后由系统去分析want，并帮助找到合适的UIAbility来启动。当需要拉起其他应用的UIAbility时，开发者通常不知道用户设备中应用的安装情况，也无法确定目标应用的bundleName和abilityName，通常使用隐式Want启动方式

在其对应UIAbility的module.json5配置文件中

```json
{
  "module": {
    "abilities": [
      {
        // ...
        "skills": [
          {
            "entities": [
              // ...
              "entity.system.default"
            ],
            "actions": [
              // ...
              "ohos.want.action.viewData"
            ]
          }
        ]
      }
    ]
  }
}
```

在调用方want参数中的entities和action需要被包含在待匹配UIAbility的skills配置的entities和actions中。系统匹配到符合entities和actions参数条件的UIAbility后，会弹出选择框展示匹配到的UIAbility实例列表供用户选择使用

```js
let wantInfo = {
    deviceId: '', // deviceId为空表示本设备
    // uncomment line below if wish to implicitly query only in the specific bundle.
    // bundleName: 'com.example.myapplication',
    action: 'ohos.want.action.viewData',
    // entities can be omitted.
    entities: ['entity.system.default'],
}

// context为调用方UIAbility的AbilityContext
this.context.startAbility(wantInfo).then(() => {
    // ...
}).catch((err) => {
    // ...
})
```

在文档应用使用完成之后，如需要停止当前UIAbility实例，通过调用terminateSelf()方法实现

<br/>

4. 启动其他应用的UIAbility并获取返回结果

当使用隐式Want启动其他应用的UIAbility并希望获取返回结果时，调用方需要使用startAbilityForResult()方法启动目标UIAbility

<br/>

5. UIAbility指定启动页面

调用方UIAbility启动另外一个UIAbility时，通常需要跳转到指定的页面。例如FuncAbility包含两个页面（Index对应首页，Second对应功能A页面），此时需要在传入的want参数中配置指定的页面路径信息，可以通过want中的parameters参数增加一个自定义参数传递页面跳转信息

- 目标UIAbility首次启动时，在目标UIAbility的onWindowStageCreate()生命周期回调中，解析EntryAbility传递过来的want参数，获取到需要加载的页面信息url，传入windowStage.loadContent()方法

```js
import UIAbility from '@ohos.app.ability.UIAbility'
import Window from '@ohos.window'

export default class FuncAbility extends UIAbility {
    funcAbilityWant;

    onCreate(want, launchParam) {
        // 接收调用方UIAbility传过来的参数
        this.funcAbilityWant = want;
    }

    onWindowStageCreate(windowStage: Window.WindowStage) {
        // Main window is created, set main page for this ability
        let url = 'pages/Index';
        if (this.funcAbilityWant?.parameters?.router) {
            if (this.funcAbilityWant.parameters.router === 'funA') {
                url = 'pages/Second';
            }
        }
        windowStage.loadContent(url, (err, data) => {
            // ...
        });
    }
}
```

- 当应用A的UIAbility实例已创建，并且处于该UIAbility实例对应的主页面中，此时，从应用B中需要再次启动应用A的该UIAbility，并且需要跳转到不同的页面，由于当前UIAbility实例之前已经创建完成，此时会进入UIAbility的onNewWant()回调中且不会进入onCreate()和onWindowStageCreate()生命周期回调，在onNewWant()回调中解析调用方传递过来的want参数，并挂在到全局变量globalThis中，以便于后续在页面中获取

```js
import UIAbility from '@ohos.app.ability.UIAbility'

export default class FuncAbility extends UIAbility {
    onNewWant(want, launchParam) {
        // 接收调用方UIAbility传过来的参数
        globalThis.funcAbilityWant = want;
        // ...
    }
}
```

在FuncAbility中，此时需要在Index页面中通过页面路由Router模块实现指定页面的跳转，由于此时FuncAbility对应的Index页面是处于激活状态，不会重新变量声明以及进入aboutToAppear()生命周期回调中。因此可以在Index页面的onPageShow()生命周期回调中实现页面路由跳转的功能

```js
import router from '@ohos.router';

@Entry
@Component
struct Index {
  onPageShow() {
    let funcAbilityWant = globalThis.funcAbilityWant;
    let url2 = funcAbilityWant?.parameters?.router;
    if (url2 && url2 === 'funcA') {
      router.replaceUrl({
        url: 'pages/Second',
      })
    }
  }

  // 页面展示
  build() {
    // ...
  }
}
```

6. 通过Call调用实现UIAbility交互（仅对系统应用开放)-待补充

### 服务卡片

#### 卡片配置文件

- 卡片需要在module.json5配置文件中的extensionAbilities标签下，配置FormExtensionAbility相关信息。FormExtensionAbility需要填写metadata元信息标签，其中键名称为固定字符串“ohos.extension.form”，资源为卡片的具体配置信息的索引

- 卡片的具体配置信息。在上述FormExtensionAbility的元信息（“metadata”配置项）中，可以指定卡片具体配置信息的资源索引。例如当resource指定为$profile:form_config时，会使用开发视图的resources/base/profile/目录下的form_config.json作为卡片profile配置文件

#### 卡片生命周期

```js
import formInfo from '@ohos.app.form.formInfo';
import formBindingData from '@ohos.app.form.formBindingData';
import FormExtensionAbility from '@ohos.app.form.FormExtensionAbility';
import formProvider from '@ohos.app.form.formProvider';

export default class EntryFormAbility extends FormExtensionAbility {
  onAddForm(want) {
    console.info('[EntryFormAbility] onAddForm');
    // 在入参want中可以取出卡片的唯一标识：formId
    let formId: string = want.parameters[formInfo.FormParam.IDENTITY_KEY];
    // 使用方创建卡片时触发，提供方需要返回卡片数据绑定类
    let obj = {
      'title': 'titleOnAddForm',
      'detail': 'detailOnAddForm'
    };
    let formData = formBindingData.createFormBindingData(obj);
    return formData;
  }

  onCastToNormalForm(formId) {
    // Called when the form provider is notified that a temporary form is successfully
    // converted to a normal form.
    // 使用方将临时卡片转换为常态卡片触发，提供方需要做相应的处理
    console.info(`[EntryFormAbility] onCastToNormalForm, formId: ${formId}`);
  }

  onUpdateForm(formId) {
    // 若卡片支持定时更新/定点更新/卡片使用方主动请求更新功能，则提供方需要重写该方法以支持数据更新
    console.info('[EntryFormAbility] onUpdateForm');
    let obj = {
      'title': 'titleOnUpdateForm',
      'detail': 'detailOnUpdateForm'
    };
    let formData = formBindingData.createFormBindingData(obj);
    formProvider.updateForm(formId, formData).catch((err) => {
      if (err) {
        // 异常分支打印
        console.error(`[EntryFormAbility] Failed to updateForm. Code: ${err.code}, message: ${err.message}`);
        return;
      }
    });
  }

  onChangeFormVisibility(newStatus) {
    // Called when the form provider receives form events from the system.
    // 需要配置formVisibleNotify为true，且为系统应用才会回调
    console.info('[EntryFormAbility] onChangeFormVisibility');
  }

  onFormEvent(formId, message) {
    // Called when a specified message event defined by the form provider is triggered.
    // 若卡片支持触发事件，则需要重写该方法并实现对事件的触发
    console.info('[EntryFormAbility] onFormEvent');
  }

  onRemoveForm(formId) {
    // Called to notify the form provider that a specified form has been destroyed.
    // 当对应的卡片删除时触发的回调，入参是被删除的卡片ID
    console.info('[EntryFormAbility] onRemoveForm');
  }

  onConfigurationUpdate(config) {
    // 当系统配置信息置更新时触发的回调
    console.info('[EntryFormAbility] configurationUpdate:' + JSON.stringify(config));
  }

  onAcquireFormState(want) {
    // Called to return a {@link FormState} object.
    // 卡片提供方接收查询卡片状态通知接口，默认返回卡片初始状态。
    return formInfo.FormState.READY;
  }
}
```

#### 卡片事件

ArkTS卡片中提供了postCardAction(component: Object, action: Object)接口用于卡片内部和提供方应用间的交互，当前支持router、message和call三种类型的事件，仅在卡片中可以调用
<img src="../images/card-event.png"/>

- "action"：action的类型，支持三种预定义的类型：

1）"router"：跳转到提供方应用的指定UIAbility。

2）"message"：自定义消息。触发后会调用提供方FormExtensionAbility的onFormEvent()生命周期回调。

3）"call"：后台启动提供方应用。触发后会拉起提供方应用的指定UIAbility（仅支持launchType为singleton的UIAbility，即启动模式为单实例的UIAbility），但不会调度到前台。提供方应用需要具备后台运行权限（ohos.permission.KEEP_BACKGROUND_RUNNING）。

- "bundleName"："router" / "call" 类型时跳转的包名，可选。

- "moduleName"："router" / "call" 类型时跳转的模块名，可选。

- "abilityName"："router" / "call" 类型时跳转的UIAbility名，必填。

- "params"：当前action携带的额外参数，内容使用JSON格式的键值对形式。"call"类型时需填入参数'method'，且类型需要为string类型，用于触发UIAbility中对应的方法，必填。

1. 使用router事件跳转到指定UIAbility

在卡片中使用postCardAction接口的router能力，能够快速拉起卡片提供方应用的指定UIAbility，因此UIAbility较多的应用往往会通过卡片提供不同的跳转按钮，实现一键直达的效果。例如相机卡片，卡片上提供拍照、录像等按钮，点击不同按钮将拉起相机应用的不同UIAbility，从而提升用户的体验

在卡片页面中布局两个按钮，点击其中一个按钮时调用postCardAction向指定UIAbility发送router事件，并在事件内定义需要传递的内容

示例代码如下：

```js
@Entry
@Component
struct WidgetCard {
  build() {
    Column() {
      Button('功能A')
        .margin('20%')
        .onClick(() => {
          console.info('Jump to EntryAbility funA');
          postCardAction(this, {
            'action': 'router',
            'abilityName': 'EntryAbility', // 只能跳转到当前应用下的UIAbility
            'params': {
              'targetPage': 'funA' // 在EntryAbility中处理这个信息
            }
          });
        })

      Button('功能B')
        .margin('20%')
        .onClick(() => {
          console.info('Jump to EntryAbility funB');
          postCardAction(this, {
            'action': 'router',
            'abilityName': 'EntryAbility', // 只能跳转到当前应用下的UIAbility
            'params': {
              'targetPage': 'funB' // 在EntryAbility中处理这个信息
            }
          });
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

在UIAbility中接收router事件并获取参数，根据传递的params不同，选择拉起不同的页面

示例代码如下：

```js
import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';

let selectPage = "";
let currentWindowStage = null;

export default class CameraAbility extends UIAbility {
  // 如果UIAbility第一次启动，在收到Router事件后会触发onCreate生命周期回调
  onCreate(want, launchParam) {
    // 获取router事件中传递的targetPage参数
    console.info("onCreate want:" + JSON.stringify(want));
    if (want.parameters.params !== undefined) {
      let params = JSON.parse(want.parameters.params);
      console.info("onCreate router targetPage:" + params.targetPage);
      selectPage = params.targetPage;
    }
  }
  // 如果UIAbility已在后台运行，在收到Router事件后会触发onNewWant生命周期回调
  onNewWant(want, launchParam) {
    console.info("onNewWant want:" + JSON.stringify(want));
    if (want.parameters.params !== undefined) {
      let params = JSON.parse(want.parameters.params);
      console.info("onNewWant router targetPage:" + params.targetPage);
      selectPage = params.targetPage;
    }
    if (currentWindowStage != null) {
      this.onWindowStageCreate(currentWindowStage);
    }
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    let targetPage;
    // 根据传递的targetPage不同，选择拉起不同的页面
    switch (selectPage) {
      case 'funA':
        targetPage = 'pages/FunA';
        break;
      case 'funB':
        targetPage = 'pages/FunB';
        break;
      default:
        targetPage = 'pages/Index';
    }
    if (currentWindowStage === null) {
      currentWindowStage = windowStage;
    }
    windowStage.loadContent(targetPage, (err, data) => {
      if (err && err.code) {
        console.info('Failed to load the content. Cause: %{public}s', JSON.stringify(err));
        return;
      }
    });
  }
};
```

2. 使用call事件拉起指定UIAbility到后台

许多应用希望借助卡片的能力，实现和应用在前台时相同的功能。例如音乐卡片，卡片上提供播放、暂停等按钮，点击不同按钮将触发音乐应用的不同功能，进而提高用户的体验。在卡片中使用postCardAction接口的call能力，能够将卡片提供方应用的指定UIAbility拉到后台。同时，call能力提供了调用应用指定方法、传递数据的功能，使应用在后台运行时可以通过卡片上的按钮执行不同的功能，通常使用按钮控件来触发call事件

在卡片页面中布局两个按钮，点击其中一个按钮时调用postCardAction向指定UIAbility发送call事件，并在事件内定义需要调用的方法和传递的数据。需要注意的是，method参数为必选参数，且类型需要为string类型，用于触发UIAbility中对应的方法

```js
@Entry
@Component
struct WidgetCard {
  build() {
    Column() {
      Button('功能A')
        .margin('20%')
        .onClick(() => {
          console.info('call EntryAbility funA');
          postCardAction(this, {
            'action': 'call',
            'abilityName': 'EntryAbility', // 只能跳转到当前应用下的UIAbility
            'params': {
              'method': 'funA' // 在EntryAbility中调用的方法名
            }
          });
        })
       Button('功能B')
        .margin('20%')
        .onClick(() => {
          console.info('call EntryAbility funB');
          postCardAction(this, {
            'action': 'call',
            'abilityName': 'EntryAbility', // 只能跳转到当前应用下的UIAbility
            'params': {
              'method': 'funB', // 在EntryAbility中调用的方法名
              'num': 1 // 需要传递的其他参数
            }
          });
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

在UIAbility中接收call事件并获取参数，根据传递的method不同，执行不同的方法。其余数据可以通过readString的方式获取。需要注意的是，UIAbility需要onCreate生命周期中监听所需的方法

```js
import UIAbility from '@ohos.app.ability.UIAbility';
 
function FunACall(data) {
  // 获取call事件中传递的所有参数
  console.log('FunACall param:' + JSON.stringify(data.readString()));
  return null;
}
 function FunBCall(data) {
  console.log('FunACall param:' + JSON.stringify(data.readString()));
  return null;
}
 
export default class CameraAbility extends UIAbility {
  // 如果UIAbility第一次启动，在收到call事件后会触发onCreate生命周期回调
  onCreate(want, launchParam) {
      try {
          // 监听call事件所需的方法
          this.callee.on('funA', FunACall);
          this.callee.on('funB', FunBCall);
      } catch (error) {
          console.log('register failed with error. Cause: ' + JSON.stringify(error));
      }
  }
   
  // 进程退出时，解除监听
  onDestroy() {
      try {
          this.callee.off('funA');
          this.callee.off('funB');
      } catch (error) {
          console.log('register failed with error. Cause: ' + JSON.stringify(error));
      }
  }
};
```

3. 通过message事件刷新卡片内容

在卡片页面中可以通过postCardAction接口触发message事件拉起FormExtensionAbility，然后由FormExtensionAbility刷新卡片内容

在卡片页面通过注册Button的onClick点击事件回调，并在回调中调用postCardAction接口触发message事件拉起FormExtensionAbility。

```js
let storage = new LocalStorage();

@Entry(storage)
@Component
struct WidgetCard {
  @LocalStorageProp('title') title: string = 'init';
  @LocalStorageProp('detail') detail: string = 'init';

  build() {
    Column() {
      Button('刷新')
        .onClick(() => {
          postCardAction(this, {
            'action': 'message',
            'params': {
              'msgTest': 'messageEvent'
            }
          });
        })
      Text(`${this.title}`)
      Text(`${this.detail}`)
    }
    .width('100%')
    .height('100%')
  }
}
```

在FormExtensionAbility的onFormEvent生命周期中调用updateForm接口刷新卡片。

```js
import formBindingData from '@ohos.app.form.formBindingData';
import FormExtensionAbility from '@ohos.app.form.FormExtensionAbility';
import formProvider from '@ohos.app.form.formProvider';

export default class EntryFormAbility extends FormExtensionAbility {
  onFormEvent(formId, message) {
    // Called when a specified message event defined by the form provider is triggered.
    console.info(`FormAbility onEvent, formId = ${formId}, message: ${JSON.stringify(message)}`);
    let formData = {
      'title': 'Title Update Success.', // 和卡片布局中对应
      'detail': 'Detail Update Success.', // 和卡片布局中对应
    };
    let formInfo = formBindingData.createFormBindingData(formData)
    formProvider.updateForm(formId, formInfo).then((data) => {
      console.info('FormAbility updateForm success.' + JSON.stringify(data));
    }).catch((error) => {
      console.error('FormAbility updateForm failed: ' + JSON.stringify(error));
    })
  }

  ...
}
```

#### 卡片数据交互--待补充

## 进程模型

HarmonyOS的进程模型，应用中（同一包名）的所有UIAbility运行在同一个独立进程中，WebView拥有独立的渲染进程

### 公共事件

HarmonyOS通过CES（Common Event Service，公共事件服务）为应用程序提供订阅、发布、退订公共事件的能力。这些公共事件可能来自系统、其他应用和应用自身

- 公共事件从系统角度可分为：系统公共事件和自定义公共事件。

1. 系统公共事件：CES内部定义的公共事件，只有系统应用和系统服务才能发布，例如HAP安装，更新，卸载等公共事件。目前支持的系统公共事件详见系统公共事件列表。

2. 自定义公共事件：应用自定义一些公共事件用来实现跨进程的事件通信能力。

- 公共事件按发送方式可分为：无序公共事件、有序公共事件和粘性公共事件。

1. 无序公共事件：CES转发公共事件时，不考虑订阅者是否接收到，且订阅者接收到的顺序与其订阅顺序无关。

2. 有序公共事件：CES转发公共事件时，根据订阅者设置的优先级等级，优先将公共事件发送给优先级较高的订阅者，等待其成功接收该公共事件之后再将事件发送给优先级较低的订阅者。如果有多个订阅者具有相同的优先级，则他们将随机接收到公共事件。

3. 粘性公共事件：能够让订阅者收到在订阅前已经发送的公共事件就是粘性公共事件。普通的公共事件只能在订阅后发送才能收到，而粘性公共事件的特殊性就是可以先发送后订阅。发送粘性事件必须是系统应用或系统服务，且需要申请ohos.permission.COMMONEVENT_STICKY权限，配置方式请参阅访问控制授权申请指导。

#### 动态订阅公共事件

动态订阅是指当应用在运行状态时对某个公共事件进行订阅，在运行期间如果有订阅的事件发布那么订阅了这个事件的应用将会收到该事件及其传递的参数。例如，某应用希望在其运行期间收到电量过低的事件，并根据该事件降低其运行功耗，那么该应用便可动态订阅电量过低事件，收到该事件后关闭一些非必要的任务来降低功耗。订阅部分系统公共事件需要先申请权限

步骤如下：

```js
// 导入CommonEvent模块。
import commonEvent from '@ohos.commonEventManager';

// 创建订阅者信息,用于保存创建成功的订阅者对象，后续使用其完成订阅及退订的动作
let subscriber = null;
// 订阅者信息
let subscribeInfo = {
    events: ["usual.event.SCREEN_OFF"], // 订阅灭屏公共事件
}

// 创建订阅者回调，保存返回的订阅者对象subscriber，用于执行后续的订阅、退订等操作
commonEvent.createSubscriber(subscribeInfo, (err, data) => {
    if (err) {
        console.error(`[CommonEvent] CreateSubscriberCallBack err=${JSON.stringify(err)}`);
    } else {
        console.info(`[CommonEvent] CreateSubscriber success`);
        subscriber = data;
        // 订阅公共事件回调
    }
})

// 订阅公共事件回调
if (subscriber !== null) {
    commonEvent.subscribe(subscriber, (err, data) => {
        if (err) {
            console.error(`[CommonEvent] SubscribeCallBack err=${JSON.stringify(err)}`);
        } else {
            console.info(`[CommonEvent] SubscribeCallBack data=${JSON.stringify(data)}`);
        }
    })
} else {
    console.error(`[CommonEvent] Need create subscriber`);
}
```

#### 取消动态订阅公共事件

动态订阅者完成业务需要时，需要主动取消订阅，订阅者通过调用unsubscribe()方法取消订阅事件。

开发步骤：

```js
// 导入CommonEvent模块。
import commonEvent from '@ohos.commonEventManager';

// subscriber为订阅事件时创建的订阅者对象
if (subscriber !== null) {
    commonEvent.unsubscribe(subscriber, (err) => {
        if (err) {
            console.error(`[CommonEvent] UnsubscribeCallBack err=${JSON.stringify(err)}`)
        } else {
            console.info(`[CommonEvent] Unsubscribe`)
            subscriber = null
        }
    })
}
```

#### 公共事件发布

步骤如下：

```js
// 导入CommonEvent模块。
import commonEvent from '@ohos.commonEventManager';

// 公共事件相关信息
let options = {
    code: 1, // 公共事件的初始代码
    data: "initial data", // 公共事件的初始数据
}

// 发布公共事件
commonEvent.publish("usual.event.SCREEN_OFF", options, (err) => {
    if (err) {
        console.error('[CommonEvent] PublishCallBack err=' + JSON.stringify(err));
    } else {
        console.info('[CommonEvent] Publish success')
    }
})
```

## 线程模型

HarmonyOS应用中每个进程都会有一个主线程，主线程有如下职责：

- 执行UI绘制；
- 管理主线程的ArkTS引擎实例，使多个UIAbility组件能够运行在其之上；
- 管理其他线程（例如Worker线程）的ArkTS引擎实例，例如启动和终止其他线程；
- 分发交互事件；
- 处理应用代码的回调，包括事件处理和生命周期管理；
- 接收Worker线程发送的消息；

除主线程外，还有一类与主线程并行的独立线程Worker，主要用于执行耗时操作，但不可以直接操作UI。Worker线程在主线程中创建，与主线程相互独立。最多可以创建8个Worker

### 使用Emitter进行线程间通信

Emitter主要提供线程间发送和处理事件的能力，包括对持续订阅事件或单次订阅事件的处理、取消订阅事件、发送事件到事件队列等。

Emitter的开发步骤如下：

1. 订阅事件

```js
import emitter from "@ohos.events.emitter";

// 定义一个eventId为1的事件
let event = {
    eventId: 1
};

// 收到eventId为1的事件后执行该回调
let callback = (eventData) => {
    console.info('event callback');
};
// 订阅eventId为1的事件
emitter.on(event, callback);
```

2. 发送事件

```js
import emitter from "@ohos.events.emitter";

// 定义一个eventId为1的事件，事件优先级为Low
let event = {
    eventId: 1,
    priority: emitter.EventPriority.LOW
};

let eventData = {
    data: {
        "content": "c",
        "id": 1,
        "isEmpty": false,
    }
};

// 发送eventId为1的事件，事件内容为eventData
emitter.emit(event, eventData);
```

### 使用Worker进行线程间通信

Worker是与主线程并行的独立线程。创建Worker的线程被称为宿主线程，Worker工作的线程被称为Worker线程。创建Worker时传入的脚本文件在Worker线程中执行，通常在Worker线程中处理耗时的操作，需要注意的是，Worker中不能直接更新Page。

Worker的开发步骤如下：

1. 在工程的模块级build-profile.json5文件的buildOption属性中添加配置信息

```js
  "buildOption": {
    "sourceOption": {
      "workers": [
        "./src/main/ets/workers/worker.ts"
      ]
    }
  }
```

2. 根据build-profile.json5中的配置创建对应的worker.ts文件

```js
import worker from '@ohos.worker';

let parent = worker.workerPort;

// 处理来自主线程的消息
parent.onmessage = function(message) {
    console.info("onmessage: " + message)
    // 发送消息到主线程
    parent.postMessage("message from worker thread.")
}
```

3. 初始化和使用worker

```js
import worker from '@ohos.worker';

let wk = new worker.ThreadWorker("entry/ets/workers/worker.ts");

// 发送消息到worker线程
wk.postMessage("message from main thread.")

// 处理来自worker线程的消息
wk.onmessage = function(message) {
    console.info("message from worker: " + message)

    // 根据业务按需停止worker线程
    wk.terminate()
}
```

## UI开发

### 页面路由

#### 页面跳转

Router模块提供了两种跳转模式，分别是router.pushUrl()和router.replaceUrl()。这两种模式决定了目标页是否会替换当前页。

- router.pushUrl()：目标页不会替换当前页，而是压入页面栈。这样可以保留当前页的状态，并且可以通过返回键或者调用router.back()方法返回到当前页。
- router.replaceUrl()：目标页会替换当前页，并销毁当前页

> 页面栈的最大容量为32个页面。如果超过这个限制，可以调用router.clear()方法清空历史页面栈，释放内存空间

Router模块提供了两种实例模式，分别是Standard和Single。这两种模式决定了目标url是否会对应多个实例。

- Standard：标准实例模式，也是默认情况下的实例模式。每次调用该方法都会新建一个目标页，并压入栈顶。
- Single：单实例模式。即如果目标页的url在页面栈中已经存在同url页面，则离栈顶最近的同url页面会被移动到栈顶，并重新加载；如果目标页的url在页面栈中不存在同url页面，则按照标准模式跳转

使用语法：

```js
 router.replaceUrl({
    url: 'pages/SearchDetail' // 目标url
  }, router.RouterMode.Single, (err) => {
    if (err) {
      console.error(`Invoke replaceUrl failed, code is ${err.code}, message is ${err.message}`);
      return;
    }
    console.info('Invoke replaceUrl succeeded.');}
```

如果需要在跳转时传递一些数据给目标页，则可以在调用Router模块的方法时，添加一个params属性，并指定一个对象作为参数，在目标页中，可以通过调用Router模块的getParams()方法来获取传递过来的参数

#### 页面返回

当用户在一个页面完成操作后，通常需要返回到上一个页面或者指定页面，这就需要用到页面返回功能。在返回的过程中，可能需要将数据传递给目标页，这就需要用到数据传递功能，可以使用以下几种方式进行页面返回：

- 返回到上一个页面。

```js
router.back();
```

- 返回到指定页面，目标页必须存在于页面栈中才能够返回

```js
router.back({
  url: 'pages/Home'
});
```

- 返回到指定页面，并传递自定义参数信息，参数信息可以在目标页中通过调用router.getParams()方法进行获取和解析

```js
router.back({
  url: 'pages/Home',
  params: {
    info: '来自Home页'
  }
});

// 目标页
onPageShow() {
  const params = router.getParams(); // 获取传递过来的参数对象
  const info = params['info']; // 获取info属性的值
}
```

> 当使用router.back()方法返回到指定页面时，该页面会被重新压入栈顶，而原栈顶页面（包括）到指定页面（不包括）之间的所有页面栈都将被销毁。
>
#### 返回确认

- 系统默认询问框

Router模块提供的两个方法：router.showAlertBeforeBackPage()和router.back()来实现这个功能，需要在调用router.back()方法之前，通过调用router.showAlertBeforeBackPage()方法设置返回询问框的信息

```js
// 定义一个返回按钮的点击事件处理函数
function onBackClick(): void {
  // 调用router.showAlertBeforeBackPage()方法，设置返回询问框的信息
  try {
    router.showAlertBeforeBackPage({
      message: '您还没有完成支付，确定要返回吗？' // 设置询问框的内容
    });
  } catch (err) {
    console.error(`Invoke showAlertBeforeBackPage failed, code is ${err.code}, message is ${err.message}`);
  }

  // 调用router.back()方法，返回上一个页面
  router.back();
}
```

- 自定义询问框

自定义询问框的方式，可以使用弹窗或者自定义弹窗实现。这样可以让应用界面与系统默认询问框有所区别，提高应用的用户体验度

```js
function onBackClick() {
  // 弹出自定义的询问框
  promptAction.showDialog({
    message: '您还没有完成支付，确定要返回吗？',
    buttons: [
      {
        text: '取消',
        color: '#FF0000'
      },
      {
        text: '确认',
        color: '#0099FF'
      }
    ]
  }).then((result) => {
    if (result.index === 0) {
      // 用户点击了“取消”按钮
      console.info('User canceled the operation.');
    } else if (result.index === 1) {
      // 用户点击了“确认”按钮
      console.info('User confirmed the operation.');
      // 调用router.back()方法，返回上一个页面
      router.back();
    }
  }).catch((err) => {
    console.error(`Invoke showDialog failed, code is ${err.code}, message is ${err.message}`);
  })
}
```

### 显示图形

#### 显示图片

Image支持加载存档图、多媒体像素图两种类型

存档图类型的数据源可以分为本地资源、网络资源、Resource资源、媒体库资源和base64

```js
// 本地资源
Image('images/view.jpg')
.width(200)

// 网络资源
// 引入网络图片需申请权限ohos.permission.INTERNET，Image组件的src参数为网络图片的链接。
Image('https://www.example.com/example.JPG') 

// Resource资源
// resources文件夹下的图片都可以通过$r资源接口读取到并转换到Resource格式。
Image($r('app.media.icon'))
//还可以将图片放在rawfile文件夹下。
Image($rawfile('snap'))


// 媒体库file://data/storage
// 支持file://路径前缀的字符串，用于访问通过媒体库提供的图片路径。

Image('file://media/Photos/5')
.width(200)

// base64
路径格式为data:image/[png|jpeg|bmp|webp];base64,[base64 data]，其中[base64 data]为Base64字符串数据。
```

PixelMap是图片解码后的像素图

```js
import http from '@ohos.net.http';
import ResponseCode from '@ohos.net.http';
import image from '@ohos.multimedia.image';

@State image: PixelMap = undefined;

http.createHttp().request("https://www.example.com/xxx.png",
  (error, data) => {
    if (error){
      console.error(`http reqeust failed with. Code: ${error.code}, message: ${error.message}`);
    } else {
      let code = data.responseCode;
      if (ResponseCode.ResponseCode.OK === code) {
      let res: any = data.result  
      let imageSource = image.createImageSource(res);
      let options = {
        alphaType: 0,                     // 透明度
        editable: false,                  // 是否可编辑
        pixelFormat: 3,                   // 像素格式
        scaleMode: 1,                     // 缩略值
        size: { height: 100, width: 100}
      }  // 创建图片大小
        imageSource.createPixelMap(options).then((pixelMap) => {
        this.image = pixelMap
      })
  }
    }
  }
)

Button("获取网络图片")
  .onClick(() => {
    this.httpRequest()
  })
Image(this.image).height(100).width(100)
```

#### 显示矢量图

Image组件可显示矢量图（svg格式的图片），支持的svg标签为：svg、rect、circle、ellipse、path、line、polyline、polygon和animate。

svg格式的图片可以使用fillColor属性改变图片的绘制颜色。

```js
Image($r('app.media.cloud')).width(50)
.fillColor(Color.Blue)
```

#### 图片插值

当原图分辨率较低并且放大显示时，图片会模糊出现锯齿。这时可以使用interpolation属性对图片进行插值，使图片显示得更清晰

```js
Image($r('app.media.grass'))
    .width('40%')
    .interpolation(ImageInterpolation.Low)
    .borderWidth(1)
    .overlay("Interpolation.Low", { align: Alignment.Bottom, offset: { x: 0, y: 20 } })
    .margin(10)
```

### 绘制几何图形

绘制组件用于在页面绘制图形，Shape组件是绘制组件的父组件，父组件中会描述所有绘制组件均支持的通用属性，绘制类型支持Circle（圆形）、Ellipse（椭圆形）、Line（直线）、Polyine（折线）、Polygon（多边形）、Path（路径）、Rect（矩形）七种

形状视口viewport指定用户空间中的一个矩形，该矩形映射到为关联的 SVG 元素建立的视区边界。viewport属性的值包含x、y、width和height四个可选参数，x 和 y 表示视区的左上角坐标，width和height表示其尺寸。通过viewport可以实现几何图形在父组件Shape中平移、缩小、放大

### 动画

如果按照基础能力分，可分为属性动画、显式动画、转场动画三部分

#### 显式动画

闭包内的变化均会触发动画，包括由数据变化引起的组件的增删、组件属性的变化等，可以做较为复杂的动画

显式动画使用`animateTo(value: AnimateParam, event: () => void)`，第一个参数指定动画参数，第二个参数为动画的闭包函数

```js
@Entry
@Component
struct LayoutChange {
  // 用于控制Column的alignItems属性
  @State itemAlign: HorizontalAlign = HorizontalAlign.Start;
  allAlign: HorizontalAlign[] = [HorizontalAlign.Start, HorizontalAlign.Center, HorizontalAlign.End];
  alignIndex: number = 0;

  build() {
    Column() {
      Column({ space: 10 }) {
        Button("1").width(100).height(50)
        Button("2").width(100).height(50)
        Button("3").width(100).height(50)
      }
      .margin(20)
      .alignItems(this.itemAlign)
      .borderWidth(2)
      .width("90%")
      .height(200)

      Button("click").onClick(() => {
        // 动画时长为1000ms，曲线为EaseInOut
        animateTo({ duration: 1000, curve: Curve.EaseInOut }, () => {
          this.alignIndex = (this.alignIndex + 1) % this.allAlign.length;
          // 在闭包函数中修改this.itemAlign参数，使Column容器内部孩子的布局方式变化，使用动画过渡到新位置
          this.itemAlign = this.allAlign[this.alignIndex];
        });
      })
    }
    .width("100%")
    .height("100%")
  }
}
```

#### 属性动画

显式动画把要执行动画的属性的修改放在闭包函数中触发动画，而属性动画则无需使用闭包，把animation属性加在要做属性动画的组件的属性后即可

属性动画使用`animation(value: AnimateParam)`，其入参为动画参数。想要组件随某个属性值的变化而产生动画，此属性需要加在animation属性之前。有的属性变化不希望通过animation产生属性动画，可以放在animation之后

```js
@Entry
@Component
struct LayoutChange2 {
  @State myWidth: number = 100;
  @State myHeight: number = 50;
  @State flag: boolean = false;
  @State myColor: Color = Color.Blue;

  build() {
    Column({ space: 10 }) {
      Button("text")
        .type(ButtonType.Normal)
        .width(this.myWidth)
        .height(this.myHeight)
        // animation只对其上面的type、width、height属性生效，时长为1000ms，曲线为Ease
        .animation({ duration: 1000, curve: Curve.Ease })
        // animation对下面的backgroundColor、margin属性不生效
        .backgroundColor(this.myColor)
        .margin(20)
        

      Button("area: click me")
        .fontSize(12)
        .onClick(() => {
          // 改变属性值，配置了属性动画的属性会进行动画过渡
          if (this.flag) {
            this.myWidth = 100;
            this.myHeight = 50;
            this.myColor = Color.Blue;
          } else {
            this.myWidth = 200;
            this.myHeight = 100;
            this.myColor = Color.Pink;
          }
          this.flag = !this.flag;
        })
    }
  }
}
```

#### 组件专场动画

组件的插入、删除过程即为组件本身的转场过程，组件的插入、删除动画称为组件内转场动画。通过组件内转场动画，可定义组件出现、消失的效果。

组件内转场动画的接口为：`transition(value: TransitionOptions)`，可以定义平移、透明度、旋转、缩放这几种转场样式的单个或者组合的转场效果

```js
@Entry
@Component
struct IfElseTransition {
  @State flag: boolean = true;
  @State show: string = 'show';

  build() {
    Column() {
      Button(this.show).width(80).height(30).margin(30)
        .onClick(() => {
          if (this.flag) {
            this.show = 'hide';
          } else {
            this.show = 'show';
          }
          
          animateTo({ duration: 1000 }, () => {
            // 动画闭包内控制Image组件的出现和消失
            this.flag = !this.flag;
          })
        })
      if (this.flag) {
        // Image的出现和消失配置为不同的过渡效果
        Image($r('app.media.mountain')).width(200).height(200)
          .transition({ type: TransitionType.Insert, translate: { x: 200, y: -200 } })
          .transition({ type: TransitionType.Delete, opacity: 0, scale: { x: 0, y: 0 } })
      }
    }.height('100%').width('100%')
  }
}
```

#### 页面专场动画

两个页面间发生跳转，一个页面消失，另一个页面出现，这时可以配置各自页面的页面转场参数实现自定义的页面转场效果。页面转场效果写在pageTransition函数中，通过PageTransitionEnter和PageTransitionExit指定页面进入和退出的动画效果。可通过slide、translate、scale、opacity属性定义不同的页面转场效果。对于PageTransitionEnter而言，这些效果表示入场时起点值，对于PageTransitionExit而言，这些效果表示退场的终点值

PageTransitionEnter的接口为：

```js
PageTransitionEnter({type?: RouteType,duration?: number,curve?: Curve | string,delay?: number})
```

PageTransitionExit的接口为：

```js
PageTransitionExit({type?: RouteType,duration?: number,curve?: Curve | string,delay?: number})
```

```js
// PageTransitionSrc1
import router from '@ohos.router';
@Entry
@Component
struct PageTransitionSrc1 {
  build() {
    Column() {
      Image($r('app.media.mountain'))
        .width('90%')
        .height('80%')
        .objectFit(ImageFit.Fill)
        .syncLoad(true) // 同步加载图片，使页面出现时图片已经加载完成
        .margin(30)

      Row({ space: 10 }) {
        Button("pushUrl")
          .onClick(() => {
            // 路由到下一个页面，push操作
            router.pushUrl({ url: 'pages/myTest/pageTransitionDst1' });
          })
        Button("back")
          .onClick(() => {
            // 返回到上一页面，相当于pop操作
            router.back();
          })
      }.justifyContent(FlexAlign.Center)
    }
    .width("100%").height("100%")
    .alignItems(HorizontalAlign.Center)
  }

  pageTransition() {
    // 定义页面进入时的效果，从右侧滑入，时长为1000ms，页面栈发生push操作时该效果才生效
    PageTransitionEnter({ type: RouteType.Push, duration: 1000 })
      .slide(SlideEffect.Right)
    // 定义页面进入时的效果，从左侧滑入，时长为1000ms，页面栈发生pop操作时该效果才生效
    PageTransitionEnter({ type: RouteType.Pop, duration: 1000 })
      .slide(SlideEffect.Left)
    // 定义页面退出时的效果，向左侧滑出，时长为1000ms，页面栈发生push操作时该效果才生效
    PageTransitionExit({ type: RouteType.Push, duration: 1000 })
      .slide(SlideEffect.Left)
    // 定义页面退出时的效果，向右侧滑出，时长为1000ms，页面栈发生pop操作时该效果才生效
    PageTransitionExit({ type: RouteType.Pop, duration: 1000 })
      .slide(SlideEffect.Right)
  }
}
```
