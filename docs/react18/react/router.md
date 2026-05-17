# React Router6

## 客户端路由

客户端路由允许您的应用通过点击链接来更新URL，而无需从服务器再次请求另一个文档。相反，您的应用可以立即呈现一些新的UI，并使用fetch进行数据请求，以使用新信息更新页面

## 嵌套路由

嵌套路由是将组件层次结构耦合到url中的一种思想，每个url都决定了

- 页面的呈现布局
- 页面布局的数据依赖关系

## 动态路由

url中的`:`具有特殊含义，表示将紧接着的部分作为动态值，称之为`params`

```jsx
[
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
];
```

这些params通过与动态段匹配的键传递给加载器。例如，我们的段名为:contactId，因此值将作为params.contactId传递

当path真实存在并且满足动态路由时，router会选择正确的路由，以真实存在的path优先

如有一下路由

```html
<Route path="/teams/:teamId" />
<Route path="/teams/new" />
```

当访问如\<http://example.com/teams/new这个地址，router是优先使用第二个>

## 创建路由器

### history路由

创建history路由通过`createBrowserRouter`方法

```js
function createBrowserRouter(routes,opts)
```

opts是可选的：

- baseName：应用程序的基本路径，常在应用无法部署到根路径时使用

- future：要为此路由器启用的一组可选的将来标志

- window：对于浏览器、devtool插件等环境或使用不同于全局window的窗口进行测试非常有用

代码如下：

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

### hash路由

使用`createHashRouter`创建hash方式的路由，创建方式与history方式相同

## route配置

route是React Router中最重要的一部分，它将URL段耦合到组件、数据加载和数据变化，通过路由的嵌套可以完成我们应用的布局逻辑

### path

组件对应的路径，通过多级嵌套的方式，与浏览器URL、链接url相匹配

\<br/>
动态段

如果路径段以:开始，则它成为“动态段”。当路由与URL匹配时，将从URL解析动态段，并将其作为params提供给其他路由器API
动态段必须是完整的，不能是 `"/teams-:teamId"`或者 `"/:teams-:teamId"`的形式

\<br/>
可选段

通过在管段末端添加?，可以使管段成为可选管段，如`path="/:lang?/categories"`的形式
也可以是可选的静态段，如`path="/lang/detail?/:id"`

\<br/>
通用段

