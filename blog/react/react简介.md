# JSX 语法

## react 简介

前端 UI 的需要处理的本质问题：**如何将动态数据和用户的交互行为高效地反映到复杂的用户界面上**。

由 Facebook 开源的前端库，虚拟 DOM、状态、单向数据流等开发理念，使得复杂的 UI 界面开发变得**简单**、**高效**、**可控**。react 以**组件**为核心，用组件搭建 UI 的开发模式，完美地将 _数据_、_组件状态_ 和 _UI_ 映射到一起，极大地提高了开效率。

react 的特点：

- 声明式视图层：基于 JSX 的声明式视图层，不需要学习额外的模板语法。声明式的视图定义方式有助于简化视图层的更新流程。
- 状态到 UI 的单向数据流：状态到 UI 这一单向数据流让 React 组件的更新流程清晰简洁。
- 虚拟 DOM 跨平台：react 先把视图渲染成**虚拟 DOM**，结合其他库，可把虚拟 DOM 渲染成不同平台的 UI，可实现跨平台开发。
- DOM 操作高效：采用虚拟 DOM 避免抵消繁琐的 DOM 操作，同时采用 Diff 算法保证了高效。

## JSX 语法

JSX 是（JavaScript XML）的简写，是一种 JS 语法扩展，形式上像 HTML，**还是 JS，可是是部分 JS 语法特别是函数和表达式。**

长期以来，UI 和数据分离一直是前端关注的重点，为了实现 UI 和数据分离，开发了各种模板，比如 pug，然后将数据和模板渲染成 HTML 代码，使用模板，不得不学习一套类似 HTML 的全新语法。但是随着 UI 的复杂多变，模板语法难以处理。

**react 认为数据和 UI 是一个整体，不应分离，发明了 JSX，作为两种的桥梁，UI 和数据都封装在一个组件中。**

JSX 的两种语法：

- `<` 、`>` 被视为 HTML 代码；
- `{`、`}`被视为 JS。

最后经过 `bable` 处理，变成 JS。

1. 基本语法

```js
const element = (
  <div>
    <p title='title'>{jsVar}</p>
    <p title={jsExpression}>React</p>
    {/*注释*/}
  </div>
)
```

> 当有多个同级的标签时，必须有一个根标签。

> HTML 标签不区分大小写，JSX 必须小写，必须有闭合标签。

> `<MyComponent />` 组件标签，首字母大写。**React 通过标签首字母大小写来识别标签类型。**

> `<MyComponent.key />` 组件标签带属性是合法的。

> 使用 `{}` 包裹 JS 表达式 或者 JS 注释。`{}`中不能有多行语句，**不能放对象**。

> DOM 属性值可使用 `{}` 动态绑定。绑定类(class) 时，使用`className`代替，表单的`for`使用`htmlFor`代替， 监听事件`onEventName`的形式，不是原生的 DOM 事件。

> 元素的**子元素**是`null`、`undefined`、 `true`、`false`，合法，但是不会渲染。想要渲染他们，将其转为字符串。**结合它们，可实现条件渲染**，比如`{showHeader&&<h1>hello</h1>}`，`showHeader` 为真值是渲染`h1`。

> 注意`0`、`''`等假值的情况，它们会渲染，`''`渲染了你看不到。
>
> ```
> {props.messages.length &&
>   <MessageList messages={props.messages} />
> }
> ```

> `messages`长度为零，被渲染，后面的标签不会被渲染。**这和你的预期不符**，使用长度判断可符合预期：
>
> ```
> {props.messages.length > 0 &&
>     <MessageList messages={props.messages} />
> }
> ```

> JSX 语法是 `React.createElement(component, props, ...children)` 语法糖，JSX 会被转化成此函数。

## 组件

组件的名字以`大写字母`开头，定义方式不同，可分为：

- 类组件：① 继承`React.Component`；② 必须有`render` 方法，且该方法返回 UI 的描述。类组件可维护自身的状态，又叫**有状态组件**。
- 函数组件：使用一个返回 UI 描述的**函数**作为组件，往往用于展示数据（数据从外部传入）而没有自己状态，函数组件不能维护自身的状态，又叫**无状态组件**。

```js
import React, { Component } from 'react'
class Hello extends Component {
  render() {
    const element = (
      <div>
        <p>Hello</p>
        <p>React</p>
      </div>
    )
    return element
  }
}
export default Hello
```

一个简答的类组件，导出的`React`没有用到，但是必须有且为**大写**，否则报错：`'React' must be in scope when using JSX`。

函数组件：

```js
function Hello(){
  const element = (
			<div>
				<p>Hello</p>
				<p>React</p>
			</div>
		);
		return element;
	}
}
```

> ### React 必须在 JSX 的作用域内。

