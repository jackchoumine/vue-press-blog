---
# try also 'default' to start simple
theme: seriph
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
# page transition
transition: fade-out
# use UnoCSS
css: unocss
---

# 关于我

- 周其军

- 毕节市 织金县

- 2017年本科毕业  

- 前端开发

- [博客](https://jackchoumine.github.io/)

---
layout: center
---

# vue3 与 hook (二)

1. 把第三库方函数封装成 hook

2. hook 共享状态

3. 条件语句与 hook

4. vue hook vs react hook

5. hook vs 工具函数

6. 自定义 ref

7. hook 与 headless component

---
transition: slide-left
---

# 把第三方库函数封装成hook

前端常常会用到一下操作 DOM 的第三库
<!--  -->

<PopperButton />

---
layout: two-cols
---

# 模板

```html
<button
  ref="btn"
  @mouseover="onMouseover"
  @mouseout="onMouseout"
  style="background-color: lightgreen; height: 40px; width: 100px"
>
  按钮
</button>
<div v-show="isOver" ref="tooltip" style="background-color: red; height: 20px; width: 150px">
  tool tip
</div>
<button type="button" @click="placement = 'top'">修改位置</button>
```

```ts
createPopper(reference:Element, popper:Element, {
   placement: 'top'|'left'|'right'|'bottom',
})
```

[popper文档](https://popper.js.org/)

如何把右边的功能封装成 hook？


::right::
# ts

```ts
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
const placement = ref('right')

watchEffect(
  () => {
    createPopper(btn.value, tooltip.value, {
      placement: placement.value,
    })
  },
  { flush: "post"},
)
```

---
layout: two-cols
---
# usePopper

```ts
export function usePopper(placement:Ref<string>) {
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
    { flush: 'post' }
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

::right::

# 用法

```html
<template>
  <button :ref="reference" @click="onClick">
   use hook
  </button>
  <div v-show="isOpen" :ref="tooltip">
   tool tip
  </div>
  <button @click="placement = 'top'">
    修改tooltip位置
  </button>
</template>

<script lang="ts" setup>
import { usePopper } from './usePopper'
const isOpen = ref(false)
function onClick() {
  isOpen.value = !isOpen.value
}
const placement = ref('right')
const { reference, tooltip } = usePopper(placement)
</script>
```

---
transition: slide-up
---
# 使用hook 实现效果

<PopperButtonHook />

<v-click>

> hook 可返回一个函数形式的 ref，在组件中绑定到 ref 属性上。这种用法尤其是在涉及到 DOM 操时很有用。



</v-click>

---
layout: two-cols
---

# useOnClickOutside

```js
export function useOnClickOutside(callback) {
  const isClickOutside = ref(false)

  const DOMRef = ref(null)
  function handleClick(event) {
    if (DOMRef.value && !DOMRef.value.contains(event.target)) {
      callback&&callback(event.target)
      isClickOutside.value = true
      return
    }
    isClickOutside.value = false
  }
  useOn('mousedown', handleClick, document)

  function whenClickOutside(DOM) {
    DOMRef.value = DOM
  }

  return { isClickOutside, whenClickOutside }
}
```

::right::
# 用法

```html
<template>
  <p :ref="whenClickOutside">
    点到 p 的外部了吗？{{ isClickOutside ? '是' : '否' }}
  </p>
</template>

<script setup>
import { useOnClickOutside } from './hooks'
const { isClickOutside, whenClickOutside } = useOnClickOutside()
</script>
```

<OnClickOutSide />

---
layout: center
---
# hook 共享状态

组合式 API 不仅可复用状态逻辑，共享状态也非常容易。

<v-click>

实现 useCart， 在不同组件之间共享购物车

</v-click>

---
layout: two-cols
---

# useCart

```ts
const items = ref<Cart[]>([])
const totalBooks = computed(() =>
  items.value.reduce((preToal, current) => {
    preToal += current.number
    return preToal
  }, 0)
)
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
  return { items: items, totalBooks, addCart, removeCart }
}
```

::right::
# 2 个关键

<v-click>

> 把共享的状态提升到**组合函数外部**, 相当于全局变量了。
</v-click>

<v-click>

> 如何防止在外部意外重置？
```js
items.value = []
```
</v-click>


<v-click>

```js
import { readonly } from 'vue'
// ....

// 防止在外部意外更改状态
// NOTE 导出的 items 是内部的 items 的只读副本
return { items: readonly(items), totalBooks: readonly(totalBooks) }
```
</v-click>

<v-click>

### 使用 react 的 hook 难以实现状态共享
</v-click>

---
layout: center
class: text-cent
---

# 条件语句与 hook

vue3 的组合函数，可像普通函数一样，在条件语句下使用

---
layout: two-cols
---

# 没有搜索框

<ContactList />

::right::

# 有搜索框

<ContactList searchable />

---

# ContactList.vue

```ts
import { Item, useSearchContactList } from './useSearchContact'

type Props = {
  searchable?: boolean
}
const { searchable = false } = defineProps<Props>()

const items:Item[] = [{id: '1', name: 'Jack',phone: '1234567'}]

let result = ref<Item[]>(items)
const filterKey = ref('')

if (searchable) {
  const searchableProps = ['name', 'phone']
  // NOTE useSearchContactList 返回计算属性 不用 result.value 重置
  result = useSearchContactList({ items, filterKey, searchableProps })
}
```

<v-click>

> react 的 hook 有严格的调用时序，不能在条件语句中使用

> vue 组合函数则没有这个限制，就和普通函数一样使用，可见它更加符合编码直觉
</v-click>

---
layout: center
class: text-center
---
# vue hook vs react hook

vue 和 react 都采用相似的方式实现**状态逻辑复用**，那它们在使用上有什么区别？

---

# 使用方式的不同

react hook 有严格的**调用时序**，不能在条件语句、循环中调用，即 react hook 不能时有时无，vue composition api（hook） 没有这种限制，心智负担小。

react hook 不能单独调用，即必须在自定义 hook 和函数组件中调用，这导致在不同的组件之间**共享状态**没有vue 方便，**只能共享逻辑**。

vue composition api 可独立单独调用，能轻易实现组件之间共享状态。

## 相比之下，vue composition api 更加**灵活强大**，**心智负担小**。
---
layout: center
class: text-center
---
# 组合函函数 vs 工具函数

有必要把工具函数提取成组合函数吗？工具函数和组合式函数的边界在哪儿？如何区分两者？

---
layout: center
---
# 普通工具函数 VS 组合函数

没必要把普通工具函数提取成组合函数，提取成组合函数，会增加使用者的心智负担。

比如在 js 文件中使用，变量需要使用`.value`，没必要把工具函数里变量变成响应式的变量，保持为普通变量，可让工具函数的适用范围更加广泛。

组合函数主要用在 vue 组件内，非组件代码中，也可以使用，但这**是不好的实践**。

如何区分两者？使用了 ref、onMounted 等组合式 api 的函数，叫组合函数，否则就提取成工具函数。

---
layout: center
class: text-center
---

# 自定义 ref

vue 提供了自定义 ref 的功能，尤其是在一些需要做**防抖**、**节流**的场景下非常有用。

<v-click>

<ContactList searchable/>
</v-click>

---
transition: slide-left
---
# 使用自定义的 ref 实现防抖

`useDebounceRef`

```js
import { customRef } from 'vue'

export function useDebounceRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
```

---
layout: two-cols
transition: slide-left
---

# lodash debounce

```html
<script setup>
import { debounce } from 'lodash-es'
const input = ref('')
const debounceHttp = debounce(args => http(args), 3000)
watch(
  input,
  value => { 
      console.log('lodash triger', value); 
      debounceHttp(value)
  },
  {
    onTrack() { console.log('lodash track')},
    onTrigger() {console.log('lodash trigger')},
  },
)
function http(params) { console.log(params)}
</script>
<template>
  <MyInput v-model="input" />
</template>
```
<MyInputDemo />

::right::

# useDebounceRef

```html
<script setup>
import { useDebounceRef } from './useDebounceRef'

const input = useDebounceRef('', 3000)
watch(
  input,
  value => {
    console.log('useDebounceRef triger', value)
    http(value)
  },
  {
    onTrack() {console.log('useDebounceRef track')},
    onTrigger() {console.log('useDebounceRef trigger')},
  },
)
function http(params) {console.log(params)}
</script>
<template>
  <MyInput v-model="input" />
</template>
```
<MyInputDemo2 />


---
layout: center
class: text-center
---
# hook 和 headless component

> headless component：hook 状态逻辑，不提供或者少提供样式的组件，最大程度让用户自定义样式和布局。headless component 有时也叫 renderless component。

<v-click>

<SimpleCounter />

<hr/>

<SimpleCounter2/>

</v-click>

---
layout: two-cols
---

# SimpleCounter

```html
<script setup lang="ts">
import { useCounter } from './hooks'
const { count, add, reduce } = useCounter(10)
</script>
<template>
  <div class="counter">
    <button @click="() => reduce()">-</button>
    {{ count }}
    <button @click="() => add()">+</button>
  </div>
</template>
<style lang="scss" scoped>
.counter {
  button {
    background-color: aliceblue;
    width: 25px;
    border-radius: 5px;
    border: none;
    &:hover {
      border: 1px solid rgb(100, 108, 255);
    }
  }
}
</style>
```

::right::

# SimpleCounter2

```html
<script setup lang="ts">
import { useCounter } from './hooks'
const { count, add, reduce } = useCounter(10)
</script>
<template>
  <div class="counter">
    {{ count }}
    <button @click="() => reduce()">-</button>
    <button @click="() => add()">+</button>
  </div>
</template>
<style lang="scss" scoped>
.counter {
  button {
    background-color: lightpink;
    width: 25px;
    border-radius: 50%;
    border: none;
    &:hover {
      border: 1px solid lightgreen;
    }
  }
}
</style>
```
---
layout: two-cols
---
# renderless component

```html
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: ['initCount'],
  setup(props, { slots }) {
    const count = ref(props.initCount)
    function add(step = 1) {
      count.value += step
    }
    function reduce(step = 1) {
      count.value -= step
    }
    return () => slots?.default?.({ 
      count,
      add,
      reduce 
    })
  },
})
</script>
```

::right::

# 使用

```html
<template>
  <CounterContainer :init-count="10">
    <template #default="{ count, add, reduce }">
      <div class="counter">
        {{ count }}
        <button @click="() => reduce()">-</button>
        <button @click="() => add()">+</button>
      </div>
    </template>
  </CounterContainer>
</template>
<style lang="scss" scoped>
.counter {
  button {
    background-color: lightpink;
    width: 25px;
    border-radius: 50%;
    border: none;
    &:hover {
      border: 1px solid lightgreen;
    }
  }
}
</style>
```


---
layout: center
class: text-center
---

# 参考 

[是否可使用 react hook 共享状态](https://stackoverflow.com/questions/53451584/is-it-possible-to-share-states-between-components-using-the-usestate-hook-in-r)

[如何在组合函数中使用 ref](https://logaretm.com/blog/juggling-refs-around/)

[可组合的 vue](https://talks.antfu.me/2021/vueconf-china/1)

[Conditional Vue.js Compositions](https://logaretm.com/blog/conditional-vuejs-compositions)

[State Management with React Hooks — No Redux or Context API](https://javascript.plainenglish.io/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8)

[React's State-Management Holy Wars Series' Articles](https://dev.to/bytebodger/series/5062)

[使用 Vue3 封装一些有用的组合 API](https://juejin.cn/post/6888925879243079687)

---
layout: center
class: text-center
---

# Q & A