如果路由路径模式以/*结束，则它将匹配/之后的任何字符，包括其他/字符，如`path:/file/*`

对于通用段*可以进行解构，解构时需要赋予一个新的名字

```js
let { org, "*": splat } = params;
```

### 布局组件

布局组件不需要声明path，它仅参与UI的嵌套，在布局组件中，要为子组件使用`Outlet`

```jsx
<Route
  element={
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  }
>
  <Route path="/" element={<h2>Home</h2>} />
  <Route path="/about" element={<h2>About</h2>} />
</Route>
```

### 索引路由

索引路由也称默认路由，在父路由无下级路径时进行默认渲染

```js
{
  path:"/teams",
  element:<Teams></Teams>,
  children:[
    {index:true,element:<TeamIndex></TeamIndex>},
    {path:":teamId",element:<Team></Team>}
  ]
}
```

### caseSensitive

指定caseSensitive指示路由是否进行严格的大小写匹配

### loader

当用户在应用程序中导航时，下一个匹配路由分支的加载器将被并行调用，它们的数据将通过useLoaderData提供给组件

可以在加载器中使用throw来打破当前的调用堆栈（停止运行当前的代码），从而被当前或者父级errorElement捕获

- params

动态路由的参数

```jsx
<Route
  path="/teams/:teamId"
  loader={({ params }) => {
    return fetchTeam(params.teamId);
  }}
/>;

function Team() {
  let team = useLoaderData();
  // ...
}
```

- request

这是对应用程序发出的Fetch Request实例，使用link进行导航时，如果没有React Router，浏览器会向您的服务器发出请求，但React Router阻止了它！不是浏览器将请求发送到服务器，而是React Router将请求发送到加载器

最常见的用例是创建一个URL并从中阅读URLSearchParams

```js
function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return searchProducts(searchTerm);
}
```

### action

当提交从Form、fetcher或submission发送到路由时，将调用route操作

```jsx
<Route
  path="/teams/:teamId"
  action={({ request }) => {
    const formData = await request.formData();
    return updateTeam(formData);
  }}
/>
```

### element/Component

当路由与URL匹配时要呈现的React元素/组件。

如果你想创建React元素，使用element：

```jsx
<Route path="/for-sale" element={<Properties />} />
```

否则使用Component，React Router会为你创建React元素：

```jsx
<Route path="/for-sale" Component={Properties} />
```

### errorElement/ErrorBoundary

当在loader、action或组件渲染中抛出异常时,此React元素/组件将渲染而不是正常的element/Component。

\<br/>

- 冒泡

当路由没有errorElement时，错误将通过父路由冒泡。

将errorElement放在路由树的顶部，并在一个地方处理应用中的几乎所有错误。或者，将它们放在所有路由上，并允许应用程序中没有错误的部分继续正常渲染

\<br/>

- 手动抛出错误

在loader和action中，当您使用不受您控制的外部数据时，您不能总是计划现有的数据、可用的服务或可以访问它的用户。在这些情况下，您可以throw自己的异常。
一旦你知道你不能用你正在加载的数据呈现路由，你就可以抛出来打破调用栈

\<br/>

- 抛出响应

虽然你可以抛出任何东西，但它会通过`useRouteError`返回给你，如果你抛出一个响应，React Router会自动解析响应数据，然后将其返回给你的组件。

此外，`isRouteErrorResponse`允许您在边界中检查此特定类型。结合`json`，你可以很容易地抛出一些数据的响应，并在你的边界中呈现不同的情况：

```jsx
import { json } from "react-router-dom";

function loader() {
  const stillWorksHere = await userStillWorksHere();
  if (!stillWorksHere) {
    throw json(
      {
        sorry: "You have been fired.",
        hrEmail: "hr@bigco.com",
      },
      { status: 401 }
    );
  }
}

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 401) {
    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
        <p>
          Go ahead and email {error.data.hrEmail} if you
          feel like this is a mistake.
        </p>
      </div>
    );
  }

  // rethrow to let the parent error boundary handle it
  // when it's not a special case for this route
  throw error;
}
```

这样就可以创建一个通用的错误边界，通常在根路由上，可以处理许多情况：

```jsx
function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
  ```

### 异步路由

为了保持应用程序包的规模较小并支持路由的代码拆分，每个路由都可以通过`lazy`提供一个异步函数，返回动态导入的结果。

```js
let route = {
  path: "projects",
  async loader({ request, params }) {
    let { loader } = await import("./projects-loader");
    return loader({ request, params });
  },
  lazy: () => import("./projects-component"),
}
```

## 路由导航

在React Router中有\<Link\>和navigate两种导航方式

### link

link是主要的导航方式，其仍然呈现为`<a href></a>`的形式，点击link时，react router阻止浏览器的默认行为，并通过history将新的url推入到history堆栈中，url更改后，渲染新的匹配项

### navigate

navigate函数通过`useNavigate`钩子返回，允许使用人员随时更改url

```js
let navigate = useNavigate();
useEffect(() => {
  setTimeout(() => {
    navigate("/logout");
  }, 30000);
}, []);
```

## Hook

### useBeforeUnload

在用户导航离开页面之前，将重要的应用程序状态保存在页面上（保存到浏览器的本地存储）可能很有用

```js
import { useBeforeUnload } from "react-router-dom";

function SomeForm() {
  const [state, setState] = React.useState(null);

  // save it off before users navigate away
  useBeforeUnload(
    React.useCallback(() => {
      localStorage.stuff = state;
    }, [state])
  );

  // read it in when they return
  React.useEffect(() => {
    if (state === null && localStorage.stuff != null) {
      setState(localStorage.stuff);
    }
  }, [state]);

  return <>{/*... */}</>;
}
```

### useLocation

这个钩子返回当前的location对象，在当前位置发生更改时执行一些副作用，这可能很有用

```js
function App() {
  let location = useLocation();

  React.useEffect(() => {
    // Google Analytics
    ga('send', 'pageview');
  }, [location]);

  return (
    // ...
  );
}
```

### useMatches

返回页面上的当前路由匹配项。这对于在父布局中创建抽象以访问其子路由的数据最为有用

```js
import { useMatches } from "react-router-dom";

function SomeComponent() {
  const matches = useMatches();
  // [match1, match2, ...]
}
```

match对象结构如下：

```js
{
  // route id
  id,

  // the portion of the URL the route matched
  pathname,

  // the data from the loader
  data,

  // the parsed params from the URL
  params,

  // the <Route handle> with any app specific data
  handle,
};
```

> useMatches只能与createBrowserRouter这样的数据路由器一起工作
>
### useNavigate

useNavigate钩子返回一个函数，允许您以编程方式导航

```js
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

类型声明如下：

```js
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}
```

### useParams

useParams钩子返回当前URL中与\<Route path>匹配的动态参数的键/值对的对象。子路由继承其父路由的所有参数

### useSearchParams

useSearchParams钩子用于读取和修改URL中当前位置的查询字符串。useSearchParams返回两个值的数组：当前位置的搜索参数和可用于更新它们的函数。

## API

### createSearchParams

createSearchParams是围绕new URLSearchParams(init)的一个浅包装，它添加了对使用数组值的对象的支持

### generatePath

通过静态段生成路由路径

```js
generatePath("/users/:id", { id: "42" }); // "/users/42"
generatePath("/files/:type/*", {
  type: "img",
  "*": "cat.jpg",
}); // "/files/img/cat.jpg"
```

### matchPath

matchPath根据URL路径名匹配路由路径模式，并返回有关匹配的信息。当您需要手动运行路由器的匹配算法以确定路由路径是否匹配时，此功能非常有用。如果模式与给定的路径名不匹配，则返回null

类型声明如下：

```ts
declare function matchPath<
  ParamKey extends string = string
>(
  pattern: PathPattern | string,
  pathname: string
): PathMatch<ParamKey> | null;

interface PathMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  pattern: PathPattern;
}

interface PathPattern {
  path: string;
  caseSensitive?: boolean;
  end?: boolean;
}
```

### matchRoutes

matchRoutes针对给定的location运行一组路由的路由匹配算法，以查看哪些路由（如果有的话）匹配。如果找到匹配项，则返回一个RouteMatch对象数组，每个匹配的路由对应一个对象
