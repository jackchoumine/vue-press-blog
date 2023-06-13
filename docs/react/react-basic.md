# react 核心概念

react 将 UI 分成独立可复用的组件. 根据定义方式不同，可分为函数组件和类组件。

**声明式**编写组件：你想要什么，直接给出结果，不需要执行详细的过程，react 就会帮你渲染出来。

## 定义组件

类组件，需要满足两个条件：

① class 继承自 React.Component;

② 类必须具有 render 函数，且返回代表该组件的 UI 元素。

```js
import React, { Component } from 'react'
class BookComponent extends Component {
  render() {
    const bookList = ['react入门', 'react进阶', 'react专家之路']
    const Books = (
      <ol>
        {bookList.map(book => (
          <li>{book}</li>
        ))}
      </ol>
    )
    return Books
  }
}
export default BookComponent
```

::: tip react 元素和 react 组件
react 元素是一个描述 react 组件的 JS 对象，react 组件时一个 class 或者函数。
:::

## 组件状态 state

state 是组件的内部状态，state 的变化会反映到组件上。在构造方法中的 `this.state` 对象中定义初始状态，使用`this.setState`方法改变组件状态（**唯一改变组件状态的方法**），组件会重新渲染。

给每一本书添加一个点赞按钮，没有点击一次，页面上喜欢就增加一次。

```js
class BookComponent extends Component {
  constructor(props) {
    // 构造函数介绍传递进来的属性
    super(props)
    this.state = {
      // 定义内部状态
      like: 0,
      dislike: 0,
    }
  }
  vote() {
    let { like } = this.state
    // this.state = {
    //   // 不能直接改变 state
    //   vote: vote,
    // }
    this.setState({
      like: ++like,
    })
  }
  hate() {
    let { dislike } = this.state
    this.setState({
      dislike: ++dislike,
    })
  }
  render() {
    const { title, author, version } = this.props // 所有传递进来的属性会组成一个简单的对象
    const Book = (
      <li>
        <h2>{title}</h2>
        <p>作者：{author}</p>
        <p>版本：{version}</p>
        <button
          onClick={() => {
            this.vote()
          }}>
          喜欢
        </button>
        &nbsp;&nbsp;
        <span>{this.state.like}</span>
        <br />
        <button
          onClick={() => {
            this.hate()
          }}>
          不喜欢
        </button>
        &nbsp;&nbsp;
        <span>{this.state.dislike}</span>
      </li>
    )
    return Book
  }
}
export default BookComponent
```

```js
constructor(props) {
    // 构造函数介绍传递进来的属性
    super(props) // 调用父类的构造函数
    this.state = {
      // 定义内部状态
      like: 0,
      dislike: 0,
    }
  }
  vote() {
    // ++this.state.like //不能直接修改状态
    let { like } = this.state
    this.setState({
      // like: ++this.state.like,// 不能直接修改state
      like: ++like,
    })
  }
```

UI = Component(props,state), 组件可看成一个函数，输入外部的属性 props 和内部状态 state, 输出组件的 UI。

### 如何确定最小的 state 集合

组件的 state 中的所有状态都用于反映组件的 UI 变化，不该有多余状态，也不该存在通过其他状态计算出来的中间状态。状态可分为两类数据：**是否展示**和**展示什么**，即决定是否展示和展示哪些的数据。

除 props 、 state 以外的上属性，【props 和 state 是 react 预先定义好的属性】，叫普通属性，props 对于使用它的组件来 说是只读的，是通过父组件传递过来的，要想修改 props，只能在父组件中修改；而 state 是组件内部自己维护的状态，是可变的。组件中需要用到一个变量，并且它和渲染无关时（不会在 render 中用到)，就该定义为普通属性。

以下情况不是一个状态：

① props

② 整个生命周期保持不变的变量

③ 通过状态 state 或者属性 props 计算得到

④ 没有在 render 中使用

> 如何修改 state ?

① setSate 是修改状态的唯一方式；

② 更新可能异步的，出于性能 原因，可能会将多次 setState 的状态修改合并成一次状态修改。比如每次点击按钮，增加一个商品到购物车，执行`this.setState({quantity: this.state.quantity + 1})`,点击两次，react 会处理成 `Object.assign(previousState,{quantity: this.state.quantity + 1}, {quantity: this.state.quantity + 1})`，商品数量只增加一个。当后一个状态依赖前一个状态时，应该给 setState 传入参数，`this.setState((preSate,preProps) => ({counter: preState.quantity + 1}))`；

