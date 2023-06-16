# render 函数

vue 提供了**声明式**编写 UI 的方式，即 vue 提供了对 DOM 进行描述的方式。

有两种描述 DOM 的方式：模板和 render 函数。模板在编译阶段会被转成 render 函数，这一过程叫编译模板。

<!-- TODO 如何查看编译结果 -->

模板可读性好，但是有时候模板并不灵活，大型的模板可读性也不好。

render 函数可读性不高，但是灵活，使用 render 函数封装组件，使用得当，**可提高组件的扩展性和易用性**。jsx 可解决 render 函数读写性不高的问题。

在 vue 的项目入口文件中，下面的代码新建一个 vue 应用的根组件，并默认命名为 `Root`，并将其挂载在 HTML 模板 `#app` div 上，它的模板在哪？

```js
new Vue({
  render: h => h(App),
}).$mount('#app')
```

> 这是一个没有模板的组件。

> \$mount('#app')，选择器对应的 dom 会被渲染结果替换，但是会智能地把 dom 上的属性添加到根据组件的根元素上。
> 手动通过`$mount(elector)`挂载元素，替换 selector 后，dom 的属性丢失。 两者表现不同，有点奇怪，但是不需要太关注这个区别。

今天再来复习 render 函数，重点关注这些容易踩坑的地方：

1. 学习 render 函数的使用，重点：样式、事件、插槽、指令、props、v-model、函数组件的处理。

2. 学习使用 jsx 封装组件。

3. 在 render 函数中使用表单组件，因为表单组件涉及到 `v-model` 容易踩坑。

> 为何要了解 render ?

在 render 函数中，可用 jsx 代替模板语法，可充分发挥 js 的能力，使得组件扩展性更好、封装更加优雅。

官网说得比较明白了，但是例子过于简单，只能体现优雅，没有体现扩展性，稍后封装一个能体现`扩展性`的组件。

## render 基础语法

render 函数签名：

```js
render(createElement: CreateElement, hack: RenderContext<Props>): VNode;
```

1. 返回值 -- VNode (虚拟节点) --- 一个用于描述 vue 组件结构的 JS 对象

