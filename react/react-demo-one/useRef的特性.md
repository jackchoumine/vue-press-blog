# useRef 的特性

useRef 存储的值在渲染之间**保持不变**，具有三个特性：

1. 值修改；

2. 修改值是不触发组件更新；

3. 保存的值在组件更新之间保持不变。

和 useState 比较，可知道其特性。

## useState vs useRef 的区别

```js
import React, { useRef, useState } from 'react'

export default function Counter() {
  const countRef = useRef(0)
  const [count, setCount] = useState(0)

  function handleRefClick() {
    countRef.current = countRef.current + 1
    console.log('useRef: Button is clicked ' + countRef.current + ' times')
  }

  function handleStateClick() {
    setCount(count + 1)
    console.log('useState: Button is clicked ' + count + ' times')
  }

  console.log('rendering triggered')

  return (
    <>
      <div>
        <button onClick={handleRefClick}>Click me: useRef</button>
        <p>countRef value: {countRef.current}</p>
      </div>
      <br />
      <div>
        <button onClick={handleStateClick}>Click me: useState</button>
        <p>count state value: {count}</p>
      </div>
    </>
  )
}
```

观察到的：

1. 点击 useRef 按钮，countRef.current 改变，但不触发组件渲染；

2. 点击 useState 按钮，count 值改变，触发组件渲染，countRef 的值不变。

> 值改变时需要展示**改变后**的值，就用 useState，否则使用 useRef。

## 典型的使用场景

1. 操作 DOM

```js
import React, { useRef } from 'react'

export default function App() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className='App'>
      <input ref={inputRef} type='text' value='hi' />
    </div>
  )
}
```

2. 记录计时器

```js
import React, { useRef } from 'react'

export default function TimeInterval() {
  const intervalRef = useRef(null)

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      console.log('interval start')
    }, 100)
  }

  const handleStop = () => {
    clearInterval(intervalRef.current)
    console.log('interval stop')
  }

  return (
    <div className='App'>
      <button onClick={handleStart}>Start Interval</button>
      <button onClick={handleStop}>Stop Interval</button>
    </div>
  )
}
```

3. 记住上次的 state, 方便和本次 state 比较

```jsx
function usePrevious(count) {
  const previous = useRef(null)
  React.useEffect(() => {
    // NOTE 在赋值之前还是上次的值，就可在赋值之前做一些逻辑
    console.log('set before', previous.current)
    previous.current = count
    // 在赋值之后是当前值
    console.log('set after', previous.current)
  }, [count])
  return previous.current
}

export function RememberLastState() {
  const [count, setCount] = useState(0)

  const previous = usePrevious(count)

  function add() {
    console.log('****************************')
    console.log('setCount before previous', previous)
    console.log('setCount before', count)
    setCount(count + 1)
    console.log('setCount after', count)
    console.log('setCount after previous', previous)
    console.log('****************************')
  }

  return (
    <div>
      <h2>记录上一次的 state</h2>
      <div>previous: {previous}</div>
      <button onClick={add}>{count}</button>
    </div>
  )
}
```

## 总结

useRef 变化时，组件不渲染，可用于保存值。

## 参考

[Understanding React Hook useRef](https://budiirawan.com/understanding-react-use-ref/)
