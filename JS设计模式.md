# 设计模式

设计模式：软件开发领域**常见问题**的**可重用**的解决方案，即解决问题的模板。

1. 快速帮我们找到解决方案，且获得可复用的代码；
2. 提取解决方案的词汇，方便沟通。

# 接口

## 什么是接口

接口约定了对象应该具有方法，规定了这些方法应该具有的语义，并不规定具体实现。

按照接口对对象进行分组，只要实现了同一个接口，对象可以等同对待。

接口好处：
接口具有自我描述性，能提高代码复用。

接口能稳定不同类之间的通信方式，有利于团队协作。

基于以上好处，测试和调试也变得容易。

接口让代码更加稳固，因为改变接口，会在实现它的类中体现出来。

接口的坏处：

- 降低了语言灵活性。
- 接口无法提供强约束--其他程序员可不遵守你定义的接口。

## 封装和信息隐藏

信息隐藏原则可减轻系统中两个参与者之间的依赖性,两个参与者之间必须通过明确的**通道**传递信息.

封装和信息隐藏的关系:同一个概念的两种表述,信息隐藏是目的,封装是手段.

封装(encapsulation):对对象的内部数据表现形式和实现细节进行隐藏. 外部想要访问数据,必须通过已定义的方法.

创建一个用来存储一本书(book)的数据的类,实现一个以 html 形式展示这些数据的方法.

### 门户大开型对象

```js
const Book = function (isbn, title = 'No title specified', author = 'No author specified') {
  if (!isbn) throw new Error('Book constructor requires an isbn') // 缺点:无法检查 ISBN 的完整性
  this.isbn = isbn
  this.title = title
  this.author = author
}
Book.prototype.display = function () {}
```

```js
const Book = function (isbn, title = 'No title specified', author = 'No author specified') {
  if (!this.checkIsbn()) throw new Error('Book:Invalid isbn') // 缺点:无法检查 ISBN 的完整性
  this.isbn = isbn
  this.title = title
  this.author = author
}
Book.prototype = {
  checkIsbn(isbn) {
    if (!isbn || typeof isbn === 'string') return false
    const _isbn = isbn.replace(/-/, '')
    if (_isbn.length !== 10 && is.length !== 13) return false
    const sum = 0
    if (isbn.length === 10) {
      if (!isbn.match(/^\d{9}/)) return false
      for (let index = 0; index < 9; index++) {
        sum += isbn.charAt(i) * (10 - index)
      }
      let checkSum = sum % 11
      if (checkSum === 10) checkSum = 'X'
      if (isbn.charAt(9) !== checkSum) return false
    } else {
      if (!isbn.match(/^\d{12}/)) {
        return false
      }
      for (const i = 0; i < 12; i++) {
        sum += isbn.charAt(i) * (1 % 2 === 0 ? 1 : 3)
      }
      let checkSum = sum % 10
      if (isbn.charAt(12) !== checkSum) return false
    }
    return true
  },
  display() {},
  // 保护数据
  getIsbn() {
    return this.isbn
  },
  setIsbn(value) {
    if (!this.checkIsbn(value)) throw new Error('Book: Invalid ISBN')
    this.isbn = isbn
  },
}
```

以上实现无法保护内部数据,且取值器和赋值器增加了代码量.

3. 使用命名规范区别私有成员

```js
const Book = function (isbn, title, author) {
  this.setIsbn(isbn)
  this.setTitle(title)
  this.setAuthor(author)
}
Book.prototype = {
  _checkIsbn(isbn) {},
  getIsbn() {
    return this._isbn
  },
  setIsbn(isbn) {
    if (!this.checkIsbn(isbn)) throw new Error('Book: Invalid isbn')
    this._isbn = isbn
  },
}
```

下划线是一个命名规范,不能强制,所以还是无法达到封装的效果.

3. 使用作用域 嵌套函数和闭包

```js
const Book = function (newIsbn, newTitle, newAuthor) {
  let isbn, title, author // 私有变量
  function checkIsbn(isbn) {} // 私有方法
  //特权方法
  this.getIsbn(){
    return isbn
  }
  this.setIsbn(newIsbn){
    if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN')
    isbn = newIsbn
  }
  // constructor code
  this.setIsbn(newIsbn)
}
Book.prototype = {
  // 非特权方法
 display(){}
}
```

缺点: ① 每个对象实例都有一份私有方法和特权,消耗内存. ② 不利于派生子类.

适用场景:真正使用私有变量的场景采用.

## 单例模式

单例是只能被实例化一次的类，且实例可全局获取。
单例可在整个应用中共享，因此单例很适合管理应用全局状态。

优点：节省内存。

