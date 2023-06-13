# vue3 中的 render 函数

vue3 较 vue2，render 函数有很大的变化，现在使用 vue3 的 render 把 vue2 中使用 render 定义的组件都实现一遍，比较着学习，印象会更深刻。

## 基本用法

> h 函数参数的变化

1. 参数更加扁平了。

```js
// 2.x
{
  staticClass: 'button',
  class: {'is-outlined': isOutlined },
  staticStyle: { color: '#34495E' },
  style: { backgroundColor: buttonColor },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
// 3.x Syntax
{
  class: ['button', { 'is-outlined': isOutlined }],
  style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

2. 使用时需要显示导入

> 2.x 会自动注入 h，3.x 需要手动引入。

以前 2.x 的语法，再使用 3.x 语法写一遍
`MyButton.vue`

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
  import { reactive } from 'vue'
  export default {
    name: 'MyButton',
    setup(props, { slots }) {
      const person = reactive({ name: 'jack', age: 23 })
      return { person }
    },
  }
</script>
```

jsx 写法：

1. 在 setup 中返回渲染函数

```js
import { h, reactive } from 'vue'

export default {
  name: 'MyButtonSetup',
  setup(props, { slots }) {
    const person = reactive({ name: 'jack', age: 23 })
    const { left, default: _defaultSlot, right } = slots

    const backDefaultSlot = <span>按钮</span>
    const defaultSlot = <button>{(_defaultSlot && _defaultSlot({ person })) || backDefaultSlot}</button>

    const leftSlot = left && left()
    const rightSlot = right && right({ age: person.age })

    const children = [leftSlot, defaultSlot, rightSlot]
    // 返回 jsx
    // return () => <div>{children}</div>
    return () => h('div', null, children)
  },
}
```

> 需要返回渲染函数，直接返回 vnode，不会渲染。

```js
setup() {
  return <div>does not works</div> // ❌
}
```

> 如何显示文本

```js
setup() {
  return ()=>'someText'
}
```

> 返回 <span>span</span>

```js
setup() {
  return ()=>h('span','someText')
}
```

2. 使用 render 函数, 在 setup 中返回 data

```js
import { reactive } from 'vue'

export default {
  name: 'MyButtonRender',
  setup(props, { slots }) {
    const person = reactive({ name: 'jack', age: 23 })
    return { person }
  },
  render() {
    const { left, default: _defaultSlot, right } = this.$slots

    const backDefaultSlot = <span>按钮</span>
    const defaultSlot = <button>{(_defaultSlot && _defaultSlot({ person: this.person })) || backDefaultSlot}</button>

    const leftSlot = left && left()
    const rightSlot = right && right({ age: this.person.age })

    const children = [leftSlot, defaultSlot, rightSlot]
    return <div>{children}</div>
  },
}
```

> 在 render 函数中获取 props、slots，从组件实例中获取

```js
this.$props # 组件props
this.$slots # 插槽
this.person # 获取 setup 返回的属性
this.$emit # 触发事件
this.$attrs # 非 props 和 自定义事件
```

