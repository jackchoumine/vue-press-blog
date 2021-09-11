# 如何设计一个组件？常见的 React 组件设计模 --- render-prop

`render-prop`：

> 将**渲染函数**通过组件的 prop 传入组件内部，组件的使用者就可完全控制渲染的内容，可在组件内部传递相关参数。

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

> 该用哪个？

`renderProp`。

理由：renderProp 更加灵活，可重命名，好的命名极为重要。

将 renderProp 提取成函数，可解决可读性问题。

> renderProp 性能会变差吗？

<!-- FIXME -->
