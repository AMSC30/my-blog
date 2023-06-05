# react语法

## JSX

JSX是一个 JavaScript 的语法扩展，它具有js的全部功能，可以很好地描述 UI 应该呈现出它应有交互的本质形式
JSX本质上还是一个表达式，可以在if和for 代码块中使用，也可以作为函数的参数和返回值
JSX会被转换成函数的调用，返回一个对象

**1. 标签书写**

- JSX中的自定义组件必须首字母大写，标识是一个变量，包括以点形式的标签名，首字母也需要是大写，点以后的不要求大写
- 不能用通用表达式作为标签名，对比点形式,A.b可以被正常接收，A[‘b’]这个通用表达式则不行，需要将通用表达式的值赋给一个大写开头的变量

**2. 属性名称书写**

因为jsx的语法更接近js，在jsx中dom的属性名称书写方式使用小驼峰的方式，而不是使用html属性名称的命名约定
例如：在jsx中class的属性变成了className，tabindex变成了tabIndex的形式

**3. props的形式**

- props接收一个大括号包裹js表达式
- props接收一个不带大括号包裹的字符串字面量
- props的默认值为true
- 可以通过展开运算符将一个对象全部作为react元素的props传入

**4. 子元素的形式**

- 子元素可以是一个字符串字面量，与标签之间的空格和换行会被去除，元素的props.children就是该字符串
- 子元素可以是多个元素的组合，此时的props.children是一个元素数组
- 子元素可以是一个返回字符串或者元素组合的js表达式，此时的props.children是表达式的值
- 子元素可以是一个回调函数（context.cumsuer）
- 布尔类型、undefined、null会被忽略

**5. 防止注入攻击**

React DOM在渲染前，所有输入内容都会转换成字符串，并对html符号转义为实体符号

### 属性传值

jsx会将react元素的属性和子元素转换为一个对象传递给react元素，也就是元素中接收的props对象，props对象是只读的，因为在react中有一个原则：所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

**1. 属性传递接收**

```js
// 传递属性
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}

// 读取props
function Avatar({ person, size }) {
  // 在这里 person 和 size 是可访问的
}
```

**2. 属性默认值**

可以通过在参数后面写 = 和默认值来进行解构

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

**3. 使用展开运算符传递props**
有时候，传递 props 会变得非常重复

```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

通过展开运算符:

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

### 事件处理

react事件采用小驼峰的命名方式，使用jsx语法需要将一个函数作为事件处理函数

**1. 创建事件处理函数**

事件处理函数可以在组件函数中声明并通过属性的方式添加到元素中

```js
export default function Button() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}
```

或者，你也可以在 JSX 中定义一个内联的事件处理函数：

```js
<button onClick={function handleClick() {
  alert('你点击了我！');
}}>
```

或者，直接使用更为简洁箭头函数：

```js
<button onClick={() => {
  alert('你点击了我！');
}}>
```

**2. 自定义事件**

内置组件（浏览器原生标签）仅支持 浏览器事件名称，例如 onClick。但是，当你构建自己的组件时，你可以按你个人喜好命名事件处理函数的 prop。

> 按照惯例，事件处理函数 props 应该以 on 开头，后跟一个大写字母。

```js
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onSmash={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
```

**3. 事件传播**

事件处理函数还将捕获任何来自子组件的事件。通常，我们会说事件会沿着树向上“冒泡”或“传播”：它从事件发生的地方开始，然后沿着树向上传播

```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <button onClick={() => alert('正在播放！')}>
        播放电影
      </button>
      <button onClick={() => alert('正在上传！')}>
        上传图片
      </button>
    </div>
  );
}
```

点击任一按钮，它自身的 onClick 将首先执行，然后父级 `<div>` 的 onClick 会接着执行。因此会出现两条消息。如果你点击 toolbar 本身，将只有父级 `<div>`的 onClick 会执行

**4. 阻止传播**

事件处理函数接收一个`事件对象`作为唯一的参数。按照惯例，它通常被称为 e ，代表 “event”（事件）。你可以使用此对象来读取有关事件的信息。

这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 Button 组件那样调用 e.stopPropagation()

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
```

极少数情况下，你可能需要捕获子元素上的所有事件，即便它们阻止了传播。例如，你可能想对每次点击进行埋点记录，传播逻辑暂且不论。那么你可以通过在事件名称末尾添加 Capture 来实现这一点
每个事件分三个阶段传播：
1). 它向下传播，调用所有的 onClickCapture 处理函数。
2). 它执行被点击元素的 onClick 处理函数。
3). 它向上传播，调用所有的 onClick 处理函数。

