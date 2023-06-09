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

#### useState

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

#### useDeferredValue

在组件的顶层调用 useDeferredValue 以获得该值的延迟版本，允许您延迟更新 UI 的一部分，在初始渲染期间，返回的延迟值将与初始值相同。在更新期间，React 将首先尝试使用旧值重新渲染(因此它将返回旧值) ，然后尝试在后台使用新值重新渲染(因此它将返回更新的值)

#### useEffect

effectHook用于定义react组件在特定生命周期时刻执行相应的副作用，它接收一个副作用函数作为参数，默认情况下，在每次dom更新渲染后都会执行副作用函数

使用步骤：

1. 声明一个effect
2. 指定依赖项。大多数效果应该只在需要的时候重新运行，而不是在每次渲染之后
3. 如果需要，添加清理函数

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

返回值为一个清除函数，在组件卸载和依赖值发生改变的时候会执行清除函数

阻止执行

通过在useEffect函数的第二个参数添加一个数组来明确指定在哪个值更新后，执行相应副作用，如果传入的是一个空数组，那么不会在更新后执行副作用，只会在初始渲染后执行

> Tips：如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值

#### useInsertionEffect

useInsertionEffect是useEffect的一个版本，在任何DOM突变之前触发，允许我们在dom更新前做一些事情

```js
import { useInsertionEffect } from 'react';

// Inside your CSS-in-JS library
function useCSS(rule) {
  useInsertionEffect(() => {
    // ... inject <style> tags here ...
  });
  return rule;
}
```

#### useLayoutEffect

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新
>useLayoutEffect(setup, dependencies?)

- setup：带有Effect逻辑的函数。您的setup函数也可以选择返回一个cleanup函数。在你的组件被添加到DOM之前，React会运行你的setup函数。在每次使用更改的依赖项重新渲染之后，React将首先使用旧值运行cleanup函数（如果您提供了它），然后使用新值运行setup函数。在你的组件从DOM中移除之前，React会运行你的清理函数。

- 可选dependencies：setup代码中引用的依赖项。反应性值包括props、state以及所有直接在组件主体中声明的变量和函数。如果你的linter被配置为React，它将验证每个reactive值都被正确指定为依赖项。依赖项列表必须有固定数量的项，并像[dep1, dep2, dep3]一样内联编写。React将使用Object.is比较将每个依赖项与其先前的值进行比较。如果省略此参数，则每次重新渲染组件后，都会重新运行Effect

useLayoutEffect中的代码和所有从它调度的状态更新都会阻止浏览器重新绘制屏幕。当过度使用时，这会使您的应用程序变慢

#### useContext

接收一个 context 对象（createContext 的返回值）并返回该 context 的当前值，使组件能够读取 context 的值以及订阅 context 的变化。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>`的 value prop 决定

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

在react组件更新时，该组件中的子组件也会递归得更新，出于对性能的考虑，结合memo与useCallback可以对组件进行缓存，使用memo定义的组件，如果所有的props都相同，那么作为子组件不会更新

```js
import { memo，useCallback } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});