由于 JSX 会编译为 `React.createElement` 调用形式，所以 `React` 库也必须包含在 JSX 代码作用域内。

```js
const ele = (
  <div>
    <p>Hello</p>
    <p>React</p>
    <p>
      <span title='vue'>vue</span>
      <strong style='color:red' title='react' className='className'>
        react
      </strong>
    </p>
  </div>
)
```

通过 babel 转成如下函数：

```js
'use strict'
React.createElement(
  'div',
  {
    title: 'createElement函数',
  },
  React.createElement('p', null, 'Hello'),
  React.createElement('p', null, 'React'),
  React.createElement(
    'p',
    null,
    React.createElement(
      'span',
      {
        title: 'vue',
      },
      'vue'
    ),
    React.createElement(
      'strong',
      {
        style: 'color:red',
        title: 'react',
        className: 'className',
      },
      'react'
    )
  )
)
```

~~通过 `<script>` 标签加载 React，则必须将 `React` 挂载到全局变量中。~~

### 组件的状态--state

state 是组件内部的状态，state 的变化，会反馈到 UI 上。可在类组件（只有类组件才有状态）的构造函数中定义**初始状态**，当需要更新状态时，使用`this.setState`更新，`setState` 是更新状态的**唯一方式**。**构造函数顶部必须先调用父类构造函数---super()**。

```js
import React, { Component } from 'react'
class Hello extends Component {
  constructor(props) {
    super(props) // super
    this.state = {
      age: 24,
      name: 'JACK',
      city: '成都',
      job: 'web developer',
    }
  }
  changeName(city) {
    this.setState(() => {
      //NOTE this.state.name = name 不能样直接修改
      const age = this.state.name === 'JACK' ? '二十四' : 24
      return {
        name: this.state.name === 'JACK' ? '杰克' : 'JACK',
        age,
        city,
      }
    })
  }
  render() {
    const element = (
      <div>
        <h2>{this.state.name}</h2>
        <h2>{this.state.age}</h2>
        <h2>{this.state.city}</h2>
        <button onClick={this.changeName.bind(this, '北京')}>改变名字</button>
      </div>
    )
    return element
  }
}
export default Hello
```

使用 `setState` 修改状态时，可向该函数传递一个修改后的包含想要更新的属性的对象。**React 会把你提供的对象合并到当前的 state**，`浅合并`，所以可增加新属性，也是轻而易举的。

```js
//NOTE this.state.name = name 不能样直接修改
this.setState({ key: 'newValue', newKey: 'value' })
```

> 浅合并有什么问题吗？

> 为了防止 state 频繁更新损耗性能，比如一秒钟更新几千次，页面就要渲染几千次，多次（多少次？）调用和合并成一次。消息队列？？

还可以接收一个回调函数作为参数，该函数返回一个对象，该对象包含新的属性值。

```js
this.setState((state, props) => {
  return {
    key: 'newValue',
  }
})
```

> 回调的第一个参数是上一次的状态
> 为何有第二种调用方式？因为在更新 state 之前，可能需要做其他事情，比如知道前一个状态。

> 异步更新

> 当你调用 setState 的时候，React 并不会马上修改 state。而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新。

<!-- TODO 具体事如何异步的？ -->

```js
const name = this.state.name === 'JACK' ? '杰克' : 'JACK'
const age = this.state.name === 'JACK' ? '二十四' : 24
//NOTE this.state.name = name 不能样直接修改
this.setState((state, props) => {
  console.log(state)
  console.log(props)
  return { name, age, city, framework: 'react' }
})
console.log(this.state.age) //还是原来的值
```

由于状态更新是异步的，想要获取上次`setState`的结果，就得使用回调函数的方式，使用第一种方式拿不到上次的结果。【回调函数是处理异步的方式之一】

回调函数的第一个参数是上次的`state`，第二个参数是`父级组件`传入的`props`。

```js
changeName(city) {
  this.setState((preState) => {
    return { age: preState.age + 1 }
  })
  this.setState((preState) => {
    return { age: preState.age + 1 }
  })
  this.setState((preState) => {
    return { age: preState.age + 1 }
  })
  console.log(this.state.age)//即使连续更新三次，还是原来的值
}
```

> 如何确定组件的 state 最小集合？

参与渲染的变量。

<!-- TODO 如何确定组件的 state 最小集合 -->

> 想要在 state 更新后，立即获取更新后的 state， 怎么办？

setState 的第二个回调函数里，可获取更新后的 state。

```js
this.setState(
  (prevState, props) => {
    return {} // 返回 newState
  },
  () => {
    // 获取最新的 state
    // console.log(newState)
  }
)
```

> setState 第一个回调、第二个回调和 render 函数的执行顺序是怎样的？

第一个回调 -> render -> 第二个回调

