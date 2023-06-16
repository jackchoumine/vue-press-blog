# stencil 组件

stencil 提供一些装饰器、生命周期钩子和渲染函数去编写一个组件。

## 装饰器

装饰器是一组用于声明组件元数据的函数，会在构建产物中移除，所以不会有运行时开销。

- @Component() 声明一个类是组件
- @Prop() 声明一个组件的特性或者属性
- @State() 声明组件内部状态
- @Watch() 监听 prop 或者 state 的改变，然后执行副作用
- @Listen() 监听组件内部的 DOM 事件
- @Event() 声明自定义事件
- @Method() 暴露组件方法
- @Element() 声明组件变化的自定义标签

### 生命周期

![stencil组件生命周期](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/008i3skNgy1gxyq0ishibj30u0147418.jpg)

> 第一次挂载

```bash
connectedCallback
⬇️
componentWillLoad
⬇️
componentWillRender
⬇️
render
⬇️
componentDidRender
⬇️
componentDidLoad
⬇️
disconnectedCallback # 组件被移除
```

prop 或者 state 更新：

```bash
@Watch
⬇️
componentShouldUpdate
⬇️
componentWillUpdate
⬇️
componentWillRender
⬇️
render
⬇️
componentDidRender
⬇️
componentDidUpdate
⬇️
disconnectedCallback # 组件被移除
```

常用的：

`connectedCallback`会调用多次：首次和移除后再添加到 DOM 都会调用，可设置定时器、监听原生事件等。

```js
const el = document.createElement('my-cmp')
document.body.appendChild(el)
// connectedCallback() called
// componentWillLoad() called (first time)

el.remove()
// disconnectedCallback()

document.body.appendChild(el)
// connectedCallback() called again, but `componentWillLoad()` is not.
```

`disconnectedCallback` 组件从 DOM 中移除时调用，可在此做一些收尾工作。

`componentWillLoad` 在 render 之前调用，`调用一次`。
可再次发送 ajax 请求获取数据。

`componentShouldUpdate(newValue,oldValue,property)`

返回布尔值，决定组件是否重新渲染。

可以更新状态的钩子有：

```bash
componentWillLoad
@Watch
componentWillUpdate
componentWillRender
```

`componentDidLoad(), componentDidUpdate() and componentDidRender()`更新状态，会导致再次渲染。

`componentDidUpdate()、componentDidRender()` 可能导致无限渲染。

父子组件的生命周期：

```html
<cmp-a>
  <cmp-b>
    <cmp-c></cmp-c>
  </cmp-b>
</cmp-a>
```

```bash
cmp-a - componentWillLoad()
cmp-b - componentWillLoad()
cmp-c - componentWillLoad()

cmp-c - componentDidLoad()
cmp-b - componentDidLoad()
cmp-a - componentDidLoad()
```

