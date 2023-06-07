# hooks 学习

## useState

> 什么样的值应该保存在 state 中？

不保存可通过计算得到的值。

- **从 props 传递过来的值**。有时候 props 传递过来的值无法直接使用，而是要通过一定的计算后再在 UI 上展示，比如说排序。那么我们要做的就是每次用的时候，都重新排序一下，或者利用某些 cache 机制，而不是将结果直接放到 state 里。

- **从 URL 中读到的值**。比如有时需要读取 URL 中的参数，把它作为组件的一部分状态。那么我们可以在每次需要用的时候从 URL 中读取，而不是读出来直接放到 state 里。

- **从 cookie、localStorage 中读取的值**。通常来说，也是每次要用的时候直接去读取，而不是读出来后放到 state 里。

## useEffect --- 执行副作用

> 什么是副作用？和函数式编程里的副作用有什么关系？

```js
useEffect(effectFunction,deps)
```

`useEffect`执行时机：每次渲染之后，判断依赖是否改变，改变就会执行，包括第一次渲染。

### 用法

1. 不传第二个参数，每次渲染之后都会执行

```js
useEffect(() => {
    // 每次渲染之后都会执行
})
```

2. 第二个参数传入空数组，只会在第一次渲染之后执行

```js
useEffect(() => {
  // 第一次渲染之后执行，后面重新渲染不会执行
}, [])
```

3. 提供依赖数组

```js
// 第一次以及依赖数组发生变化后执行
useEffect(effectFn,[dep1,dep2,...])
```

4. 返回清理函数

```js
useEffect(()=>{
    return function cleanUp() {
        // 组件销毁时执行 cleanUp
    }
},[dep1,dep2,...])
```

### 关于依赖数组

1. 依赖中的变量，一定会在副作用函数中用到，否则依赖就是没有意义的。

2. 依赖一般为常量数组

3. 比较依赖变化的方法是比较引用，而不是比较值，所以如果依赖是对象或者数组，那么每次都会执行副作用函数。很容易导致 bug。

## hooks 的使用规则

1. 只能在函数组件组件的顶级作用域使用 hooks，不能在循环、条件判断或者子函数中使用。

```js
function MyCom(){
    const [count,setCount] = useState(0)
    return <div>{count}</div>
}
```

```js
function MyCom(){
    const [count,setCount] = useState(0)
    // 不能这样使用 ❌
    if(count>10){
        const [count2,setCount2] = useState(0)
    }
    return <div>{count}</div>
}
```

```js
function MyCom(){
    const [age,setAge] = useState(10)
    if(age>10){
        return <span>age 大于 10</span>
    }
    // 不能在 return 之后  ❌
    const [count2,setCount2] = useState(0)
    return <div>{count}</div>
}
```

2. 只能在其他自定义 hooks 中使用 hooks，不能在普通的函数中使用。

## useCallback

> 缓存函数定义

函数组件每次检测到状态变化，都会重新执行，函数组件中并没有一个直接的方式在**多次渲染之间**维持某个状态不变。

```js
function Counter() {
  const [count, setCount] = useState(0);
  function onClick(){setCount(count + 1)};
  // ...
  return <button onClick={onClick}>+</button>
}
```

每次点击`+`, 组件重新渲染，onClick 重新定义，实际上是没必要的。

onClick 重新定义后，如果它被传递给子组件，又会引发子组件重新渲染。
