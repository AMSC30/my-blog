# ArkTS语言

## 语法概述

 ArkTS的基本组成：

- 装饰器： 用于装饰类、结构、方法以及变量，并赋予其特殊的含义。如上述示例中@Entry、@Component和@State都是装饰器，@Component表示自定义组件，@Entry表示该自定义组件为入口组件，@State表示组件中的状态变量，状态变量变化会触发UI刷新。
- UI描述：以声明式的方式来描述UI的结构，例如build()方法中的代码块。
- 自定义组件：可复用的UI单元，可组合其他组件，如上述被@Component装饰的struct Hello。
- 系统组件：ArkUI框架中默认内置的基础和容器组件，可直接被开发者调用，比如示例中的Column、Text、Divider、Button。
- 属性方法：组件可以通过链式调用配置多项属性，如fontSize()、width()、height()、backgroundColor()等。
- 事件方法：组件可以通过链式调用设置多个事件的响应逻辑，如跟随在Button后面的onClick()

 <img src="../images/arkts-construct.png"/>

## 组件和页面生命周期

页面生命周期，即被@Entry装饰的组件生命周期，提供以下生命周期接口：

- onPageShow：页面每次显示时触发。
- onPageHide：页面每次隐藏时触发一次。
- onBackPress：当用户点击返回按钮时触发。

组件生命周期，即一般用@Component装饰的自定义组件的生命周期，提供以下生命周期接口：

- aboutToAppear：组件即将出现时回调该接口，具体时机为在创建自定义组件的新实例后，在执行其build()函数之前执行。
- aboutToDisappear：在自定义组件即将析构销毁时执行。

生命周期流程如下图所示:

 <img src="../images/lifecycle.png"/>

1. 初始化自定义组件的成员变量：通过本地默认值或者构造方法传递参数来初始化自定义组件的成员变量，初始化顺序为成员变量的定义顺序
2. 如果定义了aboutToAppear，则执行aboutToAppear方法
3. 执行build方法渲染系统组件，如果子组件为自定义组件，则创建自定义组件的实例。在执行build()函数的过程中，框架会观察每个状态变量的读取状态，将保存两个map：

a) 状态变量 -> UI组件（包括ForEach和if）。

b) UI组件 -> 此组件的更新函数，即一个lambda方法，作为build()函数的子集，创建对应的UI组件并执行其属性方法

4. 执行onPageShow
5. 当改变了状态变量时，或者LocalStorage / AppStorage中的属性更改，并导致绑定的状态变量更改其值时,进行最小化更新
6. if组件的分支改变，或者ForEach循环渲染中数组的个数改变，组件将被删除，调用其aboutToDisappear生命周期函数
7. 当页面销毁时，先执行onPageHide，然后从页面到子组件依次执行aboutToDisappear

## UI复用-@Builder

@Builder装饰的函数也称自定义构建函数

**组件内定义与使用：**

```js
@Builder MyBuilderFunction({ ... })

// builder或者其他自定义构建函数内
this.MyBuilderFunction()

```

- 允许在自定义组件内定义一个或多个自定义构建函数，该函数被认为是该组件的私有、特殊类型的成员函数。
- 自定义构建函数可以在所属组件的build方法和其他自定义构建函数中调用，但不允许在组件外调用。
- 在自定义函数体中，this指代当前所属组件，组件的状态变量可以在自定义构建函数内访问。建议通过this访问自定义组件的状态变量而不是参数传递

**全局定义与使用：**

```js
@Builder function MyGlobalBuilderFunction({ ... })

// builder或者其他自定义构建函数内
MyGlobalBuilderFunction()
```

- 全局的自定义构建函数可以被整个应用获取，不允许使用this和bind方法。
- 如果不涉及组件状态变化，建议使用全局的自定义构建方法

**参数传递规则**

自定义构建函数的参数传递有按值传递和按引用传递两种，均需遵守以下规则：

- 参数的类型必须与参数声明的类型一致，不允许undefined、null和返回undefined、null的表达式。
- 在自定义构建函数内部，不允许改变参数值。如果需要改变参数值，且同步回调用点，建议使用@Link。
- @Builder内UI语法遵循UI语法规则

**按引用传递参数**

传递的参数可为状态变量，且状态变量的改变会引起@Builder方法内的UI刷新。ArkUI提供$$作为按引用传递参数的范式

```js
ABuilder( $$ : { paramA1: string, paramB1 : string } );
```

**按值传递参数**

调用@Builder装饰的函数默认按值传递。当传递的参数为状态变量时，状态变量的改变不会引起@Builder方法内的UI刷新。所以当使用状态变量的时候，推荐使用按引用传递

