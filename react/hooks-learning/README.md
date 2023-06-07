# react hooks 学习

## 如何保证状态一致性

react 的 UI 完全是**状态驱动**的，所以状态的**一致性**是非常重要的，如果状态不一致，那么 UI 就会出现问题。react 开发其实就是复杂应用程序的**状态管理和开发**。

为了保证状态的一致性，应遵循以下原则：

### 保证状态最小化

保证状态完整性的同时，也要保证状态的最小化，这样才能保证最简单，最不容易出错。

那么如何保证状态的最小化呢？

1. 一些状态是可以通过计算得到的，这些状态就不需要存储在 state 中，而是通过计算得到。

`useMemo` 会在渲染期间执行，返回值作为状态值，类似 vue 的计算属性，且有缓存功能。

错误示例：

```jsx
function FilterList({ data }) {
  // 设置关键字的 State
  const [searchKey, setSearchKey] = useState('')
  // 设置最终要展示的数据状态，并用原始数据作为初始值
  const [filtered, setFiltered] = useState(data)

  // 处理用户的搜索关键字
  const handleSearch = useCallback(
    evt => {
      setSearchKey(evt.target.value)
      const result = data.filter(item => {
        return item.title.includes(evt.target.value)
      })
      setFiltered(result)
    },
    [filtered]
  )
  return (
    <div>
      <input value={searchKey} onChange={handleSearch} />
      {/* 根据 filtered 数据渲染 UI */}
    </div>
  )
}
```

> data 变了，搜索结果却却没有变化

错误示例，对上面的改进：

```jsx
function FilterList({ data }) {
  // 设置关键字的 State
  const [searchKey, setSearchKey] = useState('')
  // 设置最终要展示的数据状态，并用原始数据作为初始值
  const [filtered, setFiltered] = useState(data)

  // 处理用户的搜索关键字
  const handleSearch = useCallback(
    evt => {
      setSearchKey(evt.target.value)
      const result = data.filter(item => {
        return item.title.includes(evt.target.value)
      })
      setFiltered(result)
    },
    [filtered]
  )
  useEffect(() => {
    const result = data.filter(item => {
      return item.title.includes(searchKey)
    })
    setFiltered(result)
  }, [searchKey,data])
  return (
    <div>
      <input value={searchKey} onChange={handleSearch} />
      {/* 根据 filtered 数据渲染 UI */}
    </div>
  )
}
```

> 状态的变更变得复杂，这样复杂是完全没有必要的

正确示例：使用`useMemo`计算搜索结果

```jsx

function FilterList({ data }) {
  const [searchKey, setSearchKey] = useState('')

  // 每当 searchKey 或者 data 变化的时候，重新计算最终结果
  const filtered = useMemo(() => {
    return data.filter(item => item.title.toLowerCase().includes(searchKey.toLowerCase()))
  }, [searchKey, data])

  return (
    <div className='08-filter-list'>
      <h2>Movies</h2>
      <input
        value={searchKey}
        placeholder='Search...'
        onChange={evt => setSearchKey(evt.target.value)}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

状态只有一个了，而且是最小的，这样就容易保证了状态的一致性。

### 避免中间状态，确保单一数据源 --- 修改状态的唯一途径

具体来说，就是要保证状态的**单一来源**，即状态只能在一个地方被修改，这样才能保证状态的一致性。

在任何时候想要定义新状态的时候，都要问自己一下：这个状态有必要吗？是否能通过计算得到？是否只是一个中间状态？只有每次都仔细思考了，才能找到需要定义的最本质的状态。

## 练习题

1. 如果希望一个 React 组件不渲染任何内容，可以如何去做？

> 返回 null '' false

> 返回 undefined 会报错, 返回 0 渲染 0 。
