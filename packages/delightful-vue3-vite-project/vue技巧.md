# vue 技巧

## 如何一次绑定多个值和事件

`v-bind` 和 `v-on`

```html
<!-- binding an object of attributes -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- pass down parent props in common with a child component -->
<MyComponent v-bind="$props" />
<!-- 当不带参数使用时，可以用于绑定一个包含了多个 attribute 名称-绑定值对的对象。 -->

<!-- prop binding. "prop" must be declared in the child component. -->
<MyComponent :prop="someThing" />
```

[vue3 文档 v-bind](https://cn.vuejs.org/api/built-in-directives.html#v-bind)

v-on 还支持绑定不带参数的事件/监听器对的对象。请注意，当使用对象语法时，不支持任何修饰符。

```html
<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

[vue3 文档 v-on](https://cn.vuejs.org/api/built-in-directives.html#v-on)

## 加强 prop 验证

props 声明使用对象写法，必要时再使用 validator 加强验证。

```js
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'danger', 'info'].includes(value),
  },
})
```

## toRef 设置默认值

```js
const person = reactive({ name: 'John', age: 12 })
const ageRef = toRef(person, 'age')
const cityRef = toRef(person, 'city', 'GuiYang') // 提供默认值
```

> toRef 的返回值会和其第一个参数保持同步，修改其中一个，另一个受到影响。

> toRef 传递给组合函数，是非常强大的用法，比如从 props 中获取某些 prop `useHttp('/hello',toRef(props,'name'))`

## 暴露组件的私有属性

ref 获取 setup 函数的返回值

```html
<script>
  export default {
    setup() {
      const modalIsOpen = ref(false)
      return { modalIsOpen }
    },
  }
</script>
```

通过`ref`访问 modalIsOpen 属性。

```html
<script setup>
  const HelloWorldCom = ref()
  onMounted(() => {
    console.log('HelloWorldCom.value.modalIsOpen')
    console.log(HelloWorldCom.value.modalIsOpen)
    setTimeout(() => {
      // HelloWorldCom.value 是一个对象，具有 setup 函数返回的对象属性
      HelloWorldCom.value.modalIsOpen = true
    }, 4000)
  })
</script>

<template>
  <HelloWorld ref="HelloWorldCom" />
</template>
```

不想完全暴露 setup 函数的返回值，可使用 `expose`属性指定暴露的属性：

```html
<script>
  export default {
    expose: ['modalIsOpen'],
    setup() {
      const modalIsOpen = ref(false)
      return { modalIsOpen }
    },
  }
</script>
```

通过 ref 只能访问到`modalIsOpen`，其他属性访问不到。

> [vue 文档的 expose](https://cn.vuejs.org/api/options-state.html#expose)

还可以从 setup 的 context 中使用 expose 函数暴露属性：

```js
  setup(_, { expose }) {
    // make the instance "closed" -
    // i.e. do not expose anything to the parent
    // expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // selectively expose local state
    expose({ count: publicCount, exposeVar: '暴露的变量' })
    return {  }
  }
```

> [setupContext 暴露属性](https://vuejs.org/api/composition-api-setup.html#setup-context)

`script setup` 中 --- `defineExpose` 暴露属性

选项 api 中，组件的属性是完全暴露的，而 `script setup`中是完全封闭的，除非使用`defineExpose`暴露，否则外部访问不到。

```html
<script setup>
  import { ref } from 'vue'

  const a = 1
  const b = ref(2)

  defineExpose({
    a,
    b,
  })
</script>
```

> [vue 文档中的 defineExpose](https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose)

## 在子组件内部修改插槽里的代码样式

> :slotted(selector) 修改插槽样式

子组件

```html
<template>
  <div class="test-slot">
    <h3>使用:slotted 修改插槽样式</h3>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  /* 修改父组件传递过来的额插槽样式 */
  :global(.slot) {
    background-color: red;
  }
</style>
```

父组件：

```html
<script setup name="Demos">
  import TestSlotted from './TestSlotted.vue'
</script>

<template>
  <div class="slotted-test">
    <TestSlotted>
      <div class="slot">测试slotted</div>
    </TestSlotted>
  </div>
</template>

<style scoped lang="scss">
  .slotted-test {
    background-color: #ccc;
  }
</style>
```

> 使用`:slotted` 可在子组件的作用域样式内修改插槽样式。

## 在作用域内的样式暴露为全局样式

```html
<style lang="scss" scoped>
  :global(.slot) {
    background-color: red;
  }
</style>
```

> `:global` 把作用域内的样式暴露到全局。

## 在单文件组件中定义多个组件

1. 使用 jsx

```html
<script setup lang="jsx">
  const SubComponent = defineComponent({
    render() {
      return <div style={{ backgroundColor: 'red' }}>单个文中中定义多个组件</div>
    },
  })
</script>

<template>
  <div>
    <SubComponent />
  </div>
</template>
```

2. 使用内联模板

```html
<script>
  const SubComponent = defineComponent({
    template: /*html*/ `<div style="background-color:red">单个文中中定义多个组件</div>`,
  })
</script>
```

使用了构建工具，vue 默认导出的是不含运行时编译器的代码，使用了内联模板，需要导出带有运行时编译的 vue。

```js
// 导出包含运行时编译器
import { createApp } from 'vue/dist/vue.esm-bundler.js'
```

> 使用`es6-string-html`可获取 template 语法高亮。

推荐使用 jsx 的方式，可读性更好。

## 二次封装如何处理插槽

```html
<template>
  <div>
    <ThirdPartyComponent>
      <template v-for="(_,name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps??{}"></slot>
      </template>
    </ThirdPartyComponent>
  </div>
</template>
```

## attr 函数的妙用

```html
<template>
  <div>
    <p :data-text="text">123</p>
    <p>123</p>
    <p>123</p>
    <p>123</p>
  </div>
</template>
<script setup>
  const text = ref('hello')
</script>
<style scoped>
  div p:first-of-type:before {
    content: attr(data-text);
  }
</style>
```