## 样式复用-@Styles

@Styles装饰器可以将多条`通用属性方法`和`通用事件方法`设置提炼成一个方法，直接在组件声明的位置调用，使用@Styles的方法支持传参，但组件内部定义的可以访问this

```js
// 全局
@Styles function functionName() { ... }

// 在组件内
@Component
struct FancyUse {
  @Styles fancy() {
    .height(100)
  }
}
```

## 样式扩展-@Extend

@Extend用于扩展原生组件样式，该装饰器只能在全局进行定义

与@Styles不同的是：

- 可以传递参数，并且可以是状态参数和函数，状态变量的改变会刷新UI
- 支持原生组件的私有属性和私有方法

## 多态样式-stateStyles

stateStyles是属性方法，可以根据UI内部状态来设置样式，类似于css伪类，状态样式可以与状态变量和@Styles结合使用。ArkUI提供以下四种状态：

- focused：获焦态。
- normal：正常态。
- pressed：按压态。
- disabled：不可用态。
使用方式如下：

```js
@Entry
@Component
struct StateStylesSample {
  @State color:string = "red"
  build() {
    Column() {
      Button('Click me')
        .stateStyles({
          focused: {
            .backgroundColor(this.color)
          },
          pressed: {
            .backgroundColor(Color.Black)
          },
          normal: {
            .backgroundColor(Color.Yellow)
          }
        })
    }.margin('30%')
  }
}
```

与@Styles结合：

```js
@Entry
@Component
struct MyComponent {
  @Styles normalStyle() {
    .backgroundColor(Color.Gray)
  }

  @Styles pressedStyle() {
    .backgroundColor(Color.Red)
  }

  build() {
    Column() {
      Text('Text1')
        .fontSize(50)
        .fontColor(Color.White)
        .stateStyles({
          normal: this.normalStyle,
          pressed: this.pressedStyle,
        })
    }
  }
}
```

## 状态管理

### 组件状态-@State

@State装饰的变量，或称为状态变量，和自定义组件的渲染进行绑定，与组件的生命周期相同，不与父组件同步并不可被外部访问

@State装饰的变量必须指定类型并进行初始化，如果父组件没有进行传值，则进行本地初始化，可以使用Object、class、string、number、boolean、enum类型，以及这些类型的数组，不可是一个undefined和null，慎用Date

当装饰的变量类型为class或者object时，可以观察到变量本身和顶层属性的赋值，嵌套的属性无法观察到

### 单项同步-@Prop

@Prop装饰的变量可以和父组件建立单向的同步关系。@Prop装饰的变量是可变的，不可是一个undefined和null，但是变化不会同步回其父组件

@Prop装饰的变量只能为string、number、boolean、enum类型，并允许进行本地初始化作为父组件未传参时的默认值，如果没有本地初始化，那么父组件必须传值

支持从父组件的常规变量、@State、@Link、@Prop、@Provide、@Consume、@ObjectLink、@StorageLink、@StorageProp、@LocalStorageLink和@LocalStorageProp，并支持去初始化子组件中的常规变量、@State、@Link、@Prop、@Provide

如果子组件已经在本地修改了@Prop装饰的相关变量值，而在父组件中对应的@State装饰的变量被修改后，子组件本地修改的@Prop装饰的相关变量值将被覆盖

### 双向同步-@Link

子组件中被@Link装饰的变量与其父组件中对应的数据源建立双向数据绑定，@Link装饰的变量不支持本地初始化

@Link装饰的变量支持Object、class、string、number、boolean、enum类型，以及这些类型的数组。类型必须被指定，且和双向绑定状态变量的类型相同。不支持any，不支持简单类型和复杂类型的联合类型，不允许使用undefined和null

支持从父组件中@State、@Link、@Prop、@Provide、@Consume、@ObjectLink、@StorageLink、@StorageProp、@LocalStorageLink和@LocalStorageProp装饰变量对子组件初始化并可用于初始化子组件的子组件常规变量、@State、@Link、@Prop、@Provide

父组件使用@State装饰的变量需要使用$语法，如this.name -> $name

### 深层传递-@Provide&@Consume

@Provide和@Consume，应用于与后代组件的双向数据同步，应用于状态数据在多个层级之间传递的场景。不同于上文提到的父子组件之间通过命名参数机制传递，@Provide和@Consume摆脱参数传递机制的束缚，实现跨层级传递

@Provide和@Consume可以通过相同的变量名或者相同的变量别名绑定，变量类型必须相同