```js
<div onClickCapture={() => { /* 这会首先执行 */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

**5. 阻止默认行为**

某些浏览器事件具有与事件相关联的默认行为。例如，点击 `<form>`表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面

```js
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
```

### 条件渲染

通常组件会需要根据不同的情况显示不同的内容。在 React 中，可以通过使用 JavaScript 的 if 语句、&& 和 ? : 运算符来选择性地渲染 JSX

1. 通过if配置元素变量的方式渲染不同的元素

```js
function Item({ name, isPacked }) {
    if (isPacked) {
        return <li className="item">{name} ✔</li>;
    }
    return <li className="item">{name}</li>;
}

```

2. 通过&&运算符

这种方式是基于true && expression 总是会返回 expression, 而 false && expression 总是会返回 false在react中，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它

```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      { unreadMessages.length > 0 && <h2>You have {unreadMessages.length} unread messages.</h2>} 
    </div>
  );
}
```

> 注意 ：返回false的表达式会使&&后面的元素跳过，但是会返回false表达式对应的原始结果

```js
const count = 0;  
function Mailbox() {
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}  
    </div>
  );
}
// 返回 <div>0</div>
```

3. 使用三目运算符

```js
function Item({ name, isPacked }) {
   return (
        <li className="item">
            {isPacked ? name + ' ✔' : name}
        </li>
    );
}
```

4. 阻止条件渲染

通过组件内部的render方法控制渲染，如果返回null，将不会进行任何渲染，但是不会影响class组件的生命周期

```js
function WarningBanner(props) {
  if (!props.warn) {  
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>

  );
}
```

### 列表渲染

列表渲染通过返回一个元素集合实现

```js
function NumberList(props) {
    const numbers = props.numbers;

    const listItems = numbers.map( number =>
        <ListItem key={number.toString()} value={number} />
    );

    return <ul>{listItems}</ul>;
}
```

## 组件化

组件，从概念上来说，是一个返回描述页面内容的react元素的函数，接受任意的入参

### react元素

react元素可以是一个html元素标签，也可以是一个react组件，如果是一个组件，它会将jsx接收的属性以及子组件转换为单个对象（props）传入到组件中

### 状态更新

**1. 添加state**

要添加 state 变量，先从文件顶部的 React 中导入 useState

```js
import { useState } from 'react';
const [index, setIndex] = useState(0);
```

index 是一个 state 变量，setIndex 是对应的 setter 函数

**2. state是一个快照**

React 调用你的组件时，它会为特定的那一次渲染提供一张`state`快照，其中所有的值都是根据那一次渲染中`state`的值被计算出来的

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

尽管调用了三次`setNumber(number + 1)`，但在这次渲染的事件处理函数中`number`会一直是`0`

一个`state`变量的值永远不会在一次渲染的内部发生变化， 即使其事件处理函数的代码是`异步`的

**3. state更新**

React会等到事件处理函数中的所有代码都运行完毕再处理你的state更新，这就保证在组件内多次更新state，不会多次进行渲染
如果需要再一次渲染中多次根据前值更新state，可以在setter函数中传入一个函数(更新函数)，这是一种告诉react做某件事，而不是执行更新的操作

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

React会将此函数加入队列，以便在事件处理函数中的所有其他代码运行后进行处理。在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state
在替换state后更新state，会先执行替换，再用新的值调用更新函数
在更新state后替换state，会先执行更新，得到新的值，在执行替换，最终的值为替换的新值，与更新函数返回的state没有关系了

事件处理函数执行完成后，React将触发重新渲染。在重新渲染期间，React 将处理队列。更新函数会在渲染期间执行，因此 更新函数必须是 纯函数 并且只 返回 结果

**!对象更新!**

状态可以保存任何类型的 JavaScript 值，包括对象。但是不应该直接更改保持在 React 状态的对象。需要创建一个新的对象(或者创建一个现有对象的副本) ，然后设置使用该副本的状态

对于对象层次比较深的对象，可以使用'use-immer'库

```js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

**!数组更新!**

同对象一样，当你想要更新存储于 state 中的数组时，你需要创建一个新的数组（或者创建一份已有数组的拷贝值），并使用新数组设置 state

