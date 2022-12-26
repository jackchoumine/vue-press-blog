# useMemo vs useCallback

它们类似 vue 中的计算属性。

useMemo 的作用：

> 减少计算量，比如有一个组件计算质数

> 保持数组、对象和函数的引用，避免重复渲染

> useCallback 用于保持函数的引用，是 useMemo 的特殊情况

具体来说，`userCallback`的返回值是一个函数，第一个参数是一个函数，第二个参数是一个数组，当第二个参数**变化**时，返回新的函数。第二个参数是一个空数组，返回相同的函数。

`useMemo`的参数和返回值和`userCallback`类似，不同之处为第一个参数往往会返回一个值，useMemo 更加接近 vue 中的计算属性。

```jsx
import React, { useMemo } from 'react'

function App({ text }) {
  const [state, setState] = useState(true)
  const someRandomObject = {
    a: state ? 3 : 4,
    b: !!state,
  }
  return (
    <div className='App'>
      <div>{text}</div>
      <button onClick={() => setState(!state)}>Change</button>
    </div>
  )
}
```

> 每次 text 改变，someRandomObject 会重新计算。可使用 useMemo 优化。

```jsx
import React, { useMemo } from 'react'
function App({ text }) {
  const [state, setState] = useState(true)
  const someRandomObject = useMemo(
    () => ({
      a: state ? 3 : 4,
      b: !!state,
    }),
    [state]
  )
  return (
    <div className='App'>
      <div>{text}</div>
      <button onClick={() => setState(!state)}>Change</button>
    </div>
  )
}
```

## 使用场景

react 是高度优化的，大部场景下不需要特意使用他们，他们带来的性能提升也是微不足道的。

只有当检查或者注意到应用存在明显的性能问题了，再考虑使用他们。

### 在这两种场景下一定会使用

> 通用的自定义 hook

比如：

```js
function useToggle(initialValue) {
  const [value, setValue] = React.useState(initialValue)
  const toggle = React.useCallback(() => {
    setValue(v => !v)
  }, [])
  return [value, toggle]
}
```

> context provider

provider 往往会提供巨大的对象，传递给后代组件，当 provider value 改变时，会导致所有后代都重新渲染，用 useMemo 缓存 value 能避免。

```js
const AuthContext = React.createContext({})
function AuthProvider({ user, status, forgotPwLink, children }) {
  const memoizedValue = React.useMemo(() => {
    return {
      user,
      status,
      forgotPwLink,
    }
  }, [user, status, forgotPwLink])
  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
```

## 其他优化手段

> 状态下推，然后分离组件

把计算量大的组件提取成单独的组件，减少复杂状态变更引发的不必要重新渲染。

> 使用纯组件：`React.memo()` 包裹组件

memo 用于缓存整个组件。

> 以上两者结合

## 参考

[Understanding useMemo and useCallback](https://www.joshwcomeau.com/react/usememo-and-usecallback/)

[React Hooks: Optimizing for performance](https://itnext.io/optimizing-react-code-with-hooks-3eaaf5978351)

[React, Inline Functions, and Performance](https://reacttraining.com/blog/react-inline-functions-and-performance/)