```js
// 通过相同的变量名绑定
@Provide a: number = 0;
@Consume a: number;

// 通过相同的变量别名绑定
@Provide('a') b: number = 0;
@Consume('a') c: number;
```

@Provide和@Consume支持装饰Object、class、string、number、boolean、enum类型，以及这些类型的数组，不支持any，不支持简单类型和复杂类型的联合类型，不允许使用undefined和null，并必须指定初始值

### 嵌套监测-@Observed&@ObjectLink

上文所述的装饰器仅能观察到第一层的变化，对于多层嵌套的情况，比如二维数组，或者数组项class，或者class的属性是class，他们的第二层的属性变化是无法观察到的。@ObjectLink和@Observed类装饰器可用于在涉及嵌套对象或数组的场景中进行双向数据同步。

@Observed装饰class类，必须指定类型，可以被观察到实例属性的变化

@ObjectLink装饰器装饰的状态变量用于接收@Observed装饰的类的实例，相当于指向数据源的指针,和父组件中对应的状态变量建立双向数据绑定，装饰的实例属性是可以改变的，但是变量的分配是不允许的，也就是说这个装饰器装饰变量是只读的，不能被改变，不支持简单类型，简单类型可以使用@Prop。需要搭配@ObjectLink或者@Prop使用

> 使用@Observed装饰class会改变class原始的原型链，@Observed和其他类装饰器装饰同一个class可能会带来问题
>
### 页面级状态-localStorage

LocalStorage是页面级的UI状态存储，应用程序可以创建多个LocalStorage实例在页面内共享，@Entry装饰的组件，可以被分配一个LocalStorage实例，此组件的所有子组件实例(组件树)将自动获得对该LocalStorage实例的访问权限

@Component装饰的组件最多可以访问一个LocalStorage实例，只能接受父组件通过@Entry传递来的LocalStorage实例

当应用释放最后一个指向LocalStorage的引用时，比如销毁最后一个自定义组件，LocalStorage将被JS Engine垃圾回收

**@LocalStorageProp**

自定义组件初始化的时候，@LocalStorageProp(key)/@LocalStorageLink(key)装饰的变量会通过给定的key，绑定LocalStorage对应的属性，完成初始化。本地初始化是必要的，因为无法保证LocalStorage一定存在给定的key

@LocalStorageProp(key)是和LocalStorage中key对应的属性建立单向数据同步，我们允许本地改变的发生，但是对于@LocalStorageProp，本地的修改永远不会同步回LocalStorage中，相反，如果LocalStorage给定key的属性发生改变，改变会被同步给@LocalStorageProp，并覆盖掉本地的修改

@LocalStorageProp允许装饰Object、class、string、number、boolean、enum类型，以及这些类型的数组，不支持any，不允许使用undefined和null，不支持从父节点初始化，可用于初始化子组件@State、@Link、@Prop、@Provide

当装饰的数据类型为boolean、string、number类型时，可以观察到数值的变化。当装饰的数据类型为class或者Object时，可以观察到赋值和属性赋值的变化，即Object.keys(observedObject)返回的所有属性。当装饰的对象是array时，可以观察到数组添加、删除、更新数组单元的变化

**@LocalStorageLink**

@LocalStorageLink用于将自定义组件的状态变量的更新同步回LocalStorage

使用逻辑同@LocalStorageProp

**应用逻辑使用LocalStorage**

```js
let storage = new LocalStorage({ 'PropA': 47 }); // 创建新实例并使用给定对象初始化
let propA = storage.get('PropA') // propA == 47
let link1 = storage.link('PropA'); // link1.get() == 47
let link2 = storage.link('PropA'); // link2.get() == 47
let prop = storage.prop('PropA'); // prop.get() = 47
link1.set(48); // two-way sync: link1.get() == link2.get() == prop.get() == 48
prop.set(1); // one-way sync: prop.get()=1; but link1.get() == link2.get() == 48
link1.set(49); // two-way sync: link1.get() == link2.get() == prop.get() == 49
```

**从UI内部使用LocalStorage**