### 组件的属性 --- props

可定义像 DOM 属性一样的组件属性，也像 DOM 属性一样使用，在组件内部会把这些属性`合并到props`对象中。

```js
<Hello text={this.state.text} age={25} />
```

在 Hello 组件中使用 props 获取这些属性：

```js
constructor(props) {
  super(props)
  console.log(props);
  this.state = {
    name: 'JACK',
    city: '成都',
    job: 'web developer'
  }
}
```

> props 可接收函数、对象、数组等。

### 默认 props

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Hello extends Component {
  // 省略
}
// props 设置默认值
Hello.defaultProps = {
  age: 20,
}
// props 类型
Hello.propTypes = {
  age: PropTypes.number,
}
export default Hello
```

> 有哪些类型?

[不同验证器的例子](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#proptypes)

### 如何在子组件中修改 props

> [how to change the state of parent component from child Component](https://github.com/reactjs/reactjs.org/issues/1689)

---

### 如何监听 state 和 props

---

### 事件监听

[](https://codepen.io/JackZhouMine/pen/XvbXrN)

---

### 如何设置样式

---

### 如何传递 slot

---

### 生命周期

> 生命周期钩子：React 某个时刻**自动执行**的函数。

![react生命周期](https://raw.githubusercontent.com/jackchoumine/jack-picture/master/react/react-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

组件创建和销毁分为三个阶段：`挂载` --→ `更新` --→ `销毁`，函数式组件没有生命周期。

### 常用的生命周期函数

#### 挂载阶段 --- 组件第一次渲染到页面

1. constructor

构造函数是类的特性，组件在挂载之前会执行构造函数创建组件实例。

> 在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。

只有如下两种情况才需要显示编写构造函数，否则可省略：
① 初始化状态`state`;

② 使用 bind 绑定事件处理函数的 this。

> 常见的使用 constructor 方式：

① 使用 props 初始化 state

```js
constructor(props) {
 super(props);// 必须调用
 // NOTE 不要这样做
 // 1. 无必要，想要获取color可使用  this.props.color
 // 2. 引入了 bug：props 更新时，constructor 不会执行，状态不会被重置。
 // 如果希望使用 props 更新 state，又希望 props 更新时能重置 state，可修改组件的 key
 this.state = { color: props.color };
}
```

② 不调用 super(props)

2. render

class 组件中唯一必须实现的方法。

render 被执行时，它会检查 this.props 和 this.state 的变化并返回以下类型之一:

①. React 元素: 通常是 jsx。比如 `<div></div>`、`<MyComponent />` 。

②. 数组或 fragments。

③. 字符串或数值类型，会被渲染为文本节点。

④. 布尔类型或 null。什么都不渲染。

⑤. Portals。可以渲染子节点到不同的 DOM 子树中。比如开发弹窗组件。

> render 不该修改 state，否则会无限渲染。

> shouldComponentUpdate() 返回 false，则不会调用 render()。

3. componentDidMount

在组件挂载后（插入 DOM 树中）立即调用。此时可`操作 DOM`、发起网络请求、设置定时器等。

> 你可以在 componentDidMount() 里直接调用 setState()。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。**请谨慎使用该模式，因为它会导致性能问题**。通常，你应该在 constructor() 中初始化 state。如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理。

> 即使在 render() 两次调用的情况下，用户也不会看到中间状态。

view 更新异步的，短时间内多次 render，最后会合并成一次。

#### 更新阶段 --- 状态、props 或者 forceUpdate 变化

1. shouldComponentUpdate -- (不常用，但是很重要，一起在常用的里面讲了)

`shouldComponentUpdate(nextProps, nextState)` 接受下一次 Props 和 state，返回一个 boolean 值，决定后续是否执行 render，默认情况返回 true。

> 首次渲染或使用 forceUpdate() 时不会调用该方法。

> 该方法存在的目的是为了性能优化。

2. render

3. componentDidUpdate

> `componentDidUpdate(prevProps, prevState, snapshot)` 更新后会被立即调用。首次渲染不会执行此方法。

组件更新后，可进行 DOM 操作。可对更新前后的 props 进行比较，在决定是否进行网络请求等。

> 在此调用 setState ，必须放在一个条件内。

> 只是 key 变化会执行更新阶段吗？不会，而是先销毁在挂载。

> 实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。

#### 销毁阶段 --- 移出组件

1. componentWillUnmount

componentWillUnmount() 会在组件卸载及销毁之前直接调用。可在此移出事件绑定、定时器等。

> 不应调用 setState()，因为该组件将永远不会重新渲染。

---

> 可操作 DOM 有哪些钩子函数？`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`。

> [不常用的生命周期钩子](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## 参考

> [React.js 小书](http://huziketang.mangojuice.top/books/react/lesson11)
