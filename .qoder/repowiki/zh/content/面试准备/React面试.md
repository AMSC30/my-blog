# React面试

<cite>
**本文档引用的文件**
- [React.md](file://docs/interview/React/React.md)
- [state_props.md](file://docs/interview/React/state_props.md)
- [setState.md](file://docs/interview/React/setState.md)
- [diff.md](file://docs/interview/React/diff.md)
- [Real DOM_Virtual DOM.md](file://docs/interview/React/Real DOM_Virtual DOM.md)
- [Fiber.md](file://docs/interview/React/Fiber.md)
- [React Router.md](file://docs/interview/React/React Router.md)
- [React Router model.md](file://docs/interview/React/React Router model.md)
- [High order components.md](file://docs/interview/React/High order components.md)
- [communication.md](file://docs/interview/React/communication.md)
- [SyntheticEvent.md](file://docs/interview/React/SyntheticEvent.md)
- [Improve performance.md](file://docs/interview/React/Improve performance.md)
- [key.md](file://docs/interview/React/key.md)
- [render.md](file://docs/interview/React/render.md)
- [server side rendering.md](file://docs/interview/React/server side rendering.md)
- [how to use redux.md](file://docs/interview/React/how to use redux.md)
</cite>

## 目录
1. [简介](#简介)
2. [项目结构](#项目结构)
3. [核心组件](#核心组件)
4. [架构总览](#架构总览)
5. [详细组件分析](#详细组件分析)
6. [依赖分析](#依赖分析)
7. [性能考量](#性能考量)
8. [故障排查指南](#故障排查指南)
9. [结论](#结论)
10. [附录](#附录)

## 简介
本指南面向React面试，系统梳理React核心与进阶知识，覆盖组件、Props、State、生命周期与渲染、Hooks、高阶组件、Fiber架构、Diff算法、虚拟DOM、React Router、Redux使用、服务端渲染、性能优化等高频考点，并提供解题思路与可视化图示，帮助读者建立完整的知识体系。

## 项目结构
仓库为VuePress文档站点，React面试相关内容集中在 docs/interview/React 目录下，按主题拆分文档，便于查阅与复习。

```mermaid
graph TB
A["面试React专题"] --> B["React基础与特性"]
A --> C["状态与生命周期"]
A --> D["Diff与虚拟DOM"]
A --> E["Fiber与调度"]
A --> F["路由与导航"]
A --> G["高阶组件与通信"]
A --> H["事件机制与性能"]
A --> I["服务端渲染"]
A --> J["状态管理Redux"]
```

## 核心组件
- 组件与Props/State：组件化思想、Props单向传递、State驱动渲染、setState更新机制与批处理。
- 渲染与JSX：render原理、JSX编译、createElement生成虚拟DOM。
- Diff与Key：Tree/Component/Element三层策略、Key的作用与最佳实践。
- Fiber：可中断/可恢复的协作式调度、优先级与requestIdleCallback。
- 路由：BrowserRouter/HashRouter、Route/Link/NavLink、Switch/Redirect、Hooks(useHistory/useParams/useLocation)。
- 高阶组件：HOC模式、约定与ref转发、典型场景（权限、日志、性能监控）。
- 事件机制：合成事件、事件注册/冒泡/派发、与原生事件的执行顺序与阻止策略。
- 性能优化：避免内联函数、Fragment、事件绑定优化、Immutable、懒加载、SSR。
- 服务端渲染：SSR原理、同构、renderToString、StaticRouter上下文。
- Redux：Provider/connect、mapStateToProps/mapDispatchToProps、项目结构划分。

章节来源
- [React.md:1-140](file://docs/interview/React/React.md#L1-L140)
- [state_props.md:1-89](file://docs/interview/React/state_props.md#L1-L89)
- [setState.md:1-215](file://docs/interview/React/setState.md#L1-L215)
- [render.md:1-218](file://docs/interview/React/render.md#L1-L218)
- [diff.md:1-154](file://docs/interview/React/diff.md#L1-L154)
- [key.md:1-131](file://docs/interview/React/key.md#L1-L131)
- [Fiber.md:1-136](file://docs/interview/React/Fiber.md#L1-L136)
- [React Router.md:1-349](file://docs/interview/React/React Router.md#L1-L349)
- [React Router model.md:1-168](file://docs/interview/React/React Router model.md#L1-L168)
- [High order components.md:1-180](file://docs/interview/React/High order components.md#L1-L180)
- [communication.md:1-197](file://docs/interview/React/communication.md#L1-L197)
- [SyntheticEvent.md:1-155](file://docs/interview/React/SyntheticEvent.md#L1-L155)
- [Improve performance.md:1-206](file://docs/interview/React/Improve performance.md#L1-L206)
- [server side rendering.md:1-285](file://docs/interview/React/server side rendering.md#L1-L285)
- [how to use redux.md:1-231](file://docs/interview/React/how to use redux.md#L1-L231)

## 架构总览
React以组件为核心，通过Props/State驱动渲染，借助虚拟DOM与Diff算法高效更新UI；Fiber实现可中断/可恢复的协作式调度；路由通过BrowserRouter/HashRouter与Route/Link等组件实现SPA导航；状态管理可通过Redux连接React与集中式Store；SSR提升首屏性能与SEO。

```mermaid
graph TB
subgraph "视图层"
Comp["组件(类/函数)"]
JSX["JSX/React.createElement"]
VDOM["虚拟DOM树"]
end
subgraph "调度与更新"
Fiber["Fiber Reconciler<br/>可中断/优先级/协作式"]
Diff["Diff算法<br/>Tree/Component/Element"]
end
subgraph "状态与数据"
State["State/Props"]
Redux["Redux Store<br/>Provider/connect"]
end
subgraph "路由"
Router["BrowserRouter/HashRouter"]
RouteComp["Route/Link/NavLink/Switch/Redirect"]
end
subgraph "事件"
SynEvt["合成事件系统"]
end
subgraph "渲染"
SSR["服务端渲染(SSR)<br/>renderToString/StaticRouter"]
end
Comp --> JSX --> VDOM
State --> Comp
VDOM --> Diff --> Fiber
Redux --> Comp
Router --> RouteComp
Comp --> SynEvt
SSR --> Comp
```

图表来源
- [render.md:1-218](file://docs/interview/React/render.md#L1-L218)
- [Fiber.md:1-136](file://docs/interview/React/Fiber.md#L1-L136)
- [diff.md:1-154](file://docs/interview/React/diff.md#L1-L154)
- [React Router.md:1-349](file://docs/interview/React/React Router.md#L1-L349)
- [how to use redux.md:1-231](file://docs/interview/React/how to use redux.md#L1-L231)
- [server side rendering.md:1-285](file://docs/interview/React/server side rendering.md#L1-L285)
- [SyntheticEvent.md:1-155](file://docs/interview/React/SyntheticEvent.md#L1-L155)

## 详细组件分析

### 组件、Props与State
- 组件化思想：一切皆组件，函数组件与类组件均可，Props自上而下传递，State在组件内部管理。
- setState机制：异步更新、批处理合并、函数式setState保证依赖前一个state。
- 渲染触发：类组件setState必触发render；函数组件useState在值变化时触发render。

```mermaid
flowchart TD
S["调用 setState / useState"] --> Q{"是否需要更新?"}
Q --> |否| R["不触发 re-render"]
Q --> |是| U["入队更新/批处理"]
U --> F["触发 re-render"]
F --> D["生成新虚拟DOM树"]
D --> C["Diff对比"]
C --> P["仅更新差异节点"]
```

图表来源
- [setState.md:1-215](file://docs/interview/React/setState.md#L1-L215)
- [render.md:1-218](file://docs/interview/React/render.md#L1-L218)

章节来源
- [React.md:1-140](file://docs/interview/React/React.md#L1-L140)
- [state_props.md:1-89](file://docs/interview/React/state_props.md#L1-L89)
- [setState.md:1-215](file://docs/interview/React/setState.md#L1-L215)
- [render.md:1-218](file://docs/interview/React/render.md#L1-L218)

### 虚拟DOM与Diff算法
- 虚拟DOM：以JS对象描述真实DOM，JSX经编译为createElement，形成VDOM树。
- Diff策略：Tree层级拒绝跨级移动；Component层级同类型才深入；Element层级用Key定位节点，减少移动/插入/删除。
- Key最佳实践：稳定唯一、不使用随机数、index非key。

```mermaid
flowchart TD
A["旧VDOM"] --> B["遍历旧子节点"]
B --> K{"是否存在对应新节点?"}
K --> |是| M["移动/复用节点"]
K --> |否| R["删除旧节点"]
M --> N["继续遍历"]
R --> N
N --> E["新VDOM"]
```

图表来源
- [diff.md:1-154](file://docs/interview/React/diff.md#L1-L154)
- [key.md:1-131](file://docs/interview/React/key.md#L1-L131)
- [Real DOM_Virtual DOM.md:1-94](file://docs/interview/React/Real DOM_Virtual DOM.md#L1-L94)

章节来源
- [Real DOM_Virtual DOM.md:1-94](file://docs/interview/React/Real DOM_Virtual DOM.md#L1-L94)
- [diff.md:1-154](file://docs/interview/React/diff.md#L1-L154)
- [key.md:1-131](file://docs/interview/React/key.md#L1-L131)

### Fiber架构与调度
- 问题：Stack Reconciler渲染过程不可中断，长任务阻塞主线程。
- 解决：Fiber将渲染拆分为多个子任务，具备优先级、可中断/恢复、协作式调度；基于链表结构快速定位下一个执行目标。
- 数据结构：Fiber节点包含tag、child、sibling、return、pendingProps、memoizedProps、updateQueue、effect等。

```mermaid
sequenceDiagram
participant B as "浏览器主线程"
participant R as "React调度器(Fiber)"
participant W as "工作单元(单个Fiber)"
B->>R : 任务开始
loop 多轮协作
R->>W : 执行工作(计算/更新)
W-->>R : 返回剩余时间
alt 有剩余时间
R->>W : 继续执行
else 时间不足
R-->>B : 释放控制权
B-->>R : 空闲回调
end
end
R-->>B : 完成任务
```

图表来源
- [Fiber.md:1-136](file://docs/interview/React/Fiber.md#L1-L136)

章节来源
- [Fiber.md:1-136](file://docs/interview/React/Fiber.md#L1-L136)

### React Router与导航
- 模式：hash模式(HashRouter)与history模式(BrowserRouter)。
- 组件：Route、Link/NavLink、Switch、Redirect；Hooks：useHistory、useParams、useLocation。
- 参数传递：动态路由(:id)、search查询参数、to传对象。

```mermaid
sequenceDiagram
participant U as "用户"
participant L as "Link/导航"
participant BR as "BrowserRouter/HashRouter"
participant RT as "Route"
participant C as "目标组件"
U->>L : 点击链接
L->>BR : 触发URL变更
BR-->>RT : 通知location变化
RT->>RT : 匹配path
RT-->>C : 渲染组件
```

图表来源
- [React Router.md:1-349](file://docs/interview/React/React Router.md#L1-L349)
- [React Router model.md:1-168](file://docs/interview/React/React Router model.md#L1-L168)

章节来源
- [React Router.md:1-349](file://docs/interview/React/React Router.md#L1-L349)
- [React Router model.md:1-168](file://docs/interview/React/React Router model.md#L1-L168)

### 高阶组件(HOC)与组件通信
- HOC：以函数包装组件，透传props、避免重复逻辑、注意ref转发与显示名。
- 通信：父子、子父、兄弟、跨代(Provider/Consumer或Context)、非关系(全局状态如Redux)。

```mermaid
classDiagram
class WrappedComponent {
+props
+state
}
class EnhancedComponent {
+hoc逻辑
+透传props
}
WrappedComponent <.. EnhancedComponent : "HOC包装"
```

图表来源
- [High order components.md:1-180](file://docs/interview/React/High order components.md#L1-L180)
- [communication.md:1-197](file://docs/interview/React/communication.md#L1-L197)

章节来源
- [High order components.md:1-180](file://docs/interview/React/High order components.md#L1-L180)
- [communication.md:1-197](file://docs/interview/React/communication.md#L1-L197)

### 事件机制与合成事件
- 合成事件：React统一在document注册事件，跨浏览器包装，提供与原生事件相同接口。
- 执行顺序：原生事件先于React事件，最后document事件；阻止冒泡需区分stopPropagation与stopImmediatePropagation。

```mermaid
sequenceDiagram
participant D as "真实DOM"
participant DOC as "document(统一监听)"
participant RE as "React合成事件"
D->>DOC : 原生事件冒泡
DOC-->>RE : 触发React回调队列
RE-->>D : 调用JSX定义的回调
DOC-->>D : 最终触发document事件
```

图表来源
- [SyntheticEvent.md:1-155](file://docs/interview/React/SyntheticEvent.md#L1-L155)

章节来源
- [SyntheticEvent.md:1-155](file://docs/interview/React/SyntheticEvent.md#L1-L155)

### 性能优化
- 避免内联函数与bind/箭头函数在render中创建新实例；使用Fragment减少多余容器；事件绑定优化。
- 使用Immutable减少深比较成本；React.lazy/Suspense实现懒加载；SSR加速首屏。
- shouldComponentUpdate/PureComponent/React.memo减少不必要渲染。

章节来源
- [Improve performance.md:1-206](file://docs/interview/React/Improve performance.md#L1-L206)

### 服务端渲染(SSR)
- 原理：服务端renderToString生成HTML，客户端hydrate接管交互；路由需用StaticRouter并传递context。
- 同构：服务端渲染结构，客户端绑定事件与交互。

```mermaid
sequenceDiagram
participant S as "Node服务"
participant R as "React组件"
participant H as "HTML字符串"
participant B as "浏览器"
S->>R : 渲染组件
R-->>H : renderToString
S-->>B : 返回HTML + script
B->>R : hydrate(复用结构)
R-->>B : 绑定事件/交互
```

图表来源
- [server side rendering.md:1-285](file://docs/interview/React/server side rendering.md#L1-L285)

章节来源
- [server side rendering.md:1-285](file://docs/interview/React/server side rendering.md#L1-L285)

### Redux在React中的使用
- Provider：将store注入应用根部。
- connect：mapStateToProps与mapDispatchToProps将state/dispatch映射为props。
- 项目结构：按角色(MVC)或按功能模块划分。

```mermaid
sequenceDiagram
participant C as "容器组件"
participant P as "Provider"
participant S as "Redux Store"
P->>C : 注入store
C->>S : dispatch(action)
S-->>C : 更新state
C-->>C : mapStateToProps映射props
C-->>UI : 渲染UI
```

图表来源
- [how to use redux.md:1-231](file://docs/interview/React/how to use redux.md#L1-L231)

章节来源
- [how to use redux.md:1-231](file://docs/interview/React/how to use redux.md#L1-L231)

## 依赖分析
- 组件与渲染：组件依赖Props/State，render生成VDOM，Diff更新真实DOM。
- Fiber：Reconciler依赖Fiber节点结构与优先级队列。
- 路由：Router监听URL变化，Route匹配并渲染组件。
- 事件：合成事件统一在document注册，与原生事件顺序相关。
- 状态：Redux通过Provider/connect与组件解耦。
- SSR：服务端renderToString与客户端hydrate配合。

```mermaid
graph LR
Comp["组件"] --> |Props/State| Render["render(JSX)"]
Render --> VDOM["虚拟DOM"]
VDOM --> Diff["Diff算法"]
Diff --> DOM["真实DOM"]
Fiber["Fiber Reconciler"] --> Comp
Router["Router/Route"] --> Comp
SynEvt["合成事件"] --> Comp
Redux["Provider/connect"] --> Comp
SSR["SSR/StaticRouter"] --> Comp
```

图表来源
- [render.md:1-218](file://docs/interview/React/render.md#L1-L218)
- [Fiber.md:1-136](file://docs/interview/React/Fiber.md#L1-L136)
- [React Router.md:1-349](file://docs/interview/React/React Router.md#L1-L349)
- [SyntheticEvent.md:1-155](file://docs/interview/React/SyntheticEvent.md#L1-L155)
- [how to use redux.md:1-231](file://docs/interview/React/how to use redux.md#L1-L231)
- [server side rendering.md:1-285](file://docs/interview/React/server side rendering.md#L1-L285)

## 性能考量
- 渲染层面：减少不必要的render，使用PureComponent/React.memo；避免内联函数与bind/箭头函数在render中创建新实例。
- 工程层面：代码分割与懒加载；Webpack/Treeshaking；SSR提升首屏。
- 机制层面：Fiber协作式调度；Diff算法最小化DOM变更；Key优化列表更新。

## 故障排查指南
- 列表渲染警告：未设置唯一key；建议使用稳定字段或避免使用index作为key。
- 事件冒泡：合成事件与原生事件顺序不同，需使用stopPropagation或stopImmediatePropagation区分处理。
- setState不生效：直接修改state不会触发更新，需通过setState；在setTimeout或原生事件中为同步更新。
- 路由跳转：HashRouter/History模式差异；Switch仅匹配首个Route；参数传递使用动态路由/查询参数/对象形式。
- SSR同构：服务端与客户端结构需一致，使用StaticRouter并传递context；hydrate失败多因结构不匹配。

章节来源
- [key.md:1-131](file://docs/interview/React/key.md#L1-L131)
- [SyntheticEvent.md:1-155](file://docs/interview/React/SyntheticEvent.md#L1-L155)
- [setState.md:1-215](file://docs/interview/React/setState.md#L1-L215)
- [React Router.md:1-349](file://docs/interview/React/React Router.md#L1-L349)
- [server side rendering.md:1-285](file://docs/interview/React/server side rendering.md#L1-L285)

## 结论
本指南从基础到进阶系统梳理React面试高频知识点，强调原理与实践结合，建议配合代码片段路径与可视化图示进行记忆与讲解，针对不同岗位侧重可调整复习重点（如前端岗偏重Hooks/Diff/Router，中高级偏重Fiber/SSR/性能）。

## 附录
- 常见面试题思路
  - 说说对React的理解：组件化、声明式、虚拟DOM、单向数据流。
  - setState执行机制：异步批处理、函数式更新、同步场景。
  - Diff与Key：Tree/Component/Element策略、Key稳定性与性能。
  - Fiber：协作式调度、优先级、可中断恢复。
  - React Router：模式与组件、参数传递、Hooks使用。
  - 事件机制：合成事件、执行顺序、阻止策略。
  - 性能优化：减少render、懒加载、SSR、Immutable。
  - SSR：原理、同构、StaticRouter、hydrate。
  - Redux：Provider/connect、mapStateToProps/mapDispatchToProps、项目结构。