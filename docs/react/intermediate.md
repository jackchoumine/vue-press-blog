# react 进阶

1. ref

ref 可获取任意 DOM 或者组件，和 vue 中 ref 类似的。在一些场景下，ref 的使用可以带来便利，例如控制元素的焦点、文本的选择或者和第三方操作 DOM 的库集成。

① DOM 上使用 ref。
ref 接收一个回调函数作为值，在组件被挂载或卸载时，回调函数会被调用。被挂载时，回调函数会接收当前 DOM 元素作为参数；在组件被卸载时，回调 函数会接收 null 作为参数。

`LoginForm`

```js
  componentDidMount() {
    // 通过 ref 实现自动聚焦
    this.nameInput.focus()
  }
  blur() {
    // 通过 ref 实现失焦
    this.nameInput.blur()
  }
  // 其他代码省略
<input
  type="text"
  name="name"
  defaultValue="hello"
  ref={(nameInput) => {
    this.nameInput = nameInput
  }}
/>
```

② 组件上使用 ref。

```js
loginFormBlur = () => {
  //调用组件的方法
  this.loginForm.blur()
}
;<div>
  <LoginForm
    ref={loginForm => {
      this.loginForm = loginForm
    }}
  />
  <button onClick={this.loginFormBlur}>表单市失焦</button>
</div>
```

> ref 只在类组件上生效。

③ 通过 ref 获取子组件的 DOM

给组件传递自定义属性，该属性值是一个函数，和 ref 的值具备类似的参数，把这个自定义属性赋值给子组件内部的 ref，就可以在父组件中获取到子组件的 DOM 了。

```js
showChildDOM = () => {
  console.log(this.booksDOM.nodeType)
}
;<Books
  listRef={el => {
    // booksDOM 是父组件的一个属性
    this.booksDOM = el
  }}
/>
```

Books

```js
<ol ref={this.props.listRef}></ol>
```

> 要尽量避免使用 ref。

2. 虚拟 DOM 以及性能优化

DOM 是 HTML 文本结构的抽象，JS 直接对 DOM 进行操作，会引起页面重新布局和重新渲染，很耗时。前端优化的一条原则：尽量减少 DOM 操作。软件开发领域，遇到的问题，都可通过增加一层抽象层加以解决或改善。为了解决操作 DOM 效率底下的问题，react 引入虚拟 DOM，建立在真是 DOM 之上，对应真实 DOM。虚拟 DOM 并非是 react 独有的技术，而是一个独立的技术。

虚拟 DOM 和 react 元素是使用一个 JS 对象来描述它们的结构，访问 JS 对象比访问真是 DOM 快速得多。

diff 算法：

react 通过比较虚拟 DOM 结构的变化，找出差异部分，更新到真实 DOM 上去，这被叫调和过程（Reconciliation）。两种比较方式：
① 元素类型不同，生成不同的树；

② 列表元素中的 key 属性进行比较。

react 比较两棵树都从根节点比较，根据根节点类型不同，执行不同的操作。

> 根节点类型不同

根节点类型不同，react 认为是完全不同的树，不必再比较上属性和子节点，把整棵树销毁后重建。

销毁会执行 `componentWillUnmount`，重建会执行初始化、挂载等生命周期函数。这种情况需要大量 DOM，效率低下。

> 根节点类型相同

1. 根节点是相同 DOM，比较属性，更新变化的属性。

2. 根节点是相同类型的组件，执行更新操作，变化会同步到虚拟 DOM 上。执行 `componentWillReceiveProps` 和 `componentWillUpdate`

   比较完根节点后， React 会以同样的原则继续递归比较子节点， 每
   一个子节点相对于其层级以下的节点来说又是一个根节点。 如此递归比
   较， 直到比较完两棵树上的所有节点， 计算得到最终的差异， 更新到
   DOM 树中

性能优化的方式：
① 使用生产环境的版本的库

② 避免不必要的组件渲染。`shouldComponentUpdate` 决定是否需要重新渲染。继承 `PureComponent` 组件

③ 使用 key

性能检查工具：

① react developer tool for chrome <!--  TODO 如何分析？  -->

② chrome 性能面板 <!--  TODO 如何分析？  -->

③ why-did-you-update npm 包 <!--  TODO 如何分析？  -->

3. 高阶组件

JS 中参数为函数，返回值也是函数的函数叫高阶函数。类似的，高阶组件接受组件为参数，返回新的组件，本质是一个函数，高阶组件抽象、封装和分离组件的通用逻辑，可实现逻辑复用。

现在在 App 组件中设置一个本地数据：

```js
constructor(props) {
  super(props)
  localStorage.setItem('name', 'jackchou')
}
```

然后在两个组件中获取本地数据，然后渲染在组件中：

```js
componentWillMount() {
  const name = localStorage.getItem('name')
  this.setState({ name })
}

<input
  type="text"
  name="name"
  defaultValue={this.state.name}
  ref={(nameInput) => (this.nameInput = nameInput)}
/>
```

如果很多组件都用到了 name，那不得不在每个组件都获取一次 name，代码复用性不高。可使用高阶组件实现获取本地数据这一逻辑：

```js
import React, { Component } from 'react'
function withPersistentData(WrappedComponent) {
  return class extends Component {
    componentWillMount() {
      const name = localStorage.getItem('name')
      this.setState({ name })
    }
    render() {
      return <WrappedComponent name={this.state.name}></WrappedComponent>
    }
  }
}

export default withPersistentData
```

使用：

```js
const HocListBook = WithPersistentData(ListBook)
<HocListBook /> // 在 render 函数中
```

四种使用场景：

①. 操作 props

②. 通过 ref 访问组件实例

③. 组件状态提升

④. 使用其他元素包装组件，比如为被包装的组件提供样式

> 高阶组件 vs 父组件

高阶组件是一个函数， 函数关注的是逻辑； 父组件是一个组件， 组件主要关注的是 UI/DOM。

逻辑是与 DOM 直接相关的， 那么这部分逻辑适合放到父组件中实现； 如果逻辑是与 DOM 不直接相关的， 那么这部分逻辑适合使用高阶组件抽象， 如数据校验、 请求发送等。