可以使用'use-immer'库：

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

### 状态重置与保留

React使用树形结构来对UI进行管理和建模。React根据`JSX`生成`UI树`。React DOM根据`UI树`去更新浏览器的`DOM元素`

**state与位置关联**

state被保存在 React 内部。根据组件在UI树中的位置，React将它所持有的每个state与正确的组件关联起来

**state保留**

只有在`相同的位置`渲染`相同的组件`时，React 才会一直保留着组件的 state

> 在UI树中的位置，而不是在jsx中的位置，位置表示层级结构相同并且父组件相同，即树形结构相匹配

**state重置**

- 相同位置的不同组件会使state重置

看以下代码：

```js
import { useState } from 'react';

export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>点击了 {counter} 次</button>
    </>
  );
}
```

每次点击按钮的时候，输入框都会清空，因为MyTextField组件被重置了，在MyComponent更新时，由于MyTextField组件定义在函数内部，每次创建的都是不同的MyTextField组件，你在相同位置渲染的是 不同 的组件，所以 React 将其下所有的 state 都重置了

- 在相同位置重置state

  方法一：将组件渲染在不同的位置

  方法二：使用key来重置state，指定一个 key 能够让 React 将 key 本身而非它们在父组件中的顺序作为位置的一部分
  >  key 不是全局唯一的。它们只能指定 父组件内部 的顺序

### 状态迁移

随着组件复杂度的增加，将很难一眼看清所有的组件状态更新逻辑，为了降低这种复杂度，并让所有逻辑都可以存放在一个易于理解的地方，你可以将这些状态逻辑移到组件之外的一个称为 reducer 的函数中

原始代码：

```js
import { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
```

迁移到reducer中的步骤：

1. 将所有修改状态的逻辑调整为dispatch的一个action

```js
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

2. 编写一个reducer函数

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
```

3. 组件中使用reducer

```js
import { useReducer } from 'react';
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

useReducer 钩子接受 2 个参数：

1）一个 reducer 函数

2）一个初始的 state

它返回如下内容：

1）一个有状态的值

2）一个 dispatch 函数（用来 “派发” 用户操作给 reducer）

**useState与useReducer对比**

- 代码体积： 通常，在使用 useState 时，一开始只需要编写少量代码。而 useReducer 必须提前编写 reducer 函数和需要调度的 actions。但是，当多个事件处理程序以相似的方式修改 state 时，useReducer 可以减少代码量。
- 可读性： 当状态更新逻辑足够简单时，useState 的可读性还行。但是，一旦逻辑变得复杂起来，它们会使组件变得臃肿且难以阅读。在这种情况下，useReducer 允许你将状态更新逻辑与事件处理程序分离开来。
- 可调试性： 当使用 useState 出现问题时, 你很难发现具体原因以及为什么。 而使用 useReducer 时， 你可以在 reducer 函数中通过打印日志的方式来观察每个状态的更新，以及为什么要更新（来自哪个 action）。 如果所有 action 都没问题，你就知道问题出在了 reducer 本身的逻辑中。 然而，与使用 useState 相比，你必须单步执行更多的代码。
- 可测试性： reducer 是一个不依赖于组件的纯函数。这就意味着你可以单独对它进行测试。一般来说，我们最好是在真实环境中测试组件，但对于复杂的状态更新逻辑，针对特定的初始状态和 action，断言 reducer 返回的特定状态会很有帮助。

个人偏好： 并不是所有人都喜欢用 reducer，没关系，这是个人偏好问题。你可以随时在 useState 和 useReducer 之间切换，它们能做的事情是一样的

**编写一个好的reducer**

- reducers 必须是纯粹的。 这一点和 状态更新函数 是相似的，reducers 在是在渲染时运行的！（actions 会排队直到下一次渲染)。 这就意味着 reducers 必须纯净，即当输入相同时，输出也是相同的。它们不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）。它们应该以不可变值的方式去更新 对象 和 数组。
- 每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。 举个例子，如果用户在一个由 reducer 管理的表单（包含五个表单项）中点击了 重置按钮，那么 dispatch 一个 reset_form 的 action 比 dispatch 五个单独的 set_field 的 action 更加合理。如果你在一个 reducer 中打印了所有的 action 日志，那么这个日志应该是很清晰的，它能让你以某种步骤复现已发生的交互或响应。这对代码调试很有帮助！

**使用Immer简化reducers**

与在平常的 state 中 修改对象 和 数组 一样，你可以使用 Immer 这个库来简化 reducer。在这里，useImmerReducer 让你可以通过 push 或 arr[i] = 来修改 state

### 使用context深层传递参数

使用步骤：

1. 创建 一个 context。

```js
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