function ProductPage({ productId, referrer, theme }) {
  // Tell React to cache your function between re-renders...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ...so as long as these dependencies don't change...

  return (
    <div className={theme}>
      {/* ...ShippingForm will receive the same props and can skip re-rendering */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

#### useMemo

把`创建函数`和`依赖项数组`作为参数传入`useMemo`，它仅会在某个依赖项改变时才重新计算`memoized`值。这种优化有助于避免在每次渲染时都进行高开销的计算。
记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于`useEffect`的适用范畴，而不是useMemo。
如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
你可以把`useMemo`作为性能优化的手段，但不要把它当成语义上的保证。

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

**管理ref列表**

在jsx中使用列表循环，由于hook只能在组件的顶层调用，不能在循环语句、条件语句和map之类的函数中使用，看以下代码

```js
<ul>
  {items.map((item) => {
    // 行不通！
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```

一种方法是用一个 ref 引用其父元素，然后用 DOM 操作方法如 querySelectorAll 来寻找它的子节点。然而，这种方法很脆弱，如果 DOM 结构发生变化，可能会失效或报错

我们看下第二种方法，将函数传递给 ref 属性。这称为 ref 回调。当需要设置 ref 时，React 将传入 DOM 节点来调用你的 ref 回调，并在需要清除它时传入 null

```js
import { useRef } from 'react';

export default function CatFriends() {
  const itemsRef = useRef(null);

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>
          Tom
        </button>
        <button onClick={() => scrollToId(5)}>
          Maru
        </button>
        <button onClick={() => scrollToId(9)}>
          Jellylorum
        </button>
      </nav>
      <div>
        <ul>
          {catList.map(cat => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            >
              <img
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i
  });
}

```

**访问另一个组件的DOM节点**

将ref放在浏览器原生组件上时，react会将ref的current属性设置为相应的dom节点，但是就爱那个ref放在自定义组件上时，不会有这种效果，要访问组件的dom，首先目标组件需要使用forwardRef创建，参数为组件函数，组件函数接收两个参数，一个是props，一个是父组件传过来的ref，子组件将接收到的ref传递到自身内部

app.js

```js
import { useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```

#### useImperativeHandle

在组件顶层通过调用 useImperativeHandle 来自定义 ref 暴露出来的句柄

假设你不想暴露出整个 <input> DOM 节点，但你想要它其中两个方法：focus 和 scrollIntoView。为此，用单独额外的 ref 来指向真实的浏览器 DOM。然后使用 useImperativeHandle 来暴露一个句柄，它只返回你想要父组件去调用的方法：

```js
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```

#### useTransition

在组件的顶层调用 useTransition，将某些状态更新标记为转换状态。

**返回值**

- isPending 标志，告诉你是否存在待处理的转换。
- startTransition 函数 允许你将状态更新标记为转换状态。

#### 自定义Hook

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook

## 内置组件

### Fragment

使用Fragment或等效的`<>...</>`语法将多个元素组合在一起。可以使用它将多个元素放置在单个元素可以放置的任何位置

如果你想把key传递给一个Fragment，你不能使用`<>...</>`语法。必须显式导入Fragment并渲染`<Fragment key={yourKey}>...</Fragment>`。

当从渲染`<><Child /></>`转到`[<Child />]`返回时，或者从渲染`<><Child /></>`转到`<Child />`并返回时，React不会重置状态。这只适用于一个级别的深度：例如，从`<><><Child /></></>`到`<Child />`重置状态

**用途**

1. 返回多个元素

```js
export default function Blog() {
  return (
    <>
      <Post title="An update" body="It's been a while since I posted..." />
      <Post title="My new blog" body="I am starting a new blog!" />
    </>
  )
}
```

2. 将多个元素返给变量

```js
function CloseDialog() {
  const buttons = (
    <>
      <OKButton />
      <CancelButton />
    </>
  );
  return (
    <AlertDialog buttons={buttons}>
      Are you sure you want to leave this page?
    </AlertDialog>
  );
}
```

3. 渲染列表片段

```js
function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}
```

### Profiler

将组件树包装在`<Profiler>`中以测量其渲染性能,允许以编程方式测量React树的渲染性能

**参数**

- id：一个字符串，标识您正在测量的UI部分。
- onRender：一个onRender回调，React每次更新配置树中的组件时都会调用。它接收有关渲染内容和所用时间的信息

```js
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```

**onRender**

React将调用onRender回调函数，并提供有关渲染内容的信息。

```js
function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings...
}
```

- id：刚刚提交的id树的字符串`<Profiler>`prop。如果使用多个分析器，能够识别树的哪个部分被提交。
- phase："mount"、"update"或"nested-update"。这可以知道树是第一次被挂载还是由于props、state或hook的更改而被重新渲染。
- actualDuration：为当前更新渲染`<Profiler>`及其后代所花费的毫秒数。这指示子树如何利用记忆化（例如memo和useMemo）。理想情况下，这个值应该在初始挂载后显著降低，因为许多后代只需要在其特定道具更改时重新渲染。
- baseDuration：估计在没有任何优化的情况下重新渲染整个`<Profiler>`子树所需的时间的毫秒数。它是通过对树中每个组件的最近渲染持续时间求和来计算的。该值估计渲染的最坏情况成本（例如，初始安装或没有记忆的树）。将actualDuration与它进行比较，看看记忆化是否有效。
- startTime：React开始渲染当前更新的时间戳。
- endTime：React提交当前更新的时间戳。此值在提交中的所有分析器之间共享，从而使它们能够根据需要进行分组

> 使用Profiler组件，会有一定的性能损耗，所以在生产环境上最好禁用

### StrictMode

为应用开启严格模式，使在开发过程中尽早发现错误，使用StrictMode为内部的组件树启用其他开发行为和警告

严格模式启用以下仅开发行为：

- 组件将重新呈现额外的时间，以查找由不纯呈现引起的错误。
- 组件将重新运行effect一段额外的时间，以查找由于缺少效果清理而导致的错误。
- 将检查您的组件是否使用了已弃用的API。

> 使用严格模式将为所有包裹的组件及子组件使用
>
### Suspense

使用Suspense组件，在子组件未加载前，允许提供一个降级处理

**参数**

- children：您打算渲染的实际UI。如果渲染时children挂起，则“挂起”边界将切换到渲染fallback
- fallback：如果实际UI尚未完成加载，则呈现替代UI。任何有效的React节点都被接受，尽管在实践中，回退是一个轻量级的占位符视图，例如加载微调器或骨架。当fallback挂起时，Suspense将自动切换到children，当数据就绪时，Suspense将自动切换回children。如果fallback在渲染时挂起，它将激活最近的父级“挂起”边界

**注意事项**

- React不会为第一次挂载之前挂起的渲染保留任何状态。当组件加载完毕后，React会重新尝试渲染挂起的树。
- 如果Suspense正在显示树的内容，但随后再次挂起，则将再次显示fallback，除非导致该内容的更新是由startTransition或useDeferredValue引起的。
- 如果React需要隐藏已经可见的内容，因为它再次挂起，它将清理内容树中的布局效果。当内容准备好再次显示时，React将再次触发布局效果。这可以确保测量DOM布局的Effects不会在内容隐藏时尝试执行此操作。
React包括底层优化，

**用途**

1. 加载内容时显示回退，直到子节点所需要的所有代码和数据都加载完毕
2. 默认情况下，Suspense中的整个树被视为一个单元，当它们都准备好被显示时，它们将同时出现在屏幕上

```js
<Suspense fallback={<Loading />}>
  <Biography />
  <Panel>
    <Albums />
  </Panel>
</Suspense>
```

3. 加载嵌套内容时显示内容

```js
<Suspense fallback={<BigSpinner />}>
  <Biography />
  <Suspense fallback={<AlbumsGlimmer />}>
    <Panel>
      <Albums />
    </Panel>
  </Suspense>
</Suspense>
```

显示逻辑为：

a.如果Biography尚未加载，则显示BigSpinner以代替整个内容区域。

b. 一旦Biography完成加载，BigSpinner将被内容替换。

c. 如果Albums尚未加载，则显示AlbumsGlimmer以代替Albums及其父项Panel。

d. 最后，一旦Albums完成加载，它将替换AlbumsGlimmer。

## API

### createContext

创建一个 context 以便组件能够提供和读取

在组件外创建一个上下文对象

```js
import { createContext } from 'react';

const ThemeContext = createContext('light');
```

createContext接收一个参数作为默认值，如果provider没有提供value，将返回这个默认值

使用context.Provider包裹组件，为所有的子组件提供一个上下文

```js
 <ThemeContext.Provider value={theme}>
    <Page />
  </ThemeContext.Provider>
```

`theme`为这个上下文对应的值

在子组件中使用useContext来使用创建的上下文

```js
const theme = useContext(ThemeContext);
return <button className={theme} />;
```

### forwardRef

forwardRef让你的组件通过引用向父组件公开一个DOM节点

```js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  // ...
});
```

接收组件的render函数，使子组件可以使用父组件派发的ref，达到向父组件暴露子组件dom或其他数据(命令式句柄)的目的

**公开DOM节点**

```js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} />
    </label>
  );
});
```

**公开命令式句柄**

```js
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```

### lazy

使用lazy可以实现按需加载

通过lazy创建一个组件

```js
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```

在组件中使用

```js
  <div>
    <h2>Preview</h2>
    <MarkdownPreview />
  </div>
 ```

结合suspense可以实现懒加载效果

```js
  <Suspense fallback={<Loading />}>
    <h2>Preview</h2>
    <MarkdownPreview />
  </Suspense>
 ```

### memo

允许您在组件的props未更改时跳过重新渲染组件

当父组件被重新渲染时，只要它的属性没有改变，这个组件的备忘录化版本通常不会被重新渲染。但是React仍然可以重新渲染它：记忆化是性能优化，而不是保证

memo(Component, arePropsEqual?)

```js
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

**参数**

- Component：您要记忆的组件。memo不会修改这个组件，而是返回一个新的、记忆化的组件。任何有效的React组件，包括函数和forwardRef组件，都可以接受。

- 可选arePropsEqual：接受两个参数的函数：组件以前的props和它的新props。如果新旧props相等，它应该返回true：也就是说，如果组件将呈现相同的输出，并且以与旧的相同的方式使用新的道具。否则它应该返回false。通常，您不会指定此函数。默认情况下，React会将每个prop与Object.is进行比较。

### createPortal

调用 createPortal 创建 portal，并传入 JSX 与实际渲染的目标 DOM 节点， 允许你将一些子元素渲染到 DOM 的不同部分

```js
// createPortal(children, domNode, key?)

import { createPortal } from 'react-dom';

// ...

<div>
  <p>This child is placed in the parent div.</p>
  {createPortal(
    <p>This child is placed in the document body.</p>,
    document.body
  )}
</div>
```

createPortal 返回一个 React 节点，该节点可以包含在 JSX 中或从 React 组件中返回。如果 React 在渲染输出中遇见它，它将把提供的 children 放入提供的 domNode

> portal 中的事件传播遵循 React 树而不是 DOM 树。例如点击 `<div onClick>` 内部的 portal，将触发 onClick 处理程序

### flushSync

flushSync允许你强制React同步刷新提供的回调中的任何更新。这确保DOM立即更新

当与浏览器API或UI库等第三方代码集成时，可能需要强制React刷新更新。使用flushSync强制React同步刷新回调中的任何状态更新

```js
import { flushSync } from 'react-dom';

flushSync(() => {
  setSomething(123);
})
```

### createRoot

createRoot允许您创建一个root，以在浏览器DOM节点中显示React组件

```js
const root = createRoot(domNode, options?)
```

React将为domNode创建一个根目录，并接管管理其中的DOM。创建根目录后，需要调用root.render来显示其中的React组件

```js
root.render(<App />);
```

React将在<App />中显示root，并接管其中的DOM管理

```js
root.unmount();
```

调用root.unmount销毁React根目录中的渲染树