单例的行为，随着应用复杂，单例的行为可能变得复杂，数据的修改变得模糊。
通常使用状态管理库代替单例管理全局状态。

```js
let instance
let counter = 0

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter())
```

单例需要使用的是一个类的实例，而 JS 中使用对象可模拟一个实例。

```js
let count = 0

const singletonCounter = {
  increment() {
    return ++count
  },
  decrement() {
    return --count
  },
  getCount() {
    return count
  },
}

Object.freeze(singletonCounter) //NOTE 冻结，使得对象的属性不可更改。
export { singletonCounter }
```

> 对单例更广泛的理解：全局唯一的变量，都可视为单例。

## 提供者模式

有时候，需要在多个组件之间共享数据，可使用提供者模式实现跨级组件共享数据。

```bash
      A
     /\
   B1  B2
   /   /\
 C1   D1 D2
 /
E1
```

A、D2、E2 需要共享数据，通常的做法是通过`prop`沿着组件树层层传递数据，但是会导致`prop drilling`（prop 钻进），重构组件非常困难 --- 修改一层，就要修改多层。

vue、react 都提供了使用这种设计模式共享数据的快捷语法。

vue 提供 `provider`、`inject`, react 是 `useContext`。

使用 provider 和 inject 实现修改主题功能。

`ThemeProvider.jsx` 提供数据和修改数据的行为

```jsx
import { useSlots, provide, readonly, h, shallowRef } from 'vue'
export default {
  name: 'ThemeProvider',
  setup() {
    const slots = useSlots()
    const themes = {
      light: {
        background: '#fff',
        color: '#000',
      },
      dark: {
        background: '#171717',
        color: '#fff',
      },
    }
    const mode = shallowRef('light')
    function toggleTheme() {
      mode.value = mode.value === 'light' ? 'dark' : 'light'
      console.log('当前主题', mode.value)
    }
    provide('toggleTheme', toggleTheme)
    provide('mode', mode)
    provide('themes', readonly(themes))
    return () => <div class={`app theme-${mode.value}`}>{slots.default ? slots.default() : ''}</div>
  },
}

// https://markus.oberlehner.net/blog/context-and-provider-pattern-with-the-vue-3-composition-api/
// https://www.patterns.dev/posts/provider-pattern/
// https://codesandbox.io/s/provider-2-forked-32udnr?file=/src/App.js:401-482
```

使用`ThemeProvider`作为需要**共享数据**的组件的父组件：

```html
<ThemeProvider>
  <div id="nav">
    <RouterLink to="/">Home</RouterLink>| <RouterLink to="/examples">Examples</RouterLink>|
    <RouterLink to="/form">Form Validation</RouterLink>|
    <RouterLink to="/posts">Paginated Posts</RouterLink>|
    <RouterLink to="/images">Infinite Images</RouterLink>|
    <RouterLink to="/upload">Patterns</RouterLink>|
    <RouterLink to="/state">State</RouterLink>
  </div>
  <RouterView />
</ThemeProvider>
```

在后代组件中注入数据和行为：

```html
<template>
  <div :style="themesStyle">
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>
<script>
  import { ref, computed, inject } from 'vue'
  export default {
    name: 'Upload',
    setup() {
      const mode = inject('mode')
      const toggleTheme = inject('toggleTheme')
      const themes = inject('themes')
      const themesStyle = computed(() => {
        return themes[mode.value]
      })
      return {
        toggleTheme,
        themesStyle,
      }
    },
  }
</script>
```

优点

1. 避免了 prop 层层传递，让代码重构更容易---层层传递 prop，修改一层，就要修改多层。

缺点

1. 过度引发不必要的渲染。
2. 数据来源不够清晰。
3. 组件复用性会降低。

常见的应用：style-component、组合组件。

密切相关的组件（这些组件往往共同使用才算完整）共享数据，可使用这种模式，比如封装表格时，table、tr、td 是一起使用的，封装组件后也会一起使用。

## 容器和展示模式

在使用 vue 或者 react 编写组件时，希望**分离关注点**：将逻辑和视图分开，容器和展示组件模式能很好的做到这一点。

容器组件：负责处理数据，然后提供给展示组件。

展示组件：只负责展示数据，嵌套在容器组件内部，往往一个**函数组件**。

```html
<template>
  <div>
    <h2>container</h2>
    <DogImage :img-list="imgList" />
  </div>
</template>

<script>
  export default {
    name: 'Container',
  }
</script>
<script setup>
  import { DogImage } from './DogImage'
  import { useImageList } from '@/hooks'
  // 使用 hook
  const imgList = useImageList()
  // onMounted(()=>{
  //   const url = `https://dog.ceo/api/breed/labrador/images/random/6`
  //   fetch(url).then(res=>res.json()).then(({ message })=>{
  //     imgList.value = message
  //   })
  // })