③ state 的更新是一个合并的过程，只需要传入改变的 state；

④ state 的所有状态都应该是**不可变对象**。 状态改变，应该重建状态对象，而不是直接修改原来的对象。对于简单数据类型（string，number，boolean，null，undefined），都是不可变对象，修改它们本质就是重置。数组类型的状态，使用 `concat` 和 `...` 新建一个数组，再重置状态。concat、 slice、filter 会返回一个新的数组，push、pop、shift、unshift、splice 等方法修改原数组。对象类型的状态，使用`Object.assign` 或者 `...` 修改它。

> 创建新的状态对象的关键是， 避免使用会直接修改原对象的方法， 而是使用可以返回一个新对象的方法。

使用不可变对象的原因：方便调试和提高性能，shouldComponentUpdate 方法中仅需要比较前后两次状态对象的引用就可以判断状态是否真的改变，避免不必要的 render 方法调用。

### 状态的更新是同步还是异步

是同步还是异步，取决于`setState`执行位置：

1. 由 react 控制的回调，是**异步**的：生命周期钩子、react 事件监听；
2. 在非 react 控制的`异步回调`中，是**同步**的：定时器、原生事件

### 两种 setState 调用方式

```js
this.setState(newState, [callback]) // callback 是更新后的回调
this.setState(
  (state, props) => {
    return newState
  },
  [callback]
)
```

如何选择：

1. 新状态不依赖原状态，使用对象；
2. 行状态依赖原状态，使用回调；

setState 的第二个回调的执行时机：render 之后，没有参数，在此能拿到更新后的状态。

## 事件处理

react 中的是事件是合成事件，采用 on+事件名命名，不是原生 DOM 事件。行为和原生事件有点区别，阻止事件的默认行为需要显示调用 preventDefault。如果在某些场 景下必须使用 DOM 提供的原生事件，可以通过 React 事件对象的 nativeEvent 属性获取。事件处理器最容易出错的是 this 而绑定，因为 ES6 class 不会自动绑定 this 到当前对象。

四种事件处理器的绑定方式：

①. 箭头函数，在 render 方法中为元素事件定义事件处理函数，最大的问题是，每次 render 调用时，都会重新创建一个新的事件处理函数，带来额 外的性能开销，组件所处层级越低，这种开销就越大。当然，很多时候，不必在意这点开销。

②. 使用组件方法，在 constructor 中使用 bind 指定 this，执行 render 时，不会重复创建函数，没性能开销，但是事件多时比较繁琐。给组件赋值时，同时指定 this,可以传递额外的参数，会创建新函数，有性能损耗。

③. 属性初始化语法：使用**箭头函数定义方法**，不必在 constructor 中指定 this，不会重复创建函数。

④. 调用一个返回接收 event 的函数，`<button onClick={this.onClick('button')}> 点击 </button>`

```js
// onClick 返回一个函数
onClick = p => event => {
  console.log(p, event)
}
```

<!--  TODO

比较 react 自定义事件和 vue 自定义事件的区别：

几种事件绑定的区别：
-->

> 事件处理器的默认参数是 event 对象，需要传递 额外的参数时，使用箭头函数或者 bind。