```js
// 创建新实例并使用给定对象初始化
let storage = new LocalStorage({ 'PropA': 47 });

@Component
struct Child {
  // @LocalStorageLink变量装饰器与LocalStorage中的'PropA'属性建立双向绑定
  @LocalStorageLink('PropA') storLink2: number = 1;

  build() {
    Button(`Child from LocalStorage ${this.storLink2}`)
      // 更改将同步至LocalStorage中的'PropA'以及Parent.storLink1
      .onClick(() => this.storLink2 += 1)
  }
}
// 使LocalStorage可从@Component组件访问
@Entry(storage)
@Component
struct CompA {
  // @LocalStorageLink变量装饰器与LocalStorage中的'PropA'属性建立双向绑定
  @LocalStorageLink('PropA') storLink1: number = 1;
  build() {
    Column({ space: 15 }) {
      Button(`Parent from LocalStorage ${this.storLink1}`) // initial value from LocalStorage will be 47, because 'PropA' initialized already
        .onClick(() => this.storLink1 += 1)
      // @Component子组件自动获得对CompA LocalStorage实例的访问权限。
      Child()
    }
  }
}
```

**将LocalStorage实例从UIAbility共享到一个或多个视图**

```js
// EntryAbility.ts
import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';

export default class EntryAbility extends UIAbility {
  storage: LocalStorage = new LocalStorage({
    'PropA': 47
  });

  onWindowStageCreate(windowStage: window.WindowStage) {
    windowStage.loadContent('pages/Index', this.storage);
  }
}
```

```js
// 通过GetShared接口获取stage共享的LocalStorage实例
let storage = LocalStorage.GetShared()

@Entry(storage)
@Component
struct CompA {
  // can access LocalStorage instance using 
  // @LocalStorageLink/Prop decorated variables
  @LocalStorageLink('PropA') varA: number = 1;

  build() {
    Column() {
      Text(`${this.varA}`).fontSize(50)
    }
  }
}
```

### 全局状态-AppStorage

AppStorage是在应用启动的时候会被创建的单例。它的目的是为了提供应用状态数据的中心存储，这些状态数据在应用级别都是可访问的。AppStorage将在应用运行过程保留其属性。属性通过唯一的键字符串值访问。

AppStorage可以和UI组件同步，且可以在应用业务逻辑中被访问

AppStorage的使用方式同LocalStorage

**从应用逻辑使用AppStorage和LocalStorage**

```js
AppStorage.SetOrCreate('PropA', 47);

let storage: LocalStorage = new LocalStorage({ 'PropA': 17 });
let propA: number = AppStorage.Get('PropA') // propA in AppStorage == 47, propA in LocalStorage == 17
var link1: SubscribedAbstractProperty<number> = AppStorage.Link('PropA'); // link1.get() == 47
var link2: SubscribedAbstractProperty<number> = AppStorage.Link('PropA'); // link2.get() == 47
var prop: SubscribedAbstractProperty<number> = AppStorage.Prop('PropA'); // prop.get() == 47

link1.set(48); // two-way sync: link1.get() == link2.get() == prop.get() == 48
prop.set(1); // one-way sync: prop.get() == 1; but link1.get() == link2.get() == 48
link1.set(49); // two-way sync: link1.get() == link2.get() == prop.get() == 49

storage.get('PropA') // == 17 
storage.set('PropA', 101);
storage.get('PropA') // == 101

AppStorage.Get('PropA') // == 49
link1.get() // == 49
link2.get() // == 49
prop.get() // == 49
```

**从UI内部使用AppStorage和LocalStorage**

```js
AppStorage.SetOrCreate('PropA', 47);
let storage = new LocalStorage({ 'PropA': 48 });

@Entry(storage)
@Component
struct CompA {
  @StorageLink('PropA') storLink: number = 1;
  @LocalStorageLink('PropA') localStorLink: number = 1;

  build() {
    Column({ space: 20 }) {
      Text(`From AppStorage ${this.storLink}`)
        .onClick(() => this.storLink += 1)
      Text(`From LocalStorage ${this.localStorLink}`)
        .onClick(() => this.localStorLink += 1)
    }
  }
}
```

### 持久化存储-PersistentStorage

PersistentStorage是应用程序中的可选单例对象。此对象的作用是持久化存储选定的AppStorage属性，以确保这些属性在应用程序重新启动时的值与应用程序关闭时的值相同

PersistentStorage将选定的AppStorage属性保留在设备磁盘上。应用程序通过API，以决定哪些AppStorage属性应借助PersistentStorage持久化。UI和业务逻辑不直接访问PersistentStorage中的属性，所有属性访问都是对AppStorage的访问，AppStorage中的更改会自动同步到PersistentStorage

PersistentStorage的持久化变量最好是小于2kb的数据，不要大量的数据持久化，因为PersistentStorage写入磁盘的操作是同步的，大量的数据本地化读写会同步在UI线程中执行，影响UI渲染性能

**从AppStorage中访问PersistentStorage初始化的属性**