[更多实例属性](https://v3.cn.vuejs.org/api/instance-properties.html#data)

> 在 setup 返回渲染函数，render 也返回 vnode，会怎样？

setup 函数优先，render 像不存在一样。

> 使用 render + setup 函数，和 2.x 的 data + render 类似。

这种写法需要了解组件的`实例属性`，和 3.x 去 this 的理念背道而驰。

> 这种写法，render 参数和 2.x 的参数不同，也和文档里说的参数不同，难以理解，让人费解。

具体可看这个 issue:

[why props slots and attrs are not same in render and setup function? what's the best practice to use they?](https://github.com/vuejs/vue-next/issues/3840#issuecomment-850664771)

[render 函数变更](https://github.com/vuejs/vue-next/issues/29)

> 基于以上原因，不推荐 setup + render 的写法。

## 使用 jsx 定义一个按钮

`setup` 函数有两个参数，第一个为 props，第二个为 slots、emit、attrs 的合并对象。

```bash
props # 组件props,不要在参数位置解构属性，会失去响应式
# setup({prop1}){} # ❌
slots # 插槽，一个对象，属性为插槽名字，3.x 作用域插槽和普通插槽合并了 v-slot
emit # 用于触发事件 2.x this.$emit
attrs # 对象，包含非 props 属性和未在 emits 中声明的事件
```

定义一个按钮:

```js
import { h } from 'vue'

export default {
  name: 'MyButton2',
  props: ['buttonText'],
  inheritAttrs: false,
  emits: ['my-click'],
  setup(props, { slots, emit, attrs }) {
    const button = h(
      'button',
      {
        onClick: () => {
          emit('my-click', Math.random().toString(36))
        },
        ...attrs,
      },
      props.buttonText
    )
    // NOTE 在 h 函数内部调用插槽，父组件插槽内容变化，组件内部会更新，否则不更新。
    return () => h('div', null, [button, slots?.default()])
  },
}
```

在模板中使用 MyButton2：

```html
<MyButton2 buttonText="按钮" id="my-id" data-key="custom-prop" @my-click="onMyClick">
  <span>这是插槽</span>
</MyButton2>
```

在 setup 中使用 MyButton2：

`ParentButton.js`

```js
import { h } from 'vue'
import MyButton from './MyButton2.jsx'
export default {
  name: 'ParentButton',
  setup() {
    const myButton = h(
      MyButton,
      {
        buttonText: '我的按钮',
        onMyClick: data => {
          console.log('myClick', data)
        },
        id: 'my-id-2',
        'data-key': 'custom-prop',
        onProp: () => {
          console.log('onPropFun')
        },
      },
      {
        // NOTE 默认插槽和 2.x 不同，要写在第三个参数
        default: () => {
          return h('span', { title: 'default' }, '这是默认插槽')
        },
      }
    )
    return () => myButton
  },
}
```

> 关于组件的引入：

1. 通过 import `MyButton2.jsx`， 再通过 h 渲染，如上。

2. 全局注册的组件，可用解析函数引入。

```js
// 全局注册 MyButton2
import MyButton2 from './components/MyButton2.jsx'
const VueApp = createApp(App)
VueApp.component('MyButton2', MyButton2)
VueApp.mount('#app')
```

改写 `ParentButton.js`

```js
import { h, resolveComponent } from 'vue'
export default {
  name: 'ParentButton',
  setup() {
    const Button = resolveComponent('MyButton2')
    const myButton = h(
      Button,
      {
        buttonText: '我的按钮',
        onMyClick: data => {
          console.log('myClick', data)
        },
        id: 'my-id-2',
        'data-key': 'custom-prop',
        onProp: () => {
          console.log('onPropFun')
        },
      },
      {
        default: () => {
          return h('span', { title: 'default' }, '这是默认插槽')
        },
      }
    )
    return () => myButton
  },
}
```

> resolveComponent 找到组件，返回组件对象，否则返回参数。

> attrs 属性包含非 props 属性和事件

在模板中使用组件，使用 `v-bind` 绑定属性和事件: `v-bind="attrs"`

```js
{id: "my-id", data-key: "custom-prop",  onMyClick: ƒ}
```

attrs 的问题：

1. 想要在组件内部取出事件和 dom 属性，比较棘手。

为何要取出来呢？ 希望手动绑定 dom 的属性和 html 的特性。

> 可依次判断 key 是否以`on`开头且值为非函数。

2. 第一种方法还是不能很好区分 dom 属性。

当组件绑定一个 `onName="func"` 时，无法知道这是绑定事件还是传递方法。

比如

```html
<MyButton2 buttonText="按钮" id="my-id" data-key="custom-prop" @my-click="onMyClick" :onProp="() => {}">
  <span>这是插槽</span>
</MyButton2>
```

attrs 里有一个 onProp 属性，乍一看，以为是事件。

```js
{id: "my-id", data-key: "custom-prop", onMyClick: ƒ, onProp: ƒ}
```

> 解决办法

使用 `emits: ['my-click']` 声明组件的事件，attrs 里就不再有 `onMyClick` 属性了。

## 处理 v-model

1. 在 html 表单元素上

`MyInputOne.vue`

```html
<template>
  <div>
    <input type="text" v-model="input" />
    <h2>{{ input }}</h2>
  </div>
</template>
<script>
  import { ref } from 'vue'
  export default {
    name: 'MyInputOne',
    setup() {
      const input = ref('')
      return { input }
    },
  }
</script>
```

h 函数实现
`MyInputTow.js`

```js
import { h, ref } from 'vue'

export default {
  name: 'MyInputTwo',
  setup() {
    const inputText = ref('jack')
    const Input = h('input', {
      value: inputText.value,
      onInput: ({ target }) => {
        inputText.value = target.value
      },
    })
    return () => h('div', null, [Input, h('h2', null, { default: () => inputText.value })])
    // NOTE 插槽必须在 render 函数里，否则不会更新，😤
    // const H2 = h('h2', null, { default: () => inputText.value })
    // const H2 = h('h2', null, inputText.value)
    // const Div = h('div', null, [Input, H2])
    // return () => Div
  },
}
```

使用 jsx + vModel:

```js
import { ref } from 'vue'

export default {
  name: 'MyInputTwo',
  setup() {
    const inputText = ref('jack')
    return () => (
      <div>
        <input vModel={inputText.value} />
        <h2>{inputText.value}</h2>
      </div>
    )
  },
}
```

> 3.x 不再支持 vModel 。

> value + input + jsx， 可行：

```js
import { ref } from 'vue'

export default {
  name: 'MyInputTwo',
  setup() {
    const inputText = ref('jack')
    return () => (
      <div>
        <input
          value={inputText.value}
          onInput={({ target }) => {
            inputText.value = target.value
          }}
        />
        <h2>{inputText.value}</h2>
      </div>
    )
  },
}
```

2. 自定义组件上的 v-model

```html
<template>
  <div>
    <textarea v-model="inputText"></textarea>
    <h2>textarea:{{ inputText }},{{ title }}</h2>
    <h2>title:{{ innerTitle }}</h2>
  </div>
</template>
<script>
  import { defineComponent, ref, watch } from 'vue'
  export default defineComponent({
    name: 'MyTextarea',
    props: ['modelValue', 'title'],
    emits: ['update:modelValue', 'update:title'],
    setup(props, { emit }) {
      //NOTE props 不能 直接绑定到模板上
      // 这和 2.x 有区别
      const inputText = ref(props.modelValue)
      const innerTitle = ref(props.title)
      watch(
        () => inputText.value,
        value => {
          const title = Math.random().toString(36)
          innerTitle.value = title
          emit('update:title', title)
          emit('update:modelValue', value)
        }
      )
      return {
        inputText,
        innerTitle,
      }
    },
  })
</script>
```

> 多行文本 textarea 比较特殊，没有 value 、checked 等表单属性。只能使用 v-model，其他表单可以使用 v-model 直接绑定，或者使用 DOM 属性比如 checked + change 、value + input 等，在事件处理函数中触发 update:modelValue 。

> 在模板中使用 `MyTextarea`：

```html
<template>
  <div>
    <MyTextarea v-model="input" v-model:title="title" />
    <h1>父组件：{{ input }}</h1>
  </div>
</template>
<script>
  import { ref, reactive, watch, computed } from 'vue'
  import MyTextarea from './MyTextarea.vue'
  export default {
    name: 'Model',
    components: { MyTextarea },
    setup() {
      const input = ref('')
      const title = ref('title')
      return { input, title }
    },
  }
</script>
```

> 在渲染函数中使用：

```js
import { defineComponent, ref, h } from 'vue'
import MyTextarea from './MyTextarea.vue'
export default defineComponent({
  name: 'TextareaModel',
  setup() {
    const inputText = ref('TextareaModel')
    const title = ref('标题')
    const textarea = h(MyTextarea, {
      // NOTE 这个不再支持 ❌
      // model: {
      //   value: inputText.value,
      //   callback: value => {
      //     console.log('callback')
      //     console.log(value)
      //   },
      // },
      modelValue: inputText.value,
      'onUpdate:modelValue': value => {
        console.log('modelValue', value)
        inputText.value = value
      },
      title: title.value,
      'onUpdate:title': value => {
        console.log('title', value)
        title.value = value
      },
    })
    // NOTE 子元素必须写在 h 函数的第三个参数 const h1 = h('h1', inputText.value) ❌
    return () => h('div', { style: { backgroundColor: '#ccc' } }, [textarea, h('h1', inputText.value + title.value)])
  },
})
```

> 在 jsx 中使用

```js
import { defineComponent, ref, h } from 'vue'
import MyTextarea from './MyTextarea.vue'
export default defineComponent({
  name: 'TextareaModelTwo',
  setup() {
    const inputText = ref('TextareaModelTwo')
    const title = ref('TextareaModelTwo')
    return () => (
      <div style={{ backgroundColor: '#ddd' }}>
        <MyTextarea
          modelValue={inputText.value}
          onUpdate:modelValue={modelValue => {
            console.log('modelValue', modelValue)
            inputText.value = modelValue
          }}
          title={title.value}
          onUpdate:title={modelTitle => {
            /* ❌ 参数不能是 title */
            title.value = modelTitle
          }}
        />
        <h1>{inputText.value + title.value}</h1>
      </div>
    )
  },
})
```

> 二次封装 MyTextarea，对外提供 v-model，常见二次封装开源的表单组件。

1. 用模板封装

两种方案：

①. `v-model` + `watch` ，在 watch 中触发 `update:modelValue`

②. `modelValue` + `update:modelValue`，在事件中触发 `update:modelValue`

```html
<template>
  <div>
    <!-- <MyTextarea :modelValue="text" @update:modelValue="change" /> -->
    <MyTextarea v-model="text" />
  </div>
</template>
<script>
  import { ref, watch } from 'vue'
  import MyTextarea from './MyTextarea.vue'
  export default {
    name: 'YouTextarea',
    components: { MyTextarea },
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const text = ref(props.modelValue)
      const change = value => {
        text.value = value
        // :modelValue="text" + @update:modelValue="change"
        emit('update:modelValue', value)
      }
      watch(
        () => text.value,
        value => {
          // v-model="text" + watch
          emit('update:modelValue', value)
        }
      )
      return {
        text,
        change,
      }
    },
  }
</script>
```

2. 用 jsx 或者 js 封装

只能使用

> `modelValue` + `update:modelValue`, 在事件中触发 `update:modelValue`。

> 2.x 中的 model 属性不再支持。

```js
import { ref } from 'vue'
import MyTextarea from './MyTextarea.vue'
export default {
  name: 'YouTextareaJSX',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const text = ref(props.modelValue)
    const change = value => {
      text.value = value
      emit('update:modelValue', value)
    }
    return () => <MyTextarea modelValue={text.value} onUpdate:modelValue={change} />
  },
}
```

或者：

```js
import { h, ref } from 'vue'
import MyTextarea from './MyTextarea.vue'
export default {
  name: 'YouTextareaJSX',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const text = ref(props.modelValue)
    const change = value => {
      text.value = value
      emit('update:modelValue', value)
    }
    return () => h(MyTextarea, { modelValue: text.value, 'onUpdate:modelValue': change })
  },
}
```

## 处理插槽

setup 函数中从第二个参数中解构 `slots`。

render 函数使用 `this.$slots`。

在 h 函数中作为第三个参数传递，这和 2.x 第二个参数中使用插槽不同。

> jsx 模板的中插槽

2.x 在用 `slot` 指定插槽，2.x 作用域插槽如何写？

3.x 不再支持 `slot` 属性，目前只能在第三个参数里传递插槽。

[@vue/babel-plugin-jsx 插件提供了插槽的便捷](https://github.com/vuejs/jsx-next) 写法，但是文档太粗陋了，不知道如何用，先写 h。

```js
import { h } from 'vue'
import MyButton from './MyButton'
export default {
  name: 'RenderSlots',
  setup() {
    const ButtonSlots = {
      left: () => <span>左边插槽</span>,
      default: ({ person }) => <span>默认插槽{person?.age}</span>,
      right: ({ age }) => <span>右边插槽{age}</span>,
    }
    return () => h(MyButton, null, ButtonSlots)
  },
}
```

> 参考

[更多关于插槽的文档](https://v3.vuejs.org/guide/render-function.html#slots)

[What’s the proper way to use Vue 3 JSX Function Component with Slots?](https://forum.vuejs.org/t/whats-the-proper-way-to-use-vue-3-jsx-function-component-with-slots/97175/5)

## component 组件 和 is

模板中使用 `component` 组件和 `is` 属性动态渲染组件。

render 函数可直接进行 JS 条件判断，选择渲染的组件。

[还可以使用 resolveDynamicComponent](https://v3.vuejs.org/guide/render-function.html#component-and-is) ，`不建议这样写`，条件判断已经足够清楚。

## 处理指令

可导出解析指令的方法，可直接使用指令对象。

[文档说明](https://v3.vuejs.org/guide/render-function.html#custom-directives)

> 不推荐在 render 中使用指令语法，直接使用 jsx，或者把指令逻辑封装成函数，h 函数中写指令，可读性极差。

## keep-alive 等内置组件的处理

在 render 函数中可使用 vue 的内置组件，需从 vue 引入，这么设计是为了便于摇树优化。

[文档说明](https://v3.vuejs.org/guide/render-function.html#built-in-components)

## 显示文本

2.x 的 h 不能返回文本，返回文本需要使用 `return this._v('someText')`

3.x 支持直接返回文本或者字符串数组，会在文本前面渲染一个注释节点。

## 函数组件

3.x 已经把状态组件的性能提升到和函数组件几乎没有差别，vue 推荐使用状态组件。

> 但是学会使用函数组件，可以极大地让组件更易扩展和维护，并且让组件实现真正的数据驱动（数据变化了不要去修改模板，比如添加插槽等）。

> `数据驱动`是 vue、react、angular 等前端框架的灵魂，正是数据驱动，前端才告别手动操作 DOM 的脏活累活。

`数据驱动模板`、`数据驱动函数执行`（watch、computed），函数执行修改数据又引起页面更新，都是因为数据变化。

3.x 中删除 `functional` 选项，函数组件就是`普通函数`，参数和 setup 的参数一致，需要添加`props`、`emits` 属性，就像普通函数添加属性一样。

2.x 的模板中的函数组件

```html
<template functional>
  <div>
    <h1>{{ props.title }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'FunOne',
    props: {
      title: [String],
    },
  }
</script>
```

改成 3.x 语法：

1. 删除 `functional`

2. props --> $props， attrs --> $attrs (包含事件和非 props 属性，listeners 被移除)

```html
<template>
  <div>
    <h1>{{ $props.title }}</h1>
    <button @click="$attrs.onMyClick && $attrs.onMyClick(Math.random().toString(36))">点击</button>
    <p>$attrs{{ $attrs }}</p>
  </div>
</template>

<script>
  export default {
    name: 'FunOne',
    props: {
      title: [String],
    },
    //NOTE 模板定义的函数式组件的事件 不用声明
    // emits: ['my-click'],
  }
</script>
```

使用 3.x 写函数组件的最佳方式：`写函数`

`MyTitleFun.jsx`

```js
const MyTitleFun = (props, { slots, emit, attrs }) => {
  console.log(attrs)
  console.log(slots)
  const onClick = () => {
    emit('my-click', Math.random().toString(36))
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={onClick}>点击</button>
      {slots?.default()}
      <p>attrs.id {attrs.id}</p>
    </div>
  )
}

MyTitleFun.props = {
  title: {
    type: String,
    required: true,
  },
}
// NOTE 使用函数定义函数式组件可明确地声明事件
MyTitleFun.emits = ['my-click']

export default MyTitleFun
```

> 把 h 函数作为普通函数的第一个参数，那么这个函数被当成渲染函数，可返回 jsx，再把该函数通过 props 传递给组件，组件的 `setup` 或者 `render` 返回这个函数的调用，即可实现在数据里写 jsx，提高组件的可维护性和扩展性。

> 使用上面的方法代替插槽，二次封装开源组件，极为强大且优雅，能实现完全数据驱动，减少维护模板，使得组件更加易用。使用插槽，数据改变，可能需要修改模板，也需要修改 js，这是不好的设计。

## 例子相关的仓库

[gitee](https://gitee.com/jackzhoumine/vue3-render-examples)

[github](https://github.com/jackchoumine/vue3-render-examples)

## 总结

1. h 函数的参数更加扁平，可返回文本。
2. 普通组件和函数式组件的参数一致，函数式组件 functional 选项移除。
3. h 函数中 model 属性移出，jsx 中 `vModel` 不再支持，使用 modelValue + onUpdate:modelValue 事件。
4. 插槽统一为 slots，且从 h 的第三个参数传入组件，插槽要在 h 函数中写，否则不会更新，触发自定义事件--emit。
5. attrs 属性包含非 props 属性和事件，事件名称`on`开头。
6. `2.x 中的 render 函数可和 setup 一起使用，但是不推荐这样写。`
