# react 高级概念

## 虚拟 DOM 以及性能优化

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

   比较完根节点后， React 会以同样的原则继续递归比较子节点， 每一个子节点相对于其层级以下的节点来说又是一个根节点。 如此递归比较， 直到比较完两棵树上的所有节点， 计算得到最终的差异， 更新到 DOM 树中。

性能优化的方式：

① 使用生产环境的版本的库

② 避免不必要的组件渲染。`shouldComponentUpdate` 决定是否需要重新渲染。继承 `PureComponent` 组件

React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

::: warning 注意
React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。
:::

[更多内容](https://www.cnblogs.com/ldld/p/11107305.html)

③ 使用 key

性能检查工具：

① react developer tool for chrome <!--  TODO 如何分析？  -->

② chrome 性能面板 <!--  TODO 如何分析？  -->

③ why-did-you-update npm 包 <!--  TODO 如何分析？  -->

> react / vue 中的 key 的作用？内部原理是什么？

> 为何遍历列表时，key 最后好不要用 index?

① key 是虚拟 DOM 的标识，在比较虚拟 DOM 变化时，可提高比较速度。

详细说：当状态改变，会生成新的虚拟 DOM，然后新旧虚拟 DOM 会进行比较，比较规则：

A. key 相同
虚拟 DOM 的内容没有变化，使用旧的虚拟 DOM
虚拟 DOM 的内容改变，使用不同点去替换
B. key 不同
新虚拟 DOM 替换掉旧的虚拟 DOM

使用 index 存在的问题：存在破坏顺序的操作时，页面会发现错乱，特别是当列表中存在表单交互的 DOM，更加明显。

## 高阶组件

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

### memo 函数

React.memo 是一个高阶组件，React.memo 仅检查 props 变更，返回最近一次渲染结果。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

> 高阶组件 vs 父组件

高阶组件是一个函数， 函数关注的是逻辑； 父组件是一个组件， 组件主要关注的是 UI/DOM。

逻辑是与 DOM 直接相关的，那么这部分逻辑适合放到父组件中实现； 如果逻辑是与 DOM 不直接相关的， 那么这部分逻辑适合使用高阶组件抽象，如数据校验、请求发送等。

## hook
