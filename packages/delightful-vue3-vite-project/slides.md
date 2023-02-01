---
highlighter: shiki
---

# vue3 与 hook (一)

组合式函数是 vue3 带来的重大特性，是组织组件的新方式，关于它的好处，网上已经有很多文章阐述了，本文主要阐述编写组合函数的技巧或模式。

> 什么是组合式 API?

vue 官网说，组合式 API 是一系列 API 的集合，使得可使用函数的方式编写组件。它包含一下 API:

- 响应式 API: ref、reactive 等；

- 生命周期钩子：onMounted 等；

- 依赖注入：provide & inject。

使用了以上 api 的函数，叫组合函数，通常使用`use`前缀命名。

---

## vue2 复用状态逻辑的方式

在讨论具体的技巧之前，先看看状态和状态逻辑的区别。

> 状态 vs 状态逻辑

状态即组件状态：影响组件 UI 层的数据，可理解成 props 和 state，往往是变量，是数据，不含函数逻辑。为何说往往？有时候函数也可以作为 prop 传入组件，较少。

状态逻辑：**操作**组件状态的**函数**，希望能在组件之间**复用**。

操作的动作通常包括：订阅（获取）状态、修改状态、监听状态的变化等。

[stackoverflow 上更多讨论](https://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react)

---

### vue2 复用状态逻辑的方式

1. mixin

2. extends

> mixin 在插件中用得比较多，比如 vuex 全局混入状态。

> extends 可复用逻辑、状态和模板。

这两种方式都不好，滥用会导致命名冲突，代码难以理解，数据来源难以追踪。

3. renderProp

4. renderLess

> 复用逻辑、状态和模板。

比 1、2 好点，使用得当，可让组件易扩展、易使用，好理解。

5. provide inject

这在常规的项目开发中，很少用到，使用多了，会让组件变得强耦合，数据来源难以追踪。

> 复用状态、逻辑，在 vue 插件使用得多。

---

6. 将函数或者属性绑定到 vue 原型上

没有严重的缺点，主要复用逻辑，比如挂载 http 请求函数。

### vue2 复用状态逻辑的问题

- 状态和 this 绑定了，导致复用困难

3 和 4 的方式，可使得状态脱离 this，非常强大，我非常喜欢这两种方式，但根据个人经验，vue2 的用户中，熟悉这两种的较少。

- 不能单独测试，需要依赖组件

在 vue3 中，1、2、6 的方式基本可以不用了。

- 状态来源难以追踪

- 命名冲突

- 类型支持弱

> 总之，问题比较多。

---

## 如何理解 setup？

vue3 的组合式函数解决 vue2 难以复用状态逻辑的问题。

组合式函数的优点

1. 状态不再和 this 绑定，独立于组件，可单独测试

2. 状态之间的依赖关系更加清晰，容易调试

3. 都是函数，可灵活组合，可从是否为纯函数的角度考虑

4. 类型支持好

参考 react hook 的写法，使用 use 作为组合函数的前缀。

在编写组合函数时，相同的功能，使用 react hook 实现一遍，加深理解两者的区别。

---

### 状态和逻辑如何连接的？

---
layout: two-cols
---

# hooks.ts

```ts
export function useAdd(a: MaybeRef<number>,
 b: MaybeRef<number>) {
  console.log('useAdd') // NOTE 这个会执行几次？
  return computed(() => unref(a) + unref(b))
}
```

::right::

# UseAdd.vue

```html
<template>
  <p>c:{{ c }}</p>
  <button type="button" @click="b = 100">修改b</button>
</template>
<script>
  import { useAdd } from './hooks'
  export default {
    setup() {
      const a = 1
      const b = ref(10)
      const c = useAdd(a, b)
      return { b, c }
    },
  }
</script>
```

> 点击按钮，修改 b 时， useAdd 会再次执行？ console.log('useAdd') 执行吗？

---

<UseAdd />

<v-click>

> setup 函数在组件创建时**只执行一次**，在 setup 中组合函数建立状态（数据）和逻辑（函数）、状态和模板之间的连接，即组合函数在 setup 钩入组件。

</v-click>

<v-click>

setup 函数在组件创建时执行一次，useAdd 也执行了一次，a、b、c 之间就建立了关系，当修改 b 时，c 也会变化，_但 useAdd 不会再执行_。

</v-click>

---

react 版本的 useAdd:

```ts
export function useAdd(a: number, b: number) {
  console.log('useAdd')
  return useMemo(() => {
    console.log('useMemo')
    return a + b
  }, [a, b])
}
```

```jsx
import { useAdd } from './hooks'
export default function UseAddDemo() {
  const a = 1
  const [b, setB] = useState(10)
  const c = useAdd(a, b)
  return (
    <div>
      <p>c:{c}</p>
      <button type='button' onClick={() => { console.log('onClick') setB(oldValue => ++oldValue)}}>
        修改b
      </button>
    </div>
  )
}
```

> 修改 b 后，useAdd 再次执行， 导致 console.log('useAdd') 再执行，注意这和 vue 的组合函数的重要区别。

---

vue 的组合函数在单独的 js 文件中使用，也会建立这样的依赖关系。

`testUseAdd.js`:

```js
import { useAdd } from './hooks'
let a = 10
const b = ref(20)
const c = useAdd(a, b)
console.log(c.value) // 30
setTimeout(() => {
  a = 100
  b.value = 1000 // 修改 b console.log('useAdd') 会执行吗？
  console.log('setTimeout')
  console.log(c.value) // c 变成 1010，而不是 1100 why？？
}, 4000)
```

把`testUseAdd.js`引入组件，进行测试：

```html
<script>
  import './testUseAdd'
</script>
```

<v-click>

> useAdd 的行为和在组件中的一致。console.log('useAdd') 不会再执行。

</v-click>

---

总结：

- 组合函数在 setup 执行时建立状态和模板的连接

- 组合函数可有自己的状态、计算属性、监听器、生命周期

- 注意在组合函数中只会执行一次的函数

- 对状态之间的**关系**需要有清晰的认识，否则无法提取组合函数

理解这四点是写好组合函数的关键。

### 理解状态之间的关系是提取组合函数的关键

识别出组件状态之间的关系对提取组合函数极为重要，否则就无法提取组合函数。


---
layout: two-cols
---

# 比如，有这样一段代码

```js
const a = ref(0)
const b = ref('')
const c = ref(true)
const d = reactive({})
const actionA = () => {
  a.value++
}
const actionC = () => {
  c.value = !c.value
}
const actionB = () => {
  b.value += 'test'
}
const actionD = async () => {
  const res = await http(`url`)
  d.a = res.a
  d.b = res.b
  d.c = res.c
}
const resetD = () => {
  Object.keys(d).forEach(key => delete d[key])
}
```
::right::

# 关系复杂，难以阅读

不能明显看出状态之间的关系，比 option api 更加难以理解。理清楚状态之间的关系后，提取组合函数

---
layout: two-cols
---

# `useHookA.js`

```js
export const useHookA = () => {
  const a = ref(0)
  const b = ref('')
  const c = ref(true)
  const actionA = () => {
    a.value++
  }
  const actionC = () => {
    c.value = !c.value
  }
  const actionB = () => {
    b.value += 'test'
  }
  return {
    a,
    actionA,
    b,
    actionB,
    c,
    actionC,
  }
}
```

::right::

# `useHookB.js`

```js
export const useHookB = () => {
  const d = reactive({})
  const actionD = async () => {
    const res = await http(`url`)
    d.a = res.a
    d.b = res.b
    d.c = res.c
  }
  const resetD = () => {
    Object.keys(d).forEach(key => delete d[key])
  }
  return {
    d,
    actionD,
    resetD,
  }
}
```


```js
// 从 hooks/index.js 导出 hooks
import { useHookA, useHookB } from './hooks'
const { b, actionB } = useHookA()
const { d, restD } = useHookB()
```
---
layout: center
---

## 理解状态之间的关系，对提取组合函数时尤其重要

要求开发者有良好的**代码设计意识**和对业务有比较全面的理解，否则极可能写出难以阅读和维护的组件。

<v-click>

### 那么，如何设计组合函数呢？

</v-click>


---
layout: center
---

# 编写组合函数的常见模式或技巧

---

## 返回响应式状态

使用组合函数封装一个响应式的 storage。

---

---
layout: two-cols
---

```js
export function useStorage(key, type = 'session') {
  let storage = null
  switch (type) {
    case 'session':
      storage = sessionStorage
      break
    case 'local':
      storage = localStorage
    default:
      break
  }
  const value = shallowRef(getItem(key, storage))
  function setItem(storage) {
    return newValue => {
      value.value = newValue
      storage.setItem(key, JSON.stringify(newValue))
    }
  }
  // NOTE 返回数组，可像 react 中的 useState 一样解构
  return [value, setItem(storage)]
}
```

::right::

```js
function getItem(key, storage) {
  const value = storage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}
```

```js
const [person, setItem] = useStorage('jack')
```

> 返回的响应式状态，可直接绑定到模板上、可监听、可用于计算属性，就和在 setup 里声明的变量具有同等效果。

> setItem 用于修改状态，状态被修改了，会响应到模板上。

```js
const [person, setItem] = useStorage('jack')
setItem({ name: 'reactive session storage' })
setTimeout(() => {
  setItem({ name: 'session storage' })
}, 4000)
watch(person, value => {
  console.log(value)
})
```
---

---
layout: two-cols
---

```js
import { useState } from 'react'
function useStorage(key, type = 'session') {
  let storage = null
  switch (type) {
    case 'session':
      storage = sessionStorage
      break
    case 'local':
      storage = localStorage
    default:
      break
  }

  const [value, setValue] = useState(getItem(key, storage))
  function setItem(storage) {
    return newValue => {
      setValue(newValue)
      storage.setItem(key, JSON.stringify(newValue))
    }
  }
  // NOTE 返回数组，可像 react 中的 useState 一样解构
  return [value, setItem(storage)]
}

export default useStorage
```

::right::

```js
import { useEffect } from 'react'

import { useStorage } from '../../hooks'

export default function WindowResize() {
  const [jack, setJack] = useStorage('jack')
  // setJack({ name: 'JackChou', age: 24 }) //NOTE 不能这样调用
  useEffect(() => {
    setJack({ name: 'JackChou', age: 24 })
  }, [])
  return (
    <div>
      <p>
        jack's name {jack.name}, age {jack.age}
      </p>
      <button onClick={() => setJack({ name: 'JACK', age: 10 })}>修改jack</button>
    </div>
  )
}
```
---

> 技巧：返回 toRefs 的数据，可使用解构且变量保持响应性。

有一跟踪鼠标位置的`useMouse`的 hook:

```ts
import { useOn } from './useOn' // 稍后有定义

function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }

  useOn('mousemove', update, window) 

  return { x, y }
}
```

使用：

```js
const { x, y } = useMouse()
```

返回 ref 组成的对象，解构后的变量是响应性的。

---

改写 useMouse，返回 reactive 对象。

```ts
function useMouse() {
  const position = reactive({ x: 0, y: 0 })

  function update(event: MouseEvent) {
    position.x = event.pageX
    position.y = event.pageY
  }
  useOn('mousemove', update, window)

  return position
}
```

解构后属性失去响应性。

```js
const { x, y } = useMouse()
```

返回`toRefs`可解决：

```js
return toRefs(position)
```
---

> 技巧：返回响应式状态和在组件内声明的响应式状态一样：可监听，可用于生成计算属性。

比如：

```js
import { useFetch } from '@vueuse/core'

const { data } = useFetch('https://api.github.com/users/jackchoumine').json()
const avatar = computed(() => data.value?.avatar_url)
```

页面需要展示用户头像，可通过计算属性拿到，等接口返回后，再计算出用户头像。

---

react 版本的 useMouse

```ts
import { useState } from 'react'

import useOn from './useOn'

function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  function update(event: MouseEvent) {
    const { pageX, pageY } = event
    setPosition({ x: pageX, y: pageY })
  }
  useOn('mousemove', update, window)

  return position
}
export default useMouse
```

---

### 返回响应式状态及其修改函数

> 为何要返回一个修改状态的函数？

返回修改函数，使得状态可变化，就可把修改状态的操作封装在 hook 内部。

`useCounter`:

```ts
export default function useCounter(initCount: number = 0) {
  const count = ref(initCount)
  function add(step = 1) {
    count.value += step
  }
  function reduce(step = 1) {
    count.value -= step
  }
  return {
    count,
    add,
    reduce,
  }
}
```
---

在`SimpleCounter.vue`中使用：

```html
<script setup lang="ts">
  import {useCounter} from './hooks'

  const { count, add, reduce } = useCounter(10)
</script>

<template>
  <div class="counter">
    <button @click="() => reduce()">-</button>
    {{ count }}
    <button @click="() => add()">+</button>
  </div>
</template>
```

这样就得到一个简单的 Counter:

<SimpleCounter/>
---

react 版本的 useCounter:

```ts
import { useState } from 'react'

function useCounter(initCount = 1) {
  const [count, setCount] = useState(initCount)
  function add(step = 1) {
    setCount(count + step)
  }
  function reduce(step = 1) {
    setCount(count - step)
  }
  return { count, add, reduce }
}

export default useCounter
```
---


### 输入响应式状态，再返回响应式状态

vue 是副作用驱动的，很多场景下，某些状态变化时（可理解为副作用的依赖），需要执行副作用，比如发送网络请求，此时可提取 hook, 把依赖作为 hook 的参数。

一个例子：

<UseHttp/>

组件的基本功能：拉取后台数据，且用户输入时，再调用接口拉取数据，非常普遍的功能。

用户输入`input`是作为 httpGet 执行依赖的，当 input 变化时，执行 httpGet。

---

```html
<template>
  <input type="text" v-model="input" style="background-color:azure;" placeholder="请求输入关键字" />
  <ul>
    <li v-for="(item, index) in list" :key="index">{{ item.name }}</li>
  </ul>
</template>

<script setup>
import { http } from './utils'
import { ref, watch } from 'vue'
const input = ref('')
const list = ref([])

httpGet()
watch(input, value => {
  httpGet(value)
})

function httpGet(key='') {
  http(key).then(res => {
    list.value = res
  })
}
</script>
```

如何使用 hook 写出相同的功能？

---

关键点：如何处理 httpGet 的依赖？将用户输入作为参数。

`hooks.ts`

```ts
import type { Ref } from 'vue'

export function useHttpGet(key: Ref<string>) {
  const list = ref([])
  watch(
    key,
    newKey => {
      http(newKey)
    },
    { immediate: true }
  )

  return { list }
}

function httpGet(key ='') {
  http(key).then(res => {
    list.value = res
  })
}
```
---

使用方式：

```html
<script setup>
  import { useHttpGet } from './hooks'

  const input = ref('')
  const { list } = useHttpGet(input)
</script>
```

使用 hook 之后，代码简洁多了。

<!-- > 技巧：使用`toRef`可从**响应式对象**中属性转成 ref ，ref 和该对象之间会保持值的同步。然后将其作为参数传递给 hook。

[详细说明](https://vuejs.org/api/reactivity-utilities.html#toref) -->

react 版本的 useHttpGet：

```js
import { useEffect, useState } from 'react'

function useHttpGet(key = '') {
  const [list, setList] = useState([])
  useEffect(() => {
    http(key).then(res => {
      setList(res)
    })
  }, [key])

  return { list }
}

export default useHttpGet
```
<!-- 
使用：

```js
import { useState } from 'react'

import { useHttpGet } from '../../hooks'

function UseHttpGetDemo() {
  const [input, setInput] = useState('')
  const { list } = useHttpGet(input)
  return (
    <div>
      <input type='text' value={input} onInput={event => setInput(event.target.value)} />
      <ul>
        {list.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <p>{input}</p>
    </div>
  )
}

export default UseHttpGetDemo
``` -->
---

### 修改 hook 返回的响应式状态

hook 返回的响应式状态，可在组件里修改，然后触发 hook 内部的 watch、computed 执行。

```ts
import type { MaybeRef } from '@vueuse/core'

export function useTitle(newTitle?: MaybeRef<string>) {
  const title = ref(newTitle)
  watchEffect(() => {
    const _title = title.value || document.title
    document.title = _title
  })
  return title
}
```

使用：

```js
const title = useTitle()
title.value = '修改hook的返回值' // 会触发 useTitle 内的监听器执行
```
<v-click>

> 在外部直接修改 hook 返回的状态，可能你不清楚内置执行了什么副作用，不太建议这样做。

</v-click>

---

react 版本的 useTitle

```ts
import { useEffect, useState } from 'react'

function useTitle(initTitle = '') {
  const [title, setTitle] = useState<string>(initTitle ?? document.title)
  useEffect(() => {
    document.title = title
  }, [title])

  return { title, setTitle }
}

export default useTitle
```

> react 不能在外部修改 title，所以返回 setTitle

---


再看一个例子：

`MyInput.vue`

```html
<script setup>
  defineProps({
    modelValue: {
      type: String,
    },
  })
  const emits = defineEmits(['update:modelValue'])
  function update(event) {
    emits('update:modelValue', event.target.value)
  }
</script>

<template>
  <input type="text" :value="modelValue" @input="update" />
</template>
```

---


创建一个返回计算属性的 hook，代替`value`和`input`事件。

```ts
export function useVModel(props, name) {
  const emit = getCurrentInstance().emit

  return computed({
    get() {
      return props[name]
    },
    set(v) {
      emit(`update:${name}`, v)
    },
  })
}
```

---


使用`useVModel`改造 MyInput：

```html
<script setup>
  import { useVModel } from './hooks'

  const props = defineProps({
    modelValue: {
      type: String,
    },
  })
  const value = useVModel(props, 'modelValue')
</script>

<template>
  <!-- NOTE 通过 v-model 修改 useVModel 的返回值 -->
  <input type="text" v-model="value" />
</template>
```

<MyInputDemo />

---

react 版本的 hook:

```js
import { useState } from 'react'

function useInput(initialValue = '') {
  const [value, setState] = useState(initialValue)
  function onChange(event) {
    setState(event.target?.value)
  }
  return [value, onChange]
}

export default useInput
```

---

### 参数可能是 Ref

希望参数**可能是** Ref，在编写参数类型不确定的 hook 时很有用。

再对上面的例子改造：

```ts
import type { Ref } from 'vue'

type MaybeRef<T> = Ref<T> | T

export function useHttpGet(key: MaybeRef<string>) {
  const keyRef = ref(key)
  const list = ref([])
  watch(
    keyRef,
    newKey => {
      http(newKey).then(res => {
        // @ts-ignore
        list.value = res
      })
    },
    { immediate: true }
  )

  return { list }
}
```

`ref`函数的参数是 ref，返回 ref，是普通变量，就将其包裹成 ref。

---

> 技巧

可让参数和现有的 ref 建立连接，修改现有 ref，触发 hook 内部的逻辑执行。

还是上面 useTitle，可这样使用：

```js
const hello = ref('hello')
const title = computed(() => {
  return hello.value + Math.random() * 10
})
useTitle(title)
setTimeout(() => {
  hello.value = 'Hello'
}, 2000)
```
---

### 返回组件

希望实现一个跟随鼠标移动的组件：

使用 hook 返回一个组件：

```ts
type LazyOrRef<T> = Ref<T> | (() => T)
export function useMouseFollower(position: LazyOrRef<{ x: number; y: number }>) {
  const style = computed(() => {
    const { x, y } = unravel(position)
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      // NOTE添加一定的偏移，否则鼠标被遮挡，无法聚焦其他元素
      transform: `translate3d(${x + 15}px, ${y + 15}px, 0)`,
    }
  })

  const Follower = defineComponent(
    (props, { slots }) =>
      () => h('div', { ...props, style: style.value }, slots)
  )
  return Follower
}
```

---


使用：

```html
<template>
    <Follower>
      <div class="follower-content">I follow your mouse</div>
    </Follower>
    <pre>x: {{ x }}, y: {{ y }}</pre>
</template>

<script lang="ts" setup>
  import { useMouse, useMouseFollower } from '../../hooks'

  const { x, y } = useMouse()
  const Follower = useMouseFollower(() => ({ x: x.value, y: y.value }))
</script>

<style scoped lang="css">
  .follower-content {
    background-color: antiquewhite;
    padding: 10px 12px;
    border: 1px solid lightblue;
    border-radius: 6px;
    font-size: 14px;
    color: black;
  }
</style>
```
---

react 版本的 useMouseFollower.tsx

```ts
import type { CSSProperties, PropsWithChildren } from 'react'

type Props = {}

function useMouseFollower(position: Record<'x' | 'y', number>) {
  const style: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    transform: `translate3d(${position.x + 15}px, ${position.y + 15}px, 0)`,
  }
  const Follower = (props: PropsWithChildren<Props>) => {
    return <div style={style}>{props.children}</div>
  }
  return Follower
}

export default useMouseFollower
```

---

### 封装第三方库

了解了上面 hook 编写技巧，在封装第三方库的使用，充分使用才能发挥威力。

编写一个按钮，鼠标移入，在右边显示提示信息，使用`popperjs`实现。

常规实现方式：

---

```html
<template>
  <div>
    <h1>hook 与第三方库</h1>
    <button
      ref="btn"
      @mouseover="onMouseover"
      @mouseout="onMouseout"
      style="background-color: lightgreen; height: 40px; width: 100px"
    >
      按钮
    </button>
    <div
      v-show="isOver"
      ref="tooltip"
      style="background-color: lightyellow; height: 20px; width: 150px"
    >
      tool tip
    </div>
  </div>
</template>

<script setup>
  import { createPopper } from '@popperjs/core'

  const isOver = ref(false)
  function onMouseover() {
    isOver.value = true
  }
  function onMouseout() {
    isOver.value = false
  }
  const btn = ref()
  const tooltip = ref()
  // BUG 位置不对
  onMounted(() => {
    createPopper(btn.value, tooltip.value, {
      placement: 'right',
    })
  })
</script>
```

`createPopper` 接受两个 dom 和一个配置对象作为参数。

将上面的功能转为 hook：

```js
import { createPopper } from '@popperjs/core'

export function usePopper(placement) {
  const target = ref(null)
  const tooltipDom = ref(null)

  onBeforeUpdate(() => {
    target.value = null
    tooltipDom.value = null
  })

  watchEffect(
    () => {
      createPopper(target.value, tooltipDom.value, {
        placement: placement,
      })
    },
    {
      flush: 'post', // 组件更新后执行回调
    }
  )

  return {
    reference(el) {
      target.value = el
    },
    tooltip(el) {
      tooltipDom.value = el
    },
  }
}
```

使用：

```html
<template>
  <div>
    <button
      :ref="reference"
      @click="onClick"
      style="background-color: lightgreen; height: 40px; width: 100px"
    >
      use hook
    </button>
    <div
      v-show="isOpen"
      :ref="tooltip"
      style="background-color: lightyellow; height: 20px; width: 150px"
    >
      tool tip
    </div>
  </div>
</template>

<script setup>
  import { usePopper } from './usePopper'

  const isOpen = ref(false)
  function onClick() {
    isOpen.value = !isOpen.value
  }
  const { reference, tooltip } = usePopper('right')
</script>
```

知识点：

1. ref 获取模板，支持字符串，也支持函数，函数会在每次组件更新时调用，所以在组件更新之前，将引用设置 null。

> 在循环中使用函数更好，也可以使用字符串。

2. 利用 1 的特点，从 hook 里返回函数，绑定到 dom 上，把创建 tooltip 的过程封装在 hook 中，可在不同的组件使用。

在加强功能，支持位置动态修改如何办？

把 placement 参数设置响应式状态。

常规实现：

```js
const placement = ref('right')

watchEffect(
  () => {
    createPopper(btn.value, tooltip.value, {
      placement: placement.value,
    })
  },
  {
    flush: 'post',
  }
)
```

> 修改 placement，就会重新创建 tooltip。

hook 实现：

将位置设置为响应数据，作为 hook 的参数。

```js
export function usePopper(placement) {
  const target = ref(null)
  const tooltipDom = ref(null)

  onBeforeUpdate(() => {
    target.value = null
    tooltipDom.value = null
  })

  watchEffect(
    () => {
      createPopper(target.value, tooltipDom.value, {
        placement: unref(placement), // ref 作为参数传入
      })
    },
    {
      flush: 'post',
    }
  )

  return {
    reference(el) {
      target.value = el
    },
    tooltip(el) {
      tooltipDom.value = el
    },
  }
}
```

这样是使用：

```js
const placement = ref('right')
const { reference, tooltip } = usePopper(placement) // 传入ref
```

对比两种方案，hook 的方式更加强大而自由，代码简洁易懂。

react 版本的 usePopper

```ts
import type { Placement } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import { useEffect, useRef } from 'react'

function usePopper(placement: Placement = 'right') {
  let refDom = useRef<HTMLElement>(null)
  let tooltipDom = useRef<HTMLElement>(null)
  useEffect(() => {
    const existDom = refDom.current && tooltipDom.current
    if (existDom) {
      createPopper(refDom.current, tooltipDom.current, {
        placement,
      })
    }
  }, [placement, refDom, tooltipDom])
  return {
    reference(el: HTMLElement) {
      refDom.current = el
    },
    tooltip(el: HTMLElement) {
      tooltipDom.current = el
    },
  }
}

export default usePopper
```

使用：

```tsx
import type { Placement } from '@popperjs/core'
import { useState } from 'react'

import { usePopper } from '../hooks'

function PopperDemo() {
  const [placement, setPlacement] = useState<Placement>('auto')
  const { reference, tooltip } = usePopper(placement)
  const [showToolTip, setShowTooltip] = useState(false)
  return (
    <div style={{ margin: `100px` }}>
      <button
        ref={reference}
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        style={{ backgroundColor: 'lightgreen', height: '40px', width: '200px' }}
      >
        use hook
      </button>
      <div
        ref={tooltip}
        style={{
          backgroundColor: 'lightyellow',
          height: '20px',
          width: '100px',
          display: showToolTip ? 'block' : 'none',
        }}
      >
        tool tip
      </div>
      <br />
      <button onClick={() => setPlacement('top')}>修改tooltip位置</button>
    </div>
  )
}

export default PopperDemo
```

### 状态在 hook 函数之外，实现状态共享

有一个操作购物车的`useCart`:

```ts
export type Cart = {
  id: number
  name: string
  number: number
}

const items = ref<Cart[]>([]) // 状态提取到 hook 之外

export default function useCart() {
  function addCart(item) {
    const exist = items.value.find(el => el.id === item.id)
    if (exist) exist.number += 1
    else items.value.push({ id: item.id, name: item.name, number: 1 })
  }
  function removeCart(id: number) {
    const index = items.value.findIndex(el => el.id === id)
    if (index !== -1) {
      const number = items.value[index].number
      number === 1 && items.value.splice(index, 1)
      number >= 2 && (items.value[index].number -= 1)
    }
  }
  return { items, addCart, removeCart }
}
```

> 共享的关键：把状态提取到 hook 之外，hook 返回状态。

使用:

`HookDemo.vue`

```html
<template>
  <div>
    <h3>使用hook共享状态</h3>
    <h4>书本列表</h4>
    <ul>
      <li v-for="(item, index) in books" :key="index">
        <button @click="() => removeCart(item.id)">-</button>
        {{ item.name }} -- ￥{{ item.price }}
        <button @click="() => addCart(item)">+</button>
      </li>
    </ul>
    <h4>购物车</h4>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} -- {{ item.number }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import useCart from './useCart'

  const books = ref([
    { id: 1, name: 'vue', price: 12 },
    { id: 2, name: 'react', price: 20 },
    { id: 3, name: 'angular', price: 21 },
  ])
  const { items, addCart, removeCart } = useCart()
</script>
```

`HookTest.vue`:

```html
<template>
  <div>
    <h4>购物车</h4>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <button @click="() => removeCart(item.id)">-</button> {{ item.name }} -- {{
        item.number }}
        <button @click="() => addCart(item)">+</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import useCart from './useCart'

  export default {
    setup() {
      const { items, removeCart, addCart } = useCart()
      return { items, removeCart, addCart }
    },
  }
</script>
```

> 这样存在哪些问题？

1. 状态可被意外修改 `items.value = []`

解决：使用 **readonly** `{ items:readonly(items), removeCart, addCart }`

2. 不方便调试

由于 react useState 不能单独使用，必须在函数组件或者自定义 hook 中，无法编写相同功能 hook。

### 条件语句下的组合函数

一个容易被忽视方面，就是组合函数可在条件语句下调用，这和 react hook 完全不同，这让 vue 组合函数非常灵活。

```js
import { computed, inject, ref, watch } from 'vue'

if (condition) {
  const name = ref('JACK')
}

if (condition) {
  watch(name, newName => {
    console.log(newName)
  })
}

if (condition) {
  const fullName = computed(name => name.value + 'Chou')
}

if (condition) {
  const injections = inject('key')
}
```

composition api 能在条件语句中使用，组合函数一样能在条件语句中使用。

想象一下，有一通讯录组件，有时需要搜索功能，有时不需要。

带搜索功能的`ContactList.vue`

```html
<script setup lang="ts">
  import { Item, useSearchContactList } from './useSearchContact'

  const items = ref<Item[]>([
    {
      id: '1',
      name: 'Jack',
      phone: '1234567',
    },
    {
      id: '2',
      name: 'Tom',
      phone: '12345613138',
    },
    {
      id: '3',
      name: '小明',
      phone: '18530245493',
    },
  ])
  const filterKey = ref('')
  const searchableProps = ['name', 'phone']
  const result = useSearchContactList({ items, filterKey, searchableProps })
</script>

<template>
  <div class="vue-component">
    <input v-model="filterKey" />
    <ul>
      <li v-for="(item, index) in result" :key="index">
        <p>{{ item.name }}</p>
        <p>{{ item.phone }}</p>
      </li>
    </ul>
  </div>
</template>
```

`useSearchContact`

```ts
import { MaybeRef } from '@vueuse/shared'

export type Item = Record<'id' | 'name' | 'phone', string>
type Params = {
  items: MaybeRef<Item[]>
  filterKey: MaybeRef<string>
  searchableProps: MaybeRef<string[]>
}

export function useSearchContactList({ items, filterKey, searchableProps }: Params) {
  const key = ref(filterKey)
  const innerItems = ref(items)
  const innerSearchProps = ref(searchableProps)
  const list = computed(() => {
    if (!key.value) return innerItems.value
    const regex = new RegExp(key.value, 'i')
    return innerItems.value.filter(item => {
      return innerSearchProps.value.some(prop => regex.test(String(item[prop])))
    })
  })
  return list
}
```

希望组件支持是否开启搜索，把是否开启搜索的条件提取到 props 中：

```html
<script setup lang="ts">
  import { Item, useSearchContactList } from './useSearchContact'

  type Props = {
    searchable: boolean
  }
  const props = withDefaults(defineProps<Props>(), { searchable: false })

  const items = [
    {
      id: '1',
      name: 'Jack',
      phone: '1234567',
    },
    {
      id: '2',
      name: 'Tom',
      phone: '12345613138',
    },
    {
      id: '3',
      name: '小明',
      phone: '18530245493',
    },
  ]

  const result = ref<Item[]>(items)
  const filterKey = ref('')

  if (props.searchable) {
    const searchableProps = ['name', 'phone']
    result.value = useSearchContactList({ items, filterKey, searchableProps })
  }
</script>

<template>
  <div class="vue-component">
    <input v-model="filterKey" v-if="searchable" />
    <ul>
      <li v-for="(item, index) in result" :key="index">
        <p>{{ item.name }}</p>
        <p>{{ item.phone }}</p>
      </li>
    </ul>
  </div>
</template>
```

> 注意 result 和 filterKey，不在条件语句中声明，否则模板访问不到。

使用：

```html
<template>
  <ContactList />
  <ContactList searchable />
</template>
```

### 其他技巧

除了上面总结的技巧外，hook 作为函数，还可接收函数作为参数，作为事件处理器、副作用等。

比如，封装一个绑定事件的 `useOn`

```ts
type Handler = (event: Event) => void

export function useOn(eventName: string, handler: Handler, target: HTMLElement | Window) {
  onMounted(() => {
    target.addEventListener(eventName, handler)
  })
  onUnmounted(() => {
    target.removeEventListener(eventName, handler)
  })
}
```

封装一个检查网络状态改变的`useNetworkStatus`

```js
export function useNetworkStatus(callback = (isOnline = false) => {}) {
  const isOnline = ref(navigator.onLine)
  function updateOnlineStatus() {
    if (typeof window !== 'undefined') {
      isOnline.value = navigator.onLine
    }
    callback(isOnline.value)
  }
  onMounted(() => {
    console.log('updateOnlineStatus')
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  })
  return isOnline
}
```

## vue composition api 和 react hook 用法的异同

react hook 有严格的**调用时序**，不能在条件语句、循环中调用，即 react hook 不能时有时无，vue composition api 没有这种限制，心智负担小。

react hook 不能单独调用，即必须在自定义 hook 和函数组件中调用，这导致无法在不同的组件之间共享状态，**只能共享逻辑**。使用`useContext`可实现。

vue composition api 可独立单独调用，能轻易实现组件之间共享状态。

> 相比之下，vue composition api 更加灵活强大，心智负担小。

## 普通工具函数 VS 组合式函数？

有必要把工具函数提取成组合函数吗？工具函数和组合式函数的边界在哪儿？如何区分两者？

没必要把普通工具函数提取成组合函数，提取成组合函数，会增加使用者的心智负担，比如在 js 文件中使用，变量需要`.value`，没必要把工具函数里变量变成响应式的变量，保持为普通变量，可让工具函数的适用范围更加广泛。

组合函数主要用在 vue 组件内，非组件代码中，也可以使用，但这是不好的实践。

如何区分两者？使用了 ref、onMounted 和 provide 等组合式 api 的函数，叫组合函数，否则就提取成工具函数。

## 参考

[vue 组合函数 vs React hook](https://cn.vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks)

[是否可使用 react hook 共享状态](https://stackoverflow.com/questions/53451584/is-it-possible-to-share-states-between-components-using-the-usestate-hook-in-r)

[如何在组合函数中使用 ref](https://logaretm.com/blog/juggling-refs-around/)

[可组合的 vue](https://talks.antfu.me/2021/vueconf-china/1)

[Conditional Vue.js Compositions](https://logaretm.com/blog/conditional-vuejs-compositions)

[State Management with React Hooks — No Redux or Context API](https://javascript.plainenglish.io/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8)

[React's State-Management Holy Wars Series' Articles](https://dev.to/bytebodger/series/5062)

[使用 Vue3 封装一些有用的组合 API](https://juejin.cn/post/6888925879243079687)