2. 在需要数据的组件内 使用 刚刚创建的 context。

```js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

const level = useContext(LevelContext);
```

3. 在指定数据的组件中 提供这个 context。

```js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

### Hook

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

- Hook 不能在 class 组件中使用,只能在函数组件中使用
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用

#### stateHook

stateHook是允许向函数组件内添加state的hook，通过useState函数进行创建,本质上是在函数调用时保存状态的一种方式，无论是普通函数还是函数组件

参数

stateHook的参数是一个state的初始值，它可以是一个基本类型的值，也可以是一个对象，也可以是一个返回state的函数，声明多个state的时候可以多次调用hook

返回值

stateHook的返回值是第一项为state，第二项为改变state的函数组成的数组

更新state

与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

```js
const [state, setState] = useState({});
setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...updatedValues};
});
```

更新过程
调用更新函数，传入一个值或者一个返回新的state的函数，更新函数将通过object.is比较前后的两个状态，如果不相等，那么将组件的更新放入下一次执行的队列中，如果相等，跳过子组件的更新和effet的执行

#### effectHook

effectHook用于定义react组件在特定生命周期时刻执行相应的副作用，它接收一个副作用函数作为参数，默认情况下，在每次dom更新渲染后都会执行副作用函数

```js
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;  
  });
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

调用时机

使用useEffect定义的函数，在浏览器完成布局与绘制之后，在一个延迟事件中被调用

返回值

返回值为一个清除函数，在组件卸载和依赖值发生改变的时候会执行清除函数，相当于在class组件中componentWillUnmount的生命周期中执行的函数

阻止执行

通过在useEffect函数的第二个参数添加一个数组来明确指定在哪个值更新后，执行相应副作用，如果传入的是一个空数组，那么不会在更新后执行副作用，只会在初始渲染后执行

> Tips：如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值

#### useContext

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值，使组件能够读取 context 的值以及订阅 context 的变化。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>`的 value prop 决定

触发渲染

调用了 useContext 的组件总会在 context 值变化时重新渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。

#### useReducer

useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）
const [state, dispatch] = useReducer(reducer, initialArg, init);

初始化state

1. 将state作为第二个参数
2. 传入第三个参数作为初始化函数initialArg(init)的返回值将作为初始state，并为重置state提供可能

```js
function init(initialCount) {  return {count: initialCount};}
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':      return init(action.payload);    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

跳过dispatch
如果reducer返回的state与前一个state相同，将跳过子组件的渲染和effect的执行

#### useCallback

把内联回调函数及依赖项数组作为参数传入 useCallback，内联的回调函数不会执行，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

#### useMemo

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。
如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

#### useRef

当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现

**ref与DOM**
useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

> useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象

#### useLayoutEffect

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新

#### 自定义Hook

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook

API
React
Component
Component用于创建class组件

生命周期图

render方法
render方法是class组件中唯一必须实现的方法
当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：

- React 元素。通常通过 JSX 创建。例如，`<div />`会被 React 渲染为 DOM 节点，`<MyComponent />`会被 React 渲染为自定义组件，无论是 `<div />` 还是 `<MyComponent />`均为 React 元素。
- 数组或 fragments。 使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 fragments 文档。
- Portals。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 portals 的文档
- 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
- 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && `<Child />`的模式，其中 test 为布尔类型。)
如果 shouldComponentUpdate() 返回 false，则不会调用 render()。

constructor
构造函数，用来初始化实例的state和事件方法绑定，如果是继承自React.Component，需要在构造函数中调用super方法，否则可能会出现this.props无法访问的情况

componentDidMount
componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

getSnapshotBeforeUpdate
getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。

```js
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ？
    // 捕获滚动位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/*...contents...*/}</div>
    );
  }
}
```

componentDidUpdate
componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。、
你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能
componentDidUpdate(prevProps, prevState, snapshot)

componentWillUnmount
componentWillUnmount() 会在组件卸载及销毁之前直接调用。

