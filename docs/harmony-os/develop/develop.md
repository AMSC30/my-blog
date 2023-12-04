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

**Create状态**

Create状态为在应用加载过程中，UIAbility实例创建完成时触发，系统会调用onCreate()回调。可以在该回调中进行应用初始化操作，例如变量定义资源加载等，用于后续的UI界面展示

**WindowStageCreate状态**

UIAbility实例创建完成之后，在进入Foreground之前，系统会创建一个WindowStage。WindowStage创建完成后会进入onWindowStageCreate()回调，可以在该回调中设置UI界面加载、设置WindowStage的事件订阅

在onWindowStageCreate()回调中通过loadContent()方法设置应用要加载的页面并根据需要订阅WindowStage的事件（获焦/失焦、可见/不可见）

**Foreground和Background状态**

Foreground和Background状态分别在UIAbility实例切换至前台和切换至后台时触发，对应于onForeground()回调和onBackground()回调。

onForeground()回调，在UIAbility的UI界面可见之前，如UIAbility切换至前台时触发。可以在onForeground()回调中申请系统需要的资源，或者重新申请在onBackground()中释放的资源。

onBackground()回调，在UIAbility的UI界面完全不可见之后，如UIAbility切换至后台时候触发。可以在onBackground()回调中释放UI界面不可见时无用的资源，或者在此回调中执行较为耗时的操作，例如状态保存等

**WindowStageDestroy状态**

在UIAbility实例销毁之前，则会先进入onWindowStageDestroy()回调，可以在该回调中释放UI界面资源

**Destroy状态**

Destroy状态在UIAbility实例销毁时触发。可以在onDestroy()回调中进行系统资源的释放、数据的保存等操作

### ExtensionAbility

### 服务卡片

## 进程模型

## 线程模型

## UI开发