```js
PersistentStorage.PersistProp('aProp', 47);

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @StorageLink('aProp') aProp: number = 48

  build() {
    Row() {
      Column() {
        Text(this.message)
        // 应用退出时会保存当前结果。重新启动后，会显示上一次的保存结果
        Text(`${this.aProp}`)
          .onClick(() => {
            this.aProp += 1;
          })
      }
    }
  }
}
```

- 新应用安装后首次启动运行：

a)调用PersistProp初始化PersistentStorage，首先查询在PersistentStorage本地文件中是否存在“aProp”，查询结果为不存在，因为应用是第一次安装。

b)接着查询属性“aProp”在AppStorage中是否存在，依旧不存在。

c)在AppStorge中创建名为“aProp”的number类型属性，属性初始值是定义的默认值47。

d)PersistentStorage将属性“aProp”和值47写入磁盘，AppStorage中“aProp”对应的值和其后续的更改将被持久化。

e)在Index组件中创建状态变量@StorageLink('aProp') aProp，和AppStorage中“aProp”双向绑定，在创建的过程中会在AppStorage中查找，成功找到a)“aProp”，所以使用其在AppStorage找到的值47。

- 触发点击事件后：

a)状态变量@StorageLink('aProp') aProp改变，触发Text组件重新刷新。

b)@StorageLink装饰的变量是和AppStorage中建立双向同步的，所以@StorageLink('aProp') aProp的变化会被同步回AppStorage中。

c)AppStorage中“aProp”属性的改变会同步到所有绑定该“aProp”的单向或者双向变量，在本示例中没有其他的绑定“aProp”的变量。

d)因为“aProp”对应的属性已经被持久化，所以在AppStorage中“aProp”的改变会触发PersistentStorage将新的改变写会本地磁盘。

- 后续启动应用：

a)执行PersistentStorage.PersistProp('aProp', 47)，在首先查询在PersistentStorage本地文件查询“aProp”属性，成功查询到。

b)将在PersistentStorage查询到的值写入AppStorage中。

c)在Index组件里，@StorageLink绑定的“aProp”为PersistentStorage写入AppStorage中的值，即为上一次退出引用存入的值

### 设备环境-Environment

Environment是ArkUI框架在应用程序启动时创建的单例对象。它为AppStorage提供了一系列描述应用程序运行状态的属性。Environment的所有属性都是不可变的（即应用不可写入），所有的属性都是简单类型

**应用逻辑使用Environment**

```js
// 使用Environment.EnvProp将设备运行languageCode存入AppStorage中；
Environment.EnvProp('languageCode', 'en');
// 从AppStorage获取单向绑定的languageCode的变量
const lang: SubscribedAbstractProperty<string> = AppStorage.Prop('languageCode');

if (lang.get() === 'zh') {
  console.info('你好');
} else {
  console.info('Hello!');
}
```

**从UI中访问Environment参数**

```js
// 将设备languageCode存入AppStorage中
Environment.EnvProp('languageCode', 'en');
let enable = AppStorage.Get('languageCode');

@Entry
@Component
struct Index {
  @StorageProp('languageCode') languageCode: string = 'en';

  build() {
    Row() {
      Column() {
        // 输出当前设备的languageCode
        Text(this.languageCode)
      }
    }
  }
}
```

### 监听器-@Watch

@Watch应用于对状态变量的监听，当状态变量变化时，@Watch的回调方法将被调用。@Watch在ArkUI框架内部判断数值有无更新使用的是严格相等（===），回调的函数类型为`(changedPropertyName? : string) => void`，changedPropertyName是被watch的属性名。在多个状态变量绑定同一个@Watch的回调方法的时候，可以通过changedPropertyName进行不同的逻辑处理

在第一次初始化的时候，@Watch装饰的方法不会被调用，方法在自定义组件的属性变更之后同步执行

### 内置组件双向绑定-$$语法

$$运算符为系统内置组件提供TS变量的引用，使得TS变量和系统内置组件的内部状态保持同步,当前$$支持基础类型变量，以及@State、@Link和@Prop装饰的变量。
当前$$仅支持bindPopup属性方法的show参数，Radio组件的checked属性，Refresh组件的refreshing参数。
$$绑定的变量变化时，会触发UI的同步刷新

```js
// xxx.ets
@Entry
@Component
struct bindPopupPage {
  @State customPopup: boolean = false;

  build() {
    Column() {
      Button('Popup')
        .margin(20)
        .onClick(() => {
          this.customPopup = !this.customPopup
        })
        .bindPopup($$this.customPopup, {
          message: 'showPopup'
        })
    }
  }
}
```