![](https://cdn.jsdelivr.net/gh/jackchoumine/jack-picture@master/008i3skNgy1gqrnq8dbcpj31j60t4n1d.webp 'VNode 对象')

::: tip 说明

1.  返回值往往是一个单节点，划线的 context 是 vue 全局对象，有 $children 属性，是一个 VNode 数组，元素是一个 VNode，这样的层层嵌套，正好对应的组件的嵌套。 $el 是组件挂载点，\_uid 是组件 id。`调试时`可能会用到。

2.  也可以返回 VNode 数组。比如返回 `this.$scopedSlots.default()` 这是一个作用域插槽，可能是数组。

:::

2. 参数

第一个参数 `createElement`，是一个函数，DOM 中有 createElement 用于创建 DOM 节点。vue 中的 `createElement` 是用于创建 VNode 的。

> h 是 createElement 的别名，代表 `Hyperscript` (生成 HTML 的脚本)，Hyperscript itself stands for "script that generates HTML structures"。

> 写成`h`，更加方便输入，更加语义化。

第二个参数 `hack` 是渲染上下文，组件的`props`、`listeners`、`slots` 都在这个参数里。

![](https://cdn.jsdelivr.net/gh/jackchoumine/jack-picture@master/008i3skNgy1gqrop38n2dj30ps0g80ts.46at6hvtjw00.webp 'hack参数')

::: tip 说明
第二个参数在函数组件中才有，非函数组件为 undefined。因为函数组件中不存在组件实例 this，要提供这个参数获取 props 等内容。

第二个参数通常写成`context`，更加语义化。
:::

render 写成这样：

```js
render(h,context){
 return <span>render函数</span>
}
```

> render 使用 es6 声明方法的方式且返回 jsx ，vue 会自动注入 `const h = this.$createElement`，仅限于 render 函数，其他函数要使用，就要手动通过参数传入。

```js
render(){
 return <span>render函数</span>
}
```

这是 `es5` 的方式:

```js
render:function(){ // 显示传递 h:  function(h) 才行
  return <span>render函数</span>
}
```

> `render` 不能返回文本，想要显示文本内容，必须套一个标签， react 的 render 可以返回文本。

> 返回 jsx，vue 内部会调用 `createElement`编译成 VNode。

如何返回纯文本？

::: danger 返回文本的 hack 写法
`return this._v('someText')`，不推荐这么写，会导致他人难以理解。
:::

## createElement

### 返回值：VNode

VNode 是一个描述组件的普通 js 对象。

### 参数

```js
createElement(
  // html 标签 、自定义标签，比如 el-input
  // template // NOTE 用于传递插槽
  // 一个组件选项对象
  // resolve 了上述任何一种的一个 async 函数 // TODO 如何使用
  'div', // NOTE 必需的
  // 模板使用到的数据对象
  {},
  // string 或者 子VNode
  []
)
```

> 第一个参数不能省略，所以不能返回纯文本。 和 react 的 render 不同。

:::tip 注意
第一个参数可以是 template,往往和第二个参数的`slot`属性一起使用，指定插槽名称，传递插槽时可以用到。

resolve 的用法我没有搜索到例子，欢迎大佬告诉我。
:::

> 重点关注第二个参数

#### 处理样式和类

```js
{
  // :class = "{foo:true,bar:false}"
  class:{
    foo: true,
    bar: false
  },
  // :style="{color:'red','font-size':'14px'}"
  style:{
    color:'red',
    fontSize:'14px'
  }
}
```

#### 组件 props

```js
{
  props: {
    myCustomProp: '组件属性值'
  }
}
```

#### HTML 特性和 DOM 属性

```js
{
  // HTML 特性
  // NOTE 在组件内部使用 $attrs 获取 attrs
  // NOTE 会和 class 属性合并吗？
  // NOTE 和 class 属性的优先级，谁高？
  // 这里的 class 不会添加到 标签上
  attrs: {
    id: 'divId',
    class: 'className'
  },
  // DOM 属性
  domProps:{
    textContent: 'div 文本',// 优先级高于 v-text
    innerHTML: 'BAR'  // 优先级高于 v-html
  }
}
```

:::warning 注意

①. attrs 特性中的 class 不会被添加到标签上。

②. 注意区分 HTML 特性和 DOM 属性的区别。
:::

#### 处理事件

```js
{
  // v-bind:event
  on: {
    customEventName: value => {
      // 监听组件的自定义事件 即 emit 触发事件
    }
  },
  // 监听组件上的原生事件，只能用在组件上
  nativeOn: {
    click: target => {
      // 监听原生事件 即非 emit 触发的事件
    }
  }
}
```

:::tip 注意
`nativeOn` 只能用于自定义组件。
:::

#### 插槽

```js
{
  scopedSlots: {
    // 默认插槽
    default: props => h('span',props.text),
    otherSlot: props => h('div',props.customProp)
  },
  slot: 'slotName'// 一般和第一个参数 template 一起使用
}
```

使用模板定义一个按钮：

```html
<template>
  <div>
    <slot name="left"></slot>
    <button>
      <slot v-bind:person="person">
        <span>按钮</span>
      </slot>
    </button>
    <slot name="right" v-bind:age="person.age"></slot>
  </div>
</template>

<script>
  export default {
    name: 'MyButton',
    data() {
      return {
        person: {
          name: 'jack',
          age: 23,
        },
      }
    },
  }
</script>
```

在模板种使用该组件：

```html
<MyButton>
  <template #right="{age}">
    <span>按钮右边 {{ age }} 岁</span>
  </template>
  <template v-slot="{ person }">这是按钮，{{ person }}</template>
  <template #left>
    <span>按钮左边</span>
  </template>
</MyButton>
```

在 render 中使用该组件

```js
import MyButton from './MyButton.vue'
export default {
  name: 'UseButton',
  render(h) {
    //NOTE h 第一个参数为 template 第二个参数里的 slot 属性指定插槽名称
    const slotLeft = h('template', { slot: 'left' }, '按钮左边')
    const slotRight = h('template', { slot: 'right' }, '按钮右边')
    const slotDefault = h('template', { slot: 'default' }, '默认插槽')
    const children = [slotLeft, slotDefault, slotRight]
    return h(MyButton, {}, children)
  },
}
```

在 render 中获取作用域插槽抛出的数据

```js
import MyButton from './MyButton.vue'
export default {
  name: 'UseButton',
  render(h) {
    const slotLeft = h('template', { slot: 'left' }, '按钮左边')
    const children = [slotLeft]
    return h(
      MyButton,
      {
        scopedSlots: {
          default: props => {
            console.log(props)
            const { person } = props
            const text = `作用域插槽，${JSON.stringify(person)}`
            // 返回 h 创建的 VNode
            return h('span', {}, text)
          },
          right: props => {
            console.log(props)
            const { age } = props
            // 返回 jsx
            return <span>按钮右边 {age} 岁</span>
          },
        },
      },
      children
    )
  },
}
```

> 总结

①. 普通命名插槽，使用`h('template',{slot:'slotName'},children)` 编写，然后放渲染组件的`第三个参数`里。

②. 作用域插槽在第二个参数的 `scopedSlots` 对象里，该对象的每个属性名是组件的`插槽名`，值是一个函数，参数为插槽绑定的数据。

使用 render 函数重写编写 `MyButton`

```jsx
export default {
  name: 'MyButton',
  data() {
    return {
      person: {
        name: 'jack',
        age: 23,
      },
    }
  },
  render(h) {
    // NOTE default 关键字 不重命名 无法解构
    const { left, right, default: _defaultSlot } = this.$scopedSlots

    // NOTE 传递一个对象，在模板中使用解构取出属性
    const defaultSlot = _defaultSlot({ person: this.person })
    const leftSlot = left()
    const rightSlot = right(this.person)
    const button = h('button', {}, [defaultSlot])
    return h('div', {}, [leftSlot, button, rightSlot])
  },
}
```

返回 jsx

```js
export default {
  name: 'MyButton',
  data() {
    return {
      person: {
        name: 'jack',
        age: 23,
      },
    }
  },
  render(h) {
    const { left, right, default: _defaultSlot } = this.$scopedSlots
    // NOTE 检查插槽是否存在
    const defaultSlot = (_defaultSlot && _defaultSlot({ person: this.person })) || <span>按钮</span>
    const leftSlot = (left && left()) || ''
    const rightSlot = right(this.person)
    const button = h('button', {}, [defaultSlot])
    //  返回 jsx 使得 dom 结构更加清晰
    return (
      <div>
        {leftSlot}
        {defaultSlot}
        {rightSlot}
      </div>
    )
  },
}
```

函数式组件：

```js
export default {
  name: 'MyButton',
  functional: true,
  props: {
    person: {
      type: Object,
      default: () => ({ name: 'jack', age: 23 }),
    },
  },
  // NO DATA in functional component
  // data() {
  //   return {
  //     person: {
  //       name: 'jack',
  //       age: 23,
  //     },
  //   }
  // },
  render(h, { props, scopedSlots }) {
    const { left, right, default: _defaultSlot } = scopedSlots
    const defaultSlot = (_defaultSlot && _defaultSlot({ person: props.person })) || <span>按钮</span>
    const leftSlot = (left && left()) || ''
    const rightSlot = right(props.person)
    const button = h('button', {}, [defaultSlot])
    return (
      <div>
        {leftSlot}
        {button}
        {rightSlot}
      </div>
    )
  },
}
```

::: tip 总结

①. 普通插槽、命名插槽、作用域插槽都通过 `this.$scopedSlots` 获取，它们都是返回 VNode 的函数。

②. 插槽绑定的数据通过插槽函数传递，基本数据使用 `{}` 包裹，方便在模板中解构。

③. 返回 jsx 能让 div 结构更加清晰。

④. 注意检查是否存在插槽，以启用后备内容。
:::

#### 指令

```js
{
  directives: [{ name: 'directive-name', value: '2', expression: '1+1', arg: 'foo', modifiers: { foo: true } }]
}
```

在模板中定义指令

```html
<template>
  <!-- title 是名字， 指令的 value 由表达式计算出来 -->
  <!-- v-title:argument.modifier1.modifier2="expression" -->
  <div>
    在模板中编写指令
    <p v-title>这是简单指令</p>
    <!-- 只能带一个参数 -->
    <p v-title:argu>这是带参数的指令</p>
    <!-- 动态参数 -->
    <p v-title:[dynamicArgu()]>这是带动态参数的指令</p>
    <p v-title:argu.foo.bar>这是带参数和修饰符的指令</p>
    <p v-title:job.foo="data">这是带参数、修饰符和普通表达式的指令</p>
    <p v-title:job.foo="expresFun">这是带参数、修饰符和函数表达式的指令</p>
  </div>
</template>

<script>
  export default {
    name: 'Title',
    directives: {
      title: {
        inserted(el, bindings, vnode) {
          const { context: that } = vnode
          const { value = false } = bindings
          if (typeof value === 'function') {
            that.setTile(el, value(that.data))
          } else {
            that.setTile(el, value)
          }
        },
        componentUpdated(el, bindings, vnode) {
          const { context: that } = vnode
          const { value = false } = bindings
          if (typeof value === 'function') {
            that.setTile(el, value(that.data))
          } else {
            that.setTile(el, value)
          }
        },
      },
    },
    data() {
      return {
        data: { age: 23, job: 'web dev' },
      }
    },
    methods: {
      setTile(el, titleValue) {
        const textContent = el.textContent
        const title = textContent.trim() || '暂无数据'
        el.title = typeof titleValue === 'string' ? titleValue : title
      },
      dynamicArgu() {
        return Math.random() > 0.5 ? 'argu1' : 'argu0'
      },
      expresFun(data) {
        return data.age + '岁'
      },
    },
  }
</script>
```

指令对象 `bindings`

![](https://cdn.jsdelivr.net/gh/jackchoumine/jack-picture@master/008i3skNgy1gqrop38n2dj30ps0g80ts.webp '指令对象')

::: tip 总结

不建议在 render 函数中编写指令，难以理解，指令需要在模板使用才能发挥其设计的目的。render 中可直接控制 DOM。

:::

#### v-model 指令

使用 render 定义组件，如何提供 `v-model`？

:::tip 说明
prop:--value + `使用 on` 监听组件的事件，在处理函数中触发 `input` 自定义事件。
:::

在 render 函数中使用 v-model 指令的处理有三种方案：

① . 在数据对象中使用 `model` 属性：

```js
{
  model: {
    value: this.value,// value 是 data 里的属性
    callback: value => {
      // 可以再赋值之前做其他逻辑
      // 验证数据
      // 触发事件
      this.value = value
    }
  }
}
```

②. 传递 value + 监听 input 事件

```js
{
  props: {
    // value 是 data 中的属性
    value: this.value
  },
  on: {
    input: value => {
      // 可做其他事情
      // 触发事件
      this.value = value
    }
  }
}
```

③. 在 jsx 中使用 `vModel` 属性

```js
// input 是 data 中的属性
<MyInput vModel={this.input} />
```

> 三种方案的优缺点：

`model` 属性更加好，当表单项还有其他事件时，还可以在 `on` 中监听它们，比如 element 的下拉，有`change`、`clear` 等事件。

`props value` + `input`, 很符合 v-model 的语法糖。

jsx+ `vModel` 属性，简洁，常用。

#### 其他属性

```js
{
  key: 'v for 中的 key',
  ref:'模板变量',
  refInFor: true, // 循环中的 ref 是一个数组
}
```

## 使用 render 封装一个输入框

`MyInput.jsx`

```js
import './my-input.css'
export default {
  name: 'MyInput',
  props: {
    // 需要实现 v-model 指令
    value: {
      type: [String, Number],
      default: '',
    },
  },
  render(h) {
    return h('input', {
      class: {
        'my-input': true,
      },
      style: {
        backgroundColor: '#ccc',
      },
      attrs: {
        id: 'my-input',
        class: 'a-my-input',
        'data-key': 'key',
      },
      domProps: {
        value: this.value,
      },
      // 监听 input 的 input 事件
      on: {
        input: ({ target }) => {
          this.$emit('input', target.value)
        },
      },
    })
  },
}
```

:::tip 说明
还可以使用 `computed`： domProp 的 value 接收一个计算属性，为该计算属性提供 setter 和 getter ，在 input 事件处理函数中设置计算属性的值，在 setter 中触发 自定义的 input 事件。

这种方法不如上面的明白，代码量也多了。
:::

在模板中使用该组件

```html
<MyInput v-model="myInput" />
```

在 render 函数中使用

```js
export default {
  name: 'UseInput',
  data() {
    return {
      input: '',
    }
  },
  render(h) {
    return h('div', {}, [
      h(MyInput, {
        model: {
          value: this.input,
          callback: value => {
            // 可在此做其他事件
            this.input = value
          },
        },
      }),
      h('h3', {}, this.input),
    ])
  },
}
```

希望 `UseInput`，支持 `v-model`，即在二次封装 MyInput。

方案 1：添加 `value props` 在 model 中触发 `input`，删除 data 中的 input。

```js
import MyInput from './my-input.jsx'
export default {
  name: 'UseInput',
  props: {
    value: { type: [String, Number], default: '' },
  },
  render(h) {
    return h('div', {}, [
      h(MyInput, {
        model: {
          value: this.value,
          callback: value => {
            // 可在此做其他事件
            this.$emit('input', value)
          },
        },
      }),
      h('h3', {}, this.value),
    ])
  },
}
```

方案 2: 添加 `value props`，将其通过 `props` 传入 UseInput，监听 UseInput 的`input`事件，在此触发`input`事件。

```js
import MyInput from './my-input.jsx'
export default {
  name: 'UseInput',
  props: {
    value: { type: [String, Number], default: '' },
  },
  render(h) {
    return h('div', {}, [
      h(MyInput, {
        props: {
          value: this.value,
        },
        on: {
          input: value => {
            this.$emit('input', value)
          },
        },
      }),
      h('h3', {}, this.value),
    ])
  },
}
```

:::tip 说明
对于具有多种事件的表单项，比如 element 的下拉框，第一种方案更加好，`on` 属性留位置给从外传入的处理函数。
:::

方案 3： jsx + vModel + prop value

```js
import MyInput from './my-input.jsx'
export default {
  name: 'UseInput',
  props: {
    value: { type: [String, Number], default: '' },
  },
  data() {
    return {
      input: this.value,
    }
  },
  render(h) {
    return (
      <div>
        <MyInput vModel={this.input} />
        {/* <h2>{this.input}</h2> */}
      </div>
    )
  },
}
```

:::danger 注意
这种方案不能实现双向绑定
:::

## 其他问题

1. 如何限制继承的属性，inheritAttrs 设置为 false，无法显示。

在模板定义的组件中，`inheritAttrs` 属性设置为 false, 除`style`、`class` 以为的属性不会添加到根组件，实现手动控制。

render 定义的组件中，也是一样的。

## 参考

[What does the ‘h’ stand for in Vue’s render method?](https://css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/)

[A Practical Use Case for Vue Render Functions: Building a Design System Typography Grid](https://css-tricks.com/a-practical-use-case-for-vue-render-functions-building-a-design-system-typography-grid/)

[How to use v-model ( for custom input component) in render function?](https://forum.vuejs.org/t/how-to-use-v-model-for-custom-input-component-in-render-function/1455/4)
