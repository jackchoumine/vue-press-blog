# vue 组件设计模式

## 异步组件

## v-once 确保静态内容只计算一遍

## 递归插槽

## 递归组件

## 动态指令

```html
<div id="dynamic-example">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>

<script>
  Vue.directive('pin', {
    bind: function (el, binding, vnode) {
      el.style.position = 'fixed'
      var s = binding.arg == 'left' ? 'left' : 'top'
      el.style[s] = binding.value + 'px'
    },
  })

  new Vue({
    el: '#dynamic-example',
    data: function () {
      return {
        direction: 'left',
      }
    },
  })
</script>
```

## 依赖注入（provide & inject）

## 事件检验

```js
export default {
  emits: ['inFocus', 'submit'], // 声明事件，不对其校验
}
```

对象声明方式可对事件进行校验：

```js
export default {
  emits: {
    myClick: null, // 不校验
    submit(payload) {
      // 通过返回值为 `true` 还是为 `false` 来判断
      // 验证是否通过
    },
  },
}
```

使用事件标注类型：

```js
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // 执行运行时校验
      return payload.bookName.length > 0
    },
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123, // 类型错误
      })

      this.$emit('non-declared-event') // 类型错误
    },
  },
})
```

`script setup`语法：

ts 类型声明

```ts
// const emits = defineEmits(['site-change', 'date-change', 'page-change', 'area-change'])
type Emit = {
  //NOTE  e 的值和 emit('eventName') 中的 eventName 要相同
  (e: 'site-change', sites: Option[]): void
  (e: 'dateChange', date: string | unknown[]): void
}
const emits = defineEmits<Emit>()
// emits('dateChange', newValue)
// emits('site-change', sites)
```