static getDerivedStateFromError
此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {    // 更新 state 使下一次渲染可以显降级 UI    return { hasError: true };  }
  render() {
    if (this.state.hasError) {      // 你可以渲染任何自定义的降级  UI      return <h1>Something went wrong.</h1>;    }
    return this.props.children;
  }
}
```

componentDidCatch
此生命周期在后代组件抛出错误后被调用。 它接收两个参数：

1. error —— 抛出的错误。
2. info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。
componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {    // "组件堆栈" 例子:    //   in ComponentThatThrows (created by App)    //   in ErrorBoundary (created by App)    //   in div (created by App)    //   in App    logComponentStackToMyService(info.componentStack);  }
  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

在开发模式下，错误会冒泡至 window，这意味着任何 window.onerror 或 window.addEventListener('error', callback) 会中断这些已经被 componentDidCatch() 捕获的错误。
相反，在生产模式下，错误不会冒泡，这意味着任何根错误处理器只会接受那些没有显式地被 componentDidCatch() 捕获的错误。

如果发生错误，你可以通过调用 setState 使用 componentDidCatch() 渲染降级 UI，但在未来的版本中将不推荐这样做。 可以使用静态 getDerivedStateFromError() 来处理降级渲染。

PureComponent
React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数，如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。

使用该方法的情景

1. 仅在你的 props 和 state 较为简单时
2. 在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新

对子组件的影响
React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新，因此，请确保所有子组件也都是“纯”的组件
Memo
memo通过记忆组件渲染结果的方式来提高组件的性能表现，memo只会对props作浅层比较，如果memo包裹的是一个函数组件并且使用了useState、useReducer、useContext，当状态值发生变化时也会更新组件

```js
const MyComponent = React.memo(function MyComponent(props) {
  /*使用 props 渲染*/
});
```

想要自定义比较逻辑，memo第二个参数接受一个比较函数，比较函数的参数分别为prevProps，curProps，当比较函数返回true时，表示前后两个props相等，不做更新，否则更新组件，这与shouldComponentUpdate相反

Children
React.Children方法用于处理this.props.children

map与each
对每个child调用方法，如果children不是一个null或者undefined，map方法会返回一个新的数组，如果是，则返回null或者undefined
React.Children.map(children, function[(thisArg)])

count
返回children中子组件数量，等同于调用map或者each方法的次数

toArray
将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。当你想要在渲染函数中操作子节点的集合时，它会非常实用，特别是当你想要在向下传递 this.props.children 之前对内容重新排序或获取子集时。

Lazy
lazy接口用于懒加载组件，结合suspense组件使用，可以实现优雅的降级，lazy接收一个返回promise对象的函数，组件作为promise值的default进行暴露

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

suspense组件可以置于懒加载组件之上的任何位置，同时可以包含多个懒加载组件
React dom
render
将react元素渲染到容器中，第一次渲染时，会替换掉容器元素的所有子元素，后续的渲染后会根据diff算法高效地更新
ReactDOM.render(element, container[, callback])

unmountComponentAtNode
从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false
对复用的思考
组件复用大概经历了以下几个过程：mixin->HOC->render props ->hook

1. mixin：mixin是最早实现状态和逻辑复用的方式，其实现时将class中公共的方法抽取成一个对象，在需要用到mixin中逻辑的组件中通过mixin属性进行混入

 缺陷：

- 隐式依赖导致关系不透明
- 命名可能发生冲突

2. HOC：hoc的使用思路是将公共的状态和逻辑抽取成一个组件，并返回一个接受组件的函数，在函数中定义可复用的组件，并将传入的组件与共用组件进行组合，返回新的组件

缺陷：
扩展性不能完全代替mixin，比如生命周期

- wrapper hell导致代码难以理解和维护
- ref传递问题

4. render props：将公共的状态和逻辑通过组件的方式封装起来，将需要定义的渲染结果通过props的方式传入到组件中，props可以是一个组件也可以是一个返回react元素的函数

缺陷

- 使用繁琐: HOC使用只需要借助装饰器语法通常一行代码就可以进行复用,Render Props无法做到如此简单
- 嵌套过深: Render Props虽然摆脱了组件多层嵌套的问题,但是转化为了函数回调的嵌套

4. hook：因为组件本质上是由状态、逻辑和渲染组成的，而如果一个组件不同，往往渲染是不同的，但存在相同的状态和逻辑，hook就是通过闭包的方式，将公共的状态和逻辑进行抽离