</script>
```

展示组件：DogImage

```js
import { h } from 'vue'
import './DogImage.scss'
export const DogImage = ({ imgList = [] }) => {
  return (
    <ul>
      {imgList.map(item => (
        <li>
          <img src={item} />
        </li>
      ))}
    </ul>
  )
}
DogImage.props = ['imgList']

// 或者
// export default {
//   name:'DogImage',
//   props:{
//     imgList:{
//       type:Array,
//       default:()=>[]
//     }
//   },
//   setup(props){
//     console.log(props.imgList)
//  NOTE 这里返回一个函数
//     return ()=><ul>{props.imgList.map(item=><li><img src={item} /></li>)}</ul>
//   }
// }
```

优点：

1. 关注点分离
2. 展示组件是纯函数，易测试
3. 展示组件不包含逻辑，易修改，复用性高

缺点：

1. 过度使用容易把组件搞得复杂

> 何时用？

数据相同，但是展示的样式变化很大时。

[react 版本](https://codesandbox.io/s/hoc-pattern-1-forked-ept4ly?file=/src/DogImages.js)

## 观察者模式

希望对一个**目标**进行观察，当目标有变化时，得到通知（执行某个方法），事件回调是特殊的观察者模式。

观察者模式有两部分组成：观察目标和观察者，DOM 的事件是观察目标，事件处理函数是观察者。

可观察者有三部分：

- 观察者：一个数组，用于保存观察者

- 订阅：添加观察者

- 取消订阅：删除观察者

- 通知观察者：执行观察者里的函数

```ts
type fn = (params: unknown) => unknown

interface IObservable {
  observers: fn[]
}
// 可观察对象
class Observable implements IObservable {
  constructor() {
    // 观察者
    this.observers = []
  }
  observers: fn[]

  subscribe(f: fn) {
    this.observers.push(f)
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f)
  }

  notify(data) {
    this.observers.forEach(observer => observer(data))
  }
}

export default new Observable()
```

适用场景：`异步`、`事件驱动`。

案例学习

`RxJS`响应式库使用了观察者模式。

优点：

`分离关注点`和`单一职责`使代码解耦，更加内聚。

缺点：过度使用容易变得复杂。

特殊的观察者模式---发布-订阅，比观察者多了一个事件中心来处理执行的函数。

```ts
/*
 * @Description : 发布与订阅
 * @Date        : 2022-03-03 13:56:22 +0800
 * @Author      : Mason.Q.Zhou
 * @LastEditTime: 2022-03-03 15:36:06 +0800
 * @LastEditors : Mason.Q.Zhou
 */

type fn = (params: unknown) => unknown
type subscriber = { [key: string]: fn[] }
interface IPubSub {
  subscribers: subscriber
}
class PubSub implements IPubSub {
  subscribers: subscriber
  constructor() {
    this.subscribers = {}
  }
  add(type: string, f: fn) {
    const listeners = this.subscribers[type] || []
    listeners.push(f)
    !this.subscribers[type] && (this.subscribers[type] = listeners)
  }
  remove(type, f: fn) {
    const listeners = this.subscribers[type]
    if (!listeners || listeners.length === 0) return
    this.subscribers[type] = listeners.filter(item => item !== f)
  }
  publish(type, ...rest) {
    const listeners = this.subscribers[type]
    if (!listeners || listeners.length === 0) return
    listeners.forEach(f => f(rest))
  }
}
export default PubSub
```

使用:

```html
<template>
  <div>
    <button @click="onClick">点击</button>
  </div>
</template>

<script setup>
  import { observable, PubSub } from '../patterns/index'
  import { fromEvent, merge } from 'rxjs'
  import { sample, mapTo } from 'rxjs/operators'
  const pubSub = new PubSub()
  function say(params) {
    console.log('good morning---', params)
  }
  function greeting(params) {
    console.log(...params)
  }
  // 订阅
  pubSub.add('hello', say)
  pubSub.add('hello', greeting)

  merge(
    fromEvent(document, 'mousedown').pipe(mapTo(false)),
    fromEvent(document, 'mousemove').pipe(mapTo(true))
  )
    .pipe(sample(fromEvent(document, 'mouseup')))
    .subscribe(isDragging => {
      console.log('Were you dragging?', isDragging)
    })

  function log(params) {
    console.log(params)
  }
  // function alert(params){
  //   window.alert(params)
  // }
  // observable.subscribe(alert)
  observable.subscribe(log)

  function onClick() {
    observable.notify('点击了')
    // 发布
    pubSub.publish('hello', 'Jack', 12)
  }
</script>
```
