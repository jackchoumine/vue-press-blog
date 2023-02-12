# 在 vue3 中使用 jsx

## 安装依赖

```bash
npm i -D @vitejs/plugin-vue-jsx
```

在`vite.config.js`配置：

```js
export default defineConfig({
  plugins: [vueJsx()],
})
```

## v-model

模板中

```html
<input v-model="value" />
<MyInput v-model:name="value" />
<!--修饰符-->
<MyInput v-model:name.trim="value" />
```

jsx

```jsx
<input v-model={value} />
<MyInput v-model={[value,'name']} />
<MyInput v-model={[value,'name',['trim']]} />
```

jsx 可读性较差。

## v-show

```jsx
<h2 v-show={show.value}></h2>
```

show 是 ref。

## 如何使用自定义指令？

比如 element-plus 的 v-loading

```jsx
setup() {
  const loading = ref(true)
  setTimeout(() => {
    loading.value = !loading.value
  }, 5000)
  return () => <div v-loading={loading.value}></div>
}
```

> 按需自动导入报错。

解决：手动导入

```js
import { ElLoading } from 'element-plus'

app.use(ElLoading)
```

## 插槽

从 setup 函数的第二参数解构出 slots

方式二：放在标签里

```jsx
const UseButton = defineComponent({
  setup(props, { slots }) {
    console.log('useButton slots')
    console.log(slots)
    const { default: _default, left, right } = slots

    const children = {}
    if (left) Object.assign(children, { left: () => left() })

    if (right) Object.assign(children, { right: () => right() })

    if (_default) Object.assign(children, { right: () => _default() })
    else {
      Object.assign(children, {
        default: () => <span style={{ color: 'red' }}>hello</span>,
      })
    }
    return () => <Button>{children}</Button>
  },
})
```

方式二：`renderSlot`

```jsx
import { renderSlot } from 'vue'

const UseButton = defineComponent({
  setup(props, { slots }) {
    console.log('useButton slots')
    console.log(slots)
    return () => (
      <Button>
        {renderSlot(slots, 'left')}
        {renderSlot(slots, 'default')}
        {slots['right']?.()}
      </Button>
    )
  },
})
```

方式三：`v-slots`

```jsx
const UseButton = defineComponent({
  setup(props, { slots }) {
    console.log('useButton slots')
    console.log(slots)
    const { default: _default, left, right } = slots

    const children = {}
    if (left) Object.assign(children, { left: () => left() })

    if (right) Object.assign(children, { right: () => right() })

    if (_default) Object.assign(children, { right: () => _default() })
    else {
      Object.assign(children, {
        default: () => <span style={{ color: 'red' }}>hello</span>,
      })
    }
    return () => <Button v-slots={children}></Button>
  },
})
```

> 推荐使用前两种。

## 使用 Teleport 挂载组件

```html
<template>
  <Teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>this is a modal</slot>
      </h2>
      <button @click="buttonClick">Close</button>
    </div>
  </Teleport>
</template>
<script lang="ts">
  export default {
    props: {
      isOpen: Boolean,
    },
    emits: {
      'close-modal': null,
    },
    setup(props, context) {
      // NOTE 在页面上添加一个div，用来挂载弹窗
      const modalContainer = document.createElement('div')
      modalContainer.id = 'modal'
      document.body.appendChild(modalContainer)

      const buttonClick = () => {
        context.emit('close-modal')
      }
      return {
        buttonClick,
      }
    },
  }
</script>
<style>
  #center {
    width: 200px;
    height: 200px;
    border: 2px solid black;
    background: white;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
  }
</style>
```