事件处理 DEMO：

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="JackZhouMine" data-slug-hash="XvbXrN" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="处理事件">
  <span>See the Pen <a href="https://codepen.io/JackZhouMine/pen/XvbXrN">
  处理事件</a> by JackChouMine (<a href="https://codepen.io/JackZhouMine">@JackZhouMine</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

[合成事件](https://react.docschina.org/docs/events.html)

## 无状态组件

上面的 Book 组件内部有 state，组件需要维持这个状态，叫作状态组件， 图书列表 Books，没有定义 state，叫作无状态组件。无状态组件不关注内部状态，专注 UI 展示，还可使用函数还定义无状态组件，此时组件也叫函数组件，props 作为函数参数传入。

Book 组件维持 like 和 dislike 状态，这些属性作为书籍的属性传入更加适合，故可以把 Book 组件定义成函数组件，专注展示书籍信息，数据和事件处理函数从外部传入。

一个函数组件接收 props 作为参数，返回代表 UI 的 react 元素。

```js
function Welcome(props) {
  return <h1>hello,{props.name}</h1>
}
```

将 Book 组件改成函数组件

```js
import React from 'react'
function BookFun(props) {
  const {
    book: { title, author, version, bookId, dislike, like },
  } = props // 所有传递进来的属性会组成一个简单的对象
  const handleLike = () => {
    props.onLike(bookId)
  }
  const Book = (
    <li>
      <h2>{title}</h2>
      <p>作者：{author}</p>
      <p>版本：{version}</p>
      <button onClick={handleLike}>喜欢</button>
      &nbsp;&nbsp;
      <span>{like}</span>
      <br />
      <button
        onClick={event => {
          console.log(event) //使用箭头函数绑定事件处理器
          props.onDislike(bookId)
        }}>
        不喜欢
      </button>
      &nbsp;&nbsp;
      <span>{dislike}</span>
    </li>
  )
  return Book
}
export default BookFun
```

注意点：

1. 子组件的事件处理函数是通过 `props` 传递进来，并且不需要处理 this，因为函数组件没有使用 new 调用；

2. 所有传递给组件的属性，都会组成一个 props 对象的形式传递进来，**函数也在该对象里**。

使用函数函数组件

```js
import React, { Component } from 'react'
import Book from './bookFun'
class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
    }
    this.timer = ''
    this.handleLike = this.handleLike.bind(this) // es6 的 class，需要手动绑定 this
    // this.handleDislike = this.handleDislike.bind(this)
  }
  // 在组件挂载后的模拟服务器返回数据
  componentDidMount() {
    this.timer = setTimeout(() => {
      // 使用 setSate 改变状态,会引发重新渲染
      this.setState({
        books: [
          {
            title: 'react入门',
            author: '小马',
            version: '第二版',
            like: 0,
            dislike: 0,
            bookId: (Math.random() + 1).toString(36).substring(2), // 随机字符串
          },
          {
            title: 'react进阶',
            author: '小明',
            version: '第三版',
            like: 0,
            dislike: 0,
            bookId: (Math.random() + 1).toString(36).substring(2),
          },
          {
            title: 'react专家之路',
            author: '小华',
            version: '第一版',
            like: 0,
            dislike: 0,
            bookId: (Math.random() + 1).toString(36).substring(2),
          },
        ],
      })
    }, 100)
  }
  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer)
  }
  handleDislike(id) {
    const books = this.state.books.map(book => {
      return book.bookId === id ? { ...book, dislike: ++book.dislike } : book
    })
    this.setState({
      books,
    })
  }
  handleLike(id) {
    const books = this.state.books.map(book => {
      return book.bookId === id ? { ...book, like: ++book.like } : book
    })
    this.setState({
      books,
    })
  }
  render() {
    const Books = (
      <ol>
        {this.state.books.map(book => (
          <Book
            key={book.bookId}
            book={book} // 书籍信息保存在 book 属性你
            onLike={this.handleLike}
            onDislike={id => {
              // 自定义事件，使用箭头函数绑定事件处理器
              this.handleDislike(id)
            }}
          />
        ))}
      </ol>
    )
    return Books
  }
}
export default Books
```

主要改进：

1. 将书籍信息作为图书列表组件的一个状态，并从服务器请求数据以更新状态。

2. 将图书信息放在一个对象中，并通过 `props` 传递给传递给图书组件；

3. 图书组件（子组件）内部的事件处理函数，也是从通过 `props` 传递进来的；

4. 处理图书信息的逻辑在图书列表组件（父组件）定义，在子组件中调用；

函数组件只关注**数据输入**、**展示数据**，甚至 **业务逻辑都可以从父组件传入**，子组件只负责调用，这样才能保证组件*高内聚、低耦合*，复用性好。

函数组件没有生命周期方法，没有状态，没有 this，而这些类组件具有，所以不用生命周期和状态从父组件传入时才适合使用函数组件。

## 组件 props (属性)

以上定义了一个图书列表组件，我想要在添加一本书籍和添加图书作、版本等信息时，要去修改组件，会比较麻烦。如果能在图书列表组件 Books 中使用一个 Book 组件接收图书信息，在 Books 中维护这些图书信息，然后传递给 Book，那将是很好的。

```js
import React, { Component } from 'react'
class BookComponent extends Component {
  render() {
    const { title, author, version } = this.props //所有传递进来的属性会组成一个简单的对象
    const Book = (
      <li>
        <h2>{title}</h2>
        <p>作者：{author}</p>
        <p>版本：{version}</p>
      </li>
    )
    return Book
  }
}
export default BookComponent
```

在图书列表组件中使用图书组件

```js
import React, { Component } from 'react'
import Book from './book' // 引入图书组件
class BookComponent extends Component {
  render() {
    const bookList = [
      { title: 'react入门', author: '小马', version: '第二版' },
      { title: 'react进阶', author: '小明', version: '第三版' },
      { title: 'react专家之路', author: '小华', version: '第一版' },
    ]
    const Books = (
      <ol>
        {/*<Book {...book} /> 还可以这样传递 推荐分分开传递，传递的属性会更加清晰，不会传递多余的属性*/}
        {/* 所有属性会组成一个对象传递给 props */}
        {bookList.map(book => (
          <Book title={book.title} author={book.author} version={book.version} />
        ))}
      </ol>
    )
    return Books
  }
}
export default BookComponent
```

### 属性校验和默认值

和 vue 一样，react 也可以可对 props 进行校验和提供默认值。react 通过`propTypes` 和 `PropTypes` 实现该功能。 propTypes 的 key 是 props 的属性，值从 PropTypes 中获取。

给图书图书的函数组件添加 props 检查：

```js
// props 类型约束
// TODO 如何自定义检查函数
BookFun.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    version: PropTypes.string,
    price: PropTypes.number,
    like: PropTypes.number,
    disLike: PropTypes.number,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
}
// TODO 如何对props的内层属性设置默认值 属性默认值
// BookFun.defaultProps = { book.price: 39 }
```

#### 常见数据类型验证

```js
PropTypes.number
PropTypes.bool.isRequired // 必需属性
PropTypes.string
PropTypes.symbol
PropTypes.array
PropTypes.object
PropTypes.func
```

- 限制数组类型 `PropTypes.arrayOf(PropTypes.number)`

- 自定义验证元素：

```js
customArrayProp: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
  if (!/matched/.test(propValue[key])) {
    return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed.')
  }
})
```

- 精确限制对象结构 `PropTypes.exact({name: PropTypes.string,quantity: PropTypes.number})`，不多不少。

- 大致限制对象结构 `PropTypes.shape({name: PropTypes.string,quantity: PropTypes.number})`，不能少。

- 对象的值为某种类型 `PropTypes.objectOf(PropTypes.number)`

- 自定义验证：

```js
customArrayProp: PropTypes.objectOf(function (propValue, key, componentName, location, propFullName) {
  if (!/matched/.test(propValue[key])) {
    return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed.')
  }
})
```

- > 自定义：函数返回一个 Error 对象。

```js
customProp: function(props, propName, componentName) {
  if (!/matched/.test(props[propName])) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to' +
    ' `' + componentName + '`. Validation failed.'
    );
  }
},
```

> 其他类型的验证

- 组件类型 `PropTypes.element`，jsx、`React.createElement` 的返回值

- 组件类型 `PropTypes.elementType`，元素的 type。

- 可渲染的类型 `PropTypes.node`： `number`、`string`、`DOM`、`array`、`fragments`，undefined 、bool、null 不是可渲染的。

- 任何类型 `PropTypes.any`

## 子节点 children 属性

vue 通过插槽 `slot` 来传递 html 或者组件，react 通过 `children` 属性来传递，同时提供了操作 children 的一些方法。

[React.children](https://zh-hans.reactjs.org/docs/react-api.html#reactchildren)

## 组件的样式

给组件添加样式的方式有两种：外部样式和内联样式

①. 外部样式引入的两种方式在使用组件的 html 也页面中引入：

```html
<link rel="stylesheet" type="text/css" href="style.css" />
```

样式表文件作用于整个应用的所 有组件(一般是基础样式表)。把组件当成一个模块引入组件，样式 表作用于某个组件。在应用入口引入的样式也会作用于整个应用。解决 class 冲突————使用 CSS Modules。

②. 内联样式将样式属性写成 JS 对象，使用 style 属性引入。 **具有中划线的样式属性，要采用小驼峰名名。**

<!-- 如何防止样式冲突 -->

### 更多阅读

1. [Style React Components: 7 Ways Compared](https://www.sitepoint.com/react-components-styling-options/)

2. [react 中处理样式的五种方式](https://blog.csdn.net/m0_46412825/article/details/112264963)

## 组件生命周期

组件从被创建到被销毁的过程称为组件的生命周期。React 为组件在不同的生命周期阶段提供不同的生命周期方法，让开发者可以在组件的生命周期过程中更好地控制组件的行为。通常，组件的生命周期可以 被分为三个阶段:**挂载阶段**、**更新阶段**、**卸载阶段**。_只有类组件有生命周期方法，函数组件没有。_

Ⅰ. 挂载阶段

初始化，挂载到 DOM，完成第一次渲染。依次调用到的函数为：

① constructor -- constructor 通常用于初始化组 件的 state 以及绑定事件处理方法等工作。

② componentWillMount -- 组件被挂载到 DOM 前调用，且只会被调用一次。很少用到，这里的操作可放在 constructor 中，调用`this.setState` 组件不会重新渲染。

③ render -- 唯一必要的方法,返回一个 react 元素，渲染工作是 react 完成的。纯函数，不能执行用副作用的操作，不能调用 `this.setSate`，会改变组件状态进入死循环。

④ componentDidMount -- 完成挂载，只执行一次。可获取 DOM，**经常在此进行服务器请求**。调用 `this.setSate` 会引起组件重新渲染。

Ⅱ. 更新阶段

组件被挂载到 DOM 后，组件的 props 或 state 可以引起组件更新。props 引起组件更新，是因为父组件调用了 render。依次调用的方法：

① componentWillReceiveProps -- 接受父组件传递的 props 作为参数。 父组件 render 方法的调用并不能保证传递给子组件的 props 发生变化，也就是说，子组件的 nextProps 的值可能和当前 props 相等，因此往往需要比较 nextProps 和 this.props 来决定是否执行 props 发生变化后的逻辑，比如根据新的 props 调用 this.setState 触发组件的重新渲染。

② shouldComponentUpdate -- 决定组件是否更新。返回 false，组件不会更新，后面的方法不调用。通过比较 nextProps、 nextState 和组件当前的 props、state 决定这个方法的返回结果。这个方法可以用来减少组件不必要的渲染，从而优化组件的性能。

③ componentWillUpdate -- render 调用前执行，可以作为组件更新发生前执行某些工作的地方，一般也很少用到。

④ render -- 返回 react 元素。shouldComponentUpdate、componentWillUpdate(nextProps, nextState)，不能调用 setState，否则组件死循环，永远无法渲染。

⑤ componentDidUpdate -- 组件更新后调用，可操作 DOM。componentDidUpdate(prevProps, prevState)。

> 哪些行为会触发更新？

①. new props ②. setState ③. forceUpdate

Ⅲ . 卸载阶段

componentWillUnmount，执行一些收尾工作，比如清除定时器，清除手动创建的 DOM。

新版本的生命周期钩子：删除 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate`

新增`static getDerivedStateFromProps(props, state)`、`getSnapshotBeforeUpdate(prevProps, prevState)`

> 为何要删除？

这些钩子很容易被滥用，在 17 以上版本还可能带来 bug。

![](https://tva1.sinaimg.cn/large/008i3skNgy1grq9282k23j31gq0u0qqr.jpg 'react-生命周期')

> 父子组件生命周期执行顺序？

```bash
# 挂载
parent constructor
parent componentWillMount ❌ 在17以上版本会移除
parent getDerivedStateFromProps  ✅ 新增的钩子
parent render
child constructor
child componentWillMount
child render
child componentDidMount
parent componentDidMount

# 更新
parent getDerivedStateFromProps(nextProps, nextState)  ✅ 新增的钩子
parent shouldComponentUpdate
parent componentWillUpdate ❌ 在17以上版本会移除
parent render
child componentWillReceiveProps # new props 调用 setState 不调用
child getDerivedStateFromProps(nextProps, nextState) ✅ 新增的钩子 new props、 setState、forceUpdate 都会调用 即 render 前调用
child shouldComponentUpdate(nextProps, nextState)
child componentWillUpdate ❌ 在17以上版本会移除
child render

child getSnapshotBeforeUpdate(prevProps, prevState) ✅ 新增的钩子 获取组件更新之前的快照
parent getSnapshotBeforeUpdate(prevProps, prevState)

child componentDidUpdate(prevProps, prevState, snapshot)
parent componentDidUpdate(prevProps, prevState, snapshot)

# 卸载
parent componentWillUnmount
child componentWillUnmount
child 销毁完毕
parent 销毁完毕
```

关于钩子函数参数：

①. render 函数之前的都是最新的 props 和 state `getDerivedStateFromProps(nextProps, nextState)`、`shouldComponentUpdate(nextProps, nextState)`

getDerivedStateFromProps 要求返回一个新的状态，很少使用，当组件 state 完全依赖 props 可使用。

shouldComponentUpdate 返回一个布尔值，控制组件是否更新。

②. render 函数之后的都是之前的 props 和 state `getSnapshotBeforeUpdate(prevProps, prevState)`、`componentDidUpdate(prevProps, prevState, snapshot)`

getSnapshotBeforeUpdate 组件更新到 DOM 前获取组件快照，比如长列表更新之前，获取滚动条位置，返回值会传递到 componentDidUpdate 的第三个参数中。

## 组件和服务器通信

可执行 AJAX 的地方：

① constructor，可行，但是构造函数适合初始化工作，不适合有副作用的 AJAX 的请求，因为从服务器端获取数据后往往会修改状态；

② ~~componentWillMount，可行，挂载前发送请求，但是服务器端渲染会调用两次；~~ getDerivedStateFromProps 挂载前发送请求；

③ componentDidMount，挂载后发送请求，DOM 操作安全，保证只调用一次；

④ ~~componentWillReceiveProps，~~ shouldComponentUpdate，当属性改变时，向服务器发送请求，类似 vue 在 watch 中发送请求。

```js
shouldComponentUpdate(nextProps){
  // 保证属性改变才请求
  if(nextProps.id !== this.props.id) {
    // do ajax
  }
}
```

⑤ 事件处理函数，比如点击按钮时再向服务器请求数据。

## refs 和 DOM

和 vue 中使用 `refs` 属性获取 DOM 或者组件实例一样，react 中使用 refs 获取 DOM 或者**组件实例**。

三种使用 refs 使用四种方式：

- `createRef()`

- ref 回调函数

- `forwardRef()`

- ref 字符串

### React.createRef()

创建 ref 变量，然后绑定到 DOM 或者组件上，通过`current` 属性获取 DOM 或者组件实例，然后即可操作 DOM 或者组件实例了。

```js{11-12,23,27}
class MyInput extends React.Component {
  inputDom = React.createRef()
  render() {
    return <input type='text' ref={this.inputDom} placeholder='点击聚焦' />
  }
  focus = () => {
    this.inputDom.current.focus()
  }
}
class App extends React.Component {
  inputDom = React.createRef()
  myInput = React.createRef()
  render() {
    return (
      <div>
        <input type='text' ref={this.inputDom} placeholder='自动聚焦' />
        <MyInput ref={this.myInput} />
        <button onClick={this.onClick}>点击聚焦</button>
      </div>
    )
  }
  componentDidMount() {
    this.inputDom.current.focus()
  }
  onClick = () => {
    console.log(this.myInput.current)
    this.myInput.current.focus()
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
```

效果：

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="KKmPXjJ" data-user="JackZhouMine" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/JackZhouMine/pen/KKmPXjJ">
  createRef函数</a> by JackChouMine (<a href="https://codepen.io/JackZhouMine">@JackZhouMine</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 回调形式的 ref

ref 还可以接收一个函数，参数为 DOM 或组件实例，可将其赋值给一个组件属性，然后直接通过该属性获取 DOM。

回调的执行时机：

- componentDidMount、ComponentDidUpdate 前，参数为组件实例；

- componentWillUnmount 之后执行，参数为 null。

将上面的 App 组件改写成回调形式：

```js{5-7,22}
class App extends React.Component {
  refFn = input => {
    this.inputDom = input
  }
  myInputRef = myInput => {
    this.myInput = myInput
  }
  render() {
    return (
      <div>
        <input type='text' ref={this.refFn} placeholder='自动聚焦' />
        <MyInput ref={this.myInputRef} />
        <button onClick={this.onClick}>点击聚焦</button>
      </div>
    )
  }
  componentDidMount() {
    this.inputDom.focus()
  }
  onClick = () => {
    // NOTE 不是 this.myInput.current
    this.myInput.focus()
  }
}
```

通过 props 传递 ref:

```js
const MyButton2 = props => {
  return (
    <div>
      <button ref={props._ref}>按钮</button>
    </div>
  )
}
// 使用

;<MyButton2
  _ref={com => {
    this.myButton2 = com
  }}
/>
// 获取 ref
console.log(this.myButton2)
```

### forwardRef() -- 传递 ref

标签上的 key 和 ref 属性会被 react 特殊处理，不能通过 props 传递。

> forwardRef 返回一个 React 组件，能够将其接受的 ref 属性转发到其子组件中，第一个参数为 props, 第二个参数为`ref`

将 `MyInput` 改写成 ref 的形式：

```js
const MyInput = React.forwardRef((props, ref) => {
  console.log(props)
  return <input type='text' ref={ref} placeholder='点击聚焦' value={props.value} />
})
// 使用 MyInput 时，绑定 ref , 就能拿到 input DOM
```

上面的 ref 直接绑定到`input`上，当 forwardRef 返回的是一个自定义组件时，还能将 ref 通过`非ref`属性，比如 `_ref` 传递到组件中。

```js
const MyButton = React.forwardRef((props, ref) => {
  // 没有 ref
  console.log(props)
  // 这样传递 ref
  return <Button {...props} _ref={ref} />
})

class Button extends React.Component {
  render() {
    // 有 ref
    console.log(this.props)
    return (
      <div>
        <button ref={this.props._ref}>{this.props.text}</button>
      </div>
    )
  }
}
// 使用 ref
// <MyButton text="按钮" ref={this.myButtonRef} />
```

demo:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="eYWOeZY" data-user="JackZhouMine" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/JackZhouMine/pen/eYWOeZY">
  ref回调函数</a> by JackChouMine (<a href="https://codepen.io/JackZhouMine">@JackZhouMine</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

:::tip 函数式组件的 ref
函数式组件没有`this`，只能通过 forwardRef 设置 ref。
:::

### 字符形式 ref

直接给 ref 设置一个字符串，然后通过`this.refs.refString`获取。

```js
<input ref="inputDOM" value="hello" />
<button onClick={this.myClick}>字符串 ref</button>

 myClick = () => {
  //  通过 refs 获取 dom
    console.log(this.refs.inputDOM)
 };
```

::: warning 这种形式的会被废弃

1. 性能不好，ref 会被 react 处理成闭包；
2. 不好跟踪 this;
3. 处理循环不方便。
   :::

### 循环中的 ref

vue 中 ref 和循环一起使用，拿到的`this.$refs` 是一个数组。

1. 声明一个数组存储 ref

```js{3,11,22}
class App extends React.Component {
  items = [{ name: 'jack' }, { name: 'tom' }]
  list = []
  render() {
    return (
      <ul>
        {this.items.map((item, index) => {
          return (
            <li
              ref={li => {
                this.list.push(li)
              }}>
              {item.name}
            </li>
          )
        })}
        <button onClick={this.getRef}>按钮</button>
      </ul>
    )
  }
  getRef = () => {
    console.log(this.list[0].textContent)
  }
}
```

2. 使用对象

将 list 声明为对象，使用下标设置对象的 key

```js
this.list[index] = li
```

3. 使用 hooks 形式

```js
const itemEls = useRef(new Array())
{items.map(item => (
 <p key={item} ref={(element) => itemEls.current.push(element)}>{item}</p>
))
```

或者设置对象：

```js
const itemEls = useRef({})
const itemNodes = items.map((item, index) => (
  <p key={item} ref={element => (itemEls.current[index] = element)}>
    {item}
  </p>
))
```

或者

```js
import React, { useRef, useEffect } from 'react'
export const Component = ({ items }) => {
  const itemsEls = useRef(new Array())

  return (
    {items.map((item) => {
      const getRef = (element) => (itemsEls.current.push(element))
      return <p key={getRef}>{item}</p>
    })}
  )
}
```

### ref 的其他问题

> 给多个 DOM 或者组件绑定 ref，会怎样？

后面的 ref 优先。

::: tip 能不用则不用 ref
因为和 react 声明式的理念相违背和导致滥用，尽量使用通过**声明式**实现来完成的事情。

比如，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性
:::

### 哪些场景可使用 ref

1. 管理焦点。

2. 暴露组件方法。

## 组件通信

① 父子组件通信：props 可传递函数。父组件通过 props 向子组件传递**普通数据**，子组件调用通过 props 传递到子组件的**函数**修改父组件中的数据；

② 兄弟组件：将共有的状态提升到共同的父组件中，同时 props 实现其中一个组件修改状态，也会反映到另一个组件中；缺点：层级深了，状态提升会很繁琐。

③ context：context 上下文，让任意层级的子组件都可以获取父组件中的状态和方法。在提供 context 的组件内新增一个 getChildContext 方法，返回 context 对象，然后在组件的 childContextTypes 属性上定义 context 对象的属性的类型信息。通过`this.context.key` 在子组件中获取父组件中的状态和方法。

当 context 中包含数据时，如果要修改 context 中的数据，一定不能直接修改，而是要通过 setState 修改，组件 state 的变化会创建一个新的 context，然后重新传递给子组件。

父组件

```js
getChildContext() {
  return { onAddUser: this.handleAddUser } // 通过 context 传递一个函数
}
Parent.childContextTypes = {
  onAddUser: PropTypes.func
}
```

在子组件中使用 context ：

```js
this.context.onAddUser(this.state.newUser)

// 声明 context 的类型
Child.contextTypes = {
  onAddUser: PropTypes.func,
}
```

> 缺点，数据来源不明。

④ 消息队列（事件队列）：改变数据的组件发起一个消息，使用数据的组件监听这个消息，并在响应函数中触发 setState 来改变组件状态。和 vue 的 emit 类似。`Postal.js` 库可实现。

⑤ 状态管理库。

## 表单

表单元素的值是由 React 来管理的，那么它就是一个受控组件，否则就是非受控组件。React 组件渲染表单元素，并在用户和表单元素发生交互时控制表单元素的行为，从而保证组件的 state 成为界面上所有元素状态的**唯一来源**。

input 和 textarea 的非受控组件，state 的状态赋值给 value，通过监听 change 事件，来改变 state。 select 在 select 上设置 value 属性，checkbox 通过修改 checked 属性。

非受控组件指表单元素的状态依然由**表单元素**自己管理，而不是交给 React 组件管理。属性 ref，用来引用 React 组件或 DOM 元素的实例来获取表单上的值。

使用 `this.nameInput.value` 获取表单值，默认值使用 defaultValue 属性设置。 select 元素和 textarea 元素也支持通过 defaultValue 设置默认值，`<input type="checkbox"> `和 `<input type="radio">` 则支持通过 defaultChecked 属性设置默认值。

```js
<input type='text' name='name' defaultValue='hello' ref={nameInput => (this.nameInput = nameInput)} />
```

### 小结

受控组件：受到组件状态（state）控制的组件。

state + 在事件处理函数中改变组件状态

state + 事件能实现 vue 中 v-model 的效果

非受控组件：没有到组件状态（state）控制的组件。

通过 DOM 获取表单的 value

### 如何处理大量表单的情况

> 事件处理函数使用高阶函数

```js{22}
import React, { Component } from 'react'
class MyForm extends Component {
  state = {}
  render() {
    return (
      <div>
        <h2>受控组件</h2>
        <form>
          <label htmlFor='name'>
            用户名：
            <input type='text' id='name' name='myName' onChange={this.onChange('myName')} />
          </label>
          <label htmlFor='password'>
            年纪：
            <input type='number' id='password' name='age' onChange={this.onChange('age')} />
          </label>
        </form>
      </div>
    )
  }
  // 高阶函数
  onChange = key => event => this.setState({ [key]: event.target.value })
}

export default MyForm
```

[更多表单的信息](https://react.docschina.org/docs/forms.html)

## 再理解声明式

react 主张**以声明式编写 UI**，什么是声明式？

和声明式相反的是命令式，命令式详细得告诉计算机**如何做**，程序员需要关注每一步，而声明式只需要关注**做什么**和**结果**。

直接操作 DOM，就是命令式的，下面的代码是命令式的：

```js
const container = document.getElementById('container')
const btn = document.createElement('button')
btn.className = 'btn red'
btn.onclick = function (event) {
  if (this.classList.contains('red')) {
    this.classList.remove('red')
    this.classList.add('blue')
  } else {
    this.classList.remove('blue')
    this.classList.add('red')
  }
}
container.appendChild(btn)
```

相同的功能，react 只关注最后的结果：

```js
class Button extends React.Component{
  this.state = { color: 'red' }
  handleChange = () => {
    const color = this.state.color === 'red' ? 'blue' : 'red';
    this.setState({ color });
  }
  render() {
    return (<div>
      <button
         className=`btn ${this.state.color}`
         onClick={this.handleChange}>
      </button>
    </div>);
  }
}
```

> 当你写组件时，把关注点放在在新的状态下，UI 的状态，而不是如何得到你想要的 UI。

### 如何确保写出声明式代码

1. 避免使用 refs，它命令式的;

2. 避免直接操作 DOM;

3. 尽量使用函数式组件

函数式组件不能使用生命周期，因为生命周期式声明式，更可能带来副作用。同时函数式组件性能更加好。

### 参考

[Declarative vs Imperative Programming](https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2)