[Component Lifecycle Methods](https://stenciljs.com/docs/component-lifecycle)

### 应用加载事件

一个特殊的生命周期钩子，在**整个应用加载完成**后触发。

```js
window.addEventListener('appload', event => {
  console.log(event.detail.namespace)
})
```

## 组件定义

```tsx
import { Component, Prop, h, EventEmitter, Event } from '@stencil/core'

// 组件装饰器
@Component({
  tag: 'app-input', // 名字全局唯一
  styleUrl: 'index.scss', // 组件的样式
  shadow: true, // 开启 shadow root 封装组件样式
})
export class MyInput {
  @Prop() value: string | number = ''
  @Event({ eventName: 'input' }) input: EventEmitter
  // 直接使用属性名称作为事件名称
  @Event() inputChanged: EventEmitter

  onInput(e: Event) {
    // e.preventDefault() // 默认行为不行
    e.stopPropagation()
    const inputEle = e.target as HTMLInputElement
    this.input.emit(inputEle.value)
  }

  onChange(e: Event) {
    const inputEle = e.target as HTMLInputElement
    this.inputChanged.emit(inputEle.value)
  }

  render() {
    return <input value={this.value} onInput={e => this.onInput(e)} onChange={e => this.onChange(e)} />
  }
}
```

解读：

- `@Component`装饰器声明该类是一个组件，传递一些元数据，比如组件的标签，标签必须`全局唯一，且含有-`，样式，是否开启 shadow 等。

tag 属性必需，[更多参数](https://stenciljs.com/docs/component)

- `@Prop`声明组件的属性

> 关于命名

在组件内部使用**小驼峰**命名，在 html 使用 dash-case 传递数据。

> 如何处理原生属性？

添加到**自定义标签**上。

> 如何传递对象、数组等复杂数据？

在 stencil 组件中，和 jsx 一样。

在 html 中，所有属性都是字符串，**只能传递字符串**。

```js
comInstance.setAttribute('prop', value) // 无效
comInstance.prop = value // work well 且对对象和数组无效
```

> 如何在 html 中修改 prop？

暴露方法和设置 prop 可变，在外部调用方法修改。

<!-- TODO -->

> prop 的选项

```ts
export interface PropOptions {
  attribute?: string = false
  mutable?: boolean = false
  reflect?: boolean = false
}
```

prop 默认是组件内部不可变更的，否则触发警告通过`mutable`修改这个默认行为。

reflect：声明 DOM `prop`是否对应到标签特性上，设置为 true，在 html 标签上，会显示该属性。

```tsx
@Component({ tag: 'my-cmp' })
class Cmp {
  @Prop({ reflect: true }) message = 'Hello'
  @Prop({ reflect: false }) value = 'The meaning of life...'
  @Prop({ reflect: true }) number = 42
}
```

渲染结果：

```html
<my-cmp message="Hello" number="42"></my-cmp>
```

不设置为 true，依然可以通过 DOM 对象拿到 prop。

> 修改特性名字 attribute

如何验证 prop?

在 Watch 中验证 prop 合法性，不合法抛出错误。

> 如何设置必需？

都默认可选，可在 Watch 验证是否必须。

- `@Event`声明组件触发的事件，后面是事件名称

`this.eventName.emit(data)` 触发自定义事件，data 是发送到父组件的数据，监听 eventName 事件时通过 `event.detail` 获取到 `data`。

> 在自定义标签上仍然能监听到原生事件，如何避免监听到原生事件呢？

阻止事件冒泡，必要时取消默认行为。

> 如何监听？

- `@Listen(eventName)`监听事件，绑定到组件上，可通过第二个参数配置绑定的元素。
  `@Listen`监听全局事件很有用。

- 在 jsx 中，通过`onXxx`监听

- html 中通过`addEventListener`

[更多事件信息](https://stenciljs.com/docs/events#listen-decorator)

### 组件如何响应数据变化

当 props 和 state 改变，stencil 重新渲染，比较变化时，比较的时引用，所以数组和对象，引用不变，不会更新。

[Reactive Data](https://stenciljs.com/docs/reactive-data)

## 组件使用

通过自定义标签 `app-input` 在 stencil 组件中使用：

```tsx
import { Component, h, Host, State, Watch } from '@stencil/core'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  @State() input = 'hello world'

  onInput(e: CustomEvent<HTMLAppInputElement>) {
    this.input = e.detail as unknown as string
  }
  // NOTE 监听原生事件
  // 被组件内阻止事件冒泡后，监听不到
  onNativeChange(e: Event) {
    const inputEle = e.target as HTMLInputElement
    console.log('原生事件', inputEle.value)
  }

  onChange(e: CustomEvent<HTMLAppInputElement>) {
    console.log(e.detail)
  }

  @Watch('input')
  inputChanged(newValue: string, oldValue: string) {
    console.log(newValue, oldValue)
  }
  render() {
    return (
      <app-input
        value={this.input}
        onInput={e => this.onInput(e)}
        onInputChanged={this.onChange}
        onChange={this.onNativeChange}
      />
    )
  }
}
```

### 如何传递 slot

```tsx
<Host>
  <slot name='prepend'></slot>
  <input value={this.value} onInput={e => this.onInput(e)} onChange={e => this.onChange(e)} />
  <slot name='append'>hello</slot>
</Host>
```

从父组件传递：

```tsx
<app-input>
  {/* 不指定slot名字，无法处理 */}
  {/* <h1>header one</h1> */}
  <h2 slot='prepend'> append slot</h2>
  {/* <div slot='append'> */}
  <span slot='append'>append</span>
  <span slot='append'>append one</span>
  <span slot='append'>append another</span>
  {/* </div> */}
</app-input>
```

> 如何通过 slot 传递数据到父组件？

<!-- TODO -->

[slot 的高级用法](https://ionicframework.com/blog/building-with-stencil-tabs/)

### 如何暴露组件内部的方法供外部使用？

通过`@Method`暴露方法，`ref`获取组件实例，调用组件方法。

```tsx
  @Method() // @Method 装饰器要求方法返回Promise
  async getValue() {
    return this.value
  }
```

在父组件通过`ref`调用组件方法

```tsx
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  person: Person = { name: 'John', age: 23 }
  appInput!: HTMLAppInputElement
  componentWillLoad() {
    console.log('Component is about to be rendered', this.appInput)
  }
  componentDidLoad() {
    console.log(this.appInput) // 组件实例
    this.appInput.getValue().then(console.log)
    console.log(this.appInput.person) // 拿到自定义属性
    console.log(this.appInput.title) // 拿到原生属性
    // console.log(this.appInput?.onInput)// 拿不到没有暴露的方法
  }
  render() {
    return <app-input ref={refInput => (this.appInput = refInput)} person={this.person} title='input' />
  }
}
```

通过函数的方式绑定 ref 到组件上，组件挂载后，ref 是组件实例。

> prop、method、原生属性是共有的，其他都是私有的。

### `@Element` 装饰器

在组件内部获取自组件实例。

和在组件外部通过`ref`获取组件实例，值是同一个。

## Host 组件

Host 组件一个内置组件，不会渲染到页面上。

常用的场景：

- 在组件内部设置自定义标签的属性

```tsx
import { Component, Host, h } from '@stencil/core'

@Component({ tag: 'todo-list' })
export class TodoList {
  @Prop() open = false
  render() {
    return (
      <Host
        aria-hidden={this.open ? 'false' : 'true'}
        class={{
          'todo-list': true,
          'is-open': this.open,
        }}
      />
    )
  }
}
```

- 作为`Fragment`

## 样式

stencil 使用 Shadow DOM 要封装 DOM 和样式，内部样式不泄露到外部，外部样式不影响组件内部的 DOM。

```tsx
@Component({
  shadow: true,// 启用 shadow DOM
})
```

不启用，和平时的 style 一样书写，就是全局样式。

启用后：

- 样式隔离：内外部样式不相互影响。

- 设置样式的选择改变

启用前，可通过自定义标签获取到 DOM

```scss
app-input {
}
```

启用后，自定义标签失效，使用 `:host`

```scss
:host {
}
```

启用后，对`:host`选择器有影响，目前还不清楚是什么影响。

<!-- TODO -->

> 都使用 `:host`

- 获取 DOM 的方式改变

```js
this.el.querySelector('div') // 启用前
this.el.shadowRoot.querySelector('div') // 启用后
```

> 如何从外部改变内部的样式？

- [CSS custom 变量](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties）

<!-- FIXME -->

CSS 变量往往设置成全局的，但是全局样式文件只能导入一个。

和

- [::part and ::theme, an ::explainer](https://meowni.ca/posts/part-theme-explainer/)

<!-- TODO -->

- 全局样式

哪些情况该考虑使用全局样式：

1. Theming: defining CSS variables used across the app

2. 字体

3. body background

4. CSS resets

[更多教程](https://ionicframework.com/blog/advanced-stencil-component-styling/)

## 函数组件

```tsx
import { h } from '@stencil/core'
import './index.css'
export const Hello = props => <h1>Hello, {props.name}!</h1>
```

> 函数组件无法使用样式，且只能在 JSX 中使用，以大写字母开头，**不能在 html 中**使用，这个很坑爹。

函数组件还有以下限制：

- 不会被编译成 web component，故无法在 html 中使用
- 不能使用生命周期函数
- 不会创建 DOM 节点
- 无法使用 shadow DOM 和 scoped style，其实无法应用样式

这些特点，限制了函数组件的使用场景，除了 renderProp ，几乎无用。

> renderProp 只能在 jsx 中使用。

[How To Build Web Components Using Stencil JS](https://enappd.com/blog/build-web-components-using-stencil-js/51/)

[Creating Web Components with Stencil](https://auth0.com/blog/creating-web-components-with-stencil/)

[你的前端框架要被 Web 组件取代了](https://www.infoq.cn/article/LlxdiogqZvvci57_ZgJm)
