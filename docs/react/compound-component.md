# 如何设计一个组件？常见的 React 组件设计模式 --- 复合组件

react 以组件构成页面，极大提高了开发效率和代码维护难度，但是不注重组件设计方法，容易导致难以理解、扩展性差、难以复用的组件。

设计一个组件前，需要考的事情：

- 重用：如何设计以适应多种需求（用例）变化吗？

> 对需求的理解是否全面、是否考虑了可能的需求变化，很大程度上决定了组件的是否能重用。

- 易用：如何设计组件的 API，才能保持**简单**、符合直觉？

> props 多少和复杂程度，决定了组件是否易用。

- 扩展：如何保证不重写组件以满足未来的需求变化？

> 组件设计的复杂度往往度往往决定是是否可扩展。

另外，`控制反转`越大，复用性和扩展性越好。

> 控制反转：程序如何工作，不是由开发者控制，而是程序调用者有更多控制权。可简单理解为程序能实现高度定制化，用户能实现他想要的很多需求。**程序开发者做得很少，但是提供接口给程序调用者实现很多需求**。

回答以上三个问题，人们总结了一些设计组件的思路。

实际开发中，开发完一个组件，遇到新需求变化，我们才来回答第三个问题，此时往往很难得到满意的答案，又开始编写满足新需求的组件，但是不知道组件设计方法，仍然很容易出现之前的问题。可见学习常见的组件设计方法**极为必要**。

## 复合组件

复合组件：多个独立的组件组合使用，这些组件**隐式地共享状态和行为**。复合组件语法符合自觉，**易用**，灵活，**容易扩展**。

> 常规实现方式

```js
export default function Select({ value = [], onChange, options = [] }) {
  const [filter, setFilter] = useState('')
  const [optionList, setOptionList] = useState(options)
  useEffect(() => {
    if (filter) {
      const value = options.filter(item => item.value.toLowerCase().includes(filter.toLowerCase()))
      setOptionList(value)
    }
  }, [filter])
  return (
    <div className='select-container'>
      <input
        type='text'
        placeholder='支持模糊搜索'
        value={filter}
        onChange={event => {
          setFilter(event.currentTarget.value)
        }}
      />
      <div className='options-container'>
        {optionList.map(item => {
          return (
            <label className={value.includes(item.value) ? 'option option-selected' : 'option'} key={item.value}>
              <input
                className='checkbox'
                type='checkbox'
                checked={value.includes(item.value)}
                onChange={event => {
                  if (event.currentTarget.checked) onChange([...value, item.value])
                  else onChange(value => value.filter(val => val !== item.value))
                }}
              />
              {item.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}
```

用法：

```jsx
<Select
  value={value}
  onChange={setValue}
  options={[
    { value: 'apples', label: 'Apples' },
    { value: 'oranges', label: 'Oranges' },
    { value: 'Peaches', label: 'Peaches' },
    { value: 'Grapes', label: 'Grapes' },
    { value: 'Plums', label: 'Plums' },
  ]}
/>
```

缺点：

1. 不易用：不符合自觉

这种符合直觉。

```html
<select>
  <option value="apples">Apples</option>
  <option value="oranges">Oranges</option>
  <option value="pears">Pears</option>
</select>
```

2. 不够灵活，比如想要给下拉应用样式，变得复杂。

3. 实现比较复杂

使用复合组件模式改进

> 操作孩子组件实现

```js
import React, { useState } from 'react'

export default function MySelect({ children, value, onChange }) {
  const [filter, setFilter] = useState('')
  const newChildren = React.Children.map(children, child => {
    const newChild = React.cloneElement(child, {
      filter,
      selectedValue: value,
      onChange,
    })
    return newChild
  })
  return (
    <div>
      <input value={filter} onChange={event => setFilter(event.currentTarget.value)} />
      {newChildren}
    </div>
  )
}
MySelect.Option = Option

function Option({ value, children, onChange, selectedValue, filter }) {
  if (!value.toLowerCase().includes(filter.toLowerCase())) return null
  return (
    <label>
      <input
        type='checkbox'
        checked={selectedValue.includes(value)}
        onChange={event => onChange(value, event.currentTarget.checked)}
      />
      {children}
    </label>
  )
}
```

用法：

```js
import React, { useState } from 'react'
import Select from './index'

export default function Example() {
  const [value, setValue] = useState([])
  return (
    <div>
      <Select
        value={value}
        onChange={(optionValue, selected) => {
          // console.log(optionValue, selected)
          if (selected) {
            setValue([...value, optionValue])
          } else {
            setValue(value.filter(ele => ele !== optionValue))
          }
        }}>
        <Select.Option value='apples'>Apples</Select.Option>
        <Select.Option value='oranges'>Oranges</Select.Option>
        <Select.Option value='peaches'>Peaches</Select.Option>
        <Select.Option value='grapes'>Grapes</Select.Option>
        <Select.Option value='plums'>Plums</Select.Option>
      </Select>
    </div>
  )
}
```

> 缺点

