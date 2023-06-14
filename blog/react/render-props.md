# 如何设计一个组件？常见的 React 组件设计模式 --- render-prop

<!-- vs HOC -->

## render-prop

`render-prop`：

> 将**渲染函数**通过组件的 prop 传入组件内部，组件的使用者就可完全控制渲染的内容，可在组件内部传递相关参数。它是一种重用组件逻辑和状态的方式。

```jsx
<Counter
  render={value => {
    return (
      <>
        <Decrement
          onDecrement={() => {
            setValue(value => value - 1)
          }}
        />
        <Label>计数器</Label>
        <Count count={value} max={10} />
        <Increment
          onIncrement={() => {
            setValue(value => value + 1)
          }}
        />
      </>
    )
  }}
  value={value}
/>
```

Counter 的实现：

```jsx
import styled from 'styled-components'

function Counter({ render, value, children }) {
  console.log('Counter render')
  if (children) {
    return <StyledCounter>{children(value)}</StyledCounter>
  }
  return <StyledCounter>{render && render(value)}</StyledCounter>
}
const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`
export { Counter }
```

`children` 是特殊的 prop，可将一个渲染函数当成 children 传入。

```jsx
<Counter value={value1}>
  {value => {
    return (
      <>
        <Decrement
          onDecrement={() => {
            setValue1(value => value - 1)
          }}
        />
        <Increment
          onIncrement={() => {
            setValue1(value => value + 1)
          }}
        />
        <Label>计数器</Label>
        <Count count={value} max={10} />
      </>
    )
  }}
</Counter>
```

renderProp vs renderChildren

renderProp 可自由定义 prop 的名字，renderChildren 不能改名字。

renderProp 可读性不及 renderChildren, renderChildren 可清楚组件的开始和结束。

renderProp 还能再传递子组件，renderChildren 不能再传递子组件，renderProp 更加灵活。

## 关于 renderProp 的疑问

> renderProp vs renderChildren 该用哪个？

`renderProp`。

理由：renderProp 更加灵活，可重命名，好的命名极为重要。

将 renderProp 提取成函数，可解决可读性问题。

<!-- > renderProp 性能会变差吗？ -->

<!-- FIXME -->

> 什么情况从组件内部给 renderProp 传递参数？从内部传递参数有什么好处吗？不传递参数，也能实现相同的功能。

目前 react 还没遇到必需从内部传递参数的情况。 vue 需要从内部传递参数，使用起来才方便。

<!-- FIXME -->

<!-- > props getter 并没有解决属性被覆盖的问题。 -->

<!-- FIXME -->

<!--
## HOC

高阶组件：接收一个组件作为参数，返回一个新组件的函数，是一种重用逻辑的方方式。

```jsx
import { useState } from 'react'
import { CounterWith } from './Counter'
import { Count, Increment, Decrement, Label } from './components'

function InnerComponent({ onIncrement, onDecrement, value, max = 10, text = '计数器' }) {
  return (
    <>
      <Increment onIncrement={onIncrement} />
      <Label>{text}</Label>
      <Count count={value} max={max} />
      <Decrement onDecrement={onDecrement} />
    </>
  )
}

function Counter() {
  const [value, setValue] = useState(0)
  return CounterWith(InnerComponent, {
    value,
    onIncrement: () => {
      setValue(value => value + 1)
    },
    onDecrement: () => {
      setValue(value => Math.max(0, value - 1))
    },
  })
}

export default Counter
```

HOC 的问题：

1. 不直接：会不知道 props 来自哪儿。
2. 命令冲突：两个高阶组件使用相同的 prop,容易冲突。
3. 静态组合，不是很明白静态组合的问题。

## renderProp vs HOC

它们都能解决逻辑重用问题，renderProp 不存在 HOC 的问题，更加灵活，我更喜欢使用 renderProp
。

 -->

## vue 中如何实现 renderProp?

> 把 h 函数作为普通函数的第一个参数，那么这个函数被当成渲染函数，可返回 jsx，再把该函数通过 props 传递给组件，组件的 `setup` 或者 `render` 返回这个函数的调用，即可实现在数据里写 jsx，提高组件的可维护性和扩展性。

具体看[如何使用 render 改善组件](https://jackchoumine.github.io/vue2/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8render%E5%87%BD%E6%95%B0%E5%B0%81%E8%A3%85%E9%AB%98%E6%89%A9%E5%B1%95%E7%9A%84%E7%BB%84%E4%BB%B6.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-render-%E6%94%B9%E5%96%84%E7%BB%84%E4%BB%B6)

## 参考

[Use a Render Prop!](https://medium.com/@mjackson/use-a-render-prop-50de598f11ce)

[Function as Child Components](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9)

[When to NOT use Render Props](https://kentcdodds.com/blog/when-to-not-use-render-props)
