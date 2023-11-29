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