1. 不够灵活：使用了操作孩子组件的方法，限制了 Select 的直接子组件只能是 Option，想要使用 div 包裹 Option ，无法实现。

2. 复制组件，有内存开销。

3. 实现比较复杂，不易懂

> 使用 context 改进上一个方案

主要代码

```tsx
import type { ReactNode } from 'react'
import { createContext, useState, useContext } from 'react'
import '../../components/MySelect/index.less'

type selectContextType = {
  isSelected: ((key: string) => boolean) | null
  setSelected: ((key: string, selected: boolean) => void) | null
  filter: string
}

const initialContext = {
  isSelected: null,
  setSelected: null,
  filter: '',
} as const

const SelectContext = createContext<selectContextType>(initialContext)
SelectContext.displayName = 'SelectContext' // 方便调试，不设置 显示 context

type propsType = {
  value: string[]
  onChange: (value: string[]) => void
  children: ReactNode
}

export default function Select({ children, value, onChange }: propsType) {
  const [filter, setFilter] = useState('')
  return (
    <SelectContext.Provider
      // NOTE 公共行为和状态
      value={{
        isSelected: key => value.includes(key),
        setSelected: (optionValue, selected) => {
          if (selected) {
            onChange([...value, optionValue])
          } else {
            const selectedValue = value.filter(val => val !== optionValue)
            onChange(selectedValue)
          }
        },
        filter,
      }}>
      <div className='select-container'>
        <input type='text' placeholder='支持模糊搜索' value={filter} onChange={evt => setFilter(evt.target.value)} />
        <div className='options-container'>{children}</div>
      </div>
    </SelectContext.Provider>
  )
}

Select.Option = Option

type optionPropsType = {
  children: ReactNode
  value: string
}

function Option({ children, value }: optionPropsType) {
  // NOTE 在后代组件中获取公共的行为和状态
  const { isSelected, setSelected, filter } = useContext(SelectContext)

  if (!value.toLowerCase().includes(filter.toLowerCase())) return null

  return (
    <label className={isSelected!(value) ? 'option option-selected' : 'option'}>
      <input
        type='checkbox'
        className='checkbox'
        checked={isSelected!(value)}
        onChange={evt => setSelected!(value, evt.currentTarget.checked)}
      />
      {children}
    </label>
  )
}
```

用法：

```tsx
<Select value={selection} onChange={setSelection}>
  <Select.Option value='apples'>Apples</Select.Option>
  <Select.Option value='oranges'>Oranges</Select.Option>
  <Select.Option value='peaches'>Peaches</Select.Option>
  <Select.Option value='grapes'>Grapes</Select.Option>
  <Select.Option value='plums'>Plums</Select.Option>
</Select>

<Select value={selection} onChange={setSelection}>
  <div
    style={{
      // 可方便地修改样式
      display: 'flex',
      width: '500px',
      justifyContent: 'flex-start',
    }}
  >
    <Select.Option value='apples'>Apples</Select.Option>
    <Select.Option value='oranges'>Oranges</Select.Option>
    <Select.Option value='peaches'>Peaches</Select.Option>
    <Select.Option value='grapes'>Grapes</Select.Option>
    <Select.Option value='plums'>Plums</Select.Option>
  </div>
</Select>
```

优点：

1. API 简单：避免了 props 地狱，符合直觉，易用；
2. 灵活：用户可灵活控制子组件的顺序以及展示内容；
3. 代码简洁：数据交互更加清楚，指责划分明确。

缺点：

1. context 使得数据来源不清晰，这个缺点相比有点，几乎可忽略;

### 使用复合组件需要注意什么

使用前问问自己：

1. 两个以上组件能**更好地**实现需求吗？设计良好的单个组件可满足当前需求吗？未来需求变化大吗？

2. 采用复合组件实现易用吗？数据交互简单吗？

### 哪些场景适合复合组件

一个父组件和多个子组件一起使用能更好实现的需求。

1. 表格：需要组件使用者提供数据、排序、过滤、自定义列等

```tsx
<Table>
  <Row></Row>
</Table>
```

2. 表单

3. 滚动分页

```tsx
<BestScroll>
  <Table>
    <Row></Row>
  </Table>
</BestScroll>
```

4. 下拉多选、复选框、单选

5. Tab 标签

6. 菜单

### 总结

复合组件适合多个组件配合才能完成的需求。

角色划分

1. 父组件通过 context 提供状态和行为
2. 子组件通过行为改变数据
3. 当前的状态决定子组件的渲染
4. 复合组件形成了一个小的有状态的系统

## 参考文章

[Making good component design decisions in React](https://marvelapp.com/blog/making-good-component-design-decisions-in-react/)

[Quick guide to React compound components](https://blog.logrocket.com/guide-to-react-compound-components-9c4b3eb482e9/)

[Advanced React Component Patterns](https://kentcdodds.com/blog/advanced-react-component-patterns)

[React Hooks: Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)

[How To Master Advanced React Design Patterns — Compound Components](https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-1-dd495fa1823)
