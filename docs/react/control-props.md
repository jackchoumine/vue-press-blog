# 如何设计一个组件？常见的 React 组件设计模式 --- control-props

复合组件维护自己地状态，是一个非受控组件，但是实际业务中，组件的使用者需要组件的当前状态做其他业务，因此，复合组件的状态最好能被组件外部控制，将复合组件改成受控组件。

```jsx
import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import useCounterContext, { CounterProvider } from './useCounterContext'

library.add(faPlus)
library.add(faMinus)

function Counter({ children, onChange, value = null, initialValue = 0 }) {
  const [count, setCount] = useState(initialValue)
  // 判断是否为受控组件
  const isControlled = useRef(value !== null && typeof onChange === 'function')
  useEffect(() => {
    isControlled.current && onChange(count)
  }, [count])

  const handleIncrement = useCallback(() => {
    setCount(count => count + 1)
  }, [1])

  const handleDecrement = useCallback(() => {
    setCount(count => Math.max(0, count - 1))
  }, [1])

  console.log('Counter render')
  return (
    // FIXME 如何优化性能 会渲染两次
    <CounterProvider value={{ count, handleDecrement, handleIncrement }}>
      <StyledCounter>{children}</StyledCounter>
    </CounterProvider>
  )
}
export default Counter

Counter.Count = Count
Counter.Label = Label
Counter.Increment = Increment
Counter.Decrement = Decrement

function Count({ max }) {
  // NOTE 共享 context
  const { count } = useCounterContext()
  // TODO 类似 vue 的计算属性
  const hasError = max ? count >= max : false
  return <StyledCount hasError={hasError}>{count}</StyledCount>
}
const StyledCount = styled.div`
  background-color: ${({ hasError }) => (hasError ? '#bd2130' : '#17a2b8')};
  color: white;
  padding: 5px 7px;
`
// 中间的 Label
function Label({ children }) {
  // children 是用户传递的内容
  return <StyledLabel>{children}</StyledLabel>
}
const StyledLabel = styled.div`
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 7px;
`
// 加减按钮
function Increment({ icon = 'plus' }) {
  // NOTE 共享行为
  const { handleIncrement } = useCounterContext()
  console.log('Increment')
  return (
    <StyledButton onClick={handleIncrement}>
      <FontAwesomeIcon color='#17a2b8' icon={icon} />
    </StyledButton>
  )
}
function Decrement({ icon = 'minus' }) {
  console.log('Decrement')
  const { handleDecrement } = useCounterContext()
  return (
    <StyledButton onClick={handleDecrement}>
      <FontAwesomeIcon color='#17a2b8' icon={icon} />
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:active,
  &:focus {
    outline: none;
  }
`
const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`
```

用法

```jsx
import React, { useState } from 'react'
import Counter from './Counter'

export default function Usage() {
  const [value, setValue] = useState(0)
  return (
    <div>
      <h3>受控组件</h3>
      <Counter
        value={value}
        onChange={value => {
          console.log(value)
          setValue(value)
        }}>
        <Counter.Decrement />
        <Counter.Label>计数器</Counter.Label>
        <Counter.Count max={10} />
        <Counter.Increment />
      </Counter>
      <hr />
      <Counter>
        <Counter.Decrement />
        <Counter.Increment />
        <Counter.Count max={10} />
        <Counter.Label>counter</Counter.Label>
      </Counter>
    </div>
  )
}
```

优点：

1. 给用户更多控制权；
2. 复合组件有的优点它都有；

缺点：
复合组件的缺点它都有。
